#import('dart:html');

int width = 500;
int height = 500;
int x = 0;
int y = 0;

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
  query('#canvas').nodes.add(canvas);

  context = canvas.getContext('2d');
  
  canvas.on.mouseDown.add((MouseEvent event) => draw(true, event));
  canvas.on.mouseUp.add((MouseEvent event) => draw(false));
  canvas.on.mouseMove.add((MouseEvent event) => move(event));
}

void draw(bool turnOn, [MouseEvent event]) {
  drawingOn = turnOn;
  
  if (event != null) {
    x = event.offsetX;
    y = event.offsetY;
    window.requestAnimationFrame((int time) => drawPoint(time));
  }
}

void move(MouseEvent event) {
  x = event.offsetX;
  y = event.offsetY;
 
  if (drawingOn) {
    window.requestAnimationFrame((int time) => drawPoint(time));
  }
}

void drawPoint(int time) {
  print("$x, $y");
  
  context.beginPath();
  context.arc(x, y, 15, 0, Math.PI * 2, false); 
  context.stroke();
}

void clear() {
  context.clearRect(0, 0, width, height);
}