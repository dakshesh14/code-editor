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

    class Meta:
        model = Directory
        fields = '__all__'


class CreatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Creator
        fields = '__all__'
