
let body = document.querySelector("body")
let canvas; 
let ctx;


//>>event listeners<<//
document.addEventListener("keydown", function (even) {
  keys[even.code] = true;
});
document.addEventListener("keyup", function (even){
  keys[even.code] = false;
})
//images
let playerImg = new Image();
playerImg.src = "./game-resources/assets/GUAR 3.png";

let racerImg = new Image();
racerImg.src = "./game-resources/assets/daedra .png"

let memeImg = new Image();
memeImg.src = "./game-resources/assets/lulu.png"

/*let mudcrabImg = new Image ()
mudcrabImg.src = './game-resources/assets/daedra .png'*/



//audio
let splashScreenMusic = new Audio("./game-resources/audio/The Elder Scrolls 高齢者のスクロール.mp3");
splashScreenMusic.loop = true;

/*let gameMusic = new Audio("./game-resources/audio/Argonians Are Property (Dunmer Trap).mp3");
gameMusic.loop = true;*/

let gameMusic = new Audio("./game-resources/audio/Dagoth Ur - Dagothwave.mp3");
gameMusic.loop = true;

let endGame = new Audio("./game-resources/audio/Oblivion-guard-MEME.mp3");


//variables
//let septims = [{x: 140, y: 0}]
//let muteAudio;
let score; 
let scoreText;
/*let highscore; 
let highscoreText;*/
let player;
let grav; 
let enemies = [];
//let memes = 
let gameSpeed;
let keys = {};
let isGameOver = false;
let gameOverScreen;
let splashScreen;
let canvasContainer;







/*class Player {
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
  }  */
// npc
/*class Enemy {
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
}*/
//score
class Statistics {
  constructor(text, x, y, alignment, colour, size) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.alignment = alignment;
    this.colour = colour;
    this.size = size;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.colour;
    ctx.font = this.size +"px Planewalker, arial";
    ctx.textAlign = this.alignment
    ctx.fillText(this.text, this.x, this.y);
    ctx.closePath();
  }
}
//>>functions<<//
function createEnemies(){ 
  let size = randomRange(150, 150);
  // player = new Player(180, canvas.height, 160, 220, "#ff7575");
  let type = randomRange(0, 1);
  let enemy = new Enemy(canvas.width + size, canvas.height - size, size, size, '#bf1313');
 
        if (type == 1) {
          enemy.y -= player.originalHeight - 10;
       }
      enemies.push(enemy);

//diff size npc
function randomRange(min, max) { 
  return Math.round(Math.random() * (max - min) + min);
    }
 }

//diff size npc
function randomRange(min, max) { 
  return Math.round(Math.random() * (max - min) + min);
    }
 
//timer
let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;
//splash
function splash(){
  let body = document.querySelector("body")
  splashScreen = document.createElement("div")
  splashScreenMusic.play();
  splashScreenMusic.volume = 0.20
  splashScreen.classList.add("splashScr")
  splashScreen.innerHTML = `
    <button class="start-btn">GO</button> 
    <h2 class= "memes">"Getting high in High-Rock and hammered in Hammerfell." - M'aiq the Liar</h2>
    <h4 class= "rights">All rights reserved to: Bethesda Games Studio. Music by AllinAll, YoungScrolls.</h4>`
  body.appendChild(splashScreen)
  let splashBtn = splashScreen.querySelector(".start-btn")
  splashBtn.addEventListener("click", function() {
      splashScreenMusic.pause();
      splashScreen.currentTime = 0
      gameMusic.play()
      gameMusic.volume = 0.20;
      startGame();
    })
}
function addCanvas() {
  canvasContainer = document.createElement("div")
  canvasContainer.setAttribute("id", "canvas-container")
  canvasContainer.innerHTML = `<canvas id="game" width="890" height="650"></canvas>`
  body.appendChild(canvasContainer)
}
//start
function startGame(){
  isGameOver = false
  splashScreen.remove()
  addCanvas()
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d")
  console.log("starGame function called")
  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight;
  //basics
  ctx.font = "20px Planewalker, arial"; 
  gameSpeed = 3; 
  grav = 1; 
  score = 0; 
  highscore = 0; //0
  // N'WAH Stats
  player = new Player(110, canvas.height, 160, 200, "#4a823e");
  // Score Stats
  scoreText = new Statistics("BUGS: " + score, 600, 30, "center", "#ff7575", "30")
  highscoreText = new Statistics("Moonsugar: " + highscore, canvas.width - 25, 25, "right", "#ff7575", "30");
  requestAnimationFrame(updateGame)     
}
//Wasted
function gameOver(){
    endGame.currentTime = 0
    endGame.play();
    endGame.volume = 0.20;
    canvasContainer.remove();
    let body = document.querySelector("body") 
    gameOverScreen = document.createElement("div")
    gameOverScreen.classList.add("gameOverScr")
    gameOverScreen.innerHTML = `
    <h2 class= "destiny"><em>Congratulations, Outlander! You fulfilled your destiny as the next ES protagonist. Now stop lollygagging and go to jail! N'Wah!</h2>
    <button class="reset-btn">RESET</button>
    <h3 class= "quote"><em>"It just works." - Todd Howard</h3>
    <div class="score">
    <h2 class = "scoreText">BUGS DETECTED</h2>
    <h3 class= "scoreNum">${score}</h3>`;
  body.appendChild(gameOverScreen) 
  let reset = gameOverScreen.querySelector(".reset-btn")
    reset.addEventListener("click", function() {
      gameMusic.play()
      newGame();
    })  
  }
function newGame() { 
  gameOverScreen.remove(); 
  let body = document.querySelector("body")
    scoreText = new Statistics("BUGS: " + score, 600, 30, "center", "#ff7575", "30")
    highscore = 0;
    highscoreText;
    grav = 1;
    enemies = [];
    gameSpeed = 3;
    keys = {};
    isGameOver = false;
    // loop acaba aqui 
    initialSpawnTimer = 200;
    spawnTimer = 100;
  startGame();
}


/////////////////////////////////////////////////


// tira o canvas
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // le spawning 
  spawnTimer--;
  if (spawnTimer <= 0) {
    createEnemies();
    spawnTimer = initialSpawnTimer - gameSpeed * 40; 
    //console.log(gameSpeed)
    if (spawnTimer < 100) {
      spawnTimer = 100;
    }
  }
//npc crt
for (let i = 0; i < enemies.length; i ++) { 
  let e = enemies[i];

  //collision mech
  if (e.x + e.width < 0) {
    enemies.splice(i, 1);
  }
  //collision
  if ( player.x < e.x + e.width && 
    player.x + player.width > e.x &&
    player.y < e.y + e.height &&
    player.y + player.height > e.y )
{
      gameMusic.pause()    
      gameMusic.currentTime = 0  
      enemies = []; 
      spawnTimer = initialSpawnTimer;
      gameSpeed = 3;
      isGameOver = true
      gameOver();     
  }
  if (!isGameOver) e.update()
  console.log("game continues")
}
  player.animation();
  gameSpeed += 0.015; 
  score ++;
  scoreText.text = "BUGS: " + score;
  scoreText.draw();
  if (score > highscore) {
    highscore = score;
    highscoreText.text = "Highscore: " + highscore;   
  }
  if (!isGameOver) requestAnimationFrame(updateGame)
}
window.addEventListener("load", splash)


