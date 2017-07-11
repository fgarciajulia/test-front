function resetOrder(){
  var list = $('#list .item');
  var oldList = [];
  for (var i = 0; i <list.length; i++) {
    oldList.push($('#item-' + i));
  }
  $('#list').html('');
  $('#list').append(oldList);  
  changeListenersFileInput();
}

$('#list').sortable({
  axis: 'y',
  update: function (event, ui) {
    var order = $(this).sortable('toArray');
    var newOrderId = [];
    for (var i = 0; i < order.length; i++) {
      var id = order[i].split('-')[1];
      newOrderId.push(id);
    }
    newOrderId = JSON.stringify(newOrderId);
    setLoading(true);
    $.ajax({
      type: 'POST',
      url: (isDebug ? '../src/static/php/re_order.php' : 'php/re_order.php'),
      data: {
        'newOrderId': newOrderId
      },
      dataType: 'json',
      success: function (data) {
        if(data == 'uploadFailed'){
          showAlert('Error to get list');
        } else {
          setLoading(false);
          renderList(data);
        }
      },
      error: function (data) {
        setLoading(false);
        if (data.readyState == 0) {
          withoutConnection();
          resetOrder();
        } else {
          showAlert('Error to get list');
        }
      }
    });
  }
});
