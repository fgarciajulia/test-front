<?php

include('function_get_items.php');

$items = file_get_contents('../items.json');
$items = json_decode($items);

array_splice($items, $_POST['id'], 1);

$items = json_encode($items);
file_put_contents('../items.json', $items);

getItemsFromJson();
?>