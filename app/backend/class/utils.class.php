<?php

class Util{
	
	public static function crypt($string){
		return md5(SALT.$string.SALT);
	}

	public static function generateKey($timestamp){
		return md5(UI_SALT.$timestamp.UI_SALT);
	}

    public static function checkArrayKeysExists($keys, $in_array){
        $result = true;

        foreach ($keys as $key){

            if (!isset( $in_array[$key]) ){
                $result = false;
            }
        }


        return $result;
    }

    public static function token($length){
        //allowed characters
        $chars = "abcdefghijkmnpqrstuvxyz23456789";
        $str = "";
        //add a random char until the length is filled
        while (strlen($str) < $length){
          $str .= $chars[rand(0, strlen($chars) - 1)];
        }

        return $str;
    }
}