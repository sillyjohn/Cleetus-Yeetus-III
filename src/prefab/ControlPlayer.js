class ControlPlayer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(.15,.15);
        this.health = 50;
    }
    
    create(){
        this.body.setSize(width/2);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
    }
    
    update(){
    }
    recoil(angle) {
        this.scene.physics.velocityFromRotation(angle, 900, this.body.velocity);
    }
    hpCount(){
        if(this.body.touching.left){

            this.x +=40;
            this.y -=30;
            this.health -= 10;
            console.log('player hp'+this.health);


        }else if(this.body.touching.right ){
            this.x -=40;
            this.y -=30;
            this.health -= 10;
            console.log('player hp'+this.health);


        }else if(this.body.blocked.down){
            this.y -=20;
            this.health -= 10;
            console.log('player hp'+this.health);


        }
           

    }
   
}