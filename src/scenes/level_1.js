class level_1 extends Phaser.Scene {
    constructor(){
        super("level_1");

        // variables and settings
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 2000;   // pixels/second
        this.MAX_Y_VEL = 3000;
        this.DRAG = 600;    
        this.JUMP_VELOCITY = -1350;
        this.gameOver = false;
        this.map;
        this.tileset_Normal;
        this.tileset_Inverted;
        this.groundLayer;
    }

preload(){
    this.load.path = "./assets/";
    //tileset assets   
    this.load.image('background_WrapedWood','warpedwoodsdarkbg.png');
    this.load.image('background_NormalWood','warpedwoodsregbg.png');
    this.load.image("tileset_Decoration","misctileset.png");
    this.load.image('tileSet_WrapedWood','tileset_v2.png');
    this.load.image('tileSet_NormalWood','tileset_v1.png');
    this.load.spritesheet('player_Idle','cleetus-ta(first).png',{frameWidth: 807, frameHeight: 906});
    this.load.tilemapTiledJSON('level_1','Level_1.json');

    //player assets
    this.load.image('playerHead','playerHead.png');
    this.load.image('player_playerHolder','playerPlaceHolder.png');
    this.load.image('shells','shells.png');
    this.load.image('spike','spike.png');
    this.load.image('Spore','spore.png');
    this.load.image('flesh','fleshParticle.png');
    this.load.spritesheet('playerRun','playerRun.png',{frameWidth: 370, frameHeight: 321});
    this.load.image('bullet', 'bullet.png');
    this.load.image('crosshair', 'crosshair.png');
    this.load.audio('shootingSound','shoot.wav');
    this.load.audio('shoot', 'shoot.wav');
    this.load.audio('walk', 'walkLoop.wav');
    this.load.audio('jump', 'jump.wav');
    this.load.audio('click', 'click.wav');
    this.load.audio('enemyHit', 'hitEnemy.wav');
    this.load.audio('playerHit', 'getHit.wav');

    //enemy assets
    this.load.image('dirt','dirtparticle.png');
    this.load.spritesheet('bugSprite','bugSheet.png',{frameWidth: 835, frameHeight: 310});
    this.load.spritesheet('mushroomSprite','shroomSheet.png',{frameWidth: 600, frameHeight: 600});
}


create(){
    //player attributes
    this.playerHealth = 5;
    this.playerAmmo = 25;

    // this is level_1
    console.log('this is level 1')
    this.shoot = this.sound.add('shoot', {volume: 0.1});
    this.click = this.sound.add('click', {volume: 0.1});
    this.walk = this.sound.add('walk', {volume: 0.4});
    this.walk.setLoop(true);
    this.jump = this.sound.add('jump', {volume: 0.1});
    this.hitEnemy = this.sound.add('enemyHit', {volume: 0.7});
    this.hitPlayer = this.sound.add('playerHit', {volume: 0.7});

    //switch
    this.switchWorld = false;
    this.switchKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    //background
    this.background_InvertedWorld = this.add.image(0,0,'background_WrapedWood').setOrigin(0,0);
    this.background_NormalWorld = this.add.image(0,0,'background_NormalWood').setOrigin(0,0);

   // tile map
    this.map = this.add.tilemap("level_1");
    //add tileset
    this.tileset_Normal = this.map.addTilesetImage('tileset_v1','tileSet_NormalWood');
    this.tileset_Inverted = this.map.addTilesetImage('tileset_v2','tileSet_WrapedWood');
    this.tileset_Decoration = this.map.addTilesetImage('misctileset','tileset_Decoration');
   
    // create tilemap layers
     this.groundLayer = this.map.createDynamicLayer("Tile_level_1", this.tileset_Normal, 0, 0);
     this.groundLayer_dec = this.map.createDynamicLayer("Tile_level_1_3", this.tileset_Decoration, 0, 0);
     this.groundLayer_Inverted = this.map.createDynamicLayer("Tile_level_1_2",this.tileset_Inverted,0,0);
     this.groundLayer_Inverted_dec = this.map.createDynamicLayer("Tile_level_1_4",this.tileset_Decoration,0,0);
    
    //set map collision
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.groundLayer_Inverted.setCollisionByProperty({ collides: true });
   
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
    this.anims.create({
        key: 'jump',
        frameRate: 30,
        repeat: -1,
        frames: this.game.anims.generateFrameNumbers('playerRun',
        {
            start: 2,
            end: 2
        }),
    })
    this.anims.create({
        key: 'crawl',
        frameRate: 6,
        repeat: -1,
        frames: this.game.anims.generateFrameNumbers('bugSprite',
        {
            start: 0,
            end: 3
        }),
    })
    this.anims.create({
        key: 'bounce',
        frameRate: 6,
        repeat: -1,
        frames: this.game.anims.generateFrameNumbers('mushroomSprite',
        {
            start: 0,
            end: 3
        }),
    })
    this.playerSpawn = this.map.findObject("Object Layer_level_1", obj => obj.name === "level_1_Spawn");
    this.player = new ControlPlayer(this,this.playerSpawn.x,this.playerSpawn.y,'playerRun',0).setOrigin(0.5,0.5);

    this.player.body.setCollideWorldBounds(false);
    this.lookPlayer.body.setCollideWorldBounds(false);
    this.player.depth = 0;
    this.lookPlayer.depth = 1;

    this.playerBullets = this.physics.add.group({classType: DirectBullet, runChildUpdate: true});

    this.spores = this.physics.add.group({classType: Spore, runChildUpdate: true});
    //enemies
    //enemy spawn
    
    this.enemySpawnPoint = this.map.findObject("Object Layer_level_1", obj => obj.name  === "enemySpawn_level_1_Bug");
    //  this.enemy_Bug = new Bug(this, this.enemySpawnPoint.x,this.enemySpawnPoint.y,'bugSprite',0,this.player.x,this.player.y);
    //  console.log(this.enemySpawnPoint.x+'enemySpawnPoint x');
    //  this.enemy_Bug.body.setSize(this.enemy_Bug.width);
    //  this.enemy_Bug.body.setMaxVelocity(this.MAX_X_VEL  , this.MAX_Y_VEL);
    //  this.enemy_Bug.play('crawl');
     
    //  this.physics.add.collider(this.enemy_Bug,this.groundLayer);
    //  this.physics.add.collider(this.enemy_Bug,this.groundLayer_Inverted)
    //  this.enemy_Bug.body.setCollideWorldBounds(true);

    this.bugs = this.physics.add.group({classType: Bug, runChildUpdate: true});
    var bug1 = this.bugs.get().setActive(true).setVisible(true).setSize(this.bugs.width);
    bug1.setPos(this.enemySpawnPoint.x,this.enemySpawnPoint.y);

    this.normalBugCollide = this.physics.add.collider(this.bugs, this.groundLayer);
    this.warpBugCollide = this.physics.add.collider(this.bugs, this.groundLayer_Inverted);
    this.playerBugCollide = this.physics.add.collider(this.bugs, this.player, this.playerHitCallback);

    this.mushrooms = this.physics.add.group({classType: Mushroom, runChildUpdate: true});
    var mush1 = this.mushrooms.get().setActive(true).setVisible(true);
    mush1.setPos(this.playerSpawn.x + 500,this.playerSpawn.y);

    this.normalMushCollide = this.physics.add.collider(this.mushrooms, this.groundLayer);
    this.warpMushCollide = this.physics.add.collider(this.mushrooms, this.groundLayer_Inverted);
    this.playerMushCollide = this.physics.add.collider(this.mushrooms, this.player, this.playerHitCallback);

    this.spikes = this.physics.add.group({classType: Spike, runChildUpdate: true});
    var spike1 = this.spikes.get().setActive(true).setVisible(true);
    spike1.setPos(700,800);

    this.normalSpikeCollide = this.physics.add.collider(this.spikes, this.groundLayer);
    this.warpSpikeCollide = this.physics.add.collider(this.spikes, this.groundLayer_Inverted);
    this.playerSpikeCollide = this.physics.add.collider(this.spikes, this.player, this.playerHitCallback);
    

    this.reticle = this.physics.add.sprite(game.config.width/2, 100, 'crosshair');
    this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(false);
    this.reticle.body.allowGravity = false;
    
    //pickups
    this.heals = this.physics.add.group({classType: HealthPickup, runChildUpdate: true});
    this.ammo = this.physics.add.group({classType: AmmoPickup, runChildUpdate: true});

    
     //create exit
     this.levelExit = this.map.findObject("Object Layer_level_1", exit => exit.name === "level_1_Exit");
     this.exitArea = this.add.rectangle(this.levelExit.x,this.levelExit.y,this.levelExit.width,this.levelExit.height).setOrigin(0,1);
 
     this.physics.world.enable(this.exitArea, Phaser.Physics.Arcade.STATIC_BODY);
 
 
     
     console.log("exit x"+this.levelExit.x);
     console.log("exit y"+this.levelExit.y);
     this.physics.add.overlap(this.player, this.exitArea, (obj1, obj2) => {
     
        this.scene.start('level_2');
          
     });

     this.emitSplash

    //WASD
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dashKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    //shooting
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if(this.playerAmmo > 0){
            this.shoot.play();
            if (this.player.active === false)
                return;

            // Get bullet from bullets group
            var bullet1 = this.playerBullets.get().setActive(true).setVisible(true);
            bullet1.body.allowGravity = false;

            if (bullet1) {
                bullet1.fire(this.lookPlayer.rotation);
                this.physics.add.collider(this.bugs, bullet1, this.enemyHitCallback);
                this.physics.add.collider(this.mushrooms, bullet1, this.enemyHitCallback);
            }

            var bullet2 = this.playerBullets.get().setActive(true).setVisible(true);
            bullet2.body.allowGravity = false;

            if (bullet2) {
                bullet2.fire(this.lookPlayer.rotation + (0.0872665/2));
                this.physics.add.collider(this.bugs, bullet2, this.enemyHitCallback);
                this.physics.add.collider(this.mushrooms, bullet2, this.enemyHitCallback);
            }

            var bullet3 = this.playerBullets.get().setActive(true).setVisible(true);
            bullet3.body.allowGravity = false;

            if (bullet3) {
                bullet3.fire(this.lookPlayer.rotation - (0.0872665/2));
                this.physics.add.collider(this.bugs, bullet3, this.enemyHitCallback);
                this.physics.add.collider(this.mushrooms, bullet3, this.enemyHitCallback);
            }
            this.playerAmmo--;
            console.log(this.playerAmmo);
        }
        else {
            this.click.play();
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

    

    
    //create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
    //player created
    this.player.body.setCollideWorldBounds(true);
    

    //item create
    this.itemBullet = this.add.rectangle(0,0);

    //world gravity
    this.physics.world.gravity.y = 2000;
    //tile bias
    this.physics.world.TILE_BIAS= 50;
    this.cameras.main.width = 1920;
    this.cameras.main.height = 1080;
    // camera setting, world bound
    this.cameras.main.setBounds(0, 0, 2560 , 2560);
    // camera seting, zoom level, < 1 is zoom out, >1 is zoom in
    this.cameras.main.setZoom(1);
    // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    //camera dead zone
    
    //move crosshair with camera and pointer
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            this.reticle.x += this.input.mousePointer.movementX;
            this.reticle.y += this.input.mousePointer.movementY;
        }
    }, this);

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

    //bullets collisions
    //this.physics.add.collider(this.playerBullets, this.groundLayer);

    //player collisions with ground layers
    this.collideWithNormalWorld_player = this.physics.add.collider(this.player, this.groundLayer);
    this.collideWithNormalWorld_lookPlayer = this.physics.add.collider(this.lookPlayer, this.groundLayer);
    this.collideWithInvertedWorld_player = this.physics.add.collider(this.player, this.groundLayer_Inverted);
    this.collideWithInvertedWorld_lookPlayer = this.physics.add.collider(this.lookPlayer, this.groundLayer_Inverted);
}

