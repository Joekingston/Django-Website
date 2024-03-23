from django import forms
from .models import Profile

class ProfileForms(forms.ModelForm):
    avatar = forms.ImageField(widget=forms.FileInput(attrs={'class': 'form-control-file'}))
    bio = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 8}))
    
    class Meta:
        model = Profile
        fields = ("bio", "avatar")