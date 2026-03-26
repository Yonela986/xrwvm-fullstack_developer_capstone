# Uncomment the imports before you add the code
from django.urls import path, re_path
from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.views.generic import TemplateView
from django.contrib import admin


app_name = 'djangoapp'
urlpatterns = [
    path('login/', views.login_user, name='login'),        # POST: login API
    path('logout/', views.logout_user, name='logout'),     # GET: logout API
    path('register/', views.registration, name='register'),# POST: registration API
    # path for dealer reviews view
    path(route='get_cars', view=views.get_cars, name ='getcars'),

    # path for add a review view
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
