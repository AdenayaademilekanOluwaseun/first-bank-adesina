function calendarPicker(link_id, obj_target, obj_target_img, imgId, calType, dt_format, yearRangeJs, path, p_year_scroll, p_time_com, p_mask_type) {

    var dateObj = feba.domManipulator.getElement(obj_target);
    var dateImgObj = feba.domManipulator.getElement(obj_target_img);
    var imgIdObj = imgId;
    var todaysDate = getTodaysDate(dt_format, calType);
    if (calType == null) {
        calType = 'gregorian';
    }

    if (yearRangeJs == null) {
        yearRangeJs = '1975:2099';
    }

    if (typeof(dateObj) != 'undefined') {
        if (p_mask_type == 'Past') {
            dateObj.calendarsPicker({
                calendar: jQuery.calendars.instance(calType),
                showOnFocus: false,
                showTrigger: imgIdObj,
                dateFormat: dt_format,
                minDate: todaysDate
            });
        } else if (p_mask_type == 'Future') {
            dateObj.calendarsPicker({
                calendar: jQuery.calendars.instance(calType),
                showOnFocus: false,
                showTrigger: imgIdObj,
                dateFormat: dt_format,
                maxDate: todaysDate
            });
        } else {
            dateObj.calendarsPicker({
                calendar: jQuery.calendars.instance(calType),
                showOnFocus: false,
                showTrigger: imgIdObj,
                dateFormat: dt_format,
                yearRange: yearRangeJs
            });
        }
    }

}
//Gives the todays date for supplied date format
function getTodaysDate(dataFormat, calType) {
    //	var todayDate = new Date();
    /*
    	if(dataFormat == 'dd,M,yyyy'){
    		dataFormat = 'dd,mmm,yyyy';
    	}else if(dataFormat == 'dd-M-yyyy'){
    		dataFormat = 'dd-mmm-yyyy';
    	}else if(dataFormat == 'M dd yyyy'){
    		dataFormat = 'mmm dd yyyy';
    	}
    	*/
    //var date  = jQuery.febaCalendar.formatDate(todayDate,dataFormat);
    var date = jQuery.calendars.instance(calType).newDate().formatDate(dataFormat);
    return date;
}