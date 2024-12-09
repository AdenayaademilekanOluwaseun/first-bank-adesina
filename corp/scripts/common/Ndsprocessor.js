var isSignTimeStamp = false;
var buttonObj;
var isDGCT = false;
var isDGCTpushSignedDataSuccess = false;
var isDGCTdata = "";
var isDGCTcallerObj = "";
//*******************************************************************************
//
// Function to be called on button submit of Login Page when 
// "Log in using Digital Certificate" is enabled.
// At this time, hidden fields are not painted.   
// Visibility : public. 
//
function validateCertificateForLogin(callerObj) {
    buttonObj = callerObj;
    // Get the forms group ID. This will work in an ideal case. 
    var formName = document.getElementsByName("FORMSGROUP_ID__")[0].value;
    var form = document.forms[formName];
    // get the form object. 
    // Get the timestamp. 
    var timeStamp = new Date().getTime();
    // Create a hidden field called __TIMESTAMP_STRING__ inside the form. 
    var timStampField = document.getElementById(formName + "." + "__TIMESTAMP_STRING__");
    if (timStampField == null) {
        timStampField = document.createElement("input");
        timStampField.setAttribute("type", "hidden");
        timStampField.setAttribute("name", formName + "." + "__TIMESTAMP_STRING__");
        timStampField.setAttribute("id", formName + "." + "__TIMESTAMP_STRING__");
        form.appendChild(timStampField);
    }
    var certificateField = document.getElementById(formName + "." + "__CERTIFICATE__");
    if (certificateField == null) {
        // Create a hidden field called __CERTIFICATE__ inside the form.
        certificateField = document.createElement("input");
        certificateField.setAttribute("type", "hidden");
        certificateField.setAttribute("name", formName + "." + "__CERTIFICATE__");
        certificateField.setAttribute("id", formName + "." + "__CERTIFICATE__");
        form.appendChild(certificateField);
    }
    isSignTimeStamp = true;
    // Since we dont sign any data on login. We just do certificate validation.
    var signflag = false;
    return signTimeStamp(formName, timeStamp, signflag);
}

//
// This method is called from the page if DS or DC is enabled in the page. 
// Visibility : public
//
function signData(formName, eventName, callerObj) {
    buttonObj = callerObj;
    isDGCTcallerObj = callerObj;
    if (isDSEnabled(eventName)) {
        // If certificates and signature is enabled then do signing only. 
        return signDSFields(formName, eventName);
    } else if (isDigiCertEnabled(formName)) {
        // getTimestampString will ideally be created when page is painted. 
        var timStampString = new Date().getTime();
        isSignTimeStamp = true;
        // Sign only the time stamp. 
        var signflag = true;
        return signTimeStamp(formName, timStampString, signflag);
    } else {
        // It shouldn't have come here since, when both are disabled this method call doesn't happen.            
        return true;
    }
}

//
// Checks if Digital Signatures is enabled or not. 
// Visibility : private
//
function isDSEnabled(eventName) {
    if (typeof(getSignatureFields) == 'undefined' || getSignatureFields(eventName) == null || getSignatureFields(eventName) == 'undefined') {
        // If DS is enabled, this function is written.
        return false;
    } else {
        return true;
    }
}

//
// Signs the form fields that are selected for digital signature. 
// Visibility : private
//
function signDSFields(formName, eventName) {
    var sSignatureString = getSignatureString(formName, eventName);
    if (sSignatureString == false) return false;
    var signedData = doSignature(sSignatureString);
    if (signedData == false) return false;
    document.getElementById('__SIGNATURE__').value = signedData;
    return true;
}

