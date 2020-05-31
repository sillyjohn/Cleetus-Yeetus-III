//cop prefab
class Spike extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'spike');
      //add object to existing scene
      this.setScale(1);
      this.setOrigin(0,0);
      
      this.scene.physics.world.enable(this);
      this.body.allowGravity = false;
      this.body.setSize(this.width, this.height);
      this.body.setImmovable();
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
    
  setPos(xPos, yPos) {
    this.x = xPos;
    this.y = yPos;
  }
}

