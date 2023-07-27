from django.contrib import admin

from .models import (
    Project,
    Creator,
    Directory,
    ProjectEnvironment,
)


class ProjectEnvironmentInline(admin.TabularInline):
    model = ProjectEnvironment
    extra = 1


class DirectoryInline(admin.TabularInline):
    model = Directory
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    inlines = [
        ProjectEnvironmentInline,
        DirectoryInline,
    ]


@admin.register(Creator)
class CreatorAdmin(admin.ModelAdmin):
    pass
