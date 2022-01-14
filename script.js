// Global variables //
var apiKey='24994d827b638b368b5fc9f37b2f6ae7';

// For current temperature //
var currentTempEl=document.getElementById("temp");
var currentWindEl=document.getElementById("wind");
var currentHumidityEl=document.getElementById("humidity");
var currentUvEl=document.getElementById("uv");
var dateToday=document.getElementById("dateToday");

// For each day of 5-day Forecast //
var icon1=document.getElementById("icon-1");
var temp1=document.getElementById("temp-1");
var wind1=document.getElementById("wind-1");
var humidity1=document.getElementById("humidity-1");

var icon2=document.getElementById("icon-2");
var temp2=document.getElementById("temp-2");
var wind2=document.getElementById("wind-2");
var humidity2=document.getElementById("humidity-2");

var icon3=document.getElementById("icon-3");
var temp3=document.getElementById("temp-3");
var wind3=document.getElementById("wind-3");
var humidity3=document.getElementById("humidity-3");

var icon4=document.getElementById("icon-4");
var temp4=document.getElementById("temp-4");
var wind4=document.getElementById("wind-4");
var humidity4=document.getElementById("humidity-4");

var icon5=document.getElementById("icon-5");
var temp5=document.getElementById("temp-5");
var wind5=document.getElementById("wind-5");
var humidity5=document.getElementById("humidity-5");

var historyButtons=document.getElementById("cities");
var cityTitle=document.getElementById("cityTitle");

// Date //


function directGeocode(cityName) {
  var dgApiCall=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
  console.log(dgApiCall);
        fetch(dgApiCall)
        .then(response => response.json())
        .then (data =>{
          console.log(data)
          search(data[0].lat,data[0].lon,cityName)
        })
        .catch(error => console.error(error));
}

function search(lat,lon,cityName) {
  var apiCall=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={part}&appid=${apiKey}`
    fetch(apiCall)
          .then(response => response.json())
          .then(data =>{
            console.log(data)

            currentTempEl.textContent=data.current.temp, 
            currentWindEl.textContent=data.current.wind_speed,
            currentHumidityEl.textContent=data.current.humidity;
            currentUvEl.textContent=data.current.uvi;

            icon1.src="http://openweathermap.org/img/wn/"+data.daily[0].weather[0].icon+"@2x.png";
            temp1.textContent=data.daily[0].temp.day;
            wind1.textContent=data.daily[0].wind_speed;
            humidity1.textContent=data.daily[0].humidity;
            
            icon2.src="http://openweathermap.org/img/wn/"+data.daily[1].weather[0].icon+"@2x.png";
            temp2.textContent=data.daily[1].temp.day;
            wind2.textContent=data.daily[1].wind_speed;
            humidity2.textContent=data.daily[1].humidity;

            icon3.src="http://openweathermap.org/img/wn/"+data.daily[2].weather[0].icon+"@2x.png";
            temp3.textContent=data.daily[2].temp.day;
            wind3.textContent=data.daily[2].wind_speed;
            humidity3.textContent=data.daily[2].humidity;

            icon4.src="http://openweathermap.org/img/wn/"+data.daily[3].weather[0].icon+"@2x.png";
            temp4.textContent=data.daily[3].temp.day;
            wind4.textContent=data.daily[3].wind_speed;
            humidity4.textContent=data.daily[3].humidity;

            icon5.src="http://openweathermap.org/img/wn/"+data.daily[4].weather[0].icon+"@2x.png";
            temp5.textContent=data.daily[4].temp.day;
            wind5.textContent=data.daily[4].wind_speed;
            humidity5.textContent=data.daily[4].humidity;

          })
          .catch(error => console.error(error));
      saveSearches(cityName);
      displaySearches();
}

function saveSearches(cityName) {
  var historyArray=JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (historyArray.includes(cityName)) {
    return;
  }
  historyArray.push(cityName);
  localStorage.setItem("searchHistory", JSON.stringify(historyArray));
}

function displaySearches() {
  historyButtons.innerHTML="";
  var historyArray=JSON.parse(localStorage.getItem("searchHistory")) || [];
  for (let index = 0; index < historyArray.length; index++) {
    const cityName = historyArray[index];
    const button=document.createElement("button");
    
    // const cityHeader=document.createElement("header");
    // cityHeader.textContent=cityName;
    // cityTitle.append(cityHeader);

    button.textContent=cityName;
    historyButtons.append(button);
  }
}

document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var cityName=document.getElementById("searchInput").value;
  directGeocode(cityName);
});

historyButtons.addEventListener("click", function(event) {
  var cityName=event.target.innerText;
  directGeocode(cityName);
})

displaySearches();