//Variables from CXPS
var docObj = null;
var url = "EventHandlerServlet";

/* The i-Pad Safari iOS5 is not responding cache directives.Hence, browser Back button is not working 
due to page caching.If the requested page is from the browser cache, this function will try to reload 
the page resulting a form id validation failure at the server side.Thus,the page caching issue will be 
serviced. Same has been introduced for i-Phone and i-Pod also.*/
//This is required only for the Safari browser of i-Pad.
if ((navigator.userAgent.indexOf("Safari") != -1) &&
    ((navigator.userAgent.indexOf("iPad") != -1) || (navigator.userAgent.indexOf("iPhone") != -1) || (navigator.userAgent.indexOf("iPod") != -1)) &&
    ((navigator.userAgent.indexOf("OS 7_0") == -1) || (navigator.userAgent.indexOf("OS 8_0") == -1) ||
        (navigator.userAgent.indexOf("OS 7_0_4") == -1) || (navigator.userAgent.indexOf("OS 7_1_1") == -1) ||
        (navigator.userAgent.indexOf("OS 7_1_2") == -1) || (navigator.userAgent.indexOf("OS 8_0_2") == -1) ||
        (navigator.userAgent.indexOf("OS 8_1") == -1) || (navigator.userAgent.indexOf("OS 8_1_1") == -1)
    )) {
    window.onpageshow = function(evt) {
        /* Download Report opens in the same URL as that of the application. So, for this scenario alone,
        browser Back button will be enabled as of now.*/
        if ((document.getElementById("GENERATE_REPORT") != null) && (typeof(document.getElementById("GENERATE_REPORT")) != "undefined")) {
            var dwnldRepVal = document.getElementById("GENERATE_REPORT").value;
        }
        if ((evt.persisted) && !(dwnldRepVal == "OK")) {
            //Load the page again.This will result in an exception for violating form id validation.
            window.location.reload();
        }
    }
}
jQuery(document).ready(function() {

    if (null != document.getElementById('bankId') && null != document.getElementById('cxpsUserId') && null != document.getElementById('corpId')) {
        var bankId = document.getElementById('bankId').value;
        var userId = document.getElementById('cxpsUserId').value;
        var corpId = document.getElementById('corpId').value;
        if ('Y' == document.getElementById('ENABLE_CXPS').value) {
            register('EBGCD', "params", bankId, userId, corpId, paintFT);
        }
    }
    //binding element with encryption flag value as true to encrypt values		
    // Modified by Piyasha for JS Encryption as a part of E&Y Fixes Recon
    // Modified by Piyasha for MITM FT Issue
    //Surej for JS upgrade test if(LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "password").length || feba.domManipulator.getElement(":text:'[encryptionRequired=true]'").length){
    //if(LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "password").length || feba.domManipulator.getElement(encryptionRequired=true).length){
    if (LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "password").length || jQuery('[encryptionRequired="true"]').length > 0) {
        feba.domManipulator.bind(LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "submit"), 'click', '', function() {
            var isPortal = false;
            var groupletId = null;
            if (isPortalId(this.id)) {
                isPortal = true;
                var tempVar = this.id.split(Constants.GROUPLET_ELEMENT_SEPERATOR);
                groupletId = tempVar[0];
                disableButton(this.id, groupletId, isPortal);

            } else {
                disableButton(this.id, groupletId, isPortal);

            }
            encryptionRequired = false;
            return encryptValues(groupletId, isPortal);
        });
    }

    //for disabling cut, copy and paste operations on the password fields in any page
    feba.domManipulator.disableCutCopyPaste(null);

    //for showing water mark for all the text box fields in any page


    feba.js.watermark.showWatermark();
    if (LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "text").length) {
        feba.domManipulator.bind(
            LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "submit"), 'click', '',
            function() {
                feba.js.watermark.clearWatermark(jQuery('input[type="text"]'));
            });
    }
    feba.domManipulator.bind(
        LIB.__GET_ELEMENT_BY_ATTRIBUTE__("type", "reset"), 'click', '',
        function(event) {
            this.form.reset();
            feba.js.watermark.preserveWatermark(event);
        });
    //handle calendar opening with keyboard
    feba.js.handleCalendarWithKey();
});

