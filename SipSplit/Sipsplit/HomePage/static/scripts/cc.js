const display = document.getElementById('displayTXT');
let itemTable = document.getElementById("displayTable"); //gets refrence to table column

document.getElementById('processBtn').onclick = async () => //called when Process Image is selected
  {
  const fileInput = document.getElementById('imageInput'); //gets refrence to file input
  

  if (!fileInput.files.length) //checks if length is correct
  {
    return;
  }
  
  const file = fileInput.files[0]; //gets refrence to file
  const reader = new FileReader(); //reads file using file reader
  reader.onload = async function(e) 
  {
    display.style.display = 'block';
    const worker = await Tesseract.createWorker('eng');
    const ret = await worker.recognize(e.target.result);
    display.style.display = 'none';
    formatText(ret.data.text);
    await worker.terminate();
  };
  reader.readAsDataURL(file);
};

function formatText(txt) //process to split the text into lines and parse the text into readible items and their amounts
{
  itemTable.innerHTML = ''; //clears current table
  let billTotal = 0; //initiaized bill total

  let numberOfGuests = parseFloat(document.getElementById('numberOfGuests').value); //gets number of guests and makes float
  const lines  = txt.split('\n');
  console.log(lines);
  

  for (let i = 0; i < lines.length; i++) //loops each line of the recept
    {
      let dollarSearch = lines[i].search('\\$')
      if (dollarSearch != -1) 
      {
        
        
        if (locEndOfRecept(lines[i])) {break;} //once subtotal is found on line, breaks loop
          
          let itemEntry; //creates item entry variable

          if (!isNaN(lines[i].slice(0,1))) //checks if is numeric
          {
            
            itemEntry = lines[i].slice(2,dollarSearch); //if so, removes quantity line
          } 
          else 
          {
            itemEntry = lines[i].slice(0,dollarSearch); //includes quality if beggining is not number
          }
          addTableEntry("$" + lines[i].slice(dollarSearch+1,lines[i].length),itemEntry); //calls function to add new row to able

          billTotal = billTotal + parseFloat(lines[i].slice(dollarSearch+1, lines[i].length)); //adds the amount for each item
      }
    }
    console.log("Total $"+ billTotal);
    addTableEntry('Total Amount',`$${Math.round(billTotal*100)/100}`);
    addTableEntry(`Per Guest (${numberOfGuests})`,`$${Math.round((billTotal/numberOfGuests)*100)/100} per guest`);
    

}

  function addTableEntry(itemEntry,priceEntry) //function to add new row to displayed table
  {
    let newRow = document.createElement('tr'); //new row in table
    newRow.classList.add("table-dark"); //adds class

    let itemCol = document.createElement('td'); //new column in row
    itemCol.classList.add("table-dark"); //adds class

    let priceCol = document.createElement('td'); //new column in row
    priceCol.classList.add("table-dark"); //adds class

    itemCol.innerText = itemEntry;
    priceCol.innerText = priceEntry;
    newRow.appendChild(itemCol);
    newRow.appendChild(priceCol);
    itemTable.appendChild(newRow);
  }


  //function used to identify end of entries on recept
  function locEndOfRecept(line) 
  {
    //keyswords to tell end of recept
    const keywords = 
    ["SUBTOTAL",
      "TOTAL"]; 
    
    
    const regex = new RegExp(keywords.join("|"), "gi"); // 'g' for global, 'i' for case-insensitive
    const matches = line.match(regex); //searches list

    if (matches) 
      {
        return true;
      }
      else 
      {
        return (false);
      }
    }