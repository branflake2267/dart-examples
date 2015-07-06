<table width='100%'><tr><td>
<br>
<br>
<br>
<a href='http://c.dart-examples.com'>http://c.dart-examples.com</a> - has all the fun Dart content. This is merely a code container.<br>
<br>
<br>
See more examples here >  <a href='http://c.dart-examples.com/learn/class'>More On Dart Class</a>
<pre><code>class Location { // Class identification<br>
  num lat, lng; // Instance variables<br>
}<br>
<br>
void main() {<br>
  var waikiki = new Location(); // Object instance instantiation<br>
  waikiki.lat = 21.271488; // Implicit setter function for non-final<br>
  waikiki.lng = -157.822806; // Implicit setter...<br>
  <br>
  print(waikiki.lat); // Implicit getter function for non-final<br>
  print(waikiki.lng); // Implicit getter...<br>
}<br>
</code></pre>