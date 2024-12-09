/**
 * FEBAAjaxObjects.js
 * The Container and Controller Object for all RIA Features.<br> 
 * Each RIA Feature will have an corresponding Object. 
 * There will be a base object for all RIA Objects
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
var AJAX_DEFAULT_PARAMETER = "ajaxParameter";
var AJAX_DEFAULT_PARAMETER_REGEXP = new RegExp("(\\{" + AJAX_DEFAULT_PARAMETER + "\\})", 'g');

var AJAX_PARAM_SPECIFICATION = ['criteria', 'parameters', 'filter'];
var _GROUPLETS_IN_PAGE_ = "";
feba.js.ajax = {

    name: "feba.js.ajax",

    description: "",

    version: "1.0",

    // array to store the child objects which have been instantiated
    ajaxObjects: [],

    // variable to indicate whether to raise the request
    startFlag: true,

    // Adds the object which has been instantiated
    add: function(object) {
        LIB.__ADD__(this.ajaxObjects, object);
    },

    // Removes the object from the array
    remove: function(object) {
        LIB.__REMOVE__(this.ajaxObjects, object);
    },

    // start all objects
    startRequest: function() {
        LIB.__START__.bind(this)(this.ajaxObjects, feba.js.startFlag);
    },

    // stops all objects
    stopRequest: function() {
        LIB.__STOP__.bind(this)(this.ajaxObjects);
    },

    // Returns the startFlag
    isRunning: function() {
        LIB.__IS_RUNNING__.bind(this)();
    },

    // Loads the listeners
    startEventListening: function(object) {
        LIB.__START_EVENT_LISTENING__(object);
    },

    // unloads the listeners
    stopEventListening: function() {
        LIB.__STOP_EVENT_LISTENING__(object);
    },

    // overrides the default toString method of object
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.ajaxObjects);
    }
};

feba.js.add(feba.js.ajax);

feba.js.ajax.groupletCounter = 0;
var AJAX_CALLOUT_OVERLIB_DEFAULT = "STICKY,CLOSECLICK,DELAY,250,TIMEOUT,5000,VAUTO,WRAPMAX,240,CSSCLASS,FGCLASS,'olfg',BGCLASS,'olbg',CGCLASS,'olcg',CAPTIONFONTCLASS,'olcap',CLOSEFONTCLASS,'olclo',TEXTFONTCLASS,'oltxt'";
/**
 * Base Class of AjaxObjects
 * 
 */
feba.domManipulator.createBaseClass("feba.js.ajax.base", {}, {
    init: function() {

    },


    name: "feba.js.ajax.base",

    description: "",

    version: "1.0",

    startFlag: true,

    ajaxTimeout: 960000,

    setAjaxHandlerFunctions: function() {

        if (this.options.onError && this.onError) {
            this.options.error = function(jqXHR, textStatus, errorThrown) {
                this.options.onError(jqXHR, textStatus, errorThrown);
                this.onError(jqXHR, textStatus, errorThrown);
            };
        } else if (!this.options.onError && this.onError) {
            this.options.error = function(jqXHR, textStatus, errorThrown) {
                this.onError(jqXHR, textStatus, errorThrown);
            };
        } else if (this.options.onError && !this.onError) {
            this.options.error = function(jqXHR, textStatus, errorThrown) {
                this.options.onError(jqXHR, textStatus, errorThrown);
            };
        }


        if (this.options.onSuccess && this.onSuccess) {
            this.options.success = function(data, textStatus, XMLHttpRequest) {
                this.options.onSuccess(data, textStatus, XMLHttpRequest);
                this.onSuccess(data, textStatus, XMLHttpRequest);
            };
        } else if (!this.options.onSuccess && this.onSuccess) {
            this.options.success = function(data, textStatus, XMLHttpRequest) {
                this.onSuccess(data, textStatus, XMLHttpRequest);
            };
        } else if (this.options.onSuccess && !this.onSuccess) {
            this.options.success = function(data, textStatus, XMLHttpRequest) {
                this.options.onSuccess(data, textStatus, XMLHttpRequest);
            };
        }


        if (this.options.onComplete && this.onComplete) {
            this.options.complete = function(jqXHR, textStatus) {
                this.options.onComplete(jqXHR, textStatus);
                this.onComplete(jqXHR, textStatus);
            };
        } else if (!this.options.onComplete && this.onComplete) {
            this.options.complete = function(jqXHR, textStatus) {
                this.onComplete(jqXHR, textStatus);
            };
        } else if (this.options.onComplete && !this.onComplete) {
            this.options.complete = function(jqXHR, textStatus) {
                this.options.onComplete(jqXHR, textStatus);
            };
        }

    },
    // sets the startFlag to true,this method is called to start the
    // object
    startRequest: function() {
        LOG.logMessages("Starting ");

        if (feba.js.ajax.startFlag) {
            this.startFlag = true;
        }
    },

    //this method gets the event element based on the attachement type
    getEventElement: function(sourceElementId, attachmentType) {
        var elements = null;
        if (attachmentType) {
            switch (attachmentType) {
                case "startsWith":
                    elements = feba.domManipulator.getElementStartingWith(sourceElementId);
                    break;

                default:
                    elements = feba.domManipulator.getElementById(sourceElementId);
            }
        } else {
            elements = feba.domManipulator.getElementById(sourceElementId);
        }
        return elements;
    },

    /**
     * This sets the event Listeners for the source element
     */
    setListeners: function() {

        var optionObj = this.options;
        var source = optionObj.source;

        //For listing elements ,the id will '[]'
        //Event Listeners has to be added for all listing elemnts ,based on index which is passed
        if (source != null) {
            if (source.indexOf('[]') != -1) {
                if (!optionObj.startIndex || !optionObj.endIndex) {
                    throw new Error("startIndex,endIndex should be passed");
                }
                var parent = [];
                var startIndexInInt = 0;
                var endIndexInInt = 0;
                try {
                    startIndexInInt = parseInt(optionObj.startIndex);
                    endIndexInInt = parseInt(optionObj.endIndex);
                } catch (e) {
                    startIndexInInt = (optionObj.startIndex);
                    endIndexInInt = (optionObj.endIndex);
                }
                for (var index = startIndexInInt; index < endIndexInInt; index++) {
                    parent[index] = new Object;
                    parent[index].modalObj = this;
                    var sourceElementId = source.replace('[]', '[' + index + ']');
                    parent[index].currentIndex = index;

                    var eventElement = this.getEventElement(sourceElementId, optionObj.matchSourceBy);

                    if (eventElement) {
                        var that = this;
                        feba.domManipulator.bind(eventElement, optionObj.eventType, {
                            currentIndex: index
                        }, function(e) {
                            that.executeEvent.apply(parent[e.data.currentIndex]);
                            e.preventDefault();
                        });
                    }

                }
            } else {
                var parent = new Object;
                parent.modalObj = this;

                var eventElement = this.getEventElement(optionObj.source, optionObj.matchSourceBy);

                if (eventElement.length) {
                    var that = this;
                    feba.domManipulator.bind(eventElement, optionObj.eventType, {}, function(event) {
                        that.execute.apply(parent.modalObj);
                        return false;
                    });
                }

            }
        }
    },
    /**
     *This handles the Error and paints the error on the page
     */
    handleErrors: function(formattedError, FormFieldsInError, groupletId, displayExceptions, errorHighlightLocation, errorMsgLoaction) {
        LIB.__HANDLE_ERROR__(this.riaFeatureID, formattedError, FormFieldsInError, groupletId, displayExceptions, false, this.source, errorHighlightLocation, errorMsgLoaction, this.isPinRequest);
    },


    // sets the startFlag to false,this method is called to stop the
    // object
    stopRequest: function() {
        LOG.logMessages("Stopping ");
        this.startFlag = false;
    },

    /**
     * Calls the onCreate Call back function
     */
    initRequest: function() {

        if (typeof(this.options.onCreate) == 'function') {
            var result = this.options.onCreate();


            if (typeof(result) === Constants.STRING &&
                Constants.CANCEL === result.toLowerCase()) {
                return false;
            }
        }
        return true;
    },

    /**
     * Returns the options required for Ajax Request
     */
    getOptions: function(options, ajaxParam) {

        if (this.options.requestId != null && !this.options.isGrouplet) {
            this.options.requestId = parseInt(this.options.requestId, 10) + 1;
        }
        var requestId = this.options.requestId;
        return feba.domManipulator.extendObject({
            async: this.options.asynchronous || true,
            type: this.options.type || 'post',
            evalScripts: this.options.evalScripts || false,
            data: this.options.groupletParameters || this.buildParameterString(ajaxParam),
            onFailure: this.options.onFailure,
            onComplete: this.options.onComplete,
            cache: false,
            //Impact analysis to be done for Finanz Tools
            beforeSend: function(xhr) {
                xhr.setRequestHeader('requestId', requestId);
                xhr.setRequestHeader('IPTYPE', 'XML');
            }



        }, options || {});

    },
    /**
     * Builds the Parameter String
     */

    buildParameterString: function(ajaxParam) {
        var returnString = '';
        var onLoad;
        var target;
        var eventTypeLiteral = "eventType";
        var eventType = "onLoad";

        var field = null,
            key = null,
            valueArray = null,
            foptions = null,
            valueString = null,
            fieldValue, fieldName;
        var params = (this.replaceAJAX_DEFAULT(ajaxParam) || '');

        params = params.split(Constants.PARAMETERS_SEPERATOR);
        feba.domManipulator.each(params,
            function(index, pair) {
                if (feba.domManipulator.trim(pair).length === 0) {
                    return;
                }
                pair = pair.split('=');
                key = feba.domManipulator.trim(pair[0]);
                valueString = feba.domManipulator.trim(pair[1]);
                valueArray = [];

                if (Constants.STRING === typeof(valueString) &&
                    feba.domManipulator.trim(valueString).length > 0) {
                    field = valueString
                        .match(/\{[\w\.:\(\)\[\]]*\}/g);
                    if (field) {
                        for (i = 0; i < field.length; i++) {
                            var fieldTemp = LIB.__GET_DOM__(field[i].substring(1,
                                field[i].length - 1));
                            getField(fieldTemp);
                        }
                    } else {
                        field = feba.domManipulator.getElementByName(fieldName)[0];
                    }
                }
                feba.domManipulator.each(valueArray, function(index, item) {
                    valueString = valueString.replace(valueString
                        .match(/\{[\w\.:\(\)\[\]]*\}/), encodeURIComponent(item));
                });
                returnString += '&' + key + '=' + valueString;
            });

        function getField(field) {
            if (!field) {
                /*If the field is not present in the page, 
                 * it could either mean a constant value, 
                 * or the field is simply not present.
                 * 
                 * If field is not present, do not send the attribute to server.
                 * 
                 * If field does not start with '{' and end with '}', we are assuming it as constant 
                 */
                if ((valueString.indexOf('{') != 0) && (valueString.indexOf('}') != valueString.length - 1)) {
                    valueArray.push(valueString);
                } else {
                    valueArray.push('');
                }
            } else if (Constants.MULTIPLE_SELECT === field.type) {
                if (fieldValue = feba.domManipulator.serialize(feba.domManipulator.getElement(field))) {
                    returnString += '&' + fieldValue;
                }
            } else if (field.type == Constants.TEXTFIELD ||
                field.type == 'textarea' ||
                field.type == 'password' ||
                field.type == Constants.HIDDEN ||

                field.type == Constants.SIMPLE_SELECT ||
                'checkbox' === field.type) {

                var colWater = jQuery(field).css("color");
                var titleWater = jQuery(field).attr("title");
                var valWater = jQuery(field).attr("value");
                // alert('build: '+colWater+' '+titleWater+' '+valWater);
                if ((titleWater == valWater) && ((colWater == 'rgb(204, 204, 204)') || (colWater == '#cccccc'))) {
                    valueArray.push("");

                } else {
                    valueArray.push(field.value);
                }



            } else if (Constants.RADIO === field.type) {
                valueArray.push(feba.domManipulator.getAttribute(feba.domManipulator.getElementByName(field.name), "value"));
            } else {

                valueArray.push(field.innerHTML);
            }

        }
        // We append the scope to pass it in the request object
        if (this.options.scope) {
            returnString += '&' + 'scope' + '=' + encodeURIComponent(this.options.scope);
        }
        returnString = this.setErrorAttributeDetails(returnString);
        //Set extra Params if required
        returnString = this.setExtraParams(returnString);
        if (returnString.charAt(0) === '&') {
            returnString = returnString.substr(1);
        }
        if (this.options.paramkey != null && this.options.paramkey != 'parameters') {
            var paramPairs = returnString.split(Constants.AMPERSAND);
            var paramContents, paramObject = {};
            var paramPairsLength = paramPairs.length;
            for (var paramNum = 0; paramNum < paramPairsLength; paramNum++) {
                paramContents = paramPairs[paramNum].split('=');
                paramObject[paramContents[0]] = paramContents[1];
            }
            returnString = this.options.paramkey + "=" + feba.domManipulator.stringify(paramObject);
        }
        // added for retention of values on page reload for select feature - start

        onLoad = this.options.executeOnLoad;
        target = this.options.target;
        // appends target to the request

        if (target) {
            returnString += Constants.AMPERSAND +
                Constants.TARGET + '=' +
                target;
        }
        // appends eventType to the request in case of Load Event.
        if (onLoad) {
            returnString += Constants.AMPERSAND + eventTypeLiteral +
                '=' + eventType;
            //making the flag to false
            this.options.executeOnLoad = false;
        }
        // end
        returnString = this.setErrorAttributeDetails(returnString);

        /*Fix for I.E browser cache issue 12/08/2011: Start
        Adding the below param will ensure that, the request 
        will be treated as new request by the browser everytime.*/

        returnString += '&' + "requestId" + '=' + this.options.requestId;
        /*Fix for I.E browser cache issue 12/08/2011: End*/


        return returnString;

    },

    /**
     * Appends the error attribute details to the parameters
     */
    setErrorAttributeDetails: function(returnString) {


        var forControlIds = this.options.forcontrolIDs;

        if ("undefined" !== this.options.errorFormatter && this.options.errorFormatter) {
            returnString += '&' + 'errorFormmater' + '=' +
                encodeURIComponent(this.options.errorFormatter);
        }

        if (forControlIds) {
            returnString += '&' + 'errorForConntrolIds' + '=' +
                encodeURIComponent(forControlIds);
        }

        return returnString;

    },
    /**
     * Appends extra params to parameterString.
     */
    setExtraParams: function(returnString) {


        //Passing parameter which will have all the grouplets in a page.
        var groupletsInPage = _GROUPLETS_IN_PAGE_;
        if (this.options.isGrouplet) {
            returnString += '&' + 'GROUPLETS_IN_PAGE' + '=' +
                encodeURIComponent(groupletsInPage);

        }
        return returnString;

    },

    /**
     * Returns parameters to be passed from option object.parameters can be specified by key as criteria or paramteres or filer
     */
    replaceAJAX_DEFAULT: function(elem) {

        var optionObject = this.options;

        for (var index = 0; index < AJAX_PARAM_SPECIFICATION.length; index++) {
            var key = AJAX_PARAM_SPECIFICATION[index];

            if (optionObject[key]) {
                this.options.paramkey = key;

                return optionObject[key];
            }
        }
        return null;


    },

    /**
     * overrides the default toString method
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }

});

/**
 * AjaxRequest Returns Ajax.Request Object
 * 
 */

feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.ajaxRequest", {}, {
    // Gets the required options to be passed to server and then raises the Ajax request
    init: function(options, ajaxParam) {

        LOG.logMessages("In Ajax request initialize method");
        if (arguments.length < 1) {
            LOG.logMessages("Returning null ,arguments are null");
            return null;
        }
        this.options = options;
        options = {};

        if (!this.initRequest() && !this.startFlag) {
            LOG.logMessages("Returning null");
            return null;
        }
        var currentObject = this;

        var success = function(currentObject, data, textStatus, XMLHttpRequest) {
            var responseFormat = XMLHttpRequest.getResponseHeader(Constants.RESPONSE_TYPE);
            if (responseFormat && currentObject.options.changeParser && (currentObject.options.parser.type !== responseFormat)) {
                currentObject.options.parser = new LIB.Parser((responseFormat === "JSP") ? "html" : undefined);
            }
            if (XMLHttpRequest.getResponseHeader("action") != null) {
                if (XMLHttpRequest.getResponseHeader("OPFMT") == "JSON") {
                    currentObject.options.parser = new LIB.Parser(Constants.JSON);
                }
            }
            currentObject.options.XMLHttpRequest = XMLHttpRequest;
            /* Below section commented out as it is handled in parser itself
            if(currentObject.options.tagHelper==='AUTOCOMPLETE.TagHelper' ) {
            try{
            	//XMLHttpRequest.responseText = JSON.parse(XMLHttpRequest.responseText);
            	}catch(e){
            	LOG.logMessages("Exception in changing to JSON type", e.message);
            	}				
            }
            */
            currentObject.options.parser.load(XMLHttpRequest, currentObject);
            if (currentObject.options.tagHelper == 'MODAL_VIEW.TagHelper' || currentObject.options.modalDataId == 'MODAL_VIEW_CONTAINER') {
                if (currentObject.options.success) {
                    currentObject.options.success.call(currentObject.options.child, data, textStatus, XMLHttpRequest);
                }
                currentObject.options.handler(currentObject.options);
            } else {
                currentObject.options.handler(currentObject.options);
                if (currentObject.options.success) {
                    currentObject.options.success.call(currentObject.options.child, data, textStatus, XMLHttpRequest);
                }
            }
        };
        var complete = function(currentObject, jqXHR, textStatus) {
            if (currentObject.options.complete) {
                currentObject.options.complete.call(currentObject.options.child, jqXHR, textStatus);
            }
        };

        var error = function(currentObject, jqXHR, textStatus, errorThrown) {
            //letting each feature handle the errors in their own way
            if (currentObject.options.error) {
                currentObject.options.error.call(currentObject.options.child, jqXHR, textStatus, errorThrown);
            }
        };
        var opt = {
            success: (function(data, textStatus, XMLHttpRequest) {
                success(currentObject, data, textStatus, XMLHttpRequest);
            }),

            complete: (function(jqXHR, textStatus) {
                complete(currentObject, jqXHR, textStatus);
            }),

            error: (function(jqXHR, textStatus, errorThrown) {
                error(currentObject, jqXHR, textStatus, errorThrown);
            })


        };

        feba.domManipulator.extendObject(opt, this.getOptions(options, ajaxParam));

        if (CONFIG.operatingMode === 'UnitTesting') {
            LOG.logMessages("In Testing mode :Dummy Request is raised");
            options.onSuccess();
            return null;
        } else {
            opt.timeout = this.ajaxTimeout;
            opt.url = this.options.baseUrl;
            opt.scope = this.options.scope;
            try {
                resetSessionVar();
            } catch (e) {
                LOG.logMessages("Exception Raised in Reset Session Variable clear.");
            }
            return feba.domManipulator.ajax(opt);
            LOG.logMessages("Request raised");
        }

    }
});


/**
 * class object to resgister as responder in Ajax.Responders Contains onCreate
 * Call back method which will be invoked when request is created
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.validatorResponder", {}, {
    init: function(options) {
        this.validateURL(options);
    },
    validateURL: function(options) {
        if (options.baseUrl === null ||
            typeof(options.baseUrl) === undefined ||
            feba.domManipulator.trim(options.baseUrl).length === 0) {
            throw new Error("url is wrong/empty");
        }
    },
    validateId: function() {}
});


/**
 * AutoComplete class to handle AutoComplete tag
 * 
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.autoComplete", {}, {
    /**
     * Options are set and div element is inserted after sourceelement to
     * display autocomplete result
     */


    init: function(options) {
        this.name = "feba.js.ajax.autoComplete";
        this.version = "1.0";
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.execute();

    },
    /**
     * options are set
     */
    setOptions: function(options) {
        if (options.errorFormatter) {
            options.errorFormatter = encodeURIComponent(options.errorFormatter);
        }
        //options.forcontrolIDs = encodeURIComponent(options.forcontrolIDs);
        this.options = feba.domManipulator.extendObject({
            divElement: "ajaxAuto_" + options.source,
            requestId: 0,
            dataType: "json",
            parser: new LIB.Parser(Constants.JSON_TO_HTML_LIST, true),
            handler: this.handler,
            delay: 0,
            child: this
        }, options || {});
        this.options.handleErrors = this.handleErrors;
        this.setAjaxHandlerFunctions();
        this.options.child = this;
        LOG.logMessages("In SetOptions method , options are set");
    },
    /**
     * AjaxAutoCompleter object is created ,which implements autocomplete
     * functionality
     */
    execute: function() {
        LOG.logMessages("In Execute method,instantiating AutoCompleter object");


        var s = feba.domManipulator.getElementById(this.options.source);
        this.options.sourceName = feba.domManipulator.getAttribute(s, 'name');
        var that = this;
        feba.domManipulator.makeAutocomplete(s, {
            source: function(request, autocompleteResponse) {
                that.options.autocompleteResponse = autocompleteResponse;
                that.options.term = request.term;
                that.request = new feba.js.ajax.ajaxRequest(that.options);

            },
            minLength: this.options.minimumCharacters,
            select: function(e, ui) {
                LOG.logMessages("In select");
                var value = ui.item.value;

                s.val(value);
                s.trigger("change");
            }
        }, true);
    },
    /*Handler method for autocomplete */

    handler: function() {

        LOG.logMessages("In Autcomplete handler method, response is set to target");

        this.content = this.parser.content;
        var target = this.target;

        try {
            var formattedError = this.content[0];
            var formFieldsInError = this.content[1];
            var groupletId = this.groupletId;

            var dispEx = this.displayExceptions;

            var errorHighlightLocation = this.content[4][0].ERR_HIGHLIGHT_LOCATION;
            var errorMsgLoaction = this.content[4][0].FIELD_MSG_DISPLAY_LOCATION;
            this.handleErrors(formattedError, formFieldsInError, groupletId, dispEx, errorHighlightLocation, errorMsgLoaction);

            /*Clear the list in case of BE/CE/BI */
            if (String(this.parser.content[4]) !== "0000") {
                this.autocompleteResponse();
                return;
            }

            var serverRequestId = this.content[2];

            /*Ignore the response from old requests	*/

            if (serverRequestId != this.requestId) {
                throw new Error("Outdated request");
            }

            var data = this.content[3];
            var term1 = this.term;

            //Callback method to paint the list 
            this.autocompleteResponse(feba.domManipulator.map(data, function(row) {
                row = row.split('|')[1];
                row = jQuery('<div />').html(row).text();
                return {
                    label: row.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" +
                        jQuery.ui.autocomplete.escapeRegex(term1) +
                        ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>"),

                    value: row,
                    result: row
                };
            }));


        } catch (e) {
            LOG.logMessages("In Autcomplete handler method, exception ", e);

        }

    },
    // Overrides the default toString method.This method will return name and options of the object.
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }

});



