(function($) {

    "use strict";

    var PinnedElement = function(el, options) {
        this.$el = $(el);
        this.$pinContainer = $(options.containerSelector);
        this.options = options;
        this.left = $(el).css('left');
        this.minTop = $(el).offset().top;
    };

    PinnedElement.prototype = {

        checkTopOffset: function() {

            var maxTop = this.$pinContainer.offset().top + this.$pinContainer.height() - this.options.offsetModifier,
                currentTop = this.$wrap.position().top + $(window).scrollTop();

            return maxTop > currentTop;

        },

        setOffsetLeft: function() {

            var instance = this;

            this.$el.css({
                left: instance.$wrap.offset().left
            });
        },

        setOffsetTop: function() {

            var position = this.checkTopOffset() ? 'fixed' : 'static';

            this.$el.css({
                'position': position
            });

        },

        togglePin: function() {

            var instance = this,
                maxTop = this.$pinContainer.offset().top + this.$pinContainer.height(),
                currentTop = this.$wrap.position().top + $(window).scrollTop();

            if(maxTop > currentTop && $(window).scrollTop() > this.minTop && this.$el.css('position') !== 'fixed') {

                this.$el.css({
                    'position': 'fixed',
                    'top': 0,
                    'left': instance.$wrap.offset().left
                });

            } else if($(window).scrollTop() <= this.minTop && this.$el.css('position') === 'fixed' || maxTop <= currentTop) {

                this.$el.css({
                    'position': 'static'
                });
            }
        },

        wrap: function() {

            var instance = this;

            instance.$el.wrap('<div class="pin-wrapper" />')
                .parent()
                .css({
                'height': instance.$el.outerHeight(),
                'width': instance.$el.outerWidth()
            });

            instance.$wrap = instance.$el.parent();
            instance.minPin = instance.$wrap.offset().top;
        }
    };

    $.fn.pin = function(options) {

        options = $.extend({
            offsetModifier: 0,
            containerSelector: 'body'
        }, options);

        var instance = new PinnedElement(this, options);

        instance.wrap();

        // instance.$el.css({
        //     'position': 'fixed',
        //     // 'left': ,
        //     'top': instance.minTop
        // });

        $(window).on('resize', function(e) {
            instance.setOffsetLeft();
        });

        $(window).on('scroll', function(e) {
            instance.togglePin();
        });

        return this;
    };
})(jQuery);