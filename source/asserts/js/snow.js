$(function () {
    let isMain = $("#body-wrap .full_page .blogtitle").text().trim();
    /**不是首页则显示雪花效果*/
    if (!isMain) {
        for (let i = 0; i < 200; i++) {
            $("#body-wrap").append("<div class='snow'></div>")
        }
    }
});