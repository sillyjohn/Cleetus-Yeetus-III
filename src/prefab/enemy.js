class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.goRight = true //true = go right
    }
    create(){

    this.body.setSize(width/2);
    this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);

    }
    update(){
       if((this.x < 800 &&this.goRight == true) ||(this.x <= 100 &&this.goRight == false)){
        //go right
        this.goRight = true;
        this.x+= 10;
        console.log(this.x)


       }else if(this.x >=800 || this.goRight == false){
        this.goRight = false;
        this.x -= 10;
        console.log(this.goRight)
       }
        
    }
    

    











}