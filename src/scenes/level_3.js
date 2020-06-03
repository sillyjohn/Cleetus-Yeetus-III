class level_3 extends Phaser.Scene {
    constructor(){
        super("level_3");

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
        this.levelExit;
        this.groundLayer_Inverted;
        // this.groundLayer_Inverted_dec;
        // this.groundLayer_dec;
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
    this.load.tilemapTiledJSON('level_3','Level_3.json');

    //player assets
    this.load.image('playerHead','playerHead.png');
    this.load.image('player_playerHolder','playerPlaceHolder.png');
    this.load.image('shells','shells.png');
    this.load.image('health','healthSprite.png');
    this.load.image('spike','thorns.png');
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
    this.load.audio('healthUp', 'healthUp.wav');
    this.load.audio('ammoUp', 'ammoUp.wav');
    this.load.audio('changeWorld', 'changeWorld.wav');

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
    console.log('this is level 3')
    this.shoot = this.sound.add('shoot', {volume: 0.1});
    this.click = this.sound.add('click', {volume: 0.1});
    this.walk = this.sound.add('walk', {volume: 0.4});
    this.walk.setLoop(true);
    this.jump = this.sound.add('jump', {volume: 0.1});
    this.hitEnemy = this.sound.add('enemyHit', {volume: 0.4});
    this.hitPlayer = this.sound.add('playerHit', {volume: 0.4});
    this.ammoUp = this.sound.add('ammoUp', {volume: 0.4});
    this.healthUp = this.sound.add('healthUp', {volume: 0.4});
    this.changeWorld = this.sound.add('changeWorld', {volume: 0.4});
    //switch
    this.switchWorld = false;
    this.switchKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    //background
    this.background_InvertedWorld = this.add.image(0,0,'background_WrapedWood').setOrigin(0,0);
    this.background_NormalWorld = this.add.image(0,0,'background_NormalWood').setOrigin(0,0);
   // tile map
    this.map = this.add.tilemap("level_3");
    //add tileset
    this.tileset_Normal = this.map.addTilesetImage('tileset_v1','tileSet_NormalWood');
    this.tileset_Inverted = this.map.addTilesetImage('tileset_v2','tileSet_WrapedWood');
    this.tileset_Decoration = this.map.addTilesetImage('misctileset','tileset_Decoration');
    
    //***************************************************NEEDS FIX************************************************************** */
    // create tilemap layers
    this.groundLayer = this.map.createDynamicLayer("Tiles_level3", this.tileset_Normal, 0, 0);
    // this.groundLayer_dec = this.map.createDynamicLayer("Tiles4", this.tileset_Decoration, 0, 0);
    this.groundLayer_Inverted = this.map.createDynamicLayer("Tiles_level3_2",this.tileset_Inverted,0,0);
    // this.groundLayer_Inverted_dec = this.map.createDynamicLayer("Tiles3",this.tileset_Decoration,0,0);
    //***************************************************NEEDS FIX************************************************************** */
    
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

    //player spawn
    this.playerSpawn = this.map.findObject("Object Layer_level_3", obj => obj.name === "level_3_Spawn");

    this.player = new ControlPlayer(this,this.playerSpawn.x,this.playerSpawn.y,'playerRun',0).setOrigin(0.5,0.5);

    this.player.body.setCollideWorldBounds(false);
    this.lookPlayer.body.setCollideWorldBounds(false);
    this.player.depth = 0;
    this.lookPlayer.depth = 1;

    this.playerBullets = this.physics.add.group({classType: DirectBullet, runChildUpdate: true});

    this.spores = this.physics.add.group({classType: Spore, runChildUpdate: true});

    // console.log('spawn x'+this.playerSpawn.x);
    // console.log('spawn y'+this.playerSpawn.y);
    

    this.reticle = this.physics.add.sprite(game.config.width/2, 100, 'crosshair');
    this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(false);
    this.reticle.body.allowGravity = false;

    //enemies
    this.enemySpawnPoint = this.map.findObject("Object Layer_level_1", obj => obj.name  === "enemySpawn_level_1_Bug");

    this.bugs = this.physics.add.group({classType: Bug, runChildUpdate: true});
    var bug1 = this.bugs.get().setActive(true).setVisible(true).setSize(this.bugs.width).setOrigin(0.5,0.5).setScale(0.5);
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

    //pickups
    this.heals = this.physics.add.group({classType: HealthPickup, runChildUpdate: true});
    this.ammo = this.physics.add.group({classType: AmmoPickup, runChildUpdate: true});

    //create exit
    this.levelExit = this.map.findObject("Object Layer_level_3", exit => exit.name === "level_3_Exit");
    this.exitArea = this.add.rectangle(this.levelExit.x,this.levelExit.y,this.levelExit.width,this.levelExit.height).setOrigin(0,1);

    this.physics.world.enable(this.exitArea, Phaser.Physics.Arcade.STATIC_BODY);


    
    console.log("exit x"+this.levelExit.x);
    console.log("exit y"+this.levelExit.y);
    this.physics.add.overlap(this.player, this.exitArea, (obj1, obj2) => {
    
        this.scene.start('level_4');
         console.log('move to level 2');
    });
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
    this.player.body.setCollideWorldBounds(true);
    

    //item create
    this.itemBullet = this.add.rectangle(0,0);

    //enemy created
    // this.enemy1 = new Enemy(this,game.config.width,550,'player_Idle',0).setOrigin(0.5,0.5).setSize(0.01);
    // this.enemy1.body.setCollideWorldBounds(true);
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
    //health 
    this.hpIcon = this.add.text(this.cameras.main.width-200,this.cameras.main.height-100,this.player.health,this.hpConfig);
    console.log('player hp'+this.player.health);
    this.hpIcon.setScrollFactor(0);
    this.bulletCount = this.add.text(200,this.cameras.main.height-100,this.playerAmmo,this.hpConfig);
    this.bulletCount.setScrollFactor(0);
      //Animation 

    //bullets collisions
    //this.physics.add.collider(this.playerBullets, this.groundLayer);

    //player collisions with ground layers
    this.collideWithNormalWorld_player = this.physics.add.collider(this.player, this.groundLayer);
    this.collideWithNormalWorld_lookPlayer = this.physics.add.collider(this.lookPlayer, this.groundLayer);
    this.collideWithInvertedWorld_player = this.physics.add.collider(this.player, this.groundLayer_Inverted);
    this.collideWithInvertedWorld_lookPlayer = this.physics.add.collider(this.lookPlayer, this.groundLayer_Inverted);
}

constrainReticle(reticle)
{
    var distX = this.reticle.x - this.player.x;
    var distY = this.reticle.y - this.player.y;

    if (distX > 450)
        this.reticle.x = this.player.x + 450;
    else if (distX < -450)
        this.reticle.x = this.player.x - 450;

    if (distY > 450)
        this.reticle.y = this.player.y + 450;
    else if (distY < -450)
        this.reticle.y = this.player.y - 450;
}

enemyHitCallback(enemyHit, bulletHit) {
    enemyHit.scene.hitEnemy.play();
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        var randSpawn = Math.random() * 5;
        if(randSpawn < 2) {
            var ammoPick = enemyHit.scene.ammo.get().setActive(true).setVisible(true);
            ammoPick.setPos(enemyHit.x,enemyHit.y);
            enemyHit.scene.physics.add.collider(enemyHit.scene.player, ammoPick, enemyHit.scene.ammoCallback);
            enemyHit.scene.normalAmmoCollide = enemyHit.scene.physics.add.collider(ammoPick, enemyHit.scene.groundLayer);
            enemyHit.scene.warpAmmoCollide = enemyHit.scene.physics.add.collider(ammoPick, enemyHit.scene.groundLayer_Inverted);
        }
        if(randSpawn >= 2 && randSpawn < 3) {
            var healthPick = enemyHit.scene.heals.get().setActive(true).setVisible(true);
            healthPick.setPos(enemyHit.x,enemyHit.y);
            enemyHit.scene.physics.add.collider(enemyHit.scene.player, healthPick, enemyHit.scene.healthCallback);
            enemyHit.scene.normalHealthCollide = enemyHit.scene.physics.add.collider(healthPick, enemyHit.scene.groundLayer);
            enemyHit.scene.warpHealthCollide = enemyHit.scene.physics.add.collider(healthPick, enemyHit.scene.groundLayer_Inverted);
        }
        console.log("rand: ", randSpawn);
        
        enemyHit.disableBody(true,true);
        enemyHit.setActive(false).setVisible(false);

        
        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
    }
}

