var gameState,START = 1,PLAY = 2,END = 0
var player,playerImage;
var obstacle,obstacleImage,obstacleGroup;
var side1, side2;

gameState = START;

function preload() {
  playerImage = loadImage("Capture.PNGcyan.PNG");
  obstacleImage = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(400, 400, 10, 10);

  player = createSprite(200, 360, 10, 10);
  player.addImage(playerImage);
  player.scale = 0.3;
  
  side1 = createSprite(0, 200, 10, 400);
  side1.visible = false;
  side2 = createSprite(400, 200, 10, 400);
  side2.visible = false;

  obstacleGroup = new Group();
}

function draw() {
  background(163,182,245);

  if (gameState === START) {
    if (keyWentUp("space")) {
      gameState = PLAY;
    }
  } else if (gameState === PLAY) {

    camera.position.y = player.y - 167
    player.velocityY = -10
    side1.y = player.y-200
    side2.y = player.y-200

    if (frameCount % 80 === 0) {
      spawnObstacle();
    }

    if (keyDown(RIGHT_ARROW)) {
      player.x += 5
    }

    if (keyDown(LEFT_ARROW)) {
      player.x -= 5
    }

    player.collide(side1);
    player.collide(side2);
    player.setCollider("rectangle", 0, 0, 170, 250);

    if (player.isTouching(obstacleGroup)) {
      player.visible = false;
      obstacleGroup.destroyEach();
      gameState = END;
    }
  } else if (gameState === END) {
    if (keyWentUp("r")) {
      gameState = PLAY
      player.visible = true;
    }
  }

  drawSprites();

  if (gameState === START) {
    noStroke();
    fill(1);
    textSize(20);
    text("Press Space To Start 😀", 110, 200);
  }
  if (gameState === END) {
    noStroke();
    fill(1);
    textSize(50);
    text("GAME OVER! 😀", 20, camera.y);
    textSize(20);
    text("Press R To Restart 😀", 120, camera.y + 50)
  }
}

function spawnObstacle() {
  obstacle = createSprite(0,player.y - 400, 10, 10);
  obstacle.addImage("obstacle", obstacleImage);
  obstacle.x = random(80, 320);
  obstacle.scale = 0.3;
  obstacle.lifetime = 45
  obstacle.setCollider("rectangle",27,0,200,400);
  obstacleGroup.add(obstacle)
}



