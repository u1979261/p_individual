function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./game.html");
}
function start_game2(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./game2.html");
}

function exit (){
	loadpage("../index.html");
}

function exit_menu_mode (){
	loadpage("./menu_modes.html");
}

function mode1 (){
	loadpage("./mode1.html");
}
function mode2 (){
	loadpage("./mode2.html");
}

function ranking(){
	loadpage("./html/ranking.html");
}

function ranking1(){
	loadpage("./ranking1.html");
}

function ranking2(){
	loadpage("./ranking2.html");
}

function options(){
	loadpage("./html/options.html");
}

function go_game2(){
    loadpage ("./pi_2/index.html")
}

function go_game3(){
    loadpage ("./pi_3/index.html")
}

function go_game4(){
    loadpage ("./pi_final/index.html")
}

function go_menu_mode(){
    loadpage ("./html/menu_modes.html")
}

function go_mode1(){
    loadpage ("./mode1.html")
}

function go_mode2(){
    loadpage ("./mode2.html")
}