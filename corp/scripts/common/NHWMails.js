jQuery.noConflict();
feba.loader.fnload(function() {

    // Added by Sunil_Kumar27 for Mails Module - EBUX Stage 3
    // This script adds document.getElementsByClassName to browsers like IE 
    // which don't have it 

    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function(cn) {
            var rx = new RegExp("(?:^|\\s)" + cn + "(?:$|\\s)");
            var allT = document.getElementsByTagName("*"),
                allCN = [],
                ac = "",
                i = 0,
                a;
            while (a = allT[i = i + 1]) {
                ac = a.className;
                if (ac && ac.indexOf(cn) !== -1) {
                    if (ac === cn) {
                        allCN[allCN.length] = a;
                        continue;
                    }
                    rx.test(ac) ? (allCN[allCN.length] = a) : 0;
                }
            }
            return allCN;
        };
    }

});

jQuery(document).delegate(".calendars-popup", "click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
});
//moved this code to NPageCustom.js for ticket id 756881  issue
/*Surej rewirtten code for search panel collapse and open START*/

/** On click of search mails container, search panel should open up. If clicked again, the opened search panel
 * should collapse. The lens image icon should change the color from black to blue in opened state.
 * If user clicks on anywhere outside, the opened search panel should collapse. Propogation should be stopped 
 * if user clicks on search panel, as there is another function below for handling "body" click. Both click events should not 
 * execute together. */
/*jQuery( document ).undelegate(".search_mails", "click");
jQuery( document ).undelegate("body", "click");
jQuery( document ).delegate( ".search_mails", "click", function(e) {

//Check if user click is ON or WITH IN the search mails div element. If so prevent propogating further to the body click event	
	if(jQuery(".search_mails").find(e.target).length > 0 || e.target.className == "search_mails"){	
		 if(jQuery('#MODAL_VIEW_CONTAINER').length > 0 ){	
				if(jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display") == "none"){
					jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display","block");
					jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src", getImagePath()+ "/left_arrow_double.png");
					jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("title",getMessage("Collapse"));
				} else if (jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display") == "block"){
					jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display","none");
					jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src", getImagePath()+ "/right_arrow_double.png");
					jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("title",getMessage("Expand"));
				}
		} else {
				if(jQuery(".advance_wrapper").css("display") == "none"){
					jQuery(".advance_wrapper").css("display","block");
					jQuery(".db_accwid_pluss").attr("src", getImagePath()+ "/left_arrow_double.png");
					jQuery(".db_accwid_pluss").attr("title",getMessage("Collapse"));
				} else if (jQuery(".advance_wrapper").css("display") == "block"){
					jQuery(".advance_wrapper").css("display","none");
					jQuery(".db_accwid_pluss").attr("src", getImagePath()+ "/right_arrow_double.png");
					jQuery(".db_accwid_pluss").attr("title",getMessage("Expand"));
				}		
		}
		jQuery( document ).undelegate(".search_mails", "click");
		jQuery( document ).undelegate("body", "click");
		e.preventDefault();
		e.stopImmediatePropagation();
	}

});*/

/* When user clicks on anywhere outside search panel and search div container, then the opened Search panel should collpase and the lens image should
 * change its color back to black from blue.*/

/*jQuery( document ).delegate( "body", "click", function(e) {
		//check if user is clicking on Search panel container. If yes, stop propogation and the state should remain same.
		if(jQuery('#MODAL_VIEW_CONTAINER').length > 0 ){
			if(jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").find(e.target).length > 0 || e.target.className == "advance_wrapper"){
				e.preventDefault();
				e.stopImmediatePropagation();
			}else{
				if (jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display") == "block"){
					jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src", getImagePath()+ "/right_arrow_double.png");
					jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("title",getMessage("Expand"));
					jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display","none");
				}
			}		
		} else{
			if(jQuery(".advance_wrapper").find(e.target).length > 0 || e.target.className == "advance_wrapper"){
				e.preventDefault();
				e.stopImmediatePropagation();
			}else{
				if (jQuery(".advance_wrapper").css("display") == "block"){
					jQuery(".db_accwid_pluss").attr("src", getImagePath()+ "/right_arrow_double.png");
					jQuery(".db_accwid_pluss").attr("title",getMessage("Expand"));
					jQuery(".advance_wrapper").css("display","none");
				}
			}
		}

}); */

