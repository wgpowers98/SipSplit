//Devloper: William Powers
//Last Modified: 09/23/2025

import { validateNewEntry,validateSave} from './validators.js';

let addButton = document.getElementById('submitButton');
let itemTable = document.getElementById('itemTable');
let dataTable = []
let itemName = document.getElementById('itemName');
let itemPrice = document.getElementById('itemPrice');
let itemID = 0;
let itemSum = document.getElementById('itemSum');
let completeButton = document.getElementById('completeButton');
let numberOfGuests = document.getElementById('numberOfGuests');

localStorage.clear(); //clears previously saved local storage

function addItem() 
{
    let newEntry = [itemName.value,itemPrice.value,itemID] //creates variable to hold new record
    newEntry[1] = Math.round(newEntry[1] * 100) / 100; //rounds price entry value to second digit
    if (validateNewEntry(newEntry))
    {
        completeButton.classList.remove('disabled'); //enables button after entry passes validation
        dataTable.push(newEntry); //adds new entry to data table
        itemID++; //increments item id
        renderTable(dataTable); //re-renders table

        setTotal(sumItems(dataTable)); //recalcuates item sum

        itemName.value = ''; //resets name field
        itemPrice.value = ''; //resets price field
        itemName.focus(); //rests user cursor to item name
    } else {alert('Invalid Entry');} //error message

    
}

function removeItem(itemID) 
{
    resetArrayIds(); //rests array ids
    let index = dataTable[itemID][2];
    if (index > -1) //checks if array element exists
        {
            dataTable.splice(index,1); //removes one element found at index
        } else {
            console.log("Error");
        }    
    renderTable(dataTable);
    setTotal(sumItems(dataTable)); //recalcuates item sum
    if (dataTable.length === 0) {completeButton.classList.add('disabled');} //disables button if there are no items listed
}

function resetArrayIds() //corrects array id list
{
    for (let Iterate = 0; Iterate < dataTable.length; Iterate++) 
        {
            dataTable[Iterate][2] = Iterate; //resets each array id
        }
}

function sumItems() 
{
    let sumValue = 0;
    for (let Iterate = 0; Iterate < dataTable.length; Iterate++) 
        {
            sumValue += Number(dataTable[Iterate][1]);
        }
    return(sumValue); //returns of items entered
}


//********Page Interaction Functions********

    function saveTable() //saves current table in local storage
    {
    if (validateSave(numberOfGuests.value,dataTable)) //checks if data is valid
        {
            console.log('Saving');
            let billTotal = sumItems(dataTable);
            // save to localStorage (synchronous)
            try {
                localStorage.setItem('dataTable', JSON.stringify(dataTable)); //saves in local storage
                //sumItems()
                if (numberOfGuests) {
                    localStorage.setItem('numberOfGuests', numberOfGuests.value); //saves number of guests (interacts slightly)
                    localStorage.setItem('amountPerGuest', billTotal / Number(numberOfGuests.value)); //saves bill total divided by number of guests
                } else {
                    console.warn('numberOfGuests element not found; skipping numberOfGuests/amountPerGuest storage');
                }
                
                localStorage.setItem('billTotal', billTotal); //saves bill total

                console.log('Saved to localStorage', { billTotal: billTotal, guests: numberOfGuests ? numberOfGuests.value : null });
            } catch (e) {
                console.error('Failed to save to localStorage', e);
            }

            // Redirect to summary page. Use assign (creates history entry) or replace (replaces current entry).
            setTimeout(() => {
                window.location.assign('readItems.html'); //redirects to summary page
            }, 50);
        } else {alert('Form Contains Invalid Data');}
    }

    

function setTotal(itemTotal) //updates value displayed for total
{
    itemSum.innerHTML = `$${ Math.round(itemTotal * 100) / 100}`;
}

function renderTable(dataTable) 
{
    
    
    itemTable.innerHTML = ""; //clears current table contents

    for (let Iterate = 0; Iterate < dataTable.length; Iterate++) 
        {
            let tableRow = document.createElement('tr'); //creates new row
            let itemCol = document.createElement('td'); //creates row to hold item
            let priceCol = document.createElement('td'); //creates row to hold price
            let removeRow = document.createElement('td'); //creates row for remove button

            let removeButton = document.createElement('button');

            itemCol.innerHTML =  dataTable[Iterate][0];
            priceCol.innerHTML =  `$${dataTable[Iterate][1]}`;
            removeButton.innerHTML = 'Remove Item';

            removeButton.setAttribute('rowID',Iterate); //sets rowId attribute to element
            removeButton.classList.add('removeButton'); 
            removeButton.classList.add('btn'); 
            removeButton.classList.add('btn-secondary'); 

            
            tableRow.appendChild(itemCol); //appends item name to row
            tableRow.appendChild(priceCol); //apends price to row
            
            removeRow.appendChild(removeButton)
            tableRow.appendChild(removeRow);
            itemTable.appendChild(tableRow); //apends row to table
        }
}




//********Event Triggers********
// Ensure DOM elements exist before attaching listeners (robust if script loads early)

if (addButton) {
    addButton.addEventListener('click', addItem); //adds listen for when add item button is clicked
} else {
    console.warn('addButton element not found');
}

if (completeButton) {
    completeButton.addEventListener('click', saveTable); //calls save table function when complete button is clicked
} else {
    console.warn('completeButton element not found');
}

if (itemTable) {
    itemTable.addEventListener('click', function(event) //adds general event listener for table
    { 
      if (event.target && event.target.classList.contains('removeButton')) //checks of clicked button has the class removeButton
        {
        removeItem(event.target.getAttribute('rowID')); //calls remove function
        }
    });
} else {
    console.warn('itemTable element not found');
}

numberOfGuests.addEventListener('input', function(event) //checks if number of guests is a valid entry 
{
    if(validateSave(numberOfGuests.value,dataTable)) 
        {
            completeButton.classList.remove('disabled'); //enables button if guest number is valid
        } 
        else 
        {
            completeButton.classList.add('disabled'); //disbales button if guest number is invalid
        }
}); //calls when number of guests changes
