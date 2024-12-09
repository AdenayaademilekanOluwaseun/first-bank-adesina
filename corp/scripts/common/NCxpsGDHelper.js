feba.domManipulator.write('<script type="text/javascript" src="scripts/json.js"></script>');
// Prafulla_Badgujar : Ticket No : 494042 - NEBGCD.js loading is removed, because this js is being included through NFEBAJavaScripts.js.

//var GDFServlet = "GDFServlet";
//var GDFServlet = "GDFPullServlet";
var GDFServlet = "CxpsIBRequestHandlerServlet";
var docType = "Customer";
var channel = "EBANKING";
var docObj = null;

var cust_id = "";
var userName = "";

/*
register first creates the global docObj object and stores the paint function inside it.
register calls the servlet, with MODE as open(open document), with parameters params and document type as docName.
once it gets back a response(document), it sets the contents of docOb with the received xml. Then it calls the stored
paint function, which will update the UI. Then it calls the enable request which means we are listening to the changes 
in docObj at the server.
*/
function register(docName, params, bankId, userId, corpId, externalpaint) {
    var bankIdValue = bankId;
    var formgroupName = "";
    if (document.getElementById('FORMSGROUP_ID__') && document.getElementById('FORMSGROUP_ID__') != null) {
        formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    }
    var usertype = document.getElementById('usertype').value;

    if (document.getElementById(formgroupName + ".REPORTTITLE") != null) {
        if (((document.getElementById(formgroupName + ".REPORTTITLE").value == "DBModellingTypes" || document.getElementById(formgroupName + ".REPORTTITLE").value == "InitiateSingleEntryPaymentConfirmation" ||
                document.getElementById(formgroupName + ".REPORTTITLE").value == "LORRequestConfirmation") && (usertype == "1")) ||
            ((document.getElementById(formgroupName + ".REPORTTITLE").value == "ImportLCHomePage") && (usertype == "2"))) {
            sendReqToCxpsForRegister(bankIdValue, userId, corpId, usertype);
        }
    }

    var urlParams = bankIdValue + "_" + corpId + "_" + userId;
    cust_id = urlParams;

    if (docObj == null)
        docObj = new EBGCD();
    docObj.paint = externalpaint;
    if ('Y' == document.getElementById('CXPS_ENABLE_JS_FLOW').value) {

        loadFunc(userId, docName, urlParams);
    }
}

