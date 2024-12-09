// JavaScript Cookie Functions

var arcotMovieLoadCheckCnt = 0;
var arcotIsInitDone = 0;

var arcotFlashCookieValue;
var arcotMaxRetries = 1000;
var ARCOT_RETRY_PERIOD_MSEC = 10;


function getBrowserCookie(name) {
    if (typeof(localStorage) != 'undefined') { //check if localStorage is supported by browser
        var Myvalue = "";
        try {
            Myvalue = unescape(localStorage.getItem(name));
            if (Myvalue != "") {
                if (!Myvalue.match(/Undefined/i)) {
                    return Myvalue;
                }
            }
        } catch (e) {}
    }
    var dcookie = document.cookie;
    var cname = name + "=";
    var clen = dcookie.length;
    var cbegin = 0;
    var hasempty = 0;
    while (cbegin < clen) {
        var vbegin = cbegin + cname.length;
        if (dcookie.substring(cbegin, vbegin) == cname) {
            var vend = dcookie.indexOf(";", vbegin);
            if (vend == -1)
                vend = clen;
            if (vbegin == vend) // Ignore empty cookies unless that's all we have
                ++hasempty;
            else {
                if (typeof(localStorage) != 'undefined') {
                    setBrowserCookie(name, unescape(dcookie.substring(vbegin, vend)));
                }
                return unescape(dcookie.substring(vbegin, vend));
            }
        }
        cbegin = dcookie.indexOf(" ", cbegin) + 1;
        if (cbegin == 0)
            break;
    }
    if (hasempty > 0)
        return "";
    else
        return null;
}

function setBrowserCookie(name, value) {
    if (typeof(localStorage) != 'undefined') { //check if localStorage is supported by browser
        try {
            localStorage.setItem(name, escape(value));
            return;
        } catch (e) {
            //Error while setting value to local storage.
            //Fall back to http cookie.
        }
    }
    var today = new Date();
    today.setTime(today.getTime());
    var expires = 1000 * 60 * 60 * 24 * 1000;
    //setting the expiry date to 1000 days
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ";expires=" + expires_date.toGMTString() + "; path=/";

    // Note: to use custom domain names in cookies, use the following line instead:
    //document.cookie = name + "=" + escape(value) + "; path=/; domain=.arcot.com";

}

// This is the callback function, called from flash movie object 

function setVariable(myVar) {
    arcotIsInitDone = myVar;
    return;
}

function getFlashMovieObject(movieName) {
    if (window.document[movieName]) {
        return window.document[movieName];
    }
    if (navigator.appName.indexOf("Microsoft Internet") == -1) {
        if (document.embeds && document.embeds[movieName])
            return document.embeds[movieName];
    } else {
        return document.getElementById(movieName);
    }
}

function setFlashCookie(cookieName, cookieValue) {
    try {
        var cookiemanager = getFlashMovieObject("flashObj");
        cookiemanager.SetVariable("/_level0:CookieName", cookieName);
        cookiemanager.SetVariable("/_level0:CookieValue", cookieValue);
        cookiemanager.SetVariable("/_level0:call", "SetCookie");

        var scRes = cookiemanager.GetVariable("/_level0:setCookieRes");

        if (scRes == "false") {
            //alert("Please unclick 'Never' button in flash local storage settings dialog box \n and increase the memory size");
            return false;
        } else if (scRes == "pending") {
            //toggleDivs();
            //alert("Please increase disk space in flash local storage settings");
            return false;
        } else if (scRes == "true") {
            //alert(scRes);
            //alert("Cookie set sucessfully");
            return true;
        } else {
            //alert("Error: "+scRes);
            return false;
        }
    } catch (e) {
        //alert("caught exception ");
        //alert(e)
        return false;
    }
}

function getFlashCookie(cookieName) {
    try {
        var cookiemanager = getFlashMovieObject("flashObj");
        cookiemanager.SetVariable("/_level0:CookieName", cookieName);
        cookiemanager.SetVariable("/_level0:call", "GetCookie");
        arcotFlashCookieValue = cookiemanager.GetVariable("/_level0:CookieValue");
        return arcotFlashCookieValue;
    } catch (e) {
        return null;
    }
}