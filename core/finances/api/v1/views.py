from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ...models import ExpenseCategory, PaymentCategory, ExpenseItem, IncomeCategory, IncomeItem
from .serializer import (ExpenseCategorySerializer,
                        PaymentCategorySerializer,
                        ExpenseItemSerializer,
                        IncomeCategorySerializer,
                        IncomeItemSerializer)



class ExpenseCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseCategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ExpenseCategory.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class PaymentCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentCategorySerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        return PaymentCategory.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExpenseItemViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseItemSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        return ExpenseItem.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class IncomeCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeCategorySerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        return IncomeCategory.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IncomeItemViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeItemSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        return IncomeItem.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


