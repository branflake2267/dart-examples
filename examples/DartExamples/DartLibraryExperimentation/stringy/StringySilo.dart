// File: ./stringy/StringySilo.dart

// library defines the privacy of this library 
//         (library includes the members below)
#library("com.dart-examples.stringy");

// include some source code from another file
#source("StringyBasics.dart");

// library member
class Stringity {
  String sentence;
  
  Stringity(this.sentence);
  
  void makeItFunky() {
    StringyRollerCoaster roller = new StringyRollerCoaster.create(sentence);
    sentence = roller.coaster;
  }
  
  String toString() => sentence;
}