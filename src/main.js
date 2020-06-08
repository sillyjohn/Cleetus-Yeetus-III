let config = {
    type: Phaser.CANVAS,
    width:  2560,
    height: 2560,
    scene:[level_2,Menu,level_3,level_1,level_4,Talking,end, win],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    
};

let game = new Phaser.Game(config);
//key reserve
let keyUP, keyLEFT,keyRIGHT,keyW,keyA,keyD,keyF,keyR,keySHIFT,keyN;
let cursors = null;
