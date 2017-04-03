
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
    // //wheels
    fill(0)
    rect(0-d/2,0+d/2,d/5,d/10)//back right

    rect(backRightSkid.x,backRightSkid.y,d/5,d/10)//back right skid

    rect(0+d/2,0+d/2,d/5,d/10)//front right
    rect(0-d/2,0-d/2,d/5,d/10)//back left

    rect(backLeftSkid.x,backLeftSkid.y,d/5,d/10)//back left skid

    rect(0+d/2,0-d/2,d/5,d/10)//front left
    rect(0,0,d*1.6,d)

    if(flash){
        noStroke()
        fill(255)
        ellipse(20,10,3,3)
        ellipse(20,-10,3,3)
        fill('rgba(100%,100%,100%,0.7)')
        triangle(20,10,80,30,80,-20)
        triangle(20,-10,80,10,80,-30)
        ////////
        fill('rgba(100%,0%,0%,0.7)')
        ellipse(-20,10,3,3)
        ellipse(-20,-10,3,3)
        fill('rgba(100%,0%,0%,0.7)')
        triangle(-20,-10,-60,-30,-60,10)
        triangle(-20,10,-60,-20,-60,30)
    }

    if(leftFlash && counter == 0){
        counter ++
        fill(255,255,0)
        ellipse(20,10,5,5)
    }

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
  // this.attractionPoint = function(magnitude, pointX, pointY) {
  //   this.angle = atan2(pointY-this.y, pointX-this.x);
  //   this.x += cos(this.angle) * magnitude;
  //   this.y += sin(this.angle) * magnitude;
  //   d = dist(this.x,this.y,mouseX,mouseY)
  // }
  this.btn = function(mag){
      if(keyIsDown(RIGHT_ARROW)){
          this.angle += 0.05
      }
      if(keyIsDown(LEFT_ARROW)){
          this.angle -= 0.05
      }
      if(keyCode === 65){
          leftFlash = !leftFlash
      }
      this.x += cos(this.angle) * mag;
      this.y += sin(this.angle) * mag;
  }
}
