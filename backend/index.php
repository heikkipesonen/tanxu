<?php
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // return only the headers and not the content
  // only allow CORS if we're doing a GET - i.e. no saving for now.
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, User, Password');
  }
  exit;
}


require_once('ORM.php');
require_once('flight/Flight.php');

require_once('conf.php');
require_once('class/utils.class.php');





function getRequest(){
	return Flight::request()->data->getData();
}


function getKey($key, $data){
	if (isset($data[$key])){
		return $data[$key];
	}

	return null;
}

function as_array($results){
	$r = array();

	foreach ($results as $result) {
		$r[] = $result->as_array();
	}

	return $r;
}

function existsInDatabase($table, $key, $value){
	return is_object( ORM::for_table($table)->where($key, $value)->find_one() );
}


function addLog($type, $value, $message){
	$log = ORM::for_table('tank_log')->create();
	$log->type = $type;
	$log->value = $value;
	$log->message = $message;
	$log->save();
}

Flight::route('/', function(){
	Flight::json(array('ok'=>true));
});

Flight::route('GET /tank', function(){
	$tanks = ORM::for_table('tank_tanks')->find_array();	
	Flight::json( $tanks );
});

Flight::route('GET /tank/@id', function($id){
	$tank = ORM::for_table('tank_tanks')->where('id',$id)->find_one();	
	Flight::json( $tank->as_array() );
});


Flight::route('POST /take/@id', function($id){
	
	$tank = ORM::for_table('tank_tanks')->where('id', $id)->find_one();
	$data = array('ok'=>false);
	
	$d = getRequest();

	if (is_object($tank)){
		
		if (is_numeric($d['value']) && !empty($d['value']) && is_string($d['register']) && !empty($d['register'])){
			
			
			$fuelLeft = $tank->value - $d['value'];
			
			if ($fuelLeft < 0) $fuelLeft = 0;
			$diff = $tank->value - $fuelLeft;
			$tank->value = $fuelLeft;

			if ($diff > 0){
				addLog(1, $diff, $d['register']);
				$tank->save();				
			}
		}
		
		$data = $tank->as_array();
	}

	Flight::json($data);
});

Flight::route('POST /fill/@id', function($id){
	$tank = ORM::for_table('tank_tanks')->where('id', $id)->find_one();
	
	$diff = $tank->max - $tank->value;
	$tank->value = $tank->max;

	addLog(0, $diff, 0);
	
	$tank->save();

	Flight::json($tank->as_array());
});


Flight::start();