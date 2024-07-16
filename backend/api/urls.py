from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name = "note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name = "delete-node"),
    path("arrays/", views.ArrayListCreate.as_view(), name = "array-list"),
    path("arrays/delete/<int:pk>/", views.ArrayDelete.as_view(), name = "delete-array"),
    path("arrays/update/<int:pk>/", views.ArrayUpdate.as_view(), name = "update-array"),
]