class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.body.setSize(this.width/2);
        // this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
        // this.body.setCollideWorldBounds(true);
        
    }
    create(){

        this.body.setSize(width/2);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
        

    }
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            console.log('firing') ; 


        }
        ///player movment w/o physics implementation 
        // to check collision with tile
        // player movement
        // // scene switching / restart
       
            
    }
}