//------------------------------------------------------
//This javascript is used to call validation functions
//on all input elements present in the form for type system
//validation at client side
//------------------------------------------------------
//------------------------------------------------------
//This function is used to get the details for a
//particular feba type from the json object
//------------------------------------------------------
var getValidationDetails = function(type, typesCatalogue) {
    return typesCatalogue[type];
};

//--------------------------------------------------------
//This function is called on window load.
//It iterates through all forms present on the page
//--------------------------------------------------------
var init = function(jsonObj, widgetDivId, jsVarForControlIds) {
    // check if js validations for type system is required
    if (FEBAJSConfig.typeSystemJSValRequired === "N") {
        return;
    }
    var typesCatalogue = jsonObj.TypesCatalogue;
    if (widgetDivId === null) {
        var forms = document.forms;
        for (var i = 0; i < forms.length; i++) {
            init2(forms[i], typesCatalogue, jsVarForControlIds, false);
        }
    } else if (widgetDivId) {
        init2(widgetDivId, typesCatalogue, jsVarForControlIds, true);
    }
};

//----------------------------------------------------------
//This function registers an event handler for the onBlur 
//event for all elements that contain attribute 
// "data-febatype". It also gets the details for each type
// from the json Object provided
//----------------------------------------------------------
isAllowed = true;
var init2 = function(identifier, typesCatalogue, jsVarForControlIds, isWidgetInvocation) {
    var children;
    var mainContentArea;
    if (typeof(identifier) == 'string') {
        mainContentArea = feba.domManipulator.getElementById(identifier);
    } else {
        mainContentArea = feba.domManipulator.getElement(identifier);
    }
    children = feba.domManipulator.find(mainContentArea, "input");
    feba.domManipulator.each(children, function(index, item) {
        item = feba.domManipulator.getElement(item);

        if (feba.domManipulator.getAttribute(item, Constants.FEBA_TYPE)) {
            feba.domManipulator.bind(item, "blur",

                function(e) {
                    if (isAllowed) {
                        clearError(item[0].id);
                        isAllowed = false;
                        validationDetails = getValidationDetails(item.attr(Constants.FEBA_TYPE), typesCatalogue);
                        validateSingleItem(item, validationDetails, jsVarForControlIds);
                        isAllowed = true;
                    }

                }
            );

        }
        if (feba.domManipulator.getAttribute(item, "type") === "submit") {

            /*
            Code added for clearing the field values before invoking type system validations,
            whenever �submit� button with �data-byPassValidations� is set to true, is clicked on.
            */
            feba.domManipulator.bind(item, "click", function(event) {
                if (feba.domManipulator.getAttribute(item, "data-byPassValidations") === "true") {
                    // All input element with type as text are fetched.
                    var textElements = feba.domManipulator.find(mainContentArea, "input[type*='text']");

                    if (textElements.length > 0) {
                        var iLength = textElements.length;

                        for (var i = 0; i < iLength; i++) {
                            //clear value
                            feba.domManipulator.clear(feba.domManipulator.getElementById(textElements[i].id));
                        }
                    }
                    feba.domManipulator.preventDefault(event);
                    return;
                }

                if (isAllowed) {
                    isAllowed = false;
                    if (isWidgetInvocation) {
                        validateUserInput(event, typesCatalogue, identifier);
                    } else if (!isWidgetInvocation) {
                        validateUserInput(event, typesCatalogue, null);
                    }
                    isAllowed = true;
                } else {

                    feba.domManipulator.preventDefault(event);
                }
            });
        }
    });
};
//Submit button validation
var validateUserInput = function(event, typesCatalogue, identifier) {
    var clickElementId = feba.domManipulator.getElementIdFromEvent(event);
    clearError(clickElementId);
    var clickedElement = feba.domManipulator.getElementById(clickElementId);
    if (identifier == null) {
        var closestForm = feba.domManipulator.getClosestElement(clickedElement, 'form');
        var contentAreaDiv = feba.domManipulator.find(closestForm, '#contentarea');

        var children = feba.domManipulator.find(contentAreaDiv, 'input');
        feba.domManipulator.each(children, function(index, item) {
            if (feba.domManipulator.getAttribute(item, Constants.FEBA_TYPE)) {
                var validationDetails = getValidationDetails(feba.domManipulator.getAttribute(item, Constants.FEBA_TYPE), typesCatalogue);
                if (!validateSingleItem(item, validationDetails, jsVarForControlIds)) {
                    feba.domManipulator.preventDefault(event);
                }
            }

        });
    } else if (identifier != null) {
        var parentDiv = feba.domManipulator.getClosestElement(clickedElement, '#' + identifier);
        var children = feba.domManipulator.find(parentDiv, 'input');
        feba.domManipulator.each(children, function(index, item) {
            if (feba.domManipulator.getAttribute(item, Constants.FEBA_TYPE)) {
                var validationDetails = getValidationDetails(feba.domManipulator.getAttribute(item, Constants.FEBA_TYPE), typesCatalogue);
                if (!validateSingleItem(item, validationDetails, jsVarForControlIds)) {
                    feba.domManipulator.preventDefault(event);
                }
            }

        });
    }


};
//----------------------------------------------------------------
//This function is used to validate a single html form element
//It in-turn calls typeSysValidation.js functions 
//----------------------------------------------------------------
var validateSingleItem = function(item, validationDetails, jsVarForControlIds) {
    var returnValue = false;
    var waterCol = feba.domManipulator.getCss(item, Constants.COLOR);
    var waterType = feba.domManipulator.getAttribute(item, Constants.TYPE);
    if ((waterType == 'text') && (feba.js.watermark.isWatermarkValue(item))) {
        return true;
    }
    switch (validationDetails.PTY) {
        case "STR":
            returnValue = ValidateText(feba.domManipulator.getAttribute(item, "id"), validationDetails.LEN, validationDetails.CST, validationDetails.CNT, jsVarForControlIds);
            break;
        case "NUM":
            returnValue = ValidateNumber(feba.domManipulator.getAttribute(item, "id"), validationDetails.LEN, validationDetails.MIN, validationDetails.MAX, jsVarForControlIds);
            break;
        case "DUB":
            returnValue = ValidateDouble(feba.domManipulator.getAttribute(item, "id"), validationDetails.MIN, validationDetails.MAX, jsVarForControlIds);
            break;
        case "CHR":
            returnValue = ValidateCharacter(feba.domManipulator.getAttribute(item, "id"), validationDetails.LEN, validationDetails.CHS, validationDetails.IMD, jsVarForControlIds);
            break;
        case "AMT":
            returnValue = ValidateAmount(feba.domManipulator.getAttribute(item, "id"), validationDetails.MAXVAL, validationDetails.LEN, jsVarForControlIds);
            break;
        case "DAT":
            returnValue = ValidateDate(feba.domManipulator.getAttribute(item, "id"), validationDetails.DFT, jsVarForControlIds);
            break;
    }
    return returnValue;
};