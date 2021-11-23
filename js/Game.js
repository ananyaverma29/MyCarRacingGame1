class Game {
  constructor() {
   
    this.blast = false;
    this.leaderboardTitle = createElement("h2");
    this.leftKeyActive = false;
    //this.rightKeyActive = false;
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.leader3 = createElement("h2");
    this.leader4 = createElement("h2");
    this.playerMoving = false;
}

  getState() {
    var gameStateRef = database.ref(rootPath+"gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref(rootPath).update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();
   // console.log("Player count = "+playerCount);
   // console.log(windowWidth);
    form = new Form();
    form.display();

    if(choice=="two"){
      // if(pc==0){
      //   car1X = width/2-50;
      // }
      // else if(pc==1){
      //   car2X = width/2+50;
      // }
      car1 = createSprite( 485, height - 100, 20,20);
      car1.addImage("car1", car1_img);
      car1.scale = 0.07;
      car2 = createSprite(850, height - 100, 20,20);
      car2.addImage("car2", car2_img);
      car2.scale = 0.07;
      cars=[car1,car2];
      car1.addImage("Blast", blastImg);
    car2.addImage("Blast", blastImg);
    }
    else if(choice=="three"){
    //   if(pc==0){
    //  //   car1X = width/2-150;
    //     car1X = 485;
    //   }
    //   else if(pc==1){
    //   //  car2X = width/2;
    //     car2X = 670;
    //   }
    //   else if(pc==2){
    //     //car3X = width/2+150;
    //     car3X = 850;
    //   }
      car1 = createSprite(485, height - 100,20,20);
      car1.addImage("car1", car1_img);
      car1.scale = 0.07;
      car2 = createSprite(670, height - 100,20,20);
      car2.addImage("car2", car2_img);
      car2.scale = 0.07;
      car3 = createSprite(850, height - 100,20,20);
      car3.addImage("car3",car3_img);
      car3.scale = 0.7;
      cars=[car1,car2,car3];
      car1.addImage("Blast", blastImg);
    car2.addImage("Blast", blastImg);
    car3.addImage("Blast", blastImg);
    //car2.addImage("Blast", blastImg);
    }
    else if(choice=="four"){
      // if(pc==0){
      //   car1X = width/2 - 250;
      // }
      // else if(pc==1){
      //   car2X = width/2 - 100;
      // }
      // else if(pc==2){
      //   car3X = width/2+100;
      // }
      // else if(pc==3){
      //   car4X = width/2 + 250;
      // }
      car1 = createSprite(445, height - 100,20,20);
      car1.addImage("car1",car1_img);
      car1.scale = 0.07;
      car2 = createSprite(580, height - 100,20,20);
      car2.addImage("car2", car2_img);
      car2.scale = 0.07;
      car3 = createSprite(740, height - 100,20,20);
      car3.addImage("car3",car3_img);
      car3.scale = 0.7;
      car4 = createSprite(890, height - 100,20,20);
      car4.addImage("car4", car4_img);
      car4.scale = 0.7;
      cars=[car1,car2,car3, car4];
      car1.addImage("Blast", blastImg);
    car2.addImage("Blast", blastImg);
    car3.addImage("Blast", blastImg);
    car2.addImage("Blast", blastImg);

    }
    fuels = new Group();
    powerCoins = new Group();
    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    // Adding fuel sprite in the game
    this.addSprites(fuels, 4, fuelImage, 0.1);

    // Adding coin sprite in the game
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

    //Adding obstacles sprite in the game
    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1Image,
      0.04,
      obstaclesPositions
    );
  


    // car1 = createSprite(width / 2 - 50, height - 100);
    // car1.addImage("car1", car1_img);
    // car1.scale = 0.07;

    // car2 = createSprite(width / 2 + 100, height - 100);
    // car2.addImage("car2", car2_img);
    // car2.scale = 0.07;

    // cars = [car1, car2];
  }
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
   this.leaderboardTitle.html("Leaderboard");
   this.leaderboardTitle.class("resetText");
   this.leaderboardTitle.position(width / 3 - 60, 40);

  /* this.leader1.class("leadersText");
   this.leader1.position(width / 3 - 60, 40);
   this.leader1.show();

   this.leader2.class("leadersText");
   this.leader2.position(width / 3 - 60, 40);
   this.leader2.show();

   this.leader3.class("leadersText");
   this.leader3.position(width / 3 - 60, 40);
   this.leader3.show();

   this.leader4.class("leadersText");
   this.leader4.position(width / 3 - 60, 40);
   this.leader4.show();*/
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      this.showFuelBar();
      this.showLife();
     
      var index=0;
      //var x=175;
      var y;
      for(var plr in allPlayers){
        d.push([allPlayers[plr].distance, allPlayers[plr].name]);
     //   d[allPlayers[plr].distance]=allPlayers[plr].name
        index=index+1;
      //  x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        var currentLife = allPlayers[plr].life;
        if(currentLife <=0)
        {
          cars[index-1].changeImage("Blast");
         // cars[index-2].changeImage("Blast");
        }
        // cars[index-1].x = x;
        cars[index-1].position.y = y;
        if (index === player.index){
         // stroke(10);
          fill("yellow");
        text(player.name,cars[index - 1].position.x-20,cars[index - 1].position.y-50);
          //ellipse(cars[index - 1].position.x,y,60,60);
          // console.log(cars);
          // console.log(cars[index-1]);
          // console.log(index-1);
          
          this.handleFuel(index);
          this.handlePowerCoins(index);
          this.handleCarACollisionWithCarB(index);
          this.handleObstacleCollision(index);
          if(player.life<= 0)
          {
            this.blast = true;
            cars[index-1].addImage("blast",blastImg);
            cars[index-1].changeImage("blast",blastImg);
            blastImage.scale =0.5;
            cars[index-1].scale = 0.1;
            this.playerMoving = false;
            gameOverSound.play();
          }
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = y;   
        }
      }
      if (this.playerMoving) {
        player.positionY += 5;
        player.update();
      }

      // handling keyboard events
    //  this.handlePlayerControls();

      console.log(d);
      /*
                  0           1           2             3
                0   1       0   1       0     1       0   1
      d=  [  [ 90, "a"],  [20, "b"],  [200,  "c"],  [70,  "d"]       ]

      */
      if(choice == "two"){
        if(d[0][0]>d[1][0]){
          text(1+" "+d[0][1]+" "+d[0][0],50,camera.position.y-100 );
          text(2+" "+d[1][1]+" "+d[1][0],50,camera.position.y-80 );
        }
        else{
          text(1+" "+d[1][1]+" "+d[1][0],50,camera.position.y-100 );
          text(2+" "+d[0][1]+" "+d[0][0],50,camera.position.y-80 );
        }
       
      }
      else if(choice == "three"){
        if(d[0][0]>d[1][0] && d[0][0]>d[2][0] ){
          text(1+" "+d[0][1]+" "+d[0][0],50,camera.position.y-100 );
          if(d[1][0]>d[2][0]){
            text(2+" "+d[1][1]+" "+d[1][0],50,camera.position.y-80 );
            text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-60 );
          }
          else{
            text(2+" "+d[2][1]+" "+d[2][0],50,camera.position.y-80 );
            text(3+" "+d[1][1]+" "+d[1][0],50,camera.position.y-60 );
          }
        }
          ////////////////

        else if(d[1][0]>d[0][0] && d[1][0]>d[2][0] ){
          text(1+" "+d[1][1]+" "+d[1][0],50,camera.position.y-100 );
          if(d[0][0]>d[2][0]){
            text(2+" "+d[0][1]+" "+d[0][0],50,camera.position.y-80 );
            text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-60 );
          }
          else{
            text(2+" "+d[2][1]+" "+d[2][0],50,camera.position.y-80 );
            text(3+" "+d[0][1]+" "+d[0][0],50,camera.position.y-60 );
          }
        }
            ///////////////
        else if(d[2][0]>d[0][0] && d[2][0]>d[1][0] ){
          text(1+" "+d[2][1]+" "+d[2][0],50,camera.position.y-100 );
          if(d[0][0]>d[1][0]){
            text(2+" "+d[0][1]+" "+d[0][0],50,camera.position.y-80 );
            text(3+" "+d[1][1]+" "+d[1][0],50,camera.position.y-60 );
          }
          else{
            text(2+" "+d[1][1]+" "+d[1][0],50,camera.position.y-80 );
            text(3+" "+d[0][1]+" "+d[0][0],50,camera.position.y-60 );
          }
        }
       
      }
        else if(choice == "four")
        {
            if(d[0][0]>d[1][0] && d[0][0]>d[2][0] && d[0][0]>d[3][0])
            {
              text(1+" "+d[0][1]+" "+d[0][0],50,camera.position.y-100);
            if(d[1][0]>d[2][0] && d[1][0]>d[3][0])
            {
              text(2+" "+d[1][1]+" "+d[0][0],50,camera.position.y-80 );
            if(d[2][0]>d[3][0])
            {
              text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-60 );
              text(4+" "+d[3][1]+" "+d[3][0],50,camera.position.y-40 );
            }
            else 
            {
            text(3+" "+d[3][1]+" "+d[3][0],50,camera.position.y-60 );
            text(4+" "+d[2][1]+" "+d[2][0],50,camera.position.y-40 );
            }
          }
          else if(d[2][0]>d[1][0] && d[2][0]>d[3][0])
          {
           text(2+" "+d[2][1]+" "+d[2][0],50,camera.position.y-60 );
           if(d[3][0]>d[1][0])
           {
            text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-80 );
            text(4+" "+d[1][1]+" "+d[0][0],50,camera.position.y-80 );
           }
           else
           {
            text(4+" "+d[1][1]+" "+d[0][0],50,camera.position.y-80 );
            text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-80 );
           }
          }
          else if(d[3][0]>d[2][0] && d[3][0]>d[1][0])
          {
            text(2+" "+d[3][1]+" "+d[3][0],50,camera.position.y-60);
            if(d[2][0]>d[1][0])
            {
              text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-40);
              text(4+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-40);
            }
            else
            {
              text(3+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-40);
              text(4+" "+d[2][1]+" "+d[2][0],50,camera.position.y-40);
             
            }
          }
        }
        else if(d[1][0]>d[0][0] && d[1][0]>d[2][0] && d[1][0]>d[3][0])
        {
          text(1+" "+d[1][1]+" "+d[1][0],50,camera.position.y-100 );
          if(d[0][0]>d[2][0] && d[0][0]>d[3][0])
          {
            text(2+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-80);
          if(d[2][0]>d[3][0])
          {
            text(3+" "+d[2][1]+" "+d[2][0], 50, camera.position.y-60);
            text(4+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-40);
          }
          else{
            text(3+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-60);
            text(4+" "+d[4][1]+" "+d[4][0], 50, camera.position.y-40);
          }
        
        }
        else if(d[2][0]>d[3][0] && d[2][0]>d[0][0])
        {
          text(2+" "+d[2][1]+" "+d[2][0], 50, camera.position.y-80);
          if(d[0][0]>d[3][0])
          {
            text(3+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-60);
            text(4+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-40);
          }
          else{
            text(3+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-60);
            text(4+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-40);
          }
        }
        else if(d[3][0]>d[0][0] && d[3][0]>d[2][0])
          {
            text(2+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-80);
            if(d[0][0]>d[2][0]){
              text(3+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-60);
              text(4+" "+d[2][1]+" "+d[2][0], 50, camera.position.y-40)
            }
            else 
            {
              text(3+" "+d[2][1]+" "+d[2][0], 50, camera.position.y-60);
              text(4+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-40);
            }
          }

      }
      else if(d[2][0]>d[1][0] && d[2][0]>d[3][0] && d[2][0]>d[0][0])
      {
        text(1+" "+d[2][1]+" "+d[2][0],50,camera.position.y-100 );
        if(d[0][0]>d[1][0] && d[0][0]>d[3][0]) 
        {
          text(2+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-80);
        if(d[1][0]>d[3][0])
        {
          text(3+" "+d[1][1]+" "+d[1][0], 50, camera.position.y-60);
          text(4+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-40);
        }
        else
        {
          text(3+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-60);
          text(4+" "+d[1][1]+" "+d[1][0], 50, camera.position.y-40);
        }
      }
        else if(d[1][0]>d[0][0] && d[1][0]>d[3][0])
        {
          text(2+" "+d[1][1]+" "+d[1][0], 50, camera.position.y-80);
          if(d[0][0]>d[3][0])
            {
              text(3+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-60);
              text(4+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-40);
            }
            else{
              
              text(3+" "+d[3][1]+" "+d[3][0], 50, camera.position.y-60);
              text(4+" "+d[0][1]+" "+d[0][0], 50, camera.position.y-40);
            }
        }  

        }
        else if(d[3][0]>d[0][0] && d[3][0]>d[1][0] && d[3][0]>d[2][0])
        {
          text(1+" "+d[3][1]+" "+d[3][0],50,camera.position.y-100);
          if(d[1][0]>d[0][0] && d[1][0]>d[2][0])
          {
            text(2+" "+d[1][1]+" "+d[1][0],50,camera.position.y-80);
            if(d[0][0]>d[2][0])
            {
              text(3+" "+d[0][1]+" "+d[0][0],50,camera.position.y-60);
              text(4+" "+d[2][1]+" "+d[2][0],50,camera.position.y-40);
            }
            else{
              text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-60);
              text(4+" "+d[0][1]+" "+d[0][0],50,camera.position.y-40);
            }
          }
          else if(d[0][0]>d[1][0] && d[0][0]>d[2][0])
          {
            text(2+" "+d[0][1]+" "+d[0][0],50,camera.position.y-80);
            if(d[1][0]>d[2][0])
            {
              text(3+" "+d[1][1]+" "+d[1][0],50,camera.position.y-60);
              text(4+" "+d[2][1]+" "+d[2][0],50,camera.position.y-40);
            }
            else 
            {
              text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-60);
              text(4+" "+d[1][1]+" "+d[1][0],50,camera.position.y-40);
            }
          }
          else if(d[0][0]>d[1][0] && d[0][0]>d[2][0])
          {
            text(2+" "+d[0][1]+" "+d[0][0],50,camera.position.y-80);
            if(d[1][0]>d[2][0])
            {
              text(3+" "+d[1][1]+" "+d[1][0],50,camera.position.y-60);
              text(4+" "+d[2][1]+" "+d[2][0],50,camera.position.y-40);
            }
            else{
              text(3+" "+d[2][1]+" "+d[2][0],50,camera.position.y-60);
              text(4+" "+d[1][1]+" "+d[1][0],50,camera.position.y-40);
            }
          }
         
        }
      }
      ///////////////////////////////////////
      d=[];

 //     d={};   
    }
    
  
    
    if (this.playerMoving) {
      player.positionY += 5;
      player.update();
    }
  
    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      this.playerMoving = true;
      player.distance +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW)&& player.index !== null)
    {
      this.playerMoving = true;
      this.leftKeyActive = true;
     player.distance +=5;
     cars[index - 1].position.x -=3; 
     player.positionX = int(cars[index - 1].position.x);
     player.positionY = int(displayHeight - player.distance);
      player.update();
    }
    else
    {
      this.playerMoving = false;
    }
    if(keyIsDown(RIGHT_ARROW)&& player.index !== null)
    {
      this.playerMoving = true;
      this.leftKeyActive = false;
     player.distance +=5;
     cars[index - 1].position.x +=3; 
     player.positionX = int(cars[index - 1].position.x);
     player.positionY = int(displayHeight - player.distance);
      player.update();
    }
    else
    {
      this.playerMoving = false;
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);
     // gameState = 2;
     // player.rank += 1;
      //Player.updateCarsAtEnd(player.rank);
      player.update();
      this.showRank();
      gameWinSound.play();
    }
   /* if (player.distance >3860) {
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
      player.update();
      this.showRank();
    }*/

    drawSprites();
     // console.log(allPlayers);
      text(mouseX+", "+mouseY, mouseX, mouseY);
}


