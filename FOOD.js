class Food{

    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('images/Milk.png');
    }

    getFood(){
        var foodRef = dataBase.ref('Food');
        foodRef.on("value",function(data){
            foodCount = data.val();
        })
    }

    updateFood(foodStock){
        dataBase.ref('/').update({
            'Food':foodStock
        });
    }

    getFedTime(lastFed){
        this.lastFed = this.lastFed;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }

    display(){

        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,20,20);

        if(this.foodStock !== 0){
            for(var i = 0; i < this.foodStock; i++){

              if(x % 10 === 0){
                  x = 80;
                  y = y + 50;
              }

              image(this.image,x,y,50,50);
              x=x+30;

            }

        }

    }

}