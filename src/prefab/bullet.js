class bullet extends Phaser.GameObjects.Sprite{
    constructor(scene,faceToward){
  
      var x = scene.player.x;
      var y = scene.player.y;
  
      super(scene, x, y, "bullet");
  
      // 3.2 add to scene
      scene.add.existing(this);
  
      // 3.3
     // this.play("beam_anim");
      scene.physics.world.enableBody(this);
      this.setVel(faceToward);
    
 
  
      // 4.2 add the beam to the projectiles group
    //   scene.projectiles.add(this);
  
    }
 
  
    update(){
        
      // 3.4 Frustum culling
      if(this.x < 20  ){
        this.destroy();
      }
    }
    setVel(faceToward){

         // this.body.velocity.x = +4000;
     if(faceToward == true){
        this.body.velocity.x = +4000;
        console.log('shooting right');
        console.log('this is facetoward'+faceToward);


    }else{
        this.body.velocity.x = -4000;
        console.log('shooting left');
        console.log('this is facetoward'+faceToward);
    }
    }
  }