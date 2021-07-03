var spaceCraftImg,playerCraft,computerCraft
var meteorImg,meteor,meteorLeft
var barrier
var finishLine,finishLineImg
var meteorRightGrp,meteorLeftGrp
var gameOver,gameOverImg
var gameState=1
var computerScore=0
var playerScore=0
var restartImg,restart
var hitSound,winSound

function preload(){
spaceCraftImg=loadImage("craft.png")
meteorImg=loadImage("meteor.png")
finishLineImg=loadImage("finsh.png")
restartImg=loadImage("restart.png")

hitSound=loadSound("hit.mp3")
winSound=loadSound("win.mp3")
}
function setup() {
  createCanvas(600,710);

 playerCraft=createSprite(100, 650);
 playerCraft.addImage("craft",spaceCraftImg)

 computerCraft=createSprite(500,650)
 computerCraft.addImage("craft",spaceCraftImg)

 barrier=createSprite(300,570,3,270)

 finishLine=createSprite(300,50)
 finishLine.addImage("finish",finishLineImg)
 finishLine.scale=0.9
 
 meteorRightGrp=new Group()
 meteorLeftGrp=new Group()

 //playerCraft.debug=true
 playerCraft.setCollider("rectangle",0,0,30, playerCraft.height-39)

 //computerCraft.debug=true
 computerCraft.setCollider("rectangle",0,0,30, computerCraft.height-39)

 
}

function draw() {
  background(0);  
  drawSprites();
  console.log(gameState)
  if(gameState===1){
    finishLine.visible=true
    barrier.visible=true

    if(keyDown("up")){
      playerCraft.y=playerCraft.y-3
    }
    if(keyDown("down")){
      playerCraft.y=playerCraft.y+3
    }
    if(keyDown("w")){
      computerCraft.y=computerCraft.y-3
    }
    if(keyDown("s")){
      computerCraft.y=computerCraft.y+3
    }
  
    if(frameCount%66===0){
      spawnRightMeteor()
    }
    if(frameCount%99===0){
      spawnLeftMeteor()
    }
    if(playerCraft.isTouching(meteorLeftGrp)){
      playerCraft.x=100
      playerCraft.y=650
      hitSound.play()
    }
    if(playerCraft.isTouching(meteorRightGrp)){
      playerCraft.x=100
      playerCraft.y=650
      hitSound.play()
    }
    if(computerCraft.isTouching(meteorLeftGrp)){
      computerCraft.x=500
      computerCraft.y=650
      hitSound.play()
    }
    if(computerCraft.isTouching(meteorRightGrp)){
      computerCraft.x=500
      computerCraft.y=650
      hitSound.play()
    }
    if(finishLine.isTouching(playerCraft)){
      playerScore=playerScore+1
      playerCraft.x=100
      playerCraft.y=650
    }
    if(finishLine.isTouching(computerCraft)){
      computerScore=computerScore+1
      computerCraft.x=500
      computerCraft.y=650
    }
    if(playerScore===10||computerScore===10){
      gameState=2
      winSound.play()
    }
    
  }
  if(gameState===2){
    fill("white")
    textSize(30)
    text("GAME OVER",250,200)
    text("PRESS 'R' TO RESTART",180,270)
    if(playerScore>computerScore){
      text("PLAYER 1 WON",200,400)
    }
    else{
      text("PLAYER 2 WON",200,400)
    }
    finishLine.visible=false
    barrier.visible=false
    meteorLeftGrp.destroyEach()
    meteorRightGrp.destroyEach()
    if(keyDown("r")){
      reset()
    }
  }
  textSize(10)
  fill("white")
    text("PLAYER1 SCORE:"+playerScore,40,540)
    text("PLAYER2 SCORE:"+computerScore,460,540)
}

function spawnRightMeteor(){
meteor=createSprite(0,(random(417,156)))
meteor.addImage("meteor",meteorImg)
meteor.velocityX=5
meteor.lifetime=142
meteorRightGrp.add(meteor)
}

function spawnLeftMeteor(){
  meteorLeft=createSprite(600,(random(417,156)))
  meteorLeft.addImage("meteor",meteorImg)
  meteorLeft.velocityX=-5
  meteorLeft.lifetime=142
  meteorLeftGrp.add(meteorLeft)
  }

function reset(){
  gameState=1
  playerScore=0
  computerScore=0
}