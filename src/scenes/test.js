class test extends Phaser.Scene {
    constructor(){
        super("test");

        // variables and settings
        this.ACCELERATION = 400;
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

    this.load.image('pillar','pillar.png');
    this.load.image('pillarAlt','pillarAlt.png');
        
    this.load.image('bullet', 'bullet.png');
    this.load.image('crosshair', 'crosshair.png');

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
    
    this.playerBullets = this.physics.add.group({classType: DirectBullet, runChildUpdate: true});

    this.reticle = this.physics.add.sprite(800, 700, 'crosshair');
    this.reticle.setOrigin(0.5, 0.5).setDisplaySize(25, 25).setCollideWorldBounds(true);
    
    this.moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    this.input.keyboard.on('keydown_W', function (event) {
        this.player.body.setAccelerationY(-800);
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
        if (moveKeys['down'].isUp)
            this.player.body.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp)
            this.player.body.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_A', function (event) {
        if (moveKeys['right'].isUp)
            this.player.body.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp)
            this.player.body.setAccelerationX(0);
    });

    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (this.player.active === false)
            return;

        // Get bullet from bullets group
        var bullet = this.playerBullets.get().setActive(true).setVisible(true);

        if (bullet) {
            bullet.fire(this.player, this.reticle);
            this.physics.add.collider(this.pillarTest, bullet, this.useless);
        }
    }, this);

    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            this.reticle.x = this.input.mousePointer.worldX;
            this.reticle.y = this.input.mousePointer.worldY;
        }
    }, this);

    this.flip = 0;
    this.pillarCollider = this.physics.add.collider(this.player, this.pillarTest);
}

useless() {
    console.log('useless');
}

constrainReticle(reticle)
{
    var distX = this.reticle.x - this.player.x;
    var distY = this.reticle.y - this.player.y;

    if (distX > 800)
        this.reticle.x = this.player.x + 800;
    else if (distX < -800)
        this.reticle.x = this.player.x - 800;

    if (distY > 600)
        this.reticle.y = this.player.y + 600;
    else if (distY < -600)
        this.reticle.y = this.player.y - 600;
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
    
    this.reticle.body.velocityX = this.player.body.velocityX;
    this.reticle.body.velocityY = this.player.body.velocityY;
    this.constrainReticle(this.reticle);
    //player movement
    if(this.cursors.left.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(-this.ACCELERATION);
    } 
    else if(this.cursors.right.isDown && !(this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(+this.ACCELERATION);
    }
    if(this.cursors.left.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(-this.ACCELERATION);
    } 
    else if(this.cursors.right.isDown && (this.player.body.blocked.down || this.player.body.touching.down)) {
        this.player.body.setVelocityX(+this.ACCELERATION);
    }
    else if (this.player.body.blocked.down || this.player.body.touching.down){
        this.player.body.setVelocityX(0);
    }
    else{
        // set acceleration to 0 so DRAG will take over
        this.player.body.setAccelerationX(0);
    }

    this.player_distX = this.reticle.x - this.player.x;
    
    this.player.flipY = this.player_distX < 0;

    // player jump
    // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
    if(!this.player.body.blocked.down) {
        //this.player.anims.play('jump', true);
    }
    if((this.player.body.blocked.down || this.player.body.touching.down) && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
        this.player.body.setVelocityY(this.JUMP_VELOCITY);
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































