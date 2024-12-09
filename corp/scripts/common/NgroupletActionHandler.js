//Event Mapping
//TODO: Need to look for some other approach
feba.eventMapping = new Map();
feba.eventMapping.put("select", "click");
feba.eventMapping.put("click", "click");
feba.eventMapping.put("selectFirstRecord", "selectFirstRecord");
feba.eventMapping.put("change", "change");

/**
 * This method handles CSW.It sets the targetWidgetDetails for the corresponding action in the sourceGrouplet object
 */

handleGroupletToGroupletFeature = function(isCrossSell, sourceGrouplet, actionElements, targetGroupletId, criteria, baseURL, customActionElements) {


    //get the list of action elements
    var actionElementsArray = actionElements ? actionElements.split(",") : [];

    var arrayLength = actionElementsArray.length;

    //create a target Grouplet Object
    var targetGroupletObjDetails = {
        groupletId: targetGroupletId,
        criteria: criteria,
        baseURL: baseURL,
        isCrossSell: isCrossSell
    };


    //If the request is for Cross-sell.
    if (isCrossSell === 'true') {
        //Will handle crosssell for container                	
        handleContainerCrossSell(targetGroupletId, customActionElements, targetGroupletObjDetails);
        return;

    }
    //get the map of target actions for the source
    var actionTargetGroupletMap = feba.features[sourceGrouplet].options.actionTargetGroupletMap;

    //If empty, create a new map
    if (!actionTargetGroupletMap) {
        actionTargetGroupletMap = new Map();
    }

    //Append the groupletId to the customActionElement
    customActionElements = appendGroupletId(sourceGrouplet, customActionElements);

    //for every action configured for the source
    for (var index = 0; index < arrayLength; index++) {
        //get the source action
        var sourceAction = actionElementsArray[index];

        var groupletDetailsArray = new Array();
        //If the map doesn't already contain the source
        if (actionTargetGroupletMap.get(sourceAction) != null) {
            //Get the existing details that need to be passed to the target
            groupletDetailsArray = actionTargetGroupletMap.get(sourceAction);
        }
        groupletDetailsArray.push(targetGroupletObjDetails);

        /*
        In case of events other than load, the function gets called when the action happens,
        however, when loading the grouplet (for the first time), we are calling it explicitly here.
        */
        if (!feba.features[sourceGrouplet].options.isRequestInProcess && sourceAction === Constants.GROUPLET_LOAD) {
            new feba.js.ajax.groupletController(sourceGrouplet.options, groupletDetailsArray);
        } else {
            actionTargetGroupletMap.put(actionElementsArray[index], groupletDetailsArray);
        }
        feba.features[sourceGrouplet].options.actionTargetGroupletMap = actionTargetGroupletMap;
    }

    //Add customAction Element details
    setCustomElementDetails(customActionElements, sourceGrouplet, targetGroupletObjDetails);
};
/**
 * Appends the GroupletId to the customActionElements
 */

function appendGroupletId(sourceGrouplet, customActionElements) {
    var elementArray = customActionElements ? customActionElements.split(",") : [];
    var updatedCustomElements = "";
    var elementArrayLength = elementArray.length;
    for (var index = 0; index < elementArrayLength; index++) {
        var element = elementArray[index];
        //If the element conatins 'HREF_' in its ID,then element is of type link
        //In case of elments of type link, the groupletId should be appended after 'HREF_'.
        if (element.indexOf("HREF_") != -1) {
            updatedCustomElements = updatedCustomElements + element.replace("HREF_", "HREF_" + sourceGrouplet + Constants.GROUPLET_ELEMENT_SEPERATOR);
        } else {
            //GroupletId is appended to the element as prefix
            updatedCustomElements = updatedCustomElements + sourceGrouplet + Constants.GROUPLET_ELEMENT_SEPERATOR + element;
        }
        updatedCustomElements = updatedCustomElements + ",";
    }
    return updatedCustomElements;
}

/**
 * Handles crossell in case of Container
 */
handleContainerCrossSell = function(targetGroupletId, customActionElements, targetGroupletObjDetails) {

    //Handle Custom Actions
    handleCustomActions(null, targetGroupletObjDetails, customActionElements);

    //Adds the targetGrouplet Div to the DOM
    var targetElement = feba.domManipulator.getElementById(targetGroupletId);

    //requestId is initialized to 1.
    feba.features[targetGroupletId].options.requestId = 1;
    feba.features[targetGroupletId].options.isCsus = true;

    if (targetElement.length == 0) {
        feba.domManipulator.getElementById(Constants.CROSS_SELL_CONTAINER).append("<div role ='alert' id='" + targetGroupletId + "' >");
    }

};
/**
 * Sets the Custom Action Details to the source Grouplet
 */
function setCustomElementDetails(customActionElements, sourceGrouplet, targetGroupletObjDetails) {


    if (customActionElements != 'null') {

        //Create an Array for customActionElements if the array is not defined for the source Grouplet
        var customActionElementsArray = new Array();
        if (feba.features[sourceGrouplet].options.customActionElementsArray) {
            customActionElementsArray = feba.features[sourceGrouplet].options.customActionElementsArray;
        }
        //Create an Array for TargetGroupletDetails if the array is not defined for the source Grouplet
        var targetObjectDetailsArray = new Array();
        if (feba.features[sourceGrouplet].options.targetObjectDetailsArray) {
            targetObjectDetailsArray = feba.features[sourceGrouplet].options.targetObjectDetailsArray;
        }
        //Add the customActions and TaargetGrouplets defined to the respective array;
        customActionElementsArray.push(customActionElements);
        targetObjectDetailsArray.push(targetGroupletObjDetails);

        //Assign the arrays to the sourceGrouplet
        feba.features[sourceGrouplet].options.customActionElementsArray = customActionElementsArray;
        feba.features[sourceGrouplet].options.targetObjectDetailsArray = targetObjectDetailsArray;
    }


}
/**
 * Handles Custom Actions in case of CSW
 */
function handleCustomActions(sourceGroupletOptions, targetGroupletObjDetails, customActionElements) {

    var targetObjArray = new Array;
    targetObjArray.push(targetGroupletObjDetails);

    //get the list of custom action elements
    var customActionElementsArray = customActionElements ? customActionElements.split(",") : [];

    var arrayLength = customActionElementsArray.length;

    //for every action configured for the source
    for (var index = 0; index < arrayLength; index++) {

        var elementWithAction = customActionElementsArray[index];

        //elementWithAction will have both the element and the action with  ':' seperated
        var elementWithActionArray = elementWithAction ? elementWithAction.split("|") : [];

        //The array should have both action and element.If not ,continue with next element
        if (elementWithActionArray.length != 2) {
            continue;
        }

        //Getting custom Action Element
        var customElement = elementWithActionArray[0];

        //Getting CustomAction
        var customAction = feba.eventMapping.get(elementWithActionArray[1]);



        //Getting DOM Obj Array with the id starting with actionElement name passed
        var elementObjArray = getCustomElementObjArray(customElement);



        //Iterate through the elementArray and add the actions to the elements
        var elementObjLength = elementObjArray.length;
        for (var elementIndex = 0; elementIndex < elementObjLength; elementIndex++) {
            var elementObj = elementObjArray[elementIndex];
            if (elementObj) {
                try {
                    //If the customAction is selectFirstRecord,then request for first record is selected and targetGrouplet is loaded .        				
                    if (customAction === 'selectFirstRecord') {
                        customActionEventHandler(sourceGroupletOptions, elementObj, targetObjArray);
                        break;
                    }
                    //Adding the custom Action to the element
                    jQuery(elementObj).bind(customAction, function(event) {
                        customActionEventHandler(sourceGroupletOptions, event.target, targetObjArray);
                    });
                } catch (e) {
                    LOG.logMessages("Exception While add the customAction to the Element");
                }
            }
        }

    }



}


/**
 * Returns the Matched DOM elements for the give Id
 */

function getCustomElementObjArray(element) {


    //For the listing elements , '[]' are specified. 
    //So to retrieve the listing element ,remove '[]' and use getElementStartingWith 
    if (element.indexOf('[]') != -1) {
        element = element.replace("[]", "");
        return feba.domManipulator.getElementStartingWith(element);
    } else {
        return feba.domManipulator.getElementById(element);
    }

}


/**
 * EventHandler for customActions
 */

function customActionEventHandler(sourceGroupletOptions, target, targetObjArray) {
    //Get if key is assoscitaed with the field.
    var dataKey = feba.domManipulator.getAttribute(target, Constants.KEY);
    //Sets the style of the selected record
    //addSelectedStyle(target);   Temporarily commented for Mails Module EBUX Stage 3
    //Instantiate the groupletController which handles targetWidget
    new feba.js.ajax.groupletController(sourceGroupletOptions, targetObjArray, dataKey);
}


//This is used to store the selected Record 
var __SELECTED_ELEMENT__ = null;

/**
 * Adds the style to the selected Record and also removes the selected style for the previously selected record
 */
