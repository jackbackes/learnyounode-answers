'use strict';



function reduceArguments(consoleInput){
	let consoleArguments = consoleInput.slice(2);
	return consoleArguments.reduce(addArray);
};

function addArray(prev, curr, index){
	return Number(prev) + Number(curr);
}

console.log(reduceArguments(process.argv));
