import docker

from django.conf import settings


docker_file = settings.BASE_DIR / 'Dockerfile'


class CodeExecutor:

    """ CodeExecutor class to create a container and execute the code.

    This class is used to create a container and execute the code. 
    It assumes that the image is already built, otherwise it will 
    raise an exception.

    Example:
        >>> code_executor = CodeExecutor()
        >>> code_executor.create_command('main.py', 'print("Hello World")')
        ['bash', '-c', 'echo "print("Hello World")" > main.py && python3 main.py']
        >>> container = code_executor.create_container(command=command)
        >>> container.start()
        >>> container.logs()
        b'Hello World\n'
        >>> container.remove()
    """

    def __init__(self):
        self.docker_client = docker.from_env()
        self.image_name = settings.IMAGE_NAME
        self.container_config = settings.CONTAINER_CONFIG
        self.image = self.get_image()

    def get_image(self):
        """ Get the image from the docker client.

        You can use this method to get the image object from the docker client.
        This function is used in init method to get the image object. 

        Returns:
            docker.models.images.Image: The image object.

        """
        docker_client = self.docker_client

        try:
            image = docker_client.images.get(self.image_name)
        except docker.errors.ImageNotFound:
            raise Exception(
                f'Image {self.image_name} not found. Please build the image first.'
            )

        return image

    def create_container(self, command):
        """ Create a container with the given command.

        You can use this method to create a container with the given command.
        This function will use the image object to create the container.

        Args:
            command (list): The command to be executed in the container.

        Returns:
            docker.models.containers.Container: The container object.

        """
        container = self.docker_client.containers.create(
            image=self.image_name,
            command=command,
            **self.container_config
        )
        return container

    def get_language(self, file_name):
        extension = file_name.split('.')[-1]

        if extension == 'py':
            return 'python'
        elif extension == 'java':
            return 'java'
        elif extension == 'js':
            return 'javascript'
        elif extension == 'cpp':
            return 'cpp'

        return None

    def create_command(self, file_name, code):
        """ Create a command to be executed in the container.

        You can use this method to create a command to be executed in the container.
        This function will use the file name and code to create the command.

        Args:
            file_name (str): The name of the file.
            code (str): The code to be executed.

        Returns:
            list: The command to be executed in the container.

        """
        language = self.get_language(file_name)

        if language is None:
            raise Exception('Invalid file type.')

        code = code.replace('"', '\\"')

        command = list()

        command.append('bash')
        command.append('-c')

        if language == 'python':
            command.append(
                f'echo "{code}" > {file_name} && python3 {file_name}'
            )

        elif language == 'java':
            command.append(
                f'echo "{code}" > Main.java && javac {file_name} && java {file_name.split(".")[0]}'
            )

        elif language == 'javascript':
            command.append(
                f'echo "{code}" > main.js && node main.js'
            )

        elif language == 'cpp':
            command.append(
                f'echo "{code}" > main.cpp && g++ -x c++ main.cpp && ./a.out'
            )

        return command
