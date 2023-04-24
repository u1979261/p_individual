var load_obj = function(){
	var vue_instance = new Vue({
		el: "#score1",
		data: {
			saves: []
		},
		created: function(){
			let vec_partidas = [];
			if(localStorage.score){
				vec_partidas = JSON.parse(localStorage.score);
				if(!Array.isArray(vec_partidas)) vec_partidas = [];
			}
			this.saves = vec_partidas;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida = i;
				loadpage("../html/game.html");
			}
		}
	});
	return {}; 
}();
