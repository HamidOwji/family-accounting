from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from mail_templated import EmailMessage
from ..utils import EmailThread
import jwt
from django.conf import settings
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import ( CustomAuthTokenSerializer,
                            CustomTokenObtainPairSerializer,
                            ProfileSerializer,
                            PasswordResetRequestSerializer,
                            SetNewPasswordSerializer,
                            ChangePasswordSerializer)

from django.shortcuts import get_object_or_404
from ...models.profiles import Profile
from django.core.mail import send_mail
from datetime import datetime, timedelta
from django.template.loader import render_to_string

class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class LoginView(APIView):
    parser_classes = (JSONParser, FormParser)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user is not None:
                # Create a JWT token
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                response = Response({"success": True})
                # Set the JWT token as a cookie on the response object
                response.set_cookie('JWT_COOKIE_FAMILY_ACCOUNTING', access_token, httponly=True, samesite='Lax')
                return response
            else:
                return Response({"error": "Invalid email or password"}, status=400)
        else:
            print("Serializer Errors:", serializer.errors)
        return Response(serializer.errors, status=400)


class LogoutView(APIView):
    permission_classes = []

    def post(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie('JWT_COOKIE_FAMILY_ACCOUNTING')
        return response
    



class RegistrationApiView(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = self.get_tokens_for_user(user)
            email_context = {"token": token}

            message = render_to_string('email/activation_email.tpl', email_context)
            try:
                send_mail(
                    'Activate your account',
                    message,
                    'admin@admin.com',
                    [user.email],
                    fail_silently=False,
                )
            except Exception as e:
                return Response({"error": f"Error sending activation email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"email": user.email}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)




class ActivationApiView(APIView):
    def get(self, request, token, *args, **kwargs):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get("user_id")
            user = User.objects.get(pk=user_id)

            if user.is_active:
                return Response({"detail": "Account already activated."}, status=status.HTTP_400_BAD_REQUEST)

            user.is_active = True
            user.save()
            return Response({"detail": "Account successfully activated."}, status=status.HTTP_200_OK)
        except (jwt.ExpiredSignatureError, jwt.DecodeError, jwt.InvalidTokenError):
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)



class CustomObtainAuthToken(ObtainAuthToken):
    serializer_class = CustomAuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user_id": user.pk, "email": user.email})



class CustomDiscardAuthToken(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProfileApiView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, user=self.request.user)
        return obj


class PasswordResetRequestApiView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        email = request.data.get('email')
        user = get_object_or_404(User, email=email)
        
        token_data = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
        }
        token = jwt.encode(token_data, settings.SECRET_KEY, algorithm='HS256')
        
        # Send email with the token
        reset_url = f"http://yourfrontendwebsite.com/reset-password/{token}"
        send_mail(
            'Password Reset Request',
            f'Click here to reset your password: {reset_url}',
            'admin@admin.com',
            [email],
            fail_silently=False,
        )
        
        return Response({'detail': 'Password reset email sent.'})


class SetNewPasswordApiView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        token = serializer.validated_data['token']
        try:
            decoded_data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded_data.get('user_id')
            user = User.objects.get(id=user_id)
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'detail': 'Password reset successful.'})
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired.'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordApiView(generics.UpdateAPIView):
    model = User
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Check old password
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'old_password': 'Wrong password.'}, status=status.HTTP_400_BAD_REQUEST)
            # Set the new password
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'detail': 'Password updated successfully.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