function addSelectedStyle(elementObj) {

    var tableTag = feba.domManipulator.getImmediateAncestor(elementObj, Constants.TABLE_TAG);
    var SelectedStyle = feba.domManipulator.getAttribute(tableTag, Constants.ROW_SELECTED_STYLE);

    //TODO:Need to look for some other approach.
    //This is to remove the selected class,for the previously selcted record
    if (__SELECTED_ELEMENT__) {
        var trSelectedTag = feba.domManipulator.getImmediateAncestor(__SELECTED_ELEMENT__, Constants.TR_TAG);
        feba.domManipulator.removeClass(trSelectedTag, SelectedStyle);
    }
    __SELECTED_ELEMENT__ = elementObj;

    //Adding selected style to the selected record
    var trTagElement = feba.domManipulator.getImmediateAncestor(elementObj, Constants.TR_TAG);
    feba.domManipulator.addClass(trTagElement, SelectedStyle);
}

resetParamsForCalender = function(params) {
    if ((!feba.features[params.groupletJsVarName]) && params.groupletId &&
        feba.features[params.groupletId] != undefined && feba.features[params.groupletId].options.isCalendar == Constants.TRUE) {
        params.groupletJsVarName = params.groupletId;
    }
};

/**
 * This method will call appropriate functions to perform widget action handling using ajax
 */
handleAll = function(params) {
    resetParamsForCalender(params);
    handleHyperLinks(params);
    handleButtons(params);
    /*Start Changes for Investec CR113*/
    // Fix to highlight row inside grouplet
    highLightErrorRow();
    /*End Changes for Investec CR113*/
    if (typeof(handleOverlayHeading) == 'function') {
        handleOverlayHeading(params);
    }
};

var timeout = 500;
var closeTimer = 0;
var ddmenuitem = 0;

/**
 * Method for registering handlers for grouplet menus
 */
registerMenuHandler = function(parameter) {
    MENU_IMG_CONST = "_Menu";
    menuButtonId = parameter + MENU_IMG_CONST;
    maximizeParamObj = {
        menuButtonId: menuButtonId,
        eventType: "mouseover",
        groupletID: parameter
    };
    registerMenuMaximizeGrouplethandler(maximizeParamObj);
    paramObjForClick = {
        menuButtonId: menuButtonId,
        eventType: "click",
        groupletID: parameter
    };
    handleClick(paramObjForClick);
    minimizeParamObj = {
        menuButtonId: menuButtonId,
        eventType: "mouseout",
        groupletID: parameter
    };
    registerMenuMinimizeGrouplethandler(minimizeParamObj);

    handleKeyPress(maximizeParamObj);


};
/**
 * Method for handling click on menu button.Default action should be stopped.
 */
handleClick = function(parameter) {
    feba.domManipulator.bind(feba.domManipulator
        .getElementById(parameter.menuButtonId), parameter.eventType, {},
        function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

        });

};
/**
 * For DDA: When user tabs on menu button, menu list should be shown & first element 
 * in the menu should be selected. Similarly, when the user tabs out of last menu item, 
 * the menu should be hidden.
 */
handleKeyPress = function(parameter) {
    feba.domManipulator.bind(feba.domManipulator
        .getElementById(parameter.menuButtonId), "keypress", {},
        function(e) {
            handleShowMenu(e, parameter);
        });
    feba.domManipulator.bind(feba.domManipulator
        .getElementById(parameter.menuButtonId), "keydown", {},
        function(e) {
            handleShowMenu(e, parameter);
        });
    //Hide menu when the user tabs out of last menu item
    feba.domManipulator.bind(feba.domManipulator.getLastElementOfList(parameter.groupletID + "_MenuList"),
        "keypress", {},
        function(e) {
            handleHideMenu(e, parameter);
        });
    feba.domManipulator.bind(feba.domManipulator.getLastElementOfList(parameter.groupletID + "_MenuList"),
        "keydown", {},
        function(e) {
            handleHideMenu(e, parameter);
        });

};

/**
 *Method to show menu list when user tabs on menu button
 */
handleShowMenu = function(e, parameter) {
    var keyCode = e.keyCode || e.which;
    //keyCode==9 for tab key down
    if (keyCode == 9) {
        //Show menu list when user tabs on menu button
        showMenu(parameter);
        //Highlight first element of li
        feba.domManipulator.getFirstElementOfList(parameter.groupletID + "_MenuList").focus();
    }
};

/**
 *Method to hide menu when the user tabs out of last menu item
 */
handleHideMenu = function(e, parameter) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9) {
        hideMenu(parameter);
    }
};
/**
 * Method to register for displaying menu items for a grouplet
 */
registerMenuMaximizeGrouplethandler = function(parameter) {
    if (parameter.menuButtonId) {
        feba.domManipulator.bind(feba.domManipulator
            .getElementById(parameter.menuButtonId), parameter.eventType, {},
            function() {
                showMenu(parameter);

            });
        feba.domManipulator.bind(feba.domManipulator.getChildren(
                feba.domManipulator.find(feba.domManipulator
                    .getElementById(parameter.groupletID +
                        "_Menu_MenuItems"), "ul.hide"), "li"),
            parameter.eventType, {},
            function() {
                showMenu(parameter);


            });
    }

};

/**
 * Method to register for hide menu items for a grouplet
 */
registerMenuMinimizeGrouplethandler = function(parameter) {

    feba.domManipulator.bind(feba.domManipulator
        .getElementById(parameter.menuButtonId), parameter.eventType, {},
        function(e) {
            hideMenu(parameter);
            e.preventDefault();
            e.stopImmediatePropagation();
        });
    feba.domManipulator.bind(feba.domManipulator.getChildren(
            feba.domManipulator.find(feba.domManipulator
                .getElementById(parameter.groupletID +
                    "_Menu_MenuItems"), "ul.hide"), "li"),
        parameter.eventType, {},
        function() {
            hideMenu(parameter);
        });

};

showMenu = function(parameter) {

    menuCancelTimer();
    menuClose();
    ddmenuitem = feba.domManipulator.css(feba.domManipulator.find(
        feba.domManipulator.getElementById(parameter.groupletID +
            "_Menu_MenuItems"), "ul.hide"), "visibility", "visible");

};
hideMenu = function(parameter) {
    closeTimer = window.setTimeout("menuClose()", timeout);
};

/**
 * This methods binds all the 'menuButton' class elements to a function that
 * will raise requests/call a js function
 */
menuActionBind = function(parameter) {

    // Gets all the children of <groupletId>_Title div, which is anchor

    var elements = feba.domManipulator.find(
        feba.domManipulator.getElementById(parameter + "_Title"), "a");

    for (var i = 0; i < elements.length; i++) {
        // For every element, register click event to call menu actions
        // TODO: Analyse DDA aspect of 'onClick'
        var element = feba.domManipulator.getElement(elements[i]);
        feba.domManipulator
            .bind(
                element,
                "click", {},
                function(e) {

                    groupletId = parameter;

                    try {
                        var linkValue = feba.domManipulator
                            .getAttribute(e.currentTarget,
                                Constants.HREF);
                        var elementId = feba.domManipulator
                            .getAttribute(e.currentTarget,
                                Constants.ID);

                        var isModal = feba.domManipulator.getAttribute(
                            e.currentTarget, "data-isModal");

                        var jsFunc = feba.domManipulator.getAttribute(
                            e.currentTarget, "data-jsFunc");
                        /*Added for 11010 Widgets Enhancement for adding help file functionality: Start*/

                        var isHelp = feba.domManipulator.getAttribute(
                            e.currentTarget, "data-isHelp");

                        /*Added for 11010 Widgets Enhancement for adding help file functionality: End*/

                        var obj = feba.features[groupletId];



                        /**
                         * In case of a JS function invocation call the
                         * JS method. Otherwise, raise request on the
                         * corresponding grouplet/modal object
                         */
                        //Condition check added for 11010 Widgets Enhancement for adding help file functionality
                        if (isHelp) {
                            // Its for a static link which will open in a new browser window which is outside ebanking session
                            // No need to submit widget.
                        } else if (jsFunc) {
                            obj[jsFunc]();
                        } else {
                            if (isModal) {
                                /**
                                 * If the request is for a modal object,
                                 * create a new modalbox, and set requestId
                                 * to 1
                                 */
                                feba.features[elementId] = new feba.js.ajax.modalBoxRequest({});
                                obj = feba.features[elementId];
                                obj.options.target = elementId;
                            }
                            obj.options.requestId = 0;
                            obj.options.groupletParameters = "__GROUPLET_NAME__" +
                                "=" +
                                obj.options.target +
                                "&" +
                                Constants.REQUEST_ID +
                                "=" +
                                obj.options.requestId +
                                "&" +
                                "GROUPLETS_IN_PAGE" +
                                "=" +
                                _GROUPLETS_IN_PAGE_ +
                                "&" +
                                "__START_GROUPLET_TRAN_FLAG__=Y";
                            obj.options.baseUrl = linkValue;

                            obj.execute();
                        }

                    } catch (exception) {
                        LOG.logMessages("Exception in menu click:: " + exception.message);
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();

                });

    }

};

function menuCancelTimer() {
    if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = 0;
    }
};

function menuClose() {
    if (ddmenuitem) {
        ddmenuitem.css("visibility", "hidden");
    }

};
isPageRefreshLink = function(hrefAttribute) {
    if (hrefAttribute && (hrefAttribute.indexOf("#") != -1 || hrefAttribute.indexOf("javascript") != -1)) {
        return false;
    }
    return true;

};
/**
 * this method will indicate if that link will open in a new window
 * these links should not be handled via RIA
 */
