
function ai_cars(x, y, colour) {
  this.x = x; //play x and y
  this.y = y;
  this.angle = 0;
  this.history = [];
  this.historyL = [];

  this.create = function (d) {
    fill(col, 0, 0); //colour picker changer
    push();
    translate(this.x, this.y);
    rectMode(CENTER);

    //wheels
    fill(0)
    rect(0 - d / 2, 0 + d / 2, d / 5, d / 10); //back right
    rect(0 + d / 2, 0 + d / 2, d / 5, d / 10); //front right
    rect(0 - d / 2, 0 - d / 2 - 1, d / 5, d / 10); //back left
    rect(0 + d / 2, 0 - d / 2 - 1, d / 5, d / 10); //front left

    noStroke();
    fill(colour);
    rect(0, 0, d * 1.6, d);
    ellipse(-d / 2 - 7, 0, 10, d);
    triangle(d / 2 + 7, 0, 25, 8, d / 2 + 7, 12.5);
    triangle(d / 2 + 7, 0, 25, -8, d / 2 + 7, -12.5);
    triangle(d / 2 + 7, 0, 25, 8, 25, -8);

    stroke(0, 0, 0, 65);
    noFill();
    rect(-2.5, -0.5, d * 0.5, d - 10); //roof
    fill(0);
    rect(-13, -0.5, d * 0.3, d - 10);//engine
    noStroke();
    fill(0);
    ellipse(-16, 0, d * 0.3, d - 11);
    fill(200, 0, 0);
    rect(-14, 0, d * 0.42, 2.5); //engine
    fill(0);
    rect(6.5, -0.5, d * 0.2, d - 16); //window
    triangle(4, 4, 4, 8, 9.3, 4);
    triangle(4, -3.5, 4, -7.5, 9.3, -4);
    fill(255, 255, 255);
    ellipse(20, 10, 3, 3);
    ellipse(20, -10, 3, 3);
    fill(255, 130, 130);
    ellipse(-20, 10, 3, 3);
    ellipse(-20, -10, 3, 3);
    pop();
  }

  this.touchingColour = function (col, _x, _y) {
    var c = get(_x, _y);
    if (c[1] == col) {
      console.log('touchingColour!');
      return true;
    }
  }

  this.collision = function (posX, posY, posWidth) {
    var dis = dist(this.x, this.y + 25, posX, posY);
    return (dis < posWidth);
  }

  // this.attractionPoint = function(magnitude, pointX, pointY) {
  //   this.angle = atan2(pointY-this.y, pointX-this.x);
  //   this.x += cos(this.angle) * magnitude;
  //   this.y += sin(this.angle) * magnitude;
  //   d = dist(this.x,this.y,mouseX,mouseY)
  // }
}