//
// Checks if Digital Certificates are enabled or not.  
// Visibility : private
//
function isDigiCertEnabled(formName) {
    // get the field __TIMESTAMP_STRING__. If its present and yet it doesn't have a value 
    // still it's not shown null. 
    var timeStampField = document.getElementById(formName + "." + '__TIMESTAMP_STRING__');
    // If digital certificates are enabled then this function is written.
    if (timeStampField == null || timeStampField == 'undefined') {
        return false;
    } else {
        return true;
    }
    //Get the Authorization mode component
    //and check digital certificate mode is selected
    //return true if selected else false;
}
//
// Signs the __TIMESTAMP_STRING__ value and sets __CERTIFICATE__ value to encrypted value.  
// Visibility : private
//added signflag in mehtod for digital certificate login
//
function signTimeStamp(formName, timeStampString, signflag) {
    //  SignatureScriptGenerator writes this method. getTimestampString(); 
    document.getElementById(formName + "." + '__TIMESTAMP_STRING__').value = timeStampString;
    var signedData = doSignature(timeStampString);
    isDGCT = true;
    if (signedData == false) return false;
    document.getElementById(formName + "." + '__CERTIFICATE__').value = signedData;
    var newHidden = document.createElement("input");
    var name = buttonObj.name;
    var value = buttonObj.value;
    newHidden.setAttribute("type", "hidden");
    newHidden.setAttribute("name", name);
    newHidden.setAttribute("value", value);
    document.forms[0].appendChild(newHidden);
    if (signflag) {
        document.forms[0].submit();
    }
    //return true;
    return false;
}

//----------------------------------------------------------------------------------------------------//
//--------------------------- Following functions are private functions. -----------------------------//
//----------------------------------------------------------------------------------------------------//
function getSignatureString(formName, eventName) {
    var signMessage = "";
    var userFriendlyMessage = "";
    var arrSignatureFields = getSignatureFields(eventName);
    var containsArrayField = false;
    // Read configured FORM FIELD values
    for (var i = 0; i < arrSignatureFields.length; i++) {
        if (arrSignatureFields[i].type.toUpperCase() == 'BASIC') {
            // Get value of the formfield
            var sFormFieldValue = getFormFieldValue(formName, arrSignatureFields[i]);
            // Add to sign messages
            signMessage = signMessage + arrSignatureFields[i].displayName + ":";
            signMessage = signMessage + sFormFieldValue;
            signMessage = signMessage + "|";
            // Add to user friendly message			
            userFriendlyMessage = userFriendlyMessage + arrSignatureFields[i].displayName + ":";
            if (isComboField(formName, arrSignatureFields[i])) {
                userFriendlyMessage = userFriendlyMessage + getDisplayText(formName, arrSignatureFields[i]);
            } else {
                userFriendlyMessage = userFriendlyMessage + sFormFieldValue;
            }
            userFriendlyMessage = userFriendlyMessage + "|";
        } else if (arrSignatureFields[i].type.toUpperCase() == 'ARRAY') {
            containsArrayField = true;
        }
    }
    if (containsArrayField == true) {
        var signMessageForArrayFields = getSignMessageForArrayFields(eventName);
        //Add to sign message
        signMessage = signMessage + signMessageForArrayFields + "|";
        //Add to user friendly message
        userFriendlyMessage = userFriendlyMessage + signMessageForArrayFields + "|";
    }
    // Read enc user key given by the application. 
    var sEncUserKey = getEncUserKey(formName);
    if (sEncUserKey) {
        // Add to sign messages
        signMessage = signMessage + sEncUserKey;
        signMessage = signMessage + "|";
    }
    // Display user friendly message
    var displayMessage = getMessage("SignWithPrivateKey");
    displayMessage = displayMessage + "\n\n";
    displayMessage = displayMessage + userFriendlyMessage;
    displayMessage = displayMessage + "\n\n";
    if (!confirm(displayMessage)) return false;
    return signMessage;
}

function getSignMessageForArrayFields(eventName) {
    var signMessage = "";
    var recordStringArray = getRecordStrings(eventName);
    for (var i = 0; i < recordStringArray.length; i++) {
        signMessage = signMessage + "\n";
        signMessage = signMessage + recordStringArray[i].value;
    }
    return signMessage;
}

function sortByRecordStringIndex(a, b) {
    if (parseInt(a.index) < parseInt(b.index)) return -1;
    if (parseInt(a.index) > parseInt(b.index)) return 1;
    return 0;
}

