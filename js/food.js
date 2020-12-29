class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodStock=0;
        this.lastFed;
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }
    getFoodStock(){
        return this.foodStock;
    } 
    bedroom(){
        background(bedroomImg,550,500)
    }
    washroom(){ 
        background(washroomImg,550,500)
    }
    garden(){
        background(gardenImg,550,500)
    }
    display(){
        background("green")
        fill(255,255,254);
        textSize(15); 
        if(lastFed>=12){
          text("Last feed: "+lastFed%12 + "PM", 50, 35);
        }
        else if(lastFed==0){
          text("Last feed: 12 AM", 50, 35);
        } 
         else{
          text("Last fed: "+lastFed + "AM", 50, 35);
        }
        var x=80, y=100;

        imageMode(CENTER)
        image(this.image, 720, 720, 70, 70)

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image, x, y, 50, 50);
                x=x+30;
            }
        }
    }
}