from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ExpenseCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
class PaymentCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    

class ExpenseItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense_category = models.ForeignKey(ExpenseCategory, on_delete=models.PROTECT)  # Protect ExpenseCategory
    title = models.CharField(max_length=100)
    amount = models.IntegerField()
    payment_category = models.ForeignKey(PaymentCategory, on_delete=models.PROTECT)  # Protect PaymentCategory
    description = models.CharField(blank=True, null=True, max_length=200)
    receive_image = models.ImageField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class IncomeCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    

class IncomeItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    income_category = models.ForeignKey(IncomeCategory, on_delete=models.PROTECT)  # Protect IncomeCategory
    description = models.CharField(blank=True, null=True ,max_length=200)

    def __str__(self):
        return str(self.income_category) + " - " + str(self.amount)
