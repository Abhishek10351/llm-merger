from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Conversation, Message
from accounts.models import User
from .serializers import (
    ConversationSerializer,
    ConversationListSerializer,
    MessageSerializer,
    ConversationListSerializer,
    NewConversationSerializer,
)

from llm_core.utils import generate_title

import llm_core.gemini_model as llm_main

chat_model = llm_main.model

from langchain_core.messages import HumanMessage, AIMessage


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        return Response(
            {"message": "This endpoint is not meant for creating conversations."},
            status=405,
        )

    def get_queryset(self):
        return Conversation.objects.filter(user=self.request.user)

    def get_object(self, pk):
        try:
            return Conversation.objects.get(id=pk, user=self.request.user)
        except Conversation.DoesNotExist:
            return None

    def list(self, request, *args, **kwargs):
        conversations = self.get_queryset()
        serializer = ConversationListSerializer(conversations, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        conversation = self.get_object(pk)
        if conversation is None:
            return Response(
                {"error": "You do not have permission to access this conversation."},
                status=403,
            )
        serialized_conversation = ConversationSerializer(conversation).data
        return Response(serialized_conversation)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(conversation__user=self.request.user)

    def list(self, request, *args, **kwargs):
        return Response(
            {"message": "This endpoint is not meant for listing messages."}, status=405
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            data = serializer.data
            conversation_id = data.get("conversation", None)
            if not conversation_id:
                return Response({"error": "Conversation ID is required."}, status=400)
            conversation = Conversation.objects.get(id=conversation_id, user=user)
            if not conversation:
                return Response(
                    {
                        "error": "You do not have permission to access this conversation."
                    },
                    status=403,
                )
            data.pop("conversation")
            messages = list(Message.objects.filter(conversation=conversation))

            chat = []
            for msg in messages:
                if msg.user_content:
                    chat.append(HumanMessage(msg.user_content))
                if msg.ai_content:
                    chat.append(AIMessage(msg.ai_content))
            chat.append(HumanMessage(data["user_content"]))

            response = chat_model.invoke(chat)
            ai_message = response.content
            ai_message_obj = Message.objects.create(
                conversation=conversation,
                user_content=data["user_content"],
                ai_content=ai_message,
            )
            messages.append(ai_message_obj)
            serialized_messages = [MessageSerializer(m).data for m in messages]
            headers = self.get_success_headers(serializer.data)
            return Response(serialized_messages, status=201, headers=headers)

        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, *args, **kwargs):
        message = Message.objects.get(id=pk)
        if message.conversation.user != request.user:
            return Response(
                {"error": "You do not have permission to access this message."},
                status=403,
            )

        conversation = message.conversation
        messages = Message.objects.filter(conversation=conversation)
        serialized_messages = [MessageSerializer(m).data for m in messages]

        return Response(serialized_messages)


class NewConversation(generics.CreateAPIView):
    serializer_class = NewConversationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            title = generate_title(serializer.data["user_content"])
            ai_message = chat_model.invoke(serializer.data["user_content"])
            conversation = Conversation.objects.create(
                user=user,
                title=title,
            )
            conversation.save()
            message = Message.objects.create(
                conversation=conversation,
                user_content=serializer.data["user_content"],
                ai_content=ai_message.content,
            )
            message.save()
            # properly serialize data before  returning it
            new_serializer = ConversationSerializer(conversation)
            new_serializer.data["messages"] = [MessageSerializer(message).data]
            return Response(new_serializer.data, status=201)
