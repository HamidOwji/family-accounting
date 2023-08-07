from rest_framework import viewsets, status
from rest_framework.views import APIView
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken

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

                return Response({"success": True, "token": access_token})
            else:
                return Response({"error": "Invalid email or password"}, status=400)
        else:
            print("Serializer Errors:", serializer.errors)
        return Response(serializer.errors, status=400)