function populateFinalRecStringArr(finalArr, recordStrings) {
    for (var i = 0; i < recordStrings.length; i++) {
        finalArr[finalArr.length] = recordStrings[i];
    }
    return finalArr;
}

function getRecordString(index) {
    var arrRecordStrings = getRecordStrings();
    return arrRecordStrings[index];
}

// PRIVATE function
function doSignature(signatureString) {
    var signedData = null;
    var browser = fsClientBrowser();
    // Determine type of browser and call appropriate function
    //changes done to use applet signing for all the browsers
    switch (browser) {
        case 'ns':
        case 'msie':
        case 'Chrome':
        case 'Safari':
        case 'Opera':
            signedData = appletSign(signatureString, browser);
            break;
        case 'undefined':
            var msg = getMessage("BrowserNotSupp");
            var reason = getMessage("UnRecognisedBrwser");
            fsShowError(msg, reason);
            //fsShowError("Unrecognized browser. Currently this script\nsupports IE 4.0+ and Netscape4.0+ only","Unrecognized browser");
            signedData = null;
            break;
    }
    if (signedData == null) {
        return false;
    } else {
        return signedData;
    }
}

// PRIVATE function
function getFormFieldValue(formName, signatureField) {
    // TODO - to implement for each HTML component
    var element = document.forms[formName].elements[signatureField.formField];
    var elementType;
    if (element) {
        if (element.length > 1) {
            if (typeof(element.type) != 'undefined' && element.type.toUpperCase() == 'SELECT-ONE') {
                var selectIndex = element.selectedIndex;
                elementValue = element[selectIndex].value;
            } else if (typeof(element.type) == 'undefined' && element[0].type.toUpperCase() == 'RADIO') {
                elementValue = processRadio(element);
            }
        } else {
            var elementValue;
            elementType = element.type.toUpperCase();
            if (elementType == 'CHECKBOX') {
                elementValue = processCheckbox(element);
            } else {
                elementValue = element.value;
            }
        }
        return elementValue;
    } else {
        return signatureField.value;
    }
}

// ****************************************************************************
// This function is a wrapper over Mozilla's Secclab library and is responsible
// for generating PKCS7 digital signatures in Netscape.
// Inputs:
// tbsData: data to be signed.
// Returns:
// the signature data in PKCS#7
// ****************************************************************************
// PRIVATE FUNCTION
function fsNSSignData(signatureString) {
    var sObject;
    var result = null;
    try {
        result = window.crypto.signText(signatureString, "ask");
    } catch (ex) {
        msg = getMessage("FormNotSigned");
        msg = msg + "\n" + getMessage("TryLaterRepToAdm");
        var reason1 = getMessage("SigningAborted");
        fsShowError(msg, reason1);
        return null;
    }
    return result;
}

function fsCapicomSignData(signatureString) {
    if (!fsIsCAPICOMInstalled()) {
        msg = getMessage("CapicomNotInst");
        msg = msg + "\n" + getMessage("ContactAdmin");
        var reason1 = getMessage("CapicomNotRegd");
        fsShowError(msg, reason1);
        return null;
    } else {
        var CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME = 0;
        var CAPICOM_ENCODE_BASE64 = 0;
        var CAPICOM_E_CANCELLED = -2138568446;
        var CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN = 1;
        try {
            var SignedData = new ActiveXObject("CAPICOM.SignedData");
            var Signer = new ActiveXObject("CAPICOM.Signer");
            var TimeAttribute = new ActiveXObject("CAPICOM.Attribute");
            var certificates = getCertificates();
            if (certificates) {
                Signer.Certificate = certificates.Item(1);
                // Set signer options. This option
                Signer.Options = CAPICOM_CERTIFICATE_INCLUDE_WHOLE_CHAIN;
                // Set the time of signing data
                var Today = new Date();
                TimeAttribute.Name = CAPICOM_AUTHENTICATED_ATTRIBUTE_SIGNING_TIME;
                TimeAttribute.Value = Today.getVarDate();
                Today = null;
                Signer.AuthenticatedAttributes.Add(TimeAttribute);
                SignedData.Content = signatureString;
                var szSignature = SignedData.Sign(Signer, false, CAPICOM_ENCODE_BASE64);
                SignedData = null;
                Signer = null;
                TimeAttribute = null;
                return szSignature;
            } else {
                return null;
            }
        } catch (ex1) {
            alert(ex1.description);
            return null;
        }
    }
}

