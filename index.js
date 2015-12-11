"use strict";
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
    weatherData,
    rssData = "http://rss.cnn.com/rss/cnn_topstories.rss",
    stockdata = "goog,msft,aapl,amzn,msft,wmt,bby,fb,twtr,lnkd",
    newsTypes = [
        "http://feeds.bbci.co.uk/news/rss.xml?edition=uk",
        "http://rss.cnn.com/rss/cnn_topstories.rss"
    ];


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
        w1 = document.createTextNode("");
    document.getElementById("weatherApp").appendChild(wind);
    wind.appendChild(w1);
    wind.setAttribute('id', 'wind');
    
    var stockinput = document.createElement("input"),
        stockaddbtn = document.createElement("button"),
        stockcontainer = document.createElement('div'),
        stockLabel = document.createElement("label"),
        stockremovebtn = document.createElement("button");
    document.getElementById("stockApp").appendChild(stockinput);
    document.getElementById("stockApp").appendChild(stockaddbtn);
    document.getElementById("stockApp").appendChild(stockremovebtn);
    document.getElementById("stockApp").appendChild(stockcontainer);
    
    stockcontainer.setAttribute("id", "stockBox");
    stockinput.setAttribute("id", "stockInfo");
    stockaddbtn.innerHTML = "Add Stock";
    stockaddbtn.addEventListener("click", addStock);
    stockremovebtn.innerHTML = "Remove Stock";
    stockremovebtn.addEventListener("click", removeStock);
    
    var rssbox = document.createElement("div"),
        rssmenu = document.createElement("div"),
        rssselect = document.createElement("select");
    
    rssmenu.setAttribute("id", "feedmenu");
    rssbox.setAttribute("id", "rssfeedbox");
    rssmenu.setAttribute("id", "rssmenubox");
    document.getElementById("rssApp").appendChild(rssmenu);
    document.getElementById("rssApp").appendChild(rssbox);
    rssselect.innerHTML = "<option value='bbc'>BBC News</option>"+
        "<option value='cnn'>CNN News</option>";
    document.getElementById("rssmenubox").appendChild(rssselect);
    
}

function getCurrentTime() {
    var d = new Date();
    document.getElementById("headerTime").innerHTML = d;
}
function addStock() {
    var input = document.getElementById("stockInfo");
    stockdata += "," + input.value.toLowerCase();
    getStocks();
    input.value = "";
    
}
function removeStock() {
    var input = document.getElementById("stockInfo"),
        stocklist = stockdata.split(","),
        count = 0,
        b = input.value.toLowerCase();
    stockdata = "";
    for (count = 0; count < stocklist.length; count += 1) {
        var e = stocklist[count].toLowerCase();
        if (e !== b) {
            if (stockdata === "") {
                stockdata += e;
            } else {
                stockdata += "," + e;
            }
        }
    }
    getStocks();
    input.value = "";
}

function changePlace() {
    cityinput = document.getElementById("txtCity").value;
    regioninput = document.getElementById("txtRegion").value;
    loadData();

}
function getStocks() {
    $.ajax({
        url: "http://www.google.com/finance/info?q=" + stockdata,
        dataType: "jsonp",
    
        success: function (data) {
            var stock = document.getElementById("stockBox"),
                html = '<h2>Stocks:</h2>';
            $.each(data, function (i, e) {
                html += "<p>" + (i + 1) + ": " + e.t + " - Change: " + e.c + " Current: " + e.l_cur + "</p>";
            });
            stock.innerHTML = html;
        }
    });
}

$.ajax({
    url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(rssData),
    dataType : 'json',
    success  : function (data) {
        if (data.responseData.feed && data.responseData.feed.entries) {
            var rsspage = "<h2>BBC News</h2>";
            $.each(data.responseData.feed.entries, function (i, e) {
                rsspage += "<p><a href='" + e.link + "'>" + e.title + "</a></p>";
                rsspage += "<p>" + e.contentSnippet + "</p>";
            });
            document.getElementById("rssfeedbox").innerHTML = rsspage;
            //rssdiv.innerHTML = (rsspage);
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
getCurrentTime();
loadData();
getStocks();