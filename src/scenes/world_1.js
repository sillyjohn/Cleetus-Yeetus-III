class world_1 extends Phaser.Scene {
    constructor(){
        super("world_1");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 2000;   // pixels/second
        this.MAX_Y_VEL = 3000;
        this.DRAG = 600;    
        this.JUMP_VELOCITY = -1350;
        this.faceRight = true;
        this.faceUp = false;
        this.faceDown = false;
        this.gameOver = false;
    }

preload(){
    this.load.path = "./assets/";
    this.load.image('player_playerHolder','playerPlaceHolder.png');
    this.load.image('background_WrapedWood','warpedwoodsdarkbg.png');
    this.load.image('tileSet_WrapedWood','tileset_v2.png');
    this.load.spritesheet('player_Idle','cleetus-ta(first).png',{frameWidth: 807, frameHeight: 906});
    this.load.tilemapTiledJSON('testMap','testing_3.json');
    this.load.audio('shootingSound','shoot.wav');

    //player assets
    this.load.image('playerHead','playerHead.png');
    this.load.image('player_playerHolder','playerPlaceHolder.png');
    this.load.spritesheet('playerRun','playerRun.png',{frameWidth: 370, frameHeight: 321});
    this.load.image('bullet', 'bullet.png');
    this.load.image('crosshair', 'crosshair.png');
}


create(){
    //switch
    this.switchWorld = false;
    this.switchKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    //background
    this.backgroundPlaceHolder = this.add.image(0,0,'background_WrapedWood').setOrigin(0,0);
   
    const map = this.add.tilemap("testMap");
    //add tileset
    const tileset = map.addTilesetImage('tileset_v2','tileSet_WrapedWood');
   
    // create tilemap layers
    const groundLayer = map.createStaticLayer("Tiles", tileset, 0, 0);
    
    //set map collision
    groundLayer.setCollisionByProperty({ collides: true });
   
    //player
    this.lookPlayer = new DirectPlayer(this,game.config.width/2,100,'playerHead',0).setOrigin(0.5,0.5);
    this.anims.create({
        key: 'run',
        frameRate: 30,
        repeat: -1,
        frames: this.game.anims.generateFrameNumbers('playerRun',
        {
            start: 0,
            end: 7
        }),
    })
    this.anims.create({
        key: 'idle',
        frameRate: 30,
        repeat: -1,
        frames: this.game.anims.generateFrameNumbers('playerRun',
        {
            start: 8,
            end: 8
        }),
    })
    this.player = new ControlPlayer(this,game.config.width/2,100,'playerRun',0).setOrigin(0.5,0.5);

    this.player.body.setCollideWorldBounds(true);
    this.lookPlayer.body.setCollideWorldBounds(true);
    this.player.depth = 0;
    this.lookPlayer.depth = 1;

    this.playerBullets = this.physics.add.group({classType: DirectBullet, runChildUpdate: true});

    this.reticle = this.physics.add.sprite(800, 700, 'crosshair');
    this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    this.reticle.body.allowGravity = false;

    //broken wasd
    /*this.moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    this.input.keyboard.on('keydown_W', function (event) {
        this.player.body.setVelocityX(-800);
    });
    this.input.keyboard.on('keydown_S', function (event) {
        this.player.body.setAccelerationY(800);
    });
    this.input.keyboard.on('keydown_A', function (event) {
        this.player.body.setAccelerationX(-800);
    });
    this.input.keyboard.on('keydown_D', function (event) {
        this.player.body.setAccelerationX(800);
    });

    this.input.keyboard.on('keyup_W', function (event) {
        if (moveKeys['down'].isUp){
            this.player.body.setAccelerationY(0);
        }
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp){
            this.player.body.setAccelerationY(0);
        }
    });
    this.input.keyboard.on('keyup_A', function (event) {
        if (moveKeys['right'].isUp)
            this.player.body.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp) {
            this.player.body.setAccelerationX(0);
        }
    });*/

    //shooting
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (this.player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = this.playerBullets.get().setActive(true).setVisible(true);

        if (bullet) {
            bullet.fire(this.lookPlayer, this.reticle);
        }
    }, this);
    
    //focus pointer on game window
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    //move crosshair
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            this.reticle.x += this.input.mousePointer.movementX;
            this.reticle.y += this.input.mousePointer.movementY;
        }
    }, this);

    
    //create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
    //player created
    this.player.body.setCollideWorldBounds(true);
    

    //item create
    this.itemBullet = this.add.rectangle(0,0);

    //enemy created
    this.enemy1 = new Enemy(this,game.config.width/3,550,'player_Idle',0).setOrigin(0.5,0.5).setScale(0.5);
    this.enemy1.body.setCollideWorldBounds(true);
    //world gravity
    this.physics.world.gravity.y = 2000;
    //tile bias
    this.physics.world.TILE_BIAS= 50;
    //create bullet group 
    this.projectiles = this.add.group();
    // camera setting, world bound
    this.cameras.main.setBounds(0, 0, 2560 , 2560);
    // camera seting, zoom level, < 1 is zoom out, >1 is zoom in
    this.cameras.main.setZoom(2);
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
      //Animation 
    game.anims.create({
        key: 'run',
        frameRate: 30,
        frames: this.game.anims.generateFrameNumbers('player_Idle',
        {
            start: 0,
            end: 9
        }),

    }); 
    game.anims.create({
        key: 'idle',
        frameRate: 60,
        repeat: 1,
        frames: this.game.anims.generateFrameNumbers('player_Idle',
        {
            start: 11,
            end: 11
        }),

    });
    game.anims.create({
        key: 'shooting',
        frameRate: 1,
        repeat: 1,
        duration:3000,
        frames: this.game.anims.generateFrameNumbers('player_Idle',
        {
            start: 10,
            end: 10
        }),

    });

    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.lookPlayer, groundLayer);
}