// Function to be called to initialize the applet.  
// Visibility : public. 
function appletSign(rawData, browserInfo) {
    /* First check in the arsenal.(Gunnersssss). Checking if java is enabled in the borwser. */
    if (!navigator.javaEnabled()) {
        alert("Java is not enabled in this browser. Signing cannot happen");
        return false;
    }
    var appletWrapper = document.getElementById('applet-wrapper');
    if (appletWrapper == null) {
        appletWrapper = document.createElement('div');
        appletWrapper.setAttribute("id", "applet-wrapper");
        appletWrapper.setAttribute("style", "");
        appletWrapper.style.width = "1px";
        appletWrapper.style.height = "1px";
        document.body.appendChild(appletWrapper);
    }
    try {
        if (browserInfo.indexOf("msie") != -1) {
            appletWrapper.innerHTML = " <object id = \"SignApplet\" name =\"SignApplet\" classid=\"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93\" " + "   codebase=\"http://java.sun.com/update/1.5.0/jinstall-1_5_0-windows-i586.cab#Version=1,5,0\" width=\"1\" height=\"1\"> " + "  <param name=\"type\" value=\"application/x-java-applet;version=1.5\"/>" + "  <param name=\"code\" value=\"com.infosys.ebanking.applet.signApplet.SignApplet\"/>" + "  <param name=\"archive\" value=\"web/applets/bcprov-jdk14-130.jar,web/applets/bcmail-jdk14-130.jar,web/applets/SignerApplet.jar\"/>" + "  <param name=\"mayscript\" value=\"true\"/>  " + "  <param name=\"scriptable\" value=\"true\"/> " + "  <param name=\"unsignedData\" value=\"" + rawData + "\"/> " + "  <param name=\"browserInfo\" value=\"" + browserInfo + "\"/> " + "  <param name=\"jsFunction\" value=\"hideMessage()\"/>  " + "  <param name=\"locale\" value=\"" + locale + "\"/> " + "  <param name=\"returnFunction\" value=\"pushSignedData\"/>  " + " </object> ";
        } else {
            appletWrapper.innerHTML = "  <embed name=\"SignApplet\" id=\"SignApplet\" type=\"application/x-java-applet;version=1.5\"" + "      pluginspage=\"http://java.sun.com/products/plugin/index.html#download\" archive=\"web/applets/bcprov-jdk14-130.jar,web/applets/bcmail-jdk14-130.jar,web/applets/SignerApplet.jar\"" + "         code=\"com.infosys.ebanking.applet.signApplet.SignApplet\" width=\"1\" height=\"1\"" + "         mayscript=\"true\" scriptable=\"true\" locale=\"" + locale + "\" returnFunction=\"pushSignedData\" jsFunction=\"hideMessage()\"" + "    browserInfo=\"" + browserInfo + "\" unsignedData=\"" + rawData + "\" >" + "   <noembed>" + "             Document signing applet can not be started because Java Plugin 1.5 is not installed." + "         </noembed>" + "  </embed>";
        }
    } catch (ex) {
        msg = "The form could not be signed now as the signature operation failed.\n";
        msg += "Please try later and if problem persists you may like to report following\n";
        msg += "error to administrator. ";
        alert(msg + ex.description);
    }
    /* Second weapon in the arsenal. Check if the applet is initialized properly. 
       This gives a few seconds of "hang" state in safari 3.1.x. Rest of them go fine. */
    var signer = document.SignApplet;
    try {
        signer.isAlive();
    } catch (ex) {
        alert("Problem occurred while invoking the applet. . Signing cannot happen. ");
        return false;
    }
    return false;
}

