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
        this.inRange();
        this.play('bounce', true);
    }
    setPos(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
    }

    inRange() {
        var distX = this.x - this.scene.player.x;
        var distY = this.y - this.scene.player.y;

        if ((distX > -300 && distX < 300) && (distY > -300 && distY < 300)) {
            var sporeShot = this.scene.spores.get().setActive(true).setVisible(true);
            sporeShot.body.allowGravity = false;

            if (sporeShot) {
                sporeShot.fire(Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x, this.scene.player.y));
                this.scene.physics.add.collider(this.scene.player, sporeShot, this.scene.playerHitCallback);
            }
        }
    }
    printPlease() {
        console.log("printed");
    }
}

    
