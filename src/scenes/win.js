class win extends Phaser.Scene {
    constructor(){
        super("winScene");
    }
    preload(){
      
        this.load.path = "./assets/";
    //tileset assets   
    this.load.image('winBG','gamefinish.png');
    this.load.image('menuButton','menuButton.png')
    this.load.image('restartButton','restartButton.png')


    }

    create() {
            let centerX = 1080/2;
            let centerY = 1980/2;
            
            // this.menuM = this.sound.add('bgm_1', {volume: 0.1});
           
            // this.menuM.play();
          
            //background
            this.winBack = this.add.tileSprite(0,0,1920,1080,'winBG').setOrigin(0,0);
          
            
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
            this.mButton = this.add.image(centerX+120,centerY-50,'menuButton').setOrigin(0.5,0.5).setScale(0.3);
            this.mButton.setInteractive({
                useHandCursor: true,
            });
            // this.htpButton = this.add.image(centerX+215,centerY+50,'howButton').setOrigin(0.5,0.5);
            // this.htpButton.setInteractive({
            //     useHandCursor: true,
            // });
            this.rButton = this.add.image(centerX-150,centerY-50,'restartButton').setOrigin(0.5,0.5).setScale(0.3);
            this.rButton.setInteractive({
                useHandCursor: true,
            });
            
            // start play scene when menu button is being pressed/clicked
             this.mButton.on('pointerdown', (pointer, gameObject, event) => {
                // this.menuM.destroy();           
                this.scene.start("menuScene");
               //this.scene.start("endScene");
            });
            this.rButton.on('pointerdown', (pointer, gameObject, event) => {
                
                this.scene.start("introScene");
            
            })
                
            //   // this.scene.start("playScene");
            // });
            // this.htpButton.on('pointerdown', (pointer, gameObject, event) => {
            //     this.menuM.destroy();
            //     this.scene.start("howScene");
            //   // this.scene.start("playScene");
            // });
           
        
        }
      
    
      
   
}