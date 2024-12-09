/**
 * This method is called from JS functions wherever an alert is to be displayed.<b>
 * It first creates an alert messages hash map and retrieves the required message from the same. 
 * The language id used here is an global variable defined on every page.
 */
function getMessage(key) {
    /* Creates alert messages hash map and places it in alertMap*/
    if (!errCodeMap.size()) {
        createMessageMap();
    }
    /*errCodeMap is a global hash map having error code and variable name mapping*/
    var errCode = errCodeMap.get(key);
    /*alertMap is a global variable having error code and message array mapping*/
    var arr = alertMap.get(errCode);
    if (arr == null) {
        return;
    }
    try {
        if (langID === undefined) {
            langID = "001";
        }
    } catch (exception) {
        langID = "001";
    }
    if (langID == null) {
        langID = "001";
    }
    var retMsg = arr[langID];

    /*If no message is present for required language id then message for 001 is retrieved*/
    if (retMsg == null) {
        retMsg = arr["001"];
    }
    return retMsg;
}