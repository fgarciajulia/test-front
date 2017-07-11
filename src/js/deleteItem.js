function deleteItem(id) {
  var error = function (data) {
    if (data.readyState == 0) {
      setLoading(false);
      withoutConnection();
    } else {
      showAlert('Error to get list, press F5');
    }
  };
  var success = function (data) {
    if(data == 'uploadFailed'){
      showAlert('Error to get list');
    } else {
      setLoading(false);
      renderList(JSON.parse(data));
    }
  };
  deleteItemToJson(id, success, error);
}

function deleteItemToJson(id, cbsuccess, cberror) {
  setLoading(true);
  $.ajax({
    type: 'POST',
    url: (isDebug
      ? '../src/static/php/delete_item.php'
      : 'php/delete_item.php'),
    dataType: 'text',
    data: {
      id: id
    },
    success: cbsuccess,
    fail: cberror
  });
}

$('body')
  .click(function (e) {
    if ($(e.target).hasClass('delete')) {
      var id = $(e.target).attr('id');
      var idNumber = id.split('-')[1];
      deleteItem(idNumber);
    }
  });