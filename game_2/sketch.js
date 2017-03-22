var c = new car(700,350);
var oC = new cones(200,300);
var gB = new gearBox(1250,575);
//var angle = 0.0;
var speed = 0;
var friction = 0.1;
var wallx = 400;
var wally = 500;
var wallw = 50;
var wallh = 50;
var col = 0;

var breaking, reversing, driving, firstGear, secondGear,thirdGear, 
forthGear, fifthGear = false;
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
}

function draw() {
  //console.log(speed)
  background(46,150,46);
  fill(255);
  road();
  if(speed>10){
    speed = 10;
  }
  if(speed < -10){
    speed = -10;
  }
  for(i = 0;i<5;i++){
    noStroke();
    oC.create(200,300);
    oC.create(300,200);
    if(oC.collision()){
      console.log("cones");
      oC.attractionPoint(speed,mouseX,mouseY);
    }
  }
  text(c.angle.toFixed(5),mouseX,mouseY);
  c.create(25);
  c.attractionPoint(speed, mouseX, mouseY);
  gB.create()
  if (mouseIsPressed && d > 20) {
    driving = true;
    speed += friction;
    if(firstGear){
      if(speed > friction*10){
        speed = friction*10;
      }
    }
    else if(secondGear){
      if(speed > friction*20){
        speed = friction*20;
      }
    }
    else if(thirdGear){
      if(speed > friction*30){
        speed = friction*30;
      }
    }
    else if(forthGear){
      if(speed > friction*40){
        speed = friction*40;
      }
    }
  }
  if(driving = false){
    speed = 0;
  }
  if(!mouseIsPressed){
    driving = false;
    speed *= friction*9.9;
  }
  if(d<=50){
    speed *= friction;//*speed
  }
  if(keyIsDown(SHIFT)){
    breaking = true;
    speed *= friction*9;
    //skr.play()
  }else{
    breaking = false;
  }
  if(keyIsDown(CONTROL)){
    reversing = true;
    gearX = 1320;
    gearY = 645;
    speed -= friction;
  }else{
    reversing = false;
  }
  if(keyCode == 67){
    speed = 3;
  }
  
  //crash detector test
  push();
  rectMode(CENTER);
  fill(150);
  rect(wallx,wally,wallw,wallh);
  if(c.collision(wallx,wally,wallw)){
    col = 255;
  }else{
    col = 0;
  }
  pop();
  //
  push();
  textSize(25);
  text("[Click to drive], [C] for cruise control, Press 1-5 for gears. [CTRL] to reverse, [SHIFT] for break",10,600)
  pop();
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
}