/**
 * Checks if the id is of the form "PortalWindowId:XXXXXX::BBBBB::CCCCC" it will return true
 * if it is of the form "XXXXXX::BBBB::CCCC" it will return false
 * @param id
 * @returns boolean
 */
var isPortalId = function(id) {
    var firstIndex = id.indexOf(Constants.GROUPLET_ELEMENT_SEPERATOR);
    if (firstIndex == -1) {
        return false;
    }
    var indexAfterSeperator = firstIndex + 1;
    var nextInstanceOfSeperator = id.indexOf(Constants.GROUPLET_ELEMENT_SEPERATOR, indexAfterSeperator);
    if (indexAfterSeperator == nextInstanceOfSeperator) {
        return false;
    } else {
        return true;
    }
}

// Added as an API for watermark check : Checks if its a watermark value or not
/*var isWatermarkValue = function(element){
	var col = jQuery(element).css('color');
	if ((element.title == element.value) && ((col == 'rgb(204, 204, 204)') || (col == '#cccccc'))) {
		return true;
		
	}else{
		return false;
	}
	
}*/

var paintFT = function() {
    var action = docObj.getContextAction();
    var lnk = docObj.getContextContentLink();
    var details = docObj.getContextDetails();
    var cxpsReturnedContextValue = docObj.getContext();
    document.getElementById('RECEIVED_RESPONSE').value = cxpsReturnedContextValue;
}

function submitRejectRequestToCxps() {
    var receivedResponse = document.getElementById('RECEIVED_RESPONSE').value;
    if (receivedResponse == "SERVICE") {
        submitRejectRequestToCxpsForInitiatePayment();
    } else if (receivedResponse == "OPPORTUNITY") {
        submitRejectRequestToCxpsForDepositeModelling();
    } else if (receivedResponse == "MORECREDIT") {
        submitRejectRequestForCCLimitIncOffToCxps();
    } else if (receivedResponse == "NEWCARD_BILLPAY") {
        submitRejectRequestToCxpsHighValueBillPmntToCxps();
    } else if (receivedResponse == "NEWCARD_LOAN") {
        submitRejectRequestForLoanOfferToCxps();
    }
}


// Below function for Posting Request to CXPS on Accept Option Selection for Initiate Payment
function postAcceptRequestForInitiatePaymentToCxps() {
    var postData = new Object();
    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format)   
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    corpId = bankId + "_" + corpId + "_" + userId;

    //var payeeNickName = document.getElementById('counterPartyNickName').value;
    var payeeNickName = docObj.getChildOfDetails("payeeAccount");

    var detailsValue = "<desc>baby sitter</desc><payeeAccount>" + payeeNickName + "</payeeAccount>";
    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=RecurringPayment-Registration" + "&business_intent=recurring payment" + "&details=" + detailsValue + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=ACCEPT" + "&USER=" + userId + "&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}

// Below function for Posting Request to CXPS on Accept Option Selection for Term Deposite
function postAcceptRequestForDepositeAccountToCxps() {
    var postData = new Object();
    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format)   
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    corpId = bankId + "_" + corpId + "_" + userId;

    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=TermDeposit-Offer" + "&business_intent=term deposit calculation" + "&details=term deposit calculation" + "&cust_id=" + corpId + "&what=ACCEPT" + "&timeStamp=" + timeStamp + "&USER=" + userId + "&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}

