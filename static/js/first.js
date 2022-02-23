(function ($) {
    $.fn.flip = function (options) {
        var options = $.extend({
            targetClass: '.textSlot'
        }, options);

        return this.each(function () {
            console.log(this);
            var $this = $(this),
                $target = $this.find(options.targetClass);

            $this
                .on({
                    'init.flip': function () {
                        var targetFirst_height = $target.eq(0).height();

                        $this
                            .data('height', targetFirst_height)
                            .css({height: targetFirst_height});
                    },
                    'mouseenter.flip': function () {
                        $target.css({top: -$this.data('height') + 'px'});
                    },
                    'mouseleave.flip': function () {
                        $target.css({top: 0 + 'px'});
                    }
                })
                .trigger('init.flip');
        });
    };
}(jQuery));

$(function () {
    $('.textBox').flip();
});