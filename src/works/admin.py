from django.contrib import admin
from .models import Work, Url, Image, PortfolioLink, ContactLink, CV, Bio, FileTransfer, Icon

# Register your models here.
admin.site.register(Work)
admin.site.register(Url)
admin.site.register(Image)
admin.site.register(PortfolioLink)
admin.site.register(ContactLink)
admin.site.register(CV)
admin.site.register(Bio)
admin.site.register(FileTransfer)
admin.site.register(Icon)