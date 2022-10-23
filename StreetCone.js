function StreetCone() {
  var size = 12;

  this.render = function (x, y) {
    rectMode(CENTER);
    noStroke();
    fill(255, 150, 0)
    rect(x + 200 * 1, y, size, size, 3);
    fill(255, 153, 0)
    stroke(51, 51, 51, 150)
    ellipse(x + 200 * 1, y, size * 3 / 4, size * 3 / 4);
    fill(255)
    ellipse(x + 200 * 1, y, size * 3 / 4 / 2, size * 3 / 4 / 2);
    fill(255, 153, 0)
    ellipse(x + 200 * 1, y, size * 3 / 4 / 2 / 2, size * 3 / 4 / 2 / 2);
  }
}