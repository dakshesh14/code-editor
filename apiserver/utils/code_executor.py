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

    def format_code(self, code):
        """ Format the code to be executed in the container.

        This function is used to parse quotes in the code.

        Args:
            code (str): The code to be executed in the container.

        Returns:
            str: The formatted code.

        """
        return code.replace('"', '\\"') if code else ''

    def create_command(self, entry_file, directories):
        """ Create a command to be executed in the container.

        You can use this method to create a command to be executed in the container.
        This function will use the file name and code to create the command.

        Args:
            entry_file (dict): The entry file object.
            directories (list): The list of files and directories.

        Returns:
            list: The command to be executed in the container.

        """

        command = list()

        command.append('bash')
        command.append('-c')

        command.append('')

        for file in directories:
            file_name = file.name
            code = file.content

            if file.file_type == 'directory':
                command[-1] = command[-1] + f'mkdir {file_name} && '
            else:
                language = self.get_language(file_name)

                if language is None:
                    raise Exception(f'Invalid file type: {file_name}')

                code = self.format_code(code)

                command[-1] = command[-1] + \
                    f'echo "{code}" > {file.get_path_name()} && '

        entry_file_language = self.get_language(entry_file.name)

        if entry_file_language is None:
            raise Exception(f'Invalid file type: {entry_file.get_path_name()}')

        elif entry_file_language == 'python':
            command[-1] = f'{command[-1]} python3 {entry_file.get_path_name()}'

        elif entry_file_language == 'java':
            command[-1] = f'{command[-1]} javac {entry_file.name} && java {entry_file.get_path_name().split(".")[0]}'

        elif entry_file_language == 'javascript':
            command[-1] = f'{command[-1]} node {entry_file.get_path_name()}'

        elif entry_file_language == 'cpp':
            command[-1] = f'{command[-1]} g++ {entry_file.get_path_name()} && ./a.out'

        return command
