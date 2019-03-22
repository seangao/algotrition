function json_to_obj(path){
	var fs = require("fs");
	var text = fs.readFileSync(path).toString('utf-8');
	return JSON.parse(text);
}

function get_list_recipe_ids(){
	var fs = require("fs");
	var text = fs.readFileSync("c:/cygwin64/home/Brian/test_curl/final/list_recipe_names_2").toString('utf-8');
	return text.split('\n');
}


var solver = require("./javascript-lp-solver");

var recipe_dir_path = 'c:/cygwin64/home/Brian/test_curl/final/post-processed/';
var recipe_id_list = get_list_recipe_ids();

var model = {
	"optimize": "total_time_seconds",
	"opType":"min",
	"constraints":{
		"energy":{"min":2000},
		"energy2":{"max":2500},
		"protein":{"min":100},
		"protein2":{"max":200},
		"breakfast":{"min":.9},
		"breakfast2":{"max":1.1},
		"lunch":{"min":.9},
		"lunch2":{"max":1.1},
		"dinner":{"min":.9},
		"dinner2":{"max":1.1}
	}
}

var variables = {};
var ints = {};

var i;
for(i=0; i<150; i++){
	obj = json_to_obj(recipe_dir_path + recipe_id_list[i*25])
	if (obj.energy != 'NaN' && obj.protein != 'NaN') {
		var tempRecObj = {};
		tempRecObj["total_time_seconds"] = obj.total_time_seconds;
		tempRecObj["energy"] = obj.energy;
		tempRecObj["energy2"] = obj.energy;
		tempRecObj["protein"] = obj.protein;
		tempRecObj["protein2"] = obj.protein;
		tempRecObj["breakfast"] = obj.breakfast;
		tempRecObj["breakfast2"] = obj.breakfast;
		tempRecObj["lunch"] = obj.lunch;
		tempRecObj["lunch2"] = obj.lunch;
		tempRecObj["dinner"] = obj.dinner;
		tempRecObj["dinner2"] = obj.dinner;
		variables[obj.yummly_id] = tempRecObj; 
		ints[obj.yummly_id] = 1;
	}

	//console.log(obj.yummly_id);
}

model["variables"] = variables;
model["ints"] = ints;

var results = solver.Solve(model);

console.log(results);

//console.log(model);




//console.log(obj);
