$(function () {
  $('.banner-orbit').click(function () {
    if ($(this).hasClass('orbit-name')) {
      $(this).removeClass('orbit-name');
    } else {
      $(this).addClass('orbit-name');
    }
  })
});
