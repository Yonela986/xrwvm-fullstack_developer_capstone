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
    path(route='get_dealers', view=views.get_dealerships, name='get_dealers'),
    path(route='get_dealers/<str:state>', view=views.get_dealerships, name='get_dealers_by_state'),
    path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),
    path(route='reviews/dealer/<int:dealer_id>', view=views.get_dealer_reviews, name='dealer_details'),

    # path for add a review view
    path(route='add_review', view=views.add_review, name='add_review'),

    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
