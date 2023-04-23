var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
options_data = JSON.parse(json);

class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
        this.username = sessionStorage.getItem("username")
        this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
        this.dificulty;
		this.started=false;
    }
    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}

    create(){
        
        //CREACIÓN CARTAS ALEATORIAS CON OPTIONS//
        this.dificulty=options_data.dificulty;
		this.num_cards=options_data.cards;
        this.cartes = ['cb', 'co', 'sb', 'so', 'tb', 'to'];
        this.cartes.sort(function () {
            return Math.random() - 0.5;
        });
        this.cartes = this.cartes.slice(0, this.num_cards);
		this.cartes = this.cartes.concat(this.cartes);

        //CREACION TABLERO//
        this.cameras.main.setBackgroundColor("333");

        // ALINEAR CARTAS CENTRO//

        // 4 CARTAS
        if(this.num_cards == 2){ 
            for (let i = 0; i < this.cartes.length; i++){
                this.add.image(250+(100*i), 300, this.cartes[i]);
            }
        }

        // 6 CARTAS
        else if(this.num_cards == 3){
            for (let i = 0; i < this.cartes.length; i++){
                this.add.image(150+(100*i), 300, this.cartes[i]);
            }
        }

        // 8 CARTAS
        else{
            for (let i = 0; i < this.cartes.length; i++){
                this.add.image(50+(100*i), 300, this.cartes[i]);
            }
        }

        //CREACION GRUPO//
		this.cards = this.physics.add.staticGroup();

    }
}