class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
       
    }
    
    create(){
        
        this.body.setSize(width/2);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);


    }
    
    update(){
       
        
       
            
    }

}