(function($) {

    "use strict";

    var PinnedElement = function(el, options) {
        this.$el = $(el);
        this.$pinContainer = $(options.containerSelector);
        this.options = options;
        this.position = $(el).position();
        this.minTop = $(el).offset().top;
        this.position = $(el).css('position');
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

            var position = this.checkTopOffset() ? 'fixed' : this.position;

            this.$el.css({
                'position': position
            });

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
        }
    };

    $.fn.pin = function(options) {

        options = $.extend({
            offsetModifier: 0,
            containerSelector: 'body'
        }, options);

        var instance = new PinnedElement(this, options);

        instance.wrap();

        instance.$el.css({
            'position': 'fixed',
            'left': instance.$wrap.offset().left,
            'top': instance.minTop
        });

        $(window).on('resize', function(e) {
            instance.setOffsetLeft();
        });

        $(window).on('scroll', function(e) {
            instance.setOffsetTop();
        });

        return this;
    };
})(jQuery);