function hideMessage() {}

function pushSignedData(data) {
    var formName = document.getElementsByName("FORMSGROUP_ID__")[0].value;

    var userType;
    if (document.getElementById('usertype')) {
        userType = document.getElementById('usertype').value;
    }




    if ("AuthenticationFG" == formName || userType == 4)

    {
        if (isSignTimeStamp) {
            document.getElementById(formName + "." + '__CERTIFICATE__').value = data;
        } else {
            document.getElementById('__SIGNATURE__').value = data;
        }
        var newHidden = document.createElement("input");
        var name = buttonObj.name;
        var value = buttonObj.value;
        newHidden.setAttribute("type", "hidden");
        newHidden.setAttribute("name", name);
        newHidden.setAttribute("value", value);
        document.forms[0].appendChild(newHidden);
        document.forms[0].submit();
        return true;


    } else if (isSignTimeStamp) {

        isDGCTpushSignedDataSuccess = true;
        isDGCTdata = data;


        isDGCT = false;

        try {
            jQuery(isDGCTcallerObj).attr('onClick', "");
            jQuery(isDGCTcallerObj).trigger("click");
        } catch (e) {
            alert("Exception in SIgning Data");
        }
    }
}

function getCertificates() {
    // CAPICOM constants
    var CAPICOM_CURRENT_USER_STORE = 2;
    var CAPICOM_STORE_OPEN_READ_ONLY = 0;
    var CAPICOM_E_CANCELLED = -2138568446;
    // instantiate the CAPICOM objects
    var myStore = new ActiveXObject("CAPICOM.Store");
    var certificates = new ActiveXObject("CAPICOM.Certificates");
    // open My store where the personal certificates along with private keys are
    // present
    try {
        myStore.Open(CAPICOM_CURRENT_USER_STORE, "My", CAPICOM_STORE_OPEN_READ_ONLY);
        certificates = myStore.Certificates.Select("CAPICOM Signature", "Select Certificate for Signing", false);
        return certificates;
    } catch (ex) {
        alert(ex.description);
        return null;
    }
}

// *****************************************************************************
// This function is responsible for detecting whether the CAPICOM com component
// from Microsoft is installed in client machine or not.
// This function is taken from samples provided with CAPICOM distribution and
// renamed for uniform style
//
// Returns: This function returns true if CAPICOM is installed. Returns False
// otherwise.
// ****************************************************************************
function fsIsCAPICOMInstalled() {
    if (typeof(oCAPICOM) == "object") {
        if (oCAPICOM.object != null) {
            return true;
        }
    }
}

// ******************************************************************************
// Generic function to display error messages
// Inputs:
// message: string error message
// reason: string giving error reason.
// ******************************************************************************
// PRIVATE FUNCTION
function fsShowError(message, reason) {
    var msg = getMessage("ErrSignFailed");
    msg += getMessage("UnderScores") + "\n\n";
    msg += message;
    msg += "\n" + getMessage("UnderScores") + "\n\n";
    msg += getMessage("SignFailReason") + "\n" + reason;
    alert(msg);
}

function processCheckbox(object) {
    if (object.checked) {
        return object.value;
    } else {
        return '';
    }
}

function processRadio(options) {
    for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
            return options[i].value;
        }
    }
}

function isComboField(formName, signatureField) {
    var element = document.forms[formName].elements[signatureField.formField];
    return element && (element.length > 1) && element.type && (element.type.toUpperCase() == 'SELECT-ONE');
}

function getDisplayText(formName, signatureField) {
    var element = document.forms[formName].elements[signatureField.formField];
    var selectIndex = element.selectedIndex;
    return element[selectIndex].text;
}

function RecordString(index, value) {
    this.index = index;
    this.value = value;
}

function SignatureFieldVO(displayName, formField, type, value) {
    this.displayName = displayName;
    this.formField = formField;
    this.type = type;
    this.value = value;
}