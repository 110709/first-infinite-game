var background;
var bomb,coin,logstick,cloud ;
var runningboy,runningdog,dogbittingboy;
var gameover,restart;
var invisibleGround;
var gameState = "play"


function preload(){
  bombImg = loadImage("bom.jpg");
  boyImg = loadImage("running boy.jpg");
  dogImg = loadImage("running dog.png");
  gameOverImg = loadImage("game over.png");
  coinImg = loadImage("coin.jpg");
  logImg = loadImage("log stick.png");
  background = loadImage("background.webp");
 restartImg = loadImage("restart.png");
 cloudImg = loadImage("clouds.png");
 dogbittingImg = loadImage("dog bitting boy.webp")
}
function setup() {
  createCanvas(600, 200);

  boy = createSprite(50,160,20,50);
  boy.addAnimation("boyImg", runningboy);

  boy.scale = 0.5;
  
  background = createSprite(200,180,400,20);
  background.addImage("background",backgroundImage);
  
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  
  boy.setCollider("rectangle",0,0,trex.width,trex.height);
  boy.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
 
  

  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
  
    //jump when the space key is pressed
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
    }
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
  
   
    
    if(bomb.isTouching(boy)){
       gameState = END;

      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
      boy.changeAnimation("", trex_collided);
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
     logImg.setLifetimeEach(-1);
     coinImg.setLifetimeEach(-1);
     bombImg.setLifetimeEach(-1);

     logImg.setVelocityXEach(0);
     coinImg.setVelocityXEach(0);    
     bombImg.setVelocityXEach(0);

     if(mousePressedOver(restart)) {
      console.log("Restart the Game");
      reset();
    }
   
  
 
   //stop boy from falling down
   boy.collide(invisibleGround);
  
  


  drawSprites();
  }
 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible= false;
  trex.changeAnimation("boyImg" , runningboy);

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
 score = 0
  

}