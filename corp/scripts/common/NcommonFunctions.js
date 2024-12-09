//-------------------------------------------------------------------
//This JQuery function is created to call JavaScript functions
// on document.ready event, from all JSPs
//-------------------------------------------------------------------
var sessionWindow = null; //stores the handle to session alert popup added here sothat session window can be closed on browser tab closed.

jQuery(document).ready(function() {
    //Add list of JavaScript functions which are required to be called on document.ready event
    // Function to highlight error rows
    writeCookies();
    window.onunload = function() {
        if (sessionWindow && !sessionWindow.closed) {
            sessionWindow.close();
        } else {}
        return true;
    };
    highLightErrorRow();
    highLightErrorField();
    var dateFieldText;
    var dateFieldElement;
    var isDateIconClicked;

    var fgName1 = document.getElementById("FORMSGROUP_ID__").value;
    if (fgName1 == "DashboardFG" || fgName1 == "DashboardAutoAlignFG") {

        try {
            dashCustIDIndex = document.getElementById(fgName1 + ".CUST_ID_SELECT").selectedIndex;
            dashDivIDIndex = document.getElementById(fgName1 + ".DIV_ID_SELECT").selectedIndex;
        } catch (e) {
            dashCustIDIndex = 0;
            dashDivIDIndex = 0;
        }
    } else {
        try {
            custIDIndex = document.getElementById(fgName1 + ".SELECTED_CUST_ID__").selectedIndex;
            divIDIndex = document.getElementById(fgName1 + ".SELECTED_DIV_ID__").selectedIndex;
        } catch (e) {
            divIDIndex = 0;
            custIDIndex = 0;
        }

    }


    // This function prevents the default action of buttons if there is type system error in any field
    jQuery(":submit").click(function(event) {
        var element = document.getElementsByTagName('input');
        for (var j = 0; j < element.length; j++) {
            // if the id matches to the type system hidden field, prevent the default action of buttons
            if ((element[j].id.match(/^ERROR_HIDDEN_ROW_/)) || (element[j].id.match(/^ERROR_HIDDEN_FIELD_/))) {
                event.preventDefault();
            }
        }
        if (Constants.TRUE === feba.domManipulator.getAttribute(event.target, "data-isDownloadButton")) {
            feba.domManipulator.setAttribute(feba.domManipulator.getElement("form"), "isDownloadAction", "true");
        }
    });
    /**Start Investec CR104 for Error Highlighting**/
    //Gets the text from a textbox in case of focus in
    var originalText;
    jQuery('input[type="text"]').focusin(function() {
        originalText = jQuery(this).val();
        originalText = jQuery.trim(originalText);
    });
    //Checks if the text has changed in the textbox at focus out, then change the border color of this field
    jQuery('input[type="text"]').focusout(function() {
        newText = jQuery(this).val();
        newText = jQuery.trim(newText);
        if (originalText != newText) {
            changeFieldBorderColor(this);
        }
    });

    //Checks if there is change in the combo box's selected value, then change the border color of this field
    jQuery('select').change(function() {
        changeFieldBorderColor(this);
    });

    //When the current window gets focus, if there is some Business exception
    //of date field corrected using date picker then change the respective
    //field's border
    jQuery(window).focus(function() {
        if (isDateIconClicked) {
            if (isDateChanged(dateFieldElement, dateFieldText)) {
                changeFieldBorderColor(dateFieldElement);
            }
            isDateIconClicked = false;
        }
    });

    //If an image with id containing FG is clicked and that image is inside a table and its nth level span
    //(going upwards towards the td - select last span which is also the parent of image)
    //has class ERROR_FIELD_BORDER (means there is a Business exception on this date field)
    //then set isDateIconClicked to true and store current date field's value to dateFieldText
    jQuery('img[id*="FG"]').click(function() {
        var tableElem = jQuery(this).closest('table');
        if (tableElem.html() != null) {
            var elems = jQuery(this).parentsUntil("td");
            var nLevelSpan = elems[elems.length - 1];
            if (jQuery(nLevelSpan).hasClass('ERROR_FIELD_BORDER')) {
                isDateIconClicked = true;
                var parentSpan = jQuery(this).parent().parent();
                var field = jQuery(parentSpan).children(":first");
                dateFieldText = jQuery(field).val();
                dateFieldText = jQuery.trim(dateFieldText);
                dateFieldElement = field;
            }
        }
    });
    /**End Investec CR104 for Error Highlighting**/


    // code added by sagar_n01 for APM enhancement
    // below code gets all the submit buttons on the page and binds it to click event, and appends FG name and event clicked as hidden fields
    feba.domManipulator.bind(LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "submit"), 'click', '', function(event) {
        if (Constants.YES === CONFIG.addtionalURLParamRequired) {
            var eventSrc = event;
            var inputElements = feba.domManipulator.getElement("input:submit");
            var iLength = inputElements.length;
            var parentForm = jQuery(eventSrc.srcElement).parents('form:first')[0];
            jQuery(parentForm).append(feba.domManipulator.addHiddenTextElement('FID', parentForm.name));
            jQuery(parentForm).append(feba.domManipulator.addHiddenTextElement('EID', jQuery(eventSrc.srcElement)[0].id));
        }
    });
    // APM enhancement - END
    //added for handling field hiding,inline style was getting overwritten
    try {
        jQuery('[data-hideUsingFieldHidingFramework="true"]').addClass('hideElement');
    } catch (e) {
        console.log('Exception caught in fieldHiding handling');
    }
    //Rajeev added for floating backto top link in case of smartphone login
    if (typeof isAdaptiveUI != 'undefined' && isAdaptiveUI == "true")
        showFloatingBackToTop();
    //writeCookie('userType');
    //writeCookie('languageId');
    //writeCookie('bankId');
});

//-------------------------------------------------------------------
//This function checks if the date in dateFieldElement is changed
//and returns an appropriate flag value
//-------------------------------------------------------------------

function isDateChanged(dateFieldElement, dateFieldText) {
    var dateChanged = false;
    newDateFieldText = jQuery(dateFieldElement).val();
    newDateFieldText = jQuery.trim(newDateFieldText);
    if (dateFieldText != newDateFieldText) {
        dateChanged = true;
    }
    return dateChanged;
}
/** Start Pop-up Bubble in case of field's inside table component - Investec CR86**/

//-------------------------------------------------------------------
//This function hides the pop-up bubble
//-------------------------------------------------------------------

function hideBubble() {
    //var bubbleDivs = jQuery('div[id*="bubbleID_"]');
    var bubbleDivs = jQuery('span[id*="bubbleID_"]');
    var elemsToBeRemoved = new Array();
    var count = 0;
    for (var j = 0; j < bubbleDivs.length; j++) {
        if (!jQuery(bubbleDivs[j]).next().hasClass('ERROR_FIELD_BORDER_TYPESYS')) {
            jQuery(bubbleDivs[j]).remove();
        }
    }
}

//-------------------------------------------------------------------
//This function shows the pop-up bubble with error for element with class mouseoverClass
//Parameters:
//		mouseoverClass is the class name of the highlighted element
//-------------------------------------------------------------------

function showBubble(mouseoverClass, errorContent) {
    var isListingDisplay = "N";
    var tableList = jQuery('table');
    for (i = 0; i < tableList.size(); i++) {
        var currTable = tableList[i];
        if (jQuery(currTable).find('.ERROR_FIELD_BORDER_TYPESYS').length > 0) {
            isListingDisplay = "Y";
            break;
        }
    }
    if (isListingDisplay == 'N') {
        var highlightedElem = jQuery("." + mouseoverClass);
        var position = highlightedElem.offset();
        if (position != null) {
            var tPosX = (position.left - 100) + 'px';
            var tPosY = (position.top - 80) + 'px';
            //Added random number for error filed in order to not to violate the unique id standards
            var number = 1 + Math.floor(Math.random() * 600);
            jQuery(highlightedElem).before('<div id=\"bubbleID_' + number + '\" style="top:' + tPosY + '; left:' + tPosX + '; position: absolute; display: inline; border: 2px; width: 300px; height: auto; background-color: pink;padding-top:10px;padding-bottom:10px; padding-right:10px;padding-left:10px; font-size:0.75em; z-index: 10;">' + errorContent + '<input type=hidden id=\"ERROR_HIDDEN_FIELD_' + number + '\" value=\"ROW\"></div>');
        }
    } else {
        var highlightedElem = jQuery("." + mouseoverClass);
        var position = highlightedElem.offset();

        if (position != null) {
            // var tPosX = (position.left - 100) + 'px';
            var elementWidth = parseInt(highlightedElem.css('width'));
            var tPosX = (position.left - elementWidth) + 'px';
            var tPosY = (position.top - 80) + 'px';
            //Added random number for error filed in order to not to violate the unique id standards
            var number = 1 + Math.floor(Math.random() * 600);
            //jQuery(highlightedElem).before('<div id=\"bubbleID_'+number+ '\" style="top:' + tPosY + '; left:' + tPosX + '; position: absolute; display: inline; border: 2px; width: 300px; height: auto; background-color: pink;padding-top:10px;padding-bottom:10px; padding-right:10px;padding-left:10px; font-size:0.75em; z-index: 10;">'+ errorContent + '<input type=hidden id=\"ERROR_HIDDEN_FIELD_'+number+ '\" value=\"ROW\"></div>');
            /*jQuery(highlightedElem).after('<span id=\"bubbleID_'+number+ '\" style="position: absolute; display: inline; border: 2px; width: 200px; height: auto; background-color: pink;padding-top:10px;padding-bottom:10px; padding-right:10px;padding-left:10px; font-size:0.75em; z-index: 10;">'+ errorContent + '<input type=hidden id=\"ERROR_HIDDEN_FIELD_'+number+ '\" value=\"ROW\"></span>');*/
            jQuery(highlightedElem).after('<span class="error_highlight_textbox error_highlight_textbox_margin" id="bubbleID_' + number + '">' + errorContent + '<input type=hidden id="ERROR_HIDDEN_FIELD_' + number + '" value="ROW"></span>');
        }
    }

}

/** End Pop-up Bubble in case of field's inside table component - Investec CR86 **/
function sendAlert() {
    var fgName = document.getElementsByName("FORMSGROUP_ID__")[0].value;
    sendAlert(fgName);
}

//This method will be called directly for downloads in grouplets
function sendAlert(fgName) {

    if (!fgName) {

        fgName = document.getElementsByName("FORMSGROUP_ID__")[0].value;

    }
    var selected = document.getElementById(fgName + ".OUTFORMAT").value;
    if (selected == 1 || selected == 2 || selected == 8 || selected == 11) {
        var msg = getMessage("SaveAndOpen");
        msg = msg + " \n";
        msg = msg + getMessage("LogOutIfOpened");
        alert(msg);
    }
}

function enableCntrlDetails() {
    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var select = document.getElementById(fgName + ".CONTROL").value;
    if (select != "CBO" && select != "LKP") {
        document.getElementById(fgName + ".CONTROL_DETAILS").value = "";
        document.getElementById(fgName + ".CONTROL_DETAILS").disabled = true;
        document.getElementById(fgName + ".ADDITIONAL_CONTROL_DETAILS").value = "";
    } else {
        document.getElementById(fgName + ".CONTROL_DETAILS").disabled = false;
        document.getElementById(fgName + ".ADDITIONAL_CONTROL_DETAILS").value = "";
        document.ReportsDesignFG.__EVENT_ID__.disabled = false;
        document.ReportsDesignFG.__EVENT_ID__.value = "LOAD_CONTROL_DETAILS";
        document.ReportsDesignFG.submit();
    }
}

function getAdditionalControlDetails() {
    document.ReportsDesignFG.__EVENT_ID__.disabled = false;
    document.ReportsDesignFG.__EVENT_ID__.value = "LOAD_ADDITIONAL_CONTROL_DETAILS";
    document.ReportsDesignFG.submit();
}

function enableReportName(groupletId) {
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var grpId = "";
    } else {
        var grpId = groupletId + ":";
    }

    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var manualJrxml = document.getElementById(grpId + fgName + ".MANUAL_JRXML");
    var manualJsp = document.getElementById(grpId + fgName + ".MANUAL_JSP");
    if (manualJrxml.checked || manualJsp.checked) {
        document.getElementById(grpId + fgName + ".REPORT_NAME").disabled = false;
    } else {
        document.getElementById(grpId + fgName + ".REPORT_NAME").value = "";
        document.getElementById(grpId + fgName + ".REPORT_NAME").disabled = true;
    }
}

function getControlDetails() {
    var controlDesc = new Array();
    var controlValue = new Array();
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var grpId = "";
    } else {
        var grpId = groupletId + ":";
    }
    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var selCri = document.getElementById(grpId + fgName + ".DISPLAY_SECTION").value;
    var select = document.getElementById(grpId + fgName + ".CONTROL");
    if (select.options.length > 1) {
        for (var i = 0; i < select.options.length; i++) {
            controlDesc[i] = select.options[i].text;
            controlValue[i] = select.options[i].value;
        }
    }

    if (selCri == "O" || selCri == "B") {

        select.options.length = 1;
        select.options[0] = new Option('CheckBox', 'CHK');
        document.getElementById(grpId + fgName + ".CONTROL_DETAILS").value = "";
        document.getElementById(grpId + fgName + ".CONTROL_DETAILS").disabled = true;
        document.getElementById(grpId + fgName + ".ADDITIONAL_CONTROL_DETAILS").value = "";

    } else {
        select.options.length = controlDesc.length;
        document.getElementById(grpId + fgName + ".CONTROL_DETAILS").disabled = false;
        document.getElementById(grpId + fgName + ".ADDITIONAL_CONTROL_DETAILS").value = "";
        for (var i = 0; i < controlDesc.length; i++) {
            select.options[i] = new Option(controlDesc[i], controlValue[i]);
        }
    }


}

function getPaymentDetails(cpType) {
    var fgName = document.getElementsByName("FORMSGROUP_ID__")[0].value;
    var selectedBnfValue = document.getElementById(fgName + ".DESTINATION_DETAILS_STRING_" + cpType).value;
    var bnfValuesList = selectedBnfValue.split('/');
    var paymentDetailsEntity = bnfValuesList[5];
    if (paymentDetailsEntity == undefined) {
        document.getElementById(fgName + ".BENEFICIARY_REFERENCE").value = "";
    } else {
        var paymentDetailsKeyValArray = paymentDetailsEntity.split(':');
        var paymentDetails = paymentDetailsKeyValArray[1];
        document.getElementById(fgName + ".BENEFICIARY_REFERENCE").value = paymentDetails;
    }
}

function enableCntrlDetails() {
    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var select = document.getElementById(fgName + ".CONTROL").value;
    if (select != "CBO" && select != "LKP") {
        document.getElementById(fgName + ".CONTROL_DETAILS").value = "";
        document.getElementById(fgName + ".CONTROL_DETAILS").disabled = true;
        document.getElementById(fgName + ".ADDITIONAL_CONTROL_DETAILS").value = "";
    } else {
        document.getElementById(fgName + ".CONTROL_DETAILS").disabled = false;
        document.getElementById(fgName + ".ADDITIONAL_CONTROL_DETAILS").value = "";
        document.ReportsDesignFG.__EVENT_ID__.disabled = false;
        document.ReportsDesignFG.__EVENT_ID__.value = "LOAD_CONTROL_DETAILS";
        document.ReportsDesignFG.submit();
    }
}

function getAdditionalControlDetails() {
    document.ReportsDesignFG.__EVENT_ID__.disabled = false;
    document.ReportsDesignFG.__EVENT_ID__.value = "LOAD_ADDITIONAL_CONTROL_DETAILS";
    document.ReportsDesignFG.submit();
}

/**
 * Utility method to determine if a grouplet has invoked the function
 * */
function isGrouplet(id) {
    //TODO Move hardcoded value to a shared constant
    if (id.indexOf(":") == -1) {
        return false;
    } else return true;
}

/*
 * This method will load an rich text editor
 * id - The id attribute value of the text area component
 * imgPath - The images folder path
 */
function loadRichTextEditor(id, imgPath, languageId, rtlPropertyValue) {

    var oHeight = feba.domManipulator.getElementById(id).css("height");
    var oWidth = feba.domManipulator.getElementById(id).css("width");
    var textArea = feba.domManipulator.getElementById(id);
    var richTextControls = "bold italic underline | font size " +
        "style | color highlight | bullets numbering | undo redo | " +
        "rule link unlink | cut copy paste pastetext |";
    //To change the controls in particular screen richText area, provide controls through richTextControls element(hidden)
    var richtextControlId = document.getElementById("richTextControls");
    if (richtextControlId != null && richtextControlId !== undefined) {
        richTextControls = document.getElementById("richTextControls").value;
    }
    var editor = textArea.cleditor({
        height: oHeight,
        width: oWidth,
        imagePath: imgPath,
        langId: languageId,
        rtlValue: rtlPropertyValue,
        controls: richTextControls
    });
    feba.domManipulator.addData(textArea, 'editor', editor[0]);

}

/**
 * this method is used to reset the rich text editor frame
 * @param textAreaId
 * @param groupletId
 */
function resetRichTextEditor(textAreaId, groupletId) {
    feba.domManipulator.documentReady(function() {

        var resetButtons = getResetButtons(groupletId);
        var textArea = feba.domManipulator.getElementById(textAreaId);
        feba.domManipulator.click(resetButtons, function() {
            feba.domManipulator.val(textArea, '');
            var editor = feba.domManipulator.getData(textArea, 'editor');
            editor.updateFrame();
        });
    });
}

//Code change for FNEB10.3_CR74 - Session time out starts here
function sessionTimer(cssURL1, usertype) {

    sessionExpireTime = 0; //stores the time to show the Session alert popup
    //var sessionWindow=null; commented added gloably to handle session window close event.
    sessionHdrTimerID = null; //stores the timer identifier for Header Text Session timeout value
    sessionPopupTimerID = null; //Stores the timer identifier for Session alert popup

    var sessionExpiredMsg = getMessage("SessionExpiredMsg");
    var reloginMsg = getMessage("ReloginMsg");
    var sessionExpiringMsg = getMessage("SessionExpiringMsg");
    var secMsg = getMessage("Seconds");
    var continuesessionMsg = getMessage("ContinueSessionMsg");
    var expiringMsg = getMessage("SessionTimeoutMsg");
    var sessionAlertMsg = getMessage("SessionAlert");
    var goToLoginPageMsg = getMessage("GoToLoginPage");

    /*
     * This method will give time in hrs : minutes format
     * @param seconds, input time in seconds
     */
    this.getSecondsLeft = function(seconds) {
        var hours = 0;
        var minutes = 0;
        //Calculate the hours left to show it in page header
        if (seconds > 3600) {

            hours = parseInt(seconds / 3600);
        }
        //Calculate the minutes left to show it in page header
        if (seconds >= 60) {
            minutes = parseInt((seconds - hours * 3600) / 60);
        }
        //Calculate the seconds left to show it in page header
        seconds = seconds - (hours * 3600) - (minutes * 60);
        return hours + getMessage("timeHours") + " : " + minutes + getMessage("timeMinutes");
    };

    /*
     * This method will start timer for page header and session alert popup
     */
    this.start = function() {
        var timerVal = Number(document.getElementById("sessionAlertTime").value);
        var sessionTimeout = Number(document.getElementById("sessionTimeout").value);
        //Check for invalid session alert configuration details
        if (timerVal <= 0 || timerVal >= sessionTimeout) {
            //session timeout and alert interval variables are wrongly configuration
            return;
        }
        sessionExpireTime = sessionTimeout - timerVal;


        //Dynamically insert an text to show the session timeout value
        var oNode = document.createElement("SPAN");
        /***** Fix for call id - 644051 - BOC *****/
        var linkNode;
        if (usertype == 4) {
            linkNode = document.getElementById('PREVENT_SESSION_TIMEOUT__');
        } else {
            linkNode = document.getElementById('lastLoginMessage_1');
        }
        var parent = linkNode.parentNode;
        /***** Fix for call id - 644051 - EOC *****/
        if (usertype != 4) {
            timeoutval = this.getSecondsLeft(sessionTimeout);
            feba.domManipulator.getElementById('expiryMsg').remove();
            var oNode = document.createElement("SPAN");
            oNode.innerHTML = "<span class='sessionTimeoutText' style='color:FireBrick;direction:rtl;' id='expiryMsg'><label id='sessionExpiryTime'>" + this.getSecondsLeft(sessionTimeout) + "</label></span>";
            /***** Fix for call id - 644051 - BOC *****/
            parent.insertBefore(oNode, linkNode);
            /***** Fix for call id - 644051 - EOC *****/
            //oNode.innerHTML="<span class='sessionTimeoutText' style='color:FireBrick;direction:rtl;' id='expiryMsg'><label id='sessionExpiryTime'>" + this.getSecondsLeft(sessionTimeout) + "</label></span>";
        } else {
            /***** Fix for call id - 644051 - BOC *****/
            if (feba.domManipulator.getElementById('expiryMsg') == null || feba.domManipulator.getElementById('expiryMsg').length == 0) {
                /***** Fix for call id - 644051 - EOC *****/
                oNode.innerHTML = "<span class='simpletext' style='color:red;' id='expiryMsg'>" + expiringMsg + "<label id='sessionExpiryTime'>" + this.getSecondsLeft(sessionTimeout) + "</label></span><br />";
                /***** Fix for call id - 644051 - BOC *****/
                parent.insertBefore(oNode, linkNode);
            } else {
                feba.domManipulator.getElementById('sessionExpiryTime').innerHTML = this.getSecondsLeft(sessionTimeout);
            }
            /***** Fix for call id - 644051 - EOC *****/
        }
        /***** Fix for call id - 644051 - BOC *****/
        /*var linkNode;
        if(usertype ==4){
        linkNode = document.getElementById('PREVENT_SESSION_TIMEOUT__');
        }else{
        linkNode = document.getElementById('lastLoginMessage_1');	}
        var parent = linkNode.parentNode;
        parent.insertBefore(oNode, linkNode);*/
        /***** Fix for call id - 644051 - EOC *****/

        //start the timer for page header timeout text
        sessionHdrTimerID = setInterval("this.updateHeaderTime()", 60000);

        //start the timer for Session alert timeout text
        sessionPopupTimerID = setInterval("this.showSessionExpiredPopup()", 1000);
    }

    /*
     * This method updates the page header countdown timer for session timeout value
     */
    this.updateHeaderTime = function() {
        sec = Number(document.getElementById("sessionTimeout").value);
        configSec = Number(document.getElementById("configSessionTimeout").value);
        if (sec == configSec) {
            var newTimerVal = Number(document.getElementById("sessionAlertTime").value);
            if (sessionPopupTimerID == null) {
                sessionExpireTime = configSec - newTimerVal;
                this.showSessionExpiredPopup();
                sessionExpireTime = configSec - newTimerVal;
                sessionPopupTimerID = setInterval("this.showSessionExpiredPopup()", 1000);
            }
        }

        //Decrement by 60, since the timer is configured for every 60 seconds
        sec = sec - 60;

        document.getElementById("sessionExpiryTime").childNodes[0].nodeValue = this.getSecondsLeft(sec);

        //reset the session timeout value
        document.getElementById("sessionTimeout").value = sec;

        //Show the Session alert popup when the session expires.
        if (sec != 0 && sec < 60) {
            clearInterval(sessionHdrTimerID);
            mSec = sec * 1000;
            sessionHdrTimerID = setInterval("this.showExpiredPopup()", mSec);
        }
        if (sec == 0) {
            //Call the showExpiredPopup method to inform user that the sesion got expired.
            this.showExpiredPopup();
        }
    };

    /*
     * This method will show a session expired popup with login button (Displayed after session expires)
     */
    this.showExpiredPopup = function() {
        //Clear the timer for page header
        clearInterval(sessionHdrTimerID);
        if (sessionWindow != null && sessionWindow.closed) {
            //Popup window is closed before session expired message is displayed. So, opening it again.

            //Create the Session alert popup
            var doc = this.createSessionPopupDoc();

            //Hide irrevalent sections
            var str = "<script>";
            str += "document.getElementById('rowID1').style.display='';";
            str += "document.getElementById('rowID2').style.display='none';";
            str += "document.getElementById('rowID3').style.display='none';";
            str += "window.onunload = function () { document.getElementById('gotoLoginImg').click(); } ";
            str += "</script>";

            //Write to the session popup window
            doc.write(str);
            doc.close();
        }
    };

    /*
     * This method shows a session expired popup
     * The popup will be shown only when the configured alert interval is reached.
     */
    this.showSessionExpiredPopup = function() {
        sessionExpireTime--;

        //Show the Session popup only when the timer reaches 0
        if (sessionExpireTime != 0) {
            return;
        }

        clearInterval(sessionPopupTimerID);
        sessionPopupTimerID = null;
        //Create the Session alert popup
        var doc = this.createSessionPopupDoc();
        //Hide irrevalent sections and start countdown timer
        //Changes done solving IE8 popup issue
        var str;
        //window.setTimeout(function () {

        str = "<script>";
        str += "function updateTime() {";
        str += "	if (timerVal == 0) {";
        str += "		clearInterval(timerID); ";
        str += "		document.getElementById('rowID1').style.display='';";
        str += "		document.getElementById('rowID2').style.display='none';";
        str += "		document.getElementById('rowID3').style.display='none';";
        str += "		window.onunload = function () { document.getElementById('gotoLoginImg').click(); }; ";
        str += "		window.focus();";
        str += "	} else {";
        str += "		timerVal--;";
        str += "		document.getElementById('secLabel').childNodes[0].nodeValue=timerVal;";
        str += "	}";
        str += "}";
        str += "var timerVal=window.opener.document.getElementById('sessionAlertTime').value;";
        //str += "timerVal=(timerVal)*60;";
        str += "document.getElementById('secLabel').childNodes[0].nodeValue=timerVal;";
        str += "var timerID=setInterval('updateTime()',1000);";
        str += "</script>";

        //Write the newly created script to the Session popup window
        doc.write(str);
        //},400);
        doc.close();
    };

    /*
     * This method is used to show a session alert popup
     * using dynamically created HTML content
     */
    this.createSessionPopupDoc = function() {
        //Open an empty popup for showing session alert
        //Changes done solving IE8 popup issue
        var features = "width=420,cellpadding=0,cellspacing=0,dialog=yes,toolbar=no,menubar=no,height=220,status=no,location=0,resizable=no,left=500,top=265,dependent=1,alwaysRaised=1,title=0";
        sessionWindow = window.open("", "", features);
        var doc = sessionWindow.document;
        var sessionImgPath = document.getElementById('sessionImgPath').value;
        var sessionLoginURL = document.getElementById('sessionLoginURL').value;
        //Changes done solving IE8 popup issue
        var str;
        doc.write("<html><head><title>Session Alert</title><link href='" + cssURL1 + "' rel='stylesheet' type='text/css'>");
        //Added As part of 11.0.6 Enhancement START
        doc.write("<script type='text/javascript'>window.onbeforeunload = function(){window.opener.showParentWindow();}</script>");
        doc.write("<script type='text/javascript' src='" + feba.scriptsPath + "/common/NcookieScript.js'></script></head>");
        //Added As part of 11.0.6 Enhancement END

        // Removed Common theme inclusion
        //		window.setTimeout(function () {
        str += "</head>";
        str = "<body class='popupDimension'>";
        str += "<div id='sessionPopup'>	";
        str += "<div id='sessionPopupTitle'>";
        str += "	<B>" + sessionAlertMsg + "</B>";
        str += "</div>";
        str += "<div id='sessAlertTable'>";
        str += "<table id='sessionTable' width='100%'>";
        str += "<tr id='rowID1' style='display:none' align='center'>";
        str += "<td colspan='2' align='center'>";
        str += "<table width='100%' class='sessionTable'>";
        str += "<tr align='left'>";
        str += "<td align='left' colspan='2' class='sessionExpiredRow'>" + sessionExpiredMsg + "</td>";
        str += "</tr>";
        str += "<tr align='left'>";
        str += "<td align='left' colspan='2' class='reloginMsgRow'>" + reloginMsg + "<br /><br/></td>";
        str += "</tr>";
        // Added for Ebux-3 header changes
        if (usertype != 4) {
            str += "<tr align='right'>";
            str += "<td colspan='2'>";
            str += "<br/><img role='button' style='cursor:pointer;' src='" + sessionImgPath + "' alt='" + goToLoginPageMsg + "' title='" + goToLoginPageMsg + "' id='gotoLoginImg' border='0' onclick='window.close();window.opener.goToLoginPage(\"" + sessionLoginURL + "\");' />";
            str += "</td>";
            str += "</tr>";
        } else {
            str += "<tr align='center'>";
            str += "<td colspan='2'>";
            str += "<br/><br/><img src='" + sessionImgPath + "' alt='" + goToLoginPageMsg + "' title='" + goToLoginPageMsg + "' id='gotoLoginImg' border='0' onclick='window.close();window.opener.goToLoginPage(\"" + sessionLoginURL + "\");' />";
            str += "</td>";
            str += "</tr>";
        }
        str += "</table>";
        str += "</td>";
        str += "</tr>";
        str += "<tr id='rowID2' align='center'>";
        str += "<td colspan='2'>";
        str += "<table width='100%'>";
        str += "<tr align='left'><td align='left' class='sessionExpiredRow'>" + sessionExpiringMsg + "<label id='secLabel'>0</label>" + secMsg + "</td></tr>";
        str += "<tr align='left'><td align='left' class='reloginMsgRow'>" + continuesessionMsg + "</td></tr>";
        str += "</table>";
        str += "</td>";
        str += "</tr>";
        // Added for Ebux-3 header changes
        if (usertype != 4) {
            str += "<tr id='rowID3' align='right'>";
            str += "<td style='border-top:1px solid #E4E4E4;'><br /><div class='right' ><span style='display:inline;'><input id='close_btn' class='close_btn' type='button' value='Close this alert' onclick='window.close();' class='btn' style='float:left;'></span>";
            str += "<span class='HW_continue_session'>";
            str += "<input type='button' id='continue_session_btn' value='Continue Session' onclick='window.close();window.opener.resetSession();'></span><br /></div></td>";
            str += "</tr>";
        } else {
            str += "<tr id='rowID3' align='right'>";
            str += "<input type='button' id='continue_session_btn' value='Continue Session' onclick='window.close();window.opener.resetSession();' class='btn'></td>";
            str += "<td align='center'><br /><br /><input id='close_btn' class='close_btn' type='button' value='Close this alert' onclick='window.close();' class='btn'></td>";
            str += "</tr>";
        }
        str += "</table>";
        str += "</div>";
        str += "</div>";
        str += "</body>";
        str += "</html>";
        //Added As part of 11.0.6 Enhancement START
        feba.domManipulator.getElement('body').append("<div id='darkenScreenObject' style='z-index: 2000; position: absolute; filter: alpha(opacity=40); BACKGROUND-COLOR: #000000; width:100%; display: block; height: 2500px; overflow: hidden; top: 0px; left: 0px; bottom:0px; opacity: 0.7; mozopacity: 0.7;'/>");
        //Added As part of 11.0.6 Enhancement END
        doc.write(str);
        //},200);
        return doc;
    };

    start();
}