/**
 * Handles Callout TAG It attaches a callout or popup to any HTML element
 * supporting an onclick event
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.callout", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {
        this.name = "feba.js.ajax.callout";
        this.version = "1.0";
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.setListeners();
        //Registers the callout feature on load of the page
        this.registerCallout();
    },
    /**
     * It assigns all the options which are required for callout
     * processing to this.options
     */
    setOptions: function(options) {

        this.options = feba.domManipulator.extendObject({
            parameters: '',
            overlib: AJAX_CALLOUT_OVERLIB_DEFAULT,
            parser: new LIB.Parser(Constants.JSON),
            openEvent: "mouseover",
            onFocus: "focus",
            handler: this.handler,
            child: this,
            requestId: 0
        }, options || {});


        this.options.originalParams = this.options.parameters || this.options.criteria;

        LOG.logMessages("In SetOptions method , options are set");
        this.options.handleErrors = this.handleErrors;
        this.setAjaxHandlerFunctions();
        this.options.child = this;
    },
    /**
     * It adds the listeners on all the elements whose CSS class
     * is sourceClass
     */
    setListeners: function() {


        LOG
            .logMessages(

                "In SetListeners method, eventListener has been added to element",
                this.options.source);


        var optionObj = this.options;
        var source = optionObj.source;

        if (source.indexOf('[]') != -1) {
            if (!optionObj.startIndex || !optionObj.endIndex) {
                throw new Error("startIndex,endIndex should be passed");
            }
            var parent = [];
            var startIndexInInt = 0;
            var endIndexInInt = 0;
            try {
                startIndexInInt = parseInt(optionObj.startIndex);
                endIndexInInt = parseInt(optionObj.endIndex);
            } catch (e) {
                startIndexInInt = (optionObj.startIndex);
                endIndexInInt = (optionObj.endIndex);
            }
            for (var index = startIndexInInt; index < endIndexInInt; index++) {
                //for(var index=optionObj.startIndex;index<optionObj.endIndex;index++){
                parent[index] = new Object;
                parent[index].modalObj = this;
                var sourceElement = source.replace('[]', '[' + index + ']');
                parent[index].currentIndex = index;

                var eventElement = feba.domManipulator.getElementById(sourceElement);
                if (eventElement) {
                    var that = this;
                    //Binding events with callout feature
                    feba.domManipulator.bind(eventElement, this.options.openEvent, {
                        currentIndex: index
                    }, function(e) {
                        that.calloutOpen.apply(parent[e.data.currentIndex]);
                    });
                    feba.domManipulator.bind(eventElement, this.options.onFocus, {
                        currentIndex: index
                    }, function(e) {
                        that.calloutOpen.apply(parent[e.data.currentIndex]);
                    });

                }
            }
        } else {
            var parent = new Object;
            parent.modalObj = this;

            var eventElement = feba.domManipulator.getElementById(optionObj.source);
            if (eventElement) {
                var that = this;
                //Binding events with callout feature
                feba.domManipulator.bind(eventElement, this.options.openEvent, {}, function() {
                    that.calloutOpen.apply(parent);
                });
                feba.domManipulator.bind(eventElement, this.options.onFocus, {}, function() {
                    that.calloutOpen.apply(parent);
                });
            }

        }
    },
    registerCallout: function() {

        var optionObj = this.options;
        var source = optionObj.source;
        if (source.indexOf('[]') != -1) {
            if (!optionObj.startIndex || !optionObj.endIndex) {
                throw new Error("startIndex,endIndex should be passed");
            }
            var parent = [];
            var startIndexInInt = 0;
            var endIndexInInt = 0;
            try {
                startIndexInInt = parseInt(optionObj.startIndex);
                endIndexInInt = parseInt(optionObj.endIndex);
            } catch (e) {
                startIndexInInt = (optionObj.startIndex);
                endIndexInInt = (optionObj.endIndex);
            }
            for (var index = startIndexInInt; index < endIndexInInt; index++) {
                //Registering callout for each callout element
                //for(var index=optionObj.startIndex;index<optionObj.endIndex;index++){
                parent[index] = new Object;
                parent[index].modalObj = this;
                var sourceElement = source.replace('[]', '[' + index + ']');
                parent[index].currentIndex = index;

                var eventElement = feba.domManipulator.getElementById(sourceElement);

                if (eventElement) {
                    // Registering callout via the plugin
                    feba.domManipulator.showCallout({
                        eventElement: eventElement
                    });
                }
            }
        }

    },
    /**
     * It is the eventListener for mouseover Event It calls
     * execute method where request is raised
     */
    calloutOpen: function(e) {
        if (this.modalObj.options.originalParams && this.modalObj.options.originalParams.indexOf('[]') != -1) {
            var params = this.modalObj.options.originalParams.replace(/\[\]/g, '[' + this.currentIndex + ']');
            if (this.modalObj.options.parameters) {
                this.modalObj.options.parameters = params;
            } else {
                this.modalObj.options.criteria = params;
            }
        }
        //passing the currentIndex so that index can be attached for listing elements
        this.modalObj.options.currentIndex = this.currentIndex;
        this.modalObj.execute.call(this.modalObj);
    },
    /**
     * Ajax Request is raised
     */
    execute: function(event) {
        LOG
            .logMessages(
                "In event handler Execute method,raising the request ");


        this.request = new feba.js.ajax.ajaxRequest(this.options);

    },
    /**
     *displays the popup above the element
     */
    handler: function() {
        LOG.logMessages("In handler method, Displays the pop-up ");
        var formattedError = this.parser.content[0][1];
        var formFieldsInError = this.parser.content[1][1];
        var groupletId = this.groupletId;
        //Added for whether we want to display error messages 
        var dispEx = this.displayExceptions;

        this.handleErrors(formattedError, formFieldsInError, groupletId, dispEx);

        if (String(this.parser.content[2][1]) !== "0000") {
            return;
        }
        var requestId = this.parser.content[4][1];
        this.response = this.parser.content[5][1];

        if (requestId == this.requestId) {

            //getting the source elementid and checking if it is part of listing and adding an index if it is
            var currentSource = this.source;
            if (currentSource.indexOf('[]') != -1) {
                currentSource = currentSource.replace('[]', '[' + this.currentIndex + ']');
            }
            var target = currentSource;
            this.response = String(this.response).split("|")[0];
            if (this.calloutDescription) {
                this.response = this.calloutDescription + ":" + this.response;
            }
            //Displaying Callout feature
            feba.domManipulator.showCallout({
                eventElement: feba.domManipulator.getElementById(target),
                response: this.response
            });


        }
    },
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }
});

