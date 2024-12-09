/*
 * File: jquery.flexisel.js
 * Version: 1.0.2
 * Description: Responsive carousel jQuery plugin
 * Author: 9bit Studios
 * Copyright 2012, 9bit Studios
 * http://www.9bitstudios.com
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
    $.fn.flexisel = function(options) {

        var defaults = $.extend({
            visibleItems: 4,
            animationSpeed: 100,
            autoPlay: false,
            autoPlaySpeed: 3000,
            pauseOnHover: true,
            setMaxWidthAndHeight: false,
            enableResponsiveBreakpoints: true,
            clone: true,
            responsiveBreakpoints: {
                portrait: {
                    changePoint: 480,
                    visibleItems: 5
                },
                landscape: {
                    changePoint: 640,
                    visibleItems: 3
                },
                tablet: {
                    changePoint: 768,
                    visibleItems: 4
                }
            }
        }, options);

        /******************************
        Private Variables
         *******************************/

        var object = $(this);
        var settings = $.extend(defaults, options);
        var itemsWidth; // Declare the global width of each item in carousel
        var canNavigate = true;
        var itemsVisible = settings.visibleItems; // Get visible items
        var totalItems = object.children().length; // Get number of elements
        var responsivePoints = [];

        /******************************
        Public Methods
        *******************************/
        var methods = {
            init: function() {
                return this.each(function() {
                    methods.appendHTML();
                    methods.setEventHandlers();
                    methods.initializeItems();
                });
            },

            /******************************
            Initialize Items
            Fully initialize everything. Plugin is loaded and ready after finishing execution
	    *******************************/
            initializeItems: function() {

                var listParent = object.parent();
                var innerHeight = listParent.height();
                var childSet = object.children();
                methods.sortResponsiveObject(settings.responsiveBreakpoints);

                var innerWidth = listParent.width(); // Set widths
                itemsWidth = (innerWidth) / itemsVisible;
                //childSet.width(itemsWidth);        
                if (settings.clone) {
                    childSet.last().insertBefore(childSet.first());
                    childSet.last().insertBefore(childSet.first());
                    object.css({
                        'left': -itemsWidth
                    });
                }


                object.fadeIn();
                $(window).trigger("resize"); // needed to position arrows correctly

                /* if(jQuery(window).width() < 640){
                 		$(".nbs-flexisel-nav-right").css("display","none");
                 }*/
                if ($("li[id^=parent]").last().offset().left + $("li[id^=parent]").last().outerWidth() - 2 < $(".nbs-flexisel-inner").offset().left + $(".nbs-flexisel-inner").outerWidth()) {
                    $(".nbs-flexisel-nav-right").css("display", "none");
                } else {
                    $(".nbs-flexisel-nav-right").css("display", "block");
                }

            },

            /******************************
            Append HTML
            Add additional markup needed by plugin to the DOM
	    *******************************/
            appendHTML: function() {

                //var baseWidth;
                //var contentWidth = $('html').width();

                object.addClass("nbs-flexisel-ul");
                object.wrap("<div class='nbs-flexisel-container'><div class='nbs-flexisel-inner'></div></div>");
                object.find("li").addClass("nbs-flexisel-item");

                if (settings.setMaxWidthAndHeight) {
                    var baseWidth = $(".nbs-flexisel-item img").width();
                    var baseHeight = $(".nbs-flexisel-item img").height();
                    $(".nbs-flexisel-item img").css("max-width", baseWidth);
                    $(".nbs-flexisel-item img").css("max-height", baseHeight);
                }
                /*Surej added nextLeftButton and nextRightButton id name */
                $("<div id='nextLeftButton' class='nbs-flexisel-nav-left'></div><div id='nextRightButton' class='nbs-flexisel-nav-right'></div>").insertAfter(object);
                if (settings.clone) {
                    var cloneContent = object.children().clone();
                    object.append(cloneContent);
                }
            },
            /******************************
            Set Event Handlers
	    Set events: click, resize, etc
            *******************************/
            setEventHandlers: function() {

                var listParent = object.parent();
                var childSet = object.children();
                var leftArrow = listParent.find($(".nbs-flexisel-nav-left"));
                var rightArrow = listParent.find($(".nbs-flexisel-nav-right"));
                var totalNoOfElem, i, last, listConst;

                $(window).on("resize", function(event) {

                    methods.setResponsiveEvents();

                    var innerWidth = $(listParent).width();
                    var innerHeight = $(listParent).height();

                    itemsWidth = (innerWidth) / itemsVisible;

                    // childSet.width(itemsWidth);
                    if (settings.clone) {
                        object.css({
                            'left': -itemsWidth
                        });
                    } else {
                        object.css({
                            'left': 0
                        });
                    }

                    var halfArrowHeight = (leftArrow.height()) / 2;
                    var arrowMargin = (innerHeight / 2) - halfArrowHeight;
                    /*leftArrow.css("top", arrowMargin + "px");
                    rightArrow.css("top", arrowMargin + "px");*/
                    /*Surej commented out for topbar*/

                    //alert('window resize');
                    if ($("li[id^=parent]").last().offset().left + $("li[id^=parent]").last().outerWidth() < $(".nbs-flexisel-inner").offset().left + $(".nbs-flexisel-inner").outerWidth()) {
                        $(".nbs-flexisel-nav-right").css("display", "none");
                        $(".nbs-flexisel-nav-leftMod").css("display", "none");
                    } else {
                        $(".nbs-flexisel-nav-right").css("display", "block");
                    }
                    // ADDED for controlling scroll when last element reaches -start 
                    //displaying more button on resize of window

                    totalNoOfElem = jQuery("li[id^=parent]").length; // this will calculate the number of menu items are present in mega menu.

                    /*Logic to dynamic scroll for Mega menu*/
                    var totalMegaMenuWidth = 55; //Buffer added for left and right padding of menus
                    totalMegaMenuWidth = jQuery('#topbar').width() - jQuery('.nbs-flexisel-container').width();
                    var megaMenuWidthArr = [];
                    var j = 0;
                    /*calculate total mega menu width and store each menu width in array*/
                    jQuery("li[id^=parent]").each(function() {
                        totalMegaMenuWidth = parseInt(totalMegaMenuWidth) + parseInt(jQuery(this).width());
                        //console.log("totalMegaMenuWidth=="+totalMegaMenuWidth);	
                        megaMenuWidthArr[j] = parseInt(jQuery(this).width());
                        j++;
                    });
                    /*this will be + if menus are hidden*/
                    var viewPort;
                    if (viewport().width > 1024) {
                        viewPort = "1024";
                    } else
                        viewPort = viewport().width;

                    var hiddenMenusWidth = parseInt(totalMegaMenuWidth) - parseInt(viewPort);
                    var counter = 0;

                    if (hiddenMenusWidth < 2) {
                        $(".nbs-flexisel-nav-right").css("display", "none");
                    }
                    /*compare hiddenMenusWidth with each menu width starting from last from the array. If its greater than the megamenu width increment the counter which shows how many menus are hidden*/
                    else if (hiddenMenusWidth > 2) {
                        for (var k = totalNoOfElem - 1; k > 0; k--) {
                            if (megaMenuWidthArr[k] < hiddenMenusWidth || megaMenuWidthArr[k] - hiddenMenusWidth > 50) {
                                counter++;
                                hiddenMenusWidth = hiddenMenusWidth - megaMenuWidthArr[k]
                            } else
                                break;
                        }
                        counter++;
                    }
                    listConst = counter;
                    i = (totalNoOfElem) - counter;
                    /*if(jQuery(window).width() >= 1000){
                       i = 9;
                       listConst = 9;
                    }else if(jQuery(window).width() >= 900){
                       i = 8;
                       listConst = 8;
                    }else if(jQuery(window).width() >= 800){
                       i = 7;
                       listConst = 7;
                    }else if(jQuery(window).width() >= 700){
                       i = 5;
                       listConst = 5;
                    }else{
                       i = 4;
                       listConst = 4;
                    }*/

                    /*if(jQuery(window).width() >= 1000){
                       i = 8;
                       listConst = 8;
                    }else */

                    /*              		
               		if(jQuery(window).width() >= 900){
               		   i = 8;
               		   listConst =8;
               		}else if(jQuery(window).width() >= 800){
               		   i = 7;
               		   listConst = 7;
               		}else if(jQuery(window).width() >= 700){
               		   i =6;
               		   listConst = 6;
               		}else{
               		   i = 5;
               		   listConst = 5;
               		 }
*/
                    last = totalNoOfElem;

                }); //surej change

                // ADDED for controlling scroll when last element reaches -start 
                //var totalNoOfElem = jQuery("li[id^=parent]").length;

                //var i = 4,
                //last = totalNoOfElem -1; 

                $(leftArrow).on("click", function(event) {
                    $(".nbs-flexisel-nav-right").css("display", "block");
                    if (i > (totalNoOfElem - listConst)) {
                        i--;
                    }
                    methods.scrollLeft();

                });

                $(rightArrow).on("click", function(event) {
                    $("#nextLeftButton").removeClass("nbs-flexisel-nav-left");
                    $("#nextLeftButton").addClass("nbs-flexisel-nav-leftMod");
                    //increment i until it reaches the end of the array

                    if (i === last + 1) {
                        if ($("li[id^=parent]").last().offset().left + $("li[id^=parent]").last().outerWidth() < $(".nbs-flexisel-inner").offset().left + $(".nbs-flexisel-inner").outerWidth()) {
                            $(".nbs-flexisel-nav-right").css("display", "none");
                        } else {
                            $(".nbs-flexisel-nav-right").css("display", "block");
                            $(".nbs-flexisel-nav-leftMod").css("display", "block");
                        }
                        return false;
                    } else {
                        if ($("li[id^=parent]").last().offset().left + $("li[id^=parent]").last().outerWidth() < $(".nbs-flexisel-inner").offset().left + $(".nbs-flexisel-inner").outerWidth()) {
                            $(".nbs-flexisel-nav-right").css("display", "none");
                            //		$(".nbs-flexisel-nav-leftMod").css("display","none");
                        } else {
                            $(".nbs-flexisel-nav-right").css("display", "block");
                            $(".nbs-flexisel-nav-leftMod").css("display", "block");
                        }
                        methods.scrollRight();
                        i++;
                    }

                });
                // ADDED for controlling scroll when last element reaches -end 
                /*if (settings.pauseOnHover == true) {
                    $(".nbs-flexisel-item").on({
                        mouseenter : function() {
                            canNavigate = false;
                        },
                        mouseleave : function() {
                            canNavigate = true;
                        }
                    });
                }*/
                if (settings.autoPlay == true) {

                    setInterval(function() {
                        if (canNavigate == true)
                            methods.scrollRight();
                    }, settings.autoPlaySpeed);
                }

            },


            /******************************
            Set Responsive Events
            Set breakpoints depending on responsiveBreakpoints
            *******************************/

            setResponsiveEvents: function() {
                var contentWidth = $('html').width();

                if (settings.enableResponsiveBreakpoints) {

                    var largestCustom = responsivePoints[responsivePoints.length - 1].changePoint; // sorted array 

                    for (var i in responsivePoints) {

                        if (contentWidth >= largestCustom) { // set to default if width greater than largest custom responsiveBreakpoint 
                            itemsVisible = settings.visibleItems;
                            break;
                        } else { // determine custom responsiveBreakpoint to use

                            if (contentWidth < responsivePoints[i].changePoint) {
                                itemsVisible = responsivePoints[i].visibleItems;
                                break;
                            } else
                                continue;
                        }
                    }
                }
            },

            /******************************
            Sort Responsive Object
            Gets all the settings in resposiveBreakpoints and sorts them into an array
            *******************************/

            sortResponsiveObject: function(obj) {

                var responsiveObjects = [];

                for (var i in obj) {
                    responsiveObjects.push(obj[i]);
                }

                responsiveObjects.sort(function(a, b) {
                    return a.changePoint - b.changePoint;
                });

                responsivePoints = responsiveObjects;
            },

            /******************************
            Scroll Left
            *******************************/
            scrollLeft: function() {
                if (object.position().left < 0) {
                    if (canNavigate == true) {
                        canNavigate = false;

                        var listParent = object.parent();
                        var innerWidth = listParent.width();

                        itemsWidth = (innerWidth) / itemsVisible;

                        var childSet = object.children();

                        object.animate({
                            'left': "+=" + itemsWidth
                        }, {
                            queue: false,
                            duration: settings.animationSpeed,
                            easing: "linear",
                            complete: function() {
                                if (settings.clone) {
                                    childSet.last().insertBefore(
                                        childSet.first()); // Get the first list item and put it after the last list item (that's how the infinite effects is made)                                   
                                }
                                methods.adjustScroll();
                                canNavigate = true;
                            }
                        });
                    }
                } else {
                    //surej added for left nav icon de-activate
                    $(".nbs-flexisel-nav-leftMod").css("display", "none");
                    $("#nextLeftButton").removeClass("nbs-flexisel-nav-leftMod");
                    $("#nextLeftButton").addClass("nbs-flexisel-nav-left");

                }
            },
            /******************************
            Scroll Right
            *******************************/
            scrollRight: function() {
                var listParent = object.parent();
                var innerWidth = listParent.width();

                itemsWidth = (innerWidth) / itemsVisible;

                var difObject = (itemsWidth - innerWidth);
                var objPosition = (object.position().left + ((totalItems - itemsVisible) * itemsWidth) - innerWidth);

                if ((difObject <= Math.ceil(objPosition)) && (!settings.clone)) {
                    if (canNavigate == true) {
                        canNavigate = false;

                        object.animate({
                            'left': "-=" + itemsWidth
                        }, {
                            queue: false,
                            duration: settings.animationSpeed,
                            easing: "linear",
                            complete: function() {
                                methods.adjustScroll();
                                canNavigate = true;
                            }
                        });
                    }
                } else if (settings.clone) {
                    if (canNavigate == true) {
                        canNavigate = false;
                        var childSet = object.children();

                        object.animate({
                            'left': "-=" + itemsWidth
                        }, {
                            queue: false,
                            duration: settings.animationSpeed,
                            easing: "linear",
                            complete: function() {
                                childSet.first().insertAfter(childSet.last()); // Get the first list item and put it after the last list item (that's how the infinite effects is made)                                
                                methods.adjustScroll();
                                canNavigate = true;
                            }
                        });
                    }
                };
            },
            /******************************
            Adjust Scroll 
             *******************************/
            adjustScroll: function() {
                var listParent = object.parent();
                var childSet = object.children();

                var innerWidth = listParent.width();
                itemsWidth = (innerWidth) / itemsVisible;
                //  childSet.width(itemsWidth);
                if (settings.clone) {
                    object.css({
                        'left': -itemsWidth
                    });
                }
            }
        };
        if (methods[options]) { // $("#element").pluginName('methodName', 'arg1', 'arg2');
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) { // $("#element").pluginName({ option: 1, option:2 });
            return methods.init.apply(this);
        } else {
            $.error('Method "' + method + '" does not exist in flexisel plugin!');
        }
    };
})(jQuery);