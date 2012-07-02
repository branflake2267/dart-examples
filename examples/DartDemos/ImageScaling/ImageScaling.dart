#import('dart:html');

final double scaleToRatio = .5;

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
    reader.on.loadEnd.add((e) => createImageElement(reader.result));
    reader.readAsDataURL(file);
  }
  
  void createImageElement(String base64) {
    print(base64);
    
    // set the image data and wait for image onload to fire 
    ImageElement originalImg = query("#originImg");
    originalImg.on.load.add((e) => scale(originalImg));
    originalImg.src = base64;
  }
  
  void scale(ImageElement imageElement) {
    CanvasElement canvas = query("#canvas");
    CanvasRenderingContext2D context = canvas.context2d;
    
    // scale the image with ratio
    num height = (imageElement.height * scaleToRatio).toInt();
    num width = (imageElement.width * scaleToRatio).toInt();
    canvas.height = height;
    canvas.width = width;
    
    print("canvas height=$height width=$width");
    
    // tell it to scale image
    context.scale(scaleToRatio, scaleToRatio);
    
    // draw image to canvas
    context.drawImage(imageElement, 0, 0);
  }
  
}
