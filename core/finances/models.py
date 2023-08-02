from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ExpenseCategory(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class PaymentCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    

class ExpenseItem(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense_category = models.ForeignKey(ExpenseCategory, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    amount = models.IntegerField()
    payment_category = models.ForeignKey(PaymentCategory, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    receive_image = models.ImageField()
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
    title = models.CharField(max_length=100)
    amount = models.IntegerField()
    income_category = models.ForeignKey(IncomeCategory, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    


    
