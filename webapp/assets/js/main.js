let menu = document.querySelector('.menu')
let sidebar = document.querySelector('.sidebar')
let mainContent = document.querySelector('.main--content')

const inbTotalCountVal = document.getElementById("inbTotalCountVal")
const outbTotalCountVal = document.getElementById("outbTotalCountVal")
const safetyTotalCountVal = document.getElementById("safetyTotalCountVal")
const inbSuccessCountPerc = document.getElementById("inbSuccessCountPerc")
const inbSuccessCountVal = document.getElementById("inbSuccessCountVal")
const inbFailureCountVal = document.getElementById("inbFailureCountVal")
const outbSuccessCountPerc = document.getElementById("outbSuccessCountPerc")
const outbSuccessCountVal = document.getElementById("outbSuccessCountVal")
const outbFailureCountVal = document.getElementById("outbFailureCountVal")

const safetyUploadTotalCountVal = document.getElementById("safetyUploadTotalCountVal")
const safetyUploadSuccessCountPerc = document.getElementById("safetyUploadSuccessCountPerc")
const safetyUploadSuccessCountVal = document.getElementById("safetyUploadSuccessCountVal")
const safetyUploadFailureCountVal = document.getElementById("safetyUploadFailureCountVal")




menu.onclick = function() {
    sidebar.classList.toggle('active')
    mainContent.classList.toggle('active')
}


//document.getElementById("inbTotalCountVal").innerHTML = "250";


// Define the API URL
const apiBasePath = 'http://localhost:8082/api/v1/';



// Make a GET request
  

  
 
async function getData(apiUrl) {
    const promise = await fetch(apiUrl);
    return await promise.json();
}

async function setInboundCardValues( ) {
	const selectedValue = document.getElementById("date").value;
	const apiUrl =  apiBasePath + "inbound-overview-stats" + "?daysPeriod=" + selectedValue;
	const result = await getData(apiUrl);
	inbTotalCountVal.innerHTML = result.totalInbCount;
  	inbSuccessCountPerc.innerHTML = result.successPercentage;
  	inbSuccessCountVal.innerHTML = result.successCount;
	inbFailureCountVal.innerHTML = result.failureCount;
}

(async() => {
  await setInboundCardValues() 
})()

async function setOutboundCardValues( ) {
	const selectedValue = document.getElementById("date").value;
	const apiUrl =  apiBasePath + "outbound-overview-stats" + "?daysPeriod=" + selectedValue;
	const result = await getData(apiUrl);
	outbTotalCountVal.innerHTML = result.totalOutbCount;
  	outbSuccessCountPerc.innerHTML = result.successPercentage;
  	outbSuccessCountVal.innerHTML = result.successCount;
	outbFailureCountVal.innerHTML = result.failureCount;
}

(async() => {
  await setOutboundCardValues() 
})()

async function setSafetyCardValues( ) {
	const selectedValue = document.getElementById("date").value;
	const apiUrl =  apiBasePath + "safety-overview-stats" + "?daysPeriod=" + selectedValue;
	const result = await getData(apiUrl);
	safetyUploadTotalCountVal.innerHTML = result.totalSafetyUploadCount;
  	safetyUploadSuccessCountPerc.innerHTML = result.successPercentage;
  	safetyUploadSuccessCountVal.innerHTML = result.successCount;
	safetyUploadFailureCountVal.innerHTML = result.failureCount;
}

(async() => {
  await setSafetyCardValues() 
})()


async function setInboundTableValues( ) {
	const selectedValue = document.getElementById("date").value;
	const apiUrl =  apiBasePath + "inbound-detailed-stats" + "?daysPeriod=" + selectedValue;
	const result = await getData(apiUrl);
	
	document.getElementById("inboundDetailTable").getElementsByTagName('tbody')[0].innerHTML = '';
	const inboundDetailTable = document.getElementById("inboundDetailTable").getElementsByTagName('tbody')[0];
            
	for (var exchangeAction in result) {
		const newRow = inboundDetailTable.insertRow();
        const exchangeActionName = newRow.insertCell(0);
        const totalCount = newRow.insertCell(1);
		const successCount = newRow.insertCell(2);
		const failureCount = newRow.insertCell(3);
		const invalidCount = newRow.insertCell(4);
        exchangeActionName.innerHTML = exchangeAction;
        totalCount.innerHTML = result[exchangeAction].totalCount;
		successCount.innerHTML = result[exchangeAction].successCount;
		failureCount.innerHTML = result[exchangeAction].failureCount;
		invalidCount.innerHTML = result[exchangeAction].invalidCount;
	}

}

(async() => {
  await setInboundTableValues() 
})()

document.getElementById("date").addEventListener('change', async () => {
setInboundCardValues();
setOutboundCardValues();
setSafetyCardValues();
setInboundTableValues();
} );

