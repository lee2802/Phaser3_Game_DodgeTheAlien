/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2021/22
ID and Name #1 : 1181302810 LEE XIU HONG
Contacts #1 : 0129178805 1181302810@student.mmu.edu.my
********************************************/


//enemy
let enemyDodged = 0;
let info;

let timedEvent;

// enemy speed
var enemyspeed = 400;

const gameState = {
   
};

var temp =0;
var temptrigger = false;

class GameScene extends Phaser.Scene{
    constructor(){
        super({key:'GameScene'});
        this.enemies;
      
    }


    preload(){

        this.load.spritesheet('ninja','image/codey_sprite.png',{
            frameWidth:72, frameHeight:90,
        });


        this.load.image('tileset','image/Sunset/Sunset_gradient.png');
  

        this.load.tilemapTiledJSON('tilemap','map.json');
       

        this.load.image('enemy','image/space-baddie.png');
        //this.load.image('bonus','image/mushroom2.png');

        this.load.audio('bgm','image/BGM.mp3');

    }

    create(){

        gameState.active = true;
        gameState.cursors = this.input.keyboard.createCursorKeys();
        
        //Create the map
        const Map = this.make.tilemap({key:'tilemap'});
        const tileSets  = Map.addTilesetImage('tiles','tileset');
        Map.createStaticLayer('Sky',tileSets);
        const ground = Map.createStaticLayer('Ground',tileSets);

        //create player
        gameState.player = this.physics.add.sprite(150,445,'ninja').setScale(.8);
        gameState.player.setCollideWorldBounds(true);
        

        //create enemy
        timedEvent = this.time.addEvent({delay:Phaser.Math.Between(1000,3000),callback:this.onEvent,callbackScope:this,loop:true});

        //Animations

        this.anims.create({
            key: 'run',
            frames:this.anims.generateFrameNumbers('ninja', {start:0,end:3}),
            frameRate: 5,
            repeat:-1,
        });

  
        // Collision
        ground.setCollisionByExclusion(-1,true);
        this.physics.add.collider(gameState.player,ground);
        
 

        // Display stat
        info = this.add.text(10,30,'',{font:'48px Arial',fill:'#000000'});
        //info2 = this.add.text(10,510,'',{font:'48px Arial',fill:'#000000'});


        //BGM
        this.BGMSound = this.sound.add('bgm');
        var configS ={
            volume:0.05,
            loop:true,
        }
        
        this.BGMSound.play(configS);


        // Mouse trigger to manipulate gravity
        this.input.on('pointerdown',this.OneventChange,this);


    }

    // Events on clicking
    OneventChange(){

        if(!temptrigger){
            console.log('triggered1');
            console.log(temptrigger);
            gameState.player.setGravity(0,-5000);
            gameState.player.flipY = true; 
            temptrigger = true;
        }
        else if(temptrigger){
            console.log('triggered2');
            gameState.player.setGravity(0,5000);
            gameState.player.flipY = false; 
            temptrigger = false;
        }


    }

    update(){
        
        
        temp++;
        if(gameState.active){


            gameState.player.anims.play('run', true);

 
            info.setText("Enemy Dodged: " + enemyDodged);

            // Manipulate enemy speed
            if(temp >= 500){
                enemyspeed = 600;
            }
            if(temp >= 1000)
            {
                enemyspeed = 900;
            }
            if(temp >= 1500){
                enemyspeed = 1200;
            }
            if(temp >= 2000){
                enemyspeed = 1500;
            }



        }


    }


    endGame(){

        console.log("hit");
        this.BGMSound.pause();
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
    }

    //spawn enemies
    onEvent(){
        this.enemies = new MultipleEnemies(this);
        

        var random = Phaser.Math.Between(150,450);
        this.enemies.spawning(800,random);
        this.physics.add.overlap(gameState.player,this.enemies,() => this.endGame());
        
       

        timedEvent.reset({delay:Phaser.Math.Between(500,800),callback:this.onEvent,callbackScope:this,repeat:1});
    
    }

}

// enemy classes

class createEnemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'enemy');
        
    }
    
    spawn(x,y){
        
        this.body.reset(x,y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(-enemyspeed);

    }

    preUpdate(time,delta){
        super.preUpdate(time,delta);
        
        if(this.x <=-32){
            //this.setActive(false);
            //this.setVisible(false);
            this.destroy();
            //console.log("Dead");
            enemyDodged ++;
        }


    }


}

class MultipleEnemies extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity:10,
            key:'enemy',
            active:false,
            visible:false,
            setScale:{x:3,y:3},
            
            classType:createEnemy
        });


    }

    
    spawning(x,y){
        let enemy = this.getFirstDead(false);

        if(enemy){
            enemy.spawn(x,y);
        }
    }
}


