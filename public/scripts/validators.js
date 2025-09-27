//Devloper: William Powers
//Last Modified: 09/27/2025


//---master validators----
export function validateNewEntry(arr) 
{ 
    //test cases
    if (isNotEmptyInArray(arr) && isNumeric(arr[1])) {return true;} //if all test cases pass
   
    return false; //if one of the test cases fail
}
//---------

export function isNotEmptyInArray(arr) //checks if any array values are empty
{
    let notEmpty = true;
    for (let i = 0; i < arr.length; i++) 
        {
            if (arr[i] === '') //may need trim function
            {
                notEmpty = false;
            } 
        }
        return notEmpty;    
}

export function isNumeric(val) //checks if a value is numeric
{
    if (Number(val) === 0) //checks if string converted to number is true
        {
            return(false);
        } 
   return(true);
}

function arrayEmpty(arr) 
{

} 



