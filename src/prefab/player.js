class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        
    }

update(){

    ///player movment w/o physics implementation 
    // to check collision with tile
  // player movement


// // scene switching / restart
// if(Phaser.Input.Keyboard.JustDown(this.reload)) {
//     this.scene.restart();
// }
// if(Phaser.Input.Keyboard.JustDown(this.swap)) {
//     this.scene.start("parallaxLayersScene");
// }
         
}
        






}