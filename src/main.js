let config = {
    type: Phaser.CANVAS,
    width:  2560,
    height: 2560,
    scene:[Menu ,win,level_5,level_1,level_2,level_3,level_4,Talking,end],
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
