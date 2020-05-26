class DirectPlayer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.setScale(.12, .12);
    }
    
    create(){
        this.body.setSize(width/2);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
    }
    
    update(){
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.scene.reticle.x, this.scene.reticle.y);
        
        this.body.x = this.scene.player.body.x - 10;
        this.body.y = this.scene.player.body.y - 15;
            
    }

}