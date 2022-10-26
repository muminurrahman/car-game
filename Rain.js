// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

class Rain {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    this.update = function () {
      this.z = this.z + rain_s;

      if (this.z > 1500) {
        this.z = width;
        this.x = random(width, -width);
        this.y = random(height, -height);
        this.pz = this.z;
      }
    }

    this.render = function () {
      fill(255);
      noStroke();

      let sx = map(this.x / this.z, 0, 1, 0, width);
      let sy = map(this.y / this.z, 0, 1, 0, height);

      let r = map(this.z, 16, 0, 0, width);
      //ellipse(sx, sy, r, r);
      let px = map(this.x / this.pz, 0, 1, 0, width);
      let py = map(this.y / this.pz, 0, 1, 0, height);

      this.pz = this.z;

      stroke(255);
      line(px, py, sx, sy);
    }
  }
}