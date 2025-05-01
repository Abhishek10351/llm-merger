from django.db import models
from accounts.models import User


class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, default="New Conversation")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Conversation {self.id}"


class Message(models.Model):
    user_content = models.TextField()
    ai_content = models.TextField()
    deepseek_content = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    conversation = models.ForeignKey(
        Conversation, related_name="messages", on_delete=models.CASCADE
    )

    def __str__(self):
        return f" {self.user_content[:20]}... - {self.ai_content[:20]}..."
