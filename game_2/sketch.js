var c = new car(700,350);
//var aiC = new ai_cars(200,530)
var oC = new cones(200,300);
var gB = new gearBox(1250,575);
//var angle = 0.0;
var speed = 0;
var velocity = 0.1;
var friction = 9.5;
var col = 0;
var counter = 0;
var rain = false;
var rains = [];
var aiC = [];
rains.length = 600;
var rain_s;


var breaking, reversing, driving, firstGear, secondGear,thirdGear,
forthGear, flash, leftFlash, fifthGear, grass = false;
// var rain = true
var coneArr = [];
var d;
var gearX ;
var gearY ;

// function preload(){
//   skr = loadSound("Skrr.m4a")
// }
function setup() {
  createCanvas(1400,700);
  //skr.setVolume(1);
  rectMode(CENTER);
  for (var k = 0;k < rains.length; k++) {
      rains[k] = new Star();
  }
}

function draw() {
  // console.log(c.x)
  // console.log(c.y)
  background(46,150,46);
  fill(255);
  text("TRAINING STAGE", 200,20)
  road();
  if(speed>10){
    speed = 10;
  }
  if(speed < -10){
    speed = -10;
  }
  for(o = 0;o<5;o++){
    noStroke();
    oC.create(200,300);
    if(oC.collision()){
      console.log("cones");
    }
  }
  // text(c.angle.toFixed(5),mouseX,mouseY);
  c.create(25);
  c.btn(speed);
  c.edges();
  for(var ai = 0; ai < 5; ai++){
      aiC[ai] = new ai_cars(200+150*ai,530)
      aiC[ai].create(25)
      aiC.forEach(function(){
          if(aiC[ai].collision(c.x,c.y,25)){
              speed = 0;
          }
      })
  }
  //c.attractionPoint(speed, mouseX, mouseY);
  gB.create()
  if (keyIsDown(UP_ARROW)) {
    driving = true;
    speed += velocity;
    if(firstGear){
      if(speed > velocity*10){
        speed = velocity*10;
      }
    }
    else if(secondGear){
      if(speed > velocity*20){
        speed = velocity*20;
      }
    }
    else if(thirdGear){
      if(speed > velocity*30){
        speed = velocity*30;
      }
    }
    else if(forthGear){
      if(speed > velocity*40){
        speed = velocity*40;
      }
    }
}
  if(driving = false){
    speed = 0;
  }
  if(!keyIsDown(UP_ARROW)){
    driving = false;
    speed *= velocity*friction;
  }
  if(d<=50){
    speed *= velocity;//*speed
  }
  if(keyIsDown(DOWN_ARROW)){
    breaking = true;
    speed *= velocity*friction-0.05;
    //skr.play()
  }else{
    breaking = false;
  }
  if(keyIsDown(SHIFT)){
    reversing = true;
    gearX = 1320;
    gearY = 645;
    speed -= velocity;
  }else{
    reversing = false;
  }
  if(keyCode == 67){
    speed = 3;
  }
  push();
  textSize(25);
  text("[ARROW KEYS], [C] for cruise control, Press 1-5 for gears. [CTRL] to reverse, [DOWN] for break",10,600)
  text("[F] Headlights,  [R] Rain", 10, 630)
  pop();
  if(rain){
      friction = 9.9;
      fill('rgba(0%,0%,0%,0.3)')
      rect(width/2,height/2,width,height)
      rain_s = 20;
      translate(width / 2, height / 2);
      for (var i = 0; i < rains.length; i++) {
        rains[i].update();
        rains[i].show();
      }
  }else{
      velocity = 0.1
  }
}
function keyPressed(){
  if(keyCode === 49){//1
    driving = true;
    firstGear = true;
    gearX = 1180;
    gearY = 505;
  }

  else if(keyCode === 50 && !reversing){//2
    driving = true;
    firstGear = false;
    secondGear = true;
    gearX = 1180;
    gearY = 645;
  }

  else if(keyCode === 51 && !reversing){//3
    driving = true;
    secondGear = false;
     thirdGear = true;
     gearX = 1250;
     gearY = 505;
  }

  else if(keyCode === 52 && !reversing){//4
     driving = true;
     thirdGear = false;
     forthGear = true;
     gearX = 1250;
     gearY = 645;
    }
  else if(keyCode === 53&& !reversing ){//5
    driving = true;
    forthGear = false;
    fifthGear = true
    gearX = 1320;
    gearY = 505
  }
  else if (keyCode === 82){
      rain = !rain;
  }
  else if (keyCode === 70){
      flash = !flash
  }
}
