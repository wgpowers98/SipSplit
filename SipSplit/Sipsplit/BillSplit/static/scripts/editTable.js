//Devloper: William Powers
//Last Modified: 09/22/2025

let addButton = document.getElementById('submitButton');
let itemTable = document.getElementById('itemTable');
let dataTable = []
let itemName = document.getElementById('itemName');
let itemPrice = document.getElementById('itemPrice');
let itemID = 0;
let itemSum = document.getElementById('itemSum');


function addItem() 
{
    let newEntry = [itemName.value,itemPrice.value,itemID] //creates variable to hold new record
    dataTable.push(newEntry); //adds new entry to data table
    itemID++; //increments item id
    renderTable(dataTable); //re-renders table
    sumItems(); //recalcuates item sum
    itemName.value = ''; //resets name field
    itemPrice.value = 0; //resets price field
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
    sumItems(); //recalcuates item sum
}

function resetArrayIds() //corrects array id list
{
    for (let i = 0; i < dataTable.length; i++) 
        {
            dataTable[i][2] = i; //resets each array id
        }
}

function sumItems() 
{
    let sumValue = 0;
    for (let i = 0; i < dataTable.length; i++) 
        {
            sumValue += Number(dataTable[i][1]);
        }
    itemSum.innerHTML = `Total: $${sumValue}`;
}

function renderTable(dataTable) 
{
    
    
    itemTable.innerHTML = ""; //clears current table contents

    for (let i = 0; i < dataTable.length; i++) 
        {
            let tableRow = document.createElement('tr'); //creates new row
            let itemCol = document.createElement('td'); //creates row to hold item
            let priceCol = document.createElement('td'); //creates row to hold price
            
            let removeButton = document.createElement('button');

            itemCol.innerHTML =  dataTable[i][0];
            priceCol.innerHTML =  dataTable[i][1];
            removeButton.innerHTML = 'Remove Item';

            removeButton.setAttribute('rowID',i); //sets rowId attribute to element
            removeButton.classList.add('removeButton'); 
            
            tableRow.appendChild(itemCol); //appends item name to row
            tableRow.appendChild(priceCol); //apends price to row
            tableRow.appendChild(removeButton);
            itemTable.appendChild(tableRow); //apends row to table
        }
}


addButton.addEventListener('click',addItem) //adds listen for when add item button is clicked

itemTable.addEventListener('click', function(event) //adds general event listener for table
{ 
  if (event.target && event.target.classList.contains('removeButton')) //checks of clicked button has the class removeButton
    {
    removeItem(event.target.getAttribute('rowID')); //calls remove function
    }
});