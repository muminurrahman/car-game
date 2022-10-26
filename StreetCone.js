class StreetCone {
  constructor() {
    this.size = 12;

    this.render = function (x, y) {
      noStroke();
      fill(255, 150, 0);
      rect(x + 200 * 1, y, this.size, this.size, 3);
      fill(255, 153, 0);
      stroke(51, 51, 51, 150);
      ellipse(x + 200 * 1, y, this.size * 3 / 4, this.size * 3 / 4);
      fill(255);
      ellipse(x + 200 * 1, y, this.size * 3 / 4 / 2, this.size * 3 / 4 / 2);
      fill(255, 153, 0);
      ellipse(x + 200 * 1, y, this.size * 3 / 4 / 2 / 2, this.size * 3 / 4 / 2 / 2);
    }
  }
}