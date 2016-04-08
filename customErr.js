//Customer Errors with Colors!
//format:
//customErr(['this is blue! ','blue'],['this is red!','red'])
// => this is blue! this is red! (with appropriate colors, printed to stderr)
//by John Backes (github.com/thejohnbackes)

'use strict';

const ansi = require('ansi');
const cursor = ansi(process.stderr);
const util = require('util');

module.exports = customErr;

function customErr(){
	let format = null;
	let returnMessage = 'cursor';
	let messageArray = Array.prototype.slice.call(arguments);
	//console.error(messageArray);
	if(format === null) {
		messageArray.forEach(function(curr,index,arr){
			let thisMessage = curr[0];
			//console.error('inspecting error', util.inspect(thisMessage));
			if(typeof thisMessage !== 'string') { thisMessage = util.inspect(curr[0]) + '\n' };
			returnMessage += curr[1] ? '.' + curr[1] + '()' : '.fg.reset()';
			returnMessage += ".write(\`" + thisMessage + "\`)";
		})
	}
	returnMessage += ".reset().write('\\n')";
	//console.error(returnMessage);
	eval(returnMessage);
};


// module tests

/*
let obj = {
	stuff: 'and stuff',
	moreStuff: 'moreStuff',
	andSomeNumber: 23498234,
	andAnArray: [234, 'stuff']
};

let blueValue = ["This should be blue!\n", 'blue']

let redValue = ["This should be red!\n", 'red']

let noColor = ["This should be the regular color!"]

let testArray = [[[123, 123], [123,123]], 'yellow']

let testObject = [obj, 'green']

console.error('testing with one value');
customErr(blueValue, testArray, redValue, noColor, testObject);
*/
// => 
// The should be blue! // 'color = blue!'
// [123, 123][123,123] // 'color = yellow'
// This should be red! // 'color = red'
// This should be the regular color! // 'this should be the regular color!'
// {all the stuff in obj} // 'color = green'
