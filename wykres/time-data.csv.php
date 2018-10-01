<?php
header('Access-Control-Allow-Origin: *'); 
echo "Czas,Temp,Dew,Humi,Bar,ADC".PHP_EOL;


function los($n,$m){
	return round(rand($n,$m)/10)*10;
}

for($i=-300; $i<0; $i++){
	$t = (time()) + (60 * $i); // sek
	$t *=1000; // milsek
	echo $t.",".los(-20,40).",".los(-20,20).",".los(50,100).",".los(950,1050).",".los(0,1000).PHP_EOL;
}

	$t = (time()) + (60 * $i); // sek
	$t *=1000; // milsek
	echo $t.",0,0,0,0,0".PHP_EOL;


?>