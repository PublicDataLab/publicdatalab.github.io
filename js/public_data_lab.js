var count;
var chunks;
var force;
var windSpeed;
var maxWind;
var minWind;
var particlesAlpha;

var curSize;
var maxSize;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);

  //find the highr value
  maxSize = windowWidth > windowHeight ? windowWidth : windowHeight;
  //set current size to max
  curSize = maxSize;


  canvas.parent("sketch-holder")
  count = 350;
  chunks = [];
  //horizontal spinning
  windSpeed = 0.000005;
  minWind = 0.000005;
  maxWind = 0.05

  //
  particlesAlpha = 100;
  createChunks(count);
  this.mouseX = mouseX + width / 2;
  this.mouseY = mouseY + height / 2;
}

function draw() {

  console.log(touches.length);
  
  if(mouseIsPressed || touches.length > 0) {

    if(curSize > 0.1) {
      curSize --;
      windSpeed += 0.0000001;
      particlesAlpha += 0.5
    }

  } else {

    if(curSize < maxSize) {
      curSize += 2;
      windSpeed -= 0.0000002;
      particlesAlpha -= 1;
    }
  };

  //define distance scale
  var distScale = curSize/maxSize;

  handleEnvironment();
  //for each particle set the position 
  for (i = 0; i < chunks.length; i++) {

    var chunk = chunks[i];
    push();
    //increase rotation according to wind speed
    chunk.rotation += windSpeed
    //rotate the axis according the rotation values modified by distance
    rotateY(chunk.rotation * dist(0, 0, 0, chunk.positionX, chunk.positionY, chunk.positionZ));
    //move to position
    translate(chunk.positionX * distScale, chunk.positionY * distScale, chunk.positionZ * distScale);
    fill(color(55, 0, 60, particlesAlpha));
    rotateX(frameCount * chunk.rotateX);
    rotateY(frameCount * chunk.rotateY);
    rotateZ(frameCount * chunk.rotateZ);
    plane(chunk.size);
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
  //
  this.rotation;
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
    chunk.rotation = 0;
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
