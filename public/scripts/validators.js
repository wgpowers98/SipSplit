//Devloper: William Powers
//Last Modified: 09/27/2025


//---master validators----
export function validateNewEntry(arr) 
{ 
    //test cases
    let _isNotEmpty = isNotEmptyInArray(arr);
    let _isNumerc = isNumeric(arr[1]);
    let _isGreaterThan = isGreaterThan(arr[1],0);
    
    console.log(`Entry Valid\nNot Empty: ${_isNotEmpty}\nIs Numeric: ${_isNumerc}\nIs Positive ${_isGreaterThan}`); //displays validation
    if (_isNotEmpty && 
        _isNumerc && 
        _isGreaterThan)  //if all test cases pass
        {
            return true;
        } 
    return false; //if one of the test cases fail
}

export function validateSave(guestVal,arr) //validates entries are good, guests input is correct
{
    let _validateNumberOfGuests = validateNumberOfGuests(guestVal); //checks that guest value is correct
    let _isNotEmptyInArray = isNotEmptyInArray(arr);
    console.log(`Ready for Save\nValid Guest Val: ${_validateNumberOfGuests}\n Valid Array: ${_isNotEmptyInArray}`);
    
    if (_validateNumberOfGuests && 
        _isNotEmptyInArray) 
        {
            return true;
        } else 
            {
                return false;
            }
}
//---validation functions---

//error messages

function validateNumberOfGuests(guestVal) 
{
    let _isNotEmpty = isNotEmpty(guestVal); //checks if value is not empty
    let _isNumerc = isNumeric(guestVal); //checks if the value is numeric
    let _isGreaterThan = isGreaterThan(guestVal,1); //checks if value is positive
    //implement check that it is greater than 1

    console.log(`Guest Input Valid\nNot Empty: ${_isNotEmpty}\nIs Numeric: ${_isNumerc}\nIs Greater Than 1: ${_isGreaterThan}\n`); //displays validation

    if (_isNumerc && _isGreaterThan && _isNotEmpty) {return true} //if tests pass
    return false; //if tests fail
}




function isNotEmpty (val) 
{
    if (val === '') {return false;} //is empty return false
    return true;
}


function isNotEmptyInArray(arr) //checks if any array values are empty (Why return true?)
{
    if (arr.length <= 0) {return false;} //if array has a length of 0 return false and end function 
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

function isNumeric(val) //checks if a value is numeric
{
    if (Number(val) === 0) //checks if string converted to number is true
        {
            return(false);
        } 
   return(true);
}

function isGreaterThan(val,limit) 
{
    if (Number(val) > limit) 
    {   
        return true;
    }
    else 
    {
        return false;
    }
}