isOpenInNewWindowLink = function(linkId) {
    var linkElement = feba.domManipulator.getElementById(linkId);
    var targetAttribute = feba.domManipulator.getAttribute(linkElement, Constants.TARGET);
    if (targetAttribute == '_blank') {
        return true;
    } else {
        return false;
    }
}
/**
 * This method checks if the HTML DOM element should be excluded from action handling
 */
isExcluded = function(elementId, isHyperLink, exclusionIds, hrefAttribute, isExcluded) {
    var index = 0;
    if (null != elementId) {
        index = feba.domManipulator.inArray(elementId.replace(/[[0-9]*]/, ""), exclusionIds);
    }

    if (index != -1) {
        return true;
    } else if (isHyperLink) {
        if (!isPageRefreshLink(hrefAttribute) || isExcluded === Constants.TRUE || isOpenInNewWindowLink(elementId)) {
            return true;
        }
    } else {
        return false;
    }
};

/**
 * This method will register event handlers to perform ajax based communication with the webcontainer
 * for the 'onclick' event of all hyperlinks in widgets 
 */
handleHyperLinks = function(params) {
    var hyperLinks = feba.domManipulator.find(feba.domManipulator.getElementById(params.groupletDivId), "a");

    for (i = 0; i < hyperLinks.length; i++) {
        var hyperLink = feba.domManipulator.getElement(hyperLinks[i]);
        if (!isExcluded(feba.domManipulator.getAttribute(hyperLink, Constants.ID),
                true, params.exclusionIds,
                feba.domManipulator.getAttribute(hyperLink, Constants.HREF),
                feba.domManipulator.getAttribute(hyperLink, Constants.IS_EXCLUDED)
            )) {
            feba.domManipulator.setAttribute(hyperLink, "data-dontBlockUI", Constants.TRUE);
            feba.domManipulator.click(hyperLink, function(event) {
                var typeSys = feba.domManipulator.getElementStartingWith("ERR_MSG_SPAN");
                var typeSysTable = feba.domManipulator.getElementOfClass("ERROR_FIELD_BORDER_TYPESYS");
                if (0 < typeSys.size() || 0 < typeSysTable.size()) {
                    event.stopImmediatePropagation();
                    feba.domManipulator.preventDefault(event);
                    return;
                }
                var currentLink = feba.domManipulator.getElement(this);
                var isDownloadLink = feba.domManipulator.getAttribute(currentLink, "data-isDownloadLink");
                if (isDownloadLink === Constants.TRUE) {
                    /*HYPERLINK DOWNLOAD ISSUE*/

                    var isSearchPanelSubmit = feba.domManipulator.getAttribute(currentLink, "data-SearchPanelSubmit");
                    //Get all the elements on the widget
                    if (isSearchPanelSubmit && isSearchPanelSubmit.length > 0) {
                        jQuery('body').click();
                    }
                    var divElements = feba.domManipulator.children(feba.domManipulator.getElementById(params.groupletDivId));
                    if (!(params.isMultiPartRequest || isDownloadLink === Constants.TRUE)) {
                        feba.domManipulator.find(divElements, '[data-groupletId]').each(function(index) {
                            jQuery(this).html("");
                        });
                    }
                    //Get all the input elements on the widget
                    var inputElements = feba.domManipulator.getIdWithAppend(params.groupletDivId, " *:input");

                    //Get all the input elements of type text in a widget
                    var textElements = feba.domManipulator.getIdWithAppend(params.groupletDivId, " *:input[type='text']");

                    //clear all the watermarks of text box in grouplet
                    feba.js.watermark.clearWatermark(textElements);

                    /*Clear RLM-LRM chars before submit: Start*/
                    if (feba.domManipulator.isRTL()) {
                        textElements.each(function() {
                            if (this.value) {
                                this.value = encodeURIComponent(this.value);
                                this.value = this.value.replace(new RegExp('%E2%80%8E', 'g'), '')
                                this.value = decodeURIComponent(this.value);
                            }
                        });
                    }
                    /*Clear RLM-LRM chars before submit: End*/
                    //Create a form
                    var frm = feba.domManipulator.getElement("<form></form>");
                    //Make it invisible
                    feba.domManipulator.css(frm, "display", "none");
                    //Get the button which was clicked by the user
                    var button = feba.domManipulator.getElement(this);
                    //Check if it is a download button
                    var isDownloadLinkElem = feba.domManipulator.getAttribute(currentLink, "data-isDownloadLink");
                    var downloadCallbackFunction = feba.domManipulator.getAttribute(currentLink, "data-downloadCallBackFunction");
                    //If it is not an upload
                    if (!params.isMultiPartRequest) {
                        //And it is a download
                        if (isDownloadLinkElem === Constants.TRUE) {
                            //Set a flag in the form indicating that this is a download (will be used by the server)
                            feba.domManipulator.setAttribute(frm, "isDownloadAction", "true");

                            //Clone the contents inside the widget and add them to the form
                            cloneAndAppendToForm(divElements, frm);

                            //Determine the target which has to be updated with the response
                            var target = feba.domManipulator.getElementById(feba.features[params.groupletJsVarName].options.target);

                            //If it is a Modal View
                            if (feba.features[params.groupletJsVarName].options.tagHelper == "MODAL_VIEW.TagHelper") {
                                //The target is the modal view div
                                target = feba.domManipulator.getElementById("modalDialog");
                            }
                            //If it is a calendar
                            if (feba.features[params.groupletJsVarName].options.isCalendar == Constants.TRUE) {
                                //The target is the calendar div
                                target = feba.domManipulator.getElementById("simplemodal-container");
                            }
                            //Fix for call id 416334
                            if (!target || (target != undefined && target.length == 0) && feba.domManipulator.getElementById("modalDialog").length > 0) {
                                target = feba.domManipulator.getElementById("modalDialog");

                            }
                            //Create a new iFrame
                            var frameName = "downloaderFrame" + new Date().getTime();
                            var jFrame = createFrameForLink(target, frm, frameName);

                            //Load the iFrame
                            jFrame.load(
                                //This function is a callback and will be executed after the response comes back	
                                function(event) {
                                    var content = window.frames[frameName].document.getElementsByTagName("body")[0];
                                    var dContent;
                                    if (feba.features[params.groupletJsVarName].options.tagHelper == "MODAL_VIEW.TagHelper") {
                                        //Case for modal inside grouplet
                                        if (params.groupletId) {
                                            dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), "div[id=" + params.groupletId.toUpperCase() + "]");

                                        } else {
                                            //Normal Modal scenario
                                            dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), "div[id=MODAL_VIEW_CONTAINER]");
                                        }
                                    } else {
                                        dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), "div[id=" + target[0].id.toUpperCase() + "]");
                                    }
                                    //Remove the iFrame after waiting for 100 milli-seconds
                                    setTimeout(function() {
                                        feba.domManipulator.remove(jFrame);
                                    }, 10);
                                    if (dContent.length != 0) {
                                        feba.domManipulator.getElementById(params.groupletDivId).children().remove();
                                        feba.domManipulator.getElementById(params.groupletDivId).append(dContent[0].outerHTML);

                                        /* This was added for the msg handling from RIA download action. ref Ticket#726774  */
                                        if (!((jQuery("#userType").attr("value") && jQuery("#userType").attr("value") == "4"))) {
                                            convertComboboxes();
                                        }


                                    }
                                    feba.domManipulator.setCssProperties(feba.domManipulator.getElementById(target), {
                                        "backgroundImage": ""
                                    });
                                }
                            );
                            /* ref Ticket#726774 - Clear previous msg table when downloadlink from ria is loaded again */
                            try {
                                if (jQuery("#MODAL_VIEW_CONTAINER").length > 0 && feba.features[params.groupletJsVarName].options.tagHelper == "MODAL_VIEW.TagHelper") {
                                    jQuery("#MODAL_VIEW_CONTAINER").find('#' + feba.features[params.groupletJsVarName].options.__GROUPLET_ID__ + "\\:MessageDisplay_TABLE").remove();
                                }
                            } catch (e) {
                                //Do nothing since we dont want any handling to be done here and allow script to continue.

                            }


                            //Add hidden fields to the form
                            addHiddenFields(this, params, frm);
                            //Add form specific attributes
                            //populate elements for action
                            var linkValue = feba.domManipulator.getAttribute(feba.domManipulator.getElement(this), Constants.HREF);
                            if (!feba.features[params.groupletJsVarName].options.isRequestInProcess) {
                                //feba.domManipulator.remove(feba.domManipulator.getIdWithAppend(params.groupletDivId," > *"));
                                feba.features[params.groupletJsVarName].options.baseUrl = linkValue;
                                var parameterToBePassed = params.groupletNameConst + "=" +
                                    params.groupletId + "&" + params.riaRequestTypeConst + "=" + params.riaType + "&GROUPLETS_IN_PAGE=" + _GROUPLETS_IN_PAGE_;

                                if (params.isModal) {
                                    parameterToBePassed = parameterToBePassed + "&" + "__CONTENT_ID__" + "=MODAL_VIEW_CONTAINER";
                                }
                                feba.features[params.groupletJsVarName].options.groupletParameters = parameterToBePassed;
                                //Added for IGC at Client Side				
                                feba.features[params.groupletJsVarName].options.actionElement = getElementName(event);
                                addFormAttr(frm, frameName, linkValue);
                                //Trigger the submission of the form
                                feba.domManipulator.trigger(frm, Constants.SUBMIT);
                                //Remove the temporary form
                                feba.domManipulator.remove(frm);
                                if (downloadCallbackFunction && downloadCallbackFunction.length > 0) {
                                    try {
                                        eval(downloadCallbackFunction);
                                    } catch (e) {
                                        LOG.logMessages("Exception invoking callback function post download" + e);
                                    }
                                }
                            }
                            /*HYPERLINK DOWNLOAD ISSUE*/
                        }
                    }
                } else {
                    var linkValue = feba.domManipulator.getAttribute(feba.domManipulator.getElement(this), Constants.HREF);
                    if (!feba.features[params.groupletJsVarName].options.isRequestInProcess) {
                        //feba.domManipulator.remove(feba.domManipulator.getIdWithAppend(params.groupletDivId," > *"));
                        feba.features[params.groupletJsVarName].options.baseUrl = linkValue;
                        var parameterToBePassed = params.groupletNameConst + "=" +
                            params.groupletId + "&" + params.riaRequestTypeConst + "=" + params.riaType + "&GROUPLETS_IN_PAGE=" + _GROUPLETS_IN_PAGE_;

                        if (params.isModal) {
                            parameterToBePassed = parameterToBePassed + "&" + "__CONTENT_ID__" + "=MODAL_VIEW_CONTAINER";
                        }
                        feba.features[params.groupletJsVarName].options.groupletParameters = parameterToBePassed;
                        //Added for IGC at Client Side				
                        feba.features[params.groupletJsVarName].options.actionElement = getElementName(event);
                        feba.features[params.groupletJsVarName].execute();
                    }
                }
                feba.domManipulator.preventDefault(event);
                feba.domManipulator.stopImmediatePropagation(event);
            });
        } else if (feba.domManipulator.getAttribute(hyperLink, Constants.IS_EXCLUDED) === Constants.TRUE) {
            if (feba.domManipulator.getAttribute(hyperLink, Constants.IS_PRINT) === Constants.TRUE) {
                printPopUp(params, hyperLink);
            } else {
                feba.domManipulator.click(hyperLink, function() {
                    if ("Y" === feba.js.common.blockOnHyperLinkClicksRequired) {
                        feba.domManipulator.blockUI({
                            message: '<h1><img src="L001/consumer/images/widget-loading.gif"/></h1>',
                            baseZ: 9999
                        });
                    }
                });
            }
        }

    }
};
/**
 * Gets the element name on which the event got executed.
 * It removes the groupletId from the element name and returns. 
 */
