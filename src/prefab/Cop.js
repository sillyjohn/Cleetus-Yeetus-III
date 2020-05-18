//cop prefab
class Cop extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      this.play('copjet');
      //add object to existing scene
      this.setScale(0.2);
      this.setOrigin(0,0);
      
      this.scene.physics.world.enable(this);
      this.body.allowGravity = false;
      this.body.setVelocityX(-200);
      this.body.setSize(this.width, this.height);
      this.body.setImmovable();
      scene.add.existing(this);
      scene.physics.add.existing(this);
    }
}

