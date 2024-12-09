/**
 * GeoTagging.js
 * @author Mohd_Aleemuddin
 * @Since 09 May 2012.
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

/**
 * @author Mohd_Aleemuddin
 * @Since 09 May 2012. This method will get the user geo-Location using the
 *        HTML5 geoLocation The user has to give permission to share the
 *        geo-Location
 */

function getGeoLocationHTML5(option, param) {
    params = param;
    options = option;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition, problemhandler);
    } else {
        alert("geolocation services are not supported by your browser");
    }
}

/**
 * @author Mohd_Aleemuddin
 * @Since 09 May 2012. This method will get the user geo-Location using the Web
 *        services
 * <IMP>This method is to implemented at the time of Implementation.Sample method is provided in the related documents<IMP>       
 */
function getGeoLocationService(option, param) {
    // This method is to implemented at the time of Implementation.Sample method is provided in the related documents.
}

/**
 * @author Mohd_Aleemuddin
 * @Since 09 May 2012. This method will get the user location coordinates and
 *        raises an Ajax call to set the Geo-Location Coordinates into the
 *        Context
 */
function getPosition(position) {
    city = " ";
    region = " ";
    country = " ";
    getAddress();
    if (typeof(latitude) != "undefined") {
        results = position.coords.latitude + "$$" + position.coords.longitude +
            "$$" + position.coords.accuracy + "$$" + city + "$$" + region +
            "$$" + country + "$$";
        options.parameters = params + ".__GEO_LOC__=" + results;
        LOG.logMessages(this,
            "In event handler Execute method,raising the request ");
        this.request = new feba.js.ajax.ajaxRequest(options);
    }
}

/**
 * @author Mohd_Aleemuddin
 * @Since 09 May 2012. This method will be called if there is an error while
 *        fetching the user Geo-Location
 */
function problemhandler(prob) {
    switch (prob.code) {
        case 1:
            alert("User declined to share the location information.");
            break;
        case 2:
            alert("Errors in getting base location.");
            break;
        case 3:
            alert("Timeout in getting base location.");
    }
    alert("Base location needs to be set!");
}

/**
 * @author Mohd_Aleemuddin
 * @Since 09 May 2012. This method will be called for getting the city,Region and country 
 *        of the user location.
 * <IMP>This method is to implemented at the time of Implementation<IMP>       
 */
function getAddress() {
    //This method is to implemented at the time of Implementation
}