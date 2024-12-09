/**
 * we may need to set the label associated with every fields in page.java
 * to display the label of the fields which is in error with the id of the 
 * field
 **/
var numberRegex = /^[-]?\d*$/;
var doubleRegex = /^[-]?\d*\.?\d*$/;
var amountRegex = /^[-]?(\d*[\,\''|\.]?]*\d)*$/;
var alphabetsRegex = new XRegExp("^\\p{InArabic}|\\p{InArabicPresentationFormsA}|\\p{InArabicPresentationFormsB}|\\p{InArabicSupplement}|\\p{InArmenian}|\\p{InArrows}|\\p{InBalinese}|\\p{InBasicLatin}|\\p{InBengali}|\\p{InBuhid}|\\p{InCham}|\\p{InCherokee}|\\p{InCyrillic}|\\p{InCyrillicExtendedA}|\\p{InCyrillicExtendedB}|\\p{InDevanagari}|\\p{InDingbats}| \\p{InGeneralPunctuation}|\\p{InGeorgian}|\\p{InGeorgianSupplement}|\\p{InGlagolitic}|\\p{InGreekandCoptic}|\\p{InGreekExtended}|\\p{InGujarati}|\\p{InGurmukhi}|\\p{InHebrew}|\\p{InKannada}|\\p{InKatakana}|\\p{InKatakanaPhoneticExtensions}|\\p{InKayahLi}|\\p{InKhmer}|\\p{InLao}|\\p{InLatin1Supplement}|\\p{InLatinExtendedA}|\\p{InLatinExtendedAdditional}|\\p{InLatinExtendedB}|\\p{InLatinExtendedC}|\\p{InLatinExtendedD}|\\p{InLepcha}|\\p{InLimbu}|\\p{InLowSurrogates}|\\p{InMalayalam}|\\p{InMongolian}|\\p{InMyanmar}|\\p{InNewTaiLue}|\\p{InNKo}|\\p{InOgham}|\\p{InOlChiki}|\\p{InOriya}|\\p{InPhagspa}|\\p{InRejang}|\\p{InRunic}|\\p{InSaurashtra}|\\p{InSinhala}|\\p{InSundanese}|\\p{InSuperscriptsandSubscripts}|\\p{InSupplementalPunctuation}|\\p{InSylotiNagri}|\\p{InSyriac}|\\p{InTagalog}|\\p{InTagbanwa}|\\p{InTaiLe}|\\p{InTamil}|\\p{InTelugu}|\\p{InThaana}|\\p{InThai}|\\p{InTibetan}+$");
var alphanumericRegex = new XRegExp("^\\p{InArabic}|\\p{InArabicPresentationFormsA}|\\p{InArabicPresentationFormsB}|\\p{InArabicSupplement}|\\p{InArmenian}|\\p{InArrows}|\\p{InBalinese}|\\p{InBasicLatin}|\\p{InBengali}|\\p{InBuhid}|\\p{InCham}|\\p{InCherokee}|\\p{InCyrillic}|\\p{InCyrillicExtendedA}|\\p{InCyrillicExtendedB}|\\p{InDevanagari}|\\p{InDingbats}| \\p{InGeneralPunctuation}|\\p{InGeorgian}|\\p{InGeorgianSupplement}|\\p{InGlagolitic}|\\p{InGreekandCoptic}|\\p{InGreekExtended}|\\p{InGujarati}|\\p{InGurmukhi}|\\p{InHebrew}|\\p{InKannada}|\\p{InKatakana}|\\p{InKatakanaPhoneticExtensions}|\\p{InKayahLi}|\\p{InKhmer}|\\p{InLao}|\\p{InLatin1Supplement}|\\p{InLatinExtendedA}|\\p{InLatinExtendedAdditional}|\\p{InLatinExtendedB}|\\p{InLatinExtendedC}|\\p{InLatinExtendedD}|\\p{InLepcha}|\\p{InLimbu}|\\p{InLowSurrogates}|\\p{InMalayalam}|\\p{InMongolian}|\\p{InMyanmar}|\\p{InNewTaiLue}|\\p{InNKo}|\\p{InOgham}|\\p{InOlChiki}|\\p{InOriya}|\\p{InPhagspa}|\\p{InRejang}|\\p{InRunic}|\\p{InSaurashtra}|\\p{InSinhala}|\\p{InSundanese}|\\p{InSuperscriptsandSubscripts}|\\p{InSupplementalPunctuation}|\\p{InSylotiNagri}|\\p{InSyriac}|\\p{InTagalog}|\\p{InTagbanwa}|\\p{InTaiLe}|\\p{InTamil}|\\p{InTelugu}|\\p{InThaana}|\\p{InThai}|\\p{InTibetan}|\\p{N}+$");
String.prototype.trim = function() {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
};