/*
 * This method will refresh the current page with the given url.
 * This method will be called from Session alert popup
 * @param url, the URL to be loaded
 */
function goToLoginPage(url) {
    //Refreshes the main page with the login page
    window.open(url, '_self');
}


function resetSessionVar() {
    var configtimeout = document.getElementById("configSessionTimeout").value;
    if (configtimeout && configtimeout != '') {
        clearInterval(sessionHdrTimerID);
        clearInterval(sessionPopupTimerID);
        document.getElementById("sessionTimeout").value = configtimeout;
        start();
    }
}
/*
 * This method will refresh the session by using prevent session timeout link
 * in the page header
 */
function resetSession() {
    var configtimeout = document.getElementById("configSessionTimeout").value;
    if (document.getElementById("MODAL_PREVENT_SESSION_TIMEOUT__")) {
        if (configtimeout && configtimeout != '') {
            resetSessionVar();
        }
        var dummyLink = "";
        /* TODO form a link similar to headerEndUser.jsp link */
        if (jQuery('#updateProfile').length > 0) {
            dummyLink = jQuery('#updateProfile').attr('href');
        } else {
            var anchorLinks = jQuery("a[href^='Finacle']");
            for (r = 0; r < anchorLinks.length; r++) {
                var currAnchor = anchorLinks[r];
                var link = jQuery(jQuery("a[href^='Finacle']")[r]).attr('href');
                if (link && link != "" && link != "#") {
                    dummyLink = link;
                    break;
                }
            }
        }
        dummyLink = dummyLink.replace('Finacle', 'FEBAKeepAliveRequest');

        var rpc = new feba.js.ajax.rpcRequest({
            JSObjectName: "FEBA.JS.Ajax.RPCRequest",
            baseUrl: dummyLink,
            criteria: this.options.criteria,
            displayExceptions: true,
            executeOnLoad: false
        });
        try {
            rpc.execute();
        } catch (e) {
            LOG.logMessages("Error in Session Submit.");
        }
        jQuery.unblockUI();
    } else {
        //Click on the Prevent Session Timeout button in the page header to reset the session value.
        //start();
        document.getElementById("PREVENT_SESSION_TIMEOUT__").click();
    }
}


/*
 * This method will remove the darkened screen and will display the
 * parent window. Added as part of 11.0.6 Enhancement
 */
function showParentWindow() {
    feba.domManipulator.getElementById("darkenScreenObject").remove();
}

//Code change for FNEB10.3_CR74 - Session time out ends here
//-------------------------------------------------------------------


/**
 * This method is used to get the reset buttons present on a particular view
 * @param groupletId
 * Added for ticket id 546724.
 */
function getResetButtons(groupletId) {
    if (groupletId == 'null') {
        groupletId = '';
    }
    var resetButtons = feba.domManipulator.find(feba.domManipulator.getElement(document), ':input[type*="Reset"][id*="' + groupletId + '"]');
    if (resetButtons.length == 0) {
        resetButtons = feba.domManipulator.find(feba.domManipulator.getElement(document), ':input[type*="reset"][id*="' + groupletId + '"]');
    }
    return resetButtons;
}

function getFunctionCodeDetails() {
    document.AuthSchemeMaintenanceFG.__EVENT_ID__.disabled = false;
    document.AuthSchemeMaintenanceFG.__EVENT_ID__.value = "PREVENT_SESSION_TIMEOUT__";
    document.AuthSchemeMaintenanceFG.submit();
}

function getFunctCodeDetailsInqFG() {
    document.InquiryFWFG.__EVENT_ID__.disabled = false;
    document.InquiryFWFG.__EVENT_ID__.value = "PREVENT_SESSION_TIMEOUT__";
    document.InquiryFWFG.submit();
}

//Function to get the specific elements on a page or Grouplet
function getSpecifiedElements(groupletId, type, isPortal) {
    var totalElements = new Array();
    if (!groupletId || isPortal) {
        var totalPageElements = feba.domManipulator.getElement(type);
        for (var i = 0; i < totalPageElements.length; i++) {
            if ((totalPageElements[i].id).indexOf(Constants.GROUPLET_ELEMENT_SEPERATOR) == -1 || isPortal) {
                totalElements.push(totalPageElements[i]);
            }
        }
    } else {
        totalElements = feba.domManipulator.find(feba.domManipulator.getElementById(groupletId), type);
    }
    return totalElements;

}
//Function to check whether the groupletId is not null and doesn't contain grouplet Seperator
function isGroupletId(elementId, groupletId) {
    return feba.domManipulator.isGroupletId(elementId, groupletId);
}

//-------------------------------------------------------------------
//This function returns the id of label associated with an element.
//Parameters:
//			id: the id of the element whose label has to be found
//Returns:
//			id of the label associated with the element
//-------------------------------------------------------------------
function getLabelIDByFieldId(Id) {
    var lableCtrlIds = "";
    var outLabel = "";
    lableCtrlIds = document.getElementsByTagName('label');
    var n = lableCtrlIds.length;
    for (i = 0; i < n; i++) {
        var jsVarForControlId = lableCtrlIds[i].htmlFor;
        if (jsVarForControlId != null && jsVarForControlId == Id) {
            outLabel = lableCtrlIds[i].id;
            break;
        }
    }
    return outLabel;
}
//-------------------------------------------------------------------
//This function gets the closest parent with the given tag name.
//Parameters:
//			obj: the object whose parent needs to be found
//			tag: the type of parent which needs to be found
//Returns:
//			nearest parent of the obj of type tag
//-------------------------------------------------------------------

function getParentByTagName(obj, tag)

{
    try {
        //get the parent node
        var obj_parent = obj.parentNode;
        //check if the parent node is of type tag
        // if not, find the parent of parent node
        //repeat until the required parent is found
        while (obj_parent.tagName != tag) {

            obj_parent = obj_parent.parentNode;

        }
        // return the parent of type tag
        return obj_parent;
    } catch (err) {
        //return null if parent of type tag is not found
        return null;
    }
}
//-------------------------------------------------------------------
//This function checks if there is error in any child element of p
//and returns an error flag
//Parameters:
//		childElements of the parent P element, id of the element, regExp contains the starting static id chars of hidden fields
//		ERROR_ROW_ in case of field.java - Business Exception and  ERROR_HIDDEN_ROW_ in case of dispalyError - type system
//-------------------------------------------------------------------
function isAnyChildInError(childElements, id, regExp) {
    var errorFlag = false;

    for (var i = 0; i < childElements.length; i++) {
        // if the id matches to the hidden field defined in Field.java/displayError method, set the error flag
        if (childElements[i].id.match(regExp)) {
            if (childElements[i].value == 'ROW') {
                errorFlag = true;
            }
        }
    }
    return errorFlag;
}
//-------------------------------------------------------------------
//This function restores the style, after a typesystem error has
// been corrected by the user
//Parameters:
//		id of the element, whose parent row's or label style has to be restored
//-------------------------------------------------------------------
function restoreStyle(id) {
    // if js config is row, reset the style
    if (FEBAJSConfig.TYPESYSTEM_ERR_HIGHLIGHT === "ROW") {

        //get parent of element which is of type 'P'
        var parentP = getParentByTagName(document.getElementById(id), 'P');

        //Checks for any business exception fields
        var childElements = jQuery(parentP).find('input');
        var busExErrorFlag = false;
        var regExp = /^ERROR_ROW_/;
        busExErrorFlag = isAnyChildInError(childElements, id, regExp);

        //Checks for any type system error fields
        var typeSysErrorFlag = false;
        regExp = /^ERROR_HIDDEN_ROW_/;
        typeSysErrorFlag = isAnyChildInError(childElements, id, regExp);

        // if there is no business exception and type system exception in the child elements of parentP element, then only remove
        // class ERROR_ROW_BG from the parentP element
        if ((busExErrorFlag == false) && (typeSysErrorFlag == false)) {
            // if the parent contains class ERROR_ROW_BG remove it
            if (hasClass(parentP, "ERROR_ROW_BG")) {
                var reg = new RegExp('(\\s|^)' + "ERROR_ROW_BG" + '(\\s|$)');
                parentP.className = parentP.className.replace(reg, ' ');
            }
        }
        /* Added by Harris for error highlighting based on span */

        var elems = jQuery(document.getElementById(id)).parentsUntil("p");
        var nLevelSpan = elems[elems.length - 1];


        if (nLevelSpan.id == null || nLevelSpan.id == "") {

            var elem = document.getElementById(id);
            var elems = jQuery(elem).parentsUntil("div");
            var nLevelSpan = elems[elems.length - 1];
        }
        childElements = jQuery(nLevelSpan).find('input');
        var regExp = /^ERROR_ROW_/;
        busExErrorFlag = isAnyChildInError(childElements, id, regExp);
        regExp = /^ERROR_HIDDEN_ROW_/;
        typeSysErrorFlag = isAnyChildInError(childElements, id, regExp);
        if ((busExErrorFlag == false) && (typeSysErrorFlag == false)) {
            // if the parent contains class ERROR_ROW_BG remove it
            if (hasClass(nLevelSpan, "ERROR_ROW_BG")) {
                var reg = new RegExp('(\\s|^)' + "ERROR_ROW_BG" + '(\\s|$)');
                nLevelSpan.className = nLevelSpan.className.replace(reg, ' ');
            }
        }
    } else {
        // if JS Config is label reset the style
        if (FEBAJSConfig.TYPESYSTEM_ERR_HIGHLIGHT === "LABEL") {
            var label = document.getElementById(getLabelIDByFieldId(id));
            if (hasClass(label, "error_highlight")) {
                var reg = new RegExp('(\\s|^)' + "error_highlight" + '(\\s|$)');
                label.className = label.className.replace(reg, ' ');
            }

        }
    }
}
//-------------------------------------------------------------------
//This function checks if an element contains a class.
//Parameters:
//			element
//			className
//Returns:
//		true, if the element contains the class
//		false,if the element doesn't contains the class
//-------------------------------------------------------------------

function hasClass(ele, cls) {
    //check if the element ele contains the class cls
    if (ele != null) {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }
}
//-------------------------------------------------------------------
//This function clears error Message after a typesystem error has
//been corrected by the user
//Parameters: id of the element whose associated error message needs
//to be cleared
//-------------------------------------------------------------------
function clearError(id) {
    // clear the error message
    // to fix an issue in IE7, removed errorSpan.
    //Even if we empty the error span in IE7, still it is visible
    var errorSpan = document.getElementById("ERROR_ROW_" + id);
    if (errorSpan != null) {
        jQuery(errorSpan).remove();
    }

    /*Start Added for Investec CR86*/
    // Remove error highlighting in case of field inside a table component

    var elem = document.getElementById(id);
    var tableElem = jQuery(elem).closest('table');
    if (tableElem.html() != null) {
        var elems = jQuery(elem).parentsUntil("td");
        var nLevelSpan = elems[elems.length - 1];
        if (jQuery(nLevelSpan).hasClass('ERROR_FIELD_BORDER_TYPESYS')) {
            jQuery(nLevelSpan).removeClass('ERROR_FIELD_BORDER_TYPESYS');
            hideBubble();
        }
    }
    /*End Added for Investec CR86*/
    //remove the error style from parent row
    restoreStyle(id);
}

/**Start Investec CR104 for Error Highlighting**/
//This function changes the border color of a field, if it had a Business exception earlier and now it has been corrected
function changeFieldBorderColor(elem) {
    var tableElem = jQuery(elem).closest('table');
    if (tableElem.html() != null) {
        var elems = jQuery(elem).parentsUntil("td");
        var nLevelSpan = elems[elems.length - 1];
        // For combo box - checks if the current span is visible. If not, correct error border from all the child spans
        if ((elems != null) && !jQuery(nLevelSpan).is(':visible')) {
            var tdElem = jQuery(nLevelSpan).parent();
            var tdChild = jQuery(tdElem).children(".ERROR_FIELD_BORDER");

            for (var i = 0; i < tdChild.length; i++) {
                jQuery(tdChild[i]).removeClass('ERROR_FIELD_BORDER');
                jQuery(tdChild[i]).addClass('CORRECTED_ERROR_FIELD_BORDER');
            }
        } else {
            if (jQuery(nLevelSpan).hasClass('ERROR_FIELD_BORDER')) {
                jQuery(nLevelSpan).removeClass('ERROR_FIELD_BORDER');
                jQuery(nLevelSpan).addClass('CORRECTED_ERROR_FIELD_BORDER');
            }
        }
    }
}
/**End Investec CR104 for Error Highlighting**/
//-------------------------------------------------------------------
//Added for Investec CR113
//This function displays typesystem error messages to the user
//depending upon configurations set in FEBAJSConfiguration.js
//Parameters:
//			error: error message to be displayed
//			id: id of the element associated with the error
//-------------------------------------------------------------------
function displayError(error, id) {
    // check configuration in FEBAJSConfiguration.js
    if (FEBAJSConfig.TYPESYSTEM_ERR_DISPLAY === "POPUP") {
        // show a popup with error message
        alert(error);
    } else {
        if (FEBAJSConfig.TYPESYSTEM_ERR_DISPLAY === "FIELD") {
            //create a span element if not already present
            var errorSpan = document.getElementById("ERROR_ROW_" + id);
            if (errorSpan == null) {
                errorSpan = document.createElement('span');
            } else {
                errorSpan.innerHTML = "";
            }


            var elem = document.getElementById(id);
            /*Start Added for Investec CR86*/
            //If the field in error is inside a table, then
            //highlight the border of field's outer span
            //and add pop-up bubble mouse events to it
            var tableElem = jQuery(elem).closest('table');
            var tableElemStyle = tableElem.attr('class');
            //to check if the table belongs to the portal theme
            //then we can ignore that particular table
            if (tableElemStyle == 'layoutColumn') {
                tableElem = null;
            }
            if (tableElem != null && tableElem.html() != null) {
                var elems = jQuery(elem).parentsUntil("td");
                var nLevelSpan = elems[elems.length - 1];
                if (!jQuery(nLevelSpan).hasClass('ERROR_FIELD_BORDER_TYPESYS')) {
                    /*Start Investec CR104 for Error Highlighting*/
                    //If this field was corrected after business exception, remove that class(CORRECTED_ERROR_FIELD_BORDER) now
                    if (jQuery(nLevelSpan).hasClass('CORRECTED_ERROR_FIELD_BORDER')) {
                        jQuery(nLevelSpan).removeClass('CORRECTED_ERROR_FIELD_BORDER');
                    }
                    /*End Investec CR104 for Error Highlighting*/
                    jQuery(nLevelSpan).addClass("ERROR_FIELD_BORDER_TYPESYS");
                    showBubble("ERROR_FIELD_BORDER_TYPESYS", error);
                }
            }
            /*End Added for Investec CR86*/
            else {
                var elems = jQuery(elem).parentsUntil("p");
                var nLevelSpan = elems[elems.length - 1];

                /* Added by Vivek Niraimathi for javascript error messages with parent as div*/
                if (nLevelSpan.id == null || nLevelSpan.id == "") {
                    var elems = jQuery(elem).parentsUntil("div");
                    var nLevelSpan = elems[elems.length - 1];
                }

                /* Added by Harris for error highliting based on span*/
                nLevelSpan.className += " ERROR_ROW_BG";

                /* Added by Vivek Niraimathi for javascript error messages with parent as div*/
                // add error message to the span
                errorSpan.id = "ERR_MSG_SPAN_" + id;
                errorSpan.className = "simpletext";
                jQuery(errorSpan).html(error);

                //Forms the span for row and append it as the
                //last children to parent span(To work in case of composite components)
                var parentErrorSpan = document.createElement('span');
                parentErrorSpan.id = "ERROR_ROW_" + id;
                parentErrorSpan.className = "ERROR_ROW_SPAN";
                jQuery(parentErrorSpan).html(errorSpan);

                //Added random number for error filed in order to not to violate the unique id standards
                var number = 1 + Math.floor(Math.random() * 600);
                var hiddenField = "<input type=hidden id=\"ERROR_HIDDEN_ROW_" + number + "\" value=\"ROW\">";
                jQuery(parentErrorSpan).append(hiddenField);
                // add span to the row
                //jQuery(nLevelSpan).append(parentErrorSpan);
                if (typeof isAdaptiveUI != 'undefined' && isAdaptiveUI == "true") {
                    errorSpan.className = "fielderrormsg";
                    jQuery(nLevelSpan).parent().append(parentErrorSpan);
                } else
                    jQuery(nLevelSpan).append(parentErrorSpan);
            }
            // Adding attributes required for JAWS
            var eSpan = feba.domManipulator.getElement(errorSpan);
            feba.domManipulator.setAttribute(eSpan, 'Role', 'alert');
            feba.domManipulator.setAttribute(eSpan, 'aria-live', 'assertive');
            feba.domManipulator.setAttribute(eSpan, 'title', errorSpan.innerHTML);
            var eSpanParent = feba.domManipulator.parent(errorSpan);
            eSpanParent = feba.domManipulator.getElement(eSpanParent);
            feba.domManipulator.setAttribute(eSpanParent, 'Role', 'alert');
            feba.domManipulator.setAttribute(eSpanParent, 'aria-live', 'assertive');
        }
    }
    // highlight the error field
    highlightErrorField(id);
}
//-------------------------------------------------------------------
//This function highlights error label or row depending on
//configuration set in FEBAJSConfiguration.js
//Parameters: id: id of the element associated with the error
//-------------------------------------------------------------------
function highlightErrorField(id) {
    if (FEBAJSConfig.TYPESYSTEM_ERR_HIGHLIGHT === "LABEL") {
        var label = document.getElementById(getLabelIDByFieldId(id));
        //if label is to be highlighted, add the class to label
        label.className += " error_highlight";
    } else {
        //if row is to be highlighted, add the class to row
        if (FEBAJSConfig.TYPESYSTEM_ERR_HIGHLIGHT === "ROW") {
            var parent = getParentByTagName(document.getElementById(id), 'P');
            if ((parent != null) && (!hasClass(parent, "ERROR_ROW_BG"))) {
                parent.className += " ERROR_ROW_BG";
            }

        }
    }
}
//-------------------------------------------------------------------
//This function highlights the rows containing hidden field with id
//ERROR_ROW_[RANDOM NUMBER]
//This field will be added by Field.java in case the field contains an error
//-------------------------------------------------------------------
function highLightErrorRow() {
    // get all the elements of the document
    var element = document.getElementsByTagName('input');

    // Removes the error from current location and insert into a proper location
    // In case of composite component, the error should come after all its elements
    var errorElems = jQuery('.ERROR_ROW_HIGHLIGHT');
    var totalErrorElems = errorElems.length;

    for (var index = 0; index < totalErrorElems; index++) {
        var elems = jQuery(errorElems[index]).parentsUntil("p");
        var nLevelSpan = elems[elems.length - 1];
        // If the element's parent is span then only adjust the error message's location
        if (jQuery(nLevelSpan).is("span")) {
            //Get the DOM element of error row
            var highlightedRow = errorElems[index];
            //Remove the element highlightedRow from the present location and append it as the last child
            //of its parent
            var htmlBackup = "<span id=\"" + highlightedRow.id + "\" class=\"ERROR_ROW_HIGHLIGHT" + "\" >" + jQuery(highlightedRow).html() + "</span>";
            jQuery(highlightedRow).remove();
            jQuery(nLevelSpan).append(htmlBackup);
        }
    }

    for (var i = 0; i < element.length; i++) {
        // if the id matches to the hidden field defined in Field.java, highlight the parent row
        if (element[i].id.match(/^ERROR_ROW_/)) {
            if (element[i].value == 'ROW') {
                var parentP = getParentByTagName(element[i], 'P');
                if ((parentP != null) && (!hasClass(parentP, "ERROR_ROW_BG"))) {
                    parentP.className += " ERROR_ROW_BG";
                }
            }

        }
    }

}
/*Start Added for Investec CR86*/
//-------------------------------------------------------------------
//This function highlights the fields containing hidden field with id
//ERROR_FIELD_[RANDOM NUMBER]
//This field will be added by Field.java for listing fields in case
//the field contains an error
//-------------------------------------------------------------------
function highLightErrorField() {
    // get all the elements of the document
    var element = document.getElementsByTagName('input');

    for (var i = 0; i < element.length; i++) {
        if (element[i].id.match(/^ERROR_FIELD_/)) {

            var previous = jQuery(element[i]).prev();
            var prevElement = previous[previous.length - 1];
            if (!jQuery(prevElement).hasClass("ERROR_FIELD_BORDER")) {
                prevElement.className += " ERROR_FIELD_BORDER";
            }
        }
    }
}
/*End Added for Investec CR86*/


