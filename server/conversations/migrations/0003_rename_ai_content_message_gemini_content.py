# Generated by Django 5.1.6 on 2025-05-08 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("conversations", "0002_message_deepseek_content"),
    ]

    operations = [
        migrations.RenameField(
            model_name="message",
            old_name="ai_content",
            new_name="gemini_content",
        ),
    ]
