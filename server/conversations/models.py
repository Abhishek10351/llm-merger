"""Models for conversations and messages."""
from django.db import models

from accounts.models import User


class Conversation(models.Model):
    """A conversation thread containing multiple messages."""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="conversations")
    title = models.CharField(max_length=255, default="New Conversation")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["-created_at"]),
            models.Index(fields=["user", "-created_at"]),
        ]

    def __str__(self):
        return f"{self.title} (ID: {self.id})"


class Message(models.Model):
    """A message within a conversation containing user input and LLM responses."""
    
    conversation = models.ForeignKey(
        Conversation, 
        related_name="messages", 
        on_delete=models.CASCADE
    )
    user_content = models.TextField(help_text="User's message")
    gemini_content = models.TextField(help_text="Gemini's response")
    deepseek_content = models.TextField(
        null=True, 
        blank=True,
        help_text="DeepSeek's response"
    )
    merged_content = models.TextField(
        null=True, 
        blank=True,
        help_text="Merged response from both models"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["conversation", "created_at"]),
        ]

    def __str__(self):
        preview = self.user_content[:50]
        return f"Message in {self.conversation.title}: {preview}..."