// Start: Added for Ebanking
function sendReqToCxpsForRegister(bankIdValue, userId, corpId, usertype, payeeNickName) {

    var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    var postData = new Object();
    var url = "EventHandlerServlet";

    // Set the formated value in corpId
    var corpIdForCxps = bankIdValue + "_" + corpId + "_" + userId;

    // Format the Date and Time to "dd-mm-yyyy HH:MM:SS" ( Cxps Needs date in mentioned format) 
    var currentDate = new Date();
    var monthValue = currentDate.getMonth() + 1;
    var dayValue = currentDate.getDate();
    var yearValue = currentDate.getFullYear();
    var hoursValue = currentDate.getHours();
    var minutesValue = currentDate.getMinutes();
    var secondsValue = currentDate.getSeconds();

    // To place zero in front of single digit character
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

    // format the time to CXPS accepted timeformat
    var timeStamp = dayValue + "-" + monthValue + "-" + yearValue + " " + hoursValue + ":" + minutesValue + ":" + secondsValue;
    if (document.getElementById(formgroupName + ".REPORTTITLE").value == "DBModellingTypes") {
        postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=term deposit calculation" + "&business_intent=term deposit calculation" + "&details=term deposit calculation" + "&cust_id=" + corpIdForCxps + "&what=submit" + "&timeStamp=" + timeStamp + "&USER=" + userId + "&CHANNEL=INTERNAL";
        sendRequest(url + "?" + postData, null, null, 0);
    } else if (document.getElementById(formgroupName + ".REPORTTITLE").value == "ImportLCHomePage") {
        postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=loc issuance" + "&business_intent=loc issuance" + "&details=loc issuance" + "&cust_id=" + corpIdForCxps + "&what=load" + "&timeStamp=" + timeStamp + "&USER=" + userId + "&CHANNEL=INTERNAL";
        sendRequest(url + "?" + postData, null, null, 0);
    } else if (document.getElementById(formgroupName + ".REPORTTITLE").value == "InitiateSingleEntryPaymentConfirmation" &&
        "PMT" == document.getElementById('tranType').value && "XFR" != document.getElementById('tranType').value &&
        "BIP" != document.getElementById('tranType').value) {
        var payeeNickName = document.getElementById('counterPartyNickName').value;

        var counterPartyTpe = document.getElementById('counterPartyTpe').value;
        var amountSendToCxps = document.getElementById('amountSendToCxps').value;
        var freqTyp = document.getElementById('freqTyp').value;
        //<desc>baby sitter</desc><payeeAccount>account</payeeAccount>          
        var detailsValue = "<desc>baby sitter</desc><payeeAccount>" + payeeNickName + "</payeeAccount><amount>" + amountSendToCxps + "</amount>";

        //And Send Request to CXPS only if the Counterparty is Personal Payee
        //Send Request to CXPS if the payment frequency is one time.
        if (counterPartyTpe == "P" && freqTyp == "O") {
            postData = "&business_context=baby sitter" + "&business_intent=FUNDSTRANSFER" + "&details=" + detailsValue + "&timeStamp=" + timeStamp + "&cust_id=" + corpIdForCxps + "&what=submit" + "&USER=" + userId + "&CHANNEL=INTERNAL";
            sendRequest(url + "?" + postData, null, null, 0);
        }
    } else if (document.getElementById(formgroupName + ".REPORTTITLE").value == "LORRequestConfirmation") {
        // Added condition for Loan Accounts Offer (loan / opening a loan account)
        var detailsValue = "<desc>LOR</desc><RequestId>LOR</RequestId>";
        postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=LoanAppSubmit" + "&business_intent=LoanAppCrosssell" + "&details=" + detailsValue + "&cust_id=" + corpIdForCxps + "&what=submit" + "&timeStamp=" + timeStamp + "&USER=" + userId + "&CHANNEL=INTERNAL";
        sendRequest(url + "?" + postData, null, null, 0);
    }
    // XFR condition added for posting the request for Fund Transfer
    else if (document.getElementById(formgroupName + ".REPORTTITLE").value == "InitiateSingleEntryPaymentConfirmation" && "XFR" == document.getElementById('tranType').value && "BIP" != document.getElementById('tranType').value) {
        // Added condition for Funds Transfer offer for Credit Card users(Credit Card limit increase offer) 
        var payeeNickName = document.getElementById('counterPartyNickName').value;
        var counterPartyTpe = document.getElementById('counterPartyTpe').value;
        var amountSendToCxps = document.getElementById('amountSendToCxps').value;

        var detailsValue = "<desc>CreditCardLimit</desc><payeeAccount>" + payeeNickName + "</payeeAccount><CounterPartyType>" + counterPartyTpe + "</CounterPartyType><amount>" + amountSendToCxps + "</amount>";

        postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=CreditCardLimit-Calculation" + "&business_intent=CreditCardLimit" + "&details=" + detailsValue + "&cust_id=" + corpIdForCxps + "&what=submit" + "&timeStamp=" + timeStamp + "&USER=" + userId + "&CHANNEL=INTERNAL";

        sendRequest(url + "?" + postData, null, null, 0);
    } else if (document.getElementById(formgroupName + ".REPORTTITLE").value == "InitiateSingleEntryPaymentConfirmation" &&
        "BIP" == document.getElementById('tranType').value && "XFR" != document.getElementById('tranType').value &&
        "PMT" != document.getElementById('tranType').value) {
        // High value transaction - Bill Payment
        var billerId = document.getElementById('counterPartyNickName').value; // Fetch the value of Biller Id
        var amountSendToCxps = document.getElementById('amountSendToCxps').value; // Fetch the amount to be send to CXPS
        var detailsValue = "<desc>HighValueTransaction</desc><billerid>" + billerId + "</billerid><amount>" + amountSendToCxps + "</amount>";

        postData = "randomnum=" + (Math.floor(Math.random() * 1000000) + (new Date()).getTime()) + "&business_context=HighValueTransaction-Calculation" + "&business_intent=HighValueTransaction" + "&details=" + detailsValue + "&cust_id=" + corpIdForCxps + "&what=submit" + "&timeStamp=" + timeStamp + "&USER=" + userId + "&CHANNEL=INTERNAL";

        sendRequest(url + "?" + postData, null, null, 0);
    }
}
// End: Added for Ebanking

