var player = new Car(100, 200);
var gB = new GearBox();
var speed = 0;
var velocity = 0.1;
var friction = 9.5;
var col = 0;
var counter = 0;
var raining = false;
var rain_s;
var droplets = new Array(600);
var cones = new Array(4);
var aiC = new Array(6);
var d;
var accelerating, braking, headlights, leftFlash, grass = false;
var colours = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'indigo',
  'pink', 'purple', 'brown', 'lilac', 'navy', 'cream', 'black', 'grey', 'white',
  'gold', 'silver', 'bronze', 'cyan', 'teal', 'magenta', 'fuchsia', 'turquoise',
  'lilac', 'khaki', 'tan', 'crimson', 'amber', 'burgandy', 'maroon']
var state = playScreen;

//function preload(){
//  skr = loadSound("Skrr.m4a")
// }

function setup() {
  createCanvas(1400, 700);
  rectMode(CENTER);
  //skr.setVolume(1);

  for (var ai = 0; ai < aiC.length; ai++) {
    aiC[ai] = new ai_cars(200 + 150 * ai, 530, colours[Math.floor(Math.random() * colours.length)]);
  }

  for (var cone = 0; cone < cones.length; cone++) {
    cones[cone] = new StreetCone();
  }

  for (var raindrop = 0; raindrop < droplets.length; raindrop++) {
    droplets[raindrop] = new Rain();
  }
}

function draw() {
  background(0);
  state();
}

function keyPressed() {
  if (keyCode === 70) headlights = !headlights
  else if (keyCode === 82) raining = !raining;
  else if (keyCode === 69) gB.shiftGearUp();
  else if (keyCode === 81) gB.shiftGearDown();

  if (keyCode === 17 && state !== controlScreen)
    state = controlScreen;
  else if (keyCode === 17 && state !== playScreen)
    state = playScreen;
}

function playScreen() {
  background(46, 150, 46);

  road();

  // render row of cones
  for (var cone = 0; cone < cones.length; cone++) {
    cones[cone].render(100 + (cone * 250), 300);
  }

  // render parked cars
  for (var ai = 0; ai < aiC.length; ai++) {
    aiC[ai].create(25);
  }

  player.create(25);
  player.btn(speed);
  player.edges();

  // collision detection between player and parked cars
  aiC.forEach(function (ai) {
    if (ai.collision(player.x, player.y, 25)) {
      speed = 0;
    }
  })

  gB.render()

  // accelerating
  if (keyIsDown(UP_ARROW)) {

    if (gB.getGear() > 0) {
      accelerating = true;
      speed += velocity;
    }

    if (gB.getGear() == -1) {
      speed -= velocity;

      if (speed < velocity * -10) {
        speed = velocity * -10;
      }
    } else if (gB.getGear() == 1) {
      if (speed > velocity * 10) {
        speed = velocity * 10;
      }
    } else if (gB.getGear() == 2) {
      if (speed > velocity * 20) {
        speed = velocity * 20;
      }
    } else if (gB.getGear() == 3) {
      if (speed > velocity * 30) {
        speed = velocity * 30;
      }
    } else if (gB.getGear() == 4) {
      if (speed > velocity * 40) {
        speed = velocity * 40;
      }
    } else if (gB.getGear() == 5) {
      if (speed > velocity * 220) {
        speed = velocity * 220;
      }
    }
  } else if (!keyIsDown(UP_ARROW)) {
    accelerating = false;
    speed *= velocity * friction;
  }

  if (d <= 50) speed *= velocity; //*speed
  if (keyCode == 67) speed = 3; // cruise control

  if (keyIsDown(DOWN_ARROW)) {
    braking = true;
    speed *= velocity * friction - 0.05;
    //skr.play()
  } else braking = false;

  push();
  textSize(20);
  text("[CTRL]\tView controls", 10, 685)
  pop();

  if (raining) {
    friction = 9.9;
    fill(0, 0, 0, 33);
    rect(width / 2, height / 2, width, height);
    rain_s = 20;
    translate(width / 2, height / 2);
    for (var raindrop = 0; raindrop < droplets.length; raindrop++) {
      droplets[raindrop].update();
      droplets[raindrop].render();
    }
  }
}

function controlScreen() {
  background(0);
  fill(255);
  textSize(20);
  text("Keyboard Controls", 50, 50);
  text("[UP ARROW]\t\t\t\t\t\t\tThrottle", 50, 150);
  text("[DOWN ARROW]\t\t\t\tBreak", 50, 200);
  text("[LEFT ARROW]\t\t\t\t\tSteer left", 50, 250);
  text("[RIGHT ARROW]\t\t\t\t\Steer right", 50, 300);
  text("[SHIFT]\t\t\t\t\t\t\t\t\t\t\t\tReverse", 50, 350);
  text("[Q]\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tShift down gear", 50, 400);
  text("[E]\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tShift up gear", 50, 450);
  text("[C]\t\t\t\t\t\t\tToggle cruise control", 550, 150);
  text("[F]\t\t\t\t\t\t\tToggle headlights", 550, 200);
  text("[R]\t\t\t\t\t\t\tToggle rain", 550, 250);
  text("[CTRL]\t\t\t Toggle control screen", 550, 300);
}