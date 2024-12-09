/**
 * FEBAScripts.js
 * The Container and Controller file for all script files .
 * It comprises of LIB,LOG,CONFIG,FEBA objects which are used throughout the RIA Framework.
 * This file is loaded from topbar.js
 *
 * Created on jun,1 2009
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
 */
// Global variable, used to decide whether page is loading through ajax or not
var ajaxPageRefresh = window.ajaxPageRefresh;
if (ajaxPageRefresh == undefined) {
    ajaxPageRefresh = false;
}

/**
 * The container and controller Object for configuring the applictaion to testing or development mode
 */
CONFIG = {
    logMode: "CONSOLE",
    operatingMode: "DEVELOPMENT",
    blockOnButtonClicksRequired: "N",
    blockOnHyperLinkClicksRequired: "N",
    addtionalURLParamRequired: "N"
};

/**
 * The container object for maintaining all constants.
 */
Constants = {
    TITLE: "title",
    COLOR: "color",
    TYPE: "type",
    CONTAINER_GROUPLET: "ContainerGrouplet",
    FEBA_TYPE: "data-febaType",
    FEBA_MANDATORY: "data-febaMandatory",
    FEBA_VALIDATION: "data-febaValidation",
    FEBA_COMMON: "common",
    FEBA_PAGE: "page",
    HREF: "href",
    FM_FG: "FormManagementFG",
    VAQ_FG: "ApprovalQueueListFG",
    TRAN_FG: "TranRequestManagerFG",
    JSP_NAME_TRAN: "SendForRepairPreviewDetailsUX3",
    JSP_NAME_PAYMENT: "AddEntryUX3",
    JSP_NAME_VAQ: "CorporateApprovalQueueUX3",
    JSP_NAME_VAQRET: "RetailApprovalQueueUX3",
    JSP_NAME_UAT: "UATDataCaptureUX3",
    JSP_NAME_SMA: "SMADataCaptureUX3",
    JSP_NAME_LOR: "LORDataCaptureUX3",
    JSP_NAME_CPL: "CPLPersonalizeLimitsUX3",
    JSP_NAME_CPLDATA: "CPLDataCaptureUX3",
    SELECTUX: "Select",
    FEBA_AJAXFEATURES: "ajaxfeatures",
    FEBA_EFFECTS: "visualeffects",
    ERRORDISPLAY_TAG: "MessageDisplay_TABLE",
    GROUPLET_ERRORDISPLAY_TAG: "MessageDisplay_GROUPLET_TABLE",
    PAGEHEADING_TAG: "PgHeading",
    ERROR_HIGHLIGHT_CLASS: "error_highlight",
    GENERAL_CLASS: "simpletext",
    ERROR_ROW_HIGHLIGHT_CLASS: "ERROR_ROW_BG",
    TRUE: "true",
    DIV: "div",
    JSON: "json",
    JSON_TO_HTML_LIST: "jsontohtmllist",
    JSON_MULTIPLE: "jsonMultiple",
    JSON_TO_MAP: "jsontomap",
    STRING: "string",
    CANCEL: "cancel",
    IS_EXCLUDED: "data-isExcluded",
    IS_FATAL: "isFatal",
    COLON: ":",
    SUBMIT: "submit",
    RESET: "reset",
    ID: "id",
    NAME: "name",
    VALUE: "value",
    ACTION: "action",
    POST: "post",
    METHOD: "method",
    ENCTYPE: "enctype",
    MULTIPART: "multipart/form-data",
    REQUEST_ID: "requestId",
    INPUT: "INPUT",
    SELECT: "SELECT",
    ANCHOR: "A",
    TEXTFIELD: "text",
    EXCLUSION_LOOKUP_VALUE: "8",
    MAX_ALLOWED_RIA_FEATUREID: "15",
    GROUPLET_ID_ATTR: "data-groupletId",
    EXCEPTION_WIDGETS: "ExceptionWidgets",
    PROCESSING_MESSAGE: "",
    RELOADING_MESSAGE: "<h1>Exception occured .Reloading the Grouplet</h1>",
    X_REQUESTED_WITH: "X-Requested-With",
    GROUPLET_LOAD: "onload",
    FALSE: "false",
    RIA_UPLOAD_REQUEST: "RIAUploadRequest",
    IS_CSW_REQUEST: "__IS_CSW_REQUEST__",
    KEY: "data-key",
    ROW_SELECTED_STYLE: "data-rowselectedstyle",
    TABLE_TAG: "table",
    REQUEST_ID: "Requestid",
    TR_TAG: "tr",
    CROSS_SELL_CONTAINER: "CrossSellContainer",
    CROSS_SELL_GROUPLET: "cswGrouplet",
    GROUPLET_SEPERATOR: "_",
    MODAL_LOAD_PARAM: "::__IS_MODAL_LOAD__=Y",
    GROUPLET_ELEMENT_SEPERATOR: ":",
    AMPERSAND: "&",
    IS_NEW_TRANSACTION: "isInitiateNewTransaction",
    IS_PRINT: "data-isPrint",
    DYNAMIC_ATTR_SEPERATOR: '/',
    EXCEPTIONTYPE: "exceptionType",
    PARAMETERS_SEPERATOR: "::",
    SIMPLE_SELECT: "select-one",
    HIDDEN: "hidden",
    MULTIPLE_SELECT: "select-multiple",
    TEXTFIELD: "text",
    CHECKBOX: "checkBox",
    ASSIGNMENT: "=",
    UNDER_SCORE: "_",
    COMMA: ",",
    PIPE: "|",
    NULL: "NULL",
    RADIO: "radio",
    TARGET: "target",
    DOWNLOAD_LINK: "data-isDownloadLink",
    DOWNLOAD_BUTTON: "data-isDownloadButton",
    YES: "Y",
    FEBA_ADAPTIVEAUTH: "adaptiveauthentication",
    FEBA_ADAPTIVEAUTH_SOLUTION: "AdaptiveAuthSolution",
    RESPONSE_TYPE: "ResponseFormat",
    SPAN: "span_",
    UPDATE_PARENT_FROM_MODAL: "UPDATE_PARENT_FROM_MODAL",
    CONTROLLER_ARRAY: ["FinacleRiaRequest", "Finacle", "XService", "GDFPullServlet", "CxpsIBEventHandlerServlet", "CXPSGabDocReceiverServlet", "DevLogin", "AuthenticationController", "CMSServlet", "EventHandlerServlet"],
    LINK_SEPERATOR: "?",
    EXCLUDE_JSCOMBO_ATTR: "data-excludeJSCombo",
    DIGITAL_MOBITOKEN: "DGCT",
    DEVICE_BASED_MOBITOKEN: "PDAM",
    SMS_BASED_MOBITOKEN: "SMST",
    LISTING_FG: "DematBillDetailsListFG",
    LISTING_SEARCH: "[id='SearchPanel_Stage34.Rb5.C2']",
    VISIBLE_FG: "DematLedgerFG",
    VISIBLE_SEARCH: "[id='SearchPanel_Stage34.Rb3.C2']",
    COUNTERPARTY_ACCT: "C",
    THIRDPARTY_ACCT: "T",
    OWN_ACCT: "A",
    BLANK: "",
    ODL_ACCOUNTSLIST_UX3: "ODLAccountsListUX3",
    DRR_DATACAPTURE_UX3: "DRRDataCaptureUX3",
    ASR_DATACAPTURE_UX3: "ASRDataCaptureUX3",
    FDO_DATACAPTURE_UX3: "FDODataCaptureUX3",
    ODR_DATACAPTURE_UX3: "ODRDataCaptureUX3",
    MY_ACCOUNTS: "MA",
    LINKED_ACCOUNT: "LA",
    RENEW_INTEREST: "RenInt",
    REDEEM_INTEREST: "RedInt",
    RENEW: "Renew",
    RENEW_MATURE: "RenMatur",
    REDEEM: "Redeem",
    BRANCH: "Branch",
    COURIER: "Courier",
    REDEEM_MY_ACCOUNT: "RedMyAcc",
    REDEEM_LINKED_ACCOUNT: "RedLinkAc",
    REDEEM_CHEQUE: "RedChq",
    MY_ACC: "MyAcc",
    LINK_ACC: "LinkAcc",
    CHEQUE: "Cheque",
    JSP_NAME_UND: "UNDDataCaptureUX3",
    AADDATACAPTURE: "AADDataCaptureUX3",
    PLATINUMCARD: "PLA",
    BUSINESSCARD: "IDC",
    TITANIUMCARD: "TIT",
    ALERTS_DAILY: "D",
    ALERTS_WEEKLY: "W",
    ALERTS_MONTHLY: "M",
    ALERTS_YEARLY: "Y",
    //Added for ticket #696629
    HIJRI_DATE: "HJ",
    //Added for ticket #696083
    FINACLE_TITLE: "Finacle e-Banking:",
    AUDIT_MENU_OPTIONS: "M",
    AUDIT_SERVICEREQUEST_OPTIONS: "S",
    AUDIT_ALL_OPTIONS: "A",
    JSP_NAME_BSR: "LockboxBatchSummaryReport",
    FG_NAME_BSR: "LockboxBatchSummaryReportFG",
    RECURRING: "R",
    ONEOFF: "O",
    FORMSGROUP_ID: "FORMSGROUP_ID__",
    GROUPLET_FORMSGROUP_ID: "GROUPLET_FORMSGROUP_ID__",
    DOT: ".",
    MODEL_IN_GROUPLET: "MODAL_VIEW_CONTAINER",
    GROUPLET_SEP_MULTISELECT: ":::"
};




