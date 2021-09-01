<?php
    ob_start();  // output buffering is turned on

    session_start(); // turn on sessions

    define("PRIV_PATH", dirname(__FILE__));
    define("PROJ_PATH", dirname(PRIV_PATH));
    define("PUB_PATH", PROJ_PATH . '/public');
    define("SHRD_PATH", PRIV_PATH . '/shared');
    
    // Assign the root URL to a PHP constant
    // * Use same document root as webserver
    // define("WWW_ROOT", '');
    // * Can dynamically find everything in URL up to "/public"

    if ($_SERVER['HTTP_HOST'] == 'localhost') // or any other host
    {
        // development
        $pub_end = strpos($_SERVER['SCRIPT_NAME'], '/public') + 7;
        $doc_root = substr($_SERVER['SCRIPT_NAME'], 0, $pub_end);
        define("HTDOCS_ROOT", $doc_root);
    }
    else
    {
        // Production HTDOCS Root
        define("HTDOCS_ROOT", '');
    }

    require_once('functions.php');
    require_once('database.php');
    require_once('query_functions.php');
    require_once('validation_functions.php');
    require_once('auth_functions.php');

    $db = db_connect();
    $errors = [];


?>