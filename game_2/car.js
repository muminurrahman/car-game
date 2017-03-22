
function car(x,y){
  this.x = x;//play x and y
  this.y = y;
  this.angle = 0;
  
  this.create = function(d) {
    var backRightSkid = {
      x:0-d/2,
      y:0+d/2
    }
    var backLeftSkid = {
      x:0-d/2,
      y:0-d/2
    }
    fill(col,0,0);//colour picker changer
    push();
    if(breaking){
      backRightSkid.x -= 20
      backLeftSkid.x -= 20
      line(backRightSkid.x,backRightSkid.y,0-d/2,0+d/2)
    }
    translate(this.x, this.y)
    rotate(this.angle)
    rectMode(CENTER)
    rect(0,0,d*1.6,d)
    // //wheels
    fill(255,0,0)
    rect(0-d/2,0+d/2,d/5,d/10)//back right
    
    rect(backRightSkid.x,backRightSkid.y,d/5,d/10)//back right skid
    
    fill(0,255,0)
    rect(0+d/2,0+d/2,d/5,d/10)//front right
    fill(0,0,255)
    rect(0-d/2,0-d/2,d/5,d/10)//back left
    
    rect(backLeftSkid.x,backLeftSkid.y,d/5,d/10)//back left skid
    
    fill(150,150,150)
    rect(0+d/2,0-d/2,d/5,d/10)//front left
    pop();
  }
  this.touchingColour = function(col, _x,_y){
    var c = get(_x,_y)
    if(c[1] == col){
      console.log('touchingColour!')
      return true
    }
  }
  this.collision = function(posX,posY,posWidth){
    var dis = dist(this.x,this.y,posX,posY)
    if(dis < posWidth){
      return true
    }else{
      return false
    }
  }
  this.attractionPoint = function(magnitude, pointX, pointY) {
    this.angle = atan2(pointY-this.y, pointX-this.x);
    this.x += cos(this.angle) * magnitude;
    this.y += sin(this.angle) * magnitude;
    d = dist(this.x,this.y,mouseX,mouseY)
  }
}
