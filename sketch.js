var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImg,cloudGroup
var obstacle,obstacleImg1,obstacleImg2,obstacleImg3,obstacleImg4,obstacleImg5,obstacleImg6,obstacleGroup
var PLAY = 1
var END = 0
var score =0 
var gameState = PLAY
var gameOver,gameOverImg
var restart,restartImg

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  obstacleImg1 = loadImage("obstacle1.png");
  obstacleImg2 = loadImage("obstacle2.png");
    obstacleImg3 = loadImage("obstacle3.png");
   obstacleImg4 = loadImage("obstacle4.png");
  obstacleImg5 = loadImage("obstacle5.png");
  obstacleImg6 = loadImage("obstacle6.png");
cloudImg = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("collided", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudGroup = new Group()
  obstacleGroup = new Group()
  
  gameOver = createSprite(300,80,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,120,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
}

function draw() {
  background(180);
  text("Score: "+Math.round(score),500,50)
  if(gameState === PLAY){
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  score = score+0.1;
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnCloud();
    
  spawnObstacle();
    if(trex.isTouching(obstacleGroup)){
      gameState = END
    }
  }else if(gameState === END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    restart.visible = true;
    gameOver.visible = true;
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided)
    if(mousePressedOver(restart)){
      reset()
    }
  }
  drawSprites();
}
function spawnCloud(){
  if(frameCount % 60 ===  0 ){
    cloud = createSprite(600,Math.round(random(20,150)),10,10);
    cloud.addImage(cloudImg);
    cloud.velocityX = -3;
    cloud.lifeTime = 200;
    cloud.scale = 0.5; 
    trex.depth = cloud.depth+1;
    cloudGroup.add(cloud);
  }    
}

function spawnObstacle(){
  if(frameCount % 60 === 0){
    obstacle = createSprite(600,165,10,10);
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage(obstacleImg1)  
        break;
        case 2: obstacle.addImage(obstacleImg2)
        break;
         case 3: obstacle.addImage(obstacleImg3)
        break;
         case 4: obstacle.addImage(obstacleImg4)
        break;
         case 5: obstacle.addImage(obstacleImg5)
        break;
         case 6: obstacle.addImage(obstacleImg6)
        break;
    }
    obstacle.velocityX = -4;
    obstacle.lifeTime = 300;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.5;
  }
}

function reset(){
  score = 0;
  gameState = PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running", trex_running);
  
}
