let config = {
    type: Phaser.CANVAS,
    width:  2560,
    height: 2560,
    scene:[ level_1,],
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
let keyUP, keyLEFT,keyRIGHT,keyW,keyA,keyD,keyF,keyR,keySHIFT;
let cursors = null;
