//added for session hijacking issue - Call id - 653560 : start

function de(s, c) {
    var s1 = unescape(s.substr(0, s.length));
    var t = '';
    for (i = 0; i < s1.length; i++) t += String.fromCharCode(s1.charCodeAt(i) - c);
    document.write(unescape(t));
}

function createHashandIncrement(object) {

    /*
     * below code for fetching the bwayparam from the url 
     * 
     */
    try {
        var hrefURL = object.href;
        //	hrefURL = decodeURIComponent(hrefURL);
        var bwayparam = "";
        var uriComponents = hrefURL.split('?')[1];
        var uriValues = uriComponents.split('&');
        var bwayParamtoHash = '';
        if (hrefURL != null) {




            for (var i = 0; i < uriValues.length; i++) {

                var name = uriValues[i].split('=')[0];
                if (name == 'bwayparam') {

                    bwayparam = uriValues[i].split('=')[1];
                    bwayparam = decodeURIComponent(bwayparam);
                }
            }
            bwayparam = bwayparam.replace(/\s/g, "");
            var bwayparamLength = bwayparam.length;

            if (bwayparamLength > 10) {
                bwayParamtoHash = bwayparam.substring(bwayparamLength - 10);
            } else {

                bwayParamtoHash = bwayparam;
            }


        }










        var isPortal = false;
        var groupletId = null;
        //if(object.id){
        //isPortal = true;
        //	var tempVar = this.id.split(Constants.GROUPLET_ELEMENT_SEPERATOR);
        //	groupletId = tempVar[0];

        var id1 = '';
        if (object.id.indexOf(Constants.GROUPLET_ELEMENT_SEPERATOR) == -1 || object.attributes != null && object.attributes["data-isexcluded"].value == "true") {
            id1 = "Requestid";
            try {
                //sessionStorage['currentCounter'] = parseInt(sessionStorage['currentCounter'] ) +1;

            } catch (e) {
                console.log("Counter is not initlized in session Storage");
            }
        } else {
            //	id1=groupletId + ":" + "Requestid";
        }
        //	var element =jQuery("[id='"+id1+"']");

        //	if(element !=null){

        //		var hash = CryptoJS.HmacSHA256(element.val(), "secret");  message ,secret
        var hash = CryptoJS.HmacSHA256(bwayParamtoHash, sessionStorage.xNum);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        document.cookie = id1 + '=;Path=/;Expires=Thu ,01 Jan 1970 000:00:01 GMT;';

        document.cookie = id1 + '=' + encodeURIComponent(hashInBase64) + ';Path=/;';


        //}


        //	disableButton(this.id,groupletId,isPortal);

        //	}
    } catch (e) {
        console.log("###Error while Hashing ####");
    }

}

function createHashandIncrementRia(options, requestId) {

    /*
     * below code for fetching the bwayparam from the url 
     * 
     */
    try {
        var hrefURL = options.baseUrl;
        //	hrefURL = decodeURIComponent(hrefURL);
        var bwayparam = "";
        var uriComponents = hrefURL.split('?')[1];
        var uriValues = uriComponents.split('&');
        var bwayParamtoHash = '';
        if (hrefURL != null) {




            for (var i = 0; i < uriValues.length; i++) {

                var name = uriValues[i].split('=')[0];
                if (name == 'bwayparam') {

                    bwayparam = uriValues[i].split('=')[1];
                    bwayparam = decodeURIComponent(bwayparam);
                }
            }
            bwayparam = bwayparam.replace(/\s/g, "");
            var bwayparamLength = bwayparam.length;


            if (bwayparamLength > 10) {
                bwayParamtoHash = bwayparam.substring(bwayparamLength - 10);
            } else {

                bwayParamtoHash = bwayparam;
            }


        }



        bwayParamtoHash = bwayParamtoHash + requestId;

        var groupletId = null;
        var hash = CryptoJS.HmacSHA256(bwayParamtoHash, sessionStorage.xNum);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);


        return encodeURIComponent(hashInBase64);

    } catch (e) {

        console.log("###Error while Hashing ###");
    }


}

function returnPersistedState() {


    var hash = CryptoJS.HmacSHA256(sessionStorage.currentCounter + sessionStorage.xNum + 987, sessionStorage.xNum);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    return encodeURIComponent(hashInBase64);
}


function randomString() {
    var chars = "0123$#456789G^^AB*CDEFGHIJKL#%$#(^&&MNOPQR74STUVWXTZ9898abcd(*$efghiklmnopqrstuvwxyz(*$#%^&*()+!^(^";
    var string_length = 12;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}



function doEndBinding() {

    /*	var column1Div = feba.domManipulator.getElementById('main').children();
        	feba.domManipulator.click(column1Div,function(){alert('doEndBinding');});*/

    jQuery(document).find('a[href*="Finacle"]').not('a[data-isexcluded="true"]').bind('click', function() {

        createHashandIncrement(this);
    });
    jQuery('a[data-isexcluded="true"][href*="Finacle"]').live('click', function() {

        createHashandIncrement(this);
    });

    /*feba.domManipulator.bind(feba.domManipulator.getElement("form"),'submit','',function(event){


    	createHashandIncrementFormSubmit(this); 

    });*/

    jQuery('form').live('submit', function(event) {
        createHashandIncrementFormSubmit(this);
        event.stopPropagation();
    });

}

function createHashandIncrementFormSubmit(object) {

    try {
        var hrefURL = object.action;

        var bwayparam = "";
        var uriComponents = hrefURL.split('?')[1];
        var uriValues = uriComponents.split('&');
        var bwayParamtoHash = '';
        if (hrefURL != null) {




            for (var i = 0; i < uriValues.length; i++) {

                var name = uriValues[i].split('=')[0];
                if (name == 'bwayparam') {

                    bwayparam = uriValues[i].split('=')[1];
                    bwayparam = decodeURIComponent(bwayparam);
                }
            }
            bwayparam = bwayparam.replace(/\s/g, "");
            var bwayparamLength = bwayparam.length;
            if (bwayparamLength > 10) {
                bwayParamtoHash = bwayparam.substring(bwayparamLength - 10);
            } else {

                bwayParamtoHash = bwayparam;
            }


        }









        var isPortal = false;
        var groupletId = null;
        //if(object.id){
        //isPortal = true;
        //	var tempVar = this.id.split(Constants.GROUPLET_ELEMENT_SEPERATOR);
        //	groupletId = tempVar[0];

        var id1 = '';
        if (object.id.indexOf(Constants.GROUPLET_ELEMENT_SEPERATOR) == -1 || object.attributes != null && object.attributes["data-isexcluded"].value == "true") {
            id1 = "Requestid";
            try {
                //sessionStorage['currentCounter'] = parseInt(sessionStorage['currentCounter'] ) +1;
            } catch (e) {
                console.log("Counter is not initlized in session Storage");
            }
        } else {
            //	id1=groupletId + ":" + "Requestid";
        }
        //	var element =jQuery("[id='"+id1+"']");

        //	if(element !=null){

        //		var hash = CryptoJS.HmacSHA256(element.val(), "secret");  message ,secret
        var hash = CryptoJS.HmacSHA256(bwayParamtoHash, sessionStorage.xNum);
        var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

        document.cookie = id1 + '=;Path=/;Expires=Thu ,01 Jan 1970 000:00:01 GMT;';

        document.cookie = id1 + '=' + encodeURIComponent(hashInBase64) + ';Path=/;';

    } catch (e) {

    }
}
//added for session hijacking issue - Call id - 653560 end