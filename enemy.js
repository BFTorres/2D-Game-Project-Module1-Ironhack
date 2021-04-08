class Enemy {
  constructor (x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.dirX = -gameSpeed;
  }
  update() {
    this.x += this.dirX;
    this.draw();
    this.dirX = -gameSpeed;
  }
  //npc crt
  draw() {
    ctx.drawImage(racerImg, this.x, this.y, this.width, this.height)
  }
}