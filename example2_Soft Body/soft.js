// center point
let centerX = 0.0, centerY = 0.0;

let radius = 45, rotAngle = -90;
let accelX = 0.0, accelY = 0.0;
let deltaX = 0.0, deltaY = 0.0;
let springing = 0.0009, damping = 0.98;

//corner nodes
let nodes = 4;

//zero fill arrays
let nodeStartX = [];
let nodeStartY = [];
let nodeX = [];
let nodeY = [];
let angle = [];
let frequency = [];

// soft-body dynamics
let organicConstant = 1.0;

function setup() {
    createCanvas(710, 400);
    //center shape in window
    centerX = width / 2;
    centerY = height / 2;

  //initialize arrays to 0
  for (let i = 0; i < nodes; i++) {
    nodeStartX[i] = 0;
    nodeStartY[i] = 0;
    nodeX[i] = 0; 
    nodeY[i] = 0; 
    angle[i] = 0;
  }

  // iniitalize frequencies for corner nodes
  for (let i = 0; i < nodes; i++){
    frequency[i] = random(5, 12);
  }

  noStroke();
  frameRate(30);
}

function draw() {
  //fade background
  fill(0, 100);
  rect(0, 0, width, height);
  drawShape();
  moveShape();
}

function drawShape() {
    let angleStep = 360 / nodes;
    for (let i = 0; i < nodes; i++) {
      nodeStartX[i] = centerX + cos(radians(rotAngle + i * angleStep)) * radius;
      nodeStartY[i] = centerY + sin(radians(rotAngle + i * angleStep)) * radius;
    }
  
    curveTightness(organicConstant);
    fill(random(255), random(255), random(255)); 
    beginShape();
    for (let i = 0; i < nodes; i++) {
      curveVertex(nodeX[i], nodeY[i]);
    }
    for (let i = 0; i < nodes; i++) {
      curveVertex(nodeX[i], nodeY[i]);
    }
    endShape(CLOSE);
  }
  
  function moveShape() {
    let shapeAngle = frameCount * 0.01;
    centerX = width / 2 + cos(shapeAngle) * 100;
    centerY = height / 2 + sin(shapeAngle) * 100;
  
    for (let i = 0; i < nodes; i++) {
        angle[i] += frequency[i];
        nodeX[i] = nodeStartX[i] + sin(radians(angle[i])) * 10;
        nodeY[i] = nodeStartY[i] + sin(radians(angle[i])) * 10;
      }
  }