<?php
include('function_get_items.php');

if ($_FILES !== []){
	$uploadfile = basename($_FILES['userFile']['name']);
  $temp = explode(".", $uploadfile);
  $extension = end($temp);
  $nameFile = $temp[0];
  $newfileNameToPersist = $nameFile . '-' . time().rand().".".$extension;
  $newfileNameToMove = '../imageItem/' . $newfileNameToPersist;
	list($width, $height, $type, $attr) = getimagesize($_FILES['userFile']['tmp_name']);
	
	if ($width == 320 && $height == 320 && move_uploaded_file($_FILES['userFile']['tmp_name'], $newfileNameToMove)) {
		// 		File is valid, and was successfully uploaded
			$items = file_get_contents('../items.json');
			$items = json_decode($items);
			$id = $_POST['id'];
			$items[$id]->url =  $newfileNameToPersist;
			$items = json_encode($items);
			file_put_contents('../items.json', $items);
			
			getItemsFromJson();
	}
	else {
		echo "uploadFailed";
	}
}
else {
	echo "uploadFailed";
}
?>