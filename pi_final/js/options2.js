var options = function(){
	
	var options_data2 = {
		nivell:1, dificulty:"easy", current_p:0
	};
	var load = function(){
		var json = localStorage.getItem("config2") || '{"nivell":1,"dificulty":"easy","current_p":0}';
		options_data2 = JSON.parse(json);
	};
	var save = function(){
		localStorage.setItem("config2", JSON.stringify(options_data2));
	};
	load();
	var vue_instance = new Vue({
		el: "#options_id2",
		data: {
			lvl: 1,
			dificulty: "easy",
			current_p: 0
		},
		created: function(){
			this.lvl = options_data2.nivell;
			this.dificulty = options_data2.dificulty;
			this.current_p = options_data2.current_p;
		},
		watch: {
			lvl: function(value){
				if (value < 1)
					this.lvl = 1;
				else if (value > 10)
					this.lvl = 10;
			}
		},
		methods: { 
			discard: function(){
				this.lvl = options_data2.nivell;
				this.dificulty = options_data2.dificulty;
				this.current_p = options_data2.current_p;
			},
			save: function(){
				options_data2.nivell = this.lvl;
				options_data2.dificulty = this.dificulty;
				options_data2.current_p = this.current_p;
				save();
				loadpage("../html/mode2.html");
			}
		}
	});
	return {
		// Aquí dins hi ha la part pública de l'objecte
		getOptionsString: function (){
			return JSON.stringify(options_data2);
		},
		getLVL: function (){
			return options_data2.nivell;
		},
		getDificulty: function (){
			return options_data2.dificulty;
		}
	}; 
}();

console.log(options.getOptionsString());
console.log(options.getLVL());
console.log(options.getDificulty());
console.log(options.options_data2);




