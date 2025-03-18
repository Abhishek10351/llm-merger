from rest_framework import viewsets
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer, MessageContentSerializer

from llm_core.utils import message_type
import llm_core.gemini_model as llm_main

chat_model = llm_main.model

from langchain_core.messages import HumanMessage, AIMessage


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

    def retrieve(self, request, pk=None, *args, **kwargs):
        conversation = Conversation.objects.get(id=pk)
        messages = Message.objects.filter(conversation=pk)
        serialized_messages = [MessageSerializer(m).data for m in messages]
        return Response(serialized_messages)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageContentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            conversation_id = data.get("conversation", None)
            conversation = Conversation.objects.get(id=conversation_id)
            data.pop("conversation")
            data["message_type"] = "human"
            message = Message.objects.create(conversation=conversation, **data)
            messages = list(Message.objects.filter(conversation=conversation_id))
            messages_types = [message_type(m) for m in messages]
            response = chat_model.invoke(messages_types)
            ai_message = AIMessage(response.content)
            ai_message_obj = Message.objects.create(
                conversation=conversation, content=ai_message.content, message_type="ai"
            )
            messages.append(ai_message_obj)
            serialized_messages = [MessageSerializer(m).data for m in messages]

            headers = self.get_success_headers(serializer.data)
            return Response(serialized_messages, status=201, headers=headers)

        return Response(serializer.errors, status=400)