/*
Load function calls the servlet with the params and document type PARAMS is passed as a json style string.
params should contain values for creating the specified document of type docType.
*/
function loadFunc(user, docTypeName, params) {
    userName = user;
    //docType = docTypeName;
    var syncUrl = GDFServlet + "?hostKey=" + params + "&MODE=OPEN&USER=" + userName + "&CHANNEL=" + channel;
    sendRequest(syncUrl, loadCallback, null, 0);
}

/*
loadCallback will get the response from the servlet and it sets the content of the doc with the response.
Then it calls the paint function on the docObj. Finally it sends an enable request to the servlet.
*/
function loadCallback(responseStr) {
    if ("" != responseStr) {
        docObj.gdStr = responseStr; //JSON.parse(responseStr);
        var docxmlObj = getXmlDoc(responseStr);
        docObj.setResponse(docxmlObj);
        docObj.paint();
    }
    syncFunc();
}

function removeDoc() {
    var syncUrl = GDFServlet + "?hostKey=" + cust_id + "&MODE=ENABLE&USER=" + userName + "&CHANNEL=" + channel;
    sendRequest(syncUrl, syncCallback, null, 0);
}

/*

*/
function syncFunc() {
    var syncUrl = GDFServlet + "?hostKey=" + cust_id + "&MODE=ENABLE&USER=" + userName + "&CHANNEL=" + channel;
    sendRequest(syncUrl, syncCallback, null, 0);
}

function syncCallback(response) {
    if (response == "END_SESSION") {
        logout();
    } else {
        if ("" != response) {
            docObj.gdStr = response; //JSON.parse(response);	
            var docxmlObj = getXmlDoc(response);
            docObj.setResponse(docxmlObj);
            docObj.paint();
        }
        setTimeout('syncFunc()', 7000);
        //syncFunc();
    }
}

function sendRequest(url, callback, postData, validTimeout) {
    //var req = setTimeout("createXmlHttpObject()",1500);
    var req = createXmlHttpObject();
    if (req == null) {
        return;
    }

    req.open("POST", url, true);
    //req.setParameter("DOCID",docObj.docId);
    /* The User-Agent being set in the request header causes JS error in i-Pad Safari browser. Ideally it should
    not be set in the request header(As per W3C Working Draft for XMLHttpRequest Level 2). Hence, the same has 
    been commented below. */
    //req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    expTime = new Date()
    expTime = expTime.getTime()
    expTime = expTime + 5000
    req.onreadystatechange = function() {
        if (req.readyState == 2) {
            // Read and ignore the headers for now
            try {
                var headers = req.getAllResponseHeaders();
            } catch (e) {
                // Ignore for now
            }
        }
        if (req.readyState != 4) return;

        // DONT PROCESS IF WE HAVE ASSUMED THIS REQUEST IS LOST AND STARTED A NEWe  REQ HAS BEEN CREATED
        //
        if (req.status != 200 && req.status != 304 && req.status != 0) {
            //alert("unknown status "+req.status);
            return;
        }
        if (req.status == 0) {
            return;
        }
        if (callback != null) {
            if (typeof(req.responseText) == "unknown") {
                //alert("unknown response");
                return;
            } else {
                //alert("resposeText: " + req.responseText);
                callback(req.responseText);
            }
        }
    }
    req.send(postData);
}


function createXmlHttpObject() {
    var xmlhttp = null;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

function getXmlDoc(xmlText) {
    var xmlDoc;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlText, "text/xml");
    } else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlText);
    }
    return xmlDoc;
}

function getChildNodeWithAttributeValue(parentNode, attributeName, attributeValue) {
    if (parentNode != null) {
        var childNodes = parentNode.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            var childNode = childNodes[i];
            if (childNode.attributes != null) {
                if (childNode.attributes.getNamedItem(attributeName).nodeValue == attributeValue)
                    return childNode
            } else {}
        }
    }
    return null;
}

function getNodeText(node) {
    var message;
    if (node != null) {
        if (window.ActiveXObject) {
            message = node.text;
        } else {
            message = node.textContent;
        }
    }
    return message;
}