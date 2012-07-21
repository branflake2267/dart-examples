#import('dart:html');
#import("dart:json");

/**
 * HTML5 rocks has cors enabled so we can load a cross site resource
 * Or the response header must contain "Access-Control-Allow-Origin: *"
 */
void main() {
  String url = "http://www.html5rocks.com/en/tutorials/file/xhr2/";  
  XMLHttpRequest request = new XMLHttpRequest();
  request.open("GET", url, async : false);
  request.send();
  
  print(request.statusText); // ok
  print(request.responseText); // "(http://www.html5rocks.com/en/tutorials/file/xhr2/ source)"
}

//#import('dart:html');
//#import("dart:json");
//
//onSuccess(XMLHttpRequestProgressEvent event, XMLHttpRequest request) {
//  print(event.loaded);
//  print(request.responseText);
//  print(request.responseType);
//  print(request.statusText);
//}
//
//request1() {
//  //String url = "http://earthquake.usgs.gov/earthquakes/feed/geojson/2.5/month";
//  //XMLHttpRequest request = new XMLHttpRequest.get(url, onSuccess);
//}
//
//request2() {
//  String url = "http://c.dart-examples.com/";
//  XMLHttpRequest request = new XMLHttpRequest();
//  request.on.loadEnd.add((e) => onSuccess(e, request));
//  request.open("GET", url, true);
//  request.setRequestHeader("Access-Control-Allow-Origin", "*");
//  request.send();
//}
//
//request3() {
//  String url = "http://earthquake.usgs.gov/earthquakes/catalogs/eqs1hour-M1.xml";
//  XMLHttpRequest request = new XMLHttpRequest();
//  request.open("GET", url, true);
//  request.on.loadEnd.add((e) => onSuccess(e, request));
//  request.withCredentials = true;
//  request.send();
//}
//
//void main() {
//  
//  // request1();
//  
//  //request2();
// 
//
//  
//}
//
//// works > http://www.html5rocks.com/en/tutorials/file/xhr2/
//
////String url = "http://earthquake.usgs.gov/earthquakes/catalogs/eqs1hour-M1.xml";
////XMLHttpRequest request = new XMLHttpRequest();
////request.open("GET", url, false);
////request.send();
////print(request.responseText);