function getElementName(event) {

    var actionElement = feba.domManipulator.getAttribute(event.target, Constants.ID);
    if (actionElement.indexOf(":") != -1) {
        actionElement = actionElement.split(":");

        if (actionElement.length > 0) {
            actionElement = actionElement[1];
        }
    }

    //If the element ends with index,remove it.Only actionelement name is to be passed.
    var regularExpression = /\[[0-9]*\]/;
    var match = actionElement.match(regularExpression);
    if (match) {
        actionElement = actionElement.replace(match, "");
    }

    return actionElement;
}
cloneAndAppendToForm = function(divElements, frm) {
    var clonedElements = divElements.clone();
    divElements.find('select').each(function(i) {
        var thisSelect = jQuery(this);
        jQuery('[id="' + thisSelect.attr('id') + '"]', clonedElements).val(thisSelect.val());
    });
    feba.domManipulator.append(frm, clonedElements);
};
/**
 * This method will register event handlers to perform ajax based communication with the web container
 * for the 'onclick' event of all buttons within widgets
 * Modified by Piyasha to handle JS Encryption for buttons within widgets
 */
handleButtons = function(params) {
    //handle Reset Buttons
    handleResetButtons(params);
    //handle submit buttons
    handleSubmitButtons(params);
};

/**
 This method is invoked to bind event handlers for reset buttons. The function it binds will be invoked when a reset button
 is clicked. Internally, the function simply resets the content of the widget to its original state
**/
handleResetButtons = function(params) {
    //Find all reset buttons on the widget
    var resetButtons = feba.domManipulator.find(feba.domManipulator.getElementById(params.groupletDivId), Constants.COLON + Constants.RESET);
    if (resetButtons == null || resetButtons == undefined) {
        return;
    }
    //For each reset button (will typically only find one)
    for (i = 0; i < resetButtons.length; i++) {
        //Get the reset button
        var resetButton = feba.domManipulator.getElement(resetButtons[i]);
        //resetButton[0].type="button";
        //Get the original response stored for the widget
        var originalResponse = feba.features[params.groupletJsVarName].options.originalContent;
        /*Fix for call id 645188 starts*/
        var buttonName = jQuery(resetButton).attr('name');
        var buttonType = jQuery(resetButton).attr('value');

        if (typeof buttonName !== typeof undefined) {
            buttonName = buttonName.toUpperCase();
        }

        if (typeof buttonType !== typeof undefined) {
            buttonType = buttonType.toUpperCase();
        }
        var currButtonId = jQuery(resetButton).attr('id');
        var isSearchPanelButton = jQuery('.stage3_searchpaneldiv').find("[id='" + currButtonId + "']").length > 0;
        if (isSearchPanelButton && (buttonName == 'ACTION.RESET' || buttonName == 'ACTION.CLEAR') && buttonType == 'CLEAR') {

            //Bind the click event with a function
            feba.domManipulator.click(resetButton, function(event) {
                /* Method called for Clearing the Content of search Panel on click of CLEAR button */
                clearSearchPanelFields(this, "collapsible-wrapper", "class");
                //jQuery(".collapsible-wrapper").html(jQuery(".collapsible-wrapper").data('old-state'));
                //location.reload(true);
                //history.go(0);
                event.stopImmediatePropagation();
                feba.domManipulator.preventDefault(event);
            });
        } else {
            /*Fix for call id 645188 ends*/
            //Bind the click event with a function
            feba.domManipulator.click(resetButton, function(event) {
                var typeSys = feba.domManipulator.getElementStartingWith("ERR_MSG_SPAN");
                var typeSysTable = feba.domManipulator.getElementOfClass("ERROR_FIELD_BORDER_TYPESYS");
                if (0 < typeSys.size() || 0 < typeSysTable.size()) {
                    event.stopImmediatePropagation();
                    feba.domManipulator.preventDefault(event);
                    return;
                }
                //if original response is available		
                if (originalResponse) {
                    //Changes done for reset button once after load - start
                    if (originalResponse.clone) {
                        var x = "";
                        jQuery.each(originalResponse, function(i) {
                            if (jQuery(originalResponse[i]).prop("nodeName") == "SCRIPT") {
                                x = x + "<Script type=\"text/javascript\">" + jQuery(originalResponse[i]).prop("innerText") + "</Script>";
                            } else if (jQuery(originalResponse[i]).prop("outerHTML") != undefined && jQuery(originalResponse[i]).prop("outerHTML") != "" && jQuery(originalResponse[i]).prop("outerHTML") != "undefined") {
                                x = x + jQuery(originalResponse[i]).prop("outerHTML");
                            }
                        });
                        feba.features[params.groupletJsVarName].options.originalContent = x;


                        //replace the current content with the original
                        //NOTE: Vivek: Changed the following lines (from groupletId to groupletDivId
                        //Doing this because the DIV ID is different 
                        // - for widgets it is the upper case equivalent of the original widget
                        // - for modal, it will be MODAL_VIEW_CONTAINER or some such name

                        feba.domManipulator.getElementById(params.groupletDivId).children().remove();
                        feba.domManipulator.getElementById(params.groupletDivId).append(x);
                    } else {
                        //Changes done for reset button once after load - end
                        feba.domManipulator.getElementById(params.groupletDivId).children().remove();
                        feba.domManipulator.getElementById(params.groupletDivId).append(originalResponse);
                    }
                    /*Below if condition changed to handled combo style reset: Changes start */

                    /* var isHWflow;
                        if(document.getElementById('isHwFlowScreen')){
                              isHWflow = document.getElementById('isHwFlowScreen').value;
                        }
                        if(isHWflow !=null){*/
                    var userType;
                    if (document.getElementById('usertype')) {
                        userType = document.getElementById('usertype').value;
                    }
                    if (userType != '4') {

                        feba.domManipulator.documentReady(convertComboboxes);
                    }
                    /*Below if condition changed to handled combo style reset: Changes end */
                }
            });
        }
    }
};

