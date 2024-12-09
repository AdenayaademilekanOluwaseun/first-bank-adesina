/**
 * FEBATooltip.js
 * 
 * COPYRIGHT NOTICE:
 * Copyright (c) 2004 Infosys Technologies Limited, Electronic City,
 * Hosur Road, Bangalore - 560 100, India.
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Infosys Technologies Ltd. ("Confidential Information"). You shall
 * not disclose such Confidential Information and shall use it only
 * in accordance with the terms of the license agreement you entered
 * into with Infosys.
 * 
 * This jQuery library plugin is a Tooltip implementation for FEBA.
 * @author Nikhil_Wanpal
 */

(function($) {
    var tipIdOneUp = 0;

    var FEBATooltip = function(element, options) {

        /*
         * *************************** Vars ***************************
         */
        var defaults = { //default options
            style: 'dynamic', //'static', 'custom' //tooltip position style
            tooltipAttr: 'title',
            tooltipClass: 'febatooltip-content',
            wrapperClass: 'febatooltip-wrapper',
            bindMouse: true, // if to bind mouse movements for tooltip display
            offset: { // offset from reference according to style
                top: 10,
                left: 15
            },
            elementRelation: { // offset in percentage of element total height and width, not considered in dynamic style
                top: '-50',
                left: '100'
            },
            animate: { // animation speeds in various cases
                show: 'slow',
                hide: '0',
                fade: '50'
            },
            delay: 1500, // duration for which tooltip will be delayed
            decayDelay: 500, // duration for which tooltip delay will not be functional
            fadeTo: 0.85, // Value to fade tooltip to
            removeOnClick: true,
            expressHTML: false,
            autoCloseDelay: undefined,
            disableToolTip: function() {
                return $(this).data().disableFEBAToolTip;
            },
            formatTooltipContent: function(attrContent) {
                return attrContent.replace(/\\n/g, "<br />");
            },
            aTooltipLocation: function() {
                return {
                    top: 0,
                    left: 0
                };
            }
        };

        // states
        var autoCloseTimer = undefined;

        /*
         * *************************** Plugin Functions ***************************
         */

        /*
         * Initializes plug-in.
         */
        function initialize(options) {
            extendOptions(options);

            bindMouse(TooltipHandler);
        }

        /*
         * Programmatically opens the tooltip
         */
        function open(options) {
            element.unbind('.febaTooltipProg');

            // If options are passed and autoClose is provided
            if (options && options.autoCloseDelay) {
                clearTimeout(autoCloseTimer);
                autoCloseTimer = setTimeout(function() {
                    close(); // close the tooltip post the delay
                }, options.autoCloseDelay);
            }
            TooltipHandler.showTooltip({}, true);
        }

        /*
         * Programmatically closes the tooltip
         */
        function close() {
            TooltipHandler.closeTooltip();
            bindMouse(TooltipHandler);
        }

        /*
         * Destroy plugin changes
         */
        function destroy(options) {
            // Remove all HTML added
            TooltipHandler.closeTooltip();
            // Remove all added classes.
            // Remove all bound methods.
            element.unbind('.febaTooltip');
            // Remove plugin data
            element.removeData('febaTooltipInstance');
        }

        /*
         * Updates plugin options.
         */
        function setOptions(options) {
            extendOptions(options);
        }

        //expose plug-in functions
        this.initialize = initialize;
        this.destroy = destroy;
        this.setOptions = setOptions;
        this.open = open;
        this.close = close;


        /*
         * *************************** toolTip Handlers ***************************
         */
        var TooltipHandler = (function(handler) {
            var attrContent, tipDiv, toolTipDisplayed = false;

            handler.showTooltip = function(e, overrideDelay) {
                var tipId, tooltipContent;
                //dh.log("mouseenter");
                attrContent = element.attr(defaults.tooltipAttr);
                //Only way to avoid default tooltip being shown by the browser is to remove it.
                element.attr(defaults.tooltipAttr, ""); //remove the tooltip

                // If tooltip attribute has value and drag is not happening, enable tooltip
                if (attrContent && !defaults.disableToolTip.call(element)) {
                    //dh.log("tip enabled");
                    tipId = "#febacal-EventToolTip" + tipIdOneUp++;
                    tooltipContent = defaults.formatTooltipContent.call(element,
                        defaults.expressHTML ? attrContent : sanitizeHTML(attrContent));
                    tipDiv = $("<div class='" + defaults.wrapperClass + "' ><div id='" + tipId + "' class='" + defaults.tooltipClass + "' >" +
                        tooltipContent + "</div></div>").appendTo(document.body);

                    // Add tooltip behaviour handlers and other for the tip div.
                    //TootipAnimationHandler.call(tipDiv, e); //TODO remove
                    TootipAnimationHandler.call(tipDiv);

                    delayDisplay(function() {
                        if (tipDiv) {
                            //dh.log("showing tip");
                            // add the tooltip div, set its location, fade in to view and slowly make it transparent
                            tipDiv.show(e, tipDiv);
                            toolTipDisplayed = true;
                        }
                    }, overrideDelay ? 0 : (fTooltips.inDecayDelay ? 0 : defaults.delay));
                }
            };

            handler.closeTooltip = function() {
                //dh.log("mouseleave triggered");
                element.attr(defaults.tooltipAttr, attrContent); // set back the title
                //dh.log("mouseleave");
                if (tipDiv) {
                    //dh.log("tip removed");
                    tipDiv.hideNRemove(); // fade out of view and remove
                    defaults.decayDelay ? enableDecay(defaults.decayDelay) : undefined;
                }
                toolTipDisplayed = false;
                tipDiv = undefined;
                attrContent = undefined; //TODO check!
            };

            handler.elementClickTooltip = function() {
                //dh.log("mousedown");
                //simulate the mouseout, i.e. remove tooltip
                //element.triggerHandler("mouseleave");
                if (defaults.removeOnClick) {
                    //element.attr(defaults.tooltipAttr,attrContent); //TODO check!
                    if (toolTipDisplayed) {
                        //dh.log("mousedown tip removed");
                        tipDiv.hideNRemove();
                    }
                }
            };

            handler.mouseMoveTooltip = function(e) {
                if (toolTipDisplayed) {
                    tipDiv.css(tipDiv.getPosition(e, tipDiv));
                } else if (tipDiv) {
                    tipDiv.getPosition(e, tipDiv);
                }
            };

            return handler;
        })({});

        function TootipAnimationHandler() {
            var thisTipDiv = this;

            /*
             * Shows the tooltip, to passed transparency with defined speed.
             */
            function show(e, tipDiv) {
                thisTipDiv.css(($(thisTipDiv).data('position') || thisTipDiv.getPosition(e, tipDiv))).fadeTo(defaults.animate.fade, defaults.fadeTo).fadeIn(defaults.animate.show);
            };

            /*
             * Hides and removes the tooltip div. If fadeout speed is zero, does not fadeout.
             */
            function hideNRemove() {
                (defaults.animate.hide == 0) ? $(thisTipDiv).remove():
                    $(thisTipDiv).fadeOut(defaults.animate.hide, function() {
                        $(thisTipDiv).remove();
                    });
            };

            /*
             * Gets the mouse position, calculates the tooltip position based on offsets and returns.
             */
            function dynamicPosition(e) {
                var position = {};
                position.top = e.pageY + defaults.offset.top;
                position.left = e.pageX + defaults.offset.left;
                $(thisTipDiv).data('position', position);
                return position;
            }

            /*
             * Gets element position, calculates tooltip position based on the offsets and element relation and returns.
             */
            function staticPosition(e, tipDiv) {
                var position = {};
                var elementPostion = element.offset();
                //dh.log("elementPostion.top: "+elementPostion.top);
                //dh.log("defaults.offset.top: "+defaults.offset.top);
                position.top = elementPostion.top + getIPositions(element.outerHeight(true), defaults.elementRelation.top, tipDiv, "Height") + defaults.offset.top;
                position.left = elementPostion.left + getIPositions(element.outerWidth(true), defaults.elementRelation.left, tipDiv, "Width") + defaults.offset.left;
                $(thisTipDiv).data('position', position);
                return position;
            }

            /*
             * Intelligent position-er, returns offsets required, intelligently.
             */
            function getIPositions( of , relationProp, tipDiv, prop) {
                //dh.log("of: "+of);
                if (relationProp === "center") {
                    return ( of /2) - (getHiddenHeight(tipDiv, prop)/
                        2);
                } else {
                    return of * relationProp / 100;
                }
            }

            /*
             * Calculates and returns the height of an hidden element, display: none
             */
            function getHiddenHeight(tipDiv, prop) {
                var height;
                //if (visible !== "visible" || display === "none") {
                if (!tipDiv.is(":visible")) {
                    var propBkp = {
                        visibility: tipDiv.css("visibility"),
                        display: tipDiv.css("display")
                    };
                    tipDiv.css({
                        visibility: 'hidden',
                        display: 'block'
                    });
                    height = tipDiv["outer" + prop](true);
                    //tipDiv.css({visibility: visible, display: display});
                    tipDiv.css(propBkp);
                } else {
                    height = tipDiv["outer" + prop](true);
                }

                return height;
            }

            /*
             * Returns the position where to display the tip, depending on the
             * type of tooltip passed.
             */
            function tipPosition() {
                if (defaults.style === "dynamic") {
                    return dynamicPosition;
                } else if (defaults.style === "static") {
                    return staticPosition;
                } else {
                    return function() {
                        return defaults.aTooltipLocation();
                    }; // A deliberate action of wrapping, to avoid exposing event and tipDiv.
                }
            }

            // Export the methods in the tooltip.
            thisTipDiv.show = show;
            thisTipDiv.hideNRemove = hideNRemove;
            thisTipDiv.getPosition = tipPosition();
        };


        /*
         * *************************** Utility Methods ***************************
         */
        /*
         * Extend the default options using the passed options.
         */
        function extendOptions(options) {
            if (options) {
                $.extend(true, defaults, options);
            }
        }

        /*
         * Encodes html characters, to avoid accidental expression of unwanted html, like script.
         */
        function sanitizeHTML(dirtyHTML) {
            return dirtyHTML.replace(/&/g, "&amp;").replace(/>/g, "&gt;")
                .replace(/</g, "&lt;").replace(/"/g, "&quot;")
                .replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
        }

        /*
         * Binds mouse events on the element
         */
        function bindMouse(tooltipHandler) {
            if (defaults.bindMouse) {
                element.unbind('.febaTooltip');

                element.bind('mouseenter.febaTooltip.febaTooltipProg', tooltipHandler.showTooltip)
                    .bind('mouseleave.febaTooltip.febaTooltipProg', tooltipHandler.closeTooltip)
                    .bind('mousedown.febaTooltip.febaTooltipProg', tooltipHandler.elementClickTooltip)
                    .bind('mouseup.febaTooltip.febaTooltipProg', tooltipHandler.elementClickTooltip);

                if (defaults.style === "dynamic") {
                    // For dynamic tooltip, update its location with mouse movement.
                    element.bind('mousemove.febaTooltip.febaTooltipProg', tooltipHandler.mouseMoveTooltip);
                }
            }
        }

        /*
         * Sets and resets the delay timer for displaying tooltip.
         */
        var delayDisplay = function() {
            var delayTimer = 0;
            return function(callback, delayDuration) {
                clearTimeout(delayTimer);
                delayTimer = setTimeout(callback, delayDuration);
            };
        }();

        /*
         * Sets and resets the decay for delay timer for displaying tooltip.
         */
        var enableDecay = function() {
            var decayTimer = 0;
            return function(decayDuration) {
                clearTimeout(decayTimer);
                fTooltips.inDecayDelay = true;
                delayTimer = setTimeout(function() {
                    fTooltips.inDecayDelay = false;
                }, decayDuration);
            };
        }();

    };

    var fTooltips = $.febaTooltip = {
        version: "0.20"
    };
    $.fn.febaTooltip = function(options) {
        var args = arguments; // full argument array passed to the plugin.

        // Available methods in plugin
        var FEBATooltipMethods = {
            init: function(options) {
                // Get the plugin data
                if (this.data('febaTooltipInstance')) return;
                // Initialize the plugin
                var febaTooltipInstance = new FEBATooltip(this, options);
                // Add plugin data to the element
                this.data('febaTooltipInstance', febaTooltipInstance);
                febaTooltipInstance.initialize(options);
            },
            destroy: function(options) {
                // Get the plugin data
                var febaTooltipInstance = this.data('febaTooltipInstance'); // do nothing if plugin is not instantiated.
                if (!febaTooltipInstance) return;

                // destroy data and revert all plguin changes.
                febaTooltipInstance.destroy(options); // do nothing if plugin is not instantiated.
            },
            setOptions: function(options) {
                // Get the plugin data
                var febaTooltipInstance = this.data('febaTooltipInstance');
                if (!febaTooltipInstance) return; // do nothing if plugin is not instantiated.

                // Update the plugin options
                febaTooltipInstance.setOptions(options);
            },
            open: function(options) {
                // Get the plugin data
                var febaTooltipInstance = this.data('febaTooltipInstance');
                if (!febaTooltipInstance) return; // do nothing if plugin is not instantiated.

                febaTooltipInstance.close();
                febaTooltipInstance.open(options);
            },
            close: function() {
                // Get the plugin data
                var febaTooltipInstance = this.data('febaTooltipInstance');
                if (!febaTooltipInstance) return; // do nothing if plugin is not instantiated.

                febaTooltipInstance.close();
            }
        };

        // For each element, check and invoke appropriate method passing the options object
        return this.each(function(i, tElement) {
            var element = $(tElement);

            if (FEBATooltipMethods[options]) {
                FEBATooltipMethods[options].call(element, args[1]);
            } else if (typeof options === 'object' || !options) {
                FEBATooltipMethods['init'].call(element, args[0]);
            } else {
                $.error('Method ' + options + ' does not exist in jQuery.tooltip');
            }
        });
    };

    // Plugin level parameter to control delay in tooltip display.
    fTooltips.inDecayDelay = false;

})(jQuery);