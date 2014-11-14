<?php
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  // return only the headers and not the content
  // only allow CORS if we're doing a GET - i.e. no saving for now.
  //if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'GET') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, User, Password');
  //}
  exit;
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, User, Password');


require_once('ORM.php');
require_once('flight/Flight.php');

require_once('conf.php');
require_once('class/utils.class.php');





function getRequest(){
	return Flight::request()->data->getData();
}



function addLog($type, $value, $message, $tank){
	$log = ORM::for_table('tank_log')->create();
	$log->type = $type;
	$log->value = $value;
	$log->message = $message;
	$log->tank = $tank;
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
		
		if (isset($d['value']) && isset($d['register']) && is_numeric($d['value']) && !empty($d['value']) && is_string($d['register']) && !empty($d['register'])){
			
			
			$fuelLeft = $tank->value - $d['value'];
			
			if ($fuelLeft < 0) $fuelLeft = 0;
			$diff = $tank->value - $fuelLeft;
			$tank->value = $fuelLeft;

			if ($diff > 0){
				addLog(1, $diff, $d['register'], $id);
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

	addLog(0, $diff, 0, $id);
	
	$tank->save();

	Flight::json($tank->as_array());
});


Flight::route('GET /log/@id', function($id){
	$log = ORM::for_table('tank_log')
		->where('tank', $id)
		->select_many(array('timestamp','type','value','message'))
		->order_by_desc('timestamp')
		->limit(20)
		->find_array();

	$result = array();
	if (count($log) > 0){
		foreach ($log as $logItem) {
			$t = strtotime($logItem['timestamp'])*1000;
			$logItem['timestamp'] = $t;
			$result[] = $logItem;
		}
	}

	Flight::json($result);
});

Flight::start();