/* Fix for ENY Security concern:start */
function saveAlert() {
    var msg = getMessage("SaveAndOpen");
    msg = msg + " \n";
    msg = msg + getMessage("LogOutIfOpened");
    alert(msg);
}

/* Fix for ENY Security concern:End */
// added by pankaj -start
function change_dropdown(id, groupletId) {
    var grpletid = "";
    if (groupletId && groupletId != null) {
        grpletid = groupletId.id;
    }
    var yearly = 'Yearly';
    var monthly = 'Monthly';
    var quarterly = 'Quarterly';
    var elementName = "GROUPLET_FORMSGROUP_ID__";
    var fgName = '';
    if (grpletid.length > 0) {
        elementName = grpletid + ":" + elementName;
        fgName = grpletid + ":" + document.getElementById(elementName).value;
    } else {
        fgName = document.getElementById(elementName).value;
    }
    /*var frequency = feba.domManipulator.getElementById(fgName+".BUDGET_FREQUENCY");
    var budgetEffective = feba.domManipulator.getElementById(fgName+".BUDGET_EFFECTIVE");*/
    var frequency = feba.domManipulator.getElementById(fgName + ".BUDGET_FREQUENCY_comboText");
    var budgetEffective = feba.domManipulator.getElementById(fgName + ".BUDGET_EFFECTIVE_comboButton");
    if (jQuery('#MODAL_VIEW_CONTAINER') && jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
        fgName = jQuery('#MODAL_VIEW_CONTAINER').find('#' + groupletId.id + "\\:" + "GROUPLET_FORMSGROUP_ID__").attr('value');
        frequency = feba.domManipulator.getElementById(grpletid + ":" + fgName + ".BUDGET_FREQUENCY_comboText");
        budgetEffective = feba.domManipulator.getElementById(grpletid + ":" + fgName + ".BUDGET_EFFECTIVE_comboButton");
    }
    var value = jQuery(frequency);
    value = value.val();
    if (value === yearly) {
        budgetEffective.disabled = true;
    } else {
        budgetEffective.disabled = false;
    }
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth();
    //Month starts from 0 in JS so added 1
    currentMonth = currentMonth + 1;
    //For setting the current month in Add Item flow(id is 1 for Add Item)
    var selectMonth, setMonth;
    if (id === 0) {
        if (value === monthly) {
            selectMonth = jQuery('Select option[value="' + currentMonth + '"]');
            setMonth = feba.domManipulator.setAttribute(selectMonth, "selected", true);
            feba.domManipulator.trigger(setMonth, "change");
        }
        if (value === quarterly) {
            currentMonth = Math.floor((currentMonth - 1) / 3);
            currentMonth = currentMonth * 3 + 1;
            selectMonth = jQuery('Select option[value="' + currentMonth + '"]');
            setMonth = feba.domManipulator.setAttribute(selectMonth, "selected", true);
            feba.domManipulator.trigger(setMonth, "change");
        }
        //To preselect current year
        var currentYear = new Date().getFullYear();
        var year = document.getElementById(grpletid + ":" + "BudgetMaintenanceFG.BUDGET_YEAR");

        selectMonth = jQuery('Select option[value="' + currentYear + '"]');
        setMonth = feba.domManipulator.setAttribute(selectMonth, "selected", true);
        feba.domManipulator.trigger(setMonth, "change");
    } else {
        var startMonthFinYear = feba.domManipulator.getElementById(fgName + ".START_MONTH_FINANCIAL_YEAR").val();
        var pageload_flag = feba.domManipulator.getElementById("PAGELOAD_FLAG").val();
        if (pageload_flag == "false") {
            document.getElementById("PAGELOAD_FLAG").value = "true";
            if (value === monthly) {
                selectMonth = jQuery('Select option[value="' + id + '"]');
                setMonth = feba.domManipulator.setAttribute(selectMonth, "selected", true);
                feba.domManipulator.trigger(setMonth, "change");
            }
            if (value === quarterly) {
                id = Math.floor((id - 1) / 3);
                id = id * 3 + 1;
                selectMonth = jQuery('Select option[value="' + id + '"]');
                setMonth = feba.domManipulator.setAttribute(selectMonth, "selected", true);
                feba.domManipulator.trigger(setMonth, "change");
            }
        } else {
            if (value === monthly) {
                selectMonth = jQuery('Select option[value="' + 1 + '"]');
                setMonth = feba.domManipulator.setAttribute(selectMonth, "selected", true);
                feba.domManipulator.trigger(setMonth, "change");
            }
            if (value === quarterly) {
                selectMonth = jQuery('Select option[value="' + startMonthFinYear + '"]');
                setMonth = feba.domManipulator.setAttribute(selectMonth, "selected", true);
                feba.domManipulator.trigger(setMonth, "change");
            }
        }
    }
}

var getSelectorElement = function(selector) {
    return jQuery(selector);
};
// added by pankaj -end

/*Added By Siddhesh_Chaugule For MonthRangeSelectTag Start*/

function highlight_month(callerObj, yearspread, style_month, style_month_selected) {

    var parentNodeid = callerObj.parentNode.id;
    var parentNod = callerObj.parentNode;
    var mainparentNod = callerObj.parentNode.parentNode;

    var nodes = parentNod.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute("class", style_month);
    }
    callerObj.setAttribute("class", style_month_selected);
    var monthname = callerObj.getAttribute("value");
    var currentvalue = mainparentNod.getElementsByTagName("input")[0].value;
    var index = currentvalue.indexOf("-");
    var year = currentvalue.substring(index + 1);
    mainparentNod.getElementsByTagName("input")[0].value = monthname.concat("-", year);
}

function select_previous_year(callerObj, yearspread, style_month, style_month_selected) {

    var mainparentNod = callerObj.parentNode.parentNode;
    var currenttextvalue = parseInt(callerObj.parentNode.getElementsByTagName("a")[0].innerHTML);
    //var yearspread = parseInt(callerObj.parentNode.parentNode.getAttribute("yearspread"));
    var date = parseInt(new Date().getFullYear());
    var low = date - yearspread;
    var high = date + yearspread;
    if (currenttextvalue > low) {
        callerObj.parentNode.getElementsByTagName("a")[0].innerHTML = currenttextvalue - 1;
        var currentvalue = mainparentNod.getElementsByTagName("input")[0].value;
        var index = currentvalue.indexOf("-");
        var month = currentvalue.substring(0, index);
        var year = currentvalue.substring(index + 1, 10);
        mainparentNod.getElementsByTagName("input")[0].value = month.concat("-", currenttextvalue - 1);
    }
}

function select_next_year(callerObj, yearspread, style_month, style_month_selected) {

    var mainparentNod = callerObj.parentNode.parentNode;
    var currenttextvalue = parseInt(callerObj.parentNode.getElementsByTagName("a")[0].innerHTML);
    //var yearspread = parseInt(callerObj.parentNode.parentNode.getAttribute("yearspread"));
    var date = parseInt(new Date().getFullYear());
    var low = date - yearspread;
    var high = parseInt(date, 10) + parseInt(yearspread, 10);

    if (currenttextvalue < high) {
        callerObj.parentNode.getElementsByTagName("a")[0].innerHTML = currenttextvalue + 1;
        var currentvalue = mainparentNod.getElementsByTagName("input")[0].value;
        var index = currentvalue.indexOf("-");
        var month = currentvalue.substring(0, index);
        var year = currentvalue.substring(index + 1, 10);
        mainparentNod.getElementsByTagName("input")[0].value = month.concat("-", currenttextvalue + 1);
    }
}

/*Added By Siddhesh_Chaugule For MonthRangeSelectTag End*/

// Converts the select elements to the new autocomplete enabled comboboxes.
function convertComboboxes() {
    feba.domManipulator.styleComboboxes(feba.domManipulator.getElement("select[" + Constants.EXCLUDE_JSCOMBO_ATTR + "!='true']"), {
        literals: {
            noItemFound: getMessage("comboBoxNoItemFoundMsg"),
            showAll: getMessage("comboBoxShowAllButton")
        }
    });

    highLightErrorField();
}
/**
 * This function will get update error message locations
 */

function updateErrorMsgLocation(tag, style) {


    //Get parent element for tag
    var taghelpers = jQuery(tag + "." + style);

    // Get error message elements
    feba.domManipulator.each(taghelpers, function() {

        var errorMessageElems = feba.domManipulator.find(feba.domManipulator.getElement(this), ".ERROR_ROW_HIGHLIGHT");
        feba.domManipulator.each(errorMessageElems, moveMessage);
    });
}

/**
 * This function will get the error message and append it to corresponding id
 */

function moveMessage() {

    var childElems = feba.domManipulator.children(feba.domManipulator.getElement(this));
    var firstChildElem = childElems[0];
    // Get id of field in error from ERR_MSG_{id}
    var elemId = firstChildElem.id;
    var fieldId = elemId.replace("ERR_MSG_", "");
    // Get field in error
    var fieldElem = feba.domManipulator.getElementById(fieldId);
    var field = fieldElem[fieldElem.length - 1];
    // Get parents of the field till row ("p")
    var fieldParent = feba.domManipulator.getParentsUntil(field, "p");
    // Append error message to column 2 element
    feba.domManipulator.append(feba.domManipulator.getElement(fieldParent[fieldParent.length - 1]), this.outerHTML);
    // Remove error message from earlier position
    feba.domManipulator.remove(feba.domManipulator.getElement(this));
}
//Added for FEBA Operational Management::START

var index = 0;
var XMLHttpRequestObjects = new Array();
//CREATING MULTIPLE XMLHTTPREQUEST OBJECTS FOR EACH CALL
//THIS WILL HELP NOT TO JAM THE SERVER WITH MULTIPLE REQUESTS AT ONCE.
function getXmlHttpRequest() {
    if (window.XMLHttpRequest) {
        XMLHttpRequestObjects.push(new XMLHttpRequest());
    } else if (window.ActiveXObject) {
        XMLHttpRequestObjects.push(new ActiveXObject("Microsoft.XMLHTTP"));
    }
    index = XMLHttpRequestObjects.length;
}

function cacheExpiryMessage(indexXml, urlElement, xmlContent, urlArrayLen) {
    getXmlHttpRequest();
    if (window.location.href.indexOf("jsessionid") > -1) {
        var jsessionId = window.location.href.indexOf("jsessionid") - 1;
        var question = window.location.href.indexOf("?");
        var sessionIdis = window.location.href.substring(jsessionId, question);
        alert("question is>" + question);

        if (!(urlElement.indexOf("jsessionid") > -1)) {
            urlElement = urlElement + sessionIdis;
        }
    }
    var pgHeading = feba.domManipulator.getElementById(Constants.PAGEHEADING_TAG);
    if (!feba.domManipulator.getElementById("errTable").length) {
        pgHeading.after("<div><center><table id='errTable' style='table-layout:fixed;'></table></center></div>");
    }
    if (XMLHttpRequestObjects[indexXml]) {
        XMLHttpRequestObjects[indexXml].open("POST", urlElement, true);
        //Send the proper header information along with the request
        XMLHttpRequestObjects[indexXml].setRequestHeader('IPTYPE', 'XML');
        XMLHttpRequestObjects[indexXml].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        XMLHttpRequestObjects[indexXml].setRequestHeader("Connection", "Keep-Alive");
        XMLHttpRequestObjects[indexXml].onreadystatechange = function() {
            var host = urlElement.split("://");
            var port = host[1].substring(host[1].lastIndexOf(":") + 1, host[1].indexOf("/"));
            host = host[1].substring(0, host[1].lastIndexOf(":"));
            feba.domManipulator.blockUI({
                message: '<h1><img src="L001/consumer/images/widget-loading.gif"/></h1>',
                baseZ: 9999
            });
            // if response is successful
            if (XMLHttpRequestObjects[indexXml].readyState == 4 && XMLHttpRequestObjects[indexXml].status == 200) {
                var xmlString = XMLHttpRequestObjects[indexXml].responseText;
                var message = '<hd:MESSAGE>';
                var messageArray = xmlString.split(message);
                var len = messageArray.length;
                var messageCode = 'hd:MESSAGE_CODE';
                var messageDesc = 'hd:MESSAGE_DESC';
                for (var l = 1; l < len; l++) {
                    var errCode = getDataFromKeyInXML(messageArray[l], messageCode);
                    var errMsg = getDataFromKeyInXML(messageArray[l], messageDesc);
                    if (errCode === "0000") {
                        var text = "<div role='alert' class='greenbg' aria-live='assertive'> <a href='#' id='errorlink1' title='" + getMessage("CacheInvalidationSuccess") + "'><img src='L001/bankuser/images/information-icon.gif' alt='" + getMessage("OneInformtnMessageTitle") + "' title='" + getMessage("OneInformtnMessageTitle") + "' class='absmiddle'></a>" + getMessage("CacheInvalidationSuccess") + " - " + getMessage("Host") + " : " + host + getMessage("ForPort") + " : " + port + "</div>";
                        paintErrorInTable(text);
                    } else {
                        var text = "<div role='alert' class='redbg' aria-live='assertive'> <a href='#' id='errorlink1' title='" + errMsg + "'><img src='L001/bankuser/images/error-icon.gif  ' alt='" + getMessage("ErrorMessageTitle") + "' title='" + getMessage("ErrorMessageTitle") + "' class='absmiddle'></a><span dir='ltr'>[" + errCode + "] </span>" + errMsg + " - " + getMessage("Host") + " : " + host + getMessage("ForPort") + " : " + port + "</div>";
                        paintErrorInTable(text);
                    }
                }

            } else if ((XMLHttpRequestObjects[indexXml].readyState == 4 && XMLHttpRequestObjects[indexXml].status != 200) || XMLHttpRequestObjects[indexXml].status == 401) {
                var text = "<div role='alert' class='redbg' aria-live='assertive'> <a href='#' id='errorlink1' title='" + getMessage("CacheInvalidationUnSuccess") + "'><img src='L001/bankuser/images/error-icon.gif' alt='" + getMessage("ErrorMessageTitle") + "' title='" + getMessage("ErrorMessageTitle") + "' class='absmiddle'></a>" + getMessage("CacheInvalidationUnSuccess") + " - " + getMessage("Host") + " : " + host + getMessage("ForPort") + " : " + port + "</div>";
                paintErrorInTable(text);
            }
            if (urlArrayLen - 1 == indexXml) {
                feba.domManipulator.unblockUI();
            }
            setTimeout(function() {
                feba.domManipulator.unblockUI();

            }, 1000);
        }
        XMLHttpRequestObjects[indexXml].send(xmlContent);
    }
}

function raiseRequest(currentObj) {
    //var xmlContent = currentObj.content[5][1];
    //var urlArray = currentObj.content[6][1];
    var xmlContent = document.getElementById("xmlContent").value;
    var urlArray = document.getElementById("urlArray").value;
    var individualUrlArray = "";
    individualUrlArray = urlArray.split(",");
    for (var i = 0; i < individualUrlArray.length; i++) {
        var urlElement = individualUrlArray[i];
        var processedUrlElementArray = urlElement.split("|");
        cacheExpiryMessage(i, processedUrlElementArray[0], xmlContent, individualUrlArray.length)
    }
}

//Added for FEBA Operational Management::END
/* function for confirmation for Restore Dashboard button*/
function restore_confirm(fieldId, event) {
    var cookieMap = getCookieMap();
    var langIdValue = cookieMap.get('languageId');
    if (langIdValue == '001') {
        var r = confirm("Are you sure you want to Reset?");
    } else {
        var r = confirm("Voulez-vous vraiment reinitialiser?");
    }
    if (r == true) {
        document.getElementById(fieldId).value = "1";

    } else {
        document.getElementById(fieldId).value = "0";
        event.preventDefault();
    }
}

/* Changes for Password Strength */

/* This function determines the Sign On Password entered by user and invokes function for
determining its strength. */

function chkSignOnPwdStrength(pwdField) {
    var password = feba.domManipulator.getElementById(pwdField).val();
    var indexOfGroupletIdSeparator = pwdField.indexOf(':');
    var groupletId = "null";
    if (parseInt(indexOfGroupletIdSeparator) != -1) {
        var nameVal = pwdField.split(":");
        groupletId = nameVal[0];
    }
    determinePasswordStrength(password, "signOnPwdStrengthImage", "signOnPwdStrengthVal", groupletId);
}

/* This function determines the Transaction Password entered by user and invokes function for
determining its strength. */

function chkTxnPwdStrength(pwdField) {
    var password = feba.domManipulator.getElementById(pwdField).val();
    var indexOfGroupletIdSeparator = pwdField.indexOf(':');
    var groupletId = "null";
    if (parseInt(indexOfGroupletIdSeparator) != -1) {
        var nameVal = pwdField.split(":");
        groupletId = nameVal[0];
    }
    determinePasswordStrength(password, "txnPwdStrengthImage", "txnPwdStrengthVal", groupletId);
}

function determinePasswordStrength(password, strengthImageField, strengthValueField, groupletId) {

    var rule2Strength = 0;
    var strengthForSpclChar = 0;
    var strengthForDigit = 0;
    var imageSrc = "";
    var style = "";
    var pwdStrength = "";
    var tooShortImg = "";
    var weakImage = "";
    var fairImage = "";
    var strongImage = "";
    var veryStrongImage = "";

    /* Fetching PRPM values */

    var minPasswordLength = feba.domManipulator.getElementById("MIN_LENGTH_OF_PASSWORD").val();
    if (groupletId != "null") {
        minPasswordLength = feba.domManipulator.getElementById(groupletId + ":" + "MIN_LENGTH_OF_PASSWORD").val();
    }
    var isSpecialCharReqd = feba.domManipulator.getElementById("PWD_SPECIAL_CHAR_MANDATORY").val();
    if (groupletId != "null") {
        isSpecialCharReqd = feba.domManipulator.getElementById(groupletId + ":" + "PWD_SPECIAL_CHAR_MANDATORY").val();
    }
    var isDigitReqd = feba.domManipulator.getElementById("PWDDIGITMAND").val();
    if (groupletId != "null") {
        isDigitReqd = feba.domManipulator.getElementById(groupletId + ":" + "PWDDIGITMAND").val();
    }
    var strengthsConfigured = feba.domManipulator.getElementById("PASSWORD_STRENGTH").val();
    if (groupletId != "null") {
        strengthsConfigured = feba.domManipulator.getElementById(groupletId + ":" + "PASSWORD_STRENGTH").val();
    }
    var imagePath = feba.domManipulator.getElementById("IMAGE_PATH").val();
    if (groupletId != "null") {
        imagePath = feba.domManipulator.getElementById(groupletId + ":" + "IMAGE_PATH").val();
    }

    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

    /* Setting lengths as per the pre-defined rules*/

    var rule1Length = parseInt(minPasswordLength) + parseInt(2);
    var rule2Length = parseInt(minPasswordLength) + parseInt(4);
    var rule3Length = parseInt(minPasswordLength) + parseInt(5);

    var pwdStrengthArray = strengthsConfigured.split('|');

    if (strengthValueField == "signOnPwdStrengthVal") {
        feba.domManipulator.addText(feba.domManipulator.getElementById('txnPwdStrengthVal'), "");
    } else {
        feba.domManipulator.addText(feba.domManipulator.getElementById('signOnPwdStrengthVal'), "");
    }

    /* Password Strength is "Too short" when its length is zero */

    if (password.length == 0) {
        tooShortImg = imagePath + "/Too-Short.gif";
        imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + tooShortImg + ">";
        style = 'too-short';
        pwdStrength = pwdStrengthArray[0];
        displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);
    }

    /* Password Strength is "Weak" when its length is less than the minimum length configured in PRPM */

    if (password.length > 0 && password.length < rule1Length) {
        weakImage = imagePath + "/Weak.gif";
        imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + weakImage + ">";
        style = 'weak';
        pwdStrength = pwdStrengthArray[1];
        displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);
    }

    /* Password Strength is "Fair" when its length is 2 characters more than the minimum length configured in PRPM */

    if (password.length >= rule1Length && password.length < rule2Length) {
        fairImage = imagePath + "/Fair.gif";
        imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + fairImage + ">";
        style = 'fair';
        pwdStrength = pwdStrengthArray[2];
        displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);

    }

    /* Password Strength is "Strong" when its length is 4 characters more than minimum length and it
       contains atleast 2 special characters */

    if (password.length >= rule2Length && password.length < rule3Length) {
        if (isSpecialCharReqd == "Y") {

            for (var i = 0; i < password.length; i++) {
                if (specialChars.indexOf(password.charAt(i)) != -1) {
                    rule2Strength += 1;

                }
            }
            if (rule2Strength == 2) {
                strongImage = imagePath + "/Strong.gif";
                imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + strongImage + ">";
                style = 'strong';
                pwdStrength = pwdStrengthArray[3];
                displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);
            }
            /* Password Strength is "Fair" if it contains < 2  special characters though password length is
               4 characters more than minimum length  */
            else if (rule2Strength < 2) {
                fairImage = imagePath + "/Fair.gif";
                imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + fairImage + ">";
                style = 'fair';
                pwdStrength = pwdStrengthArray[2];
                displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);
            }
        }
    }

    /* Password Strength is "Very Strong" when its length is 5 characters more than minimum length,it
       contains atleast 2 special characters and atleast 1 digit */

    if (password.length >= rule3Length) {

        if (isSpecialCharReqd == "Y") {
            for (var i = 0; i < password.length; i++) {
                if (specialChars.indexOf(password.charAt(i)) != -1) {
                    strengthForSpclChar += 1;
                }
            }
        }
        if (isDigitReqd == "Y") {
            if (password.match(/([0-9])/)) {
                strengthForDigit += 1;
            }
        }

        if (strengthForSpclChar >= 2) {
            if (strengthForDigit < 1) {
                strongImage = imagePath + "/Strong.gif";
                imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + strongImage + ">";
                style = 'strong';
                pwdStrength = pwdStrengthArray[3];
                displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);
            } else if (strengthForDigit >= 1) {
                veryStrongImage = imagePath + "/Very-Strong.gif";
                imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + veryStrongImage + ">";
                style = 'very-strong';
                pwdStrength = pwdStrengthArray[4];
                displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);
            }
        }

        /* Password Strength is "Fair" if it contains < 2  special characters though password length is
                  5 characters more than minimum length and it contains more than 1 digit */
        else if (strengthForSpclChar < 2) {
            fairImage = imagePath + "/Fair.gif";
            imageSrc = "<img class=\"absmiddle\" id=\"imageStrength\" src=" + fairImage + ">";
            style = 'fair';
            pwdStrength = pwdStrengthArray[2];
            displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId);
        }
    }

}

/* This method is used for dynamically removing/adding(appending) the strength images and strength values */

function displayPasswordStrength(imageSrc, style, pwdStrength, password, strengthImageField, strengthValueField, groupletId) {

    feba.domManipulator.getElementById('imageStrength').remove();
    if (groupletId != "null") {
        feba.domManipulator.append(feba.domManipulator.getElementById(groupletId + ":" + strengthImageField), imageSrc);
    } else {
        feba.domManipulator.append(feba.domManipulator.getElementById(strengthImageField), imageSrc);
    }
    if (groupletId != "null") {
        feba.domManipulator.removeStrengthClass(feba.domManipulator.getElementById(groupletId + ":" + strengthValueField));
    } else {
        feba.domManipulator.removeStrengthClass(feba.domManipulator.getElementById(strengthValueField));
    }
    if (groupletId != "null") {
        feba.domManipulator.addClass(feba.domManipulator.getElementById(groupletId + ":" + strengthValueField), style);
    } else {
        feba.domManipulator.addClass(feba.domManipulator.getElementById(strengthValueField), style);
    }
    if (groupletId != "null") {
        feba.domManipulator.addText(feba.domManipulator.getElementById(groupletId + ":" + strengthValueField), pwdStrength);
    } else {
        feba.domManipulator.addText(feba.domManipulator.getElementById(strengthValueField), pwdStrength);
    }

}

/* Added for 1106 Average Quarterly & monthly balance :: START */
function defaultMonthSelection() {
    var elementId = this.options.target.split("=")[0],
        element = LIB.__GET_DOM__(elementId),
        size = element.length;

    //Current Year selected & current month is not Dec
    if ((size != 12) && (size < 12)) {
        element.selectedIndex = size - 1;
    }
    //Current Year selected & current month is Dec
    else if (size == 13) {
        element.length = size - 1;
        element.selectedIndex = size - 2;
    }
}

function defaultQuarterSelection() {

    var elementId = this.options.target.split("=")[0],
        element = LIB.__GET_DOM__(elementId),
        size = element.length;

    //Current Year selected & current month is not in last quarter
    if ((size != 4) && (size < 4)) {
        element.selectedIndex = size - 1;
    }
    //Current Year selected & current month is in last quarter
    else if (size == 5) {
        element.length = size - 1;
        element.selectedIndex = size - 2;
    }
}
/* Added for 1106 Average Quarterly & monthly balance :: END */

