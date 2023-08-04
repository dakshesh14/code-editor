from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async


from project.models import Directory, Project
from project.api.serializers import DirectorySerializer


class EditorConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def get_directory(self, director_id):
        directory = Directory.objects.get(id=director_id)
        return directory

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['project_slug'] + \
            '_' + str(self.scope['url_route']['kwargs']['director_id'])
        self.room_group_name = 'editor_%s' % self.room_name

        directory = await self.get_directory(
            self.scope['url_route']['kwargs']['director_id']
        )

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, bytes_data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'editor_message',
                'bytes_data': bytes_data
            }
        )

    async def editor_message(self, event):
        bytes_data = event['bytes_data']

        # Send message to WebSocket
        await self.send(bytes_data=bytes_data)
