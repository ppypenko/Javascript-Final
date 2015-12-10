var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var request = new XMLHttpRequest();

//weatherApp h1
function createElements() {


    var city = document.createElement("H1")
    var c = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(city);
    city.appendChild(c);
    city.setAttribute('id', 'city');

    var weather = document.createElement("H1")
    var w = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(weather);
    weather.appendChild(w);
    weather.setAttribute('id', 'weather');

    var temp = document.createElement("H1")
    var t = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(temp);
    temp.appendChild(t);
    temp.setAttribute('id', 'temp');
}


function getCurrentDate() {
    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    document.getElementById("headerDate").innerHTML = today;
}

function loadData() {

    var cityinput = 'salt lake city';
    var regioninput = 'ut';

    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityinput + ',' + regioninput + '&APPID=ae41cf3cccc31ba9eb00adba1ac0e932');
    request.onload = loadComplete;
    request.send();
}


function loadComplete(evt) {
    var fahrenheit = 0;
    var kelvin = 0;

    weatherData = JSON.parse(request.responseText);

    console.log(weatherData);
    kelvin = weatherData.main.temp;
    fahrenheit = kelvin * (9 / 5) - 459.67;

    document.getElementById("city").innerHTML = "City: " + weatherData.name;
    document.getElementById("weather").innerHTML = "Weather Description: " + weatherData.weather[0].description;
    document.getElementById("temp").innerHTML = "Temperature: " + fahrenheit.toFixed(2) + "&deg; F";
}

createElements();
getCurrentDate();
loadData();