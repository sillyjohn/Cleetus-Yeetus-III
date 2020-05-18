let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 600,
    scene:[ world_1 ],
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
let keyUP, keyLEFT,keyRIGHT,keyW,keyA,keyD,keyF;
