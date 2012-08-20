#import('dart:html');
#import('../../../../BRest/BRest/rest/RestRequest.dart');

String couchdb = "http://127.0.0.1/couchdb";

void main() {
  
  drawLogin(true);

}

void drawLogin(bool enable) {
  if (enable) {
    drawLoginLink();
  } else {
    drawLoggedIn();
  }
}

void drawLoginLink() {
  ButtonElement button = query('#loginbutton');;
  button.on.click.add((e) => processLogin());
}

void drawLoggedIn() {
  
}

void loginToCouch() {
  
}

void processLogin() {
  String url = "${couchdb}/_session";
  String data = "name=${getUsername()}&password=${getPassword()}";
  
  XMLHttpRequest request = new XMLHttpRequest();
  request.on.loadEnd.add((XMLHttpRequestProgressEvent e) => _onLoadEnd(request));
  request.open("POST", url, async : true);
  request.setRequestHeader("X-CouchDB-WWW-Authenticate", "Cookie");
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.setRequestHeader("Accept", "application/json");
  request.send(data);
}

void _onLoadEnd(XMLHttpRequest request) {
  if (request.readyState == 4 && request.status == 200) {
    
  } else {
    //window.alert('Failed to login');
  }
}

String getUsername() {
  InputElement element = query("#username");
  return element.value.trim();
}

String getPassword() {
  InputElement element = query("#password");
  return element.value.trim();
}