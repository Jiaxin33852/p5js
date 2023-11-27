let x = [0, 0, 0, 0, 0], 
    y = [0, 0, 0, 0, 0],
    segLength = 50;

function setup() {
  createCanvas(710, 400);
  strokeWeight(5.0); 
  stroke(0, 255, 0);
}

function draw() {
  background(0);
  dragSegment(0, mouseX, mouseY);
  for (let i = 1; i < x.length; i++) {
    dragSegment(i, x[i - 1], y[i - 1]);
  }
}

function dragSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx);
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  segment(x[i], y[i], angle);
}

function segment(x, y, a) {
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
