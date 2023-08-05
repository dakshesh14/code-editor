from rest_framework import serializers

from project.models import (
    Project,
    Directory,
    Creator,
    ProjectEnvironment,
)


class ProjectEnvironmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProjectEnvironment
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'
        extra_kwargs = {
            'creator': {'required': False},
            'slug': {'required': False},
        }


class DirectorySerializer(serializers.ModelSerializer):
    path_name = serializers.SerializerMethodField()

    class Meta:
        model = Directory
        fields = '__all__'
        extra_kwargs = {
            'project': {'required': False},
            'parent': {'required': False},
        }

    def get_path_name(self, obj):
        return obj.get_path_name()


class CreatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Creator
        fields = '__all__'