/* function to display block when reset button is clicked in search panel of mails module.
 * Change lens image to default black. */
jQuery("input:reset").die("click");
jQuery("input:reset").live("click", function() {
    var id = jQuery(this).attr("id");
    if (id == "MailsHomePageUX3_STATIC_MailListNew:Clear" || id == "MailsHomeCorp_STATIC_MailListNew:Clear") {
        if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
            jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src", getImagePath() + "/left_arrow_double.png");
            jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("title", getMessage("Collapse"));
            jQuery('#MODAL_VIEW_CONTAINER').find('.advance_wrapper').attr("style", "display: block;");
            jQuery('#MODAL_VIEW_CONTAINER').find('.advance_wrapper').css("margin-top", "-11px");
        } else {
            jQuery(".db_accwid_pluss").attr("src", getImagePath() + "/left_arrow_double.png");
            jQuery(".db_accwid_pluss").attr("title", getMessage("Collapse"));
            jQuery('.advance_wrapper').attr("style", "display: block;");
            jQuery('.advance_wrapper').css("margin-top", "-11px");
        }
    }
});

/* Function which returns the lens image path form screen*/
function getImagePath() {
    var imagepath = "";
    var imageSrc = "";
    if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
        imageSrc = jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src");
    } else {
        imageSrc = jQuery(".db_accwid_pluss").attr("src");
    }

    var lastIndex = imageSrc.lastIndexOf("/");
    if (lastIndex != -1) {
        imagepath = imageSrc.substring(0, lastIndex);
    }
    return imagepath;
}


/*Surej added code for search panel collapse and open END*/

//This script opens textbox if a user wants to add a new folder
jQuery(".acc_button").live('click', function(event) {
    event.preventDefault();
    jQuery('#acc_edit_button').attr('style', 'display:none');
    jQuery("#acc_button").attr("style", "display: inline;");
});

jQuery(".cancel").live('click', function(event) {
    event.preventDefault();
    jQuery(getParentByTagName(this, 'DIV')).attr("style", "display: none;");
});

//This script opens textbox if a user wants to edit a particular folder
jQuery(".acc_btn").live('click', function(event) {
    event.preventDefault();
    jQuery("#acc_edit_button").attr("style", "display: inline;");
    jQuery(".acc_btn").attr("style", "display: none;");
    //jQuery(".accordianmenuedit").attr("style", "display: none !important;");
    jQuery(".widget h3").attr("style", "height: 110px;");
});
jQuery("#cancel_folder").live('click', function(event) {
    event.preventDefault();
    jQuery("#acc_edit_button").attr("style", "display: none;");
    jQuery(".acc_btn").attr("style", "display: inline;");
    jQuery(".accordianmenuedit").attr("style", "display: inline;");
    jQuery(".widget h3").attr("style", "height: 21px;");

});

// Function to highlight selected row 
// This function is called on the click of details in HWMailsList 
function highlightRow(obj) {
    //event.preventDefault(); 
    jQuery(this).attr('href', 'javascript:void(0)');
    var elem = obj.parentNode.parentNode;
    var parentRow = obj.parentNode.parentNode;
    if (parentRow.className == 'brd_grayselected') {} else {
        var row1Ele = document.getElementsByClassName('brd_grayselected');
        if (row1Ele.length > 0) {
            row1Ele[0].className = 'brd_gray';
        }
        var row2Ele = document.getElementsByClassName('brd_grayselected1');
        if (row2Ele.length > 0) {
            row2Ele[0].className = 'brd_gray1';
        }

        elem.className = 'brd_grayselected';
        row2 = jQuery(elem).next();
        row2[0].className = 'brd_grayselected1';
    }
}
/*Added for EBUX Stage3*/
function templateMesg(mesgobj) {

    var e = document.getElementById("SubjectDropDown");
    if (e.selectedIndex == '0') {
        document.getElementById("MailFG.TEMP_SUBJECT").value = e.options[e.selectedIndex].innerHTML;
        document.getElementById("MailFG.TEMP_MAIL_BODY").value = "";
        var textArea = feba.domManipulator.getElementById("MailFG.TEMP_MAIL_BODY");
        var editor = feba.domManipulator.getData(textArea, 'editor');
        // Changes done for TOL 706062
        if (editor)
            editor.updateFrame();
        return;
    }
    var subject = e.options[e.selectedIndex].innerHTML;
    document.getElementById("MailFG.TEMP_SUBJECT").value = subject;
    var message = jQuery(mesgobj).val();
    document.getElementById("MailFG.TEMP_MAIL_BODY").value = message;
    var textArea = feba.domManipulator.getElementById("MailFG.TEMP_MAIL_BODY");
    var editor = feba.domManipulator.getData(textArea, 'editor');
    // Changes done for TOL 706062
    if (editor)
        editor.updateFrame();

}


