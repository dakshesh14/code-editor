from django.urls import path

from project.api.api import (
    ProjectEnvironmentListCreateAPIView,
    ProjectEnvironmentRetrieveUpdateDestroyAPIView,
    ProjectListCreateAPIView,
    ProjectRetrieveUpdateDestroyAPIView,
    DirectoryListCreateAPIView,
    DirectoryRetrieveUpdateDestroyAPIView,
)


urlpatterns = [
    path('project-environments/', ProjectEnvironmentListCreateAPIView.as_view()),
    path(
        'project-environments/<int:pk>/',
        ProjectEnvironmentRetrieveUpdateDestroyAPIView.as_view()
    ),

    path('projects/', ProjectListCreateAPIView.as_view()),
    path('projects/<slug>/', ProjectRetrieveUpdateDestroyAPIView.as_view()),

    path(
        'directories/<slug:project_slug>/',
        DirectoryListCreateAPIView.as_view()
    ),
    path('directories/<int:pk>/', DirectoryRetrieveUpdateDestroyAPIView.as_view()),
]