function ValidateText(Id, maxLength, caseType, contentType, jsVarForControlIds) {
    var value = document.getElementById(Id).value;
    var msg;
    if (isBlank(value)) {
        return true;
    }
    value = value.trim();
    var fieldLabel = getLabelByFieldId(Id, jsVarForControlIds);
    if (isBlank(fieldLabel)) {
        fieldLabel = " ";
    }
    if (maxLength != -1 && value.length > maxLength) {
        msg = getMessage("ExceedMaxLen");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$maxLength$", maxLength);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    if (!isBlank(caseType)) {
        switch (caseType) {
            case "MIXED_CASE":
                break;
            case "ALL_UPPER_CASE":
                if (value.toLocaleUpperCase() != value) {
                    msg = getMessage("OnlyUpperCase");
                    msg = msg.replace("$fieldLabel$", fieldLabel);
                    if (feba.domManipulator.isRTL()) {
                        msg = "<span dir=\"ltr\">" + msg + "</span>"
                    }
                    displayError(msg + getAdditionalMsg(), Id);
                    grabFocus(Id);
                    return false;
                }
                break;
            case "ALL_LOWER_CASE":
                if (value.toLocaleLowerCase() != value) {
                    msg = getMessage("OnlyLowerCase");
                    msg = msg.replace("$fieldLabel$", fieldLabel);
                    if (feba.domManipulator.isRTL()) {
                        msg = "<span dir=\"ltr\">" + msg + "</span>"
                    }
                    displayError(msg + getAdditionalMsg(), Id);
                    grabFocus(Id);
                    return false;
                }
                break;
            default:
                break;
        }
    }
    if (!isBlank(contentType)) {
        switch (contentType) {
            case "ALPHA_NUMERIC":
                if (alphanumericRegex.test(value) == false) {
                    msg = getMessage("ShouldBeAlphaNum");
                    msg = msg.replace("$fieldLabel$", fieldLabel);
                    if (feba.domManipulator.isRTL()) {
                        msg = "<span dir=\"ltr\">" + msg + "</span>"
                    }
                    displayError(msg + getAdditionalMsg(), Id);
                    grabFocus(Id);
                    return false;
                }
                break;
            case "ONLY_NUMERICS":
                var numberTest = numberRegex.test(value);
                if (numberTest == false) {
                    msg = getMessage("ShouldBeNumeric");
                    msg = msg.replace("$fieldLabel$", fieldLabel);
                    if (feba.domManipulator.isRTL()) {
                        msg = "<span dir=\"ltr\">" + msg + "</span>"
                    }
                    displayError(msg + getAdditionalMsg(), Id);
                    grabFocus(Id);
                    return false;
                }
                break;
            case "ONLY_ALPHABETS":
                var numberTest = value.search(/[0-9]/);
                if (numberTest != -1) {
                    msg = getMessage("ShouldBeAlphabets");
                    msg = msg.replace("$fieldLabel$", fieldLabel);
                    if (feba.domManipulator.isRTL()) {
                        msg = "<span dir=\"ltr\">" + msg + "</span>"
                    }
                    displayError(msg + getAdditionalMsg(), Id);
                    grabFocus(Id);
                    return false;
                }
                break;
            default:
                break;
        }
    }
    return true;
}

/**
 * This  method validates the value of the parameter 'value' against
 * the FEBAAInt and FEBAALong constraints using the values provided 
 * in the parameters minValue and maxValue.
 * 
 * value - int/long value
 * minValue - value representing the minimum value possible for 'value'
 * maxValue - value representing the maximum value possible for 'value'
 */