showLife() {
  push();
  image(lifeImage,width / 2 - 130,camera.position.y-230, 20, 20);
  fill("white");
  rect(width / 2 - 100,  camera.position.y-230, 185, 20);
  fill("#f50057");
  rect(width / 2 - 100,  camera.position.y-230, player.life, 20);
  noStroke();
  pop();
}

showFuelBar() {
  push();
  //image(fuelImage, 737, 94, 20, 20);
  //fill("white");
 // rect(739, 94, 185, 20);
 // fill("#ffc400");
  //rect(740, 94, player.fuel, 20);
  image(fuelImage, width / 2 - 130, camera.position.y-275, 20, 20);
  fill("white");
  rect(width / 2 - 100, camera.position.y-275, 185, 20);
  fill("#ffc400");
  rect(width / 2 - 100,  camera.position.y-275, player.fuel, 20);
  noStroke();
  pop();
}
/*handlePlayerControls() {
  if(!this.blast)
  {
    if(keyIsDown(UP_ARROW) && player.index !== null){
      this.playerMoving = true;
      player.distance +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW)&& player.index !== null)
    {
      
      this.playerMoving = true;
      this.leftKeyActive = true;
     player.distance +=5;
     cars[index - 1].position.x -=3; 
     player.positionX = int(cars[index - 1].position.x);
     player.positionY = int(displayHeight - player.distance);
      player.update();
    }
    else{
      this.playerMoving = false;
        }
    if(keyIsDown(RIGHT_ARROW)&& player.index !== null)
    {
      this.playerMoving = true;
      this.leftKeyActive = false;
     player.distance +=5;
     cars[index - 1].position.x -=3; 
     player.positionX = int(cars[index - 1].position.x);
     player.positionY = int(displayHeight - player.distance);
      player.update();
    }
    else{
      this.playerMoving = false;
    }
}
}*/


