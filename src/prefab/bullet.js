class bullet extends Phaser.GameObjects.Sprite{
    constructor(scene,faceToward,faceTop){
  
      var x = scene.player.x;
      var y = scene.player.y;
  
      super(scene, x, y, "bullet");
  
      scene.add.existing(this);
      scene.physics.world.enableBody(this);
      this.setVel(faceToward,faceTop);
      scene.projectiles.add(this);
    }
 
  
    update(){
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
    }else if(faceToward == true){
        this.body.velocity.x = +4000;
        console.log('shooting right');
        console.log('this is facetoward'+faceToward);


    }else if(faceToward == false){
        this.body.velocity.x = -4000;
        console.log('shooting left');
        console.log('this is facetoward'+faceToward);
    }
    
    }
  }