/**
This method is invoked to bind event handlers to the Submit button. Internally, 3 flows are possible:
Simple submit: Create a Form, copy the input elements from the widget to the form and submit
Upload: Create an iFrame and upload the file using the iFrame
Download: Create an iFrame and download the file using the iFrame
(this is because we want to trigger the browser functionality to upload/download)
**/
handleSubmitButtons = function(params) {
    //Find all submit buttons on the page
    var submitButtons = feba.domManipulator.find(feba.domManipulator.getElementById(params.groupletDivId), Constants.COLON + Constants.SUBMIT);
    //Loop through all the submit buttons
    for (i = 0; i < submitButtons.length; i++) {
        //For each submit button
        var submitButton = feba.domManipulator.getElement(submitButtons[i]);
        feba.domManipulator.setAttribute(submitButton, "data-dontBlockUI", Constants.TRUE);
        //Check if the button should be excluded from RIA. If yes, don't associate any function to the button
        if (isExcluded(feba.domManipulator.getAttribute(submitButton, Constants.ID), false, params.exclusionIds, null, null)) {
            continue;
        }

        //Otherwise, associate the following anonymous function to the click event
        feba.domManipulator.click(submitButton, function(event) {
            if (isDGCT) {

                event.stopImmediatePropagation();
                feba.domManipulator.preventDefault(event);
                return;
            }
            if (isDGCTpushSignedDataSuccess) {
                var fgName;
                try {

                    if (params.groupletJsVarName == "MODAL_VIEW_CONTAINER") {
                        //	fgName =	document.getElementById(params.groupletJsVarName).value;
                        fgName = jQuery('input[id="GROUPLET_FORMSGROUP_ID__"]').val();
                    } else {

                        fgName = document.getElementById(params.groupletJsVarName + ":" + "GROUPLET_FORMSGROUP_ID__").value;

                    }
                    if (isSignTimeStamp) {
                        document.getElementById(fgName + "." + '__CERTIFICATE__').value = isDGCTdata;
                    } else {
                        document.getElementById('__SIGNATURE__').value = data;
                    }
                    var newHidden = document.createElement("input");
                    var name = buttonObj.name;
                    var value = buttonObj.value;
                    newHidden.setAttribute("type", "hidden");
                    newHidden.setAttribute("name", name);
                    newHidden.setAttribute("value", value);


                    isDGCT = false;
                    isDGCTpushSignedDataSuccess = false;
                } catch (e) {

                    //alert("Error Signing Certificate");
                }
            }
            var typeSys = feba.domManipulator.getElementStartingWith("ERR_MSG_SPAN");
            var typeSysTable = feba.domManipulator.getElementOfClass("ERROR_FIELD_BORDER_TYPESYS");
            if (0 < typeSys.size() || 0 < typeSysTable.size()) {
                event.stopImmediatePropagation();
                feba.domManipulator.preventDefault(event);
                return;
            }
            //If a request for this widget is already in progress, abort and return
            if (feba.features[params.groupletJsVarName].options.isRequestInProcess) {
                event.stopImmediatePropagation();
                feba.domManipulator.preventDefault(event);
                return;
            }

            //Get the button which was clicked by the user
            var button = feba.domManipulator.getElement(this);
            //Check if it is a download button
            var isDownloadButton = feba.domManipulator.getAttribute(button, "data-isDownloadButton");
            var isSearchPanelSubmit = feba.domManipulator.getAttribute(button, "data-SearchPanelSubmit");
            //Get all the elements on the widget
            if (isSearchPanelSubmit && isSearchPanelSubmit.length > 0) {
                jQuery('body').click();
            }
            var divElements = feba.domManipulator.children(feba.domManipulator.getElementById(params.groupletDivId));
            if (!(params.isMultiPartRequest || isDownloadButton === Constants.TRUE)) {
                feba.domManipulator.find(divElements, '[data-groupletId]').each(function(index) {
                    jQuery(this).html("");
                });
            }
            //Get all the input elements on the widget
            var inputElements = feba.domManipulator.getIdWithAppend(params.groupletDivId, " *:input");

            //Get all the input elements of type text in a widget
            var textElements = feba.domManipulator.getIdWithAppend(params.groupletDivId, " *:input[type='text']");

            //clear all the watermarks of text box in grouplet
            feba.js.watermark.clearWatermark(textElements);

            /*Clear RLM-LRM chars before submit: Start*/
            if (feba.domManipulator.isRTL()) {
                textElements.each(function() {
                    if (this.value) {
                        this.value = encodeURIComponent(this.value);
                        this.value = this.value.replace(new RegExp('%E2%80%8E', 'g'), '')
                        this.value = decodeURIComponent(this.value);
                    }
                });
            }
            /*Clear RLM-LRM chars before submit: End*/
            //Create a form
            var frm = feba.domManipulator.getElement("<form></form>");
            //Make it invisible
            feba.domManipulator.css(frm, "display", "none");
            //Get the button which was clicked by the user
            var button = feba.domManipulator.getElement(this);
            //Check if it is a download button
            var isDownloadButton = feba.domManipulator.getAttribute(button, "data-isDownloadButton");
            var downloadCallbackFunction = feba.domManipulator.getAttribute(button, "data-downloadCallBackFunction");
            //If it is not an upload
            if (!params.isMultiPartRequest) {
                //And it is a download
                if (isDownloadButton === Constants.TRUE) {
                    //Set a flag in the form indicating that this is a download (will be used by the server)
                    feba.domManipulator.setAttribute(frm, "isDownloadAction", "true");

                    //Clone the contents inside the widget and add them to the form
                    cloneAndAppendToForm(divElements, frm);

                    //Determine the target which has to be updated with the response
                    var target = feba.domManipulator.getElementById(feba.features[params.groupletJsVarName].options.target);

                    //If it is a Modal View
                    if (feba.features[params.groupletJsVarName].options.tagHelper == "MODAL_VIEW.TagHelper") {
                        //The target is the modal view div
                        target = feba.domManipulator.getElementById("modalDialog");
                    }
                    //If it is a calendar
                    if (feba.features[params.groupletJsVarName].options.isCalendar == Constants.TRUE) {
                        //The target is the calendar div
                        target = feba.domManipulator.getElementById("simplemodal-container");
                    }
                    //Fix for call id 416334
                    if (!target || (target != undefined && target.length == 0) && feba.domManipulator.getElementById("modalDialog").length > 0) {
                        target = feba.domManipulator.getElementById("modalDialog");

                    }
                    //Create a new iFrame
                    var frameName = "downloaderFrame" + new Date().getTime();
                    var jFrame = createFrame(target, frm, frameName);

                    //Load the iFrame
                    jFrame.load(
                        //This function is a callback and will be executed after the response comes back	
                        function(event) {
                            var content = window.frames[frameName].document.getElementsByTagName("body")[0];
                            var dContent;
                            if (feba.features[params.groupletJsVarName].options.tagHelper == "MODAL_VIEW.TagHelper") {
                                //Case for modal inside grouplet
                                if (params.groupletId) {
                                    dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), "div[id=" + params.groupletId.toUpperCase() + "]");

                                } else {
                                    //Normal Modal scenario
                                    dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), "div[id=MODAL_VIEW_CONTAINER]");
                                }
                            } else {
                                dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), "div[id=" + target[0].id.toUpperCase() + "]");
                            }
                            //Remove the iFrame after waiting for 100 milli-seconds
                            setTimeout(function() {
                                feba.domManipulator.remove(jFrame);
                            }, 10);
                            if (dContent.length != 0) {
                                feba.domManipulator.getElementById(params.groupletDivId).children().remove();
                                feba.domManipulator.getElementById(params.groupletDivId).append(dContent[0].outerHTML);
                                var userType;
                                if (document.getElementById('usertype')) {
                                    userType = document.getElementById('usertype').value;
                                }
                                if (userType != '4') {

                                    /*Code to add styles for comboboxes: start*/
                                    feba.domManipulator.documentReady(convertComboboxes);
                                    /*Code to add styles for comboboxes: end*/
                                }
                                handleDownloadException(params.groupletDivId);
                            }
                            feba.domManipulator.setCssProperties(feba.domManipulator.getElementById(target), {
                                "backgroundImage": ""
                            });
                        }
                    );
                    //Add hidden fields to the form
                    addHiddenFields(this, params, frm);
                    //Add form specific attributes
                    addFormAttr(frm, frameName, params.formAction);
                    //Trigger the submission of the form
                    feba.domManipulator.trigger(frm, Constants.SUBMIT);
                    //Remove the temporary form
                    feba.domManipulator.remove(frm);
                    if (downloadCallbackFunction && downloadCallbackFunction.length > 0) {
                        try {
                            eval(downloadCallbackFunction);
                        } catch (e) {
                            LOG.logMessages("Exception invoking callback function post download" + e);
                        }
                    }
                } else { // This is called for regular submits (not downloads)
                    //Check added to fetch elements only in modal 
                    if (feba.domManipulator.getElementById("MODAL_VIEW_CONTAINER").length > 0) {
                        var passwordElements = feba.domManipulator.find(feba.domManipulator.getElementById("MODAL_VIEW_CONTAINER"), getSpecifiedElements(params.groupletId.toUpperCase(), ':password'));
                        var textElements = feba.domManipulator.find(feba.domManipulator.getElementById("MODAL_VIEW_CONTAINER"), getSpecifiedElements(params.groupletId.toUpperCase(), jQuery('[encryptionRequired="true"]')));
                        var selectElements = feba.domManipulator.find(feba.domManipulator.getElementById("MODAL_VIEW_CONTAINER"), getSpecifiedElements(params.groupletId.toUpperCase(), feba.domManipulator.getElement("select[encryptionRequired='true']")));
                    } else {
                        // Checking whether there is a password element on the grouplet
                        var passwordElements = getSpecifiedElements(params.groupletId.toUpperCase(), ':password');
                        //var textElements = getSpecifiedElements(params.groupletId.toUpperCase(),":text:'[encryptionRequired=true]'");
                        //Modified for sizzle error in RWD by Vinay
                        var textElements = getSpecifiedElements(params.groupletId.toUpperCase(), jQuery("[encryptionRequired='true']"));
                        var selectElements = getSpecifiedElements(params.groupletId.toUpperCase(), feba.domManipulator.getElement("select[encryptionRequired='true']"));
                    }


                    for (var count = 0; count < textElements.length; count++) {
                        passwordElements.push(textElements[count])
                    }
                    var selectEncryptedElements = new Array();
                    //Custom Encryption changes
                    if (!feba.domManipulator.getElementById("MODAL_VIEW_CONTAINER").length > 0) {
                        for (var count = 0; count < selectElements.length; count++) {
                            passwordElements.push(selectElements[count]);
                            var hiddenEncryptElem = "<input type=\"Hidden\" id=\"" + selectElements[count].id + "_EncryptedSelectVal\"  name=\"" + selectElements[count].name + "\" value=\"\" >";
                            jQuery(hiddenEncryptElem).insertBefore(selectElements[count]);
                            var domElementWithEncVal = document.getElementById(selectElements[count].id + "_EncryptedSelectVal");
                            selectEncryptedElements.push(selectElements[count].id + "_EncryptedSelectVal");
                            //inputElements = inputElements.add(domElementWithEncVal);
                        }
                    } else {
                        for (var count = 0; count < selectElements.length; count++) {
                            passwordElements.push(selectElements[count]);
                            var hiddenEncryptElem = "<input type=\"Hidden\" id=\"" + selectElements[count].id + "_EncryptedSelectVal\"  name=\"" + selectElements[count].name + "\" value=\"\" >";
                            jQuery(hiddenEncryptElem).insertBefore(jQuery("#MODAL_VIEW_CONTAINER").find(selectElements[count]));
                            var domElementWithEncVal = document.getElementById(selectElements[count].id + "_EncryptedSelectVal");
                            selectEncryptedElements.push(selectElements[count].id + "_EncryptedSelectVal");
                        }
                    }
                    //If there are password elements
                    if (passwordElements.length) {
                        //Disable the buttons on the widget
                        disableButton(feba.domManipulator.getAttribute(button, "id"), params.groupletId);
                        //Encrypt all the password fields
                        encryptValues(params.groupletId);
                    }

                    //configure the form action as the Base URL
                    //abhishek_pidwa
                    //feba.features[params.groupletJsVarName].options.baseUrl=params.formAction;
                    var resourceURL = feba.features[params.groupletJsVarName].options.resourceURL;

                    if (resourceURL != null) {
                        feba.features[params.groupletJsVarName].options.baseUrl = feba.features[params.groupletJsVarName].options.resourceURL;
                    } else {
                        feba.features[params.groupletJsVarName].options.baseUrl = params.formAction;
                    }

                    // code added by sagar_n01 for APM enhancement
                    // below code appends FG name and event clicked as hidden fields
                    if (Constants.YES === CONFIG.addtionalURLParamRequired) {
                        var inputElements = inputElements.add("<input type=\"hidden\" name=\"EID\" value=\"" + event.target.name + "\"></input>");
                        for (var i = 0; i < inputElements.length; i++) {
                            if ((inputElements[i].name == 'GROUPLET_FORMSGROUP_ID__') || (inputElements[i].name == 'FORMSGROUP_ID__') || (inputElements[i].id == 'GROUPLET_FORMSGROUP_ID__')) {
                                inputElements = inputElements.add("<input type=\"hidden\" name=\"FID\" value=\"" + inputElements[i].value + "\"></input>")
                                break;
                            }
                        }
                    }
                    //APM enhancement- END
                    //Serialize the contents (input elements) of the widget
                    for (e = 0; e < selectEncryptedElements.length; e++) {
                        var currElementId = selectEncryptedElements[e];
                        var actualElement = document.getElementById(currElementId);
                        inputElements = inputElements.add(actualElement);
                    }
                    var serializedString = feba.domManipulator.serialize(inputElements).replace(/\+/g, " ");
                    //Remove all div elements
                    //feba.domManipulator.remove(divElements);

                    //Create a grouplet parameters object containing the serialized String and other common fields
                    feba.features[params.groupletJsVarName].options.groupletParameters = serializedString +
                        "&" + feba.domManipulator.getAttribute(feba.domManipulator.getElement(this), Constants.NAME) +
                        "=" + feba.domManipulator.getAttribute(feba.domManipulator.getElement(this), Constants.VALUE) +
                        "&" + params.groupletNameConst + "=" + params.groupletId + "&" + params.riaRequestTypeConst + "=" + params.riaType + "&GROUPLETS_IN_PAGE=" + _GROUPLETS_IN_PAGE_;


                    //If there is any IGC configured for a button click 
                    feba.features[params.groupletJsVarName].options.actionElement = getElementName(event);
                    feba.features[params.groupletJsVarName].options.actionElementId = feba.domManipulator.getAttribute(event.target, Constants.ID);
                    //invoke the target
                    feba.features[params.groupletJsVarName].execute();
                }
            } else if (params.isMultiPartRequest) { //If this is an upload button
                //Append the form to the existing elements on the widget
                divElements.appendTo(frm);
                //Get the target
                var targetElementId = feba.features[params.groupletJsVarName].options.target;
                var target = feba.domManipulator.getElementById(targetElementId);
                //Paint the loading image
                feba.domManipulator.setCssProperties(target, {
                    backgroundImage: "url(" + feba.features[params.groupletJsVarName].options.loadingImage + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                });

                //Create an iFrame
                var frameName = "uploaderFrame" + new Date().getTime();
                var jFrame = createFrame(target, frm, frameName);
                jFrame.load(
                    //Callback function which will be invoked on response
                    function(event) {
                        var content = window.frames[frameName].document.getElementsByTagName("body")[0];
                        var dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), 'div[id="' + targetElementId.toUpperCase() + '"]');
                        setTimeout(function() {
                            feba.domManipulator.remove(jFrame);
                        }, 100);
                        //TODO: Has to be moved out of this code. Use feba.domManipulator instead
                        var isJqueryObj = dContent instanceof jQuery;
                        var columnDiv = feba.domManipulator.getIdWithAppend(targetElementId, " > div");
                        if (isJqueryObj) {
                            columnDiv.children().remove();
                            try {
                                columnDiv.html(dContent.html());
                            } catch (e) {
                                columnDiv.html(dContent.parent().html());
                            }
                        } else {
                            feba.domManipulator.replaceWith(column1Div.children(), dContent);
                        }

                        feba.domManipulator.setCssProperties(target, {
                            "backgroundImage": ""
                        });
                        feba.features[params.groupletJsVarName].options.requestId += 1;
                        /*if file is not uploaded and clicked on continue, throws js exception and combobox if present on the screen does not paints correctly.*/
                        // added for RHS alignment
                        handleMultipartException(params.groupletJsVarName);
                    }
                );
                //Add hidden fields
                addHiddenFields(this, params, frm);
                //Add form specific attributes
                addFormAttr(frm, frameName, params.formAction);
                //Set flags indicating that this is an upload
                feba.domManipulator.setAttribute(frm, Constants.ENCTYPE, Constants.MULTIPART);
                feba.domManipulator.setAttribute(frm, 'encoding', 'multipart/form-data');
                //Submit the form
                feba.domManipulator.trigger(frm, Constants.SUBMIT);
                //Remove the form
                feba.domManipulator.remove(frm);
            }
            //Ensure the click event is not propagated upwards to the browser
            event.stopImmediatePropagation();
            feba.domManipulator.preventDefault(event);
        });
    }
};
addHiddenFields = function(button, params, frm) {
    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + params.groupletNameConst + "\" value=\"" + params.groupletId + "\"></input>"));
    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + params.riaRequestTypeConst + "\" value=\"" + params.riaType + "\"></input>"));
    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + jQuery(button).attr(Constants.NAME) + "\" value=\"" + feba.domManipulator.getAttribute(feba.domManipulator.getElement(button), Constants.VALUE) + "\"></input>"));
    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + Constants.X_REQUESTED_WITH + "\" value=\"" + Constants.RIA_UPLOAD_REQUEST + "\"></input>"));
    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + Constants.REQUEST_ID + "\" value=\"" + feba.features[params.groupletJsVarName].options.requestId + "\"></input>"));
};
createFrame = function(target, frm, frameName) {
    var jFrame = feba.domManipulator.getElement("<iframe id=\"" + frameName + "\" src=\"about:blank\" name=\"" + frameName + "\"/>");
    feba.domManipulator.css(jFrame, "display", "none");
    feba.domManipulator.append(target, jFrame);
    feba.domManipulator.append(target, frm);
    return jFrame;
};
createFrameForLink = function(target, frm, frameName) {
    var jFrame = feba.domManipulator.getElement("<iframe id=\"" + frameName + "\" src=\"about:blank\" name=\"" + frameName + "\"/>");
    feba.domManipulator.css(jFrame, "display", "none");
    feba.domManipulator.append(target, jFrame);
    feba.domManipulator.append(target, frm);
    return jFrame;
};
addFormAttr = function(frm, frameName, action) {
    feba.domManipulator.setAttribute(frm, Constants.ACTION, action);
    feba.domManipulator.setAttribute(frm, Constants.METHOD, Constants.POST);
    /*fix for download issue in Apple devices. defect 755819*/
    /*added check for 'DOWNLOADERFRAME' for defect: 775076*/
    if ((jQuery.browser.safari) && (frameName.toUpperCase().indexOf('DOWNLOADERFRAME') != -1) && (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) && navigator.userAgent.match(/like Mac OS X/i)) {
        if (jQuery('.dropdownexpandalbe_download option:selected').text().toLowerCase().indexOf("select") >= 0) {
            feba.domManipulator.setAttribute(frm, "target", frameName);
        } else {
            feba.domManipulator.setAttribute(frm, "target", "_blank");
        }
    } else {
        feba.domManipulator.setAttribute(frm, "target", frameName);
    }
};
printPopUp = function(params, hyperLink) {
    feba.domManipulator.click(hyperLink, function(event) {
        //The following condition removes an older unnecessary print Iframe on the grouplet if it exists
        var typeSys = feba.domManipulator.getElementStartingWith("ERR_MSG_SPAN");
        if (0 < typeSys.size()) {
            event.stopImmediatePropagation();
            feba.domManipulator.preventDefault(event);
            return;
        }
        var divElements = jQuery(feba.domManipulator.getElementById(params.groupletDivId)[0]);
        var clonedElements = feba.domManipulator.clone(divElements);

        /*TODO	Remove the additional Div painted for Session scoped dynamic grouplets	*/
        /*while(feba.domManipulator.getAttribute(clonedElements[0],'id').indexOf('BrdCrumbNImg')== -1){
        	clonedElements=clonedElements.slice(1); 
         }*/
        var iFrameContent = feba.domManipulator.append(feba.domManipulator.getElement("<div id = \"parentPrint\"></div>"), clonedElements);
        //Removing an earlier Print Iframe if present so we don't have unnecessary Iframes after multiple prints
        var oldIframe = feba.domManipulator.getElementStartingWith("printFrame");
        if (oldIframe) {
            feba.domManipulator.remove(oldIframe);
        }
        var frameName = "printFrame" + new Date().getTime();
        //Creating a blank IFrame
        var iframe = feba.domManipulator.getElement("<iframe id=\"" + frameName + "\" name=\"" + frameName + "\"/>");
        feba.domManipulator.append(feba.domManipulator.getElement(divElements[0]), iframe);
        //iframe.load(function(){		
        //Appending CSS To iFrame. May appear complicated, so commented below is the jquery equivalent
        /*
        jQuery("#"+ frameName).contents().find('head').append("<link href=\"consumer/theme/new_style.css\" rel=\"stylesheet\" type=\"text/css\"/>");
        */
        feba.domManipulator.append(feba.domManipulator.find(feba.domManipulator.contents(feba.domManipulator.getElementById(frameName)), "head"), "<link href=\"consumer/theme/new_style.css\" rel=\"stylesheet\" type=\"text/css\"/>");
        //Similar to the above, we add iframe content in the body
        feba.domManipulator.append(feba.domManipulator.find(feba.domManipulator.contents(feba.domManipulator.getElementById(frameName)), "body"), iFrameContent);
        var ifr = LIB.__GET_DOM__(frameName);
        feba.domManipulator.getElementById(frameName);
        setTimeout(function() {
            //Hiding the IFrame
            feba.domManipulator.hideElement(iframe);
        }, 100);
        /*TODO
        2.	Push the code for i-Frame execution and handle differently for IE and Firefox. Dont depend on exception handling.
        */
        var browser = fsClientBrowser();
        if ("msie" === browser) {
            ifr.contentWindow.document.execCommand('print', false, null);
        } else {
            window.frames[frameName].print();
        }
        //});
        feba.domManipulator.preventDefault(event);
    });
};
//This flag is used so that the handler
//for the container grouplet is changed only once
var doOnce = false;
var portetRendered = "";
var portaldoOnce = false;
handleNew = function(controllerName, contentId, loadingImage, SecureControllerName, column1DivClass, portalWindowId) {
    //Getting the container column
    //Done by abhishek pidwa - changes for Container Grouplet in portal environment
    var containerGroupletId = Constants.CONTAINER_GROUPLET;
    var column1Div = feba.domManipulator.getElement('[class="column column-1"]');;

    if (portalWindowId.length > 0) {
        containerGroupletId = portalWindowId + "_" + Constants.CONTAINER_GROUPLET;
        column1Div = feba.domManipulator.getElement(column1DivClass);

    }

    if (!column1Div[0]) {
        column1Div = feba.domManipulator.getElementById('main').children();
    }
    /**
     * This method is used to set the loading image
     */
    var setLoadingImage = function() {
        feba.domManipulator.setCssProperties(
            column1Div, {
                "min-height": "300px",
                "min-width": "300px",
                "backgroundImage": "url(" + loadingImage + ")",
                "backgroundRepeat": "no-repeat",
                "backgroundPosition": "center"
            });
    };
    /**
     * This method is used to remove the loading image
     * 
     */
    var removeLoadingImage = function() {
        feba.domManipulator.css(column1Div, "backgroundImage", "");
    };
    portalWindowId = "#" + portalWindowId + "#";

    //this piece of code is run only once.
    //it changes the handler for the container grouplet
    //this handler will paste the content returned from ajax request
    //into the container column div
    if (!(doOnce) || (portetRendered.indexOf(portalWindowId) == -1)) {
        doOnce = true;
        if (portalWindowId.length > 0) {
            portetRendered = "#" + portetRendered + portalWindowId + "#";
        }
        feba.features[containerGroupletId].options.target = column1Div;
        feba.features[containerGroupletId].options.handler = '';
        feba.features[containerGroupletId].options.handler = function() {
            this.isRequestInProcess = false;
            setLoadingImage();
            removeLoadingImage();
            this.content = this.parser.content[0];
            var totalContent = '';
            for (i = 0; i < this.content.length; i++) {
                totalContent = totalContent + this.content[i].innerHTML;
            }
            if (portalWindowId.length > 0) {

                var scriptDiv = portalWindowId + "_script";
                var scriptsLength;
                var element = jQuery('#' + scriptDiv);
                element.html("");
                var content = this.content;
                scriptsLength = totalContent.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
                totalContent = totalContent.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), "");

            }
            column1Div.html("");
            column1Div.html(this.content);
            if (portalWindowId.length > 0) {
                for (var index = 0; index < scriptsLength.length; index++) {
                    try {
                        element.append(scriptsLength[index]);

                    } catch (e) {}
                }
            }
        };

        feba.features[containerGroupletId].clearColumnDiv = function() {
            feba.domManipulator.remove(feba.domManipulator.children(column1Div));
        };

        feba.features[containerGroupletId].handleTimeout = '';
        feba.features[containerGroupletId].handleTimeout = function(jqXHR, textStatus, errorThrown) {
            removeLoadingImage();
            this.options.isRequestInProcess = false;
            feba.domManipulator.append(column1Div, "<p>" + getMessage("ErrorLoadingWidget") + "</p><a href=\"javascript:feba.features[\'ContainerGrouplet\'].clearColumnDiv();feba.features[\'ContainerGrouplet\'].execute();\">" + getMessage("Refresh") + "</a>");
        };


    }



    //This is the main function that handles clicks from the container Column div
    var handlerFunction = function(event) {
        //Getting the target element on which the click occured

        var eventId = event.target.id;
        var eventId1 = eventId;
        var result = eventId1.split(':');
        var btnid = result[1];
        var pageJumpEnabled;
        if (document.getElementById(btnid) != null) {
            pageJumpEnabled = document.getElementById(btnid).value;
        }
        $target = feba.domManipulator.getElement(event.target);
        var isDownloadButton = feba.domManipulator.getAttribute($target, "data-isDownloadButton");
        if (!(portalWindowId.length > 0 && (pageJumpEnabled == 'pagejumpenabled' || isDownloadButton == 'true'))) {
            if ($target[0] && $target[0].nodeName != 'A' && $target[0].nodeName != 'INPUT' && ($target.parent()[0].nodeName == 'A' || $target.parent()[0].nodeName == 'INPUT')) {
                $target = $target.parent();
            }
            if ($target[0] && $target[0].nodeName != 'A' && $target[0].nodeName != 'INPUT' && ($target.children()[0].nodeName == 'A' || $target.children()[0].nodeName == 'INPUT')) {
                $target = jQuery($target.children()[0]);
            }
            //checking if the target element is a hyperlink
            if ($target[0].nodeName == 'A' &&
                !isExcluded(feba.domManipulator.getAttribute($target, Constants.ID),
                    true, feba.features[containerGroupletId].options.exclusionIds,
                    feba.domManipulator.getAttribute($target, Constants.HREF),
                    feba.domManipulator.getAttribute($target, Constants.IS_EXCLUDED))
            ) {
                feba.domManipulator.getElementById("GroupletPanel").html("");
                var hyperLink = $target;
                feba.features[containerGroupletId].options.baseUrl = feba.domManipulator.getAttribute(hyperLink, Constants.HREF).replace(SecureControllerName + '?', controllerName + '?');
                feba.features[containerGroupletId].options.groupletParameters = '__RIA__' + '=' + 'GROUPLET' + '&' + contentId + '=' + 'ContainerGrouplet';
                column1Div.html("");

                setLoadingImage();
                feba.features[containerGroupletId].execute();
                feba.domManipulator.preventDefault(event);

            } //checking if the target element is a button
            else if ($target[0].nodeName == 'INPUT' && feba.domManipulator.getAttribute($target, 'type') == 'submit' &&
                !isExcluded(feba.domManipulator.getAttribute($target, Constants.ID), false,
                    feba.features[containerGroupletId].options.exclusionIds, null, null)) {
                if (feba.features[containerGroupletId].options.isMultipartRequest) {
                    /*Creating the iframe*/
                    var frameName = "uploaderFrame" + new Date().getTime();
                    var frm = feba.domManipulator.getElement("<form></form>");
                    feba.domManipulator.css(frm, "display", "none");
                    feba.domManipulator.append(frm, column1Div.children());

                    var jFrame = createFrame(column1Div, frm, frameName);
                    /*
                    	creating the form with target as the iframe
                    */


                    feba.domManipulator.setAttribute(frm, Constants.ACTION, controllerName);
                    feba.domManipulator.setAttribute(frm, Constants.METHOD, Constants.POST);
                    feba.domManipulator.setAttribute(frm, "target", frameName);
                    feba.domManipulator.setAttribute(frm, Constants.ENCTYPE, Constants.MULTIPART);
                    feba.domManipulator.setAttribute(frm, 'encoding', 'multipart/form-data');
                    //cloneAndAppendToForm(column1Div.children(),frm);

                    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + contentId + "\" value=\"" + Constants.CONTAINER_GROUPLET + "\"></input>"));
                    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"__RIA__\" value=\"GROUPLET\"></input>"));
                    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + jQuery($target).attr(Constants.NAME) + "\" value=\"" + feba.domManipulator.getAttribute(feba.domManipulator.getElement($target), Constants.VALUE) + "\"></input>"));
                    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + Constants.X_REQUESTED_WITH + "\" value=\"" + Constants.RIA_UPLOAD_REQUEST + "\"></input>"));
                    feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + Constants.REQUEST_ID + "\" value=\"" + feba.features[Constants.CONTAINER_GROUPLET].options.requestId + "\"></input>"));
                    /* form created*/

                    /*on frame load we need to perform some actions hence creating a function to be called on frame load*/
                    jFrame.load(
                        function(event) {

                            var content = window.frames[frameName].document.getElementsByTagName("body")[0];
                            var dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), 'div[id="' + Constants.CONTAINER_GROUPLET.toUpperCase() + '"]');
                            setTimeout(function() {
                                feba.domManipulator.remove(jFrame);
                                feba.domManipulator.remove(frm);
                            }, 100);
                            var isJqueryObj = dContent instanceof jQuery;
                            if (isJqueryObj) {
                                column1Div.children().remove();
                                try {
                                    column1Div.html(dContent);
                                } catch (e) {
                                    column1Div.html(dContent.parent().html());
                                }
                            } else {
                                feba.domManipulator.replaceWith(column1Div.children(), dContent);
                            }


                            if (feba.features[Constants.CONTAINER_GROUPLET].options.isMultipartRequest) {

                                feba.features[Constants.CONTAINER_GROUPLET].options.requestId += 1;
                            } else {
                                feba.domManipulator.setCssProperties(column1Div, {
                                    "backgroundImage": ""
                                });
                            }
                        }
                    );
                    /*frame on load function definition done*/



                    /*triggering the form to submit with target as the iframe*/
                    feba.domManipulator.trigger(frm, Constants.SUBMIT);
                    setLoadingImage();

                } else {
                    var isDownloadButton = feba.domManipulator.getAttribute($target, "data-isDownloadButton");
                    if (isDownloadButton === Constants.TRUE) {
                        var frm = feba.domManipulator.getElement("<form></form>");
                        feba.domManipulator.css(frm, "display", "none");
                        var frameName = "downloaderFrame" + new Date().getTime();
                        var jFrame = createFrame(column1Div, frm, frameName);


                        cloneAndAppendToForm(column1Div.children(), frm);
                        feba.domManipulator.setAttribute(frm, Constants.ACTION, controllerName);
                        feba.domManipulator.setAttribute(frm, Constants.METHOD, Constants.POST);
                        feba.domManipulator.setAttribute(frm, "target", frameName);

                        feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + contentId + "\" value=\"" + Constants.CONTAINER_GROUPLET + "\"></input>"));
                        feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"__RIA__\" value=\"GROUPLET\"></input>"));
                        feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + jQuery($target).attr(Constants.NAME) + "\" value=\"" + feba.domManipulator.getAttribute(feba.domManipulator.getElement($target), Constants.VALUE) + "\"></input>"));
                        feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + Constants.X_REQUESTED_WITH + "\" value=\"" + Constants.RIA_UPLOAD_REQUEST + "\"></input>"));
                        feba.domManipulator.append(frm, feba.domManipulator.getElement("<input type=\"hidden\" name=\"" + Constants.REQUEST_ID + "\" value=\"" + feba.features[Constants.CONTAINER_GROUPLET].options.requestId + "\"></input>"));

                        jFrame.load(
                            function(event) {

                                var content = window.frames[frameName].document.getElementsByTagName("body")[0];
                                var dContent = feba.domManipulator.find(feba.domManipulator.getElement(content), 'div[id="' + Constants.CONTAINER_GROUPLET.toUpperCase() + '"]');
                                setTimeout(function() {
                                    feba.domManipulator.remove(jFrame);
                                    feba.domManipulator.remove(frm);
                                }, 100);
                                feba.domManipulator.replaceWith(column1Div.children(), dContent);
                                if (feba.features[Constants.CONTAINER_GROUPLET].options.isMultipartRequest) {
                                    feba.features[Constants.CONTAINER_GROUPLET].options.requestId += 1;
                                } else {
                                    feba.domManipulator.setCssProperties(column1Div, {
                                        "backgroundImage": ""
                                    });
                                }
                            }
                        );

                        feba.domManipulator.trigger(frm, Constants.SUBMIT);
                    } else {
                        var inputs = feba.domManipulator.find(column1Div, 'input');
                        var textareas = feba.domManipulator.find(column1Div, 'textarea');
                        var selects = feba.domManipulator.find(column1Div, 'select');
                        var inputSerial = feba.domManipulator.serialize(inputs).replace(/\+/g, " ");
                        var textAreaSerial = feba.domManipulator.serialize(textareas).replace(/\+/g, " ");
                        var selectSerial = feba.domManipulator.serialize(selects).replace(/\+/g, " ");

                        if (inputSerial.length > 0) {
                            inputSerial = inputSerial + '&';
                        }
                        if (textAreaSerial.length > 0) {
                            textAreaSerial = textAreaSerial + '&';
                        }
                        if (selectSerial.length > 0) {
                            selectSerial = selectSerial + '&';
                        }
                        feba.features[containerGroupletId].options.baseUrl = controllerName;
                        feba.features[containerGroupletId].options.groupletParameters = inputSerial + textAreaSerial + selectSerial +
                            contentId + '=' + containerGroupletId + '&' + '__RIA__' + '=' + 'GROUPLET' +
                            '&' + feba.domManipulator.getAttribute($target, Constants.NAME) + '=' + feba.domManipulator.getAttribute($target, Constants.VALUE);
                        column1Div.html("");
                        setLoadingImage();
                        feba.features[containerGroupletId].execute();

                    }
                }

                feba.domManipulator.preventDefault(event);
            }
        }
    };
    //registering the handler function as the event handler for clicks events
    //that bubble up from the container columnDiv
    feba.domManipulator.click(column1Div, handlerFunction);
};
//Handling client Side Widget - Widget Communication
handleTargetGrouplets = function(groupletOptions) {

    //Gets Target Grouplet Details from options object
    var targetObjArray = groupletOptions.targetObjectDetailsArray;



    var customActionElementsArray = groupletOptions.customActionElementsArray;

    //If the customActions are defined
    if (customActionElementsArray != null && customActionElementsArray != "") {

        //Iterate through the custom actions and sets the eventslisteners
        var length = targetObjArray.length;
        for (var index = 0; index < length; index++) {
            handleCustomActions(groupletOptions, targetObjArray[index], customActionElementsArray[index]);
        }
    }

    //Invokes the GroupletController if the targetGrouplet is defined for the action
    var actionTargetGroupletMap = groupletOptions.actionTargetGroupletMap;
    if (actionTargetGroupletMap != null) {
        if (jQuery.inArray("onrefresh", actionTargetGroupletMap.keyArray) > -1) {
            var targetDetailsArray = groupletOptions.actionTargetGroupletMap.get("onrefresh");
        } else {
            var targetDetailsArray = groupletOptions.actionTargetGroupletMap.get(groupletOptions.actionElement);
        }
        if (targetDetailsArray != null && groupletOptions.actionElement) {

            customActionEventHandler(groupletOptions, feba.domManipulator.getElementById(groupletOptions.actionElementId), targetObjArray);
            groupletOptions.actionElement = "";
            groupletOptions.actionElementId = "";
            //var dataKey=feba.domManipulator.getAttribute(targetDetailsArray,Constants.KEY);
            //new feba.js.ajax.groupletController(groupletOptions,targetDetailsArray,dataKey);
        } else if (targetDetailsArray != null) {
            new feba.js.ajax.groupletController(groupletOptions, targetDetailsArray);
        }
    }

};