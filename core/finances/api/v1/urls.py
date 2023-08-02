from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ExpenseCategoryViewSet,
                    PaymentCategoryViewSet,
                    ExpenseItemViewSet,
                    IncomeCategoryViewSet,
                    IncomeItemViewSet,)

router = DefaultRouter()
router.register(r'expense-category',ExpenseCategoryViewSet, basename='expense-category')
router.register(r'payment-category',PaymentCategoryViewSet, basename='payment-category')
router.register(r'expense-item',ExpenseItemViewSet, basename='expense-item')
router.register(r'income-category',IncomeCategoryViewSet, basename='income-category')
router.register(r'income-item',IncomeItemViewSet, basename='income-item')

urlpatterns = [
    path('', include(router.urls)),
]
