from rest_framework import generics, status
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

from utils.string_helper import get_cpp_template


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
                name='index.html',
                content="console.log('Hello World!')",
                project=project,
            )

        elif project_type == 'cpp':
            Directory.objects.create(
                name='main.cpp',
                content=get_cpp_template(),
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
            parent=None,
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
