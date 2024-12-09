/**
 * NCustomMobileCommon.js
 *  
 * COPYRIGHT NOTICE:
 * Copyright (c) 2014 Infosys Technologies Limited, Electronic City,
 * Hosur Road, Bangalore - 560 100, India.
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Infosys Technologies Ltd. ("Confidential Information"). You shall
 * not disclose such Confidential Information and shall use it only
 * in accordance with the terms of the license agreement you entered
 * into with Infosys.
 * 
 * This file is use Jquery DAte picker functionlaity provided by jQueryUI.
 */

function fnSetDate(cal1) {

    console.log("fnSetDate fnSetDate");
    var d = new Date();
    var day = "" + d.getDate() + ""
    var dd = new Date();
    dd.setDate(dd.getDate() - 7);
    var day1 = "" + dd.getDate() + ""

    if (day1.length == 1) {
        document.getElementById(cal1).value = "0" + dd.getDate() + "/" + (dd.getMonth() + 1) + "/" + dd.getFullYear()
    } else {
        document.getElementById(cal1).value = dd.getDate() + "/" + (dd.getMonth() + 1) + "/" + dd.getFullYear()
    }

    if (day.length == 1) {
        document.getElementById(cal1).value = "0" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    } else {
        document.getElementById(cal1).value = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    }
}

function customCalendar(id, format, minDate, maxDate) {


    var maxDateLocal = "";
    var minDateLocal = "";


    if (!(maxDate == 'N')) {

        maxDateLocal = maxDate + 'M';
    }

    if (!(minDate == 'N')) {

        minDateLocal = minDate + 'M';
    }
    jQuery("[id='" + id.id + "']").datepicker({
        dateFormat: format,
        changeMonth: false,
        changeYear: false,
        minDate: minDateLocal,
        maxDate: maxDateLocal

    });

}

function datePickerPaint(id, minDate, maxDate, dtFormat) {
    var maxDateLocal = "";
    var minDateLocal = "";



    if (!(minDate == 'N')) {

        minDateLocal = minDate + 'M';

    }
    if (!(maxDate == 'N')) {

        maxDateLocal = maxDate + 'M';
    }


    jQuery("#" + id).datepicker({
        dateFormat: dtFormat,
        changeMonth: false,
        changeYear: false,
        minDate: minDateLocal,
        maxDate: maxDateLocal
    });
}

function dateFocus(id) {
    var dim = jQuery("[id='" + id.id + "']").offset();
    var screenWidth = jQuery(document).width();
    var pickerWidth = jQuery("#ui-datepicker-div").width();
    jQuery("#ui-datepicker-div").offset({
        /*    top     :   dim.top + 40, */
        left: ((dim.left + pickerWidth + 30) > screenWidth) ? (screenWidth - pickerWidth - 30) : (dim.left + 1)
    });
    var errorId = 'ERROR_ROW_' + id.id;
    //console.log("errorId"+errorId);
    //event.preventDefault();
    //if(document.getElementById(errorId)){
    if (jQuery('.ERROR_ROW_BG')[0]) {
        jQuery("[id='" + id.id + "']").removeClass("hasDatepicker");
        var datepickerdiv = feba.domManipulator.getElementById("ui-datepicker-div");
        jQuery(datepickerdiv).css("display", "none;");
        event.stopImmediatePropagation();
        return false;
        /*	 
        	 //partial working
        		event.stopImmediatePropagation();	
        		jQuery("[id='"+id.id+"']").removeClass("hasDatepicker");
        		var datepickerdiv = feba.domManipulator.getElementById("ui-datepicker-div");
        		jQuery(datepickerdiv).css("display","none;");
        		//jQuery("[id='"+id.id+"']").trigger( "click" );
        		return false;
        		*/
    }
}

function dateChange(id) {
    event.stopImmediatePropagation();
    jQuery("[id='" + id.id + "']").removeClass("hasDatepicker");
    var datepickerdiv = feba.domManipulator.getElementById("ui-datepicker-div");
    jQuery(datepickerdiv).css("display", "none;");
    return false;
}