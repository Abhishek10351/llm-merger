from rest_framework import serializers
from .models import Conversation, Message
from accounts.models import User


class MessageSerializer(serializers.ModelSerializer):

    ai_content = serializers.CharField(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "user_content", "ai_content", "conversation"]


class MessageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "user_content", "ai_content"]


class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageContentSerializer(many=True, read_only=True)
    title = serializers.CharField(read_only=True)

    class Meta:
        model = Conversation
        fields = ["id", "title", "messages"]

    def create(self, **validated_data):
        user = validated_data.pop("user")
        conversation = Conversation.objects.create(user=user, **validated_data)
        return conversation


class ConversationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ["id", "title"]


class NewConversationSerializer(serializers.Serializer):

    user_content = serializers.CharField(required=True)
