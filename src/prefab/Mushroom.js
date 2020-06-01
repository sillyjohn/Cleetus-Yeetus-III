class Mushroom extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'mushroomSprite');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        //this.body.setImmovable = true;
        this.goRight = true //true = go right
        this.health = 3;
        this.setScale(.2,.2);
    }
    create(){
        this.body.setSize(width);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
        
    }
    update(){
        this.fire();
        this.play('bounce', true);
    }
    setPos(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
    }

    fire(eX,eY,pX,pY) {
        var distX = eX - pX;
        var distY = eY - pY;
      
        if (distX > 700||-distX < -700||distY < 700||-distY > -700)
            {
                this.shroomBullet = this.scene.add.image(this.x,this.y,'dirt');
                this.shroomBullet.x -= 40;
        }
                
       
        
    
    }printPlease() {
        console.log("printed");
    }
}

    
