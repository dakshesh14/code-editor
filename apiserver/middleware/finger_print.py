from django.http import HttpResponse

from project.models import Creator

from utils.string_helper import get_random_name


class CustomHttpResponse(HttpResponse):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.creator = None


class FingerPrintAuthenticationMiddleWare:
    def __init__(self, get_response):
        self.get_response = get_response
        self.creator = None

    def __call__(self, request):
        auth = request.headers.get("Authorization", None)
        if auth is None:
            response = self.get_response(request)
            return response

        fingerprint = auth.split(" ")[1]

        try:
            creator = Creator.objects.get(fingerprint=fingerprint)
        except Creator.DoesNotExist:
            creator = Creator.objects.create(
                name=get_random_name(), fingerprint=fingerprint
            )

        request.creator = creator

        response = self.get_response(request)

        return response
