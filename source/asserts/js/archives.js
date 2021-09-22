$(function () {
  // let isNotMobile = !isMobile(); && isNotMobile
  if (isIndexPage()) {
    let html = `<div class='banner-orbit' >
                        <ul class='wrapper'>
                            <div class='sun'>
                                <div class='star'></div>
                            </div>
                            <div class='mercury'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                            <div class='venus'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                            <div class='earth'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                            <div class='mars'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                            <div class='jupiter'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                            <div class='saturn'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                            <div class='uranus'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                            <div class='neptune'>
                                <div class='planet'>
                                    <div class='shadow'></div>
                                </div>
                            </div>
                        </ul>
                    </div>`;
    $('#body-wrap .full_page').append(html);
    $('.banner-orbit').click(function () {
      if ($(this).hasClass('orbit-name')) {
        $(this).removeClass('orbit-name');
      } else {
        $(this).addClass('orbit-name');
      }
    })
  }
});