enemyHitCallback(enemyHit, bulletHit) {
    enemyHit.scene.hitEnemy.play();
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        //enemyHit.getData.printPlease();
        enemyHit.setData.health = enemyHit.getData.health - 1;
        console.log("Enemy hp: ", enemyHit.getData.health);

        // Kill enemy if health <= 0
        /*if (enemyHit.health <= 0)
        {
            var randSpawn = Math.random() * 5;
            if(randSpawn < 2) {
                var ammoPick = this.ammo.get().setActive(true).setVisible(true);
                ammoPick.setPos(this.enemyHit.x,this.enemyHit.y);
                this.physics.add.collider(this.player, ammoPick, this.ammoCallback);
            }
            if(randSpawn >= 2 && randSpawn < 3) {
                var healthPick = this.heals.get().setActive(true).setVisible(true);
                healthPick.setPos(this.enemyHit.x,this.enemyHit.y);
                this.physics.add.collider(this.player, healthPick, this.healthCallback);
            }
            console.log("rand: ", randSpawn);
            
            enemyHit.disableBody(true,true);
            enemyHit.setActive(false).setVisible(false);
        }*/
        var randSpawn = Math.random() * 5;
        if(randSpawn < 2) {
            var ammoPick = this.ammo.get().setActive(true).setVisible(true);
            ammoPick.setPos(this.enemyHit.x,this.enemyHit.y);
            this.physics.add.collider(this.player, ammoPick, this.ammoCallback);
        }
        if(randSpawn >= 2 && randSpawn < 3) {
            var healthPick = this.heals.get().setActive(true).setVisible(true);
            healthPick.setPos(this.enemyHit.x,this.enemyHit.y);
            this.physics.add.collider(this.player, healthPick, this.healthCallback);
        }
        console.log("rand: ", randSpawn);
        
        enemyHit.disableBody(true,true);
        enemyHit.setActive(false).setVisible(false);

        
        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}

