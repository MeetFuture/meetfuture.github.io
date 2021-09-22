$(function () {
  /**不是首页则显示雪花效果*/
  if (!isIndexPage()) {
    for (let i = 0; i < 200; i++) {
      $("#body-wrap").append("<div class='snow'></div>")
    }
  }
});