function submitRejectRequestToCxpsForDepositeModelling() {

    //Hiding the fields in JSP
    var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    setDisplay("showForm4", "block");
    if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
        setVisibility("DBTermDepositCalc_STATIC_CX:ACCEPTD", "hidden");
        setVisibility("DBTermDepositCalc_STATIC_CX:REJECT", "hidden");
    } else {
        setVisibility("RetailUserDashboard_W3__1:ACCEPTD", "hidden");
        setVisibility("RetailUserDashboard_W3__1:REJECT", "hidden");
    }

    if ('Y' == document.getElementById('CXPS_ENABLE_JS_FLOW').value) {
        setDisplay("showForm2", "none");
        if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
            setVisibility("DBTermDepositCalc_STATIC_CX:ACCEPTI", "hidden");
            setVisibility("DBTermDepositCalc_STATIC_CX:ACCEPT_LNACCT", "hidden");
            setVisibility("DBTermDepositCalc_STATIC_CX:ACCEPT_FUNTXF", "hidden");
            setVisibility("DBTermDepositCalc_STATIC_CX:ACCEPT_BILLPYMTHILIMIT", "hidden");
        } else {
            var spanz = document.getElementsByTagName('span');
            for (var j = 0; j < spanz.length; j++) {
                var spanToHide = spanz[j].id;
                if (spanToHide.indexOf("RetailUserDashboard_W3") != -1) {
                    if (spanToHide.indexOf(":span_ACCEPTI") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPTD") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPT_LNACCT") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPT_FUNTXF") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPT_BILLPYMTHILIMIT") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_REJECT") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                }
            }
        }
    } else {
        setDisplay("showForm1", "none");
    }

    submitRejectRequest("TermDeposit-Offer", "term deposit calculation", "term deposit calculation", "IB");
}


function submitRejectRequestToCxpsForInitiatePayment() {


    //Hiding the fields in JSP
    var formgroupName = document.getElementById('FORMSGROUP_ID__').value;

    setDisplay("showForm1", "none");
    setDisplay("showForm4", "block");


    if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
        setVisibility("NewPayment_STATIC_CX:ACCEPTI", "hidden");
        setVisibility("NewPayment_STATIC_CX:REJECT", "hidden");
    } else {

        setVisibility("RetailUserDashboard_W3__1:ACCEPTI", "hidden");
        setVisibility("RetailUserDashboard_W3__1:REJECT", "hidden");
    }

    if ('Y' == document.getElementById('CXPS_ENABLE_JS_FLOW').value) {
        if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
            setVisibility("NewPayment_STATIC_CX:ACCEPTD", "hidden");
            setVisibility("NewPayment_STATIC_CX:ACCEPT_LNACCT", "hidden");
            setVisibility("NewPayment_STATIC_CX:ACCEPT_FUNTXF", "hidden");
            setVisibility("NewPayment_STATIC_CX:ACCEPT_BILLPYMTHILIMIT", "hidden");
        } else {
            var spanz = document.getElementsByTagName('span');
            for (var j = 0; j < spanz.length; j++) {
                var spanToHide = spanz[j].id;
                if (spanToHide.indexOf("RetailUserDashboard_W3") != -1) {
                    if (spanToHide.indexOf(":span_ACCEPTI") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPTD") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPT_LNACCT") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPT_FUNTXF") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_ACCEPT_BILLPYMTHILIMIT") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                    if (spanToHide.indexOf(":span_REJECT") != -1) {
                        setVisibility(spanToHide, "hidden");
                    }
                }
            }
        }
    }

    var payeeNickName = docObj.getChildOfDetails("payeeAccount");
    var detailsValue = "<desc>baby sitter</desc><payeeAccount>" + payeeNickName + "</payeeAccount>";

    submitRejectRequest("RecurringPayment-Registration", "recurring payment", detailsValue, userId);
}

// Below function will get invoked when user Accept the Offer for Credit card with discount on mobile phone Bill payement.
function postAcceptRequestForHighValueBillPmntToCxps() {
    var postData = new Object();
    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format)   
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    corpId = bankId + "_" + corpId + "_" + userId;

    //var detailsValue = "<desc>HighValueTransaction</desc>";    
    //postData = "randomnum="+(Math.floor(Math.random()*1000000) + (new Date()).getTime())+ "&business_context=HighValueTransaction -Calculation"+"&business_intent=HighValueTransaction"+"&details="+detailsValue+"&timeStamp="+timeStamp+"&cust_id="+corpId+"&what=ACCEPT"+"&USER="+userId+"&CHANNEL=INTERNAL";  
    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=HighValueTransaction -Calculation" + "&business_intent=HighValueTransaction" + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=ACCEPT" + "&USER=" + userId + "&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}

