let menu = document.querySelector('.menu')
let sidebar = document.querySelector('.sidebar')
let mainContent = document.querySelector('.main--content')

const inbTotalCountVal = document.getElementById("inbTotalCountVal")
const outbTotalCountVal = document.getElementById("outbTotalCountVal")
const safetyTotalCountVal = document.getElementById("safetyTotalCountVal")



menu.onclick = function() {
    sidebar.classList.toggle('active')
    mainContent.classList.toggle('active')
}


//document.getElementById("inbTotalCountVal").innerHTML = "250";


// Define the API URL
const apiBasePath = 'http://localhost:8082/values';



// Make a GET request
  

  
 
async function getData(apiUrl) {
    const promise = await fetch(apiUrl);
    return await promise.json();
}

async function setCardValues( ) {
	const selectedValue = document.getElementById("date").value;
	const apiUrl =  apiBasePath + "?days=" + selectedValue;
	const result = await getData(apiUrl);
	inbTotalCountVal.innerHTML = result.totalInbCount;
  	outbTotalCountVal.innerHTML = result.totalOutbCount;
  	safetyTotalCountVal.innerHTML = result.totalSafetyCount;
}

(async() => {
  await setCardValues() 
})()

document.getElementById("date").addEventListener('change', async () => {
setCardValues();
} );

