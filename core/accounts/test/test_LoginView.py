from django.test import RequestFactory, TestCase
from rest_framework_simplejwt.tokens import RefreshToken
from ..api.v1.views import LoginView
from ..api.v1.serializers import UserSerializer 
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse

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



# class RegistrationApiViewTestCase(APITestCase):

#     def test_registration_valid(self):
#         data = {
#             "email": "test_register@example.com",
#             "password": "testpassword",
#             "password2": "testpassword"
#         }
#         response = self.client.post(reverse('accounts:register'), data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data['email'], data['email'])

#         # Check that the user is created but not active
#         user = User.objects.get(email=data['email'])
#         email_content = mail.outbox[0].body
#         print(email_content)
#         self.assertIn('token', email_content)
#         self.assertFalse(user.is_active)

#         # Check that one message has been sent.
#         self.assertEqual(len(mail.outbox), 1)

#         # Check the token in the email context (you might want to extract the token from the email and verify it if needed)
#         email_content = mail.outbox[0].body
#         self.assertIn('token', email_content)  # This is a simple check, you can expand on this
#     def test_registration_invalid(self):
#         data = {
#             "email": "test_register@example.com",
#             "password": "testpassword",
#             "password2": "wrong-password"
#         }
#         response = self.client.post(reverse('accounts:register'), data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


