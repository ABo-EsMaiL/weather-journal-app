/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',&appid=d725d4d8e5129e02ef33773a1e315a84&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// let newDate = d.toDateString();

// EVENT LISTENER TO ADD FUNCTION TO BUTTON
document.getElementById('generate').addEventListener('click',performAction)

// FUNCTION CALLED BY LISTENER
function performAction(e){
    const zipFact =  document.getElementById('zip').value;
    const feeling =  document.getElementById('feelings').value;
    getWeather(baseURL,zipFact, apiKey)
    // New Syntax!
    .then(function(data){
        console.log(data);
        // Add data
        postData('/add', {state:data.name, date:newDate, temp:data.main.temp , content:feeling});
        // We can do this because of Async!
        updateUI()
    })
}

// FUNCTION TO GET WEB API DATA
const getWeather = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key);
        try {
            const data = await res.json();
            console.log(data)
            // 1. We can do something with our returned data here-- like chain promises!
            return data
        }  catch(error) {
            // appropriately handle the error
            console.log("error", error);
        }
}

// FUNCTION TO POST API DATA
const postData= async (url='',data={})=>{
    const response=await fetch(url ,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData=await response.json();
        console.log(newData)
        return newData
    }catch(error){
        console.log('error',error);
    }
}

// FUNCTION TO GET PROJECT DATA
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('state').innerHTML = `State: ${allData[0].state}`;
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData[0].temp)+ ' degrees'}`;
        document.getElementById('content').innerHTML = `Feeling: ${allData[0].content}`;
    }catch(error){
        console.log("error", error);
    }
}