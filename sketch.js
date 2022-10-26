var colors, cones, aiC, droplets;
var player, gB;
var speed, velocity, friction;
var raining, grass;
var col, counter, rain_s, d, leftFlash;
var state;
var tempRainCondition;

//function preload(){
//  skr = loadSound("Skrr.m4a")
// }

function setup() {
  createCanvas(1400, 700);
  rectMode(CENTER);
  //skr.setVolume(1);

  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'indigo',
    'pink', 'purple', 'brown', 'navy', 'black', 'grey', 'white', 'gold', 'silver', 'bronze',
    'cyan', 'teal', 'magenta', 'fuchsia', 'turquoise', 'khaki', 'tan', 'crimson', 'maroon'];

  cones = new Array(10);
  for (var cone = 0; cone < cones.length; cone++) {
    cones[cone] = new StreetCone();
  }

  aiC = new Array(4);
  for (var ai = 0; ai < aiC.length; ai++) {
    var random1 = Math.floor(Math.random() * colors.length);
    var random2 = Math.random() > .5 ? 400 : 500;
    aiC[ai] = new Car(100 + 300 * ai, random2, colors[random1]);
  }

  player = new Car(100, 200, "silver")
  gB = new GearBox();

  droplets = new Array(600);
  for (var raindrop = 0; raindrop < droplets.length; raindrop++) {
    droplets[raindrop] = new Rain();
  }

  speed = 0;
  velocity = 0.1;
  friction = 9.5;

  grass = false;
  raining = false;

  col = 0;
  counter = 0;
  rain_s = 20;

  state = playScreen;
  tempRainCondition = 0;
}

function draw() {
  state();
}

function keyPressed() {
  if (keyCode === 69) gB.shiftGearUp();
  else if (keyCode === 81) gB.shiftGearDown();
  else if (keyCode === 70) player.headlights = !player.headlights;

  if (keyCode === 17 && state !== controlScreen)
    state = controlScreen;
  else if (keyCode === 17 && state !== playScreen)
    state = playScreen;
}

function playScreen() {
  background(46, 150, 46);

  new Road().render();

  // render row of cones
  for (var cone = 0; cone < cones.length; cone++) {
    cones[cone].render(100 + (cone * 250), 200);
    cones[cone].render(-25 + (cone * 250), 300);
  }

  player.render(25);
  player.btn(speed);
  player.edges();

  // render cars
  for (var ai = 0; ai < aiC.length; ai++) {
    aiC[ai].render(25);
    aiC[ai].x = aiC[ai].x + 2;
    aiC[ai].headlights = raining;

    if (aiC[ai].x > width) {
      aiC[ai].x = 0;

      tempRainCondition++;
      if (tempRainCondition % 10 === 0) {
        raining = !raining;
      }
    }
  }

  // collision detection between player and parked cars
  aiC.forEach(function (ai) {
    if (ai.collision(player.x, player.y, 25)) {
      speed = 0;
    }
  })

  gB.render()

  if (keyIsDown(UP_ARROW)) {
    if (gB.getGear() == -1) {
      speed -= velocity;

      if (speed < velocity * -10) {
        speed = velocity * -10;
      }
    } else if (gB.getGear() != 0) {
      speed += velocity;

      if (gB.getGear() == 1) {
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
        if (speed > velocity * 160) {
          speed = velocity * 160;
        }
      }
    } else {
      speed *= velocity * friction;
    }
  } else if (!keyIsDown(UP_ARROW)) {
    speed *= velocity * friction;
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.braking = true;
    speed *= velocity * friction - 0.05;
    //skr.play()
  } else if (!keyIsDown(DOWN_ARROW))
    player.braking = false;

  if (keyCode == 67) speed = 3; // cruise control
  if (d <= 50) speed *= velocity; //*speed

  text("[CTRL]\tView controls", 10, 685)

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
  text("[Q]\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tShift down gear", 50, 350);
  text("[E]\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tShift up gear", 50, 400);
  text("[F]\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tToggle headlights", 50, 450);
  text("[C]\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tToggle cruise control", 50, 500);
  text("[CTRL]\t\t\t\t\t\t\t\t\t\t\t\t Toggle control screen", 50, 550);
}