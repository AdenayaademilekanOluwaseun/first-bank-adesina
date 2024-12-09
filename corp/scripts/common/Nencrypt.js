/*
 * Function to check JavaScript enabled settings specific to a browser
 */
function checkIfJavaEnabled() {
    if (BrowserDetect.browser == "Explorer") {
        var oVDiv1 = document.getElementById('divApplet');
        if (oVDiv1 != null) {
            var msg = getMessage("BrowserNtJavaEn");
            alert(msg);
            return false;
        }
        var appletName = document.getElementById("FINEBApplet");
        appletName = "" + appletName;
        if (appletName.indexOf("object") != -1) {
            var msg = getMessage("BrowserNtJavaEn");
            alert(msg);
            return false;
        }
    } else {
        if (!navigator.javaEnabled()) {
            var msg = getMessage("BrowserNtJavaEn");
            alert(msg);
            return false;
        }
    }
    return true;
}

/*
 * Method which routes the call to 
 * JavaScriptEncryption or AppletEncryption based on a key (__JS_ENCRYPT_KEY__)
 */
function encryptValues(groupletId, isPortal) {

    goAhead();

    LOG.logMessages("Value for isAppletEncryptionRequired: " + isAppletEncryptionRequired(groupletId));
    if (isAppletEncryptionRequired(groupletId)) {
        encryptUsingApplet(groupletId, isPortal);
    } else if (isJavaScriptEncryptionRequired(groupletId) || isJavaScriptEncryptionRequiredModelInGrouplet()) {
        encryptUsingJS(groupletId, isPortal);
    }
    if (groupletId != null && !isPortal) {
        // Don't submit the page (the JS does it)
        return false;
    }
    return true;
}

/*
 * Function responsible for JavaScriptEncryption
 * Modified by Piyasha as a part of E&Y Fixes Recon
 */
