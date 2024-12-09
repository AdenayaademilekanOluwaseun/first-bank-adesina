//Function will be called when user selects any option from combo box list
function postListingDetailRecord(obj) {
    var post = "POST";
    //get the selected combo box value
    var selectedValue = obj.options[obj.selectedIndex].value;
    var intIndexOfMatch = selectedValue.indexOf(" ");
    while (intIndexOfMatch != -1) {
        selectedValue = selectedValue.replace(" ", "%", selectedValue);
        intIndexOfMatch = selectedValue.indexOf(" ");
    }
    document.forms[0].method = post;
    document.forms[0].action = selectedValue;
    document.forms[0].submit()
}

//Script to show/hide Menu options on mouse out
function hidePullDownMenu(element) {
    //Check for Browser type
    var isIEBrowser = navigator.appName.indexOf("Microsoft") != -1;
    // Get the elementValue
    var elementVal = feba.domManipulator.find(feba.domManipulator.getElement(element), ".menuChoices>ul");

    // The below code added to avoid blinking of pull down menu in IE browser
    if (isIEBrowser) {
        //Get the event target, ie. the element the mouse moved onto
        var eventTarget = window.event;
        // In the layer, we're still not sure if the mouse left the layer or entered a link within the layer. 
        // Therefore we're going to check the relatedTarget/toElement of the event, ie. the element the mouse moved to.
        var relatedTarget = eventTarget.toElement;
        // check if the releatedTarget is of Type ('A','LI','UL')
        // If not 'A','LI','UL' then hide the pull down menu
        if (null != relatedTarget) {
            if (relatedTarget.nodeName != 'A' && relatedTarget.nodeName != 'LI' &&
                relatedTarget.nodeName != 'UL') {
                elementVal[0].style.visibility = 'hidden';
            }
        } else {
            elementVal[0].style.visibility = 'hidden';
        }
    } else {
        elementVal[0].style.visibility = 'hidden';
    }
}

//Script to show Menu options on mouse over
function showPullDownMenu(element, event, eventType) {
    // Get the elementValue
    var elementVal = feba.domManipulator.find(feba.domManipulator.getElement(element), ".menuChoices>ul");

    if ("onmouseout" == eventType) {
        //Show the pull down menu
        elementVal[0].style.visibility = 'visible';
    } else {
        //eventType is onClick		
        feba.domManipulator.closeActivePulldown(event);
        feba.domManipulator.stopPropagation(event);
        feba.domManipulator.stopImmediatePropagation(event);

        // Workaround to solve issues due to stopping bubbling above.
        feba.domManipulator.trigger(feba.domManipulator.getElement("body"), "click");

        //Show the pull down menu
        elementVal[0].style.visibility = 'visible';

        feba.activePulldown = element;
        feba.domManipulator.bind(feba.domManipulator.getElement(document), "click.pulldown", undefined, feba.domManipulator.closeActivePulldown);
    }
}
//function will close the active pulldown on Click of Menu Options
function closeActivePullDownOnClick(event) {
    //Close Active pulldown
    feba.domManipulator.closeActivePulldown(event);
}

