function enableEditItem(id) {
  var descriptionElement = $('#description-' + id);
  var descriptionText = descriptionElement.text();
  descriptionElement.parent().html('<textarea class="descriptionTextarea"  maxlength="300" id="descriptionTextarea-' + id + '">' + descriptionText + '</textarea>');
  $('#item-' + id).addClass('editing');
  $('#edit-' + id).show();
  $('#cancel-' + id).show();
}

function updateItemDescriptionToJson(id, description) {
  var showError = function (data) {
    if (data.readyState == 0) {
      withoutConnection();
      setLoading(false);
    } else {
      showAlert('Error with update item');
    }
  };
  setLoading(true);
  $.ajax({
    type: 'POST',
    url: (isDebug
      ? '../src/static/php/update_item.php'
      : 'php/update_item.php'),
    data: {
      'id': id,
      'description': description
    },
    dataType: 'json',
    success: function (data) {
      setLoading(false);
      if(data == 'uploadFailed'){
        showAlert('Error to get list');
      } else {
        renderList(data);
      }
    },
    error: showError
  });
}

$('body')
  .click(function (e) {
    if (!IsLoadig()) {
      var id;
      var idNumber;
      var description;
      if ($(e.target).hasClass('paragraphDescription') && !$('.item').hasClass('editing')) {
        id = $(e.target).attr('id');
        idNumber = id.split('-')[1];
        enableEditItem(idNumber);
      } else if ($('.item').hasClass('editing') && !$(e.target).hasClass('descriptionTextarea') && !$(e.target).hasClass('cancel')) {
        id = $('.item.editing').attr('id');
        idNumber = id.split('-')[1];
        description = $('#descriptionTextarea-' + idNumber).val();
        updateItemDescriptionToJson(idNumber, description);
      } else if ($(e.target).hasClass('cancel')) {
        getAndShowList();
      }
    }
  });