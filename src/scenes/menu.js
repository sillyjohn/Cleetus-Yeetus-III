class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
       
        this.load.path = "./assets/";
    //tileset assets   
    this.load.image('menu','menu.png');
    this.load.image('playButton','play button.png')

    this.load.audio('winM','menutheme.wav')

    }

    create() {
        this.musicStop = false;
            let centerX = 1080/2;
            let centerY = 1920/2;
            
             
            this.menuM = this.sound.add('winM', {volume: 0.01});
            this.menuM.loop = true;
           
            this.menuM.play();
            
            //background
            this.menuBack = this.add.tileSprite(0,0,1920,1080,'menu').setOrigin(0,0);
          
            
        
    
            //creating a menu button to move to the play scene
            this.pButton = this.add.image(centerX+410,centerY-430,'playButton').setOrigin(0.5,0.5).setScale(0.55);
            this.pButton.setInteractive({
                useHandCursor: true,
            });
            // this.htpButton = this.add.image(centerX+215,centerY+50,'howButton').setOrigin(0.5,0.5);
            // this.htpButton.setInteractive({
            //     useHandCursor: true,
            // });
            // this.cButton = this.add.image(centerX+215,centerY+150,'creditButton').setOrigin(0.5,0.5);
            // this.cButton.setInteractive({
            //     useHandCursor: true,
            // });
            
            // start play scene when menu button is being pressed/clicked
             this.pButton.on('pointerdown', (pointer, gameObject, event) => {
                // this.menuM.destroy();
                this.menuM.stop();   
               this.musicStop = true;         
                this.scene.start("introScene");
                
               //this.scene.start("endScene");
            });
            // this.cButton.on('pointerdown', (pointer, gameObject, event) => {
            //     this.menuM.destroy();
            //     this.scene.start("creditScene");
                
            //   // this.scene.start("playScene");
            // });
            // this.htpButton.on('pointerdown', (pointer, gameObject, event) => {
            //     this.menuM.destroy();
            //     this.scene.start("howScene");
            //   // this.scene.start("playScene");
            // });
           
       
      }
      
    update() {
        if(this.musicStop == true){
            this.menuM.stop();        
        }
       
      }
      
   
}