/**
 *	Handles Grouplet Tag
 *	This tag is helpful in retriving content from different locations
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.grouplet", {}, {
    /**
     *	This is the method which is called on creation of object
     */
    init: function(options) {

        this.setOptions(options);
        this.isFirstResponse = Constants.TRUE;
        this.minimize = Constants.TRUE;

        /* Commenting the refresh Grouplet related code.As it might useful for future use. Currently 
           refresh option is not required for grouplet*/
        /*

         		feba.domManipulator.setAttribute(
                    								feba.domManipulator.getElementById(this.options.refresh),
                    								"title",
                    								getMessage("TitleForRefresh")
                    								);
        */
        //Adding all the grouplets loaded to the Global var
        if (this.options.target) {
            feba.js.ajax.groupletCounter = feba.js.ajax.groupletCounter + 1;
            _GROUPLETS_IN_PAGE_ = _GROUPLETS_IN_PAGE_ + "," + this.options.target;
        }
        this.setListeners();
        if (this.options.defaultLoad != Constants.FALSE) {
            var targetEl = this.options.target;
            jQuery('#' + targetEl).block({
                message: jQuery('<img src=\"' + this.options.loadingImage + '\"/>')
            });
            this.execute();
        }

        feba.domManipulator.addClass(feba.domManipulator.getElementById(this.options.target), 'empty-widget');
    },
    /**
     * It assigns all the options which are required for  grouplet processing to this.options 
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            close: options.imageClose,
            /* Commenting the refresh Grouplet related code.As it might useful for future use. Currently 
               refresh option is not required for grouplet*/
            //refresh: (options.imageRefresh  && options.target),
            evalScripts: true,
            eventType: "click",
            type: "post",
            handler: this.handler,
            isGrouplet: true,
            defaultLoad: true,
            setResponse: this.setResponse,
            parser: new LIB.Parser("htmltoelementlist"),
            requestId: options.groupletStackCounter || 0,
            isRequestInProcess: false,
            actionElement: "onload",
            child: this,
            isIGC: "N"
        }, options || {});

        this.setAjaxHandlerFunctions();


        this.options.onComplete = this.onComplete;
        this.options.isFirstRequest = true;
        this.options.viewStack = new Map();
        /* Commenting the refresh Grouplet related code.As it might useful for future use. Currently 
        refresh option is not required for grouplet*/
        //this.options.refreshPage=this.refreshPage;
        this.options.child = this;
        this.options.originalURL = this.options.baseUrl;
    },
    /**
     * Callback function which is invoked on complete of the ajax request
     */
    onComplete: function() {
        //added for handling field hiding,inline style was getting overwritten
        try {
            jQuery('[data-hideUsingFieldHidingFramework="true"]').addClass('hideElement');
        } catch (e) {
            console.log('Exception caught in fieldHiding handling');
        }
        //Surej
        footableCustomTable();
        /*Below if condition changed to handle combo style reset: Changes start */
        //if(this.options && this.options.isUX3Grouplet && this.options.isUX3Grouplet=="Y"){
        var userType;
        if (document.getElementById('usertype')) {
            userType = document.getElementById('usertype').value;
        }
        if (userType != '4') {
            feba.domManipulator.documentReady(convertComboboxes);
            handleListingTableUI();
        } else {
            handleListingTableUI();
        }
        /*Below if condition changed to handle combo style reset: Changes end */

        feba.domManipulator.css(feba.domManipulator.getElementById(this.options.target), "backgroundImage", "");
        if (this.isFirstResponse === Constants.TRUE) {
            this.isFirstResponse = Constants.FALSE;
            menuActionBind(this.options.target);
        }
        var taretEl = this.options.target;
        jQuery('#' + taretEl).unblock();

        //jQuery("div[id$=':BrdCrumbNImg']").hide();
        var isMasterGrouplet = this.options.IS_MASTER_GROUPLET;
        if (isMasterGrouplet && isMasterGrouplet != null && isMasterGrouplet.length > 0 && isMasterGrouplet == "Y") {
            var responseTextForTitle = "";
            if (arguments[0]) {
                responseTextForTitle = jQuery(arguments[0].responseText);
            }
            jQuery(responseTextForTitle).siblings('.hideElement').attr('data-title');
            //var bcumText= jQuery('.bcum').text();
            //bcumText = bcumText.substring(0,bcumText.lastIndexOf(':')+1);
            if (arguments[0] && arguments[0].status == '200') {
                jQuery('.masterGroupletTitle').parent('li').remove();
            }
            var titleAttr = jQuery(responseTextForTitle).siblings('.hideElement').attr('data-title');


            var titleHdng = jQuery('.pageheadingcaps').html();
            var firstRemove = titleHdng.substr(4);
            var lastRemove = firstRemove.substring(0, firstRemove.length - 5);

            if (titleAttr == null || titleAttr == '' || titleAttr == 'undefined') {

                titleAttr = lastRemove;
            }



            var htmlForMasterGrouplet = "<li class=\"breadcrumbnew1\"><span id=\"breadcrumbarrow\"  class=\"masterGroupletTitle\">&gt; </span>" + titleAttr + "</li>";

            //jQuery(jQuery('.breadcrumbnew1')[jQuery('.breadcrumbnew1').length-1]).append(htmlForMasterGrouplet);
            if (arguments[0] && arguments[0].status == '200') {
                jQuery(htmlForMasterGrouplet).insertAfter(jQuery('.breadcrumbnew1')[jQuery('.breadcrumbnew1').length - 1]);
                if (jQuery('.breadcrumbnew1').length == '0') {
                    jQuery(jQuery('.breadcrumbnew')[jQuery('.breadcrumbnew').length - 1]).append(htmlForMasterGrouplet)
                }
                jQuery('.masterGroupeltTitlehideElement').addClass('masterGroupeltTitleShowElement');




                var titleMessage = getMessage("masterPageTitleVal");

                // BG	alert(titleMessage);
                // BG	alert(titleAttr);
                // BG	alert(titleHdng);

                // BG	alert(firstRemove);

                // BG	alert(lastRemove);

                // BG	alert('inside if');
                // BG	alert(titleAttr);
                // BG	titleMessage=titleAttr;
                // BG	alert(titleMessage);

                titleMessage = getMessage('masterPageTitleVal').replace('$MASTER_GROUPET_TITLE_VAL$', titleAttr);
                // BG	alert(titleMessage);
                jQuery('title').text(titleMessage);
            }




            // BG NEW		var titleMessage=getMessage("masterPageTitleVal");
            // BG NEW		var titleHdng=jQuery('.pageheadingcaps.rakPgHeading').html();
            // BG NEW	alert(titleHdng);
            // BG NEW		if(titleHdng){
            // BG NEW			titleAttr = titleHdng;
            // BG NEW			}			
            // BG NEW		else if(!titleAttr){
            // BG NEW			titleAttr="";
            // BG NEW		}
            // BG NEW   alert(titleAttr);
            // BG NEW		if(titleAttr==""){
            // BG NEW			titleAttr = " Nigeria";
            // BG NEW		}else{
            // BG NEW			titleAttr=": "+titleAttr;
            // BG NEW		}	
            // BG	alert(titleMessage);
            // BG NEW		titleMessage=getMessage('masterPageTitleVal').replace('$MASTER_GROUPET_TITLE_VAL$',titleAttr);
            // BG	alert(titleMessage);
            //BG	if(titleMessage && titleMessage.indexOf("FBN Nigeria")!=-1){
            //BG		titleMessage = titleMessage.replace("Finacle e-Banking:","FBN Nigeria:");
            //BG	}
            // BG NEW		jQuery('title').text(titleMessage);
            // BG NEW		}



            //jQuery(bcumText).append(jQuery(responseTextForTitle).siblings('.hideElement').attr('data-title'));
            var groupletIdentifierHref = (this.options.target + ":HREF_help");
            var groupletHref = jQuery('[id="' + groupletIdentifierHref + '"]').attr('href'); //"L001/helpfiles/Help_Files/Corporate User/Setup/CorpUserAct/Mahesh.htm"; dummy one

            if (arguments[0] && arguments[0].status == '200') {
                jQuery('#HREF_help').attr('href', groupletHref);
            }
            feba.domManipulator.documentReady(convertComboboxes);
            //Raviraj for RHS responsive start
            var trgtDiv = jQuery("#ParentDiv_" + this.options.target).parent().offset().top;
            if (jQuery('.pageLeftContainer').length > 0) {
                var pgLeftContainer = jQuery('.pageLeftContainer').offset().top;
                var noElements = jQuery('.container-xtrasmall').length;
                var currvpWidth = viewport().width;
                for (i = 0; i < noElements; i++) {
                    var currElement = jQuery('.container-xtrasmall')[i];
                    if (jQuery(currElement).children('.widget').length > 0 && parseInt(currvpWidth) > 900) {
                        //alert(parseInt(pgLeftContainer)-parseInt(trgtDiv));
                        var margin = parseInt(pgLeftContainer) - parseInt(trgtDiv);
                        jQuery(currElement).css('margin-top', margin);
                        jQuery(currElement).attr('resized-margin-top', margin);
                        jQuery(currElement).addClass('window-resized');
                        break;
                    }
                }
                var sum = 0;
                jQuery('.container-xtrasmall').each(function() {
                    sum += parseFloat(jQuery(this).height());
                    sum += parseFloat(jQuery(this).css('margin-top'));
                });
                jQuery(jQuery('.container-large:visible')[0]).css('min-height', sum + 'px');
                jQuery(feba.domManipulator.getElement(target)).css('height', 'auto');
                jQuery(jQuery('.container-large:visible')[0]).attr('data-height', sum + 'px');
                handleComboboxSmartphone(this.options.target);
                jQuery(window).resize(function() {

                    var pgLeftContainer = 0;
                    if (jQuery('.pageLeftContainer').offset()) {
                        pgLeftContainer = jQuery('.pageLeftContainer').offset().top;
                    }
                    var noElements = jQuery('.container-xtrasmall').length;
                    for (i = 0; i < noElements; i++) {
                        var currElement = jQuery('.container-xtrasmall')[i];
                        var vpWidth = viewport().width;
                        console.log(vpWidth);
                        if (jQuery(currElement).children('.widget').length > 0 && parseInt(vpWidth) <= 900) {

                            if (!jQuery(currElement).hasClass('height-resized')) {
                                jQuery(currElement).css('margin-top', '0');
                                jQuery(jQuery('.container-large:visible')[0]).css('min-height', 'auto');
                                jQuery(feba.domManipulator.getElement(target)).css('height', 'auto');
                                jQuery(currElement).addClass('height-resized');
                                jQuery(currElement).removeClass('window-resized');
                            }

                            break;
                        } else {
                            var trgtDiv = 0;
                            if (jQuery(currElement).children().offset()) {
                                trgtDiv = jQuery(currElement).children().offset().top;
                            }
                            var margin = parseInt(pgLeftContainer) - parseInt(trgtDiv);
                            if (!jQuery(currElement).hasClass('window-resized')) {

                                var originalMarginTop = jQuery(currElement).attr('resized-margin-top');
                                var originalHeight = jQuery(jQuery('.container-large:visible')[0]).attr('data-height');
                                if (originalMarginTop && originalMarginTop != null) {

                                    margin = originalMarginTop;
                                    if (jQuery(currElement).children('.widget').length > 0) {
                                        jQuery(currElement).css('margin-top', originalMarginTop + 'px');
                                    }
                                } else {
                                    if (jQuery(currElement).children('.widget').length > 0) {
                                        jQuery(currElement).css('margin-top', margin);
                                    }
                                }
                                if (originalHeight && originalHeight != null) {
                                    jQuery(jQuery('.container-large:visible')[0]).css('min-height', originalHeight);
                                    jQuery(feba.domManipulator.getElement(target)).css('height', 'auto');
                                } else {
                                    var heightSum = 0;
                                    jQuery('.container-xtrasmall:visible').each(function() {
                                        heightSum += parseFloat(jQuery(this).height());
                                        heightSum += parseFloat(jQuery(this).css('margin-top'));
                                    });
                                    jQuery(jQuery('.container-large:visible')[0]).css('min-height', heightSum + 'px');
                                    jQuery(jQuery('.container-large:visible')[0]).attr('data-height', heightSum + 'px');
                                    jQuery(feba.domManipulator.getElement(target)).css('height', 'auto');
                                }
                                jQuery(currElement).removeClass('height-resized');
                                jQuery(currElement).addClass('window-resized');

                            }
                            break;
                        }
                    }
                    handleWrappedSpans();
                    //added for handling alignment of all button components in single row
                    handleWrappedSpansRows();
                    //     handleComboboxSmartphone(this.options.target);               

                });
            }
            //Raviraj for RHS responsive end
            var noXSmallElements = jQuery('.container-xtrasmall').length;
            for (i = 0; i < noXSmallElements; i++) {
                var currElement = jQuery('.container-xtrasmall')[i];
                jQuery(currElement).removeClass('hideElement');
            }
            var stage3Details = jQuery('.stage3_previewconfirmdetails');
            for (j = 0; j < stage3Details.length; j++) {
                var currElement = stage3Details[j];
                if (jQuery(currElement).children().length == 0) {
                    jQuery(currElement).css('border-top', '0px');
                }
            }
            handleWrappedSpans();
            //added for handling alignment of all button components in single row
            handleWrappedSpansRows();
            var printElementInsideGrouplet = jQuery('#' + this.options.target + "\\:" + "HREF_printPreview").length;
            jQuery('#' + "HREF_help").show();
            if (!(printElementInsideGrouplet && printElementInsideGrouplet > 0)) {
                jQuery('#' + "HREF_printPreview").hide();
            } else {
                jQuery('#' + "HREF_printPreview").show();
            }

        } else {
            //do nothing.
        }
        try {
            jQuery(".container-nxtGenmedium").find("#" + this.options.target).niceScroll({
                horizrailenabled: false,
                'zindex': 1000
            });
            jQuery(".container-nxtGenmedium").find("#" + this.options.target).niceScroll().resize({
                horizrailenabled: false
            });

        } catch (e) {
            console.log("Exception occured in expandCollapse for scroll enable" + e);
        }
        jQuery('.stage3_searchpaneldiv input[type=submit]').attr('data-SearchPanelSubmit', 'Y');
        // code aligning right hand side widgets properly

    },
    /**
     * It adds the listeners on refresh,close,toggle image elements for event 'click'
     */
    setListeners: function() {
        var groupletID = this.options.target;
        registerMenuHandler(groupletID);


        /* Commenting the refresh Grouplet related code.As it might useful for future use. Currently 
        refresh option is not required for grouplet*/
        /*if (optionObj.refresh) {            
            var that=this;
            feba.domManipulator.bind(feba.domManipulator.getElementById(optionObj.refresh),
        			     optionObj.eventType,{},
        			     function(){
        					that.refreshPage.apply(that);
        					}
        			     );
        }*/


    },

    /**
     *  This is the evenListener for click event of close image
     *	It removes the source element from DOM
     */
    closeGrouplet: function() {
        feba.js.ajax.groupletCounter = feba.js.ajax.groupletCounter - 1;
        var result = true;
        if (feba.js.ajax.groupletCounter === 0) {
            result = confirm(getMessage("LastWidget"));
        }
        if (result) {
            var widTitle = "";
            if ((this.options.title)) {
                widTitle = this.options.title;
            }
            var removeGrpSource = this.options.removeGroupletSrc;
            var containerAffected = feba.domManipulator.getElementById(this.options.removeGroupletSrc).parent();
            if ((this.options.removeUrl)) {

                var rpc = new feba.js.ajax.rpcRequest({
                    JSObjectName: "FEBA.JS.Ajax.RPCRequest",
                    baseUrl: this.options.removeUrl + "&__TARGET_GROUPLET__=" + this.options.target + "&__REMOVE_GROUPLET__=true",
                    criteria: this.options.criteria,
                    displayExceptions: true,
                    executeOnLoad: false,
                    onFailure: function() {
                        widgetConfRemoveFail();
                    },
                    onSuccess: function() {
                        handleWidgetRemoveSuccess(removeGrpSource, containerAffected);
                    }
                });
                rpc.execute();
            }
            var container = feba.domManipulator.getElementById(this.options.removeGroupletSrc).parent();
            var currContSize = jQuery(container).attr('container-size');
            jQuery(container).removeClass(currContSize + "-disabled");
            jQuery(container).addClass(currContSize);
            feba.domManipulator.remove(feba.domManipulator.getElementById(this.options.removeGroupletSrc));
            if (feba.js.ajax.groupletCounter === 0) {
                var errorMessage_closingAllWidgets = "";

                if (feba.js.common.configurable_Widget_Present == 'N') {
                    //All Configured static widgets are closed, then message 'You currently have no widgets' should be thrown
                    errorMessage_closingAllWidgets = getMessage("NoConfiguredWidgets");

                } else {
                    //Dynamic widgets flow
                    errorMessage_closingAllWidgets = getMessage("NoWidgets");
                }

                LIB.__HANDLE_ERROR__(null, "<div id=\"widLibWrapper\" role = \"//alert\" class=\"redbg\"><a id=\"errorlink1\" href=\"#\"><img class=\"absmiddle\" title=\"" + getMessage("NoWidgetsTitle") + "\" " +
                    "alt=\"" + getMessage("NoWidgetsAlt") + "\" src=\"" + getMessage("NoWidgetsImageSrc") + "\"></a><span dir=\"ltr\">[CONTLS0004] [100053] </span>" + errorMessage_closingAllWidgets + "</div>", null, null, "true", true);

            }
        } else {
            feba.js.ajax.groupletCounter = feba.js.ajax.groupletCounter + 1;
        }
    },
    /**
     *	This is the eventListener for click event of  refresh image
     *	It calls the execute method where request is raised
     */
    /* Commenting the refresh Grouplet related code.As it might useful for future use. Currently 
      refresh option is not required for grouplet*/
    /*refreshPage:function(){
    	this.execute();
    },*/
    /**
     *  This is the eventListener for click event of Minimize/Maximize images
     *  For on click of minimizeimage it hides the target element
     *  For on Click of maximizeimage it calls refreshPage method where request is raised 
     */
    toggleGrouplet: function() {

        this.titleForMinimize;
        if (this.minimize === Constants.TRUE) {

            this.minimize = Constants.FALSE;
            /*Get the original title of minimize and save it. This will be used for setting it again*/
            this.titleForMinimize = feba.domManipulator.getAttribute(feba.domManipulator.getElementById(this.options.target + "_Toggle"), "title");

            feba.domManipulator.getElementById(this.options.target).slideUp('300');;
            // Setting the Image and title of Maximize
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle_img"),
                "src",
                imagePath + "/widget-maximize.png"
            );
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle_img"),
                "title",
                getMessage("TitleForMaximize")
            );
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle"),
                "title",
                getMessage("TitleForMaximize")
            );
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle_img"),
                "alt",
                getMessage("TitleForMaximize")
            );

        } else {
            this.minimize = Constants.TRUE;
            feba.domManipulator.getElementById(this.options.target).slideDown('300');;
            // Setting the Image and title of Minimize
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle_img"),
                "src",
                imagePath + "/Toggle.png"
            );
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle_img"),
                "title",
                this.titleForMinimize
            );
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle_img"),
                "alt",
                this.titleForMinimize
            );
            feba.domManipulator.setAttribute(
                feba.domManipulator.getElementById(this.options.target + "_Toggle"),
                "title",
                this.titleForMinimize
            );

        }

    },
    /**
     * Depending on the option refreshPeriod ,it calls Ajax.PeriodicalUpdater or Ajax.Updater
     */
    execute: function() {
        feba.domManipulator.setCssProperties(
            feba.domManipulator.getElementById(this.options.target), {
                /*"backgroundImage" : "url("+this.options.loadingImage+")",*/
                "backgroundRepeat": "no-repeat",
                "backgroundPosition": "center"
            });
        var targetEl = this.options.target;
        jQuery('#' + targetEl).block({
            message: jQuery('<img src=\"' + this.options.loadingImage + '\"/>')
        });
        jQuery(".blockUI").css("border", "0");
        jQuery(".blockUI").css("background-color", "white");
        jQuery(".blockMsg").css("background-color", "transparent");
        jQuery(".blockUI").css("z-index", "2000");
        if (!this.options.isRequestInProcess) {
            this.options.isRequestInProcess = true;
            try {
                if (this.options && this.options.isUX3Grouplet && this.options.isUX3Grouplet == "Y") {
                    masterWidth = [];
                }
            } catch (e) {
                LOG.logMessages("Exception occurred in resetting masterWidth in nfebajaxobjects Exception message is" + e.message);
                LOG.logMessages("Exception occurred in resetting masterWidth in nfebajaxobjects Exception stack is" + e.stack);
            }
            this.request = new feba.js.ajax.ajaxRequest(this.options);
        }

    },
    /**
     * Handler to update the target element
     */
    handler: function() {
        //FIXME Temporarily added by Vivek for Rich text bug fix
        if (this.parser == null || this.parser.content == null) {
            return;
        }

        this.content = this.parser.content[0];
        contentLength = this.content.length;

        //requestIds are set to Map
        var requestIdMap = new Map();
        var requestIds = this.parser.content[1];
        for (var i = 0; i < requestIds.length; i++) {
            if (requestIds[i] != "") {
                var requestId = requestIds[i].split("=");
                requestIdMap.put(requestId[0].trim(), requestId[1]);
            }
        }
        //Iterating over content divs
        for (var contentIndex = 0; contentIndex < contentLength; contentIndex++) {
            var groupletId = feba.domManipulator.getAttribute(this.content[contentIndex], Constants.GROUPLET_ID_ATTR);
            var checkGroupletView = this.XMLHttpRequest.getResponseHeader(groupletId + "GROUPLET_VIEW"); //Mahesh added
            //If the grouplet is new one then
            //Inserts the script object on the page 
            if (groupletId) {
                var scriptObject = feba.domManipulator.getChildren(this.content[contentIndex], "." + Constants.CROSS_SELL_GROUPLET);
                if (scriptObject.length != 0) {
                    feba.domManipulator.getElementById(Constants.CROSS_SELL_CONTAINER).append(scriptObject);
                    //Register action handlers for menus, in case of CSUS grouplet
                    menuActionBind(groupletId);
                    if (feba.features[groupletId]) {
                        feba.features[groupletId].options.isIGC = "Y";
                        feba.features[groupletId].options.requestId = 0;
                    }
                }
            }
            if (groupletId && feba.features[groupletId]) {

                //Retrieving requestId for corresponding grouplet
                //e.g.: requestIds=["mailssent"="1","mailsview"="1"]
                var requestId = requestIdMap.get(groupletId);
                LOG.logMessages("requestId value in handler method of Grouplet: " + requestId);

                //requestId from server is passed as string .So converting from string to int.
                requestId = parseInt(requestId);
                //calling response method to update the grouplet				
                feba.features[groupletId].setResponse(feba.features[groupletId].options, this.content[contentIndex], requestId, this.parser.content[2], groupletId);
            }
            if (checkGroupletView == "Y") {
                //jQuery('#'+groupletId).parents('.widget').hide();
                feba.domManipulator.fadeOut(jQuery('#' + groupletId).parents('.widget'), 4000);
            } else if (checkGroupletView == "N") {
                feba.domManipulator.fadeIn(jQuery('#' + groupletId).parents('.hide-widget'), 4000);
                //jQuery('#'+groupletId).parents('.widget').show();
            }
        }
        //start added solution for widget collapse while processing issue

        var initialHeight = feba.domManipulator.height(feba.domManipulator.getElement(target));
        feba.domManipulator.height(feba.domManipulator.getElement(target), initialHeight);

        // Surej for responsive table width var initialWidth=feba.domManipulator.width(feba.domManipulator.getElement(target));
        var initialWidth = "100%";
        feba.domManipulator.width(feba.domManipulator.getElement(target), initialWidth);

        //end


        this.isRequestInProcess = false;

        //call to the function,which handles Grouplet to Grouplet Communication
        handleTargetGrouplets(this);
        //for disabling cut, copy and paste operations on the password fields in any page
        feba.domManipulator.disableCutCopyPaste(groupletId);

        // for selecting all the input type textbox in a grouplet
        var textElements = feba.domManipulator.getIdWithAppend(groupletId, " *:input[type='text']");

        //for showing watermark for all the Textbox fields in a widget
        feba.js.watermark.showWatermarkForWidget(textElements);
        //handle calendar opening with keyboard
        feba.js.handleCalendarWithKey();
    },
    /**
     * Sets the response to corresponding target element
     */
    setResponse: function(currentGroupletOptions, content, serverRequestId, exceptionGrouplets, groupletId) {
        LOG.logMessages(groupletId + " request ID check: " + (serverRequestId == parseInt(currentGroupletOptions.requestId, 10) + 1));
        currentGroupletOptions.originalContent = content.innerHTML;
        /* Fix for modal enhancement: start*/
        if (true) {
            //if(currentGroupletOptions.isIGC=="Y" || currentGroupletOptions.updateParentAction==true || serverRequestId==parseInt(currentGroupletOptions.requestId,10)+1){
            //Replace the grouplet content with response
            if (currentGroupletOptions.isIGC == "Y" || currentGroupletOptions.updateParentAction == true) {
                currentGroupletOptions.updateParentAction = false;
                currentGroupletOptions.requestId = serverRequestId - 1;
            }
            /* Fix for modal enhancement: end*/
            target = feba.domManipulator.getElementById(currentGroupletOptions.target);
            if (target) {
                //If viewStack queue is not null,view from the queue should be set to the target 
                LOG.logMessages("View Stack Size in setResponse: " + currentGroupletOptions.viewStack.size());
                if (currentGroupletOptions.viewStack.size() > 0) {
                    updateTarget(currentGroupletOptions, target, content, exceptionGrouplets, groupletId);
                    currentGroupletOptions.requestId = parseInt(currentGroupletOptions.requestId, 10) + 1;
                    if (currentGroupletOptions.viewStack.get(parseInt(currentGroupletOptions.requestId, 10) + 1)) {
                        var viewContent = currentGroupletOptions.viewStack.get(parseInt(currentGroupletOptions.requestId, 10) + 1);
                        currentGroupletOptions.viewStack.remove(parseInt(currentGroupletOptions.requestId, 10) + 1);

                        setTimeout(function() {
                            currentGroupletOptions.setResponse(currentGroupletOptions, viewContent, serverRequestId + 1);
                        }, 10000);
                    }
                } else {
                    LOG.logMessages("Exception grouplets Logic:" + (exceptionGrouplets && exceptionGrouplets.indexOf(groupletId) != -1));
                    if (exceptionGrouplets && exceptionGrouplets.indexOf(groupletId) != -1) {
                        //Block the target,to avoid user doing any actions since it is not latest response 				
                        target.block({
                            message: Constants.RELOADING_MESSAGE,
                            css: {
                                border: '3px solid'
                            }
                        });
                        currentGroupletOptions.requestId = parseInt(currentGroupletOptions.requestId, 10) + 1;
                        currentGroupletOptions.refreshPage.call(feba.features[groupletId]);
                        return;
                    } else {
                        LOG.logMessages("Else logic where response gets appended");
                        feba.domManipulator.remove(feba.domManipulator.children(target));
                        feba.domManipulator.append(target, content);
                        if (feba.features[exceptionGrouplets]) {
                            feba.domManipulator.remove(feba.domManipulator.children(feba.domManipulator.getElementById(feba.features[exceptionGrouplets].options.target)));
                            feba.domManipulator.getElementById(feba.features[exceptionGrouplets].options.target).block({
                                message: Constants.RELOADING_MESSAGE,
                                css: {
                                    border: '3px solid'
                                }
                            });
                            feba.features[exceptionGrouplets].options.requestId = 0;
                            feba.features[exceptionGrouplets].execute();
                        }
                        //Updating the target element with the response
                        //target.replaceWith(content);
                    }
                    //Incrementing the client requestId after updating the target element				
                    currentGroupletOptions.requestId = parseInt(currentGroupletOptions.requestId, 10) + 1;
                    if (feba.features[groupletId].options.isCsus) {
                        feba.features[groupletId].options.requestId = serverRequestId;
                    }
                }
                //start added solution for widget collapse while processing issue

                feba.domManipulator.getElement(target).css('height', 'auto');
                feba.domManipulator.getElement(target).css('width', 'auto');

                //end
            }

            // Start Added for Auto Refresh Functionality for Monitoring tool//
            // Looking for AUTO_REFRESH_FUNCTIONALY hidden parameter in ajax response, which will be available only for monitoring widgets//
            var ajaxResponseText = currentGroupletOptions.XMLHttpRequest.responseText;
            var autoRefreshHiddenFieldIndex = ajaxResponseText.indexOf("AUTO_REFRESH_FUNCTIONALITY");
            // If parameter found then call setAutoRefreshParam method to initiate auto refresh parameters//
            if (autoRefreshHiddenFieldIndex != -1) {
                feba.js.autoRefresh.setAutoRefreshParam(groupletId);
            }
            // End of Monitoring tool changes//						
        }
        /*If the request Id is the same, don't do anything (the request was not processed on the server*/
        else if (serverRequestId != parseInt(currentGroupletOptions.requestId, 10)) {
            //If client requestId and server requestId doesn't match ,add the view to the viewStack to be used later
            LOG.logMessages("Else logic where response is put in stack");
            currentGroupletOptions.viewStack.put(serverRequestId, content);
        }



        //Update the target element with content in disabled mode
        function updateTarget(currentGroupletOptions, target, content, exceptionGrouplets, groupletId) {

            if (exceptionGrouplets && exceptionGrouplets.indexOf(groupletId) != -1) {
                //Block the target,to avoid user doing any actions since it is not latest response 				
                target.block({
                    message: Constants.RELOADING_MESSAGE,
                    css: {
                        border: '3px solid'
                    }
                });
                currentGroupletOptions.requestId = parseInt(currentGroupletOptions.requestId, 10) + 1;
                currentGroupletOptions.refreshPage.call(feba.features[groupletId]);


            } else {

                //Get the target element from the document and update with the response content
                var targetId = document.getElementById(feba.domManipulator.getAttribute(target, 'id'));
                // for selecting all the input type textbox in a grouplet
                var textElements = feba.domManipulator.getIdWithAppend(groupletId, " *:input[type='text']");
                //for showing watermark for all the Textbox fields in a widget
                feba.js.watermark.showWatermarkForWidget(textElements);

                //TODO :Should avoid this
                targetId.innerHTML = content.innerHTML;


                //Block the target,to avoid user doing any actions since it is not latest response 				
                target.block({
                    message: Constants.PROCESSING_MESSAGE,
                    css: {
                        border: '1px solid',
                        background: 'white url(consumer/images/spinner.gif) 50% center no-repeat',
                        backgroundColor: '#f00',
                        height: '15%'
                    }
                });


            }


        }

        currentGroupletOptions.isIGC = "N";

    },
    onError: function(jqXHR, textStatus, errorThrown) {
        switch (textStatus) {
            case "timeout":
            case "error":
            case "abort":
            case "parsererror":
            default:
                this.handleTimeout(jqXHR, textStatus, errorThrown);
                break;
        }

    },

    removeTargetsChildren: function() {
        var target = feba.domManipulator.getElementById(this.options.target);
        feba.domManipulator.remove(feba.domManipulator.children(target));
    },

    handleTimeout: function(jqXHR, textStatus, errorThrown) {
        this.onComplete();
        this.options.isRequestInProcess = false;
        var target = feba.domManipulator.getElementById(this.options.target);
        if (this.options.isUX3Grouplet && this.options.isUX3Grouplet == "Y") {
            feba.domManipulator.getElement('#' + this.options.target).find('#MessageDisplay_TABLE').remove();
            feba.domManipulator.getElement('#' + this.options.target).find('.refreshWidgetLinkWrapper').remove();
            var errorHTML = formWidgetErrorUX3Page(this.options.target, textStatus, "feba.features[\'" + this.options.target +
                "\'].removeTargetsChildren();feba.features[\'" +
                this.options.target + "\'].execute();");
            var groupletErrorDisplayTag = Constants.GROUPLET_ERRORDISPLAY_TAG;
            var pgHeadingTag = Constants.PAGEHEADING_TAG;
            var errorDisplayTag = Constants.ERRORDISPLAY_TAG;
            if (this.options.target && this.options.target != "null") {
                errorDisplayTag = this.options.target + ":" + Constants.ERRORDISPLAY_TAG;
                pgHeadingTag = this.options.target + ":" + Constants.PAGEHEADING_TAG;
                groupletErrorDisplayTag = this.options.target + ":" + Constants.GROUPLET_ERRORDISPLAY_TAG;
            }
            if (feba.domManipulator.getElement(feba.domManipulator.getElementById(groupletErrorDisplayTag)).length == 0) {
                if (feba.domManipulator.getElement('#' + this.options.target.toUpperCase()) && feba.domManipulator.getElement('#' + this.options.target.toUpperCase()).length > 0) {
                    feba.domManipulator.getElement('#' + this.options.target.toUpperCase()).prepend("<div id=\"" + groupletErrorDisplayTag + "\" > </div>");
                } else {
                    feba.domManipulator.getElement('#' + this.options.target).prepend("<div id=\"" + groupletErrorDisplayTag + "\" > </div>");
                }
            }

            LIB.__HANDLE_ERROR__(null, errorHTML, "", this.options.target, "true", true);
            var groupletId = this.options.target;
            handleErrorOnLoad(this.options.target);
            feba.domManipulator.getElement('#' + this.options.target).find('.refreshWidgetLinkWrapper').nextAll().remove()
        } else {
            feba.domManipulator.append(target, formWidgetErrorPage(textStatus, "feba.features[\'" + this.options.target +
                "\'].removeTargetsChildren();feba.features[\'" +
                this.options.target + "\'].execute();"));
        }
    }



});

/**
 * Handles PerriodicalUpdater
 */
var temp = {
    counter: 0
};
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.periodicalUpdater", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {
        this.name = "feba.js.ajax.periodicalUpdater";
        this.tempCounter = temp.counter;
        this.tempName = this.name + temp.counter;
        temp[this.tempName] = this;
        temp.counter++;
        this.version = "1.0";
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.execute();
    },
    /**
     * It assigns all the options which are required for  PeriodicalUpdater processing to this.options 
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parser: new LIB.Parser(Constants.JSON),
            handler: this.handler,
            requestId: 0,
            child: this
        }, options || {});
        this.decay = (this.options.decay || 2);
        this.frequency = (this.options.frequency || 15);
        this.options.handleErrors = this.handleErrors;
        this.options.handleErrors = this.handleErrors;
        this.setAjaxHandlerFunctions();
        this.options.child = this;
        LOG.logMessages("In SetOptions method , options are set");
    },
    /**
     * Updates the target with response
     */
    handler: function() {
        LOG.logMessages("In handler method rpcRequest, response is set to target ");


        this.content = this.parser.content;
        var target = this.target;
        var formattedError = this.content[0][1];
        var formFieldsInError = this.content[1][1];
        var groupletId = this.groupletId;
        //Added to suppress\display error messages
        var dispEx = this.displayExceptions;

        this.handleErrors(formattedError, formFieldsInError, groupletId, dispEx);
        if (String(this.parser.content[2][1]) !== "0000") {
            return;
        }
        var requestId = this.content[4][1];
        var targetArray = "";
        var targetElementArray = "";
        var targetElement = "";
        var contentLen = this.content.length;

        if (target.length != 0 && ((target.indexOf(",") != -1) || (target.indexOf("=") != -1))) {
            targetArray = target.split(",");
            var targetLen = targetArray.length;
            for (var i = 0; i < targetLen; i++) {
                if (targetArray[i].indexOf("=") != -1) {
                    targetElementArray = targetArray[i].split("=");
                    if (targetElementArray.length == 2) {
                        target = LIB.__GET_DOM__(targetElementArray[0]);
                        if (!target) {
                            throw new Error("No Target");
                        }
                        if (requestId == this.requestId) {
                            for (var j = 5; j < contentLen; j++) {
                                if (targetElementArray[1] == this.content[j][0]) {
                                    if (target.type == Constants.TEXTFIELD) {
                                        target.value = this.content[j][1];
                                    } else {
                                        target.innerHTML = this.content[j][1];
                                    }
                                }
                            }
                        }
                    } else {
                        throw new Error("Target pattern not proper");
                    }
                } else {
                    throw new Error("Target pattern not proper");
                }
            }
        } else {
            target = LIB.__GET_DOM__(this.target);
            if (!target) {
                throw new Error("No Target");
            }
            if (requestId == this.requestId) {
                if (target.type == Constants.TEXTFIELD) {
                    target.value = this.content[5][1];
                } else {
                    target.innerHTML = this.content[5][1];
                }
            }
        }



    },
    /**
     * Raises Ajax Request Periodically
     */
    execute: function() {

        LOG.logMessages("In event handler Execute method,raising the request ");

        this.request = new feba.js.ajax.ajaxRequest(this.options);

        /*if (this.request.options.parser.content) {
        	this.content = this.request.options.parser.content[0];
        	if (this.decay) {
        		this.decay = (this.content[1] == this.lastText ? this.decay
        				* this.options.decay : 1);
        		this.lastText = this.content[1];
        	}
        }*/
        //var that=this;
        var delay1 = this.frequency * 1000;

        setTimeout("temp[\"" + this.tempName + "\"].execute.apply(temp[\"" + this.tempName + "\"])", delay1);

    },
    /*
    stop : function() {
    					this.request.stop();
    				},
    				*/
    /**
     * Converts the object to String.Overrides the default toString method
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }
});


/**
 * Handles RPC Ajax Request
 */

feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.rpcRequest", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {
        this.name = "feba.js.ajax.rpcRequest";
        this.version = "1.0";
        this.description = "";

        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.setListeners();
        if (this.options.executeOnLoad && this.options.executeOnLoad != "false") {
            this.execute();
        }
    },
    /**
     * It assigns all the options which are required for  RPCRequest processing to this.options 
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parser: new LIB.Parser(Constants.JSON),
            handler: this.handler,
            requestId: 0,
            child: this
        }, options || {});
        LOG.logMessages("In SetOptions method , options are set");

        this.options.originalParams = this.options.criteria || this.options.parameters;
        this.options.handleErrors = this.handleErrors;
        this.setAjaxHandlerFunctions();
        this.options.child = this;
    },
    /**
     * Event handler which raises the Ajax Request after setting the parameters for corresponding index in case of listing. 
     */
    executeEvent: function() {
        var options = this.modalObj.options;
        if (options.originalParams && options.originalParams.indexOf('[]') != -1) {
            var params = options.originalParams.replace(/\[\]/g, '[' + this.currentIndex + ']');
            if (options.parameters) {
                options.parameters = params;
            } else {
                options.criteria = params;
            }
        } else {
            if (options.parameters) {
                options.parameters = options.originalParams;
            } else {
                options.criteria = options.originalParams;
            }
        }
        //Appending index Field to parameters
        if (this.modalObj.options.indexFieldName) {
            var listIndex = parseInt(this.currentIndex);
            if (!this.modalObj.options.matchSourceBy) {
                listIndex += 1;
            }
            var indexParam = this.modalObj.options.indexFieldName + "=" + (listIndex);

            if (this.modalObj.options.parameters) {
                this.modalObj.options.parameters = this.modalObj.options.parameters + "::" + indexParam;
            } else if (this.modalObj.options.criteria) {
                this.modalObj.options.criteria = this.modalObj.options.criteria + "::" + indexParam;
            } else {
                this.modalObj.options.parameters = indexParam;
            }
        }
        this.modalObj.execute.call(this.modalObj);



    },
    /**
     * Raises the Ajax Request
     */
    execute: function() {
        LOG
            .logMessages(
                "In event handler Execute method,raising the request ");
        //Added to prevent simultaneous rpc request firing
        feba.domManipulator.blockUI({
            message: '<div style="text-align: center;"><img src="L001/consumer/images/widget-loading.gif"/></div>',
            baseZ: 9999
        });
        this.request = new feba.js.ajax.ajaxRequest(this.options);
    },
    /**
     * Updates the target with the Ajax response
     */
    handler: function() {
        LOG.logMessages("In handler method rpcRequest, response is set to target ");
        //Added to prevent simultaneous rpc request firing
        feba.domManipulator.unblockUI();
        var businessRespType = this.parser.exceptionType;

        if (businessRespType === "BE" || businessRespType === "BC") {
            this.extendedhandler();
            return;
        }
        var closeElement = feba.domManipulator.getElementOfClass("modalCloseImg");
        //Trigger the event on close
        if (feba.domManipulator.getMatchedElementCount(closeElement)) {
            delete feba.features["MODAL_VIEW_CONTAINER"];
            feba.domManipulator.trigger(closeElement, 'click');
        }
        this.content = this.parser.content;
        var target = this.target;
        var formattedError = this.content[0][1];
        var formFieldsInError = this.content[1][1];
        var groupletId = this.groupletId;
        //Added to suppress\display error messages
        var dispEx = this.displayExceptions;

        if (businessRespType === "BI") {
            LIB.__HANDLE_ERROR__(this.riaFeatureID, formattedError, formFieldsInError, groupletId, dispEx, true, this.source);
        } else {
            this.handleErrors(formattedError, formFieldsInError, groupletId, dispEx);
        }
        if (String(this.parser.content[2][1]) !== "0000") {
            return;
        }
        var requestId = this.content[4][1];
        var targetArray = "";
        var targetElementArray = "";
        var targetElement = "";
        var contentLen = this.content.length;

        if (target != null && target.length != 0 && ((target.indexOf(",") != -1) || (target.indexOf("=") != -1))) {
            targetArray = target.split(",");
            var targetLen = targetArray.length;
            for (var i = 0; i < targetLen; i++) {
                if (targetArray[i].indexOf("=") != -1) {
                    targetElementArray = targetArray[i].split("=");
                    if (targetElementArray.length == 2) {
                        target = LIB.__GET_DOM__(targetElementArray[0]);
                        if (!target) {
                            throw new Error("No Target");
                        }
                        if (requestId == this.requestId) {
                            for (var j = 5; j < contentLen; j++) {
                                if (targetElementArray[1] == this.content[j][0]) {
                                    if (target.type == Constants.HIDDEN) {
                                        target.value = this.content[j][1];
                                    } else if (target.type == Constants.TEXTFIELD) {
                                        target.value = this.content[j][1];
                                    } else {
                                        target.innerHTML = this.content[j][1];
                                    }
                                }
                            }
                        }
                    } else {
                        throw new Error("Target pattern not proper");
                    }
                } else {
                    throw new Error("Target pattern not proper");
                }
            }
        } else {
            target = LIB.__GET_DOM__(this.target);
            if (target != null && requestId == this.requestId) {
                if (target.type == Constants.TEXTFIELD) {
                    target.value = this.content[5][1];
                } else {
                    target.innerHTML = this.content[5][1];
                }
            }
        }
    },
    /**
     * Overrides the default toStriong method.Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }

});
/**
 * Handles ListingSelect Tag: It allows one to retrieve a list of values
 * from server and display them in another HTML select box or a text field for corresponding listing elements.
 */

feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.listingSelect", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {

        this.name = "feba.js.ajax.listingSelect";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.version = "1.0";
        this.description = "";

        this.setOptions(options);

        this.setListeners();

        if (this.options.executeOnLoad) {
            this.execute();
        }
    },
    /**
     * It assigns all the options which are required for
     * Select-processing to this.options
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parameters: '',
            emptyOptionValue: '',
            emptyOptionName: '',
            defaultOptions: '',
            eventType: "change",
            parser: new LIB.Parser(Constants.JSON),
            handler: this.handler,
            requestId: 0,
            child: this,
            isTargetAnImage: this.isTargetAnImage || false,
            selectValue: "Select|"
        }, options || {});

        this.options.handleErrors = this.handleErrors;
        this.options.originalParams = this.options.criteria || this.options.parameters;
        LOG.logMessages("In SetOptions method , options are set");
        this.setAjaxHandlerFunctions();
        this.options.child = this;
        this.originalOptions = options;
    },
    /**
     * It sets the listeners on Source Element.
     */
    setListeners: function() {

        var optionObj = this.options;
        var source = optionObj.source;
        var filter;
        //For listing elements ,the id will '[]'
        //Event Listeners has to be added for all listing elemnts ,based on index which is passed
        if (source != null) {
            if (source.indexOf('[]') != -1) {
                if (!optionObj.startIndex || !optionObj.endIndex) {
                    throw new Error("startIndex,endIndex should be passed");
                }
                var parent = [];
                for (var index = optionObj.startIndex; index < optionObj.endIndex; index++) {
                    parent[index] = new Object;
                    parent[index].modalObj = this;
                    var sourceElement = source.replace('[]', '[' + index + ']');
                    parent[index].currentIndex = index;
                    var eventElement = feba.domManipulator.getElementById(sourceElement);
                    if (eventElement) {
                        var that = this;
                        var isFilter = this.options.filter;
                        feba.domManipulator.bind(eventElement, optionObj.eventType, {
                            currentIndex: index
                        }, function(e) {
                            if (isFilter) {
                                var filterParams = that.options.filter.replace(/\[\]/g, '[' + e.data.currentIndex + ']');
                                var field = null,
                                    key = null,
                                    valueArray = null,
                                    foptions = null,
                                    valueString = null,
                                    fieldValue, fieldName, result = "";
                                filterParams = filterParams.split(Constants.PARAMETERS_SEPERATOR);
                                feba.domManipulator.each(filterParams,
                                    function(index, pair) {
                                        if (feba.domManipulator.trim(pair).length === 0) {
                                            return;
                                        }
                                        valueString = pair
                                            .match(/\{[\w\.:\(\)\[\]]*\}/g).toString();
                                        valueArray = [];
                                        if (Constants.STRING === typeof(valueString) &&
                                            feba.domManipulator.trim(valueString).length > 0) {
                                            field = pair
                                                .match(/\{[\w\.:\(\)\[\]]*\}/g);
                                            if (field) {
                                                for (i = 0; i < field.length; i++) {
                                                    var fieldTemp = LIB.__GET_DOM__(field[i].substring(1,
                                                        field[i].length - 1));

                                                    if (!fieldTemp) {

                                                        if ((valueString.indexOf('{') != 0) && (valueString.indexOf('}') != valueString.length - 1)) {
                                                            valueArray.push(valueString);
                                                        }
                                                    } else if (Constants.MULTIPLE_SELECT === fieldTemp.type) {
                                                        if (fieldValue = feba.domManipulator.serialize(feba.domManipulator.getElement(fieldTemp))) {
                                                            result = fieldValue;
                                                        }
                                                    } else if (fieldTemp.type == Constants.TEXTFIELD ||
                                                        fieldTemp.type == 'textarea' ||
                                                        fieldTemp.type == 'password' ||
                                                        fieldTemp.type == Constants.HIDDEN ||

                                                        fieldTemp.type == Constants.SIMPLE_SELECT ||
                                                        'checkbox' === fieldTemp.type) {


                                                        result = fieldTemp.value;




                                                    } else if (Constants.RADIO === fieldTemp.type) {
                                                        result = feba.domManipulator.getAttribute(feba.domManipulator.getElementByName(fieldTemp.name), "value");
                                                    } else {

                                                        result = fieldTemp.innerHTML;
                                                    }


                                                }
                                            } else {
                                                field = feba.domManipulator.getElementByName(fieldName)[0];
                                            }
                                        }

                                        filterParams = filterParams.toString();
                                        filterParams = filterParams.replace(valueString, result);
                                    });
                                //that.options.filter= filterParams;
                                //filter=filterParams;
                            }
                            parent[e.data.currentIndex].modalObj.filter = filterParams;
                            that.executeEvent.apply(parent[e.data.currentIndex]);
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            return false;
                        });
                    }

                }
            } else {
                var parent = new Object;
                parent.modalObj = this;

                var eventElement = feba.domManipulator.getElementById(optionObj.source);

                if (eventElement.length) {
                    var that = this;
                    feba.domManipulator.bind(eventElement, optionObj.eventType, {}, function(event) {
                        that.execute.apply(parent.modalObj);
                        return false;
                    });
                }

            }
        }
    },

    executeEvent: function() {
        var isFilter = this.modalObj.options.filter;
        if ((this.modalObj.options.originalParams && this.modalObj.options.originalParams.indexOf('[]') != -1) || isFilter) {

            var params = this.modalObj.options.originalParams.replace(/\[\]/g, '[' + this.currentIndex + ']');
            if (this.modalObj.options.parameters) {
                this.modalObj.options.parameters = params;
            } else {
                this.modalObj.options.criteria = params;
            }
            this.modalObj.options.currentIndex = this.currentIndex;
            var tempObj = new feba.js.ajax.listingSelect(this.modalObj.options);
            tempObj.options.filter = this.modalObj.filter;
            tempObj.execute();
        }

    },

    /**
     * It removes the listeners on Source Element.
     */
    removeListeners: function() {
        var optionObj = this.options;
        var sourc = LIB.__GET_DOM__(optionObj.source);
        if (sourc) {
            sourc["on" + optionObj.eventType] = "";
        }

    },
    /**
     * It raises an ajax Request
     */
    execute: function() {
        LOG
            .logMessages(
                "In event handler Execute method,raising the request ");
        // Checking whether the source has value
        //if(checkCanRaiserequest(this.options)){
        //this.options.currentIndex=this.currentIndex;
        if ("" === (feba.domManipulator.getElementById(this.options.source.replace("[]", "[" + this.options.currentIndex + "]")))[0].value) {
            var targetArray = this.options.target.split(",");
            var targetLen = targetArray.length;
            for (var i = 0; i < targetLen; i++) {
                if (targetArray[i].indexOf("=") == -1) {
                    throw new Error("Target pattern not proper");
                }
                var targetElementArray = targetArray[i].split("=");
                if (targetElementArray.length != 2) {
                    throw new Error("Target pattern not proper");
                }
                target = LIB.__GET_DOM__(targetElementArray[0] + '[' + this.options.currentIndex + ']');

                if (target.type == Constants.SIMPLE_SELECT) {
                    setTargetToSimpleSelect(target, null, "Select|");
                    callDomManipulation(target);
                }
            }
            return;
        }
        this.request = new feba.js.ajax.ajaxRequest(this.options);
        //}
    },
    /**
     * It sets the response to target element
     */
    handler: function() {
        LOG.logMessages("In handler method, response is set to target");

        this.content = this.parser.content;
        var target = this.target;
        try {
            var formattedError = this.content[0][1];
            var formFieldsInError = this.content[1][1];
            var groupletId = this.groupletId;
            //Added to suppress\display error messages
            var dispEx = this.displayExceptions;
            var errorHighlightLocation = this.parser.content[2][1][0].ERR_HIGHLIGHT_LOCATION;
            var errorMsgLoaction = this.parser.content[2][1][0].FIELD_MSG_DISPLAY_LOCATION;
            this.handleErrors(formattedError, formFieldsInError, groupletId, dispEx, errorHighlightLocation, errorMsgLoaction);


            if (String(this.parser.content[2][1]) === "0000") {
                var serverRequestId = this.content[4][1];
                if (serverRequestId != this.requestId) {
                    throw new Error("Outdated request");
                }
            }

            if (target.length == 0) {
                throw new Error("Target pattern not proper");
            }
            var targetArray = target.split(",");
            var targetLen = targetArray.length;
            for (var i = 0; i < targetLen; i++) {
                if (targetArray[i].indexOf("=") == -1) {
                    throw new Error("Target pattern not proper");
                }
                var targetElementArray = targetArray[i].split("=");
                if (targetElementArray.length != 2) {
                    throw new Error("Target pattern not proper");
                }
                target = LIB.__GET_DOM__(targetElementArray[0] + '[' + this.currentIndex + ']');

                if (!target) {
                    this.stop();
                    this.removeListeners();
                    throw new Error("target lost");
                }
                if (String(this.parser.content[2][1]) !== "0000") {
                    //Clearing the Target
                    //removeTarget(target);
                    if (!target) {
                        target = feba.domManipulator.getElementEndingWith(targetElementArray[0])[0];
                    }
                    if (target.type == Constants.TEXTFIELD || target.type == Constants.HIDDEN) {
                        target.value = "";
                    } else if (target.type == Constants.SIMPLE_SELECT) {
                        setTargetToSimpleSelect(target, null, "Select|");
                        callDomManipulation(target);
                    } else if (target.type == Constants.RADIO) {
                        target = feba.domManipulator.getElementByName(target.name);
                        feba.domManipulator.each(target, function(index) {
                            target[index].checked = false;
                        });
                    } else {
                        target.innerHTML = "";
                    }
                    return;
                }
                updateTargetElement(target, this.content, targetElementArray[1], this.selectValue, this.isTargetAnImage);

            }

        } catch (e) {
            target.options.length = 0;
            target.disabled = false;
        }
    },
    /**
     * Overrides the default toString() method. Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }
});



/**
 * Handles Select Tag The select tag allows one to retrieve a list of values
 * from server and display them in another HTML select box.
 */

feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.select", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {

        this.name = "feba.js.ajax.select";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.version = "1.0";
        this.description = "";

        this.setOptions(options);
        this.setListeners();
        /* added to retain values on page load.
           on page load if source contains value then 
           set executeOnLoad to "true" else to "false"
        */
        var execute = false;
        var value = LIB.__GET_DOM__(this.options.source);
        if (this.options.source != null && value != undefined) {
            switch (LIB.__GET_DOM__(this.options.source).type) {
                case Constants.SIMPLE_SELECT:
                case Constants.HIDDEN:
                case Constants.TEXTFIELD:
                    if (feba.domManipulator.hasValueForId(this.options.source)) {
                        execute = true;
                    }
                    break;
                case Constants.CHECKBOX:
                case Constants.RADIO:

                    if (LIB.__GET_DOM__(this.options.source).checked == "true") {
                        execute = true;
                    }
            }
        }
        if (this.options.executeOnLoad != "false" && execute) {
            this.execute();
        }
    },
    /**
     * It assigns all the options which are required for
     * Select-processing to this.options
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parameters: '',
            emptyOptionValue: '',
            emptyOptionName: '',
            defaultOptions: '',
            eventType: "change",
            parser: new LIB.Parser(Constants.JSON),
            handler: this.handler,
            requestId: 0,
            child: this,
            selectValue: "select|"
        }, options || {});

        this.options.handleErrors = this.handleErrors;
        LOG.logMessages("In SetOptions method , options are set");
        this.setAjaxHandlerFunctions();
        this.options.child = this;
    },
    /**
     * It sets the listeners on Source Element.
     */
    setListeners: function() {
        var optionObj = this.options;
        var sourc = feba.domManipulator.getElementById(optionObj.source);
        if (sourc) {
            var that = this;
            feba.domManipulator.bind(sourc, optionObj.eventType, {}, function() {
                that.execute.apply(that);
            });
            feba.domManipulator.bind(sourc, "domManipulation", {}, function() {
                //that.options.executeOnLoad = true;
                that.execute.apply(that);
            });
            LOG
                .logMessages(

                    "In SetListeners method, eventListener has been added to element",
                    optionObj.source,
                    "with event Type",
                    optionObj.eventType);
        }
    },
    /**
     * It removes the listeners on Source Element.
     */
    removeListeners: function() {
        var optionObj = this.options;
        var sourc = LIB.__GET_DOM__(optionObj.source);
        if (sourc) {
            sourc["on" + optionObj.eventType] = "";
        }

    },
    /**
     * It raises an ajax Request
     */
    execute: function() {
        LOG
            .logMessages(
                "In event handler Execute method,raising the request ");
        // Checking whether the source has value
        if (checkCanRaiserequest(this.options)) {
            this.request = new feba.js.ajax.ajaxRequest(this.options);
        } else {
            console.log("Update the combobox in UI");
            try {
                jQuery(target).febaCombobox("update");
            } catch (e) {
                LOG.logMessages("Drop down update failed");
            }
        }
    },
    /**
     * It sets the response to target element
     */
    handler: function() {
        LOG.logMessages("In handler method, response is set to target");

        this.content = this.parser.content;
        var target = this.target;

        try {
            var formattedError = this.content[0][1];
            var formFieldsInError = this.content[1][1];
            var groupletId = this.groupletId;
            var temptargetArraySplit = "";
            var actualElementIdWithoutGrouplet = "";
            var actualElementWithoutGrouplet = "";
            //Added to suppress\display error messages
            var dispEx = this.displayExceptions;
            var errorHighlightLocation = this.parser.content[2][1][0].ERR_HIGHLIGHT_LOCATION;
            //Added as per fix provided by Bhuvana -- Error highlighting removal for RIA Start
            if (typeof errorHighlightLocation == 'undefined' || typeof errorHighlightLocation == "undefined") {

                try {
                    errorHighlightLocation = this.parser.content[5][1];
                } catch (e) {}
            } else if (errorHighlightLocation != "ROW" && errorHighlightLocation != "LABEL") {
                try {
                    errorHighlightLocation = this.parser.content[5][1];
                } catch (e) {}
            }
            //Added as per fix provided by Bhuvana -- Error highlighting removal for RIA End
            var errorMsgLoaction = this.parser.content[2][1][0].FIELD_MSG_DISPLAY_LOCATION;
            this.handleErrors(formattedError, formFieldsInError, groupletId, dispEx, errorHighlightLocation, errorMsgLoaction);
            if (String(this.parser.content[2][1]) !== "0000") {
                removeTarget(target);
                return;
            }
            var serverRequestId = this.content[4][1];
            if (serverRequestId != this.requestId) {
                throw new Error("Outdated request");
            }
            if (target.length == 0) {
                throw new Error("Target pattern not proper");
            }
            var targetArray = target.split(",");
            var jawsObj = {
                "ariaTitle": "",
                "addToJAWS": false,
                "tarId": ""
            };
            var targetLen = targetArray.length;
            for (var i = 0; i < targetLen; i++) {
                if (targetArray[i].indexOf("=") == -1) {
                    LOG.logMessages("Target pattern not proper");
                    continue;
                    //throw new Error("Target pattern not proper");
                }
                var targetElementArray = targetArray[i].split("=");
                if (targetElementArray.length != 2) {
                    LOG.logMessages("Target pattern not proper");
                    continue;
                    //throw new Error("Target pattern not proper");
                }

                target = LIB.__GET_DOM__(targetElementArray[0]);
                if (!target) {
                    if (targetElementArray[0].indexOf(":") != -1) {
                        //grouplet:xyz
                        try {
                            temptargetArraySplit = targetElementArray[0].split(":");
                            if (temptargetArraySplit.length == 2) {
                                actualElementIdWithoutGrouplet = temptargetArraySplit[1];
                                //actualElementWithoutGrouplet=jQuery('#'+groupletId).find('#'+actualElementIdWithoutGrouplet);
                                actualElementWithoutGrouplet = document.querySelector("#" + groupletId).querySelector("#" + actualElementIdWithoutGrouplet);
                                if (actualElementWithoutGrouplet) {
                                    target = actualElementWithoutGrouplet;
                                } else {
                                    LOG.logMessages("target lost :" + targetElementArray[0]);
                                    continue;

                                }
                            }
                        } catch (e) {
                            LOG.logMessages("Exception occurred while setting target for select feature Exception message is" + e.message);
                            LOG.logMessages("Exception occurred while setting target for select feature Exception stack is" + e.stack);
                            continue;

                        }

                    } else {
                        LOG.logMessages("target lost :" + targetElementArray[0]);
                        continue;
                    }

                }
                //updates the target depending upon its type
                updateTargetElement(target, this.content, targetElementArray[1], this.selectValue);
                try {
                    // Form dynamic string that should be read by screen reader
                    formStringForJAWS(jawsObj, target, this.source);
                } catch (e) {
                    log.logMessages(e.message);
                }
            }
            try {
                if (jawsObj.addToJAWS) {
                    // adding dynamic string to the screen and making it as live region
                    LIB.__ADD_POLITE_LIVE_REGION__(document.getElementById(this.source), jawsObj.ariaTitle, jawsObj.tarId, this.riaFeatureID);
                }
            } catch (e) {
                log.logMessages(e.message);
            }
        } catch (e) {
            if (target) {
                target.disabled = false;
                if (target.options) {
                    target.options.length = 0;
                }
            }
        }
    },
    /**
     * Overrides the default toString() method. Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }
});


/**
 * Handles UpdateField Tag Builds the js required to update one or more form
 * fields based on the value of another single field
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.updateField", {}, {

    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {
        //action is the element on which if an action is performed then the event
        //handler is invoked
        //target is where the content is appended after the response is parsed
        this.name = "feba.js.ajax.updateField";
        this.version = "1.0";
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);

        this.setOptions(options);
        this.setListeners();
        //this.handler();
        feba.js.ajax.add(this);
    },
    /**
     * It assigns all the options which are required for
     * UpdateField processing to this.option
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parameters: '',

            eventType: "click",
            parser: options.parser == null ? new LIB.Parser(Constants.JSON) : options.parser,
            handler: this.handler,
            type: "post",
            selectValue: "select|",
            child: this,
            requestId: 0
        }, options || {});
        this.options.handleErrors = this.handleErrors;
        this.setAjaxHandlerFunctions();
        this.options.child = this;
        LOG.logMessages("In SetOptions method , options are set");
    },
    /**
     * It sets the eventListenrs on option.action with the event
     * mentioned in options
     */
    setListeners: function() {
        var optionObj = this.options;
        var action = optionObj.action;
        var eventElement = feba.domManipulator.getElementById(optionObj.action);
        var that = this;
        if (eventElement.length !== 0) {
            // checks whether the eventElement has value 
            var source = this.options.source;
            if (!LIB.__GET_DOM__(source)) {
                source = this.options.action;
            }
            if (feba.domManipulator.hasValue(eventElement) && (LIB.__GET_DOM__(source).type != Constants.RADIO || LIB.__GET_DOM__(source).checked == true)) {
                // binding  handler to the eventType for the elementElement
                feba.domManipulator.bind(eventElement, optionObj.eventType, {}, function() {
                    that.execute.apply(that);
                });
                feba.domManipulator.bind(eventElement, "domManipulation", {}, function() {
                    that.options.executeOnLoad = true;
                    that.execute.apply(that);
                });
                this.options.executeOnLoad = true;
                that.execute.apply(that);
            } else {
                this.options.source = action;
                checkCanRaiserequest(this.options);
                feba.domManipulator.bind(eventElement, optionObj.eventType, {}, function() {
                    that.execute.apply(that);
                });
                feba.domManipulator.bind(eventElement, "domManipulation", {}, function() {
                    that.options.executeOnLoad = true;
                    that.execute.apply(that);
                });
            }
        } else {
            that.execute.apply(that);
        }
        LOG.logMessages("In SetListeners method, eventListener has been added to element");

    },
    /**
     * Raises Ajax Request
     */
    execute: function() {
        LOG
            .logMessages(
                "In event handler Execute method,raising the request ");
        // Checking whether request can be raised
        var source = this.options.source;
        if (!LIB.__GET_DOM__(source)) {
            this.options.source = this.options.action;
        }
        if (checkCanRaiserequest(this.options)) {
            this.options.source = source;
            this.request = new feba.js.ajax.ajaxRequest(this.options);
        }
    },
    /**
     * Sets the response to the target element
     */
    handler: function() {
        LOG.logMessages("In handler method, response is set to target");
        this.content = this.parser.content;
        var target = this.target;
        var formattedError = this.content[0][1];
        var formFieldsInError = this.content[1][1];
        var groupletId = this.groupletId;
        //Added to suppress\display error messages
        var dispEx = this.displayExceptions;
        var errorHighlightLocation = this.parser.content[2][1][0].ERR_HIGHLIGHT_LOCATION;
        //Added as per fix provided by Bhuvana -- Error highlighting removal for RIA Start
        if (typeof errorHighlightLocation == 'undefined' || typeof errorHighlightLocation == "undefined") {

            try {
                errorHighlightLocation = this.parser.content[5][1];
            } catch (e) {}
        } else if (errorHighlightLocation != "ROW" && errorHighlightLocation != "LABEL") {
            try {
                errorHighlightLocation = this.parser.content[5][1];
            } catch (e) {}
        }
        //Added as per fix provided by Bhuvana -- Error highlighting removal for RIA End
        var errorMsgLoaction = this.parser.content[2][1][0].FIELD_MSG_DISPLAY_LOCATION;
        this.handleErrors(formattedError, formFieldsInError, groupletId, dispEx, errorHighlightLocation, errorMsgLoaction);
        if (String(this.parser.content[2][1]) !== "0000") {
            //removing previously updated fields
            removeTarget(target);
            return;
        }
        var serverRequestId = this.content[4][1];
        if (serverRequestId != this.requestId) {
            throw new Error("Outdated request");
        }
        var targetArray = "";
        var temptargetArraySplit = "";
        var actualElementIdWithoutGrouplet = "";
        var actualElementWithoutGrouplet = "";
        var targetElementArray = "";
        var targetElement = "";
        var contentLen = this.content.length;
        var jawsObj = {
            "ariaTitle": "",
            "addToJAWS": false,
            "tarId": ""
        };
        if (target.length != 0 && ((target.indexOf(",") != -1) || (target.indexOf("=") != -1))) {
            targetArray = target.split(",");
            var targetLen = targetArray.length;
            for (var i = 0; i < targetLen; i++) {
                if (targetArray[i].indexOf("=") != -1) {
                    targetElementArray = targetArray[i].split("=");
                    if (targetElementArray.length == 2) {
                        target = LIB.__GET_DOM__(targetElementArray[0]);

                        if (!target) {
                            if (targetElementArray[0].indexOf(":") != -1) {
                                //grouplet:xyz
                                try {
                                    temptargetArraySplit = targetElementArray[0].split(":");
                                    if (temptargetArraySplit.length == 2) {
                                        actualElementIdWithoutGrouplet = temptargetArraySplit[1];
                                        //actualElementWithoutGrouplet=jQuery('#'+groupletId).find('#'+actualElementIdWithoutGrouplet);
                                        actualElementWithoutGrouplet = document.querySelector("#" + groupletId).querySelector("#" + actualElementIdWithoutGrouplet);
                                        if (actualElementWithoutGrouplet) {
                                            target = actualElementWithoutGrouplet;
                                        } else {
                                            log.logMessages("No Target");
                                            continue;

                                        }
                                    }
                                } catch (e) {
                                    LOG.logMessages("Exception occurred while setting target for update feature Exception message is" + e.message);
                                    LOG.logMessages("Exception occurred while setting target for update feature Exception stack is" + e.stack);
                                    continue;
                                }

                            } else {
                                log.logMessages("No Target");
                                continue;
                            }
                            //throw new Error("No Target");
                        }
                        //updates the target depending upon its type
                        updateTargetElement(target, this.content, targetElementArray[1], this.selectValue);
                        try {
                            // Form dynamic string that should be read by screen reader
                            formStringForJAWS(jawsObj, target, this.source);
                        } catch (e) {
                            log.logMessages(e.message);
                        }
                        //LIB.__ADD_POLITE_LIVE_REGION__(target);
                    } else {
                        log.logMessages("Target pattern not proper");
                        //throw new Error("Target pattern not proper");
                    }
                } else {
                    log.logMessages("Target pattern not proper");
                    //throw new Error("Target pattern not proper");
                }
            }
        } else {
            var firstTarget = feba.domManipulator.getElementById(this.target);
            if (firstTarget.length === 0) {
                log.logMessages("No Target");
                //throw new Error("No Target");
            }
            target = feba.domManipulator.getElementById(this.target) + "> div";
            //LIB.__ADD_POLITE_LIVE_REGION__(target);
            if (target.length === 0) {
                firstTarget.append("<div></div>");
                target = feba.domManipulator.getIdWithAppend(this.target, "> div");
                target = jQuery('[id="' + this.target + '"] > div');
            }
            if ((requestId === undefined) || requestId == this.requestId) {
                if (feba.domManipulator.getAttribute(target, "type") == Constants.TEXTFIELD) {
                    feba.domManipulator.setAttribute(target, "value", this.content[5][1]);
                } else {
                    if (typeof(this.content) === "string") {
                        feba.domManipulator.replaceWith(target, this.content);
                    } else {
                        feba.domManipulator.replaceWith(target, this.content[5][1]);
                    }
                }
            }
            try {
                // Form dynamic string that should be read by screen reader
                formStringForJAWS(jawsObj, target, this.source);
            } catch (e) {
                log.logMessages(e.message);
            }
        }
        try {
            if (jawsObj.addToJAWS) {
                // adding dynamic string to the screen and making it as live region
                LIB.__ADD_POLITE_LIVE_REGION__(document.getElementById(this.source), jawsObj.ariaTitle, jawsObj.tarId, this.riaFeatureID);
            }
        } catch (e) {
            log.logMessages(e.message);
        }
    },
    /**
     * Overrides the default toStriong method.Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }
});





/**
 * Grouplet Controller which does the CSW communication
 */

feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.groupletController", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(sourceGroupletOptions, targetGroupletDetailsArray, dataKey) {
        this.execute(sourceGroupletOptions, targetGroupletDetailsArray, dataKey);
    },

    /**
     * Invokes the targetGrouplet execute method after setting the required attributes
     */
    execute: function(sourceGroupletOptions, targetGroupletDetailsArray, dataKey) {
        if (sourceGroupletOptions.parser.exceptionType === 'BE') {
            var errorCode = feba.domManipulator.find(jQuery(sourceGroupletOptions.parser.response.responseText), 'span[dir]')[0].innerHTML;
            if (!(errorCode.match(110959) || errorCode.match(103156) || errorCode.match(107904) || errorCode.match(107903) || errorCode.match(103528) || errorCode.match(100122))) {
                return;
            }
        }
        var length = targetGroupletDetailsArray.length;
        //Iterate through the targetGrouplets and call the execute method of corresponding grouplet.
        for (var index = 0; index < length; index++) {
            var targetGroupletDetailsObj = targetGroupletDetailsArray[index];
            //get the criteria associated for each target
            var criteria = targetGroupletDetailsObj.criteria;
            //TODO (Vivek) Assumes only one dynamic field for now. Will need to be updated.
            if (criteria.indexOf("{") != -1 && criteria.indexOf("}") != -1) {
                //Get the id of the element 
                var idOfElement = criteria.substring(criteria.indexOf("{") + 1, criteria.indexOf("}"));
                //Get the runtime Value associated with that element
                var runTimeValue = feba.domManipulator.getGroupletSpecificElementValue(idOfElement, sourceGroupletOptions.target);
                //Update the criteria
                criteria = criteria.substring(0, criteria.indexOf("=") + 1) + runTimeValue;

            }
            var depGroupletId = targetGroupletDetailsObj.groupletId;
            feba.features[depGroupletId].options.parameters = criteria;
            if (targetGroupletDetailsObj.isCrossSell === 'true') {
                //Invoke Analytics engine
                this.options = {};
                this.options.parameters = criteria;
                this.options.parameters = this.buildParameterString();
                var response = AnalyticsEngine.getResponse(this.options.parameters);


                if (!response) {
                    //If analytics engine doesn't return any response,just return.					
                    return;
                } else {
                    //Append response to parameters and targetGrouplet is invoked
                    feba.features[depGroupletId].options.parameters = response;
                }
            }

            feba.features[depGroupletId].options.parameters = "MenuOptionFG.DYNAMIC_ATTRIBUTES=";
            var dynAttr = "";
            if (criteria && "null" != criteria) {
                dynAttr += criteria;
            }
            if (dataKey) {
                if (dynAttr.length > 0) {
                    dynAttr += Constants.DYNAMIC_ATTR_SEPERATOR;
                }
                dynAttr += dataKey;
            }
            dynAttr = dynAttr.split(Constants.ASSIGNMENT).join(Constants.PIPE);
            feba.features[depGroupletId].options.parameters += dynAttr + Constants.PARAMETERS_SEPERATOR + Constants.IS_CSW_REQUEST + "=Y";
            //groupletParameters are defined for actions on a grouplet,which should be null in this case
            feba.features[depGroupletId].options.groupletParameters = null;

            //If baseUrl is not specified , request is raised with gropuplet originalUrl
            feba.features[depGroupletId].options.baseUrl = feba.features[depGroupletId].options.originalURL;
            if (targetGroupletDetailsObj.baseURL != 'null' && targetGroupletDetailsObj.baseURL != "") {
                feba.features[depGroupletId].options.baseUrl = targetGroupletDetailsObj.baseURL;
            }
            feba.features[depGroupletId].options.isIGC = "Y";
            //Blocks the targetGrouplet while processing its request
            this.block(depGroupletId);

            //Invoking the TargetGrouplet 
            feba.features[depGroupletId].execute.call(feba.features[depGroupletId]);

        }
    },
    /**
     * Blocks the target Element
     */
    block: function(depGroupletId) {
        var target = feba.domManipulator.getElementById(feba.features[depGroupletId].options.target);
        target.block({
            message: '<img src="L001/consumer/images/widget-loading.gif" style="margin-top:50%"/>',
            css: {
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                position: 'center',
                border: 0
            }
        });

    },

    /**
     * Overrides the default toStriong method.Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this);
    }
});


/**
 * Handles Modal View Request.In the response is shown in a modal
 */
