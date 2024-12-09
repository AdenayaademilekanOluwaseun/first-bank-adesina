/**
 * FEBAJavaScripts.js
 * The Container and Controller Object for all JavaScript objects
 * It loads all other script files.It is loaded from FEBAScripts.js
 * It contains objects to parse the Ajax response
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

feba.js = {

    name: "feba.js",

    description: "",

    version: "1.0",


    // array to store the child objects which have been instantiated
    jsObjects: [],

    // variable to indicate whether to raise the request
    startFlag: true,

    // Adds the object which has been instantiated
    add: function(object) {
        LIB.__ADD__(this.jsObjects, object);
    },

    // Removes the object from the array
    remove: function(object) {
        LIB.__REMOVE__(this.jsObjects, object);
    },

    // start all objects
    startRequest: function() {
        LIB.__START__.bind(this)(this.jsObjects, feba.startFlag);
    },

    // stops all objects
    stopRequest: function() {
        LIB.__STOP__.bind(this)(this.jsObjects);
    },

    // Returns the startFlag
    isRunning: function() {
        LIB.__IS_RUNNING__.bind(this)();
    },

    //Includes the JavaScript File
    include: function(type, file) {
        if (type == Constants.FEBA_COMMON) {
            feba.domManipulator.write('<script type="text/JavaScript" src=' + feba.scriptsPath + "/common/N" + file + '></script>');
        }
        /*Added for middle east gap2 project --Start*/
        else if (type == Constants.FEBA_COMMONJ) {
            feba.domManipulator.write('<script type="text/JavaScript" src=' + feba.scriptsPath + "/common/" + file + '></script>');
        }
        /*Added for middle east gap2 project --End*/
        else if (type == Constants.FEBA_PAGE) {
            feba.domManipulator.write('<script type="text/JavaScript" src=' + feba.scriptsPath + "/module/" + feba.moduleId + "/N" + file + '></script>');

        } else if (type == Constants.FEBA_AJAXFEATURES) {
            feba.domManipulator.write('<script type="text/JavaScript" src=' + feba.scriptsPath + "/ria/ajaxfeatures/" + file + '></script>');
        } else if (type == Constants.FEBA_EFFECTS) {
            feba.domManipulator.write('<script type="text/JavaScript" src=' + feba.scriptsPath + "/ria/visualeffects/N" + file + '></script>');
        } else if (type == Constants.FEBA_ADAPTIVEAUTH) {
            feba.domManipulator.write('<script type="text/JavaScript" src=' + feba.scriptsPath + "/adaptiveauthentication/" + file + '></script>');
        } else if (type == Constants.FEBA_ADAPTIVEAUTH_SOLUTION) {
            feba.domManipulator.write('<script type="text/JavaScript" src=' + feba.scriptsPath + "/adaptiveauthentication/" + ADAPTIVECONFIG.solutionType + "/" + file + '></script>');
        }
    },

    pageLevelJs: {},
    // Loads all required JS Files
    load: function() {

        //In case of Portal , JS Files should not be loaded dynamically

        //Loading of JS Files dynamically by calling include method with 2 parameters(file type and file name)
        //If a new file has to be included add a function call at the end with parameters i.e. file type and file name
        this.include(Constants.FEBA_COMMON, 'HWMails.js');
        this.include(Constants.FEBA_COMMON, 'tree1_format.js');
        //commented and moved out of NFEBAScripts.js to topbar.jsp inclusion
        //this.include(Constants.FEBA_COMMON,'calendar1.js');
        this.include(Constants.FEBA_COMMON, 'common.js');
        this.include(Constants.FEBA_COMMON, 'encrypt.js');
        this.include(Constants.FEBA_COMMON, 'json2.js');

        // changes done for Security Token Enh - Call id - 653560 : Start     		
        this.include(Constants.FEBA_COMMON, 'hmac-sha256.js');
        this.include(Constants.FEBA_COMMON, 'enc-base64-min.js');
        this.include(Constants.FEBA_COMMON, 'ClientValidator.js');
        // changes done for Security Token Enh - Call id - 653560 : End 
        // Prafulla_Badgujar Ticket No : 494042 Duplicate inclusion of 'dsprocessor.js' is removed.
        this.include(Constants.FEBA_COMMON, 'dsprocessor.js');
        this.include(Constants.FEBA_COMMON, 'Map.js');
        this.include(Constants.FEBA_COMMON, 'messages.js');
        this.include(Constants.FEBA_COMMON, 'messageFunctions.js');
        this.include(Constants.FEBA_COMMON, 'commonFunctions.js');
        this.include(Constants.FEBA_COMMON, 'xregexp.js');
        this.include(Constants.FEBA_COMMON, 'xregexp-unicode.js');
        this.include(Constants.FEBA_COMMON, 'typeDefinitionVal.js');
        this.include(Constants.FEBA_COMMON, 'typeSysValidation.js');
        this.include(Constants.FEBA_COMMON, 'cookieScript.js');
        this.include(Constants.FEBA_COMMON, 'groupletActionHandler.js');
        this.include(Constants.FEBA_COMMON, 'pageCustom.js');
        this.include(Constants.FEBA_COMMON, 'taglibs.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'NFEBAAjaxObjects.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'NFEBAWidgets.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'Noverlib_mini.js');
        this.include(Constants.FEBA_EFFECTS, 'FEBAVisualEffects.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'jquery-ui-custommin.js');
        this.include(Constants.FEBA_COMMON, 'options.js');
        this.include(Constants.FEBA_COMMON, 'EBGCD.js');
        this.include(Constants.FEBA_COMMON, 'CxpsGDHelper.js');
        this.include(Constants.FEBA_COMMON, 'CxpsCallFunctionsResponse.js');
        this.include(Constants.FEBA_COMMON, 'ListingDetails.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'jquery.simplemodal-1.4.1.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'jPaginate.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'jquery.qtip.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'richTextEditor.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'jquery.blockUI.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'jquery.nicescroll.js');
        this.include(Constants.FEBA_COMMON, 'AnalyticsEngine.js');
        this.include(Constants.FEBA_EFFECTS, 'FEBAAccordion.js');
        this.include(Constants.FEBA_COMMON, 'jquery-jcryption.js');
        this.include(Constants.FEBA_EFFECTS, 'FEBATabs.js');
        this.include(Constants.FEBA_EFFECTS, 'FEBATooltip.js');
        this.include(Constants.FEBA_EFFECTS, 'FEBACalendar.js');
        this.include(Constants.FEBA_COMMON, 'mashup.js');
        this.include(Constants.FEBA_COMMON, 'GeoTagging.js');
        this.include(Constants.FEBA_COMMON, 'facebook-utils.js');
        this.include(Constants.FEBA_AJAXFEATURES, 'jquery.jcarousel.js');
        /*this.include(Constants.FEBA_PAGE,'PFTotalAmountCalculator.js');*/

        /* Added for Adaptive Authentication, responsible for loading adaptive soln
         specific js files if adaptive authentication is enabled */
        this.include(Constants.FEBA_COMMON, 'FEBAJSConfiguration.js');
        this.include(Constants.FEBA_ADAPTIVEAUTH, 'adaptivecommon.js');
        this.include(Constants.FEBA_COMMON, 'interactivity.js');
        /*Added for middle east gap2 project --Start*/
        this.include(Constants.FEBA_COMMONJ, 'jquery.calendars.js');
        this.include(Constants.FEBA_COMMONJ, 'jquery.calendars.plus.js');
        this.include(Constants.FEBA_COMMONJ, 'jquery.calendars.islamic.js');
        this.include(Constants.FEBA_COMMONJ, 'jquery.calendars.picker.js');
        this.include(Constants.FEBA_COMMON, 'calendarPicker.js');
        /*Added for middle east gap2 project --End*/
        this.include(Constants.FEBA_EFFECTS, 'FEBACombobox.js');
        this.include(Constants.FEBA_EFFECTS, 'FEBAColourPicker.js');
        this.include(Constants.FEBA_COMMON, 'watermark.js');
        this.include(Constants.FEBA_COMMON, 'menuAuthorization.js');
        /* added for adaptive UI Smartphone -Start */
        this.include(Constants.FEBA_COMMON, 'CustomMobileCommon.js');
        /* added for adaptive UI Smartphone -end */
        //For additional modules add a new variable
        //in 'pageLevelJs' object. Variable name should correspond 
        //to "folder name" = "module id" eg -
        //For module level JS scripts should be in: WebContent/scripts/module/(moduleId)
        //	(moduleId) is the module Id and also folder name should be same. 
        //	The variable entered in 'pageLevelJs' object should be same as (moduleId)
        //and add an array of the javaScript file names present in that directory 
        //without the 'N' prefix, framework will prefix with 'N' eg: 
        //file present in WebContent/scripts/module/crpadmin is NAccessScript.js but we have added only AccessScript.js

        /* This configuration has been moved to NPageCustom.js
     		var pageLevelJs = {
     				"accounts" : [],
     				"crpadmin" : ["AccessScript.js"],
     				"DirectBanking" : ["AC_OETags.js","DepositCalculator.js","json.js","SavingsCalculator.js","utils.js"],
     				"mufu" : ["MFScript.js","MFSwitchScript.js"],
     				"servicerequest" : ["fnScript.js"],
     				"pfm" : ["PfmEbux3.js"]
     				
     		};
     		
     		if(feba.moduleId){
     			var currentModuleJs = pageLevelJs[feba.moduleId];
     			if(currentModuleJs){
	     			for(i=0;i<currentModuleJs.length;i++){
	     				this.include(Constants.FEBA_PAGE, currentModuleJs[i]);
	     			}
     			}
     		}*/

        feba.features = {};
        feba.add(feba.js);
        feba.loader.fnload(function() {
            feba.domManipulator.bind(feba.domManipulator.getElement("form"), 'submit', '', function(event) {
                var grpPrevSec = feba.domManipulator.getElementById("GroupletPanel");
                if (jQuery(grpPrevSec).find('.groupletPulldownIcon').length == 0) {
                    if (!(feba.domManipulator.getAttribute(event.target, "isDownloadAction") || (feba.domManipulator.getAttribute(event.target, "encoding") == "multipart/form-data"))) {
                        var grpSec = feba.domManipulator.getElementById("GroupletPanel");
                        var childWidgets = jQuery(grpSec).children().children();
                        for (i = 0; i < childWidgets.length; i++) {
                            var currChild = childWidgets[i];
                            var inputHidden = jQuery(currChild).find("input[type='hidden']");
                            if (!jQuery(currChild).hasClass('widget-xtrasmall')) {
                                jQuery(currChild).html("");
                            } else if (jQuery(currChild).hasClass('widget-xtrasmall')) {
                                for (j = 0; j < inputHidden.length; j++) {
                                    jQuery(inputHidden[j]).remove();
                                }
                            }
                        }
                        //feba.domManipulator.getElementById("GroupletPanel").html("");
                    }
                }
                if (feba.domManipulator.getElement("form")[0] === event.target) {
                    feba.domManipulator.setAttribute(event.target, "isDownloadAction", "false");
                }
            });
        });
        jQuery(document).ready(function() {
            feba.loader.executeAll();
        });

    },

    //override toString  function
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.ajaxObjects);
    },

    accounts: {},
    crpAdmin: {},
    directBanking: {},
    mufu: {},
    serviceRequest: {},
    ipo: {},
    transaction: {}
};

