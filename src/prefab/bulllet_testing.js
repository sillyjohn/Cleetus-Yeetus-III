class bullet_testing extends Phaser.GameObjects.Sprite{
    constructor(scene,faceToward,faceTop){
  
      var x = scene.player.x;
      var y = scene.player.y;
  
      super(scene, x, y, "bullet");
  
      scene.add.existing(this);
      scene.physics.world.enableBody(this);
      this.setVel(faceToward,faceTop);

     this.numOfBullet = 10;
    //     if(numOfBullet !== 0){
    //      this.setVel(faceToward,faceTop);
    //      numOfBullet-= 1;
    //      console.log(numOfBullet);
    //   }else{
    //     console.log('no ammo');
    //   }
      scene.projectiles.add(this);
    }
 
  
    update(){
    //   //bullet counter
      if(this.numOfBullet !== 0){
         this.numOfBullet-= 1
         console.log(this.numOfBullet);
      }else{

        console.log('no ammo');
      }
      // 3.4 Frustum culling
      if(this.x < 0|| this.x >  900 || this.y < 0){
        this.destroy();
        console.log('this obj destroyed');
      }
    }

    setVel(faceToward,faceTop){

         // this.body.velocity.x = +4000;
    if(faceTop == true){
        this.body.velocity.y = -4000;
        console.log('-1 ammo');
        ;
    }else if(faceToward == true){
        this.body.velocity.x = +4000;
        console.log('shooting right.ts');
        console.log('this is facetoward'+faceToward);
        console.log('-1 ammo');
        



    }else if(faceToward == false){
        this.body.velocity.x = -4000;
        console.log('shooting left');
        console.log('this is facetoward'+faceToward);
        console.log('-1 ammo');

        

    }
    
    }
  }