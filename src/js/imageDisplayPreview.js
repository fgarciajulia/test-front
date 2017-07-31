function displayPreview(file) {
  var _URL = window.URL || window.webkitURL;
  var img = new Image();

  img.onload = function () {
    var width = this.width,
      height = this.height,
      imgsrc = this.src;
    renderDisplayPreview(img, width, height, imgsrc);
  };
  img.src = _URL.createObjectURL(file);
}

function renderDisplayPreview(img, width, height, imgsrc) {
  if (width == 320 && height == 320) {
    submitShow();
    $('.image-thumbnail').html('');
    $('.image-thumbnail').append(
      '<label for="inputImg">'+
      ' <img class="img-responsive" src="' + imgsrc + '">'+
      '</label>' +
      '<i class="fa fa-pencil" aria-hidden="true"></i>'
    );
    $('#thumbnailImg').hide();
    changeListenerNewImageItem();
  } else {
    showAlert(
      'Your picture has ' + width + 'px for ' + height +'px. ' +
      'Change the picture for one that has size 320px for 320px, try with the pictures of this page: '+
      '<a target="_blank" href="http://lorempixel.com/320/320/">http://lorempixel.com/320/320/</a>.'+
      '<p class="btn btn-success add-item">Ok</p>'
    );
    $('#submit').hide();
    $('.image-thumbnail').html('');
    $('.image-thumbnail').append(
      '<label for="inputImg">'+
      ' <img class="img-responsive" src="image/thumbnail.png">'+
      '</label>' +
      '<i class="fa fa-pencil" aria-hidden="true"></i>'
    );
    $('#submit').hide();
    $('#inputImg').val('');
    changeListenerNewImageItem();
  }
}
function changeListenerNewImageItem(){
  $('#inputImg').change(function () {
    if (this.files.length != 0) {
      var file = this.files[0];
      displayPreview(file);
    }
  });
}

$(document).ready(changeListenerNewImageItem);