// Handling for EBUX 3 pulldown: Handles display and closing of pulldown in click case.
function controlPullDownMenu(element, event, closeEventType) {
    var domMan = feba.domManipulator,
        element = domMan.parent(element), // Get the div with .hasPulldownMenu
        elementVal = domMan.find(domMan.getElement(element), ".menuChoices");
    //Added for nextgen4 details pulldown issue
    var elementForUiDisplay = element;
    if (jQuery(element).hasClass('nextGenDetailsPagePulldownHolderCol')) {
        elementForUiDisplay = jQuery(element).children()[0];
    }
    if (jQuery('.dashboardSection').length > 0 && jQuery('.nextGenDetailsPagePulldownHolder').find(element).length > 0) {

        var groupletIdVar = "";
        var elementidentifierVar = jQuery(element).attr('id');
        if (elementidentifierVar && elementidentifierVar.indexOf(':') != -1) {
            var elementidentifierVar = elementidentifierVar.split(":");
            groupletId = elementidentifierVar[0];
        }
        elementForUiDisplay = jQuery('#' + groupletId).find('.hasNextGenPulldown');
    }
    // Changes done for TOL - 700863
    if (jQuery('.dashboardSection').length > 0 && jQuery(elementForUiDisplay).hasClass('hasPulldownMenu')) {
        var groupletId = "";
        var elementidentifier = jQuery(elementForUiDisplay).attr('id');
        if (elementidentifier && elementidentifier.indexOf(':') != -1) {
            var gropIdElement = elementidentifier.split(":");
            groupletId = gropIdElement[0];
        }
        jQuery('#' + groupletId).addClass('noOverflow');
        var leftVal = jQuery('#' + groupletId).parent().parent().offset().left;

        if (leftVal < 250) {
            jQuery(elementForUiDisplay).find('.menuChoices').addClass("menuDisplayLeft");
        } else {
            jQuery(elementForUiDisplay).find('.menuChoices').removeClass("menuDisplayLeft");
        }
    }
    // Changes done for TOL - 700863
    else if (jQuery('.dashboardSection').length == 0 && jQuery(elementForUiDisplay).hasClass('hasPulldownMenu')) {
        var groupletId1 = "";
        var elementidentifier = jQuery(elementForUiDisplay).attr('id');
        if (elementidentifier && elementidentifier.indexOf(':') != -1) {
            var gropIdElement1 = elementidentifier.split(":");
            groupletId1 = gropIdElement1[0];
        }
        if (viewport().width < 900 && viewport().width > 639) {

            var parElement = jQuery('#' + groupletId1).parent().parent().parent();

            if (jQuery(parElement).hasClass('container-nxtGenxtrasmall')) {
                var leftVal = jQuery('#' + groupletId1).parent().parent().offset().left;

                if (leftVal < 250) {
                    jQuery(elementForUiDisplay).find('.menuChoices').addClass("menuDisplayLeft");
                } else {
                    jQuery(elementForUiDisplay).find('.menuChoices').removeClass("menuDisplayLeft");
                }
                jQuery(parElement).css('position', 'inherit');
            }
        } else {
            jQuery(elementForUiDisplay).find('.menuChoices').removeClass("menuDisplayLeft");
        }
    }
    domMan.showElement(elementVal);

    if (closeEventType === "onclick") {
        feba.js.common.documentClickWatcher.register(element, {
            callBack: function(config, e) {
                if (domMan.getMatchedElementCount(domMan.hasElementsMatching(element, e.target)) === 0) {
                    feba.js.common.documentClickWatcher.deregister(element);
                    feba.domManipulator.hideElement(feba.domManipulator.find(feba.domManipulator.getElement(element), ".menuChoices"));
                    var elementForUiDisplay = element;
                    if (jQuery(element).hasClass('nextGenDetailsPagePulldownHolderCol')) {
                        elementForUiDisplay = jQuery(element).children()[0];
                    }
                    // Changes done for TOL - 700863
                    if (jQuery(elementForUiDisplay).hasClass('hasPulldownMenu')) {
                        if (viewport().width < 900 && viewport().width > 639) {
                            var groupletId1 = "";
                            var elementidentifier = jQuery(elementForUiDisplay).attr('id');
                            if (elementidentifier && elementidentifier.indexOf(':') != -1) {
                                var gropIdElement1 = elementidentifier.split(":");
                                groupletId1 = gropIdElement1[0];
                            }
                            var parElement = jQuery('#' + groupletId1).parent().parent().parent();

                            if (jQuery('.dashboardSection').length == 0 && jQuery(parElement).hasClass('container-nxtGenxtrasmall')) {
                                console.log(jQuery(parElement).attr('id'));
                                jQuery(parElement).css('position', 'relative');
                            }
                        }
                    }
                }
            }
        });
    }
};

// Handling for EBUX 3 pulldown: Handles closing of pulldown 
function closePulldownMenu(element, closeEventType) {
    var domMan = feba.domManipulator,
        element = domMan.parents(element, ".hasPulldownMenu");

    if (closeEventType === "onclick") {
        feba.js.common.documentClickWatcher.deregister(element);
    }
    domMan.hideElement(domMan.find(domMan.getElement(element), ".menuChoices"));
};