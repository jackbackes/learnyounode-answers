'use strict';

const fs = require('fs');
const util = require('util');
const customErr = require('./customErr.js')

//customErr([['This should be red', 'red'],'\n',['This should be blue','blue']]);

function readDir(callbacks) {
	//console.log(this);
	customErr(['readDir: \n', 'green'],[this, 'white']);
	let that = this;
	try{
		fs.readdir(this.dirName, function(err, list) {
			if(err) throw err;
			//if(err) that.callback(err, null);
			that.fileList = list;
			//console.log(that);
			doAsync(that, callbacks);
		});
	}
	catch(err) {
		that.err = err;
		customErr(["Error on readDir: "+err+"\n",'red'],[that, 'white']);
		doAsync(that, callbacks);
	}

};

function filterNames(callbacks) {
	let that = this;
	customErr(['running filterNames! + \n', 'green'],[that, 'white']);
	try{
		let extString = this.extString;
		that.filteredFiles = this.fileList.filter(function(fileFromList, index, arr) {
			//return fileFromList.slice(fileFromList.lastIndexOf('.')) == extString;
			return /\.md$/.test(fileFromList);
			// => true if the file from List matches extString.
		});
		customErr(["here's the new list of filtered files: \n", 'green' ],[that.filteredFiles, 'white']);
		doAsync(that, callbacks);	
	}
	catch(err) {
		that.err = err;
		customErr(["Error on filterNames: "+err+"\n",'red'],[that, 'white']);
		doAsync(that, callbacks);
	};

};

function printLines(callbacks) {
	console.error(this, 'printLines: 33');
	let that = this;
	that.returnArray = [];
	try{
		this.filteredFiles.forEach(function(curr, index, arr){
			that.returnArray.push(curr);
		});
		customErr([that.returnArray, 'yellow']);
		doAsync(that, callbacks);
	}
	catch(err) {
		that.err = err;
		customErr(["Error on filterNames: "+err+"\n",'red'],[that, 'white']);
		doAsync(that, callbacks);	
	}
}

function doDone(callbacks){
	customErr([this.returnArray, 'yellow']);
	this.callback(null, this.returnArray);
}

function doAsync(params, callbacks){
	//console.log(params, callbacks);
	let doCallbacks = params.counter === 0 ? params.origCallbacks : callbacks;
	params.counter++;
	customErr([params.counter + ' - doAsync - callbacks: \n', 'green'], [doCallbacks, 'white']);
	customErr([params.counter + ' - doAsync - params argument: \n', 'green'], [params, 'white']);
	try{
		if (params.err) throw params.err; 
		//if(callbacks === []) params.callback(params[params.query]);
		//console.log(45, typeof callbacks, callbacks, callbacks.length);
		let thisCallback = doCallbacks.shift();
		params.onErr([params.counter,'green'], [' doAsync ', 'green'], ['thisCallback ' + thisCallback.name + ' is of type ' + typeof thisCallback, 'red'])
		//console.log(callbacks, typeof thisCallback, thisCallback, params);
		if(typeof thisCallback === 'function'){
			customErr([params.counter + ' - doAsync calling: ' + thisCallback.name, 'green'])
			try{
				thisCallback.call(params, doCallbacks);
			}
			catch(err) {
				console.trace(err);
				customErr([params.counter + ' - doAsync error: \n', 'red'], [err]);
				params.onErr(err, null);
			};
		} else {
			console.error(params.counter + ' - doAsync Done. Calling callback.', 'noError')
			params.callback.call(null, params[params.query]);
		}
		//let thisCallback = typeof callbacks === 'function' ? callbacks : callbacks.shift();
		//console.log(47, thisCallback, callbacks);
		//thisCallback.apply(params, callbacks);
		//console.log(nextParams, callbacks);

	} catch(err){
		customErr(['uh oh, error on doAsync: ' + err, 'red']);
		params.counter = 0;
		params.callback(err, null)
	}
}




function asyncError(err) {
	return err;
};



/*	let messages = arguments[0];
	let returnMessage = "";
	if(arguments.length === 1) {
		console.error(messages);
	} else if (arguments.length !==3) {
		console.error('customErr takes 1 or 3 arguments');
	} else {
		let format = arguments[1];
		let color = arguments[2];
		if(color === null) console.error(messages, format);
		if(format === null) {
			for(let i = 0; i<messages.length; i++){
				returnMessage += util.inspect(messages[i], {color: color});
			}
		}
	}


	if(Array.isArray(messages)) {
		let color = arguments[1] ? arguments[1] : null;
	} else {
		let format = arguments[1] ? arguments[1] : null;
	};
	if(color){
		for(let i = 0; i<messages.length; i++){

		}
	} else if(format){
		console.error(messages, format);
	} else {

	}
	*/


module.exports = function findFilesByExt(dirName, extFilter, callback) {
	const asyncCallbacks = [readDir, filterNames, printLines, doDone];
	let callbackList = asyncCallbacks;
	const doOptions = {
				dirName: dirName,
				extString: extFilter,
				onDone: callback,
				callback: callback,
				onErr: customErr,
				query: 'filteredList',
				counter: 0,
				origCallbacks: asyncCallbacks
			};
	doAsync(doOptions, callbackList);
};
