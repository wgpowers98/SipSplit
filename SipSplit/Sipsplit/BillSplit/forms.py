from django import forms

class billEntryForm(forms.Form):
    itemName = forms.CharField(max_length=50)
    itemAmount = forms.DecimalField()