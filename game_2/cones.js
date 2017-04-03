function cones(_x,_y){
  this.x = _x;
  this.y = _y;
  this.angle = 0;
  this.create = function(_x,_y){
    var size = 12;
    noStroke();
    rectMode(CENTER)
    fill(255,150,0)
    append(coneArr,rect(_x+200*o,_y,size,size,3));
    fill(255,153,0)
    stroke(51,51,51,150)
    append(coneArr,ellipse(_x+200*o,_y,size*3/4,size*3/4));
    fill(255)
    append(coneArr,ellipse(_x+200*o,_y,size*3/4/2,size*3/4/2));
    fill(255,153,0)
    append(coneArr,ellipse(_x+200*o,_y,size*3/4/2/2,size*3/4/2/2));
    if(c.collision(_x+200*o,_y,22)){
    }
  }
  this.attractionPoint = function(magnitude, pointX, pointY) {
    this.angle = atan2(pointY-this.y, pointX-this.x);
    this.x += cos(this.angle) * magnitude;
    this.y += sin(this.angle) * magnitude;
    d = dist(this.x,this.y,mouseX,mouseY)
  }
  this.collision = function(){
    if(c.collision(_x+200*o,_y,22)){
      this.x += 100
      return true
    }
  }
}
