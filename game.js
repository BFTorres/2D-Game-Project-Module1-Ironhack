
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
//img player and enemies 
let playerImg = new Image();
playerImg.src = "./game-resources/assets/GUAR 3.png";

let racerImg = new Image();
racerImg.src = "./game-resources/assets/racer-removebg-preview.png"

let mudcrabImg = new Image ()
mudcrabImg.src = './game-resources/assets/daedra .png'
//audio
let splashScreenMusic = new Audio("./game-resources/audio/The Elder Scrolls 高齢者のスクロール.mp3");
splashScreenMusic.loop = true;

let gameMusic = new Audio("./game-resources/audio/Argonians Are Property (Dunmer Trap).mp3");
gameMusic.loop = true;

let endGame = new Audio("./game-resources/audio/Oblivion-guard-MEME.mp3");

//variables
let muted;
let score; 
let scoreText;
let highscore; 
let highscoreText;
let player;
let grav; 
let enemies = [];
let gameSpeed;
let keys = {};
let isWasted = false;
let gameOverScreen;
let winGScreen; // inwork
let splashScreen;
let canvasContainer;

//>>classes<<//


class Player {
  constructor (x, y, width, height, colour) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dirY = 0; 
    this.jumpForce = 12; 
    this.grounded = false;
    this.jumpTimer = 0;
  }

  /*jump() {
    if (this.y < 150) {
    } else {
      this.speed = -5;
    }
  }*/

  animation() {
    //pular
    if (keys["Space"]) { 
      this.jump();
    } else {
        this.jumpTimer = 2;  // 0 
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
        this.dirY = -this.jumpForce - (this.jumpTimer / 50);
      }
    }
   draw(){ 
      ctx.drawImage(playerImg, this.x, this.y, this.width, this.height)
    } 
  }  

  //////////////////////////////////////////////
 
/////////////////////////////////////////////////////////////////

// npc
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
////////////////////
  /*let villianImages = [mudcrabImg, racerImg]
  let lanes = [350, 430]
  let villians = [
    {
        img: villianImages[Math.floor(Math.random() * villianImages.length)],
        x: canvas.width,
        y: lanes[Math.floor(Math.random() * lanes.length-20)]
    }
]*/
//////////////////////
}
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
    ctx.font = this.size +"px";
    ctx.textAlign = this.alignment
    ctx.fillText(this.text, this.x, this.y);
    ctx.closePath();
  }
}
//>>functions<<//
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function createEnemies(){ 
  let size = randomRange(60, 170);// player = new Player(180, canvas.height, 160, 220, "#ff7575");
  let type = randomRange(0, 1);
  let enemy = new Enemy(canvas.width + size, canvas.height - size, size, size, '#bf1313');
 
  if (type == 1) {
        enemy.y -= player.originalHeight - 15;
      }
      enemies.push(enemy);

//diff size npc
function randomRange(min, max) { 
  return Math.round(Math.random() * (max - min) + min);
    }
 }
//timer
let initialSpawnTimer = 150;
let spawnTimer = initialSpawnTimer;
//splash
function splash(){
  let body = document.querySelector("body")
  splashScreen = document.createElement("div")
  splashScreenMusic.play();
  splashScreenMusic.volume = 0.30
  splashScreen.classList.add("splashScr")
  splashScreen.innerHTML = `
    <button class="start-btn">GO</button> 
    <h2 class= "memes"></h2>
    <h2 class= "memes">"Getting high in High-Rock and hammered in Hammerfell." - M'aiq the Liar</h2>
    <h4 class= "rights">All rights reserved to: Bethesda Games Studio. Music by AllinAll, YoungScrolls.</h4>`
  body.appendChild(splashScreen)
  let splashBtn = splashScreen.querySelector(".start-btn")
  splashBtn.addEventListener("click", function() {
      splashScreenMusic.pause();
      splashScreen.currentTime = 0
      gameMusic.play()
      gameMusic.volume = 0.30
      startGame();
    })
}
function addCanvas() {
  canvasContainer = document.createElement("div")
  canvasContainer.setAttribute("id", "canvas-container")
  canvasContainer.innerHTML = `<canvas id="game" width="1200" height="700"></canvas>`
  body.appendChild(canvasContainer)
}
//start
function startGame(){
    isWasted = false
  splashScreen.remove()
  addCanvas()
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d")
  console.log("starGame function called")
  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight;
  //basics
  ctx.font = "20px"; 
  gameSpeed = 3; 
  grav = 1; 
  score = 0; 
  highscore = 1000; //0
  // N'WAH Stats
  player = new Player(180, canvas.height, 160, 220, "#ff7575");
  // Score Stats
  scoreText = new Statistics("Vivec's blessings: " + score, 600, 30, "left", "#ff7575", "30")
  highscoreText = new Statistics("Moonsugar: " + highscore, canvas.width - 25, 25, "right", "#ff7575", "30");
  requestAnimationFrame(updateGame)     
}
/////////////////////inwork
//Wasted Screen
function win(){
  winG.currentTime = 0
  winG.play();
  winG.volume = 0.30;
  canvasContainer.remove();
  let body = document.querySelector("body") 
  winGScreen = document.createElement("div")
  winGScreen.classList.add("gameOverScr")
  winGScreen.innerHTML = `
  <button class="reset-btn">RESET</button>
  <div class="score">
  <h2 class = "scoreText">Come to me, through fire and war. I welcome you, sweet N'Wah!</h2>
 
  <h3 class= "scoreNum">${score}</h3> // Place meme instead of Score 

  <h4 class= "rights">All rights reserved to: Bethesda Games Studio. Music by AllinAll, YoungScrolls.</h4>`;
body.appendChild(winGScreen) 
    let reset = winGScreen.querySelector(".reset-btn")
    reset.addEventListener("click", function() {
        gameMusic.play()
        newGame();
  })  
}

