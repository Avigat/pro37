var dog, dogImg, dogImg2, database, foodS, foodStock, foodObj, lastFed;
var bedroomImg, gardenImg, washroomImg;
var gameState;
var readState;

function preload()
{
  dogImg = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
  bedroomImg = loadImage("virtual pet images/Bed Room.png")
  gardenImg = loadImage("virtual pet images/Garden.png")
  washroomImg = loadImage("virtual pet images/Wash Room.png")
}

function setup() {
  database = firebase.database();
  createCanvas(400, 500);
  dog = createSprite(200,400,10,10);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food');
  foodStock.on("value", readStock)

  feed=createButton("Feed the dog");
  feed.position(550,70);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(650,70);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

  readState=database.ref('gameState');
  readState.on("value", function(data){
    gameState=data.val();
  })

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })
}

function draw() {  
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  } 

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogImg);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}