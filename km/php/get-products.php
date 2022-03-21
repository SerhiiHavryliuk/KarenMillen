<?php

function escapeJsonString($value) { # list from www.json.org: (\b backspace, \f formfeed)
    $escapers = array("\\", "/", "\"", "\n", "\r", "\t", "\x08", "\x0c");
    $replacements = array("\\\\", "\\/", "\\\"", "\\n", "\\r", "\\t", "\\f", "\\b");
    $result = str_replace($escapers, $replacements, $value);
    return $result;
}


$filters0 = file_get_contents('../js-views/filters/filters-0.html');
$filters1 = file_get_contents('../js-views/filters/filters-1.html');
$filters2 = file_get_contents('../js-views/filters/filters-2.html');
$filters3 = file_get_contents('../js-views/filters/filters-3.html');


$filters = ' [
    {"name": "filter-0",
     "content" :  "' . escapeJsonString($filters0) . '"
    },
    {"name": "filter-1",
     "content" :  "' . escapeJsonString($filters1) . '"
    },
    {"name": "filter-2",
     "content" :  "' . escapeJsonString($filters2) . '"
    },
    {"name": "filter-3",
     "content" :  "' . escapeJsonString($filters3) . '"
    }
]';



$json = '{
           "success": true,
           "htmlCode": "<div class=\"e-card-2\"><a href=\"#\" class=\"e-card-2__layout-inside\"><div class=\"e-card-2__layout-slider\"><ul class=\"bxslider ecard-2__slider-layout\"><li class=\"e-card-2__pic\"><img src=\"pic\/catalog\/item-1-default.jpg\" alt=\"RED playsuit\" data-src-product=\"pic\/catalog\/item-1-default.jpg\"\/><\/li><li class=\"e-card-2__pic\"><img src=\"pic\/catalog\/item-2-default.jpg\" alt=\"RED playsuit\" data-src-product=\"pic\/catalog\/item-2-default.jpg\"\/><\/li><\/ul><\/div><span class=\"e-card-2__label e-card-2__label_sale\">Sale<\/span><span class=\"e-card-2__title\">RED playsuit<\/span><\/a><span class=\"e-card-2__oldPrice\">180.00 грн<\/span><span class=\"e-card-2__price\">110.00 грн<\/span><\/div>",
           "filters": '.$filters.',
           "kol": "10 ТОВАРОВ",
           "page": "none"
}';



echo $json;

?>