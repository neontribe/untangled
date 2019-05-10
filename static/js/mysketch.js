let angle = 0.0;
var hexagons = [];
var colours = ["#fb37f1", "#54fcfd", "#9013fe", "#48e6b6", "#fdf958"];
var notes = ["C4", "D4", "E4", "G4", "C5", "E5", "G6", "C6", "D6", "A6",]
let numberOfHexagons = 15;

var polySynth = new Tone.PolySynth(15, Tone.Synth).toMaster();

// var purpleSynth = new Tone.PolySynth(15, Tone.Synth).toMaster();
// var pinkSynth = new Tone.PolySynth(15, Tone.Synth).toMaster();
// var yellowSynth = new Tone.PolySynth(15, Tone.Synth).toMaster();
// var blueSynth = new Tone.PolySynth(15, Tone.Synth).toMaster();
// var turquoiseSynth = new Tone.PolySynth(15, Tone.Synth).toMaster();

function startAudio() {
  Tone.context.resume()
}

function preload() {
  startAudio();
}


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

// function synthSelector(color) {
//   switch(color) {
//     case "#fb37f1":
//     return pinkSynth
//     break;
//     case "#54fcfd":
//     return blueSynth
//     break;
//     case "#9013fe":
//     return purpleSynth
//     break;
//     case "#48e6b6":
//     return turquoiseSynth
//     break;
//     case "#fdf958":
//     return yellowSynth
//     break;
//   }
// }

class HexAgent {
  constructor(posX, posY, fillColor) {
    this.mousePos = createVector(mouseX, mouseY)
    this.size = random(70) + 15;
    this.fillColor = fillColor;
    this.pos = createVector(posX, posY);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.relationshipLength = random(25000) + 10000; // milliseconds
    this.feelings = ["attracted", "repulsed"];
    this.currentFeeling = this.feelings[0];
    this.note = notes[Math.floor(map(this.size, 15, 85, 9, 0))]
    this.synth = polySynth;
    // this.synth = synthSelector(this.fillColor);
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
        this.synth.triggerAttackRelease(this.note, '8n')
    }
    if (this.pos.y > windowHeight - this.size / 1.25 || this.pos.y < 0 + this.size / 1.25) {
      this.vel.y = this.vel.y * -1;
        this.synth.triggerAttackRelease(this.note, '8n')
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
  startAudio();
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.class('backgroundsketch');
  document.body.prepend(myCanvas.canvas);
  for (var i = 0; i < numberOfHexagons; i++) {
    hexagons.push(
      new HexAgent(random((windowWidth * 0.1), (windowWidth * 0.9)), random((windowHeight * 0.1),(windowHeight * 0.9)), random(colours))
    );
  }

}

function draw() {
  background(255);
  for (var i = 0; i < numberOfHexagons; i++) {
    hexagons[i].attracted(hexagons[hexagons.length - 1 - i], 8);
    hexagons[i].update();
    hexagons[i].display();
    hexagons[i].checkBoundaries();
    hexagons[i].checkRelationshipStatus();
    // hexagons[i].attracted(this.mousePos, 50); // need to send in object with this.mousePos as pos
  }
}
