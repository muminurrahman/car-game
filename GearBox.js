class GearBox {
  constructor() {
    this.x = 1250;
    this.y = 575;
    this.gearStickX = this.x;
    this.gearStickY = this.y;
    this.gear = 0;

    this.render = function () {
      noStroke();

      fill(150);
      rect(this.x, this.y, 200, 200, 10);

      fill(75);
      rect(this.x, this.y, 150, 20);
      rect(this.x - 70, this.y, 20, 125);
      rect(this.x, this.y, 20, 125);
      rect(this.x + 70, this.y, 20, 125);

      textSize(16);
      text("1", this.x - 75, this.y - 75);
      text("2", this.x - 75, this.y + 85);
      text("3", this.x - 5, this.y - 75);
      text("4", this.x - 5, this.y + 85);
      text("5", this.x + 65, this.y - 75);
      text("R", this.x + 65, this.y + 85);

      fill(0);
      ellipse(this.gearStickX, this.gearStickY, 50, 50);
    }

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
          this.gearStickX = 1320;
          this.gearStickY = 645;
          break;
        case 1:
          this.gearStickX = 1180;
          this.gearStickY = 505;
          break;
        case 2:
          this.gearStickX = 1180;
          this.gearStickY = 645;
          break;
        case 3:
          this.gearStickX = 1250;
          this.gearStickY = 505;;
          break;
        case 4:
          this.gearStickX = 1250;
          this.gearStickY = 645;;
          break;
        case 5:
          this.gearStickX = 1320;
          this.gearStickY = 505;
          break;
        default:
          this.gearStickX = 1250;
          this.gearStickY = 575;
      }
      this.gear = gear;
    }
  }
}