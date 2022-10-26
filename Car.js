
class Car {
    constructor(x, y, colour) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.history = [];
        this.historyL = [];
        this.brakehis = [];
        this.brakehisL = [];
        this.braking = false;
        this.headlights = false;

        this.render = function (d) {
            grass = (this.y < 150 || this.y > height - 150);

            if (grass) {
                let v_right = createVector(this.x - d / 2, this.y + d / 2);
                let v_left = createVector(this.x - d / 2, this.y - d / 2);
                this.history.push(v_right);
                this.historyL.push(v_left);
            }

            for (let i = 0; i < this.history.length; i++) {
                let pos = this.history[i];
                let pos_left = this.historyL[i];
                noStroke();
                fill(92, 64, 51);
                rect(pos.x, pos.y, 5, 5);
                rect(pos_left.x, pos_left.y, 5, 5);
            }
            
            if (keyIsDown(DOWN_ARROW) && this.braking && !raining) {
                let b_right = createVector(this.x - d / 2, this.y + d / 2);
                let b_left = createVector(this.x - d / 2, this.y - d / 2);
                this.brakehis.push(b_right);
                this.brakehisL.push(b_left);
            }

            if (raining) {
                this.brakehis.splice(0, 1);
                this.brakehisL.splice(0, 1);
            } else {
                this.history.splice(0, 1);
                this.historyL.splice(0, 1);
            }

            for (let i = 0; i < this.brakehis.length; i++) {
                let bpos = this.brakehis[i];
                let bpos_left = this.brakehisL[i];
                noStroke();
                fill(25);
                rect(bpos.x, bpos.y, 5, 5);
                rect(bpos_left.x, bpos_left.y, 5, 5);
            }

            let backRightSkid = {
                x: 0 - d / 2,
                y: 0 + d / 2
            };
            
            let backLeftSkid = {
                x: 0 - d / 2,
                y: 0 - d / 2
            };
            
            fill(col, 0, 0); //colour picker changer

            push();
            translate(this.x, this.y);
            rotate(this.angle);

            //wheels
            fill(0);
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
            //ellipse(d/2+7,0,10,d)
            stroke(0, 0, 0, 65);
            noFill();
            rect(-2.5, -0.5, d * 0.5, d - 10); //roof
            fill(0);
            rect(-13, -0.5, d * 0.3, d - 10); //engine
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

            if (this.headlights) {
                noStroke();
                fill(255, 255, 0);
                ellipse(20, 10, 3, 3);
                ellipse(20, -10, 3, 3);
                fill(255, 255, 155, 100);
                triangle(20, 10, 80, 30, 80, -20);
                triangle(20, -10, 80, 10, 80, -30);
            }

            if (speed < 0 || this.braking) {
                fill(255, 0, 0);
                ellipse(-20, 10, 3, 3);
                ellipse(-20, -10, 3, 3);
            }
            
            if (leftFlash && counter == 0) {
                counter++;
                fill(255, 255, 0);
                ellipse(20, 10, 50, 5);
            }
            pop();
        }

        this.touchingColour = function (col, _x, _y) {
            let c = get(_x, _y);
            if (c[1] == col) {
                console.log('touchingColour!');
                return true;
            }
        }

        this.collision = function (posX, posY, posWidth) {
            let dis = dist(this.x, this.y, posX, posY);
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

        this.btn = function (mag) {
            if (keyIsDown(RIGHT_ARROW)) {
                if (speed !== 0) this.angle += 0.05;
            } else if (keyIsDown(LEFT_ARROW)) {
                if (speed !== 0) this.angle -= 0.05;
            } else if (keyCode === 65) {
                leftFlash = !leftFlash;
            }
            this.x += cos(this.angle) * mag;
            this.y += sin(this.angle) * mag;
        }

        // this.attractionPoint = function(magnitude, pointX, pointY) {
        //   this.angle = atan2(pointY-this.y, pointX-this.x);
        //   this.x += cos(this.angle) * magnitude;
        //   this.y += sin(this.angle) * magnitude;
        //   d = dist(this.x,this.y,mouseX,mouseY)
        // }
    }
}