//Win screen
function gameOver(){
    endGame.currentTime = 0
    endGame.play();
    endGame.volume = 0.30;
    canvasContainer.remove();
    let body = document.querySelector("body") 
    gameOverScreen = document.createElement("div")
    gameOverScreen.classList.add("gameOverScr")
    gameOverScreen.innerHTML = `
    <button class="reset-btn">RESET</button>
    <div class="score">
    <h2 class = "scoreText">Vivec's Blessings</h2>
    <h3 class= "scoreNum">${score}</h3>
    <h2 class= "quote"><em>"It just works." - Todd Howard</h3>
    <h4 class= "rights">All rights reserved to: Bethesda Games Studio. Music by AllinAll, YoungScrolls.</h4>`;
  body.appendChild(gameOverScreen) 
  let reset = gameOverScreen.querySelector(".reset-btn")
    reset.addEventListener("click", function() {
      gameMusic.play()
      newGame();
    })  
  }

function newGame() { 
  gameOverScreen.remove(); 
  winGScreen.remove(); 
  let body = document.querySelector("body")
    highscore = 0;
    highscoreText;
    grav = 1;
    enemies = [];
    gameSpeed = 2;
    keys = {};
    isWasted= false;
    // loop acaba aqui 
    initialSpawnTimer = 200;
    spawnTimer = 100;
  startGame();
  //////////////////////////////
  mute();
  let muteBtn = document.querySelector("#mute");
  if (muted) {
    game.music.pause();
    muteBtn.innerHTML = `<img src ="./img/soundOff.png" alt="Sound Off"/>`;
  } else {
    game.music.play();
    muteBtn.innerHTML = `<img src ="./img/soundOn.png" alt="Sound On"/>`;
  };
  ///////////////////////////////
}

const mute = () => {
    let muteBtn = document.querySelector("#mute");
    muteBtn.addEventListener("click", () => {
      if (muted) {
        game.music.play();
        muteBtn.innerHTML = `<img src ="./img/soundOn.png" alt="Sound On"/>`;
      } else {
        game.music.pause();
        muteBtn.innerHTML = `<img src ="./img/soundOff.png" alt="Sound Off"/>`;
      }
      muted = !muted;
    });
  };
/////////////////////////////////////////////////


// tira o canvas
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // le spawning 
  spawnTimer--;
  if (spawnTimer <= 0) {
    createEnemies();
    spawnTimer = initialSpawnTimer - gameSpeed * 50; 
    console.log(gameSpeed)
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
      gameSpeed = 2;
      isWasted = true
      gameOver();     
  }
  if (!isWasted) e.update()
  console.log("game continues")
}
  player.animation();
  gameSpeed += 0.010; 
  score ++;
  scoreText.text = "Score: " + score;
  scoreText.draw();
  if (score > highscore) {
    highscore = score;
    highscoreText.text = "Highscore: " + highscore;   
  }
  if (!isWasted) requestAnimationFrame(updateGame)
}
window.addEventListener("load", splash)


