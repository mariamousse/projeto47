const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;

var player;
var shoot, shootGroup;
var buttonPressed = "space";
var timer = 0;
var timer2 = 0;
var timer3 = 0;
var score = 0.1;
var life = 200.1;
var vida_png;
var enemieGroup;
var world,engine;
var gameState = "play";
var nivel = 0;
var color;


function preload(){
vida_png = loadImage("coração.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  player = createSprite(200,200,50,50);
  player.shapeColor = "red";

  enemieGroup = new Group();
  shootGroup = new Group();
  color = [random(0,255),random(0,255), random(0,255)];
  
  

}

function draw() {
  background(0); 
  Engine.update(engine);
  console.log(life);
if(gameState == "play"){
  timer += 1;
  timer2 += 1;
  timer3 += 1;
  //camera.position.y = player.y;

  if(score >= 200){
    nivel +=1;
    score = 0;
    color = [random(0,255), random(0,255), random(0,255)];
  }
  if(keyDown("a")){
    player.x -= 5;
    buttonPressed = "a";
  }
  if(keyDown("s")){
    player.y += 5;
    buttonPressed = "s";
  }
  if(keyDown("d")){
    player.x += 5;
    buttonPressed = "d";
  }
  if(keyDown("w")){
    player.y -= 5;
    buttonPressed = "w";
  }
  
  if(keyDown("k") && timer > 50){
    CreateShoot();
    timer = 0;
  }
  if(timer2 > 100){
    for(var a=0; a<4; a++){
      var r = Math.round(random(1,4));
      if(r == 1){
        CreateEnemieD();
      }
      if(r == 2){
        CreateEnemieL();
      }
      if(r == 3){
        CreateEnemieR();
      }
      if(r == 4){
        CreateEnemieT();
      }
    }
    console.log("a");
    timer2 = 0;
  }
  if(timer3 > 100 && keyDown("shift")){
    Dash();
    timer3 = 0;
  }


  shootGroup.overlap(enemieGroup, function(shoot, enemie){
    shoot.destroy(); 
    enemie.destroy();
    score += 25;
  }
  );
  enemieGroup.overlap(player, function(enemie, player){
    enemie.destroy();
    life -= 50;
  }
  );
}
  fill("white");
  textSize(50);
  if(life < 0.2){
    gameState = "end";
    text("FIM DE JOGO", windowWidth/2 - 150, windowHeight/2) 
    player.destroy();
  }
  textSize(20);
  text("nivel " + nivel, 110, 160);
 // text("lifes: " + life, 100,120);
 image(vida_png, 50, 70, 50,50);
 rect(100, 80, 200.1, 20);
 rect(100, 120, 200.1, 20);
 fill("red");
 rect(100, 80, life, 20);
 fill(color);
 rect(100, 120, score, 20);
 drawSprites();
 
}
function CreateShoot(){
  shoot = createSprite(player.x, player.y, 50, 20);
  if(buttonPressed == "a"){
    shoot.velocityX = -20;
  }
  if(buttonPressed == "s"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = 20;
  }
  if(buttonPressed == "d"){
    shoot.velocityX = 20;
  }
  if(buttonPressed == "w"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = -20;
  }
  shoot.lifetime = 200;
  shootGroup.add(shoot);

  
}
function Dash(){
  if(buttonPressed == "a"){
    shoot.x = -100;
  }
  if(buttonPressed == "s"){
    player.y += 200;
  }
  if(buttonPressed == "d"){
    player.x += 100;
  }
  if(buttonPressed == "w"){
    player.y += -100;
  }
}
function CreateEnemieR(){
 var enemie = createSprite(windowWidth + 100, random(windowHeight - 100, 100), )
 enemie.velocityX = -10;
 enemie.lifetime = 150;
 enemieGroup.add(enemie);
}
function CreateEnemieL(){
  var enemie = createSprite(-100, random(100, windowHeight -100), )
  enemie.velocityX = 10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieD(){
  var enemie = createSprite(random(windowWidth - 100, 100), windowHeight + 100)
  enemie.velocityY = -10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieT(){
  var enemie = createSprite(random(100, windowWidth -100), -100)
  enemie.velocityY = 10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
