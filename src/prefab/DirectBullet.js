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
        this.body.allowGravity = false;
    }
    
    create(){
        this.body.setSize(width/2);
        this.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
        
    }
    
    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.born += 1;
        if (this.born > 120) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    fire() {
        this.setPosition(this.scene.player.x, this.scene.player.y); // Initial position

        
        // Calculate X and y velocity of bullet to moves it from shooter to target
        /*if (this.scene.reticle.y >= this.body.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
            console.log(this.xSpeed);
            console.log(this.ySpeed);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
            console.log(this.xSpeed);
            console.log(this.ySpeed);
        }*/

        this.rotation = this.scene.player.rotation; // angle bullet with player rotation

        this.scene.physics.velocityFromRotation(this.rotation, 2000, this.body.velocity);
        console.log("");
        this.born = 0; // Time since new bullet spawned
    }
}