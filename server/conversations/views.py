from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Conversation, Message
from accounts.models import User
from .serializers import ConversationSerializer, MessageSerializer

from llm_core.utils import message_type
import llm_core.gemini_model as llm_main

chat_model = llm_main.model

from langchain_core.messages import HumanMessage, AIMessage


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(user=self.request.user)

    def retrieve(self, request, pk=None, *args, **kwargs):
        conversation = Conversation.objects.get(id=pk, user=request.user)
        messages = Message.objects.filter(conversation=pk)
        serialized_messages = [MessageSerializer(m).data for m in messages]
        return Response(serialized_messages)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            user = request.user
            data = serializer.data
            conversation = serializer.create(**data)
            conversation.save()
            return Response(ConversationSerializer(conversation).data, status=201)
        return Response(serializer.errors, status=400)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            print("Serializer is valid")
            # return
            user = request.user
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            data = serializer.data
            conversation_id = data.get("conversation", None)
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
