const itemList = []; //creates table

function editTableEntry() 
{

}

function removeTableEntry() 
{
    
}

function addTableEntry(newItem) 
{
    itemList.push(newItem);
}

function renderTable(itemList) 
{
    let tableRow = document.createElementNS('tr');
    let tbl = document.getElementById('tbl');
    //let tableCol = document.createElement('td');
    itemList.array.forEach((item,index) => 
    {
      tableRow.innerHTML(`<td>${item}</td>`) 
    });
}



let data = ['Fried Chicken',12];
let data2 = ['Cream Soda',24];

addTableEntry(data);
addTableEntry(data2);
document.getElementById('tbl').innerHTML = itemList;