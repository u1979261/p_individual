var json = localStorage.getItem("config2") || '{"nivell":1,"dificulty":"easy"}';
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
        this.num_cards = 0;
        if(this.dificulty === "easy"){
            this.num_cards = 2;
        }
        else if(this.dificulty === "normal"){
            this.num_cards = 3;
        }
        else{
            this.num_cards = 4;
        }

		this.lvl = options_data.nivell;
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

        var WaitTime = (10000/this.lvl);

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

            var damage=(10*this.lvl);

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
                                this.score -= damage
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }
                            if(this.dificulty === "hard"){
                                this.score -= damage
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }
                            else{
                                this.score -=damage
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
                                if(localStorage.score){
									vec_partidas = JSON.parse(localStorage.score);
									if(!Array.isArray(vec_partidas)) vec_partidas = [];
								}
                                vec_partidas.push(partida);
                                vec_partidas.sort((a, b) => b.points - a.points);
                                vec_partidas = vec_partidas.slice(0,5);
                                localStorage.score = JSON.stringify(vec_partidas);

                                //SIGUIENTE NIVEL//
                                options_data.nivell += 1;
                                if(options_data.nivell>10 && options_data.dificulty == "easy"){
                                    options_data.nivell = 1;
                                    options_data.dificulty = "normal"
                                }
                                else if(options_data.nivell>10 && options_data.dificulty == "normal"){
                                    options_data.nivell = 1;
                                    options_data.dificulty = "hard"
                                }
                                else if(options_data.nivell>10 && options_data.dificulty == "hard"){
                                    options_data.nivell = 10;
                                }
                                localStorage.config2 = JSON.stringify(options_data);
                                loadpage("./game2.html");
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