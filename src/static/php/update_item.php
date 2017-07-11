<?php

include('function_get_items.php');

$newItems = file_get_contents('../items.json');
$newItems = json_decode($newItems);

$newItems[$_POST['id']]->description = $_POST['description'];

$newItems = json_encode($newItems);
file_put_contents('../items.json', $newItems);

getItemsFromJson();

?>