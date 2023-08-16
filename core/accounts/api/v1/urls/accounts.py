from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import UserViewSet, LoginView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView
from ..views import (RegistrationApiView,
                    ActivationApiView,
                    CustomObtainAuthToken,
                    CustomDiscardAuthToken,
                    CustomTokenObtainPairView,
                    ProfileApiView,
                    PasswordResetRequestApiView,
                    SetNewPasswordApiView,
                    ChangePasswordApiView)

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegistrationApiView.as_view(), name='register'),
    path('activate/<str:token>/', ActivationApiView.as_view(), name='activate'),
    path('token/', CustomObtainAuthToken.as_view(), name='token_obtain'),
    path('token/discard/', CustomDiscardAuthToken.as_view(), name='token_discard'),
    path('token/jwt/', CustomTokenObtainPairView.as_view(), name='token_jwt_obtain_pair'),
    path('profile/', ProfileApiView.as_view(), name='profile'),
    path('password-reset/', PasswordResetRequestApiView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', SetNewPasswordApiView.as_view(), name='password_reset_confirm'),
    path('change-password/', ChangePasswordApiView.as_view(), name='change_password'),
]

