function loadData() {
    
    var cityinput = document.getElementById("citybox").value;
    var regioninput = document.getElementById("regionbox").value;
    
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+cityinput+','+regioninput+'&APPID=ae41cf3cccc31ba9eb00adba1ac0e932');
    request.onload = loadComplete;
    request.send();
}

function loadComplete(evt) {
    var fahrenheit = 0;
    var kelvin = 0;
    
    weatherData = JSON.parse(request.responseText);
    
    console.log(weatherData);
    kelvin = weatherData.main.temp;
    fahrenheit = kelvin * (9/5) - 459.67;
    
    document.getElementById("city").innerHTML = "City: "+ weatherData.name;
    document.getElementById("weather0").innerHTML = "Weather Description: "+weatherData.weather[0].description;
    document.getElementById("temp0").innerHTML = "Temperature: "+ fahrenheit.toFixed(2)+"&deg; F";
}
