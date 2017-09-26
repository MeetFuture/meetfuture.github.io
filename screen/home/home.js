(function($) {
	$.fn.snow = function(options) {
		var $flake = $('<div id="flake" />').css({
			'position' : 'absolute',
			'top' : '-50px'
		}).html('&#10052;'), documentHeight = $(document).height()-20, documentWidth = $(document).width(), defaults = {
			minSize : 10,
			maxSize : 20,
			newOn : 500,
			flakeColor : "#4D86B7"
		}, options = $.extend({}, defaults, options);
		var interval = setInterval(
				function() {
					var startPositionLeft = Math.random() * documentWidth - 100, startOpacity = 0.5 + Math.random(), 
					sizeFlake = options.minSize + Math.random() * options.maxSize, endPositionTop = documentHeight - 10, endPositionLeft = startPositionLeft
							- 100 + Math.random() * 200, durationFall = documentHeight * 10 + Math.random() * 5000;
					$flake.clone().appendTo('body').css({
						left : startPositionLeft,
						opacity : startOpacity,
						'font-size' : sizeFlake,
						color : options.flakeColor
					}).animate({
						top : endPositionTop,
						left : endPositionLeft,
						opacity : 0.2
					}, durationFall, 'linear', function() {
						$(this).remove()
					});
				}, options.newOn);
	};
})(jQuery);
$.fn.snow({
	minSize : 15,
	maxSize : 30,
	newOn : 600,
	flakeColor : '#4D86B7'
});