ammoCallback(playerReload, ammoObj) {
    playerReload.scene.ammoUp.play();
    playerReload.scene.playerAmmo += 5;
    ammoObj.destroy();
}

healthCallback(playerHeal, healthObj) {
    playerHeal.scene.healthUp.play();
    playerHeal.scene.player.health += 50;
    healthObj.destroy();
}

playerHitCallback(playerHit, enemyHit) {
    playerHit.scene.hitPlayer.play();
    if (enemyHit.active === true && playerHit.active === true)
    {
        if(playerHit.scene.invincible == true) {
            console.log(playerHit.scene.playerBugCollide);
            playerHit.scene.playerBugCollide.active = false;
            playerHit.scene.playerMushCollide.active = false;
            playerHit.scene.playerSpikeCollide.active = false;
        }

        playerHit.health = playerHit.health - 10;
        playerHit.scene.invincible = true;
        console.log("Player hp: ", playerHit.health);
    }
}

update(){
   
     //update hp counter
     this.hpIcon.text = this.player.health;
     this.bulletCount.text = this.playerAmmo;

     if(this.player.health <= 0){
 
         this.gameOver = true
 
     }
     //game over 
     if(this.gameOver == false){
 
         //this.scene.start("endScene");
 
     }
 
         //update list
    this.player.update();
    this.lookPlayer.update();
    
    //switch world input
    if (Phaser.Input.Keyboard.JustDown(this.switchKey)) {
        this.changeWorld.play();
        console.log("switched");
        if(this.switchWorld == true) {
            console.log("Switch false");
            this.switchWorld = false;
            this.cameras.main.shake(300,0.05);
            this.cameras.main.flash();
        }
        else if(this.switchWorld == false) {
            console.log("Switch true");
            this.switchWorld = true;
            this.cameras.main.shake(300,0.05);
            this.cameras.main.flash();
        }
    }

    //invincibility
    if(this.invincible == true) {
        console.log(this.invincible, " ", this.invincibleTimer);
        this.player.tint = Math.random() * 0xffffff;
        this.lookPlayer.tint = Math.random() * 0xffffff;
        if(this.invincibleTimer > 0) {
            this.invincibleTimer--;
        }
        else {
            this.invincible = false;
            this.invincibleTimer = 120;
            this.player.body.setActive = true;
            this.playerBugCollide.active = true;
            this.playerMushCollide.active = true;
            this.playerSpikeCollide.active = true;
            this.player.clearTint();
            this.lookPlayer.clearTint();
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

    //look flip
    this.player_distX = this.reticle.x - this.player.x;
    this.lookPlayer.flipY = this.player_distX < 0;

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

    // player jump
    // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
    if((this.player.body.blocked.down || this.player.body.touching.down) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
        this.jump.play();
        this.player.body.setVelocityY(this.JUMP_VELOCITY);
    }
}


}