function ValidateNumber(Id, maxLength, minValue, maxValue, jsVarForControlIds) {
    var value = document.getElementById(Id).value;
    if (isBlank(value)) {
        return true;
    }
    value = value.trim();
    var fieldLabel = getLabelByFieldId(Id, jsVarForControlIds);
    if (isBlank(fieldLabel)) {
        fieldLabel = " ";
    }
    if (maxLength != -1 && value.length > maxLength) {
        msg = getMessage("ExceedMaxLen");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$maxLength$", maxLength);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    var numberTest = numberRegex.test(value);
    if (numberTest == false) {
        msg = getMessage("ShouldBeNumeric");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    if (value < minValue) {
        msg = getMessage("LessThanMinVal");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$minValue$", minValue);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    if (value > maxValue) {
        msg = getMessage("ExceedsMaxVal");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$maxValue$", maxValue);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    return true;
}

/**
 * This  method validates the value of the parameter 'value' against
 * the FEBAAFloat and FEBAADouble constraints using the values provided 
 * in the parameters minValue and maxValue.
 * 
 * value - float/double value
 * minValue - value representing the minimum value possible for 'value'
 * maxValue - value representing the maximum value possible for 'value'
 */
function ValidateDouble(Id, minValue, maxValue, jsVarForControlIds) {
    var value = document.getElementById(Id).value;
    if (isBlank(value)) {
        return true;
    }
    value = value.trim();
    var fieldLabel = getLabelByFieldId(Id, jsVarForControlIds);
    if (isBlank(fieldLabel)) {
        fieldLabel = " ";
    }
    var numberTest = doubleRegex.test(value);
    if (numberTest == false) {
        msg = getMessage("ShouldBeNumeric");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    if (value < minValue) {
        msg = getMessage("LessThanMinVal");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$minValue$", minValue);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    if (value > maxValue) {
        msg = getMessage("ExceedsMaxVal");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$maxValue$", maxValue);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    return true;
}

/**
 * This method validates the value of the parameter char 'value' against the
 * FEBAAChar constraints using the values provided in the parameters
 * specialChars, interpretationMode.
 * Interpretation mode can be : VALID_SET, INVALID_SET, IGNORE
 * value - char value
 * specialChars - String representing special characters
 * interpretationMode - int representing the interpretationMode mode
 */
function ValidateCharacter(Id, len, specialChars, interpretationMode, jsVarForControlIds) {
    var value = document.getElementById(Id).value;
    if (isBlank(value)) {
        return true;
    }
    value = value.trim();
    var fieldLabel = getLabelByFieldId(Id, jsVarForControlIds);
    if (isBlank(fieldLabel)) {
        fieldLabel = " ";
    } else {
        fieldLabel = "'" + fieldLabel + "'";
    }
    if (value.length > 1) {
        msg = getMessage("OnlyOneChar");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    if (!isBlank(interpretationMode)) {
        switch (interpretationMode) {
            case "VALID_SET":
                if (specialChars.indexOf(value) == -1) {
                    msg = getMessage("InValidChar_VALID_SET");
                    msg = msg.replace("$fieldLabel$", fieldLabel);
                    msg = msg.replace("$specialChars$", specialChars);
                    if (feba.domManipulator.isRTL()) {
                        msg = "<span dir=\"ltr\">" + msg + "</span>"
                    }
                    displayError(msg + getAdditionalMsg(), Id);
                    grabFocus(Id);
                    return false;
                }
                break;
            case "INVALID_SET":
                if (specialChars.indexOf(value) != -1) {
                    msg = getMessage("InValidChar_INVALID_SET");
                    msg = msg.replace("$fieldLabel$", fieldLabel);
                    msg = msg.replace("$specialChars$", specialChars);
                    if (feba.domManipulator.isRTL()) {
                        msg = "<span dir=\"ltr\">" + msg + "</span>"
                    }
                    displayError(msg + getAdditionalMsg(), Id);
                    grabFocus(Id);
                    return false;
                }
                break;
            case "IGNORE":
                break;
            default:
                msg = getMessage("InvInterpretMode");
                msg = msg.replace("$fieldLabel$", fieldLabel);
                if (feba.domManipulator.isRTL()) {
                    msg = "<span dir=\"ltr\">" + msg + "</span>"
                }
                displayError(msg + getAdditionalMsg(), Id);
                grabFocus(Id);
                return false;
        }

    }
    return true;
}
/**
 * revert back to old changes
 */

function getLabelByFieldId(Id, jsVarForControlIds) {
    var lablCtrlIds = "";
    var outLabel = "";
    if (jsVarForControlIds != null) {
        lablCtrlIds = jsVarForControlIds.split("@@");
    }
    if (lablCtrlIds == "" || lablCtrlIds == "null") {
        outLabel = Id;
    } else {
        var label = "";
        for (iCntr = 0; iCntr < lablCtrlIds.length; iCntr++) {
            if (lablCtrlIds[iCntr] != "" && lablCtrlIds[iCntr] != "null") {
                label = lablCtrlIds[iCntr].split("=");
                if (label[0] == Id) {
                    outLabel = label[1];
                }
            }
        }
    }
    if (feba.domManipulator.stringEndsWith(outLabel, ":")) {
        outLabel = outLabel.substring(0, outLabel.lastIndexOf(":"));
    }
    outLabel = htmlDecode(outLabel);
    if (isBlank(outLabel.trim())) {
        outLabel = getDynamicLabelByFieldID(Id);
    }
    return outLabel;
}
/**
 * Finds the associated label name for a given field. 
 */
function getDynamicLabelByFieldID(Id) {
    var lableCtrlIds = document.getElementsByTagName('label');
    if (lableCtrlIds) {
        var size = lableCtrlIds.length;
        for (i = 0; i < size; i++) {
            var jsVarForControlId = lableCtrlIds[i].htmlFor;
            if (jsVarForControlId != null && jsVarForControlId == Id) {
                return lableCtrlIds[i].innerHTML;
            }
        }
    }
    return '';
}

function grabFocus(Id) {
    setTimeout(function() {
        document.getElementById(Id).focus();
    }, 100);
}

function isBlank(value) {
    return value == null || value == "" || value == "null" || value.trim() == "";

}

function ValidateAmount(Id, maxValue, maxLength, jsVarForControlIds) {
    value = document.getElementById(Id).value;
    value = value.replace(/,/g, '');
    if (isBlank(value)) {
        return true;
    }
    value = value.trim();
    var fieldLabel = getLabelByFieldId(Id, jsVarForControlIds);
    var msg;
    if (isBlank(fieldLabel)) {
        fieldLabel = " ";
    } else {
        fieldLabel = "'" + fieldLabel + "'";
    }
    if (maxLength != -1 && value.length > maxLength) {
        msg = getMessage("ExceedMaxLen");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$maxLength$", maxLength);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    var numberTest = amountRegex.test(value);
    if (numberTest == false) {
        msg = getMessage("InvalidAmount");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    if (value > maxValue) {
        msg = getMessage("ExceedMaxAmt");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$maxValue$", maxValue);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    return true;
}

function ValidateDate(Id, dateFormat, jsVarForControlIds) {
    value = document.getElementById(Id).value;
    if (isBlank(value)) {
        return true;
    }
    value = value.trim();
    var fieldLabel = getLabelByFieldId(Id, jsVarForControlIds);
    if (isBlank(fieldLabel)) {
        fieldLabel = " ";
    } else {
        fieldLabel = "'" + fieldLabel + "'";
    }
    var preferredFormat = dateFormat.split("|", 2);
    var prefDateFormat = preferredFormat[1];
    var prefCalType = preferredFormat[0];
    var isValidDate;

    //If Calendar Type is Gregorian - Added for Middle East Gaps Project
    if (prefCalType == "GR") {
        isValidDate = isDate(value, prefDateFormat);
    }
    //If Calendar Type is Hijri - Added for Middle East Gaps Project
    else if (prefCalType == "HJ") {
        isValidDate = isHijriDate(value, prefDateFormat);
    }

    if (isValidDate == false) {
        msg = getMessage("InvalidDateFormat");
        msg = msg.replace("$fieldLabel$", fieldLabel);
        msg = msg.replace("$dateFormat$", prefDateFormat);
        if (feba.domManipulator.isRTL()) {
            msg = "<span dir=\"ltr\">" + msg + "</span>"
        }
        displayError(msg + getAdditionalMsg(), Id);
        grabFocus(Id);
        return false;
    }
    return true;
}

function getAdditionalMsg() {
    strAddMsg = "\n" + getMessage("AddMesgType");
    return strAddMsg;
}
var MONTH_NAMES = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
var DAY_NAMES = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

function LZ(x) {
    return (x < 0 || x > 9 ? "" : "0") + x;
}
// ------------------------------------------------------------------
// isDate ( date_string, format_string )
// Returns true if date string matches format of format string and
// is a valid date. Else returns false.
// It is recommended that you trim whitespace around the value before
// passing it to this function, as whitespace is NOT ignored!
// ------------------------------------------------------------------

function isDate(val, format) {
    var date = getDateFromFormat(val, format);
    if (date == 0) {
        return false;
    }
    return true;
}

//Added for Middle East Gaps Project
function isHijriDate(val, format) {
    var date = getHijriDateFromFormat(val, format);
    if (date == 0) {
        return false;
    }
    return true;
}
// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
    var digits = "1234567890";
    for (var i = 0; i < val.length; i++) {
        if (digits.indexOf(val.charAt(i)) == -1) {
            return false;
        }
    }
    return true;
}

function _getInt(str, i, minlength, maxlength) {

    for (var x = maxlength; x >= minlength; x--) {
        var token = str.substring(i, i + x);

        if (token.length < minlength) {
            return null;
        }
        if (_isInteger(token)) {
            return token;
        }
    }
    return null;
}
// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the 
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------

function getDateFromFormat(val, format) {

    val = val + "";
    format = format + "";
    var i_val = 0;
    var i_format = 0;
    var c = "";
    var token = "";
    var token2 = "";
    var x, y;
    var now = new Date();
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = 1;
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    var ampm = "";

    while (i_format < format.length) {
        // Get next token from format string
        c = format.charAt(i_format);

        token = "";
        while ((format.charAt(i_format) == c) && (i_format < format.length)) {

            token += format.charAt(i_format++);

        }
        // Extract contents of value based on format token
        if (token == "yyyy" || token == "yy" || token == "y") {

            if (token == "yyyy") {
                x = 4;
                y = 4;
            }
            if (token == "yy") {
                x = 2;
                y = 2;
            }
            if (token == "y") {
                x = 2;
                y = 4;
            }
            year = _getInt(val, i_val, x, y);

            if (year == null) {
                return 0;
            }
            i_val += year.length;

            if (year.length == 2) {
                if (year > 70) {
                    year = 1900 + (year - 0);
                } else {
                    year = 2000 + (year - 0);
                }
            }
        } else if (token == "MMM" || token == "NNN") {

            month = 0;
            for (var i = 0; i < MONTH_NAMES.length; i++) {

                var month_name = MONTH_NAMES[i];


                if (val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase()) {
                    if (token == "MMM" || (token == "NNN" && i > 11)) {
                        month = i + 1;
                        if (month > 12) {
                            month -= 12;
                        }
                        i_val += month_name.length;
                        break;
                    }
                }
            }
            if ((month < 1) || (month > 12)) {
                return 0;
            }
        } else if (token == "EE" || token == "E") {

            for (var i = 0; i < DAY_NAMES.length; i++) {
                var day_name = DAY_NAMES[i];
                if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
                    i_val += day_name.length;
                    break;
                }
            }
        } else if (token == "MM" || token == "M") {
            month = _getInt(val, i_val, token.length, 2);
            if (month == null || (month < 1) || (month > 12)) {
                return 0;
            }
            i_val += month.length;
        } else if (token == "dd" || token == "d") {
            date = _getInt(val, i_val, token.length, 2);
            if (date == null || (date < 1) || (date > 31)) {
                return 0;
            }
            i_val += date.length;
        } else if (token == "hh" || token == "h") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 1) || (hh > 12)) {
                return 0;
            }
            i_val += hh.length;
        } else if (token == "HH" || token == "H") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 0) || (hh > 23)) {
                return 0;
            }
            i_val += hh.length;
        } else if (token == "KK" || token == "K") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 0) || (hh > 11)) {
                return 0;
            }
            i_val += hh.length;
        } else if (token == "kk" || token == "k") {
            hh = _getInt(val, i_val, token.length, 2);
            if (hh == null || (hh < 1) || (hh > 24)) {
                return 0;
            }
            i_val += hh.length;
            hh--;
        } else if (token == "mm" || token == "m") {
            mm = _getInt(val, i_val, token.length, 2);
            if (mm == null || (mm < 0) || (mm > 59)) {
                return 0;
            }
            i_val += mm.length;
        } else if (token == "ss" || token == "s") {
            ss = _getInt(val, i_val, token.length, 2);
            if (ss == null || (ss < 0) || (ss > 59)) {
                return 0;
            }
            i_val += ss.length;
        } else if (token == "a") {
            if (val.substring(i_val, i_val + 2).toLowerCase() == "am") {
                ampm = "AM";
            } else if (val.substring(i_val, i_val + 2).toLowerCase() == "pm") {
                ampm = "PM";
            } else {
                return 0;
            }
            i_val += 2;
        } else {
            if (val.substring(i_val, i_val + token.length) != token) {
                return 0;
            } else {
                i_val += token.length;
            }
        }
    }
    // If there are any trailing characters left in the value, it doesn't match
    if (i_val != val.length) {
        return 0;
    }
    // Is date valid for month?
    if (month == 2) {
        // Check for leap year

        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) { // leap year
            if (date > 29) {
                return 0;
            }
        } else {
            if (date > 28) {
                return 0;
            }
        }
    }
    if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {

        if (date > 30) {
            return 0;
        }
    }
    // Correct hours value
    if (hh < 12 && ampm == "PM") {


        hh = hh - 0 + 12;
    } else if (hh > 11 && ampm == "AM") {

        hh -= 12;
    }
    var newdate = new Date(year, month - 1, date, hh, mm, ss);

    return newdate.getTime();
}
//Added for decoding the string
//Added by Anbuchelvan_R
function isEncoded(inputString) {
    if (/&#[0-9]{1,5};/g.test(inputString)) {
        return true;
    } else if (/&[A-Z|a-z]{2,6};/gi.test(inputString)) {
        return true;
    } else {
        return false;
    }
}

