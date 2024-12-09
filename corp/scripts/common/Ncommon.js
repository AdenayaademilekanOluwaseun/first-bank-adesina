//****************************************************************************
// This function determines user-agent. Currently this supports Netscape and
// MSIE only. However, this function can be enhanced later to support other
// browsers. In such case the function fsSignedData also can be updated so as
// to support new browsers.
// Return value:
//	returns "ns" in case of netscape user-agent and "msie" in case of IE
//****************************************************************************
//PUBLIC

function fsClientBrowser() {
    var browserVersion = parseInt(navigator.appVersion);
    var isIE = navigator.appName.indexOf("Microsoft") != -1;
    var isOpera = navigator.userAgent.indexOf("Opera") != -1;
    var isSafari = navigator.userAgent.indexOf("Safari") != -1;
    var isNetscape = navigator.appName.indexOf("Netscape") != -1;
    var isChrome = navigator.userAgent.indexOf("Chrome") != -1;
    /*
     * Don't mess with the order. Coz, IE is IE and depending on identification
     * here Chrome can be safari and safari and chrome can be NS.
     */
    if (isIE && browserVersion >= 4) {
        return "msie";
    } else if (isOpera) {
        return "Opera";
    } else if (isChrome) {
        return ("Chrome");
    } else if (isSafari) {
        return "Safari";
    } else if (isNetscape && browserVersion >= 4) {
        return "ns";
    }
}


var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) ||
            this.searchVersion(navigator.appVersion) ||
            "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            } else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        { // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        { // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS: [{
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        }
    ]

};
BrowserDetect.init();

// This is a helper object for activities related to collapsible divs.
var isReterieveTemplateClicked = "N";
var hideSeekHelper = {
    SLIDE_MODE_RIGHT: "right",
    SLIDE_MODE_LEFT: "left",
    SLIDE_MODE_UP: "up",
    SLIDE_MODE_DOWN: "down",
    SLIDE_MODE_ATTRIB: "data-slideMode",
    DEFAULT_STATE_ATTRIB: "data-defaultState",
    RETAIN_STATE_ATTRIB: "data-retainCollapsible",
    ANIMATE_ATTRIB: "data-animate",
    COLLAPSE_CLICKED_OUTSIDE_ATTRIB: "data-collapseOnClickOutside",
    MAKE_OVERLAY_ATTRIB: "data-makeOverlay",
    RIGHT_ARROW_IMAGE: "right_arrow_double.png",
    LEFT_ARROW_IMAGE: "left_arrow_double.png",
    PLUS_IMAGE: "plus.gif",
    MINUS_IMAGE: "minus.gif",
    GROUPLET_SEPERATOR: ':',
    COLLAPSIBLE_SEPERATOR: '--:--',
    COLLAPSIBLE_IMG_ID_SUFFIX: ".collapsibleImage",
    invertSlidemode: function(mode) {
        switch (mode) {
            case this.SLIDE_MODE_RIGHT:
                return this.SLIDE_MODE_LEFT;
                break;
            case this.SLIDE_MODE_LEFT:
                return this.SLIDE_MODE_RIGHT;
                break;
            case this.SLIDE_MODE_UP:
                return this.SLIDE_MODE_DOWN;
                break;
            case this.SLIDE_MODE_DOWN:
                return this.SLIDE_MODE_UP;
                break;
            default:
                return this.SLIDE_MODE_UP;
                break;
        }
    },
    updateIndicatorImage: function(img, indicatedAction) {
        var imgName, imgAltText;
        switch (indicatedAction) {
            case this.SLIDE_MODE_RIGHT:
                imgName = hideSeekHelper.RIGHT_ARROW_IMAGE;
                imgAltText = imageAltRightArrow;
                break;
            case this.SLIDE_MODE_LEFT:
                imgName = hideSeekHelper.LEFT_ARROW_IMAGE;
                imgAltText = imageAltLeftArrow;
                break;
            case this.SLIDE_MODE_UP:
                imgName = hideSeekHelper.MINUS_IMAGE;
                imgAltText = imageAltMinus;
                break;
            case this.SLIDE_MODE_DOWN:
                imgName = hideSeekHelper.PLUS_IMAGE;
                imgAltText = imageAltPlus;
                break;
        }

        img.src = imagePath + "/" + imgName;
        img.alt = imgAltText;
    },
    sanitizeValue: function(value) {
        switch (value) {
            case "null":
                return null;
                break;
            case "false":
                return false;
                break;
            case "true":
                return true;
                break;
            default:
                return value;
                break;
        }
    }
}

/*******************************************************************************
 * This method is used to get the elementId appended with the groupletId.
 *
 ******************************************************************************/
function getGroupletSpecificId(elementId, groupletId) {
    if (groupletId != "null" && groupletId != null && groupletId != undefined) {
        if (elementId.indexOf(groupletId + hideSeekHelper.GROUPLET_SEPERATOR) == -1) {
            elementId = groupletId + hideSeekHelper.GROUPLET_SEPERATOR + elementId;
        }
    }
    return elementId;
}
/*******************************************************************************
 * This method is called at the page load if the page has collapsible content.
 * It collapses and expands the divs depending upon state mentioned in the
 * hidden variable.
 *
 ******************************************************************************/
/* Third argument introduced for supporting search panel expand and collapse in second modal window scenario */
function initHideSeek(groupletId, isModalRequest, calIdentifier) {
    /**
     * slideMode - Added to support Sliding Panel with different modes -
     * right (slide from left to right), left, up or down
     */
    var isCalReq = "false";
    if (feba && feba.features && feba.features.MODAL_VIEW_CONTAINER && feba.features.MODAL_VIEW_CONTAINER.options && feba.features.MODAL_VIEW_CONTAINER.options.isCalendar) {
        isCalReq = feba.features.MODAL_VIEW_CONTAINER.options.isCalendar;
    }
    var domMan = feba.domManipulator;
    //fix for TOL:655070 Start
    /**
     * Checking if event is of RETRIEVE_TEMPLATE type, setting the variable
     * "isReterieveTemplateClicked" value to Y
     */
    try {
        if (ff_event.target.name != null && ff_event.target.name === "Action.RETRIEVE_TEMPLATE")
            isReterieveTemplateClicked = "Y";
    } catch (e) {
        console.log("Exception occurred in retrieving event ");
    }
    //fix for TOL:655070 END


    /* Populating the collapsibleId based on the third argument value calIdentifier passed from Page.java
     * Ticket ID : 721135 START
     */
    var collapsibleId = null;


    if (isCalReq != null && isCalReq == "true") {
        collapsibleId = jQuery('#MODAL_VIEW_CONTAINER').find('#' + groupletId + "\\:" + "COLLAPSIBLE_IDS");
    } else {
        collapsibleId = domMan.getGroupletSpecificElement('COLLAPSIBLE_IDS', groupletId);
    }
    if (isModalRequest == true || isModalRequest == "true") {
        if (!groupletId) {
            collapsibleId = domMan.getGroupletSpecificElement('COLLAPSIBLE_IDS', 'MODAL_VIEW_CONTAINER');
        } else {
            collapsibleId = jQuery('#MODAL_VIEW_CONTAINER').find('#' + groupletId + "\\:" + "COLLAPSIBLE_IDS");
        }
    }
    /* Ticket ID : 721135 END */
    var allCollapsibleIdsList = domMan.getAttribute(collapsibleId, "value");

    if (!allCollapsibleIdsList) {
        return; // Return if no collapsible elements
    }

    var collapsibles = allCollapsibleIdsList.split(hideSeekHelper.COLLAPSIBLE_SEPERATOR);
    var collapsibleIdsList = collapsibles[0];

    // Get list of all collapsible element configs
    var diffCollapse = collapsibleIdsList.split("|"); //TODO Change the name

    for (var i = 0; i < diffCollapse.length; i++) {
        if (!diffCollapse[i]) {
            continue; // skip if collpsible element is falsy, mostly "".
        }

        var divIdArr = diffCollapse[i].split(","); // TODO Change name: collapsibleConfig
        var sourceDivId = divIdArr[0].replace("MODAL_VIEW_CONTAINER:", ""); // TODO change name sourceElement (isnt a div, but h)
        var targetDivId = "",
            targetDiv;
        if (divIdArr[1]) {
            targetDivId = divIdArr[1].replace(/MODAL_VIEW_CONTAINER:/g, "");
        }

        if (sourceDivId && targetDivId) {
            var state = divIdArr[2],
                sourceElement = domMan.getElementById(sourceDivId),
                anchor = domMan.getChildren(sourceElement, "a"),
                slideMode = hideSeekHelper.sanitizeValue(domMan.getAttribute(anchor, hideSeekHelper.SLIDE_MODE_ATTRIB)),
                defaultState = hideSeekHelper.sanitizeValue(domMan.getAttribute(anchor, hideSeekHelper.DEFAULT_STATE_ATTRIB)),
                retainCollapsible = hideSeekHelper.sanitizeValue(domMan.getAttribute(anchor, hideSeekHelper.RETAIN_STATE_ATTRIB)),
                animate = hideSeekHelper.sanitizeValue(domMan.getAttribute(anchor, hideSeekHelper.ANIMATE_ATTRIB)),
                collapseClickedOutside = hideSeekHelper.sanitizeValue(domMan.getAttribute(anchor, hideSeekHelper.COLLAPSE_CLICKED_OUTSIDE_ATTRIB)),
                makeOverlay = hideSeekHelper.sanitizeValue(domMan.getAttribute(anchor, hideSeekHelper.MAKE_OVERLAY_ATTRIB));

            //Handle RTL animations
            if ((slideMode === hideSeekHelper.SLIDE_MODE_LEFT || slideMode === hideSeekHelper.SLIDE_MODE_RIGHT) &&
                (anchor.css("direction") === "rtl")) {
                slideMode = hideSeekHelper.invertSlidemode(slideMode);
            }

            // add the data and use it directly, instead of passing values again..!
            domMan.addData(anchor, "collapsibleData", {
                slideMode: slideMode,
                retainCollapsible: retainCollapsible,
                animate: animate,
                collapseClickedOutside: collapseClickedOutside,
                makeOverlay: makeOverlay
            });

            if (defaultState && defaultState !== "null") {
                state = defaultState;
                saveCollapsibleState(true, collapsibleId, targetDivId, state);
            }

            // Checks if the targetDivId has some Business Exception, then change the state to 'E'
            if (hasBusinessException(targetDivId)) {
                state = "E";
                //Added for ticket id 748840
                //saveCollapsibleState(true, collapsibleId, targetDivId, state);
            }

            if (targetDivId.indexOf("#") != -1) {
                targetDivId = targetDivId.substring(targetDivId.indexOf("#") + 1);
            }

            targetDiv = document.getElementById(targetDivId);

            if (targetDiv != null) {
                if (state == "E") {
                    expandBlock(targetDiv, slideMode, animate, collapseClickedOutside, makeOverlay, anchor, true);
                } else {
                    collapseBlock(targetDiv, slideMode, animate, true);
                    //Fix for TOL:655070 Start
                    if (isReterieveTemplateClicked === "Y") {
                        //expanding the block again if clicked button is to reterieve the details of template
                        expandBlock(targetDiv, slideMode, animate, collapseClickedOutside, makeOverlay, anchor, true);
                        //setting the value back to N to avoid any conflict.
                        isReterieveTemplateClicked = "N";
                    }
                    //Fix for TOL:655070 END
                }

                //jQuery(targetDiv).parents(".stage3_searchpanel_detailsdiv, .stage3_searchpaneldiv").show();
                domMan.showElement(domMan.parents(targetDiv, ".stage3_searchpanel_detailsdiv, .stage3_searchpaneldiv"));
            }
        }
    }
    if (collapsibles.length > 1) { // TODO check! was 'temp'!
        var tableCollapsibleIdsList = collapsibles[1];
        diffCollapse = collapsibleIdsList.split("|"); // TODO Change the name

        for (var i = 0; i < diffCollapse.length; i++) {
            if (!diffCollapse[i]) {
                continue; // skip if collapsible element is falsy, mostly "".
            }

            var divIdArr = diffCollapse[i].split(","); // TODO Change name: collapsibleConfig
            var sourceDivId = divIdArr[0]; // TODO change name sourceElement (isnt a div, but h)
            var targetDivId = divIdArr[1];

            if (sourceDivId && targetDivId) {
                var state = divIdArr[2];

                if (document.getElementById(targetDivId) != null) {
                    var collapsibleImg = document.getElementById(targetDivId + hideSeekHelper.COLLAPSIBLE_IMG_ID_SUFFIX);
                    if (state == "E") {
                        document.getElementById(targetDivId).style.display = "";
                        collapsibleImg.src = imagePath + "/" + hideSeekHelper.MINUS_IMAGE;
                        collapsibleImg.alt = imageAltPlus;
                        collapsibleImg.title = imageTitleCollapse;
                    } else {
                        document.getElementById(targetDivId).style.display = "none";
                        collapsibleImg.src = imagePath + "/" + hideSeekHelper.PLUS_IMAGE;
                        collapsibleImg.alt = imageAltPlus;
                        collapsibleImg.title = imageTitleExpand;
                    }
                }
            }
        }
    }

    /*RWD fix for search panel getting cropped in Accounts > transaction history pages. The search panel comes in the middle
    of the page in txn history pages and fix has been made to open it upwards instead of downwards*/
    setTimeout(
        function() {
            var jspName = jQuery("[id='TransactionHistoryFG.REPORTTITLE']").val();
            var jspNameTemp = jQuery("[id='CCTXNHistoryFG.REPORTTITLE']").val();

            if ((jspNameTemp != 'undefined' && (jspNameTemp == 'CCTXNHistoryUX3' || jspNameTemp == 'AddonCCTXNHistoryUX3')) || (jspName != 'undefined' && (jspName == 'DpTransactionHistoryLst5TxnUX3' || jspName == 'LnTransactionHistoryLst5TxnUX3' ||
                    jspName == 'LnTransactionHistoryLstNTxnUX3' || jspName == 'LnTransactionHistoryTprUX3' || jspName == 'LnTransactionHistoryUX3' ||
                    jspName == 'OpTransactionHistoryLst5TxnUX3' || jspName == 'OpTransactionHistoryLstNTxnUX3' || jspName == 'OpTransactionHistoryTprUX3' ||
                    jspName == 'OpTransactionHistoryUX3' || jspName == 'OpAccountDetailsRetUX4' || jspName == 'TransactionHistoryUX3' || jspName == 'TransactionHistoryTprUX3'))) {
                var identifierCollapse = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.SubSection1";
                var collapseheight = jQuery('.collapsible-wrapper').height();
                var searchPnht = jQuery('.stage3_searchpanel_detailsdiv').height();
                var topPosition = -(collapseheight + searchPnht - 4) + "px";
                jQuery('div[id=\"' + identifierCollapse + '\"]').children('.collapsible-wrapper').css("top", topPosition);
                var searchPanel1 = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.Rowset2";
                var searchPanel2 = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.Rowset6";
                jQuery('div[id=\"' + searchPanel1 + '\"]').css('overflow', 'hidden');
                jQuery('div[id=\"' + searchPanel2 + '\"]').css('overflow', 'hidden');
                if (jQuery('div[id=\"' + searchPanel1 + '\"]').length > 0) {
                    if (jQuery('[id$="REPORTTITLE"]').val() == 'CCTXNHistoryUX3') {
                        jQuery('.collapsible-wrapper').css('top', '-337px');
                        jQuery('.collapsible-wrapper').css('max-height', '400px');
                    } else {
                        jQuery('.collapsible-wrapper').css('top', '-412px');
                        jQuery('.collapsible-wrapper').css('max-height', '400px');
                        jQuery('.collapsible-wrapper').css('overflow-y', 'scroll');
                    }
                }
            }
        }, 600);

}
/*******************************************************************************
 * This method is called on click of the collapsible header. It
 * collapses/expands the particular div and also changes the image from plus to
 * minus and vice versa.
 *
 ******************************************************************************/
