from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from project.api.serializers import (
    ProjectEnvironmentSerializer,
    ProjectSerializer,
    DirectorySerializer,
)

from project.models import (
    Project,
    Directory,
    Creator,
    ProjectEnvironment,
)

from utils.code_executor import CodeExecutor
from utils.string_helper import (
    get_cpp_template,
    get_react_code_content,
    create_react_body,
)


class ProjectEnvironmentListCreateAPIView(generics.ListCreateAPIView):
    queryset = ProjectEnvironment.objects.all()
    serializer_class = ProjectEnvironmentSerializer


class ProjectEnvironmentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProjectEnvironment.objects.all()
    serializer_class = ProjectEnvironmentSerializer


class ProjectListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):

        creator = self.request.creator

        project = serializer.save(creator=creator)

        project_type = self.request.data.get('project_type', None)

        if project_type is None:
            return Response({
                'message': 'Please provide a project type.'
            }, status=status.HTTP_400_BAD_REQUEST)

        if project_type == 'python':
            Directory.objects.create(
                name='main.py',
                content="print('Hello World!')",
                project=project,
            )

        elif project_type == 'vanilla_js':
            Directory.objects.create(
                name='index.js',
                content="console.log('Hello World!')",
                project=project,
            )

        elif project_type == 'cpp':
            Directory.objects.create(
                name='main.cpp',
                content=get_cpp_template(),
                project=project,
            )

        elif project_type == 'react':
            code_content = get_react_code_content()

            Directory.objects.create(
                name='App.jsx',
                content=code_content.get('jsx', ''),
                project=project,
            )
            Directory.objects.create(
                name='App.css',
                content=code_content.get('css', ''),
                project=project,
            )

        else:
            return Response({
                'message': 'Invalid project type.'
            }, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        creator = self.request.creator
        return Project.objects.filter(creator=creator)


class ProjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    lookup_field = 'slug'


class DirectoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer

    def get_queryset(self):

        project_slug = self.kwargs.get('project_slug', None)

        if project_slug is None:
            raise ValidationError({
                'message': 'Please provide a project slug.'
            })

        directories = Directory.objects.filter(
            project__slug=project_slug,
        )

        directories = sorted(
            directories,
            key=lambda directory: directory.file_type == 'directory',
            reverse=True,
        )

        return directories

    def perform_create(self, serializer):

        project_slug = self.kwargs.get('project_slug', None)

        if project_slug is None:
            raise ValidationError({
                'message': 'Please provide a project slug.'
            })

        project = Project.objects.get(slug=project_slug)

        serializer.save(project=project)


class DirectoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer


class ProjectRunAPIView(APIView):
    def post(self, _, project_slug, directory_pk):
        code_executor = CodeExecutor()

        project = Project.objects.get(slug=project_slug)
        directory = Directory.objects.get(pk=directory_pk)

        command = code_executor.create_command(
            directory,
            project.directories.all(),
        )

        container = code_executor.create_container(command=command)

        container.start()
        container.wait()

        logs = container.logs().decode('utf-8')

        container.stop()
        container.remove()

        return Response({
            'logs': logs
        }, status=status.HTTP_200_OK)


class ProjectBrowserIFrameCodeAPIView(APIView):
    def get(self, _, project_slug):
        project = Project.objects.get(slug=project_slug)

        code = create_react_body(
            project.directories.filter(name__endswith='.css'),
            project.directories.filter(name__regex=r'.*\.(jsx|js)$'),
        )

        return Response({
            'code': code
        }, status=status.HTTP_200_OK)
