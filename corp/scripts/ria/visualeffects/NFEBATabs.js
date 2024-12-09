/**
 * FEBATabs.js
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
 * This jQuery library plugin is a tabs implementation for FEBA.
 * @author Nikhil_Wanpal
 */
(function($) {
    var FEBATabs = function(parentContainer, options) {

        /*
         * *************************** Vars ***************************
         */
        var defaults = {
            selectedTab: '1'
        }; //default options
        var parentUL = parentContainer.find("ul:first"); //main ul
        var tabList = parentUL.find("li"); // All lis or tabs
        var linkedContainers = $([]); // All linked containers

        /*
         * *************************** Plugin Functions ***************************
         */

        /*
         * Initializes plug-in, makes tabs and adds listeners for clicks on tab.
         */
        function initialize(options) {
            extendOptions(options); // Incorporate settings passed, if any

            // Dress things like tabs
            parentContainer.addClass('febatab-parent-div');
            parentUL.addClass('febatab-ul febatab-rounded-all');
            tabList.addClass('febatab-normal-tab febatab-rounded-top febatab-inactive-tab');

            if ($.browser.msie) {
                parentUL.css('height', '1%');
            }

            // set linked containers array for all the tabs.
            var hrefAttr;
            tabList.each(function() {
                hrefAttr = $(this).find('a').attr('href');
                hrefAttr = hrefAttr.replace(location.href.substring(0, location.href.lastIndexOf('/')) + "/", "");
                linkedContainers = linkedContainers.add($(hrefAttr));
            });
            hrefAttr = null;

            linkedContainers.addClass('febatab-content');

            inactivateAll(); // Hide all the linked containers and set all tabs as inactive

            // Add listeners on click for all the tabs.
            tabList.each(function(index, thisLi) {
                $(thisLi).click(function(e) {
                    e.preventDefault();
                    parentContainer.trigger('febatabselected');
                    inactivateAll();
                    $(this).addClass('febatab-active-tab').removeClass('febatab-inactive-tab');
                    $(linkedContainers[index]).addClass('febatab-active-content').removeClass('febatab-inactive-content');
                    parentContainer.trigger('febatabvisible');
                });
            });

            // Click on the 'selected' tab to activate it.
            if (defaults.selectedTab > 0) {
                $(tabList[defaults.selectedTab - 1]).triggerHandler('click');
            }
        }

        /*
         * destroys tabs, removes all classes and removes plugin data.
         */
        function destroyTabs(options) {
            // Remove all classes.
            parentContainer.removeClass('febatab-parent-div');
            parentUL.removeClass('febatab-ul febatab-rounded-all');
            tabList.removeClass('febatab-normal-tab febatab-rounded-top febatab-inactive-tab febatab-active-tab');
            linkedContainers.removeClass('febatab-content febatab-active-content febatab-inactive-content');

            // Remove plugin data
            parentContainer.removeData('febaTabsInstance');
        }

        /*
         * Updates plugin options.
         */
        function setOptions(options) {
            extendOptions(options);
        }

        //expose plug-in functions
        this.initialize = initialize;
        this.destroyTabs = destroyTabs;
        this.setOptions = setOptions;

        /*
         **************************** Utility Methods ***************************
         */

        /*
         * In a loop, hide all the linked containers and set all the tabs as inactive.
         */
        function inactivateAll() {
            tabList.each(function(index) {
                $(this).removeClass('febatab-active-tab').addClass('febatab-inactive-tab');
                $(linkedContainers[index]).addClass('febatab-inactive-content').removeClass('febatab-active-content');
            });
        }

        /*
         * Extend the default options using the passed options.
         */
        function extendOptions(options) {
            if (options) {
                $.extend(true, defaults, options);
            }
        }
    };

    var ft = $.febaTabs = {
        version: "0.09"
    };
    $.fn.febaTabs = function(options) {
        var args = arguments; // full argument array passed to the plugin.

        // Available methods in plugin
        var febaTabMethods = {
            init: function(options) {
                // do nothing if plugin already instantiated.
                if (this.data('febaTabsInstance')) return;
                // Instantiate FEBATabs
                var febaTabsInstance = new FEBATabs(this, options);
                // Add plugin data to the element
                this.data('febaTabsInstance', febaTabsInstance);
                // Initialize the tabs.
                febaTabsInstance.initialize(options);
            },
            destroy: function(options) {
                // Get the plugin data
                var febaTabsInstance = this.data('febaTabsInstance');
                if (!febaTabsInstance) return; // do nothing if plugin is not instantiated.
                // destroy data and revert all plguin changes.
                febaTabsInstance.destroyTabs(options);
            },
            setOptions: function(options) {
                // Get the plugin data
                var febaTabsInstance = this.data('febaTabsInstance');
                if (!febaTabsInstance) return; // do nothing if plugin is not instantiated.
                // Update the plugin options
                febaTabsInstance.destroyTabs(options);
            }
        };

        // For each element, check and invoke appropriate method passing the options object
        return this.each(function(i, tElement) {
            var element = $(tElement);

            if (febaTabMethods[options]) {
                febaTabMethods[options].call(element, args[1]);
            } else if (typeof options === 'object' || !options) {
                febaTabMethods['init'].call(element, args[0]);
            } else {
                $.error('Method ' + options + ' does not exist on jQuery.febaTabs');
            }
        });
    };
})(jQuery);