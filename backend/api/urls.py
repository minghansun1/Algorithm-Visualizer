from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name = "note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name = "delete-node"),
    path("arrays/", views.ArrayListCreate.as_view(), name = "arrays"),
    path("arrays/<int:pk>/", views.ArrayGet.as_view(), name = "get-array"),
    path("arrays/delete/<int:pk>/", views.ArrayDelete.as_view(), name = "delete-array"),
    path("arrays/update/<int:pk>/", views.ArrayUpdate.as_view(), name = "update-array"),
    path("arrays/mergesort/<int:pk>/", views.MergeSort.as_view(), name = "mergesort-array"),
    path("graphs/", views.GraphListCreate.as_view(), name = "graphs"),
    path("graphs/<int:pk>/", views.GraphGet.as_view(), name = "get-graph"),
    path("graphs/delete/<int:pk>/", views.GraphDelete.as_view(), name = "delete-graph"),
    path("graphs/update/<int:pk>/", views.GraphUpdate.as_view(), name = "update-graph"),
    path("graphs/<int:pk>/vertices/", views.VertexListCreate.as_view(), name = "vertices"),
    path("graphs/<int:pk>/vertices/<int:vertex_id>/", views.VertexGet.as_view(), name = "get-vertex"),
    path("graphs/<int:pk>/vertices/delete/<int:vertex_id>/", views.VertexDelete.as_view(), name = "delete-vertex"),
    path("graphs/<int:pk>/vertices/update/<int:vertex_id>/", views.VertexUpdate.as_view(), name = "update-vertex"),
    path("graphs/<int:pk>/edges/", views.EdgeListCreate.as_view(), name = "edges"),
    path("graphs/<int:pk>/edges/<int:edge_id>/", views.EdgeGet.as_view(), name = "get-edge"),
    path("graphs/<int:pk>/edges/delete/<int:edge_id>/", views.EdgeDelete.as_view(), name = "delete-edge"),
    path("graphs/<int:pk>/edges/update/<int:edge_id>/", views.EdgeUpdate.as_view(), name = "update-edge"),
]