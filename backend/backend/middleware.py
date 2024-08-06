from django.utils.deprecation import MiddlewareMixin

class JWTCookieMiddleware(MiddlewareMixin):
    def process_request(self, request):
        sigs_cookie = request.COOKIES.get('sigs_cookie')
        if sigs_cookie:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {sigs_cookie}'