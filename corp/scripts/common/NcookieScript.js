if (window.addEventListener) {

    window.addEventListener('load', fontResizeOnld, false); //Note for Firefox event is "load" instead "onload"
} else if (document.attachEvent) {
    window.attachEvent('onload', fontResizeOnld);
}

function fontResizeOnld() {
    //Changes done for EBUX-3 and EBUX-2 header changes
    fontResizeHw(Get_Cookie("txtReSzTypehw"));
}

function fontResize(fnsize) {
    if (fnsize == null) fnsize = "normal";
    var cokTxtRz, fntsize;
    Set_Cookie('txtReSzType', fnsize, null, "/");
    Set_Cookie('txtReSzTypehw', fnsize, null, "/");
    cokTxtRz = Get_Cookie("txtReSzType");
    if (cokTxtRz == null) {
        cokTxtRz = fnsize;
    }
    for (var i = 0; i < document.getElementsByTagName("form").length; i++) {
        document.getElementsByTagName("form")[i].setAttribute("id", "outerTab");
        break;
    }
    if (cokTxtRz == "normal") {
        fntsize = "1em";
    } else if (cokTxtRz == "large") {
        fntsize = "1.2em";
    } else if (cokTxtRz == "largest") {
        fntsize = "1.3em";
    }
    if (document.getElementById("Layer1") != null) document.getElementById("Layer1").style.fontSize = fntsize;
    if (document.getElementById("outerTab") != null) document.getElementById("outerTab").style.fontSize = fntsize;
}

function fontResizeHw(fnsize) {
    if (fnsize == null) fnsize = "large";
    var cokTxtRz, fntsize;
    Set_Cookie('txtReSzTypehw', fnsize, null, "/");
    cokTxtRz = Get_Cookie("txtReSzTypehw");
    if (cokTxtRz == null) {
        cokTxtRz = fnsize;
    }
    for (var i = 0; i < document.getElementsByTagName("body").length; i++) {
        document.getElementsByTagName("body")[i].setAttribute("id", "outerTab");
        break;
    }
    if (cokTxtRz == "normal") {
        fntsize = "1em";
    } else if (cokTxtRz == "large") {
        fntsize = "1.08em";
    } else if (cokTxtRz == "largest") {
        fntsize = "1.17em"; //"1.27em";
    }
    if (document.getElementById("Layer1") != null) document.getElementById("Layer1").style.fontSize = fntsize;
    if (document.getElementById("outerTab") != null) document.getElementById("outerTab").style.fontSize = fntsize;
}

function Set_Cookie(name, value, expires, path, domain, secure) {
    // set time, it's in milliseconds
    var today = new Date();
    today.setTime(today.getTime());
    /*
    if the expires variable is set, make the correct 
    expires time, the current script below will set 
    it for x number of days, to make it for hours, 
    delete * 24, for minutes, delete * 60 * 24
    */
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" + expires_date.toGMTString() : "") + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ((secure) ? ";secure" : "");
}

function Get_Cookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}