feba.js.load();

/**
 * This object contains the methods to parse the response based on type.
 */
//LIB.Parser = Class.create( {
feba.domManipulator.createBaseClass("LIB.Parser", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(defaultType, isPlainText) {
        this.type = defaultType || "xml";
        this.plaintext = false;
        if (arguments.length >= 2) {
            this.plaintext = (isPlainText && true);
        }
        this.content = null;
        this.contentText = null;
        this.contentXML = null;
        this.response = null;
    },
    /**
     * Calls the Parser method to parse the response
     */
    load: function(request, currentObject) {
        if (CONFIG.operatingMode === 'UnitTesting') {
            LOG.logMessages(this, "In Testing Mode , Parser is loaded");
            return null;
        }
        this.contentText = request.responseText;
        this.contentXML = request.responseXML;
        this.content = null;
        this.response = request;
        this.parse(currentObject);
    },
    /**
     * Parses the response based on type
     */
    parse: function(currentObject, data) {

        if (CONFIG.operatingMode === 'UnitTesting') {
            LOG.logMessages(this, "In parser , opertaingMode is Testing");
            return null;
        }


        var xdata = null;
        if (arguments.length >= 2) {
            this.contentText = data;
        }

        switch (this.type) {
            case 'jsontohtmllist':
                return (parseJSONtoHTMLList.call(this));
            case 'json':
                parseJSON.call(this);
                return;
            case 'jsonMultiple':
                parseJSONMultiple.call(this);
                return;
            case 'jsontohtml':
                parseJSONtoHTML.call(this);
                return;
            case 'html':
                parseHTML.call(this);
                return;
            case 'htmltoelementlist':
                parseHTMLtoElementList.call(this, currentObject);
                return;
            case 'jsontomap':
                parseJSONtoMap.call(this, currentObject);
                return;
        }

        //Parses the JSON response to html UL list.Used for Autocomplete
        function parseJSONtoHTMLList() {

            /*Parsing text response to jSON format: Start */
            try {
                jsonObject = eval('(' + this.contentText + ')');
            } catch (ex) {
                var temp = JSON.stringify(this.contentText);
                jsonObject = JSON.parse(temp);
            }
            /*Parsing text response to jSON format: End */

            var keyArray = [],
                valueArray = [],
                key = '';
            for (key in jsonObject) {
                keyArray.push(key);
                valueArray.push(jsonObject[key]);
            }

            var FormattedError = valueArray[0];
            var FormFieldsInError = valueArray[1];
            var ErrCode = valueArray[2];
            var requestId = valueArray[4];
            var value = valueArray[7];
            this.content = [];
            this.content[0] = FormattedError;
            this.content[1] = FormFieldsInError;
            this.content[2] = requestId;
            this.content[3] = value;
            this.content[4] = ErrCode;
            return this.content;


        }

        // Parses the JSON response to map. To be used for use case specific JS
        // for getting the response data 
        function parseJSONtoMap() {

            /*Parsing text response to jSON format: Start */
            try {
                jsonObject = eval('(' + this.contentText + ')');
            } catch (ex) {
                var temp = JSON.stringify(this.contentText);
                jsonObject = JSON.parse(temp);
            }
            /*Parsing text response to jSON format: End */

            var keyArray = [],
                valueArray = [],
                key = '';
            for (key in jsonObject) {
                keyArray.push(key);
                valueArray.push(jsonObject[key]);
            }
            var map = []; // or var map = {};

            for (var index = 0; index < keyArray.length; index++) {
                map[keyArray[index]] = valueArray[index];
            }

            this.content = map;
            return this.content;

        }

        //Parses the JSON response and returns an array of key ,value pairs

        function parseJSON() {
            //If there is FatalError , it will show the Fatal JSP
            if (handleFatal(this.response, this.contentText)) {
                LOG.logMessages(this, "In parser , Response is FATAL JSP");
                return;
            }
            xdata = [];
            row = [];
            var jsonObject;
            try {
                jsonObject = eval('(' + this.contentText + ')');
            } catch (ex) {
                var temp = JSON.stringify(this.contentText);
                jsonObject = JSON.parse(temp);
            }
            var keyArray = [],
                valueArray = [],
                key = '';
            for (key in jsonObject) {
                keyArray.push(key);
                valueArray.push(jsonObject[key]);
            }
            this.exceptionType = this.response.getResponseHeader(Constants.EXCEPTIONTYPE);

            for (var index = 0; index < keyArray.length; index++) {
                row = [];
                row.push(keyArray[index]);
                row.push(valueArray[index]);
                xdata.push(row);
            }

            this.content = xdata;

        }

        //
        function parseJSONMultiple() {
            //If there is FatalError , it will show the Fatal JSP
            if (handleFatal(this.response, this.contentText)) {
                LOG.logMessages(this, "In parser , Response is FATAL JSP");
                return;
            }
            xdata = [];
            var jsonObject = eval('(' + this.contentText + ')');
            var keyArray = [],
                valueArray = [],
                key = '';
            for (key in jsonObject) {
                keyArray.push(key);
                valueArray.push(jsonObject[key]);
            }
            for (i = 0; i < keyArray.length; i++) {
                row = [];
                row.push(keyArray[i]);
                row.push(valueArray[i]);
                xdata.push(row);
            }
            this.content = xdata;

        }

        //Parses the JSON response to html.Form HTML div elements 
        //TODO:: No one is using
        function parseJSONtoHTML() {
            //If there is FatalError , it will show the Fatal JSP
            //If the request is for a new Transaction,then total page should be Updated with the response instead
            //of updating grouplet

            if (handleFatal(this.response, this.contentText) || handleNewTransaction(this.response, this.contentText)) {
                LOG.logMessages(this, "In parser , Response is FATAL JSP");
                return;
            }

            xdata = document.createElement("div");
            var div = null,
                h1 = null;
            feba.domManipulator.each(this.content, function(index, row) {
                h1 = document.createElement("h1");
                if (!this.plaintext) {
                    h1.innerHTML += row[0];
                } else {
                    h1 = feba.domManipulator.replaceWith(feba.domManipulator.getElement(h1), row[0]);
                }

                xdata.appendChild(h1);
                feba.domManipulator.each(row.shift(), function(index, line) {
                    div = document.createElement("div");
                    if (!this.plaintext) {
                        div.innerHTML += line;
                    } else {
                        feba.domManipulator.replaceWith(feba.domManipulator.getElement(div), line);
                    }
                    xdata.appendChild(div);
                });

            });

            xdata = (h1 !== null) ? xdata.innerHTML : "";
            this.content = xdata;

        }

        //Returns the html
        function parseHTML() {
            var redirectURL = this.response.getResponseHeader("redirectURL");
            if (redirectURL) {
                var closeElement = feba.domManipulator.getElementOfClass("modalCloseImg");
                feba.domManipulator.trigger(closeElement, 'click');
                window.location.replace(redirectURL);
                return;
            }
            var title = ""
            if (feba.domManipulator.isRTL()) {
                title = this.response.getResponseHeader("title");
                title = decodeURIComponent(title);
                jQuery('<div>').attr({
                    type: 'hidden',
                    id: 'nTitle'
                }).appendTo('form');
                jQuery('#nTitle').html(title);
                jQuery('#nTitle').css('display', 'none'); /*defect 745546 */
                title = jQuery('#nTitle').text();
            } else {
                title = this.response.getResponseHeader("title");
            }
            if (title) {
                this.title = title;
            }
            //If there is FatalError , it will show the Fatal JSP
            //If the request is for a new Transaction,then total page should be Updated with the response instead
            //of updating grouplet
            if (handleFatal(this.response, this.contentText) || handleNewTransaction(this.response, this.contentText)) {
                LOG.logMessages(this, "In parser , Response is FATAL JSP");
                return;
            }
            this.exceptionType = this.response.getResponseHeader(Constants.EXCEPTIONTYPE);
            xdata = this.contentText;

            this.content = xdata;

        }
        //Handle Fatal Error.
        function handleFatal(response, content, currentObject) {
            this.exceptionType = response.getResponseHeader(Constants.EXCEPTIONTYPE);
            if (response.getResponseHeader(Constants.IS_FATAL)) {
                document.body.innerHTML = "";
                document.body.innerHTML = content;
                return true;
            }
            if (content.length == 0) {
                if (currentObject.options.target && feba.features[currentObject.options.target] &&
                    typeof(feba.features[currentObject.options.target].handleTimeout) == 'function') {
                    feba.features[currentObject.options.target].handleTimeout(null, "fatal", null);
                }

                return true;
            }
            return false;
        }
        //Handle New Transaction
        function handleNewTransaction(response, content) {
            if (response.getResponseHeader(Constants.IS_NEW_TRANSACTION)) {

                //gettting the scripts from the content
                var contentScripts = content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
                //removing the scripts from the content
                var contentWithoutScripts = content.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), "");

                //removing all the contents from the body
                document.body.innerHTML = "";
                //pasting content which doesnt contain any scripts
                document.body.innerHTML = contentWithoutScripts;

                //getting the last div on the page
                //we will append the scripts here
                var lastDivOnPage = jQuery('div:last');
                // Changing the value of global variable to true as it is painting the page using ajax
                window.ajaxPageRefresh = "true";
                if (isLangIDChanged()) {
                    /*feba.domManipulator.blockUI({
							message:feba.domManipulator.getElementById("loadingImage"),
							baseZ: 950, // position message below the modal. (baseZ+10)
							allowBodyStretch:false,
							overlayCSS: { // To match with the color of simplemodal overlay
								backgroundColor: '#000000',
								opacity: 0.4
							}
							});*/
                    resetSession();
                    return true;
                }

                var scriptsLength = contentScripts.length;
                for (var index = 0; index < scriptsLength; index++) {
                    try {
                        var src = jQuery(contentScripts[index]).attr('src');
                        if (src && src.length > 0) {
                            var script = document.createElement('script');
                            script.type = 'text/javascript';
                            script.src = src;

                            jQuery(document.body).append(script);

                        } else {
                            lastDivOnPage.append(contentScripts[index]);
                        }
                    } catch (e) {

                    }
                }
                //fix for 662687 - start
                var browserName = navigator.userAgent;
                if (browserName.indexOf("Trident/7.0") > 0) {
                    browserName = "IE";
                } else if (browserName.indexOf("Trident/6.0") > 0) {
                    browserName = "IE";
                } else if (jQuery.browser.msie) {
                    browserName = "IE";
                }

                if (browserName == "IE")
                //if(jQuery.browser.msie)
                //fix for 662687 - end
                { //IE 10 doesnt load screen properly.
                    jQuery('link').each(function() {
                        jQuery(this).replaceWith(this.outerHTML)
                    });

                    var vpWidth = viewport().width;
                    var width = screen.width;
                    window.resizeTo(screen.width - 0.0001, screen.height);
                    setTimeout(function() {
                        window.resizeTo(width, screen.height);

                    }, 1500);
                }
                return true;
            }
        }

        /*This method is used to verify if CSS loaded are for two different languages. This works in Safari/Chrome only.*/
        function isLangIDChanged() {
            if (document.head) {
                for (i = 0; i < document.head.childNodes.length; i++) {
                    if (document.head.childNodes[i] && jQuery(document.head.childNodes[i]).attr('href')) {
                        var currE = jQuery(document.head.childNodes[i]).attr("href");
                        index = currE.indexOf("L00");
                        existingLangId = currE.substring(index + 1, index + 4);

                        for (j = 0; j < document.body.childNodes.length; j++) {
                            if (document.body.childNodes[j] && jQuery(document.body.childNodes[j]).attr('href')) {
                                var currE1 = jQuery(document.body.childNodes[j]).attr("href");
                                index = currE1.indexOf("L00");
                                currentLangId = currE1.substring(index + 1, index + 4);
                                if (currentLangId != existingLangId) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        } /*End of for loop in html body*/

                    }
                } /*End of for loop in html head*/
            } else {
                for (i = 0; i < document.getElementsByTagName('head')[0].childNodes.length; i++) {
                    if (document.getElementsByTagName('head')[0].childNodes[i] && jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr('href')) {
                        var currE = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href");

                        console.log("inside handleLangIdChange currE:" + currE);
                        index = currE.indexOf("L00");
                        existingLangId = currE.substring(index + 1, index + 4);

                        for (j = 0; j < document.getElementsByTagName('body')[0].childNodes.length; j++) {
                            if (document.getElementsByTagName('body')[0].childNodes[j] && jQuery(document.getElementsByTagName('body')[0].childNodes[j]).attr('href')) {
                                var currE1 = jQuery(document.getElementsByTagName('body')[0].childNodes[j]).attr("href");
                                index = currE1.indexOf("L00");
                                currentLangId = currE1.substring(index + 1, index + 4);
                                if (currentLangId != existingLangId) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        } /*End of for loop in html body*/

                    }
                }

            } /*Else*/
            return false;
        }


        //Parses the HTML to element list(div elements) 
        function parseHTMLtoElementList(currentObject) {
            //If there is FatalError , it will show the Fatal JSP
            //If the request is for a new Transaction,then total page should be Updated with the response instead
            //of updating grouplet
            if (handleFatal(this.response, this.contentText, currentObject) || handleNewTransaction(this.response, this.contentText)) {
                LOG.logMessages(this, "In parser , Response is FATAL JSP");
                return;
            }


            var parentElement = document.createElement("div");
            parentElement.innerHTML = this.contentText;
            var contentText = feba.domManipulator.children(feba.domManipulator.getElement(parentElement));
            xdata = [];
            xdata[0] = contentText;

            if (this.response.getResponseHeader(Constants.REQUEST_ID)) {
                var requestIds = this.response.getResponseHeader(Constants.REQUEST_ID);
                //requestId="groupletId1=1,groupletId2=2"
                var requestIdTokens = requestIds.split(",");
                xdata[1] = requestIdTokens;
            }
            xdata[2] = this.response.getResponseHeader(Constants.EXCEPTION_WIDGETS);
            this.exceptionType = this.response.getResponseHeader(Constants.EXCEPTIONTYPE);
            this.content = xdata;

        }

    }

});