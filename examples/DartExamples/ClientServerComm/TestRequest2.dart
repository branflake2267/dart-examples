#import('dart:html');
#import("dart:json");

onSuccess(XMLHttpRequestProgressEvent event, XMLHttpRequest request) {
  print(event.loaded); // 0
  print(request.responseText); // The test file has loaded
  print(request.statusText); // ok
}

request1() {
  //String url = "http://earthquake.usgs.gov/earthquakes/feed/geojson/2.5/month";
  //XMLHttpRequest request = new XMLHttpRequest.get(url, onSuccess);
}

request2() {
  String url = "http://c.dart-examples.com/";
  XMLHttpRequest request = new XMLHttpRequest();
  request.on.loadEnd.add((e) => onSuccess(e, request));
  request.open("GET", url, true);
  request.send();
}

/** 
 * Async XMLHTTPRequest 
 */
request3() {
  String url = "test.txt";
  XMLHttpRequest request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.on.loadEnd.add((e) => onSuccess(e, request));
  request.withCredentials = true;
  request.send();
}

void main() {
  
  // request1();
  
  //request2();
 
  request3();
  
}

// works > http://www.html5rocks.com/en/tutorials/file/xhr2/

//String url = "http://earthquake.usgs.gov/earthquakes/catalogs/eqs1hour-M1.xml";
//XMLHttpRequest request = new XMLHttpRequest();
//request.open("GET", url, false);
//request.send();
//print(request.responseText);
