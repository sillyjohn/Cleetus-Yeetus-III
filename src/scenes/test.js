class test extends Phaser.Scene {
    constructor(){
        super("test");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 2000;   // pixels/second
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;    
        this.JUMP_VELOCITY = -1000;
        this.faceRight = true;
        this.faceUp = false;
        this.faceDown = false;
    }

preload(){
    this.load.path = "./assets/";
    this.load.image('player_playerHolder','playerPlaceHolder.png');
    this.load.image('player_playerHolderFlip','playerPlaceHolderFlip.png');

    this.load.image('pillar','pillar.png');
    this.load.image('pillarAlt','pillarAlt.png');
        


}


create(){
    
    this.switchWorld = false;
    this.switchKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
    this.pillarTest = new realPillar(this, 100, 500, 'pillar');

    this.cursors = this.input.keyboard.createCursorKeys();
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    this.player = new DirectPlayer(this,game.config.width/2,100,'player_playerHolder',0).setOrigin(0.5,0.5);
    this.player.body.setCollideWorldBounds(true);
    this.physics.world.gravity.y = 2000;
    this.projectiles = this.add.group();
    

    
    this.pillarCollider = this.physics.add.collider(this.player, this.pillarTest);
}


update(){
    if (Phaser.Input.Keyboard.JustDown(this.switchKey)) {
        console.log("switched");
        if(this.switchWorld == true) {
            console.log("Switch false");
            this.switchWorld = false;
        }
        else if(this.switchWorld == false) {
            console.log("Switch true");
            this.switchWorld = true;
        }
    }

    if(this.switchWorld == true) {
        this.pillarCollider.active = false;
        this.pillarTest.setTexture('pillarAlt');
    }
    else if(this.switchWorld == false) {
        this.pillarCollider.active = true;
        this.pillarTest.setTexture('pillar');
    }

    

    this.player.update();

    if(this.player.angle > 90 || this.player.angle > 270) {
        this.player.setTexture('player_playerHolderFlip');
    }
    else {
        this.player.setTexture('player_playerHolderFlip');
    }

    //player movement
    if(this.cursors.left.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.faceRight = false;
        this.player.body.setVelocityX(-this.ACCELERATION);
        this.player.setFlip(true, false);
    } else if(this.cursors.right.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.faceRight = true;
        this.player.body.setVelocityX(+this.ACCELERATION);
        this.player.resetFlip();
    }
    if(this.cursors.left.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
        this.faceRight = false;
        this.player.body.setVelocityX(-this.ACCELERATION);
        this.player.setFlip(true, false);
    } 
    else if(this.cursors.right.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
        this.faceRight = true;
        this.player.body.setVelocityX(+this.ACCELERATION);
        this.player.resetFlip();
    }
    else if (this.player.body.blocked.down || this.player.body.touching.down){
        this.player.body.setVelocityX(0);
    }
    else{
        // set acceleration to 0 so DRAG will take over
        this.player.body.setAccelerationX(0);
        this.player.body.setDragX(this.DRAG);
    }
    // player jump
    // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
    if(!this.player.body.blocked.down) {
        //this.player.anims.play('jump', true);
    }
    if(this.player.body.blocked.down){
        this.faceUp = false;
    }
    if((this.player.body.blocked.down || this.player.body.touching.down) && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.player.body.setVelocityY(this.JUMP_VELOCITY);
        this.faceUp = true;
    }
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
        this.fireBullet = this.projectiles.getChildren()[i];
        this.fireBullet.update();
      }
  
    if(Phaser.Input.Keyboard.JustDown(keyF)){

        this.shooting(this.faceRight,this.faceUp);
    }
    
}

shooting(faceing,faceingUp){
    console.log('this is faceingUp = '+faceingUp);
    this.fireBullet = new bullet(this,faceing,faceingUp);
    this.fireBullet.update();
    console.log('this fireBullet = '+this.fireBullet.x);
}


}































