  var PLAY = 1;
  var END = 0;
  var gameState =PLAY

  var girl,girl_running;
  var butterfly,butterfly_flying
  var backGround, invisibleGround, backgroundImage;
   
  var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;


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
  butterflyGroup = createGroup()

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
if(butterflyGroup.isTouching(girl)){
  score += 1
}


  //girl.velocityY = girl.velocityY + 0.8


  drawSprites();
}