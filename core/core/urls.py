from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("finances/", include("finances.urls")),
]