function encryptUsingJS(groupletId, isPortal) {
    LOG.logMessages("Encyrpting using JavaScript");
    var callbackFunc = function(publicKey) {
        var textElements;
        var totalElements;
        if (groupletId) {
            totalElements = getSpecifiedElements(groupletId.toUpperCase(), ':password', isPortal);
            // Modified by Piyasha for MITM FT Issue
            //Modified for sizzle error in RWD by Vinay
            textElements = getSpecifiedElements(groupletId.toUpperCase(), jQuery("[encryptionRequired='true']"), isPortal);
        } else {
            totalElements = getSpecifiedElements(groupletId, ':password', isPortal);
            // Modified by Piyasha for MITM FT Issue
            //Modified for sizzle error in RWD by Vinay
            textElements = getSpecifiedElements(groupletId, jQuery("[encryptionRequired='true']"), isPortal);
        }
        for (var count = 0; count < textElements.length; count++) {
            totalElements.push(textElements[count])
        }
        var length = totalElements.length;
        for (var i = 0; i < length; i++) {

            var passwordElement = totalElements[i];
            var pattern = /^[a-zA-Z0-9!`@#$%^&*()_+\-=\[\]{};~':"\\|,.<>\/?\s]*$/
            var str = passwordElement.value;
            if (str.match(pattern)) {

            } else {
                alert('Passwords cannot have a blank space');
                str = '';
                passwordElement.value = str;

            }

            if ((passwordElement.type == 'password' && passwordElement.value != '') || (passwordElement.type == 'text' && passwordElement.value != '' && !(feba.js.watermark.isWatermarkValue(passwordElement)))) {
                var originalValue = passwordElement.value;
                jQuery.jCryption.encrypt(
                    "password=" + originalValue + "_SALT_COMPONENT_=" + Math.random(),
                    publicKey,
                    function(encrypted, passwordElement) {
                        /* change the maxlength of password length to accomodate encrypted password. 
                         * Safari will trim the value based on password length*/
                        passwordElement.setAttribute("maxlength", encrypted.length);
                        passwordElement.value = encrypted;
                    }, passwordElement);
            }
        }
        //below code needs to be removed because making it blank is creating js problem 
        //feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__",groupletId).value="";
    };
    getPublicKeyFromServer(callbackFunc, groupletId);

    //Added for archie ticket 2753
    if (groupletId != undefined && groupletId != null) {
        var decryptFlgwithGrpId = groupletId + ":DECRYPT_FLAG";
        jQuery("[id='" + decryptFlgwithGrpId + "']").attr("value", "Y");
    } else {
        jQuery("[id='DECRYPT_FLAG']").attr("value", "Y");
    }
}

/*
 * Function responsible for getting the public key to aid JavaScriptEncryption
 * Modified by Piyasha as a part of E&Y Fixes Recon
 */
function getPublicKeyFromServer(callback, groupletId) {
    // LOG.logMessages("In getPublicKeyFromServer");
    var jCryptionKeyPair = function(encryptionExponent, modulus, maxdigits) {

        /* LOG.logMessages("In anonymous function to construct JCryptionKeyPair");
         LOG.logMessages("encryptionExponent : "+ encryptionExponent);
         LOG.logMessages("modulus : "+ modulus);
         LOG.logMessages("max Digits: "+ maxdigits);*/

        setMaxDigits(parseInt(maxdigits, 10));
        this.e = biFromHex(encryptionExponent);
        this.m = biFromHex(modulus);
        this.chunkSize = 2 * biHighIndex(this.m);
        this.radix = 16;
        this.barrett = new BarrettMu(this.m);
    };
    //  	var bUrl = feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__",groupletId).value;
    var bUrl;
    var doubleModal = "na";
    if (groupletId != undefined && groupletId != null) {
        doubleModal = feba.domManipulator.getElement('#MODAL_VIEW_CONTAINER').find('#' + groupletId.toUpperCase());
    }

    /* 
     if(doubleModal!=undefined && doubleModal.length!=0 && doubleModal!="na"  ){
    	 bUrl= feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__",'MODAL_VIEW_CONTAINER').value;	 }
     else{
    	 bUrl= feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__",groupletId).value;
     }*/

    /*Surej merged the fix done in IMT area Start*/
    if (doubleModal != undefined && doubleModal.length != 0 && doubleModal != "na") {
        if (feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__", 'MODAL_VIEW_CONTAINER')) {
            bUrl = feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__", 'MODAL_VIEW_CONTAINER').value;
        } else {
            bUrl = feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__", groupletId).value;

        }
    } else {
        bUrl = feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__", groupletId).value;
    }
    /*Surej merged the fix done in IMT area End*/

    var encryptionExponent = bUrl.split(",")[0];
    var modulus = bUrl.split(",")[1];
    var maxDigits = bUrl.split(",")[2];
    var keys = new jCryptionKeyPair(encryptionExponent, modulus, maxDigits);
    callback(keys);
}

/*
 * Function responsible for AppletEncryption
 * Modified by Piyasha as a part of E&Y Fixes Recon
 */
function encryptUsingApplet(groupletId, isPortal) {

    try { //Temporary only. Should be removed after 10.3.5 fix for Chrome is merged to 11
        LOG.logMessages("Encrypting using applet");
        LOG.logMessages("Value for checkIfJavaEnabled: " + checkIfJavaEnabled());
        if (!checkIfJavaEnabled()) {
            return false;
        }
        var totalElements = getSpecifiedElements(groupletId, ':password', isPortal);
        var length = totalElements.length;

        for (var i = 0; i < length; i++) {
            var passwordElement = totalElements[i];
            var initialValue = passwordElement.value;
            if (passwordElement.type == 'password' && (passwordElement.value != '')) {
                feba.domManipulator.getGroupletSpecificElement("FINEBApplet", groupletId).execute(initialValue);
                var javascript_var = feba.domManipulator.getGroupletSpecificElement("FINEBApplet", groupletId).encryptedString;
                passwordElement.value = javascript_var;
            }
        }
    } catch (e) { //Temporary only. Should be removed after 10.3.5 fix for Chrome is merged to 11
        if (BrowserDetect.browser == "Chrome" || BrowserDetect.browser == "Safari") {
            /*Chrome specific logic. Is a work around only. In 10.3.5, the proper fix has been done and will be merged to 11*/
            //Set a flag indicating to the browser that encryption was not done
        }
    }
}

/*
 * Function which checks if JavaScriptEncryption based on a key
 * feba.domManipulator.getGroupletSpecificElement looks for a element present in the page that is being loaded
 * in this case __JS_ENCRYPT_KEY__ used as deciding factor for JSEncryption is enabled based on the 
 * encryption mechanism specified in AppConfig.xml
 */
function isJavaScriptEncryptionRequired(groupletId) {
    return (feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__", groupletId));
}



/*
 * Function which checks if JavaScriptEncryption based on a key
 * feba.domManipulator.getGroupletSpecificElement looks for a element present in the page that is being loaded
 * in this case __JS_ENCRYPT_KEY__ used as deciding factor for JSEncryption is enabled based on the 
 * encryption mechanism specified in AppConfig.xml
 */
function isJavaScriptEncryptionRequiredModelInGrouplet() {

    return (feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__", Constants.MODEL_IN_GROUPLET));
    //return (feba.domManipulator.getGroupletSpecificElement("__JS_ENCRYPT_KEY__","MODAL_VIEW_CONTAINER"));

    /*return (jQuery('#MODAL_VIEW_CONTAINER\\:__JS_ENCRYPT_KEY__')); */
}


/*
 * Function which checks if AppletEncryption based on the presence of Applet Id
 * feba.domManipulator.getGroupletSpecificElement looks for a element present in the page that is being loaded
 * in this case FINEBApplet used as deciding factor for AppletEncryption is enabled based on the 
 * encryption mechanism specified in AppConfig.xml
 */
function isAppletEncryptionRequired(groupletId) {
    return (feba.domManipulator.getGroupletSpecificElement("FINEBApplet", groupletId));
}

/*
 * Method which other buttons except the one on which encryption happens
 */
function disableButton(buttonId, groupletId, isPortal) {
    var oButton = document.getElementById(buttonId);
    //Added condition for disabling button only in modal
    if (feba.domManipulator.getElementById("MODAL_VIEW_CONTAINER").length > 0) {
        var submitElements = feba.domManipulator.find(feba.domManipulator.getElementById("MODAL_VIEW_CONTAINER"), getSpecifiedElements(groupletId, 'input:submit', isPortal));
    } else {
        var submitElements = getSpecifiedElements(groupletId, 'input:submit', isPortal);
    }
    var length = submitElements.length;
    for (i = 0; i < length; i++) {
        if (submitElements[i].id != buttonId) {
            submitElements[i].disabled = true;
            submitElements.className = "HW_formbtn_grey";
        }
    }
}

function disableButtonforRM(buttonId) {
    var oButton = document.getElementById(buttonId);
    document.getElementById(buttonId).disabled = true;
    for (j = 0; document.forms[j] != null; j++) {
        for (i = 0; document.forms[j].elements[i] != null; i++) {
            if (document.forms[j].elements[i].type == 'submit') {
                document.forms[j].elements[i].disabled = true;
            }
        }
    }
    newHidden = document.createElement("input");
    var name = oButton.name;
    var value = oButton.value;
    newHidden.setAttribute("type", "hidden");
    newHidden.setAttribute("name", name);
    newHidden.setAttribute("value", value);
    document.forms[0].appendChild(newHidden);
    goAhead();
    document.forms[0].submit();
    return false;

}
/*
 * Method to set the request header cookie(expires) of a browser to infinite
 */
function goAhead() {
    document.cookie = "tree1Selected=;path=/;expires=-1";
    document.cookie = "tree1State=;path=/;expires=-1";
}