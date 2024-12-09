/**
 * NFEBACombobox.js
 * 
 * This plugin is built from the demo at http://jqueryui.com/autocomplete/#combobox
 */
(function($, undefined) {
    $.widget("ui.febaCombobox", {
        _create: function() {
            var wrapper = this.wrapper = $("<span>")
                .addClass("ui-combobox");
            //.attr("title", this.element.attr("title")); //Issue in IE8, not showing wrapper's title..!

            // Support only single-select select elements 
            if (this.element[0].type !== "select-one") {
                this.destroy();
                return;
            }

            // Perform custom setup, considers for wrapper spans in FEBA
            this.options.customSetup(this.element);
            var clicked = 'N';
            var input,
                that = this,
                select = this.element.hide(), // Select element	
                selected = select.children(":selected"), // Selected option element
                isLTR = select.css("direction") !== "rtl"; // Check if the component is RTL
            that.optionSelected = false;
            that.selectedOption = selected || select.find("option:first"); // Export and retain the value
            that.options.styleAndInsert(wrapper, select, isLTR); // Style n position the wrapper correctly.

            // Checks if an element entered is a valid option, else removes and reverts to previous value.
            function removeIfInvalid(element) {
                var value = $(element).val(),
                    matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(value) + "$", "i"),
                    valid = false;

                // Check if the entered text exists in the options text
                select.children("option").each(function() {
                    if ($(this).text().match(matcher)) {
                        this.selected = valid = true;
                        //that.selectedVal = value;
                        that.selectedOption = $(this);
                        $(element).val(that.selectedOption.text());

                        that._displaySelected($(this));

                        return false;
                    }
                });
                if (!valid) {
                    // If the text was not valid, revert to previous value entered and show a message.
                    $(element)
                        .val(value)
                        .febaTooltip("close")
                        .attr("data-tooltip", "'" + value + "'" + that.options.literals.noItemFound)
                        .febaTooltip("open", {
                            autoCloseDelay: 2500
                        });

                    that._displaySelected(that.selectedOption);

                    // select element already has the previous value.
                    //Vinay Modified from autocomplete to ui-autocomplete RWD
                    input.data("ui-autocomplete").term = that.selectedOption.text();
                    return false;
                }
                return true;
            }

            // add the input element with autocomplete
            // New attribute added for Eastern Bank to handle clear in their js
            input = $("<input defaultcombovalue=\"" + that.selectedOption.text() +
                    "\" value=\"" + that.selectedOption.text() +
                    "\" title=\"" + that.element.attr("title") +
                    "\" id=\"" + that.element.attr("id") + "_comboText\">")
                .appendTo(wrapper)
                .val(that.selectedOption.text()) // preselected value.
                .addClass("ui-state-default ui-combobox-input")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: function(request, response) {
                        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                        response(select.children("option").map(function() {
                            var text = $(this).text();
                            // we have options with blank value, just check we match some text.
                            if (!request.term || matcher.test(text))
                                return {
                                    label: request.term ? text.replace(
                                        new RegExp(
                                            "(?![^&;]+;)(?!<[^<>]*)(" +
                                            $.ui.autocomplete.escapeRegex(request.term) +
                                            ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                        ), "<strong>$1</strong>") : text,
                                    value: text,
                                    option: this,
                                    image: $(this).attr("data-optionImage"),
                                    colouredDiv: $(this).attr("data-indicateColour")
                                };
                        }));
                    },
                    select: function(event, ui) {
                        // Mark options selected and trigger selected event
                        ui.item.option.selected = true;
                        that.optionSelected = true;
                        that.selectedOption = $(ui.item.option);
                        that._displaySelected(that.selectedOption);

                        that.comboInput.blur();
                        that.comboToggle.focus();
                        that._trigger("selected", event, {
                            item: ui.item.option
                        });

                        //Workaround for IE combobox issue. Reselecting the value again as the previous value was retained in some cases.
                        if (!ui.item.option.selected && (navigator.userAgent.indexOf("MSIE ") > 0) || navigator.userAgent.match(/Trident.*rv\:11\./)) {
                            ui.item.option.selected = true;
                            that.selectedOption = $(ui.item.option);
                        }
                        // Fix for tab out from drop down (Ticket # 723231)    
                        that.comboInput.focus();
                    },
                    change: function(event, ui) {
                        if (that.optionSelected) {
                            that.optionSelected = false;
                            return false;
                        }

                        if (!ui.item) { // If null, its changed through autocomplete.
                            if (removeIfInvalid(this)) {
                                // If selection is valid, trigger change event
                                that._trigger("typed", event, {
                                    item: undefined
                                });
                            } else {
                                return false;
                            }
                        } else {
                            //that.selectedVal = $(this).val();
                            //that.selectedOption = $(this);
                            that.selectedOption = $(ui.item.option);
                            //Workaround for IE combobox issue. Reselecting the value again as the previous value was retained in some cases.
                            if (!ui.item.option.selected && (navigator.userAgent.indexOf("MSIE ") > 0) || navigator.userAgent.match(/Trident.*rv\:11\./)) {
                                ui.item.option.selected = true;
                            }
                        }
                    },
                    position: {
                        /*RTL fix to align dropdown div to search text: start*/
                        //my: "right top",
                        //at: "right bottom", 
                        my: (isLTR ? "left top" : "right top"),
                        at: (isLTR ? "left bottom" : "right bottom"),
                        /*RTL fix to align dropdown div to search text: end*/
                        collision: "flip"
                    }
                })
                .addClass("ui-widget ui-widget-content ui-corner-" + (isLTR ? "left" : "right"));

            /*Surej RWD fixed for focusing full text so that user will be able to edit the options*/
            jQuery(".ui-combobox-input").focus(function() {
                jQuery(this).select();
            });

            //Aashish modified from autocomplete to ui-autocomplete
            input.data("ui-autocomplete")._renderItem = function(ul, item) {
                if ((navigator.userAgent.indexOf("MSIE ") > 0) || navigator.userAgent.match(/Trident.*rv\:11\./)) {

                    if (event == null && clicked == "N") {
                        pageLoad = "N";
                        clicked = "Y";
                        return;
                    } else {
                        return $("<li>")
                            .data("item.ui-autocomplete", item)
                            .append(that._getOptionItem(item))
                            .appendTo(ul);
                    }
                }
                return $("<li>")
                    .data("item.ui-autocomplete", item)
                    .append(that._getOptionItem(item))
                    .appendTo(ul);
            };

            this.element.bind("change.febaCombobox domManipulation.febaCombobox", function(e, trigger) {
                if (trigger !== "febaCombobox") {
                    that.update(e.type);
                }
            });

            // Save the button for operations later
            that.comboToggle = $("<a>")
                .attr("title", that.options.literals.showAll)
                .attr("id", that.element.attr("id") + "_comboButton")
                .attr("name", that.element.attr("name") + "_comboButton")
                .appendTo(wrapper)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("ui-combobox-toggle ui-corner-" + (isLTR ? "right" : "left"))
                .click(function() {

                    /*if ($(this).data("button").options.disabled) {
                    	return;
                    }*/

                    // close if already visible
                    if (input.autocomplete("widget").is(":visible")) {
                        input.autocomplete("close");
                        removeIfInvalid(input);
                        return;
                    }

                    $(this).blur();

                    // pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                    input.focus();
                });

            that.options.manipulateOpenButton(that.comboToggle, input, that.element);

            input.css(that.options.getCSSStyles(that.element, input, that.comboToggle)); // Set styles as per the select box.

            input.febaTooltip({
                bindMouse: false,
                delay: 750,
                tooltipAttr: "data-tooltip",
                style: "static",
                elementRelation: {
                    top: 100,
                    left: "center"
                },
                offset: {
                    top: 10,
                    left: 0
                }
            });

            // Export the inputbox for operations later
            that.comboInput = input;
            that.comboInputPadding = parseInt(that.comboInput.css("padding-" + (isLTR ? "left" : "right")), 10);
            //that.comboInputWidth = that.comboInput.width();
            that.comboInputWidth = this.options.getHiddenDimensions(that.comboInput).width;

            that.isLTR = isLTR; // Export LTR or RTL state

            that._displaySelected(that.selectedOption);

            //Disable combobox if the element is disabled
            if (select.attr("disabled")) {
                that.disable();
            }

            //that.options.outerParentSpan?that.options.outerParentSpan.hide():$.noop();
            // Not sure why this line would be here! In a version, the line is commented in styleAndInsert added here
        },
        _getOptionItem: function(item) {
            if (item.colouredDiv) {
                return "<a><span class=\"ui-combobox-colour\" style='background-color:#" + item.colouredDiv + ";'></span>" + item.label + "</a>";
            } else if (item.image) {
                return "<a><span class=\"ui-combobox-image\" style='background-image:url(\"" + item.image + "\");'></span>" + item.label + "</a>";
            } else {
                return "<a>" + item.label + "</a>";
            }
        },
        _displaySelected: function(option) {
            var prependHTML,
                cssObj = {},
                propName = (this.isLTR) ? "padding-left" : "padding-right";

            this.comboInput.prev().remove();
            if (option.attr("data-indicateColour")) {
                prependHTML = $("<span class=\"ui-combobox-selected-data\">" +
                    "<span class=\"ui-combobox-colour\" style='background-color:#" +
                    option.attr("data-indicateColour") + "'></span></span>");
                this.comboInput.before(prependHTML);

                cssObj[propName] = Math.floor(this.comboInputPadding + prependHTML.outerWidth()) + "px";
                cssObj.width = Math.floor(this.comboInputWidth - prependHTML.outerWidth());

                this.comboInput.css(cssObj);

            } else if (option.attr("data-optionImage")) {
                prependHTML = $("<span class=\"ui-combobox-selected-data\">" +
                    "<span class=\"ui-combobox-image\" style='background-image:url(\"" +
                    option.attr("data-optionImage") + "\");'></span></span>");
                this.comboInput.before(prependHTML);

                cssObj[propName] = Math.floor(this.comboInputPadding + prependHTML.outerWidth()) + "px";
                cssObj.width = Math.floor(this.comboInputWidth - prependHTML.outerWidth());

                this.comboInput.css(cssObj);

            } else {
                prependHTML = "";

                cssObj[propName] = this.comboInputPadding + "px";

                this.comboInput.css(cssObj).width(this.comboInputWidth);
            }
        },
        disable: function() {
            this.element.attr("disabled", "true");
            this.comboToggle.button("disable");
            this.comboInput.attr("disabled", "true")
                .addClass("ui-state-disabled"); //.autocomplete("disable")
        },
        enable: function() {
            this.element.removeAttr("disabled");
            this.comboToggle.button("enable");
            this.comboInput.removeAttr("disabled")
                .removeClass("ui-state-disabled"); //.autocomplete("disable")
        },
        destroy: function() {
            this.wrapper.remove();
            this.element.unbind(".febaCombobox")
                .show();
            this.options.destroyChanges();
            $.Widget.prototype.destroy.call(this);
        },
        update: function(type) {
            var selected = this.element.children(":selected"); // Selected option element
            // If any value is already selected.
            this.selectedOption = selected || this.element.find("option:first");
            this.comboInput.val(this.selectedOption.text());

            if (type === "domManipulation") { // If the list of elements has been updated, update the default value of input.
                this.comboInput[0].defaultValue = this.selectedOption.text();
            }
        },
        options: {
            // Externally configurable items.
            literals: {
                noItemFound: " did not match any item!",
                showAll: "Show All Items"
            },
            getCSSStyles: function(selectElement, input, toggleElement) {
                var cssObj;

                // 'deduct' here is an space
                // required by the show-all button and the 3
                // borders of both the elements. If the width of
                // the button is later changed, the deduction
                // must be adjusted to suit the new width.
                // Expected would be:
                // widthOfToggle+horizontalBordersOfToggle+rightBorderOfTextbox+textboxHorizontalPaddings

                var reduct = this.getHiddenDimensions(toggleElement).outermostWidth + parseInt(input.css("border-right-width"), 10);
                // +(input.innerWidth()-input.width())

                //If the select box had parent spans, picks styles from it.
                if (this.hasParentSpans) {
                    var outerParentSpanDimn = this.getHiddenDimensions(this.outerParentSpan);
                    cssObj = {
                        "font-size": this.getEmFontSize(selectElement, this.immParentSpan),
                        "font-family": selectElement.css("font-family"),
                        "width": outerParentSpanDimn.width - reduct,
                        "height": this._adjustHeights(outerParentSpanDimn.height || this.outerParentSpan.css("line-height"))
                    };
                } else {
                    cssObj = {
                        "font-size": this.getEmFontSize(selectElement, selectElement.parent()),
                        "font-family": selectElement.css("font-family"),
                        "width": this.getHiddenDimensions(selectElement).width - reduct
                    };
                }

                if ($.browser.msie) {
                    cssObj["line-height"] = cssObj.height + "px";
                }

                return cssObj;
            },
            customSetup: function(selectElement) {
                // return // Default behavior.
                var immParentSpan = selectElement.parent(),
                    outerParentSpan;

                if (immParentSpan.is("span")) {
                    outerParentSpan = immParentSpan.parent();
                    if (outerParentSpan.is("span") && !selectElement.siblings().length &&
                        !immParentSpan.siblings().length && outerParentSpan[0].id.indexOf(".") === -1) {
                        this.hasParentSpans = true;
                        this.immParentSpan = immParentSpan;
                        this.outerParentSpan = outerParentSpan;
                        return;
                    }
                }

                this.hasParentSpans = false;
            },
            styleAndInsert: function(wrapper, select, isLTR) {
                var cssObj = {},
                    propName = isLTR ? "margin-left" : "margin-right";
                // Style the parent span, and add to dom.
                if (this.hasParentSpans) {
                    cssObj.float = this.outerParentSpan.css("float");
                    cssObj[propName] = this.outerParentSpan.css(propName);

                    wrapper.css(cssObj)
                        .insertAfter(this.outerParentSpan);

                    this.outerParentSpan.hide();
                } else {
                    cssObj.float = select.css("float");
                    cssObj[propName] = select.css(propName);

                    wrapper.css(cssObj)
                        .insertAfter(select);
                }
            },
            manipulateOpenButton: function(button, selectElement, inputElement) {
                // For bypassing link conversion through RIA
                button.attr(Constants.IS_EXCLUDED, "true");

                if ($.browser.msie) {
                    var cssObj;
                    //If the select box had parent spans, picks styles from it.
                    if (this.hasParentSpans) {
                        cssObj = {
                            "font-size": this.getEmFontSize(selectElement, this.immParentSpan),
                            "font-family": selectElement.css("font-family"),
                            "height": this._adjustHeights(this.getHiddenDimensions(this.outerParentSpan).height || this.outerParentSpan.css("line-height")) //,
                            //							"line-height" : this._adjustHeights(this.outerParentSpan.height() || this.outerParentSpan.css("line-height"))
                        };
                    } else {
                        cssObj = {
                            "font-size": this.getEmFontSize(selectElement, selectElement.parent()),
                            "font-family": selectElement.css("font-family") //,
                            //							"height": inputElement.height(),
                            //							"line-height": inputElement.height()
                        };
                    }

                    button.css(cssObj);
                }
            },
            typed: function() {
                // Triggering onchange event on the select box.
                $(this).trigger("change", ["febaCombobox"]);
            },
            selected: function() {
                // Triggering onchange event on the select box.
                var changetrigger = $(this).trigger("change", ["febaCombobox"]);
            },
            _adjustHeights: function(height) {
                if (height) {
                    // Compensate for the borders top and bottom.
                    height = height - 2;
                    //					if (height%2) {
                    //						height--;
                    //					}
                }

                return height;
            },
            destroyChanges: function() {
                // unhide the parent spans
                if (this.hasParentSpans) {
                    this.outerParentSpan.show();
                }
            },
            convertToEm: function(value, elementParent) {
                var oneEmEle = $('<span style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</span>')
                    .appendTo(elementParent);
                var oneEmIs = oneEmEle.height() || parseInt(oneEmEle.css("line-height"), 10);
                oneEmEle.remove();
                return (value / oneEmIs).toFixed(2);
            },
            getEmFontSize: function(selectElement, elementParent) {
                if ($.browser.msie) {
                    return selectElement[0].currentStyle.fontSize;
                } else {
                    return this.convertToEm(selectElement.css("font-size").replace("px", ""), elementParent) + "em";
                }
            },
            getHiddenDimensions: function(element) {
                if (!$.browser.msie && (element.width() && element.height())) {
                    return {
                        width: element.width(),
                        height: element.height(),
                        outermostWidth: element.outerWidth(true)
                    };
                }
                //Removed condition:  element.css("display") === "none"

                // else part: calculations for hidden element
                var props = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    dimn;

                $.swap(element[0], props, function() {
                    dimn = {
                        width: element.width(),
                        height: element.height(),
                        outermostWidth: element.width() +
                            parseInt(element.css("margin-right"), 10) +
                            parseInt(element.css("margin-left"), 10) +
                            parseInt(element.css("padding-right"), 10) +
                            parseInt(element.css("padding-left"), 10) +
                            parseInt(element.css("border-right-width"), 10) +
                            parseInt(element.css("border-left-width"), 10)
                    };
                });

                return dimn;
            }
        }
    });
})(jQuery);