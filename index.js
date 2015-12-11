var weatherData,
    request = new XMLHttpRequest(),
    html = '',
    stock = document.getElementById("stockApp"),
    rssdiv = document.getElementById("rssApp"),
    today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth() + 1,
    yyyy = today.getFullYear(),
    cityinput = 'salt lake city',
    regioninput = 'ut',
    weatherData;


//weatherApp h1
function createElements() {

    var city = document.createElement("H1"),
        c = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(city);
    city.appendChild(c);
    city.setAttribute('id', 'city');

    var weather = document.createElement("H1"),
        w = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(weather);
    weather.appendChild(w);
    weather.setAttribute('id', 'weather');

    var temp = document.createElement("H1"),
        t = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(temp);
    temp.appendChild(t);
    temp.setAttribute('id', 'temp');

    var wind = document.createElement("H1"),
        w = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(wind);
    wind.appendChild(w);
    wind.setAttribute('id', 'wind');
}

function getCurrentTime() {
    var d = new Date();
    d.getHours();
    d.getMinutes();
    d.getSeconds();

    document.getElementById("headerTime").innerHTML = d;
}


function changePlace() {
    cityinput = document.getElementById("txtCity").value;
    regioninput = document.getElementById("txtRegion").value;
    loadData();

}

$.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://feeds.bbci.co.uk/news/rss.xml?edition=uk"),
    dataType: 'json',
    success: function (data) {
        if (data.responseData.feed && data.responseData.feed.entries) {
            var rsspage = "<h2>BBC News</h2>";
            $.each(data.responseData.feed.entries, function (i, e) {
                rsspage += "<p><a href='" + e.link + "'>" + e.title + "</a></p>";
                rsspage += "<p>" + e.contentSnippet + "</p>";
            });
            rssdiv.innerHTML = (rsspage);
        }
    }
});


function loadData() {

    //    regioninput = 'ut';

    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityinput + ',' + regioninput + '&&APPID=ae41cf3cccc31ba9eb00adba1ac0e932&units=imperial');
    request.onload = loadComplete;
    request.send();
}


function loadComplete(evt) {
    weatherData = JSON.parse(request.responseText);

    console.log(weatherData);
    var kelvin = weatherData.main.temp;

    console.log(weatherData);
    document.getElementById("city").innerHTML = "City: " + weatherData.name;
    document.getElementById("weather").innerHTML = "Weather Description: " + weatherData.weather[0].description;
    document.getElementById("temp").innerHTML = "Temperature: " + kelvin.toFixed(2) + "&deg; F";
    document.getElementById("wind").innerHTML = "Wind Speeds: " + weatherData.wind.speed + " mph";



}

createElements();
//getCurrentDate();
getCurrentTime();
loadData();