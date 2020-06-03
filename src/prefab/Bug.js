class Bug extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame,playerX,playerY){
        super(scene,x,y,texture,frame,playerX,playerY);
        Phaser.GameObjects.Image.call(this, scene, x, y, 'bugSprite');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.goRight = true //true = go right
        this.health = 6;
        this.body.allowGravity = true;
        //this.body.setImmovable = true;
        console.log("construct bug");
        this.setVisible(false);
        this.setScale(.5,.5);
    }
   
    update(){
       
        
            if((this.body.blocked.down)) {
                this.setActive(true);

            
                    if(this.goRight == true) {
                    if(!(this.body.blocked.right || this.body.touching.right)) {
                        this.body.setVelocityX(400);
                        this.setFlip(true, false);
                        this.play('crawl', true);
                    }else if((this.body.blocked.right || this.body.touching.right)){
                        this.body.setVelocityX(-400)
                        this.setFlip(true, false);
                        this.goRight = false;
                    }else {
                        this.velocityX = 0;
                        this.goRight - false;
                    }
                }
                else {
                    if(!(this.body.blocked.left || this.body.touching.left)) {
                        this.body.setVelocityX(-400);
                        this.resetFlip();
                        this.play('crawl', true);
                    }
                    else if((this.body.blocked.left || this.body.touching.left)){
                        this.body.setVelocityX(-400);
                        this.setFlip(true, false);
                        this.goRight = true;
                        
                    }
                }
        }

            
       

    }
        
enemyAppear(eX,eY,pX,pY){

    var distX = eX - pX;
    var distY = eY - pY;
  
    if (distX > 700||-distX < -700||distY < 700||-distY > -700)
        {
            this.setVisible(true);
            this.setActive(true);
        console.log('player in range');
    }
            
    else {
        this.setActive(false);
        this.setVisible(false)
    }
        

}
    setPos(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
    }
    printPlease() {
        console.log("printed");
    }
}
