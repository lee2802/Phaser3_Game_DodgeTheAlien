/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181302810 LEE XIU HONG
Contacts #1 : 0129178805 1181302810@student.mmu.edu.my
********************************************/


class StartScene extends Phaser.Scene{
    constructor(){
        super({key:'StartScene'})
    }

    preload(){

       
        this.load.image('leftclickkey','image/leftclick.png');
        
    }

    create(){

        this.screen = this.add.image(150,450,'leftclickkey').setScale(0.4);
        info = this.add.text(300,450,'',{font:'35px Arial',fill:'#FFFFFF'});
        info.setText("Left click to change gravity");

        this.info2 = this.add.text(280,200,'',{font:'48px Arial',fill:'#FFFFFF'});
        this.info2.setText("Click to play");

        this.input.on('pointerdown',() =>{
            this.scene.stop('StartScene');
            this.scene.start('GameScene');
        });






    }
}

