let body = document.querySelector("body")
let canvas;
let ctx;

//classes//
class Player {
    constructor (x, y, width, height, colour) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;      
      this.dirY = 0; 
      this.jumpForce = 17;      
      this.grounded = false;
      this.jumpTimer = 0;
    }
  
    animation() {
  
      //jump
      if (keys["Space"]) { 
        this.jump();
      } else {
          this.jumpTimer = 0;
        }
  
        this.y += this.dirY;

//gravity
if (this.y + this.height < canvas.height) {
    this.dirY += gravity;
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


//variables

let isGameOver = false; 
let gameOverScreen;
let splashScreen;
let canvasContainer;
let score; 
let scoreText;
let gravity; 
let enemies = [];
let gameSpeed; 
let keys = {};
let highscore; 
let highscoreText;
let player;

//event listeners//

document.addEventListener("keydown", function (even) {
    keys[even.code] = true;
  });
  
  document.addEventListener("keyup", function (even){
    keys[even.code] = false;
  })

//img

let playerImg = new Image();
playerImg.src = "assets/GUAR 3.png";

let enemyImg = new Image();
enemyImg.src = "assets/racer.png"

//audio

let fm = new Audio();
fm.src = "audio/The Elder Scrolls 高齢者のスクロール.mp3"

let gm = new Audio();
gm.src = "audio/Argonians Are Property (Dunmer Trap).mp3"

let go = new Audio();
go.src = "audio/Dagoth Ur - Dagothwave.mp3"




//splash

function splash(){
    let body = document.querySelector("body")
    splashScreen = document.createElement("div")
    fm.play();
    fm.volume = 0.05
    splashScreen.classList.add("splashScr")
    splashScreen.innerHTML = `
      <button class="start-btn">START GAME</button>         
      <img src="" alt="Start" class="">
    `
    body.appendChild(splashScreen)
    let splashBtn = splashScreen.querySelector(".start-btn")
    splashBtn.addEventListener("click", function() {
        fm.pause();
        splashScreen.currentTime = 0
        gm.play()
        gm.volume = 0.05
        startGame();
      })
  }

  function addCanvas(){
    canvasContainer = document.createElement("div")
    canvasContainer.setAttribute("id", "canvas-container")
    canvasContainer.innerHTML = `<canvas id="game" width="1200" height="700"></canvas>`
    body.appendChild(canvasContainer)
  }
  

//npc

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
  
    draw() { 
      ctx.drawImage(enemyImg, this.x, this.y, this.width, this.height)
    }
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
      ctx.font = this.size +"Planewalker";
      ctx.textAlign = this.alignment
      ctx.fillText(this.text, this.x, this.y);
      ctx.closePath();
    }
  }
     
//-----------FUNCTIONS--------------//



function createEnemies(){ //CREATE ENEMIES WITH RANDOM SIZE
  let size = randomRange(50, 150); 
  let type = randomRange(0, 1);
  let enemy = new Enemy(canvas.width + size, canvas.height - size, size, size, '#bf1313');

  if (type == 1) {
    enemy.y -= player.originalHeight - 10; 
  }
  enemies.push(enemy);
}

//diff size e

function randomRange(min, max) { 
  return Math.round(Math.random() * (max - min) + min);
}

//Timer enemies
let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;


//start
function startGame(){
    isGameOver = false
    splashScreen.remove()
    addCanvas()
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d")
    console.log("starGame function called")
    //change canvas
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
  
    //chars 
    ctx.font = "20px arial"; 
    gameSpeed = 3; 
    gravity = 1; 
    score = 0; 
    highscore = 0; 
  
    //plyer chars
    player = new Player(120, canvas.height, 60, 90, "#4a823e");
  
    //score stats
    scoreText = new Statistics("Score: " + score, 25, 25, "left", "#bababa", "30")
  
    highscoreText = new Statistics("Highscore: " + highscore, canvas.width - 25, 25, "right", "#bababa", "30");
  
    requestAnimationFrame(updateGame)     
  }


//wasted

function gameOver(){
    endGame.currentTime = 0
    endGame.play();
    endGame.volume = 0.05;
    canvasContainer.remove();
    let body = document.querySelector("body") 
  
    gameOverScreen = document.createElement("div")
    gameOverScreen.classList.add("gameOverScr")
    gameOverScreen.innerHTML = `
    <button class="reset-btn">RESET</button>
    <div class="score">
  
    <h2 class = "scoreText">SCORE</h2>
    <h3 class= "scoreNum">${score}</h3>
    <h2 class= "quote"><em>"It just works." - Todd Howard</h3>
    
    `;  
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
      highscore = 0; 
      highscoreText;
      gravity = 1; 
      enemies = [];
      gameSpeed = 3;
      keys = {};
      isGameOver = false;
      initialSpawnTimer = 200;
      spawnTimer = 100;

  
    startGame();
  }




  function updateGame() {
   
    ctx.clearRect(0, 0, canvas.width, canvas.height) 
  
    //spawn npc
    spawnTimer--;
    if (spawnTimer <= 0) {
      createEnemies();
      spawnTimer = initialSpawnTimer - gameSpeed * 50; 
      console.log(gameSpeed)
      if (spawnTimer < 100) {
        spawnTimer = 100;
      }
    }



//collision

if (e.x + e.width < 0) {
    enemies.splice(i, 1);
  }


  if (
    player.x < e.x + e.width && 
    player.x + player.width > e.x &&
    player.y < e.y + e.height &&
    player.y + player.height > e.y
    ){
      
      gameMusic.pause()    
      gameMusic.currentTime = 0  
      enemies = []; 
      
      spawnTimer = initialSpawnTimer; 
      gameSpeed = 3; 
      isGameOver = true
      gameOver();
      
  }

 
//npc loop
  for (let i = 0; i < enemies.length; i ++) { 
    let e = enemies[i];
  }


  if (!isGameOver) e.update()
  console.log("game continues")


  player.animation();
  
  gameSpeed += 0.020; 

  score ++;
  scoreText.text = "Score: " + score;
  scoreText.draw();

  if (score > highscore) {
    highscore = score;
    highscoreText.text = "Highscore: " + highscore;
  }

  if (!isGameOver) requestAnimationFrame(updateGame)
}



//start
window.addEventListener("load", splash)