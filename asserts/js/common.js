function isIndexPage() {
  let flag = $("#body-wrap #page-header").attr("style").indexOf("index.jpg");
  return flag;
}
