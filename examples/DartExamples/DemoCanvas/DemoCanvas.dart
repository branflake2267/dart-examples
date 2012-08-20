#import('dart:html');

int width = 500;
int height = 500;

CanvasRenderingContext2D context;

void main() {
  CanvasElement canvas = new CanvasElement(width, height);
  query('#canvas').nodes.add(canvas);
  
  context = canvas.getContext('2d');
  
  context.clearRect(0, 0, width, height);
  
  window.requestAnimationFrame(drawCircle1());
  window.requestAnimationFrame((int time) => drawCircle2(time));
//  window.requestAnimationFrame((int time) => drawArcTo(time));
  window.requestAnimationFrame((int time) => drawRect(time));
  window.requestAnimationFrame((int time) => drawText(time));
  window.requestAnimationFrame((int time) => drawBezierCurve(time));
  window.requestAnimationFrame((int time) => drawQuadraticCurve(time));
  window.requestAnimationFrame((int time) => drawPath(time));
}

RequestAnimationFrameCallback drawCircle1() {
  return (int time) {
    context.beginPath();
    context.arc(75, 75, 30, 0, Math.PI * 2, true); 
    context.stroke();
  };
}

void drawCircle2(int time) {
  context.beginPath();
  context.arc(30, 50, 30, 0, Math.PI * 2, true); 
  context.stroke();
}

// TODO
void drawArcTo(int time) {
  context.beginPath();
  context.arcTo(15, 10, 15, 20, 3); 
  context.stroke();
}

void drawRect(int time) {
  context.strokeRect(20, 30, 50, 70, 3); 
}

void drawText(int time) {
  context.strokeText("c.dart-examples.com", 120, 120, width);
}

void drawBezierCurve(int time) {
  context.beginPath();
  context.bezierCurveTo(5, 20, 50, 75, 150, 75); 
  context.stroke();
}

void drawQuadraticCurve(int time) {
  context.beginPath();
  context.quadraticCurveTo(10, 10, 150, 150); 
  context.stroke();
}

void drawPath(int time) {
  context.beginPath();
  context.moveTo(70, 70);
  context.moveTo(80, 80);
  context.stroke();
}