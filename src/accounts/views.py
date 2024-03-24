from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

def home_view(request):
    return render(request, 'posts/main.html')


def signup_view(request):
    if request.user.is_authenticated:
        return redirect('posts:main-board')
    
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('posts:main-board')
    else:
        form = UserCreationForm()
    context = {
    'form': form
    }
    return render (request, 'accounts/signup.html', context)
    
def logout_view(request):
    logout(request)
    return redirect('accounts:login')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('posts:main-board')
    else:
        form = AuthenticationForm()
    context = {
    'form': form
    }
    return render(request, 'accounts/main.html', context)