class Player {
    constructor (x, y, width, height, colour) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.dirY = 0; 
      this.jumpForce = 18; 
      this.grounded = false;
      this.jumpTimer = 0;
    }
    animation() {
      //pular
      if (keys["Space"]) { 
        this.jump();
      } else {
          this.jumpTimer = 0;  // 0 
        }
     this.y += this.dirY;
      //gravity
      if (this.y + this.height < canvas.height) {
        this.dirY += grav;
        this.grounded = false;
      } else {
        this.dirY = 0;
        this.grounded = true;
        this.y = canvas.height - this.height;
      }  
      this.draw()
    }
    jump() {
      if (this.grounded && this.jumpTimer === 0) {
        this.jumpTimer = 1;
        this.dirY = -this.jumpForce;
      } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {       
          this.jumpTimer++;
          this.dirY = -this.jumpForce - (this.jumpTimer /50);
        }
      }
     draw(){ 
        ctx.drawImage(playerImg, this.x, this.y, this.width, this.height)
      } 
    }  