/*Function to display search panel as a block on click of reset button*/

function displayBlock() {

    var rowEle = document.getElementsByClassName('ERROR_ROW_BG');
    if ((rowEle != null) && (rowEle.length > 0)) {
        //jQuery('input[type="submit"]').attr('disabled','disabled');
        jQuery('.advance_wrapper').attr("style", "display: block;");
        jQuery("#searchBtn").button("disable");
    }
}
/*printing content of particular div*/
function printDivContent(id) {
    //Get the value of Calendar type from the jsp - Ticket #696629
    var calendarType = document.getElementById('calendarType').value;
    var hourFormat = feba.domManipulator.getElementById("MailListFG.HOUR_FORMAT").val();

    var myDate = new Date();
    var day = myDate.getDate();
    var month = myDate.getMonth();
    var year = myDate.getFullYear();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
    //Invoke a function to convert the gregorian date to hijri date in case calendar type is hijri - Ticket #696629
    if (calendarType == Constants.HIJRI_DATE) {
        var hijriDate = writeHijriDate();
    }
    //to show two digits date
    if (calendarType !== Constants.HIJRI_DATE) {
        if (day < 10)
            day = "0" + day;
        //Month returned will be having index 0-11 ,so increasing by 1 and showing two digits if date is less than 10
        month = month + 1;
        if (month < 10)
            month = "0" + month;
    }
    if (minutes < 10)
        minutes = "0" + minutes

    var suffix = "AM";
    if (hourFormat == 24) {
        suffix = "";
    } else {
        if (hours >= 12) {
            suffix = "PM";
            hours = hours - 12;
        }
        if (hours == 0) {
            hours = 12;
        }
    }
    var WindowObject = window.open('', 'printwindow' + new Date().getTime(), 'width=640,height=660,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=1');
    WindowObject.onresize = function() {
        WindowObject.resizeTo(640, 660);
    }
    WindowObject.onclick = function() {
        WindowObject.resizeTo(640, 660);
    }

    //Fix for ticket #696083 - Title
    WindowObject.document.write('<html><head><title>' + Constants.FINACLE_TITLE + ' Mail Details</title>');
    WindowObject.document.write('<link rel="stylesheet" type="text/css" href="./L001/consumer/theme/new_style_HW.css">');
    WindowObject.document.write('<link rel="stylesheet" type="text/css" href="./L001/corporate/theme/new_style_HW.css">');
    WindowObject.document.write('<script type="text/javascript"> function printpage(){window.print();window.location.reload();}</script>');
    WindowObject.document.write('</head>');
    WindowObject.document.write('<body style="background-color:#FFFFFF">');
    WindowObject.document.write('<center style="float:right">');
    WindowObject.document.write('<link rel="stylesheet" type="text/css" href="./L001/consumer/theme/new_style_HW.css">');
    WindowObject.document.write('<link rel="stylesheet" type="text/css" href="./L001/corporate/theme/new_style_HW.css">');
    var browserVersion = parseInt(navigator.appVersion);
    var isIE = navigator.appName.indexOf("Microsoft") != -1 || navigator.appVersion.indexOf('Trident/') > 0 || navigator.userAgent.indexOf('Firefox/') > 0;
    if (isIE && browserVersion >= 4) {
        // WindowObject.document.write('<span style="float: left;clear: right;margin-left: 5px;padding-left: 5px;margin-top: 5px;margin-right:5px;"><input type="button" style="font-family: arial,helvetica,sans-serif;font-size:0.75em;font-weight:bold;color:#fff;text-decoration:none;background:url(L001/consumer/images/sendbtn.png) ;width:45px; height:21px;border: 0px solid #333333;vertical-align:middle;overflow:visible;float:left;cursor:pointer;" onclick=printpage() value="Print"/></span>');
        WindowObject.document.write('<span class="HW_formbtn" style="margin-top: 3px;" ><input type="button" class="formbtn" onclick=printpage() value="Print"/></span>');
    } else {
        WindowObject.document.write('<span class="HW_formbtn" style="margin-top: 3px;"><input type="button" class="formbtn" onclick="javascript:window.print();" value="Print"/></span>');
    }
    WindowObject.document.write('<span class="HW_formbtn" style="margin-top: 3px;"><input type="button" class="formbtn" onclick="javascript:window.close();" value="Close"/></span>');
    WindowObject.document.write('<span style="font-family: arial;font-size : 0.69em;text-decoration: none;padding-right:3px;">');
    //Paint the date as per the calendar type -  Ticket #696629 
    if (calendarType == Constants.HIJRI_DATE) {
        WindowObject.document.write('Printed on' + '  ' + hijriDate);
    } else {
        WindowObject.document.write('Printed on' + '  ' + day + '-' + month + '-' + year + '  ' + hours + ':' + minutes + ':' + seconds + '  ' + suffix);
    }

    //End  Ticket #696629
    WindowObject.document.write('</span>');
    WindowObject.document.write('</center>');
    WindowObject.document.write('<span>');
    var rightpaneltop = jQuery('.right_top').html();
    //Fix starts: Added for disabling link in print preview screen
    rightpaneltop = rightpaneltop.replace('<a', '<span');
    rightpaneltop = rightpaneltop.replace('bluelink', 'rightpanel_textbold_top');
    rightpaneltop = rightpaneltop.replace('</a>', '</span>');
    // Fix ends


    WindowObject.document.writeln(rightpaneltop);
    var rightpanelmid = jQuery('.right_midreplay').html();
    WindowObject.document.writeln(rightpanelmid);
    WindowObject.document.write('</span>');
    WindowObject.document.write('</body>');
}


