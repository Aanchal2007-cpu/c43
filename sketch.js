var backImage,backgr;
var player, player_running;
var playerStop;
var ground,ground_img;
var banana,bananaImg;
var stone,stoneImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var bananaGroup;
var stoneGroup;
var score;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg= loadImage("banana.png");
  stoneImg=loadImage("stone.png");
  playerStop=loadImage("Monkey_01.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=2;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("stopped",playerStop);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGroup= new Group();
  stoneGroup = new Group();
  
  score=0
}

function draw() { 
  background(0);
  drawSprites();

  if(gameState===PLAY){
  
  if(backgr.x<0){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    if(player.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score=score+1;
    }
    if(player.isTouching(stoneGroup)){
     gameState=END
    }
      spawnStone();
      spawnBananas();
  }else if(gameState===END){
    stoneGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    backgr.velocityX=0;
    player.velocityX=0;
    player.velocityY=0;
    player.changeAnimation("stopped",playerStop);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
    textSize(30);
    fill("blue");
    text("GAME OVER!!",400,200)
  }



 
  textSize(20);
  fill("yellow");
  text("score:"+score,700,50);
}
function spawnBananas(){
  if(frameCount%200===0){
    banana=createSprite(800,random(100,300),40,40);
    banana.velocityX=-5;
    banana.addImage("banana",bananaImg);
    banana.scale=0.08;
    banana.lifetime=400;
    bananaGroup.add(banana)
  }
  

}
function spawnStone(){
  if(frameCount%150===0){
    stone=createSprite(800,350,40,40);
    stone.velocityX=-4;
    stone.addImage("stone",stoneImg);
    stone.scale=0.2
    stone.lifetime=400;
    stoneGroup.add(stone)

    
  }
  
}