from django.urls import path
from . import views

# url conf
urlpatterns = [
	path('', views.works, name='works'),
	path('<work_id>', views.show_work, name='show-work')
]