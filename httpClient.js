
'use strict'

const http = require('http');


// => get argument passed into program
const url = process.argv[2];
// => get request
http.get(url, function(res){
	// => data should come in at string, rather than as buffer
	res.setEncoding('utf8');
	// => when data event happens, do something.
	res.on('data', function(data){
		// => print each string to stdout.
		console.log(data);
	})
})
