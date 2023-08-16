from django.db.models.signals import post_save
from django.dispatch import receiver
from ..models.users import User
from ..models.profiles import Profile

@receiver(post_save, sender=User)
def create_profile(sender, instance=None, created=False, **kwargs):
    if created:
        Profile.objects.create(user=instance)

