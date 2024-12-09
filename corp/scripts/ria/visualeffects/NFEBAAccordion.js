/**
 * @author Leonard Martin <leonard.martin@heathwallace.com>
 * @author Luke Cuthbertson <luke.cuthbertson@heathwallace.com>
 * @version 1.3.2
 */

(function($) {

    $.fn.FEBAAccordion = function(options) {
        var $this = $(this);

        var defaults = {
            node: 'div.node',
            heading: 'h2',
            content: 'div.content',
            open: 'open',
            speed: 'normal',
            update: [],
            forceClose: true,
            blockLinks: true
        };

        var opts = $.extend(defaults, options);

        return $(this).each(function() {
            var nodes = $(this).children(opts.node);
            var openElm = null;

            //if you do not supply a node - then all nodes will close/open
            $(this).bind('close', function(e, node) {
                closeElem(node, function() {
                    update(node, true);
                    openElm = null;
                });
            })
            $(this).bind('open', function(e, node) {
                var n = nodes || $(node);
                n.each(function() {
                    if (!$(this).data('open'))
                        if (toggleElem(this)) {
                            openElm = this;
                        }
                });
            })

            nodes.each(function() {

                var obj = this;

                if ($(this).hasClass(opts.open) && (!openElm || !opts.forceClose)) {
                    openElm = obj;
                    update(obj, true);
                    setTimeout(function() {
                        $this.trigger('onopen', obj);
                    }, 0);
                    $(this).data('open', true);
                    $(this).data('closed', false);
                } else {
                    // added for keeping the LHS expanded
                    if (toggleElem(obj)) {
                        //Fix for defect 623496 Start
                        //Fix for the  link of the last menu getting collapsed if any other side menu is collapsed
                        opts.forceClose = false;
                        //Fix for defect 623496 End						
                        openElm = obj;
                        update(obj, true);
                    };
                    /*$(this).removeClass(opts.open);
                    $(this).children(opts.content).hide();
                    update(obj,false);
                    setTimeout(function(){$this.trigger('onclose',obj);}, 0);
                    $(this).data('open', false);
                    $(this).data('closed', true);*/
                };

                //make sure the content is relatively positioned - IE
                $(opts.content, obj).css('position', 'relative');

                $(this).children(opts.heading)
                    .css({
                        cursor: 'pointer'
                    })
                    .click(function(e) {
                        //FF fires click event on input as well as label, IE does not
                        //to even out cancel event on label and manually trigger event on input
                        var tag = $(this).attr('nodeName').toLowerCase();
                        var type = $(this).attr('type');
                        if (tag == 'label') {
                            $('#' + $(this).attr('htmlFor')).click();
                            return false;
                        };
                        //

                        if (openElm && openElm != obj && opts.forceClose) {
                            closeElem(openElm, function() {
                                if (toggleElem(obj)) {
                                    openElm = obj;
                                }
                            });
                        } else {
                            if (openElm && $this.find(opts.heading).attr('type') == 'radio') {
                                return;
                            };
                            if (toggleElem(obj)) {
                                openElm = obj;
                                update(obj, true);
                            };
                        };
                        //cancel default on things that would cause page to reload
                        if (tag == 'a' || tag == 'input' && type == 'submit') {
                            return false;
                        };
                        return false;
                    })
                    .find('a').each(function() {
                        if (opts.blockLinks) {
                            $(this).click(function(e) {
                                e.preventDefault();
                            });
                        };
                    });

            });
        });

        function closeElem(node, callback) {
            if ($(node || $this).children(opts.content).length > 0) {
                $(node || $this).children(opts.content).slideUp(opts.speed, function() {
                    $this.trigger('onclose', node);
                    if (node) {
                        $(node)
                            .data('open', false)
                            .removeClass(opts.open);
                    } else {
                        $this
                            .find(opts.node)
                            .data('open', false)
                            .removeClass(opts.open);
                    }
                    callback();
                });
            } else {
                $(node).removeClass(opts.open);
                $this.trigger('onclose', node)
                callback();
            };
            update(node, false);
        };

        function update(node, isopen) {
            for (var i = 0; i < opts.update.length; i++) {
                $(opts.update[i].selector, node).html(opts.update[i].text[isopen ? 0 : 1]).click(function(e) {
                    e.preventDefault()
                });
            };
        };

        function toggleElem(node) {
            if (!$(node).data('open')) {
                $(node).addClass(opts.open);
                $this.trigger('onopen', node);
            };
            $(node).data('open', !$(node).data('open'))
            if ($(node).children(opts.content).length > 0) {
                if ($(node).data('open')) {
                    $(node).children(opts.content).slideDown(opts.speed, function() {
                        $('*', node).css({
                            height: ''
                        });
                    });
                } else {
                    $(node).children(opts.content).slideUp(opts.speed, function() {
                        if (!$(node).data('open')) {
                            $(node).removeClass(opts.open);
                            $this.trigger('onclose', node);
                        }
                    });
                }
            }
            update(node, open);
            return open;
        };

    };

})(jQuery);