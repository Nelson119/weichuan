'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $ */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var app = {};
app.partial = {};

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|nelson119.github.io/.test(location.href);

$(function () {
	app.getParam = getParam;

	// 定義每個section
	$.each(app.partial, function (name, init) {
		init();
	});
	app.imageReload.init();

	app.imageReload.callback = function () {
		// console.log('preload callback');
		$('html').addClass('loading-done');
	};
	app.imageReload.init();
});

//判斷是否具有屬性
$.fn.hasAttr = function (attributeName) {
	var attr = $(this).attr(attributeName);
	if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined)) && attr !== false) {
		return true;
	} else {
		return false;
	}
};

var share = {
	facebook: function facebook(href, title) {
		href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=camp');
		title = encodeURIComponent(title || document.title);
		window.open('https://www.facebook.com/sharer.php?u=' + href + '&amp;t=' + title);
	},
	googleplus: function googleplus(href) {
		href = encodeURIComponent(href || location.href + '?utm_source=g+&utm_medium=googleplus_m&utm_campaign=camp');
		window.open('https://plus.google.com/share?url=' + href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	},
	email: function email(href, title) {
		href = encodeURIComponent(href || location.href + '?utm_source=email&utm_medium=email_m&utm_campaign=camp');
		title = encodeURIComponent(title || document.title);
		var body = encodeURIComponent('' + href + ' #' + title + '');
		window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:' + title + '&body=' + body + '&bcc=');
	}
};

function getParam(name) {
	var r = new RegExp('^.*[?&]' + name + '[=]([^&]+).*$', 'i');
	if (!r.test(location.search)) {
		return null;
	}
	var value = location.search.replace(r, '$1');
	return decodeURIComponent(value);
}
//# sourceMappingURL=app.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */

app.partial.preload = function () {

	app.dementions = {
		mobile: false,
		desktop: false
	};

	function imageReload(callback) {

		var imagePreload = {},
		    elements = [];

		var main = $('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]');
		main.each(function (idx, ele) {
			if ($(ele).attr('data-src')) {
				imagePreload[$(ele).attr('data-src')] = false;
				elements.push(ele);
			}
		});

		$.each(imagePreload, function (src, stat) {
			if (/\.svg$/.test(src)) {

				$.get(src, function (svg) {
					var ret = $(elements).filter(function () {
						return src == $(this).attr('data-src');
					}).each(function (i, ele) {

						if (ele.tagName.toLowerCase() === 'img') {
							$('svg', svg).clone().insertAfter(ele);
							$(ele).remove();
						} else {
							$(ele).removeAttr('data-src').html($('svg', svg).clone());
						}
					});
					checkAll(src);
				});
			} else {
				var img = new Image();
				img.onload = function () {
					var ret = $(elements).filter(function () {
						return src == $(this).attr('data-src');
					}).each(function (i, ele) {
						if (ele.tagName.toLowerCase() === 'img') {
							$(ele).attr('src', $(ele).attr('data-src'));
						} else {
							$(ele).css('background-image', 'url(' + $(ele).attr('data-src') + ')');
						}
					});
					checkAll(src);
				};
				img.src = src;
			}
		});

		function checkAll(src) {

			imagePreload[src] = true;
			var alldone = true;
			$.each(imagePreload, function ($s, $done) {
				alldone = $done && alldone;
			});
			if (alldone) {
				//全部圖片下載完成
				imageLoaded();
			}
		}

		function imageLoaded() {
			if (typeof app.imageReload.callback == 'function') {
				app.imageReload.callback();
			}
		}
	}

	app.imageReload = {
		init: function init() {
			$(window).on('resize', function () {
				if ($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() <= 768) {
					imageReload(function () {
						app.dementions.mobile = true;
					});
				} else if ($('img[data-src]:visible, figure[data-src]:visible').not('[src],[style]').length && $(window).width() > 768) {
					imageReload(function () {
						app.dementions.desktop = true;
					});
				} else {
					app.imageReload.callback();
				}
				// if( $('html.ios').length && window.innerHeight ){
				// 	$('html, body').height(window.innerHeight);
				// }
			}).trigger('resize');
		},
		refresh: function refresh() {
			$(window).trigger('resize');
		},
		callback: function callback() {}
	};
};
//# sourceMappingURL=preload.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */

app.partial.spa = function () {

	// 網址為 gulp 或者 github 時 設定成debug 模式
	var debug = /localhost[:]9000|github.io/.test(location.href);
	var github = /nelson.works/.test(location.href);
	var stage = /staging/.test(location.href);
	var rootPath = github ? '/' : '/';
	rootPath = stage ? '/staging/' : rootPath;

	var container = $('#container'),
	    title = document.title;

	app.spa = {
		container: container,
		title: title
	};

	function updateContent(uri, name, menu, callback, isPopstate) {
		// console.log(uri, cat, cata, callback || null);
		isPopstate = isPopstate || false;
		container.trigger('page:preupdate');
		if (!isPopstate && location.pathname !== uri) {
			$('html').removeClass('loading-done');
		}

		$.get(uri, function (response) {
			var title = title;
			var htmlContent = '';
			$(response).each(function (i, element) {
				if ($(element).attr('property') === 'og:title') {
					title = $(element).attr('content');
				}
				if ($(element).attr('role') === 'main') {
					htmlContent = element;
				}
			});
			if (!isPopstate) {
				pushState({ uri: uri, name: name, menu: menu, title: title }, 'update content' + uri);
			}

			container.html(htmlContent);

			container.trigger('page:update:' + name, menu);
			container.trigger('page:update', menu);

			app.imageReload.init();
		});
	}

	function pushState(info, ref) {
		// console.log('history.pushState('+JSON.stringify(info)+', '+(title || document.title)+', '+info.uri+')');
		// console.log('push ref:',ref,':',info);
		info.title = info.title || title;
		document.title = info.title;
		history.pushState(info, info.title, info.uri);
	}

	$(window).on('popstate', function (event) {
		var info = event.originalEvent.state;
		// console.log('pop',info);
		if (info === null) {
			location.href = rootPath;
		}
		document.title = info.title;
		updateContent(info.content, info.category, info.catalog, function () {}, true);
		return true;
	});

	$('a[data-href]').on('click', function (e) {
		$(this).addClass('active').siblings().removeClass('active');
		var uri = $(this).attr('data-href');
		var name = $(this).text();
		var menu = null;
		updateContent(uri, name, menu, function () {
			console.log(name);
		});
	});

	if (app.getParam('path')) {
		var uri = decodeURIComponent(app.getParam('path'));
		$('a[data-href=' + uri + ']').trigger('click');
	}

	container.on('page:update', function (e, name) {
		// console.log(e);
		// console.log(name);
	});

	container.trigger('page:update', 'home');
};
//# sourceMappingURL=spa.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */

app.partial.i18n = function () {

	$('.i18n .to').on('click', function () {
		$(this).addClass('active').siblings().removeClass('active');
		if ($('html').attr('lang') === $(this).attr('data-lang')) {
			return false;
		}

		$('html').removeClass('loading-done');
		$('html').attr('lang', $(this).attr('data-lang'));

		app.imageReload.refresh();
	});

	var lang = $('html').attr('lang');

	if (lang) {
		$('.i18n .to[data-lang=' + lang + ']').trigger('click');
	}
};
//# sourceMappingURL=i18n.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app */

app.partial.ga = function () {};
//# sourceMappingURL=ga.js.map

'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, YT */

app.partial.yt = function () {
	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.

	var playing = null;

	window.onYouTubeIframeAPIReady = function () {

		var players = [];

		// console.log(1);
		$('.home .video').each(function (i) {

			$('iframe', this).attr('id', 'player' + i);
			var player = new YT.Player('player' + i);

			players.push(player);

			// $(this).on('click', function(){
			// 	player.carouselPlay();
			// });

			player.pe = this;

			// console.log(this);
			$(this).on('mousemove', function () {
				// console.log(player.getPlayerState)
				playing = player;
				$(player.pe).addClass('playing');
				$('.home playing-' + $(player.pe).index());
				player.playVideo();
			});
			$(this).on('mouseout', function () {
				// console.log(player.getPlayerState)
				$(player.pe).removeClass('playing');
				player.pauseVideo();
			});

			// player.playVideo();
			// player.pauseVideo();
			var wait4loop = setInterval(function () {
				if ($(window).width() <= 768 || $('html.ios').length) {
					clearInterval(wait4loop);
				}
				if (!player.playVideo) {
					return;
				}
				player.playVideo();
				setTimeout(function () {
					player.pauseVideo();
				}, 500);
				clearInterval(wait4loop);
			}, 100);
		});

		init();
	};

	var idleTimeout = 0;
	$('.home').addClass('idle').on('mousemove', function (e) {
		// console.log('mousemove')
		clearTimeout(idleTimeout);
		$('.home').removeClass('idle');
		idleTimeout = setTimeout(function () {
			playing.pauseVideo();
			$('.home').addClass('idle');
		}, 5000);
	});

	function init() {

		$(window).on('resize', function () {

			var w = $(window).width(),
			    h = $(window).innerHeight() || $(window).height(),
			    ratio = 16 / 9;
			w /= 3;
			h /= 2;

			var iframeX = 0,
			    iframeY = 0,
			    iframeW = w,
			    iframeH = h;
			// console.log(w);


			if (w / h >= ratio) {
				iframeH = w / ratio;
				iframeW = w;
				iframeY = (w / ratio - h) / 2 * -1;
				iframeX = 0;
			} else {
				iframeH = h;
				iframeW = h * ratio + 2;
				iframeY = 0;
				iframeX = (h * ratio - w) / 2 * -1;
			}
			$('.home .video .player,.home .video .poster').height(iframeH).width(iframeW).css('margin-top', iframeY).css('margin-left', iframeX);
			// $('.slick-dots').remove();
			// $('.video-background .video-container').slick('reinit');
		}).trigger('resize');
	}
};
//# sourceMappingURL=yt.js.map