constrainReticle(reticle)
{
    var distX = this.reticle.x - this.player.x;
    var distY = this.reticle.y - this.player.y;

    if (distX > 300)
        this.reticle.x = this.player.x + 300;
    else if (distX < -300)
        this.reticle.x = this.player.x - 300;

    if (distY > 300)
        this.reticle.y = this.player.y + 300;
    else if (distY < -300)
        this.reticle.y = this.player.y - 300;
}

update(){
    //game over loop *move all function and method in later*
    // if(this.gameOver == false){



    // }else {

    //     this.scene.start("");

    // }

    //update list
    this.player.update();
    this.lookPlayer.update();
    
    //switch world input
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
        //alternate world stuff
    }
    else if(this.switchWorld == false) {
        //default world stuff
    }

    //reticle movement
    this.reticle.body.velocityX = this.player.body.velocityX;
    this.reticle.body.velocityY = this.player.body.velocityY;
    this.constrainReticle(this.reticle);

    //player movement
    if(this.cursors.left.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(-this.ACCELERATION);
        this.player.setFlip(true, false);
        this.player.play('run', true);
    } 
    else if(this.cursors.right.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(+this.ACCELERATION);
        this.player.resetFlip();
        this.player.play('run', true);
    }
    if(this.cursors.left.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(-this.ACCELERATION);
        this.player.setFlip(true, false);
        this.player.play('run', true);
    } 
    else if(this.cursors.right.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(+this.ACCELERATION);
        this.player.resetFlip();
        this.player.play('run', true);
    }
    else if (this.player.body.blocked.down || this.player.body.touching.down){
        this.player.body.setVelocityX(0);
        this.player.play('idle', true);
    }
    else{
        // set acceleration to 0 so DRAG will take over
        this.player.body.setAccelerationX(0);
        this.player.play('idle');
    }

    //look flip
    this.player_distX = this.reticle.x - this.player.x;
    this.lookPlayer.flipY = this.player_distX < 0;



    // player jump
    // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
    if(!this.player.body.blocked.down) {
        //this.player.anims.play('jump', true);
    }
    if((this.player.body.blocked.down || this.player.body.touching.down) && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.player.body.setVelocityY(this.JUMP_VELOCITY);
    }
    
    //colliders list *create all collider below*
    
    // bullet and enemy collider
    /*this.physics.add.collider(this.playerBullets,this.enemy1,function(playerBullets,enemy){
        this.playerBullets.destroy();
        enemy.destroy();
    });*/
    
    //collider list End
    
}


}