//Added as a fix for ticket #696629
function gmod(n, m) {
    return ((n % m) + m) % m;
}

//Logic for calculating the hijri date
function hijricalendar(adjust) {
    var today = new Date();
    if (adjust) {
        adjustmili = 1000 * 60 * 60 * 24 * adjust;
        todaymili = today.getTime() + adjustmili;
        today = new Date(todaymili);
    }
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    m = month + 1;
    y = year;
    if (m < 3) {
        y -= 1;
        m += 12;
    }

    a = Math.floor(y / 100.);
    b = 2 - a + Math.floor(a / 4.);
    if (y < 1583) b = 0;
    if (y == 1582) {
        if (m > 10) b = -10;
        if (m == 10) {
            b = 0;
            if (day > 4) b = -10;
        }
    }

    jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

    b = 0;
    if (jd > 2299160) {
        a = Math.floor((jd - 1867216.25) / 36524.25);
        b = 1 + a - Math.floor(a / 4.);
    }
    bb = jd + b + 1524;
    cc = Math.floor((bb - 122.1) / 365.25);
    dd = Math.floor(365.25 * cc);
    ee = Math.floor((bb - dd) / 30.6001);
    day = (bb - dd) - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
        cc += 1;
        month = ee - 13;
    }
    year = cc - 4716;

    if (adjust) {
        wd = gmod(jd + 1 - adjust, 7) + 1;
    } else {
        wd = gmod(jd + 1, 7) + 1;
    }

    iyear = 10631. / 30.;
    epochastro = 1948084;
    epochcivil = 1948085;

    shift1 = 8.01 / 60.;

    z = jd - epochastro;
    cyc = Math.floor(z / 10631.);
    z = z - 10631 * cyc;
    j = Math.floor((z - shift1) / iyear);
    iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    im = Math.floor((z + 28.5001) / 29.5);
    if (im == 13) im = 12;
    id = z - Math.floor(29.5001 * im - 27);

    var myRes = new Array(8);

    myRes[0] = day; //calculated day (CE)
    myRes[1] = month - 1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd - 1; //julian day number
    myRes[4] = wd - 1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im - 1; //islamic month
    myRes[7] = iy; //islamic year
    return myRes;
}

