from django.urls import path, include

from .views import router
from .views import CreateUserView, UserView, TokenObtainPairView


urlpatterns = [
    path("create/", CreateUserView.as_view(), name="create_user"),
    path("me/", UserView.as_view(), name="user"),
    path("login/", TokenObtainPairView.as_view(), name="login"), 
    path("", include(router.urls)),
]