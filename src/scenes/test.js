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

    this.load.spritesheet('copSprite','copsprite.png',{frameWidth: 170, frameHeight: 166, startFrame: 0, endFrame: 1});
        


}


create(){
    this.cursors = this.input.keyboard.createCursorKeys();
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    this.player = new Player(this,game.config.width/2,0,'player_playerHolder',0).setOrigin(0.5,0.5);
    this.player.body.setCollideWorldBounds(true);
    this.physics.world.gravity.y = 2000;
    this.projectiles = this.add.group();

    this.switchWorld = false;
    var switchKey = Phaser.Input.Keyboard.Key;
    this.switchKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
    this.copTest = new Cop(this, 0, 0, 'copsprite');
    this.copCollider = this.physics.add.collider(this.player, this.copTest);
}


update(){

    if (this.switchKey.downDuration(250)) {
        this.switchfunc();
    }


    this.player.update();
    //player movement
    if(this.cursors.left.isDown) {
        this.faceRight = false;
        this.player.body.setAccelerationX(-this.ACCELERATION);
        this.player.setFlip(true, false);
    } else if(this.cursors.right.isDown) {
        this.faceRight = true;
        this.player.body.setAccelerationX(this.ACCELERATION);
        this.player.resetFlip();
    } else {
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
    if(this.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
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

switchfunc() {
    if(this.switchWorld == true) {
        console.log("Switch false");
        this.switchWorld = false;
        this.copCollider.active = true;
    }
    else if(this.switchWorld == false) {
        console.log("Switch true");
        this.switchWorld = true;
        this.copCollider.active = false;
    }
}

shooting(faceing,faceingUp){
    
    console.log('this is faceingUp = '+faceingUp);
    this.fireBullet = new bullet(this,faceing,faceingUp);
    this.fireBullet.update();
   console.log('this fireBullet = '+this.fireBullet.x);
}


}































