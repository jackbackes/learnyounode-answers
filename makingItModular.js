'use strict';

const findFilesByExt = require('./findFilesByExt.js');
const customErr = require('./customErr.js');


let arg1 = process.argv[2];
let arg2 = process.argv[3];

/*
let arg1 = '/var/folders/zp/6kbz3n0j6jb19ptk2kznrbdw0000gn/T/_learnyounode_35961';
let arg2 = 'md';
*/

findFilesByExt(arg1,arg2,function(err, data){
	if (err) {
		customErr(['makingItModular threw an error: '+ err,'red']);
		return;
	} else {
		for(let i=0; i<data.length; i++){
			console.log(data[i])}			
		}
});