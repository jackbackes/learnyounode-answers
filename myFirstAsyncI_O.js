'use strict';

const fs = require('fs');

function doAsync(params, callbacks){

	let thisCallback = callbacks.shift();
	thisCallback(params, callbacks);
}

function readAsyncPath(params, callbacks) {
	fs.readFile(params.path, params.encoding, function(err, data){
		let thisCallback = callbacks.shift();
		params.buffer = data;
		if(err) thisCallback(err);
		thisCallback(params, callbacks);	
	});
};

function splitBuffer(params, callbacks) {
	let thisCallback = callbacks.shift();
	params.buffer = params.buffer.toString().trim().split(params.delimiter),callbacks;
	thisCallback(params, callbacks);
};

function countBuffer(params, callbacks){
	let thisCallback = callbacks.shift();
	params.bufferCount = params.buffer.length-1
	thisCallback(params, callbacks);
};

function asyncDone(params, callbacks) {
	let thisCallback = callbacks.shift();
	thisCallback(params.bufferCount);
}


doAsync(
	{
		path: process.argv[2],
		encoding: 'ascii',
		delimiter: '\n',
		query: 'bufferCount'
	},
	[readAsyncPath, splitBuffer, countBuffer, asyncDone, console.log]
);


