var dog,happyDog,dogImg,happyDogImg;
var foodS,foodStock;
var database; 

function preload()
{
  dogImg=loadImage("images/dog1.png");
  happyDogImg=loadImage("images/dogHappy.png");


}

function setup() {
  database=firebase.database();
  createCanvas(700,700);
  
dog = createSprite(350,350,100,100);
dog.addImage(dogImg);
dog.scale=0.5;

foodStock = database.ref('food');
foodStock.on("value",readStock);

}


function draw() {  
background(46, 139, 87);
if(foodS!==undefined){
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDogImg);
}}
  drawSprites();
  textSize(20);
  fill(255);
  text("Note:Press UP_ARROW key to feed the dog",20,50);
  text("food stock remaining: "+foodS,150,100);
//textSize()

}

function readStock(data){ 
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}

