from rest_framework import serializers
from ...models import ExpenseCategory, PaymentCategory, ExpenseItem, IncomeCategory, IncomeItem


class ExpenseCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ExpenseCategory
        fields = ['id', 'title', 'user']
        read_only_fields = ('user',)

class PaymentCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = PaymentCategory
        fields = ['id', 'title', 'user']
        read_only_fields = ('user',)


class ExpenseItemSerializer(serializers.ModelSerializer):
     
     class Meta:
        model = ExpenseItem
        fields = [
            'id', 
            'user',
            'expense_category',
            'title',
            'amount',
            'payment_category',
            'description',
            'receive_image',
            'created_date',
            'updated_date',
        ]
        read_only_fields = ('user',)


class IncomeCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = IncomeCategory
        fields = ['id', 'title', 'user']
        read_only_fields = ('user',)

class IncomeItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = IncomeItem
        fields = [
            'id', 
            'user',
            'income_category',
            'amount',
            'description',]
        read_only_fields = ('user',)

        
