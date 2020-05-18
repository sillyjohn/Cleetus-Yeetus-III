class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
      


    }

    create() {
            let centerX = game.config.width/2;
            let centerY = game.config.height/2;
            
            this.menuM = this.sound.add('bgm_1', {volume: 0.1});
           
            this.menuM.play();
          
            //background
            this.menuBack = this.add.tileSprite(0,0,900,600,'menuBackground').setOrigin(0,0);
          
            
            //place holder title
            let menuConfig= {
                frontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor:'#1F46EB',
                colo:'#FFFFFF',
                align:'right',
                padding:{
                    top:5,
                    bottom:5,
                },
                fixedWidth:0
            }
    
            //creating a menu button to move to the play scene
            this.pButton = this.add.image(centerX+215,centerY-50,'playButton').setOrigin(0.5,0.5);
            this.pButton.setInteractive({
                useHandCursor: true,
            });
            this.htpButton = this.add.image(centerX+215,centerY+50,'howButton').setOrigin(0.5,0.5);
            this.htpButton.setInteractive({
                useHandCursor: true,
            });
            this.cButton = this.add.image(centerX+215,centerY+150,'creditButton').setOrigin(0.5,0.5);
            this.cButton.setInteractive({
                useHandCursor: true,
            });
            
            // start play scene when menu button is being pressed/clicked
             this.pButton.on('pointerdown', (pointer, gameObject, event) => {
                this.menuM.destroy();           
                this.scene.start("world_1");
               //this.scene.start("endScene");
            });
            this.cButton.on('pointerdown', (pointer, gameObject, event) => {
                this.menuM.destroy();
                this.scene.start("creditScene");
                
              // this.scene.start("playScene");
            });
            this.htpButton.on('pointerdown', (pointer, gameObject, event) => {
                this.menuM.destroy();
                this.scene.start("howScene");
              // this.scene.start("playScene");
            });
           
       
      }
      
    update() {
       
      }
      
   
}