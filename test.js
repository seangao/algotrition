// function get_recipe_array(allergen_list){
// 	var recipe_array = [];
// 	var fs = require("fs");
// 	var files = fs.readdirSync("./recipes_for_testing");
// 	console.log(files)
// 	var i;
// 	for(i=0; i<files.length;i++){
// 		var text = fs.readFileSync("./recipes_for_testing/" + files[i]).toString('utf-8');
// 		var recipe = JSON.parse(text);
// 		recipe_array.push(recipe);
// 	}

// 	return recipe_array;
// }

var recipe_array = [];
var fs = require('fs');
var files = fs.readdirSync("./recipes_for_testing");

var i;
for(i=0; i<files.length;i++){
	var text = fs.readFileSync("./recipes_for_testing/" + files[i]).toString('utf-8');
	var recipe = JSON.parse(text);
	recipe_array.push(recipe);
}