function expandCollapse(sourceId, targetDivId, variable, groupletId, isModalRequest, event) {
    if (groupletId == "null") {
        groupletId = null;
    }

    event = event || window.event;

    if (targetDivId.indexOf("#") != -1) {
        targetDivId = targetDivId.substring(targetDivId.indexOf("#") + 1);
    }
    var domMan = feba.domManipulator;
    var collapsibleId = domMan.getGroupletSpecificElement('COLLAPSIBLE_IDS', groupletId);
    if (isModalRequest == true || isModalRequest == "true") {
        if (!groupletId) {
            collapsibleId = domMan.getGroupletSpecificElement('COLLAPSIBLE_IDS', 'MODAL_VIEW_CONTAINER');
        } else {
            collapsibleId = jQuery('#MODAL_VIEW_CONTAINER').find('#' + groupletId + "\\:" + "COLLAPSIBLE_IDS");
        }
    }
    var collapsible = domMan.getAttribute(collapsibleId, "value");
    targetDivId = domMan.getAttribute(domMan.getGroupletSpecificElement(targetDivId, groupletId), "id");
    var unUsedValue;

    var collapsibles = collapsible.split(hideSeekHelper.COLLAPSIBLE_SEPERATOR);

    var state = "";
    if (variable == 'tableColapse') {
        collapsible = collapsibles[1];
        unUsedValue = collapsibles[0];
        state = collapsible.substring(collapsible.lastIndexOf(targetDivId + ",") + targetDivId.length + 1, collapsible.lastIndexOf(targetDivId + ",") + targetDivId.length + 2);
        if (state == "E") {

            document.getElementById(targetDivId).style.display = "none";
            document.getElementById(targetDivId + '.collapsibleImage').src = imagePath + "/plus.gif";
            document.getElementById(targetDivId + '.collapsibleImage').alt = imageAltPlus;
            document.getElementById(targetDivId + '.collapsibleImage').title = imageTitleExpand;
            collapsible = collapsible.replace(targetDivId + ',E', targetDivId + ',C');
            collapsibleId.value = unUsedValue + hideSeekHelper.COLLAPSIBLE_SEPERATOR + collapsible;
        } else {

            document.getElementById(targetDivId).style.display = "";
            document.getElementById(targetDivId + '.collapsibleImage').src = imagePath + "/minus.gif";
            document.getElementById(targetDivId + '.collapsibleImage').alt = imageAltMinus;
            document.getElementById(targetDivId + '.collapsibleImage').title = imageTitleCollapse;
            collapsible = collapsible.replace(targetDivId + ',C', targetDivId + ',E');
            collapsibleId.value = unUsedValue + hideSeekHelper.COLLAPSIBLE_SEPERATOR + collapsible;
        }
    } else {
        collapsible = collapsibles[0];

        var sourceElement = domMan.getElementById(sourceId),
            anchor = domMan.getChildren(sourceElement, "a"),
            collapsibleData = domMan.getData(anchor, "collapsibleData");

        state = feba.domManipulator.getChildren(document.getElementById(targetDivId), ":not(:header):visible").length ? "E" : "C";

        if (state == "E") {

            collapseBlock(document.getElementById(targetDivId), collapsibleData.slideMode, collapsibleData.animate);
            saveCollapsibleState(collapsibleData.retainCollapsible, collapsibleId, targetDivId, "C");
        } else {
            expandBlock(document.getElementById(targetDivId),
                collapsibleData.slideMode, collapsibleData.animate,
                collapsibleData.collapseClickedOutside, collapsibleData.makeOverlay, anchor);

            saveCollapsibleState(collapsibleData.retainCollapsible, collapsibleId, targetDivId, "E");
        }
    }
    /*Commented the below for ticket 739800*/
    /*if (state == "E") {
    	//added for changing the size of the modal dialog at runtime when sliding search is clicked
    	if(document.getElementById('MODAL_VIEW_CONTAINER') != null ){
    		feba.domManipulator.getElementById("modalDialog").attr('style',"width: auto;border-top:0px;min-height: 222.967px; height: auto;");
    	}
    }else{
    	//added for changing the size of the modal dialog at runtime when sliding search is clicked
    	if(document.getElementById('MODAL_VIEW_CONTAINER') != null ){
    		feba.domManipulator.getElementById("modalDialog").attr('style',"width: auto;border-top:0px;min-height: 472.967px; height: auto;");
    	}
    }*/
    //Need to look into below code. Thought it wont be useful
    if (variable == 'tableColapse') {
        if (unUsedValue != undefined) {
            collapsible = unUsedValue + Collapsible_Seperator + collapsible;
        }
    } else {
        if (unUsedValue != undefined) {
            collapsible = collapsible + Collapsible_Seperator + unUsedValue;
        }
    }
    collapsible = feba.domManipulator.getAttribute(feba.domManipulator.getGroupletSpecificElement('COLLAPSIBLE_IDS', groupletId), "value");
    /*RWD fix for search panel getting cropped in Accounts > transaction history pages. The search panel comes in the middle
    of the page in txn history pages and fix has been made to open it upwards instead of downwards*/
    setTimeout(
        function() {
            var jspName = jQuery("[id='TransactionHistoryFG.REPORTTITLE']").val();
            var jspNameTemp = jQuery("[id='CCTXNHistoryFG.REPORTTITLE']").val();

            if ((jspNameTemp != 'undefined' && (jspNameTemp == 'CCTXNHistoryUX3' || jspNameTemp == 'AddonCCTXNHistoryUX3')) || (jspName != 'undefined' && (jspName == 'DpTransactionHistoryLst5TxnUX3' || jspName == 'LnTransactionHistoryLst5TxnUX3' ||
                    jspName == 'LnTransactionHistoryLstNTxnUX3' || jspName == 'LnTransactionHistoryTprUX3' || jspName == 'LnTransactionHistoryUX3' ||
                    jspName == 'OpTransactionHistoryLst5TxnUX3' || jspName == 'OpTransactionHistoryLstNTxnUX3' || jspName == 'OpTransactionHistoryTprUX3' ||
                    jspName == 'OpTransactionHistoryUX3' || jspName == 'OpAccountDetailsRetUX4' || jspName == 'TransactionHistoryUX3' || jspName == 'TransactionHistoryTprUX3'))) {
                var identifierCollapse = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.SubSection1";
                var collapseheight = jQuery('.collapsible-wrapper').height();
                var searchPnht = jQuery('.stage3_searchpanel_detailsdiv').height();
                var topPosition = -(collapseheight + searchPnht - 4) + "px";
                jQuery('div[id=\"' + identifierCollapse + '\"]').children('.collapsible-wrapper').css("top", topPosition);
                var searchPanel1 = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.Rowset2";
                var searchPanel2 = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.Rowset6";
                jQuery('div[id=\"' + searchPanel1 + '\"]').css('overflow', 'hidden');
                jQuery('div[id=\"' + searchPanel2 + '\"]').css('overflow', 'hidden');
                if (jQuery('div[id=\"' + searchPanel1 + '\"]').length > 0) {
                    if (jQuery('[id$="REPORTTITLE"]').val() == 'CCTXNHistoryUX3') {
                        jQuery('.collapsible-wrapper').css('top', '-337px');
                        jQuery('.collapsible-wrapper').css('max-height', '400px');
                    } else {
                        jQuery('.collapsible-wrapper').css('top', '-412px');
                        jQuery('.collapsible-wrapper').css('max-height', '400px');
                        jQuery('.collapsible-wrapper').css('overflow-y', 'scroll');
                    }
                }
            }
        }, 600);
    try {

        jQuery(".container-nxtGenmedium").find("#" + groupletId).niceScroll({
            horizrailenabled: false,
            'zindex': 1000
        });
        jQuery(".container-nxtGenmedium").find("#" + groupletId).niceScroll().resize({
            horizrailenabled: false
        });
        if (state && state == "E") {
            //jQuery("#"+groupletId).getNiceScroll().hide();
        }
    } catch (e) {
        console.log("Exception occured in expandCollapse for scroll enable" + e);
    }
    return false;
}

/*******************************************************************************
 * This method collapses all the elements in a div except the header element.
 ******************************************************************************/
function collapseBlock(targetDiv, slideMode, animate, forceNoAnimate) {

    var hideElements = feba.domManipulator.getChildren(targetDiv, ":not(:header)");
    var keepVisible = feba.domManipulator.getChildren(targetDiv, ":header");

    if (animate && !forceNoAnimate) {
        hideElements.stop().hide("slide", {
            direction: hideSeekHelper.invertSlidemode(slideMode)
        }, 500);
    } else {
        hideElements.stop().hide();
    }

    // Fix for the jQuery UI hide-show issue that wraps elements in a div and
    // frequent clicks will lose the div, permanently hidden in the clutter
    feba.domManipulator.getChildren(targetDiv, ":not(:header)").find(".ui-effects-wrapper").children().unwrap();

    var collapsibleIndImage = document.getElementById(targetDiv.id + '.collapsibleImage');
    if (collapsibleIndImage) {
        hideSeekHelper.updateIndicatorImage(collapsibleIndImage, slideMode ? slideMode : hideSeekHelper.SLIDE_MODE_DOWN);
        collapsibleIndImage.title = imageTitleExpand;
    }
}
/*******************************************************************************
 * This method expands all the elements in a div except the header element.
 ******************************************************************************/
function expandBlock(targetDiv, slideMode, animate, collapseClickedOutside, makeOverlay, anchor, forceNoAnimate) {


    //var hideElements = feba.domManipulator.getChildren(targetDiv,":not(script[type=text/javascript]):not(:header)");
    var hideElements = feba.domManipulator.getChildren(targetDiv, ":not(:header)");
    var keepVisible = feba.domManipulator.getChildren(targetDiv, ":header");


    if (makeOverlay && !hideElements.is(".collapsible-wrapper")) {
        hideElements = hideElements.wrapAll("<div class='collapsible-wrapper'>").show().parent();
    }

    if (animate && !forceNoAnimate) {
        hideElements.stop().show("slide", {
            direction: hideSeekHelper.invertSlidemode(slideMode)
        }, 500, insideExpandBlock);
    } else {
        hideElements.stop().show();
        setTimeout(insideExpandBlock, 0);
    }

    function insideExpandBlock() {
        // Fix for the jQuery UI hide-show issue that wraps elements in a div and
        // frequent clicks will lose the div, permanently hidden in the clutter
        feba.domManipulator.getChildren(targetDiv, ":not(:header)").find(".ui-effects-wrapper").children().unwrap();

        // To not retain the value in the closure call for hiding.
        forceNoAnimate = undefined;

        var collapsibleIndImage = document.getElementById(targetDiv.id + '.collapsibleImage');
        if (collapsibleIndImage) {
            // No need to send default slide mode from here, by default the invert method sends slidemode UP!
            hideSeekHelper.updateIndicatorImage(collapsibleIndImage, hideSeekHelper.invertSlidemode(slideMode));
            collapsibleIndImage.title = imageTitleCollapse;
        }

        if (collapseClickedOutside) {
            feba.js.common.documentClickWatcher.register(anchor, {
                callBack: collapsibleDocClickHandler,
                anchor: anchor,
                targetDiv: targetDiv,
                slideMode: slideMode,
                animate: animate
            });
        }
    }
}

// Save state of collapsible ids to the form field conditionally.
function saveCollapsibleState(saveState, collapsibleId, targetDivId, newState) {
    if (!saveState) {
        return;
    }

    var allCollapsibleIdsList = feba.domManipulator.getAttribute(collapsibleId, "value");
    feba.domManipulator.val(collapsibleId, allCollapsibleIdsList.replace(new RegExp(targetDivId + ",."), targetDivId + "," + newState));
}

// Handle click outsied of the collapsible div, if it is being watched for as per the collapsible config
function collapsibleDocClickHandler(config, event) {
    //	if (jQuery(config.targetDiv).has(event.target).length === 0 && !jQuery(event.target).is(".ui-widget li.ui-menu-item a")) {
    var domMan = feba.domManipulator;
    //isCalenderTarget and isModalWindowOpened is checked sothat serach panel should not collapsed in case if Modal Window is opened or Date Picker Calender is opened
    var isCalenderTarget = false;
    var isModalWindowOpened = false;
    //check for IE9 and below is added. Fix for Ticket 712675 in 11011
    var isIe9AndBelow = false;
    var isIE = navigator.appName.indexOf("Microsoft") != -1;
    if (isIE != null && isIE == true) {
        var indexOfMSIE = window.navigator.userAgent.indexOf("MSIE ");
        var ua = window.navigator.userAgent;
        if (indexOfMSIE > 0) {
            if (parseInt(ua.substring(indexOfMSIE + 5, ua.indexOf(".", indexOfMSIE))) < 10) {
                isIe9AndBelow = true;
            }
        }
    }
    //className property is used for IE9 and below as classList property is not available. Fix for Ticket 712675 in 11011
    if (isIe9AndBelow) {
        if ((event.target.className != null && event.target.className.split(/[ ,]+/).length >= 2) && (event.target.className.split(/[ ,]+/)[1].indexOf("calendars") == 0)) {
            isCalenderTarget = true;
        } else if ((event.target.className != null && event.target.className.split(/[ ,]+/).length == 1) && (event.target.className.split(/[ ,]+/)[0].indexOf("calendars") == 0)) {
            isCalenderTarget = true;
        } else if (event.target.offsetParent != null && (event.target.offsetParent.className.indexOf("calendars-popup") == 0)) {
            isCalenderTarget = true;
        }
    } else {
        if ((event.target.classList != null && event.target.classList.length >= 2) && (event.target.classList[1].indexOf("calendars") == 0)) {
            isCalenderTarget = true;
        } else if ((event.target.classList != null && event.target.classList.length == 1) && (event.target.classList[0].indexOf("calendars") == 0)) {
            isCalenderTarget = true;
        } else if (event.target.offsetParent != null && (event.target.offsetParent.className.indexOf("calendars-popup") == 0)) {
            isCalenderTarget = true;
        }
    }
    if (document.getElementById('MODAL_VIEW_CONTAINER') != null) {
        isModalWindowOpened = true;
    }

    if (domMan.getMatchedElementCount(domMan.hasElementsMatching(config.targetDiv, event.target)) == 0 &&
        !domMan.isMatching(event.target, ".ui-widget li.ui-menu-item a") && !isCalenderTarget && !isModalWindowOpened) {
        feba.js.common.documentClickWatcher.deregister(config.anchor);
        collapseBlock(config.targetDiv, config.slideMode, config.animate);
        //Fix for TOL:655070 Start
        if (event.currentTarget.activeElement.name === "Action.RETRIEVE_TEMPLATE")
            isReterieveTemplateClicked = "Y";
        else
            isReterieveTemplateClicked = "N";
        //Fix for TOL:655070 End
        //Fix for search panel not collapsed when click on outside search panel in modal window
    } else if (!domMan.isMatching(event.target, ".ui-widget li.ui-menu-item a") && !isCalenderTarget && isModalWindowOpened) {
        var numOfSerchPanlInModal = jQuery('#MODAL_VIEW_CONTAINER').find(jQuery('.collapsible-wrapper'));
        for (m = 0; m < numOfSerchPanlInModal.length; m++) {
            var currTargetDiv = jQuery(numOfSerchPanlInModal[m]).parent().parent();
            var configanchor = jQuery('#MODAL_VIEW_CONTAINER').find(currTargetDiv.find(jQuery('a[data-collapseonclickoutside="true"]')));
            //handle search panel open click
            if (domMan.getMatchedElementCount(domMan.hasElementsMatching(currTargetDiv, event.target)) == 0) {
                var state = feba.domManipulator.getChildren(numOfSerchPanlInModal[m], ":not(:header):visible").length ? "E" : "C";
                if (state == "E") {
                    jQuery(configanchor).trigger('click');
                }
            }
        }
    } else if (domMan.getMatchedElementCount(domMan.hasElementsMatching(config.anchor, event.target))) {
        feba.js.common.documentClickWatcher.deregister(config.anchor);
    }
};

function getSectionBasedIds(collapsibleids, targetId) {
    var sectionId = targetId;
    var onlySections = false;
    if (targetId.indexOf(".") != -1) {
        sectionId = targetId.substring(0, targetId.indexOf("."));
        //alert(sectionId);
        onlySections = false;
    } else {
        onlySections = true;
    }
    var splitted = collapsibleids.split("|");
    if (splitted.length > 0) {
        for (var i = 0; i < splitted.length; i++) {
            if (onlySections == true) {}

        }
    }
}

function format() {
    var buttons = document.getElementById("BrdCrumbNImg").parentNode;
    buttons.removeChild(document.getElementById("BrdCrumbNImg"));
    var input = document.getElementsByTagName("a");
    var count = input.length;
    for (var i = 0; i < count; i++) {
        input[i].removeAttribute("href");
        input[i].setAttribute("class", "simpletext");
    }
    var rad_input = document.getElementsByTagName("input");
    var rad_count = rad_input.length;
    for (var j = 0; j < rad_count; j++) {
        if (document.getElementsByTagName("input")[j].getAttribute("type") == "radio" || document.getElementsByTagName("input")[j].getAttribute("type") == "RADIO") {
            document.getElementsByTagName("input")[j].style.display = "none";
        }
    }
}

