// File: ./stringy/StringyBasics.dart

// This is some source which is included in the StringySilo.dart file 
class StringyRollerCoaster {
  String _coaster;
  
  StringyRollerCoaster.create(String value) {
    _coaster = "";
    
    for (int i = 0; i < value.length; i++) {
      String char = value.substring(i, i+1);
      if (i.isOdd()) {
        char = char.toUpperCase();
      } else if (i.isEven()) {
        char = char.toLowerCase();
      }
      
      _coaster = "$_coaster$char"; 
    }
  }
  
  String get coaster() => _coaster;
    
  String toString() => _coaster;
}
