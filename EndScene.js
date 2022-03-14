/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181302810 LEE XIU HONG
Contacts #1 : 0129178805 1181302810@student.mmu.edu.my
********************************************/

class EndScene extends Phaser.Scene {
    constructor() {
      super({key:'EndScene'})
    }
  
    preload() {
      this.load.image('end', 'image/gameover.png');
      this.load.audio('endgame','image/gameover.mp3');
    }
  
    create() {
      screen = this.add.image(280, 100, 'end').setOrigin(0);

       // Display stat
      this.info = this.add.text(200,400,'',{font:'48px Arial',fill:'#FFFFFF'});
      this.info2 = this.add.text(240,510,'',{font:'48px Arial',fill:'#FFFFFF'});
      this.info.setText("Enemy Dodged: " + enemyDodged);
      this.info2.setText("Click to restart");

      // To reset all configuration
     
      enemyDodged =0;
      temp = 0;
      enemyspeed = 400;

      //sound
      this.BGMSound = this.sound.add('endgame');
      var configS ={
          volume:0.05,
          loop:false,
      }
      
      this.BGMSound.play(configS);

      // Restart game on key down
      this.input.on('pointerdown', () => {
        this.BGMSound.pause();
        this.scene.stop('EndScene');
        var temp = this.scene.get('GameScene');
        temp.scene.restart('GameScene');
      });


    }
  }
  