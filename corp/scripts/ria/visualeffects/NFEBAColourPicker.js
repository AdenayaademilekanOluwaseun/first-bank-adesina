/**
 * NFEBAColourPicker.js
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
 * This jQuery library plugin is a calendar implementation for FEBA.
 * @author Nikhil_Wanpal
 */

(function($, document, undefined) {
    var openPalette = undefined;

    var constants = {
        COLOUR_ID: "id",
        EVENT_NAMESPACE: ".fcp",
        CLICK_WITH_NAMESPACE: "click.fcp",
        MOUSELEAVE_WITH_NAMESPACE: "mouseleave.fcp"
    }

    var FebaColourPicker = function(element, options) {

        /*
         * *************************** Vars ***************************
         */
        var defaults = {
            makePicker: true, // If to paint its own picker, or to use click on passed element directly
            columns: 7, // Integer, Force number of columns in palette.
            colours: [{
                id: "colour0",
                hexCode: "000000"
                //image: "../images/pfm_ct_colorfifth_three.png" // Should be relative URL, like in CSS
            }, {
                id: "colour1",
                hexCode: "0000FF"
            }, {
                id: "colour2",
                hexCode: "00FF00"
            }, {
                id: "colour3",
                hexCode: "FF0000"
            }, {
                id: "colour4",
                hexCode: "CCFF00"
            }, {
                id: "colour5",
                hexCode: "9900CC"
            }], //Array of colour objects
            loadDisabled: false, // Creates a disabled picker.
            indicatorTitle: "",
            output: undefined, // default: passed element, can be a jQuery selector or even a function.
            outputProperty: undefined, // by default outputs the id if the element is of 
            // input type. Else, sets the css attribute for background-image or 
            // background-colour and attaches colour Id in data by id fcpColourId.
            // Can be any attribute of the colour object

            // events triggered by picker.
            select: function(element, selectedColorObj, successCallback, errorCallback) {
                successCallback();
            }
        }; //default options

        // Colour picker one-time, options based calculations
        var states = {
            colourPalette: undefined,
            indicator: undefined,
            wrapper: undefined,
            colourCount: undefined,
            output: undefined,
            outputTypeInput: undefined
        }

        /*
         * *************************** Plugin Functions ***************************
         */

        /*
         * Initializes plug-in, makes tabs and adds listeners for clicks on tab.
         */
        function initialize() {
            // create a wrapper and add after the element.
            var wrapper = $("<div class='fcp-wrapper' title='" + defaults.indicatorTitle + "'>")
                .insertAfter(element);

            var picker = element, // Picker is either made or is the element
                indicator,
                isRTL = element.css("direction") === "rtl"; // Check if the component is RTL

            if (defaults.makePicker) {
                indicator = $("<div class='fcp-indicator'>"); // Indicates current colour
                picker = $("<div class='fcp-picker'>")
                    .append(indicator)
                    .prependTo(wrapper);

                // maintain indicator in state
                states.indicator = indicator;
                element.hide(); // Replace element with picker
            }

            indicateDefault(indicator); // Show currently selected colour

            if (defaults.loadDisabled) { // If colourpicker is disabled, add disabled classes.
                picker.addClass("fcp-picker-disabled");
                if (defaults.makePicker) {
                    indicator.addClass("fcp-indicator-disabled");
                }
                return;
            }

            // If colourpicker is not disabled, paint colourPalette
            var colourPalette = $("<div class='fcp-colourpalette'>"),
                contents = "<table><tr class='fcp-color-row'>",
                currColour, colourCSS, palettePosition;

            // Loop through all colours, arranging them in a table.
            for (var colourIndex = 0, columnIndex = 0; colourIndex < states.colourCount; colourIndex++, columnIndex++) {

                // If columns have filled, start next row
                if (defaults.columns <= columnIndex) {
                    columnIndex = 0;
                    contents += "</tr><tr class='fcp-color-row'>"
                }

                currColour = defaults.colours[colourIndex];
                colourCSS = getStyleProperty(currColour);
                contents += "<td><div class='fcp-color' style='" + colourCSS.prop + ":" + colourCSS.value + ";' id='" + currColour.id + "' /></td>";
            }

            // Append colourpalette to wrapper and hide.
            colourPalette.append(contents + "</tr></table>")
                .appendTo("body")
                .hide();

            // Bind functions on events
            picker.bind(constants.CLICK_WITH_NAMESPACE, function() {
                if (openPalette) { // close any already open palette
                    hidePalette(openPalette);
                }
                openPalette = colourPalette;

                palettePosition = picker.offset();
                palettePosition.top += picker.outerHeight();

                /* Surej RWD - color palette was overflowing the view port when position was towards left.
                 * Logic has been changed. If enough space is available in left for displaying color palette, 
                 * then only open overlay towards left. If space is not there to left, open overlay right.
                 * Minimum width to accomodate the color palette is taken around 300px.
                 */
                if (palettePosition.left > 300) {
                    palettePosition.left = palettePosition.left - colourPalette.width() + picker.width(); //colourPalette was going outside overlay
                }

                if (isRTL) {
                    colourPalette.show();
                    //commented to fix RTL issue
                    //palettePosition.left = palettePosition.left + picker.outerWidth() - colourPalette.outerWidth();
                    colourPalette.css(palettePosition);
                } else {
                    colourPalette.css(palettePosition)
                        .show();
                }

                // Bind mouseleave on palette to close the palette
                colourPalette.bind(constants.MOUSELEAVE_WITH_NAMESPACE, function() {
                    hidePalette(colourPalette);
                });
            });

            // On click of colours, select it.
            colourPalette.find(".fcp-color")
                .bind(constants.CLICK_WITH_NAMESPACE, selectColour);

            // maintain colourPalette, wrapper as a state.
            states.colourPalette = colourPalette;
            states.wrapper = wrapper;
        }

        /*
         * Destroy plugin changes
         */
        function destroy() {
            //Remove all added classes, added nodes and bound methods
            if (defaults.makePicker) {
                element.show();
            }
            states.wrapper.remove();
            states.colourPalette.remove();
            $(document).unbind(constants.EVENT_NAMESPACE);
            //Remove plugin data
            states.output.removeData('fcpColourId');
            element.removeData('febaColourPicker');
        }

        /*
         * Updates plugin options after the plugin has been initialized
         */
        function setOptions(options) {
            // reset colours array if passed from options.
            // Necessary as arrays dont clear in $.extend.
            if (options && options.colours) {
                delete defaults.colours;
            }

            extendOptions(options);

            // Validate colours, set colour count
            validateColours(defaults.colours);

            // Identify output element
            states.output = element;
            if (jQuery.isFunction(defaults.output)) {
                // if is a function, output is its output.
                states.output = defaults.output();
            } else if (defaults.output) {
                // If is a selector, output is matched elements
                states.output = $(defaults.output);
            }
            //TODO what if its a selector, or array is returned by the 
            //function and the elements are of :input and !:input types!
            // Write an .each() function to validate every matched element!

            // Check if output element is of type input
            states.outputTypeInput = states.output.is(":input");

            // throw error if invalid configuration
            if (defaults.outputProperty && !states.outputTypeInput) {
                $.error("output property is passed as " + defaults.outputProperty +
                    ", but the output element passed can not contain a value.");
            }
        }

        //expose plug-in functions
        this.initialize = initialize;
        this.setOptions = setOptions;
        this.destroy = destroy;

        /*
         **************************** Utility Methods ***************************
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
         * returns appropriate style property to be set based on passed colour
         * object
         */
        function getStyleProperty(currColour) {
            if (currColour.hexCode) {
                return {
                    prop: "background-color",
                    value: "#" + currColour.hexCode
                }
            } else { // Else its image, or invalid (validated in setOptions)
                return {
                    prop: "background-image",
                    value: "url(\"" + currColour.image + "\")"
                }
            }
        }

        /*
         * When a colour is selected, handle setting it back and custom call
         */
        function selectColour(event) {
            var colorDiv = this,
                colourObj = getColourByProperty(constants.COLOUR_ID, colorDiv.id);

            // Trigger the select event
            defaults.select(element, colourObj, function() {
                returnColour(colourObj);
                hidePalette(states.colourPalette);
            }, $.noop);
        }

        /*
         * Hide the palette and unbind the click on document
         */
        function hidePalette(palette) {
            palette.hide();
            $(document).unbind(constants.CLICK_WITH_NAMESPACE);
        }

        /*
         * Select the passed colour object
         */
        function returnColour(colourObj) {
            if (!colourObj) {
                return; // if no colour is selected.
            }

            // If our own picker, colour the indicator!
            if (defaults.makePicker) {
                var colourCSS = getStyleProperty(colourObj);
                states.indicator.css(colourCSS.prop, colourCSS.value);
            }

            // If outputProperty is defined, set it. 
            if (defaults.outputProperty) {
                states.output.val(colourObj[defaults.outputProperty]);
                return; // no need to check for outputType.
            }

            // Based on outputType, set the value appropriately.
            if (states.outputTypeInput) {
                states.output.val(colourObj.id);
            } else {
                var colourCSS = getStyleProperty(colourObj);
                states.output.data("fcpColourId", colourObj.id); // Hold the colour Id in data.
                states.output.css(colourCSS.prop, colourCSS.value);
            }
        }

        /*
         * Validates the passed array of colours.
         */
        function validateColours(coloursArray) {
            var ids = {},
                currColorObj, len = coloursArray.length;
            states.colourCount = len;
            for (var i = 0; i < len; i++) {
                currColorObj = coloursArray[i];
                if (!currColorObj.id) { // id is mandatory
                    $.error("'id' is mandatory. Should be non-falsy and unique for colours. 'id' not passed for: " + currColorObj);
                } else if (ids[currColorObj.id]) { //id ought to be unique
                    $.error("'id' is mandatory. Should be non-falsy and unique for colours. 'id' duplicate for: " + currColorObj);
                } else { // Retain for further unique validation
                    ids[currColorObj.id] = true;
                }

                // Either is mandatory
                if (!(currColorObj.hexCode || currColorObj.image)) {
                    $.error("Either hexCode or image attributes must be passed for colour. Both absent for: " + currColorObj);
                }
            }
        }


        /*
         * Returns colour object by passed property. The first object
         * having the passed attributes value as the passed value is returned.
         */
        function getColourByProperty(propName, propValue) {
            var validColours = defaults.colours,
                currColour;
            for (var i = 0; i < states.colourCount; i++) {
                currColour = validColours[i];
                if (currColour[propName] === propValue) {
                    return currColour;
                }
            }
            return;
        }

        /*
         * Indicates default/preselected colour
         */
        function indicateDefault(indicator) {
            if (defaults.outputProperty) {
                returnColour(getColourByProperty(defaults.outputProperty, states.output.val()));
            } else {
                if (states.outputTypeInput) {
                    returnColour(getColourByProperty(constants.COLOUR_ID, states.output.val()));
                } else {
                    returnColour(getColourByProperty(constants.COLOUR_ID, states.output.data("fcpColourId")));
                }
            }
        }
    }

    var fCP = $.febaColourPicker = {
        version: "0.07"
    };
    $.fn.febaColourPicker = function(options) {
        var args = arguments; // full argument array passed to the plugin.

        // Available methods in plugin
        var febaColourPickerMethods = {
            init: function(options) {
                // Get plugin data
                if (this.data('febaColourPicker')) return; //If already set, return
                // pass options to plugin constructor
                var febaColourPicker = new FebaColourPicker(this, options);
                // Store plugin object in this element's data
                this.data('febaColourPicker', febaColourPicker);
                febaColourPicker.setOptions(options);;
                febaColourPicker.initialize();
            },
            destroy: function(options) {
                // Get plugin data
                var febaColourPicker = this.data('febaColourPicker');
                if (!febaColourPicker) return; // If not set, return

                febaColourPicker.destroy();
            },
            setOptions: function(options) {
                // Get plugin data
                var febaColourPicker = this.data('febaColourPicker');
                if (!febaColourPicker) return; // If not set, return

                febaColourPicker.setOptions(options);
            }
        }

        // For each element, check and invoke appropriate method passing the options object
        return this.each(function(i, tElement) {
            var element = $(tElement);

            if (febaColourPickerMethods[options]) {
                febaColourPickerMethods[options].call(element, args[1]);
            } else if (typeof options === 'object' || !options) {
                febaColourPickerMethods['init'].call(element, args[0]);
            } else {
                $.error('Method ' + options + ' does not exist on jQuery.febaColourPicker');
            }
        });
    }
})(jQuery, document);