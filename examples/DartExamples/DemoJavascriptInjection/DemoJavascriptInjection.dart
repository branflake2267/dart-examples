#import('dart:html');

void main() {
  drawGooglePlusButton();
  drawTwitterButton();
  drawFacebookButton();
}

void drawGooglePlusButton() {
  String html = '<div class="g-plusone" data-annotation="inline" data-width="300"></div>';
  query("#googlePlus").innerHTML = html;
  
  ScriptElement script = new ScriptElement();
  script.async = true;
  script.src = "https://apis.google.com/js/plusone.js";
  script.type = "text/javascript";
  query("#googlePlus").nodes.add(script);
}

void drawTwitterButton() {
  String html = '<a href="https://twitter.com/branflake2267" class="twitter-follow-button" data-show-count="false" data-size="large">Follow @branflake2267</a>';
  query("#twitter").innerHTML = html;
  
  ScriptElement script = new ScriptElement();
  script.async = true;
  script.src = "http://platform.twitter.com/widgets.js";
  script.type = "text/javascript";
  query("#twitter").nodes.add(script);
}

void drawFacebookButton() {
  String html = '<div id="fb-root"></div><div class="fb-like" data-href="http://c.dart-examples.com" data-send="true" data-width="450" data-show-faces="true"></div>';
  query("#facebook").innerHTML = html;
  
  ScriptElement script = new ScriptElement();
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/all.js#xfbml=1&appId=360471930632325";
  script.type = "text/javascript";
  query("#facebook").nodes.add(script);
}


