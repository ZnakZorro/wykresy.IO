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
let intervalTIME = 15000;
let _socket = null;

var timeStart=(new Date()).getTime();
var timeStop =(new Date()).getTime();
var timeDelta =0;


function slij(socket){
	timeStop  = (new Date()).getTime();
	timeDelta = timeStop-timeStart;
	timeStart =(new Date()).getTime();
	licz++
	console.log('intervalTIME=',intervalTIME,' timeDelta='+timeDelta)
	socket.broadcast.emit('drawing', los());
	console.timeEnd('a');
	console.time('a');
	
	//if (ttt===null) 
		ttt=setTimeout(function(){slij(socket);},intervalTIME);
}


var czyWyslac = true;

function onConnectionStart(socket){
	

	console.log('onConnectionStart',czyWyslac)
	console.time('a');
	_socket = socket;
	onConnection(socket);
	if (czyWyslac) slij(socket);
	czyWyslac = false;
	//if (ttt===null) ttt=setInterval(function(){slij(socket);},intervalTIME);

}

function onConnection(socket){
	socket.on('config', (data) => {
		console.log('config=',data,data.time);
		intervalTIME = parseInt(data.time);
	})
	socket.on('drawing', (data) => {
	  //console.log(data);
	  //socket.broadcast.emit('drawing', data)
	  
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

let wif_command="cat /proc/net/wireless | grep wlan0 | awk '{print $4}'";
let wif = execSync(wif_command).pars();	






let TEM = Math.round(parseFloat(tem)/10)/100;
let CPU = Math.round(parseFloat(cpu*10000))/100;
let WIF = Math.round(parseFloat(wif));
//console.log('los=',TEM,CPU)
	return { 
		time :(new Date()).getTime(),
		cpu: CPU,
		tem: TEM,
		wif: WIF,
		tim: intervalTIME,
		tre: timeDelta
	}
}




app.post('/time/*', function(req, res) {
	//console.log('#7=',(req));	
	var param = req.params;
	intervalTIME = parseInt(param[0]);
	console.log('#intervalTIME=',intervalTIME);	
	//if (ttt) clearTimeout(ttt);
	//ttt=setInterval(function(){slij(_socket);},intervalTIME);
	/*
	console.log('#80=',param[0]);	
	console.log('#80=',parseInt(param[0]));	
	//console.log('#78=',JSON.stringify(req.body));	
	//console.log('#242=',JSON.stringify(param));	
	//console.log('#77=',JSON.stringify(req.query))
	console.log('#78=',req.query)
	
	//var time = req.query('time');
	//console.log(time)
	*/
	res.send({time:intervalTIME});
});




http.listen(port, () => console.log('listening on port ' + port));
