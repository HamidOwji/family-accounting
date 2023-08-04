from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ...models import ExpenseCategory, PaymentCategory, ExpenseItem, IncomeCategory, IncomeItem
from .serializer import (ExpenseCategorySerializer,
                        PaymentCategorySerializer,
                        ExpenseItemSerializer,
                        IncomeCategorySerializer,
                        IncomeItemSerializer)

class ExpenseCategoryViewSet(viewsets.ModelViewSet):
    queryset = ExpenseCategory.objects.all()
    serializer_class = ExpenseCategorySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class PaymentCategoryViewSet(viewsets.ModelViewSet):
    queryset = PaymentCategory.objects.all()
    serializer_class = PaymentCategorySerializer

class ExpenseItemViewSet(viewsets.ModelViewSet):
    queryset = ExpenseItem.objects.all()
    serializer_class = ExpenseItemSerializer


class IncomeCategoryViewSet(viewsets.ModelViewSet):
    queryset = IncomeCategory.objects.all()
    serializer_class = IncomeCategorySerializer

class IncomeItemViewSet(viewsets.ModelViewSet):
    queryset = IncomeItem.objects.all()
    serializer_class = IncomeItemSerializer


