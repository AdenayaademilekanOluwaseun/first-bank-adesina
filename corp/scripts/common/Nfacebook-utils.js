/**
 * facebook-utils.js
 * Utilities for Facebook Integration
 *
 * Created on jun,1 2009
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

function facebookInit(inputAppId, inputStatus, inputCookie, inputOauth,
    inputFrictionlessRequests) {

    FB.init({
        appId: inputAppId,
        status: inputStatus,
        cookie: inputCookie,
        oauth: inputOauth,
        frictionlessRequests: inputFrictionlessRequests
    });
}

function sendAppRequestToRecipients(inputRecipientUserIds, inputRequestMessage,
    inputCallbackFunction) {

    FB.ui({
        method: 'apprequests',
        message: inputRequestMessage,
        to: inputRecipientUserIds
    }, inputCallbackFunction);
}

function defaultAppRequestCallback(response) {

}


function mycarousel_itemFirstInCallback(carousel, item, idx, state) {
    alert("Hello");
    if (carousel.has(idx + 1)) {
        var myListElement = carousel.get(idx + 1);
        var selectedFriendId = myListElement.attr('id');
        var selectedFriendName = myListElement.attr('name');
        var inputFriendElement = document.getElementById(selectedFriendName);
        inputFriendElement.setAttribute('value', selectedFriendId);
        jQuery(myListElement).css('font-weight', 'bold');
        jQuery(myListElement).css('opacity', '1.0');
    }
    if (carousel.has(idx + 2)) {
        var myListElementNext = carousel.get(idx + 2);
        jQuery(myListElementNext).css('font-weight', '');
        jQuery(myListElementNext).css('opacity', '0.4');
    }
    if (carousel.has(idx)) {
        var myListElementPrevious = carousel.get(idx);
        jQuery(myListElementPrevious).css('font-weight', '')
        jQuery(myListElementPrevious).css('opacity', '0.4');
    }
}