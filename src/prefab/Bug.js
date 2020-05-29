class Bug extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bugSprite');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.goRight = true //true = go right
        this.health = 6;
        this.body.allowGravity = true;
    }
    create(){
        this.body.setSize(width);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
        this.play('crawl');

    }
    update(){
        this.setScale(.2,.2);
        if(!(this.body.touching.up)) {
            this.setActive(true);
            this.setVisible(true);
        }
        if(this.goRight == true) {
            if(!(this.body.blocked.right || this.body.touching.right)) {
                this.body.setVelocityX(40);
                this.setFlip(true, false);
                this.play('crawl', true);
            }
            else {
                this.velocityX = 0;
                this.goRight - false;
            }
        }
        else {
            if(!(this.body.blocked.left || this.body.touching.left)) {
                this.body.setVelocityY(-40);
                this.resetFlip();
                this.play('crawl', true);
            }
            else {
                this.velocityY = 0;
                this.goRight - true;
            }
        }
    }
    setPos(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
    }
    
}