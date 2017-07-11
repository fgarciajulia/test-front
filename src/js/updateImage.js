function updateImage(id, file) {
  var error = function (data) {
    if (data.readyState == 0) {
      withoutConnection();
    } else {
      showAlert('Error to get list');
    }
  };
  var success = function (data) {
    setLoading(false);
    if(data == 'uploadFailed'){
      showAlert('Error to get list');
    } else {
      renderList(JSON.parse(data));
    }
  };
  editeImageItemToJson(id, file, success, error);
}

function editeImageItemToJson(id, file, cbsuccess, cberror) {
  var form_data = new FormData();
  form_data.append('userFile', file);
  form_data.append('id', id);
  setLoading(true);

  $.ajax({
    type: 'POST',
    url: (isDebug
      ? '../src/static/php/update_image_item.php'
      : 'php/update_image_item.php'),
    dataType: 'text',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    success: cbsuccess,
    fail: cberror
  });
}
function changeListenersFileInput(){
  $('.fileInput').each(function () {
    $(this).change(function () {
      if (this.files.length != 0) {
        var _URL = window.URL || window.webkitURL;
        var file = this.files[0];
        var id = $(this).attr('id');
        var idNumber = id.split('-')[1];
        var img = new Image();

        img.onload = function () {
          var width = this.width,
            height = this.height;
          if (width == 320 && height == 320) {
            updateImage(idNumber, file);
          }else{
            showAlert(
              'Your picture has ' + width + 'px for ' + height +'px. ' +
              'Change the picture for one that has size 320px for 320px, try with the pictures of this page: '+
              '<a target="_blank" href="http://lorempixel.com/320/320/">http://lorempixel.com/320/320/</a>.'+
              '<p class="btn btn-success add-item">Ok</p>'
            );
          }
        };
        img.src = _URL.createObjectURL(file);
      }
    });
  });
}