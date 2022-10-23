
function Car(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.history = [];
    this.historyL = [];
    this.brakehis = [];
    this.brakehisL = [];

    this.create = function (d) {
        grass = (this.y < 150 || this.y > height - 150);

        if (grass) {
            var v_right = createVector(this.x - d / 2, this.y + d / 2)
            var v_left = createVector(this.x - d / 2, this.y - d / 2)
            this.history.push(v_right)
            this.historyL.push(v_left)
            if (this.history.length > 50) {
                this.history.splice(0, 1)
            }
            if (this.historyL.length > 50) {
                this.historyL.splice(0, 1)
            }
        }
        for (var i = 0; i < this.history.length; i++) {
            var pos = this.history[i];
            var pos_left = this.historyL[i];
            noStroke();
            fill(139, 69, 19);
            rect(pos.x, pos.y, 5, 5);
            rect(pos_left.x, pos_left.y, 5, 5);
        }
        if (keyIsDown(DOWN_ARROW)) {
            var b_right = createVector(this.x - d / 2, this.y + d / 2);
            var b_left = createVector(this.x - d / 2, this.y - d / 2);
            this.brakehis.push(b_right);
            this.brakehisL.push(b_left);
            if (this.brakehis.length > 50) {
                this.brakehis.splice(0, 1);
            }
            if (this.brakehisL.length > 50) {
                this.brakehisL.splice(0, 1);
            }
        }
        for (var i = 0; i < this.brakehis.length; i++) {
            var bpos = this.brakehis[i];
            var bpos_left = this.brakehisL[i];
            noStroke();
            fill(25);
            rect(bpos.x, bpos.y, 5, 5);
            rect(bpos_left.x, bpos_left.y, 5, 5);
        }
        var backRightSkid = {
            x: 0 - d / 2,
            y: 0 + d / 2
        }
        var backLeftSkid = {
            x: 0 - d / 2,
            y: 0 - d / 2
        }
        fill(col, 0, 0); //colour picker changer
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        rectMode(CENTER);

        //wheels
        fill(0);
        rect(0 - d / 2, 0 + d / 2, d / 5, d / 10); //back right
        rect(0 + d / 2, 0 + d / 2, d / 5, d / 10); //front right
        rect(0 - d / 2, 0 - d / 2 - 1, d / 5, d / 10); //back left
        rect(0 + d / 2, 0 - d / 2 - 1, d / 5, d / 10); //front left

        noStroke();
        fill("silver");
        rect(0, 0, d * 1.6, d);
        ellipse(-d / 2 - 7, 0, 10, d);
        triangle(d / 2 + 7, 0, 25, 8, d / 2 + 7, 12.5);
        triangle(d / 2 + 7, 0, 25, -8, d / 2 + 7, -12.5);
        triangle(d / 2 + 7, 0, 25, 8, 25, -8);
        //ellipse(d/2+7,0,10,d)


        stroke(0, 0, 0, 65);
        noFill();
        rect(-2.5, -0.5, d * 0.5, d - 10); //roof
        fill(0);
        rect(-13, -0.5, d * 0.3, d - 10); //engine
        noStroke();
        fill(0);
        ellipse(-16, 0, d * 0.3, d - 11)
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

        if (headlights) {
            noStroke();
            fill(255, 255, 0);
            ellipse(20, 10, 3, 3);
            ellipse(20, -10, 3, 3);
            fill(255, 255, 155, 100);
            triangle(20, 10, 80, 30, 80, -20);
            triangle(20, -10, 80, 10, 80, -30);
        }

        if (speed < 0 || braking) {
            fill(255, 0, 0);
            ellipse(-20, 10, 3, 3);
            ellipse(-20, -10, 3, 3);
        }
        if (leftFlash && counter == 0) {
            counter++;
            fill(255, 255, 0);
            ellipse(20, 10, 5, 5);
        }
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
        var dis = dist(this.x, this.y, posX, posY);
        return (dis < posWidth);
    }
    this.edges = function () {
        if (this.x > width) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = width;
        }
        if (this.y < 0) {
            this.y = height;
        }
        if (this.y > height) {
            this.y = 0;
        }
    }
    // this.attractionPoint = function(magnitude, pointX, pointY) {
    //   this.angle = atan2(pointY-this.y, pointX-this.x);
    //   this.x += cos(this.angle) * magnitude;
    //   this.y += sin(this.angle) * magnitude;
    //   d = dist(this.x,this.y,mouseX,mouseY)
    // }
    this.btn = function (mag) {
        if (keyIsDown(RIGHT_ARROW)) {
            if (speed !== 0) this.angle += 0.05;
        }
        if (keyIsDown(LEFT_ARROW)) {
            if (speed !== 0) this.angle -= 0.05;
        }
        if (keyCode === 65) {
            leftFlash = !leftFlash;
        }
        this.x += cos(this.angle) * mag;
        this.y += sin(this.angle) * mag;
    }
}
