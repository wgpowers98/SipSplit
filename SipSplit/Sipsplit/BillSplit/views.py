from django.shortcuts import render
from .forms import billEntryForm

# Create your views here.
def editItems(request):
    itemList = [] #goes away every time
    if request.method == 'POST':
        itemName = request.POST.get('itemName')  # Assuming your form has an input with name="username"
        itemAmount = request.POST.get('itemAmount') 
        itemList.append([itemName,itemAmount])
    
    ctx = {}
    ctx['entryForm'] = billEntryForm()
    ctx['itemList'] = itemList

    return render(request,"editItems.html",ctx)

