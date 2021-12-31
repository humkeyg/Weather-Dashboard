var apiCall=`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={24994d827b638b368b5fc9f37b2f6ae7}`;
console.log(apiCall);
var apiKey='24994d827b638b368b5fc9f37b2f6ae7';



function search() {
    document.getElementById("searchBtn").addEventListener("click", function(event) {
        fetch(apiCall)
        .then(response => response.json())
        .then(data => console.log(data));
    });
    then {//call API}
    populate div id("currentWeather") with current weather;
        city, date, emoji,
        temp, wind, humidity, uv index(color)
    populate div id("futureWeather") with weather forecast;
};

function uvIndex() {
    if (value < 3 ) { //values 1,2 
        document.getElementById('id').style.backgroundColor='green'
    } else if (value > 2 && value < 6) { //values 3,4,5
        document.getElementById('id').style.backgroundColor='yellow'
    } else if (value > 5 && value < 8) { //values 6,7
        document.getElementById('id').style.backgroundColor='orange'
    } else if (value > 7 && value < 11) { //values 8,9,10
        document.getElementById('id').style.backgroundColor='red'
    } else { //values 11+
        document.getElementById('id').style.backgroundColor='purple'
    }
};

search();
uvIndex();