// Below function will get invoked when user Accept the Offer for Credit card Limit Increase Offer( Funds Transfer).
function postAcceptRequestForCCLimitIncOffToCxps() {
    var postData = new Object();
    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format)   
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    corpId = bankId + "_" + corpId + "_" + userId;

    //var detailsValue = "<desc>CreditCardLimit</desc>";    
    //postData = "randomnum="+(Math.floor(Math.random()*1000000) + (new Date()).getTime())+ "&business_context=CreditCardLimit -Calculation"+"&business_intent=CreditCardLimit"+"&details="+detailsValue+"&timeStamp="+timeStamp+"&cust_id="+corpId+"&what=ACCEPT"+"&USER="+userId+"&CHANNEL=INTERNAL";  
    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=CreditCardLimit -Calculation" + "&business_intent=CreditCardLimit" + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=ACCEPT" + "&USER=" + userId + "&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}

// Below function will get invoked when user Accept the Offer for loan/opening a loan account.
function postAcceptRequestForLoanOfferToCxps() {
    var postData = new Object();
    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format)   
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    corpId = bankId + "_" + corpId + "_" + userId;

    var detailsValue = "<desc>CreditCardLimit</desc>";
    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=LoanAppSubmit" + "&business_intent=LoanAppCrosssell" + "&details=" + detailsValue + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=ACCEPT" + "&USER=" + userId + "&CHANNEL=INTERNAL";
    //postData = "randomnum="+(Math.floor(Math.random()*1000000) + (new Date()).getTime())+ "&business_context=LoanAppSubmit"+"&business_intent=LoanAppCrosssell"+"&timeStamp="+timeStamp+"&cust_id="+corpId+"&what=ACCEPT"+"&USER="+userId+"&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}

// Below function will get invoked when user Rejects the Offer for Credit card with discount on mobile phone Bill payement.
function submitRejectRequestToCxpsHighValueBillPmntToCxps() {

    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    var postData = new Object();
    var url = "CxpsIBEventHandlerServlet";

    //Hiding the fields in JSP
    var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    document.getElementById('showForm6').style.display = "none";
    document.getElementById('showForm4').style.display = "block";
    if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
        document.getElementById('InitiateSingleEntryPaymentSummary_STATIC_CXPS:ACCEPTD').style.visibility = "hidden";
        document.getElementById('InitiateSingleEntryPaymentSummary_STATIC_CXPS:ACCEPTI').style.visibility = "hidden";
        document.getElementById('InitiateSingleEntryPaymentSummary_STATIC_CXPS:ACCEPT_LNACCT').style.visibility = "hidden";
        document.getElementById('InitiateSingleEntryPaymentSummary_STATIC_CXPS:ACCEPT_FUNTXF').style.visibility = "hidden";
        document.getElementById('InitiateSingleEntryPaymentSummary_STATIC_CXPS:ACCEPT_BILLPYMTHILIMIT').style.visibility = "hidden";
        document.getElementById('InitiateSingleEntryPaymentSummary_STATIC_CXPS:REJECT').style.visibility = "hidden";
    } else {
        var spanz = document.getElementsByTagName('span');
        for (var j = 0; j < spanz.length; j++) {
            var spanToHide = spanz[j].id;
            if (spanToHide.indexOf("RetailUserDashboard_W3") != -1) {
                if (spanToHide.indexOf(":span_ACCEPTI") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPTD") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_LNACCT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_FUNTXF") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_BILLPYMTHILIMIT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_REJECT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
            }
        }
    }

    // dd-mm-yyyy HH:MM:SS 
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    corpId = bankId + "_" + corpId + "_" + userId;
    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;


    var detailsValue = "<desc>HighValueTransaction</desc>";
    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=HighValueTransaction -Calculation" + "&business_intent=HighValueTransaction" + "&details=" + detailsValue + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=REJECT" + "&USER=" + userId + "&CHANNEL=INTERNAL";
    //postData = "randomnum="+(Math.floor(Math.random()*1000000) + (new Date()).getTime())+ "&business_context=HighValueTransaction -Calculation"+"&business_intent=HighValueTransaction"+"&timeStamp="+timeStamp+"&cust_id="+corpId+"&what=REJECT"+"&USER="+userId+"&CHANNEL=INTERNAL";  
    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}

