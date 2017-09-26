$(function() {
	$(".MenuButton").bind(PublicJs.Mouse.Up, function() {
		var PageName = $(this).attr("data-name");
		var PageUrl = $(this).attr("data-href");
		var iframe = $(".Frame");
		iframe.attr("src", PageUrl).attr("data-url", PageUrl).attr("data-name", PageName);
	})
})