function withoutConnection() {
  $('body').prepend(
    '<div class="container connection-error">'+
    '    <div class="row">'+
    '        <p>Check your internet connection</p>'+
    '    </div>'+
    '</div>'
  );
  setTimeout(function () {
    $('body .connection-error').remove();
  }, 2500);
}
function showAlert(text){
  $('body').prepend(
    '<div id="popup">'+
    '  <div class="container-popup">'+
    '    <div class="container">'+
    '      <div class="row">'+
    '      <div class="col-xs-8 col-xs-offset-2">'+
    '        <h3>'+
              text +
    '        </h3>'+
    '      </div>'+
    '    </div>'+
    '  </div>'+
    '</div>'
  );
  $('body').addClass('noScroll');
  $('#popup').click(function () {
    $('#popup').remove();
    $('body').removeClass('noScroll');
  });
}