/** Added for Two factor Authentication -- Start-- **/

function setcomboChangeValueWithTFAFormChange()

{
    var value = document.getElementById("FormManagementFG.AUTH_MODE").value;

    if (value == Constants.DIGITAL_MOBITOKEN) {
        jQuery("[id='DataEntry_LeftContainer_Stage39.Rb2b']").hide();

    }
    if (value == Constants.DEVICE_BASED_MOBITOKEN || value == Constants.SMS_BASED_MOBITOKEN || value == "") {
        jQuery("[id='DataEntry_LeftContainer_Stage39.Rb2b']").show();

    }


}

/** Added for Two factor Authentication-- End-- **/

function readImageforPreview(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            jQuery('#PROFILEPHOTO')
                .attr('src', e.target.result)
                .width(100)
                .height(100);

        };

        reader.readAsDataURL(input.files[0]);

    }


};



// Below function will get invoked when user Rejects the Offer for Credit card Limit Increase Offer( Funds Transfer).
function submitRejectRequestForCCLimitIncOffToCxps() {
    var postData = new Object();
    var url = "CxpsIBEventHandlerServlet";
    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    var postData = new Object();
    var url = "CxpsIBEventHandlerServlet";


    //Hiding the fields in JSP
    var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    document.getElementById('showForm3').style.display = "none";
    document.getElementById('showForm4').style.display = "block";
    if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
        document.getElementById('NewFundsTransfer_STATIC_CXPS:ACCEPTD').style.visibility = "hidden";
        document.getElementById('NewFundsTransfer_STATIC_CXPS:ACCEPTI').style.visibility = "hidden";
        document.getElementById('NewFundsTransfer_STATIC_CXPS:ACCEPT_LNACCT').style.visibility = "hidden";
        document.getElementById('NewFundsTransfer_STATIC_CXPS:ACCEPT_FUNTXF').style.visibility = "hidden";
        document.getElementById('NewFundsTransfer_STATIC_CXPS:ACCEPT_BILLPYMTHILIMIT').style.visibility = "hidden";
        document.getElementById('NewFundsTransfer_STATIC_CXPS:REJECT').style.visibility = "hidden";
    } else {
        var spanz = document.getElementsByTagName('span');
        for (var j = 0; j < spanz.length; j++) {
            var spanToHide = spanz[j].id;
            if (spanToHide.indexOf("RetailUserDashboard_W3") != -1) {
                if (spanToHide.indexOf(":span_ACCEPTI") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPTD") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_LNACCT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_FUNTXF") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_BILLPYMTHILIMIT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_REJECT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
            }
        }
    }

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format)   
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    corpId = bankId + "_" + corpId + "_" + userId;

    //var detailsValue = "<desc>CreditCardLimit</desc>";    
    //postData = "randomnum="+(Math.floor(Math.random()*1000000) + (new Date()).getTime())+ "&business_context=CreditCardLimit -Calculation"+"&business_intent=CreditCardLimit"+"&details="+detailsValue+"&timeStamp="+timeStamp+"&cust_id="+corpId+"&what=ACCEPT"+"&USER="+userId+"&CHANNEL=INTERNAL";  
    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=CreditCardLimit -Calculation" + "&business_intent=CreditCardLimit" + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=REJECT" + "&USER=" + userId + "&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}


