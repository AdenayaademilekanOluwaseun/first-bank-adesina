// jPaginate Plugin for jQuery - Version 0.3
// by Angel Grablev for Enavu Web Development network (enavu.com)
// Dual license under MIT and GPL :) enjoy
/*

To use simply call .paginate() on the element you wish like so:
$("#content").jPaginate(); 

you can specify the following options:
items = number of items to have per page on pagination
next = the text you want to have inside the text button
previous = the text you want in the previous button
active = the class you want the active paginaiton link to have
pagination_class = the class of the pagination element that is being generated for you to style
minimize = minimizing will limit the overall number of elements in the pagination links
nav_items = when minimize is set to true you can specify how many items to show
cookies = if you want to use cookies to remember which page the user is on, true by default
position = specify the position of the pagination, possible options: "before", "after", or "both"
equal = implements an equal height main element by using the highest possible element use true false
offset = unfortunately calculating heights with javascript isn't always 100% accurate, so please use this value to make it perfect :) its defaultly set to 50

*/
(function($) {
    $.fn.jPaginate = function(options) {
        var defaults = {
            groupletId: "",
            themeName: "",
            items: 2,
            next: "Next",
            separator: "|",
            previous: "Previous",
            active: "active",
            pagination_class: "pagination",
            minimize: false,
            nav_items: 6,
            cookies: true,
            position: "after",
            equal: false,
            offset: 50,
            paginationWrapper: false,
            paginationWrapperClass: ""
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            // object is the selected pagination element list
            obj = $(this);
            // this is how you call the option passed in by plugin of items
            var show_per_page = options.items;
            //getting the amount of elements inside parent element
            var number_of_items = obj.children().not('.noPagination').size();
            //calculate the number of pages we are going to have
            var number_of_pages = Math.ceil(number_of_items / show_per_page);

            //create the pages of the pagination
            var array_of_elements = [];
            var numP = 0;
            var nexP = show_per_page;

            var height = 0;
            var max_height = 0;
            //loop through all pages and assign elements into array
            for (i = 1; i <= number_of_pages; i++) {
                array_of_elements[i] = obj.children().not('.noPagination').slice(numP, nexP);

                if (options.equal) {
                    obj.children().not('.noPagination').slice(numP, nexP).each(function() {
                        height += $(this).outerHeight();
                    });
                    if (height > max_height) max_height = height;
                    height = 0;
                }

                numP += show_per_page;
                nexP += show_per_page;
            }
            if (options.equal) {
                max_height += options.offset;
                obj.css({
                    "height": max_height
                });
            }


            // display first page and set first cookie
            if (options.cookies == true) {
                if (get_cookie("current")) {
                    showPage(get_cookie("current"));
                    createPagination(get_cookie("current"));
                } else {
                    set_cookie("current", "1");
                    showPage(get_cookie("current"));
                    createPagination(get_cookie("current"));
                }
            } else {
                showPage(1);
                createPagination(1);
            }
            //show selected page
            function showPage(page) {
                obj.children().not('.noPagination').hide();
                array_of_elements[page].show();
            }

            // create the navigation for the pagination 
            function createPagination(curr) {
                console.log('inside pagination' + curr);
                var start, items = "",
                    end, nav = "";
                var paginationWrapperStart = "";
                var paginationWrapperEnd = "";
                if (options.paginationWrapper) {
                    $('.calendarPaginationWrapper').remove();
                    paginationWrapperStart = '<div class=\'calendarPaginationWrapper\'>';
                }
                start = paginationWrapperStart + "<ul class='" + options.pagination_class + "'>";
                var goto_previousClass = 'goto_previous' + options.themeName;
                var goto_next_inactiveClass = 'inactive goto_next_inactive' + options.themeName;
                var goto_nextClass = 'goto_next' + options.themeName;
                var goto_previous_inactiveClass = 'inactive goto_previous_inactive' + options.themeName;
                var previous = "<li title=\"" + getMessage("CalPrevious") + "\"><a class=\"" + goto_previousClass + "\" href='#'>" + options.previous + "</a></li>";
                var separator = "<li><a class=\"donutSeperator\" href='#'>" + options.separator + "</a></li>";
                var next = "<li title=\"" + getMessage("CalNext") + "\"><a class=\"" + goto_nextClass + "\" href='#'>" + options.next + "</a></li>";
                var previous_inactive = "<li title=\"" + getMessage("CalPrevious") + "\"><a class=\"" + goto_next_inactiveClass + "\">" + options.previous + "</a></li>";
                var next_inactive = "<li title=\"" + getMessage("CalNext") + "\"><a class=\"" + goto_previous_inactiveClass + "\">" + options.next + "</a></li>";

                if (options.paginationWrapper) {
                    paginationWrapperEnd = '</div>';
                }
                end = paginationWrapperEnd + "</ul>"
                var after = number_of_pages - options.after + 1;
                var pagi_range = paginationCalculator(curr);
                var jumpToPageClass = 'jumpToPage' + options.themeName;
                //if(i==1){
                var goToButton = "<span class='gotowrapper'><span class=\"currentPageText\">" + getMessage("Page") + " </span><input class='jumpto' type='text' value=\"" + curr + "\" /><span title=\"" + getMessage("CalGo") + "\" class=\"" + jumpToPageClass + "\">" + getMessage("PaginationGo") + "</span></span>";
                //}
                for (i = 1; i <= number_of_pages; i++) {

                    if (options.minimize == true) {
                        var half = Math.ceil(number_of_pages / 2)
                        if (i >= pagi_range.start && i <= pagi_range.end) {
                            if (i == curr) {
                                items += '<li class="hideElement"><a class="' + options.active + '" title="' + i + '">' + i + '</a></li>';
                            } else {
                                items += '<li class="hideElement"><a href="#" class="goto" title="' + i + '">' + i + '</a></li>';
                            }
                        } else if (curr <= half) {
                            if (i >= (number_of_pages - 2)) {
                                if (i == curr) {
                                    items += '<li class="hideElement"><a class="' + options.active + '" title="' + i + '">' + i + '</a></li>';
                                } else {
                                    items += '<li class="hideElement"><a href="#" class="goto" title="' + i + '">' + i + '</a></li>';
                                }
                            }
                        } else if (curr >= half) {
                            if (i <= 2) {
                                if (i == curr) {
                                    items += '<li class="hideElement"><a class="' + options.active + '" title="' + i + '">' + i + '</a></li>';
                                } else {
                                    items += '<li class="hideElement"><a href="#" class="goto" title="' + i + '">' + i + '</a></li>';
                                }
                            }
                        }
                    } else {
                        if (i == curr) {
                            items += '<li class="hideElement"><a class="' + options.active + '" title="' + i + '">' + i + '</a></li>';
                        } else {
                            items += '<li class="hideElement"><a href="#" class="goto" title="' + i + '">' + i + '</a></li>';
                        }
                    }
                }
                if (curr != 1 && curr != number_of_pages) {
                    nav = start + separator + previous + items + next + end;
                } else if (number_of_pages == 1) {
                    nav = start + separator + previous_inactive + items + next_inactive + end;
                } else if (curr == number_of_pages) {
                    nav = start + separator + previous + items + next_inactive + end;
                } else if (curr == 1) {
                    nav = start + separator + previous_inactive + items + next + end;
                }
                if (options.position == "before") {
                    obj.before(nav);
                } else if (options.position == "after") {
                    obj.after(nav);
                } else {
                    obj.after(nav);
                    obj.before(nav)
                }
                if (jQuery('.gotowrapper')) {
                    jQuery('.gotowrapper').remove();
                }
                jQuery('.' + options.pagination_class).prepend(goToButton);
            }

            /* code to handle cookies */
            /* code to handle cookies */
            function set_cookie(c_name, value) {
                var expiredays = 999;
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = c_name + "=" + escape(value) +
                    ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
            }

            function get_cookie(c_name) {
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length;
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return "";
            }

            function paginationCalculator(curr) {
                var half = Math.floor(options.nav_items / 2);
                var upper_limit = number_of_pages - options.nav_items;
                var start = curr > half ? Math.max(Math.min(curr - half, upper_limit), 0) : 0;
                var end = curr > half ? Math.min(curr + half + (options.nav_items % 2), number_of_pages) : Math.min(options.nav_items, number_of_pages);
                return {
                    start: start,
                    end: end
                };
            }

            function getErrorHtml(messageKey) {
                var messageIdentifier = messageKey;
                var errorHtml = "";
                var bgColourwithwidth = "redbgwithwidth";
                var bgColour = "redbg";
                var bgTopLeft = "redtopleft";
                var bgTopRight = "redtopright";
                var bgBottomLeft = "redbottomleft";
                var bgBottomRight = "redbottomright";
                var parentTableClass = "widgetErrorDisplayHw";

                errorHtml = errorHtml + ("<div id=\"MessageDisplay_TABLE\" class=\" " + parentTableClass + "\" aria-live=\"assertive\" role=\"alert\">");
                errorHtml = errorHtml + ("<div id=\"wrapperError\" class=\" positionabsolute\" >");
                errorHtml = errorHtml + ("<p class=\"errordisplaypulldown\" data-messagemode=\"single\" data-role=\"down\">");
                errorHtml = errorHtml + ("<span class=\"errordisplaywidgetright\">");
                errorHtml = errorHtml + ("<img id=\"" + "errorDisplayPullArrow" + "\" src=\"L001/consumer/images/db_icons_info_bar_arow_down.png\" onClick=\"toggleErrorMessage(this);\" alt=\"Click to view more\" title=\"Click to view more\" class=\"absmiddle arrowtoggle\"/>");
                errorHtml = errorHtml + ("<img src=\"L001/consumer/images/db_icons_info_bar_close.png\" onClick=\"closeErrorMessage(this);\" alt=\"Click to view more\" title=\"Click to view more\" class=\"absmiddle\"/>");
                errorHtml = errorHtml + ("</span>");
                errorHtml = errorHtml + ("</p>");
                errorHtml = errorHtml + ("<div  class=\"" + bgColourwithwidth + "\">");
                errorHtml = errorHtml + ("<div  class=\"" + bgColourwithwidth + "\">");
                errorHtml = errorHtml + ("<div class=\"errorDisplayDiv width100percent\">");
                errorHtml = errorHtml + ("<p  class=\"" + bgColourwithwidth + "\">");
                errorHtml = errorHtml + ("<span class=\"" + bgTopLeft + "\"><span></span></span>");
                errorHtml = errorHtml + ("<span class=\"" + bgColour + "\"><span></span></span>");
                errorHtml = errorHtml + ("<span class=\"" + bgTopRight + "\"> <span></span></span> </p>");
                errorHtml = errorHtml + ("</div>");
                errorHtml = errorHtml + ("<div id=\"calErrWrapper\" role = \"//alert\" class=\"errorContentWrapper " + bgColour + "\"><a id=\"errorlink1\" href=\"#\"><img class=\"absmiddle\" title=\"" + getMessage("NoWidgetsTitle") + "\" " +
                    "alt=\"" + getMessage("NoWidgetsAlt") + "\" src=\"" + getMessage("NoWidgetsImageSrc") + "\"></a><span dir=\"ltr\">[CONTLS0004] [100053] </span>" + getMessage(messageIdentifier));
                errorHtml = errorHtml + ("</div>");
                errorHtml = errorHtml + ("<div class=\"width100percent\">");
                errorHtml = errorHtml + ("<p  class=\"" + bgColourwithwidth + "\">");
                errorHtml = errorHtml + ("<span class=\"" + bgBottomLeft + "\"> <span></span></span>");
                errorHtml = errorHtml + ("<span class=\"" + bgColour + "\"> <span></span></span>");
                errorHtml = errorHtml + ("<span class=\"" + bgBottomRight + "\"> <span></span></span> </p>");
                errorHtml = errorHtml + ("</div>");
                errorHtml = errorHtml + ("</div>");
                errorHtml = errorHtml + ("</div>");
                errorHtml = errorHtml + ("</div>");
                errorHtml = errorHtml + ("</div>");


                return errorHtml;

            }

            // handle click on pagination 
            $(".jumpToPage" + options.themeName).die("click");
            $(".jumpToPage" + options.themeName).live("click", function(e) {
                e.preventDefault();
                var requestedPage = $('.jumpto').attr('value');
                var totalPages = array_of_elements.length;
                var selectedVal = $('.jumpto').attr('value');
                var selectedValNum = parseInt(selectedVal);
                var show_per_page = options.items;
                //getting the amount of elements inside parent element
                var number_of_items = obj.children().not('.noPagination').size();
                var number_of_pages = Math.ceil(number_of_items / show_per_page);
                if (selectedVal.length > 0 && parseInt(selectedVal) > 0 && !(isNaN(selectedValNum))) {
                    //check for max page size
                    if (selectedValNum > number_of_items) {
                        //alert('invalid page');
                        $('#' + options.groupletId).find('#MessageDisplay_TABLE').remove();
                        var errorHTML = getErrorHtml("CalPaginationNoMorePages");
                        var groupletErrorDisplayTag = Constants.GROUPLET_ERRORDISPLAY_TAG;
                        var pgHeadingTag = Constants.PAGEHEADING_TAG;
                        var errorDisplayTag = Constants.ERRORDISPLAY_TAG;
                        if (options.groupletId && options.groupletId != "null") {
                            errorDisplayTag = options.groupletId + ":" + Constants.ERRORDISPLAY_TAG;
                            pgHeadingTag = options.groupletId + ":" + Constants.PAGEHEADING_TAG;
                            groupletErrorDisplayTag = options.groupletId + ":" + Constants.GROUPLET_ERRORDISPLAY_TAG;
                        }
                        if ($(feba.domManipulator.getElementById(groupletErrorDisplayTag)).length == 0) {
                            $("<div id=\"" + groupletErrorDisplayTag + "\" > </div>").insertBefore($('#' + options.groupletId.toUpperCase()));
                        }
                        LIB.__HANDLE_ERROR__(null, errorHTML, "", options.groupletId, "true", true);
                        var groupletId = options.groupletId;
                        handleErrorOnLoad(options.groupletId);
                        return false;
                    }
                } else {
                    $('#' + options.groupletId).find('#MessageDisplay_TABLE').remove();
                    var errorHTML = getErrorHtml("CalPaginationInvalidPageNo");

                    var groupletErrorDisplayTag = Constants.GROUPLET_ERRORDISPLAY_TAG;
                    var pgHeadingTag = Constants.PAGEHEADING_TAG;
                    var errorDisplayTag = Constants.ERRORDISPLAY_TAG;
                    if (options.groupletId && options.groupletId != "null") {
                        errorDisplayTag = options.groupletId + ":" + Constants.ERRORDISPLAY_TAG;
                        pgHeadingTag = options.groupletId + ":" + Constants.PAGEHEADING_TAG;
                        groupletErrorDisplayTag = options.groupletId + ":" + Constants.GROUPLET_ERRORDISPLAY_TAG;
                    }
                    if ($(feba.domManipulator.getElementById(groupletErrorDisplayTag)).length == 0) {
                        $("<div id=\"" + groupletErrorDisplayTag + "\" > </div>").insertBefore($('#' + options.groupletId.toUpperCase()));
                    }

                    LIB.__HANDLE_ERROR__(null, errorHTML, "", options.groupletId, "true", true);
                    handleErrorOnLoad(options.groupletId);
                    return false;
                }
                showPage($('.jumpto').attr('value'));
                set_cookie("current", $('.jumpto').attr('value'));
                $("." + options.pagination_class).remove();
                createPagination(parseInt(requestedPage));
            });
            $(".goto").die("click");
            $(".goto").live("click", function(e) {
                e.preventDefault();
                showPage($(this).attr("title"));
                set_cookie("current", $(this).attr("title"));
                $("." + options.pagination_class).remove();
                createPagination($(this).attr("title"));
            });
            $(".goto_next" + options.themeName).die("click");
            $(".goto_next" + options.themeName).live("click", function(e) {
                e.preventDefault();
                var act = "." + options.active;
                var newcurr = parseInt($("." + options.pagination_class).find(".active").attr("title")) + 1;
                set_cookie("current", newcurr);
                showPage(newcurr);
                $("." + options.pagination_class).remove();
                createPagination(newcurr);
            });
            $(".goto_previous" + options.themeName).die("click");
            $(".goto_previous" + options.themeName).live("click", function(e) {
                e.preventDefault();
                var act = "." + options.active;
                var newcurr = parseInt($("." + options.pagination_class).find(".active").attr("title")) - 1;
                set_cookie("current", newcurr);
                showPage(newcurr);
                $("." + options.pagination_class).remove();
                createPagination(newcurr);
            });
        });


    };
})(jQuery);