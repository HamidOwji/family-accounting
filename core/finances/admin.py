from django.contrib import admin
from .models import ExpenseCategory, PaymentCategory

admin.site.register(ExpenseCategory)
admin.site.register(PaymentCategory)
# Register your models here.