// Below function will get invoked when user Rejects the Offer for loan/opening a loan account.
function submitRejectRequestForLoanOfferToCxps() {
    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    var postData = new Object();
    var url = "CxpsIBEventHandlerServlet";

    //Hiding the fields in JSP
    var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    document.getElementById('showForm5').style.display = "none";
    document.getElementById('showForm4').style.display = "block";
    if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
        document.getElementById('LnAccountSummary_STATIC_CXPS:ACCEPTD').style.visibility = "hidden";
        document.getElementById('LnAccountSummary_STATIC_CXPS:ACCEPTI').style.visibility = "hidden";
        document.getElementById('LnAccountSummary_STATIC_CXPS:ACCEPT_LNACCT').style.visibility = "hidden";
        document.getElementById('LnAccountSummary_STATIC_CXPS:ACCEPT_FUNTXF').style.visibility = "hidden";
        document.getElementById('LnAccountSummary_STATIC_CXPS:ACCEPT_BILLPYMTHILIMIT').style.visibility = "hidden";
        document.getElementById('LnAccountSummary_STATIC_CXPS:REJECT').style.visibility = "hidden";
    } else {
        var spanz = document.getElementsByTagName('span');
        for (var j = 0; j < spanz.length; j++) {
            var spanToHide = spanz[j].id;
            if (spanToHide.indexOf("RetailUserDashboard_W3") != -1) {
                if (spanToHide.indexOf(":span_ACCEPTI") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPTD") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_LNACCT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_FUNTXF") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_ACCEPT_BILLPYMTHILIMIT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
                if (spanToHide.indexOf(":span_REJECT") != -1) {
                    setVisibility(spanToHide, "hidden");
                }
            }
        }
    }

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format)   
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    corpId = bankId + "_" + corpId + "_" + userId;

    //var detailsValue = "<desc>CreditCardLimit</desc>";    
    //postData = "randomnum="+(Math.floor(Math.random()*1000000) + (new Date()).getTime())+ "&business_context=LoanAppSubmit"+"&business_intent=LoanAppCrosssell"+"&details="+detailsValue+"&timeStamp="+timeStamp+"&cust_id="+corpId+"&what=ACCEPT"+"&USER="+userId+"&CHANNEL=INTERNAL";  
    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=LoanAppSubmit" + "&business_intent=LoanAppCrosssell" + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=REJECT" + "&USER=" + userId + "&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
    setTimeout('Dummy()', 100);
}

function submitRejectRequest(businessContext, businessIntent, details, user) {

    var bankId = document.getElementById('bankId').value;
    var userId = document.getElementById('cxpsUserId').value;
    var corpId = document.getElementById('corpId').value;

    var postData = new Object();
    var url = "EventHandlerServlet";

    // dd-mm-yyyy HH:MM:SS 
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    if (monthValue < 10)
        monthValue = "0" + monthValue;
    if (dayValue < 10)
        dayValue = "0" + dayValue;
    if (hoursValue < 10)
        hoursValue = "0" + hoursValue;
    if (minutesValue < 10)
        minutesValue = "0" + minutesValue;
    if (secondsValue < 10)
        secondsValue = "0" + secondsValue;

    corpId = bankId + "_" + corpId + "_" + userId;
    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;

    postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=" + businessContext + "&business_intent=" + businessIntent + "&details=" + details + "&timeStamp=" + timeStamp + "&cust_id=" + corpId + "&what=REJECT" + "&USER=" + user + "&CHANNEL=INTERNAL";

    sendRequest(url + "?" + postData, null, null, 0);
}

function setVisibility(id, style) {
    document.getElementById(id).style.visibility = style;
}

function setDisplay(id, style) {
    document.getElementById(id).style.display = style;
}
// Dummy Function for Delay 
function Dummy() {}
//handle calendar opening with keyboard
feba.js.handleCalendarWithKey = function() {
    feba.domManipulator.bind(
        LIB.__GET_ELEMENT_BY_ATTRIBUTE__("data-isCalendarImg", "true"), "keypress", "",
        function(event) {
            if (event.which == 13 || event.which == 32) {
                feba.domManipulator.trigger(feba.domManipulator.getElement(this), 'click');
                event.preventDefault();
            }
        });
}