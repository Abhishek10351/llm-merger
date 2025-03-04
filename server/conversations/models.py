from django.db import models
from django.contrib.auth.models import User


message_types = [
    ("human", "Human"),
    ("ai", "AI"),
]


class Conversation(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Conversation {self.id}"


class Message(models.Model):
    content = models.TextField()
    message_type = models.CharField(max_length=5, choices=message_types)
    created_at = models.DateTimeField(auto_now_add=True)
    conversation = models.ForeignKey(
        Conversation, related_name="messages", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.message_type}: {self.content}"