function writeHijriDate(adjustment) {
    //Invoke a function to get the date in hijri format
    var iDate = hijricalendar(adjustment);
    //Format the date as required to display it on the screen
    var outputIslamicDate = iDate[5] + "/" + iDate[6] + "/" + iDate[7];
    return outputIslamicDate;
}

//End of fix for ticket #696629

/*Function to load Confirmation Message while deleting personal folder*/
function deletepfm() {
    var fname = feba.domManipulator.getElementEndingWith("NEW_FOLDER_NAME");
    var foldername = jQuery(fname).val();
    //    var r=confirm("You are about to delete the Folder "+ foldername +".If it contains Messages, they would be destroyed on deleting this Folder. Are you sure you want to continue?");
    var msg = getMessage("DeletePersonalFolder");
    msg = msg.replace("$foldername$", foldername);

    var r = confirm(msg);
    var elem = document.getElementById('MailListFG.DELPFM_FLAG');
    if (elem != null) {
        if (r == true) {
            elem.value = "Y";
        } else {
            elem.value = "N";
        }
    }

}
/*Function to handle div heights in mailview page*/
function adjustDivHeight() {
    var str = "N";
    lefterr = false;
    righterr = false;
    rightsuccess = false;
    leftsuccess = false;
    searcherror = false;
    var child = null;
    var childview = null;

    var errID = feba.domManipulator.getElementById("MAILSHOMEPAGEUX3_STATIC_MAILLISTNEW");
    //var errID = feba.domManipulator.getElementById("MessageDisplay_TABLE");
    var errviewID = feba.domManipulator.getElementById("MAILSHOMEPAGEUX3_STATIC_MAILVIEW");
    child = errID.children().children()[1];
    childlist = errID.children().children()[4];
    var leftnullcheck = feba.domManipulator.getChildren(errID);
    childview = errviewID.children().children()[1];
    var rightnullcheck = feba.domManipulator.getChildren(errviewID);
    if ((jQuery(leftnullcheck[0]).attr("id") == "MessageDisplay_TABLE") || (jQuery(rightnullcheck[0]).attr("id") == "MessageDisplay_TABLE")) {
        if (jQuery(leftnullcheck[0]).attr("id") == "MessageDisplay_TABLE") {
            if (child.className == 'redbg') {
                lefterr = true;
            }
            if (childlist.className == 'greenbg') {
                leftsuccess = true;
            }
            if (childlist.className == 'redbg') {
                searcherror = true;
            }
        }
        if (jQuery(rightnullcheck[0]).attr("id") == "MessageDisplay_TABLE") {
            if (childview.className == 'redbg') {
                righterr = true;
            }
            if (childview.className == 'greenbg') {
                rightsuccess = true;
            }
        }
    } else if ((jQuery.browser.msie) && (BrowserDetect.version == 8 || BrowserDetect.version == 9)) {
        jQuery(".right_panel").attr("style", "height: 582px;");
        /*jQuery(".right_midreplay").attr("style", "height: 381px;");*/
        /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
        jQuery(".right_midreplay").attr("style", "height: 263px;");
        jQuery(".right_midreplay_template").attr("style", "height: 433px;");
        jQuery(".section").attr("style", "padding-top: 0em;");
        jQuery(".rightgrouplet").attr("style", "margin-top: 47px;");
    } else {
        jQuery(".right_panel").attr("style", "height: 591px;");
        /*jQuery(".right_midreplay").attr("style", "height: 391px;"); */
        /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
        jQuery(".right_midreplay").attr("style", "height: 263px;");
        jQuery(".right_midreplay_template").attr("style", "height: 443px;");
        jQuery(".section").attr("style", "padding-top: 0em;");
        jQuery(".rightgrouplet").attr("style", "margin-top: 47px;");
    }

    if ((jQuery.browser.msie) && (BrowserDetect.version == 8 || BrowserDetect.version == 9)) {

        if (lefterr == true && leftsuccess == true) {
            jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
        }
        if (lefterr == true && searcherror == true) {
            jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
        }
        if (lefterr == true && leftsuccess == false && rightsuccess == false && righterr == false && searcherror == false) {
            jQuery(".right_panel").attr("style", "height: 582px;");
            /*jQuery(".right_midreplay").attr("style", "height: 381px;");*/

            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 73px;");
            jQuery(".right_panel_wrapper").attr("style", "height: 580px;");
        }
        if (lefterr == true && rightsuccess == true) {
            jQuery(".right_panel").attr("style", "height: 554px;");
            /*jQuery(".right_midreplay").attr("style", "height: 352px;");*/
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");
        }
        if (lefterr == true && righterr == true) {
            jQuery(".right_panel").attr("style", "height: 556px;");
            /*jQuery(".right_midreplay").attr("style", "height: 354px;");   */
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");

        }
        if (lefterr == false && rightsuccess == true) {
            jQuery(".right_panel").attr("style", "height: 554px;");
            /*jQuery(".right_midreplay").attr("style", "height: 352px;"); */
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");
        }

        if (lefterr == false && righterr == true) {
            jQuery(".right_panel").attr("style", "height: 554px;");
            /* jQuery(".right_midreplay").attr("style", "height: 352px;");*/
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");

        }
    } else {
        if (lefterr == true && leftsuccess == true) {
            jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
        }
        if (lefterr == true && searcherror == true) {
            jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
        }
        if (lefterr == true && leftsuccess == false && rightsuccess == false && righterr == false && searcherror == false) {
            jQuery(".right_panel").attr("style", "height: 591px;");
            /* jQuery(".right_midreplay").attr("style", "height: 391px;");    */
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 73px;");
        }
        if (lefterr == true && rightsuccess == true) {
            jQuery(".right_panel").attr("style", "height: 562px;");
            /* jQuery(".right_midreplay").attr("style", "height: 362px;");  */
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");
        }
        if (lefterr == true && righterr == true) {
            jQuery(".right_panel").attr("style", "height: 564px;");
            /*jQuery(".right_midreplay").attr("style", "height: 364px;"); */
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");

        }
        if (lefterr == false && rightsuccess == true) {
            jQuery(".right_panel").attr("style", "height: 563px;");
            /*jQuery(".right_midreplay").attr("style", "height: 363px;");*/
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");
        }

        if (lefterr == false && righterr == true) {
            jQuery(".right_panel").attr("style", "height: 566px;");
            /* jQuery(".right_midreplay").attr("style", "height: 366px;");   */
            /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
            jQuery(".right_midreplay").attr("style", "height: 263px;");
            jQuery(".section").attr("style", "padding-top: 0em;");
            jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");

        }
    }
    adjustHeight();
}

