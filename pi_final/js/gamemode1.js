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

        

        //TIEMPO CARTAS GIRADAS//

        var WaitTime = 0;
        if(this.dificulty === "easy"){
            WaitTime = 8000;
        }
        else if(this.dificulty === "normal"){
            WaitTime=4000;
        }
        else{
            WaitTime=1500;
        }
        setTimeout(() => {

            // 4 CARTAS
            if(this.num_cards == 2){ 
                for (let i = 0; i < this.cartes.length; i++){
                    this.cards.create(250+(100*i), 300, 'back');
                }
            }

            // 6 CARTAS
            else if(this.num_cards == 3){
                for (let i = 0; i < this.cartes.length; i++){
                    this.cards.create(150+(100*i), 300, 'back');
                }
            }

            // 8 CARTAS
            else{
                for (let i = 0; i < this.cartes.length; i++){
                    this.cards.create(50+(100*i), 300, 'back');
                }
            } 
            
            //GAMEPLAY//

            let i = 0;
            this.cards.children.iterate((card)=>{
                card.card_id = this.cartes[i];
                i++;
                card.setInteractive();
                card.on('pointerup', ()=>{
                    card.disableBody(true,true);
                    if (this.firstClick){

                        //PAREJA INCORRECTA (-Puntos)//
                        if (this.firstClick.card_id !== card.card_id){

                            if(this.dificulty === "easy"){
                                this.score -= 30
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }
                            if(this.dificulty === "hard"){
                                this.score -= 15
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }
                            else{
                                this.score -= 5
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }

                            //FIN DE JUEGO (LOSE)//
                            if (this.score <= 0){
								alert("Game Over");
								loadpage("../");
							}
                        }

                        //PAREJA CORRECTA//
                        else{
                            this.correct++;
                            //FIN DE JUEGO (WIN)//
                            if (this.correct >= this.num_cards){
                                alert("You Win with " + this.score + " points.");

                                //GUARDAR PARTIDA RANKING//
                                var partida = {
                                    user: this.username,
                                    points: this.score
                                }
                                var vec_partidas = [];
                                if(localStorage.puntuacion){
									vec_partidas = JSON.parse(localStorage.puntuacion);
									if(!Array.isArray(vec_partidas)) vec_partidas = [];
								}
                                vec_partidas.push(partida);
                                vec_partidas.sort((a, b) => b.score - a.score);
                                vec_partidas = vec_partidas.slice(0,5);
                                localStorage.score = JSON.stringify(vec_partidas);
                                loadpage("../");
                            }
                        }
                        this.firstClick = null;
                    }
                    else{
                        this.firstClick = card;
                    }
                },card);
            });
        }, WaitTime);
    }
}