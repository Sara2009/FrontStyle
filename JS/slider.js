/* Reference : https://github.com/idiot/unslider/blob/master/src/unslider.js#L33*/
+function ($) {
	'use strict';
	var Slider = function(element, options){
		var _         = this;
		_.$element    = $(element);
		_.options     = $.extend( options , Slider.DEFAULTS);
		_.init();
		
	}

	Slider.DEFAULTS = {
    	interval: 3000,
    	speed:500,
    	pause: true,
    	wrap: true,
    	keyboard: true,
    	items: '>ul',
    	item: '>li',
    	autoplay:true,
    	easing: 'swing', // easing function to use for animation
    	prev: '&larr;',
    	next: '&rarr;',
    	i   : 0
  	}

  	Slider.prototype.init = function(){
  		var _     = this;
		var el    = _.$element;
		_.i       = 0;
		_.size    = [el.outerWidth() | 0 , el.outerHeight() | 0];
		_.ul      = el.find(_.options.items);
		_.li      = _.ul.find(_.options.item).each(function(i){
			var me    = $(this),
				width = me.outerWidth(),
				height = me.outerHeight();
			if (width > _.size[0]) _.size[0] = width;
			if (height > _.size[1]) _.size[1] = height;
		});
		var len   = _.li.length;
		el.css({width: _.size[0], height: _.size[1], overflow:'hidden'});
		_.ul.css({position: 'relative', left: 0, width: (len * 100) + '%'});
		_.nav('dot');
		_.nav('arrow');

		_.options.autoplay && setTimeout(function() {
			_.play();
			if (_.options.pause) {
				el.on('mouseover mouseout', function(e) {
					_.stop();
					e.type == 'mouseout' && _.play();
				});
			};
		},0)


	};

  	

  	Slider.prototype.play = function() {
  		var _ = this;
  		_.t = setInterval(function() {
  			_.to(_.i +  1);
  		}, _.options.interval);

  	}

  	Slider.prototype.to = function(index, callback) {
  		var _       = this;
  		var o       = _.options,
			el      = _.$element,
			ul      = _.ul,
			li      = _.li,
			current = _.i,
			target  = li.eq(index);
		var ol      = el.find('.dots');
		if(index < 0 || ! target.length){
			if(index < 0)
				index = 2;
			else
				index = 0;
		}
		
		target = li.eq(index);
		var speed   = callback ? 5 : o.speed | 0,
			easing  = o.easing,
			obj     = {height: target.outerHeight()};
		ol.find('.dot').eq(index).addClass('active').siblings().removeClass('active');
		el.animate(obj, 5, easing) && ul.animate($.extend({left: '-' + index + '00%'}, obj), speed, easing, function(data) {
			_.i = index;
		});
  	}

  	Slider.prototype.stop = function(){
  		var _ = this;
  		_.t   = clearInterval(_.t);
  		return _;
  	}

  	Slider.prototype.next = function(){
  		var _ = this;
  		return _.stop().to(_.i + 1);
  	}

  	Slider.prototype.prev = function(){
  		var _ = this;
  		_.t   = clearInterval(_.t);
  		return _.stop().to(_.i - 1);
  	}

  	Slider.prototype.nav = function(name, html){
  		var _ = this;
  		if('dot' == name) {
  			html = '<ol class="dots">';
			$.each(_.li, function(index) {
				html += '<li class="' + (index == _.i ? name + ' active' : name) + '">' + ++index + '</li>';
			});
			html += '</ol>';
  		}else {
			html = '<div class="';
			html = html + name + 's">' + html + name + ' prev">' + _.options.prev + '</div>' + html + name + ' next">' + _.options.next + '</div></div>';
		};
		_.$element.addClass('has-' + name + 's').append(html).find('.' + name).click(function() {
			var me = $(this);
			me.hasClass('dot') ? _.stop().to(me.index()) : me.hasClass('prev') ? _.prev() : _.next();
		});
  	}

  	$.fn.slider = function(o) {
		var len = this.length;

		//  Enable multiple-slider support
		return this.each(function(index) {
			//  Cache a copy of $(this), so it
			var instance = new Slider(this, o);

		});
	};

}(jQuery);