feba.js.ajax.base.extend("feba.js.ajax.modalView", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {
        this.name = "feba.js.ajax.modalView";
        this.version = "1.0";
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.setListeners();
        this.extendedOptions = {}; // Object where all dynamic options are saved.
        this.passedOptions = options; // used to reset options after the request completes.
        this.setAjaxHandlerFunctions();
        if (this.options.executeOnLoad) {
            this.execute();
        }
    },
    /**
     * It assigns all the options which are required for  RPCRequest processing to this.options 
     */
    setOptions: function(options) {
        this.options = jQuery.extend({
            parser: new LIB.Parser("html"),
            handler: this.handler,
            requestId: 0,
            uiBlocked: false,
            type: "post",
            handleCloseAction: this.handleCloseAction,
            paintExceptionOnPage: options.paintExceptionOnPage || "true",
            retainValuesOnException: options.retainValuesOnException || "false",
            child: this,
            listenersReqd: true
        }, options || {});
        this.options.isFirstExecution = true;
        LOG.logMessages("In SetOptions method , options are set");
        this.options.originalUrl = this.options.baseUrl;
        this.options.originalParams = this.options.criteria || this.options.parameters;
        this.options.handleCloseAction = this.handleCloseAction;
        this.options.handleErrors = this.handleErrors;
        //Bug: Modal View not working inside grouplet MODAL_VIEW_FIX- BEGIN
        //For Modal container div id      					
        this.options.modalDataId = 'MODAL_VIEW_CONTAINER';
        //Bug: Modal View not working inside grouplet MODAL_VIEW_FIX - END
        //this.options.showSuccessMessage = false;
        this.options.child = this;
        this.originalOptions = options;
    },

    onError: function() {
        feba.domManipulator.getElement(".ui-dialog-titlebar-close").show();
    },
    /**
     * Event handler which raises the Ajax Request after setting the parameters for corresponding index in case of listing. 
     */
    executeEvent: function() {
        if (this.modalObj.options.originalParams && this.modalObj.options.originalParams.indexOf('[]') != -1) {
            var params = this.modalObj.options.originalParams.replace(/\[\]/g, '[' + this.currentIndex + ']');
            if (this.modalObj.options.parameters) {
                this.modalObj.options.parameters = params;
            } else {
                this.modalObj.options.criteria = params;
            }
        } else {
            this.modalObj.options.parameters = "";
        }
        //Appending index Field to parameters
        if (this.modalObj.options.indexFieldName) {
            var listIndex = parseInt(this.currentIndex);
            if (!this.modalObj.options.matchSourceBy) {
                listIndex += 1;
            }
            var indexParam = this.modalObj.options.indexFieldName + "=" + (listIndex);

            if (this.modalObj.options.parameters) {
                this.modalObj.options.parameters = this.modalObj.options.parameters + "," + indexParam;
            } else if (this.modalObj.options.criteria) {
                this.modalObj.options.criteria = this.modalObj.options.criteria + "," + indexParam;
            } else {
                this.modalObj.options.parameters = indexParam;
            }
            if (this.modalObj.options.appendTo) {
                this.modalObj.options.appendTo = this.modalObj.options.appendTo.replace(/\[\d*\]/, '[' + parseInt(this.currentIndex) + ']');
            }
        }
        this.modalObj.options.groupletParameters = this.modalObj.options.parameters;
        this.modalObj.options.actionElement = 'load';
        this.modalObj.options.baseUrl = this.modalObj.options.originalUrl;
        var tempModal = feba.features["MODAL_VIEW_CONTAINER"] = new feba.js.ajax.modalView(this.modalObj.options);
        tempModal.extendedOptions = this.modalObj.extendedOptions;
        tempModal.execute();

    },
    /**
     * Raises the Ajax Request
     */
    execute: function() {
        var containerDiv = feba.domManipulator.getElementById(this.options.modalDataId);
        var inputElements;
        var textElements;
        // condition to modal is on the page and check whether modal got closed by close icon
        if (containerDiv.length == 0 && this.options.isModalCloseEvent != "Y") {
            if (this.options.groupletId) {
                // get all the input elements, which are not buttons  inside grouplet
                inputElements = getSpecifiedElements(this.options.groupletId, ":input:not(button,:text)");
                textElements = getSpecifiedElements(this.options.groupletId, ":text");
            } else {
                // get all the input elements, which are not buttons 
                inputElements = feba.domManipulator.getElement(":input:not(button,:text)");
                textElements = feba.domManipulator.getElement(":text");
            }
            LIB.__CREATE_DIALOG__(this);
            this.options.modalDialog.dialog('open');
        }
        this.showModalWithProcessing();
        LOG.logMessages("In event handler Execute method,raising the request ");

        this.setCloseActions();
        // Fix for parameter issue - EBUX3 START
        if (this.options.groupletParameters) {
            this.options.groupletParameters = this.options.groupletParameters + "&" + this.buildParameterString(this.options.parameters);
        }
        if (this.options.isCalendar != "true") {
            // if inputElements are there, pass the values to server
            if (inputElements) {
                var totalElements = inputElements;
            }
            if (textElements) {
                if (totalElements) {
                    for (var count = 0; count < textElements.length; count++) {
                        totalElements.push(textElements[count])
                    }
                } else {
                    var totalElements = textElements;
                }
            }
            if (totalElements) {
                feba.js.watermark.clearWatermark(totalElements);
                this.options.groupletParameters = feba.domManipulator.serialize(totalElements) + "&" + this.options.groupletParameters;
            }
        }
        // Fix for parameter issue - EBUX3 END
        //Fix for modal view which opens when no records are fetched
        var currObj = this;
        setTimeout(function() {
            currObj.request = new feba.js.ajax.ajaxRequest(currObj.options)
        }, 1000);
        //this.request = new feba.js.ajax.ajaxRequest(this.options);
    },

    /**
     * Show dialog with processing Symbol
     */
    showModalWithProcessing: function() {
        feba.domManipulator.getElement(".ui-dialog-titlebar-close").hide();
        var containerDiv = feba.domManipulator.getElementById(this.options.modalDataId);
        containerDiv.children().remove();
        var procDiv = feba.domManipulator.getElementById(this.options.processingDivId);
        if (procDiv.length == 0) {
            containerDiv.append('<div id=\"' + this.options.processingDivId + '\"/>');
        }
        try {
            LOG.logMessages(
                "shows the loader images while request is getting processed ");
            feba.domManipulator.setCssProperties(feba.domManipulator.getElementById(this.options.processingDivId), {
                "backgroundImage": "url(" + imagePath + "/widget-loading.gif)",
                "backgroundRepeat": "no-repeat",
                "backgroundPosition": "center",
                "height": this.options.height || "450px",
                //"width" : this.options.width || "450px"});
                "width": "100%"
            });
            //var processingElement=feba.domManipulator.getElementById(this.options.processingDivId);
            //feba.domManipulator.addClass(processingElement,'dialogProcess');
        } catch (e) {}


    },



    handleCloseAction: function() {


        this.content = this.parser.content;
        var target = this.target;
        var formattedError = this.content[0][1];
        var formFieldsInError = this.content[1][1];
        var groupletId = this.groupletId;

        var targetArray = "";
        var targetElementArray = "";
        var targetElement = "";
        var contentLen = this.content.length;

        if (target != null && target.length != 0 && ((target.indexOf(",") != -1) || (target.indexOf("=") != -1))) {
            targetArray = target.split(",");
            var targetLen = targetArray.length;
            for (var i = 0; i < targetLen; i++) {
                if (targetArray[i].indexOf("=") != -1) {
                    targetElementArray = targetArray[i].split("=");
                    if (targetElementArray.length == 2) {
                        target = LIB.__GET_DOM__(targetElementArray[0]);
                        if (!target) {
                            return;
                        }
                        for (var j = 5; j < contentLen; j++) {
                            if (targetElementArray[1] == this.content[j][0]) {
                                if (target.type == Constants.TEXTFIELD) {
                                    target.value = this.content[j][1];
                                    jQuery(target).css({
                                        'color': '#000000'
                                    });
                                }
                                // FIX for population of Dropdown: EBUX3 START
                                else if (target.type == Constants.SIMPLE_SELECT) {
                                    //changes done to support modal view for combo box as the target
                                    optionsLength = target.options.length;
                                    for (var k = 0; k < optionsLength; k++) {
                                        if (target.options[k].value == this.content[j][1]) {
                                            target.options[k].selected = true;

                                            //Fix for autocomplete dropdown :EBUX3 START
                                            callDomManipulation(target);

                                            //trigger the change event to populate the values in the dropdown
                                            feba.domManipulator.trigger(target, "change");
                                            //Fix for autocomplete dropdown :EBUX3 END
                                        }
                                    }
                                }
                                // FIX for population of Dropdown: EBUX3 END
                                else {
                                    target.innerHTML = this.content[j][1];
                                }
                            }
                        }

                    }
                }
            }
        } else {
            target = LIB.__GET_DOM__(this.target);
            if (target != null) {
                if (target.type == Constants.TEXTFIELD) {
                    target.value = this.content[5][1];
                    jQuery(target).css({
                        'color': '#000000'
                    });
                } else {
                    target.innerHTML = this.content[5][1];
                }
            }

        }
    },
    /**
     * Updates the target with the Ajax response
     */
    handler: function() {
        fontResizeHw(Get_Cookie("txtReSzTypehw"));
        LOG.logMessages("In handler method modalView, response is set to target ");
        // Now simplemodal will handle the blocking, and the blockUI's block should be removed
        // Or it causes interference with the contents of the modal.
        feba.domManipulator.unblockUI();
        this.content = this.parser.content;
        if (this.isFirstExecution) {
            this.content = jQuery(this.content).append("<input type=\"Submit\" name=\"Action.PREVENT_SESSION_TIMEOUT__\" class=\"hideElement\" id=\"MODAL_PREVENT_SESSION_TIMEOUT__\" value=\"Prevent Timeout\" data-dontblockui=\"true\">");
        }
        var originalContent = this.content;
        feba.features["MODAL_VIEW_CONTAINER"].options.originalContent = this.content;
        var localDM = feba.domManipulator;
        var businessRespType = this.parser.exceptionType;
        var businessError = (businessRespType === "BE" || businessRespType === "BC" || businessRespType === "CE" || false);
        //Check if ModalContainer Div is available on the page.If it is present then it is updated with the response
        var containerDiv = localDM.getElementById(this.modalDataId);
        var modalDialogObj = this.modalDialog ? this.modalDialog : containerDiv.parent();
        var actionInHeader = this.XMLHttpRequest.getResponseHeader("action");
        var parentViewId = this.XMLHttpRequest.getResponseHeader("parentViewId");
        // Removing previous error messages, as handleErrors method is not called from all the scenarios. calling this method explicitly
        removePreviousError(this.riaFeatureID, this.groupletId, this.source);
        localDM.getElementById(Constants.ERRORDISPLAY_TAG + "_" + this.riaFeatureID).remove();
        if (this.isModalCloseEvent == "Y" && actionInHeader != "REFRESH") {

            /*This condition will be true in 2 scenaios. 
            1. In case of business error scenarios 
            2. In case of view change in parent
            */
            modalDialogObj.dialog("destroy");
            delete feba.features["MODAL_VIEW_CONTAINER"];
            return;

        }
        // Checking whether modal div element is present on the page 			
        /*
         * To-Do remove the if condition
         */
        if (containerDiv.length == 0 && (actionInHeader == null || actionInHeader == undefined)) {
            if (businessError) {
                var errorMessage = localDM.find(localDM.getElement(this.content), "#MessageDisplay_TABLE");
                var groupletId = this.__GROUPLET_ID__ ? this.__GROUPLET_ID__ : this.groupletId;
                if (this.paintExceptionOnPage == "true") {
                    // Painting the exception on the parent page without opening the modal
                    this.handleErrors(errorMessage.wrap("<p/>").parent()[0].innerHTML, null, groupletId, true);
                    if (isCalendar) {
                        this.child.extendedOptions.errorCallback();
                    }
                } else {
                    //Creating the modal
                    createModal(this);
                }
            } else {
                //Creating the Modal
                createModal(this);
            }
        } else if (businessError != null && actionInHeader != null && !this.isFirstExecution) {
            //Enters this if there are no business errors and to close the modal
            //this.modalDialog.dialog("close");

            modalDialogObj.dialog("close");
            feba.domManipulator.getElementById('modalDialog').remove();
            if (actionInHeader == "UPDATE") {
                this.content = originalContent;
                this.handleCloseAction();
                if (this.isCalendar) {
                    if (this.actionElement === this.child.extendedOptions.revertAction) {
                        this.child.extendedOptions.errorCallback();
                    } else {
                        this.child.extendedOptions.successCallback();
                    }
                }
            } else if (actionInHeader == "REFRESH") {
                if (this.groupletId && this.groupletId != null) {
                    feba.features[this.groupletId].options.updateParentAction = true;
                    //feba.features[this.groupletId].setResponse(feba.features[this.groupletId].options,this.content,this.requestId,"",this.groupletId);	  					  				
                    var numberOfGroupletsInResponse = jQuery(this.content).siblings("div[data-groupletId]").length;
                    //check if grouplet has rendered response for multiple grouplets as part of IGC
                    if (numberOfGroupletsInResponse > 1) {
                        //TODO here jquery parse has been called instead parser object of grouplet.
                        //because of this if modal refresh action with server side IGC has FATAL exception it wont show up on screen.
                        //has to be handled separately.
                        feba.features[this.groupletId].options.content = jQuery.parseHTML(this.content, null, true);
                        feba.features[this.groupletId].options.parser.content[0] = jQuery.parseHTML(this.content, null, true);
                        feba.features[this.groupletId].options.handler(feba.features[this.groupletId].options);
                    } else {
                        feba.features[this.groupletId].setResponse(feba.features[this.groupletId].options, this.content, this.requestId, "", this.groupletId);
                    }
                } else {
                    this.contentScripts = this.content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
                    this.content = this.content.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), "");
                    var hwFlow = this.XMLHttpRequest.responseText.indexOf("new_style_HW.css");
                    if (hwFlow != -1) {
                        if (document.head) {
                            for (i = 0; i < document.head.childNodes.length; i++) {
                                if (document.head.childNodes[i] && jQuery(document.head.childNodes[i]).attr('href')) {
                                    var currE = jQuery(document.head.childNodes[i]).attr("href");
                                    if (currE.indexOf("new_style.css") != -1) {
                                        if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                                            document.head.removeChild(document.head.childNodes[i]); //Added for Safari browser   
                                        } else {
                                            try {
                                                document.head.childNodes[i].remove();
                                            } catch (e) {
                                                document.head.childNodes[i].removeNode(); //Added for IE
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            for (i = 0; i < document.getElementsByTagName('head')[0].childNodes.length; i++) {
                                if (document.getElementsByTagName('head')[0].childNodes[i] && jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr('href')) {
                                    var currE = jQuery(document.getElementsByTagName('head')[0].childNodes[i]).attr("href");
                                    if (currE.indexOf("new_style.css") != -1) {
                                        document.getElementsByTagName('head')[0].childNodes[i].remove()
                                    }
                                }
                            }

                        }

                    }
                    jQuery('body')[0].innerHTML = this.XMLHttpRequest.responseText;
                    var scriptsLength = this.contentScripts.length;
                    var element = jQuery('div:last');
                    if (this.groupletId) {
                        element = localDM.getElementById(this.groupletId);
                    }

                    /*Start: Fix given by archie for page distortion issue in ie10 browser. Ticket 734245*/
                    var isIe10 = false;
                    var isIe9 = false;
                    var isIE = navigator.appName.indexOf("Microsoft") != -1;
                    if (isIE != null && isIE == true) {
                        var indexOfMSIE = window.navigator.userAgent.indexOf("MSIE ");
                        var ua = window.navigator.userAgent;
                        if (indexOfMSIE > 0) {
                            if (parseInt(ua.substring(indexOfMSIE + 5, ua.indexOf(".", indexOfMSIE))) == 10) {
                                isIe10 = true;
                            }
                            if (parseInt(ua.substring(indexOfMSIE + 5, ua.indexOf(".", indexOfMSIE))) == 9) {
                                isIe9 = true;
                            }
                        }
                    }

                    if (isIe10 || isIe9) {
                        jQuery('link').each(function() {
                            jQuery(this).replaceWith(this.outerHTML)
                        });
                    }
                    /*End: Fix given by archie for page distortion issue in ie10 browser. Ticket 734245*/

                    // Changing the value of global variable to true as it is painting the page using ajax
                    window.ajaxPageRefresh = "true";
                    for (var index = 0; index < scriptsLength; index++) {
                        try {
                            element.append(this.contentScripts[index]);
                        } catch (e) {}
                    }
                }
            }
            this.child.setOptions(this.child.passedOptions);
            //Invoke any target grouplets
            if (this.groupletId && this.groupletId != null && this.groupletId != "null") {
                handleTargetGrouplets(feba.features[this.groupletId].options);
            }

        } else {
            if (this.isFirstExecution) {
                this.isFirstExecution = false;
                if (businessError && (parentViewId == "true" || (this.paintExceptionOnPage == "true") || (this.paintExceptionOnPage == true))) {
                    // Code added to fix password decryption issue on submit when there is already an error in a page
                    // from a modal view processing
                    var tempKey = jQuery(this.XMLHttpRequest.responseText).find('[id$=":__JS_ENCRYPT_KEY__"]');
                    if (tempKey.length) {
                        feba.domManipulator.getElementById(tempKey[0].id).val(tempKey[0].value);
                    }
                    modalDialogObj.dialog("close");
                    feba.domManipulator.getElementById('modalDialog').remove();
                    if (this.retainValuesOnException == "false") {
                        removeTarget(this.target);
                    }
                    //part of code added from baseline file :start
                    var grpId = "";
                    if (this.groupletId && this.groupletId.length > 0) {
                        grpId = this.groupletId + "\\:";
                    }
                    var errorMessage = localDM.find(localDM.getElement(this.content), "#" + grpId + "MessageDisplay_TABLE");
                    var errorFormFields = localDM.find(jQuery(this.content), '[id^=ERROR_ROW]');
                    var riaFeatureID = this.riaFeatureID;
                    if (errorMessage.length) {
                        this.handleErrors(errorMessage.wrap("<p/>").parent()[0].innerHTML, [], this.groupletId, true);
                    }
                    var errorMessageSide = localDM.find(localDM.getElement(this.content), '[id^=ERR_MSG_]');
                    var len = errorMessageSide.length;
                    for (var index = 0; index < len; index++) {
                        this.handleErrors(errorMessageSide[index], errorMessageSide[index].id.split('MSG_')[1], this.groupletId, true, 'LABEL', "SIDE");
                    }
                    if (errorFormFields.length) {
                        errorFormFields.each(function() {
                            var pElement = getParentByTagName(this, 'P');
                            var value = this.value;
                            var oPElement = localDM.getElementById(pElement.id);
                            if (value == "ROW") {
                                oPElement.addClass("ERROR_ROW_BG");
                            } else {
                                localDM.getElementById(jQuery(pElement).find('.error_highlight')[0].id).attr('class', 'error_highlight');
                            }
                            oPElement.append("<input type='hidden' id='ERROR_ROW_" + riaFeatureID + "_" + Math.random() + "' value='" + value + "'>");
                        })
                    }
                    var groupletId = this.__GROUPLET_ID__ ? this.__GROUPLET_ID__ : this.groupletId;
                    //EBUX3 Temporary Fix for handling error with FIELD_MSG_DISPLAY_LOCATION=SIDE and ERR_HIGHLIGHT_LOCATION=ROW configuration
                    if (this.isCalendar) {
                        this.child.extendedOptions.errorCallback();
                    }
                    //feba.domManipulator.showWatermark();
                    if (!(LIB.__GET_DOM__(this.source) == undefined)) {
                        LIB.__GET_DOM__(this.source).focus();
                    }
                    var groupletidentifierForModal = "";
                    try {
                        //Aashish added for RWD bulk payment					
                        if (this.groupletId) {
                            groupletidentifierForModal = this.groupletId + ":";
                        }
                        feba.js.common.focus(groupletidentifierForModal + "errorlink1");

                    } catch (e) {}
                    return;
                    //part of code added from baseline file :end
                    if (actionInHeader == "REFRESH") {
                        if (this.groupletId && this.groupletId != null) {
                            feba.features[this.groupletId].options.updateParentAction = true;
                            feba.features[this.groupletId].setResponse(feba.features[this.groupletId].options, this.content, this.requestId, "", this.groupletId);
                        } else {
                            this.contentScripts = this.content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
                            this.content = this.content.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), "");
                            jQuery('body')[0].innerHTML = this.XMLHttpRequest.responseText;
                            var scriptsLength = this.contentScripts.length;
                            var element = jQuery('div:last');
                            if (this.groupletId) {
                                element = localDM.getElementById(this.groupletId);
                            }
                            // Changing the value of global variable to true as it is painting the page using ajax
                            window.ajaxPageRefresh = "true";
                            for (var index = 0; index < scriptsLength; index++) {
                                try {
                                    element.append(this.contentScripts[index]);
                                } catch (e) {}
                            }
                        }
                    }
                    var errorMessage = localDM.find(localDM.getElement(this.content), "#MessageDisplay_TABLE");
                    var errorFormFields = localDM.find(jQuery(this.content), '[id^=ERROR_ROW]');
                    var riaFeatureID = this.riaFeatureID;
                    if (errorMessage.length) {
                        this.handleErrors(errorMessage.wrap("<p/>").parent()[0].innerHTML, [], this.groupletId, true);
                    }
                    var errorMessageSide = localDM.find(localDM.getElement(this.content), '[id^=ERR_MSG_]');
                    var len = errorMessageSide.length;
                    for (var index = 0; index < len; index++) {
                        this.handleErrors(errorMessageSide[index], errorMessageSide[index].id.split('MSG_')[1], this.groupletId, true, 'LABEL', "SIDE");
                    }
                    if (errorFormFields.length) {
                        errorFormFields.each(function() {
                            var pElement = getParentByTagName(this, 'P');
                            var value = this.value;
                            var oPElement = localDM.getElementById(pElement.id);
                            if (value == "ROW") {
                                oPElement.addClass("ERROR_ROW_BG");
                            } else {
                                var elements = jQuery(pElement).find(Constants.DOT + Constants.ERROR_HIGHLIGHT_CLASS);
                                for (var i = 0; i < elements.length; i++) {
                                    localDM.getElementById(elements[i].id).attr('class', Constants.ERROR_HIGHLIGHT_CLASS);
                                }
                            }
                            oPElement.append("<input type='hidden' id='ERROR_ROW_" + riaFeatureID + "_" + Math.random() + "' value='" + value + "'>");
                        })
                    }


                    var groupletId = this.__GROUPLET_ID__ ? this.__GROUPLET_ID__ : this.groupletId;
                    //EBUX3 Temporary Fix for handling error with FIELD_MSG_DISPLAY_LOCATION=SIDE and ERR_HIGHLIGHT_LOCATION=ROW configuration

                    if (this.isCalendar) {
                        this.child.extendedOptions.errorCallback();
                    }
                    //feba.domManipulator.showWatermark();
                    if (!(LIB.__GET_DOM__(this.source) == undefined)) {
                        LIB.__GET_DOM__(this.source).focus();
                    }
                    return;
                    if (actionInHeader == "REFRESH") {
                        if (this.groupletId && this.groupletId != null) {
                            feba.features[this.groupletId].options.updateParentAction = true;
                            feba.features[this.groupletId].setResponse(feba.features[this.groupletId].options, this.content, this.requestId, "", this.groupletId);
                        } else {
                            this.contentScripts = this.content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
                            this.content = this.content.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), "");
                            jQuery('body')[0].innerHTML = this.XMLHttpRequest.responseText;
                            var scriptsLength = this.contentScripts.length;
                            var element = jQuery('div:last');
                            if (this.groupletId) {
                                element = localDM.getElementById(this.groupletId);
                            }
                            // Changing the value of global variable to true as it is painting the page using ajax
                            window.ajaxPageRefresh = "true";
                            for (var index = 0; index < scriptsLength; index++) {
                                try {
                                    element.append(this.contentScripts[index]);
                                } catch (e) {}
                            }
                        }
                    }

                }
            }
            //If ModalContainer Div is present on the page,just update that div with content
            if (modalDialogObj.dialog('isOpen') == false) {
                modalDialogObj.dialog('open');
            }
            containerDiv.children().remove();
            containerDiv.append(this.content);
            //HandleErrors called to clear error message in case of modal view:EBUX3
            if (!groupletId && this.groupletId) {
                groupletId = this.groupletId;
            }
            this.handleErrors("", "", groupletId, true);
            // for selecting all the input type textbox in a modalView
            var textElements = feba.domManipulator.getIdWithAppend("MODAL_VIEW_CONTAINER", " *:input[type='text']");

            //for showing watermark for all the Textbox fields in a widget
            feba.js.watermark.showWatermarkForWidget(textElements);
            //handle calendar opening with keyboard
            feba.js.handleCalendarWithKey();
        }
        var title = this.parser.title;
        var modalDialogObj = this.modalDialog ? this.modalDialog : containerDiv.parent();
        //new attribute added in EBUX3 to make the title configurable
        //Modified to fix title hide and cross button issue
        if (this.hideTitle == Constants.TRUE) {
            feba.domManipulator.getElement(".ui-dialog-titlebar").hide();
            feba.domManipulator.css(feba.domManipulator.getElement(".ui-dialog-content"), "border-top", "none");
            /*SPLASH-FIX*/
            if (!(this.source == feba.features.MODAL_VIEW_CONTAINER.options.source) && (this.source == "dummy" && feba.features.MODAL_VIEW_CONTAINER.options.abortEvent == "CANCEL_SPLASH_PAGE_EVENT__")) {
                feba.domManipulator.getElement(".ui-dialog-titlebar").show();
                feba.domManipulator.css(feba.domManipulator.getElement(".ui-dialog-content"), "border-top", "block");
            }
            /*SPLASH-FIX*/
        } else {
            if (title && modalDialogObj) {
                modalDialogObj.dialog("option", "title", title);
            }
        }
        // EventListener need not to get added for SPLASH PAGE close button /*SPLASH-FIX*/
        if (!(!(this.source == feba.features.MODAL_VIEW_CONTAINER.options.source) && (this.source == "dummy" && feba.features.MODAL_VIEW_CONTAINER.options.abortEvent == "CANCEL_SPLASH_PAGE_EVENT__"))) {
            var currentModalViewObjectOptions = this;
            feba.domManipulator.bind(feba.domManipulator.getElement(".ui-dialog-titlebar-close"), 'click', {
                    currModalObjectsForAbort: currentModalViewObjectOptions
                },
                //Modified for synchronization issue in modalview		
                function(e) {
                    feba.domManipulator.blockUI({
                        message: '<div style=text-align: center;><img src=' + imagePath + '/widget-loading.gif ></div>',
                        baseZ: 9999
                    });
                    var modalObjectOptions = feba.features["MODAL_VIEW_CONTAINER"].options;
                    modalObjectOptions.isModalCloseEvent = "Y";
                    modalObjectOptions.groupletParameters = modalObjectOptions.groupletParameters + "&IS_MODAL_CLOSE_EVENT=Y";
                    if (modalObjectOptions.additionalParamsForClose != null) {
                        // Added for ticket id : 590420
                        modalObjectOptions.additionalParamsForClose = modalObjectOptions.additionalParamsForClose.replace(/\&amp\;/g, '&');
                        modalObjectOptions.groupletParameters = modalObjectOptions.groupletParameters + "&" + modalObjectOptions.additionalParamsForClose;


                    }
                    modalObjectOptions.baseUrl = modalObjectOptions.CLOSE_URL;
                    if (!(modalObjectOptions.source == e.data.currModalObjectsForAbort.source)) {
                        modalObjectOptions.baseUrl = e.data.currModalObjectsForAbort.CLOSE_URL;
                    }
                    //Removing the modalDialog div to avoid the extra after closing the overlay window.
                    feba.domManipulator.getElementById("modalDialog").remove();
                    feba.features["MODAL_VIEW_CONTAINER"].execute();
                    e.preventDefault();
                    e.stopImmediatePropagation();

                });
            if (!(this.abortEvent == undefined || this.abortEvent == null)) {
                feba.domManipulator.getElement(".ui-dialog-titlebar").show();
                feba.domManipulator.getElement(".ui-dialog-titlebar-close").show();
                feba.domManipulator.getElement(".ui-dialog-titlebar").removeClass('ui-widget-header');
                /*RTL Fix: Start*/
                var closeStyle = 'width:15px; float:right';
                if (feba.domManipulator.isRTL()) {
                    closeStyle = 'width:15px; float:left';
                }
                feba.domManipulator.getElement(".ui-dialog-titlebar-close").attr('id', 'closeIcon').removeClass("ui-dialog-titlebar-close").attr('style', closeStyle).show();
                feba.domManipulator.getElement(".ui-dialog-titlebar").find('#closeIcon').attr('title', getMessage("TitleForClose"));
                /*RTL Fix: End*/
                if (this.hideTitle == Constants.TRUE) {
                    feba.domManipulator.getElement(".ui-dialog-title").attr('style', "display:none");
                } else {
                    feba.domManipulator.getElement(".ui-dialog-title").css('font-size', "1.1em");
                    feba.domManipulator.getElement(".ui-dialog-title").css('color', "#404040");
                    feba.domManipulator.getElement(".ui-dialog-title").css('margin', "0px 4px 1px");
                    feba.domManipulator.getElement(".ui-dialog-title").css('margin-top', "7px");
                }
                /*  feba.domManipulator.getElement(".ui-dialog-title").attr('style',"display:none");	*/

                /*         feba.domManipulator.getElement(".ui-dialog-titlebar").attr('style','border:none;').removeClass('ui-dialog-titlebar');
                 */
                feba.domManipulator.getElementById("modalDialog").attr('style', "width: auto;border-top:0px;min-height: 222.967px; height: auto;");
            }
        }
        if (this.isFirstExecution) {
            this.isFirstExecution = false;
        }
        if (!jQuery('#modalDialog input:password').length) {
            var key = jQuery('[id=MODAL_VIEW_CONTAINER\\:__JS_ENCRYPT_KEY__]').val();
            jQuery('[id=' + this.groupletId + '\\:__JS_ENCRYPT_KEY__]').val(key);
        }
        try {
            handleListingTableUI();
            /*Added for retaining combo style:start*/
            var userType;
            if (document.getElementById('usertype')) {
                userType = document.getElementById('usertype').value;
            }
            if (userType != '4') {
                feba.domManipulator.documentReady(convertComboboxes);
            }
            /*Added for retaining combo style:end*/
            if (this.groupletId) {
                handleRHSAlignment(this.groupletId);
                var groupletidentifierForModal = "";

                setTimeout(function() {
                    if (this.groupletId) {
                        groupletidentifierForModal = this.groupletId + ":";
                    }
                    feba.js.common.focus(groupletidentifierForModal + "errorlink1");
                }, 500);
            }
        } catch (e) {}
    },
    /**
     * Overrides the default toStriong method.Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    },

    /**
     * This sets the event Listeners for the source element
     */
    setListeners: function() {

        var optionObj = this.options;
        var source = optionObj.source;

        //For listing elements ,the id will '[]'
        //Event Listeners has to be added for all listing elemnts ,based on index which is passed
        if (source != null) {
            if (source.indexOf('[]') != -1) {
                if (!optionObj.startIndex || !optionObj.endIndex) {
                    throw new Error("startIndex,endIndex should be passed");
                }

                var parent = [];

                var startIndexInInt = 0;
                var endIndexInInt = 0;
                try {
                    startIndexInInt = parseInt(optionObj.startIndex);
                    endIndexInInt = parseInt(optionObj.endIndex);
                } catch (e) {
                    startIndexInInt = (optionObj.startIndex);
                    endIndexInInt = (optionObj.endIndex);
                }
                for (var index = startIndexInInt; index < endIndexInInt; index++) {
                    //	for(var index=optionObj.startIndex;index<optionObj.endIndex;index++){
                    //var parent=new Object;
                    parent[index] = new Object;
                    parent[index].modalObj = this;
                    var sourceElementId = source.replace('[]', '[' + index + ']');

                    parent[index].currentIndex = index;

                    var eventElement = this.getEventElement(sourceElementId, optionObj.matchSourceBy);

                    if (eventElement) {
                        var that = this;
                        feba.domManipulator.bind(eventElement, optionObj.eventType, {
                            currentIndex: index
                        }, function(e) {

                            that.executeEvent.apply(parent[e.data.currentIndex]);
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            return false;

                        });
                    }

                }
            } else {
                var parent = new Object;
                parent.modalObj = this;

                var eventElement = this.getEventElement(optionObj.source, optionObj.matchSourceBy);

                if (eventElement.length) {
                    var that = this;
                    feba.domManipulator.bind(eventElement, optionObj.eventType, {}, function(event) {
                        var tempModal = feba.features["MODAL_VIEW_CONTAINER"] = new feba.js.ajax.modalView(that.options);
                        //tempModal.
                        tempModal.extendedOptions = that.extendedOptions;
                        //tempModal.execute.apply(parent.modalObj);return false;
                        event.stopImmediatePropagation();
                        event.preventDefault();
                        tempModal.execute();
                        return false;
                    });
                }

            }
        }
    },

    /*
     * setting the closeActions required to close the modal
     */
    setCloseActions: function() {
        options = this.options;
        //Fix for parameter issue - EBUX3 START
        /* // checking whether the last executed event is refresh for features having extended options ex: Calender
	     if ((options.actionElement== this.extendedOptions.refreshElement)&&this.extendedOptions.refreshEvent){
				options.groupletParameters=options.groupletParameters +"&MODAL_REFRESH_ACTIONS="+this.extendedOptions.refreshEvent;
		 }	
		 // checking whether the last executed event is refresh 
		 else if ((options.actionElement== options.refreshElement)&&options.refreshEvent){
				options.groupletParameters=options.groupletParameters +"&MODAL_REFRESH_ACTIONS="+options.refreshEvent;
		 }	
		 */
        //Fix for parameter issue -EBUX3 END
        // checking whether it is a refresh event
        if (this.extendedOptions.refresh) {
            options.groupletParameters = options.groupletParameters + "&MODAL_REFRESH_ACTIONS=" + this.extendedOptions.refresh;
        } else if (options.refresh) {
            options.groupletParameters = options.groupletParameters + "&MODAL_REFRESH_ACTIONS=" + options.refresh;
        }
        //Fix for parameter issue -EBUX3 START
        /*
		  // checking whether the last executed event is update for features having extended options ex: Calender
		 if ((options.actionElement== this.extendedOptions.updateElement)&&this.extendedOptions.updateEvent){
				options.groupletParameters=options.groupletParameters +"&MODAL_CLOSE_ACTIONS="+this.extendedOptions.updateEvent;
		 }	
		 // checking whether the last executed event is update
		 else if ((options.actionElement== options.updateElement)&&options.updateEvent){
				options.groupletParameters=options.groupletParameters +"&MODAL_CLOSE_ACTIONS="+options.updateEvent;
		 }	
		 */
        //Fix for parameter issue - EBUX3 END
        // checking whether it is a update event
        if (this.extendedOptions.update) {
            options.groupletParameters = options.groupletParameters + "&MODAL_CLOSE_ACTIONS=" + this.extendedOptions.update;
        } else if (options.update) {
            options.groupletParameters = options.groupletParameters + "&MODAL_CLOSE_ACTIONS=" + options.update;
        }
    }
});
/**
 * Handles GeoTagging Tag,It builds the javascript required to get the user 
 * Geo Location and set it in the OpContext
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.GeoTagging", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {
        this.name = "feba.js.ajax.GeoTagging";
        this.version = "1.0";
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.execute();
    },
    /**
     * It assigns all the options which are required for GeoTagging to this.options 
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            latitude: this.latitude,
            longitude: this.longitude,
            accuracy: this.accuracy,
            handler: this.handler,
            requestId: 0
        }, options || {});
        this.options.handleErrors = this.handleErrors;
        LOG.logMessages("In SetOptions method , options are set");
    },
    /**
     * Updates the target with response
     */
    handler: function() {

    },
    /**
     *fecthes the user geo coordinates and then make a Ajax request to set it in the context.
     */
    execute: function() {
        resultlist = new Array();
        var params = this.options.parameters;
        var ary = new Array();
        ary = params.split("\&");
        params = ary[0].substring((ary[0].indexOf("=") + 1),
            ary[0].length);
        var mode = ary[1].substring((ary[1].indexOf("=") + 1),
            ary[1].length);
        if (mode == "GeoService") {
            resultlist = getGeoLocationService(this.options, params);
        } else if (mode == "GeoHtml") {
            resultlist = getGeoLocationHTML5(this.options, params);
        } else if (mode == "GeoBoth") {
            resultlist = getGeoLocationService(this.options, params);
            resultlist = getGeoLocationHTML5(this.options, params);
        }
    },
    /**
     * Converts the object to String.Overrides the default toString method
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }
});
/**
 * Handles FEBA Modal Box Requestt
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.modalBoxRequest", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {

        this.name = "feba.js.ajax.modalBoxRequest";
        this.version = "1.0";
        console.log(options.baseUrl);
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.originalOptions = options;
        this.setListeners();
        if (this.options.executeOnLoad) {
            this.execute();
        }

    },
    /**
     * It assigns all the options which are required for  RPCRequest processing to this.options 
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parser: new LIB.Parser("html"),
            handler: this.handler,
            requestId: 0,
            evalScripts: true,
            type: 'post',
            isGrouplet: true
        }, options || {});
        LOG.logMessages("In SetOptions method , options are set");
        this.options.originalUrl = this.options.baseUrl;
        this.options.originalParams = this.options.criteria || this.options.parameters;
        this.options.handleErrors = this.handleErrors;
    },

    /**
     * Raises the Ajax Request
     */
    execute: function() {
        LOG
            .logMessages(this,
                "In event handler Execute method,raising the request ");
        if (this.options.requestId === 0) {
            LIB.__CREATE_DIALOG__(this);
            //Opening the dialog
            this.options.modalDialog.dialog('open');
            //Hiding the dialog so that user can't see the previous content
            this.options.modalDialog.hide();
        }

        this.request = new feba.js.ajax.ajaxRequest(this.options);
    },


    /**
     * Updates the target with the Ajax response
     */
    handler: function() {


        LOG.logMessages("In handler method modalView, response is set to target ");
        //this.content=jQuery(this.parser.content);
        this.content = feba.domManipulator.getElement(this.parser.content);
        contentLength = this.content.length;

        //Stripping the script elements from the content  																		
        this.contentScripts = this.parser.content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));


        //Iterating over content divs
        for (var contentIndex = 0; contentIndex < contentLength; contentIndex++) {
            var groupletId = feba.domManipulator.getAttribute(this.content[contentIndex], Constants.GROUPLET_ID_ATTR);

            if (groupletId) {

                var containerDiv = feba.domManipulator.getElementById(groupletId.toUpperCase());
                var containerDivChildren = feba.domManipulator.getChildren(containerDiv);
                //Updating the modalContent
                if (containerDivChildren) {
                    feba.domManipulator.remove(containerDivChildren);

                }
                //Displaying the dialog

                this.modalDialog.show();
                feba.domManipulator.append(this.dialogContent, this.content[contentIndex]);

                //Evaluating the scripts
                var scriptsLength = this.contentScripts.length;
                containerDiv = feba.domManipulator.getElementById(groupletId.toUpperCase());

                for (var index = 0; index < scriptsLength; index++) {
                    if (containerDiv.length != 0) {
                        feba.domManipulator.append(containerDiv, this.contentScripts[index]);

                    }
                }

            }

        }

        this.requestId = this.requestId + 1;
        //Temporarily getting it by class as plugin doesn't provide id
        feba.domManipulator.getElementOfClass("ui-dialog-titlebar-close").focus();
    },
    /**
     * Overrides the default toStriong method.Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }

});

/**
 * Handles Modal View Request.In the response is shown in a modal
 */
