from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

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

        finger_print = self.request.COOKIES.get('finger_print', None)

        if finger_print is None:
            # of course, doing this in production is not a good idea
            raise AuthenticationFailed({
                'message': 'Please provide a finger print.'
            })

        creator, _ = Creator.objects.get_or_create(
            finger_print=finger_print
        )

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

        finger_print = self.request.COOKIES.get('finger_print', None)

        if finger_print is None:
            raise AuthenticationFailed({
                'message': 'Please provide a finger print.'
            })

        creator, _ = Creator.objects.get_or_create(
            finger_print=finger_print
        )

        return Project.objects.filter(creator=creator)


class ProjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    lookup_field = 'slug'


class DirectoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer


class DirectoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer
