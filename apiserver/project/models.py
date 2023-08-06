from django.db import models
from django.utils.text import slugify


# local imports
from utils.string_helper import get_random_name, get_uuid


class Project(models.Model):

    PROJECT_TYPE = (
        ('python', 'Python'),
        ('vanilla_js', 'Vanilla JS'),
        ('react', 'React JS'),
        ('cpp', 'CPP'),
    )

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField()

    project_type = models.CharField(max_length=15, choices=PROJECT_TYPE)

    creator = models.ForeignKey(
        'Creator', on_delete=models.CASCADE, related_name='projects'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name) + '-' + get_uuid()
        super(Project, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Directory(models.Model):

    FILE_TYPE = (
        ('file', 'File'),
        ('directory', 'Directory'),
    )

    name = models.CharField(max_length=100)
    content = models.TextField(null=True, blank=True)

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='directories'
    )

    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, related_name='children', null=True, blank=True
    )

    file_type = models.CharField(
        max_length=15, choices=FILE_TYPE, default='directory'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('name', 'project', 'parent')

    def get_path_name(self):
        if self.parent:
            return self.parent.get_path_name() + '/' + self.name
        else:
            return self.name

    def save(self, *args, **kwargs):
        self.file_type = 'file' if '.' in self.name else 'directory'

        if self.parent and self.parent.file_type == 'file':
            raise ValueError('Cannot create a directory inside a file')

        super(Directory, self).save(*args, **kwargs)

    def __str__(self):
        return self.name + ' - ' + self.project.name


class Creator(models.Model):
    """ Will use user's fingerprint to identify them. 
    Using this method to avoid them needing to login 
    to identify them. Not to be used for authentication
    or in production. """

    name = models.CharField(max_length=255)
    fingerprint = models.CharField(max_length=255, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = get_random_name()
        super(Creator, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class ProjectEnvironment(models.Model):

    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='environments'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.key
