<?php
ORM::configure('mysql:host=localhost;dbname=tank');
ORM::configure('username', 'root');
ORM::configure('password', 'password');
ORM::configure('return_result_sets', true);

define('SALT','ASDFASDFASDFASDFASDF');
define('UI_SALT','a');