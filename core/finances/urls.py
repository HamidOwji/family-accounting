from django.urls import path, include

app_name = 'finances'

urlpatterns = [
    path('api/v1/', include('finances.api.v1.urls')),
]
