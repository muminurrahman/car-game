class Road {
  constructor() {
    let asphalt = 400;
    let paint = asphalt / 4;

    this.render = function () {
      noStroke();
      fill(100);
      rect(width / 2, height / 2, width, asphalt);
      fill(255);
      rect(width / 2, height / 2, width, 6);

      for (let i = 0; i < width + 20; i = i + 40) {
        fill(255);
        rect(i, height / 2 - paint, 25, 6);
        rect(i, height / 2 + paint, 25, 6);
      }
    }
  }
}