/**
 * NmenuAuthorization.js
 * This file includes the methods used to do menu authorization.
 * Authorization enabled menu will use these script methods to show 
 * authorization component in a modal view.
 * Adaptive authorization enabled menu will make an Ajax call and
 * decides whether the user can be allowed to view the page or 
 * have to be authorized to view the page. 
 *
 * Created on Apr,16 2014
 * COPYRIGHT NOTICE:
 * Copyright (c) 2004 Infosys Technologies Limited, Electronic City,
 * Hosur Road, Bangalore - 560 100, India.
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Infosys Technologies Ltd. ("Confidential Information"). You shall
 * not disclose such Confidential Information and shall use it only
 * in accordance with the terms of the license agreement you entered
 * into with Infosys.
 */

// Script method called on click of authorization enabled menu
function requestServer(adaptiveMode, jsonObj) {
    if (adaptiveMode == 'N') {
        ShowModalView(jsonObj);
    } else {
        checkRisk(jsonObj);
    }
}
// Script to check risk in accessing menu by creating an ajax request
function checkRisk(jsonObj) {
    var cRiskUrl = jsonObj.ModalUrl.split('$J-s)').join('%');
    var ajaxOptions = jQuery.extend({
        parser: new LIB.Parser("html"),
        requestId: 0,
        baseUrl: cRiskUrl,
        parameters: '',
        target: '',
        handler: function(options) {
            receiveRiskResponse(options, jsonObj);
        },
        displayExceptions: true,
        executeOnLoad: false
    }, {});
    //Added to prevent simultaneous request firing
    feba.domManipulator.blockUI({
        message: '<div style="text-align: center;"><img src="L001/consumer/images/widget-loading.gif"/></div>',
        baseZ: 9999
    });
    var ajaxObject = new feba.js.ajax.ajaxRequest(ajaxOptions);
}
// Script to receive the response of check risk ajax request
function receiveRiskResponse(options, jsonObj) {
    feba.domManipulator.unblockUI();
    if (options) {
        var localDM = feba.domManipulator;
        var businessRespType = options.parser.exceptionType;
        var businessError = (businessRespType === "BE" || businessRespType === "BC" || businessRespType === "CE" || false);
        if (businessError) {
            var errorMessage = localDM.find(localDM.getElement(options.parser.content), "#MessageDisplay_TABLE");
            handleErrors(errorMessage.wrap("<p/>").parent()[0].innerHTML, null, 0, true);
        } else {
            var viewId = options.XMLHttpRequest.getResponseHeader("VIEW_ID");
            if (viewId == "Authorization") {
                ShowModalView(jsonObj);
            } else {
                loadPage(jsonObj);
            }
        }
    }
}
// Script to load screen in a normal page by creating an ajax request
function loadPage(jsonObj) {
    //Added to prevent simultaneous request firing
    feba.domManipulator.blockUI({
        message: '<div style="text-align: center;"><img src="L001/consumer/images/widget-loading.gif"/></div>',
        baseZ: 9999
    });
    var menuUrl = jsonObj.MenuUrl.split('$J-s)').join('%');
    var ajaxOptions = {
        parser: new LIB.Parser("html"),
        baseUrl: menuUrl,
        parameters: '',
        target: '',
        handler: function(options) {
            receiveResponse(options);
        },
        displayExceptions: true,
        executeOnLoad: false
    };
    var ajaxObject = new feba.js.ajax.ajaxRequest(ajaxOptions);

}
// Script to receive the response of page load ajax request
function receiveResponse(options) {
    feba.domManipulator.unblockUI();
    if (options) {
        var localDM = feba.domManipulator;
        var parser = options.parser;
        var businessRespType = parser.exceptionType;
        var businessError = (businessRespType === "BE" || businessRespType === "BC" || businessRespType === "CE" || false);
        if (businessError) {
            var errorMessage = localDM.find(localDM.getElement(options.parser.content), "#MessageDisplay_TABLE");
            handleErrors(errorMessage.wrap("<p/>").parent()[0].innerHTML, null, 0, true);
        } else {
            parser.contentScripts = parser.content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
            parser.content = parser.content.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), "");
            jQuery('body')[0].innerHTML = options.XMLHttpRequest.responseText;
            var scriptsLength = parser.contentScripts.length;
            var element = jQuery('div:last');
            window.ajaxPageRefresh = "true";
            for (var index = 0; index < scriptsLength; index++) {
                try {
                    element.append(parser.contentScripts[index]);
                } catch (e) {
                    LOG.logMessages("Error while parsing the script content ");
                }
            }
        }
    }
}
// Script to show a modal view
function ShowModalView(jsonObj) {
    var bUrl = jsonObj.ModalUrl.split('$J-s)').join('%');
    var options = {
        startIndex: '0',
        width: '500',
        tagHelper: 'MODAL_VIEW.TagHelper',
        endIndex: '1',
        baseUrl: bUrl,
        height: '250',
        hideTitle: 'true',
        asynchronous: 'false',
        refresh: 'LOAD',
        update: 'LOAD'
    };
    var tempModal = feba.features["MODAL_VIEW_CONTAINER"] = new feba.js.ajax.modalView(options);
    tempModal.execute();
}
// Script to display errors
function handleErrors(formattedError, FormFieldsInError, groupletId, displayExceptions, errorHighlightLocation, errorMsgLoaction) {
    LIB.__HANDLE_ERROR__(this.riaFeatureID, formattedError, FormFieldsInError, groupletId, displayExceptions, false, "", errorHighlightLocation, errorMsgLoaction);
}