/**
 * FEBACalendar.js
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

(function($, undefined) {

    /*
     * *************************** Vars ***************************
     */

    var defaults = { //Object with default props of the calendar
        reset: false, // If to reset element every time
        cellDateFormat: "dd", // unused as of now
        view: "month", // month-widget, year
        //viewSequence:
        literals: { // Literals object for i18n
            dayOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            buttonText: {
                resetButton: "Reset",
                prevMonth: "&nbsp;&#9668;&nbsp;",
                nextMonth: "&nbsp;&#9658;&nbsp;",
                prevYear: "&nbsp;&#171;&nbsp;",
                nextYear: "&nbsp;&#187;&nbsp;",
                more: "More...",
                close: "Close view"
            },
            dropToDeleteSpace: "&nbsp;",
            eventDetailsTitle: "Event Details"
        },
        cellAspect: 1.2, // cell height to width ratio
        widgetCellAspect: 3, // cell height to width ratio for widget
        headerAspect: 6, // events height to width ratio
        defaultEventClass: "febacal-event-one", // default class when no other specified in the event
        lateInitiazation: {
            elementSelector: undefined,
            event: undefined
        },
        bindClickOnEvents: true,
        dropToDelete: true,
        yearView: {
            colums: 3,
            rows: 4
        },
        customHandlers: { // Customization and APIs
            preLoadNextMonth: undefined,
            postLoadNextMonth: undefined,
            preLoadPrevMonth: undefined,
            postLoadPrevMonth: undefined,
            preLoadNextYear: undefined,
            postLoadNextYear: undefined,
            preLoadPrevYear: undefined,
            postLoadPrevYear: undefined,
            preLoadReset: undefined,
            resetTimeValue: undefined,
            postLoadReset: undefined,
            customClickAction: undefined,
            disignClickDialog: undefined,
            showClickDialog: undefined,
            eventBehaviour: undefined,
            handleEventDrop: undefined,
            handleEventDeleteDrop: undefined,
            dragStart: undefined
        },
        events: [] // Array of event objects
    };

    var febaCalConstants = {
        EVENTID_PRE: "event_",
        PIXEL_SUF: "px",
        ANIM_SPEED: "fast",
        ROWCNT: 6,
        COLCNT: 7,
        PERCENT: "%",
        MORESPAN_PRE: "more_",
        CLOSESPAN_PRE: "close_",
        BINDSCOPE: ".febaCalendar",
        MONTH: "month",
        MONTHUX3: "month-ux3",
        MONTHWIDGET: "month-widget",
        MONTHWIDGETUX3: "month-widget-ux3",
        YEAR: "year",
        YEARWIDGET: "year-widget",
        NAVIGATION_ONLY: "navigationOnly",
        BLANKSTRING: "",
        NONBREAKINGSPACE: "&nbsp;"
    };

    var calFirstLoad = true;

    /* For reference
    // Format of the event object
     var eventSample={
    	displayText: "Ref Id.: 521",  //Mandatory
    	editable: true,
    	style: "febacal-event-nine",
    	date: new Date() //Mandatory,
    	_isValid : //internal element, will be added by code.
    	id : //internal element, will be added by code.
    	tooltip : required if tooltip to be shown
    	deleteEvent: function with delete action, added internally.
    	_deleteEvent: function with delete action, added internally.
    	
    	optional attrs/ usecase specific:
    	refId: "111",
    	counterparty: "myCP",
    	amount: "$101.11",
    	acct: "acct1",
    }
    */

    /*
     * Main calendar/Plugin object. wraps all internals and invokes the calendars objects.
     */
    var FEBACalendar = function(element, options) {
        var exposedPluginObj = this;
        /*
         * Main exposed method, to paint the calendar,
         * accepts element Id and optionally, options for the calendar
         */
        function paintCalendar(userOptions) {
            setOptions(userOptions); //set the passed options

            if (element.length != 1) { // throw error on invalid element: 0 or more than 1
                $.error("Element id passed should exists and be unique!");
            }

            //var check = initializeCalendar();
            if (initializeCalendar()) {
                if (calFirstLoad && defaults.lateInitiazation.elementSelector && defaults.lateInitiazation.event) {
                    delete calFirstLoad;
                    $(defaults.lateInitiazation.elementSelector).bind(defaults.lateInitiazation.event + febaCalConstants.BINDSCOPE, function() {
                        initializeCalendar();
                    });
                }
            }
        }

        /*
         * Extends the default options to include userSet options
         */
        function setOptions(userOptions) {
            if (userOptions && userOptions.events) {
                defaults.events = [];
            }
            defaults = $.extend(true, defaults, userOptions);
        }

        /*
         * Accepts the array of events and replaces the array in WM
         */
        function setEvents(eventArray) {
            defaults.events = eventArray;
        }

        /*
         * Accepts the array of events and appends to the array in WM
         */
        function addNewEvents(eventArray) {
            defaults.events = defaults.events.concat(eventArray);
        }

        /*
         * Destroys changes made by the calendar plugin to the dom and removes calendar
         */
        function destroy() {
            // Remove added classes and data from the element
            element.removeClass("febacal-container febacal-container-" + defaults.view)
                .removeData('febaCalInit').removeData('febaCalendar');

            // Remove added elements
            $(".febacal-view-header", element).remove();
            $(".febacal-clear-div", element).remove();
            $(".febacal-container-div", element).remove();

            // If calendar is yet to be initialized, unbind the bound function on passed element
            defaults.lateInitiazation.elementSelector ?
                $(defaults.lateInitiazation.elementSelector).unbind(febaCalConstants.BINDSCOPE) :
                $.noop();
        }

        //expose plug-in functions
        exposedPluginObj.paintCalendar = paintCalendar;
        exposedPluginObj.setOptions = setOptions;
        exposedPluginObj.setEvents = setEvents;
        exposedPluginObj.addNewEvents = addNewEvents;
        exposedPluginObj.destroy = destroy;

        /*
         * Initializes calendar code. If the calendar is initialized already, will return. if not and element
         * is hidden will wait for the passed event to proceed.
         */
        function initializeCalendar() {
            if (!element.data('febaCalInit') && element.width() != 0) {
                element.data('febaCalInit', true);
                $(defaults.lateInitiazation.elementSelector).unbind(febaCalConstants.BINDSCOPE);
            } else {
                return true;
            }

            initCalView();
            return false; //explicitly returning false;
        }

        /*
         * Creates the calendar object, populates methods and displays the calendar
         */
        function initCalView() {
            element.addClass("febacal-container"); // add default parent class
            if (defaults.view == febaCalConstants.MONTHWIDGET) {
                console.log('inside month widget loop');
                $(element).addClass("febacal-container-widget");
            }
            console.log('css after add class' + $(element).css('width'));
            var absCalView = jQuery.extend(true, {}, AbstractCalendarView);
            getCalView.call(absCalView); // add all methods

            // Call the reset view function to draw calendar, Changed for customization
            absCalView.resetCalView();
        }

        /*
         * Adds all required methods (common and view specific) to the calendar object
         */
        function getCalView() {
            var tThis = this;

            var instanceData = { // instanceData object
                parentElement: element,
                cellWidth: undefined,
                headerHeight: undefined,
                cellHeight: undefined,
                dayContentHeightPercent: undefined,
                dayContentHeight: undefined,
                moreSpanHeight: undefined,
                today: undefined,
                skeltonExists: undefined,
                eventIdSeries: 0
            };

            var transData = { // transData object
                calStart: undefined,
                calEnd: undefined,
                monthFirstDay: undefined,
                monthLastDay: undefined,
                yearFirstDay: undefined,
                yearLastDay: undefined,
                isDefaultLoadMonth: undefined,
                isDefaultLoadYear: undefined,
                currentEvents: undefined,
                onScreenEvents: $([]),
                onScreenDraggables: [],
                onScreenRecurringEvents: [] //TODO add the functionality
            };

            // Populate all common functions and utility methods.
            CommonFunctions.call(tThis, instanceData, transData);

            // Populate view specific functions.
            switch (defaults.view) {
                case febaCalConstants.MONTH:
                    element.addClass("febacal-container-" + febaCalConstants.MONTH);
                    MonthView.call(tThis, instanceData, transData);
                    break;
                case febaCalConstants.MONTHUX3:
                    element.addClass("febacal-container-" + febaCalConstants.MONTHUX3);
                    MonthViewUX3.call(tThis, instanceData, transData);
                    break;
                case febaCalConstants.MONTHWIDGET:
                    element.addClass("febacal-container-" + febaCalConstants.MONTHWIDGET);
                    console.log('inside switch' + element.css('width'));
                    //console.log("length of div"+jQuery('#paintCalendar').length);
                    //jQuery('#paintCalendar').append("<div id='dummyDiv' style='display:none;' class="+"febacal-container-"+febaCalConstants.MONTHWIDGET+"></div>");
                    //var dummyDivWidth=jQuery('#dummyDiv').css('width');
                    //console.log("dummyDivWidth"+dummyDivWidth);
                    //setTimeout(function(){MonthWidgetView.call(tThis, instanceData, transData)}, 10);
                    //alert('haha')
                    MonthWidgetView.call(tThis, instanceData, transData);
                    break;
                case febaCalConstants.MONTHWIDGETUX3:
                    element.addClass("febacal-container-" + febaCalConstants.MONTHWIDGETUX3);
                    console.log('inside switch' + element.css('width'));
                    //console.log("length of div"+jQuery('#paintCalendar').length);
                    //jQuery('#paintCalendar').append("<div id='dummyDiv' style='display:none;' class="+"febacal-container-"+febaCalConstants.MONTHWIDGET+"></div>");
                    //var dummyDivWidth=jQuery('#dummyDiv').css('width');
                    //console.log("dummyDivWidth"+dummyDivWidth);
                    //setTimeout(function(){MonthWidgetView.call(tThis, instanceData, transData)}, 10);
                    //alert('haha')
                    MonthWidgetViewUX3.call(tThis, instanceData, transData);
                    break;
                case febaCalConstants.YEAR:
                    element.addClass("febacal-container-" + febaCalConstants.YEAR);
                    YearView.call(tThis, instanceData, transData);
                    break;
                default:
                    defaults.view = febaCalConstants.MONTH;
                    element.addClass("febacal-container-" + febaCalConstants.MONTH);
                    MonthView.call(tThis, instanceData, transData);
            }
        }
    };

    /*
     * Abstract object of the calendar.
     */
    var AbstractCalendarView = {
        addListeners: function() {},
        resetCalView: function() {},
        refreshDayContent: function() {},
        getHeaderText: function() {
            return "";
        },
        getHeaderLeft: function() {
            return "";
        },
        getHeaderCenter: function() {
            return "";
        },
        getHeaderRight: function() {
            return "";
        },
        refreshSkeleton: function() {},
        paintSkeleton: function() {},
        positionEvents: function() {}
    };

    /*
     * Has all the common functions, independent of the type of view.
     */
    function CommonFunctions(instanceData, transData) {
        var tThis = this;

        // make methods
        tThis.calculateDates = calculateDates;
        tThis.incrementDays = incrementDays;
        tThis.incrementMonths = incrementMonths;
        tThis.incrementYears = incrementYears;
        tThis.clearTime = clearTime;
        tThis.cloneDate = cloneDate;
        tThis.getDateOfCell = getDateOfCell;
        tThis.getEventObject = getEventObject;
        tThis.getCellClass = getCellClass;
        tThis.painter = painter;
        tThis.sanitizeHTML = sanitizeHTML;

        /*
         * Paints the calendar view and draws other elements
         */
        function painter(element) {
            // check if the container is to be cleared.
            if (defaults.reset) {
                resetElement(element);
            }

            processEvents();
            initialPaintTasks(element);
            paintViewHeader(element);
            paintCalendarView(element);
            coverUpPaintTasks(element);
            tThis.addListeners(element);
            cleanUpWM(element);
        }

        /*
         * tidies up the events: makes date objects, booleans etc.
         */
        function processEvents() {
            var event = {};
            var eventsArray = defaults.events;
            for (var i = 0; i < eventsArray.length; i++) {
                event = eventsArray[i];
                if (event._isValid === undefined) {
                    //validate Event details passed
                    validateEvent(event);
                    // Generate and set the id
                    event.id = getNextEventId();
                    // Set the date if the passed value is not an instance of date
                    if (!(event.date instanceof Date)) {
                        event.date = new Date(event.date);
                    }
                    event.date = clearTime(event.date); // Clear time component from the event dates, 1s n for all!

                    // Add the delete event method.
                    event._deleteEvent = deleteEvent;
                    event.deleteEvent = deleteEvent;
                }
            }

            //TODO check the performance cost!
            defaults.events.sort(function(eventOne, eventTwo) {
                return +eventOne.date - +eventTwo.date;
            });

            // make a copy of the events array to be used while adding events.
            transData.currentEvents = $.extend([], defaults.events);

        }

        /*
         * Validates the event details passed.
         */
        function validateEvent(event) {
            // Validate the events passed.
            ( /*event.displayText && */ event.date /*&& event.style*/ ) ?
            event._isValid = true: event._isValid = false;
        }

        /*
         * Calculates and returns the next event Id
         */
        function getNextEventId() {
            return febaCalConstants.EVENTID_PRE + (instanceData.eventIdSeries++);
        }

        /*
         * Deletes the event from the WM and from UI
         */
        function deleteEvent() {
            var event;
            for (var i = 0; i < defaults.events.length; i++) {
                event = defaults.events[i];
                if (event.id === this.id) {
                    defaults.events.splice(i, 1);

                    var event = instanceData.parentElement.find("#" + event.id);
                    var parent = event.parents(".febacal-cell");
                    event.remove();

                    tThis.refreshDayContent(parent);
                    break;
                }
            }
        }

        /*
         * Does calculations / prerequisites for the calendar view
         */
        function initialPaintTasks(element) {
            // Check if the calendar skeleton is already painted and exists.
            instanceData.skeltonExists = element.has("div.febacal-view-header>table, div.febacal-container-div>table").length;

            var cols = (tThis.viewName === febaCalConstants.YEAR) ? defaults.yearView.colums : febaCalConstants.COLCNT;
            console.log("element" + $(element).attr('id'));
            console.log("element.width()" + $(element).css('width'));
            console.log("cellWidth" + instanceData.cellWidth || Math.round((element.width() - cols) / cols));
            instanceData.cellWidth = instanceData.cellWidth || Math.round((element.width() - cols) / cols);
            instanceData.headerHeight = instanceData.headerHeight || instanceData.cellWidth / defaults.headerAspect;
            instanceData.cellHeight = instanceData.cellHeight || ((defaults.view !== "month-widget") ?
                (instanceData.cellWidth / defaults.cellAspect) : (instanceData.cellWidth / defaults.widgetCellAspect));
            console.log("cellHeight" + instanceData.cellHeight || ((defaults.view !== "month-widget") ?
                (instanceData.cellWidth / defaults.cellAspect) : (instanceData.cellWidth / defaults.widgetCellAspect)));
        }

        /*
         * Paints the view header i.e. the controls.
         */
        function paintViewHeader(element) {
            if (instanceData.skeltonExists) {
                // Update only month header if the skeleton already exists.
                //element.find("div.febacal-view-header td.febacal-header-center td.febacal-header-center").insertAfter(tThis.getHeaderText());
                //$(tThis.getHeaderText()).insertAfter(element.find("div.febacal-view-header td.febacal-header-center td.febacal-header-center"));
                if (defaults && defaults.view && (defaults.view == "month-widget-ux3" || defaults.view == "month-ux3")) {
                    $(tThis.getHeaderText()).insertAfter(element.find("div.febacal-view-header td.febacal-header-center td.febacal-header-center"));
                } else {
                    element.find("div.febacal-view-header td.febacal-header-center td.febacal-header-center").text(tThis.getHeaderText());
                }

            } else {
                var table = $("<table />").prependTo($("<div class='febacal-view-header' />").prependTo(element));
                var str = "<tr class=\"febacal-headerRow\"><td class='febacal-header-left' >" + tThis.getHeaderLeft() +
                    "</td><td class='febacal-header-center'>" + tThis.getHeaderCenter() +
                    "</td><td class='febacal-header-right' >" + tThis.getHeaderRight() + "</td></tr>";
                $(str).appendTo(table);
                element.append("<div class='febacal-clear-div' >&nbsp;</dev>");
            }
        }

        /*
         * Paints the calendar view and adds events
         */
        function paintCalendarView(element) {

            if (instanceData.skeltonExists) {
                tThis.refreshSkeleton(element);
            } else {
                element = paintCalendarContainer(element); //jQuery element returned

                // Element from here on is the 'container div' for the calendar view and
                // not the actual element passed by the user.
                disableSelection(element);
                tThis.paintSkeleton(element); //alert('debugger');
            }

            tThis.positionEvents(element);
        }

        /*
         * Adds the main container div for the calendar.
         */
        function paintCalendarContainer(element) {
            return $("<div class='febacal-container-div' />").appendTo(element);
        }

        /*
         * disables the selection in the calendar container div so that while dragging
         * the contents, the cells are not heighlighted.
         */
        function disableSelection(element) {
            /*
             * Explanation of the code below:
             * 	Line 1: Is an old suggestion/attribute from MS@MSDN, makes no difference in IE7 at least, not sure about IE6.
             * 	Line 2: A collective class with CSS properties to disable selection, for all browsers that support this.
             * 			Need to dig into this to find out if this is required for all browsers mentioned or the next line can
             * 			work for them. binding event does not for in Mozilla for sure: can only Mozilla property suffice?
             * 	Line 3: Everything done but IE remains: so finally fix for IE.
             * 	More: http://bugs.jqueryui.com/attachment/ticket/4773/ie%20select%20fix.patch
             * 		http://bugs.jqueryui.com/ticket/4773
             * 		http://bugs.jqueryui.com/attachment/ticket/4773/ie%20select%20fix.patch
             */

            element.attr('unselectable', 'on')
                .addClass("febacal-select-disabled")
                .bind('selectstart.ui', function() {
                    return false;
                });
        }

        /*
         * Performs the calculations/tasks after the calendar has painted.
         */
        function coverUpPaintTasks(element) {
            //TODO perform covering up / cleaning up tasks.
        }

        /*
         * Cleanup the working memory after the painting of the view is done.
         */
        function cleanUpWM(element) {
            transData.currentEvents = undefined;
            transData.onScreenRecurringEvents = [];
            transData.onScreenDraggables = [];
            transData.onScreenEvents = $([]);
        }

        /*
         * *************************** Utility Methods ***************************
         */

        /*
         * Cleans the contents of the element passed.
         */
        function resetElement(element) {
            element.children().remove();
            element.empty();
        }

        /*
         * Does all the date calculations for the calendar. month first day, last day,
         * beginning day of the view and the last day as well.
         */
        function calculateDates(dt) {
            var today = clearTime(new Date()); // get today
            clearTime(dt); // Clear time of the date passed

            var monthFirstDay = cloneDate(dt);
            monthFirstDay.setDate(1); //Get the first day of the current month
            var monthLastDay = incrementMonths(cloneDate(monthFirstDay), 1);
            incrementDays(monthLastDay, -1); //get the last day of the current month

            var calStart = cloneDate(monthFirstDay);

            incrementDays(calStart, -calStart.getDay());
            var calEnd = cloneDate(calStart);
            incrementDays(calEnd, febaCalConstants.COLCNT * febaCalConstants.ROWCNT - 1);

            var yearFirstDay = cloneDate(monthFirstDay);
            yearFirstDay.setMonth(0);
            var yearLastDay = cloneDate(yearFirstDay);
            yearLastDay.setMonth(11);
            yearLastDay.setDate(31);

            var defaultLoad = defaults.customHandlers.resetTimeValue || today;

            instanceData.today = today;
            transData.calStart = calStart;
            transData.calEnd = calEnd;
            transData.monthFirstDay = monthFirstDay;
            transData.monthLastDay = monthLastDay;
            transData.yearFirstDay = yearFirstDay;
            transData.yearLastDay = yearLastDay;
            transData.isDefaultLoadMonth = !(defaultLoad < monthFirstDay || defaultLoad > monthLastDay);
            transData.isDefaultLoadYear = !(defaultLoad < yearFirstDay || defaultLoad > yearLastDay);
        }

        /*
         * increments the date passed with the number of days passed.
         */
        function incrementDays(dt, days) {
            var nOfdays = dt.getDate() + days;
            dt.setDate(nOfdays);
            return dt;
        }

        /*
         * increments the date passed with the number of months passed.
         */
        function incrementMonths(dt, incMonths) {
            var nOfMonths = dt.getMonth() + incMonths;
            dt.setMonth(nOfMonths);
            return dt;
        }

        /*
         * increments the date passed with the number of months passed.
         */
        function incrementYears(dt, incYears) {
            var nOfYears = dt.getFullYear() + incYears;
            dt.setFullYear(nOfYears);
            return dt;
        }

        /*
         * Clears the time from the date passed.
         */
        function clearTime(date) {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        }

        /*
         * returns the duplicate of the date passed.
         */
        function cloneDate(date) {
            return new Date(+date);
        }

        /*
         * Returns the date for the cell passed.
         */
        function getDateOfCell(cellId) {
            return incrementDays(cloneDate(transData.calStart), +cellId);
        }

        /*
         * Returns the event object from the working memory, for the event id passed.
         */
        function getEventObject(eventId) {
            var eventsArray = defaults.events;
            var event;
            for (var eventNum = 0, maxVal = eventsArray.length; eventNum < maxVal; eventNum++) {
                event = eventsArray[eventNum];
                if (event.id === eventId) {
                    break;
                }
            }
            return event;
        }

        /*
         * Return class name for the cell based on the date.
         */
        function getCellClass(dt) {
            if (+dt < +transData.monthFirstDay || +dt > +transData.monthLastDay) {
                return "febacal-outside-month";
            } else if (+instanceData.today == +dt) {
                var todayClass = "febacal-today";
                if (fC.isUX3 && fC.isUX3 == "true") {
                    todayClass = todayClass + "-ux3" + fC.themeName;
                }
                return todayClass;
            } else {
                return "febacal-monthDay";
            }
            /*if (+instanceData.today == dt){
            	return "febacal-today";
            } else if(dt >= +transData.monthFirstDay && dt =< +transData.monthLastDay){
            	return "febacal-monthDay";
            } else{
            	return "febacal-outside-month";
            }*/
        }

        /*
         * Encodes html characters, to avoid accidental expression of unwanted html, like script.
         */
        function sanitizeHTML(dirtyHTML) {
            return dirtyHTML.replace(/&/g, "&amp;").replace(/>/g, "&gt;")
                .replace(/</g, "&lt;").replace(/"/g, "&quot;")
                .replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
        }
    };


    /*
     * Object that has all the event handling knowledge.
     */
    function DOMEventHandler(instanceData, transData, handlersFor) {
        var tThis = this;

        // make functions
        var calculateDates = tThis.calculateDates;
        var incrementDays = tThis.incrementDays;
        var incrementMonths = tThis.incrementMonths;
        var incrementYears = tThis.incrementYears;
        var cloneDate = tThis.cloneDate;
        var getDateOfCell = tThis.getDateOfCell;
        var getEventObject = tThis.getEventObject;
        var painter = tThis.painter;

        // make methods
        tThis.resetCalView = resetCalView;
        tThis.showPrevMonth = showPrevMonth;
        tThis.showNextMonth = showNextMonth;
        tThis.showPrevYear = showPrevYear;
        tThis.showNextYear = showNextYear;
        tThis.showJumpedYear = showJumpedYear;
        tThis.showJumpedMonth = showJumpedMonth;
        tThis.refreshDayContent = refreshDayContent;

        if (!handlersFor || handlersFor != febaCalConstants.NAVIGATION_ONLY) {
            tThis.handleDrop = handleDrop;
            tThis.addDraggable = addDraggable;
            tThis.bindClickAction = bindClickAction;
        }

        /*
         * Handles actions performed on drop of an event in the droppable cell.
         */
        function handleDrop(droppable, event, ui) {
            var draggable = ui.draggable;
            var isDeleteAction = $(droppable).hasClass("febacal-delete-space");
            // Indicate that a process is ongoing by showing a 'progress' cursor
            draggable.addClass("febacal-indicate-progress");

            /*
             * Function gets called when the ajax call after the drop returns error.
             */
            function onDropError(jqXHR, textStatus, errorThrown) {
                draggable.removeClass("febacal-indicate-progress");
                draggable.animate(draggable.data().position, febaCalConstants.ANIM_SPEED);
                draggable.removeData("parentId").removeData("position");
            }

            // Call the custom method for handling the drop of event if defined, or call the success method.
            if (isDeleteAction) {
                var eventObject = getEventObject(ui.draggable[0].id);

                /*
                 * Function passed as success handler for delete action.
                 */
                function onDropDeleteEvent() {
                    eventObject._deleteEvent();
                }

                $.isFunction(defaults.customHandlers.handleEventDeleteDrop) ?
                    defaults.customHandlers.handleEventDeleteDrop({
                        droppable: droppable,
                        event: event,
                        ui: ui,
                        eventObject: eventObject,
                        dropDate: getDateOfCell(droppable.id)
                    }, {
                        onSuccuess: onDropDeleteEvent,
                        onError: onDropError
                    }) :
                    // If custom not defined call the success method.
                    eventObject._deleteEvent();
            } else {
                /*
                 * Function that gets called when the ajax call after the drop returns success
                 */
                function onDropSuccess(data, textStatus, jqXHR) {
                    ui.draggable.removeClass("febacal-indicate-progress");
                    acceptDraggable(droppable, draggable, true);
                    refreshDayContent(droppable);
                    refreshParentsEvents(draggable);
                    saveDropInWM(droppable, draggable);
                }

                $.isFunction(defaults.customHandlers.handleEventDrop) ?
                    defaults.customHandlers.handleEventDrop({
                        droppable: droppable,
                        event: event,
                        ui: ui,
                        eventObject: getEventObject(ui.draggable[0].id),
                        dropDate: getDateOfCell(droppable.id)
                    }, {
                        onSuccuess: onDropSuccess,
                        onError: onDropError
                    }) :
                    // If custom not defined call the success method.
                    onDropSuccess();
            }
        }

        /*
         * Refresh the locations of the events the draggable was removed from.
         */
        function refreshParentsEvents(draggable) {
            var parentId = draggable.data().parentId;
            draggable.removeData("parentId").removeData("position");
            var parent = instanceData.parentElement.find("#" + parentId);
            var eventlist = parent.find("div.febacal-event"); //TODO check and remove

            refreshDayContent(parent);
        }

        /*
         * Calculate the new location for the draggable optionally moves the draggable
         * to the new cell, also animates the draggable to the new location and returns
         * the new location of the draggable.
         */
        function acceptDraggable(droppable, draggable, moveDraggable) {
            var lastEvent = $(droppable).find("div.febacal-event:visible").last();
            var newLocation = {}; // location data: top and left positions

            if (!lastEvent.length) {
                newLocation = $(droppable).find("div.febacal-day-content div.febacal-day-content-reference").position();
            } else {
                newLocation.top = lastEvent.position().top + lastEvent.outerHeight(true);
                newLocation.left = lastEvent.position().left;
            }

            if (moveDraggable) {
                (draggable.detach()).appendTo($(droppable).find("div.febacal-day-content")); //move the element to the current cell.
            }

            // draggable.animate(newLocation,febaCalConstants.ANIM_SPEED); // animate to correct location.
            // animate will no longer be valid as with the new method, the positions will be defined at the time
            // of page load itself, and will now result in haphazard animations.
            draggable.css(newLocation);
        }

        /*
         * Updates the event details in the working memory.
         */
        function saveDropInWM(droppable, draggable) {
            //dh.profile("saveDropInWM");
            getEventObject(draggable[0].id).date = getDateOfCell(droppable.id);
            //dh.profileEnd();
        }

        /*
         * Master Handler for events in a cell.
         */
        function refreshDayContent(droppable) {
            var dayContents = $(droppable).find("div.febacal-day-content");
            var dayEvents = $(droppable).find("div.febacal-event");
            var position = {};

            //get the reference position for the cell
            position = dayContents.find("div.febacal-day-content-reference").position();

            // Get current more and close spans.
            var moreSpan = $(droppable).find(".febacal-show-more-events");
            var closeSpan = $(droppable).find(".febacal-close-more-events");

            dayEvents.each(function() {
                var thisEvent = $(this);
                thisEvent.animate(position, febaCalConstants.ANIM_SPEED);
                //Optionally: thisEvent.css(position); can clear animations on page load, parent refresh etc.
                position.top += thisEvent.outerHeight(true);

                // If the next element can not be fit (top position+outerHeight), this must be hidden.
                // i.e. there should always be enough space to show the 'more' button in a cell!
                if (dayContents.height() - position.top < instanceData.moreSpanHeight) {
                    // first check the already hidden element count, hide this one.
                    var hiddenEleCount = dayContents.find("div.febacal-event:hidden").length;
                    thisEvent.hide();

                    // If there are any elements already hidden, the listeners etc will already have been
                    // added and will not need to be added again, so skip this part.
                    if (!hiddenEleCount) {
                        // show 'more' and hide 'close'
                        moreSpan.show(); //TODO Optionally expand it to match the width of the event.
                        closeSpan.hide();
                        var newLocation = {}; //hold the 'position' object
                        var hiddenEle;

                        // Add listener and action for 'more' button.
                        moreSpan.click(function() {

                            // TODO Check performance
                            /*console.profile(".last() method");
                            $(droppable).find("div.febacal-event:visible").last()
                            console.profileEnd();*/

                            /*console.profile(":last selector");
                            $(droppable).find("div.febacal-event:visible:last");
                            console.profileEnd();*/

                            //$(droppable).find("div.febacal-event:visible").last() can not be cached into a variable, cause the
                            // value of the 'last' is constantly changing! Causes issues in the calculation.
                            newLocation = $(droppable).find("div.febacal-event:visible").last().position() || {
                                top: 0,
                                left: 0
                            };
                            hiddenEle = $(droppable).find("div.febacal-event:hidden");

                            // Show all elements and add the height of all and finally set the height to cell.
                            hiddenEle.each(function() {
                                var thisHiddenEle = $(this);
                                newLocation.top = newLocation.top + $(droppable).find("div.febacal-event:visible").last().outerHeight(true);
                                thisHiddenEle.show();
                                thisHiddenEle.css(newLocation);
                            });

                            dayContents.height(newLocation.top +
                                $(droppable).find("div.febacal-event:visible").last().outerHeight(true) +
                                instanceData.moreSpanHeight);

                            // hide 'more' and show 'close'
                            $(this).hide();
                            closeSpan.show();
                        });

                        // Add listener and action for 'close' button.
                        closeSpan.click(function() {
                            dayContents.height(instanceData.dayContentHeight);
                            $(this).hide(); // hide 'close'
                            moreSpan.show(); // show 'more'

                            //run reverse function to hide events.
                            var dayEvents = $(droppable).find("div.febacal-event");
                            dayEvents.each(function() {
                                var currentDayEvent = $(this);
                                if (dayContents.height() - (currentDayEvent.position().top + currentDayEvent.outerHeight(true)) <
                                    instanceData.moreSpanHeight) {
                                    currentDayEvent.hide();
                                }
                            });

                            // Check if any events have been dragged out and if there is a need for
                            // 'more' and close 'buttons'. Remove if unnecessary.
                            refreshMoreHandlers(droppable, closeSpan, moreSpan);
                        });
                    }
                } else {
                    // If the event fits, show it.
                    thisEvent.show();
                }

                //FIXME test thoroughly, hurried fix here.. start
                refreshMoreHandlers(droppable, closeSpan, moreSpan); //Had moved here from out -- test again.

            });

            //FIXME test thoroughly, hurried fix here.. end
            //refreshMoreHandlers(droppable, closeSpan, moreSpan);
        }

        /*
         * This method checks if more and close handlers are still required in
         * the current cell, if not hides them.
         */
        function refreshMoreHandlers(droppable, closeSpan, moreSpan) {
            // if there are no hidden elements
            if (!$(droppable).find("div.febacal-event:hidden").length) {
                // And if the day contents are closed, hide the 'more'
                // and 'close' spans and remove the listeners.
                if ($(droppable).find("div.febacal-day-content").height() == instanceData.dayContentHeight) {
                    moreSpan.unbind("click").hide();
                    closeSpan.unbind("click").hide();
                } else {
                    // Else i.e. if its not closed, hide 'more' and show 'close'
                    moreSpan.hide();
                    closeSpan.show();
                }
            }
        }

        /*
         * Makes the passed event a draggable.
         */
        function addDraggable(eventDiv) {
            eventDiv.draggable({
                revert: "invalid",
                opacity: 0.7,
                delay: 100,
                zIndex: 3,
                start: function() {
                    var thisDraggable = $(this);
                    if ($.browser.msie) {
                        //A fix for the z-index implementation issue in IE
                        thisDraggable.parents('.febacal-day-content').css("z-index", 1);
                    }

                    // Disable tooltip for the time the drag is happening
                    thisDraggable.data("disableFEBAToolTip", true);

                    // Add details of original location of the draggable to the draggable object
                    thisDraggable.data("parentId", thisDraggable.parents('.febacal-cell')[0].id);
                    thisDraggable.data("position", thisDraggable.position());

                    // Call custom handler for the start of drag
                    if ($.isFunction(defaults.customHandlers.dragStart)) {
                        defaults.customHandlers.dragStart(thisDraggable, getEventObject(thisDraggable[0].id));
                    }
                },
                stop: function() {
                    // Enable tooltip now that the drag has stopped
                    $(this).removeData("disableFEBAToolTip");
                    //$(this).removeData("parentId");
                    //$(this).removeData("position");
                }
            });
        }

        /*
         * Binds the onclick event for displaying the event details
         */
        function bindClickAction() {
            if ($.isFunction(defaults.customHandlers.customClickAction)) {
                transData.onScreenEvents.each(function(i, eventDiv) {
                    $(eventDiv).bind("click", function() {
                        defaults.customHandlers.customClickAction(getEventObject($(this)[0].id));
                    });
                });
            } else {
                transData.onScreenEvents.each(function(i, eventDiv) {
                    $(eventDiv).bind("click", function() {
                        var eventObject = getEventObject($(this)[0].id);
                        var dialogDiv = $("#febacal-EventDialogDiv");

                        /*
                         * Add the dialog div only once on the page and reuse, as being a modal dialog,
                         * only one will be required at a time.
                         */
                        if (!dialogDiv.length) {
                            dialogDiv = $("<div id='febacal-EventDialogDiv' class='febacal-dialog-div' title='" +
                                defaults.literals.eventDetailsTitle + "' />");
                            dialogDiv.appendTo(instanceData.parentElement);
                        }

                        var dialogProps = {};
                        $.isFunction(defaults.customHandlers.disignClickDialog) ?
                            dialogProps = defaults.customHandlers.disignClickDialog(dialogDiv, eventObject) :
                            defaultDialog(dialogDiv, eventObject);

                        $.isFunction(defaults.customHandlers.showClickDialog) ?
                            defaults.customHandlers.showClickDialog(dialogDiv, dialogProps) :
                            dialogDiv.dialog($.extend(true, dialogProps, {
                                modal: true
                            }));
                    });
                });
            }
        }

        /*
         * default implementation of disignClickDialog
         */
        function defaultDialog(dialogDiv, eventObject) {
            var str = "";
            for (var i in eventObject) {
                str += "<span>" + i + " : " + eventObject[i] + "</span><br />";
            }
            dialogDiv.html(str);
        }

        /*
         * handles the button click to show next month in the calndar.
         */
        function showNextMonth() {
            //dh.profile("showNextMonth", "fullLoadProfile");
            calculateDates(incrementMonths(cloneDate(transData.monthFirstDay), 1));

            $.isFunction(defaults.customHandlers.preLoadNextMonth) ?
                // Call custom method before loading next month.
                defaults.customHandlers.preLoadNextMonth(+transData.calStart, +transData.calEnd, function() {
                    painter(instanceData.parentElement);
                }) :
                // else call callback
                painter(instanceData.parentElement);

            // Call custom method after loading the next month.
            if ($.isFunction(defaults.customHandlers.postLoadNextMonth)) {
                defaults.customHandlers.postLoadNextMonth();
            }
            convertComboboxes();
            //dh.profileEnd("fullLoadProfile");
        }

        /*
         * handles the button click to show previous month in the calndar.
         */
        function showPrevMonth() {
            //dh.profile("showPrevMonth", "fullLoadProfile");
            calculateDates(incrementMonths(cloneDate(transData.monthFirstDay), -1));

            $.isFunction(defaults.customHandlers.preLoadPrevMonth) ?
                // Call the custom method before loading the previous month.
                defaults.customHandlers.preLoadPrevMonth(+transData.calStart, +transData.calEnd, function() {
                    painter(instanceData.parentElement);
                }) :
                //Else call callback
                painter(instanceData.parentElement);

            // Call the custom method after loading the previous month.
            if ($.isFunction(defaults.customHandlers.postLoadPrevMonth)) {
                defaults.customHandlers.postLoadPrevMonth();
            }
            convertComboboxes();
            //dh.profileEnd("fullLoadProfile");
        }

        /*
         * resets the calendar view to the default i.e. the current month view.
         */
        function resetCalView() {
            //dh.profile("resetCalView", "fullLoadProfile");
            var newCal;

            // Check if reset override is defined, call it.
            if (!defaults.customHandlers.resetTimeValue) {
                newCal = new Date();
            } else {
                newCal = new Date(defaults.customHandlers.resetTimeValue);
            }
            calculateDates(newCal);

            $.isFunction(defaults.customHandlers.preLoadReset) ?
                // Call the custom method before resetting the calendar view.
                defaults.customHandlers.preLoadReset(+transData.calStart, +transData.calEnd, function() {
                    painter(instanceData.parentElement);
                }) :
                // Else call callback
                painter(instanceData.parentElement);

            // Call the custom method after resetting the calendar view.
            if ($.isFunction(defaults.customHandlers.postLoadReset)) {
                defaults.customHandlers.postLoadReset();
            }
            convertComboboxes();
            //dh.profileEnd("fullLoadProfile");
        }

        /*
         * handles the button click to show next year in the calndar.
         */
        function showNextYear() {
            //dh.profile("showNextYear", "fullLoadProfile");
            calculateDates(incrementYears(cloneDate(transData.yearFirstDay), 1));

            $.isFunction(defaults.customHandlers.preLoadNextYear) ?
                // Call custom method before loading next month.
                defaults.customHandlers.preLoadNextYear(+transData.calStart, +transData.calEnd, function() {
                    painter(instanceData.parentElement);
                }) :
                // else call callback
                painter(instanceData.parentElement);

            // Call custom method after loading the next month.
            if ($.isFunction(defaults.customHandlers.postLoadNextYear)) {
                defaults.customHandlers.postLoadNextYear();
            }
            convertComboboxes();
            //dh.profileEnd("fullLoadProfile");
        }

        /*
         * handles the button click to show previous month in the calndar.
         */
        function showPrevYear() {
            //dh.profile("showPrevYear", "fullLoadProfile");
            calculateDates(incrementYears(cloneDate(transData.yearFirstDay), -1));

            $.isFunction(defaults.customHandlers.preLoadPrevYear) ?
                // Call the custom method before loading the previous month.
                defaults.customHandlers.preLoadPrevYear(+transData.calStart, +transData.calEnd, function() {
                    painter(instanceData.parentElement);
                }) :
                //Else call callback
                painter(instanceData.parentElement);

            // Call the custom method after loading the previous month.
            if ($.isFunction(defaults.customHandlers.postLoadPrevYear)) {
                defaults.customHandlers.postLoadPrevYear();
            }
            convertComboboxes();
            //dh.profileEnd("fullLoadProfile");
        }

        function showJumpedYear() {
            var selectedYear = parseInt(this.value);
            var newCal = new Date();
            //dh.profile("showPrevYear", "fullLoadProfile");
            calculateDates(incrementYears(cloneDate(newCal), selectedYear));

            $.isFunction(defaults.customHandlers.preLoadPrevYear) ?
                // Call the custom method before loading the previous month.
                defaults.customHandlers.preLoadPrevYear(+transData.calStart, +transData.calEnd, function() {
                    painter(instanceData.parentElement);
                }) :
                //Else call callback
                painter(instanceData.parentElement);

            // Call the custom method after loading the previous month.
            if ($.isFunction(defaults.customHandlers.postLoadPrevYear)) {
                defaults.customHandlers.postLoadPrevYear();
            }
            convertComboboxes();
            //dh.profileEnd("fullLoadProfile");
        }

        function showJumpedMonth() {
            //dh.profile("showPrevMonth", "fullLoadProfile");
            var selectedMonth = parseInt(this.value);
            var newCal = transData.yearFirstDay;
            var currMonth = parseInt(newCal.getMonth());
            var diffInValues = selectedMonth - currMonth;
            calculateDates(incrementMonths(cloneDate(newCal), diffInValues));

            $.isFunction(defaults.customHandlers.preLoadPrevMonth) ?
                // Call the custom method before loading the previous month.
                defaults.customHandlers.preLoadPrevMonth(+transData.calStart, +transData.calEnd, function() {
                    painter(instanceData.parentElement);
                }) :
                //Else call callback
                painter(instanceData.parentElement);

            // Call the custom method after loading the previous month.
            if ($.isFunction(defaults.customHandlers.postLoadPrevMonth)) {
                defaults.customHandlers.postLoadPrevMonth();
            }
            convertComboboxes();
            //dh.profileEnd("fullLoadProfile");
        }
    };

    /*
     * Month view of the calendar
     */
    function MonthView(instanceData, transData) {
        var tThis = this;
        tThis.viewName = febaCalConstants.MONTH;

        // make functions
        var getDateOfCell = tThis.getDateOfCell;
        var getCellClass = tThis.getCellClass;

        DOMEventHandler.call(tThis, instanceData, transData); // Add DOM event handling methods

        var handleDrop = tThis.handleDrop;
        var addDraggable = tThis.addDraggable;
        var resetCalView = tThis.resetCalView;
        var showPrevMonth = tThis.showPrevMonth;
        var showNextMonth = tThis.showNextMonth;
        //var paintEventDesc=tThis.paintEventDesc;
        var refreshDayContent = tThis.refreshDayContent;
        var bindClickAction = tThis.bindClickAction;
        var sanitizeHTML = tThis.sanitizeHTML;

        // make methods
        tThis.refreshSkeleton = refreshSkeleton;
        tThis.paintSkeleton = paintSkeleton;
        tThis.positionEvents = positionEvents;
        tThis.getHeaderText = getHeaderText;
        tThis.getHeaderCenter = getHeaderCenter;
        tThis.getHeaderRight = getHeaderRight;
        if (defaults.dropToDelete) {
            tThis.getHeaderLeft = getHeaderLeft;
        };
        tThis.addListeners = addListeners;

        /*
         * Refreshes the contents of the skeleton, without repainting the entire table.
         */
        function refreshSkeleton(element) {
            // Remove all events, hide all close and more buttons and unbind them.
            element.find(".febacal-event").remove();
            element.find(".febacal-close-more-events, .febacal-show-more-events").unbind("click").hide();

            // For all table cells, loop over and populate contents.
            var calTable = element.find(".febacal-container-div td");
            calTable.removeClass("febacal-outside-month febacal-monthDay febacal-today");
            calTable.each(function() {
                var td = $(this);
                var dt = getDateOfCell(td[0].id); // Get date of cell
                td.addClass(getCellClass(+dt)); // Remove all cell classes and add relevant class.
                td.find(".febacal-cell-date").text(dt.getDate()); // Update the date in the cell.
                findAndAddEvents(dt, td.find(".febacal-day-content")); // Add events to the cell.
            });

            // Add the id to the onscreen events for binding with click event.
            transData.onScreenEvents = element.find('.febacal-event');
        }

        /*
         * Creates the calendar base view on the page
         */
        function paintSkeleton(element) {

            var table = $("<table />").appendTo(element);

            var colCnt = febaCalConstants.COLCNT;
            var rowCnt = febaCalConstants.ROWCNT;
            var weekLiterals = defaults.literals.dayOfWeek;
            var moreButtonLiteral = defaults.literals.buttonText.more;
            var closeButtonLiteral = defaults.literals.buttonText.close;
            var tr = febaCalConstants.BLANKSTRING,
                td = febaCalConstants.BLANKSTRING,
                dt, cellId;

            var tHead = "<thead><tr id=''>";
            for (var i = 0; i < colCnt; i++) {
                td += "<th class='febacal-header' style='width:" + instanceData.cellWidth +
                    ";height" + instanceData.headerHeight + "'>" + weekLiterals[i] + "</th>";
            }
            tHead += td + "</tr></thead>";
            table.append(tHead);

            var tBody = "<tbody>";
            for (var i = 0; i < rowCnt; i++) {
                tr += "<tr id='tr" + i + "'>";
                for (var j = 0; j < colCnt; j++) {
                    cellId = colCnt * i + j;
                    dt = getDateOfCell(cellId);
                    //Adjust the td width and height based on container
                    td = "<td class='febacal-cell " + getCellClass(+dt) + "' id='" + cellId + "'>" +
                        "<div class='febacal-cell-date' >" + dt.getDate() + "</div>" +
                        "<div class='febacal-day-content'><div class='febacal-day-content-reference'></div>" +
                        "<span class='febacal-show-more-events' title='Click to view all transactions' id='" + febaCalConstants.MORESPAN_PRE + cellId + "'>" +
                        moreButtonLiteral + "</span><span class='febacal-close-more-events' title='Click to view few transactions' id='" +
                        febaCalConstants.CLOSESPAN_PRE + cellId + "'>" + closeButtonLiteral + "</span>";
                    tr += findAndAddEvents(dt, td) + "</div></td>";
                }
                tr += "</tr>";
            }
            table.append(tBody + tr + "</tbody>");
            table.find('th').width(instanceData.cellWidth).height(instanceData.headerHeight);
            table.find('td').width(instanceData.cellWidth).height(instanceData.cellHeight);

            // Add the id to the onscreen events for binding with click event.
            transData.onScreenEvents = table.find('.febacal-event');
        }

        /*
         * loops over the passed events and adds events to the calendar, cell by cell
         * Also maintains the arrays of onscreen events etc.
         */
        function findAndAddEvents(dt, dc) {
            var event = {};
            for (var i = 0; i < transData.currentEvents.length; i++) {
                event = transData.currentEvents[i];
                if (event._isValid) {
                    if (+dt === +event.date) {
                        dc = addEvents(event, dc);
                        transData.currentEvents.splice(i, 1);
                        i--;
                    }
                }
            }
            return dc;
        }

        /*
         * Forms the event div, sets properties and adds the events
         * returns id of the event. Adds event id to list of draggables if the event is editable.
         */
        function addEvents(event, dc) {
            var eventDiv = "<div id='" + event.id + "' class='febacal-event " +
                (event.style ? sanitizeHTML(event.style) : defaults.defaultEventClass) +
                "' title = '" +
                (event.tooltip ? sanitizeHTML(event.tooltip) : febaCalConstants.BLANKSTRING) +
                "' ><span class='febacal-event-text' >" +
                (event.displayText ? sanitizeHTML(event.displayText) : febaCalConstants.NONBREAKINGSPACE) +
                "</span></div>";

            if (event.editable === true || event.editable === "true") { // check if its a draggable!
                transData.onScreenDraggables[transData.onScreenDraggables.length] = event.id;
            }

            (typeof dc === "string") ? dc += eventDiv: dc.append(eventDiv);

            //acceptDraggable(td, eventStr);
            // Attempts to position the event elements here itself have failed as the table is not yet painted,
            // and everything just points to 0,0. so all stack up over in the upper left corner of the screen..
            // this should probably be done after the table is painted.
            //return event.id;
            return dc;
        }

        /*
         * Based on the cell properties the event is in, calculates the location of the event
         * and also sets width.
         * LOW performance improvement possiblities.
         */
        function positionEvents(element) {
            var cellWidth = 0;
            var border = 0;
            var padding = 0;
            var margin = 0;
            var allCells = element.find("table .febacal-cell");
            var dayContents = allCells.find("div.febacal-day-content");

            // This sets the height of the daycontent div. without this calculation
            // if we set the daycontent height as 100%, it causes the cell to expand, and daycontent takes the
            // height of the cell instead.
            instanceData.dayContentHeightPercent = instanceData.dayContentHeightPercent ||
                (instanceData.cellHeight - allCells.find("div.febacal-cell-date").outerHeight(true)) / instanceData.cellHeight * 100;
            dayContents.height(instanceData.dayContentHeightPercent + febaCalConstants.PERCENT);

            //ALONE BREAKING IE, needs next line: allCells.find("div.febacal-day-content").height(dayContentHtPercent+febaCalConstants.PERCENT);
            //BREAKING CHROME: allCells.find("div.febacal-day-content").height(allCells.find("div.febacal-day-content").height());
            var eventlist = allCells.find("div.febacal-event");
            cellWidth = allCells.width();

            if (eventlist.length) {
                border = +(eventlist.css("border-left-width").replace(febaCalConstants.PIXEL_SUF, "")) +
                    +(eventlist.css("border-right-width").replace(febaCalConstants.PIXEL_SUF, ""));
                padding = +(eventlist.css("padding-left").replace(febaCalConstants.PIXEL_SUF, "")) +
                    +(eventlist.css("padding-right").replace(febaCalConstants.PIXEL_SUF, ""));
                margin = +(eventlist.css("margin-left").replace(febaCalConstants.PIXEL_SUF, "")) +
                    +(eventlist.css("margin-right").replace(febaCalConstants.PIXEL_SUF, ""));

                // TODO: Fix issue of width in IE.
                /*alert("border: "+border+", padding: "+padding+", margin: "+margin+
                		", calcWidh-required: "+(cellWidth-(padding+margin))+", calcWidh-htmlWorks: "+(cellWidth-border)+
                		", try3: width: "+(cellWidth-border)+"px");*/

                //Based on obsevation!
                if ($.browser.msie) {
                    //eventlist.width(cellWidth-border);
                    //eventlist.css({width: (cellWidth-border)+"px"});
                    eventlist.width(cellWidth - (padding + margin)); //This works in the application
                } else if ($.browser.webkit) {
                    eventlist.width(cellWidth - (padding + margin));
                } else {
                    eventlist.width(cellWidth - (border + padding + margin));
                }
            }

            //Exporting constants for the view.
            instanceData.dayContentHeight = dayContents.height();
            instanceData.moreSpanHeight = dayContents.find(".febacal-show-more-events").outerHeight(true);

            // setting the height in pixels..
            allCells.find("div.febacal-day-content").height(instanceData.dayContentHeight);

            allCells.each(function() {
                refreshDayContent($(this));
            });
        }

        /*
         * Helper in paintViewHeader, returns the central table name and year string.
         */
        function getHeaderCenter() {
            var str = "<table><tr>";
            str += "<td class='febacal-text-right' ><span id='febacal-PrevMonth' class='febacal-calendar-button-wrapper' >" +
                "<span class='febacal-calendar-button' >" + defaults.literals.buttonText.prevMonth + "</span></span></td>";
            str += "<td class='febacal-header-center'>" + getHeaderText() + "</td>";
            str += "<td class='febacal-text-left'><span id='febacal-NextMonth' class='febacal-calendar-button-wrapper' >" +
                "<span class='febacal-calendar-button' >" + defaults.literals.buttonText.nextMonth + "</span></span></td>";
            str += "</tr></table>";

            return str;
        }

        /*
         * Returns the text contained in the header of the view.
         */
        function getHeaderText() {
            return defaults.literals.months[transData.monthFirstDay.getMonth()] + ", " + transData.monthFirstDay.getFullYear();
        }

        /*
         * returns the reset button string
         */
        function getHeaderRight() {
            return "<span id='febacal-ResetView' class='febacal-calendar-button-wrapper febacal-margin-right' >" +
                "<span class='febacal-calendar-button' >&nbsp;" + defaults.literals.buttonText.resetButton + "&nbsp;</span></span>";
        }

        /*
         * Returns left part of the header.
         */
        function getHeaderLeft() {
            return "<div class='febacal-delete-space febacal-margin-left' >" + defaults.literals.dropToDeleteSpace + "</div>";
        }

        /*
         * Adds event listeners for buttons, draggables and droppables.
         */
        function addListeners() {
            var parentElement = instanceData.parentElement;
            if (!instanceData.skeltonExists) {
                parentElement.find("#febacal-NextMonth").bind('click' + febaCalConstants.BINDSCOPE, showNextMonth); //next month button
                parentElement.find("#febacal-PrevMonth").bind('click' + febaCalConstants.BINDSCOPE, showPrevMonth); //previous month button

                // Add droppables
                parentElement.find(".febacal-cell").add(".febacal-delete-space").droppable({
                    accept: function(draggable) {
                        return (draggable.hasClass("febacal-event") &&
                            $(this)[0].id != draggable.data().parentId) ? true : false;
                    },
                    hoverClass: "febacal-cell-hover-class",
                    drop: function(event, ui) {
                        handleDrop(this, event, ui);
                    }
                });
            }

            var resetButton = parentElement.find("#febacal-ResetView");

            if (!transData.isDefaultLoadMonth) {
                if (resetButton.hasClass('febacal-calendar-button-disabled-wrapper')) {
                    resetButton.removeClass('febacal-calendar-button-disabled-wrapper')
                        .bind('click' + febaCalConstants.BINDSCOPE, resetCalView)
                        .children().removeClass('febacal-calendar-button-disabled');
                }
            } else {
                resetButton.addClass('febacal-calendar-button-disabled-wrapper')
                    .unbind(+febaCalConstants.BINDSCOPE)
                    .find("span").addClass('febacal-calendar-button-disabled');
            }

            // Add draggables, looping over for events added
            var onScreenDraggables = transData.onScreenDraggables;
            for (var onScreenDraggableId = 0; onScreenDraggableId < onScreenDraggables.length; onScreenDraggableId++) {
                addDraggable(parentElement.find("#" + onScreenDraggables[onScreenDraggableId]));
            }

            // Add the click event and tooltip
            if (defaults.bindClickOnEvents) {
                bindClickAction();
            }
            if ($.isFunction(defaults.customHandlers.eventBehaviour)) {
                defaults.customHandlers.eventBehaviour(transData.onScreenEvents);
            }
        }
    };
    /*
     * Month UX3 view of the calendar
     */
    function MonthViewUX3(instanceData, transData) {
        var tThis = this;
        tThis.viewName = febaCalConstants.MONTHUX3;


        // make functions
        var getDateOfCell = tThis.getDateOfCell;
        var getCellClass = tThis.getCellClass;

        DOMEventHandler.call(tThis, instanceData, transData); // Add DOM event handling methods

        var handleDrop = tThis.handleDrop;
        var addDraggable = tThis.addDraggable;
        var resetCalView = tThis.resetCalView;
        var showPrevMonth = tThis.showPrevMonth;
        var showNextMonth = tThis.showNextMonth;
        var showNextYear = tThis.showNextYear;
        var showPrevYear = tThis.showPrevYear;
        var showJumpedYear = tThis.showJumpedYear;
        var showJumpedMonth = tThis.showJumpedMonth;
        //var paintEventDesc=tThis.paintEventDesc;
        var refreshDayContent = tThis.refreshDayContent;
        var bindClickAction = tThis.bindClickAction;
        var sanitizeHTML = tThis.sanitizeHTML;

        // make methods
        tThis.refreshSkeleton = refreshSkeleton;
        tThis.paintSkeleton = paintSkeleton;
        tThis.positionEvents = positionEvents;
        tThis.getHeaderText = getHeaderText;
        tThis.getHeaderCenter = getHeaderCenter;
        tThis.getHeaderRight = getHeaderRight;
        if (defaults.dropToDelete) {
            tThis.getHeaderLeft = getHeaderLeft;
        };
        tThis.addListeners = addListeners;
        var themeName = fC.themeName;
        //alert(themeName);

        /*
         * Refreshes the contents of the skeleton, without repainting the entire table.
         */
        function refreshSkeleton(element) {
            // Remove all events, hide all close and more buttons and unbind them.
            element.find(".febacal-event").remove();
            element.find(".febacal-close-more-events, .febacal-show-more-events").unbind("click").hide();

            // For all table cells, loop over and populate contents.
            var calTable = element.find(".febacal-container-div td");
            calTable.removeClass("febacal-outside-month febacal-monthDay febacal-today febacal-today-ux3");
            calTable.each(function() {
                var td = $(this);
                var dt = getDateOfCell(td[0].id); // Get date of cell
                td.addClass(getCellClass(+dt)); // Remove all cell classes and add relevant class.
                td.find(".febacal-cell-date").text(dt.getDate()); // Update the date in the cell.
                findAndAddEvents(dt, td.find(".febacal-day-content")); // Add events to the cell.
            });

            // Add the id to the onscreen events for binding with click event.
            transData.onScreenEvents = element.find('.febacal-event');
        }

        /*
         * Creates the calendar base view on the page
         */
        function paintSkeleton(element) {
            if ($('.febacal-container-month-ux3').find('.ui-state-default').length == 0) {
                setTimeout(function() {
                    console.log('inside settimeout');
                    feba.domManipulator.styleComboboxes((jQuery('select[id^="feba-cal-yearDropdown"]')));
                    feba.domManipulator.styleComboboxes((jQuery('select[id^="feba-cal-monthDropdown"]')));
                }, 1000);
            }
            var table = $("<table />").appendTo(element);
            $('.febacal-view-header').children('table').addClass('feba-cal-headerwrapper' + themeName);
            $('.febacal-container-div').children('table').addClass('feba-cal-container-table-wrapper' + themeName);
            $('.febacal-container-div').children('table').attr("title", getMessage("CalClicktoviewdetails"));
            $('.febacal-clear-div').hide();
            $('.febacal-headerRow').addClass('febacal-headerRow-ux3');
            $('.febacal-header-left').addClass('febacal-header-left-monthviewux3' + themeName);
            $('.febacal-header-left-ux3' + themeName).attr('title', getMessage("CalPreviousMonth"));
            $('.febacal-header-right').addClass('febacal-header-right-ux3' + themeName);
            $('.febacal-header-right-ux3' + themeName).attr('title', getMessage("CalNextMonth"));

            var colCnt = febaCalConstants.COLCNT;
            var rowCnt = febaCalConstants.ROWCNT;
            var weekLiterals = defaults.literals.dayOfWeek;
            var moreButtonLiteral = defaults.literals.buttonText.more;
            var closeButtonLiteral = defaults.literals.buttonText.close;
            var tr = febaCalConstants.BLANKSTRING,
                td = febaCalConstants.BLANKSTRING,
                dt, cellId;
            var headerColClassname = 'feba-cal-colheader-wrapper' + themeName;
            var headerClassname = 'febacal-header-ux3' + themeName;

            var tHead = "<thead><tr id=''>";
            for (var i = 0; i < colCnt; i++) {
                td += "<th class='febacal-header-center' style='background-color:#D2DEEF;color:black;width:" + instanceData.cellWidth +
                    ";height" + instanceData.headerHeight + "'>" + weekLiterals[i] + "</th>";
            }
            tHead += td + "</tr></thead>";
            table.append(tHead);

            var tBody = "<tbody>";
            for (var i = 0; i < rowCnt; i++) {
                tr += "<tr id='tr" + i + "'>";
                for (var j = 0; j < colCnt; j++) {
                    cellId = colCnt * i + j;
                    dt = getDateOfCell(cellId);
                    //Adjust the td width and height based on container
                    td = "<td class='febacal-cell " + getCellClass(+dt) + "' id='" + cellId + "'>" +
                        "<div class='febacal-cell-date' >" + dt.getDate() + "</div>" +
                        "<div class='febacal-day-content'><div class='febacal-day-content-reference'></div>" +
                        "<span class='febacal-show-more-events' title='Click to view all transactions' id='" + febaCalConstants.MORESPAN_PRE + cellId + "'>" +
                        moreButtonLiteral + "</span><span class='febacal-close-more-events' title='Click to view few transactions' id='" +
                        febaCalConstants.CLOSESPAN_PRE + cellId + "'>" + closeButtonLiteral + "</span>";
                    tr += findAndAddEvents(dt, td) + "</div></td>";
                }
                tr += "</tr>";
            }
            table.append(tBody + tr + "</tbody>");
            table.find('th').width(instanceData.cellWidth).height(instanceData.headerHeight);
            table.find('td').width(instanceData.cellWidth).height(instanceData.cellHeight);

            // Add the id to the onscreen events for binding with click event.
            transData.onScreenEvents = table.find('.febacal-event');
            var vpWidth = viewport().width;
            if (jQuery.browser.safari && vpWidth < 640) {
                jQuery(".feba-cal-container-table-wrapper").css("width", "281px");
            }
        }

        /*
         * loops over the passed events and adds events to the calendar, cell by cell
         * Also maintains the arrays of onscreen events etc.
         */
        function findAndAddEvents(dt, dc) {
            var event = {};
            for (var i = 0; i < transData.currentEvents.length; i++) {
                event = transData.currentEvents[i];
                if (event._isValid) {
                    if (+dt === +event.date) {
                        dc = addEvents(event, dc);
                        transData.currentEvents.splice(i, 1);
                        i--;
                    }
                }
            }
            return dc;
        }

        /*
         * Forms the event div, sets properties and adds the events
         * returns id of the event. Adds event id to list of draggables if the event is editable.
         */
        function addEvents(event, dc) {
            var eventDiv = "<div id='" + event.id + "' class='febacal-event " +
                (event.style ? sanitizeHTML(event.style) : defaults.defaultEventClass) +
                "' title = '" +
                (event.tooltip ? sanitizeHTML(event.tooltip) : febaCalConstants.BLANKSTRING) +
                "' ><span class='febacal-event-text' >" +
                (event.displayText ? sanitizeHTML(event.displayText) : febaCalConstants.NONBREAKINGSPACE) +
                "</span></div>";

            if (event.editable === true || event.editable === "true") { // check if its a draggable!
                transData.onScreenDraggables[transData.onScreenDraggables.length] = event.id;
            }

            (typeof dc === "string") ? dc += eventDiv: dc.append(eventDiv);

            //acceptDraggable(td, eventStr);
            // Attempts to position the event elements here itself have failed as the table is not yet painted,
            // and everything just points to 0,0. so all stack up over in the upper left corner of the screen..
            // this should probably be done after the table is painted.
            //return event.id;
            return dc;
        }

        /*
         * Based on the cell properties the event is in, calculates the location of the event
         * and also sets width.
         * LOW performance improvement possiblities.
         */
        function positionEvents(element) {
            var cellWidth = 0;
            var border = 0;
            var padding = 0;
            var margin = 0;
            var allCells = element.find("table .febacal-cell");
            var dayContents = allCells.find("div.febacal-day-content");

            // This sets the height of the daycontent div. without this calculation
            // if we set the daycontent height as 100%, it causes the cell to expand, and daycontent takes the
            // height of the cell instead.
            instanceData.dayContentHeightPercent = instanceData.dayContentHeightPercent ||
                (instanceData.cellHeight - allCells.find("div.febacal-cell-date").outerHeight(true)) / instanceData.cellHeight * 100;
            dayContents.height(instanceData.dayContentHeightPercent + febaCalConstants.PERCENT);

            //ALONE BREAKING IE, needs next line: allCells.find("div.febacal-day-content").height(dayContentHtPercent+febaCalConstants.PERCENT);
            //BREAKING CHROME: allCells.find("div.febacal-day-content").height(allCells.find("div.febacal-day-content").height());
            var eventlist = allCells.find("div.febacal-event");
            cellWidth = allCells.width();

            if (eventlist.length) {
                border = +(eventlist.css("border-left-width").replace(febaCalConstants.PIXEL_SUF, "")) +
                    +(eventlist.css("border-right-width").replace(febaCalConstants.PIXEL_SUF, ""));
                padding = +(eventlist.css("padding-left").replace(febaCalConstants.PIXEL_SUF, "")) +
                    +(eventlist.css("padding-right").replace(febaCalConstants.PIXEL_SUF, ""));
                margin = +(eventlist.css("margin-left").replace(febaCalConstants.PIXEL_SUF, "")) +
                    +(eventlist.css("margin-right").replace(febaCalConstants.PIXEL_SUF, ""));

                // TODO: Fix issue of width in IE.
                /*alert("border: "+border+", padding: "+padding+", margin: "+margin+
                		", calcWidh-required: "+(cellWidth-(padding+margin))+", calcWidh-htmlWorks: "+(cellWidth-border)+
                		", try3: width: "+(cellWidth-border)+"px");*/

                //Based on obsevation!
                if ($.browser.msie) {
                    //eventlist.width(cellWidth-border);
                    //eventlist.css({width: (cellWidth-border)+"px"});
                    eventlist.width(cellWidth - (padding + margin)); //This works in the application
                } else if ($.browser.webkit) {
                    eventlist.width(cellWidth - (padding + margin));
                } else {
                    eventlist.width(cellWidth - (border + padding + margin));
                }
            }

            //Exporting constants for the view.
            instanceData.dayContentHeight = dayContents.height();
            instanceData.moreSpanHeight = dayContents.find(".febacal-show-more-events").outerHeight(true);

            // setting the height in pixels..
            allCells.find("div.febacal-day-content").height(instanceData.dayContentHeight);

            allCells.each(function() {
                refreshDayContent($(this));
            });
        }

        /*
         * Helper in paintViewHeader, returns the central table name and year string.
         */
        function getHeaderCenter() {
            var imageSrc = imagePath + '/db_pagi_left_active.png';
            var prevMonthClass = 'feba-cal-monthwidget-prevmonthbutton' + themeName;
            var str = "<table><tr>";
            str += "<td> <span title=\"" + getMessage("CalDeleteTransaction") + "\" class='febacal-delete-space febacal-margin-left' style='position: relative;right: 3px;top: 6px;border: none;'>" + defaults.literals.dropToDeleteSpace + "</span></td>";
            str += "<td> <span class='febacal-text-right febacal-margin-left' ><span id='febacal-PrevMonth' class='febacal-calendar-button-wrapper-ux3 feba-cal-monthwidget-prevmonthwrapper '>";
            str += "<span class=\"" + 'febacal-calendar-button-ux3 ' + prevMonthClass + "\" style='position:relative;padding-left:3px;padding-bottom:10px;top:8px;' >" + '&nbsp;' + "</span></span></span></td>";
            str += "<td title=\"" + getMessage("CalResettotoday") + "\"><span id='febacal-ResetView' class='febacal-calendar-resetbutton-wrapper' style='font-size: 12px;position: relative;bottom: 12px;'>";
            str += "<span class='febacal-calendar-resetbutton-clearright' >&nbsp;&nbsp;&nbsp;</span>"
            str += "<span class='febacal-calendar-resetbutton' >&nbsp;" + defaults.literals.buttonText.resetButton + "&nbsp;</span></span></td>";
            str += "<td class='febacal-header-center'>" + getHeaderText() + "</td>";

            var imageSrc = imagePath + '/db_pagi_right_active.png';
            var nextMonthClass = 'feba-cal-monthwidget-nextmonthbutton' + themeName;
            str += "<td><span class='febacal-text-left febacal-margin-right'><span id='febacal-NextMonth' class='febacal-calendar-button-wrapper-ux3 feba-cal-monthwidgetnextmonthwrapper' >" +
                "<span class=\"" + 'febacal-calendar-button-ux3 ' + nextMonthClass + "\" style='position: relative;padding-right: 15px;top: 8px;padding-bottom: 7px;' >" + '&nbsp;' + "</span></span></span></td>";

            str += "</tr></table>";

            return str;
        }

        /*
         * Returns the text contained in the header of the view.
         */
        function getHeaderText() {
            var selectedYear = 0;
            var selectedMonth = 0;
            if (!defaults.customHandlers.resetTimeValue) {
                newCal = new Date();
            } else {
                //newCal = new Date(defaults.customHandlers.resetTimeValue);
            }
            var yearVal = parseInt(newCal.getFullYear());
            var monthVal = parseInt(newCal.getMonth());
            var yearJumpDropdown = "";
            var monthJumpDropdown = "";
            var currYear = newCal.getFullYear();
            if (!transData.isDefaultLoadMonth && !transData.isDefaultLoadYear && $('#feba-cal-yearDropdown') && $('#feba-cal-yearDropdown').length > 0) {

                //selectedYear = parseInt($('#feba-cal-yearDropdown')[0].value);
                selectedYear = parseInt((transData.yearFirstDay).getFullYear());
            } else {
                //selectedYear=yearVal;
                selectedYear = parseInt((transData.yearFirstDay).getFullYear());
            }
            if (!transData.isDefaultLoadMonth && !transData.isDefaultLoadYear && $('#feba-cal-monthDropdown') && $('#feba-cal-monthDropdown').length > 0) {

                //selectedMonth = parseInt($('#feba-cal-monthDropdown')[0].value);
                selectedMonth = parseInt((transData.monthFirstDay).getMonth());
            } else {
                //selectedMonth=monthVal;
                selectedMonth = parseInt((transData.monthFirstDay).getMonth());
            }

            $('.febacal-jumpmonth-header-center' + themeName).remove();
            $('.febacal-jumpyear-header-center' + themeName).remove();
            /*var newCal;
			
			
            // Check if reset override is defined, call it.
            if (!transData.isDefaultLoadMonth && !transData.isDefaultLoadYear){
            	newCal = new Date();
            } else {
            	newCal = new Date(defaults.customHandlers.resetTimeValue);
            }*/
            var yearJumpDropdown = "";
            var monthJumpDropdown = "";
            var currYear = newCal.getFullYear();
            var i = parseInt(currYear) - 10;
            var j = parseInt(currYear) + 10;
            //console.log('1');
            var count = parseInt(-10);
            yearJumpDropdown = yearJumpDropdown + "<select id='feba-cal-yearDropdown' title=\"" + getMessage("CalSelectYear") + "\" class='jumpYearUX3'>";
            while (parseInt(i) <= j) {
                var selectedString = "";
                if ((selectedYear - yearVal) === count) {
                    selectedString = "selected ";
                }
                yearJumpDropdown = yearJumpDropdown + "<option " + selectedString + " value='" + count + "'>" + i + "</option>";
                //console.log('i is'+i);
                i = parseInt(i) + 1;
                count = parseInt(count) + 1;
            }
            yearJumpDropdown = yearJumpDropdown + "</select>"
            monthJumpDropdown = getMonthDropDown(selectedMonth);
            //return '<td>'+defaults.literals.months[transData.monthFirstDay.getMonth()]+"</td>, "+transData.monthFirstDay.getFullYear()+"<td class='febacal-jumpyear-header-center'>" + yearJumpDropdown + "</td>"+"<td class='febacal-jumpmonth-header-center'>" + monthJumpDropdown + "</td>";
            var febacaljumpyearheaderClass = 'febacal-jumpyear-header-center' + themeName;
            var febacaljumpMonthheaderClass = 'febacal-jumpmonth-header-center' + themeName;
            //return "<td title=\""+getMessage("CalSelectYear")+"\" class=\""+febacaljumpyearheaderClass+"\">" +'<span class=\'yeardropdownouterwrapperspan\'><span class=\'yeardropdownwrapperspan\'>'+ yearJumpDropdown +'</span></span>' + "</td>"+"<td title=\""+getMessage("CalSelectMonth")+"\" class=\""+febacaljumpMonthheaderClass+"\">" +'<span class=\'monthdropdownouterwrapperspan\'><span class=\'monthdropdownwrapperspan\'>'+ monthJumpDropdown +'</span></span>' + "</td>";
            return "<td title=\"" + getMessage("CalSelectMonth") + "\" class=\"" + febacaljumpMonthheaderClass + "\">" + "<span class=\'monthdropdownouterwrapperspan\'><span class=\'monthdropdownwrapperspan\'>" + monthJumpDropdown + "</span></span>" + "</td>" + "<td title=\"" + getMessage("CalSelectYear") + "\" class=\"" + febacaljumpyearheaderClass + "\">" + "<span class=\'yeardropdownouterwrapperspan\'><span class=\'yeardropdownwrapperspan\'>" + yearJumpDropdown + "</span></span>" + "</td>";
        }


        function getMonthDropDown(selectedMonth) {

            var monthJumpDropdown = "";
            monthJumpDropdown = monthJumpDropdown + "<select id='feba-cal-monthDropdown' title=\"" + getMessage("CalSelectMonth") + "\" class='jumpMonth'>"
            var monthList = defaults.literals.months;

            for (i = 0; i <= 11; i++) {
                var selectedString = "";
                if (i == selectedMonth) {
                    selectedString = "selected";
                }
                monthJumpDropdown = monthJumpDropdown + "<option " + selectedString + " value='" + i + "'>" + monthList[i] + "</option>";
            }
            monthJumpDropdown = monthJumpDropdown + "</select>"
            return monthJumpDropdown;
        }


        /*
         * returns the right part of the header
         */
        function getHeaderRight() {
            return "";
        }

        /*
         * Returns left part of the header.
         */
        function getHeaderLeft() {
            return "<span class='scheduleTxnHeader'>Scheduled Transaction</span>";
        }

        /*
         * Adds event listeners for buttons, draggables and droppables.
         */
        function addListeners() {
            var parentElement = instanceData.parentElement;
            if (!instanceData.skeltonExists) {
                parentElement.find("#febacal-NextMonth").bind('click' + febaCalConstants.BINDSCOPE, showNextMonth); //next month button
                parentElement.find("#febacal-PrevMonth").bind('click' + febaCalConstants.BINDSCOPE, showPrevMonth); //previous month button
                parentElement.find("#feba-cal-yearDropdown").live('change' + febaCalConstants.BINDSCOPE, showJumpedYear);
                parentElement.find("#feba-cal-monthDropdown").live('change' + febaCalConstants.BINDSCOPE, showJumpedMonth);

                // Add droppables
                parentElement.find(".febacal-cell").add(".febacal-delete-space").droppable({
                    accept: function(draggable) {
                        return (draggable.hasClass("febacal-event") &&
                            $(this)[0].id != draggable.data().parentId) ? true : false;
                    },
                    hoverClass: "febacal-cell-hover-class",
                    drop: function(event, ui) {
                        handleDrop(this, event, ui);
                    }
                });
            }

            var resetButton = parentElement.find("#febacal-ResetView");

            if (!transData.isDefaultLoadMonth) {
                if (resetButton.hasClass('febacal-calendar-resetbutton-disabled-wrapper')) {
                    resetButton.removeClass('febacal-calendar-resetbutton-disabled-wrapper')
                        .bind('click' + febaCalConstants.BINDSCOPE, resetCalView)
                        .children().removeClass('febacal-calendar-resetbutton-disabled');
                }
            } else {
                resetButton.addClass('febacal-calendar-resetbutton-disabled-wrapper')
                    .unbind(+febaCalConstants.BINDSCOPE)
                    .find("span").addClass('febacal-calendar-resetbutton-disabled');
            }

            // Add draggables, looping over for events added
            var onScreenDraggables = transData.onScreenDraggables;
            for (var onScreenDraggableId = 0; onScreenDraggableId < onScreenDraggables.length; onScreenDraggableId++) {
                addDraggable(parentElement.find("#" + onScreenDraggables[onScreenDraggableId]));
            }

            // Add the click event and tooltip
            if (defaults.bindClickOnEvents) {
                bindClickAction();
            }
            if ($.isFunction(defaults.customHandlers.eventBehaviour)) {
                defaults.customHandlers.eventBehaviour(transData.onScreenEvents);
            }
        }
    };
    /*
     * Calendar month widget view.
     */
    function MonthWidgetView(instanceData, transData) {
        var tThis = this;
        tThis.viewName = febaCalConstants.MONTHWIDGET;

        // make functions
        var getDateOfCell = tThis.getDateOfCell;
        var getCellClass = tThis.getCellClass;

        DOMEventHandler.call(tThis, instanceData, transData, febaCalConstants.NAVIGATION_ONLY); // Add DOM event handling methods

        var resetCalView = tThis.resetCalView;
        var showPrevMonth = tThis.showPrevMonth;
        var showNextMonth = tThis.showNextMonth;
        var refreshDayContent = tThis.refreshDayContent;

        // make methods
        tThis.refreshSkeleton = refreshSkeleton;
        tThis.paintSkeleton = paintSkeleton;
        tThis.getHeaderText = getHeaderText;
        tThis.getHeaderLeft = getHeaderLeft;
        tThis.getHeaderCenter = getHeaderCenter;
        tThis.getHeaderRight = getHeaderRight;
        tThis.addListeners = addListeners;

        /*
         * Creates the calendar base view on the page
         */
        function paintSkeleton(element) {

            var table = $("<table />").appendTo(element);

            var colCnt = febaCalConstants.COLCNT;
            var rowCnt = febaCalConstants.ROWCNT;
            var weekLiterals = defaults.literals.dayOfWeek;
            var tr = febaCalConstants.BLANKSTRING,
                td = febaCalConstants.BLANKSTRING,
                dt, cellId;

            var tHead = "<thead><tr id=''>";
            for (var i = 0; i < colCnt; i++) {
                td += "<th class='febacal-header'>" + weekLiterals[i] + "</th>";
            }
            tHead += td + "</tr></thead>";
            table.append(tHead);

            var tBody = "<tbody>";
            for (var i = 0; i < rowCnt; i++) {
                tr += "<tr id='tr" + i + "'>";
                for (var j = 0; j < colCnt; j++) {
                    cellId = colCnt * i + j;
                    dt = getDateOfCell(cellId);
                    //Adjust the td width and height based on container
                    td = "<td class='febacal-cell " + getCellClass(+dt) + highlightEventDay(dt) + "' id='" + cellId + "'>";
                    td += "<div class='febacal-cell-date' >" + dt.getDate() + "</div>";
                    tr += td + "</td>";
                }
                tr += "</tr>";
            }
            table.append(tBody + tr + "</tbody>");
            table.find('th').width(instanceData.cellWidth).height(instanceData.headerHeight);
            table.find('td').width(instanceData.cellWidth).height(instanceData.cellHeight);
        }

        /*
         * loops over the passed events and adds events to the calendar, cell by cell
         * Also maintains the arrays of onscreen events etc.
         */
        function highlightEventDay(dt, td) {
            var event = {};
            var returnClass = febaCalConstants.BLANKSTRING;
            for (var i = 0; i < transData.currentEvents.length; i++) {
                event = transData.currentEvents[i];
                if (event._isValid) {
                    if (+dt === +event.date) {
                        returnClass = (!returnClass) ? ' febacal-day-content-has-event' : returnClass;
                        td ? td.addClass('febacal-day-content-has-event') : td;
                        transData.currentEvents.splice(i, 1);
                        i--;
                    }
                }
            }
            return returnClass;
        }

        /*
         * Helper in paintViewHeader, returns the central table name and year string.
         */
        function getHeaderCenter() {
            var str = "<table><tr>";
            str += "<td class='febacal-header-center'>" + getHeaderText() + "</td>";
            str += "<td><span id='febacal-ResetView' class='febacal-calendar-button-wrapper' >";
            str += "<span class='febacal-calendar-button' >&nbsp;" + defaults.literals.buttonText.resetButton + "&nbsp;</span></span></td>";
            str += "</tr></table>";

            return str;
        }

        /*
         * Returns the text contained in the header of the view.
         */
        function getHeaderText() {
            return defaults.literals.months[transData.monthFirstDay.getMonth()] + ", " + transData.monthFirstDay.getFullYear();
        }

        /*
         * returns the right part of the header
         */
        function getHeaderRight() {
            return "<span class='febacal-text-left febacal-margin-right'><span id='febacal-NextMonth' class='febacal-calendar-button-wrapper' >" +
                "<span class='febacal-calendar-button' >" + defaults.literals.buttonText.nextMonth + "</span></span></span>";
        }
        /*
         * Returns left part of the header.
         */
        function getHeaderLeft() {
            return "<span class='febacal-text-right febacal-margin-left' ><span id='febacal-PrevMonth' class='febacal-calendar-button-wrapper' >" +
                "<span class='febacal-calendar-button' >" + defaults.literals.buttonText.prevMonth + "</span></span></span>";
        }

        /*
         * Add event listeners for next and prev months and reset
         */
        function addListeners() {
            var parentElement = instanceData.parentElement;
            if (!instanceData.skeltonExists) {
                parentElement.find("#febacal-NextMonth").bind('click' + febaCalConstants.BINDSCOPE, showNextMonth); //next month button
                parentElement.find("#febacal-PrevMonth").bind('click' + febaCalConstants.BINDSCOPE, showPrevMonth); //previous month button
            }

            var resetButton = parentElement.find("#febacal-ResetView");

            if (!transData.isDefaultLoadMonth) {
                if (resetButton.hasClass('febacal-calendar-button-disabled-wrapper')) {
                    resetButton.removeClass('febacal-calendar-button-disabled-wrapper')
                        .bind('click' + febaCalConstants.BINDSCOPE, resetCalView)
                        .children().removeClass('febacal-calendar-button-disabled');
                }
            } else {
                resetButton.addClass('febacal-calendar-button-disabled-wrapper')
                    .unbind(+febaCalConstants.BINDSCOPE)
                    .find("span").addClass('febacal-calendar-button-disabled');
            }
        }

        /*
         * Refreshes the contents of the skeleton, without repainting the entire table.
         */
        function refreshSkeleton(element) {
            /*// For all table cells, loop over and populate contents.
            var calTable = element.find(".febacal-container-div td");
            calTable.removeClass("febacal-outside-month febacal-monthDay febacal-today febacal-day-content-has-event");
            calTable.each(function(){
            	var td = $(this);
            	var dt = getDateOfCell(td[0].id); // Get date of cell
            	td.addClass(getCellClass(+dt)); // Remove all cell classes and add relevant class.
            	td.find(".febacal-cell-date").text(dt.getDate()); // Update the date in the cell.
            	highlightEventDay(dt,td); // Add events to the cell.
            });*/
            var t = $(">.febacal-container-div", element);
            paintSkeleton(t.empty());
        }

    };
    /*
     * Calendar month widget view.
     */
    function MonthWidgetViewUX3(instanceData, transData) {
        console.log("INSIDE UX3:::::::::");
        var tThis = this;
        tThis.viewName = febaCalConstants.MONTHWIDGET;

        // make functions
        var getDateOfCell = tThis.getDateOfCell;
        var getCellClass = tThis.getCellClass;

        DOMEventHandler.call(tThis, instanceData, transData, febaCalConstants.NAVIGATION_ONLY); // Add DOM event handling methods

        var resetCalView = tThis.resetCalView;
        var showPrevMonth = tThis.showPrevMonth;
        var showNextMonth = tThis.showNextMonth;
        var showNextYear = tThis.showNextYear;
        var showPrevYear = tThis.showPrevYear;
        var showJumpedYear = tThis.showJumpedYear;
        var showJumpedMonth = tThis.showJumpedMonth;
        var refreshDayContent = tThis.refreshDayContent;

        // make methods
        tThis.refreshSkeleton = refreshSkeleton;
        tThis.paintSkeleton = paintSkeleton;
        tThis.getHeaderText = getHeaderText;
        tThis.getHeaderLeft = getHeaderLeft;
        tThis.getHeaderCenter = getHeaderCenter;
        tThis.getHeaderRight = getHeaderRight;
        tThis.addListeners = addListeners;
        var themeName = fC.themeName;
        //tThis.paintEventDesc=paintEventDesc;

        /*
         * Creates the calendar base view on the page
         */
        function paintSkeleton(element) {
            if ($('.febacal-container-month-widget-ux3').find('.ui-state-default').length == 0) {
                setTimeout(function() {
                    console.log('inside settimeout');
                    feba.domManipulator.styleComboboxes((jQuery('select[id^="feba-cal-yearDropdown"]')));
                    feba.domManipulator.styleComboboxes((jQuery('select[id^="feba-cal-monthDropdown"]')));
                }, 1000);
            }
            var table = $("<table />").appendTo(element);
            $('.febacal-view-header').children('table').addClass('feba-cal-headerwrapper' + themeName);
            $('.febacal-container-div').children('table').addClass('feba-cal-container-table-wrapper' + themeName);
            $('.febacal-container-div').children('table').attr("title", getMessage("CalClicktoviewdetails"));
            $('.febacal-clear-div').hide();
            $('.febacal-headerRow').addClass('febacal-headerRow-ux3');
            $('.febacal-header-left').addClass('febacal-header-left-ux3' + themeName);
            $('.febacal-header-left-ux3' + themeName).attr('title', getMessage("CalPreviousMonth"));
            $('.febacal-header-right').addClass('febacal-header-right-ux3' + themeName);
            $('.febacal-header-right-ux3' + themeName).attr('title', getMessage("CalNextMonth"));

            var colCnt = febaCalConstants.COLCNT;
            var rowCnt = febaCalConstants.ROWCNT;
            var weekLiterals = defaults.literals.dayOfWeek;
            var tr = febaCalConstants.BLANKSTRING,
                td = febaCalConstants.BLANKSTRING,
                dt, cellId;
            var headerColClassname = 'feba-cal-colheader-wrapper' + themeName;
            var headerClassname = 'febacal-header-ux3' + themeName;
            var tHead = "<thead><tr class=\"" + headerColClassname + "\" id=''>";
            for (var i = 0; i < colCnt; i++) {
                td += "<th class=\"" + headerClassname + "\">" + weekLiterals[i] + "</th>";
            }
            tHead += td + "</tr></thead>";
            table.append(tHead);
            var currentDateCell = "";
            var cellHoldingFirstDay = "";
            var tBody = "<tbody>";
            for (var i = 0; i < rowCnt; i++) {
                tr += "<tr id='tr" + i + "'>";
                for (var j = 0; j < colCnt; j++) {
                    cellId = colCnt * i + j;
                    dt = getDateOfCell(cellId);
                    //Adjust the td width and height based on container
                    //console.log('before my code');
                    var containerClass = febaCalConstants.BLANKSTRING;
                    var currEventArray = new Array();
                    var calEventCountClass = "calEventCountWhite" + themeName;
                    currEventArray = transData.currentEvents.slice(0);
                    //console.log('currEventArray'+currEventArray);
                    var totalNumEvents = parseInt(highlightEventDay(dt));
                    //console.log('currEventArray'+currEventArray);
                    if (totalNumEvents > 0) {
                        containerClass = ' febacal-day-content-has-event-ux3';
                        var currentDate = new Date();
                        var day = currentDate.getDate();
                        var month = currentDate.getMonth() + 1;
                        var year = currentDate.getFullYear();
                        currentDate = month + "/" + day + "/" + year;
                        var currentDate = new Date(currentDate);
                        var dtday = dt.getDate();
                        var dtmonth = dt.getMonth() + 1;
                        var dtyear = dt.getFullYear();
                        var transactionDate = new Date();
                        transactionDate = dtmonth + "/" + dtday + "/" + dtyear;
                        var transactionDate = new Date(transactionDate);
                        if (transactionDate > currentDate) {
                            calEventCountClass = 'calEventCountRed' + themeName;
                        } else {
                            calEventCountClass = 'calEventCountPurple' + themeName;
                        }
                    } else {
                        totalNumEvents = "";
                    }
                    var cellClass = 'febacal-cell-ux3' + themeName;
                    td = "<td class=\"" + cellClass + " " + getCellClass(+dt) + containerClass + "\" id='" + cellId + "'>";
                    td += "<div class='" + calEventCountClass + "'>" + totalNumEvents + "</div><div class='febacal-cell-date' >" + dt.getDate() + "</div>";
                    var tdElement = td + "</td>";
                    //if(totalNumEvents>0){
                    var eventsArrayForDate = new Array();
                    eventsArrayForDate = currEventArray;
                    var dateOfEvent = new Date();
                    dateOfEvent = dt;
                    if (+instanceData.today == +dt) {
                        currentDateCell = cellId;
                    }
                    if (1 == parseInt(+dt.getDate()) && (transData.monthFirstDay.getMonth() == parseInt(+dt.getMonth()))) {
                        cellHoldingFirstDay = cellId;
                    }
                    $('#' + cellId).live('click', function(event) {

                        paintEventDesc(this.id);
                    });
                    //}
                    tr += tdElement;
                }
                tr += "</tr>";
            }
            table.append(tBody + tr + "</tbody>");
            table.find('th').width(instanceData.cellWidth).height(instanceData.headerHeight);
            table.find('td').width(instanceData.cellWidth).height(instanceData.cellHeight);
            if (currentDateCell.length == 0) {
                currentDateCell = cellHoldingFirstDay;
            }
            paintEventDesc(currentDateCell);

            var vpWidth = viewport().width;
            if (jQuery.browser.safari && vpWidth < 640) {
                jQuery(".feba-cal-container-table-wrapper").css("width", "281px");
            }

        }

        function paintEventDesc(dt) {
            var events = defaults.events;
            var idOfCell = "";
            idOfCell = dt;
            if ($('.febacal-container-month-widget-ux3').parents('.widget-body').find('.widgetErrorDisplayHw').length > 0) {
                $('.febacal-container-month-widget-ux3').parents('.widget-body').find('.widgetErrorDisplayHw').remove();
            }
            $('.febacal-selected-ux3' + themeName).removeClass('febacal-selected-ux3' + themeName);
            if (!$('#' + dt).hasClass('febacal-today-ux3' + themeName)) {
                $('#' + dt).addClass('febacal-selected-ux3' + themeName);
            }
            var event = "";
            var returnClass = febaCalConstants.BLANKSTRING;
            var numEventsForDate = 0;
            var eventDesc = "";
            var ulId = "";
            var classForLi = 'eventDescLiWrappr' + themeName;
            var classForUl = 'calendarEventDesc';
            //eventDesc=eventDesc+"<ul class='calendarEventDesc'>";
            var appendToElement = jQuery('#paintCalendar');
            if (jQuery('.calendarEventDesc')) {
                jQuery('.eventHeading').remove();
                jQuery('.calendarEventDesc').remove();
            }
            if (jQuery('.calendarPagination')) {
                //jQuery('.calendarPaginationWrapper').remove();
                jQuery('.calendarPagination').remove();
            }
            var noEventAvailable = true;


            var eventCountCheck = 0;
            for (var i = 0; i < events.length; i++) {
                event = events[i];
                if (event._isValid) {
                    if (+(getDateOfCell(idOfCell)) === +event.date) {
                        eventCountCheck = eventCountCheck + 1;
                        noEventAvailable = false;
                        //eventDesc=eventDesc+("<li>");
                        var referenceNo = event.refNo;
                        var totalAmount = event.txnAmount;
                        var txnTypeDesc = fC.txnDesc[event.txntype].desc
                        var link = event.viewDetailsURL;

                        var anchorElement = document.createElement("a");

                        anchorElement.href = link;
                        var anchorId = referenceNo + "_" + idOfCell + '_anchor';
                        anchorElement.id = anchorId;

                        // link.setAttribute("rel","nofollow");

                        // anchorElement.innerHTML="<span>"+txnTypeDesc+"</span>";
                        var eventDetailsSpanClass = 'eventDetailsLeft' + themeName;
                        anchorElement = jQuery(anchorElement).wrapInner("<span title=\"" + txnTypeDesc + "\" class=\"" + eventDetailsSpanClass + "\">" + txnTypeDesc + "</span>");

                        jQuery(anchorElement).insertAfter(appendToElement);
                        jQuery('#' + anchorId).attr('data-isExcluded', 'true');
                        /*
					eventDesc=eventDesc+("<a ref=\""+link+"\">");
					
					eventDesc=eventDesc+("<span>"+txnTypeDesc+"</span>");
					eventDesc=eventDesc+("</a>");
					*/
                        eventDesc = jQuery(eventDesc).append(anchorElement);
                        var liId = referenceNo + "_" + idOfCell + '_li';

                        ulId = referenceNo + "_" + idOfCell + '_ul';

                        jQuery('#' + anchorId).wrap('<li class=\'' + classForLi + '\' id=\'' + liId + '\'></li>');
                        var txntype = event.txntype;
                        var displaytotalAmount = totalAmount.replace("|", " ");
                        jQuery("<span class='eventDetailsRight'>" + displaytotalAmount + "</span>").insertAfter(jQuery('#' + anchorId));
                        //eventDesc=jQuery(eventDesc).append("<span>"+totalAmount+"</span>");
                        //eventDesc=jQuery(eventDesc).wrap('<li></li>');
                        //liElement=jQuery(liElement).wrapInner(eventDesc);
                        //eventDesc=jQuery(eventDesc).append(liElement);

                    }
                }
            }
            if (noEventAvailable) {
                jQuery('<span id=\'noEvents\' class=\'noEventsWrapper\'>There is no event on this date.</span>').insertAfter(appendToElement);
                jQuery('#noEvents').wrap('<li class=\'noEventsLi ' + classForLi + '\' id=\'noEventsLi\'></li>');
            }
            //eventDesc=jQuery(eventDesc).append("</ul>");
            //ulElement=jQuery(ulElement).wrapInner(eventDesc);
            jQuery('.' + classForLi).wrapAll('<ul class=\'' + classForUl + '\' id=\'' + ulId + '\'></ul>');
            //console.log('jslength'+jQuery('.calendarEventDesc').length);
            var calculatedHeight = parseInt(jQuery('.febacal-container-div').children('table').css('height'));
            calculatedHeight = calculatedHeight - 10;
            var naviateToPageUrl = fC.navigateToUsecaseUrl;
            var navigateToPageAnchorElement = document.createElement("a");

            navigateToPageAnchorElement.href = naviateToPageUrl;
            var anchorId = referenceNo + "_" + idOfCell + '_navigateToanchor';
            navigateToPageAnchorElement.id = anchorId;
            if (!jQuery('.' + classForUl).hasClass('eventDescMinHeight')) {
                jQuery('.' + classForUl).addClass('eventDescMinHeight');
            }
            jQuery('.feba-cal-event-vertical-separater').remove();
            jQuery('.calendarPaginationWrapper').remove();
            //jQuery.datepicker.formatDate('yy-mm-dd', new Date(+(getDateOfCell(idOfCell))));
            var formattedDate = fC.formatDate(new Date(+(getDateOfCell(idOfCell))), fC.userDateFormat);
            var navigateToUsecaseClass = 'navigateTousecase' + themeName;
            navigateToPageAnchorElement = jQuery(navigateToPageAnchorElement).wrapInner("<span title=\"" + getMessage("CalViewalltransactions") + "\" class=\"" + navigateToUsecaseClass + "\">&nbsp;&nbsp;&nbsp;&nbsp;</span>");
            var eventLblClass = 'eventLable' + themeName;
            //Load script from here incase document ready fails to load is before function call
            if (!(typeof jQuery.fn.ellipsis == 'function')) {
                feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
            }
            var appendDateInfo = "<p class='feba-cal-event-vertical-separater'></p><p class=\"eventHeading\">" + "<span dir='ltr' class=\"" + eventLblClass + "\">" + getMessage("EventsDesc") + " - (" + formattedDate + " ) </span></p>";
            jQuery(appendDateInfo).insertBefore('.' + classForUl);
            jQuery(navigateToPageAnchorElement).insertAfter('.eventLable' + themeName);
            jQuery('#' + anchorId).attr('data-isExcluded', 'true');
            jQuery('.eventHeading').closest('.section_fourlinbrd').css('border-bottom', 'none');

            if (!noEventAvailable && (parseInt(eventCountCheck) > parseInt(fC.pageSizeIdentifier))) {
                jQuery('.calendarEventDesc').jPaginate({
                    themeName: fC.themeName,
                    groupletId: fC.groupletId,
                    items: parseInt(fC.pageSizeIdentifier),
                    pagination_class: 'calendarPagination',
                    cookies: false,
                    next: '&nbsp;',
                    previous: '&nbsp;',
                    paginationWrapper: true,
                    paginationWrapperClass: 'calendarPaginationWrapper'
                });

            }
            if (!noEventAvailable) {
                jQuery(".eventDetailsLeft").ellipsis({
                    width: 190
                });
            }
            if (feba.domManipulator.getElement(".widget-content").getNiceScroll() && feba.domManipulator.getElement(".widget-content").getNiceScroll().length > 0) {
                resizeUX3scroll();
            }
            //jQuery('.calendarPagination').wrap('<div class=\'calendarPaginationWrapper\'></div>');
        }
        /*
         * loops over the passed events and adds events to the calendar, cell by cell
         * Also maintains the arrays of onscreen events etc.
         */
        function highlightEventDay(dt, td) {
            var event = {};
            var returnClass = febaCalConstants.BLANKSTRING;
            var numEventsForDate = 0;
            for (var i = 0; i < transData.currentEvents.length; i++) {
                event = transData.currentEvents[i];
                if (event._isValid) {
                    if (+dt === +event.date) {
                        numEventsForDate++;
                        returnClass = (!returnClass) ? ' febacal-day-content-has-event' : returnClass;
                        td ? td.addClass('febacal-day-content-has-event') : td;
                        transData.currentEvents.splice(i, 1);
                        i--;
                    }
                }
            }
            return numEventsForDate;
        }

        /*
         * Helper in paintViewHeader, returns the central table name and year string.
         */
        function getHeaderCenter() {
            var str = "<table><tr>";
            str += "<td title=\"" + getMessage("CalResettotoday") + "\"><span id='febacal-ResetView' class='febacal-calendar-resetbutton-wrapper' >";
            str += "<span class='febacal-calendar-resetbutton-clearright' >&nbsp;&nbsp;&nbsp;</span>"
            str += "<span class='febacal-calendar-resetbutton' >&nbsp;" + defaults.literals.buttonText.resetButton + "&nbsp;</span></span></td>";
            str += "<td class='febacal-header-center'>" + getHeaderText() + "</td>";

            str += "</tr></table>";

            return str;
        }

        /*
         * Returns the text contained in the header of the view.
         */
        function getHeaderText() {

            var selectedYear = 0;
            var selectedMonth = 0;
            if (!defaults.customHandlers.resetTimeValue) {
                newCal = new Date();
            } else {
                //newCal = new Date(defaults.customHandlers.resetTimeValue);
            }
            var yearVal = parseInt(newCal.getFullYear());
            var monthVal = parseInt(newCal.getMonth());
            var yearJumpDropdown = "";
            var monthJumpDropdown = "";
            var currYear = newCal.getFullYear();
            if (!transData.isDefaultLoadMonth && !transData.isDefaultLoadYear && $('#feba-cal-yearDropdown') && $('#feba-cal-yearDropdown').length > 0) {

                //selectedYear = parseInt($('#feba-cal-yearDropdown')[0].value);
                selectedYear = parseInt((transData.yearFirstDay).getFullYear());
            } else {
                //selectedYear=yearVal;
                selectedYear = parseInt((transData.yearFirstDay).getFullYear());
            }
            if (!transData.isDefaultLoadMonth && !transData.isDefaultLoadYear && $('#feba-cal-monthDropdown') && $('#feba-cal-monthDropdown').length > 0) {

                //selectedMonth = parseInt($('#feba-cal-monthDropdown')[0].value);
                selectedMonth = parseInt((transData.monthFirstDay).getMonth());
            } else {
                //selectedMonth=monthVal;
                selectedMonth = parseInt((transData.monthFirstDay).getMonth());
            }

            $('.febacal-jumpmonth-header-center' + themeName).remove();
            $('.febacal-jumpyear-header-center' + themeName).remove();
            /*var newCal;
			
			
            // Check if reset override is defined, call it.
            if (!transData.isDefaultLoadMonth && !transData.isDefaultLoadYear){
            	newCal = new Date();
            } else {
            	newCal = new Date(defaults.customHandlers.resetTimeValue);
            }*/
            var yearJumpDropdown = "";
            var monthJumpDropdown = "";
            var currYear = newCal.getFullYear();
            var i = parseInt(currYear) - 10;
            var j = parseInt(currYear) + 10;
            //console.log('1');
            var count = parseInt(-10);
            yearJumpDropdown = yearJumpDropdown + "<select id='feba-cal-yearDropdown' title=\"" + getMessage("CalSelectYear") + "\" class='jumpYear'>";
            while (parseInt(i) <= j) {
                var selectedString = "";
                if ((selectedYear - yearVal) === count) {
                    selectedString = "selected ";
                }
                yearJumpDropdown = yearJumpDropdown + "<option " + selectedString + " value='" + count + "'>" + i + "</option>";
                //console.log('i is'+i);
                i = parseInt(i) + 1;
                count = parseInt(count) + 1;
            }
            yearJumpDropdown = yearJumpDropdown + "</select>"
            monthJumpDropdown = getMonthDropDown(selectedMonth);
            //return '<td>'+defaults.literals.months[transData.monthFirstDay.getMonth()]+"</td>, "+transData.monthFirstDay.getFullYear()+"<td class='febacal-jumpyear-header-center'>" + yearJumpDropdown + "</td>"+"<td class='febacal-jumpmonth-header-center'>" + monthJumpDropdown + "</td>";
            var febacaljumpyearheaderClass = 'febacal-jumpyear-header-center' + themeName;
            var febacaljumpMonthheaderClass = 'febacal-jumpmonth-header-center' + themeName;
            //return "<td title=\""+getMessage("CalSelectYear")+"\" class=\""+febacaljumpyearheaderClass+"\">" +'<span class=\'yeardropdownouterwrapperspan\'><span class=\'yeardropdownwrapperspan\'>'+ yearJumpDropdown +'</span></span>' + "</td>"+"<td title=\""+getMessage("CalSelectMonth")+"\" class=\""+febacaljumpMonthheaderClass+"\">" +'<span class=\'monthdropdownouterwrapperspan\'><span class=\'monthdropdownwrapperspan\'>'+ monthJumpDropdown +'</span></span>' + "</td>";
            return "<td title=\"" + getMessage("CalSelectMonth") + "\" class=\"" + febacaljumpMonthheaderClass + "\">" + '<span class=\'monthdropdownouterwrapperspan\'><span class=\'monthdropdownwrapperspan\'>' + monthJumpDropdown + '</span></span>' + "</td>" + "<td title=\"" + getMessage("CalSelectYear") + "\" class=\"" + febacaljumpyearheaderClass + "\">" + '<span class=\'yeardropdownouterwrapperspan\'><span class=\'yeardropdownwrapperspan\'>' + yearJumpDropdown + '</span></span>' + "</td>";
        }

        function getMonthDropDown(selectedMonth) {

            var monthJumpDropdown = "";
            monthJumpDropdown = monthJumpDropdown + "<select id='feba-cal-monthDropdown' title=\"" + getMessage("CalSelectMonth") + "\" class='jumpMonth'>"
            var monthList = defaults.literals.months;

            for (i = 0; i <= 11; i++) {
                var selectedString = "";
                if (i == selectedMonth) {
                    selectedString = "selected";
                }
                monthJumpDropdown = monthJumpDropdown + "<option " + selectedString + " value='" + i + "'>" + monthList[i] + "</option>";
            }
            monthJumpDropdown = monthJumpDropdown + "</select>"
            return monthJumpDropdown;
        }
        /*
         * returns the right part of the header
         */
        function getHeaderRight() {
            var imageSrc = imagePath + '/db_pagi_right_active.png';
            var nextMonthClass = 'feba-cal-monthwidget-nextmonthbutton' + themeName;
            return "<span class='febacal-text-left febacal-margin-right'><span id='febacal-NextMonth' class='febacal-calendar-button-wrapper-ux3 feba-cal-monthwidgetnextmonthwrapper' >" +
                "<span class=\"" + 'febacal-calendar-button-ux3 ' + nextMonthClass + "\" >" + '&nbsp;' + "</span></span></span>";
            //	"<span class='febacal-text-left febacal-margin-right'><span id='febacal-NextYear' class='febacal-calendar-button-wrapper' >";
            //"<span class='febacal-calendar-button' >"+defaults.literals.buttonText.nextYear+"</span></span></span>";
        }
        /*
         * Returns left part of the header.
         */
        function getHeaderLeft() {
            var imageSrc = imagePath + '/db_pagi_left_active.png';
            var prevMonthClass = 'feba-cal-monthwidget-prevmonthbutton' + themeName;
            return "<span class='febacal-text-right febacal-margin-left' ><span id='febacal-PrevMonth' class='febacal-calendar-button-wrapper-ux3 feba-cal-monthwidget-prevmonthwrapper ' >" +
                "<span class=\"" + 'febacal-calendar-button-ux3 ' + prevMonthClass + "\" >" + '&nbsp;' + "</span></span></span>";
            //"<span class='febacal-text-right febacal-margin-left' ><span id='febacal-PrevYear' class='febacal-calendar-button-wrapper' >";
            //"<span class='febacal-calendar-button' >"+ defaults.literals.buttonText.prevYear+"</span></span></span>";
        }

        /*
         * Add event listeners for next and prev months and reset
         */
        function addListeners() {
            var parentElement = instanceData.parentElement;
            if (!instanceData.skeltonExists) {
                parentElement.find("#febacal-NextMonth").bind('click' + febaCalConstants.BINDSCOPE, showNextMonth); //next month button
                parentElement.find("#febacal-PrevMonth").bind('click' + febaCalConstants.BINDSCOPE, showPrevMonth); //previous month button
                //parentElement.find("#febacal-NextYear").bind('click'+febaCalConstants.BINDSCOPE,showNextYear); //next year button
                //parentElement.find("#febacal-PrevYear").bind('click'+febaCalConstants.BINDSCOPE,showPrevYear); //previous year button
                parentElement.find("#feba-cal-yearDropdown").live('change' + febaCalConstants.BINDSCOPE, showJumpedYear);
                parentElement.find("#feba-cal-monthDropdown").live('change' + febaCalConstants.BINDSCOPE, showJumpedMonth);
            }


            var resetButton = parentElement.find("#febacal-ResetView");

            if (!transData.isDefaultLoadMonth) {
                if (resetButton.hasClass('febacal-calendar-resetbutton-disabled-wrapper')) {
                    resetButton.removeClass('febacal-calendar-resetbutton-disabled-wrapper')
                        .bind('click' + febaCalConstants.BINDSCOPE, resetCalView)
                        .children().removeClass('febacal-calendar-resetbutton-disabled');
                }
            } else {
                resetButton.addClass('febacal-calendar-resetbutton-disabled-wrapper')
                    .unbind(+febaCalConstants.BINDSCOPE)
                    .find("span").addClass('febacal-calendar-resetbutton-disabled');
            }
        }

        /*
         * Refreshes the contents of the skeleton, without repainting the entire table.
         */
        function refreshSkeleton(element) {
            /*// For all table cells, loop over and populate contents.
            var calTable = element.find(".febacal-container-div td");
            calTable.removeClass("febacal-outside-month febacal-monthDay febacal-today febacal-day-content-has-event");
            calTable.each(function(){
            	var td = $(this);
            	var dt = getDateOfCell(td[0].id); // Get date of cell
            	td.addClass(getCellClass(+dt)); // Remove all cell classes and add relevant class.
            	td.find(".febacal-cell-date").text(dt.getDate()); // Update the date in the cell.
            	highlightEventDay(dt,td); // Add events to the cell.
            });*/
            var t = $(">.febacal-container-div", element);
            paintSkeleton(t.empty());

            feba.domManipulator.styleComboboxes((jQuery('select[id^="feba-cal-yearDropdown"]')));
            feba.domManipulator.styleComboboxes((jQuery('select[id^="feba-cal-monthDropdown"]')));
        }

    };

    /*
     * A widget / single month in the calendar year view.
     */
    function YearWidget(instanceData, transData) {
        var tThis = this;
        tThis.viewName = febaCalConstants.YEARWIDGET;

        // make functions
        var getDateOfCell = tThis.getDateOfCell;
        var getCellClass = tThis.getCellClass;

        DOMEventHandler.call(tThis, instanceData, transData, febaCalConstants.NAVIGATION_ONLY); // Add DOM event handling methods
        var refreshDayContent = tThis.refreshDayContent;

        // make methods
        tThis.refreshSkeleton = refreshSkeleton;
        tThis.paintSkeleton = paintSkeleton;
        tThis.getHeaderText = getHeaderText;
        tThis.getHeaderCenter = getHeaderCenter;


        /*
         * Creates the calendar base view on the page
         */
        function paintSkeleton(element) {

            var table = $("<table />").appendTo(element);

            var colCnt = febaCalConstants.COLCNT;
            var rowCnt = febaCalConstants.ROWCNT;
            var weekLiterals = defaults.literals.dayOfWeek;

            var tr = febaCalConstants.BLANKSTRING,
                td = febaCalConstants.BLANKSTRING,
                dt, cellId;

            /*
            var tHead = $("<thead />");
            tr = $("<tr id='' />");
            for (var i=0; i<colCnt; i++) {
            	td = $("<th class='febacal-header'>" + weekLiterals[i] + "</th>");
            	td.width(instanceData.cellWidth).height(instanceData.headerHeight);
            	(td).appendTo(tr);
            }
            (tr).appendTo(tHead);
            (tHead).appendTo(table);
			
            var tBody = $("<tbody />");
            for(var i=0; i<rowCnt; i++){
            	tr = $("<tr id='tr"+i+"' />");
            	for (var j=0; j<colCnt; j++){
            		cellId = colCnt*i+j;
            		dt = getDateOfCell(cellId);
            		//Adjust the td width and height based on container
            		td = $("<td class='febacal-cell " + getCellClass(+dt) + "' id='"+cellId+"'></td>");
            		/*
            		 * If the next line is uncommented, the ratio of width/height provided
            		 * by user will be applicable to every inner calendar month displayed in the year view
            		 * Otherwise the ratio will be maintained for the outer div of the year view.
            		 */
            /*
            					//td.width(instanceData.cellWidth).height(instanceData.cellHeight);
            					$("<div class='febacal-cell-date' >"+dt.getDate()+"</div>").appendTo(td);
            					highlightEventDay(dt,td);
            					td.appendTo(tr);
            				}
            				(tr).appendTo(tBody);
            			}
            			(tBody).appendTo(table);
            			
            			*/

            var tHead = "<thead><tr id=''>";
            for (var i = 0; i < colCnt; i++) {
                td += "<th class='febacal-header'>" + weekLiterals[i] + "</th>";
            }
            tHead += td + "</tr></thead>";
            table.append(tHead);

            var tBody = "<tbody>";
            for (var i = 0; i < rowCnt; i++) {
                tr += "<tr id='tr" + i + "'>";
                for (var j = 0; j < colCnt; j++) {
                    cellId = colCnt * i + j;
                    dt = getDateOfCell(cellId);
                    //Adjust the td width and height based on container
                    td = "<td class='febacal-cell " + getCellClass(+dt) + highlightEventDay(dt) + "' id='" + cellId + "' >";
                    td += "<div class='febacal-cell-date' >" + dt.getDate() + "</div>";
                    tr += td + "</td>";
                }
                tr += "</tr>";
            }
            table.append(tBody + tr + "</tbody>");
            table.find('th').width(instanceData.cellWidth).height(instanceData.headerHeight);
            /*
             * If the next line is uncommented, the ratio of width/height provided
             * by user will be applicable to every inner calendar month displayed in the year view
             * Otherwise the ratio will be maintained for the outer div of the year view.
             * Next line not working as expected. no cell height defined.
             */
            //table.find('td').width(instanceData.cellWidth).height(instanceData.headerHeight);
        }

        /*
         * loops over the passed events and adds events to the calendar, cell by cell
         * Also maintains the arrays of onscreen events etc.
         */
        function highlightEventDay(dt) {
            //console.log('inside highligtEventDay');
            var event = {};
            var returnClass = febaCalConstants.BLANKSTRING;
            var numEventsForDate = 0;
            for (var i = 0; i < transData.currentEvents.length; i++) {
                event = transData.currentEvents[i];
                if (event._isValid) {
                    if (+dt === +event.date) {
                        numEventsForDate++;
                        returnClass = (!returnClass) ? ' febacal-day-content-has-event' : returnClass;
                        transData.currentEvents.splice(i, 1);
                        i--;
                    }
                }
            }
            //console.log('inside numEventsForDate'+numEventsForDate);
            return numEventsForDate;
        }

        /*
         * Helper in paintViewHeader, returns the central table name and year string.
         */
        function getHeaderCenter() {
            return getHeaderText();
        }

        /*
         * Returns the text contained in the header of the view.
         */
        function getHeaderText() {
            return defaults.literals.months[transData.monthFirstDay.getMonth()];
        }

        /*
         * Refreshes the contents of the skeleton, without repainting the entire table.
         */
        function refreshSkeleton(element) {
            // For all table cells, loop over and populate contents.
            /*var calTable = $(">.febacal-container-div td", element);
            calTable.removeClass("febacal-outside-month febacal-monthDay febacal-today febacal-day-content-has-event");
            calTable.each(function(){
            	var td = $(this);
            	var dt = getDateOfCell(td[0].id); // Get date of cell
            	td.addClass(getCellClass(+dt)); // Remove all cell classes and add relevant class.
            	td.find(".febacal-cell-date").text(dt.getDate()); // Update the date in the cell.
            	highlightEventDay(dt,td); // Add events to the cell.
            });*/
            var t = $(">.febacal-container-div", element);
            paintSkeleton(t.empty());

        }

    };

    /*
     * Calendar year view.
     */
    function YearView(instanceData, transData) {
        var tThis = this;
        tThis.viewName = febaCalConstants.YEAR;

        // make functions
        var getDateOfCell = tThis.getDateOfCell;
        var getCellClass = tThis.getCellClass;
        var calculateDates = tThis.calculateDates;
        var incrementMonths = tThis.incrementMonths;
        var cloneDate = tThis.cloneDate;

        DOMEventHandler.call(tThis, instanceData, transData, febaCalConstants.NAVIGATION_ONLY); // Add DOM event handling methods

        var resetCalView = tThis.resetCalView;
        var showPrevYear = tThis.showPrevYear;
        var showNextYear = tThis.showNextYear;
        var refreshDayContent = tThis.refreshDayContent;

        // make methods
        tThis.refreshSkeleton = refreshSkeleton;
        tThis.paintSkeleton = paintSkeleton;
        tThis.getHeaderText = getHeaderText;
        tThis.getHeaderLeft = getHeaderLeft;
        tThis.getHeaderCenter = getHeaderCenter;
        tThis.getHeaderRight = getHeaderRight;
        tThis.addListeners = addListeners;

        //local
        var yearWidget, yearTable;
        var yearWidgetInstanceData = { // instanceData object
            parentElement: undefined,
            cellWidth: undefined,
            headerHeight: undefined,
            cellHeight: undefined,
            dayContentHeightPercent: undefined,
            dayContentHeight: undefined,
            moreSpanHeight: undefined,
            today: undefined,
            skeltonExists: undefined,
            eventIdSeries: 0
        };

        var yearWidgetTransData = { // transData object
            calStart: undefined,
            calEnd: undefined,
            monthFirstDay: undefined,
            monthLastDay: undefined,
            yearFirstDay: undefined,
            yearLastDay: undefined,
            isDefaultLoadMonth: undefined,
            isDefaultLoadYear: undefined,
            currentEvents: undefined,
            onScreenEvents: $([]),
            onScreenDraggables: [],
            onScreenRecurringEvents: [] //TODO add the functionality
        };

        /*
         * Creates the calendar base view on the page
         */
        function paintSkeleton(element) {

            var table = $("<table />").appendTo(element);

            var colCnt = defaults.yearView.colums;
            var rowCnt = defaults.yearView.rows;

            var tr = "",
                td, cellId, dt;
            /*var tHead = $("<thead />");
			
            tr = $("<tr id='' />");
            for (var i=0; i<colCnt; i++) {
            	//td = $("<th class='febacal-header'>" + weekLiterals[i] + "</th>");
            	td = $("<th class='febacal-header'>" + "</th>");
            	td.width(instanceData.cellWidth).height(instanceData.headerHeight);
            	(td).appendTo(tr);
            }
            (tr).appendTo(tHead);
            (tHead).appendTo(table);*/
            var tBody = $("<tbody />");

            // Copy the abstract object
            yearWidget = jQuery.extend(true, {}, AbstractCalendarView);
            CommonFunctions.call(yearWidget, yearWidgetInstanceData, yearWidgetTransData);
            YearWidget.call(yearWidget, yearWidgetInstanceData, yearWidgetTransData);

            // Loop over the cells, call painter on each of the cells.
            for (var i = 0; i < rowCnt; i++) {
                tr = $("<tr id='monthtr" + i + "' />");
                for (var j = 0; j < colCnt; j++) {
                    var cellId = colCnt * i + j;
                    var dt = getDateOfCell(cellId);
                    //Adjust the td width and height based on container
                    td = $("<td class='febacal-cell " + "' id='monthtr" + i + cellId + "'></td>");
                    td.width(instanceData.cellWidth).height(instanceData.cellHeight);
                    td.addClass("febacal-container-" + febaCalConstants.YEARWIDGET);
                    td.appendTo(tr);

                    yearWidgetInstanceData.parentElement = td;

                    yearWidget.calculateDates(incrementMonths(cloneDate(transData.yearFirstDay), cellId));
                    yearWidget.painter(yearWidgetInstanceData.parentElement);
                }
                (tr).appendTo(tBody);
            }
            (tBody).appendTo(table);
        }

        /*
         * Helper in paintViewHeader, returns the central table name and year string.
         */
        function getHeaderCenter() {
            var str = "<table><tr>";
            str += "<td class='febacal-header-center'>" + getHeaderText() + "</td>";
            str += "<td><span id='febacal-ResetView' class='febacal-calendar-button-wrapper' >";
            str += "<span class='febacal-calendar-button' >&nbsp;" + defaults.literals.buttonText.resetButton + "&nbsp;</span></span></td>";
            str += "</tr></table>";

            return str;
        }

        /*
         * Returns the text contained in the header of the view.
         */
        function getHeaderText() {
            return transData.monthFirstDay.getFullYear();
        }

        /*
         * returns the right part of the header
         */
        function getHeaderRight() {
            return "<span class='febacal-text-left febacal-margin-right'><span id='febacal-NextMonth' class='febacal-calendar-button-wrapper' >" +
                "<span class='febacal-calendar-button' >" + defaults.literals.buttonText.nextYear + "</span></span></span>";
        }
        /*
         * Returns left part of the header.
         */
        function getHeaderLeft() {
            return "<span class='febacal-text-right febacal-margin-left' ><span id='febacal-PrevMonth' class='febacal-calendar-button-wrapper' >" +
                "<span class='febacal-calendar-button' >" + defaults.literals.buttonText.prevYear + "</span></span></span>";
        }

        /*
         * Add event listeners for next and prev months and reset
         */
        function addListeners() {
            var parentElement = instanceData.parentElement;
            if (!instanceData.skeltonExists) {
                parentElement.find("#febacal-NextMonth").bind('click' + febaCalConstants.BINDSCOPE, showNextYear); //next year button
                parentElement.find("#febacal-PrevMonth").bind('click' + febaCalConstants.BINDSCOPE, showPrevYear); //previous year button
            }

            var resetButton = parentElement.find("#febacal-ResetView");

            if (!transData.isDefaultLoadYear) {
                if (resetButton.hasClass('febacal-calendar-button-disabled-wrapper')) {
                    resetButton.removeClass('febacal-calendar-button-disabled-wrapper')
                        .bind('click' + febaCalConstants.BINDSCOPE, resetCalView)
                        .children().removeClass('febacal-calendar-button-disabled');
                }
            } else {
                resetButton.addClass('febacal-calendar-button-disabled-wrapper')
                    .unbind(+febaCalConstants.BINDSCOPE)
                    .find("span").addClass('febacal-calendar-button-disabled');
            }
        }

        /*
         * Refreshes the contents of the skeleton, without repainting the entire table.
         */
        function refreshSkeleton(element) {
            // For all table cells, loop over and populate contents.
            yearTable = yearTable || $(">.febacal-container-div>table>tbody>tr>td", element);
            //yearTable.add($(">.febacal-container-div>table>thead>tr>th",element));

            // Copy the abstract object
            /*var yearWidget = jQuery.extend(true, {}, AbstractCalendarView);
            CommonFunctions.call(yearWidget, yearWidgetInstanceData, yearWidgetTransData);
            YearWidget.call(yearWidget, yearWidgetInstanceData, yearWidgetTransData);*/

            // Loop over the cells, call painter on each of the cells.
            yearTable.each(function(i) {
                yearWidgetInstanceData.parentElement = $(this);
                yearWidget.calculateDates(incrementMonths(cloneDate(transData.yearFirstDay), i));
                yearWidget.painter(yearWidgetInstanceData.parentElement);
            });
        }
    };

    var fC = $.febaCalendar = {
        version: "0.76"
    }; // Main object returned with APIs

    $.fn.febaCalendar = function(options) {
        var args = arguments; // full argument array passed to the plugin.

        // Available methods in plugin
        var febaCalendarMethods = {
            init: function(options) {
                // Return early if this element already has a plugin instance
                if (this.data('febaCalendar')) return;
                // pass options to plugin constructor
                var febaCalendar = new FEBACalendar(this, options);
                // Store plugin object in this element's data
                this.data('febaCalendar', febaCalendar);
                febaCalendar.paintCalendar(options);
            },
            setOptions: function(options) {
                // Return early if this element does not have a plugin instance
                var febaCalendar = this.data('febaCalendar');
                if (!febaCalendar) return;

                febaCalendar.setOptions(options);
            },
            addNewEvents: function(options) {
                // Return early if this element does not have a plugin instance
                var febaCalendar = this.data('febaCalendar');
                if (!febaCalendar) return;

                febaCalendar.addNewEvents(options);
            },
            setEvents: function(options) {
                // Return early if this element does not have a plugin instance
                var febaCalendar = this.data('febaCalendar');
                if (!febaCalendar) return;

                febaCalendar.setEvents(options);
            },
            destroy: function(options) {
                // Return early if this element does not have a plugin instance
                var febaCalendar = this.data('febaCalendar');
                if (!febaCalendar) return;

                febaCalendar.destroy();
            }
        };

        // For each element, check and invoke appropriate method passing the options object
        return this.each(function(i, tElement) {
            var element = $(tElement);

            if (febaCalendarMethods[options]) {
                febaCalendarMethods[options].call(element, args[1]);
            } else if (typeof options === 'object' || !options) {
                febaCalendarMethods['init'].call(element, args[0]);
            } else {
                $.error('Method ' + options + ' does not exist on jQuery.febaCalendar');
            }
        });
    };

    fC.shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    fC.formatDate = function(dtInstance, dateFormat) {
        // check if the passed param is a valid date
        if (!(dtInstance instanceof Date)) {
            $.error('Invalid parameter passed: not a valid date.');
        }
        // Set all month strings
        var shortMonthNames = fC.shortMonthNames || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Get year values.
        var fullYr = dtInstance.getFullYear();

        // Get month values
        var month = dtInstance.getMonth() + 1;

        // Get date values
        var dt = dtInstance.getDate();

        // Convert date to given date format
        dateFormat = dateFormat.replace(/yyyy/i, fullYr);
        dateFormat = dateFormat.replace(/yy/i, fullYr.toString().substring(2));
        dateFormat = dateFormat.replace(/dd/i, ((dt < 10) ? "0" + dt : dt));
        dateFormat = dateFormat.replace(/d/i, dt);
        dateFormat = dateFormat.replace(/mmm/i, "dd");
        dateFormat = dateFormat.replace(/mm/i, ((month < 10) ? "0" + month : month));
        dateFormat = dateFormat.replace(/m/i, month);
        dateFormat = dateFormat.replace("dd", shortMonthNames[month - 1]);

        return dateFormat;
    };
})(jQuery);