// Addded by shreya_sontakke for triggering button click on change of customer id value from dropdown in header
/*
 * This map is used to store the event names which will be invoked on
 * change of value in dropdowns in Ebux-3 header
 */
var headerComboEventsMap = {
    "CUST_ID_SELECT": "FILTER_CUST_ID_ACCOUNTS",
    "DashboardFG.CUST_ID_SELECT": "FILTER_CUST_ID_ACCOUNTS",
    "DashboardAutoAlignFG.CUST_ID_SELECT": "FILTER_CUST_ID_ACCOUNTS",
    "SELECTED_CUST_ID__": "CUST_ID_CHANGE_EVENT__",
    "DIV_ID_SELECT": "FILTER_DIV_ID_ACCOUNTS",
    "DashboardFG.DIV_ID_SELECT": "FILTER_DIV_ID_ACCOUNTS",
    "DashboardAutoAlignFG.DIV_ID_SELECT": "FILTER_DIV_ID_ACCOUNTS",
    "SELECTED_DIV_ID__": "DIV_ID_CHANGE_EVENT__",
    "SELECTED_CTX_ID__": "SWITCH_CONTEXTS_",
    "SSO_APP_ID__": "SSO_APP_SWITCH_",
    "_SKIN_CHANGE_": "_SKIN_CHANGE_EVENT_",
    "TIME_ZONE__": "TIMEZONE_EVENT__",
    //Added for Ticket-id: 696076.
    "DashboardFG._SKIN_CHANGE_": "_SKIN_CHANGE_EVENT_",
    "DashboardAutoAlignFG._SKIN_CHANGE_": "_SKIN_CHANGE_EVENT_",
    //Added for Ticket-id : 696251
    "DashboardFG.SELECTED_CTX_ID__": "SWITCH_CONTEXTS_",
    "DashboardAutoAlignFG.SELECTED_CTX_ID__": "SWITCH_CONTEXTS_",
    "DashboardFG.TIME_ZONE__": "TIMEZONE_EVENT__",
    "DashboardAutoAlignFG.TIME_ZONE__": "TIMEZONE_EVENT__"

};
/*
 * This function is used invoke actions on
 * change of value in dropdowns in Ebux-3 header
 */
function callheaderComboEvent(element) {
    var domMan = feba.domManipulator;
    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var elementId = domMan.getAttribute(element, "id");
    // Fectching the event name from Events map headerComboEventsMap
    var headerComboEvent;
    if (fgName == "DashboardFG" || fgName == "DashboardAutoAlignFG") {
        headerComboEvent = domMan.getElementById(headerComboEventsMap[elementId]);
    } else {
        headerComboEvent = domMan.getElementById(headerComboEventsMap[elementId.replace(fgName + ".", "")]);
    }
    // This tiggers the selected event from map headerComboEventsMap
    //domMan.trigger(headerComboEvent,"click");

    // Added to display a prompt to user in case user changes cust id/div id.



    if (fgName == "DashboardFG" || fgName == "DashboardAutoAlignFG") {

        var dashMapValue = headerComboEventsMap[elementId];

        if (dashMapValue == "FILTER_CUST_ID_ACCOUNTS" || dashMapValue == "FILTER_DIV_ID_ACCOUNTS") {
            var retVal1 = confirm(getMessage("headerEventMessage"));
            if (retVal1 == true) {
                domMan.trigger(headerComboEvent, "click");
                return true;
            } else {
                setTimeout(function() {
                    try {
                        jQuery("[id$='CUST_ID_SELECT'] option")[dashCustIDIndex].selected = true;
                        jQuery("[id$='CUST_ID_SELECT']").febaCombobox("update");
                        jQuery("[id$='DIV_ID_SELECT'] option")[dashDivIDIndex].selected = true;
                        jQuery("[id$='DIV_ID_SELECT']").febaCombobox("update");
                    } catch (e) {
                        dashDivIDIndex = 0;
                        dashCustIDIndex = 0;
                    }
                    //return false;
                }, 500);
            }
        } else {
            domMan.trigger(headerComboEvent, "click");
        }

    } else {
        var mapValue = headerComboEventsMap[elementId.replace(fgName + ".", "")];

        if (mapValue == "CUST_ID_CHANGE_EVENT__" || mapValue == "DIV_ID_CHANGE_EVENT__") {
            var retVal = confirm(getMessage("headerEventMessage"));
            if (retVal == true) {
                domMan.trigger(headerComboEvent, "click");
                return true;
            } else {
                setTimeout(function() {
                    try {
                        jQuery("[id$='SELECTED_CUST_ID__'] option")[custIDIndex].selected = true;
                        jQuery("[id$='SELECTED_CUST_ID__']").febaCombobox("update");
                        jQuery("[id$='SELECTED_DIV_ID__'] option")[divIDIndex].selected = true;
                        jQuery("[id$='SELECTED_DIV_ID__']").febaCombobox("update");
                    } catch (e) {
                        divIDIndex = 0;
                        custIDIndex = 0;
                    }
                    //return false;
                }, 500);
            }
        } else {
            domMan.trigger(headerComboEvent, "click");
        }
    }
}
// Added by shreya_sontakke to toggle the display of pulldown in header
/*
 * This function is used to show-hide pulldowns
 * (font change and my profile pulldown) in Ebux-3 header
 */
function headerToggleEvent(linkElement, fontFlag) {
    var domMan = feba.domManipulator;
    var parent = domMan.parents(linkElement, ".headerRowset");
    var pulldownEle = domMan.siblings(parent);
    var child1 = domMan.getChildren(domMan.children(parent), ":first");
    var child2 = domMan.getChildren(domMan.children(parent), ":last");
    var isVisible = pulldownEle.is(":visible");
    var labelEle = domMan.children(domMan.children(child1));
    var arrowImgEle = domMan.children(domMan.children(child2));

    // Logic for hiding the pulldown
    if (isVisible) {
        pulldownEle.slideUp(function() {
            domMan.removeClass(child1, "pulldownSelectLeft");
            domMan.removeClass(child2, "pulldownSelectRight");
            domMan.addClass(child1, "pulldownUnSelectLeft");
            domMan.addClass(child2, "pulldownUnSelectRight");
            if (fontFlag) {
                domMan.removeClass(labelEle, "rightTextBlackBold");
                domMan.removeClass(arrowImgEle, "blackArrowImg");
                domMan.addClass(labelEle, "rightTextBold");
                domMan.addClass(arrowImgEle, "whiteArrowImg");
            }
        });
    } else {
        // Logic for showing the pulldown
        domMan.removeClass(child1, "pulldownUnSelectLeft");
        domMan.removeClass(child2, "pulldownUnSelectRight");
        domMan.addClass(child1, "pulldownSelectLeft");
        domMan.addClass(child2, "pulldownSelectRight");
        if (fontFlag) {
            domMan.removeClass(labelEle, "rightTextBold");
            domMan.removeClass(arrowImgEle, "whiteArrowImg");
            domMan.addClass(labelEle, "rightTextBlackBold");
            domMan.addClass(arrowImgEle, "blackArrowImg");
        }
        pulldownEle.slideDown();
        // Logic for hiding the pulldown when clicked anywhere on the page outside the pulldown
        var toggleBack = function(config, event) {

            if (parent.parent().has(event.target).length === 0 && event.target.id != "TIMEZONE_EVENT__" &&
                !domMan.isMatching(event.target, ".ui-widget li.ui-menu-item a")) {
                console.log(event);
                pulldownEle.slideUp(function() {
                    domMan.removeClass(child1, "pulldownSelectLeft");
                    domMan.removeClass(child2, "pulldownSelectRight");
                    domMan.addClass(child1, "pulldownUnSelectLeft");
                    domMan.addClass(child2, "pulldownUnSelectRight");
                    if (fontFlag) {
                        domMan.removeClass(labelEle, "rightTextBlackBold");
                        domMan.removeClass(arrowImgEle, "blackArrowImg");
                        domMan.addClass(labelEle, "rightTextBold");
                        domMan.addClass(arrowImgEle, "whiteArrowImg");
                    }
                });
                feba.js.common.documentClickWatcher.deregister(linkElement);
            }
        }

        feba.js.common.documentClickWatcher.register(linkElement, {
            callBack: toggleBack
        });
    }
}
//Added by shreya_sontakke to toggle the display of skin pulldown in header
/*
 * This function is used to show-hide skin change pulldown in Ebux-3 header
 */
function skinPulldownToggleEvent(linkElement) {
    var domMan = feba.domManipulator;
    var parent = domMan.children(domMan.parents(linkElement, ".headerRow"));
    var pulldownEle = domMan.getChildren(parent, ":last");
    var child1 = domMan.getChildren(parent, ":first");
    var child2 = domMan.getChildren(parent, ":eq(1)");;
    var isVisible = pulldownEle.is(":visible");
    var labelEle = domMan.getChildren(domMan.children(child1), ":last");
    var arrowImgEle = domMan.children(domMan.children(child2));

    if (isVisible) {
        // Logic for hiding the pulldown
        pulldownEle.slideUp(function() {
            domMan.removeClass(child1, "skinSelectLeft");
            domMan.removeClass(child2, "skinSelectRight");
            domMan.addClass(child1, "skinUnSelectLeft");
            domMan.addClass(child2, "skinUnSelectRight");
            domMan.removeClass(labelEle, "rightTextBlack");
            domMan.removeClass(arrowImgEle, "blackArrowImg");
            domMan.addClass(labelEle, "rightTextWhite");
            domMan.addClass(arrowImgEle, "whiteArrowImg");
        });
    } else {
        // Logic for showing the pulldown
        domMan.removeClass(child1, "skinUnSelectLeft");
        domMan.removeClass(child2, "skinUnSelectRight");
        domMan.addClass(child1, "skinSelectLeft");
        domMan.addClass(child2, "skinSelectRight");
        domMan.removeClass(labelEle, "rightTextWhite");
        domMan.removeClass(arrowImgEle, "whiteArrowImg");
        domMan.addClass(labelEle, "rightTextBlack");
        domMan.addClass(arrowImgEle, "blackArrowImg");
        pulldownEle.slideDown();
        // Logic for hiding the pulldown when clicked anywhere on the page outside the pulldown
        var toggleBack = function(config, event) {
            if (parent.parent().has(event.target).length === 0 && event.target.id != "_SKIN_CHANGE_EVENT_") {
                pulldownEle.slideUp(function() {
                    domMan.removeClass(child1, "skinSelectLeft");
                    domMan.removeClass(child2, "skinSelectRight");
                    domMan.addClass(child1, "skinUnSelectLeft");
                    domMan.addClass(child2, "skinUnSelectRight");
                    domMan.removeClass(labelEle, "rightTextBlack");
                    domMan.removeClass(arrowImgEle, "blackArrowImg");
                    domMan.addClass(labelEle, "rightTextWhite");
                    domMan.addClass(arrowImgEle, "whiteArrowImg");
                });
                feba.js.common.documentClickWatcher.deregister(linkElement);
            }
        }

        feba.js.common.documentClickWatcher.register(linkElement, {
            callBack: toggleBack
        });
    }
}
// Added by shreya_sontakke for triggering skin change event
/*
 * This function is used to trigger skin change event
 * on click of skin/theme icon in skin pulldown in Ebux-3 header
 */
function callSkinChangeEvent(element) {
    var domMan = feba.domManipulator
    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var elementId = fgName + "._SKIN_CHANGE_";
    var inputEle = domMan.getElementById(elementId);
    var selectedEleValue = domMan.getAttribute(element, "data-value");
    domMan.val(inputEle, selectedEleValue);
    callheaderComboEvent(inputEle);
}


//Added by Siddhesh_Chaugule for Group Accounts UX3 Page
function selectActionForGroup(field, groupletid) {
    var groupletIdentifier = "";
    if (groupletid && groupletid != "NULL") {
        groupletIdentifier = groupletid + ":";

    }

    var localDM = feba.domManipulator;
    var selectedID = localDM.getAttribute(field, "id");
    var selectedvalue = field.options[field.selectedIndex].value;
    if (selectedvalue != "MANAGEGROUP") {
        document.getElementById("AccountSummaryFG.GROUP_ACTION_MODE").value = selectedvalue;
        var selectedindex = selectedID.substring(48);
        document.getElementById("AccountSummaryFG.TABLE_CLICK_INDEX").value = selectedindex;
        var newButton = localDM.getElementById(groupletIdentifier + "Button27469616");
        localDM.trigger(newButton, "click");
    }
}


/*Added by Neeti for GoalLinkAccounts Screen under PFM
 function goalLinkRadio(element){
 if(element==1) {
		document.getElementById("reqNewBtn").disabled= true;
		document.getElementById("reqNewBtn").className = "formbtn_finaceovervw";
		document.getElementById("reqNewBtn").parentNode.className ="HW_formbtn_lnkaccnt";
		document.getElementById("GoalAccountLinkFG.ACCOUNT_NUMBER").disabled= false;
		//document.getElementById("GoalAccountLinkFG.GEN_ACCOUNT_ID").disabled = true;
	}
 if(element==2) {
 		document.getElementById("GoalAccountLinkFG.ACCOUNT_NUMBER").disabled= true;
		document.getElementById("reqNewBtn").disabled = false;
		document.getElementById("reqNewBtn").className = "formbtn";
		document.getElementById("reqNewBtn").parentNode.className ="HW_formbtn";
		//document.getElementById("GoalAccountLinkFG.GEN_ACCOUNT_ID").disabled = false;
	}
 }
 */

function showHidePriceValue(sel, groupletId) {
    var bidType = sel.options[sel.selectedIndex].value;
    var counter = 0;
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var bidPerIpo = document.getElementById("BidsPerIpo").value;
        if (bidType == "CUTV") {
            while (counter < bidPerIpo) {
                var bidTypeId = document.getElementById("IPOManagementFG.BID_PRICE_TYPE_ARRAY[" + counter + "]");
                if (bidTypeId != null) {
                    if (bidTypeId.id == sel.id) {
                        document.getElementById("IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").value = feba.domManipulator.getElementById("HREF_IPOManagementFG.CUT_OFF_PRICE")[0].innerHTML;
                        document.getElementById("IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").disabled = true;
                    }
                }
                counter = counter + 1;
            }
        } else if (bidType == "BIDV" || bidType == "") {
            while (counter < bidPerIpo) {
                var bidTypeId = document.getElementById("IPOManagementFG.BID_PRICE_TYPE_ARRAY[" + counter + "]");
                if (bidTypeId != null) {
                    if (bidTypeId.id == sel.id) {
                        document.getElementById("IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").value = "";
                        document.getElementById("IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").disabled = false;
                    }
                }
                counter = counter + 1;
            }
        }
    } else {
        //var bidPerIpo= document.getElementById(groupletId+":"+"BidsPerIpo").value;
        var bidPerIpo = document.getElementById("BidsPerIpo").value;
        if (bidType == "CUTV") {
            while (counter < bidPerIpo) {
                var bidTypeId = document.getElementById(groupletId + ":" + "IPOManagementFG.BID_PRICE_TYPE_ARRAY[" + counter + "]");
                if (bidTypeId != null) {
                    if (bidTypeId.id == sel.id) {
                        document.getElementById(groupletId + ":" + "IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").value = feba.domManipulator.getElementById(groupletId + ":" + "HREF_IPOManagementFG.CUT_OFF_PRICE")[0].innerHTML;
                        document.getElementById(groupletId + ":" + "IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").readOnly = true;
                    }
                }
                counter = counter + 1;
            }
        } else if (bidType == "BIDV" || bidType == "") {
            while (counter < bidPerIpo) {
                var bidTypeId = document.getElementById(groupletId + ":" + "IPOManagementFG.BID_PRICE_TYPE_ARRAY[" + counter + "]");
                if (bidTypeId != null) {
                    if (bidTypeId.id == sel.id) {
                        document.getElementById(groupletId + ":" + "IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").value = "";
                        document.getElementById(groupletId + ":" + "IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]").disabled = false;
                    }
                }
                counter = counter + 1;
            }
        }
    }
}

