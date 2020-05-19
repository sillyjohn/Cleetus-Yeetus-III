class world_1 extends Phaser.Scene {
    constructor(){
        super("world_1");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 2000;   // pixels/second
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;    
        this.JUMP_VELOCITY = -1000;
        this.faceRight = true;
        this.faceUp = false;
        this.faceDown = false;
        this.gameOver = false;
    }

preload(){
    this.load.path = "./assets/";
    this.load.image('player_playerHolder','playerPlaceHolder.png');
    this.load.image('background_placeHolder','90278.png');
    this.load.spritesheet('player_Idle','cleetus-frames-sheet.png',{frameWidth: 233, frameHeight: 280});


}


create(){
    console.log('this is  test_john.js');
    //background_placeHolder
    this.backgroundPlaceHolder = this.add.image(0,0,'background_placeHolder');
    //create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
    //create fire key
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    //player created
    this.player = new Player(this,game.config.width/2,550,'player_Idle',0).setOrigin(0.5,0.5).setScale(0.5);
    this.player.body.setCollideWorldBounds(true);

    //item create
    this.itemBullet = this.add.rectangle(0,0);

    //enemy created
    this.enemy1 = new Enemy(this,game.config.width/3,550,'player_Idle',0).setOrigin(0.5,0.5).setScale(0.5);
    this.enemy1.body.setCollideWorldBounds(true);
    //world gravity
    this.physics.world.gravity.y = 2000;
    //create bullet group 
    this.projectiles = this.add.group();
    // camera setting, world bound
    this.cameras.main.setBounds(0, 0, 900, 600);
    // camera seting, zoom level, < 1 is zoom out, >1 is zoom in
    this.cameras.main.setZoom(1.001);
    // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    //create hp bar
      //score display
      let hpConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
       
        color:'#ffffff',
        align:'right',
        padding:{
            top: 5,
            bottom:5,
        },
        fixedWidth:100
    }
    this.healthCount = 0;
    this.hpIcon = this.add.text(590,500,this.healthCount,hpConfig);
    this.hpIcon.setScrollFactor(0);

}


update(){
    //game over loop *move all function and method in later*
    // if(this.gameOver == false){



    // }else {

    //     this.scene.start("");

    // }

    //update list
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
    //Shooting mechanics
    if(Phaser.Input.Keyboard.JustDown(keyF)){

        this.shooting(this.faceRight,this.faceUp);
    }
    
    //colliders list *create all collider below*

    // bullet and enemy collider
    this.physics.add.collider(this.projectiles,this.enemy1,function(projectiles,enemy){
        projectiles.destroy();
        enemy.destroy();
    });
    
    //collider list End
    
}

shooting(faceing,faceingUp){
    
    console.log('this is faceingUp = '+faceingUp);
    this.fireBullet = new bullet(this,faceing,faceingUp);
    this.fireBullet.update();
   console.log('this fireBullet = '+this.fireBullet.x);
}


}