feba.js.ajax.base.extend("feba.js.ajax.febaCalendar", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {
        this.name = "feba.js.ajax.febaCalendar";
        this.version = "1.0";
        this.description = "";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.options.listenersReqd ? this.setListeners() : undefined;
        this.extendedOptions = {}; // Object where all dynamic options are saved.
        this.passedOptions = options; // used to reset options after the request completes.

        if (this.options.executeOnLoad) {
            this.execute();
        }
    },
    /**
     * It assigns all the options which are required for  RPCRequest processing to this.options 
     */
    setOptions: function(options) {
        this.options = jQuery.extend({
            parser: new LIB.Parser("html"),
            handler: this.handler,
            requestId: 0,
            flowCompleted: this.flowCompleted,
            uiBlocked: false,
            type: "post",
            modalCloseAction: this.modalCloseAction,
            listenersReqd: true
        }, options || {});
        LOG.logMessages("In SetOptions method , options are set");
        this.options.originalUrl = this.options.baseUrl;
        this.options.originalParams = this.options.criteria || this.options.parameters;
        this.options.handleErrors = this.handleErrors;
        this.options.isCalendar = Constants.TRUE;
        //Bug: Modal View not working inside grouplet MODAL_VIEW_FIX- BEGIN
        //For Modal container div id      					
        this.options.modalDataId = 'MODAL_VIEW_CONTAINER';
        //Bug: Modal View not working inside grouplet MODAL_VIEW_FIX - END
        //this.options.showSuccessMessage = false;
        this.options.child = this;
        if (this.options.handleCloseActions) {
            this.options.revertAction = this.options.handleCloseActions;
        }
    },
    /**
     * Event handler which raises the Ajax Request after setting the parameters for corresponding index in case of listing. 
     */
    executeEvent: function() {
        if (this.modalObj.options.originalParams && this.modalObj.options.originalParams.indexOf('[]') != -1) {
            var params = this.modalObj.options.originalParams.replace(/\[\]/g, '[' + this.currentIndex + ']');
            if (this.modalObj.options.parameters) {
                this.modalObj.options.parameters = params;
            } else {
                this.modalObj.options.criteria = params;
            }
        } else {
            this.modalObj.options.parameters = "";
        }
        //Appending index Field to parameters
        if (this.modalObj.options.indexFieldName) {
            var listIndex = parseInt(this.currentIndex) + 1;
            var indexParam = this.modalObj.options.indexFieldName + "=" + (listIndex);

            if (this.modalObj.options.parameters) {
                this.modalObj.options.parameters = this.modalObj.options.parameters + "," + indexParam;
            } else if (this.modalObj.options.criteria) {
                this.modalObj.options.criteria = this.modalObj.options.criteria + "," + indexParam;
            } else {
                this.modalObj.options.parameters = indexParam;
            }
        }
        this.modalObj.options.groupletParameters = null;
        this.modalObj.options.actionElement = 'load';
        this.modalObj.options.baseUrl = this.modalObj.options.originalUrl;
        this.modalObj.execute.call(this.modalObj);
    },
    /**
     * Raises the Ajax Request
     */
    execute: function() {
        LOG.logMessages("In event handler Execute method,raising the request ");
        this.options.flowCompleted = false;

        // Block the user from performing any actions.
        if (!this.options.uiBlocked) {
            feba.domManipulator.blockUI({
                message: feba.domManipulator.getElementById("loadingImage"),
                baseZ: 950, // position message below the modal. (baseZ+10)
                allowBodyStretch: false,
                overlayCSS: { // To match with the color of simplemodal overlay
                    backgroundColor: '#000000',
                    opacity: 0.4
                }
            });
            this.options.uiBlocked = true;
        }

        if (this.options.actionElement != null) {
            if (this.options.closeAction != null) {
                var actions = this.options.closeAction.split(",");
                var actLen = actions.length;
                for (var i = 0; i < actLen; i++) {



                    if (this.options.revertAction != null && this.options.revertAction == this.options.actionElement && actions[i] == this.options.actionElement) {
                        this.handleRevertActions(); // Revert the last action.
                        return;
                    } else if (actions[i] == this.options.actionElement) {
                        this.options.flowCompleted = true; // set flow as completed
                    }
                }
            }

            if (this.options.revertAction != null && this.options.revertAction == this.options.actionElement) {
                this.handleRevertActions(); // Revert the last action.
                this.extendedOptions.errorCallback && this.extendedOptions.errorCallback();
                return;
            } else if (this.options.conditionalCompleteAction != null && this.options.conditionalCompleteAction == this.options.actionElement) {
                this.options.flowCompleted = true; // set flow as completed
            }
        }

        // Extend the opriginal options and extended (dynamically set) options into the current options.
        this.setOptions(jQuery.extend(true, {}, this.options, this.extendedOptions));
        this.request = new feba.js.ajax.ajaxRequest(this.options);
    },

    /**
     * Handles Revert Actions
     */
    handleRevertActions: function() {
        var riaObj = this;
        var localDM = feba.domManipulator;
        var modalId = this.options.modalDataId;
        //Creating options for RPC Request
        var optionsForRpcRequest = {
            target: riaObj.options.target,
            executeOnLoad: true,
            type: "post",
            baseUrl: riaObj.options.baseUrl,
            groupletParameters: this.options.groupletParameters,
            changeParser: true,
            success: function() {
                var businessRespType = this.options.parser.exceptionType || this.request.options.parser.exceptionType;
                var businessError = (businessRespType === "BE" || businessRespType === "BC" || false);
                if (!businessError) {
                    riaObj.flowCompleted = false;
                    //riaObj.uiBlocked = false;

                    // Get the Modal close element based on close class
                    var closeElement = localDM.getElementOfClass("modalCloseImg");
                    //Trigger the event on close					
                    localDM.trigger(closeElement, 'click');

                    riaObj.options.modalCloseAction();
                }
            },
            extendedhandler: function() {
                var businessRespType = this.parser.exceptionType;
                var businessError = (businessRespType === "BE" || businessRespType === "BC" || false);
                if (businessError) {
                    var localDM = feba.domManipulator;
                    var containerDiv = localDM.getElementById(modalId);

                    //If ModalContainer Div is present on the page,just update that div with content
                    containerDiv.children().remove();
                    containerDiv.append(this.child.options.parser.content);
                    //Get the Modal close element based on close class
                    var closeElement = localDM.getElementOfClass("modalCloseImg");
                    //Hiding the close	button				
                    localDM.hideElement(closeElement[0]);
                }
            }
        };
        optionsForRpcRequest.groupletParameters = optionsForRpcRequest.
        groupletParameters.replace("&__RIA__=MODAL_VIEW", "&__RIA__=RPC_REQUEST");

        optionsForRpcRequest.groupletParameters += "&__ALLOW_CHANGE_OPFMT__=Y&__RIA_ACT_AS_REQUEST__=MODAL_VIEW";
        optionsForRpcRequest.groupletParameters = optionsForRpcRequest.groupletParameters + (this.options.targetsRequired ? "&__TARGETS_REQUIRED__=" + this.options.targetsRequired : "");

        var rpc = new feba.js.ajax.rpcRequest(optionsForRpcRequest);
        riaObj.setOptions(riaObj.passedOptions);
    },
    /**
     * Updates the target with the Ajax response
     */
    handler: function() {
        LOG.logMessages("In handler method modalView, response is set to target ");
        // Now simplemodal will handle the blocking, and the blockUI's block should be removed
        // Or it causes interference with the contents of the modal.
        feba.domManipulator.unblockUI();
        //if this is a new transaction			
        if (this.XMLHttpRequest.getResponseHeader(Constants.IS_NEW_TRANSACTION)) {
            //close the modal dialog
            this.modalDialog.dialog("close");
            //abort further execution of modal
            return;
        }
        this.content = this.parser.content;
        var localDM = feba.domManipulator;
        var businessRespType = this.parser.exceptionType;
        var businessError = (businessRespType === "BE" || businessRespType === "BC" || false);
        //Check if ModalContainer Div is available on the page.If it is present then it is updated with the response
        var containerDiv = localDM.getElementById(this.modalDataId);

        var messageModalProps = {
            title: this.title,
            dataId: this.modalDataId,
            close: true,
            escClose: false,
            appendTo: 'form',
            autoPosition: true,
            autoResize: true,
            maxHeight: '80%',
            minHeight: 63,
            maxWidth: '80%'
        };

        if (containerDiv.length == 0) {
            if (businessError) {
                //Invoking the jQueryModal
                localDM.modal(localDM.find(localDM.getElement(this.content), "#MessageDisplay_TABLE"), messageModalProps);
                var tThis = this;
                tThis.flowCompleted = false;
                tThis.uiBlocked = false;
                localDM.click(localDM.getElementOfClass("modalCloseImg"), function() {
                    tThis.modalCloseAction();
                });

            } else {
                //Stripping the script elements from the content  																		
                this.contentScripts = this.content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
                this.content = this.content.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), "");

                //Invoking the jQueryModal	
                localDM.modal(this.content, {
                    title: this.title,
                    dataId: this.modalDataId,
                    close: true,
                    escClose: false,
                    autoPosition: true,
                    autoResize: true,
                    appendTo: 'form',
                    minHeight: this.height || 300,
                    minWidth: this.width || 500,
                    maxHeight: '80%',
                    maxWidth: '80%'
                    //position: ['5%',null]
                });

                //Evaluating the scripts
                var scriptsLength = this.contentScripts.length;
                containerDiv = localDM.getElementById(this.modalDataId);
                for (var index = 0; index < scriptsLength; index++) {
                    if (containerDiv.length != 0) {
                        containerDiv.append(this.contentScripts[index]);
                    }
                }
                //Get the Modal close element based on close class
                var closeElement = localDM.getElementOfClass("modalCloseImg");
                //Hiding the close	button				
                localDM.hideElement(closeElement[0]);
            }
        } else if (this.flowCompleted && !businessError) {
            var tThis = this;
            //Get the Modal close element based on close class
            var closeElement = localDM.getElementOfClass("modalCloseImg");

            if (tThis.child.options.showSuccessMessage) {
                localDM.trigger(closeElement, 'click');
                setTimeout(function() {
                    localDM.modal(localDM.find(localDM.getElement(tThis.content), "#MessageDisplay_TABLE"), messageModalProps);
                    localDM.click(localDM.getElementOfClass("modalCloseImg"), function() {
                        tThis.modalCloseAction();
                    });
                }, 500);
            } else {
                localDM.click(closeElement, function() {
                    tThis.modalCloseAction();
                });
                localDM.trigger(closeElement, 'click');
            }
            tThis.child.setOptions(tThis.child.passedOptions);
        } else {
            //If ModalContainer Div is present on the page,just update that div with content
            containerDiv.children().remove();
            containerDiv.append(this.content);
            // for selecting all the input type textbox in a grouplet
            var textElements = feba.domManipulator.getIdWithAppend("MODAL_VIEW_CONTAINER", " *:input[type='text']");

            //for showing watermark for all the Textbox fields in a widget
            feba.js.watermark.showWatermarkForWidget(textElements);
            //Get the Modal close element based on close class
            var closeElement = localDM.getElementOfClass("modalCloseImg");
            //Hiding the close	button				
            localDM.hideElement(closeElement[0]);
        }
    },
    /**
     * callback for handling closing action of modal dialog.
     */
    modalCloseAction: function() {
        this.uiBlocked = false;
        this.flowCompleted ? (this.successCallback && this.successCallback()) : (this.errorCallback && this.errorCallback()); // In the context of options object
    },
    /**
     * Overrides the default toStriong method.Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }
});

/*
 * Handles Dynamic tag, it retrieves a list of values from server 
 * and disply dynamic elements on page.
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.dynamic", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {

        this.name = "feba.js.ajax.dynamic";
        LOG.logMessages("Initializing the JavaScriptObject ");
        feba.js.ajax.add(this);
        this.version = "1.0";
        this.description = "";

        this.setOptions(options);
        this.setListeners();
        /**
        *added to retain values on page load.
        *on page load if source contains value then 
        *set executeOnLoad to "true" else to "false"
        for "select" we check 'value' attribute and for 
        checkBox we check the attribute 'checked'
        */

        switch (feba.domManipulator.getType(this.options.source)) {
            case "select-one":
                if (feba.domManipulator.hasValueForId(this.options.source)) {

                    this.options.executeOnLoad = true;

                }
                break;

            case "checkbox":
                if (feba.domManipulator.isChecked(this.options.source)) {

                    this.options.executeOnLoad = true;

                }
        }
        if (this.options.executeOnLoad) {
            this.execute();
        }

    },
    /**
     * It assigns all the options which are required for
     * Select-processing to this.options
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parameters: '',
            eventType: "change",
            parser: new LIB.Parser(Constants.JSON),
            handler: this.handler,
            child: this,
            requestId: 0

        }, options || {});

        this.options.handleErrors = this.handleErrors;
        this.setAjaxHandlerFunctions();
        this.options.child = this;
        LOG.logMessages("In SetOptions method , options are set");

    },
    /**
     * It sets the listeners on Source Element.
     */
    setListeners: function() {
        var optionObj = this.options;
        var source = feba.domManipulator.getElementById(optionObj.source);
        if (source) {
            var that = this;
            feba.domManipulator.bind(source, optionObj.eventType, {}, function() {
                that.execute.apply(that);
            });
            LOG
                .logMessages(

                    "In SetListeners method, eventListener has been added to element",
                    optionObj.source,
                    "with event Type",
                    optionObj.eventType);
        }
    },

    /**
     * It raises an ajax Request
     */
    execute: function() {
        LOG
            .logMessages(
                "In event handler Execute method,raising the request ");
        if (checkCanRaiserequest(this.options)) {
            this.request = new feba.js.ajax.ajaxRequest(this.options);
        }
    },

    /**
     * It sets the response to target element
     */
    handler: function(options) {
        options.content = options.parser.content;
        var target = options.target;
        try {
            var targetElementArray = "";
            //checks whether target is proper or not 
            var notProperTarget = ((target.length == 0) || (target
                .indexOf(Constants.ASSIGNMENT) == -1));
            if (notProperTarget) {
                throw new Error("Target pattern not proper");
            }
            targetElementArray = target
                .split(Constants.ASSIGNMENT);
            if (targetElementArray.length != 2) {
                throw new Error("Target pattern not proper");
            }
            target = targetElementArray[0];
            // draws target element
            drawTargetElement(target, this.content,
                targetElementArray[1], this.targetType);

        } catch (e) {
            removeChildNodesOfTarget(parent, target);
        }
        // draws target element
        function drawTargetElement(target, content,
            targetElement, targetType) {
            var source = feba.domManipulator
                .getElementById(options.source);
            if (!source) {
                throw new Error("Source is not Proper");
            }
            //getting parent of source
            var parent = feba.domManipulator
                .parent(feba.domManipulator.parent(source));


            var contentLen = content.length;
            //removes previously painted elements
            removeChildNodesOfTarget(parent, target);
            //if source is checkBox and nothing is selected then return
            if (contentLen == 0 || feba.domManipulator.getAttribute(source, "checked") == false) {

                return;
            }

            var targetContent = null;
            var contentSet = null;
            for (var k = 0; k < contentLen; k++) {
                if (content[k][0] != null &&
                    content[k][0]
                    .match(Constants.TARGET_LITERAL)) {
                    targetContent = content[k][1];
                }
                if (content[k][0] != null &&
                    content[k][0].match(targetElement)) {
                    contentSet = content[k][1];
                }
            }

            //Creating table properties for creating a table
            var tableproperties = new Object({
                targetName: target,
                no_of_columns: options.columnCount,
                inputType: targetType

            });

            //creating a map of given style as name value pair
            if (options.style) {
                var params = options.style
                    .split(Constants.COMMA);
                var map = new Object();
                for (var i = 0; i < params.length; i++) {
                    var parts = params[i]
                        .split(Constants.COLON);
                    if (parts.length != 2) {
                        throw new Error("style pattern not proper");
                    }
                    map[parts[0]] = parts[1];
                }
                //extending table properties with map object 
                feba.domManipulator.extendObject(tableproperties, map);

            }

            var spanId = Constants.SPAN + target;
            //create a Span element and add style attributes to it  
            var spanElement = feba.domManipulator
                .createSpanElement(spanId);

            //creating a label
            var labelElement = feba.domManipulator
                .createLabelElement(
                    map.caption_style,
                    options.caption);
            feba.domManipulator.setAttribute(labelElement, "style", "display:block");
            // append label to the span created as a child
            feba.domManipulator.appendChild(spanElement,
                labelElement);

            if (content) {
                //check if the response to be painted in table
                if ("yes" == options.displayInTable) {
                    var table = feba.domManipulator.createTable(
                        tableproperties, contentSet, targetContent);
                    feba.domManipulator.appendChild(spanElement, table);

                } else {
                    // get selected values
                    var selectedValues = feba.domManipulator.getSelectedValues(target, targetContent);
                    var childSpan = feba.domManipulator.createSpanElement();
                    feba.domManipulator.appendChild(spanElement, childSpan);

                    // loop through the reponse and create dynamic element depending upon the targetType
                    feba.domManipulator.each(contentSet, function(index, value) {
                        var span = feba.domManipulator.createParaElement();
                        var dynamicElement = feba.domManipulator.createDynamicElement(value, target, targetType, selectedValues);
                        feba.domManipulator.addClass(dynamicElement, tableproperties.element_style);
                        feba.domManipulator.appendChild(span, dynamicElement);
                        feba.domManipulator.appendChild(childSpan, span);

                    });


                }
            }


            //adding line breaks for proper display of targets 
            var ancestor = feba.domManipulator.parent(feba.domManipulator.getElement(parent));
            for (var i = 0; i < 3; i++) {
                feba.domManipulator.appendChild(ancestor, feba.domManipulator.createBreakElement());
            }
            feba.domManipulator.appendChild(ancestor, spanElement);
            //associating event handler for dynamic elements
            var tarArray = feba.domManipulator.getElementByName(target);
            loadFunction = function() {
                var code = "myFunc = " + options.functionName;
                return eval(code);
            }

            feba.domManipulator.bind(tarArray, options.eventType, "", loadFunction());


        }
        // removes target Element from parent
        function removeChildNodesOfTarget(parent, targetName) {
            var childNode = Constants.SPAN + targetName;
            var childSpanElement = feba.domManipulator
                .getElementById(childNode);
            if (childSpanElement &&
                feba.domManipulator
                .parent(childSpanElement) == feba.domManipulator
                .parent(parent)) {
                feba.domManipulator.remove(childSpanElement);
            }

            var children = feba.domManipulator.children(feba.domManipulator.getElement(feba.domManipulator
                .parent(parent)));
            feba.domManipulator.each(children, function(index, value) {
                if (value.tagName == 'BR') {
                    feba.domManipulator.remove(feba.domManipulator.getElement(value));
                }

            });
        }

    },
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }

});

