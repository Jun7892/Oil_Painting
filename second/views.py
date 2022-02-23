from django.shortcuts import render

def second_view(request):
    return render(request, 'second.html')