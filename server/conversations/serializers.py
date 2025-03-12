from rest_framework import serializers
from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "content", "message_type", "conversation"]

class MessageContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = [ "content", "message_type"]

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageContentSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["id", "created_at", "messages"]
