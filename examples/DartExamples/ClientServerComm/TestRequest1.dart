#import('dart:html');
#import("dart:json");

void onSuccess(XMLHttpRequestProgressEvent event, XMLHttpRequest request) {
  print(event.loaded); // 0
  print(request.responseText); // The test file has loaded
  print(request.statusText); // ok
}

/**
 * test.txt file must be of the same origin
 * Or the response request must contain "Access-Control-Allow-Origin: [*|http://origin.tld]"
 */
void main() {
  String url = "test.txt";  
  XMLHttpRequest request = new XMLHttpRequest();
  request.open("GET", url, async : true);
  request.on.loadEnd.add((XMLHttpRequestProgressEvent e) => onSuccess(e, request));
  request.withCredentials = true;
  request.send();
}