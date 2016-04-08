'use strict';

const fs = require('fs');

function fsPath(path, encoding) {
	return	fs.readFileSync(path, encoding);
};

function splitBuffer(buffer, delimiter) {
	return buffer.trim().split(delimiter);
};


function countBuffer(buffer){
	return buffer.length;
}

console.log(countBuffer(splitBuffer(fsPath(process.argv[2],'ascii'),'\n'))-1);
//console.log('\n');
//console.log(fsPath(process.argv[2],'ascii'));
//console.log('\n');
//console.log(fsPath(process.argv[2],'utf8'));
