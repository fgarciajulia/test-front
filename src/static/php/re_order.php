<?php
include('function_get_items.php');

$oldItems = file_get_contents('../items.json');
$oldItems = json_decode($oldItems);
$newOrderId = json_decode($_POST['newOrderId']);

for ($i=0; $i < count($oldItems) ; $i++) {
	$newItems[$i] = $oldItems[$newOrderId[$i]];
}

$newItems = json_encode($newItems);
file_put_contents('../items.json', $newItems);


getItemsFromJson();

?>