/*End of EBUX stage3*/
/*Aashish added for RWD*/
jQuery(document).ready(function() {

    if (jQuery('#MailFG\\.REPORTTITLE').val() == 'MailAttachmentUX3') {
        if (jQuery('.rightgrouplet .queryitalictext').length == 0) {
            jQuery('.queryitalictext').css('padding-left', '200px');
        } else if (jQuery('.rightgrouplet .queryitalictext').length > 0) {
            jQuery('.txtfield_fl').css('padding-left', '5px');
            jQuery('.querytextleft').css('width', '130px');
        }
    }
    if (viewportWidth().width > 900) {
        if (jQuery('#MailFG\\.REPORTTITLE').val() == 'MailAttachmentUX3') {
            if (jQuery('.rightgrouplet .queryitalictext').length == 0) {
                jQuery('.queryitalictext').css('padding-left', '0px');
            }
        }
    }
    jQuery(window).resize(function() {
        if (viewportWidth().width >= 480 && viewportWidth().width <= 900) {
            if (jQuery('#MailFG\\.REPORTTITLE').val() == 'MailAttachmentUX3') {
                if (jQuery('.rightgrouplet .queryitalictext').length == 0) {
                    jQuery('.queryitalictext').css('padding-left', '200px');
                } else if (jQuery('.rightgrouplet .queryitalictext').length > 0) {
                    jQuery('.txtfield_fl').css('padding-left', '5px');
                    jQuery('.querytextleft').css('width', '130px');
                }
            }
        }
        if (viewportWidth().width > 900) {
            if (jQuery('#MailFG\\.REPORTTITLE').val() == 'MailAttachmentUX3') {
                if (jQuery('.rightgrouplet .queryitalictext').length == 0) {
                    jQuery('.queryitalictext').css('padding-left', '0px');
                } else if (jQuery('.rightgrouplet .queryitalictext').length > 0) {
                    jQuery('.txtfield_fl').css('padding-left', '5px');
                    jQuery('.querytextleft').css('width', '130px');
                }
            }
        }
    });
});

