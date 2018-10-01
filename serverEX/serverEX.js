#!/usr/local/bin/node
"use strict";
const express  = require("/usr/local/lib/node_modules/express");
const execSync = require("child_process").execSync;
const fs       = require("fs");
const DS="/";
const app = express()
const port = 3009
app.use(express.static(__dirname + '/public'));


app.get('/list', (req, res) => res.send('list'))

app.get('/list/*', (req, res) => {
	console.log(req.params);
	let param = req.params[0];
	console.log(param);
	res.send('list/'+param)
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}! `)
});