handleFuel(index) {
  // Adding fuel
  cars[index - 1].overlap(fuels, function(collector, collected) {
    player.fuel = 185;
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });

  // Reducing Player car fuel
  if (player.fuel > 0 && this.playerMoving) {
    player.fuel -= 0.3;
  }

  if (player.fuel <= 0) {
    gameState = 2;
    this.gameOver();
  }
}
handlePowerCoins(index) {
  cars[index - 1].overlap(powerCoins, function(collector, collected) {
    player.score += 21;
    player.update();
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });
}
showRank() {
  swal({
    title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
    text: "You reached the finish line successfully",
    //imageUrl:
      //"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
  //  imageUrl: "https://dx5683gi1tv0w.cloudfront.net/dtrjyhj9q/image/upload/w_1080,h_1080,c_pad,b_auto/s3/img0be16e8d8",
// imageUrl:" https://image.shutterstock.com/image-vector/trophy-cup-award-vector-illustration-260nw-603371879.jpg",
 imageUrl: "https://static.vecteezy.com/system/resources/previews/003/090/132/original/trophy-winning-cup-vector.jpg",
    imageSize: "100x100",
    confirmButtonText: "Ok"
  });
}

gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}
handleObstacleCollision(index)
  {
    if(cars[index-1].collide(obstacles))
    {
    if(this.leftKeyActive)  
    {
      player.positionX += 100;
    }
    else{
      player.positionX -= 100;
    }
      if(player.life>0)
      {

        player.life -= 185/4;

      }
      player.update();
    }


  }
handleCarACollisionWithCarB(index)
  {
    if(index == 1)
    {
      if(cars[index-1].collide(cars[1]))
      {   
         if(this.leftKeyActive)
         {
            player.positionX += 100;
         }
         else{
           player.positionY -= 100;
         }
        
         if(player.life>0)
         {
           player.life -= 185/4;
           
         }
        player.update();
      }
    }


    if(index == 2)
    {
      if(cars[index-1].collide(cars[0]))
      {
         if(this.leftKeyActive)
         {
            player.positionX += 100;
         }
         else{
           player.positionY -= 100;
         }
        
         if(player.life>0)
         {
           player.life -= 185/4;
           
         }
        player.update();
      }
    }

  }
  
    end(){
    console.log("Game Ended");
    console.log(player.rank);
   // swal("Your Rank", player.rank);
    gameState=3;
  }
}