ammoCallback(playerReload, ammoObj) {
    playerReload.gameObject.playerAmmo += 5;
    ammoObj.gameObject.destroy();
}

healthCallback(playerHeal, healthObj) {
    playerHeal.gameObject.health += 20;
    healthObj.gameObject.destroy();
}

playerHitCallback(playerHit, enemyHit) {
    // Reduce health of player
    console.log(playerHit instanceof ControlPlayer);
    if (enemyHit.active === true && playerHit.active === true)
    {
        playerHit.health = playerHit.health - 10;
        console.log("Player hp: ", playerHit.health);
    }
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
shakeEffect(){
    this.cameras.main.shake(300,0.05);



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
        this.shakeEffect();
        console.log("switched");
        if(this.switchWorld == true) {
            console.log("Switch false");
            this.switchWorld = false;
            this.cameras.main.shake(300,0.05);
        }
        else if(this.switchWorld == false) {
            console.log("Switch true");
            this.switchWorld = true;
            this.cameras.main.shake(300,0.05);
        }
    }

    if(this.switchWorld == true) {
        //this.spikes.setActive(true);
        //alternate world stuff
        this.background_InvertedWorld.setVisible(true);
        this.background_NormalWorld.setVisible(false);
        this.groundLayer.setVisible(false); 
        this.groundLayer_Inverted.setVisible(true);
        this.groundLayer_dec.setVisible(false); 
        this.groundLayer_Inverted_dec.setVisible(true);
        this.collideWithNormalWorld_player.active = false;
        this.collideWithNormalWorld_lookPlayer.active = false;
        this.collideWithInvertedWorld_player.active = true;
        this.collideWithInvertedWorld_lookPlayer.active = true;       
    }
    else if(this.switchWorld == false) {
        //this.spikes.setActive(false);
        //default world stuff
        this.background_InvertedWorld.setVisible(false);
        this.background_NormalWorld.setVisible(true);
        this.groundLayer.setVisible(true);
        this.groundLayer_Inverted.setVisible(false);
        this.groundLayer_dec.setVisible(true); 
        this.groundLayer_Inverted_dec.setVisible(false);
        this.collideWithNormalWorld_player.active = true;
        this.collideWithNormalWorld_lookPlayer.active = true;        
        this.collideWithInvertedWorld_player.active = false;
        this.collideWithInvertedWorld_lookPlayer.active = false;     
    }


    //reticle movement
    this.constrainReticle(this.reticle);
    if(!(this.player.body.blocked.left || this.player.body.blocked.right) && !(this.player.body.touching.left || this.player.body.touching.right)) {
        this.reticle.body.velocity.x = this.player.body.velocity.x;
        this.reticle.body.velocity.y = this.player.body.velocity.y;
    }

    //player movement
    if(this.keyA.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(-this.ACCELERATION);
        this.player.setFlip(true, false);
        this.player.play('run', true);
    } 
    else if(this.keyD.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(+this.ACCELERATION);
        this.player.resetFlip();
        this.player.play('run', true);
    }
    if(this.keyA.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(-this.ACCELERATION);
        this.player.setFlip(true, false);
        this.player.play('run', true);
    } 
    else if(this.keyD.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
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
        this.player.play('jump');
    }

    //look flip
    this.player_distX = this.reticle.x - this.player.x;
    this.lookPlayer.flipY = this.player_distX < 0;



    // player jump
    // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
    if(!this.player.body.blocked.down && !this.player.body.touching.down) {
        //this.player.anims.play('jump', true);
    }
    if((this.player.body.blocked.down || this.player.body.touching.down) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
        this.jump.play();
        this.player.body.setVelocityY(this.JUMP_VELOCITY);
    }
    
}


}































