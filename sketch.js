// Constants and variables
const c = 30;
const G = 3.54;
const dt = 0.1;

let m87;
const particles = [];
let start, end;

let state = 'theory'; 
let theoryDuration = 7000;
let animationDuration = 19000;
let theoryStartTime, animationStartTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theoryStartTime = millis(); 

  m87 = new Blackhole(width / 2, height / 2, 10000);
  start = height / 2;
  end = height / 2 - m87.rs * 2.6;

  for (let y = 0; y < start; y += 10) {
    particles.push(new Photon(width - 20, y));
  }
}

function draw() {
  background(0);

  if (state === 'theory') {
    showTheory();
    
    if (millis() - theoryStartTime > theoryDuration) {
      state = 'animation'; 
      animationStartTime = millis(); // Record the start time of the animation display
    }
  } else if (state === 'animation') {
    stroke(0);
    strokeWeight(1);
    line(0, start, width, start);
    line(0, end, width, end);

    m87.show();
    for (let p of particles) {
      m87.pull(p);
      p.update();
      p.show();
    }
    
    if (millis() - animationStartTime > animationDuration) {
      state = 'equations'; // Switch to equations state
    }
  } else if (state === 'equations') {
    showEquations();
  }
}

function showTheory() {
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  
  text("Welcome to the Black Hole Simulation!", width / 2, height / 2 - 50);
  text("Watch the photons bend under the gravity of the black hole.", width / 2, height / 2);
}

function showEquations() {
  textSize(28);
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  
  text("Equations Related to the Simulation", width / 2, height / 2 - 150);
  textSize(24);
  text("1. Schwarzschild Radius: rs = 2GM / c^2", width / 2, height / 2 -100);
  text("2. Gravitational Force: Fg = G * m1 * m2 / r^2", width / 2, height / 2 - 50);
  text("3. Photon Deflection: θ = (4GM / rc^2)", width / 2, height / 2 );
  text("4. Photon Motion: v = c * (1 - 2GM / rc^2)", width / 2, height / 2 + 50);
  text("when the photon is at a distance 2.6*r from the black hole, it may escape the black hole's gravity", width / 2, height / 2 + 150);
  text("Press F5 to restart the simulation", width / 2, height / 2 + 200);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  m87.pos.set(width / 2, height / 2);
  start = height / 2;
  end = height / 2 - m87.rs * 2.6;
}
