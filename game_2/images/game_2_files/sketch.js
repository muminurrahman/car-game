var c = new car(700,350);
//var angle = 0.0;
var speed = 0
var friction = 0.1
var wallx = 400;
var wally = 400;
var wallw = 50;
var wallh = 50;
var col = 0;

function setup() {
  createCanvas(1400,700)
}

function draw() {
  //wally --;
  background(200);
  text(c.angle,mouseX,mouseY)
  line(0,0,800,800)
  if(speed>0.5){
    c.attractionPoint(speed, mouseX, mouseY)
  }
  if (mouseIsPressed) {
    speed += friction
  }
  if(!mouseIsPressed){
    speed *= friction*9.9;
  }
  if(keyCode == 32){
    speed *= friction*8;
    //console.log(speed)
  }
  
  c.create(25);
  //crash detector test
  push()
  fill(150,255,150)
  rect(wallx,wally,wallw,wallh)
  pop()
  //
}

function car(x,y){
  this.x = x;//play x and y
  this.y = y;
  this.angle = 0;
  
  this.create = function(d) {
    var backRightSkid = {
      x:0-d*2,
      y:0+d/2
    }
    var backLeftSkid = {
      x:0-d*2,
      y:0-d/2
    }
    fill(col,0,0);//colour picker changer
    push();
    translate(this.x, this.y)
    rotate(this.angle)
    rectMode(CENTER)
    rect(0,0,d*1.6,d)
    // //wheels
    // fill(255,0,0)
    // rect(0-d/2,0+d/2,d/5,d/10)//back right
    // rect(backRightSkid.x,backRightSkid.y,d/5,d/10)//back right skid
    // fill(0,255,0)
    // rect(0+d/2,0+d/2,d/5,d/10)//front right
    // fill(0,0,255)
    // rect(0-d/2,0-d/2,d/5,d/10)//back left
    // rect(backLeftSkid.x,backLeftSkid.y,d/5,d/10)//back left skid
    // fill(150,150,150)
    // rect(0+d/2,0-d/2,d/5,d/10)//front left
    // // if(this.angle > PI/8){
    // //   console.log("skkrr")
    // //   this.angle *= 0.2
    // // }
    // // if(keyCode === 32){
    // //   strokeWeight(5)
    // //   line(backLeftSkid.x,backLeftSkid.y,d/5,d/10-10);
    // //   line(backRightSkid.x,backRightSkid.y,d/5,d/10+10)
    // // }
    pop();

  }
  this.attractionPoint = function(magnitude, pointX, pointY) {
    this.angle = atan2(pointY-this.y, pointX-this.x);
    this.x += cos(this.angle) * magnitude;
    this.y += sin(this.angle) * magnitude;
    if(this.x > wallx && this.y>wally && this.x<wallx+wallh && this.y<wally+wallh){
      col = 255
      speed = 0
    }else{
      col = 0;
    }
  }
}