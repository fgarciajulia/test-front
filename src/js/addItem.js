function addItem() {
  var error = function (data) {
    if (data.readyState == 0) {
      setLoading(false);
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
      submitShow();
      $('.image-thumbnail').html('');
      $('.image-thumbnail').append(
        '<label for="inputImg">'+
        ' <img class="img-responsive" src="image/thumbnail.png">'+
        '</label>' +
        '<i class="fa fa-pencil" aria-hidden="true"></i>'
      );
      $('#thumbnailImg').hide();
      $('#submit').hide();
      $('#description').val('');
      $('#inputImg').val('');
      changeListenerNewImageItem();
    }
  };
  addItemToJson(success, error);
}
function submitShow() {
  var fileData = $('#inputImg').prop('files')[0];
  var description = $('#description').val();
  if (fileData !== undefined && !description == '') {
    $('#submit').show();
  }else{
    $('#submit').hide();
  }
}

function addItemToJson(cbsuccess, cberror) {
  var fileData = $('#inputImg').prop('files')[0];
  var description = $('#description').val();
  if (fileData !== undefined && !description == '') {
    var form_data = new FormData();
    form_data.append('userFile', fileData);
    form_data.append('description', description);
    setLoading(true);

    $.ajax({
      type: 'POST',
      url: (isDebug ? '../src/static/php/add_item.php' : 'php/add_item.php'),
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      success: cbsuccess,
      fail: cberror
    });
  }
}

$('#submit').click(addItem);
$('#description').keyup(submitShow);
