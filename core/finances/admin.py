from django.contrib import admin
from .models import ExpenseCategory, PaymentCategory, IncomeCategory

admin.site.register(ExpenseCategory)
admin.site.register(PaymentCategory)
admin.site.register(IncomeCategory)
