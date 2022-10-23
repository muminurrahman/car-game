function GearBox() {
  this.x = 1250;
  this.y = 575;
  gearX = this.x;
  gearY = this.y;
  this.gear = 0;

  if (gearX <= this.x - 70)
    gearX = this.x - 70;

  var gearIsDwn = false;
  var gearIsUp = false;

  this.render = function () {
    rectMode(CENTER);
    ellipseMode(CENTER);
    noStroke();
    // text(this.x-)
    fill(150);
    rect(this.x, this.y, 200, 200, 10);
    fill(75);
    textSize(13);
    rect(this.x, this.y, 150, 20);
    text("3", this.x, this.y - 80);
    text("4", this.x, this.y + 80);

    rect(this.x - 70, this.y, 20, 125);
    text("1", this.x - 70, this.y - 80);

    rect(this.x, this.y, 20, 125);
    text("2", this.x - 70, this.y + 80);

    rect(this.x + 70, this.y, 20, 125);
    text("5", this.x + 70, this.y - 80);
    text("R", this.x + 70, this.y + 80);
    fill(0);
    ellipse(gearX, gearY, 50, 50);
  };

  this.getGear = function () {
    return this.gear;
  }

  this.shiftGearUp = function () {
    this.gear++;
    if (this.gear > 5) this.gear = 5;
    this.setGear(this.gear);
  }

  this.shiftGearDown = function () {
    this.gear--;
    if (this.gear < -1) this.gear = -1;
    this.setGear(this.gear);
  }

  this.setGear = function (gear) {
    switch (gear) {
      case -1:
        this.gear = gear;
        gearX = 1320;
        gearY = 645;
        break;
      case 1:
        this.gear = gear;
        gearX = 1180;
        gearY = 505;
        break;
      case 2:
        this.gear = gear;
        gearX = 1180;
        gearY = 645;
        break;
      case 3:
        this.gear = gear;
        gearX = 1250;
        gearY = 505;;
        break;
      case 4:
        this.gear = gear;
        gearX = 1250;
        gearY = 645;;
        break;
      case 5:
        this.gear = gear;
        gearX = 1320;
        gearY = 505;
        break;
      default:
        this.gear = gear;
        gearX = 1250;
        gearY = 575;
    }
  }
}