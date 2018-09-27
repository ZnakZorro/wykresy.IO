const moddir      = '/usr/local/lib/node_modules/';
var execSync = require("child_process").execSync;
const express = require(moddir+'express');
const app = express();
const http = require('http').Server(app);
const io = require('../node_modules/socket.io')(http);
const port = process.env.PORT || 8282;
var licz=0;

app.use(express.static(__dirname + '/public'));

io.on('connection', onConnectionStart);

var ttt=null;

function slij(socket){
	licz++
	socket.broadcast.emit('drawing', los());
	console.timeEnd('a');
	console.time('a');
}

function onConnectionStart(socket){
	console.log('onConnectionStart')
	console.time('a');
	onConnection(socket);
	if (ttt===null) ttt=setInterval(function(){
		slij(socket);
		console.log(licz+" = ttt\n");
	},2000);

}

function onConnection(socket){
  socket.on('drawing', (data) => {
	  console.log(data);
	  socket.broadcast.emit('drawing', data)
  });
  
}
Buffer.prototype.pars = function() {return this.toString().trim();};

function los() {
//let command="grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage}'";

let cpu_command="grep 'cpu ' /proc/stat | awk '{usage=($2+$4)/($2+$4+$5)} END {print usage}'";
let cpu = execSync(cpu_command).pars();	
//console.log(cpu,cpu_command)


let tem_command="cat /sys/class/thermal/thermal_zone0/temp";
let tem = execSync(tem_command).pars();	

let TEM = Math.round(parseFloat(tem)/10)/100;
let CPU = Math.round(parseFloat(cpu*10000))/100;
console.log('los=',TEM,CPU)
	return { 
		time :(new Date()).getTime(),
		cpu: CPU,
		tem: TEM
	}
}




http.listen(port, () => console.log('listening on port ' + port));