/*Added for Change Overdraft Settings: START */
function passOverdraftStatusValue(sel, groupletId) {
    var grouplet = groupletId;
    var start = 75;
    var end = sel.id.indexOf("]");
    var index = sel.id.substring(start, end);
    var checked1 = sel.checked;
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var checked2 = document.getElementById("FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked;
        if (checked2 == false) {
            document.getElementById("FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = true;
        } else {
            document.getElementById("FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = false;
        }
    } else {
        var checked2 = document.getElementById(grouplet + ":FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked;
        if (checked2 == false) {
            document.getElementById(grouplet + ":FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = true;
        } else {
            document.getElementById(grouplet + ":FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = false;
        }
    }
}
/*Added for Change Overdraft Settings: END */
function passOverdraftStatusValuetonclick(ElementId, groupletId) {
    var sel = document.getElementById(ElementId);
    var grouplet = groupletId;
    var cookieMap = getCookieMap();
    var userTypeValue = cookieMap.get('userType');
    //if (userTypeValue==2){
    //var start = 75;
    //}else if (userTypeValue==1){
    //var start = 74;
    //}
    var start = sel.id.indexOf("[");
    var end = sel.id.indexOf("]");
    var index = sel.id.substring(start + 1, end);
    var checked1 = sel.checked;
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var checked2 = document.getElementById("FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked;
        if (checked2 == false) {
            document.getElementById("FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = true;
        } else {
            document.getElementById("FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = false;
        }
    } else {
        var checked2 = document.getElementById(grouplet + ":FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked;
        if (checked2 == false) {
            document.getElementById(grouplet + ":FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = true;
        } else {
            document.getElementById(grouplet + ":FormManagementFG.SELECTED_ENTRY_ARRAY[" + index + "]").checked = false;
        }
    }
}

/* function for IPO Management used to disable the textboxes based upon value selected in dropdown*/



function disableField(source, target1, target2, target3, value, prop) {
    /*
    var property = prop.split(Constants.PARAMETERS_SEPERATOR)[0];
    var pValue = prop.split(Constants.PARAMETERS_SEPERATOR)[1];

    feba.domManipulator.setAttribute(feba.domManipulator.getElementById(target1),property,pValue);
    feba.domManipulator.setAttribute(feba.domManipulator.getElementById(target2),property,pValue);
    feba.domManipulator.setAttribute(feba.domManipulator.getElementById(target3),property,pValue);



     if(feba.domManipulator.getElementById(source).val()== "NSDL"){
     feba.domManipulator.getElementById(target1).removeAttr(property);
     feba.domManipulator.getElementById(target2).removeAttr(property);

    }
    else if(feba.domManipulator.getElementById(source).val()== "CDSL"){
    feba.domManipulator.getElementById(target3).removeAttr(property);

    }
    else if(feba.domManipulator.getElementById(source).val()== ""){
    feba.domManipulator.getElementById(target1).removeAttr(property);
    feba.domManipulator.getElementById(target2).removeAttr(property);
    feba.domManipulator.getElementById(target3).removeAttr(property);

    }*/

    //rakesh
    var depName = jQuery("[id$='CorpAdminFWFG.DEPOSITORY_CODE']").val();
    if (depName == "NSDL") {
        jQuery("[id$='InputForm1.Ra2']").show();
        jQuery("[id$='InputForm1.Ra3']").show();
        jQuery("[id$='InputForm1.Ra4']").hide();
    } else if (depName == "CDSL") {
        jQuery("[id$='InputForm1.Ra2']").hide();
        jQuery("[id$='InputForm1.Ra3']").hide();
        jQuery("[id$='InputForm1.Ra4']").show();
    } else if (depName == "") {
        jQuery("[id$='InputForm1.Ra2']").show();
        jQuery("[id$='InputForm1.Ra3']").show();
        jQuery("[id$='InputForm1.Ra4']").show();
    }

}
// function to add rows and columns in errTable. It will paint only two columns
function paintErrorInTable(text) {
    var rowElement = jQuery('[isColumnEmpty]');
    if (rowElement.length) {
        rowElement.append(text);
        rowElement.removeAttr('isColumnEmpty');
    } else {
        feba.domManipulator.getElementById('errTable').append('<tr><td style="padding-bottom: 2px;width:50%">' + text + '</td><td isColumnEmpty="true" style="padding-left: 10px;padding-bottom: 2px;width:50%"></td></tr>');
    }
}
// function to get value based on key in xml string
function getDataFromKeyInXML(xmlString, key) {
    var x = xmlString.split("</" + key);
    y = x[0].split(key + ">");
    return y[1];
}

/* Function added to call a common event on click of a Radio button
in in the Rules List of ApproversDetailsTagHelper. This inturn calls
a Common Event to refresh the lookups. */
function displayLookUpsBasedOnRule(target, groupletId) {
    var clickedElem = jQuery(target);
    if (clickedElem != null) {
        clickedElem.attr('checked', 'true');
    }
    var localDM = feba.domManipulator;
    localDM.getElement(localDM.getGroupletSpecificElement("SELECT_NEXT_USER_EVENT", groupletId)).trigger('click');
}
// To remove the previous errors on screen
function removePreviousError(riaFeatureID, groupletId, source, errorHighlightLocation, errorMsgLoaction) {
    // get the paragraph which has the error element
    var parentP = getParentByTagName(document.getElementById(source), 'P');
    // remove error style and message for source(if any) added by normal page reload
    //chk for riaFeatureID and the oher 2 parameters for your scenarios.

    if (typeof errorHighlightLocation != 'undefined' || typeof errorHighlightLocation != "undefined") {

        removeErrorStyle(parentP, errorHighlightLocation, riaFeatureID);
    }
    removeErrorMsg(parentP, errorMsgLoaction);
    var localDM = feba.domManipulator;
    //removing previous error messages
    localDM.getElement(localDM.getGroupletSpecificElement(Constants.ERRORDISPLAY_TAG + "_" + riaFeatureID, groupletId)).html("");
    // removing error class for all error elements that are painted by RIA for error highlighting property ROW and LABEL
    var localDM = feba.domManipulator;
    var errElem = localDM.find(localDM.getElement(document), '[id^=ERROR_ROW_' + riaFeatureID + '_]');
    errElem.each(function() {
        var paragraph = localDM.getElement(getParentByTagName(this, 'P'));
        /* Added by Harris for error highliting based on span*/
        var span = localDM.getElement(getParentByTagName(this, 'span'));

        localDM.removeClass(paragraph, Constants.ERROR_ROW_HIGHLIGHT_CLASS);
        localDM.setAttribute(localDM.find(paragraph, '.' + Constants.ERROR_HIGHLIGHT_CLASS), 'class', Constants.GENERAL_CLASS);
    });
    localDM.remove(errElem);
}
/*
 * Method to display the error message on side of formfield
 * part of method definition taken from displayError method
 */
function messageDisplaySide(error, id, msgDisplay, riaFeatureID, groupletId) {
    var localDM = feba.domManipulator;
    if (typeof(id) == "object") {
        id = id[0];
    }
    var errorSpan = document.getElementById("ERROR_ROW_" + riaFeatureID + "_" + id);
    if (errorSpan == null) {
        errorSpan = document.createElement('span');
    } else {
        errorSpan.innerHTML = "";
    }
    var elem = localDM.getGroupletSpecificElement(id, groupletId);
    //If the field in error is inside a table, then
    //highlight the border of field's outer span
    //and add pop-up bubble mouse events to it
    var tableElem = localDM.getClosestElement(localDM.getElement(elem), 'table');
    var tableElemStyle = localDM.getAttribute(tableElem, 'class');
    //to check if the table belongs to the portal theme
    //then we can ignore that particular table
    if (tableElemStyle == 'layoutColumn') {
        tableElem = null;
    }
    if (tableElem != null && tableElem.html() != null) {
        var elems = localDM.getElement(elem).parentsUntil("td");
        var nLevelSpan = elems[elems.length - 1];
        if (!localDM.getElement(nLevelSpan).hasClass('ERROR_FIELD_BORDER_TYPESYS')) {
            //If this field was corrected after business exception, remove that class(CORRECTED_ERROR_FIELD_BORDER) now
            if (localDM.getElement(nLevelSpan).hasClass('CORRECTED_ERROR_FIELD_BORDER')) {
                localDM.removeClass(localDM.getElement(nLevelSpan), 'CORRECTED_ERROR_FIELD_BORDER');
            }
            localDM.addClass(localDM.getElement(nLevelSpan), "ERROR_FIELD_BORDER_TYPESYS");
            showBubble("ERROR_FIELD_BORDER_TYPESYS", error);
        }
    } else {
        var elems = localDM.getElement(elem).parentsUntil("p");
        var nLevelSpan = elems[elems.length - 1];
        if (nLevelSpan.id == null || nLevelSpan.id == "") {
            var elems = localDM.getElement(elem).parentsUntil("div");
            var nLevelSpan = elems[elems.length - 1];
        }
        // add error message to the span
        errorSpan.id = "ERR_MSG_SPAN_" + id;
        errorSpan.className = "simpletext";
        localDM.addText(localDM.getElement(errorSpan), error);

        //Forms the span for row and append it as the
        //last children to parent span(To work in case of composite components)
        var parentErrorSpan = document.createElement('span');
        parentErrorSpan.id = "ERROR_ROW_" + riaFeatureID + "_" + id;
        parentErrorSpan.className = "ERROR_ROW_HIGHLIGHT";
        localDM.addText(localDM.getElement(parentErrorSpan), errorSpan);

        //Added random number for error filed in order to not to violate the unique id standards
        var number = 1 + Math.floor(Math.random() * 600);
        var hiddenField = "<input type=hidden id=\"ERROR_ROW_" + number + "\" value=\"ROW\">";
        localDM.append(localDM.getElement(parentErrorSpan), hiddenField);
        // add span to the row
        localDM.append(localDM.getElement(nLevelSpan), parentErrorSpan);
    }
}
// remove style for a particular element
function removeErrorStyle(parentP, errorHighlightLocation, riaFeatureID) {
    var localDM = feba.domManipulator;
    if (parentP != null && (errorHighlightLocation == 'ROW' || hasClass(parentP, Constants.ERROR_ROW_HIGHLIGHT_CLASS))) {
        var reg = new RegExp('(\\s|^)' + Constants.ERROR_ROW_HIGHLIGHT_CLASS + '(\\s|$)');
        parentP.className = parentP.className.replace(reg, ' ');
    } else {
        // get the error label element from the paragraph
        var element = localDM.find(localDM.getElement(parentP), "." + Constants.ERROR_HIGHLIGHT_CLASS);
        // add an attribute data-isLabel to the label element. This is useful when the
        // page gets reloaded with error(when page is reloaded with error, label will be painted as span)
        localDM.setAttribute(element, "data-errorLabel", riaFeatureID);
        // remove the error class
        localDM.removeClass(element, Constants.ERROR_HIGHLIGHT_CLASS);
        localDM.addClass(element, Constants.GENERAL_CLASS);
    }
}

function removeErrorMsg(parentP, errorMsgLoaction) {
    var localDM = feba.domManipulator;
    //removing the error span
    var remElem = localDM.find(localDM.getElement(parentP), "[id^=ERR_MSG]").parent();
    if (!remElem.length) {
        remElem = localDM.find(localDM.getElement(parentP), "[id^=ERROR_ROW]");
    }
    localDM.remove(remElem);
}

//Start: Added for UX3
function toggleErrorMessage(element) {

    var erroDisplayDiv = feba.domManipulator.getElement(element).first().parents('#MessageDisplay_TABLE');
    if (erroDisplayDiv && erroDisplayDiv.length == 0) {
        var groupletElementId = jQuery(element).attr('id').split(":")[0];
        erroDisplayDiv = jQuery('#' + groupletElementId).find('.widgetErrorDisplayHw');

    }
    var childrenElement = feba.domManipulator.getElement(erroDisplayDiv).find('.hideElement');
    var messageChildrenAnchor = feba.domManipulator.getElement(erroDisplayDiv).find('#errorlink1');
    var messageChildrenSpan = jQuery(messageChildrenAnchor).parent().children('span');
    //jQuery(messageChildrenAnchor).hide();
    jQuery(messageChildrenSpan).hide();
    var currentWidgetWidth = feba.domManipulator.getElement(erroDisplayDiv).closest('.widget-content').width();
    console.log("currentTestWidgetWidth" + currentWidgetWidth);
    if (currentWidgetWidth == null || (currentWidgetWidth != null && (currentWidgetWidth.length == 0 || currentWidgetWidth == "undefined"))) {
        currentWidgetWidth = feba.domManipulator.getElement(erroDisplayDiv).closest('.widget-body').width();
    }
    if (currentWidgetWidth == null) {
        currentWidgetWidth = feba.domManipulator.getElement(erroDisplayDiv).parent().find('.widget-body').width();
    }

    jQuery(erroDisplayDiv).css('width', currentWidgetWidth);
    if (feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').attr('data-role') && feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').attr('data-role') == 'down') {
        feba.domManipulator.getElement(childrenElement).slideDown(1000);
        feba.domManipulator.getElement(erroDisplayDiv).find('.errorContentWrapper').css('max-height', 'none');
        if (feba.domManipulator.getElement(erroDisplayDiv).find('.errorContentWrapper').length == 0) {
            jQuery(erroDisplayDiv).find("div[class*='errorContentWrapper']").css('max-height', 'none');
        }


        if ((feba.domManipulator.getElement(erroDisplayDiv).find('.errordisplaypulldown').attr('data-messagemode')) === ("single")) {
            feba.domManipulator.getElement(erroDisplayDiv).find('.positionabsolute').css('overflow', 'visible');
            if (feba.domManipulator.getElement(erroDisplayDiv).find('.positionabsolute').length == 0) {
                jQuery(erroDisplayDiv).find("div[class*='positionabsolute']").css('overflow', 'visible');
            }
            feba.domManipulator.getElement(erroDisplayDiv).find('.positionrelative').css('overflow', 'visible');
            if (feba.domManipulator.getElement(erroDisplayDiv).find('.positionrelative').length == 0) {
                jQuery(erroDisplayDiv).find("div[class*='positionrelative']").css('overflow', 'visible');
            }
        }
        feba.domManipulator.getElement(erroDisplayDiv).find('.errorDisplayDiv').hide();
        feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').attr('data-role', 'up');
        feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').find('.arrowtoggle').attr('src', imagePath + '/db_icons_info_bar_arow_up.png');
        feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').find('.arrowtoggle').attr('title', 'Click to view less');
        //feba.domManipulator.getElement(erroDisplayDiv).find('.ui-combobox-input').parent().hide();
        feba.domManipulator.getElement(element).first().parents('#MessageDisplay_TABLE').find('#wrapperError').css('z-index', '3');
    } else {
        feba.domManipulator.getElement(childrenElement).slideUp(1000);
        feba.domManipulator.getElement(erroDisplayDiv).find('.errorContentWrapper').css('max-height', '15px');
        if (feba.domManipulator.getElement(erroDisplayDiv).find('.errorContentWrapper').length == 0) {
            jQuery(erroDisplayDiv).find("div[class*='errorContentWrapper']").css('max-height', '15px');
        }

        //feba.domManipulator.getElement(erroDisplayDiv).find('.ui-combobox-input').parent().show();
        feba.domManipulator.getElement(element).first().parents('#MessageDisplay_TABLE').find('#wrapperError').css('z-index', '1');
        if ((feba.domManipulator.getElement(erroDisplayDiv).find('.errordisplaypulldown').attr('data-messagemode')) === ("single")) {
            feba.domManipulator.getElement(erroDisplayDiv).find('.positionabsolute').css('overflow', 'hidden');
            feba.domManipulator.getElement(erroDisplayDiv).find('.positionrelative').css('overflow', 'hidden');
        }
        feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').attr('data-role', 'down');
        feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').find('.arrowtoggle').attr('src', imagePath + '/db_icons_info_bar_arow_down.png');
        feba.domManipulator.getElement(element).first().parents('.errordisplaypulldown').find('.arrowtoggle').attr('title', 'Click to view more');
    }
}

function closeErrorMessage(element) {
    var erroDisplayDiv = feba.domManipulator.getElement(element).first().parents('#MessageDisplay_TABLE');
    if (erroDisplayDiv && erroDisplayDiv.length == 0) {
        var groupletElementId = jQuery(element).attr('id').split(":")[0];
        erroDisplayDiv = jQuery('#' + groupletElementId).find('.widgetErrorDisplayHw');

    }
    feba.domManipulator.getElement(erroDisplayDiv).hide();
    feba.domManipulator.getElement(erroDisplayDiv).removeClass('widgetErrorDisplayHw');
    feba.domManipulator.getElement('.ui-combobox-input').parent().show();
}

function handleErrorOnLoad(element) {

    if (element != null && element != "" && element != "undefined" && element != "null") {
        var erroDisplayDiv = feba.domManipulator.getElement('#' + element).find('.widgetErrorDisplayHw');
        if (erroDisplayDiv && erroDisplayDiv.length == 0) {
            erroDisplayDiv = feba.domManipulator.getElement('#ParentDiv_' + element).find('.widgetErrorDisplayHw');
        }

        //Ravi
        if (erroDisplayDiv && erroDisplayDiv.length == 0) {
            erroDisplayDiv = jQuery('#' + element).find("div[class*='widgetErrorDisplayHw']")
        }
        //RAvi





        var currentWidgetWidth = feba.domManipulator.getElement(erroDisplayDiv).closest('.widget-content').width();
        console.log("currentTestWidgetWidth" + currentWidgetWidth);

        if (currentWidgetWidth == null || (currentWidgetWidth != null && (currentWidgetWidth.length == 0 || currentWidgetWidth == "undefined"))) {
            currentWidgetWidth = feba.domManipulator.getElement(erroDisplayDiv).closest('.widget-body').width();
        }
        if (currentWidgetWidth == null) {
            currentWidgetWidth = feba.domManipulator.getElement(erroDisplayDiv).parent().find('.widget-body').width();
        }

        if ((feba.domManipulator.getElement(erroDisplayDiv).find('.errordisplaypulldown').attr('data-messagemode')) === ("single")) {
            feba.domManipulator.getElement(erroDisplayDiv).find('.positionabsolute').css('overflow', 'hidden');
            feba.domManipulator.getElement(erroDisplayDiv).find('.positionrelative').css('overflow', 'hidden');
        } else {
            feba.domManipulator.getElement(erroDisplayDiv).find('.errordisplaypulldown').addClass("errorDisplayMultiNotiPadding");
        }
        feba.domManipulator.getElement('.errorDisplayDiv').hide();
        feba.domManipulator.getElement(erroDisplayDiv).find('.errorContentWrapper').css('max-height', '15px');
        if (feba.domManipulator.getElement(erroDisplayDiv).find('.errorContentWrapper').length == 0) {
            jQuery('#' + element).find("div[class*='errorContentWrapper']").css('max-height', '15px');
        }
        var messageChildrenAnchor = feba.domManipulator.getElement(erroDisplayDiv).find('#' + element + '\\:errorlink1');
        var messageChildrenSpan = jQuery(messageChildrenAnchor).parent().children('span');

        jQuery(messageChildrenSpan).hide();
        feba.domManipulator.getElement(erroDisplayDiv).css('width', currentWidgetWidth);
        feba.domManipulator.getElement(erroDisplayDiv).children().css('width', currentWidgetWidth);
        var test = feba.domManipulator.getElement(erroDisplayDiv).find('#' + element + '\\:errorlink1').children('img');
        //Check whether test variable is empty
        for (k = 0; k < test.length; k++) {
            var srcVal = "";
            var currElement = test[k];
            if (feba.domManipulator.getMatchedElementCount(test) != 0) {
                srcVal = jQuery(currElement).attr('src');
            }
            if (srcVal != null) {
                srcVal = srcVal.trim();
            } else {
                continue;
            }
            console.log("srcVal:::" + srcVal);
            var t = (srcVal).indexOf('%');
            if (t != -1) {
                srcVal = (srcVal).substring(0, t);
            }
            //feba.domManipulator.getElement(erroDisplayDiv).find('#'+element+'\\:errorlink1').children('img').attr('src',srcVal);
            jQuery(currElement).attr('src', srcVal);
        }
        var textE = jQuery(erroDisplayDiv).find('.errorContentWrapper').text();
        if (textE != null && textE.length == 0) {
            textE = jQuery('#' + element).find("div[class*='widgetErrorDisplayHw']").find("div[class*='errorContentWrapper']").text();
        }
        var visibleErrorTextTemp;
        var l = textE.lastIndexOf("]");

        var visibleErrorTextTemp = textE.substring(l + 1, textE.length);
        if (visibleErrorTextTemp.length == 0) {
            var length = getPosition(visibleErrorTextTemp, ']', 2);
            var visibleErrorText = textE.substring(length + 1, textE.length);
        } else {

            var visibleErrorText = visibleErrorTextTemp;
        }

        visibleErrorText = visibleErrorText.trim();
        jQuery('body').append('<div id=\"errorTempDiv\" style=\"display:none;font-family: arial;  font-size: 12px;  font-weight: bold;\">' + visibleErrorText + '</div>');
        var visibleErrorLength = jQuery('#errorTempDiv').width();
        jQuery('#errorTempDiv').remove();
        //handle for padding and toggle buttons by adding 43 px extra
        if (parseInt(visibleErrorLength + 43) < parseInt(currentWidgetWidth) && jQuery(erroDisplayDiv).find('.errorDisplayMultiNotiPadding').length <= 0) {
            jQuery(erroDisplayDiv).find('.errordisplaywidgetright').children('.arrowtoggle').hide();
        }
        jQuery(erroDisplayDiv).find('#wrapperError').css('z-index', '3');
        var imageChildren = feba.domManipulator.getElement('#' + element).find('.errordisplaywidgetright').children('img');
        for (i = 0; i < imageChildren.length; i++) {
            var currChild = imageChildren[i];
            var messageKey = "closeSlideError";
            if (jQuery(currChild).hasClass('arrowtoggle')) {
                messageKey = "toggleSlideError";
            }
            jQuery(currChild).attr('alt', getMessage(messageKey));
            jQuery(currChild).attr('title', getMessage(messageKey));
        }
    }
    jQuery('<div id="' + element + '_relativeWrapper" class="wrapperPositionRelative"></div>').insertAfter(jQuery('#' + element).find('.widgetErrorDisplayHw'));
    jQuery('#' + element + '_relativeWrapper').wrapInner(feba.domManipulator.getElement('#' + element).find('.widgetErrorDisplayHw'));

}

function getPosition(str, m, i) {
    return str.split(m, i).join(m).length;
}

function addsUX3scroll() {

    feba.domManipulator.getElement(".widget-content").niceScroll({
        horizrailenabled: false,
        'zindex': 497
    });
}

function resizeUX3scroll() {

    feba.domManipulator.getElement(".widget-content").niceScroll().resize({
        horizrailenabled: false
    });
}

function openFacebookLoginPage() {
    jQuery('#Details_TopLeftContainer_Stage3_ModalView1').dialog("close");
    var localDM = feba.domManipulator;
    var newButton = localDM.getElementById("FEDERATED_LOGIN_REDIRECT");
    localDM.trigger(newButton, "click");
}

function cancelUsingFacebookLogin(field) {
    jQuery('#Details_TopLeftContainer_Stage3_ModalView1').dialog("close");
}

function hideFederatedSiteDisclaimer() {
    jQuery('#Details_TopLeftContainer_Stage3_ModalView1').removeClass();
    jQuery('#Details_TopLeftContainer_Stage3_ModalView1').addClass('displayNone');
}

function openFederatedSiteDisclaimer(event) {
    jQuery('#Details_TopLeftContainer_Stage3_ModalView1').removeClass('displayNone').addClass('width100percent');
    jQuery('#Details_TopLeftContainer_Stage3_ModalView1').dialog({
        resizable: false,
        closeOnEscape: false,
        autoOpen: true,
        draggable: false,
        height: 'auto',
        width: 600,
        modal: true,
        title: 'Disclaimer',
        open: function(event, ui) {
            jQuery(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
        },
    });
    /*Added at lower resoln for overriding the login screen fb overlay width given in ncommonfunctions*/
    if (viewport().width < 640) {
        jQuery('div[aria-describedby=Details_TopLeftContainer_Stage3_ModalView1]').css('width', '91%');
        jQuery('div[aria-describedby=Details_TopLeftContainer_Stage3_ModalView1]').css('min-width', '450px');
        jQuery('div[aria-describedby=Details_TopLeftContainer_Stage3_ModalView1]').css('left', '10%');
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function setFederatedSite(callerObj, groupletId) {

    var callerId = callerObj.id;
    var parentNodeId = callerObj.parentNode.id;
    var compNod = callerObj.parentNode.parentNode;
    compNod.getElementsByTagName("input")[0].value = callerId;
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var grpId = "";
    } else {
        var grpId = groupletId + ":";
    }

    var chOwnNodes = compNod.childNodes;
    for (var i = 0; i < chOwnNodes.length; i++) {
        if (chOwnNodes[i].className == "sclNwkDisplayInnerSpan") {
            var y = chOwnNodes[i].childNodes;
            var z = callerId.concat("_sclNwkArrow");
            if (y[1].id == z) {
                y[1].className = "sclNwkImageArrowStyle";
            } else {
                y[1].className = "displayNone";
            }
        }
    }
    var sclId = "SocialNetworkLoginCheckImage3437782";
    var scl_net = callerId.split(":")[1];
    sclId = grpId.concat(sclId).concat("_").concat(scl_net).concat("_validatecredentials");
    var chNodes = document.getElementById(grpId + "SocialNetworkLoginCheckImage3437782").childNodes;
    for (var i = 0; i < chNodes.length; i++) {
        if (chNodes[i].id == sclId) {
            chNodes[i].className = "socialNwkLgnCheckImg";
        } else {
            chNodes[i].className = "displayNone";
        }
    }
    if (callerId != grpId + "FB") {
        document.getElementById(grpId + "Caption31224410").className = "displayNone";
        document.getElementById(grpId + "Caption31224411").className = "displayNone";
        document.getElementById(grpId + "Caption31224412").className = "displayNone";
    } else {
        document.getElementById(grpId + "Caption31224410").className = "social_nwk_mandatory_val_msg_note";
        document.getElementById(grpId + "Caption31224411").className = "social_nwk_mandatory_val_msg_txt";
        document.getElementById(grpId + "Caption31224412").className = "social_nwk_mandatory_val_msg_txt_below";
    }
}

function openExternalAppLoginPage(callerObj, url) {

    winref = window.open(url);
    winref.focus();

}
/*
 * This method collapse the attachments in Message Widget if the attachment' length is greator than
 * widget's width.
 *
 */
function handleAttachmentsOnLoad(elementStyle, groupletId) {
    var settingsWidth = 270;
    var settingsHeight = 20;
    //var attachrow = jQuery(".rowwithheight");
    var attachrow = jQuery(elementStyle);
    var currentWidgetWidth = feba.domManipulator.getElement(attachrow).closest('.widget-body').width();
    settingsWidth = parseInt(currentWidgetWidth) - 30; // 30 for margins
    var attachrowChildrenSpan = jQuery(attachrow).children('span');
    var attachmentsWrapper;
    var pullUpEle;
    var pullDownEle;

    jQuery('body').append('<div id=\"errorTempDiv\" style=\"display:none;\">' + attachrowChildrenSpan.text() + '</div>');
    var attachmentsLength = jQuery('#errorTempDiv').width();
    jQuery('#errorTempDiv').remove();
    //Added check for groupletId name space changes
    if (groupletId != null && groupletId != "" && groupletId != "undefined" && groupletId != "null") {
        pullUpEle = jQuery.find('#' + groupletId + '\\:attachmentPullUpArrow');
        pullDownEle = jQuery.find('#' + groupletId + '\\:attachmentPullDownArrow');
    } else {
        pullUpEle = jQuery.find('#attachmentPullUpArrow');
        pullDownEle = jQuery.find('#attachmentPullDownArrow');
    }
    if (parseInt(attachmentsLength) > parseInt(settingsWidth)) {
        attachrowChildrenSpan.css({
            "float": "left",
            "display": "inline"
        });
        var wrapper = jQuery("<div id='attachmentsWrapper'></div>")
            .css({
                "width": settingsWidth + "px",
                "overflow": "hidden",
                "text-overflow": "ellipsis",
                "height": settingsHeight + "px",
                "white-space": "nowrap"
            });
        pullUp = jQuery(pullUpEle);
        attachrowChildrenSpan.append(pullUp);
        attachrowChildrenSpan.wrapInner(wrapper);
        pullDown = jQuery(pullDownEle)
            .css({
                "display": "visible"
            });
        var imagWrapper = jQuery("<span ></span>");
        //attachrowChildrenSpan.append(pullDown);
        attachrow.append(pullDown);
        pullDown.removeClass("hideElemnt");
        pullDown.addClass("pullDownArrow");
        pullDown = pullDown.wrap(imagWrapper);
    }
}

/*
 * This method is being used for toggeling the attchemnts in  message widget if attachments' length iss greator
 * than widget's width.
 */
function toggleAttachments(element, groupletId) {
    var settingsWidth = 270;
    var settingsHeight = 20;
    var el = feba.domManipulator.getElement(element);
    var currentWidgetWidth = feba.domManipulator.getElement(element).closest('.widget-body').width();
    settingsWidth = parseInt(currentWidgetWidth) - 30;;
    var elementCssClass = el.attr('class');
    var attachmentsrow = feba.domManipulator.getElement(element).parent().parent();
    var attachmentsWrapper;
    var pullup;
    attachmentsWrapper = attachmentsrow.find('#attachmentsWrapper');
    if (elementCssClass == "pullDownArrow") {
        attachmentsWrapper.css({
            "width": settingsWidth + "px",
            "height": "auto",
            "word-wrap": "break-word",
            "white-space": "normal"

        });
        el.removeClass("pullDownArrow");
        el.addClass("hideElemnt");
        //Added check for groupletId name space changes
        if (groupletId != null && groupletId != "" && groupletId != "undefined" && groupletId != "null") {
            pullUp = jQuery('#' + groupletId + '\\:attachmentPullUpArrow');
        } else {
            pullUp = jQuery("#attachmentPullUpArrow");
        }
        pullUp.removeClass("hideElemnt");
        pullUp.addClass("pullUpArrow");

    } else {
        attachmentsWrapper.css({
            "width": settingsWidth + "px",
            "height": settingsHeight + "px",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            "word-wrap": "normal"
        });
        el.removeClass("pullUpArrow");
        el.addClass("hideElemnt");
        //Added check for groupletId name space changes
        if (groupletId != null && groupletId != "" && groupletId != "undefined" && groupletId != "null") {
            pullUp = jQuery('#' + groupletId + '\\:attachmentPullDownArrow');
        } else {
            pullUp = jQuery("#attachmentPullDownArrow");
        }
        pullUp.removeClass("hideElemnt");
        pullUp.addClass("pullDownArrow");
    }
}
//Functions for Page Maintenance use case
function jcarouselShow(totalTemplates, groupletId) {

    var groupletSpecificId = groupletId + "\\:" + "templateListParent";
    if (groupletId == "NULL") {
        groupletSpecificId = "templateListParent";
    }
    setTimeout(function() {
        var totalNo = totalTemplates

        console.log("From applicationmaintenance folder" + parseInt(totalTemplates));
        feba.domManipulator.getElementById(groupletSpecificId).jcarousel({
            loadHidden: false,
            vertical: false,
            size: parseInt(totalTemplates),
            scroll: 1,
            itemFallbackDimension: 300
        });


    }, 0);
    setTimeout(function() {
        var jcarousel = jQuery('#' + groupletSpecificId).data('jcarousel');

        var scrollTo = jQuery('.imageHighlight').parents('li').attr("jcarouselindex");
        var animateScrolling = true;
        // Scroll it
        jcarousel.scroll(scrollTo - 1, animateScrolling);
    }, 100);
    setTimeout(function() {
        jQuery('.jcarousel-prev-horizontal').attr('title', 'Previous');
        jQuery('.jcarousel-next-horizontal').attr('title', 'Next');
    }, 100);

}

function slideWidgetsData(element, event) {

    /* if (!event) event = window.event;
    var elementId = jQuery(element).attr('id');
    var widgetDataId = elementId+"_containerData";
    var id1=jQuery((event.target)||(event.srcElement)).parent().parent().attr('id');
    //if(jQuery((event.target)).is('p')||jQuery((event.target)).parent().parent().is('p')){;


    if(jQuery((event.target)||(event.srcElement)).attr('id')=="widgetPrevHeader"||jQuery((event.target)||(event.srcElement)).parent().attr('id')=="widgetPrevHeader"){

     if (jQuery("#"+widgetDataId).is(":hidden")) {
            jQuery("#"+widgetDataId).fadeIn(500);
    		jQuery("#"+elementId+"_pageDataSeparator").show();
            jQuery("#"+id1+"_img").attr('src',"L001/consumer/images/widget-minimize.gif");
     		}
    else{

            jQuery("#"+widgetDataId).fadeOut(500);
            jQuery("#"+id1+"_img").attr('src',"L001/consumer/images/widget-maximize.gif");
    }
    jQuery("#preview"+widgetDataId).fadeOut(1000, function(){ jQuery(this).remove();});
    //jQuery("#preview"+widgetDataId).remove();
    }*/

}

/*
 * This function is used to show and hide
 * master grouplet dropdown in create page flow
 */
function showMasterGropletDropdown(currentEle, masterGroupletVal) {
    var domMan = feba.domManipulator;
    var elements = domMan.getElementByIdContaining("CONTAINER_FIELD");
    var showCombo = domMan.getElementOfClass("hiddenButton");
    var hideCombo = domMan.getElementByIdContaining("masterGrouplet").parent().parent();
    var comboEle = domMan.getElementByIdContaining("MASTER_GROUPLET");
    //	var comboVal = domMan.getElementById("masterGroupletVal").val();

    if (masterGroupletVal.length != 0) {
        domMan.setAttribute(jQuery(comboEle), 'value', masterGroupletVal);
    }

    for (var i = 0; i < domMan.getMatchedElementCount(elements); i++) {
        if (domMan.getMatchedElementCount(showCombo) != 0 && domMan.getValue(domMan.getElementById(currentEle.source))) {
            domMan.removeClass(showCombo, "hiddenButton");
            domMan.addClass(showCombo, "formrow");
        } else if (jQuery(comboEle).children().length == 1) {
            domMan.removeClass(hideCombo, "formrow");
            domMan.addClass(hideCombo, "hiddenButton");
        }
    }
    setTimeout(function() {
        try {
            jQuery("[id$='PageMaintenanceFG.MASTER_GROUPLET']").febaCombobox("destroy");
        } catch (e) {}
        convertComboboxes();
    }, 1000);
}
/*
 * This function is used to trigger change event if
 * on change of "Select" value in grouplet selection dropdowns
 * in create page flow
 */
function populateMasterGropletDropdown(currentEle) {
    setTimeout(function() {
        var domMan = feba.domManipulator;
        var elements = domMan.getElementByIdContaining("CONTAINER_FIELD");
        var selectedVal;

        for (var i = 0; i < domMan.getMatchedElementCount(elements); i++) {
            if (jQuery(currentEle).attr("id") != jQuery(elements[i]).attr("id") && !domMan.getValue(jQuery(currentEle))) {
                selectedVal = domMan.getValue(elements[i]);
                if (selectedVal) {
                    domMan.trigger(jQuery(elements[i]), "change");
                    break;
                } else if (i != ((domMan.getMatchedElementCount(elements)) - 1) && domMan.getValue(jQuery(elements[i + 1]))) {
                    domMan.trigger(jQuery(elements[i + 1]), "change");
                    break;
                }
            }
        }
        if (jQuery('[name="' + 'PageMaintenanceFG.MASTER_GROUPLET' + '"]').attr('val') == null) {
            if (jQuery("[id$='PageMaintenanceFG.MASTER_GROUPLET']").length > 0) {
                //document.getElementById('PageMaintenaceUpdateConfigurationContainer_TemplateList:PageMaintenanceFG.MASTER_GROUPLET').options[0].selected=true;
                jQuery("[id$='PageMaintenanceFG.MASTER_GROUPLET'] option")[0].selected = true;
                setTimeout(function() {
                    try {
                        jQuery("[id$='PageMaintenanceFG.MASTER_GROUPLET']").febaCombobox("destroy");
                    } catch (e) {}
                    convertComboboxes();
                }, 1000);
            }
        }


    }, 2000)
}

function showGroupletPulldown(currentEle) {
    var domMan = feba.domManipulator;
    var showElement = domMan.getElement(currentEle).next();
    var isVisible = showElement.is(":visible");

    //	if(domMan.getMatchedElementCount(showelement) != 0){
    //		domMan.removeClass(showelement,"groupletDetailsPulldown");
    //		domMan.addClass(showelement,"hiddenButton");
    //	}
    if (isVisible) {
        // Logic for hiding the pulldown
        showElement.hide();
    } else {
        // Logic for showing the pulldown
        showElement.show();
    }
}

function showSourceEvents(responseText) {
    var selectedSrvEvent = jQuery('#sourceEventIdentifier').val();
    feba.domManipulator.getElementEndingWith('PageMaintenanceFG.SOURCE_EVENT').attr("disabled", false);
    feba.domManipulator.getElementEndingWith('PageMaintenanceFG.TARGET_WIDGET').attr("disabled", false);
    feba.domManipulator.getElementEndingWith('PageMaintenanceFG.SOURCE_EVENT').val(selectedSrvEvent);
    var upperCaseEvent = "";
    if (selectedSrvEvent && selectedSrvEvent.length > 0) {
        upperCaseEvent = selectedSrvEvent.toUpperCase();
    }
    var selectedTargetWid = jQuery('#targetWidgetIdentifier').val();
    console.log(selectedSrvEvent);
    console.log();
    if (selectedSrvEvent == upperCaseEvent) {
        console.log("inside uppercase");
    }

    feba.domManipulator.getElementEndingWith('PageMaintenanceFG.TARGET_WIDGET').val(selectedTargetWid);

    var sel = document.getElementById("PageMaintenanceFG.SOURCE_EVENT");
    var opts = sel.options;
    for (i = 0; i < opts.length; i++) {
        var currOpt = opts[i];
        if (upperCaseEvent == (currOpt.value.toUpperCase())) {
            opts[i].selected = true;
            break;
        }
    }
    if (selectedSrvEvent.length > 0) {
        feba.domManipulator.getElementEndingWith('PageMaintenanceFG.SOURCE_EVENT').attr("disabled", true);
    }
    if (opts.length > 1) {
        feba.domManipulator.trigger(feba.domManipulator.getElementEndingWith('PageMaintenanceFG.SOURCE_EVENT'), "change");
        feba.domManipulator.trigger(feba.domManipulator.getElementEndingWith('PageMaintenanceFG.TARGET_WIDGET'), "change");
    } else {
        feba.domManipulator.getElementEndingWith('PageMaintenanceFG.SOURCE_EVENT').attr("disabled", true);
    }
    if (selectedTargetWid.length > 0) {
        feba.domManipulator.getElementEndingWith('PageMaintenanceFG.TARGET_WIDGET').attr("disabled", true);
    }

    //jQuery(destField).show();
    setTimeout(function() {
        try {
            jQuery("[id$='PageMaintenanceFG.SOURCE_EVENT']").febaCombobox("destroy");
            jQuery("[id$='PageMaintenanceFG.TARGET_WIDGET']").febaCombobox("destroy");
        } catch (e) {}
        convertComboboxes();
    }, 1000);
}

function showSourceFields(responseText) {
    feba.domManipulator.getElementEndingWith('PageMaintenanceFG.SOURCE_FIELD').attr("disabled", false);
    setTimeout(function() {
        try {
            jQuery("[id$='PageMaintenanceFG.SOURCE_FIELD']").febaCombobox("destroy");
            //jQuery("[id$='PageMaintenanceFG.TARGET_WIDGET']").febaCombobox( "destroy" );
        } catch (e) {}
        convertComboboxes();
    }, 1000);
    //jQuery(destField).show();
}

function showTargetFields(responseText) {
    feba.domManipulator.getElementEndingWith('PageMaintenanceFG.PUBLISHER_DESTINATION_FIELD').attr("disabled", false);
    setTimeout(function() {
        try {
            jQuery("[id$='PageMaintenanceFG.PUBLISHER_DESTINATION_FIELD']").febaCombobox("destroy");
            //jQuery("[id$='PageMaintenanceFG.TARGET_WIDGET']").febaCombobox( "destroy" );
        } catch (e) {}
        convertComboboxes();
    }, 1000);
    //jQuery(destField).show();
}

function footableCustomTable() {
    jQuery('table').footable();
}

function viewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
}

function headerPreventSessionTimeout() {

    document.getElementById('PREVENT_SESSION_TIMEOUT__').click();

}

//End: Added for UX3

/* Reusable function for calling Events in FG */
function triggerSubmit(btnId, id) {
    var localDM = feba.domManipulator;
    localDM.trigger(localDM.getElement(localDM.getGroupletSpecificElement(btnId, LIB.__GET_GROUPLET_ID__(id))), 'click');
}


/* Function for open PDF after printing cheques,Cover Letter, WTC etc.. for ChequePrinting Module*/

function onLoadPrintingJobsPage() {

    var fgName = document.getElementById("FORMSGROUP_ID__").value;

    var homevalue = document.getElementById(fgName + ".HOME_CUR_CODE").value;
    var instrument = document.getElementById(fgName + ".INSTRUMENT").value;

    if (instrument == "DD") {
        var instype = document.getElementById(fgName + ".INSTRUMENT_TYPE").value;
        var typeFlag = document.getElementById(fgName + ".TYPE_FLAG").value;
        if (typeFlag == "PENDING_CHEQUES") {
            if (instype == "FD" || instype == "ALL") {
                document.getElementById(fgName + ".CURRENCY").disabled = false;
            } else {
                document.getElementById(fgName + ".CURRENCY").disabled = true;
            }
        }
    }

    if (feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0].value == "true") {
        feba.domManipulator.getElementById("DOWNLOADPDF")[0].click();
    } else if (feba.domManipulator.getElementById("SHOWWARNINGMSG")[0].value == "true") {
        var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMSG")[0].value);
        if (retVal == true) {
            feba.domManipulator.getElementById("PRINT_CONFIRM")[0].click();
            return true;
        } else {
            return false;
        }
    } else if (feba.domManipulator.getElementById("SHOWWARNINGMESSAGE")[0].value == "true") {
        var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMESSAGE")[0].value);
        if (retVal == true) {
            feba.domManipulator.getElementById("CREATE_CORPORATE")[0].click();
            return true;
        } else {
            feba.domManipulator.getElementById("DUMMY")[0].click();
            return false;
        }
    }
}


/* EBanking - Added for create invoice to Copy shipping address into billing address  */
function changeAddress(groupletId) {
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var grpId = "";
    } else {
        var grpId = groupletId + ":";
    }
    var fgName = grpId + "InvoiceFG";
    if (document.getElementById(fgName + ".SHIPPING_BILLING_ADDRESS").checked == true) {
        document.getElementById(fgName + ".SHIPPING_BILLING_ADDRESS").value = "Y";
        document.getElementById(fgName + ".BILLING_NAME").value = document.getElementById(fgName + ".SHIPPING_NAME").value;
        document.getElementById(fgName + ".BILLING_ADDRESS_LINE1").value = document.getElementById(fgName + ".SHIPPING_ADDRESS_LINE1").value;
        document.getElementById(fgName + ".BILLING_ADDRESS_LINE2").value = document.getElementById(fgName + ".SHIPPING_ADDRESS_LINE2").value;
        document.getElementById(fgName + ".BILLING_ADDRESS_LINE3").value = document.getElementById(fgName + ".SHIPPING_ADDRESS_LINE3").value;
        document.getElementById(fgName + ".BILLING_CITY").value = document.getElementById(fgName + ".SHIPPING_CITY").value;
        document.getElementById(fgName + ".BILLING_ZIP_CODE").value = document.getElementById(fgName + ".SHIPPING_ZIP_CODE").value;
        document.getElementById(fgName + ".BILLING_STATE_DESC").value = document.getElementById(fgName + ".SHIPPING_STATE_DESC").value;
        document.getElementById(fgName + ".BILLING_ZIP_CODE").value = document.getElementById(fgName + ".SHIPPING_ZIP_CODE").value;
        document.getElementById(fgName + ".BILLING_COUNTRY").value = document.getElementById(fgName + ".SHIPPING_COUNTRY").value;
    }
}
/* CRP - Added for create invoice to Copy shipping address into billing address */
function changeInvoiceAddress() {
    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    if (document.getElementById(fgName + ".SHIPPING_BILLING_ADDRESS").checked == true) {
        document.getElementById(fgName + ".BILLING_NAME").value = document.getElementById(fgName + ".SHIPPING_NAME").value;
        document.getElementById(fgName + ".SHIPPING_BILLING_ADDRESS").value = "Y";
        document.getElementById(fgName + ".BILLING_ADDRESS_LINE1").value = document.getElementById(fgName + ".SHIPPING_ADDRESS_LINE1").value;
        document.getElementById(fgName + ".BILLING_ADDRESS_LINE2").value = document.getElementById(fgName + ".SHIPPING_ADDRESS_LINE2").value;
        document.getElementById(fgName + ".BILLING_ADDRESS_LINE3").value = document.getElementById(fgName + ".SHIPPING_ADDRESS_LINE3").value;
        document.getElementById(fgName + ".BILLING_CITY").value = document.getElementById(fgName + ".SHIPPING_CITY").value;
        document.getElementById(fgName + ".BILLING_ZIP_CODE").value = document.getElementById(fgName + ".SHIPPING_ZIP_CODE").value;
        document.getElementById(fgName + ".BILLING_STATE_DESC").value = document.getElementById(fgName + ".SHIPPING_STATE_DESC").value;
        document.getElementById(fgName + ".BILLING_ZIP_CODE").value = document.getElementById(fgName + ".SHIPPING_ZIP_CODE").value;
        document.getElementById(fgName + ".BILLING_COUNTRY").value = document.getElementById(fgName + ".SHIPPING_COUNTRY").value;
    }
}

/* Added to display the Instrument Type drop down based on the Request Type*/
function changeInstrumentType() {
    var fgName = document.getElementById("FORMSGROUP_ID__").value;

    var selectedValue = document.getElementById(fgName + ".REQUEST_TYPE").value;
    var instrumentType = document.getElementById(fgName + ".INSTRUMENT_TYPE");

    if (selectedValue == "CPC" || selectedValue == "CDJ" || selectedValue == "DCJ") {
        document.getElementById("SearchPanel_WithButton.Rb2").style.display = 'block';
        document.getElementById(fgName + ".INSTRUMENT_TYPE").value = '';

        if (selectedValue == "CDJ" || selectedValue == "DCJ") {
            instrumentType[1].style.display = "none";
        } else {
            instrumentType[1].style.display = 'block';
        }
    } else {
        document.getElementById("SearchPanel_WithButton.Rb2").style.display = 'none';
        document.getElementById(fgName + ".INSTRUMENT_TYPE").value = '';
    }
}
/* Added to display the Instrument Type drop down based on the Request Type during loading of the screen*/
function onLoadCRPViewApprovalListPage() {

    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var selectedValue = document.getElementById(fgName + ".REQUEST_TYPE").value;
    var instrumentType = document.getElementById(fgName + ".INSTRUMENT_TYPE");
    var instrumentTypeVal = document.getElementById(fgName + ".INSTRUMENT_TYPE").value;

    if (selectedValue == "CPC" || selectedValue == "CDJ" || selectedValue == "DCJ") {
        document.getElementById("SearchPanel_WithButton.Rb2").style.display = 'block';
        document.getElementById(fgName + ".INSTRUMENT_TYPE").value = instrumentTypeVal;
        if (selectedValue == "CDJ" || selectedValue == "DCJ") {
            instrumentType[1].style.display = "none";
        } else {
            instrumentType[1].style.display = 'block';
        }
    } else {
        document.getElementById("SearchPanel_WithButton.Rb2").style.display = 'none';
        document.getElementById(fgName + ".INSTRUMENT_TYPE").value = '';
    }
}


function onBackEvent() {
    var textElements = getSpecifiedElements(null, ":text", null);
    var length = textElements.length;
    for (var i = 0; i < length; i++) {
        textElements[i].value = "";
    }
}

function removeErrorMsg(parentP, errorMsgLoaction) {
    var localDM = feba.domManipulator;
    //removing the error span
    var remElem = localDM.find(localDM.getElement(parentP), "[id^=ERR_MSG]").parent();
    if (!remElem.length) {
        remElem = localDM.find(localDM.getElement(parentP), "[id^=ERROR_ROW]");
    }
    localDM.remove(remElem);
}

function onLoadCRPViewInvoicesPage() {

    if (feba.domManipulator.getElementById("SHOWWARNINGMESSAGE")[0].value == "true") {
        var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMESSAGE")[0].value);
        if (retVal == true) {
            feba.domManipulator.getElementById("CREATE_CORPORATE")[0].click();
            return true;
        } else {
            feba.domManipulator.getElementById("DUMMY")[0].click();
            return false;
        }
    }
}
// gets invoked from pulldownmenutaghelper. Appends extra classes to last and second last elements changes done for RWD
function handlePullDownHtml(groupletId) {
    var listingTables = jQuery('table');

    var listSize = "";
    if (jQuery('#' + groupletId).find('table').length == 0) {
        listingTables = jQuery('#' + groupletId).find('.menuChoices').parent('div');
    }
    for (j = 0; j < listingTables.length; j++) {

        var menuChoicesSize = 0;
        menuChoicesSize = parseInt(jQuery(listingTables[j]).find('.menuChoices').length);
        var menuChoices = jQuery(listingTables[j]).find('.menuChoices');
        for (k = 0; k < menuChoicesSize; k++) {
            var currElement = menuChoices[k];
            var colSize = jQuery(currElement).attr('data-colCount');
            if (jQuery(currElement).find('.menuChoicesColumnLast').children().length == 0) {
                jQuery(currElement).find('.menuChoicesColumnLast').hide();
                jQuery(currElement).removeClass("menuChoices_" + colSize);
                colSize = parseInt(colSize) - 1;
                jQuery(currElement).addClass("menuChoices_" + colSize);
            }
            var newClass = "lastPullDown";
            if (colSize) {
                newClass = newClass + "_" + colSize;
            }
            if (k == (menuChoicesSize - 1) || k == (menuChoicesSize - 2)) {
                jQuery(currElement).addClass(newClass);
            }
        }

    }
}
//gets invoked from nfebascripts used to maintain RHS grouplet vertical alignment incase of Business ex while opening modal
function handleRHSAlignment(groupletId) {
    var trgtDiv = "";
    if (groupletId && groupletId != null && jQuery("#ParentDiv_" + groupletId) && jQuery("#ParentDiv_" + groupletId).parent() && jQuery("#ParentDiv_" + groupletId).parent().length > 0) {
        trgtDiv = jQuery("#ParentDiv_" + groupletId).parent().offset().top;
    }
    if (jQuery('.pageLeftContainer').length > 0) {
        var pgLeftContainer = jQuery('.pageLeftContainer').offset().top;
        var noElements = jQuery('.container-xtrasmall').length;
        var currvpWidth = viewport().width;
        for (i = 0; i < noElements; i++) {
            var currElement = jQuery('.container-xtrasmall')[i];
            if (jQuery(currElement).children('.widget').length > 0 && parseInt(currvpWidth) > 900) {
                //alert(parseInt(pgLeftContainer)-parseInt(trgtDiv));
                var margin = parseInt(pgLeftContainer) - parseInt(trgtDiv);
                jQuery(currElement).css('margin-top', margin);
                jQuery(currElement).attr('resized-margin-top', margin);
                jQuery(currElement).addClass('window-resized');
                break;
            }
        }

    }
    if (groupletId && groupletId != null && jQuery('#ParentDiv_' + groupletId).parent().hasClass('container-nxtGenxtrasmall')) {
        if (jQuery('#' + groupletId).find(jQuery("[id^='" + groupletId + "\\:MessageDisplay_TABLE']")) && jQuery('#' + groupletId).find(jQuery("[id^='" + groupletId + "\\:MessageDisplay_TABLE']")).length > 0) {
            jQuery('#' + groupletId).find(jQuery("[id^='" + groupletId + "\\:MessageDisplay_TABLE']").remove());
        }
    }
}


function openMobileFederatedSiteDisclaimer(event) {
    event.preventDefault();

    jQuery('#Mobile_Popup1').removeClass('displayNone').addClass('mobile_widthheight100percent');
    jQuery('#Mobile_Popup1').dialog({
        resizable: false,
        closeOnEscape: false,
        autoOpen: false,
        draggable: false,
        height: 300,
        width: 600,
        modal: true,
        title: 'Disclaimer',
        open: function(event, ui) {
            jQuery(".ui-dialog-titlebar-close", ui.dialog || ui).hide();
            jQuery('.ui-widget-overlay').addClass('uiMobileWidgetOverlay');
            jQuery(".ui-dialog-titlebar").hide();
        },
        dialogClass: 'federatedDisclaimerDialog'
    });
    jQuery('#Mobile_Popup1').dialog("open");
}

function openMobileFacebookLoginPage() {
    jQuery('#Mobile_Popup1').dialog("close");
    var localDM = feba.domManipulator;
    var newButton = localDM.getElementById("FEDERATED_LOGIN_REDIRECT");
    localDM.trigger(newButton, "click");
}

function cancelMobileUsingFacebookLogin(field) {
    jQuery('#Mobile_Popup1').dialog("close");
    jQuery('#Mobile_Popup1').parent().removeClass('federatedDisclaimerDialog');

}

function goToMobileChildMenu(childMenuId) {
    jQuery("#mobiletopbar").removeClass("mobilenavigationbar");
    jQuery("#mobiletopbar").addClass("displayNone");
    var childId = document.getElementById(childMenuId);
    jQuery(childId).removeClass("displayNone");
    jQuery(childId).addClass("mobilenavigationbar");
}

function goToMobileMainNavMenu(childMenuId) {
    var childId = document.getElementById(childMenuId);
    jQuery(childId).removeClass("mobilenavigationbar");
    jQuery(childId).addClass("displayNone");
    jQuery("#mobiletopbar").removeClass("displayNone");
    jQuery("#mobiletopbar").addClass("mobilenavigationbar");
}


function showMobileTopBar() {
    jQuery("#mobilemainpage").addClass("hidemobilemaintopbar");
    jQuery("#mobilemaintopbar").removeClass("hidemobilemaintopbar");
    jQuery("#mobilemaintopbar").children().addClass("displayNone");
    jQuery("#mobilemaintopbar").children().first().removeClass("displayNone");;
}

function hideMobileTopBar() {
    jQuery("#mobilemaintopbar").addClass("hidemobilemaintopbar");
    jQuery("#mobilemainpage").removeClass("hidemobilemaintopbar");
}

function pinGrouplet(groupletId) {

    var pinGrpSource = feba.features[groupletId].options.target;
    var pinGrpltUrl = "";
    var groupletName = feba.features[groupletId].options.title;
    if (feba.features[groupletId].options.pinGroupletUrl) {
        pinGrpltUrl = feba.features[groupletId].options.pinGroupletUrl;
    }
    var criteriaStringVal = feba.features[groupletId].options.criteria;
    if (!feba.features[groupletId].options.criteria) {
        criteriaStringVal = feba.features[groupletId].options.pinnablecriteria;
    }
    var criteriaSet = criteriaStringVal.split("::");
    var criteriaString = "";
    for (k = 0; k < criteriaSet.length; k++) {
        var nameValue = criteriaSet[k];
        if (nameValue && nameValue.length > 0) {
            var eqSep = nameValue.split("=");
            if (eqSep.length > 1) {
                var name = eqSep[0];
                var value = eqSep[1];
                if (name.trim() == "WID_CONF") {
                    if (value.indexOf("ParentDiv") == -1) {
                        value = "ParentDiv_" + value;
                    }
                }
                criteriaString = criteriaString + name + "=" + value;
                if (k != criteriaSet.length - 1) {
                    criteriaString = criteriaString + "::";
                }
            }
        }
    }

    if (feba.features[groupletId].options.criteria) {
        feba.features[groupletId].options.criteria = criteriaString;
    } else {
        feba.features[groupletId].options.pinnablecriteria = criteriaString;
    }
    var rpc = new feba.js.ajax.rpcRequest({
        JSObjectName: "FEBA.JS.Ajax.RPCRequest",
        baseUrl: feba.features[groupletId].options.pinGroupletUrl + "&__TARGET_GROUPLET__=" + groupletId,
        criteria: feba.features[groupletId].options.criteria || feba.features[groupletId].options.pinnablecriteria,
        displayExceptions: true,
        groupletId: groupletId,
        isPinRequest: true,
        executeOnLoad: false,
        onFailure: function() {
            widgetConfRemoveFail();
        },
        onSuccess: function() {
            handleWidgetPinSuccess(pinGrpSource);
        }
    });
    var pinnableTitle = getMessage("confirmPinGroupletTitle");
    var pinnableMessage = getMessage('confirmPinGrouplet').replace('$GROUPLET_TITLE$', groupletName);
    if (jQuery('.pinGroupletModal') && jQuery('.pinGroupletModal').length > 0) {
        jQuery('.pinGroupletModal').remove();
    }
    var dialogHTML = jQuery('<div class=\"pinGroupletModal\"></div>').appendTo('body').html('<div><h6>' + pinnableMessage + '</h6></div>');


    var newWidth;
    var windowWidth = viewport().width;
    if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 990) {
        newWidth = "60%";
    } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
        newWidth = "80%";
    } else {
        newWidth = "30%";
    }

    jQuery('.pinGroupletModal').dialog({
        modal: true,
        title: pinnableTitle,
        zIndex: "10000",
        autoOpen: true,
        width: newWidth,
        //IE8 throws exception class:'pingrpletmodal',
        resizable: false,
        left: "25%",
        buttons: [{
                "text": 'Yes',
                "click": function() {
                    if (pinGrpltUrl && pinGrpltUrl.length > 0) {
                        rpc.execute();
                    }
                    jQuery(this).dialog("close");
                },
                "class": 'pinGroupletContinue'
            },
            {
                "text": 'No',
                "click": function() {

                    jQuery(this).dialog("close");
                    jQuery(this).dialog("destroy");

                },
                "class": 'pinGroupletCancel'
            }
        ],
        close: function(event, ui) {
            jQuery('.ui-dialog').find('.ui-button').removeClass('pinGroupletButtonset');
            jQuery('.ui-dialog').find('.ui-button').removeClass('pinnableHW_formbtn');
            jQuery('.ui-dialog').find('.ui-button-text').removeClass('pinnableformbtn');
            jQuery('.ui-dialog').find('.ui-dialog-titlebar').removeClass('pinGroupletModalTitle');
            jQuery('.ui-dialog').find('.ui-dialog-buttonset').removeClass('pinGroupletformbtn');
        },
        open: function(event, ui) {
            jQuery('.ui-dialog').find('.ui-button').addClass('pinnableHW_formbtn');
            jQuery('.ui-dialog').find('.ui-button-text').addClass('pinnableformbtn');
            jQuery('.ui-dialog').find('.ui-dialog-titlebar').addClass('pinGroupletModalTitle');
            jQuery('.ui-dialog').find('.ui-dialog-titlebar-close').removeClass('pinnableHW_formbtn');
            jQuery('.ui-dialog').find('.ui-dialog-titlebar-close').children().removeClass('pinnableformbtn');
            jQuery('.ui-dialog').find('.ui-dialog-buttonset').addClass('pinGroupletformbtn');
            jQuery('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
        }
    });
}

function handleWidgetPinSuccess(pinGroupletSrc) {
    var pinImage = pinGroupletSrc + "_Pinnable_img";
    jQuery('#' + pinImage).attr('src', imagePath + '/pinedArrow.png');
    jQuery('#' + pinImage).attr('alt', 'Pinned to Dashboard');
    var pinnableElements = feba.domManipulator.find(
        feba.domManipulator.getElementById(pinGroupletSrc + "_pinnableWrapper"), "a");
    for (var j = 0; j < pinnableElements.length; j++) {
        jQuery(pinnableElements[j]).attr('onClick', "javascript:void(0)");
        jQuery(pinnableElements[j]).attr('title', "Pinned to Dashboard");
        jQuery(pinnableElements[j]).children().attr('onclick', 'javascript:void(0)');
    }
}


// gets invoked from pulldownmenutaghelper. Appends extra classes to last and second last elements changes done for RWD

function handleToggleNetSummaryView(consoView, groupletId, isIGCFired) {
    //alert("inside handleToggleNetSummaryView"+groupletId);
    var consoView = consoView;
    if (consoView == "N") {
        console.log("inside handleToggleNetSummaryView Inside N");
        jQuery('.netValueTab').css("background-color", "white");
        jQuery('.netValueTab').css("color", "rgb(45, 65, 100)");
        jQuery('.netValueTabLink').css("color", "rgb(45, 65, 100)");
        jQuery('.accountsTab').css("background-color", "rgb(45, 65, 100)");
        jQuery('.accountsTab').css("color", "white");
        jQuery('.accountsTabLink').css("color", "white");
        jQuery('.accountSelectBorderIndicator').css("display", "none");
        jQuery('.accountSelectIndicator').css("display", "none");
    } else {
        jQuery('.accountSelectBorderIndicator').remove();
        jQuery('.accountSelectIndicator').remove();

        console.log("inside handleToggleNetSummaryView Inside NOT N");
        jQuery("<span class=\"accountSelectBorderIndicator\"></span><span class=\"accountSelectIndicator\"></span>").insertAfter(jQuery('#ParentDiv_' + groupletId).find(".widget-body"));
        jQuery('.accountsTab').css("background-color", "white");
        jQuery('.accountsTab').css("color", "rgb(45, 65, 100)");
        jQuery('.accountsTabLink').css("color", "rgb(45, 65, 100)");
        jQuery('.netValueTab').css("background-color", "rgb(45, 65, 100)");
        jQuery('.netValueTab').css("color", "white");
        jQuery('.netValueTabLink').css("color", "white");

        var offset = jQuery('.hasSelectedArrow').offset();
        //event.stopPropagation();
        console.log("offset values" + offset.left, offset.top);
        var divHeight = jQuery('.hasSelectedArrow').height(); //get height of div
        var arrowWidth = jQuery('.hasSelectedArrow').width(); //get width of div
        //	alert("divHeight:"+divHeight+" arrowWidth:"+arrowWidth);
        var arrowPostion = parseInt(offset.left) + parseInt(arrowWidth);
        console.log("arrowPostion:" + arrowPostion);

        var arrowPositionTop = (2 * offset.top + divHeight) / 2 - 15;

        var arrowPositionTopBorder = arrowPositionTop - 1;

        //  	alert(arrowPosition+" hi "+arrowPositionRed);
        //jQuery(".arrow-right").css("margin-top",arrowPosition+"px");
        //jQuery(".arrow-right").css("top",arrowPositionTop+"px");

        jQuery(".accountSelectIndicator").css("top", arrowPositionTop + "px");
        jQuery(".accountSelectBorderIndicator").css("top", arrowPositionTopBorder + "px");
        var ap = jQuery('#ParentDiv_' + groupletId).width() + 15 + 25 + 'px';
        //alert("new arrowp"+arrowPostion);
        //commented for RWD
        //jQuery(".accountSelectIndicator").css("left",ap);
        //jQuery(".accountSelectBorderIndicator").css("left",ap);

        //newly added for Responsive
        var windowWidth = viewport().width;
        if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 990) {
            jQuery(".accountSelectIndicator").css("left", "33.8%");
            jQuery(".accountSelectBorderIndicator").css("left", "33.8%");
        } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
            jQuery(".accountSelectIndicator").css("left", "94%");
            jQuery(".accountSelectBorderIndicator").css("left", "94%");
        } else {
            jQuery(".accountSelectIndicator").css("left", ap);
            jQuery(".accountSelectBorderIndicator").css("left", ap);
        }



        //jQuery(".SBAWrapper:after").css("top",arrowPosition+"px");
        jQuery(".accountSelectIndicator").css("border-left-color", jQuery('.hasSelectedArrow').css('background-color'));
        if (jQuery("HTML").css("direction") == "rtl") {
            var apval = ap;
            var apNew = "";
            apNew = 940 - parseInt(ap) + 56;
            jQuery(".accountSelectIndicator").css("left", parseInt(apNew) + 2);
            jQuery(".accountSelectBorderIndicator").css("left", apNew);
            jQuery(".accountSelectIndicator").css("border-right-color", jQuery('.hasSelectedArrow').css('background-color'));
            jQuery(".accountSelectIndicator").css("border-left-color", 'rgba(0, 0, 0, 0)');
        }
        if (isIGCFired == "Y") {
            jQuery('.accountSelectBorderIndicator').css("display", "block");
            jQuery('.accountSelectIndicator').css("display", "block");
        } else {
            jQuery('.accountSelectBorderIndicator').css("display", "none");
            jQuery('.accountSelectIndicator').css("display", "none");
        }
    }
}

function paintBubble(currObj, elementId) {
    console.log('Inside paintBubble');
    var elementId1 = jQuery(currObj).attr('id');
    var positionOfPlusImage = jQuery("[id='" + elementId1 + "']").position();
    var bubbleDivId = elementId + "_bubble";
    if (jQuery("[id='" + bubbleDivId + "']").hasClass('hideElement')) {
        jQuery("[id='" + bubbleDivId + "']").removeClass('hideElement');
    }
    jQuery("[id='" + bubbleDivId + "']").position({
        top: positionOfPlusImage.top + 35,
        left: positionOfPlusImage.left - 110
    });
    jQuery("[id='" + bubbleDivId + "']").css("top", positionOfPlusImage.top + 30);
    jQuery("[id='" + bubbleDivId + "']").css("left", positionOfPlusImage.left - 78);
    //if(jQuery('#'+elementId1).next().next().hasClass('hideElement')){
    //	jQuery('.bubble').removeClass('hideElement');
    //}

    //jQuery('.bubble').css('top',jQuery('#'+elementId1).offset().top);
}

function removeBubble(currObj, elementId) {
    var bubbleDivId = elementId + "_bubble";
    if (jQuery("[id='" + bubbleDivId + "']").hasClass('hideElement')) {
        jQuery("[id='" + bubbleDivId + "']").removeClass('hideElement');
    } else {
        jQuery("[id='" + bubbleDivId + "']").addClass('hideElement');
    }

}

function SetPinablePosition(groupletId) {
    if (jQuery('.nextGenUX4').length > 0 && jQuery('.nextGenUX4').is(':visible') && groupletId && groupletId != "null") {
        if (jQuery('#' + groupletId).find('.widgetFooterleft_new') && jQuery('#' + groupletId).find('.widgetFooterleft_new').length > 0) {
            jQuery('#' + groupletId).find('.pinnableGroupletWrapper').addClass('pinnableGroupletWrapperPagination');
            jQuery('#' + groupletId).find('.nextGenDetailsPagePulldownHolder').addClass('nextGenDetailsPagePulldownHolderPagination');
            jQuery('#' + groupletId).find('.widgetFooterleft_new').find('.widfooterleft_new').prepend(jQuery('#' + groupletId + '_pinnableWrapper').detach());
        } else if (jQuery('#' + groupletId).find('.chartPaginationChild') && jQuery('#' + groupletId).find('.chartPaginationChild').length > 0) {
            jQuery('#' + groupletId).find('.chartPaginationChild').parent().prepend(jQuery('#' + groupletId + '_pinnableWrapper').detach());
            jQuery('#' + groupletId).find('.pinnableGroupletWrapper').addClass('forChartingMargin');
            jQuery('#' + groupletId).find('.pinnableGroupletWrapper').removeClass('pinnableGroupletWrapper');



        } else if (jQuery('#' + groupletId).find('table').length > 0) {
            jQuery('#' + groupletId).find('.nextGenDetailsPagePulldownHolder').addClass('positionrelativeimp');
            jQuery('#' + groupletId).find('.forPinButton').css('position', 'absolute');
            jQuery('#' + groupletId).find('.forPinButton').css('bottom', '1px');
        }
        if (jQuery('#' + groupletId).find('.chartPaginationChild') && jQuery('#' + groupletId).find('.chartPaginationChild').length > 0) {

            jQuery('#' + groupletId).find('.nextGenDetailsPagePulldownHolder').addClass('chartPaginationPagination');
        }

    }
}

function handleOverlayHeading(params) {
    setTimeout(function() {
        if (undefined != jQuery('.ui-dialog-title') && jQuery('.ui-dialog-title').text().trim() != "") {
            if (jQuery('#MODAL_VIEW_CONTAINER #' + params.groupletId + '\\:PgHeading').length > 0) {
                jQuery('#MODAL_VIEW_CONTAINER #' + params.groupletId + '\\:PgHeading').css('display', 'none');
            }
        }
    }, 50);
}
/* Added For Mobile Recharge Start */
function goBackToMobileRecharge() {
    var localDM = feba.domManipulator;
    var newButton = localDM.getElementById("Button29703936");
    localDM.trigger(newButton, "click");
}

function searchMobileRechargePreference() {
    var localDM = feba.domManipulator;
    var newButton = localDM.getElementById("Button33032774");
    localDM.trigger(newButton, "click");
}
/* Added For Mobile Recharge End */
//added for recon start
/** Added for User channel Linkage - Start **/
function changeToCancel(event) {
    if (null != (document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
        var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
        channelIdChileNodes[0].style.display = '';
    }

    //document.getElementById(groupletId+"\:"+"UserChannelCRUDFG.CHANNEL_USER_ID").value = "";
    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").value = '';
    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';
    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = 'none';
    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CANCEL").style.display = '';
    event.preventDefault();

}

function changeToMPCancel(event) {
    var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
    channelIdChileNodes[0].style.display = '';

    //document.getElementById(groupletId+"\:"+"UserChannelCRUDFG.USER_PRINCIPAL").value = "";
    document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.USER_PRINCIPAL").style.display = '';
    document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").value = '';
    document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").style.display = 'none';
    document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.EDIT").style.display = 'none';
    document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.CANCEL").style.display = '';
    event.preventDefault();

}

//var visited = 0;

function hideSameUserIdButtons() {

    var visited = 0;

    if (visited == 0) {
        visited = 1;
        var selectedChannel = document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_TYPE").value;
        var configuredChannels = document.getElementById("UserChannelCRUDFG.SAME_USERID_CHANNELS").value;
        var channelUserId = document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").value;
        var tempChannelUserId = document.getElementById("UserChannelCRUDFG.TEMP_CHANNEL_USER_ID").value;
        if (selectedChannel != "") {
            if (configuredChannels.indexOf('|') != -1 && configuredChannels.indexOf(selectedChannel) != -1 && channelUserId != "") {
                if ((document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2")) != null) {
                    var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
                    channelIdChileNodes[0].style.display = 'none';
                }

                if (tempChannelUserId != channelUserId) {
                    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = 'none';
                    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CANCEL").style.display = '';
                    jQuery("[id$='UserChannelCRUDFG.CHANNEL_USER_ID']").parent().show();
                    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
                    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").value = '';
                    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';
                } else {
                    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").style.display = 'none';
                    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = '';
                    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CANCEL").style.display = 'none';
                    jQuery("[id$='UserChannelCRUDFG.CHANNEL_USER_ID_S']").parent().show();
                    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = '';
                    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = channelUserId;
                }


            }

        }
        if (selectedChannel == "" || configuredChannels.indexOf(selectedChannel) == -1) {
            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
            if (null != (document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
                var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
                channelIdChileNodes[0].style.display = '';
            }
            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = 'none';
            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CANCEL").style.display = 'none';
            document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = "";
            document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';

        }
        if (configuredChannels.indexOf(selectedChannel) != -1 && channelUserId == "") {
            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = 'none';
        }
    }
}


function hideSameUserIdMPButtons() {
    var visited = 0;
    if (visited == 0) {
        // visited = 1;
        document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.EDIT").style.display = 'none';
        document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.CANCEL").style.display = 'none';
        document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").style.display = 'none';


    }
}

function showButtons(event) {

    var selectedChannel = document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_TYPE").value;
    var configuredChannels = document.getElementById("UserChannelCRUDFG.SAME_USERID_CHANNELS").value;
    var tempChannel = document.getElementById("UserChannelCRUDFG.TEMP_CHANNEL_USER_ID").value;

    if (selectedChannel != "") {
        if (configuredChannels.indexOf('|') != -1 && configuredChannels.indexOf(selectedChannel) != -1 && tempChannel != "") {
            if ((document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2")) != null) {
                var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
                channelIdChileNodes[0].style.display = 'none';
            }


            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").value = tempChannel;
            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").style.display = 'none';
            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = '';
            document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CANCEL").style.display = 'none';
            document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = '';
            document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = tempChannel;

        }
    }

    if (selectedChannel == "" || configuredChannels.indexOf(selectedChannel) == -1) {
        document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
        document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").value = '';

        if (null != (document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
            var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
            channelIdChileNodes[0].style.display = '';
        }

        document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = 'none';
        document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CANCEL").style.display = 'none';
        document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = "";
        document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';

    }

}

function showMPButtons(event) {
    var selectedChannel = document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.CHANNEL_ID").value;
    var configuredChannels = document.getElementById("UpdateChannelUserIdFG.SAME_USERID_CHANNELS").value;
    var tempChannel = document.getElementById("UpdateChannelUserIdFG.TEMP_CHANNEL_USER_ID").value;

    if (selectedChannel != "") {

        if (configuredChannels.indexOf('|') != -1 && configuredChannels.indexOf(selectedChannel) != -1 && tempChannel != "") {
            var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
            channelIdChileNodes[0].style.display = 'none';
            document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.USER_PRINCIPAL").value = tempChannel;
            document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.USER_PRINCIPAL").style.display = 'none';
            document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.EDIT").style.display = '';
            document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.CANCEL").style.display = 'none';
            document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").style.display = '';
            document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").innerHTML = tempChannel;
        }
    }
    if (selectedChannel == "" || configuredChannels.indexOf(selectedChannel) == -1) {
        var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
        channelIdChileNodes[0].style.display = '';

        document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.USER_PRINCIPAL").style.display = '';
        document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.USER_PRINCIPAL").value = '';
        document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.EDIT").style.display = 'none';
        document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.CANCEL").style.display = 'none';
        document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").innerHTML = "";
        document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").style.display = 'none';

    }

}

function changeToEdit(event) {

    var tempChannel = document.getElementById("UserChannelCRUDFG.TEMP_CHANNEL_USER_ID").value;
    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").value = tempChannel;
    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CHANNEL_USER_ID").style.display = 'none';
    if (null != (document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
        var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
        channelIdChileNodes[0].style.display = 'none';
    }

    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = '';
    document.getElementById(groupletId + "\:" + "HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = tempChannel;
    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.EDIT").style.display = '';
    document.getElementById(groupletId + "\:" + "UserChannelCRUDFG.CANCEL").style.display = 'none';
    event.preventDefault();

}

function changeToMPEdit(event) {

    var tempChannel = document.getElementById("UpdateChannelUserIdFG.TEMP_CHANNEL_USER_ID").value;
    document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.USER_PRINCIPAL").value = tempChannel;
    document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.USER_PRINCIPAL").style.display = 'none';
    var channelIdChileNodes = document.getElementById(groupletId + "\:" + "DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
    channelIdChileNodes[0].style.display = 'none';

    document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").style.display = '';
    document.getElementById(groupletId + "\:" + "HREF_UpdateChannelUserIdFG.CHANNEL_USER_ID_S").innerHTML = tempChannel;
    document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.EDIT").style.display = '';
    document.getElementById(groupletId + "\:" + "UpdateChannelUserIdFG.CANCEL").style.display = 'none';
    event.preventDefault();

}

/* Reusable function for calling Events in FG */
function triggerSubmit(btnId, id) {
    var localDM = feba.domManipulator;
    localDM.trigger(localDM.getElement(localDM.getGroupletSpecificElement(btnId, LIB.__GET_GROUPLET_ID__(id))), 'click');
}
/*
 * This function is used to trigger when user click on checkbox of remember user ID in login screen
 * it will open modal screen
 */
function handleRememberUserId(event) {
    var rememberUserId = document.getElementById("AuthenticationFG.REMEMBER_USER_ID").checked;
    if (rememberUserId) {
        var position = jQuery("#remember_user_info").offset();
        jQuery("[id=rememberContentTips1]").css("display", "block");
        jQuery(".arrow-up").css("display", "block");
        document.getElementById('rememberContentTips1').style.display = "block";
        jQuery("#dialog").dialog({
            height: 300,
            width: 240,
            /**position: [event.clientX+20,event.clientY-20],*/
            draggable: false,
            resizable: false,
            show: {
                effect: 'fade',
                duration: 2000
            },
            dialogClass: 'loginPage_dialog',
            hide: {
                effect: 'fade',
                duration: 2000
            }
        });
        //dialog position controlled form below function
        jQuery(".loginPage_dialog").css('left', position.left);
        jQuery(".loginPage_dialog").css('top', position.top - 5);
        //dialog width for lower resolution
        if (viewport().width < 640) {
            jQuery(".loginPage_dialog").css('width', '118px');
            jQuery(".infopopupSeperator").css('width', '118px');
        } else {
            jQuery(".loginPage_dialog").css('width', '225px');
            jQuery(".infopopupSeperator").css('width', '225px');
        }

        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            window.event.cancelBubble = true
        }

    }
}


function updateDynamicCount(responseText, groupletId) {

    var receivedContent = responseText.content;
    var splitContent = receivedContent[7];
    var newField = splitContent[0];
    var newVal = splitContent[1];
    var countFieldId = "";
    if (groupletId) {
        var menuId = document.getElementById(groupletId + ':DYNAMIC_CONTENT_MENU__').value;
        countFieldId = menuId + '_COUNT';
    } else {
        var menuId = document.getElementById('DYNAMIC_CONTENT_MENU__').value;
        countFieldId = menuId + '_COUNT';
    }
    if (newVal == 0) {
        var element = document.getElementById(countFieldId);
        element.innerHTML = '';
        element.removeAttribute('class');
    } else {
        var element = document.getElementById(countFieldId);
        element.innerHTML = newVal;
        element.setAttribute('class', 'menu_count');
    }

    /*if(groupletId){
    	var formFieldVal = document.getElementById(groupletId+":DUMMY_COUNT__").value;
    	if(formFieldVal==0){
    		var element = document.getElementById('DUMMY_COUNT');
    		element.innerHTML='';
    		element.removeAttribute('class');
    	}else{
    		var element = document.getElementById('DUMMY_COUNT');
    		element.innerHTML=formFieldVal;
    		element.setAttribute('class','menu_count');
    	}
    }else{
    	var formFieldVal = document.getElementById("DUMMY_COUNT__").value;
    	if(formFieldVal==0){
    		var element = document.getElementById('DUMMY_COUNT');
    		element.innerHTML='';
    		element.removeAttribute('class');
    	}else{
    		var element = document.getElementById('DUMMY_COUNT');
    		element.innerHTML=formFieldVal;
    		element.setAttribute('class','menu_count');
    	}
    }*/
}


jQuery('#imageList IMG').click(function() {
    var src = jQuery(this).attr('src');
    var img = '<img src=\"' + jQuery(this).attr('src') + '\" class=\"displayImageStyle\"" />';
    jQuery('#displayDiv').html(img);
});

function fetchUserIdsFromCookie() {
    /*Commented as part of Login Screen UI issue-By Parvathy*/
    /*var userIdInCookie = document.getElementById("USER_ID_COOKIE");
    if(userIdInCookie!=null){
    	var userIdsList= userIdInCookie.value.split ('||');
    	var cookieLength = userIdsList.length;
    	if(cookieLength==1){
    	    var singleUserIdPair = userIdsList[0].split('$$');
    		if(document.getElementById("AuthenticationFG.USER_PRINCIPAL")!=null && document.getElementById("AuthenticationFG.USER_PRINCIPAL").value.trim().length==0){
    	    document.getElementById("AuthenticationFG.USER_PRINCIPAL").value=singleUserIdPair[0];
    		}
    	}
    	var userIds = [];
    	for ( var j = 0; j < userIdsList.length; j++) {
    		var combinedUserId = userIdsList[j];
    		var userIdPair = combinedUserId.split('$$');
    		userIds.push(userIdPair[0]);
    	}
    	jQuery( "#AuthenticationFG\\.USER_PRINCIPAL" ).autocomplete({
    		source: userIds
    	});
    }*/
}
//added for recon end
function submitOnComboValueChange(buttonId) {
    var localDM = feba.domManipulator;
    var newButton = localDM.getElementById(buttonId);
    localDM.trigger(newButton, "click");
}

/*
 * This function is used to trigger when user click on remember user ID in login screen
 * it will open modal screen
 */
function handleRememberUserIdInfoClick(event) {
    var position = jQuery("#remember_user_info").offset();
    jQuery("[id=rememberContentTips1]").css("display", "block");
    jQuery(".arrow-up").css("display", "block");
    document.getElementById('rememberContentTips1').style.display = "block";
    jQuery("#dialog").dialog({
        height: 300,
        width: 240,
        /**position: [event.clientX+20,event.clientY-20],*/
        draggable: false,
        resizable: false,
        show: {
            effect: 'fade',
            duration: 2000
        },
        dialogClass: 'loginPage_dialog',
        hide: {
            effect: 'fade',
            duration: 2000
        }
    });
    //dialog position controlled form below function
    jQuery(".loginPage_dialog").css('left', position.left);
    jQuery(".loginPage_dialog").css('top', position.top - 5);
    //dialog width for lower resolution
    if (viewport().width < 640) {
        jQuery(".loginPage_dialog").css('width', '118px');
        jQuery(".infopopupSeperator").css('width', '118px');
    } else {
        jQuery(".loginPage_dialog").css('width', '225px');
        jQuery(".infopopupSeperator").css('width', '225px');
    }

    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        window.event.cancelBubble = true
    }
}

jQuery("#dialog").click(function(event) {
    event.stopPropagation();
});

jQuery(document).click(function() {
    try {
        if (jQuery("#dialog").dialog('isOpen')) {
            jQuery("#dialog").dialog('close');
        }
    } catch (e) {}
});

function showFloatingBackToTop() {
    if (jQuery('*:contains(VIEW_MORE)').length > 0) {
        var offset = 700;
        //var offset = 200;
        var duration = 550;
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.back-to-top').fadeIn(duration);
            } else {
                jQuery('.back-to-top').fadeOut(duration);
            }
        });

        jQuery('.back-to-top').click(function(event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        });
    }
}

function setHomeCurrency() {

    var fgName = document.getElementById("FORMSGROUP_ID__").value;
    var homevalue = document.getElementById(fgName + ".HOME_CUR_CODE").value;
    var inscurrency = document.getElementById(fgName + ".CURRENCY");
    var instype = document.getElementById(fgName + ".INSTRUMENT_TYPE").value;

    var optionsLength = inscurrency.options.length;
    if (instype == "FD" || instype == "ALL") {
        for (var k = 0; k < optionsLength; k++) {
            if (inscurrency.options[k].value == "ALL") {
                inscurrency.options[k].selected = true;
                document.getElementById(fgName + ".CURRENCY").value = "ALL";
            }
        }
        document.getElementById(fgName + ".CURRENCY").disabled = false;
    } else {
        for (var k = 0; k < optionsLength; k++) {
            if (inscurrency.options[k].value == homevalue) {
                inscurrency.options[k].selected = true;
                document.getElementById(fgName + ".CURRENCY").value = document.getElementById(fgName + ".HOME_CUR_CODE").value;
            }
        }
        document.getElementById(fgName + ".CURRENCY").disabled = true;
    }
}

function isGroupletExecution(groupletId) {
    var isGroupletRequest = false;
    if (groupletId && (groupletId != null || groupletId != "null" || groupletId != "undefined")) {
        isGroupletRequest = true;
    }
    return isGroupletRequest;
}


function showAndHideRemarksEbanking(groupletId) {
    var elementId = 'REMARKS';
    var elementIdForDeactivate = 'DEACTIVATE_REASON';
    if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
        elementId = groupletId + ":" + "FormManagementFG.REMARKS";
    }
    if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
        elementIdForDeactivate = groupletId + ":" + "FormManagementFG.DEACTIVATE_REASON";
    }
    var deactivateResaon = document.getElementById(elementIdForDeactivate).value;
    jQuery(getParentByTagName(document.getElementById(elementId), 'P')).hide();

    if (deactivateResaon == "OTHS") {
        jQuery(getParentByTagName(document.getElementById(elementId), 'P')).show();
    }
}

function showAndHideRemarks() {

    var deactivateResaon = document.getElementById("RegisteredPrintingPreferencesCRUDFG.DEACTIVATE_REASON").value;

    jQuery(getParentByTagName(document.getElementById('RegisteredPrintingPreferencesCRUDFG.REMARKS'), 'P')).hide();

    if (deactivateResaon == "OTHS") {
        jQuery(getParentByTagName(document.getElementById('RegisteredPrintingPreferencesCRUDFG.REMARKS'), 'P')).show();
    }
}
//Added for 728807
function writeCookie(CookieName) {
    var cookieMap = getCookieMap();
    var CookieField = document.getElementById(CookieName);
    if (CookieField) {
        var CookieValue = CookieField.value;
        //Fix for ticket-733694
        /*
        cookieMap.put(CookieName, CookieValue);
        var cookieKeys = cookieMap.keyArray;
        var noOfCookies = cookieKeys.length;
        for(var i=0; i < noOfCookies; i++) {
        	var key = cookieKeys[i];
        	document.cookie = key + "=" + cookieMap.get(key) + ";";
        	}
        	*/
    }

    Set_Cookie(CookieName, CookieValue, null, "/");
}

function writeCookies() {
    var url = document.URL.split("&");
    var noOfCookies = url.length;
    //var cookieMap = new Map();
    for (var i = 0; i < noOfCookies; i++) {
        var c = url[i];
        var cookieArr = c.split('=');
        if (cookieArr[0].trim() == 'LANGUAGE_ID') {
            Set_Cookie("languageId", cookieArr[1], null, "/");
        }
        if (cookieArr[0].trim() == 'BANK_ID') {
            Set_Cookie("bankId", cookieArr[1], null, "/");
        }
        if (cookieArr[0].trim() == 'RMAuthenticationFG.LOGIN_FLAG') {
            Set_Cookie("userType", cookieArr[1], null, "/");
        }
        if (cookieArr[0].trim() == 'AuthenticationFG.LOGIN_FLAG') {
            Set_Cookie("userType", cookieArr[1], null, "/");
        }
    }

}

function getCookieMap() {
    var ca = document.cookie.split(';');
    var noOfCookies = ca.length;
    var cookieMap = new Map();
    for (var i = 0; i < noOfCookies; i++) {
        var c = ca[i];
        var cookieArr = c.split('=');
        cookieMap.put(cookieArr[0].trim(), cookieArr[1]);
    }
    return cookieMap;
}

function loadLoginPage() {
    var cookieMap = getCookieMap();
    var bankIdValue = cookieMap.get('bankId');
    var langIdValue = cookieMap.get('languageId');
    var userTypeValue = cookieMap.get('userType');
    var urlConstant = 'AuthenticationController?__START_TRAN_FLAG__=Y&FORMSGROUP_ID__=';
    var fgName = 'AuthenticationFG';
    if (userTypeValue && userTypeValue == '4') {
        fgName = 'RMAuthenticationFG';
    }
    urlConstant = urlConstant + fgName + '&__EVENT_ID__=LOAD&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&' + fgName + '.LOGIN_FLAG=';
    var sBankIDConstant = '&BANK_ID=';
    var sLanguageIDConstant = '&LANGUAGE_ID=';
    var loginFlag = 1;
    switch (userTypeValue) {
        case 4:
            loginFlag = 2;
            break;
        default:
            loginFlag = 1;
    }
    document.location.href = urlConstant + loginFlag + sBankIDConstant + bankIdValue + sLanguageIDConstant + langIdValue;
}

function handleDownloadCallBack(groupletid) {
    document.getElementById(groupletid + ":ACKNOWLEDGE").removeAttribute('disabled');
}
/** Added for Bank User channel Linkage - Start **/
function changeToCancelRM(event) {
    //document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").value = "";
    if (null != (document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
        var channelIdChileNodes = document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
        channelIdChileNodes[0].style.display = '';
    }
    document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").value = '';
    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';
    document.getElementById("UserChannelCRUDFG.EDIT").style.display = 'none';
    document.getElementById("UserChannelCRUDFG.CANCEL").style.display = '';
    event.preventDefault();

}



var RMvisited = 0;

function hideSameUserIdButtonsRM() {

    if (RMvisited == 0) {

        RMvisited = 1;
        var selectedChannel = "";
        try {
            selectedChannel = document.getElementById("UserChannelCRUDFG.CHANNEL_TYPE").value;
        } catch (e) {
            selectedChannel = "update";
        }

        var configuredChannels = document.getElementById("UserChannelCRUDFG.SAME_USERID_CHANNELS").value;

        var channelUserId = document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").value;
        var tempChannelUserId = document.getElementById("UserChannelCRUDFG.TEMP_CHANNEL_USER_ID").value;


        if (selectedChannel != "") {
            if (configuredChannels.indexOf('|') != -1 && configuredChannels.indexOf(selectedChannel) != -1 && channelUserId != "") {
                if ((document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2")) != null) {
                    var channelIdChileNodes = document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
                    channelIdChileNodes[0].style.display = 'none';
                }

                if (tempChannelUserId != channelUserId) {
                    document.getElementById("UserChannelCRUDFG.EDIT").style.display = 'none';
                    document.getElementById("UserChannelCRUDFG.CANCEL").style.display = '';
                    document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
                    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").value = '';
                    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';
                } else {

                    document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = 'none';
                    document.getElementById("UserChannelCRUDFG.EDIT").style.display = '';
                    document.getElementById("UserChannelCRUDFG.CANCEL").style.display = 'none';
                    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = '';
                    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = channelUserId;
                }


            }
        }


        if ((selectedChannel == 'update') && configuredChannels.indexOf(selectedChannel) == -1) {

            document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = 'none';
            if (null != (document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
                var channelIdChileNodes = document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
                channelIdChileNodes[0].style.display = '';
            }
            document.getElementById("UserChannelCRUDFG.EDIT").style.display = '';
            document.getElementById("UserChannelCRUDFG.CANCEL").style.display = 'none';
            document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").value = channelUserId;
            document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = channelUserId;
            document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = '';

        } else if (selectedChannel == "" || configuredChannels.indexOf(selectedChannel) == -1) {

            document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
            if (null != (document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
                var channelIdChileNodes = document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
                channelIdChileNodes[0].style.display = '';
            }
            document.getElementById("UserChannelCRUDFG.EDIT").style.display = 'none';
            document.getElementById("UserChannelCRUDFG.CANCEL").style.display = 'none';

            document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = "";
            document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';

        }
    }
}



function showButtonsRM(event) {
    var selectedChannel = document.getElementById("UserChannelCRUDFG.CHANNEL_TYPE").value;
    var configuredChannels = document.getElementById("UserChannelCRUDFG.SAME_USERID_CHANNELS").value;
    var tempChannel = document.getElementById("UserChannelCRUDFG.TEMP_CHANNEL_USER_ID").value;

    if (selectedChannel != "") {

        if (configuredChannels.indexOf('|') != -1 && configuredChannels.indexOf(selectedChannel) != -1 && tempChannel != "") {

            if ((document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2")) != null) {
                var channelIdChileNodes = document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
                channelIdChileNodes[0].style.display = 'none';
            }
            document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").value = tempChannel;
            document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = 'none';
            document.getElementById("UserChannelCRUDFG.EDIT").style.display = '';
            document.getElementById("UserChannelCRUDFG.CANCEL").style.display = 'none';
            document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = '';
            document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = tempChannel;

        }
    }
    if (selectedChannel == "" || configuredChannels.indexOf(selectedChannel) == -1) {

        document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = '';
        document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").value = '';
        if (null != (document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
            var channelIdChileNodes = document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
            channelIdChileNodes[0].style.display = '';
        }
        document.getElementById("UserChannelCRUDFG.EDIT").style.display = 'none';
        document.getElementById("UserChannelCRUDFG.CANCEL").style.display = 'none';
        document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = "";
        document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = 'none';

    }

}


function changeToEditRM(event) {

    var tempChannel = document.getElementById("UserChannelCRUDFG.TEMP_CHANNEL_USER_ID").value;

    document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").value = tempChannel;
    document.getElementById("UserChannelCRUDFG.CHANNEL_USER_ID").style.display = 'none';
    if (null != (document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2"))) {
        var channelIdChileNodes = document.getElementById("DataEntry_LeftContainer_Stage39.Ra3.C2").childNodes;
        channelIdChileNodes[0].style.display = 'none';
    }
    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").style.display = '';
    document.getElementById("HREF_UserChannelCRUDFG.CHANNEL_USER_ID_S").innerHTML = tempChannel;
    document.getElementById("UserChannelCRUDFG.EDIT").style.display = '';
    document.getElementById("UserChannelCRUDFG.CANCEL").style.display = 'none';
    event.preventDefault();

}

function handleMultiListingInLnModal(groupletId) {
    if (jQuery('#MODAL_VIEW_CONTAINER').find('table').length > 1) {
        jQuery(jQuery('.widgetPaginationFooterNextGenBorderTop .widgetFooterleft_new')[0]).addClass('heightReduced')
    }
}


/** Added for Bank User channel Linkage - End **/


// Raviraj -- added function to handle UX2 to next gen jump & vice versa
function handleUX2toNextGenPageJumps(groupletId) {
    console.log("inside handleux2nextgen code" + groupletId);
    if (jQuery('.pageLeftContainer').length == 0) {
        jQuery('.container-large').addClass('width100Container');
        jQuery('.container-xtrasmall').addClass('hideRHSWidgets');
        //raviraj
        if (document.head) {
            for (i = 0; i < document.head.childNodes.length; i++) {
                if (document.head.childNodes[i] && jQuery(document.head.childNodes[i]).attr('href')) {
                    var currE = jQuery(document.head.childNodes[i]).attr("href");
                    if (currE.indexOf("new_style_HW.css") != -1) {
                        var hrefTobeChanged = jQuery(document.head.childNodes[i]).attr("href").replace("new_style_HW", "new_style");
                        jQuery(document.head.childNodes[i]).attr("href", hrefTobeChanged)
                    }
                }
            }
        } else {
            for (i = 0; i < document.getElementsByTagName('head')[0].childNodes.length; i++) {
                if (document.getElementsByTagName('head')[0].childNodes[i] && jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr('href')) {
                    var currE = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href");
                    if (currE.indexOf("new_style_HW.css") != -1) {
                        var hrefTobeChanged = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href").replace("new_style_HW", "new_style");
                        jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href", hrefTobeChanged);
                    }
                }
            }

        }

        //raviraj
    } else {
        //raviraj

        if (document.head) {
            for (i = 0; i < document.head.childNodes.length; i++) {
                if (document.head.childNodes[i] && jQuery(document.head.childNodes[i]).attr('href')) {
                    var currE = jQuery(document.head.childNodes[i]).attr("href");
                    if (currE.indexOf("new_style.css") != -1) {
                        var hrefTobeChanged = jQuery(document.head.childNodes[i]).attr("href").replace("new_style", "new_style_HW");
                        jQuery(document.head.childNodes[i]).attr("href", hrefTobeChanged)
                    }
                }
            }
        } else {
            for (i = 0; i < document.getElementsByTagName('head')[0].childNodes.length; i++) {
                if (document.getElementsByTagName('head')[0].childNodes[i] && jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr('href')) {
                    var currE = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href");
                    if (currE.indexOf("new_style.css") != -1) {
                        var hrefTobeChanged = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href").replace("new_style", "new_style_HW");
                        jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href", hrefTobeChanged);
                    }
                }
            }

        }

        setTimeout(function() {
            jQuery('.container-large').removeClass('width100Container');
            jQuery('.container-xtrasmall').removeClass('hideRHSWidgets');
            handleRHSAlignment(groupletId);
        }, 1000);

        //raviraj

    }
}

function handleCreateFundingReq(groupletId) {


    jQuery("[id='" + groupletId + ":FormManagementFG.PUR_ORG_LIST_STRING']").trigger('click');
}

function selectImagePhaseDetails(index, arrayLength) {

    document.getElementById("PersonalAssuranceFG.SELECTED_INDEX" + index).checked = true;
    for (var j = 0; j < arrayLength; j++) {
        document.getElementById("image_" + j).parentNode.parentNode.className = "m_imagetable_td";
    }
    document.getElementById("image_" + index).parentNode.parentNode.className = "m_imagetable_td_selected";
}


function handleLangIdChange(groupletId) {
    console.log("inside handleLangIdChange code1" + groupletId);
    if (jQuery('.pageLeftContainer').length > 0) {
        console.log("inside handleLangIdChange code2" + groupletId);

        if (document.head) {
            for (i = 0; i < document.head.childNodes.length; i++) {
                if (document.head.childNodes[i] && jQuery(document.head.childNodes[i]).attr('href')) {
                    console.log("inside handleLangIdChange index:" + i);
                    var currE = jQuery(document.head.childNodes[i]).attr("href");
                    console.log("inside handleLangIdChange currE:" + currE);
                    index = currE.indexOf("L00");
                    existingLangId = currE.substring(index + 1, index + 4);
                    if (feba.domManipulator.getCookie("languageId") != '') {
                        currentLangId = feba.domManipulator.getCookie("languageId");
                        console.log("inside handleLangIdChange currentLangId:" + currentLangId);
                        console.log("inside handleLangIdChange existingLangId:" + existingLangId);
                        if (currentLangId != existingLangId) {
                            if (currE.indexOf(".css") != -1) {
                                var hrefTobeChanged = jQuery(document.head.childNodes[i]).attr("href").replace(existingLangId, currentLangId);
                                jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href", hrefTobeChanged);
                                console.log("inside handleLangIdChange currE has changed..");
                                var currE1 = jQuery(document.head.childNodes[i]).attr("href");
                                console.log("inside handleLangIdChange after replace:" + currE1);
                            }
                        }
                    }


                }
            }
        } else {
            for (i = 0; i < document.getElementsByTagName('head')[0].childNodes.length; i++) {
                if (document.getElementsByTagName('head')[0].childNodes[i] && jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr('href')) {
                    var currE = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href");

                    console.log("inside handleLangIdChange currE:" + currE);
                    index = currE.indexOf("L00");
                    existingLangId = currE.substring(index + 1, index + 4);
                    if (feba.domManipulator.getCookie("languageId") != '') {
                        currentLangId = feba.domManipulator.getCookie("languageId");
                        console.log("inside handleLangIdChange currentLangId:" + currentLangId);
                        console.log("inside handleLangIdChange existingLangId:" + existingLangId);
                        if (currentLangId != existingLangId) {
                            if (currE.indexOf(".css") != -1) {

                                var hrefTobeChanged = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href").replace(existingLangId, currentLangId);

                                jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href", hrefTobeChanged);
                                console.log("inside handleLangIdChange currE has changed..");
                                var currE1 = jQuery(document.head.childNodes[i]).attr("href");
                                console.log("inside handleLangIdChange after replace:" + currE1);
                            }
                        }
                    }

                }
            }


        }
    }
}
/*
This function is added to remove js error for more actions in TFIN. Actual function could not be found.
*/
function setcomboChangeValueWithNavigationFormChange(selectedValue) {}

function IPOBidType1(groupletId) {

    if (groupletId == null || groupletId == "null" || groupletId == undefined) {
        groupletId = LIB.__GET_CURRENT_GROUPLET_ID__();
    }
    //alert("12121212");
    var counter = 0;
    var elementId1 = "IPOManagementFG.CUT_OFF_PRICE";
    if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != undefined) {
        elementId1 = "HREF_" + groupletId + ":" + elementId1;
    } else {
        elementId1 = "HREF_" + elementId1;
    }
    //var bidsIpo = feba.domManipulator.getGroupletSpecificElement("BidsPerIpo",groupletId);
    var bidsIpo = document.getElementById("BidsPerIpo");
    var bidPerIpo = feba.domManipulator.getAttribute(bidsIpo, "value");

    //var bidPerIpo= document.getElementById("BidsPerIpo").value;

    while (Number(counter) < Number(bidPerIpo)) {
        var bidTypeId = feba.domManipulator.getGroupletSpecificElement("IPOManagementFG.BID_PRICE_TYPE_ARRAY[" + counter + "]", groupletId);
        var bidTypeVal = feba.domManipulator.getAttribute(bidsIpo, "value");
        var priceValueId = feba.domManipulator.getGroupletSpecificElement("IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]", groupletId);
        var priceValue = feba.domManipulator.getAttribute(priceValueId, "value");
        if (bidTypeVal == "CUTV") {
            priceValue = feba.domManipulator.getElementById(elementId1)[0].innerHTML;
            feba.domManipulator.setAttribute(feba.domManipulator.getGroupletSpecificElement("IPOManagementFG.PRICE_VALUE_ARRAY[" + counter + "]", groupletId), "disabled", "true");
        }
        counter = counter + 1;
    }
}

function getErrorHtmlUX4(formattedError, groupletId) {

    var errorHtml = "";
    var bgColourwithwidth = "greenbgwithwidth";
    var bgColour = "greenbg";
    var bgTopLeft = "redtopleft";
    var bgTopRight = "redtopright";
    var bgBottomLeft = "redbottomleft";
    var bgBottomRight = "redbottomright";
    var parentTableClass = "widgetErrorDisplayHw";
    if ("null" != groupletId && undefined != groupletId) {
        if (jQuery('#' + groupletId).parent().parent().parent().hasClass('nextGenUX4')) {

            formattedError = formattedError.replace('errorCodeWrapper', '');
            formattedError = formattedError.replace('<div class="greenbg">', '<div id=\"calErrWrapper\" role = \"//alert\" class=\"errorContentWrapper greenbg" >')
            formattedError = formattedError.replace('<div role= "alert" id="MessageDisplay_TABLE"class="section" >', '');
            formattedError = formattedError.replace('<div class="">', '');

            errorHtml = errorHtml + ("<div id=\"MessageDisplay_TABLE\" class=\" " + parentTableClass + "\" aria-live=\"assertive\" role=\"alert\">");
            errorHtml = errorHtml + ("<div id=\"wrapperError\" class=\"  positionrelative\" >");
            errorHtml = errorHtml + ("<p class=\"errordisplaypulldown\" data-messagemode=\"single\" data-role=\"down\">");
            errorHtml = errorHtml + ("<span class=\"errordisplaywidgetright\">");
            errorHtml = errorHtml + ("<img id=\"" + "errorDisplayPullArrow" + "\" src=\"L001/consumer/images/db_icons_info_bar_arow_down.png\" onClick=\"toggleErrorMessage(this);\" alt=\"Click to view more\" title=\"Click to view more\" class=\"absmiddle arrowtoggle\"/>");
            errorHtml = errorHtml + ("<img src=\"L001/consumer/images/db_icons_info_bar_close.png\" onClick=\"closeErrorMessage(this);\" alt=\"Click to view more\" title=\"Click to view more\" class=\"absmiddle\"/>");
            errorHtml = errorHtml + ("</span>");
            errorHtml = errorHtml + ("</p>");
            errorHtml = errorHtml + ("<div  class=\"" + bgColourwithwidth + "\">");
            errorHtml = errorHtml + ("<div  class=\"" + bgColourwithwidth + "\">");
            errorHtml = errorHtml + ("<div class=\"errorDisplayDiv width100percent\">");
            errorHtml = errorHtml + formattedError;
            formattedError = errorHtml;
        }
    }
    return formattedError;

}
/* Fix for call id 645188 starts */
function clearRuleFields(val, container1, container2, idType) {

    clearSearchPanelFields(val, container1, idType);
    clearSearchPanelFields(val, container2, idType);

}
/*Fix for call id 645188 ends*/
/*function added to handle combobox in below 480 resolution where combo boxes dropdown panel opening anywhere in screen because of zoom property.*/
function handleComboboxSmartphone(groupletId) {
    if (jQuery('#mobileFlag').val() != 'Y') {

        if (viewport().width < 480) {

            //	jQuery('.ui-autocomplete').css('position','static');

            //jQuery('.ui-autocomplete').addClass('masterGroupeltTitlehideElement');

            //		setTimeout(function(){
            jQuery('#' + groupletId).find('.ui-autocomplete').addClass('masterGroupeltTitlehideElement');
            var arr = jQuery('#' + groupletId).find('.ui-combobox-toggle');
            for (i = 0; i < arr.length; i++) {
                var curElem = arr[i];
                jQuery(curElem).trigger('click');
            }

            //   jQuery("[id$='_comboButton']").trigger('click');
            //		},500);
            //		setTimeout(function(){
            var arr = jQuery('#' + groupletId).find('.ui-combobox-toggle');
            for (i = 0; i < arr.length; i++) {
                var curElem = arr[i];
                jQuery(curElem).trigger('click');

                if (i == arr.length - 1) {
                    var elem = curElem.id;
                    //  			feba.domManipulator.getElementById(elem).trigger('click');
                    document.activeElement.blur();
                    jQuery('#BrdCrumbNImg').focus();
                    jQuery('html, body').animate({
                        scrollTop: jQuery('#BrdCrumbNImg').offset().top
                    }, 0);
                }
            }
            jQuery('#' + groupletId).find('.ui-autocomplete').addClass('masterGroupeltTitlehideElement');
            jQuery('#' + groupletId).find('.ui-autocomplete').removeClass('masterGroupeltTitlehideElement');
            //		},500);

        }

    }
}
// added for call id : 668710 - starts
function checkRemarksMandatory(elementId, groupletId) {
    var id = groupletId + ":" + elementId;
    clearError(id);
    var remarks = feba.domManipulator.getGroupletSpecificElement(elementId, groupletId).value;
    if (remarks.length == 0) {
        var msg = getMessage("RemarksCheck");
        displayError(msg, id);
        return false;

    } else {
        return true;
    }
}
// added for call id : 668710 - ends
function onChangeValue(value, groupletId) {


    if (value == "S") {

        var elemnt = groupletId + ":FormManagementFG.START_CHEQUE_NUMBER";
        var elemnt1 = groupletId + ":FormManagementFG.END_CHEQUE_NUMBER";
        var elemnt2 = groupletId + ":FormManagementFG.CHEQUE_NUMBER";

        jQuery("[id='" + elemnt + "']").addClass('stopchequedisable')
        jQuery("[id='" + elemnt1 + "']").addClass('stopchequedisable')
        jQuery("[id='" + elemnt2 + "']").removeClass('stopchequedisable')

        document.getElementById(groupletId + ":FormManagementFG.START_CHEQUE_NUMBER").disabled = true;
        document.getElementById(groupletId + ":FormManagementFG.END_CHEQUE_NUMBER").disabled = true;
        document.getElementById(groupletId + ":FormManagementFG.CHEQUE_NUMBER").disabled = false;

    } else if (value == "M") {
        var elemnt = groupletId + ":FormManagementFG.START_CHEQUE_NUMBER";
        var elemnt1 = groupletId + ":FormManagementFG.END_CHEQUE_NUMBER";
        var elemnt2 = groupletId + ":FormManagementFG.CHEQUE_NUMBER";

        jQuery("[id='" + elemnt + "']").removeClass('stopchequedisable');
        jQuery("[id='" + elemnt1 + "']").removeClass('stopchequedisable');
        jQuery("[id='" + elemnt2 + "']").addClass('stopchequedisable');
        document.getElementById(groupletId + ":FormManagementFG.CHEQUE_NUMBER").disabled = true;
        document.getElementById(groupletId + ":FormManagementFG.START_CHEQUE_NUMBER").disabled = false;
        document.getElementById(groupletId + ":FormManagementFG.END_CHEQUE_NUMBER").disabled = false;


    }
}

function clickGeneratePdf(groupletId) {
    var grouplet = groupletId;
    if (groupletId && groupletId != "NULL") {
        var localDM = feba.domManipulator;
        var reportVal = "5";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById(grouplet + ":" + "GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    } else {
        var localDM = feba.domManipulator;
        var reportVal = "5";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById("GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    }

}

function clickGenerateXls(groupletId) {
    var grouplet = groupletId;
    if (groupletId && groupletId != "NULL") {
        var localDM = feba.domManipulator;
        var reportVal = "4";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById(grouplet + ":" + "GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    } else {
        var localDM = feba.domManipulator;
        var reportVal = "4";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById("GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    }

}

function clickGenerateCsv(groupletId) {
    var grouplet = groupletId;
    if (groupletId && groupletId != "NULL") {
        var localDM = feba.domManipulator;
        var reportVal = "3";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById(grouplet + ":" + "GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    } else {
        var localDM = feba.domManipulator;
        var reportVal = "3";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById("GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    }

}

function clickGenerateTxt(groupletId) {
    var grouplet = groupletId;
    if (groupletId && groupletId != "NULL") {
        var localDM = feba.domManipulator;
        var reportVal = "7";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById(grouplet + ":" + "GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    } else {
        var localDM = feba.domManipulator;
        var reportVal = "7";
        document.getElementById(grouplet + ":" + "TransactionHistoryFG.OUTFORMAT").value = reportVal;
        var newButton = localDM.getElementById("GENERATE_REPORT");
        localDM.trigger(newButton, "click");
    }

}

function handleAddFav(event, mnuId) {
    var tempMnuID = 'FavouritesFG.FVT_MNU';

    jQuery("[id='" + tempMnuID + "']").val(mnuId);
    jQuery('#PageConfigurationMaster_W45__1\\:ADD_QUICKLINK').trigger('click');
}


function handleRemFav(event, mnuId1) {
    var tempMnuID1 = 'FavouritesFG.SAVED_MNU';
    jQuery("[id='" + tempMnuID1 + "']").val(mnuId1);
    jQuery('#PageConfigurationMaster_W45__1\\:REMOVE_QUICKLINK').trigger('click');
}

function showHideFvtLink(flg) {

    if (flg == "REM") {

        jQuery("[id$='Action.REMOVE_QUICKLINK']").parent().parent().hide();

        jQuery("[id$='Action.ADD_QUICKLINK']").parent().parent().addClass('rakFavSpan').show();

    } else if (flg == "SET") {

        jQuery("[id$='Action.REMOVE_QUICKLINK']").parent().parent().addClass('rakFavSpan').show();

        jQuery("[id$='Action.ADD_QUICKLINK']").parent().parent().hide();



    }

    //setFavLink();

}