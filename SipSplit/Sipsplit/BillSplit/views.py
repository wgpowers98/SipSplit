from django.shortcuts import render
from .forms import billEntryForm

# Create your views here.
def editItems(request):
    return render(request,"editItems.html")

def displayItems(request):
    return render(request,"readItems.html")
