from django.apps import AppConfig

class AccountsConfig(AppConfig):
    name = 'accounts'
    default_auto_field = 'django.db.models.AutoField'

    def ready(self):
        from . import signals  # or wherever your signals are
