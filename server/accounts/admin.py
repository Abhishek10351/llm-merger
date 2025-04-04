from django.contrib import admin

# Register your models here.
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "is_staff", "is_active")
    search_fields = ("email", "name")
    list_filter = ("is_staff", "is_active")
    ordering = ("email",)
    list_per_page = 20