function entityToChar(s) {
    var entityArray = new Array('&quot;', '&amp;', '&lt;', '&gt;', '&nbsp;');
    var valueArray = new Array('&#34;', '&#38;', '&#60;', '&#62;', '&#160;');
    return matchEntityAndValue(s, entityArray, valueArray);
}

function matchEntityAndValue(entityString, entityArray, valueArray) {
    if (isEmpty(entityString)) return "";
    var patternMatch;
    if (entityArray && valueArray) {
        if (entityArray.length == valueArray.length) {
            for (var i = 0; i < entityArray.length; i++) {
                patternMatch = new RegExp(entityArray[i], 'gi');
                entityString = entityString.replace(patternMatch, valueArray[i]);
            }
        }
    }
    return entityString;
}

function isEmpty(val) {
    if (val) {
        return (val == null || val.length == 0 || /^\s+$/.test(val));
    } else {
        return true;
    }
}

function htmlDecode(entityString) {
    var charvalue, matchvalue, output = entityString;

    if (isEmpty(output)) return "";

    if (isEncoded(entityString)) {
        output = entityToChar(output);
        arr = output.match(/&#[0-9]{1,5};/g);
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                matchvalue = arr[i];
                charvalue = matchvalue.substring(2, matchvalue.length - 1);
                if (charvalue >= -32768 && charvalue <= 65535) {
                    output = output.replace(matchvalue, String.fromCharCode(charvalue));
                } else {
                    output = output.replace(matchvalue, "");
                }
            }
        }
    }
    return output;
}
//Added for decoding the string - Ends

