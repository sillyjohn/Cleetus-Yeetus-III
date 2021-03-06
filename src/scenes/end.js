class end extends Phaser.Scene {
    constructor(){
        super("endScene");
    }
    preload(){
      
        this.load.path = "./assets/";
    //tileset assets   
    this.load.image('endBG','game over.png');
    this.load.image('menuButton','menuButton.png')
    this.load.image('restartButton','restartButton.png')
    this.load.audio('winM','gameovertheme.wav')

    }

    create() {
            let centerX = 1080/2;
            let centerY = 1980/2;
            
            this.menuM = this.sound.add('winM', {volume: 0.1}).setLoop(true);
           
            this.menuM.play();
          
            //background
            this.endBack = this.add.tileSprite(0,0,1920,1080,'endBG').setOrigin(0,0);
          
            
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
            this.mButton = this.add.image(centerX+420,centerY-110,'menuButton').setOrigin(0.5,0.5).setScale(0.5);
            this.mButton.setInteractive({
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
             this.mButton.on('pointerdown', (pointer, gameObject, event) => {
                // this.menuM.destroy();           
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
       
      }
      
   
}