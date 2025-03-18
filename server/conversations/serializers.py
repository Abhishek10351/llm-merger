from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "content", "message_type", "conversation"]


class MessageContentSerializer(serializers.ModelSerializer):

    message_type = serializers.CharField(read_only=True)

    class Meta:
        model = Message
        fields = ["content", "message_type", "conversation"]


class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageContentSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["id", "created_at", "messages"]
