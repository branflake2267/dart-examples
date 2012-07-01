#import('dart:html');

void main() {
  new ImageScaler.start();
}

class ImageScaler {
  
  ImageScaler.start() {
    observeFileInput();
  }
  
  void observeFileInput() {
    InputElement fileElement = query("#file");
    fileElement.on.change.add((e) => processFiles(fileElement.files), true);
  }
  
  void processFiles(List<File> files) {
    for (File file in files) {
      processFile(file);
    }
  }
  
  void processFile(File file) {
    print("file.name=${file.name}");
    
    if (!isAnImage(file)) {
      window.alert("Oops, that wasn't an image, can you try an image?");
      return;
    }
    
    readIn(file);
  }
  
  bool isAnImage(File file) {
    print("file.type=${file.type}");
    
    Pattern pattern = new RegExp(@"(jpeg|png)");
    
    bool b = false;
    if (file.type.toString().contains(pattern) == true) {
      b = true;
    }
    
    return b;
  }
  
  void readIn(File file) {
    FileReader reader = new FileReader();
    reader.on.loadEnd.add((e) => scale(reader.result));
    reader.readAsDataURL(file);
  }
  
  void scale(String base64) { // getting called twice???
    print(base64);
  }

}
