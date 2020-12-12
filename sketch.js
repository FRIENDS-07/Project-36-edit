var dog,dogImage,dogHappyImage;
var dataBase,foodCount;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){

  dogImage = loadImage("images/dogImg.png");
  dogHappyImage = loadImage("images/dogImg1.png");

}

function setup(){

  dataBase = firebase.database();

  createCanvas(500,500);

  foodObj = new Food();
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  var dogRef = dataBase.ref('Food/Quantity');
  dogRef.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}

function draw(){  

  background("lavender");
  drawSprites();

  foodObj.display();

  fedTime = dataBase.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

}

function readStock(data){
  position = data.val();
  foodObj.updateFood(foodCount);
}

function feedDog(){

  dog.addImage(dogHappyImage);

  foodObj.updateFood(foodObj.getFood()-1);
  dataBase.ref('/').update({
    Food:foodObj.getFood(),
    feedTime:hour()
  })

}

function addFoods(){
  foodCount++;
  dataBase.ref('/').update({
    Food:foodCount
  })
}

