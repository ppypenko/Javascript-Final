var weatherData,
    request = new XMLHttpRequest(),
    html = '',
    stock = document.getElementById("stockApp"),
    rssdiv = document.getElementById("rssApp");

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var request = new XMLHttpRequest();

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
}


function getCurrentDate() {
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
    document.getElementById("headerDate").innerHTML = today;
}
$.ajax({
    url      : document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent("http://feeds.bbci.co.uk/news/rss.xml?edition=uk"),
    dataType : 'json',
    success  : function (data) {
        if (data.responseData.feed && data.responseData.feed.entries) {
            var rsspage += "<h2>BBC News</h2>";
            $.each(data.responseData.feed.entries, function (i, e) {
                rsspage += "<p><a href='"+e.link+"'>"+e.title+"</a></p>";
                rsspage += "<p>"+e.contentSnippet+"</p>";
            });
            rssdiv.innerHTML = (rsspage);
        }      
    }    
});


createElements();
getCurrentDate();