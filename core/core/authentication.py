from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the token from the cookie
        jwt_cookie = request.COOKIES.get('JWT_COOKIE_FAMILY_ACCOUNTING', None)

        if not jwt_cookie:
            return None

        # Set the token in the headers to be processed by the superclass's method
        request.META['HTTP_AUTHORIZATION'] = f"Bearer {jwt_cookie}"

        return super().authenticate(request)
