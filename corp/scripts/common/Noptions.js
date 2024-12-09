(function($) {


    $(function() {

        $('select.c_002_options-menu').optionsmenu();
        $('.singleLine select').optionsmenu();
    });

    $.fn.optionsmenu = function() {

        return $(this).each(function() {
            var $this = $(this)
            $options = $this.find('option');
            $this.hide();

            var $wrapper = $('<div/>').addClass('c_002_options-menu'),
                $head = $('<div/>').addClass('options-menu-head'),
                $toggle = $('<a href="#"/>'),
                $span = $('<span/>').text($options.eq(0).text()),
                $body = $('<div/>').addClass('options-menu-body'),
                $ul = $('<ul/>');

            $options.each(function(i) {

                if (i > 0) {
                    var value = $(this).attr('value');

                    if (value == '') {
                        value = '#';

                    }

                    var $li = $('<li/>'),
                        $a = $('<a/>').attr('href', value).attr('class', $(this).attr('class')).text($(this).text());
                    $li.append($a);
                    $ul.append($li);
                }
            });

            $wrapper.append($head.append($toggle.append($span)));
            $wrapper.append($body.append($ul));
            $this.parent().append($wrapper);

            $wrapper.addClass($this.attr('class'));

            $head.click(function(e) {
                e.preventDefault();
                $wrapper.toggleClass('open');
            });
            $(document.body).click(function(e) {
                if (!$.contains($wrapper[0], e.target)) {
                    $wrapper.removeClass('open');
                }
            });

            var txt = $options.eq(0).text();

            while ($span.width() > $toggle.width() && txt.length > 0) {

                txt = txt.substring(0, txt.length - 1);
                $span.text(txt + '...');
            }

        });

    }

})(jQuery);
//Added by Prasad for adding title to <select> tag  - 23/11/2011 - Start
//Modified by Payal for adding title to <select> tag  - 28/11/2011 - Start
//On mouseover event this function shows the tooltip corresponding to the text on which the mouse is hovered.
function changeValue(sl) {
    var selectedInd = sl.selectedIndex;
    sl.title = sl.options[selectedInd].text;
    var len = sl.options.length;
    for (i = 0; i < len; i++) {
        sl.options[i].title = sl.options[i].text;
    }
}

feba.loader.fnload(function() {
    jQuery("select").each(function(i) {
        if (jQuery.browser.msie) {
            jQuery(this).mouseover(function() {
                changeValue(this);
            });
        }
    });
});
//Modified by Payal for adding title to <select> tag  - 28/11/2011 - End  
//Added by Prasad for adding title to <select> tag  - 23/11/2011 - End