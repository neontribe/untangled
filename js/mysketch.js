let angle = 0.0;
var hexagons = [];
var colours = ["#67e5b4", "#944df7", "#fbf850", "#72fbfb", "#eb56f3", "#67e5b4", "#944df7", "#fbf850", "#72fbfb", "#eb56f3"];
let numberOfHexagons = 10;

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}


class HexAgent {
  constructor(posX, posY, fillColor) {
    this.mousePos = createVector(mouseX, mouseY)
    this.size = random(70) + 15;
    this.fillColor = fillColor;
    this.pos = createVector(posX, posY);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.relationshipLength = random(15000) + 5000; // milliseconds
    this.feelings = ["attracted", "repulsed"];
    this.currentFeeling = this.feelings[1];
  }

  display() {
    noStroke();
    fill(this.fillColor);
    polygon(this.pos.x, this.pos.y, this.size, 6);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }

  checkBoundaries() {
    if (this.pos.x > windowWidth - this.size|| this.pos.x < 0 + this.size) {
      this.vel.x = this.vel.x * -1;
    }
    if (this.pos.y > windowHeight - this.size / 1.25 || this.pos.y < 0 + this.size / 1.25) {
      this.vel.y = this.vel.y * -1;
    }
  }

  attracted(target, gravity) {
    let force = p5.Vector.sub(target.pos, this.pos);
    let distSquared = force.magSq();
    distSquared = constrain(distSquared, 5, 300);
    let strength = gravity / distSquared;
    force.setMag(strength);
    switch (this.currentFeeling) {
      case "attracted":
        force = force;
        break;
      case "repulsed":
        force.mult(-1);
        break;
        force.mult(-1);
    }
    this.acc = force;

  }

  changeState(){
    this.acc = createVector(0, 0);
    this.vel = createVector(0.1, 0.1);
    switch (this.currentFeeling) {
      case "attracted":
        this.currentFeeling = this.feelings[1];
        break;
      case "repulsed":
        this.currentFeeling = this.feelings[0];
        break;
    }
  };

  checkRelationshipStatus() {
    if (millis() > this.relationshipLength) {
      this.relationshipLength = this.relationshipLength + millis();
      this.changeState();
    }
  }
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.class('backgroundsketch');
  document.body.prepend(myCanvas.canvas);
  for (var i = 0; i < numberOfHexagons; i++) {
    hexagons.push(
      new HexAgent(random((windowWidth * 0.8)), random(windowHeight * 0.8), colours[i])
    );
  }
}

function draw() {
  background(255);
  for (var i = 0; i < numberOfHexagons; i++) {
    hexagons[i].attracted(hexagons[hexagons.length - 1 - i], 4);
    hexagons[i].update();
    hexagons[i].display();
    hexagons[i].checkBoundaries();
    hexagons[i].checkRelationshipStatus();
    // hexagons[i].attracted(this.mousePos, 50); // need to send in object with this.mousePos as pos
  }
}
