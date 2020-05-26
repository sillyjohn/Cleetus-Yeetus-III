class DirectBullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    }
    
    create(){
        this.body.setSize(width/2);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
        
    }
    
    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.body.bounce = 0.5;
        this.born += 1;
        if (this.born > 120) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    fire(rotate) {
        this.setPosition(this.scene.lookPlayer.x, this.scene.lookPlayer.y); // Initial position

        this.rotation = rotate; // angle bullet with player rotation

        this.scene.physics.velocityFromRotation(this.rotation, 2000, this.body.velocity);
        this.scene.player.recoil(this.rotation - 3.14159);
        this.born = 0; // Time since new bullet spawned
    }
}