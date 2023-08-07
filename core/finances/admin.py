from django.contrib import admin
from .models import ExpenseCategory, PaymentCategory, IncomeCategory, ExpenseItem, IncomeItem

admin.site.register(ExpenseCategory)
admin.site.register(PaymentCategory)
admin.site.register(IncomeCategory)
admin.site.register(ExpenseItem)
admin.site.register(IncomeItem)
