var json = localStorage.getItem("config2") || '{"nivell":1,"dificulty":"easy","current_p":0}';
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
        this.cartes.sort(function () {
            return Math.random() - 0.5;
        });

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
                                this.score -= (5*this.lvl);
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }
                            if(this.dificulty === "hard"){
                                this.score -= (10*this.lvl);
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }
                            else{
                                this.score -= (15*this.lvl);
                                this.firstClick.enableBody(false,0,0,true,true);
                                card.enableBody(false, 0, 0, true, true);
                            }

                            //FIN DE JUEGO (LOSE)//
                            if (this.score <= 0){
								alert("Game Over");
                                //GUARDAR PARTIDA RANKING//
                                var partida = {
                                    user: this.username,
                                    points: options_data.current_p
                                }
                                var vec_partidas2 = [];
                                if(localStorage.score2){
									vec_partidas2 = JSON.parse(localStorage.score2);
									if(!Array.isArray(vec_partidas2)) vec_partidas2 = [];
								}
                                vec_partidas2.push(partida);
                                vec_partidas2.sort((a, b) => b.points - a.points);
                                vec_partidas2 = vec_partidas2.slice(0,5);
                                localStorage.score2 = JSON.stringify(vec_partidas2);
								loadpage("../");
							}
                        }

                        //PAREJA CORRECTA//
                        else{
                            this.correct++;
                            //FIN DE JUEGO (WIN)//
                            if (this.correct >= this.num_cards){
                                //SIGUIENTE NIVEL//
                                options_data.nivell = Number(options_data.nivell);
                                options_data.current_p = Number(options_data.current_p);
                                alert(options_data.dificulty +" Lvl" + options_data.nivell + " complete");
                                options_data.current_p += this.score;
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
                                console.log(options_data);
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