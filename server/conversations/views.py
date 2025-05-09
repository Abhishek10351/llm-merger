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

from llm_core import deepseek_model, gemini_model

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

    def list(self, request, *args, **kwargs):
        conversations = self.get_queryset()
        serializer = ConversationListSerializer(conversations, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        try:
            conversation = Conversation.objects.get(id=pk)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found."}, status=404)
        if conversation.user != request.user:
            return Response(
                {"error": "You do not have permission to access this conversation."},
                status=403,
            )

        serialized_conversation = ConversationSerializer(conversation).data
        return Response(serialized_conversation)

    def update(self, request, pk=None):
        try:
            conversation = Conversation.objects.get(id=pk)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found."}, status=404)
        if conversation.user != request.user:
            return Response(
                {"error": "You do not have permission to access this conversation."},
                status=403,
            )
        messages = list(
            MessageSerializer(
                Message.objects.filter(conversation=conversation), many=True
            ).data
        )

        return Response(messages)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(
            conversation__user=self.request.user,
        )

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
            messages = list(Message.objects.filter(conversation=conversation))

            gemini_chat = []
            for msg in messages:
                if msg.user_content:
                    gemini_chat.append(HumanMessage(msg.user_content))
                if msg.gemini_content:
                    gemini_chat.append(AIMessage(msg.gemini_content))
            gemini_chat.append(HumanMessage(data["user_content"]))
            response = gemini_model.invoke(gemini_chat)
            gemini_message = response.content
            deepseek_chat = []
            for msg in messages:
                if msg.user_content:
                    deepseek_chat.append(HumanMessage(msg.user_content))
                if msg.gemini_content:
                    deepseek_chat.append(AIMessage(msg.deepseek_content))
            deepseek_chat.append(AIMessage(data["user_content"]))
            response = deepseek_model.invoke(deepseek_chat)
            deepseek_message = response.content

            ai_message_obj = Message.objects.create(
                conversation=conversation,
                user_content=data["user_content"],
                gemini_content=gemini_message,
                deepseek_content=deepseek_message,
            )
            headers = self.get_success_headers(serializer.data)
            return Response(MessageSerializer(ai_message_obj).data, status=201)

        return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None, *args, **kwargs):
        message = Message.objects.get(id=pk)
        if message.conversation.user != request.user:
            return Response(
                {"error": "You do not have permission to access this message."},
                status=403,
            )

        return Response(MessageSerializer(message).data)


class NewConversation(generics.CreateAPIView):
    serializer_class = NewConversationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            title = generate_title(serializer.data["user_content"])
            ai_message = gemini_model.invoke(serializer.data["user_content"])
            deepseek_content = deepseek_model.invoke(serializer.data["user_content"])
            conversation = Conversation.objects.create(
                user=user,
                title=title,
            )
            conversation.save()
            message = Message.objects.create(
                conversation=conversation,
                user_content=serializer.data["user_content"],
                gemini_content=ai_message.content,
                deepseek_content=deepseek_content.content,
            )
            message.save()
            # properly serialize data before  returning it
            new_serializer = ConversationSerializer(conversation)
            new_serializer.data["messages"] = [MessageSerializer(message).data]
            return Response(new_serializer.data, status=201)
