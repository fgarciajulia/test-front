function setLoading(value) {
  if (value) {
    $('body').removeClass('hide-loading');
  } else {
    $('body').addClass('hide-loading');
  }
}
function IsLoadig() {
  return !$('body').hasClass('hide-loading');
}