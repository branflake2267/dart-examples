#import('dart:html');

int width = 500;
int height = 500;

CanvasElement canvas;
CanvasRenderingContext2D context;

bool drawingOn = false;

void main() {
  drawCanvas();
  
  Element button = query('#clear');
  button.on.click.add((e) => clear());
}

void drawCanvas() {
  canvas = new CanvasElement(width, height);
  document.body.elements.add(canvas);

  context = canvas.getContext('2d');
  
  canvas.on.mouseDown.add((e) => draw(true));
  canvas.on.mouseUp.add((e) => draw(false));
  canvas.on.mouseMove.add((MouseEvent event) => move(event));
}

void draw(bool turnOn) {
  drawingOn = turnOn;
}

void move(MouseEvent event) {
  print("${event.x}, ${event.y}");
  
  if (drawingOn) {
    drawPoint(event.x, event.y);
  }
}

void drawPoint(int x, int y) {
  context.beginPath();
  context.arc(x-15, y-15, 15, 0, 15, false); 
  context.stroke();
}

void clear() {
  context.clearRect(0, 0, width, height);
}