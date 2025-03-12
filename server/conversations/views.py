from rest_framework import viewsets
from rest_framework.response import Response
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

from llm_core.utils import message_type
import llm_core.main as llm_main

chat_model = llm_main.model

from langchain_core.messages import HumanMessage, AIMessage


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            # get the conversation
            conversation_id = data.get("conversation", None)
            print(conversation_id)
            conversation = Conversation.objects.get(id=conversation_id)
            data.pop("conversation")
            message = Message.objects.create(conversation=conversation, **data)
            ai_message = AIMessage(response.content)
            ai_message_obj = Message.objects.create(
                conversation=conversation, content=ai_message.content, message_type="ai"
            )
            messages = Message.objects.filter(conversation=conversation_id)

            serialized_messages = [MessageSerializer(m).data for m in messages]

            messages = [message_type(m) for m in messages]
            response = chat_model.invoke(messages)

            headers = self.get_success_headers(serializer.data)
            return Response(serialized_messages, status=201, headers=headers)

            return Response(
                MessageSerializer(messages).data, status=201, headers=headers
            )

        return Response(serializer.errors, status=400)
