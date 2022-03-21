<?php

function escapeJsonString($value) { # list from www.json.org: (\b backspace, \f formfeed)
    $escapers = array("\\", "/", "\"", "\n", "\r", "\t", "\x08", "\x0c");
    $replacements = array("\\\\", "\\/", "\\\"", "\\n", "\\r", "\\t", "\\f", "\\b");
    $result = str_replace($escapers, $replacements, $value);
    return $result;
}


$cart = file_get_contents('../js-views/cart/cart-popup.html');



$json = '{
           "status": "ok",
           "text": "Для получения скидки осталось 1000грн",
           "htmlCode": "' . escapeJsonString($cart) . '"

}';



echo $json;

?>