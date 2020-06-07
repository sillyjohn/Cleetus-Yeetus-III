class Talking extends Phaser.Scene {
    constructor() {
        super("talkingScene");

        // dialog constants
        this.DBOX_X = 0;			    // dialog box x-position
        this.DBOX_Y = 0;			    // dialog box y-position
        this.DBOX_FONT = 'gem_font';	// dialog box font key

        this.TEXT_X = 150;			// text w/in dialog box x-position
        this.TEXT_Y = 2000;			// text w/in dialog box y-position
        this.TEXT_SIZE = 40;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = 1200;	// max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = this.DBOX_X+1700;			// next text prompt x-position
        this.NEXT_Y = this.DBOX_Y+300;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.yeetus = null;
        this.minerva = null;
        this.neptune = null;
        this.jove = null;
        this.tweenDuration = 500;

        this.OFFSCREEN_X = -500;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000;
    }
    preload(){

                // load assets
                this.load.path = "./assets/";

                // load JSON (dialog)
                this.load.json('dialog', 'dialog.json');
        
                // load images
                this.load.image('dialogbox', 'textbox.png');
        
                // load bitmap font
                this.load.bitmapFont('gem_font', 'gem.png', 'gem.xml');
             
                // this.load.spritesheet('player_Idle','cleetus-frames-sheet.png',{frameWidth: 233, frameHeight: 280});



    }

    create() {
        
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('dialog');
        //console.log(this.dialog);
        
        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0).setScale(1);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.DBOX_X+150, this.DBOX_Y+120, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        // ready the character dialog images offscreen
        // this.yeetus = this.add.sprite(this.OFFSCREEN_X+400, this.DBOX_Y+8, 'player_Idle').setOrigin(0, 1).setScale(4);
        
        // input
        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.width = 1920;
        this.cameras.main.height = 1080;
        // camera setting, world bound
        this.cameras.main.setBounds(0, 0, 2560 , 2560);
        // camera seting, zoom level, < 1 is zoom out, >1 is zoom in
        this.cameras.main.setZoom(1);
        this.cameras.main.setViewport(0, 0, 1920,1080);
        

        // start dialog
        this.typeText();        
    }

    update() {
        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            // trigger dialog
            this.typeText();
        }
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true;
        this.dialogConvo = 0;
        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';
     

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            // I increment conversations here, but you could create logic to exit the dialog here
            console.log('End of Conversations');
            this.cameras.main.fadeIn(500)
            this.scene.start('level_1');
        }
        else {
        
            // build dialog (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0; 
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.dialogLines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });
            
            // set bounds on dialog
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

            // increment dialog line
            this.dialogLine++;

            
        }
    }
}
