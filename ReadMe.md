The Legend of N'Wah 

Link Deploy

Description

Greetings Outlander, The Legend of N'wah is a simplistic game where  you, our Lord and Saviour, has to jump over over-sized mushrooms and collect the monstrous Cliff Racers to save our beloved Morrowind, as Saint Jiub did before you! The game ends when 'a certain amount of' Cliff Racers were collected. 

MVP

    - Player moves horizontally 
    - Player jumps
    - Mushroom obstacles
    - Cliff Racer stacks 
    - collision with Mushroom ends game
    - Stack end game 

Backlog

    -
    -

Data structure

 main.js

    - StartScreen
    - GameScreen
    - EndGameScreen

game.js
   
    - Game
    - checkCollisions
    - addCliffracer
    - addMushroom
    - clearCanvas
    - updateCanvas
    - drawCanvas
    - GameOver

nwah.js

    - Nwah
    - draw
    - move
    - checkScreenCollision

 mushroom.js

    - Mushroom
    - draw
    - move
    - checkCollision

cliffracer.js

    - Cliffracer
    - draw
    - move
    - checkCollision


States y States Transitions

    - StartScreen
    - GameScreen
    - WastedScreen 
    - WinScreen
   
Task

    - main - buildDom
    - main - buildSplashScreen
    - main - addEventListener
    - main - buildGameScreen
    - main - buildGameOverScreen
    - game - startLoop
    - game - buildCanvas
    - game - updateCanvas
    - game - drawCanvas
    - mushroom - draw
    - mushroom - move
    - mushroom - collision
    - game - addMushroom
    - nwah - draw
    - nwah - move
    - nwah - jump
    - game - addNwah
    - cliffracer - draw
    - cliffracer - move
    - cliffracer - collision
    - game - addCliffracer
    - game - checkCollision
    - game - GameOver
    - game - addEventListener



Additional Links

Trello
Link url

Slides

Link Slides.com