/**
 * The container and controller Object for logging.
 */
LOG = {

    logArray: [],

    // Logs the messages
    logMessages: function() {
        LOG.log("LOG", arguments);
    },

    // Logs the errors
    logErrors: function() {
        LOG.log("ERROR", arguments);
    },

    // Logs the warnings
    logWarnings: function() {
        LOG.log("WARNING", arguments);

    },

    log: function(level, logArguments) {
        var message = "";
        var that = logArguments[0];

        if (that.name && that.version) {
            message = that.name + " - " + that.version + ": ";
        }

        for (i = 1; i < logArguments.length; i++) {
            message += "  " + logArguments[i];
        }

        LOG.logArray.push(message);

        if (CONFIG.logMode === "ALERT") {
            alert(message);
        } else if (CONFIG.logMode === "CONSOLE") {
            logToConsole(level, logArguments);
        }

        function logToConsole(level, logArguments) {

            if ("undefined" !== typeof(window.console)) {
                if (level === "LOG") {
                    console.log(logArguments);
                } else if (level === "ERROR") {
                    console.error(logArguments);
                } else if (level === "WARNING") {
                    console.warning(logArguments);
                }
            } else {
                return;
            }
        }
    }

};


/**
 * The container and controller Object for library functions
 */

LIB = {

    // Adds the object to an array
    __ADD__: function(objects, object) {
        LOG.logMessages("In Add method adding the objects to array");
        objects.push(object);
    },

    // Removes the object from the array
    __REMOVE__: function(objects, object) {
        objects = this.objects.without(object);
    },

    // Calls startRequest method of objects
    __START__: function(objects, flag) { // startRequest all objects


        LOG.logMessages("In Start method Starting the  objects");

        if (flag) {
            this.startFlag = true;
            objects.each(function(item) {

                if (Object.isFunction(item.startRequest)) {
                    item.startRequest();
                } else {
                    throw new Error("Start function is undefined for object:" +
                        item);
                }
            });
        }

    },

    // stopRequest method of objects
    __STOP__: function(objects) {

        LOG.logMessages("In Stop method Stoping the  objects");
        this.startFlag = false;
        objects
            .each(function(item) {

                if (typeof(item.stopRequest) === "function") {
                    item.stopRequest();
                } else {
                    throw new Error(
                        "Stop function is undefined for object:" + item);
                }
            });

    },

    // Returns the status of the object(Whether it is started or stopped)
    __IS_RUNNING__: function() {
        LOG
            .logMessages(
                this,
                "In IsRunning method,returns the startFlag value the start Flag value is   ",
                this.startFlag);
        return this.startFlag;
    },

    // Loads the listeners
    __START_EVENT_LISTENING__: function(object) {

        if (typeof(object.setListeners) === "function") {

            LOG
                .logMessages(this,
                    "In STARTEVENTLISTENING method which sets the event Listeners");
            object.setListeners();
        }
    },

    // unloads the listeners
    __STOP_EVENT_LISTENING__: function(object) {
        if (typeof(object.removeListeners) === "function") {

            LOG
                .logMessages(this,
                    "In STOPTEVENTLISTENING method which removes the event Listeners");
            object.removeListeners();
        }
    },

    __GET_DOM__: function(element) {
        var result = feba.domManipulator.getElementById(element)[0];
        return result;
    },

    //overrides the default toString Method
    __TO_STRING__: function(object) {
        var objectString = "";
        for (var key in object) {

            if (typeof(object[key]) !== "function") {

                objectString += object[key];
            }
        }
        return objectString;
    },
    __GET_OPTIONS_BY_SPLIT__: function(value) {
        var splitResult = value.split("|");
        var option = new Option(splitResult[1], splitResult[0]);
        option.title = splitResult[1];
        return option;
    },
    //Code changes - conversion from prototype methods to jQuery 12/1/2011	: Start					

    __GET_ELEMENT_BY_ATTRIBUTE__: function(attribute, value) {
        var elements = jQuery('[' + attribute + '="' + value + '"]');
        return elements;
    },
    //Code changes - conversion from prototype methods to jQuery 12/1/2011	: End	

    __CREATE_DIALOG__: function(modalFeature) {
        //creating a div to identify the source		
        modalFeature.options.processingDivId = 'dialogProcessing_' + modalFeature.options.source;

        //creating a div into which the dialog will be added
        modalFeature.options.dialogContent = jQuery('<div id=modalDialog><div id=MODAL_VIEW_CONTAINER class="modalWrapper"><div id=' + modalFeature.options.processingDivId + '></div></div></div>');

        //CUSTOMIZATION POINT if the plugin used for modal dialog is to be changed.  - BEGIN
        /*New logic added for Overlay width calculation, it will use to calculate width of ovelay in diffrent resolutions
        added in RWD (responsive web design) -start*/
        var calculateWidth = 0;
        var buffer = 0;
        var vpWidth = 0;

        //Condition added to bypass the login in case of Admin application
        if (jQuery('.wrapper').length > 0) {
            if (viewport().width > 900) {
                vpWidth = jQuery('.wrapper').width();
            } else {
                vpWidth = viewport().width;
            }

            var overlayWidth = modalFeature.options.width;
            var buffer;
            /*calculate buffer based on overlay width (500,700,900) as per Ebux3 convention*/
            if (overlayWidth == 500) {
                if (vpWidth < 550) {
                    buffer = 50;
                }
            } else if (overlayWidth == 700) {
                if (vpWidth < 550) {
                    buffer = 270;
                } else if (vpWidth < 700) {
                    buffer = 180;
                } else {
                    buffer = 50;
                }
            } else if (overlayWidth == 900) {
                if (vpWidth < 600) {
                    buffer = 450;
                } else if (vpWidth < 900) {
                    buffer = 300;
                } else if (vpWidth < 920) {
                    buffer = 200;
                }
            }

            if (vpWidth < overlayWidth) {
                calculateWidth = ((overlayWidth - buffer) / vpWidth) * 100 + "%";
            } else {
                calculateWidth = (overlayWidth / vpWidth) * 100 + "%";
            }

            modalFeature.options.width = calculateWidth;
            /*RWD (responsive web design) -end*/
        }
        modalFeature.options.modalDialog = feba.domManipulator.getElement(modalFeature.options.dialogContent).dialog({
            autoOpen: false,
            //show: "slide",
            minHeight: modalFeature.options.height || 'auto',
            width: modalFeature.options.width || 'auto',
            draggable: false,
            resizable: false,
            closeOnEscape: false,
            modal: true,
            title: modalFeature.options.title || '',
            closeText: getMessage('close'),
            position: [x, y],
            beforeClose: function() {
                modalFeature.setOptions(modalFeature.originalOptions);
                modalFeature.options.modalDialog.dialog("destroy");
                feba.domManipulator.getElementById('MODAL_VIEW_CONTAINER').remove();
            }
        });

        //If append to a specific location has been specified
        if (modalFeature.options.appendTo) {

            //Get the element to be appended to
            var appendToElement = feba.domManipulator.getGroupletSpecificElement(modalFeature.options.appendTo, modalFeature.options.__GROUPLET_ID__);
            //Get its position (x and y co-ordinates)
            var x = feba.domManipulator.getElement(appendToElement).position().left + feba.domManipulator.getElement(appendToElement).outerWidth();
            var y = feba.domManipulator.getElement(appendToElement).position().top - feba.domManipulator.getElement(document).scrollTop();
            modalFeature.options.modalDialog.dialog("option", "position", [x, y]);
        }
        //Hiding the close button in case of Modal View
        //Changes done to make title configurable in EBUX3
        if (modalFeature.name == "feba.js.ajax.modalView" && (this.hideTitle != Constants.TRUE) && (modalFeature.options.abortEvent == undefined || modalFeature.options.abortEvent == null)) {
            modalFeature.options.modalDialog.dialog("option", "open",
                function(event, ui) {
                    feba.domManipulator.getElement(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
                }
            );
        }
        //Setting focus to the source element of modal window
        if (modalFeature.name == "feba.js.ajax.modalBoxRequest") {
            modalFeature.options.modalDialog.dialog("option", "beforeClose",
                function() {
                    //Destroy the modal window
                    modalFeature.options.modalDialog.dialog("destroy");
                    //Set focus to the original source
                    feba.domManipulator.getElementById(modalFeature.options.source).focus();
                    //Set original options for further use
                    modalFeature.setOptions(modalFeature.originalOptions);
                }
            );
        }
        //CUSTOMIZATION POINT if the plugin used for modal dialog is to be changed. - END

        //Setting these to original Params to use it later
        modalFeature.originalOptions.processingDivId = modalFeature.options.processingDivId;
        modalFeature.originalOptions.dialogContent = modalFeature.options.dialogContent;
        modalFeature.originalOptions.modalDialog = modalFeature.options.modalDialog;

    },



    //Code changes - conversion from prototype methods to jQuery 12/1/2011	: End					
    __HANDLE_ERROR__: function(riaFeatureID, formattedError, formFieldsInError, groupletId, displayExceptions, isInvokedFromGrouplet, source, errorHighlightLocation, errorMsgLoaction, isPinRequest) {
        //remove previous error messsages
        removePreviousError(riaFeatureID, groupletId, source, errorHighlightLocation, errorMsgLoaction);
        if ("null" != isPinRequest && undefined != isPinRequest && isPinRequest) {
            formattedError = getErrorHtmlUX4(formattedError, groupletId);
        }
        var localDM = feba.domManipulator;
        // condition to check if error message should be painted side
        if (errorMsgLoaction == "SIDE" && formFieldsInError != "null" && formFieldsInError.length) {
            messageDisplaySide(formattedError, formFieldsInError, errorMsgLoaction, riaFeatureID, groupletId);
        } else {
            var errorDisplayTag = "";
            if (riaFeatureID != null) {
                formattedError = formattedError.replace(Constants.ERRORDISPLAY_TAG, Constants.ERRORDISPLAY_TAG + "_" + riaFeatureID);
                errorDisplayTag = Constants.ERRORDISPLAY_TAG + "_" + riaFeatureID;
            } else {
                errorDisplayTag = Constants.ERRORDISPLAY_TAG;
            }
            var pgHeadingTag = Constants.PAGEHEADING_TAG;
            var groupletErrorDisplayTag = Constants.GROUPLET_ERRORDISPLAY_TAG;
            if (groupletId && groupletId != "null") {
                errorDisplayTag = groupletId + ":" + Constants.ERRORDISPLAY_TAG + "_" + riaFeatureID;
                pgHeadingTag = groupletId + ":" + Constants.PAGEHEADING_TAG;
                groupletErrorDisplayTag = groupletId + ":" + Constants.GROUPLET_ERRORDISPLAY_TAG;
            }
            if (isInvokedFromGrouplet) {
                errorDisplayTag = groupletErrorDisplayTag;
            }
            //Removing Previous Error Messages If any
            if (LIB.__GET_DOM__(errorDisplayTag) && !groupletId) {
                var errorTags = localDM.getElementById(errorDisplayTag);
                localDM.each(errorTags, function(index, val) {
                    if (null == localDM.getElement(val).parent().attr(Constants.GROUPLET_ID_ATTR)) {
                        localDM.replaceWith(localDM.getElement(val), "");
                    }
                });
            } else if (feba.domManipulator.getElementById(pgHeadingTag) && feba.domManipulator.getElementById(pgHeadingTag).length > 0) {
                localDM.replaceWith(localDM.getElementById(errorDisplayTag), "");
            }
            if (displayExceptions) {
                displayExceptions = String(displayExceptions).toLowerCase();
            }
            if (displayExceptions !== Constants.TRUE) {
                return;
            }
            if (!groupletId || (groupletId && LIB.__GET_DOM__(errorDisplayTag) === undefined)) {
                //Added for dispaying exception inside grouplet not having pg Heading tag
                if (groupletId && localDM.getElement("[id='" + pgHeadingTag + "']").length == 0) {
                    localDM.getElement('#' + groupletId).find('.widgetErrorDisplayHw').remove()
                    localDM.before(localDM.getElement('#' + groupletId.toUpperCase()), formattedError);
                    if (jQuery('#' + groupletId).find('.widgetErrorDisplayHw').length > 0) {
                        handleErrorOnLoad(groupletId);
                    }
                } else {
                    if (localDM.getElement("[id='" + pgHeadingTag + "']").length == 0) {
                        localDM.before(localDM.getElement('.groupletsection'), formattedError);
                        localDM.getElement('#MessageDisplay_TABLE').addClass("marginBottom10");
                    }
                    localDM.after(localDM.getElementById(pgHeadingTag), formattedError);
                    /*Surej RWD blanck check added to handle when no error available*/
                    if (typeof(handleRHSAlignment) == 'function' && formattedError != "") {
                        handleRHSAlignment(groupletId);
                    }
                }
            } else {
                localDM.replaceWith(localDM.getElementById(errorDisplayTag), formattedError);
                if (typeof(handleRHSAlignment) == 'function' && formattedError != "") {
                    handleRHSAlignment(groupletId);
                }
            }
        }
        //Highlighting Error
        if (formFieldsInError != null && formFieldsInError.length) {
            jQuery(formFieldsInError).each(function() {
                if (errorHighlightLocation == "ROW") {
                    var parentP = getParentByTagName(localDM.getGroupletSpecificElement(this, groupletId), 'P');
                    if ((parentP != null) && (!hasClass(parentP, Constants.ERROR_ROW_HIGHLIGHT_CLASS))) {
                        parentP.className += " " + Constants.ERROR_ROW_HIGHLIGHT_CLASS;
                        localDM.append(localDM.getElement(parentP), "<input type='hidden' id='ERROR_ROW_" + riaFeatureID + "_" + Math.random() + "' value='" + errorHighlightLocation + "'>");
                    }
                } else {
                    var elements = LIB.__GET_ELEMENT_BY_ATTRIBUTE__('for', getGroupletSpecificId(this, groupletId));
                    if (!elements.length) {
                        elements = LIB.__GET_ELEMENT_BY_ATTRIBUTE__("data-errorLabel", riaFeatureID);
                    }
                    var element = elements[0];
                    if (element) {
                        localDM.addClass(element, Constants.ERROR_HIGHLIGHT_CLASS);
                    }
                }
            });
        }
    },
    // Making a region live for DDA
    __ADD_POLITE_LIVE_REGION__: function(target, title, id, featureId) {

        setTimeout(function() {
            var jId = "JAWS" + id + featureId;
            if (!feba.domManipulator.getElementById(jId)[0]) {
                feba.domManipulator.getElement("<a id='" + jId + "'  role='alert' aria-live='polite' tabindex='-1' aria-busy='true' aria-atomic='true' title='" + title + "' style='display:block'/>").appendTo('form');
            } else {
                feba.domManipulator.getElementById(jId)[0].title = title;
            }
            setTimeout(function() {
                feba.domManipulator.getElementById(jId).remove();
            }, 1000);
            setTimeout(function() {
                jQuery("[aria-busy=true]").attr("aria-busy", "false");
            }, 800);
        }, 1000);

    },

    //Library methods added to get groupletId on which current action is performed. START
    // Event handler for any onclick:
    __FF_EVENT_HANDLER__: function(e) {
        // Declare a global variable to trap events in FireFox or IE
        ff_event = null;
        ff_event = LIB.__GET_EVENT__(e);

    },
    __GET_EVENT__: function(e) {
        // e gives access to the event in all browsers
        if (!e) var e = window.event;

        return e;
    },
    __ATTACH_EVENT__: function(obj, evType, fn, useCapture) {
        if (!useCapture) var useCapture = true;
        if (obj.addEventListener) {
            obj.addEventListener(evType, fn, useCapture);
            return true;
        } else if (obj.attachEvent) {
            var r = obj.attachEvent("on" + evType, fn);
            return r;
        } else {
            return false;
        }
    },
    // By default, use window.event so we don't depend on attaching an event handler at the document level.
    // Otherwise, use the cross-browser event object.
    __EVENT__: function() {
        if (window.event) return window.event;
        else if (ff_event) return ff_event;
        else "";
    },
    __GET_EVENT_TARGET__: function() {
        var targ = null;
        if (LIB.__EVENT__().target) targ = LIB.__EVENT__().target;
        else if (LIB.__EVENT__().srcElement) targ = LIB.__EVENT__().srcElement;
        if (targ != null && targ.nodeType == 3) // defeat Safari bug
            targ = targ.parentNode;
        return targ;
    },
    //Library methods added to get groupletId on which current action is performed. END	

    //Library methods added for developers to get groupletId on which current action is performed. START
    __GET_GROUPLET_ID__: function(elementId) {
        var temp = elementId.split(Constants.GROUPLET_ELEMENT_SEPERATOR);
        var groupletId = "";
        if (temp.length == 2) {
            groupletId = temp[0];
        }
        return groupletId;
    },

    __GET_CURRENT_GROUPLET_ID__: function() {
        try {
            var elementId = LIB.__GET_EVENT_TARGET__().id;
            return LIB.__GET_GROUPLET_ID__(elementId);
        } catch (e) {
            return "null";
        }
    },

    __GET_FG_ID__: function(elementId) {
        var temp = elementId.split(Constants.GROUPLET_ELEMENT_SEPERATOR);

        if (temp.length == 2) {
            fgName = temp[1].split(".");
        } else {
            fgName = temp[0].split(".");
        }

        return fgName[0];
    },

    __GET_CURRENT_FG_ID__: function() {
        var elementId = LIB.__GET_EVENT_TARGET__().id;
        return LIB.__GET_FG_ID__(elementId);
    }
    //Library methods added for developers to get groupletId on which current action is performed. END
};




/**
 * The Container and Controller Object for all script objects 
 */
feba = {

    name: "feba",

    description: "",

    version: "1.0",

    moduleId: "",

    scriptsPath: "",

    isPortalRequest: "",

    isVdtMode: "",

    nodePath: "",

    contextPath: "",

    ipAddress: "",

    // array to store the child objects which have been instantiated
    febaObjects: [],

    // variable to indicate whether to raise the request
    startFlag: true,
    // variable to indicate whether user is logged in using smart phone 
    isAdaptiveUILogin: "",

    // Adds the object which has been instantiated
    add: function(object) {
        LIB.__ADD__(this.febaObjects, object);
    },

    // Removes the object from the array
    remove: function(object) {
        LIB.__REMOVE__(this.febaObjects, object);
    },

    // start all objects
    startRequest: function() {
        LIB.__START__.bind(this)(this.febaObjects, true);
    },

    // stops all objects
    stopRequest: function() {
        LIB.__STOP__.bind(this)(this.febaObjects);
    },

    // Returns the startFlag
    isRunning: function() {
        LIB.__IS_RUNNING__.bind(this)();
    },



    // load the required script files
    initialize: function() {

        var includes = [];
        var scriptTags = [];
        var index = 0;

        //Getting all the Script tags 
        scriptTags = document.getElementsByTagName("script");

        //Iterating over the script tags to get the tag with src FEBAScripts.js
        while (index < scriptTags.length) {
            //If a script tag has src FEBAScripts.js then , break from the loop
            if (scriptTags[index].src && scriptTags[index].src.match(/FEBAScripts\.js(\?.*)?$/)) {
                break;
            }
            index++;
        }

        //Getting the strings that matching isPortletRequest= from the FEBAScripts tag moduleId added by abhishek_pdiwa
        includes = scriptTags[index].src.match(/\?.*moduleId=[\w\W]*/);


        //Splitting the tag based on comma separator
        var params = includes[0].split(",");



        //params should be of length of 6 or else js files cannot be loaded added by abhishek_pidwa
        if (params.length < 6) {
            return;
        }

        //seting the values of the corresponding fields , by spliting based on '=' separator
        var i = 0;
        //this.isPortalRequest=params[i++].split("=")[1];  
        this.moduleId = params[i++].split("=")[1];
        this.scriptsPath = params[i++].split("=")[1];
        this.isVdtMode = params[i++].split("=")[1];
        this.nodePath = params[i++].split("=")[1];
        this.ipAddress = params[i++].split("=")[1];
        this.contextPath = params[i++].split("=")[1];
        if (params.length > 6)
            this.isAdaptiveUILogin = params[i++].split("=")[1];
        this.scriptsPath = this.contextPath + this.scriptsPath;
        if (this.isVdtMode == 'true') {
            document.write('<script language="javascript" type="text/javascript" src="../scripts/common/NFEBAWorkbench.js?isPortletRequest=false,nodePath=' + this.nodePath + '"></script>');
        } else {
            //loading the required JS Files
            feba.domManipulator.write('<script type="text/JavaScript" src="' + this.scriptsPath + '/common/NFEBAFunctionLoader.js"><\/script>');
            feba.domManipulator.write('<script type="text/JavaScript" src="' + this.scriptsPath + '/common/Ncooltree.js"><\/script>');
            feba.domManipulator.write('<script type="text/JavaScript" src="' + this.scriptsPath + '/ria/ajaxfeatures/jquerymin.js"><\/script>');
            //Surej for responsive
            feba.domManipulator.write('<script type="text/javascript" src="' + this.scriptsPath + '/ria/ajaxfeatures/jquery-migrate121.js"><\/script>');
            feba.domManipulator.write('<script type="text/JavaScript" src="' + this.scriptsPath + '/ria/ajaxfeatures/jquery.class.js"><\/script>');
            feba.domManipulator.write('<script type="text/JavaScript" src="' + this.scriptsPath + '/common/NFEBAJavaScripts.js"><\/script>');
            feba.domManipulator.write('<script type="text/javascript" src="' + this.scriptsPath + '/common/footable.js"><\/script>');
            feba.domManipulator.write('<script type="text/javascript" src="' + this.scriptsPath + '/common/jquery.flexisel.js"><\/script>');
            feba.domManipulator.write('<script type="text/javascript" src="' + this.scriptsPath + '/common/NRWDplugins.js"><\/script>');
            if (this.isAdaptiveUILogin === 'Y') {
                CONFIG.blockOnButtonClicksRequired = 'Y';
                CONFIG.blockOnHyperLinkClicksRequired = 'Y';
            }
        }


    },

    //overrides the default toString method
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.febaObjects);
    }
};
LIB.__ATTACH_EVENT__(document, "click", LIB.__FF_EVENT_HANDLER__);
LIB.__ATTACH_EVENT__(document, "change", LIB.__FF_EVENT_HANDLER__);
/**
 * Creating an object at feba level to store usecase level custom functions that can be called on page or widget load
 */
