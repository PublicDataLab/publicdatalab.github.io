var count;
var chunks;
var force;
var windSpeed;

var maxSize;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  //find the highr value
  maxSize = windowWidth > windowHeight ? windowWidth : windowHeight;


  canvas.parent("sketch-holder")
  count = 350;
  chunks = [];
  force = 0;
  windSpeed = 0.000005;
  createChunks(count);
  this.mouseX = mouseX + width / 2;
  this.mouseY = mouseY + height / 2;
}

function draw() {
  //background(235, 255, 0);
  handleEnvironment();
  for (i = 0; i < count; i++) {
    push();
    /*
    if (mouseIsPressed) {
      windSpeed += 0.000000001;
      force++;
    }
    else if (windSpeed >= 0.000005) {
      // windSpeed -= 0.0000000001;
      force--;
    }*/
    rotateY(frameCount * windSpeed * dist(0, 0, 0, chunks[i].positionX, chunks[i].positionY, chunks[i].positionZ));
    translate(chunks[i].positionX - force * 0.0001, chunks[i].positionY - force * 0.001, chunks[i].positionZ);
    fill(color(55, 0, 60,100));
    rotateX(frameCount * chunks[i].rotateX);
    rotateY(frameCount * chunks[i].rotateY);
    rotateZ(frameCount * chunks[i].rotateZ);
    plane(chunks[i].size);
    pop();
  }
}

function Chunk() {
  this.positionX;
  this.positionY;
  this.positionZ;
  this.rotateX;
  this.rotateY;
  this.rotateZ;
  this.size;
}

function createChunks(count) {
  // create a bunch of particle objects
  for (i = 0; i < count; i++) {
    var chunk = new Chunk();
    chunk.positionX = random(-maxSize / 3, maxSize / 3);
    chunk.positionY = random(-maxSize / 3, maxSize / 3);
    chunk.positionZ = random(-maxSize / 3, maxSize / 3);
    chunk.rotateX = random(0.001, 0.05);
    chunk.rotateY = random(0.001, 0.05);
    chunk.rotateZ = random(0.001, 0.05)  * chunk.positionZ * 0.005;
    chunk.size = random(1, 5);
    chunks[i] = chunk;
  }
}

function handleEnvironment() {
  // if (isMousePressed) activateVaccuum();
  if (accelerationX !=0 || accelerationY !=0 || accelerationZ != 0) {
    if (deviceOrientation == 'landscape') {
      this.rotateX(int(rotationY) * 0.004);
      this.rotateY(int(rotationX) * 0.004);
    } else {
      this.rotateX(int(rotationX) * 0.004);
      this.rotateY(int(rotationY) * 0.004);
    }
  } else {
    // var speedX = abs(mouseX - pmouseX);
    // var speedY = abs(mouseY - pmouseY);
    this.rotateX(mouseY * -0.0005);
    this.rotateY(mouseX * -0.0005);
    // this.rotateX(mouseY * -0.001 + speedY / 1000);
    // this.rotateY(mouseX * -0.001 + speedX / 1000);
  }

  normalMaterial();
  var cameraZ = (height / 2.0) / tan(PI / 3 / 2.0);
  perspective(PI / 3, width / height, cameraZ / 10.0, cameraZ * 10.0);
}

// function activateVaccuum() {
//   for (i = 0; i < count; i++) {
//     if (mouseX - width / 2 < chunks[i].positionX) {
//       chunks[i].positionX -= 5;
//     } else {
//       chunks[i].positionX += 5;
//     }
//     if (mouseY - height / 2 < chunks[i].positionY) {
//       chunks[i].positionY -= 5;
//     } else {
//       chunks[i].positionY += 5;
//     }
//     chunks[i].positionZ;
//   }
// }

// function mouseMoved() {
//   this.rotateX(mouseY * -0.0005);
//   this.rotateY(mouseX * -0.0005);
// }
//
// function deviceMoved() {
//
// }
