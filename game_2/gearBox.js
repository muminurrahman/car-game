function gearBox(x,y){
  this.x = x;
  this.y = y;
  gearX = this.x;
  gearY = this.y;
  if(gearX <= this.x-70){
    gearX = this.x-70
  }
  var gearIsDwn = false;
  var gearIsUp = false;
  this.create = function(){
    rectMode(CENTER)
    ellipseMode(CENTER)
    noStroke()
    // text(this.x-)
    fill(150)
    rect(this.x,this.y,200,200,10)
    fill(75)

    rect(this.x,this.y,150,20)
    text("3",this.x,this.y-80)
    text("4",this.x,this.y+80)

    rect(this.x-70,this.y,20,125)
    text("1",this.x-70,this.y-80)

    rect(this.x,this.y,20,125)
    text("2",this.x-70,this.y+80)

    rect(this.x+70,this.y,20,125)
    text("5",this.x+70,this.y-80)
    text("R",this.x+70,this.y+80)
    fill(0)
    ellipse(gearX,gearY,50,50)

  }
}