/*Added for Middle East Gaps Project -Start
Seperate validation for date format is done if calendar type is chosen as Hijri, 
since allowed format for Hijri is dd/MM/yyyy or MM/dd/yyyy*/

function getHijriDateFromFormat(val, format) {

    val = val + "";
    format = format + "";
    var i_val = 0;
    var i_format = 0;
    var c = "";
    var token = "";
    var x, y;
    var now = new Date();
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = 1;

    while (i_format < format.length) {
        // Get next token from format string
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) == c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        // Extract contents of value based on format token
        if (token == "yyyy") {
            {
                x = 4;
                y = 4;
            }
            year = _getInt(val, i_val, x, y);
            if (year == null) {
                return 0;
            }
            i_val += year.length;
            if (year.length == 4) {
                if (year < 1350 || year > 1460) {
                    return 0;
                }
            }
        } else if (token == "MM" || token == "M") {
            month = _getInt(val, i_val, token.length, 2);
            if (month == null || (month < 1) || (month > 12)) {
                return 0;
            }
            i_val += month.length;
        } else if (token == "dd" || token == "d") {
            date = _getInt(val, i_val, token.length, 2);
            if (date == null || (date < 1) || (date > 30)) {
                return 0;
            }
            i_val += date.length;
        } else {
            if (val.substring(i_val, i_val + token.length) != token) {
                return 0;
            } else {
                i_val += token.length;
            }
        }
    }
    // If there are any trailing characters left in the value, it doesn't match
    if (i_val != val.length) {
        return 0;
    }
    // Is date valid for month?
    var newdate = new Date(year, month - 1, date);
    return newdate.getTime();
    //Added for Middle East Gaps Project -End
}