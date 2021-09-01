<?php
require_once('../private/initialize.php');
$errors = array();

//if (isset($_SERVER['HTTP_ORIGIN'])) {
//    switch($_SERVER['HTTP_ORIGIN']){
//        case 'https://ahc-spa.ulcampaign.com/':
//            header('Access-Control-Allow-Origin: https://ahc-spa.ulcampaign.com/');
//            break;
//        default:
//        	$errors[] = 'Invalid Origin Server';
//        	die();
//    }
//
//    header('Access-Control-Allow-Credentials: true');
//    header('Access-Control-Max-Age: 86400');    // cache for 1 day
//} else {
//	$errors[] = 'Invalid Origin Server';
//    // exit();
//    die();A
//}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit();
    // die();
}

//if(!isset($_POST['client']) || !is_string($_POST['client']) || $_POST['client'] != 'null'){ $errors[] = 'Client is missing or has an invalid value'; }
//if(!isset($_POST['client']) || $_POST['client'] != 'null'){ $errors[] = 'Client is missing or has an invalid value'; }
//if(!isset($_POST['collection']) || !is_string($_POST['collection']) ||  $_POST['collection'] = 'null'){ $errors[] = 'Collection is missing or has an invalid value'; }
//if(!isset($_POST['collection']) ||  $_POST['collection'] = 'null'){ $errors[] = 'Collection is missing or has an invalid value'; }
//if(!isset($_POST['itemname']) || !is_string($_POST['itemname']) ||  $_POST['itemname'] = 'null'){ $errors[] = 'Itemname is missing or has an invalid value'; }
//if(!isset($_POST['itemname']) || $_POST['itemname'] = 'null'){ $errors[] = 'Itemname is missing or has an invalid value'; }

if(count($errors) == 0){
    insert_user($_POST);
} else {
    die();
}
