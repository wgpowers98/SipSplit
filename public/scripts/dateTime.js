let dateElement = document.getElementById("currentDate");
let timeElement = document.getElementById("currentTime");



const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const dd = String(today.getDate()).padStart(2, '0');




const now = new Date();




dateElement.innerText = `${yyyy}/${mm}/${dd}`;
timeElement.innerText = `${now.toLocaleTimeString()}`;