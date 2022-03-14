/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181302810 LEE XIU HONG
Contacts #1 : 0129178805 1181302810@student.mmu.edu.my
********************************************/

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [StartScene, GameScene,EndScene],
    physics:{
        default:'arcade',
        arcade:{
            //debug : true,
            gravity:{y : 0},
            enableBody:true,
        }
    },

};

const game = new Phaser.Game(config);