$(function () {
    let isPage = '时间轴' === $(".blogtitle").text().trim();
    let isNotMobile = !isMobile();
    if (isPage && isNotMobile) {
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
                        </ul>
                    </div>`;
        $('.not_index_bg').append(html);
    }
});