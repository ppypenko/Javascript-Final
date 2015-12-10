var weatherData,
    request = new XMLHttpRequest(),
    html = '',
    stock = document.getElementById("stockApp");
google.load("feeds", "1");
function OnLoad(){
    var query = 'site: www.cnn.com president';
    google.feeds.findFeeds(query, findDone);
}
function findDone(result){
    if(!result.error){
        var container = document.getElementById("rssApp");
        var html = '';
        for(var i = 0; i < result.entries.length; i++){
            var entry = result.entries[i];
            html += '<p><a href="/feed/v1/' + entry.url + '">' + entry.title + '</a></p>';
        }
        container.innerHTML = html;
    }
}
google.setOnLoadCallback(OnLoad);

$.ajax({
    url: "http://www.google.com/finance/info?q=goog,msft,aapl",
    dataType: "jsonp",

    success: function( data ) {
        // console.log( data );
        $.each(data, function (i, e) {
            console.log(i + ". " + e.t);
            console.log("Change: " + e.c);
            console.log("Current: " + e.l_cur);
            console.log("_________________________");
        });
    }
});




//function loadData() {
//    
//    var cityinput = document.getElementById("citybox").value;
//    var regioninput = document.getElementById("regionbox").value;
//    
//    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+cityinput+','+regioninput+'&APPID=ae41cf3cccc31ba9eb00adba1ac0e932');
//    request.onload = loadComplete;
//    request.send();
//}
//
//function loadComplete(evt) {
//    var fahrenheit = 0;
//    var kelvin = 0;
//    
//    weatherData = JSON.parse(request.responseText);
//    
//    console.log(weatherData);
//    kelvin = weatherData.main.temp;
//    fahrenheit = kelvin * (9/5) - 459.67;
//    
//    document.getElementById("city").innerHTML = "City: "+ weatherData.name;
//    document.getElementById("weather0").innerHTML = "Weather Description: "+weatherData.weather[0].description;
//    document.getElementById("temp0").innerHTML = "Temperature: "+ fahrenheit.toFixed(2)+"&deg; F";
//}

