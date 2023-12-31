from django.test import RequestFactory, TestCase
from rest_framework_simplejwt.tokens import RefreshToken
from ..api.v1.views import LoginView
from ..api.v1.serializers import UserSerializer 
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse
from django.core import mail
from rest_framework import status
from datetime import datetime, timedelta
import jwt
from django.conf import settings


User = get_user_model()

class BaseTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Data to be passed to the serializer
        user_data = {
            'email': 'test@example.com',
            'password': 'testpassword',
            'password2': 'testpassword'
        }
        
        # Create user using the serializer
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            cls.user = user_serializer.save()
            cls.user.is_active = True
            cls.user.save()
        else:
            raise ValueError("Test setup failed due to user serialization error.")



class LoginViewTestCase(BaseTestCase):

    def setUp(self):
        self.factory = RequestFactory()
        self.view = LoginView.as_view()

    def test_valid_login(self):
        data = {
                    'email': 'test@example.com',
                    'password': 'testpassword'
                }
        request = self.factory.post(reverse('accounts:api_login'), data, content_type='application/json')
        response = self.view(request)
        response.render()
        # print('error: ', response.content)
                
        self.assertEqual(response.status_code, 200)
        self.assertTrue('success' in response.data)
        self.assertEqual(response.data['success'], True)
        self.assertTrue('JWT_COOKIE_FAMILY_ACCOUNTING' in response.cookies)

    def test_invalid_login(self):
        data = {
            'email': 'test@example.com',
            'password': 'testpassword23'
        }
        request = self.factory.post('/accounts/api/v1/login/', data, content_type='application/json')
        response = self.view(request)
        
        self.assertEqual(response.status_code, 400)
        self.assertTrue('error' in response.data)
        self.assertEqual(response.data['error'], "Invalid email or password")
        # print('error: ', response.data)






class LogoutViewTestCase(BaseTestCase):

    def setUp(self):
        # Setting up a client to make requests
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        # Logging in the user to get the token and setting it as a cookie
        login_data = {'email': 'test@example.com', 'password': 'testpassword'}

        login_response = self.client.post(reverse('accounts:api_login'), login_data, format='json')

        token = login_response.cookies.get('JWT_COOKIE_FAMILY_ACCOUNTING').value
        self.client.cookies['JWT_COOKIE_FAMILY_ACCOUNTING'] = token


    def test_logout_view(self):
        # Make a POST request to the LogoutView
        response = self.client.post(reverse('accounts:api_logout'))

        # Check if the status code is 200 OK
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the JWT_COOKIE_FAMILY_ACCOUNTING cookie value is empty
        jwt_cookie = response.cookies.get('JWT_COOKIE_FAMILY_ACCOUNTING')
        if jwt_cookie:
            self.assertEqual(jwt_cookie.value, "")
        else:
            self.fail("JWT_COOKIE_FAMILY_ACCOUNTING cookie is missing from the response.")



class UserRegistrationTestCase(APITestCase):

    def setUp(self):
        # Clear the outbox before each test
        mail.outbox = []

    def test_valid_registration(self):
        """
        Ensure we can create a new user with valid data.
        """
        url = reverse('accounts:register')  # Replace with the actual name of your endpoint
        data = {
            'email': 'testuser@example.com',
            'password': 'testpass123',
            'password2': 'testpass123',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'testuser@example.com')

    def test_email_sent_after_registration(self):
        """
        Ensure an email is sent after successful registration.
        """
        url = reverse('accounts:register')  # Replace with the actual name of your endpoint
        data = {
            'email': 'testuser@example.com',
            'password': 'testpass123',
            'password2': 'testpass123',
        }
        self.client.post(url, data, format='json')

        # Check that one message was sent
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Activate your account')  # Assuming this is the subject of your activation email


class AccountActivationEndToEndTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        mail.outbox = []  # clear the outbox

    def test_registration_and_activation(self):
        # Step 1: Register a new user
        url = reverse('accounts:register')
        data = {
            'email': 'testuser@example.com',
            'password': 'testpass123',
            'password2': 'testpass123',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email='testuser@example.com')
        self.assertFalse(user.is_active)
        # print('user: ', user)

        # Step 2: Extract the JWT token from the email
        # This step might differ based on how you send the token in the email
        self.assertEqual(len(mail.outbox), 1)
        email_body = mail.outbox[0].body

        # Find the start of the URL
        token_start = email_body.find("http://yourfrontendwebsite.com/activate/") + len("http://yourfrontendwebsite.com/activate/")

        # Find the end of the token
        token_end = email_body.find("\n\nThanks!")
        # Extract the token
        token = email_body[token_start:token_end]

        # Step 3: Activate the user using the JWT token
        activation_url = reverse('accounts:activate', args=[token])
        activation_response = self.client.get(activation_url)

        # print('content: ', activation_response.content)
        self.assertEqual(activation_response.status_code, status.HTTP_200_OK)


        # Step 4: Verify that the user is now active
        user = get_user_model().objects.get(email='testuser@example.com')
        self.assertTrue(user.is_active)


class ProfileApiViewTestCase(BaseTestCase):

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        # print('user:', self.user)

    def test_profile_retrieval(self):
        url = reverse('accounts:profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user'], self.user.id)

    def test_profile_update(self):
        url = reverse('accounts:profile')
        data = {'first_name': 'John', 'last_name': 'Doe'}
        response = self.client.put(url, data, format='json')
        # print('response: ', response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'John')
        self.assertEqual(response.data['last_name'], 'Doe')


class PasswordResetTestCase(BaseTestCase):

    def setUp(self):
        self.client = APIClient()
        mail.outbox = []

    def generate_reset_token(self, user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def test_password_reset_request(self):
        url = reverse('accounts:password_reset_request')
        data = {'email': self.user.email}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 1)

    def test_set_new_password(self):
        token = self.generate_reset_token(self.user)
        url = reverse('accounts:password_reset_confirm', kwargs={'token': token})
        data = {'token': token, 'password': 'newpassword', 'password_confirm': 'newpassword'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


# class ChangePasswordTestCase(BaseTestCase):

#     def setUp(self):
#         self.client = APIClient()
#         self.client.force_authenticate(user=self.user)

#     def test_change_password(self):
#         url = reverse('accounts:change_password')
#         data = {'old_password': 'testpassword', 'new_password': 'newpassword'}
#         response = self.client.put(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         # Verify new password
#         self.assertTrue(self.user.check_password('newpassword'))

