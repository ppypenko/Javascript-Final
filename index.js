var weatherData;
var request = new XMLHttpRequest();
google.load("feeds", "1");
function OnLoad(){
    var query = 'site: cnn.com president';
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


//var feedcontainer = document.getElementById("rssApp"),
//    feedurl = "http://fastpshb.appspot.com/feed/1/fastpshb",
//    feedlimit = 10,
//    rssoutput = "<h2>BBC News:</h2><ul>";
//
//function displayfeed(){
//    var feedpointer = new google.feeds.Feed(feedurl);
//    feedpointer.setNumEntries(feedlimit);
//    feedpointer.load(displayfeed);
//};
//function displayfeed(result){
//    if(!result.error){
//        var thefeeds = result.feed.entries;
//        for(var i = 0; i < thefeeds.length; i += 1){
//            rssoutput += "<li><a href='"+thefeeds[i].link+"'>"+thefeeds[i].title+"</a></li>";   
//        }
//        rssoutput += "</ul>";
//        feedcontainer.innerHTML = rssoutput;
//    }else{
//        alert("Error fetching feeds!");
//    }
//};
//window.onload = function(){
//    rssfeedsetup();    
//};




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

