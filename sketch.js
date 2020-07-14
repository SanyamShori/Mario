var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario;

var ground;

var cloudsGroup, cloudImage;

var coinsGroup, coin;

var goombaGroup, goomba;

var flowerGroup, flower;

var obstaclesGroup, obstacle;

var score=0;

var gameOver;

function preload(){
  
  marioImg = loadImage("mario.png");
  
  cloudImg = loadImage("cloud.png");
  
  coinImg = loadImage("coin.png");
  
  goombaImg = loadImage("goomba.png");
  
  flowerImg = loadImage("flower.png");
  
  jumpSound = loadSound("jump.mp3");
  
  coinSound = loadSound("coin.mp3");
  
  loseSound = loadSound("lose.mp3");
  
  marioSound = loadSound("mario.mp3");
  
  obstacleImg = loadImage("obstacle.png");

  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
  mario = createSprite(50,180,20,50);
  mario.addImage(marioImg);
  mario.scale = 0.2;
  
  ground = createSprite(0,180,800,7);
  ground.shapeColor = "green";
  
  coin = createSprite(400,300,40,10);
  coin.addImage(coinImg);
  
  goomba = createSprite(400,365,10,40);
  goomba.addImage(goombaImg);
  goomba.scale = 0.2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  coinGroup = new Group();
  goombaGroup = new Group();
  flowerGroup = new Group();
  
  score = 0;
  
  marioSound.play();
}

function draw() {
  background(255);
  
  
 
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
  
    if(keyDown("space") && mario.y >= 159) {
      mario.velocityY = -12;
      jumpSound.play();
    }
    
    if (coinGroup.isTouching(mario)) {
      coinGroup.destroyEach();
      score = score + 1;
      coinSound.play();
    }
    
    if (flowerGroup.isTouching(mario)) {
      flowerGroup.destroyEach();
      score = score + 5;
    }
  
    mario.velocityY = mario.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    mario.collide(invisibleGround);
    
    //spawn the functions
    spawnClouds();
    spawnObstacles();
    spawnCoins();
    spawnGoomba();
    spawnFlower();
  
    if(obstaclesGroup.isTouching(mario)){
        gameState = END;
        loseSound.play();
    }
    
    if (goombaGroup.isTouching(mario)) {
        gameState = END;
        loseSound.play();
    }
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    mario.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    goombaGroup.setVelocityXEach(0);
    flowerGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    goombaGroup.setLifetimeEach(-1);
    flowerGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,155,10,40);
    obstacle.addImage(obstacleImg);
    obstacle.y = random(115,140);  
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins () {
  if(frameCount % 160 === 0) {
    var coin = createSprite(400,300,40,10);
    coin.addImage(coinImg);
    coin.y = random(50,100);
    
    coin.velocityX = -5;
    coin.scale = 0.2;
    
    coinGroup.add(coin);
  }
}

function spawnGoomba() {
  if(frameCount % 100 === 0) 
  {
    var goomba = createSprite(400,165,10,40);
    goomba.velocityX = -3;
    
    goomba.addImage(goombaImg);

    goomba.scale = 0.1;
   
    goombaGroup.add(goomba);
  }
}

function spawnFlower() {
  if(frameCount % 600 === 0) 
  {
    var flower = createSprite(400,165,10,40);
    
    flower.addImage(flowerImg);
    flower.velocityX = -3;
    
    flower.scale = 0.2;
   
    flowerGroup.add(flower);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score = 0;
  
}