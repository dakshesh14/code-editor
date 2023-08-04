from django.urls import path

from .consumers import EditorConsumer

websocket_urlpatterns = [
    path(
        'ws/project/<str:project_slug>/directory/<int:director_id>',
        EditorConsumer.as_asgi()
    ),
]
