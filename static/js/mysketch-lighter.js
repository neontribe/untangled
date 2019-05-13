let angleL = 0.0;
var hexagonsL = [];
var coloursL = ["#FFF0FE", "#EBFFFF", "#F5EAFF", "#E9FFF4", "#FFFEE7"];
var notesL = ["C3", "D3", "E4", "F4", "G5", "A5", "B6", "C6", "D7", "A7",]
let numberOfHexagonsL = 15;


function polygon(x, y, radius, npoints) {
  let angleL = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angleL) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

class HexAgentL {
  constructor(posX, posY, fillColor) {
    this.mousePos = createVector(mouseX, mouseY)
    this.size = random(windowWidth / 15 ) + 15;
    this.fillColor = fillColor;
    this.pos = createVector(posX, posY);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.relationshipLength = random(25000) + 10000; // milliseconds
    this.feelings = ["attracted", "repulsed"];
    this.currentFeeling = this.feelings[0];
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
    distSquared = constrain(distSquared, 5, 900);
    let strength = gravity / distSquared;
    force.setMag(strength);
    switch (this.currentFeeling) {
      case "attracted":
        force = force;
        break;
      case "repulsed":
        force.mult(-1);
        break;
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

  for (var i = 0; i < numberOfHexagonsL; i++) {
    hexagonsL.push(
      new HexAgentL(random((windowWidth * 0.1), (windowWidth * 0.9)), random((windowHeight * 0.1),(windowHeight * 0.9)), random(coloursL))
    );
  }

}

function draw() {
  background(255);
  for (var i = 0; i < numberOfHexagonsL; i++) {
    hexagonsL[i].attracted(hexagonsL[hexagonsL.length - 1 - i], 8);
    hexagonsL[i].update();
    hexagonsL[i].display();
    hexagonsL[i].checkBoundaries();
    hexagonsL[i].checkRelationshipStatus();
  }
}
