/**
 * mashup.js
 * COPYRIGHT NOTICE:
 * Copyright (c) 2007 Infosys Technologies Limited, Electronic City,
 * Hosur Road, Bangalore - 560 100, India.
 * All Rights Reserved.
 * This software is the confidential and proprietary information of
 * Infosys Technologies Ltd. ("Confidential Information"). You shall
 * not disclose such Confidential Information and shall use it only
 * in accordance with the terms of the license agreement you entered
 * into with Infosys.
 */


function callServer(link, divId, aggregationServlet) {

    var ajax_load = "<img src='img/load.gif' alt='loading...' />";

    jQuery("#" + divId).html(ajax_load).load(
        aggregationServlet + "?ahref=" + link + "&divId=" + divId);

}

function callServerWithFormSubmit(link, divId, aggregationServlet, formId) {

    // TODO: manu change this later to search only within the current div
    var formParams = jQuery("#" + formId).serialize();

    var ajax_load = "<img src='img/load.gif' alt='loading...' />";

    jQuery("#" + divId).html(ajax_load).load(
        aggregationServlet + "?ahref=" + link + "&divId=" + divId + "&" +
        formParams);

}

function getHeightBrowserCompliant() {
    var myHeight = 0;
    if (typeof(parent.window.innerWidth) == 'number') {
        //Non-IE
        myHeight = parent.window.innerHeight;
    } else if (parent.document.documentElement &&
        (parent.document.documentElement.clientWidth || parent.document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myHeight = parent.document.documentElement.clientHeight;
    } else if (parent.document.body &&
        (parent.document.body.clientWidth || parent.document.body.clientHeight)) {
        //IE 4 compatible
        myHeight = parent.document.body.clientHeight;
    }
    //window.alert( 'Height = ' + myHeight );
    return myHeight;
}

function AssignFrameHeight(iFrameId) {

    //alert("manu test AssignFrameHeight executed"); 

    var theFrame = jQuery("#" + iFrameId, parent.document.body);
    var frameHeight1 = getIframeHeight(iFrameId);
    var frameHeight2 = jQuery(document.body).height();
    if (jQuery(document.body)[0]) {
        if (jQuery(document.body)[0].bottomMargin)
            frameHeight2 += Number(jQuery(document.body)[0].bottomMargin);
        if (jQuery(document.body)[0].topMargin)
            frameHeight2 += Number(jQuery(document.body)[0].topMargin);
    }
    if (frameHeight1 > frameHeight2) {
        theFrame.height(frameHeight1 - 20);
    } else {
        if (jQuery.browser.msie)
            theFrame.height(frameHeight2 - 280);
        else
            theFrame.height(frameHeight2 - 280);
    }
}

function getIframeHeight(iframeName) {
    //var iframeWin = window.frames[iframeName];
    var iframeEl = parent.document.getElementById ? parent.document
        .getElementById(iframeName) :
        parent.document.all ? parent.document.all[iframeName] : null;
    if (iframeEl) {
        iframeEl.style.height = "auto"; // helps resize (for some) if new doc shorter than previous
        //var docHt = getDocHeight(iframeWin.document);
        // need to add to height to be sure it will all show
        var h = getHeightBrowserCompliant();
        //var new_h = (h - 148);
        //iframeEl.style.height = h + "px";
        return h;
        //alertSize();
    }
}

var handleEventInWidgetFunction = function handleEventInWidget(event) {
    alert('i am here');
    var target = feba.domManipulator.getElementIdFromEvent(event);
    alert('target is ' + target);
    $target = feba.domManipulator.getElementById(target);

    alert('got a click from ' + $target[0].nodeName);

    if ($target[0].nodeName == 'A') {

        alert('i am here');
        /*		var hyperLink = $target;
        		feba.features['ContainerGrouplet'].options.baseUrl = feba.domManipulator.getAttribute(hyperLink,Constants.HREF);
        		feba.features['ContainerGrouplet'].options.groupletParameters = '__RIA__'+'='+'GROUPLET'+'&'+contentId+'='+'ContainerGrouplet';
        		var column1DivElements = feba.domManipulator.getElement('[class="column column-1"] > *');
        		feba.domManipulator.remove(column1DivElements);
        		setLoadingImage();
        		feba.features['ContainerGrouplet'].execute();
        		feba.domManipulator.preventDefault(event);*/
    } else if ($target[0].nodeName == 'INPUT' && feba.domManipulator.getAttribute($target, 'type') == 'submit') {
        /*		var column1DivElements = feba.domManipulator.getElement('[class="column column-1"] > *');
        		var frm = feba.domManipulator.getElement("<form></form>");
        		feba.domManipulator.css(frm,"display", "none");
        		var button = $target;
        		//var clonedElements = feba.domManipulator.clone(column1DivElements);
        		feba.domManipulator.append(frm, column1DivElements);
        		setLoadingImage();
        		feba.features['ContainerGrouplet'].options.baseUrl = controllerName;
        		feba.features['ContainerGrouplet'].options.groupletParameters=feba.domManipulator.serialize(frm).replace(/\+/g," ")
        		+'&'+contentId+'='+'ContainerGrouplet'+'&'+'__RIA__'+'='+'GROUPLET'
        		+'&'+feba.domManipulator.getAttribute(button,Constants.NAME)+'='+feba.domManipulator.getAttribute(button,Constants.VALUE);
        		feba.features['ContainerGrouplet'].execute();
        		feba.domManipulator.preventDefault(event);*/
    }




};