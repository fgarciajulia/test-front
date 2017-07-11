
function renderList(items) {
  var isFirstTime = $('#listContainer').hasClass('isFirstTime');
  function addItem(i) {
    $('#list').append(
      '<div id="item-' + i + '" class="item row">'+
      ' <div class="col-xs-2 col-xs-offset-1">'+
      ' <label for="fileInput-' + i + '">'+
      '   <img class="img-responsive" src="' + ( isDebug ? '../src/static/imageItem/': 'imageItem/') + items[i].url + '" />' +
      '  </label>' +
      '   <i class="fa fa-pencil" aria-hidden="true"></i>' +
      '  <input class="fileInput" id="fileInput-' + i + '" style="display: none;" type="file" accept=".jpg,.gif,.png" />' +
      ' </div>'+
      ' <div class="col-xs-5">'+
      '   <p class="paragraphDescription" id="description-' + i + '">' + items[i].description + '</p>' +
      '   <i class="fa fa-pencil" aria-hidden="true"></i>' +
      ' </div>'+
      ' <div class="col-xs-2">'+
      '   <p class="btn btn-primary edit" id="edit-' + i + '" style="display:none;">Save</p>' +
      '   <p class="btn btn-warning cancel"id="cancel-' + i + '" style="display:none;">Cancel</p>' +
      '   <p class="btn btn-danger delete" id="delete-' + i + '">Delete</p>' +
      ' </div>'+
      '</div>'
    );
  }

  // clear List
  $('#list').html('');

  if (isFirstTime) {
    // render the first time with fadeIn
    var count = 0;
    var loopFadeIn = function () {
      setTimeout(function () {
        if (count < items.length) {
          addItem(count);
          loopFadeIn();
        }else{
          $('#listContainer').removeClass('isFirstTime');
          changeListenersFileInput();
        }
        count++;
      }, 300);
    };
    loopFadeIn();
  } else {
    // refresh
    for (var i = 0; i < items.length; i++) {
      addItem(i);
      if(i == items.length - 1){
        changeListenersFileInput();
      }
    }
  }
  $('#count').text(items.length + ' items');
}

function getAndShowList(){
  var error = function (data) {
    if (data.readyState == 0) {
      withoutConnection();
    } else {
      showAlert('Error to get list, press F5');
    }
  };
  var success = function (data) {
    setLoading(false);
    if(data == 'uploadFailed'){
      showAlert('Error to get list, press F5');
    } else {
      renderList(JSON.parse(data));
    }
  };
  getList(success, error);
}

function getList(cbsuccess, cberror) {
  var random = new Date().toString();
  setLoading(true);
  $.get( isDebug ? '../src/static/php/get_items.php?' + random : 'php/get_items.php?' + random )
    .done(cbsuccess)
    .fail(cberror);
}

$(document).ready(function () {
  getAndShowList();
});