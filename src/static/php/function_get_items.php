<?php
function getItemsFromJson(){
	$items = file_get_contents('../items.json');
	echo $items;
}
?>