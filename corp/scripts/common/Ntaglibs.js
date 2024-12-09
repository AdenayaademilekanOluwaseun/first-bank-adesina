/**
 * Ntaglibs.js
 * The Container and Controller Object for all JavaScript objects
 * It loads all other script files.It is loaded from FEBAScripts.js
 * It contains objects to parse the Ajax response
 *
 * Created on Aug 16, 2011
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

feba.js.common = {

    displayWarning: "Y",
    //This method will bring focus on the HTML element with the given id
    focus: function(elementId) {
        var element = document.getElementById(elementId);
        if (jQuery("#MODAL_VIEW_CONTAINER").length > 0) {
            element = jQuery("#MODAL_VIEW_CONTAINER").find('[id="' + elementId + '"]')
        }
        if (element) {
            if (element && jQuery(element).length > 0) {
                //element.focus();
                if (jQuery("#MODAL_VIEW_CONTAINER").length > 0) {
                    // do nothing
                } else {
                    element = jQuery('#header');
                }
                jQuery('html, body').animate({
                    scrollTop: jQuery(element).offset().top
                }, 0);
            }
        }
    },



    //This method will check if JavaScript is enabled on the page
    checkJS: function(flagId) {
        document.getElementById(flagId).value = 'Y';
        //Added for TOL 700341 starts
        if (document.getElementById("VALIDATE_CREDENTIALS") != null && document.getElementById("AuthenticationFG.BUTTON_DISABLE") == null) {
            document.getElementById("VALIDATE_CREDENTIALS").disabled = false;
        }
        if (document.getElementById("VALIDATE_STU_CREDENTIALS") != null && document.getElementById("AuthenticationFG.BUTTON_DISABLE") == null) {
            document.getElementById("VALIDATE_STU_CREDENTIALS").disabled = false;
        }
        if (document.getElementById("STU_VALIDATE_CREDENTIALS") != null && document.getElementById("AuthenticationFG.BUTTON_DISABLE") == null) {
            document.getElementById("STU_VALIDATE_CREDENTIALS").disabled = false;
        }
        if (document.getElementById("VALIDATE_RM_CREDENTIALS") != null) {
            document.getElementById("VALIDATE_RM_CREDENTIALS").disabled = false;
        }

        if (document.getElementById("AuthenticationFG.ACCESS_CODE") != null) {
            document.getElementById("AuthenticationFG.ACCESS_CODE").disabled = false;
        }
        //Added for TOL 700341 ends
    },

    //This method is used to enable selectAll functionality for tables
    selectAll: function(checkbox, tableID, row, rows) {
        var table = document.getElementById(tableID);
        var tblLen = rows;
        row--;
        for (var i = 0; i < tblLen; i++) {
            if (document.getElementById(checkbox + "[" + row + "]") == null) {
                break;
            }
            //if the header checkbox is checked, then check all check boxes
            if (document.getElementById(checkbox).checked) {
                document.getElementById(checkbox + "[" + row + "]").checked = true;
            } else {
                document.getElementById(checkbox + "[" + row + "]").checked = false;
            }
            row++;
        }
    },

    //This method will check to see if the selectAll checkbox is selected in case
    //some of the rows are not selected 
    checkSelectAll: function(tablecheckboxId, row, lastrec, firstrec) {
        var tblLen = lastrec;
        firstrec--;
        var selectAllCheck = true;
        row--;

        if (!document.getElementById(tablecheckboxId + "[" + row + "]").checked) {

            var tableCheckBox = document.getElementById(tablecheckboxId);
            if (tableCheckBox != null) {
                tableCheckBox.checked = false;
            }
            selectAllCheck = false;

        } else {

            for (var i = firstrec; i < tblLen; i++) {
                if (document.getElementById(tablecheckboxId + "[" + i + "]") == null) {
                    break;
                }
                if (!document.getElementById(tablecheckboxId + "[" + i + "]").checked) {
                    selectAllCheck = false;
                    break;
                }
            }

        }
        if (!selectAllCheck) {
            var tableCheckBox = document.getElementById(tablecheckboxId);
            if (tableCheckBox != null) {
                tableCheckBox.checked = false;
            }
        } else {
            var tableCheckBox = document.getElementById(tablecheckboxId);
            if (tableCheckBox != null) {
                tableCheckBox.checked = true;
            }
        }
    },

    //Checks if grouplets are present on the page and paints the appropriate message if not present
    checkGrouplets: function() {
        var displayErrorMessage = "N";
        if (feba.domManipulator.getElementById('SUPPORTS_GROUPLET_PERSONALIZATION').length > 0 && feba.domManipulator.getElementById('SUPPORTS_GROUPLET_PERSONALIZATION').attr("value") == "true") {
            displayErrorMessage = "Y";
        }
        if (feba.js.ajax.groupletCounter === 0 && "Y" === feba.js.common.displayWarning) {
            if (feba.domManipulator.getElementById('widLibWrapper') && feba.domManipulator.getElementById('widLibWrapper').length > 0) {
                feba.domManipulator.remove(feba.domManipulator.getElementById('widLibWrapper'));
            }
            if (displayErrorMessage == "Y") {
                LIB.__HANDLE_ERROR__(null, "<div id=\"widLibWrapper\" role=\"alert\" class=\"redbg\"><a id=\"errorlink1\" href=\"#\"><img class=\"absmiddle\" title=\"" + getMessage("NoWidgetsTitle") + "\" " +
                    "alt=\"" + getMessage("NoWidgetsAlt") + "\" src=\"" + getMessage("NoWidgetsImageSrc") + "\"></a><span dir=\"ltr\">[CONTLS0004] [100053] </span>" + getMessage("NoWidgets") + "</div>", null, null, "true", false, null);
            }
        }
    },

    //blocks the ui on hyperlink clicks
    blockOnHyperlinkClicks: function(imagePath) {
        if (Constants.YES === CONFIG.blockOnHyperLinkClicksRequired) {
            feba.domManipulator.getElement('a[data-dontBlockUI!="true"]').click(
                function() {

                    var hrefAttrib = feba.domManipulator.getAttribute(this, Constants.HREF);
                    var targetAttrib = feba.domManipulator.getAttribute(this, Constants.TARGET);

                    if (isPageRefreshLink(hrefAttrib) && targetAttrib.indexOf("new") == -1) {
                        var downloadLinkAttribute = feba.domManipulator.getAttribute(this, Constants.DOWNLOAD_LINK);
                        var body = feba.domManipulator.getElement('body');
                        if (downloadLinkAttribute === Constants.TRUE) {
                            feba.domManipulator.blockUI({
                                message: feba.domManipulator.getElementById(imagePath),
                                baseZ: 9999,
                                allowBodyStretch: false,
                                timeout: 5000
                            });
                        } else {
                            feba.domManipulator.blockUI({
                                message: feba.domManipulator.getElementById(imagePath),
                                allowBodyStretch: false,
                                baseZ: 9999
                            });
                        }
                    }
                }
            );
        }
    },

    //blocks the ui on button clicks
    blockOnButtonClicks: function(imagePath) {
        if (Constants.YES === CONFIG.blockOnButtonClicksRequired) {
            feba.domManipulator.getElement(':submit[data-dontBlockUI!="true"]').click(
                function() {
                    var downloadButtonAttribute = feba.domManipulator.getAttribute(this, Constants.DOWNLOAD_BUTTON);
                    if (jQuery('.ERROR_ROW_BG').length == 0) {
                        if (downloadButtonAttribute === Constants.TRUE) {
                            feba.domManipulator.blockUI({
                                message: feba.domManipulator.getElementById(imagePath),
                                baseZ: 9999,
                                allowBodyStretch: false,
                                timeout: 5000
                            });
                        } else {
                            feba.domManipulator.blockUI({
                                message: feba.domManipulator.getElementById(imagePath),
                                allowBodyStretch: false,
                                baseZ: 9999
                            });
                        }
                    }
                }
            );
        }
    },

    //Runs a custom function based on the function name. Function should be present in feba.js.custom
    runPageCustomFunction: function(functionName, groupletId) {
        try {
            if (typeof feba.js.custom[functionName] === 'function') {
                feba.js.custom[functionName](groupletId);
            }
        } catch (e) {
            LOG.logMessages("Exception occurred in functionName " + functionName + " Exception message is" + e.message);
            LOG.logMessages("Exception occurred in functionName " + functionName + " Exception stack is" + e.stack);
        }
    },

    runModuleCustomFunction: function(functionName, groupletId) {
        try {
            if (typeof feba.js.module[functionName] === 'function') {
                feba.js.module[functionName](groupletId);
            }
        } catch (e) {
            LOG.logMessages("Exception occurred in functionName " + functionName + " Exception message is" + e.message);
            LOG.logMessages("Exception occurred in functionName " + functionName + " Exception stack is" + e.stack);
        }
    },

    clear: function(inputFieldId, dropdownId, defaultValues) {
        var defaultvalarr = defaultValues.split(';');
        var arrayLength = defaultvalarr.length;
        for (i = 0; i < arrayLength; i++) {
            var valueArray = defaultvalarr[i].split('=');
            if (feba.js.common.doesArrayContain(valueArray, dropdownId)) {
                document.getElementById(inputFieldId).value = valueArray[1];
                document.getElementById(dropdownId).value = valueArray[2];
            }
        }
        feba.domManipulator.trigger(feba.domManipulator.getElementById(dropdownId), "change");
    },


    //checks if the element is present in the array
    doesArrayContain: function(array, element) {
        if (array) {
            var arrayLength = array.length;
            for (var i = 0; i < arrayLength; i++) {
                if (array[i] == element) {
                    return true;
                }
            }
        }
        return false;
    },

    submitProduct: function(crn, schemecode, formsGroupID) {
        var value = document.getElementById(crn).value;
        document.getElementById(formsGroupID + ".SCHEME_CODE").value = schemecode;
        document.getElementById(formsGroupID + ".PRODUCT_CRN").value = value;
    },

    submitProductOverDraft: function(schemecode, formsGroupID) {
        document.getElementById(formsGroupID + ".SCHEME_CODE").value = schemecode;

    },

    submitPackage: function(crn, packagecode, formsGroupID) {
        var value = document.getElementById(crn).value;
        document.getElementById(formsGroupID + ".PACKAGE_CODE").value = packagecode;
        document.getElementById(formsGroupID + ".PRODUCT_CRN").value = value;
    },

    submitForSimulation: function(crn, schemecode, formsGroupID) {
        var value = document.getElementById(crn).value;
        document.getElementById(formsGroupID + ".SCHEME_CODE").value = schemecode;
        document.getElementById(formsGroupID + ".SIMULATION_CRN").value = value;
    },

    hideseekthree: function(id, img, imagePath, lcExpand, lcCollapse) {

        var flag = document.getElementById(id).style.display;
        if (flag == "block") {

            document.getElementById(id).style.display = "none";
            document.getElementById(img).src = imagePath + "/plus.gif";
            document.getElementById(img).alt = lcExpand;
        } else {

            document.getElementById(id).style.display = "";
            document.getElementById(img).src = imagePath + "/minus.gif";
            document.getElementById(img).alt = lcCollapse;
        }

        for (var i = 0; i <= 10; i++) {
            if (id == "id" + i) {
                document.getElementById('id' + i).style.display = "";
                document.getElementById('img' + i).src = imagePath + "/minus.gif";
                document.getElementById('img' + i).alt = lcCollapse;
            } else if (id != "id" + i) {
                document.getElementById('id' + i).style.display = "none";
                document.getElementById('img' + i).src = imagePath + "/plus.gif";
                document.getElementById('img' + i).alt = lcExpand;
            }
        }
    },
    // documentClickWatcher manages listeners for clicks on document object.
    documentClickWatcher: (function() {
        var docClickWatcher = {},
            keyRegistry = [],
            registry = [],
            watching = false,
            domMan = feba.domManipulator;

        var watch = function() {
            domMan.bind(domMan.getElement(document), "click.documentClickWatcher", undefined, function(event) {
                for (var i = 0; i < registry.length; i++) {
                    registry[i].callBack(registry[i], event);
                }
            });
        };

        var stopWatching = function() {
            domMan.unbind(document, ".documentClickWatcher");
        };

        docClickWatcher.register = function(key, configObj) {
            if (typeof configObj.callBack === "function" && domMan.getIndexInArray(key, keyRegistry) === -1) {
                keyRegistry[keyRegistry.length] = key;
                registry[keyRegistry.length - 1] = configObj;
            }

            if (!watching && registry.length) {
                watching = true;
                watch();
            }
        };

        docClickWatcher.deregister = function(key) {
            var index = domMan.getIndexInArray(key, keyRegistry);
            if (index !== -1) {
                registry.splice(index, 1);
                keyRegistry.splice(index, 1);
            }

            if (watching && !registry.length) {
                watching = false;
                stopWatching();
            }
        };

        return docClickWatcher;
    })()
};