feba.useCase = {};

/**
 * Wrapper over external Lib jQuery
 */
feba.domManipulator = {
    /**************jQuery Elements and attributes**************/

    /**
     * Get element based on id
     */
    getElementById: function(id) {
        try {

            return jQuery('[id="' + id + '"]');

        } catch (e) {

            return jQuery(document.getElementById(id));
            ///return e;

        }
    },
    /**
     *Enables or disables a draggable element. Used for WidgetBar
     */

    draggableEnableDisable: function(element, attr) {
        try {

            return jQuery(element).draggable(attr);

        } catch (e) {

            return;
            ///return e;

        }
    },

    /**
     * Get element based on name
     */
    getElementByName: function(name) {
        try {
            return jQuery('[name="' + name + '"]');
        } catch (e) {
            LOG.logMessages("Exception occurred in getElementById " + e.message);
            throw e;
        }

    },
    /**
     * Get corresponding jQuery element
     */
    getElement: function(element) {
        try {

            return jQuery(element);

        } catch (e) {

            LOG.logMessages("Exception occurred in getElement " + e.message);
            throw e;

        }
    },
    //Function to check whether the groupletId is not null and doesn't contain grouplet Seperator
    isGroupletId: function(elementId, groupletId) {
        if (groupletId != "null" && groupletId && elementId.indexOf(groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR) == -1) {
            return true;
        }
        return false;
    },
    /**
     * Get either grouplet element, if groupletId is not null or element on page
     */
    getGroupletSpecificElement: function(elementId, groupletId) {
        try {
            if (feba.domManipulator.isGroupletId(elementId, groupletId)) {
                if (elementId.indexOf("HREF_") == 0) {
                    elementId = elementId.replace("HREF_", "HREF_" + groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR);
                    return LIB.__GET_DOM__(elementId);
                }
                return LIB.__GET_DOM__(groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + elementId);
            }
            return LIB.__GET_DOM__(elementId);
        } catch (e) {

            LOG.logMessages("Exception occurred in getGroupletSpecificElement " + e.message);
            throw e;

        }
    },
    /**
     * Get value of either grouplet element, if groupletId is not null or element on page
     */
    getGroupletSpecificElementValue: function(elementId, groupletId) {
        var elementWater = feba.domManipulator.getGroupletSpecificElement(elementId, groupletId);
        var colWater = feba.domManipulator.getCss(elementWater, Constants.COLOR);
        var titleWater = feba.domManipulator.getAttribute(elementWater, Constants.TITLE);
        var valWater = feba.domManipulator.getAttribute(elementWater, Constants.VALUE);
        if ((titleWater == valWater) && ((colWater == 'rgb(204, 204, 204)') || (colWater == '#cccccc'))) {
            return '';
        }
        return jQuery(feba.domManipulator.getGroupletSpecificElement(elementId, groupletId)).val();
    },
    /**
     * Get element based on id and append content
     */
    getIdWithAppend: function(id, content) {
        try {

            return jQuery("#" + id + content);

        } catch (e) {

            LOG.logMessages("Exception occurred in getIdWithAppend " + e.message);
            throw e;

        }
    },
    /**
     * Returns the spcified attribute value of the element
     */
    getAttribute: function(element, attribute) {
        try {
            var colWater = feba.domManipulator.getCss(element, Constants.COLOR);
            var titleWater = jQuery(element).attr("title");
            var valWater = jQuery(element).attr("value");
            var typeWater = jQuery(element).attr("type");
            //alert('get: '+colWater+' '+titleWater+' '+valWater+' '+typeWater);
            if ((titleWater == valWater) && (attribute == 'value') && ((colWater == 'rgb(204, 204, 204)') || (colWater == '#cccccc'))) {
                return '';
            }
            return jQuery(element).attr(attribute);

        } catch (e) {

            LOG.logMessages("Exception occurred in getAttribute " + e.message);
            throw e;

        }
    },
    /**
     * Returns the closest parent element in the dom tree that matches selector
     */
    getClosestElement: function(element, selector) {
        try {

            return element.closest(selector);

        } catch (e) {

            LOG.logMessages("Exception occurred in getClosestElement " + e.message);
            throw e;

        }
    },
    /**
     * Clones the elements given
     */
    clone: function(element) {
        return element.clone();
    },
    /**
     * Sets element based on id
     */
    setAttribute: function(jQueryElement, attribute, value) {
        try {

            return jQueryElement.attr(attribute, value);

        } catch (e) {
            try {
                if (!(jQueryElement instanceof jQuery)) {
                    (jQuery(jQueryElement)).attr(attribute, value);
                }
            } catch (e1) {
                LOG.logMessages("Exception occurred in setAttribute " + e1.message);
            }


        }
    },

    /**
     * Returns the element starting the specified id 
     */
    getElementStartingWith: function(idStartingWith) {
        try {

            return jQuery('[id^="' + idStartingWith + '"]');

        } catch (e) {

            LOG.logMessages("Exception occurred in getElementStartingWith " + e.message);
            throw e;

        }
    },

    /**************For String and Array operations**************/

    /**
     * Searches in the array for the value  specified and returns its index
     */
    inArray: function(value, array) {
        try {
            for (var i = 0; i < array.length; i++) {
                var s = array[i];
                if (value.indexOf(s) != -1) {
                    return 0;
                }
            }
            return -1;
        } catch (e) {

            LOG.logMessages("Exception occurred in inArray " + e.message);
            throw e;

        }
    },

    /**
     * Remove white spaces from the beginning and end of a string.
     */
    trim: function(element) {
        try {

            return jQuery.trim(element);

        } catch (e) {

            LOG.logMessages("Exception occurred in trim " + e.message);
            throw e;

        }
    },

    /**
     * Iterates over a jQuery object, executing a function for each matched element.
     */
    each: function(collection, fn) {
        try {

            return jQuery.each(collection, fn);

        } catch (e) {

            LOG.logMessages("Exception occurred in each " + e.message);
            throw e;

        }
    },
    /**************Event Specific**************/

    /**
     * Bind an event handler to the "click" event
     */
    click: function(element, fn) {
        try {

            return element.click(fn);

        } catch (e) {

            LOG.logMessages("Exception occurred in click " + e.message);

        }
    },

    /**
     * Default action of the event will not be triggered
     */
    preventDefault: function(event) {
        try {

            return event.preventDefault();

        } catch (e) {

            LOG.logMessages("Exception occurred in preventDefault " + e.message);

        }
    },

    /**
     * Default action of the event will not be triggered
     */
    stopImmediatePropagation: function(event) {
        try {

            return event.stopImmediatePropagation();

        } catch (e) {

            LOG.logMessages("Exception occurred in preventDefault " + e.message);

        }
    },
    /**
     * Execute all handlers and behaviors attached to the matched elements for the given event type.
     */
    trigger: function(element, event) {
        try {

            return element.trigger(event);

        } catch (e) {

            LOG.logMessages("Exception occurred in trigger " + e.message);

        }
    },

    /**
     * Attach a handler to an event for the elements.
     */
    bind: function(element, event, data, fn) {
        try {

            return element.bind(event, data, fn);

        } catch (e) {

            LOG.logMessages("Exception occurred in bind " + e.message);

        }
    },
    /**
     * Gets the id of the HTML DOM element on which event was triggered
     */
    getElementIdFromEvent: function(event) {
        try {

            return event.target.id;

        } catch (e) {

            LOG.logMessages("Exception occurred in getElementIdFromEvent " + e.message);
            throw e;

        }
    },
    /**************Style related**************/

    /**
     * Adds the specified style class to the element 
     */
    addClass: function(element, newClass) {
        try {

            return element.addClass(newClass);

        } catch (e) {

            LOG.logMessages("Exception occurred in addClass " + e.message);

        }
    },
    /**
     * Returns the element Ending the specified id 
     */
    getElementEndingWith: function(idEndingWith) {
        try {

            return jQuery('[id$="' + idEndingWith + '"]');

        } catch (e) {

            LOG.logMessages("Exception occurred in getElementEndingWith " + e.message);
            throw e;

        }
    },

    /**
     * Sets css properties for the required element
     */
    css: function(element, property, value) {
        try {

            return element.css(property, value);

        } catch (e) {

            LOG.logMessages("Exception occurred in css " + e.message);

        }
    },

    /**
     * Gets css property for the required element
     */
    getCss: function(element, property) {
        try {
            return jQuery(element).css(property);
        } catch (e) {
            LOG.logMessages("Exception occurred in css " + e.message);
        }
    },

    /**
     * Sets css multiple properties via a map
     */
    setCssProperties: function(element, properties) {
        try {

            return element.css(properties);

        } catch (e) {

            LOG.logMessages("Exception occurred in setCssProperties " + e.message);
            throw e;

        }
    },



    /**************Operations on objects and elements**************/

    /**
     * Remove the set of matched elements from the DOM
     */
    remove: function(element) {
        try {

            return element.remove();

        } catch (e) {

            LOG.logMessages("Exception occurred in remove " + e.message);

        }
    },

    /**
     * Merge the contents of two or more objects together into the first object.
     */
    extendObject: function(newFields, base) {
        try {

            return jQuery.extend(newFields, base);

        } catch (e) {

            LOG.logMessages("Exception occurred in extendObject " + e.message);

        }
    },

    /**
     * Encodes a set of form elements as a string for submission
     */

    serialize: function(element) {

        try {

            return element.serialize();

        } catch (e) {

            LOG.logMessages("Exception occurred in serialize " + e.message);
            throw e;

        }
    },

    /**
     * Replaces each element in the set of matched elements with the provided new content.
     */
    replaceWith: function(original, newVal) {
        try {

            return original.replaceWith(newVal);

        } catch (e) {

            LOG.logMessages("Exception occurred in replaceWith " + e.message);

        }
    },
    /**************Traversing through DOM tree**************/

    /**
     * Returns the immediate ancestor of the element 
     */
    getImmediateAncestor: function(element, selector) {
        try {

            return jQuery(element).closest(selector);

        } catch (e) {

            LOG.logMessages("Exception occurred in getImmediateAncestor " + e.message);
            throw e;

        }
    },

    /**
     * Get the immediately preceding sibling of each element in the set of matched elements
     */
    prev: function(element, value) {
        try {

            return element.prev(value);

        } catch (e) {

            LOG.logMessages("Exception occurred in prev " + e.message);
            throw e;

        }
    },
    /**
     * Adds the specified style class to the element 
     */
    addClass: function(element, className) {
        try {

            jQuery(element).addClass(className);

        } catch (e) {

            LOG.logMessages("Exception occurred in addClass " + e.message);
            throw e;

        }
    },

    /**
     * Insert content, specified by the parameter, to the end of each element in the set of matched elements.
     */
    append: function(element, content) {
        try {

            return element.append(content);

        } catch (e) {

            LOG.logMessages("Exception occurred in append " + e.message);
            throw e;

        }
    },
    /**
     * Adds the specified style class to the element 
     */
    removeClass: function(element, className) {
        try {

            jQuery(element).removeClass(className);

        } catch (e) {

            LOG.logMessages("Exception occurred in removeClass " + e.message);

        }
    },

    /**
     * Removes the specified element 
     */
    removeStrengthClass: function(element) {
        try {

            jQuery(element).removeClass();

        } catch (e) {

            LOG.logMessages("Exception occurred in removeClass " + e.message);

        }
    },

    /**
     * Adds the specified html text
     */
    addText: function(element, content) {
        try {

            jQuery(element).html(content);

        } catch (e) {

            LOG.logMessages("Exception occurred in adding html text " + e.message);

        }
    },

    /**
     * Get the children of each element in the set of matched elements
     */
    children: function(parent) {
        try {

            return parent.children();

        } catch (e) {

            LOG.logMessages("Exception occurred in children " + e.message);
            throw e;

        }
    },

    /**
     * Insert content before each element in the set of matched elements.
     */
    before: function(original, newContent) {
        try {

            return original.before(newContent);

        } catch (e) {

            LOG.logMessages("Exception occurred in before " + e.message);
            throw e;

        }
    },
    /**
     * Insert content after each element in the set of matched elements.
     */
    after: function(original, newContent) {
        try {

            return original.after(newContent);

        } catch (e) {

            LOG.logMessages("Exception occurred in after " + e.message);
            throw e;

        }
    },
    /**
     * Get the descendants of each element in the current set of matched elements, filtered by the selector.
     */
    find: function(element, selector) {
        try {

            return element.find(selector);

        } catch (e) {

            LOG.logMessages("Exception occurred in find " + e.message);
            throw e;

        }
    },
    /**
     * Get element based on id
     */
    getChildren: function(element, selector) {
        try {

            return jQuery(element).children(selector);

        } catch (e) {

            LOG.logMessages("Exception occurred in getChildren " + e.message);
            throw e;

        }
    },

    /**************Collections**************/

    /**
     * Applies a function to each item in an array and maps the results into a new array
     */
    map: function(data, fn) {
        try {

            return jQuery.map(data, fn);

        } catch (e) {

            LOG.logMessages("Exception occurred in map " + e.message);

        }
    },

    /**************Creating Classes**************/

    /**
     * Creates a class
     */
    createBaseClass: function(name, setup, description) {
        try {

            return jQuery.Class.extend(name, setup, description);

        } catch (e) {

            LOG.logMessages("Exception occurred in createBaseClass " + e.message);
            throw e;

        }
    },

    /**
     * Creates a new class that can inherit properties from a base class
     */
    createChildClass: function(baseClass, childClass, setup, description) {
        try {

            return baseClass.extend(childClass, setup, description);

        } catch (e) {

            LOG.logMessages("Exception occurred in createChildClass " + e.message);
            throw e;

        }
    },

    /**************Raising Requests**************/

    /**
     * Raises an ajax request
     */
    ajax: function(options) {
        try {

            return jQuery.ajax(options);

        } catch (e) {

            LOG.logMessages("Exception occurred in ajax " + e.message);
            throw e;

        }
    },

    /**************Plugin Specific**************/

    /**
     * To block the UI
     */
    blockUI: function(attributes) {
        try {

            return jQuery.blockUI(attributes);

        } catch (e) {

            LOG.logMessages("Exception occurred in blockUI " + e.message);

        }
    },

    /*
     * To unblock entire page blocked with blockUI
     */
    unblockUI: function() {
        jQuery.unblockUI();
    },

    /**
     * To create modal window
     */
    modal: function(content, defaultValues) {
        try {

            return jQuery.modal(content, defaultValues);

        } catch (e) {

            LOG.logMessages("Exception occurred in modal " + e.message);
            throw e;

        }
    },
    closeModal: function() {
        try {

            return jQuery.modal.close();

        } catch (e) {


            LOG.logMessages("Exception occurred in closeModal " + e.message);
            throw e;

        }
    },
    /* Calls qtip plugin */
    showCallout: function(e) {
        calloutObject = new Object;
        /*
        Initially we register callout so that we get a response on first request ie when theres no response
        */
        if (e.response == null || e.response == "") {
            calloutObject = {
                content: {
                    title: {
                        text: false
                    }
                },
                show: {
                    when: {
                        event: ' focus mouseover'
                    }
                },
                hide: 'blur  mouseout'
            }
        } else {
            calloutObject = {
                content: {
                    text: String(e.response)
                },
                show: {

                    ready: true,
                    when: {
                        event: 'focus mouseover'
                    }
                },
                hide: 'blur mouseout'
            }
        }
        //We call the plugin
        e.eventElement.qtip(calloutObject);

    },
    /**
     * To retrieve an element based on class name
     */
    getElementOfClass: function(cssClass) {
        try {

            return jQuery("." + cssClass);

        } catch (e) {

            LOG.logMessages("Exception occurred in getElementOfClass " + e.message);
            throw e;
        }
    },
    /**
     * To retrieve length of element based on class name
     */
    getMatchedElementCount: function(element) {
        try {

            return jQuery(element).length;

        } catch (e) {

            LOG.logMessages("Exception occurred in getMatchedElementCount " +
                e.message);
            throw e;
        }
    },
    /**
     * To retrieve an element based on class name
     */
    hideElement: function(element) {
        try {

            return jQuery(element).hide();

        } catch (e) {

            LOG.logMessages("Exception occurred in hideElement " + e.message);
            throw e;

        }
    },
    // EBUX3 - Start
    showElement: function(element) {
        try {

            return jQuery(element).show();

        } catch (e) {

            LOG.logMessages("Exception occurred in showElement " + e.message);
            throw e;

        }
    },
    getValue: function(element) {

        try {
            return jQuery(element).val();
        } catch (e) {
            LOG.logMessages("Exception occurred in getValue " + e.message);
            throw e;
        }
    },
    getElementByIdLike: function(id) {

        try {
            return jQuery('[id^="' + id + '"]');
        } catch (e) {
            LOG.logMessages("Exception occurred in getElementByIdLike " + e.message);
            throw e;
        }
    },
    getParentsUntil: function(element, elementUntil) {

        try {
            return jQuery(element).parentsUntil(elementUntil);
        } catch (e) {
            LOG.logMessages("Exception occurred in getParentsUntil " + e.message);
            throw e;
        }

    },
    not: function(elementList, notSelector) {

        try {
            return jQuery(elementList).not(notSelector);
        } catch (e) {
            LOG.logMessages("Exception occurred in not " + e.message);
            throw e;
        }

    },
    // EBUX3 - End

    /**
     * To stringify a JSON object
     */
    stringify: function(jsonObject) {
        try {

            return JSON.stringify(jsonObject);

        } catch (e) {

            LOG.logMessages("Exception occurred in stringify " + e.message);

        }
    },

    stringEndsWith: function(inputString, suffix) {
        try {

            return inputString.indexOf(suffix, inputString.length - suffix.length) !== -1;

        } catch (e) {

            LOG.logMessages("Exception occurred in stringEndsWith " + e.message);
            throw e;

        }
    },
    /**
     * To clone elements
     */
    clone: function(element) {
        try {

            return element.clone();

        } catch (e) {

            LOG.logMessages("Exception occurred in clone " + e.message);

        }
    },
    /**
     * To get contents of an element
     */
    contents: function(element) {
        try {

            return element.contents();

        } catch (e) {

            LOG.logMessages("Exception occurred in contents " + e.message);
            throw e;

        }
    },
    /**
     * To get first element of a list
     */
    getFirstElementOfList: function(listId) {
        try {

            return jQuery("#" + listId + " li:first-child");

        } catch (e) {

            LOG.logMessages("Exception occurred in getFirstElementOfList " + e.message);
            throw e;

        }
    },
    /**
     * To get last element of a list
     */
    getLastElementOfList: function(listId) {
        try {

            return jQuery("#" + listId + " li:last-child");

        } catch (e) {

            LOG.logMessages("Exception occurred in getLastElementOfList " + e.message);
            throw e;

        }
    },
    /**<ul>
     * <li>Blocks the selected element by creating an overlay over it</li>
     * <li>attributes are used to configure the blocking plugin</li>
     * </ul>
     */
    block: function(element, attributes) {
        try {

            element.block(attributes);

        } catch (e) {

            LOG.logMessages("Exception occurred in block " + e.message);


        }
    },
    /**
     *This method returns true if attribute 'type' is 'hidden' 
     */
    isHidden: function(element) {
        try {
            if (feba.domManipulator.getAttribute(element, "type") == Constants.HIDDEN) {

                return true;

            }

            return false;

        } catch (e) {

            LOG.logMessages("Exception occurred in isHidden " + e.message);
            throw e;

        }
    },
    /**
     *This method returns height
     */

    height: function(target, initialHeight) {
        try {
            if (initialHeight) {

                return target.height(initialHeight);

            }

            return target.height();

        } catch (e) {

            LOG.logMessages("Exception occurred in isHidden " + e.message);
            throw e;

        }
    },
    /**
     *This method returns width
     */
    width: function(target, initialWidth) {
        try {
            if (initialWidth) {

                return target.width(initialWidth);

            }

            return target.width();

        } catch (e) {

            LOG.logMessages("Exception occurred in isHidden " + e.message);
            throw e;

        }
    },

    /**
     *This method is used to disable the cut, copy and paste operations on the password fields in any page 
     * Added by Karteek 
     */

    disableCutCopyPaste: function(groupletId) {
        jQuery(getSpecifiedElements(groupletId, ':password')).bind('copy paste cut', function(e) {

        });

    },

    /**
     *This method is used for showing watermark for all the Textbox fields present outside widget
     * Added by Anand / Swayam
     */

    /*showWatermark : function() {

    		jQuery('input[type="text"]').each(function() {
    			var checkType = feba.domManipulator.getAttribute(this,Constants.FEBA_TYPE);
    			jQuery(this).blur(function() {
				if (this.value == '') {
					this.value = feba.domManipulator.getAttribute(this,Constants.TITLE);
					jQuery(this).css({'color' : '#cccccc'});
				}
				if(checkType=='FEBADate' && this.value!= feba.domManipulator.getAttribute(this,Constants.TITLE) && this.value!=""){
					jQuery(this).css({'color' : '#000000'});
				}
			});

    			jQuery(this).focus(function() {
    				var col = feba.domManipulator.getCss(this,Constants.COLOR);
				if ((this.title == this.value || this.value=='' || this.value == null) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
					this.value = '';
					jQuery(this).css({'color' : '#000000'});
				}
				if(checkType=='FEBADate' && this.value!= feba.domManipulator.getAttribute(this,Constants.TITLE) && this.value!=""){
					jQuery(this).css({'color' : '#000000'});
				}
			});
			

    			if(this.value==null || this.value==''){
				this.value = feba.domManipulator.getAttribute(this,Constants.TITLE);
				jQuery(this).css({'color' : '#cccccc'});
			//Fix shared by Swayam for watermark clearing issue

			}
			//Check added for Water mark present in date field
			if(checkType=='FEBADate' && this.value!= feba.domManipulator.getAttribute(this,Constants.TITLE) && this.value!=""){
				jQuery(this).css({'color' : '#000000'});
			}
    		});
    	},*/

    /**
     *This method is used for showing watermark for all the Textbox fields present inside widget
     * Added by Anand / Swayam
     */
    /*showWatermarkForWidget : function(elements) {
    	
    		elements.each(function() {

    			var checkType = feba.domManipulator.getAttribute(this,Constants.FEBA_TYPE);
    			jQuery(this).blur(function() {
				if (this.value == '') {
					this.value = feba.domManipulator.getAttribute(this,Constants.TITLE);
					jQuery(this).css({'color' : '#cccccc'});
				}
				if(checkType=='FEBADate' && this.value!= feba.domManipulator.getAttribute(this,Constants.TITLE) && this.value!=""){
					jQuery(this).css({'color' : '#000000'});
				}
			});

    			jQuery(this).focus(function() {
    				var col = feba.domManipulator.getCss(this,Constants.COLOR);
				if ((this.title == this.value || this.value=='' || this.value == null) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
					this.value = '';
					jQuery(this).css({'color' : '#000000'});
				}
				if(checkType=='FEBADate' && this.value!= feba.domManipulator.getAttribute(this,Constants.TITLE) && this.value!=""){
					jQuery(this).css({'color' : '#000000'});
				}
			});
    		
    			if(this.value==null || this.value==''){
				this.value = feba.domManipulator.getAttribute(this,Constants.TITLE);
				jQuery(this).css({'color' : '#cccccc'});
			//Fix shared by Swayam for watermark clearing issue

			}
			if(checkType=='FEBADate' && this.value!= feba.domManipulator.getAttribute(this,Constants.TITLE) && this.value!=""){
				jQuery(this).css({'color' : '#000000'});
			}			

    		});
    	},*/

    /**
     *This method is used for clearing watermark for all the Textbox fields in any page before submit event
     * Added by Anand / Swayam
     */

    /*	clearWatermark : function(elements) {
    		elements.each(function() {
    			var col = feba.domManipulator.getCss(this,Constants.COLOR);
    			if ((this.title == this.value) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
    				this.value = "";
    			}
    		});
    	},*/

    /**
     *This method is used for preserving watermark for all the Textbox fields in any page on reset event
     * Added by Anand / Swayam
     */

    /*	preserveWatermark : function(event) {
        		jQuery('input[type="text"]').each(function() {
    			if(this.value==null || this.value==''){
    				this.value = feba.domManipulator.getAttribute(this,Constants.TITLE);
    				jQuery(this).css({'color' : '#cccccc'});
    				feba.domManipulator.preventDefault(event);
    				var checkType = feba.domManipulator.getAttribute(this,Constants.FEBA_TYPE);			
    				if(checkType=='FEBADate' && this.value!= feba.domManipulator.getAttribute(this,Constants.TITLE) && this.value!=""){
    					jQuery(this).css({'color' : '#000000'});
    				}
    			}
        		});
    	},*/
    /**
     *This method checks whether the attribute 'value' is null.
     *returns true if its null.
     */
    hasValue: function(element) {
        try {
            if (element && feba.domManipulator.getAttribute(element, "value") != "") {
                var colWater = feba.domManipulator.getCss(element, Constants.COLOR);
                var titleWater = feba.domManipulator.getAttribute(element, Constants.TITLE);
                var valWater = feba.domManipulator.getAttribute(element, Constants.VALUE);
                if ((titleWater == valWater) && ((colWater == 'rgb(204, 204, 204)') || (colWater == '#cccccc'))) {
                    return false;
                }
                return true;

            }

            return false;


        } catch (e) {

            LOG.logMessages("Exception occurred in hasValue " + e.message);
            throw e;

        }

    },

    /**
     * This method is used to execute code when document is ready
     */
    documentReady: function(functionName, groupletId) {

        jQuery(document).ready(function() {
            functionName(groupletId);
        });

    },


    /**
     * this method adds data to the domElement
     */
    addData: function(element, key, value) {
        jQuery(element).data(key, value);
    },

    /**
     * this method retrieves data from the domElement
     */
    getData: function(element, key) {
        return jQuery(element).data(key);
    },

    /**
     * this method gets value from the domElement
     */
    val: function(element, value) {
        var colWater = feba.domManipulator.getCss(element, Constants.COLOR);
        var titleWater = feba.domManipulator.getAttribute(element, Constants.TITLE);
        var valWater = feba.domManipulator.getAttribute(element, Constants.VALUE);
        if ((titleWater == valWater) && ((colWater == 'rgb(204, 204, 204)') || (colWater == '#cccccc'))) {
            value = '';
        }
        jQuery(element).val(value);
    },
    /*This method checks whether the element has a value , given elementId*/
    hasValueForId: function(elementId) {
        try {
            if (feba.domManipulator.getAttribute(
                    feba.domManipulator.getElementById(elementId), "value") != "") {
                var watermarkTextEle = feba.domManipulator.getElementById(elementId);
                var colWater = feba.domManipulator.getCss(watermarkTextEle, Constants.COLOR);
                var titleWater = feba.domManipulator.getAttribute(watermarkTextEle, Constants.TITLE);
                var valWater = feba.domManipulator.getAttribute(watermarkTextEle, Constants.VALUE);
                if ((titleWater == valWater) && ((colWater == 'rgb(204, 204, 204)') || (colWater == '#cccccc'))) {
                    return false;
                }
                return true;
            }

            return false;
        } catch (e) {
            LOG.logMessages("Exception occurred in hasValueForId " + e.message);
            throw e;

        }
    },
    /*This method checks the attribute "checked" of checkbox and returns true if checked*/
    isChecked: function(elementId) {
        try {
            if (feba.domManipulator.getAttribute(
                    feba.domManipulator.getElementById(elementId), "checked") != true) {

                return true;
            }

            return false;
        } catch (e) {
            LOG.logMessages("Exception occurred in isChecked " + e.message);
            throw e;

        }

    },

    /*This method returns the "type " of the element passed*/
    getType: function(elementId) {
        try {
            return feba.domManipulator.getAttribute(
                feba.domManipulator.getElementById(elementId), "type");

        } catch (e) {
            LOG.logMessages("Exception occurred in getType " + e.message);
            throw e;
        }
    },

    /*this method will disable the target if it is simple or multiple select
       else place any empty value for text field
     */
    disableField: function(target) {
        try {
            if (target.type == Constants.SIMPLE_SELECT ||
                target.type == Constants.MULTIPLE_SELECT) {

                target.disabled = true;
            } else if (target.type == Constants.RADIO) {
                var element = feba.domManipulator.getElementByName(target.name);
                element.each(function() {
                    feba.domManipulator.getElement(this).checked = false;
                });
            } else {
                target.value = "";

            }
        } catch (e) {
            LOG.logMessages("Exception occurred in disableField " + e.message);
            throw e;
        }
    },
    /**
     * Get the parent of each element in the set of matched elements
     */
    parent: function(children) {
        var elements = jQuery(children).parent();
        return elements[0];
    },
    /**
     * Creates new div Element and return it.
     */

    createDivElement: function(idn, className) {
        return jQuery('<div/>').attr({
            'id': idn,
            'class': className
        });
    },
    /*
     *creates new span Element and return it
     */
    createSpanElement: function(idn, className) {
        return jQuery('<span/>').attr({
            'id': idn,
            'class': className
        });
    },
    /*
     *creates new para Element and return it
     */
    createParaElement: function(idn, className) {
        return jQuery('<p/>').attr({
            'id': idn,
            'class': className
        });
    },
    /*
     *insert new break Element and return it
     */
    createBreakElement: function() {
        return jQuery('<br/>');
    },
    /**
     * This method loads a script on page and appends to head.
     */
    loadScript: function(scriptPath) {

        // EB112Performance fix for page size issue
        jQuery.ajaxSetup({
            // Enable caching of AJAX responses
            cache: true
        });

        feba.domManipulator.append(feba.domManipulator.getElement("head"),
            "<script type=\"text/javascript\" src=\"" + feba.contextPath + scriptPath + "\"></script>");
    },
    /**
     * Returns the element ending with the specified id 
     */
    getElementEndingWith: function(idEndingWith) {
        return jQuery("[id$='" + idEndingWith + "']");
    },

    /**
     * Create label Element .
     */
    createLabelElement: function(className, description) {
        var label = jQuery('<label/>').attr({
            'class': className
        });
        label.html(description);
        return jQuery('<span/>').append(label);
    },

    /**
     * 	Creates input element of type checkBox
     */
    addCheckBox: function(targetName, optionValue, optionDescription, checked) {
        var checkBox = jQuery('<input/>').attr({
            'type': 'checkBox',
            'name': targetName,
            'value': optionValue,
            'checked': checked
        });
        var label = jQuery('<label/>').html(optionDescription);
        return jQuery('<span/>').append(checkBox).append(label);
    },
    /**
     * Creates input element of type radio
     */
    addRadioButton: function(targetName, optionValue, optionDescription, checked) {
        var radio = jQuery('<input/>').attr({
            'type': 'radio',
            'name': targetName,
            'value': optionValue,
            'checked': checked
        });
        var label = jQuery('<label/>').html(optionDescription);
        return jQuery('<span/>').append(radio).append(label);
    },
    /**
     * Creates input element of type hidden
     */
    addHiddenTextElement: function(name, value) {
        return jQuery('<input/>').attr({
            'type': Constants.HIDDEN,
            'name': name,
            'value': value
        });
    },


    /**
     * Create Table Element
     */
    getTableElement: function() {
        return jQuery('<table/>');
    },
    /**
     * Create Row Element
     */
    getRowElementForTable: function() {
        return jQuery('<tr>');

    },
    /**
     * Create new Cell for Row
     */
    getCellForRow: function() {
        return jQuery('<td>');
    },
    /**
     * Append any Element as Child to given element which is parent in this
     * case.
     */
    appendChild: function(parent, child) {
        jQuery(parent).append(child);
    },


    /**
     * Create Table depending on JSON response
     */
    createTable: function(tableProperties, content, targetContent) {
        var counter = 0;
        if (content) {
            //gets the previously selected elements
            var selectedValues =
                feba.domManipulator.getSelectedValues(tableProperties.targetName, targetContent);
            //get the table element<table></table>
            var table = feba.domManipulator.getTableElement();
            feba.domManipulator.addClass(table, tableProperties.table_style);
            //get the row element
            var row = feba.domManipulator.getRowElementForTable();
            //append row elemet as a child to table element
            feba.domManipulator.appendChild(table, row);
            // add class to rows
            feba.domManipulator.addClass(row, tableProperties.row_style + " " + "dynamicFeature");
            // loop thorugh each content of the response and create dymanic element depending upon the targetType
            feba.domManipulator.each(content, function(index, value) {
                //splitting the content to get value and description
                var splitResult = value
                    .split(Constants.PIPE);
                var optionDescription = splitResult[1];
                var optionValue = splitResult[0];
                // it will create the dynamic element
                var dynamicElement = feba.domManipulator.createDynamicElement(value, tableProperties.targetName, tableProperties.inputType, selectedValues);
                // get column
                var td = feba.domManipulator.getCellForRow();
                // adding class to column
                feba.domManipulator.addClass(td, tableProperties.column_style + " " + "dynamicFeatureCol")
                feba.domManipulator.addClass(dynamicElement, tableProperties.element_style);
                //appending dynamic element to the column
                feba.domManipulator.appendChild(td, dynamicElement);
                var tr = feba.domManipulator.find(table, 'tr:last');
                feba.domManipulator.appendChild(tr, td);
                //counter decides how many elements to be added in a row which we specify in the request
                counter++;
                if (counter == tableProperties.no_of_columns) {
                    //if number of columns specified are created in a particular row, then create a new row
                    row = feba.domManipulator.getRowElementForTable();
                    feba.domManipulator.appendChild(table, row);
                    feba.domManipulator.addClass(row, tableProperties.row_style + " " + "dynamicFeature");
                    counter = 0;
                }
            });
            return table;
        }

    },
    /*
    this method will get the previously selected values
    */
    getSelectedValues: function(targetName, targetContent) {
        var selectedValues = "";
        if (targetContent) {
            var tar = Constants.TARGET +
                Constants.UNDER_SCORE + targetName;
            if (targetContent[tar]) {
                selectedValues = targetContent[tar];
            }
        }
        return selectedValues;
    },
    /*
     This functions decides whether value is preselected or not
    */
    checkValue: function(selectedValues, optionValue) {
        if (selectedValues) {
            if (selectedValues === optionValue) {
                return true;
            }
            var length = selectedValues.length;
            for (var i = 0; i < length; i++) {
                if (selectedValues[i] == optionValue) {
                    return true;
                }
            }
        }
        return false;
    },
    /*
    this method will create dynamic elements depending upon the targetType
    */
    createDynamicElement: function(value, target, targetType, selectedValues) {
        //checking whether targetType is specified or not
        var input = (targetType == Constants.CHECKBOX || targetType == Constants.RADIO);
        var splitResult = String(value).split(Constants.PIPE);
        var optionDescription = splitResult[1];
        var optionValue = splitResult[0];
        if (input == true) {
            switch (targetType) {
                case Constants.CHECKBOX:
                    dynamicElement = feba.domManipulator
                        .addCheckBox(target, optionValue, optionDescription, feba.domManipulator.checkValue(selectedValues,
                            optionValue));
                    break;
                case Constants.RADIO:
                    dynamicElement = feba.domManipulator
                        .addRadioButton(target, optionValue, optionDescription, feba.domManipulator.checkValue(selectedValues,
                            optionValue));
                    break;
            }
        }

        return dynamicElement;


    },
    /*
     this method check for event click and activePullDown, if true
     close the opened pullDown
    */
    closeActivePulldown: function(event) {

        if (event.type == 'click' && feba.activePulldown) {
            hidePullDownMenu(feba.activePulldown);

            jQuery(document).unbind(".pulldown");
        }
    },
    /*
     *This method is used to include scripts 
     */
    write: function(value) {
        if (ajaxPageRefresh) {
            //jQuery(document).append(value);    
            jQuery(document.body).append(value);
        } else {
            document.write(value);
        }
    },
    /*
     * used for stop propagation of an event
     */
    stopPropagation: function(event) {
        jQuery.Event(event).stopPropagation();
    },
    /*
     * used for stop immediate propagation of an event
     */
    stopImmediatePropagation: function(event) {
        jQuery.Event(event).stopImmediatePropagation();
    },
    /*
     * Styles select elements as comboboxes: with autocomplete and show all functionalities.
     */
    styleComboboxes: function(elements, options) {
        elements.febaCombobox(options);
    },
    /*
     * Calls the autocomplete plugin to convert a textbox to an autocomleted element.
     */
    makeAutocomplete: function(element, options, highlightMatches) {
        element.autocomplete(options);

        // If highlighting is required of matched elements in coded
        // for, renderItem needs to be overridden.
        if (highlightMatches) {
            //Aashish modified from autocomplete to ui-autocomplete for RWD
            element.data("ui-autocomplete")._renderItem = function(ul, item) {
                return jQuery("<li>").data("item.ui-autocomplete", item).append(
                    "<a>" + item.label + "</a>").appendTo(ul);
            };
        }
    },
    /**
     * Get the parents of element in the set of matched elements
     */
    parents: function(element, selector) {
        try {
            return jQuery(element).parents(selector);
        } catch (e) {
            LOG.logMessages("Exception occurred in parents " + e.message);
            throw e;
        }
    },
    /**
     * Get the siblings of element in the set of matched elements
     */
    siblings: function(element) {
        try {

            return jQuery(element).siblings();

        } catch (e) {

            LOG.logMessages("Exception occurred in siblings " + e.message);
            throw e;

        }
    },
    /**
     * Get the siblings of element in the set of matched elements
     */
    slideToggle: function(element) {
        try {

            return jQuery(element).slideToggle();

        } catch (e) {

            LOG.logMessages("Exception occurred in slideToggle " + e.message);
            throw e;

        }
    },
    /**
     * Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
     */
    hasElementsMatching: function(elements, selector) {
        try {
            return jQuery(elements).has(selector);
        } catch (e) {
            LOG.logMessages("Exception occurred in hasElementsMatching " + e.message);
            throw e;
        }
    },
    /**
     * To get the number of elements matched set of elements
     */
    getMatchedElementCount: function(elements) {
        try {
            return jQuery(elements).length;
        } catch (e) {
            LOG.logMessages("Exception occurred in getMatchedElementCount " + e.message);
            throw e;
        }
    },
    /**
     * Check the current matched set of elements against a selector, element, or
     * jQuery object and return true if at least one of these elements matches
     * the given arguments.
     */
    isMatching: function(elements, selector) {
        try {
            return jQuery(elements).is(selector);
        } catch (e) {
            LOG.logMessages("Exception occurred in isMatching " + e.message);
            throw e;
        }
    },
    /**
     * Remove a previously-attached event handler from the elements. To promote
     * the use namespaces while binding, we will not be considering unbinding
     * with handler methods.
     */
    unbind: function(element, eventType) {
        try {
            return jQuery(element).unbind(eventType);
        } catch (e) {
            LOG.logMessages("Exception occurred in unbind " + e.message);
            throw e;
        }
    },
    /**
     * Search for a specified value within an array and return its index (or -1
     * if not found). Works on non-string values as well.
     */
    getIndexInArray: function(value, array) {
        try {
            return jQuery.inArray(value, array);
        } catch (e) {
            LOG.logMessages("Exception occurred in getIndexInArray " + e.message);
            throw e;
        }
    },
    /**
     * This function returns the formsgroup name
     */
    getFGNameFromPage: function() {
        try {
            var formsgroupField = feba.domManipulator.getElementById("FORMSGROUP_ID__");
            var formsgroupElement = formsgroupField[formsgroupField.length - 1];
            var formsgroup = feba.domManipulator.getValue(formsgroupElement);
            return formsgroup;
        } catch (e) {
            LOG.logMessages("Exception occurred in getFGNameFromPage ");
            throw e;
        }
    },
    /**
     *This function returns the focus to the element
     */
    setFocus: function(element) {
        return jQuery(element).focus(function() {
            jQuery(this).select();
        });
    },
    /**
     * This function returns the element containing Id passed
     */
    getElementByIdContaining: function(containsString) {
        try {
            return jQuery("[id*='" + containsString + "']");
        } catch (e) {
            LOG.logMessages("Exception occurred in getElementByIdContaining " + e.message);
            throw e;
        }
    },
    /**
     * To retrieve an element based on class name
     */
    hideElement: function(element) {
        try {

            return jQuery(element).hide();

        } catch (e) {

            LOG.logMessages("Exception occurred in hideElement " + e.message);
            throw e;

        }
    },
    fadeIn: function(element, speed) {
        try {

            return jQuery(element).fadeIn(speed);

        } catch (e) {

            LOG.logMessages("Exception occurred in hideElement " + e.message);
            throw e;

        }
    },
    fadeOut: function(element, speed) {
        try {

            return jQuery(element).fadeOut(speed);

        } catch (e) {

            LOG.logMessages("Exception occurred in fadeOut " + e.message);
            throw e;

        }
    },


    slideUp: function(element, speed) {
        try {

            return jQuery(element).slideUp(speed);

        } catch (e) {

            LOG.logMessages("Exception occurred in slideUp " + e.message);
            throw e;

        }
    },
    /*Added to check if User has logged-in in a RTL lang*/
    isRTL: function(element) {
        try {
            ////this.options.rtl = ($(e).attr('dir') || $('html').attr('dir') || '').toLowerCase() == 'rtl';
            return (jQuery('html').css("direction")).toLowerCase() == 'rtl';

        } catch (e) {

            LOG.logMessages("Exception occurred in isRTL " + e.message);
            return false;

        }
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },
    slideDown: function(element, speed) {
        try {

            return jQuery(element).slideDown(speed);

        } catch (e) {

            LOG.logMessages("Exception occurred in slideDown " + e.message);
            throw e;

        }
    }
};

feba.initialize();