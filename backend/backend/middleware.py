class LogRequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Gelen isteği loglayın
        print(f"Method: {request.method}, Path: {request.path}")
        response = self.get_response(request)
        return response
