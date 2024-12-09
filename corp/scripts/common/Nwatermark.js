feba.js.watermark = {

    showWatermark: function() {

        if (IS_WATERMARK_ENABLED != 'Y') {
            return;
        }

        jQuery('input[type="text"]').each(function() {
            var checkType = feba.domManipulator.getAttribute(this, Constants.FEBA_TYPE);
            jQuery(this).blur(function() {
                if (this.value == '') {
                    this.value = feba.domManipulator.getAttribute(this, Constants.TITLE);
                    jQuery(this).css({
                        'color': '#cccccc'
                    });
                }
                if (checkType == 'FEBADate') {
                    if (this.value == this.title) {
                        this.value = '';
                    }
                    jQuery(this).css({
                        'color': '#000000'
                    });
                }
            });

            jQuery(this).focus(function() {
                var col = feba.domManipulator.getCss(this, Constants.COLOR);
                if ((this.title == this.value || this.value == '' || this.value == null) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
                    this.value = '';
                    jQuery(this).css({
                        'color': '#000000'
                    });
                }
                if (checkType == 'FEBADate') {
                    jQuery(this).css({
                        'color': '#000000'
                    });
                }
            });


            if (this.value == null || this.value == '') {
                this.value = feba.domManipulator.getAttribute(this, Constants.TITLE);
                jQuery(this).css({
                    'color': '#cccccc'
                });


            }
            if (checkType == 'FEBADate' && this.value != feba.domManipulator.getAttribute(this, Constants.TITLE) && this.value != "") {
                jQuery(this).css({
                    'color': '#000000'
                });
            }
        });
    },


    clearWatermark: function(elements) {
        if (IS_WATERMARK_ENABLED != 'Y') {
            return;
        }
        elements.each(function() {
            var col = feba.domManipulator.getCss(this, Constants.COLOR);
            if ((this.title == this.value) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
                this.value = "";
            }
        });
    },


    showWatermarkForWidget: function(elements) {
        if (IS_WATERMARK_ENABLED != 'Y') {
            return;
        }

        elements.each(function() {

            var checkType = feba.domManipulator.getAttribute(this, Constants.FEBA_TYPE);
            jQuery(this).blur(function() {
                if (this.value == '') {
                    this.value = feba.domManipulator.getAttribute(this, Constants.TITLE);
                    jQuery(this).css({
                        'color': '#cccccc'
                    });
                }
                if (checkType == 'FEBADate') {
                    jQuery(this).css({
                        'color': '#000000'
                    });
                }
            });

            jQuery(this).focus(function() {
                var col = feba.domManipulator.getCss(this, Constants.COLOR);
                if ((this.title == this.value || this.value == '' || this.value == null) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
                    this.value = '';
                    jQuery(this).css({
                        'color': '#000000'
                    });
                }
                if (checkType == 'FEBADate') {
                    jQuery(this).css({
                        'color': '#000000'
                    });
                }
            });

            if (this.value == null || this.value == '') {
                this.value = feba.domManipulator.getAttribute(this, Constants.TITLE);
                jQuery(this).css({
                    'color': '#cccccc'
                });


            }
            if (checkType == 'FEBADate' && this.value != feba.domManipulator.getAttribute(this, Constants.TITLE) && this.value != "") {
                jQuery(this).css({
                    'color': '#000000'
                });
            }

        });
    },


    isWatermarkValue: function(element) {
        if (IS_WATERMARK_ENABLED != 'Y') {
            return;
        }
        var col = jQuery(element).css('color');
        if ((element.title == element.value) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
            return true;

        } else {
            return false;
        }

    },


    reshowWatermark: function(target) {
        if (IS_WATERMARK_ENABLED != 'Y') {
            return;
        }
        target.value = jQuery(target).attr("title");
        jQuery(target).css({
            'color': '#cccccc'
        });

    },


    preserveWatermark: function(event) {
        if (IS_WATERMARK_ENABLED != 'Y') {
            return;
        }
        jQuery('input[type="text"]').each(function() {
            if (this.value == null || this.value == '') {
                this.value = feba.domManipulator.getAttribute(this, Constants.TITLE);
                jQuery(this).css({
                    'color': '#cccccc'
                });
                feba.domManipulator.preventDefault(event);
                var checkType = feba.domManipulator.getAttribute(this, Constants.FEBA_TYPE);
                if (checkType == 'FEBADate') {
                    jQuery(this).css({
                        'color': '#000000'
                    });
                }
            }
        });
    }
};