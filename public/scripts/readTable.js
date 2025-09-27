//Devloper: William Powers
//Last Modified: 09/23/2025

let numberOfGuests = document.getElementById('numberOfGuests');
let amountPerGuest = document.getElementById('amountPerGuest');
let totalAmount = document.getElementById('totalAmount');
let restaurantInformation = document.getElementById('restaurantInformation');



numberOfGuests.innerHTML = `Number of friends ${localStorage.getItem('numberOfGuests')}`;
amountPerGuest.innerHTML = `Payment per friend $${Math.round(localStorage.getItem('amountPerGuest') * 100) / 100}`;
totalAmount.innerHTML = `Amount $${Math.round(localStorage.getItem('billTotal') * 100) / 100}`;


renderTable(JSON.parse(localStorage.getItem('dataTable') || '[]'),localStorage.getItem('numberOfGuests'));



restaurantInformation.innerHTML = `Dinner at ${localStorage.getItem('restaurantName')} | ${localStorage.getItem('restaurantTime')}`;

function renderTable(dataTable,numberOfGuests) 
{
    itemTable.innerHTML = ""; //clears current table contents
    for (let i = 0; i < dataTable.length; i++) 
        {
            let tableRow = document.createElement('tr'); //creates new row
            let itemCol = document.createElement('td'); //creates row to hold item
            let priceCol = document.createElement('td'); //creates row to hold price
            itemCol.innerHTML =  dataTable[i][0];
            priceCol.innerHTML =  `$${dataTable[i][1]}`;
            
            tableRow.appendChild(itemCol); //appends item name to row
            tableRow.appendChild(priceCol); //apends price to row
            itemTable.appendChild(tableRow); //apends row to table
        }
        
}