function adjustHeight() {

    jQuery(document).ready(function() {
        if (viewportWidth().width >= 480 && viewportWidth().width <= 639) {
            jQuery(".rightgrouplet").attr("style", "margin-top: 8px;");
            jQuery("#MailsHomePageUX3_STATIC_MailView").attr("style", "margin-right: 0px;");
            jQuery('.advance_wrapper').css('margin-top', '-6px');
            jQuery('.advance_wrapper').css('margin-left', '2px');
        } else if (viewportWidth().width >= 640) {
            jQuery("#MailsHomePageUX3_STATIC_MailView").attr("style", "margin-right: 4px;");
            jQuery('.advance_wrapper').css('margin-top', '-11px');
            jQuery('.advance_wrapper').css('margin-left', '12px');
        }
    });
    jQuery(window).resize(function() {
        if (viewportWidth().width >= 640) {
            jQuery("#MailsHomePageUX3_STATIC_MailView").attr("style", "margin-right: 4px;");
            jQuery('.advance_wrapper').css('margin-top', '-11px');
            jQuery('.advance_wrapper').css('margin-left', '12px');
        }
        if (viewportWidth().width >= 480 && viewportWidth().width <= 639) {
            jQuery(".rightgrouplet").attr("style", "margin-top: 8px;");
            jQuery("#MailsHomePageUX3_STATIC_MailView").attr("style", "margin-right: 0px;");
            jQuery('.advance_wrapper').css('margin-top', '-6px');
            jQuery('.advance_wrapper').css('margin-left', '2px');
        } else {
            var str = "N";
            lefterr = false;
            righterr = false;
            rightsuccess = false;
            leftsuccess = false;
            searcherror = false;
            var child = null;
            var childview = null;

            var errID = feba.domManipulator.getElementById("MAILSHOMEPAGEUX3_STATIC_MAILLISTNEW");
            //var errID = feba.domManipulator.getElementById("MessageDisplay_TABLE");
            var errviewID = feba.domManipulator.getElementById("MAILSHOMEPAGEUX3_STATIC_MAILVIEW");
            child = errID.children().children()[1];
            childlist = errID.children().children()[4];
            var leftnullcheck = feba.domManipulator.getChildren(errID);
            childview = errviewID.children().children()[1];
            var rightnullcheck = feba.domManipulator.getChildren(errviewID);
            if ((jQuery(leftnullcheck[0]).attr("id") == "MessageDisplay_TABLE") || (jQuery(rightnullcheck[0]).attr("id") == "MessageDisplay_TABLE")) {
                if (jQuery(leftnullcheck[0]).attr("id") == "MessageDisplay_TABLE") {
                    if (child.className == 'redbg') {
                        lefterr = true;
                    }
                    if (childlist.className == 'greenbg') {
                        leftsuccess = true;
                    }
                    if (childlist.className == 'redbg') {
                        searcherror = true;
                    }
                }
                if (jQuery(rightnullcheck[0]).attr("id") == "MessageDisplay_TABLE") {
                    if (childview.className == 'redbg') {
                        righterr = true;
                    }
                    if (childview.className == 'greenbg') {
                        rightsuccess = true;
                    }
                }
            } else if ((jQuery.browser.msie) && (BrowserDetect.version == 8 || BrowserDetect.version == 9)) {
                jQuery(".right_panel").attr("style", "height: 582px;");
                /*jQuery(".right_midreplay").attr("style", "height: 381px;");*/
                /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                jQuery(".right_midreplay").attr("style", "height: 263px;");

                jQuery(".right_midreplay_template").attr("style", "height: 433px;");
                jQuery(".section").attr("style", "padding-top: 0em;");
                jQuery(".rightgrouplet").attr("style", "margin-top: 47px;");
            } else {
                jQuery(".right_panel").attr("style", "height: 591px;");
                /*jQuery(".right_midreplay").attr("style", "height: 391px;"); */
                /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                jQuery(".right_midreplay").attr("style", "height: 263px;");
                jQuery(".right_midreplay_template").attr("style", "height: 443px;");
                jQuery(".section").attr("style", "padding-top: 0em;");
                jQuery(".rightgrouplet").attr("style", "margin-top: 47px;");
            }

            if ((jQuery.browser.msie) && (BrowserDetect.version == 8 || BrowserDetect.version == 9)) {

                if (lefterr == true && leftsuccess == true) {
                    jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
                }
                if (lefterr == true && searcherror == true) {
                    jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
                }
                if (lefterr == true && leftsuccess == false && rightsuccess == false && righterr == false && searcherror == false) {
                    jQuery(".right_panel").attr("style", "height: 582px;");
                    /*jQuery(".right_midreplay").attr("style", "height: 381px;");*/

                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");
                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 73px;");
                    jQuery(".right_panel_wrapper").attr("style", "height: 580px;");
                }
                if (lefterr == true && rightsuccess == true) {
                    jQuery(".right_panel").attr("style", "height: 554px;");

                    /*jQuery(".right_midreplay").attr("style", "height: 352px;");*/
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");


                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");
                }
                if (lefterr == true && righterr == true) {
                    jQuery(".right_panel").attr("style", "height: 556px;");
                    /*jQuery(".right_midreplay").attr("style", "height: 354px;");   */
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");

                }
                if (lefterr == false && rightsuccess == true) {
                    jQuery(".right_panel").attr("style", "height: 554px;");
                    /*jQuery(".right_midreplay").attr("style", "height: 352px;"); */
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");
                }

                if (lefterr == false && righterr == true) {
                    jQuery(".right_panel").attr("style", "height: 554px;");
                    /* jQuery(".right_midreplay").attr("style", "height: 352px;");*/
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");

                }
            } else {
                if (lefterr == true && leftsuccess == true) {
                    jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
                }
                if (lefterr == true && searcherror == true) {
                    jQuery(".rightgrouplet").attr("style", "margin-top: 111px;");
                }
                if (lefterr == true && leftsuccess == false && rightsuccess == false && righterr == false && searcherror == false) {
                    jQuery(".right_panel").attr("style", "height: 591px;");
                    /* jQuery(".right_midreplay").attr("style", "height: 391px;");    */
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 73px;");
                }
                if (lefterr == true && rightsuccess == true) {
                    jQuery(".right_panel").attr("style", "height: 562px;");
                    /* jQuery(".right_midreplay").attr("style", "height: 362px;");  */
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");
                }
                if (lefterr == true && righterr == true) {
                    jQuery(".right_panel").attr("style", "height: 564px;");
                    /*jQuery(".right_midreplay").attr("style", "height: 364px;"); */
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 75px;");

                }
                if (lefterr == false && rightsuccess == true) {
                    jQuery(".right_panel").attr("style", "height: 563px;");
                    /*jQuery(".right_midreplay").attr("style", "height: 363px;");*/
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");
                }

                if (lefterr == false && righterr == true) {
                    jQuery(".right_panel").attr("style", "height: 566px;");
                    /* jQuery(".right_midreplay").attr("style", "height: 366px;");   */
                    /*Surej Latest issue fix Restricting the height to 200px with scroll as screen gets distorted with long subject data*/
                    jQuery(".right_midreplay").attr("style", "height: 263px;");

                    jQuery(".section").attr("style", "padding-top: 0em;");
                    jQuery(".rightgrouplet").attr("style", "margin-top: 48px;");

                }
            }


        }


    });
}

function viewportWidth() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    };
}
/* Added to open the print preview window */
function openPrintPreviewWindow(element) {
    var windowWidth = screen.availWidth;
    var windowHeight = screen.availHeight;
    window.open(element.href, '', 'width=640,height=660,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=1');
}