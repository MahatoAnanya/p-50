  var PLAY = 1;
  var END = 0;
  var gameState =PLAY

  var girl,girl_running;
  var butterfly,butterfly_flying
  var backGround, invisibleGround, backgroundImage;
   
  var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
  var butterfliesGroup;

  var score;
  var gameOverImg,restartImg;
  var jumpSound,dieSound
  

   
 function preload(){
    girl_running=loadImage('girl2.gif') ;
    butterfly=loadImage("butterfly.gif") 
  backgroundImage = loadImage("backGround.png");

  obstacle1 = loadImage("obstacle1.jpg");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png")


  }


 function setup() {
    createCanvas(800,400);
  girl = createSprite(400, 200, 50, 50);
  girl=addAnimation("running",girl_running)
  girl.scale = 1.5
  girl.setCollider("circle",0,0,300)
  girl.debug=true

  //butterfly = createSprite(450,300,30,30);
  //butterfly=addAnimation("butterfly",butterfly)
  

  backGround = createSprite(x,y,400,400);
  backGround.addImage("backGround",backGroundImage);
  backGround.x = backGround.width /2;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;


  obstaclesGroup = createGroup()
  butterfliesGroup = createGroup()

  score = 0



  }

  function draw() {
  background(255);  
  
  text("Score: "+ score, 500,50);

  girl.x=camera.position.x-200

  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;

    backGround.velocityX=-3

    //score = score + Math.round(getFrameRate()/60)


  }
if(keyDown("space") && girl.y >= 100){
 girl.velocityY = -12;
  jumpSound.play();
}

girl.velocityY = girl.velocityY + 0.8

spawnButterflies()
spawnObstacles()

if(butterfliesGroup.isTouching(girl)){
  score += 1
}

if(obstaclesGroup.isTouching(girl)){
  gameState = END;
  butterfliesGroup.destroyEach()
}
else if (gameState === END){
  gameOver.visible=true
  restart.visible=true

  girl.changeAnimation("collided",girl_collided);


  backGround.velocityX = 0

  obstaclesGroup.setLifetimeEach(-1);
  butterfliesGroup.setLifetimeEach(-1)
}

  //girl.velocityY = girl.velocityY + 0.8
if(mousePressedOver(restart)){
  reset();
}

  drawSprites();

}
function reset(){
  gameState=PLAY
  obstaclesGroup.destroyEach()
  girl.changeAnimation("running",girl_running)
  gameOver.visible=false
  restart.visible=false
  score=0
}

function spawnButterflies(){
  if (frameCount % 150 === 0) {

    var butterfly = createSprite(camera.position.x+500,330,40,10);

    butterfly.debug=true;
   butterfly.velocityX = -(6 + 3*score/100)
   butterfly.scale = 0.6;
    
    
              
    butterfly.scale = 0.05;
     
     butterfly.lifetime = 400;
    
     butterfly.setCollider("rectangle",0,0,butterfly.width/2,butterfly.height/2)
    
    butterfliesGroup.add(butterfly);
    
}
}

function spawnObstacles(){
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,330,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;
              
    obstacle.debug=true    
    obstacle.lifetime = 400;
    
    obstaclesGroup.add(obstacle);
    
  }
}