function format(name, theFormattedDate) {

    var trial = feba.domManipulator.remove(feba.domManipulator.getElementById(name + ':' + "BrdCrumbNImg"));



}

function addDate(theFormattedDate, name) {


    var date = document.createTextNode(theFormattedDate);

    document.getElementById('' + name + ':' + 'PgHeading').appendChild(date);



}


function PrintPreView(divs, css, title, jsFile, nameSpace, portalName, theFormattedDate) {


    var tableName = divs.split("|");
    var total_document = "";
    var portalName1 = portalName;
    total_document = document.getElementById('PrintPreview' + '_' + portalName1).innerHTML + '<div class="clearboth"></div><BR>';
    var name = nameSpace;


    var disp_setting = "toolbar=no,location=no,directories=no,menubar=no,";
    disp_setting += "scrollbars=yes,width=640, height=660, left=200, top=25";

    var docprint = window.open("", "", disp_setting);
    docprint.document.open();
    docprint.document.write('<html><head><title>');
    docprint.document.write(title);
    docprint.document.write('</title>');
    docprint.document.write('<link rel="stylesheet" type="text/css" href="/corp/' + css + '">');
    docprint.document.write('<link rel="stylesheet" type="text/css" href="/corp/' + langID + '/' + css + '">');
    docprint.document.write('<script type=\'text/javaScript\' src=\'/corp/scripts/common/Ncommon.js\'></script>');
    docprint.document.write('<script type=\'text/javaScript\' src=\'/corp/scripts/common/NFEBAScripts.js?moduleId=,scriptsPath=/corp/scripts,isVdtMode=,nodePath=,ipAddress=,contextPath=\'></script>');
    docprint.document.write('</head>');
    docprint.document.write('<body style="background-color:#FFFFFF" onLoad = "format(\'' + name + '\',\'' + theFormattedDate + '\');addDate(\'' + theFormattedDate + '\',\'' + name + '\');window.print();">');
    //docprint.document.write('<body style="background-color:#FFFFFF" onLoad = "format()">');
    docprint.document.write(total_document);
    docprint.document.write('<BR>')
    docprint.document.write('<center><input type="button" class="formbtn_last" onclick="javascript:window.close();" value="Close"/></center>');

    var head = docprint.document.getElementsByTagName('head')[0];
    var script = docprint.document.createElement('script');
    script.type = 'text/javascript';
    script.src = jsFile;
    head.appendChild(script);
    docprint.document.write('</body></html>');
    docprint.document.close();
    docprint.focus();
}


/*******************************************************************************************
 * This function is called to bind the click event to clear button when the page is ready.
 *******************************************************************************************/
//jQuery(document).ready(function (){
feba.domManipulator.documentReady(function() {

    if (jQuery('#mobileFlag').val() != 'Y') {

        if (viewport().width >= 360 && viewport().width < 480) {
            jQuery('body').css('zoom', '0.7');
            jQuery('#modalDialog').parent().css('zoom', '0.6');


        }

        if (viewport().width < 360) {
            jQuery('body').css('zoom', '0.6');
            jQuery('#modalDialog').parent().css('zoom', '0.5');
        }

        jQuery(window).resize(function() {

            if (viewport().width >= 360 && viewport().width < 480) {
                jQuery('body').css('zoom', '0.7');
            }

            if (viewport().width < 360) {
                jQuery('body').css('zoom', '0.6');
            }
            if (viewport().width >= 480) {
                jQuery('body').css('zoom', '1');
            }


        });
    }

    feba.js.adaptive.arcot.initArcotDNA();

    //Added for Correcting table heading borders in corporate application
    handleListingTableUI();

    feba.domManipulator.bind(LIB.__GET_ELEMENT_BY_ATTRIBUTE__("data-byPassValidations", "true"), "click", function() {

        // All input element with type as text are fetched.
        var inputElements = feba.domManipulator.getElement("input:text");
        var iLength = inputElements.length;

        if (inputElements.length > 0) {
            for (var i = 0; i < iLength; i++) {
                //On the basis of input element id fetched setting the values of fields as blank on click of clear button.
                feba.domManipulator.setAttribute(feba.domManipulator.getElementById(inputElements[i].id), "value", "");

            }
        }


    });

    //changes end


});

/*******************************************************************************
 * This function checks if the given divId has Business Exception in it
 *  and returns the flag accordingly
 ******************************************************************************/
function hasBusinessException(targetDivId) {
    if (targetDivId != null && targetDivId.indexOf("#") != -1) {
        var temp = targetDivId.split("#");
        //targetDivId = temp[0];
        targetDivId = temp[temp.length - 1];
    }
    var busExErrorFlag = false;

    /*	check hidden input elements ID - ERROR_ROW_*
    	It gets appended from Field.java in case of FIELD_MSG_DISPLAY_LOCATION as SIDE or
    	ERR_HIGHLIGHT_LOCATION as ROW set in BankAway.properties
    */
    var errorElements = feba.domManipulator.find(feba.domManipulator.getElementById(targetDivId), 'input[id^="ERROR_ROW_"]');
    if ((errorElements != null) && (errorElements.length > 0)) {
        busExErrorFlag = true;
    }


    if (busExErrorFlag == false) {
        /*	Then check for error_highlight or error_highlight_right style
        	which gets added to span from LabelForControl.java in case of
        	ERR_HIGHLIGHT_LOCATION as LABEL
        */
        var errorHighlight = jQuery(targetDivId).find(".error_highlight");
        var errorHighlightRight = jQuery(targetDivId).find(".error_highlight_right");
        if (errorHighlight.length > 0 || errorHighlightRight.length > 0) {
            busExErrorFlag = true;
        }
    }
    return busExErrorFlag;
}

/** Added by Nikita for For additional details Link*/
function displayAdditional(groupletId) {
    var elementId1 = 'DataEntry_LeftContainer_Stage3_Collapsible8';
    var elementId2 = 'DataEntry_LeftContainer_Stage39.Re6';
    var elementId3 = 'Additional_Click';

    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var grpId = "";
        var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    } else {
        var grpId = groupletId + ":";
        var formgroupName = document.getElementById(grpId + "GROUPLET_FORMSGROUP_ID__").value;
        elementId1 = grpId + elementId1;
        elementId2 = grpId + elementId2;
        elementId3 = grpId + elementId3;
    }
    var divElement = feba.domManipulator.getElementById(elementId1);
    var header = feba.domManipulator.getElementById(elementId2);
    //    var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    var clickVal = feba.domManipulator.getElementById(elementId3);
    var clickLink = document.getElementById(formgroupName + ".CLICKED_PAGE_NO").value;
    clickVal.click(function() {
        //When link is clicked set formfield as 'Y' indicating link has been clicked
        document.getElementById(formgroupName + ".CLICKED_PAGE_NO").value = "Y";
    })
    if (divElement.length == 0) {
        return;
    } else { //When page is loaded show the section of Additional details as collapsed
        if (clickLink == "N") {
            divElement[0].style.display = "None";
        }
        //When link is clicked the Additional details section is expanded and Link is hidden
        else {
            header[0].style.display = "None";
            divElement[0].style.display = "block";
        }
    }
}
/*For additional details Link end*/

/** Added by Nikita for User Added Bank checkbox */
function useSavedAddress(groupletId) {
    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var grpId = "";
        var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    } else {
        var grpId = groupletId + ":";
        var formgroupName = document.getElementById(grpId + "GROUPLET_FORMSGROUP_ID__").value;
    }
    var useSaved = true;

    if (null != document.getElementById(grpId + 'CounterPartyCRUDFG.USER_ADDED_BANK')) {
        useSaved = !(document.getElementById(grpId + 'CounterPartyCRUDFG.USER_ADDED_BANK').checked);
    }
    var countryElement = feba.domManipulator.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_COUNTRY');
    var networkElement = feba.domManipulator.getElementById(grpId + 'CounterPartyCRUDFG.NETWORK_ID');
    //If the user added bank checkbox is checked then enable fields and clear Network and bank Identifier
    //Clear all fields when checkbox is checked or unchecked
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_COUNTRY').value = "";
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_NAME').value = "";
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_OTHERBANK_BRANCH').value = "";
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_ADDRESS').value = "";
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_CITY').value = "";
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_ZIP').value = "";
    document.getElementById(grpId + 'CounterPartyCRUDFG.NETWORK_ID').value = "";
    document.getElementById(grpId + 'CounterPartyCRUDFG.BANK_IDENTIFIER').value = "";
    //Update the value of the dropdowns to default value
    jQuery(networkElement).febaCombobox("update");
    jQuery(countryElement).febaCombobox("update");
    feba.js.watermark.showWatermark();
    //Set fields as readOnly according to the selection of checkbox
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_NAME').readOnly = useSaved;
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_OTHERBANK_BRANCH').readOnly = useSaved;
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_ADDRESS').readOnly = useSaved;
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_CITY').readOnly = useSaved;
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_ZIP').readOnly = useSaved;
    //Disable dropdown for Country when box is unchecked
    document.getElementById(grpId + 'CounterPartyCRUDFG.BNF_BANK_COUNTRY').disabled = useSaved;
    if (useSaved) {
        jQuery(countryElement).febaCombobox("disable");
    } else {
        jQuery(countryElement).febaCombobox("enable");
    }

    return;
}
/** Added by Nikita for User Added Bank checkbox END*/

//Script to show Menu options on mouse over
function showLinks(parentID, ulID, divID) {
    //Get Parent Div Element
    var parentDiv = document.getElementById(parentID);
    //Get Inner Div Element
    var div = document.getElementById(divID);
    //Get UL element
    var showULId = document.getElementById(ulID);

    //Fetch left position of parent
    var parent_left = parentDiv.offsetLeft;

    //Get Parent Height and assign div top position accordingly
    var parent_Height = parentDiv.offsetHeight;
    div.style.top = parent_Height + 'px';

    //Fetch UL width
    if (showULId != null) {
        var width = showULId.style.width.replace('px', '');
    }
    if (parent_left > (width / 2)) {
        //Assign Div left position according to parent div and div width
        div.style.left = parent_left - (width / 2) + 'px';
    } else {
        div.style.left = '5px';
    }
    //Show UL Display
    showULId.style.display = 'block';
}

//Script to show Menu options on mouse out
function hideLinks(ulID) {
    var showULId = document.getElementById(ulID);
    if (showULId != null) {
        showULId.style.display = 'none';
    }
}

function expandCollapseGroups(sourceId, targetDivId, variable, groupletId, isModalRequest, event) {
    if (groupletId == "null") {
        groupletId = null;
    }

    event = event || window.event;

    if (targetDivId.indexOf("#") != -1) {
        targetDivId = targetDivId.substring(targetDivId.indexOf("#") + 1);
    }

    var domMan = feba.domManipulator;

    var collapsibleId = domMan.getGroupletSpecificElement('COLLAPSIBLE_IDS', groupletId);
    if (isModalRequest == true || isModalRequest == "true") {
        collapsibleId = domMan.getGroupletSpecificElement('COLLAPSIBLE_IDS', 'MODAL_VIEW_CONTAINER');
    }
    var collapsible = domMan.getAttribute(collapsibleId, "value");
    targetDivId = domMan.getAttribute(domMan.getGroupletSpecificElement(targetDivId, groupletId), "id");
    var unUsedValue;

    var collapsibles = collapsible.split(hideSeekHelper.COLLAPSIBLE_SEPERATOR);
    if (variable == 'tableColapse') {
        collapsible = collapsibles[1];
        unUsedValue = collapsibles[0];
        var state = collapsible.substring(collapsible.lastIndexOf(targetDivId + ",") + targetDivId.length + 1, collapsible.lastIndexOf(targetDivId + ",") + targetDivId.length + 2);
        if (state == "0") {
            var firstrowid = targetDivId.split(":");
            firstrowid = firstrowid[1];
            var finaltargetfirstdivid = groupletId + "\:" + firstrowid;
            var sRegExInput = new RegExp(firstrowid, "g");
            collapsible = collapsible.replace(sRegExInput, finaltargetfirstdivid);
            state = collapsible.substring(collapsible.lastIndexOf(targetDivId + ",") + targetDivId.length + 1, collapsible.lastIndexOf(targetDivId + ",") + targetDivId.length + 2);
        }
        if (state == "E") {
            // Modified to resolve issue faced during Sanity of 11.0.8Base due to changes in HWListTable Start
            var elements = document.getElementsByClassName(targetDivId);
            for (var i = 0, length = elements.length; i < length; i++) {
                elements[i].style.display = 'none';
            }
            //document.getElementById(targetDivId).style.display = "none";
            // Modified to resolve issue faced during Sanity of 11.0.8Base due to changes in HWListTable End

            document.getElementById(targetDivId + '.collapsibleImage').src = imagePath + "/icoToggleDown.png";
            document.getElementById(targetDivId + '.collapsibleImage').alt = imageAltPlus;
            document.getElementById(targetDivId + '.collapsibleImage').title = imageTitleExpand;
            collapsible = collapsible.replace(targetDivId + ',E', targetDivId + ',C');
            collapsibleId.value = unUsedValue + hideSeekHelper.COLLAPSIBLE_SEPERATOR + collapsible;
        } else {
            // Modified to resolve issue faced during Sanity of 11.0.8Base due to changes in HWListTable Start
            var elements = document.getElementsByClassName(targetDivId);
            for (var i = 0, length = elements.length; i < length; i++) {
                elements[i].style.display = '';
            }
            //document.getElementById(targetDivId).style.display = "";
            // Modified to resolve issue faced during Sanity of 11.0.8Base due to changes in HWListTable End

            document.getElementById(targetDivId + '.collapsibleImage').src = imagePath + "/icoToggleUp.png";
            document.getElementById(targetDivId + '.collapsibleImage').alt = imageAltMinus;
            document.getElementById(targetDivId + '.collapsibleImage').title = imageTitleCollapse;
            collapsible = collapsible.replace(targetDivId + ',C', targetDivId + ',E');
            collapsibleId.value = unUsedValue + hideSeekHelper.COLLAPSIBLE_SEPERATOR + collapsible;
        }
    } else {
        collapsible = collapsibles[0];

        var sourceElement = domMan.getElementById(sourceId),
            anchor = domMan.getChildren(sourceElement, "a"),
            collapsibleData = domMan.getData(anchor, "collapsibleData");

        state = feba.domManipulator.getChildren(document.getElementById(targetDivId), ":not(:header):visible").length ? "E" : "C";

        if (state == "E") {
            collapseBlock(document.getElementById(targetDivId), collapsibleData.slideMode, collapsibleData.animate);
            saveCollapsibleState(collapsibleData.retainCollapsible, collapsibleId, targetDivId, "C");
        } else {
            expandBlock(document.getElementById(targetDivId),
                collapsibleData.slideMode, collapsibleData.animate,
                collapsibleData.collapseClickedOutside, collapsibleData.makeOverlay, anchor);

            saveCollapsibleState(collapsibleData.retainCollapsible, collapsibleId, targetDivId, "E");
        }
    }

    /*RWD fix for search panel getting cropped in Accounts > transaction history pages. The search panel comes in the middle
    of the page in txn history pages and fix has been made to open it upwards instead of downwards*/
    setTimeout(
        function() {
            var jspName = jQuery("[id='TransactionHistoryFG.REPORTTITLE']").val();
            var jspNameTemp = jQuery("[id='CCTXNHistoryFG.REPORTTITLE']").val();

            if ((jspNameTemp != 'undefined' && (jspNameTemp == 'CCTXNHistoryUX3' || jspNameTemp == 'AddonCCTXNHistoryUX3')) || (jspName != 'undefined' && (jspName == 'DpTransactionHistoryLst5TxnUX3' || jspName == 'LnTransactionHistoryLst5TxnUX3' ||
                    jspName == 'LnTransactionHistoryLstNTxnUX3' || jspName == 'LnTransactionHistoryTprUX3' || jspName == 'LnTransactionHistoryUX3' ||
                    jspName == 'OpTransactionHistoryLst5TxnUX3' || jspName == 'OpTransactionHistoryLstNTxnUX3' || jspName == 'OpTransactionHistoryTprUX3' ||
                    jspName == 'OpTransactionHistoryUX3' || jspName == 'OpAccountDetailsRetUX4' || jspName == 'TransactionHistoryUX3' || jspName == 'TransactionHistoryTprUX3'))) {
                var identifierCollapse = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.SubSection1";
                var collapseheight = jQuery('.collapsible-wrapper').height();
                var searchPnht = jQuery('.stage3_searchpanel_detailsdiv').height();
                var topPosition = -(collapseheight + searchPnht - 4) + "px";
                jQuery('div[id=\"' + identifierCollapse + '\"]').children('.collapsible-wrapper').css("top", topPosition);
                var searchPanel1 = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.Rowset2";
                var searchPanel2 = groupletId + ":SearchPanel_Stage3_Extended_midAligned19.Rowset6";
                jQuery('div[id=\"' + searchPanel1 + '\"]').css('overflow', 'hidden');
                jQuery('div[id=\"' + searchPanel2 + '\"]').css('overflow', 'hidden');
                if (jQuery('div[id=\"' + searchPanel1 + '\"]').length > 0) {
                    if (jQuery('[id$="REPORTTITLE"]').val() == 'CCTXNHistoryUX3') {
                        jQuery('.collapsible-wrapper').css('top', '-337px');
                        jQuery('.collapsible-wrapper').css('max-height', '400px');
                    } else {
                        jQuery('.collapsible-wrapper').css('top', '-412px');
                        jQuery('.collapsible-wrapper').css('max-height', '400px');
                        jQuery('.collapsible-wrapper').css('overflow-y', 'scroll');
                    }
                }
            }
        }, 600);
    return false;
}