// Updates Mutiple Target Fields based on their type
function updateTargetElement(target, content, targetElement, selectValue, isTargetAnImage) {

    //constants for readability
    var KEY = 0;
    var VALUE = 1;

    //check if there is any content
    var contentLen = content.length;

    //if there is no content
    if (contentLen == 0) {
        feba.domManipulator.disableField(target);
    }


    var targetContent;
    var contentSet;

    //Loop through the contents
    for (var k = 0; k < contentLen; k++) {
        //Get the element at each location
        var contentElement = content[k];
        //If the element is a single field
        if (contentElement[KEY].match(Constants.TARGET)) {
            targetContent = contentElement[VALUE];
        }
        //if the element is an array
        else if (contentElement[KEY].match(targetElement)) {
            contentSet = contentElement[VALUE];
        }
    }
    setTarget(target, contentSet, selectValue, targetContent, isTargetAnImage);
}
// Gives Target by name in case of radio button else by id.
function getTarget(targetId) {
    var eventElement = feba.domManipulator.getElementById(targetId)[0];
    if (!eventElement) {
        eventElement = feba.domManipulator.getElementByName(targetId)[0];
    }
    return eventElement;
}

// Sets default value to DropDownList
function setDefault(target, selectValue) {
    var selectVal = selectValue.split("|");
    var defaultDescription = selectVal[0];
    var defaultValue;
    if (selectVal.length > 1) {
        defaultValue = selectVal[1];
    }
    return LIB.__GET_OPTIONS_BY_SPLIT__(defaultValue + "|" + getMessage(defaultDescription));
}


// Updates Target Field Based on target Field Type
function setTarget(target, content, selectValue, targetContent, isTargetAnImage) {
    var targetType = target.type;
    if (isTargetAnImage) {
        targetType = "IMAGE";
    }
    switch (targetType) {
        case Constants.SIMPLE_SELECT:
            setTargetToSimpleSelect(target, content, selectValue,
                targetContent);
            break;
        case Constants.MULTIPLE_SELECT:
            setTargetToMultipleSelect(target, content, selectValue,
                targetContent);
            break;
        case Constants.HIDDEN:
        case Constants.TEXTFIELD:
            setTargetToText(target, content);
            break;
        case Constants.RADIO:
            setTargetToRadioButton(target, content);
            break;
        case "IMAGE":
            jQuery(target).attr("alt", content).attr("title", content);
            break;
        default:
            target.innerHTML = content;
    }
    //trigger the target(For raising request on target element)
    //callDomManipulation(target);
}

function callDomManipulation(target) {
    jQuery(target).trigger("domManipulation");
}
// Updates Target Field if target is simple select
function setTargetToSimpleSelect(target, content, selectValue,
    targetContent) {
    var selectedTarget = getSelectedValues(target, targetContent);
    target.options.length = 0;
    target.disabled = false;
    var j = 1;

    if (selectValue == "|") {

        j = 0;
    } else {
        target.options[0] = setDefault(target, selectValue);
    }
    try {
        jQuery(target).febaCombobox("update");
    } catch (e) {
        LOG.logMessages("Drop down update failed");
    }

    if (content) {
        feba.domManipulator.each(content, function(index, value) {

            target.options[j] = LIB.__GET_OPTIONS_BY_SPLIT__(value);
            if (null != selectedTarget && (selectedTarget == target.options[j].value || selectedTarget == target.options[j].value.split('.')[0])) {
                target.options[j].selected = true;
            }

            j++;

        });
    }
}
// Updates Target Field if target is multiple select
function setTargetToMultipleSelect(target, content, selectValue,
    targetContent) {
    // this will get the previously selected values
    var selectedValues = getSelectedValues(target, targetContent);
    target.options.length = 0;
    target.disabled = false;
    target.options[0] = setDefault(target, selectValue);
    var j = 1;
    //if previously selected values are present then retain them
    if (selectedValues.length != 0) {
        feba.domManipulator.each(selectedValues, function(index, selectedTarget) {
            if (selectedTarget == target.options[0].value) {
                target.options[0].selected = true;
                return;
            }
        });
    }
    if (content) {
        feba.domManipulator.each(content, function(index, value) {
            target.options[j] = LIB.__GET_OPTIONS_BY_SPLIT__(value);
            if (selectedValues.length != 0) {
                feba.domManipulator.each(selectedValues, function(index, value) {
                    if (value == target.options[j].value) {
                        target.options[j].selected = true;
                        return;
                    }
                });
            }
            j++;
        });
    }
}
// Updates Target Field if target is radio Button.
function setTargetToRadioButton(target, content) {
    var element = feba.domManipulator.getElementByName(target.name);
    feba.domManipulator.each(element, function(index) {
        element[index].checked = false;
        if (element[index].value == content) {
            element[index].checked = true;
        }
    });
}
// Updates Target Field if target is TextBox
function setTargetToText(target, content) {
    if (content == "") {
        feba.js.watermark.reshowWatermark(target);
    } else {

        target.value = jQuery('<div />').html(content).text();
        jQuery(target).css({
            'color': '#000000'
        });
        //target.value = content;
    }
}
// Gives previously selected Values
function getSelectedValues(target, targetContent) {
    var selectedValues = "";
    if (targetContent) {
        var tar = Constants.TARGET + '_' + target.id;
        if (targetContent[tar]) {
            selectedValues = targetContent[tar];
        }
    }
    return selectedValues;
}
// Method to check whether request can be raised or else format the target
function checkCanRaiserequest(options) {
    this.options = options;
    /** below method call has been commented as a fix for ticket id 683364. Because of this the highlighting
    of a mandatory field was not happening in certain service request queues. */
    //removePreviousError(options.riaFeatureID,options.groupletId,options.source,'','');
    //should return this  boolean function if developer wants to return function in onBeforeExecute during RIA call 
    booleanOnBeforeExecute = false;
    if (this.options.onBeforeExecute && this.options.onBeforeExecute != "") {
        if (!this.options.onBeforeExecute()) {
            return booleanOnBeforeExecute;
        } else {
            return this.options.onBeforeExecute();
        }
    }
    if (feba.domManipulator.hasValue(LIB.__GET_DOM__(this.options.source))) {
        if (LIB.__GET_DOM__(this.options.source).type != Constants.RADIO || LIB.__GET_DOM__(this.options.source).checked == true) {
            return true;
        }
    } else {
        this.options.handleErrors("", "", this.options.groupletId, true);
        removeTarget(this.options.target);
    }
    return false;
}
// Method to remove the content in target element
function removeTarget(targets) {
    if (!targets) {
        return;
    }
    //getting all the targets(in case of multiple targets)
    var targetArray = targets.split(",");
    var targetLen = targetArray.length;
    for (var i = 0; i < targetLen; i++) {
        if (targetArray[i].indexOf("=") != -1) {
            targetElementArray = targetArray[i].split("=");
            if (targetElementArray.length == 2) {
                target = LIB.__GET_DOM__(targetElementArray[0]);
                if (!target) {
                    target = feba.domManipulator.getElementEndingWith(targetElementArray[0])[0];
                }
                if (target && (target.type == Constants.TEXTFIELD || target.type == Constants.HIDDEN)) {
                    target.value = "";
                } else if (target && target.type == Constants.SIMPLE_SELECT) {
                    target.options.length = 0;
                    target.options[0] = setDefault(target, "Select|");
                    target.options[0].selected = true;
                } else if (target && target.type == Constants.RADIO) {
                    target = feba.domManipulator.getElementByName(target.name);
                    feba.domManipulator.each(target, function(index) {
                        target[index].checked = false;
                    });
                } else {
                    if (target) {
                        target.innerHTML = "";
                    }
                }
            }
        }
    }
}
// function to Create Modal and adding content to it
function createModal(currObj) {
    if (currObj.content == null || currObj.content.length == 0) {

    }
    //LIB.__CREATE_DIALOG__(currObj.child);
    containerDiv = feba.domManipulator.getElementById(currObj.modalDataId);
    //currObj.modalDialog.dialog('open');	
    containerDiv.children().remove();
    containerDiv.append(currObj.content);
}
/**
 * Forming dynamic string that should be read by screen reader
 */
function formStringForJAWS(jawsObj, target, source) {
    var tarValue = target.value;
    if (target.tagName == "SPAN") {
        tarValue = target.innerHTML;
    } else if (target.type == Constants.SIMPLE_SELECT) {
        tarValue = target.options[target.selectedIndex].text;
    }
    var tarTitle = target.title;
    /**
     * TO-DO: Remove code to consider name of element if title is not present
     */
    if (tarTitle == null || tarTitle == "") {
        var sourceElem = LIB.__GET_DOM__(source);
        if (sourceElem != null) {
            var name = sourceElem.name;
            if (name != null) {
                tarTitle = name.split(".").length == 2 ? name.split(".")[1] : name;
            }
        }
    }
    if (tarValue != null && tarValue != "" && target.type != 'hidden') {
        jawsObj.ariaTitle = jawsObj.ariaTitle + " " + tarTitle + "  " + tarValue;
        jawsObj.tarId = target.id;
        jawsObj.addToJAWS = true;
    }
}
/** Rajeev for updatePage
 * Handles FEBA updatePage Request. This function is specifically to add next page records of listing to page 
 * without reloading original page. 
 */
feba.domManipulator.createChildClass(feba.js.ajax.base, "feba.js.ajax.updatePage", {}, {
    /**
     * This is the method which is called on creation of object
     */
    init: function(options) {

        this.name = "feba.js.ajax.updatePage";
        this.version = "1.0";
        //	console.log(options.baseUrl);
        this.description = "";
        //	LOG.logMessages("updatePage Initializing the JavaScriptObject");
        feba.js.ajax.add(this);
        this.setOptions(options);
        this.originalOptions = options;
        this.setListeners();
        if (this.options.executeOnLoad) {
            this.execute();
        }

    },
    /**
     * It assigns all the options which are required for processing to this.options 
     */
    setOptions: function(options) {
        this.options = feba.domManipulator.extendObject({
            parser: new LIB.Parser("html"),
            handler: this.handler,
            requestId: 0,
            evalScripts: true,
            type: 'post',
            isGrouplet: true
        }, options || {});
        //	LOG.logMessages("### updatePage In SetOptions method , options are set");
        this.options.originalUrl = this.options.baseUrl;
        this.options.originalParams = this.options.criteria || this.options.parameters;
        this.options.handleErrors = this.handleErrors;
    },

    /**
     * Raises the Ajax Request
     */
    execute: function() {
        feba.domManipulator.blockUI({
            message: '<div style="text-align: center;"><img src="' + imagePath + '/widget-loading.gif"/></div>',
            baseZ: 9999
        });
        if (this.options.requestId === 0) {
            LIB.__CREATE_DIALOG__(this);
            //Opening the dialog
            //	this.options.modalDialog.dialog('open');
            //Hiding the dialog so that user can't see the previous content
            this.options.modalDialog.hide();
        }

        this.request = new feba.js.ajax.ajaxRequest(this.options);
    },

    /**
     * Updates the target with the Ajax response
     */
    handler: function() {
        //this.content=jQuery(this.parser.content);
        this.content = feba.domManipulator.getElement(this.parser.content);
        contentLength = this.content.length;

        //Stripping the script elements from the content  	
        //rajeev commented				
        //	this.contentScripts=this.parser.content.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));	
        //Iterating over content divs
        for (var contentIndex = 0; contentIndex < contentLength; contentIndex++) {
            var groupletId = feba.domManipulator.getAttribute(this.content[contentIndex], Constants.GROUPLET_ID_ATTR);
            if (groupletId) {
                //	console.log("#######################groupletId:"+groupletId.toUpperCase());	
                var containerDiv = feba.domManipulator.getElementById(groupletId.toUpperCase());
                var containerDivChildren = feba.domManipulator.getChildren(containerDiv);
                //Updating the modalContent
                if (containerDivChildren) {
                    feba.domManipulator.remove(containerDivChildren);
                    //feba.domManipulator.remove(containerDiv.parent());
                }
                //Displaying the dialog
                //this.modalDialog.show();
                feba.domManipulator.append(this.dialogContent, this.content[contentIndex]);

                //	this.dialogContent.append(this.content[contentIndex]);
                //Evaluating the scripts
                //var scriptsLength=this.contentScripts.length;										
                containerDiv = feba.domManipulator.getElementById(groupletId.toUpperCase());
                var tabletbodys = containerDiv.find('#repeatDiv').find('table');
                //console.log("#######################tabletbodys:"+tabletbodys.html());
                var tabletheader = containerDiv.find('#repeatDiv').find('table').contents().filter('thead');
                //console.log("#######################tabletbodys:"+tabletheader.html());
                tabletheader.remove();
                //console.log("#######################tabletbodys:"+tabletbodys.html());
                var mainTableContent = feba.domManipulator.getElement('#mobilemainpage').find('#repeatDiv').find('table');
                //console.log("#######################mainTableContent:"+mainTableContent.html());
                var viewMoreInAddedRows = containerDiv.find('#repeatDiv').parent().find('#viewMoreFooterId');
                //viewMoreFooter.remove();
                //console.log("#######################viewMoreInAddedRows html:"+viewMoreInAddedRows.html());
                //console.log("#######################viewMoreInAddedRows val:"+viewMoreInAddedRows.val());
                //console.log("#######################viewMoreInAddedRows length:"+viewMoreInAddedRows.length);
                //console.log("#######################viewMoreInAddedRows text:"+viewMoreInAddedRows.text());
                if (viewMoreInAddedRows && viewMoreInAddedRows.length == 0) {
                    var viewMoreFooter = feba.domManipulator.getElement('#mobilemainpage').find('#repeatDiv').parent().find('#viewMoreFooterId');
                    //console.log("#######################removing :"+viewMoreFooter.html());
                    feba.domManipulator.remove(viewMoreFooter);
                } else {
                    var viewMoreFooter = feba.domManipulator.getElement('#mobilemainpage').find('#repeatDiv').parent().find('#viewMoreFooterId');
                    //console.log("#######################removing :"+viewMoreFooter.html());
                    //	feba.domManipulator.remove(viewMoreFooter);
                    //	feba.domManipulator.getElement('#mobilemainpage').find('#repeatDiv').parent().append(viewMoreInAddedRows);
                }


                //console.log("#######################mainTableContent:"+mainTableContent.html());
                //console.log("#######################tabletbodys:"+tabletbodys.html());

                mainTableContent.append(tabletbodys.html());
                //tabletbodys.remove();
                containerDivChildren = feba.domManipulator.getChildren(containerDiv);
                //Updating the modalContent
                if (containerDivChildren) {
                    feba.domManipulator.remove(containerDivChildren);

                    //						var removeDialog = containerDiv.closest( ".ui-widget-content" );
                    //feba.domManipulator.remove(removeDialog);
                }
                /*		var scriptsLength=0;
						if(this.contentScripts!=undefined){
						      scriptsLength=this.contentScripts.length;	
                         }
	    				for(var index=0;index<scriptsLength;index++ ){						
							if(containerDiv.length!=0){
								feba.domManipulator.append(containerDiv,this.contentScripts[index]);
							}
						} */
            }
        }
        this.requestId = this.requestId + 1;
        //Temporarily getting it by class as plugin doesn't provide id
        feba.domManipulator.unblockUI();
        //	feba.domManipulator.getElementOfClass("ui-dialog-titlebar-close").focus();
        // feba.domManipulator.getElement(".link").focus();
        jQuery(".link").focus();
        jQuery('body').css('cursor', 'default');

    },
    /**
     * Overrides the default toStriong method.Returns the name and options of the object
     */
    toString: function() {
        return this.name + LIB.__TO_STRING__(this.options);
    }

});