
var initmaptooltip = function() {

	var map = $("#ol3map").prop("map");
	if ($("#ol3map #info").size() == 0){
		$("#ol3map").append("<div id=\"info\"></div>");
	}

	var info = $('#ol3map #info');

	info.tooltip({
		animation : false,
		trigger : 'manual'
	});

	var displayFeatureInfo = function(pixel) {
		info.css({
			left : pixel[0] + 'px',
			top : (pixel[1] - 15) + 'px'
		});
		var feature = map.forEachFeatureAtPixel(pixel,
				function(feature, layer) {
					return feature;
				});
		if (feature && feature.get('name')) {
			info.tooltip('hide').attr('data-original-title', feature.get('name')).tooltip('fixTitle').tooltip('show');
		} else {
			info.tooltip('hide');
		}
	};

	map.on('pointermove', function(evt) {
		if (evt.dragging) {
			info.tooltip('hide');
			return;
		}
		displayFeatureInfo(map.getEventPixel(evt.originalEvent));
	});

	map.on('click', function(evt) {
		displayFeatureInfo(evt.pixel);
	});

};


$( document ).ready(function() {

	var fnCallback = function (mutations) {
		mutations.forEach(function (mutation) {
			for (index = 0; index < mutation.addedNodes.length; ++index) {
				if (mutation.addedNodes[index].id == "ol3map") {
					// console.log(mutation.addedNodes[index].id);
					initmaptooltip();
				}
			}
		});
	};

	var observer = new MutationObserver(fnCallback),
		elTarget = document,
		objConfig = {
			childList: true,
			subtree : true,
			attributes: false,
			characterData : false,
			// attributeFilter : ['style', 'id'],
			attributeOldValue : false
		};

	 observer.observe(elTarget, objConfig);

});
/*
$(document).ready( function() {
	initmaptooltip();
});
*/