jQuery(function() {
    /*
     * This method restrict backspace keys on any non-input element.
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    jQuery(document).keydown(function(e) {
        if (e.which == 8) { // 8 == backspace
            if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
                e.preventDefault();
            }
        }
    });
});
// Method forms html to be displayed in case of error in a widget.
function formWidgetErrorPage(textStatus, callBackStatement) {
    if (typeof window.formCustomWidgetErrorPage === "function") {
        return formCustomWidgetErrorPage(textStatus, callBackStatement);
    } else {
        return "<div style='margin: 0 auto; text-align: center; line-height: 20px;'><div style='color: red;'>" +
            getMessage(textStatus) +
            "</div><a class=\"bluelink\" href=\"javascript:" + callBackStatement + "\">" +
            getMessage("Refresh") + "</a><div>";
    }
}
//Script to show child options with defined height
function childDisplay(parentID, divID) {

    var parentID = document.getElementById(parentID);
    var divID = document.getElementById(divID);


    /* Fetch postition of parent element */
    //surej  var topPosition = parentID.offsetTop;
    //surej  var parentHeight = parentID.offsetHeight;
    //surej divID.style.top = topPosition + parentHeight +'px';

}

/* Script added for contol option in collapsible format */
function manageCollapsibleFunctionality(groupletId) {
    //jQuery(document).ready(function(){
    if (groupletId == 'NULL') {
        var collapsibleflg = jQuery("[id='collapsibleflg']").attr('value');
        var check = jQuery('#collapse').css('display');
        var collapsibleflg = jQuery("[id='collapsibleflg']").attr('value');
        var check = jQuery('#collapse').css('display');
        if (jQuery("#collapsableimg").hasClass("collapseMenu") && collapsibleflg == 'Y') {
            var check1 = jQuery('#collapse').css('display');
            jQuery("[id='collapse']").slideToggle();
            var check2 = jQuery('#collapse').css('display');
            jQuery('#collapsableimg').removeClass('collapseMenu');
            jQuery('#collapsableimg').addClass('collapseMenu');
        }
        jQuery("[id='collapsibleMenu']").click(function() {
            var check1 = jQuery('#collapse').css('display');
            jQuery("[id='collapse']").slideToggle();
            var check2 = jQuery('#collapse').css('display');
            if (jQuery("#collapsableimg").hasClass("collapseMenu")) {
                jQuery('#collapsableimg').removeClass('collapseMenu');
                jQuery('#collapsableimg').addClass('expandMenu');
            } else {
                jQuery('#collapsableimg').removeClass('expandMenu');
                jQuery('#collapsableimg').addClass('collapseMenu');
            }
            setTimeout(function() { //Aashish added for RWD bulk payment
                handleRHSAlignment(groupletId);
                console.log("inside manage collap settimeout");
            }, 500);

            return false;
        });
        //});
    } else {
        var collapsibleflg = jQuery("[id='" + groupletId + ":collapsibleflg']").attr('value');
        var check = jQuery('#' + groupletId + '\\:collapse').css('display');
        var collapsibleflg = jQuery("[id='" + groupletId + ":collapsibleflg']").attr('value');
        var check = jQuery('#' + groupletId + '\\:collapse').css('display');
        if (jQuery("#" + groupletId + "\\:collapsableimg").hasClass("collapseMenu") && collapsibleflg == 'Y') {
            var check1 = jQuery('#' + groupletId + '\\:collapse').css('display');
            jQuery("[id='" + groupletId + "\\:collapse']").slideToggle();
            var check2 = jQuery('#' + groupletId + '\\:collapse').css('display');
            jQuery('#' + groupletId + '\\:collapsableimg').removeClass('collapseMenu');
            jQuery('#' + groupletId + '\\:collapsableimg').addClass('collapseMenu');
        }
        jQuery("[id='" + groupletId + "\\:collapsibleMenu']").click(function() {
            var check1 = jQuery('#' + groupletId + '\\:collapse').css('display');
            jQuery("[id='" + groupletId + "\\:collapse']").slideToggle();
            var check2 = jQuery('#' + groupletId + '\\:collapse').css('display');
            if (jQuery("#" + groupletId + "\\:collapsableimg").hasClass("collapseMenu")) {
                jQuery('#' + groupletId + '\\:collapsableimg').removeClass('collapseMenu');
                jQuery('#' + groupletId + '\\:collapsableimg').addClass('expandMenu');
            } else {
                jQuery('#' + groupletId + '\\:collapsableimg').removeClass('expandMenu');
                jQuery('#' + groupletId + '\\:collapsableimg').addClass('collapseMenu');
            }
            setTimeout(function() { //Aashish added for RWD bulk payment
                handleRHSAlignment(groupletId);
                console.log("inside manage collap settimeout");
            }, 500);
            return false;
        });
    }
}

/*Start Added for latent issue fix. Function was getting referred and was only getting included in vdt mode*/
function setChangeValue(value) {
    ChangeValue = value;
}

function chgOptDropdown(comboId) {
    //Fix for TOL:655070: START
    //Changing the value to N to avoid the conflict with original flow.
    isReterieveTemplateClicked = "N";
    //Fix for TOL:655070: End
    var url = document.getElementById(comboId).value;
    if (url.indexOf('.ppdl') > -1) {
        var my_array = url.split(".ppdl");
        var my_module = my_array[0].split("/");
        var htmlTarget = "../" + my_module[0] + "/" + "SampleFG." + my_module[1] + ".jsp.html";
        window.location = htmlTarget;
        document.forms["SampleFG"].method = "get";
        document.forms["SampleFG"].action = htmlTarget;
        return false;
    } else {
        var htmlTarget = "../" + url;
        window.location = htmlTarget;
        document.forms["SampleFG"].method = "get";
        document.forms["SampleFG"].action = htmlTarget;
        return false;
    }
}
/*Surej RWD added for Go to Login Page action. Image tag has been changed to button for
 * implementing on hover effect of next gen styles. On click of "Go to Login Page" button, this
 * javascript is called which reads the URL formed from image tag href attibute and submits the form START*/
function submitGoToLoginAction() {
    var loginUrl = jQuery("#HREF_LOAD").attr("href");
    document.forms[0].method = "POST";
    document.forms[0].action = loginUrl;
    document.forms[0].submit();
}
/*Surej RWD added for Go to Login Page action END*/
/*End Added for latent issue fix. Function was getting referred and was only getting included in vdt mode*/

/*Breadcrumb collapse expand condition -start*/
jQuery(document).ready(function() {
    /*jQuery("[id='bcumcollapse']").click(function() {*/
    /*newly modified for makign slide toggle happen only on specific icon click*/
    jQuery(".bcumcollapse_first,.bcumcollapse_close").click(function() {
        jQuery("[id='breadcrumbnew']").slideToggle();

        if (jQuery('.bcumcollapse_first').css('display') == 'block') {

            jQuery(".bcumcollapse_first").css("display", "none");
            jQuery(".bcumcollapse_second").css("display", "block");
            jQuery(".bcumcollapse_close").css("display", "block");
            jQuery(".bcumcollapse").css("width", "50px");
            jQuery(".bcumcollapse").css("background-size", "100% 100%");
        } else {
            jQuery(".bcumcollapse_second").css("display", "none");
            jQuery(".bcumcollapse_close").css("display", "none");
            jQuery(".bcumcollapse_first").css("display", "block");
            jQuery(".bcumcollapse").css("width", "30px");
            jQuery(".bcumcollapse").css("background-size", " ");
        }
        return false;
    });

});
/*Breadcrumb collapse expand condition -end*/
jQuery(document).ready(function() {
    /* Code moved to npageCustom for ticket id 756881
    	jQuery(".leftcontainer_Icon").live('click', function(event) {
    	     event.preventDefault();
    	    jQuery(".leftcontainer").slideToggle();
    	    jQuery(".advance_wrapper").css("display", "none");
    	    return false;
    	});
    	jQuery(".searchicons_mail").live('click', function(event) {
    	    event.preventDefault();
    	 	jQuery(".advance_wrapper").slideToggle();
    	 	jQuery(".leftcontainer").css("display", "none");
    	    return false;
    	});
    	*/
    if (jQuery("#TranRequestManagerFG\\.REPORTTITLE").val() == 'ApproveCompleteDetailsForSingleEntryMB') {
        jQuery('.listrowwrapper').css('float', 'left');
        jQuery('.listrowwrapper').css('padding-bottom', '0px !important');
        jQuery('.mobile_listingpaneldiv').css('border-top', 'none');
        jQuery('.mobile_listingpaneldiv').css('border-bottom', 'none');
        jQuery('.listrowwrapper').css('width', '198%');
    }
    if (jQuery("#PersonalDetailsFG\\.REPORTTITLE").val() == 'CorpPersonalSetHomePageUX3') {
        jQuery('#ReadOnly_LeftContainer_Stage35\\.R18d9\\.C2').css('padding-left', '203px');
        jQuery('#ReadOnly_LeftContainer_Stage35\\.R18d15\\.C2').css('padding-left', '203px');
    }

    if (jQuery("#UpdateChannelUserIdFG\\.REPORTTITLE").val() == 'ChannelUserIdLinkageListUX3') {
        jQuery('.stage3_listingpaneldiv').css('border-top', '1px solid #CCCCCC');
    }
    if (jQuery.browser.msie || jQuery.browser.safari) {
        if (viewport().width == 480 || viewport().width == 640) {
            //alert("Application screen resolution is:"+viewport().width);
        }
    }
    if (viewport().width < 480) {
        if (jQuery("#TransactionHistoryFG\\.REPORTTITLE").val() == 'DpMaturityInstructionsUX3') {
            jQuery("[id$=HREF_actIDOutput]").css('border-bottom', '1px solid #CCC');
            jQuery("[id$=HREF_actIDOutput]").css('padding-bottom', '8px');
            jQuery("[id$=HREF_actIDOutput]").css('word-break', 'break-all');
            jQuery("[id$=ReadOnly_LeftContainer_Stage3_ModalView5\\.Rowset1]").css('border', 'none');
        }
        if ((jQuery.browser.safari) && (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) && navigator.userAgent.match(/like Mac OS X/i)) {
            jQuery('.HW_formbtn_search .formbtn_last').css('margin-top', '2px');
        }
    }
    //Aashish
    if (jQuery("#AuthenticationFG\\.REPORTTITLE").val() == 'FBAGenerateOTPScreen') {
        if (jQuery.browser.safari) {
            jQuery('.loginPanelColumnDetailStyle5').css('width', '23%');
            jQuery('.loginPanelColumnDetailStyle5').css('margin-right', '10px');
            jQuery('.loginPanelColumnDetailStyle1').css('width', '23%');
            jQuery('.loginPanelColumnDetailStyle1').css('margin-right', '10px');
            jQuery('.loginPanel_Auth_Otp_HW_formbtn').css('width', '34.9%');
            jQuery('.loginPanel_Auth_Otp_HW_formbtn').css('margin-top', '0.8%');
        }
    }

    jQuery(window).resize(function() {
        if (jQuery('#modalDialog').length > 0) {
            if (jQuery('.ui-widget-overlay')) {
                jQuery('.ui-widget-overlay').css('width', jQuery('html').innerWidth());
                jQuery('.ui-widget-overlay').css('height', jQuery('html').innerHeight());
            }
        }
        if (jQuery('#FinanceOverviewFG\\.REPORTTITLE').val() == 'ExpenseIncomeAnalysisListViewUX3') {
            //		 if (jQuery('.footable-row-detail').css('display') == 'table-row;'){
            jQuery('.hwblacktxt').css('padding-top', '6px');
            jQuery('.hwgreentxt').css('padding-top', '6px');
            //		}

        }

        if (jQuery('#TranRequestManagerFG\\.REPORTTITLE').val() == 'AddEntryUX3') {
            setTimeout(
                function() {
                    var trs = jQuery(".tableoverflowwrapperhw").find("tbody>tr");
                    var ths = jQuery(".tableoverflowwrapperhw").find("thead>tr>th");

                    var td_input1 = jQuery(".footable-first-column").find("input[type='checkbox']");
                    var td_input = jQuery(trs.find("td>input[type='checkbox']"));
                    var th_span = jQuery(ths.find("span>span[title='']"));
                    var th_input = jQuery(th_span.closest('th'));
                    var td_footable = jQuery(".footableTablelistwhiterow").find("input[type='checkbox']");
                    jQuery(td_input).parent().css('display', 'none');
                    jQuery(td_input1).css('display', 'none');
                    jQuery(th_input).css('display', 'none');
                    jQuery(td_footable).css('display', 'none');
                }, 1500);

        }
        if (viewport().width > 900) {
            jQuery(".leftcontainer").attr('style', 'none');
            jQuery(".advance_wrapper").attr('style', 'none');
            if (jQuery("[id$='EveryNDaysCaption']").length > 0) {
                jQuery("[id$='EveryNDaysCaption']").prev().css('margin-right', ''); //Added for Every N days component
                jQuery("[id$='EveryNDaysCaption']").prev().css('margin-bottom', ''); //Added for Every N days component
            }
        }
        if (jQuery.browser.msie || jQuery.browser.safari) {
            if (viewport().width == 480 || viewport().width == 640) {
                //alert("Application screen resolution is:"+viewport().width);
            }
        }
        if (viewport().width < 730) {
            jQuery(".composemessagetxtarea .cleditorMain>div").css('height', '53px');
        } else {
            jQuery(".composemessagetxtarea .cleditorMain>div").css('height', '27px');
        }
        if (viewport().width > 480 && viewport().width < 900) { //Added for Every N days component
            if (jQuery("[id$='EveryNDaysCaption']").length > 0) {
                jQuery("[id$='EveryNDaysCaption']").prev().css('margin-right', '52%');
                jQuery("[id$='EveryNDaysCaption']").prev().css('margin-bottom', '4px');
            }
            if (jQuery("#PersonalizeLimitsFG\\.REPORTTITLE").val() == 'ViewApplicableTxnTypesUX3') {
                jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb1\\.C4"]').css('width', '');
            }
            if (jQuery("#FormManagementFG\\.REPORTTITLE").val() == 'PPLCyberReceiptUX3') {
                jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb1\\.C4"]').css('width', '');
                jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb2\\.C4"]').css('width', '');
                jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb3\\.C4"]').css('width', '');
            }
            if (jQuery("#FormManagementFG\\.REPORTTITLE").val() == 'CPL_PPLDetailsDisplayUX3') {
                jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb1\\.C4"]').css('width', '');
                jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb2\\.C4"]').css('width', '');
                jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb3\\.C4"]').css('width', '');
            }
        }
        if (viewport().width < 480) {
            if (jQuery("#TransactionHistoryFG\\.REPORTTITLE").val() == 'DpMaturityInstructionsUX3') {
                jQuery("[id$=HREF_actIDOutput]").css('border-bottom', '1px solid #CCC');
                jQuery("[id$=HREF_actIDOutput]").css('padding-bottom', '8px');
                jQuery("[id$=HREF_actIDOutput]").css('word-break', 'break-all');
                jQuery("[id$=ReadOnly_LeftContainer_Stage3_ModalView5\\.Rowset1]").css('border', 'none');
            }
            if ((jQuery.browser.safari) && (jQuery.browser.safari) && (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) && navigator.userAgent.match(/like Mac OS X/i)) {
                jQuery('.HW_formbtn_search .formbtn_last').css('margin-top', '2px');
            }
        } else {
            if (jQuery("#TransactionHistoryFG\\.REPORTTITLE").val() == 'DpMaturityInstructionsUX3') {
                jQuery("[id$=HREF_actIDOutput]").css('border-bottom', '');
                jQuery("[id$=HREF_actIDOutput]").css('padding-bottom', '');
                jQuery("[id$=HREF_actIDOutput]").css('word-break', '');
                jQuery("[id$=ReadOnly_LeftContainer_Stage3_ModalView5\\.Rowset1]").css('border', '');
            }
            if ((jQuery.browser.safari) && (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) && navigator.userAgent.match(/like Mac OS X/i)) {
                jQuery('.HW_formbtn_search .formbtn_last').css('margin-top', '0px');
            }
        }
    });
    /*jQuery(".composemessagetxtarea").css("width","70%");*/
    jQuery(".cleditorMain").css("width", "100%");
    jQuery(".right_panel .cleditorMain>div").css('height', '53px');

});
/*Breadcrumb collapse expand condition -start*/
/*Message center draft  -start*/
jQuery(document).ajaxComplete(function() {
    jQuery(".accordianmenu").unbind();
    jQuery("#DRAFTS").click(function() {
        setTimeout(
            function() {
                jQuery('.droptxtdate').css('float', 'left');
                jQuery('.droptxtdate').css('margin-left', '10px');
            }, 1000);

        return false;
    });
});
/*Message center draft  -end*/
jQuery(document).ready(function() {
    jQuery(".headerSettingsBx").click(function(e) {
        if (jQuery('span#settingBoxId').hasClass("settingBxArrow")) {
            if (jQuery('.settingBxArrow').css('display') == 'block') {
                jQuery('.settingBxArrow').css('display', 'none');
            } else {
                jQuery('.settingBxArrow').css('display', 'block');
            }
        } else {
            jQuery("span#settingBoxId").toggleClass("settingBxArrow");
            jQuery('.settingBxArrow').css('display', 'block');
        }
        if (jQuery('span#profileBoxId').hasClass("profileBxArrow")) {
            if (jQuery('.profileBxArrow').css('display') == 'block') {
                jQuery('.profileBxArrow').css('display', 'none');
            }
        }
        jQuery("#settingsBx").slideToggle();
        jQuery('#profileBx').hide();
        if (jQuery('span#menuBoxId').hasClass("menuBxArrow")) {
            jQuery('.menuBxArrow').css('display', 'none');
            if (jQuery('#topbarNew').css('display') == 'block') {
                if (viewport().width < 640) {
                    jQuery("[id='topbarNew']").slideToggle();
                }
            }
        }
        /*RWD newly modified for Switch Relationship dropdown in header*/
        jQuery('input[id="DashboardAutoAlignFG.CUST_ID_SELECT_comboText"]').css('margin-left', '5px');
        jQuery('input[id="DashboardAutoAlignFG.DIV_ID_SELECT_comboText"]').css('margin-left', '5px');
        jQuery('input[id="DashboardAutoAlignFG.SELECTED_CTX_ID___comboText"]').css('margin-left', '5px');
        jQuery('input[id="DashboardAutoAlignFG.SELECTED_CTX_ID___comboText"]').css('width', '106px');
        /*RWD newly modified for Switch Relationship dropdown in header End*/

        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    jQuery(".newCaret").click(function(e) {
        jQuery("#settingsBx").slideToggle();
        /*RWD newly modified for Switch Relationship dropdown in header Start*/
        jQuery('input[id="DashboardAutoAlignFG.CUST_ID_SELECT_comboText"]').css('margin-left', '5px');
        jQuery('input[id="DashboardAutoAlignFG.DIV_ID_SELECT_comboText"]').css('margin-left', '5px');
        jQuery('input[id="DashboardAutoAlignFG.SELECTED_CTX_ID___comboText"]').css('margin-left', '5px');
        jQuery('input[id="DashboardAutoAlignFG.SELECTED_CTX_ID___comboText"]').css('width', '106px');
        /*RWD newly modified for Switch Relationship dropdown in header End*/
        jQuery('#profileBx').hide();
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    jQuery(document).click(function(event) {
        if (!jQuery(event.target).closest('#settingsBx').length) {
            if (jQuery('#settingsBx').is(":visible")) {
                jQuery('#settingsBx').hide();
            }
        }
        if (jQuery('span#profileBoxId').hasClass("profileBxArrow")) {
            if (jQuery('.profileBxArrow').css('display') == 'block') {
                jQuery('.profileBxArrow').css('display', 'none');
            }
        }
        if (jQuery('span#settingBoxId').hasClass("settingBxArrow")) {
            if (jQuery('.settingBxArrow').css('display') == 'block') {
                jQuery('.settingBxArrow').css('display', 'none');
            }
        }

    });
    jQuery(".logoffLink").mousedown(function(e) {
        jQuery('#settingsBx').hide();
        jQuery('#profileBx').hide();
        if (jQuery('span#menuBoxId').hasClass("menuBxArrow")) {
            jQuery('.menuBxArrow').css('display', 'none');
            if (jQuery('#topbarNew').css('display') == 'block') {
                jQuery("[id='topbarNew']").slideToggle();
            }
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
});


jQuery(document).ready(function() {

    /*aashish added for touch device issue*/
    jQuery('.mega-menu ul li .sub li.mega-hdr a.mega-hdr-a').click(function() {

        if (this.id.search('_10') == -1) {
            //	  console.log('inside iff##########');
            var parent = this.parentElement.parentElement.id;
            //UL_RTXNS
            var parentMenuId = parent.substr(3, parent.length);
            jQuery('#IL_' + parentMenuId + '_10').css('background-color', '#FFFFFF')
        }
    });

    /*Aashish added to simulate long touch event in touch devices start*/
    var touchduration = 150;
    var timerInterval;

    function timer(interval) {
        interval--;
        if (interval >= 0) {
            timerInterval = setTimeout(function() {

                timer(interval);
            });
        } else {
            taphold();
        }
    }

    function touchstart() {
        //	console.log('touchstart============');
        timer(touchduration);
        event.stopImmediatePropagation();
    }

    function touchmove() {
        //	console.log('touchmove============');
        clearTimeout(timerInterval);

    }

    function touchend() {

        clearTimeout(timerInterval);

    }

    function taphold() {
        alert("For security reasons, long touch functionality is disabled.");
    }


    window.addEventListener('touchstart', touchstart);
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('touchend', touchend);

    /*Aashish added to simulate long touch event in touch devices end*/


    /* Start Fix for removing extra space coming above body in ie11 alone which was causing issue in mega menu hover.
     * In ie10, it is object and in ie11 its embed. There were multiple objects/embed tags which were of height 0 and
     * and occupying space. */
    for (i = 0; i < jQuery('object').length; i++) {
        var curr = jQuery('object')[i];
        var height = jQuery(curr).attr('height');
        if (height == "0") {
            jQuery(curr).css('display', 'none');
        }
    }

    for (i = 0; i < jQuery('embed').length; i++) {
        var curr = jQuery('embed')[i];
        var height = jQuery(curr).attr('height');
        if (height == "0") {
            jQuery(curr).css('display', 'none');
        }
    }
    /* End Fix for removing extra space coming above body in ie11 alone which was causing issue in mega menu hover*/
    /*Added by Surej for disabling enter key across application. Enabled only for login screen.*/
    jQuery(document).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            /*Modification for call id 628850 Starts*/
            /*if(!(jQuery('#AuthenticationFG\\.REPORTTITLE').val()=='AuthenticationScreen'))*/
            if (!(jQuery('#AuthenticationFG\\.REPORTTITLE').val() == 'AuthenticationScreen') &&
                !(jQuery('#AuthenticationFG\\.REPORTTITLE').val() == 'AuthenticationImagePhraseScreen')) {
                /*Modification for call id 628850 Ends*/

                console.log('Stopping enter/keypress in application from keypress() function in Ncommon.js');
                event.preventDefault();
                event.stopPropagation();
            }
        }
    });


    if (!jQuery(".groupletContainer").is(':visible')) {
        jQuery(".masterGroupeltTitlehideElement").removeClass("masterGroupeltTitlehideElement");
    }
    jQuery(".headertext_name").click(function(e) {
        jQuery("#profileBx").slideToggle();
        jQuery('#settingsBx').hide();
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    jQuery(".newCaret2").click(function(e) {
        jQuery("#profileBx").slideToggle();
        jQuery('#settingsBx').hide();
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    jQuery(".profilleIcon").click(function(e) {
        if (jQuery('span#profileBoxId').hasClass("profileBxArrow")) {
            if (jQuery('.profileBxArrow').css('display') == 'block') {
                jQuery('.profileBxArrow').css('display', 'none');
            } else {
                jQuery('.profileBxArrow').css('display', 'block');
            }
        } else {
            jQuery("span#profileBoxId").toggleClass("profileBxArrow");
            jQuery('.profileBxArrow').css('display', 'block');
        }

        if (jQuery('span#settingBoxId').hasClass("settingBxArrow")) {
            if (jQuery('.settingBxArrow').css('display') == 'block') {
                jQuery('.settingBxArrow').css('display', 'none');
            }
        }
        jQuery("#profileBx").slideToggle();
        jQuery('#settingsBx').hide();
        if (jQuery('span#menuBoxId').hasClass("menuBxArrow")) {
            jQuery('.menuBxArrow').css('display', 'none');
            if (jQuery('#topbarNew').css('display') == 'block') {
                jQuery("[id='topbarNew']").slideToggle();
            }
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    });


    jQuery(window).resize(function() {
        var userType;
        if (document.getElementById('userType')) {
            userType = document.getElementById('userType').value;
        } else if (document.getElementById('usertype')) {
            userType = document.getElementById('usertype').value;
        }

        //Start: Code changes for Ticket: 740325
        if (jQuery('.marqueeDiv').length === 1) {
            var chrSafBuffer = 0;
            /*Add buffer only in case of ie and FF*/
            if (!(jQuery.browser.chrome || jQuery.browser.safari || jQuery.browser.opera)) {
                chrSafBuffer = 2;
            }
            var top = parseInt(jQuery('.marqueeDiv').height()) + parseInt(jQuery('.sub').css('top')) + parseInt(chrSafBuffer) + 'px';

            if (viewport().width <= 639) {
                top = -25 + 'px';
                jQuery('.sub').css('top', top);
            } else {
                top = -5 + 'px';
            }
            jQuery('.sub').css('top', top);
        }
        //End: Code changes for Ticket: 740325


        if (viewport().width > 900) {
            jQuery(".stage3_listingpaneldiv_small").removeAttr('style');
            jQuery(".stage3_listingpaneldiv_Extended").removeAttr('style');
        }
        /*RWD modified for removing hover container getting opened in higher resoln when browser
         resized frm lower resoln to higher in opened state*/
        //if condition added for CRP menu issue. Ticket# 752813
        if (userType != "4") {
            if (viewport().width > 639) {
                var wrapperElements = feba.domManipulator.getElementStartingWith("wrapper_");
                for (i = 0; i < wrapperElements.length; i++) {
                    //For each wrapper element make the display as none
                    var wrapperElement = feba.domManipulator.getElement(wrapperElements[i]);
                    jQuery(wrapperElement).css({
                        "display": "none"
                    });
                }
            } else if (viewport().width < 640) {
                var wrapperElements = feba.domManipulator.getElementStartingWith("wrapper_");
                for (i = 0; i < wrapperElements.length; i++) {
                    //For each wrapper element make the display as none
                    var wrapperElement = feba.domManipulator.getElement(wrapperElements[i]);
                    jQuery(wrapperElement).css({
                        "display": "block"
                    });
                }
            }
        }
    });

    /*pfm bugdet end*/


});
/*below event will use to hide setting header division in RWD*/

/* Function to scroll the mega menu to the default selected menu option START*/
function menuScrollToSelected() {
    if (jQuery(".selected").length > 0) {
        var selectedLeftPos = jQuery(".selected").offset().left;
        //	var viewPortWidth = viewport().width;
        var viewPortWidth = jQuery('.wrapper').width();
        var viewPortOffset = jQuery('.wrapper').offset().left;
        viewPortWidth = viewPortWidth + viewPortOffset;
        var selectedElemWidth = jQuery(".selected").width();
        var selectedRightPos = selectedLeftPos + selectedElemWidth;
        var buffer = 70;
        if (selectedLeftPos > viewPortWidth || selectedRightPos + buffer > viewPortWidth) {
            jQuery(".nbs-flexisel-nav-right").trigger("click");
        } else {
            return;
        }
        setTimeout(menuScrollToSelected, 50);
    }
}

/* Function to scroll the mega menu to the default selected menu option for RTL START*/
function menuScrollToSelectedRTL() {
    if (jQuery(".selected").length > 0) {
        var selectedLeftPos = jQuery(".selected").offset().left;
        var viewPortOffset = jQuery('.wrapper').offset().left;
        var buffer = 70;
        if (selectedLeftPos < viewPortOffset + buffer) {
            jQuery(".nbs-flexisel-nav-right").trigger("click");
        } else {
            return;
        }
        setTimeout(menuScrollToSelectedRTL, 50);
    }
}

jQuery(document).ready(function() {

    if (jQuery("HTML").css("direction") == "rtl") {
        setTimeout(menuScrollToSelectedRTL, 50);
    } else {
        setTimeout(menuScrollToSelected, 50);
    }

    //fix max and min width of the drop down container of divisions	in header

    jQuery("[id$='SELECTED_DIV_ID___comboButton']").live('click', function(event) {
        console.log('Inside new test condition');
        if (jQuery('.ui-autocomplete :visible').length > 0) {
            jQuery(".ui-corner-all").css("max-width", "320px");
            /*	jQuery(".ui-corner-all").css("min-width","250px"); */
        }
    });
    jQuery("[id$='DIV_ID_SELECT_comboButton']").live('click', function(event) {
        console.log('Inside new test condition');
        if (jQuery('.ui-autocomplete :visible').length > 0) {
            jQuery(".ui-corner-all").css("max-width", "320px");
            /*	jQuery(".ui-corner-all").css("min-width","210px"); */
        }
    });

});

/* Function to scroll the mega menu to the default selected menu option END*/

jQuery(document).ready(function() {
    /*Start - Fix for megamenu container top position getting changed when user keeps mouse
    on mega menu and scroll using mouse Surej*/
    var userType;
    if (document.getElementById('usertype')) {
        userType = document.getElementById('usertype').value;
    } else if (document.getElementById('userType')) {
        userType = document.getElementById('userType').value;
    }
    //Added to correct the position if marquee is shown to end user
    if (jQuery('.marqueeDiv').length === 1) {
        var chrSafBuffer = 0;
        /*Add buffer only in case of ie and FF*/
        if (!(jQuery.browser.chrome || jQuery.browser.safari || jQuery.browser.opera)) {
            chrSafBuffer = 2;
        }
        var top = parseInt(jQuery('.marqueeDiv').height()) + parseInt(jQuery('.sub').css('top')) + parseInt(chrSafBuffer) + 'px';
        jQuery('.sub').css('top', top);
    }

    var navigation = {
        settings: {
            topPos: 129,
        },
        scroll: function() {
            var scroll_top = jQuery(window).scrollTop(); // current vertical position from the top

            // Added for CRP Mega menu
            if (userType != "null" && userType != null && userType != undefined && userType == '4') {
                navigation.settings.topPos = 36;
            }
            //if scroll top position is greater than toppos, then reset to initial topPosition
            if (scroll_top > navigation.settings.topPos) {
                jQuery(".mega-menu ul li .sub-container").css("top", navigation.settings.topPos);
            } else {
                //if scroll top position is less than than top position, then decrement the scroll
                //offset fromthe initial topPosition
                // Subtract 50px for FBN UI gap Issue
                var offsetPosition = navigation.settings.topPos - scroll_top;

                jQuery(".mega-menu ul li .sub-container").css("top", offsetPosition);

            }
        }
    };
    //Invoke the scroll event
    jQuery(window).scroll(function() {
        navigation.scroll();
        /*Mega menu's sub menu getting scrolled down on scroll*/
        if (viewport().width >= 640) {
            jQuery(".nbs-flexisel-item .sub-container").css('display', 'none');
        }
    });
    /*End - Fix for megamenu container top position getting changed when user keeps mouse
	on mega menu and scroll using mouse Surej*/

    jQuery(document).click(function(event) {
        if (!jQuery(event.target).closest('#profileBx').length) {
            if (jQuery('#profileBx').is(":visible")) {
                jQuery('#profileBx').hide();
            }
        }
    });

    jQuery(".menuHome").click(function() {

        if (jQuery('span#menuBoxId').hasClass("menuBxArrow")) {
            if (jQuery('.menuBxArrow').css('display') == 'block') {
                jQuery('.menuBxArrow').css('display', 'none');
            } else {
                jQuery('.menuBxArrow').css('display', 'block');
            }
        } else {
            jQuery("span#menuBoxId").toggleClass("menuBxArrow");
            jQuery('.menuBxArrow').css('display', 'block');
        }
        if (jQuery('span#profileBoxId').hasClass("profileBxArrow")) {
            if (jQuery('.profileBxArrow').css('display') == 'block') {
                jQuery('.profileBxArrow').css('display', 'none');
            }
        }
        if (jQuery('span#settingBoxId').hasClass("settingBxArrow")) {
            if (jQuery('.settingBxArrow').css('display') == 'block') {
                jQuery('.settingBxArrow').css('display', 'none');
            }
        }
        //jQuery("span#menuBoxId").toggleClass("menuBxArrow");
        jQuery('#settingsBx').hide(); /*newly modified for Header vinay*/
        jQuery('#profileBx').hide(); /*newly modified for Header vinay*/
        jQuery("div#mega_menu").css('display', 'block');
        jQuery("[id='topbarNew']").slideToggle("slow");
        return false;
    });

    /*Breadcrumb collapse expand condition -end*/


    /*  Step1:  Find all elements starting with "parent_"
     *  Step2:  Loop through each of the elements and invoke the function for the current menu id
     */
    var parentElements = feba.domManipulator.getElementStartingWith("parent_");

    for (i = 0; i < parentElements.length; i++) {
        //For each parent element
        var parentElement = feba.domManipulator.getElement(parentElements[i]);
        var idAttribute = feba.domManipulator.getAttribute(parentElement, "id");
        //here 7 is the index after parent_. Used to extract only the menu id from id attribute
        var currentMenuId = idAttribute.substr(7, idAttribute.length);
        /* Dont invoke the effect if the parent doesnt contain any child elements*/
        if (jQuery("#div_" + currentMenuId).children().length > 0) {
            InvokeMegaMenuEffects(currentMenuId);
        }
    }
    /*  Step1:  Find all elements starting with "Slide_"
     *  Step2:  Loop through each of the elements and invoke the function for the current menu id
     */
    var slideElements = feba.domManipulator.getElementStartingWith("Slide_");
    for (i = 0; i < slideElements.length; i++) {
        //For each slide element
        var slideElement = feba.domManipulator.getElement(slideElements[i]);
        var idSlide = feba.domManipulator.getAttribute(slideElement, "id");
        //here 6 is the index after Slide_. Used to extract only the menu id from id attribute
        var currentSlideMenuId = idSlide.substr(6, idSlide.length);
        /* Dont invoke the effect if the parent doesnt contain any child elements*/
        if (jQuery("#div_" + currentSlideMenuId).children().length > 0) {
            InvokeSlideEffects(currentSlideMenuId);
        }
    }

});

/* This function invokes the mega menu effect for both retail and corporate at 640px and above*/
function InvokeMegaMenuEffects(currentMenuId) {
    var parentMenuID = "#parent_" + currentMenuId;
    var identifierMenuID = "#ID_" + currentMenuId;
    var divMenuID = "#div_" + currentMenuId;
    var listMenuID = "#IL_" + currentMenuId + "_10";
    var hyperLinkMenuID = "a#ID_IL_" + currentMenuId + "_10.mega-hdr-a";
    var wrapperMenuID = "#wrapper_" + currentMenuId;
    var subIDMenu = "a#ID_" + currentMenuId;
    var bufferLTR;
    var bufferRTL;
    var userType;
    if (document.getElementById('userType')) {
        userType = document.getElementById('userType').value;
    } else if (document.getElementById('usertype')) {
        userType = document.getElementById('usertype').value;
    }
    if (userType == "1") {
        //default buffer value
        bufferLTR = 50;
        bufferRTL = 50;
        /*If any menu in retail need fine tuning of buffer you can provide here*/
        if (currentMenuId == "FTRE") {
            bufferLTR = 0;
            bufferRTL = 0;
        }

    } else if (userType == "2") {
        //default buffer value
        bufferLTR = 30;
        bufferRTL = 50;

        /*If any menu in retail need fine tuning of buffer you can provide here*/
        if (currentMenuId == "INVM") {
            if (viewport().width > 1100) {
                bufferLTR = -70;
            } else {
                bufferLTR = -30;
            }
        } else if (currentMenuId == "CLIMG") {
            bufferLTR = -30;
        } else if (currentMenuId == "CTFN") {
            bufferLTR = -30;
            bufferRTL = 60;
        } else if (currentMenuId == "EIPP") {
            bufferLTR = -30;
            bufferRTL = -20;
        } else if (currentMenuId == "CADM") {
            if (viewport().width > 1100) {
                bufferLTR = -70;
            } else {
                bufferLTR = 30;
            }
            bufferRTL = -20;
        } else if (currentMenuId == "CGNS") {
            if (viewport().width > 1100) {
                bufferLTR = -70;
            } else {
                bufferLTR = 30;
            }
            bufferRTL = -150;
        }

    }

    jQuery(parentMenuID).mouseenter(function() {
        if (jQuery("HTML").css("direction") == "rtl") {
            megaMenuHoverDisplayRTL(parentMenuID, identifierMenuID, divMenuID, wrapperMenuID, bufferRTL);
        } else {
            megaMenuHoverDisplay(parentMenuID, identifierMenuID, divMenuID, wrapperMenuID, bufferLTR);
        }
        onMouseOverRWDEffects(parentMenuID, listMenuID, hyperLinkMenuID, wrapperMenuID);
    }).mouseleave(function() {
        onMouseLeaveRWDEffects(parentMenuID, listMenuID, hyperLinkMenuID);
    });
    listElementRWDEffect(listMenuID, hyperLinkMenuID);

    jQuery(subIDMenu).mouseenter(function() {
        megaMenuHoverDisplay(parentMenuID, identifierMenuID, divMenuID, wrapperMenuID, bufferLTR);
        onMouseOverRWDEffects(parentMenuID, listMenuID, hyperLinkMenuID, wrapperMenuID);
    });

}

/* This function invokes the mega menu effect for both retail and corporate below 640px */
function InvokeSlideEffects(currentMenuId) {
    var slideMenuId = "#Slide_" + currentMenuId;
    var listMenuId = "#IL_" + currentMenuId + "_10";
    var hyperLinkMenuId = "a#ID_" + currentMenuId;
    var divMenuId = "#div_" + currentMenuId;
    slideEffects(slideMenuId, listMenuId, hyperLinkMenuId, divMenuId);
}

/*Start Slide effects for RWD*/
function slideEffects(slideId, listId, hyperlinkId, divId) {
    var submenu = ".mega-menu div.mega-menu-list-wrapper ul li" + listId + ">ul.sub-menu";
    var submenu1 = ".mega-menu div.mega-menu-list-wrapper ul li" + listId + ">ul.sub-menu1";
    var divFullId = "div" + slideId;
    jQuery(slideId).click(function() {
        jQuery(submenu).css('display', 'block');
        jQuery(submenu1).css('display', 'block');
        jQuery(divFullId).toggleClass("SlideButtonDown");
        jQuery(hyperlinkId).toggleClass("hyperLinkHeadingClick");
        jQuery(divId).slideToggle();
        if (jQuery(slideId).hasClass("SlideButtonDown")) {
            jQuery(divId).css('display', 'block');
        }
        return false;
    });

    jQuery(hyperlinkId).click(function() {
        if (!(typeof isAdaptiveUI != 'undefined' && isAdaptiveUI == "true")) {
            if (viewport().width < 640 && viewport().width > 1) {
                jQuery(submenu).css('display', 'block');
                jQuery(submenu1).css('display', 'block');
                jQuery(divFullId).toggleClass("SlideButtonDown");
                jQuery(hyperlinkId).toggleClass("hyperLinkHeadingClick");
                jQuery(divId).slideToggle();
                if (jQuery(slideId).hasClass("SlideButtonDown")) {
                    jQuery(divId).css('display', 'block');
                }
                return false;
            }
        }
    });

    jQuery(window).resize(function() {
        if (!(typeof isAdaptiveUI != 'undefined' && isAdaptiveUI == "true")) {
            if (viewport().width < 640 && viewport().width > 1) {
                if (jQuery(slideId).hasClass("SlideButtonDown")) {
                    jQuery(submenu).css('display', 'block');
                    jQuery(submenu1).css('display', 'block');
                    jQuery(divId).css('display', 'block');
                }
            }
            if (jQuery(hyperlinkId).hasClass("hyperLinkHeadingClick")) {
                jQuery(submenu).css('display', 'block');
                jQuery(submenu1).css('display', 'block');
                jQuery(divId).css('display', 'block');
            }
        }
    });
}
/*End Slide effects for RWD*/

/* Start function for handling on mouse enter RWD effects*/
function onMouseOverRWDEffects(parentId, listId, hyperLinkId, wrapperId) {
    //alert('Inside onMouseOverRWDEffects');
    var parentFullId = ".mega-menu>div>div>ul>li" + parentId + ">div";
    var listFullSubmenuId = ".mega-menu div.mega-menu-list-wrapper ul li" + listId + ">ul.sub-menu";
    var listFullSubmenu1Id = ".mega-menu div.mega-menu-list-wrapper ul li" + listId + ">ul.sub-menu1";

    if (viewport().width > 639) {
        jQuery(parentFullId).css('display', 'block');
        jQuery(listFullSubmenuId).css('display', 'block');
        jQuery(listFullSubmenu1Id).css('display', 'block');
        jQuery(listId).css('background-color', '#EEEEEE');
        jQuery(wrapperId).css({
            "display": "block"
        });
    }
    jQuery('#settingsBx').hide(); /*newly modified for Header vinay*/
    jQuery('#profileBx').hide(); /*newly modified for Header vinay*/
}
/* End function for handling on mouse enter RWD effects*/


/*Start list Element RWDEffects*/
function listElementRWDEffect(listElementId, hyperlinkId) {
    var submenu = ".mega-menu div.mega-menu-list-wrapper ul li" + listElementId + ">ul.sub-menu";
    var submenu1 = ".mega-menu div.mega-menu-list-wrapper ul li" + listElementId + ">ul.sub-menu1";
    jQuery(listElementId).mouseenter(function() {
        if (viewport().width > 639) {
            jQuery(submenu).css('display', 'block');
            jQuery(submenu1).css('display', 'block');
            jQuery(listElementId).css('background-color', '#EEEEEE');
        }
    }).mouseleave(function() {
        if (viewport().width > 639) {
            jQuery(submenu).css('display', 'none');
            jQuery(submenu1).css('display', 'none');
            jQuery(listElementId).css('background-color', '#FFFFFF');
        }
    });
}
/*End list Element RWDEffects*/

/* Start function for handling on mouse leave RWD effects*/
function onMouseLeaveRWDEffects(parentId, listId, hyperLinkId) {
    var parentFullId = ".mega-menu>div>div>ul>li" + parentId + ">div";
    if (viewport().width > 639) {
        jQuery(parentFullId).css('display', 'none');
        jQuery(listId).css('background-color', '#EEEEEE');
    }
}
/* End function for handling on mouse leave RWD effects*/

/*mega menu hover positioning within window width-start*/
function megaMenuHoverDisplay(parentId, elementId, divId, wrapperMenuID, buffer) {
    var offset = jQuery(elementId).offset().left;
    var viewPortWidth = jQuery('.wrapper').width();
    var viewPortOffset = jQuery('.wrapper').offset().left;
    //var subContainerWidth = jQuery('.mega-menu ul li .sub-container.mega .sub').width();
    var subContainerWidth = jQuery(wrapperMenuID).width();
    var subEndPosition = offset + subContainerWidth;
    var overflowLength;
    var marginLeft;
    if (viewport().width > 1500) {
        buffer = buffer - 137;
    }

    if (subEndPosition > (viewPortWidth + viewPortOffset)) {
        overflowLength = viewPortWidth - subEndPosition;
        /*Commented By Parvathy for FBN submenu position issue*/
        /*marginLeft = offset + overflowLength - buffer + viewPortOffset;*/
        marginLeft = offset + overflowLength + viewPortOffset; /*Added By Parvathy for FBN submenu position issue*/
        jQuery(divId).css({
            "left": marginLeft
        });
    } else if (offset < viewPortOffset) {
        jQuery(divId).css({
            "left": viewPortOffset
        });
    } else {
        jQuery(divId).css({
            "left": offset
        });
    }
    //  alert(elementId + ',' + divId + ',' + wrapperMenuID + ',' + buffer + ',' + offset + ',' + viewPortWidth + ',' + viewPortOffset + ',' + subContainerWidth + ',' + subEndPosition + ',' + overflowLength);
}
/*mega menu hover positioning within window width-end*/
/*mega menu hover positioning within window width RTL-start*/
function megaMenuHoverDisplayRTL(parentId, elementId, divId, wrapperMenuID, buffer) {
    //var offset = jQuery(elementId).offset().left;
    var offset = jQuery(elementId).offset().left;
    var viewPortWidth = jQuery('.wrapper').width();
    var viewPortOffset = jQuery('.wrapper').offset().left;
    //var subContainerWidth = jQuery('.mega-menu ul li .sub-container.mega .sub').width();
    var subContainerWidth = jQuery(wrapperMenuID).width();
    var subEndPosition = offset + subContainerWidth;
    var buff = parseInt(viewPortWidth) - parseInt(offset);
    var overflowLength;
    var marginRight;
    if (viewportWidth().width > 1500) {
        buffer = parseInt(buffer) - 137;
    }

    if (subEndPosition < viewPortOffset) {
        overflowLength = viewPortOffset - subEndPosition;
        marginLeft = offset + overflowLength + parseInt(buffer);
        jQuery(divId).css({
            "left": marginLeft
        });
    } else if (subEndPosition > (viewPortWidth + viewPortOffset)) {
        overflowLength = viewPortWidth - subEndPosition;
        if (offset > viewPortWidth) {
            marginLeft = viewPortWidth + overflowLength - buffer + buff;
            if (viewportWidth().width < 1300) {
                marginLeft = 0; //marginLeft-buff;
            }
        } else {
            marginLeft = offset + overflowLength - buffer;
            if (viewportWidth().width < 1300) {
                if (parseInt(marginLeft) > (parseInt(viewPortWidth) * .35)) {
                    marginLeft = 100; //buffer+20;
                } else {
                    marginLeft = 0;
                }
            }
        }
        jQuery(divId).css({
            "right": marginLeft
        });
    } else {
        jQuery(divId).css({
            "left": offset
        });
        jQuery(divId).css({
            "right": "-1"
        });

        //jQuery(divId).style.removeAttribute('right');
    }
}
/*mega menu hover positioning within window width RTL-end*/

function formWidgetErrorUX3Page(groupletId, textStatus, callBackStatement) {
    if (typeof window.formCustomWidgetErrorPage === "function") {
        return formCustomWidgetErrorPage(textStatus, callBackStatement);
    } else {

        var erroDisplayDiv = feba.domManipulator.getElement('#' + groupletId).find('.widgetErrorDisplayHw');
        if (erroDisplayDiv && erroDisplayDiv.length == 0) {
            erroDisplayDiv = feba.domManipulator.getElement('#ParentDiv_' + groupletId).find('.widgetErrorDisplayHw');
        }
        var currentWidgetWidth = feba.domManipulator.getElement(erroDisplayDiv).closest('.widget-body').width();

        if (currentWidgetWidth == null) {
            currentWidgetWidth = feba.domManipulator.getElement('#' + groupletId).closest('.widget-body').width();
        }
        var messageIdentifier = textStatus;
        var errorHtml = "";
        var bgColourwithwidth = "redbgwithwidth";
        var bgColour = "redbg";
        var bgTopLeft = "redtopleft";
        var bgTopRight = "redtopright";
        var bgBottomLeft = "redbottomleft";
        var bgBottomRight = "redbottomright";
        var parentTableClass = "widgetErrorDisplayHw";

        errorHtml = errorHtml + ("<div id=\"MessageDisplay_TABLE\" class=\" " + parentTableClass + "\" aria-live=\"assertive\" role=\"alert\">");
        /*Error message wrapper was coming on top of the next components below it when position was absolute*/
        /*errorHtml=errorHtml+("<div id=\"wrapperError\" class=\" positionabsolute\" >");*/
        errorHtml = errorHtml + ("<div id=\"wrapperError\" class=\"positionrelative\" >");
        errorHtml = errorHtml + ("<p class=\"errordisplaypulldown\" data-messagemode=\"single\" data-role=\"down\">");
        errorHtml = errorHtml + ("<span class=\"errordisplaywidgetright\">");
        errorHtml = errorHtml + ("<img id=\"" + "errorDisplayPullArrow" + "\" src=\"" + imagePath + "/db_icons_info_bar_arow_down.png\" onClick=\"toggleErrorMessage(this);\" alt=\"Click to view more\" title=\"Click to view more\" class=\"absmiddle arrowtoggle\"/>");
        errorHtml = errorHtml + ("<img src=\"" + imagePath + "/db_icons_info_bar_close.png\" onClick=\"closeErrorMessage(this);\" alt=\"" + getMessage("TitleForClose") + "\" title=\"" + getMessage("TitleForClose") + "\" class=\"absmiddle\"/>");
        errorHtml = errorHtml + ("</span>");
        errorHtml = errorHtml + ("</p>");
        errorHtml = errorHtml + ("<div  class=\"" + bgColourwithwidth + "\">");
        errorHtml = errorHtml + ("<div  class=\"" + bgColourwithwidth + "\">");
        errorHtml = errorHtml + ("<div class=\"errorDisplayDiv width100percent\">");
        errorHtml = errorHtml + ("<p  class=\"" + bgColourwithwidth + "\">");
        errorHtml = errorHtml + ("<span class=\"" + bgTopLeft + "\"><span></span></span>");
        errorHtml = errorHtml + ("<span class=\"" + bgColour + "\"><span></span></span>");
        errorHtml = errorHtml + ("<span class=\"" + bgTopRight + "\"> <span></span></span> </p>");
        errorHtml = errorHtml + ("</div>");
        errorHtml = errorHtml + ("<div id=\"calErrWrapper\" role = \"//alert\" class=\"errorContentWrapper " + bgColour + "\"><a id=\"errorlink1\" href=\"#\"><img class=\"absmiddle\" title=\"" + getMessage("NoWidgetsTitle") +
            "\" " + "alt=\"" + getMessage("NoWidgetsAlt") + "\" src=\"" + getMessage("NoWidgetsImageSrc") + "\"></a>");
        if (feba.domManipulator.isRTL()) {
            errorHtml = errorHtml + "<span dir=\"ltr\"> [100053] [CONTLS0004] </span>" + getMessage(messageIdentifier);
        } else {
            errorHtml = errorHtml + "<span dir=\"ltr\">[CONTLS0004] [100053] </span>" + getMessage(messageIdentifier);
        }
        errorHtml = errorHtml + ("</div>");
        errorHtml = errorHtml + ("<div class=\"width100percent\">");
        errorHtml = errorHtml + ("<p  class=\"" + bgColourwithwidth + "\">");
        errorHtml = errorHtml + ("<span class=\"" + bgBottomLeft + "\"> <span></span></span>");
        errorHtml = errorHtml + ("<span class=\"" + bgColour + "\"> <span></span></span>");
        errorHtml = errorHtml + ("<span class=\"" + bgBottomRight + "\"> <span></span></span> </p>");
        errorHtml = errorHtml + ("</div>");
        errorHtml = errorHtml + ("</div>");
        errorHtml = errorHtml + ("</div>");
        errorHtml = errorHtml + ("</div>");
        errorHtml = errorHtml + ("</div>");
        errorHtml = errorHtml + ("<div class=\"refreshWidgetLinkWrapper\">");
        //errorHtml=errorHtml+("<span class=\"refreshWidgetLinkSpanWrapper\" style=\"width:"+currentWidgetWidth+";\">");
        errorHtml = errorHtml + ("<span class=\"refreshWidgetLinkSpanWrapper\" >");

        errorHtml = errorHtml + ("<a class=\"bluelink\" href=\"javascript:" + callBackStatement + "\"><img class=\"refreshWidgetUX3Image\" src=\"" + imagePath + "/refreshUX3.png\"></img>" + getMessage("Refresh") + "</a>");
        errorHtml = errorHtml + ("</span>");
        errorHtml = errorHtml + ("</div>");

        return errorHtml;
    }
}

function handleWrappedSpans() {

    var len = jQuery('.groupletsection').find(jQuery('input[type="submit"]').parent('span:visible')).parent().length;
    for (i = 0; i < len; i++) {
        //if(i==4){
        var a = jQuery('.groupletsection').find(jQuery('input[type="submit"]').parent('span:visible')).parent()[i];
        var elemId = null;
        if (a && a != null) {
            elemId = a.id;
        }

        if (elemId && elemId != null && elemId != undefined) {

            var element = document.getElementById(elemId);
            var parentSpanWidth = jQuery(element).width();

            var childSpanLen = jQuery(a).find('>span:visible').length;
            var childSum = 0;
            for (j = 0; j < childSpanLen; j++) {
                var marginleft = 0;
                var marginright = 0;
                var paddingleft = 0;
                var paddingright = 0;
                marginleft = jQuery(jQuery(a).find('>span:visible')[j]).css("margin-left");
                marginright = jQuery(jQuery(a).find('>span:visible')[j]).css("margin-right");
                paddingleft = jQuery(jQuery(a).find('>span:visible')[j]).css("padding-left");
                paddingright = jQuery(jQuery(a).find('>span:visible')[j]).css("padding-right");
                var totalMargin = 0;
                var totalPadding = 0;
                totalMargin = parseInt(marginleft) + parseInt(marginright);
                totalPadding = parseInt(paddingleft) + parseInt(paddingright);
                childSum = childSum + parseInt(jQuery(jQuery(a).find('>span:visible')[j]).css("width")) + totalMargin + totalPadding;
            }

            if ((parentSpanWidth > 0) && (childSum > parentSpanWidth)) {
                var origMarginTop = jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top");
                jQuery(a).find(jQuery('input[type="submit"]')).parent().attr('data-marginTop', origMarginTop);
                if (jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginApplied") != "Y") {
                    if (parseInt(origMarginTop) == 0) {
                        jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top", "2px");
                        jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginApplied", "Y");
                    } else {
                        jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top", (parseInt(origMarginTop) + parseInt("2px")) + 'px');
                        jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginApplied", "Y");
                    }
                }
            } else {
                var fetchedMarginTop = jQuery(a).find(jQuery('input[type="submit"]')).parent().attr('data-marginTop');
                if (parseInt(fetchedMarginTop) == 0) {
                    jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top", "0px");
                    jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginApplied", "N");
                } else {
                    jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top", (parseInt(fetchedMarginTop) - parseInt("2px")) + 'px');
                    jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginApplied", "N");
                }
            }
        }
    }



}
/*Function added for handling button alignment issue in modal view's listing section*/
function handleModalWrappedSpans(groupletId) {

    if (groupletId == "null" || groupletId == null || groupletId == "" || groupletId == "undefined") {
        var parentDivId = "#\\:" + "ListingPanel_LeftContainer_Stage3_ModalView12";
    } else {
        var parentDivId = "#" + groupletId + "\\:" + "ListingPanel_LeftContainer_Stage3_ModalView12";
    }

    var len = jQuery("#MODAL_VIEW_CONTAINER").find(parentDivId).find(jQuery('input[type="submit"]').parent('span:visible')).parent().length;
    for (i = 0; i < len; i++) {
        var parentElement = jQuery("#MODAL_VIEW_CONTAINER").find(parentDivId).find(jQuery('input[type="submit"]').parent('span:visible')).parent()[i];
        var elemId = parentElement.id;
        if (elemId && elemId != null && elemId != undefined) {
            var marginTop = jQuery(parentElement).find(jQuery('input[type="submit"]')).css("margin-top");
            var paddingTop = jQuery(parentElement).find(jQuery('input[type="submit"]')).css("padding-top");
            /*If no margin or padding is present between listing table and buttons then only append margin*/
            if (marginTop != null && marginTop != undefined && marginTop == "0px" &&
                paddingTop != null && paddingTop != undefined && paddingTop == "0px") {
                jQuery(parentElement).find(jQuery('input[type="submit"]')).parent().css("margin-top", "7px");
            }
        }
    }

}
/*Function added for removing style attributes added dynamical to available balance*/
function removeStyleOfBalance(groupletId) {
    if (groupletId == null || groupletId == "null" || groupletId == undefined) {
        var element = feba.domManipulator.getElementById("AvailableBalance1");
    } else {
        var element = feba.domManipulator.getElementById(groupletId + "\\:AvailableBalance1");
    }
    jQuery(element).removeAttr('style');
}

function nextgenBackButtonHide(is_nextgen) {
    if (jQuery('#is_nextgen').length > 0 && jQuery('#is_nextgen').attr('value') == "Y") {
        jQuery('.modalWrapper').find('.HW_formbtn_search').addClass('hideElement')
    }

}
/*Function added for appending margin to buttons for correct alignment in lower resolution*/
function handleWrappedSpansRows() {

    var len = jQuery('.groupletsection').find(jQuery('input[type="submit"]').parent('span:visible')).parent().parent().length;
    for (i = 0; i < len; i++) {
        //if(i==4){
        var a = jQuery('.groupletsection').find(jQuery('input[type="submit"]').parent('span:visible')).parent().parent()[i];
        var elemId = a.id;
        if (elemId && elemId != null && elemId != undefined) {

            var element = document.getElementById(elemId);
            var parentSpanWidth = jQuery(element).width();

            console.log('elemId' + elemId);
            var childSpanLen = jQuery(a).children().find('>span:visible').length;
            var childSum = 0;
            for (j = 0; j < childSpanLen; j++) {
                var marginleft = 0;
                var marginright = 0;
                var paddingleft = 0;
                var paddingright = 0;
                marginleft = jQuery(jQuery(a).children().find('>span:visible')[j]).css("margin-left");
                marginright = jQuery(jQuery(a).children().find('>span:visible')[j]).css("margin-right");
                paddingleft = jQuery(jQuery(a).children().find('>span:visible')[j]).css("padding-left");
                paddingright = jQuery(jQuery(a).children().find('>span:visible')[j]).css("padding-right");
                var totalMargin = 0;
                var totalPadding = 0;
                totalMargin = parseInt(marginleft) + parseInt(marginright);
                totalPadding = parseInt(paddingleft) + parseInt(paddingright);
                /*dropdown will exist always along with label*/
                if (jQuery(jQuery(a).children().find('>span:visible')[j]).hasClass('ui-combobox') &&
                    jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginApplied") != "Y") {
                    childSum = childSum + 120;
                }
                childSum = childSum + parseInt(jQuery(jQuery(a).children().find('>span:visible')[j]).css("width")) + totalMargin + totalPadding;
                //check for every element if its overflowing and if yes, apply attr has-overflow
                if (parseInt(parentSpanWidth) - parseInt(childSum) < 0) {
                    jQuery(jQuery(a).children().find('>span:visible')[j]).attr('has-overflow', 'Y');
                } else {
                    jQuery(jQuery(a).children().find('>span:visible')[j]).attr('has-overflow', 'N');
                }
            }
            // Added check to indentify whether children are buttons and dropdowns
            var isAllChilrenButtons = false;
            var count = 0;
            for (j = 0; j < childSpanLen; j++) {
                if (jQuery(jQuery(jQuery(a).children().find('>span:visible')[j]).children()).is('input[type="submit"]')) {
                    count++;
                } else if (jQuery(jQuery(a).children().find('>span:visible')[j]).attr('class') === 'ui-combobox') {
                    count++;
                }
            }
            if (count === childSpanLen) {
                isAllChilrenButtons = true;
                console.log(count);
                console.log(childSpanLen);
                console.log(isAllChilrenButtons);
            }
            if (isAllChilrenButtons) {
                if ((parentSpanWidth > 0) && (childSum > parentSpanWidth)) {
                    var origMarginTop = jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top");
                    jQuery(a).find(jQuery('input[type="submit"]')).parent().attr('data-marginTopRow', origMarginTop);
                    if (jQuery(jQuery(a).find(jQuery('input[type="submit"]')).parent()).attr('marginApplied') != "Y") {
                        if (jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginAppliedRow") != "Y" || parseInt(origMarginTop) == 0) {
                            if (parseInt(origMarginTop) == 0) {
                                jQuery('span[has-overflow="Y"]').css("margin-top", "2px");
                                jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginAppliedRow", "Y");
                            } else {
                                jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top", (parseInt(origMarginTop) + parseInt("2px")) + 'px');
                                jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginAppliedRow", "Y");
                            }
                        }
                    } else {
                        var fetchedMarginTop = jQuery(a).find(jQuery('input[type="submit"]')).parent().attr('data-marginTopRow');
                        if (parseInt(fetchedMarginTop) == 0) {
                            jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top", "0px");
                            jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginAppliedRow", "N");
                        } else {
                            jQuery(a).find(jQuery('input[type="submit"]')).parent().css("margin-top", (parseInt(fetchedMarginTop) - parseInt("2px")) + 'px');
                            jQuery(a).find(jQuery('input[type="submit"]')).parent().attr("marginAppliedRow", "N");
                        }
                    }
                }
            }

        }
    }



}
//added for Donut Chart dropdown:Mahesh
function getAccountChartByType(typAcct1) {
    //document.getElementById("PageConfigurationMaster_W102__1:GO_Event");

    //alert(document.getElementById("PageConfigurationMaster_W102__1:GO_Event").value);

    jQuery("#PageConfigurationMaster_W102__1\\:GO_Event").trigger("click");

    console.log("event fired");

}

function getAccountChartWidgetByType(typAcct1) {

    jQuery("#RetailUserDashboardUX3_W108__0\\:GO_Event").trigger("click");

}
//added for donut Chart pagination:Mahesh
function nextGenPaginate() {
    console.log("in nextGen Pagination function");
    var windowWidth = viewport().width;
    if (jQuery('.donutWrapperUl').find('li').length > 0) {
        if (parseInt(windowWidth) <= 899) {
            jQuery('.donutWrapperUl').jPaginate({
                items: 2,
                pagination_class: 'calendarPagination',
                cookies: false,
                next: '&nbsp;',
                previous: '&nbsp;',
                paginationWrapper: true,
                paginationWrapperClass: 'calendarPaginationWrapper',
                paginationLocation: 'nextGen'
            });
        } else {
            jQuery('.donutWrapperUl').jPaginate({
                items: 4,
                pagination_class: 'calendarPagination',
                cookies: false,
                next: '&nbsp;',
                previous: '&nbsp;',
                paginationWrapper: true,
                paginationWrapperClass: 'calendarPaginationWrapper',
                paginationLocation: 'nextGen'
            });
        }
    }
}
/*Function is used to make the dropdown display in ebux3 comboxbox style and to float label "download details as"
 * to left in case "Select" is chosen from dropdown and trying to download*/
function handleDownloadException(groupletDivId) {
    convertComboboxes();
    jQuery(".stage3_downloadnav .error_highlight").addClass("stage3_searchsimpletext_errDisplay");
    jQuery(".stage3_downloadnav_modalview .error_highlight").addClass("stage3_searchsimpletext_errDisplay");
    //added for download component in modal view
}
/*if file is not uploaded and clicked on continue, throws js exception and combobox if present on the screen does not paints correctly.*/
function handleMultipartException(groupletId) {
    convertComboboxes();
    handleRHSAlignment(groupletId);
}

function showSelectedDonutLegends(typAct, colorCode1, legendText1, balance1, colorCode2, legendText2, balance2, balance3, balance4, balance5, legendText3, colorCode3) {
    //alert("inside showSelectedDonutLegends fuction");

    var holderId = jQuery('.summaryLegendHolder').attr('id');
    jQuery('#' + holderId).attr('class', 'summaryLegendHolder ' + typAct + '_legendHolder'); //writing the selected class

    jQuery('.legendColorOne').css("background-color", colorCode1);
    jQuery('.textLegendOne').html(legendText1 + ":"); //innerHTML =legendText1;
    jQuery('.textBalance1Holder').html(balance1); //innerHTML = balance1;

    jQuery('.legendColorTwo').css("background-color", colorCode2);
    jQuery('.textLegendTwo').html(legendText2 + ":"); //innerHTML =legendText1;
    jQuery('.textBalance2Holder').html(balance2); //innerHTML = balance1;
    //jQuery('.textLegendSmall').html(legendText1);

    jQuery('.textLegendSmall').html("Available Balance");
    if (typAct == "OPR") {
        var oprBalColor = "";
        if (balance3.indexOf("-") == -1) {
            oprBalColor = "hwgreentxtcr";
        }
        jQuery('.textBalance3Holder').addClass(oprBalColor);
    } else {
        jQuery('.textBalance3Holder').removeClass("hwgreentxtcr");
    }
    jQuery('.textBalance3Holder').html(balance3); //innerHTML =balance3;
    if (balance5 && balance5 != "undefined") {
        jQuery('.textBalance3Holder').html(balance5); //innerHTML =balance3;
    }
    if (typAct == "CCD") {
        jQuery('.textLegendSmall').html("Total Amount Due");
        jQuery('.textBalance3Holder').html(balance5); //innerHTML =balance3;
    }
    if (typAct == "LON") {
        jQuery('.textLegendSmall').html("Principal");
        jQuery('.textBalance3Holder').html(balance5); //innerHTML =balance3;
    }
    if (typAct == "DEP") {
        jQuery('.textLegendSmall').html("Current Value");
        jQuery('.textBalance3Holder').html(balance5); //innerHTML =balance3;
    }
    if (legendText3 != "NA") {
        jQuery('.legendColorLeftThree').css("background-color", colorCode3);
        jQuery('.textLegendLeftThree').html(legendText3 + ":"); //innerHTML =legendText1;
        jQuery('.textBalanceLegendLeftThreeHolder').html(balance4); //innerHTML = balance1;
        jQuery('.legendDetailsHolderRowThree').show();
    } else {
        jQuery('.legendDetailsHolderRowThree').hide();
    }
}
/*For allowing the user to select/check the radio buttons on Approver Details component
 *Fix for ticket id: 734986
 */
function invokeRadioButtonClickApproverDetails() {
    jQuery('.css-labelradio').bind('click', function(event) {
        jQuery(this).siblings().trigger('click');
    });

}
//Script to Resize AuthenticationScreen
function fontResizeOnldForAuthScreen() {
    if (document.getElementById("Layer1") != null) document.getElementById("Layer1").style.fontSize = "1.09em";
    if (document.getElementById("outerTab") != null) document.getElementById("outerTab").style.fontSize = "1.09em";
}
/*Function for appending left border to column headings of listing table
 *and making amount colunms right aligned.
 *It will append border to only those heading in which css class doesn't have border*/
function handleListingTableUI() {
    var userType;
    if (document.getElementById('usertype')) {
        userType = document.getElementById('usertype').value;
    } else if (document.getElementById('userType')) {
        userType = document.getElementById('userType').value;
    }
    if (userType == '2' || userType == '1') {
        for (t = 0; t < jQuery('table').length; t++) {
            var currTable = jQuery('table')[t];
            var amtCols = jQuery(currTable).find('[data-rightAlign="true"]');
            if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
                amtCols = jQuery('#MODAL_VIEW_CONTAINER').find('table').find('[data-rightAlign="true"]');
            }
            var indexs = [];
            //Logic for making amount columns right aligned
            for (j = 0; j < amtCols.length; j++) {
                jQuery(jQuery(amtCols)[j]).addClass('amtRightAlign');
                jQuery(jQuery(amtCols)[j]).parent().addClass('amtRightAlign');
            }
            var rowElements = jQuery(jQuery(currTable).find('[data-rightAlign="true"]')[0]).parent().parent().children('td');
            if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
                rowElements = jQuery('#MODAL_VIEW_CONTAINER').find('table').find('[data-rightAlign="true"]').parent().parent().children('td');
            }
            for (k = 0; k < rowElements.length; k++) {
                if (jQuery(jQuery(rowElements)[k]).find('[data-rightAlign="true"]').length > 0) {
                    indexs.push(k);
                }
            }
            //Logic for adding separator in table column heading if not present in style given in ppdl/dpdl
            var listSize = jQuery(currTable).find('th').length;
            if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
                listSize = jQuery('#MODAL_VIEW_CONTAINER').find('table').find('th').length;
            }
            var list = jQuery(currTable).find('th');
            if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
                list = jQuery('#MODAL_VIEW_CONTAINER').find('table').find('th');
            }
            var width;
            for (i = (listSize - 1); i > 0; i--) {
                if (jQuery("HTML").css("direction") == "rtl") {
                    width = parseInt(jQuery(list[i]).css('border-right-width'));
                } else {
                    width = parseInt(jQuery(list[i]).css('border-left-width'));
                }
                if (width != undefined && width != null && width === 0) {
                    jQuery(list[i]).addClass('tableColSep');
                }
                for (m = 0; m < indexs.length; m++) {
                    if (indexs[m] === i) {
                        jQuery(list[i]).addClass('HW_tableRightAlign');
                    }
                }
            }
            // Added for components overlapping footer when expand/collapse component present in page
            if (jQuery(jQuery('.container-xtralarge').children()).length > 0) {
                jQuery('.container-xtralarge').find('.widget-content').css('height', 'auto');
            }
        }
    }
}
// Added to clear the state value if country value is null
function onCountryChangeSR(cid, sid) {
    var cid = cid;
    var sid = sid;
    if (jQuery("[id='" + cid + "']").parent().parent().find("select").val() == "") {
        document.getElementById(sid).value = "";
    }
}

// Added functions for Tax Payment - START
function handlePaymentFormsViewList(groupletId) {
    console.log("inside on complete handlePaymentFormsAppQViewComplete");
    var id = groupletId + ":" + "PaymentFormsListFG.BENEFICIARY_ID";
    jQuery('[id="' + id + '"]').trigger('change');
}

function setSelectedVal(element) {
    var id = jQuery(element).attr('id');
    selectedIndexSC = document.getElementById(id).selectedIndex;
}

function completeDropdown3(grpId) {
    var elementId = grpId + ":" + "PaymentFormsListFG.SERVICE_CODE";
    try {
        jQuery("[id$='" + elementId + "'] option")[selectedIndexSC].selected = true;
        jQuery("[id$='" + elementId + "']").febaCombobox("update");

    } catch (e) {
        selectedIndexSC = 0;
    }
}

function categoryOnchange(element) {

    try {
        setTimeout(function() {
            jQuery("[id$='PaymentFormsListFG.BENEFICIARY_ID'] option")[0].selected = true;
            jQuery("[id$='PaymentFormsListFG.BENEFICIARY_ID']").febaCombobox("update");
        }, 500);
    } catch (e) {
        LOG.logMessages("Drop down update failed");
    }

}

function bnfIDOnchange(element) {

    //selectedIndexSC = 0;
    var id = jQuery(element).attr('id');
    selectedIndexBNF = document.getElementById(id).selectedIndex;

    if (bnfIDIndex != selectedIndexBNF) {
        selectedIndexSC = 0;
        try {
            setTimeout(function() {
                jQuery("[id$='PaymentFormsListFG.SERVICE_CODE'] option")[0].selected = true;
                jQuery("[id$='PaymentFormsListFG.SERVICE_CODE']").febaCombobox("update");
            }, 500);
        } catch (e) {
            LOG.logMessages("Drop down update failed");
        }
    }
}
// Added functions for Tax Payment - END
// Added by Devi_Sruthi for controlling the visibility of some fields in Schedules screen on click of Schedule Now radio button
// fix for firestone ticket 743994
function disableRangeOfRec(id, title) {
    if (id == 'CorpAdminFWFG.RECURRING_PATTERN_INDEX' && title == 'Schedule Now') {
        document.getElementById("LabelForControl30073944").style.visibility = 'hidden';
        document.getElementById("LabelForControl6479251").style.visibility = 'hidden';
        document.getElementById("CorpAdminFWFG.REPORT_START_DATE").style.visibility = 'hidden';
        document.getElementById("CorpAdminFWFG.REPORT_START_DATE_Calendar_IMG").style.visibility = 'hidden';
        var x = document.getElementsByTagName("input");
        for (var i = 0; i < x.length; i++) {
            var title = x[i].title;
            var n = title.search("End");
            if (n != -1) {
                x[i].style.visibility = 'hidden';
            }
        }
        document.getElementById("LabelForControl33513295").style.visibility = 'hidden';
        document.getElementById("LabelForControl6384321").style.visibility = 'hidden';
        document.getElementById("LabelForControl29857198").style.visibility = 'hidden';
        document.getElementById("CorpAdminFWFG.MAX_OCCURENCES").style.visibility = 'hidden';
        document.getElementById("LabelForControl19910583").style.visibility = 'hidden';
        document.getElementById("LabelForControl27019120").style.visibility = 'hidden';
        document.getElementById("CorpAdminFWFG.REPORT_END_DATE").style.visibility = 'hidden';
        document.getElementById("CorpAdminFWFG.REPORT_END_DATE_Calendar_IMG").style.visibility = 'hidden';
        document.getElementById("LabelForControl17291122").style.visibility = 'hidden';
        document.getElementById("LabelForControl33488111").style.visibility = 'hidden';
        document.getElementById("CorpAdminFWFG.START_TIME_HH").style.visibility = 'hidden';
        document.getElementById("LabelForControl7697501").style.visibility = 'hidden';
        document.getElementById("CorpAdminFWFG.START_TIME_MM").style.visibility = 'hidden';
    } else {
        document.getElementById("LabelForControl30073944").style.visibility = 'visible';
        document.getElementById("LabelForControl6479251").style.visibility = 'visible';
        document.getElementById("CorpAdminFWFG.REPORT_START_DATE").style.visibility = 'visible';
        document.getElementById("CorpAdminFWFG.REPORT_START_DATE_Calendar_IMG").style.visibility = 'visible';
        var x = document.getElementsByTagName("input");
        for (var i = 0; i < x.length; i++) {
            var title = x[i].title;
            var n = title.search("End");
            if (n != -1) {
                x[i].style.visibility = 'visible';
            }
        }
        document.getElementById("LabelForControl33513295").style.visibility = 'visible';
        document.getElementById("LabelForControl6384321").style.visibility = 'visible';
        document.getElementById("LabelForControl29857198").style.visibility = 'visible';
        document.getElementById("CorpAdminFWFG.MAX_OCCURENCES").style.visibility = 'visible';
        document.getElementById("LabelForControl19910583").style.visibility = 'visible';
        document.getElementById("LabelForControl27019120").style.visibility = 'visible';
        document.getElementById("CorpAdminFWFG.REPORT_END_DATE").style.visibility = 'visible';
        document.getElementById("CorpAdminFWFG.REPORT_END_DATE_Calendar_IMG").style.visibility = 'visible';
        document.getElementById("LabelForControl17291122").style.visibility = 'visible';
        document.getElementById("LabelForControl33488111").style.visibility = 'visible';
        document.getElementById("CorpAdminFWFG.START_TIME_HH").style.visibility = 'visible';
        document.getElementById("LabelForControl7697501").style.visibility = 'visible';
        document.getElementById("CorpAdminFWFG.START_TIME_MM").style.visibility = 'visible';
    }
}

function RHSaligninAccounts(groupletId) {
    var masterGroupeltId = "";
    masterGroupletId = jQuery(jQuery('.pageLeftContainer').find("[data-groupletid]")[0]).attr('data-groupletid');
    handleRHSAlignment(masterGroupletId);
}

/*Fix for call id 645188 starts*/
function clearSearchPanelFields(val, container, idType) {

    var inputElement = '';
    var dropdownValues = '';
    var textElement = '';
    var selectedOption = '';
    var fieldName = '';
    var field = '';
    var radioMap = {};

    //var groupletId=feba.domManipulator.getAttribute(this.content[0],Constants.GROUPLET_ID_ATTR);
    /* Clearing the Dropdown --Start*/
    if (idType == 'class') {
        container = '.' + container;
    } else if (idType == 'id') {

        /*Code to get the Grouplet Id--Start */

        var buttonId = jQuery(val).attr('id');

        var groupletId = buttonId.substring(0, buttonId.indexOf(":"))
        /*Code to get the Grouplet Id--End */

        if (groupletId.length > 0) {
            container = '#' + groupletId + '\\:' + container;
        } else {
            container = '#' + container;
        }
    }
    var selectFields = jQuery(container).find('select');

    var disabled = '';

    for (var count = 0, length = selectFields.length; count < length; count++) {
        inputElement = jQuery(selectFields[count]).parent().find('input');
        dropdownValues = jQuery(inputElement).siblings(".autocomplete-values");
        textElement = jQuery(selectFields[count]).parent().siblings('.autocomplete-dropdown');

        disabled = jQuery(textElement).attr('disabled');

        if (disabled != "disabled") {
            selectedOption = dropdownValues.find("option:first");
            if (typeof selectedOption !== typeof undefined) {
                jQuery(textElement).val(jQuery(selectedOption).text());
                dropdownValues.val(jQuery(selectedOption).val()).change();
            }
        }
    }
    /* Clearing the Dropdown --End*/


    /* Radio Button Clear --Start */
    var radiofields = jQuery(container).find('input[type="radio"]');

    for (var radioCount = 0, radioLength = radiofields.length; radioCount < radioLength; radioCount++) {
        field = radiofields[radioCount];

        disabled = jQuery(field).attr('disabled');

        if (disabled != "disabled") {
            fieldName = jQuery(field).attr('name');

            if (fieldName in radioMap) {
                jQuery(field).prop('checked', false);
            } else {
                radioMap[fieldName] = '';
                jQuery(field).prop('checked', true);
            }
        }
    }
    /* Radio Button Clear --End */


    /* Text Fields Clear --Start */
    var textfields = jQuery(container).find('input').not(jQuery(container).find('.autocomplete-dropdown')).not(jQuery(container).find('.select-dropdown')).not(jQuery(container).find('input[type="radio"]'));
    for (var count = 0, length = textfields.length; count < length; count++) {
        field = textfields[count];
        disabled = jQuery(field).attr('disabled');
        switch (field.type) {
            case 'checkbox':
                if (disabled != "disabled") {
                    jQuery(field).prop('checked', false);
                }
                break;
            case 'text':
            case 'password':
            case 'hidden':
                if (disabled != "disabled") {
                    jQuery(field).val('');
                }
        }
    }
    /* Text Fields Clear --End */

    /* TextArea Fields Clear --Start */
    var textAreafields = jQuery(container).find('textarea');
    for (var count = 0, length = textAreafields.length; count < length; count++) {
        disabled = jQuery(field).attr('disabled');
        if (disabled != "disabled") {
            jQuery(textAreafields[count]).val('');
        }
    }
    /* TextArea Fields Clear --End */
}
/*Fix for call id 645188 ends*/


//Added for Quick Teller Start
function billerAmountReadOnly(groupletId) {



    if (groupletId == null || groupletId == "" || groupletId == "undefined") {
        var grpId = "";
        var formgroupName = document.getElementById('FORMSGROUP_ID__').value;
    } else {
        //PageConfigurationMaster_BLLSQTW__1:GROUPLET_FORMSGROUP_ID__
        var grpId = "";
        var formgroupName = document.getElementById(groupletId + ':' + 'GROUPLET_FORMSGROUP_ID__').value;
    }
    var billReadOnly = true;
    var billNReadOnly = false;

    // PageConfigurationMaster_BLLSQTW__1:TranRequestManagerFG.ENTRY_AMT


    if (null != document.getElementById(groupletId + ':' + formgroupName + '.AMT_READ_ONLY').value && document.getElementById(groupletId + ':' + formgroupName + '.AMT_READ_ONLY').value == "Y") {
        document.getElementById(groupletId + ':' + formgroupName + '.ENTRY_AMT').readOnly = billReadOnly;
    } else {
        document.getElementById(groupletId + ':' + formgroupName + '.ENTRY_AMT').readOnly = billNReadOnly;
    }
    return;
}
//Added for Quick Teller End