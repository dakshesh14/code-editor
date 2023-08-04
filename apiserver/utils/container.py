import docker

from django.conf import settings


docker_file = settings.BASE_DIR / 'Dockerfile'


class Container:
    def __init__(self):
        self.docker_client = docker.from_env()
        self.image_name = settings.IMAGE_NAME
        self.container_config = settings.CONTAINER_CONFIG
        self.image = self.get_image()

    def get_image(self):
        docker_client = self.docker_client

        try:
            image = docker_client.images.get(self.image_name)
        except docker.errors.ImageNotFound:
            raise Exception(
                f'Image {self.image_name} not found. Please build the image first.'
            )

        return image

    def create_container(self, command):
        container = self.docker_client.containers.create(
            image=self.image_name,
            command=command,
            **self.container_config
        )
        return container
