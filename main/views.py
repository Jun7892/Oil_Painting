from django.shortcuts import render


# Create your views here.

def main_view(request):
    return render(request, 'testmain.html')


def test_view(request):
    return render(request, 'main.html')