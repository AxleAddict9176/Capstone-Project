//Player 1 controls their Lava Golem with WASD
//Player 2 controls their Lava Golem with the ARROW KEYS
//Have Fun!



var volcano, volcanoImg;
var LavaGolem, LavaGolemImg;
var rock, rockImg;
var rocksGroup;
var invBlockPA, invBlockPAGroup;
var invBlockQ, invBlockQGroup;
var player2, player2Img

var gameState = "play";

function preload() {
  volcanoImg = loadImage("volcano.png");
  LavaGolemImg = loadImage("lavaGolem.png");
  rockImg = loadImage("rock.png");
  player2Img = loadImage("player2.png");
}

function setup() {
  createCanvas(600, 600);
  volcano = createSprite(300, 300);
  volcano.addImage(volcanoImg);
  volcano.velocityY = 2;
  volcano.scale = 2
  
  LavaGolem = createSprite(200, 300);
  LavaGolem.addImage(LavaGolemImg);
  LavaGolem.scale = 0.4;
  
  player2 = createSprite(400, 300);
  player2.addImage(player2Img);
  player2.scale = 0.4;

  
  rocksGroup = new Group();
}

function draw() {
  background("black");
  
  if (gameState === "play") {
    
  if(volcano.y > 400) {
     volcano.y = 300
     }
  
  if (keyDown("a")) {
    LavaGolem.x = LavaGolem.x - 3;
  }
  
  if (keyDown("d")) {
    LavaGolem.x = LavaGolem.x + 3;
  }

  if (keyDown("space") || keyDown("w")) {
    LavaGolem.velocityY = - 5;
  }
    
   if (keyDown("left")) {
    player2.x = player2.x - 3;
  }
  
  if (keyDown("right")) {
    player2.x = player2.x + 3;
  }

  if (keyDown("up")) {
    player2.velocityY = - 5;
  }
  
  LavaGolem.velocityY = LavaGolem.velocityY + 0.8
  player2.velocityY = player2.velocityY + 0.8
    
  if (rocksGroup.isTouching(LavaGolem) || LavaGolem.y > 600) {
    LavaGolem.destroy();
    gameState = "end";
  }
    
  if (rocksGroup.isTouching(player2) || player2.y > 600) {
    player2.destroy();
    gameState = "end";
  }
  
  spawnrocks();
  drawSprites();
  }
  
  if (gameState === "end") {
    background("black")
    
    stroke("black");
    textFont("chiller")
    fill("red")
    textSize(150)
    text("Game Over!", 200, 230, 10)
    
    /*
    stroke("black");
    textFont("chiller")
    fill("red")
    textSize(150)
    text("Game Over!", 50, 200)
    
    stroke("red");
    fill("orange")
    textSize(50)
    text("> Play Again?", 200, 330)
    
    stroke("red");
    fill("orange")
    textSize(50)
    text("> Quit?", 200, 400)
    */
  }
}

function spawnrocks() {
  if (frameCount % 240 === 0) {
    rock = createSprite(200, -50);
    rock.velocityY = 2;
    rock.addImage(rockImg);
    rock.x = random(120, 400);
    rock.lifetime = 400
    rocksGroup.add(rock);
    rock.scale = 0.4
    
    LavaGolem.depth = rock.depth; 
    LavaGolem.depth += 1
  }
}