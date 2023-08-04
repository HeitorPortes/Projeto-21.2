var PLAY = 1;
var END = 0;
var GameState = PLAY;

var tucano, tucano_voando, tucano_collided;
var ground, groundGif;

var nuvemGroup, nuvemGif;
var obstaculosGroup, carcara, coruja, bemTV;

var invisibleBlock, invisibleBlock2;

var score;

var jumpSound, dieSound;

var restartGif, gameOverPng, gameOver, restart;

function preload(){
    tucano_voando = loadImage("Tucano.gif");
    tucano_collided = loadImage("tucano2.png");

    groundGif = loadImage("Ground.gif");

    nuvemGif = loadImage("nuvem.png");

    carcara = loadImage("carcara1.png");
    coruja = loadImage("Coruja.png");
    bemTV = loadImage("BemTv.png");

    restartGif = loadImage("restart.png");
    gameOverPng = loadImage("gameOver.png");

    jumpSound = loadSound("jump.mp3");
    dieSound = loadSound("tucanoDead.mp3");

}

function setup() {
    createCanvas(600, 200);
    
    ground = createSprite(200,180,400,20);
  ground.addImage(groundGif);
  ground.x = ground.width /2;
  ground.scale=1000000000000;
    
    tucano = createSprite(35,100,20,20);
    tucano.addImage(tucano_voando);
    
    tucano.scale = 2;

    invisibleBlock=createSprite(300,220,1000,10);
    invisibleBlock.visible = false;

   invisibleBlock2=createSprite(300,0.0001,1000,1);
   invisibleBlock2.visible = false;

  gameOver = createSprite(300,100,20,20);
  gameOver.addImage(gameOverPng);
  gameOver.scale = 100;

  restart = createSprite(300,140,20,20);
  restart.addImage(restartGif);
  restart.scale = 3;

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  obstaculosGroup = createGroup();
  nuvemGroup = createGroup();

  score = 0;

  tucano.setCollider("circle",0,0,10);

}

function draw() {
    background("lightblue");
  
  text("Score: "+ score, 500,50);
  
  

  if(GameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    
    ground.velocityX = -(6
      +score/1000);
    
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("SPACE")){
      tucano.velocityY = -10;
      jumpSound.play();
    }
    
    tucano.velocityY = tucano.velocityY + 0.8
  
    spawnClouds();
  
    spawnObstacles();
    
    if(obstaculosGroup.isTouching(tucano)){
        GameState = END;
        dieSound.play();
    }

    if(invisibleBlock.isTouching(tucano) || invisibleBlock2.isTouching(tucano)){
      GameState = END;
      dieSound.play();
    }
  
  }
   else if (GameState === END) {
     
      gameOver.visible = true;
      restart.visible = true;

      ground.velocityX = 0
     
      tucano.velocityY = 0
     
      tucano.addImage(tucano_collided);
     
    obstaculosGroup.setLifetimeEach(-1);
    nuvemGroup.setLifetimeEach(-1);
     
     obstaculosGroup.setVelocityXEach(0);
     nuvemGroup.setVelocityXEach(0);
   }

   if(mousePressedOver(restart)){
    reset();
   }

    drawSprites();

 
}

function reset(){
    GameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
  
    tucano.addImage(tucano_voando);
    tucano.y = 100;

    obstaculosGroup.destroyEach();
    nuvemGroup.destroyEach();
    score = 0;
  
    tucano.changeImage(tucano_voando);
  }

  function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,110,10,40);
      obstacle.velocityX = -(6+score/1000);
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle.addImage(bemTV);
                 break;
         case 2: obstacle.addImage(carcara);
                 break;
         case 3: obstacle.addImage(coruja);
                 break;
         default: break;
       }

       obstacle.scale = 2;
       obstacle.lifetime = 300;
      
       obstaculosGroup.add(obstacle);
    }
   }

   function spawnClouds() {
    if (frameCount % 60 === 0) {
       var nuvem = createSprite(600,110,10,40);
      nuvem.y = Math.round(random(1));
      nuvem.addImage(nuvemGif);
      nuvem.scale = 3;
      nuvem.velocityX = -3;
      
      nuvem.lifetime = 300;
      
     nuvemGroup.add(nuvem);
      }
  }