// Arcot specific constants
ArcotConstants = {

    DEVICE_DNA: "deviceDNA",
    EXECUTION_TIME: "executionTime",
    DESC: "desc",
    MESC: "mesc",
    DNA_ERROR: "dnaError",
    MESC_ITERATION_COUNT: "mescIterationCount",
    DNA_DONE: "isDNADone",
    ARCOT_FLASH_COOKIE: "arcotFlashCookie",
    COOKIE_TYPE_FLASH: "DEVICEID.FLASH",
    COOKIE_TYPE_HTTP: "DEVICEID.HTTP",
    DEVICE_ID: "DEVICE_ID",
    MACHINE_FINGER_PRINT: "MACHINE_FINGER_PRINT",
    DEVICE_TYPE: "DEVICE_TYPE",
    COOKIE_NAME: "RISKFORT_COOKIE",
    OUTPUT_FORMAT_TYPE: 0, //0 for JSON, 1 for Arcot Standard
    APPLET_LOAD_REQD: false,
    IS_MESC_ON: true,
    NO_OF_ITERATIONS: 2,
    CALIBRATION_DURATION: 200,
    INTERVAL_DELAY: 50

};

feba.js.adaptive.arcot = {

    /*
     * This method is used to create hidden variables
     */

    createHiddenVariable: function(name, value) {

        // Create hidden variable dynamically
        var field = document.createElement("input");
        field.setAttribute("type", "hidden");
        field.setAttribute("value", value);
        field.setAttribute("id", name);
        field.setAttribute("name", name);
        return field;
    },

    /*
     * This method is calls createHiddenVariables recursively for dynamic element creation
     */
    addHiddenVars: function(hiddenVarArr) {
        for (var i = 0; i < hiddenVarArr.length; i++) {
            var field = feba.js.adaptive.arcot.createHiddenVariable(hiddenVarArr[i][0], hiddenVarArr[i][1]);
            // Append to form object
            document.forms[0].appendChild(field);
        }
    },

    /*
     * This method is used to initialize ArcotDeviceDNA.js
     */
    initArcotDNA: function() {

        try {
            // Get form object
            var formObj = document.forms[0];
            // Create hidden variables array for use of arcot specific functions
            var hiddenVarArr = [
                [ArcotConstants.DEVICE_DNA, ""],
                [ArcotConstants.EXECUTION_TIME, 0],
                [ArcotConstants.DESC, ""],
                [ArcotConstants.MESC, ""],
                [ArcotConstants.DNA_ERROR, ""],
                [ArcotConstants.MESC_ITERATION_COUNT, 0],
                [ArcotConstants.DNA_DONE, false],
                [ArcotConstants.ARCOT_FLASH_COOKIE, ""]
            ];

            // Create hidden Variables	
            // TODO: Need to be added to specific widgets
            feba.js.adaptive.arcot.addHiddenVars(hiddenVarArr);

            // Initialize ArcotDeviceDNA
            ArcotDeviceDNA.setOutputFormatType(ArcotConstants.OUTPUT_FORMAT_TYPE);
            ArcotDeviceDNA.setLoadApplets(ArcotConstants.APPLET_LOAD_REQD);
            ArcotDeviceDNA.setMESCConfiguration(ArcotConstants.IS_MESC_ON, ArcotConstants.NO_OF_ITERATIONS, ArcotConstants.CALIBRATION_DURATION, ArcotConstants.INTERVAL_DELAY);
            ArcotDeviceDNA.setExternalIP(feba.ipAddress);
            ArcotDeviceDNA.init(feba.scriptsPath + "/adaptiveauthentication/" + ADAPTIVECONFIG.solutionType, formObj);
            feba.js.adaptive.arcot.submitDNAForm(true, 2);
        } catch (e) {
            LOG.logMessages("Exception occurred in arcot " + e.message);
        }

        feba.add(feba.js.adaptive.arcot);
    },
    /*
     * This method gets the cookie type. Flash Server Object or Cookie
     */
    getDeviceType: function() {
        var flashVersion = PluginDetect.getVersion("Flash");
        if (flashVersion == null || typeof(flashVersion) == "undefined" || flashVersion == "") {

            return ArcotConstants.COOKIE_TYPE_HTTP;

        } else {
            return ArcotConstants.COOKIE_TYPE_FLASH;

        }
    },

    /*
     * This method calls Arcot functions to generate mfp and collect device id from client system
     */
    getValuesAndPostForm: function() {
        try {

            // Create hidden variables
            var ebHiddenVarArr = [
                [ArcotConstants.DEVICE_ID, ""],
                [ArcotConstants.DEVICE_TYPE, ""],
                [ArcotConstants.MACHINE_FINGER_PRINT, ""]
            ];

            // Create hidden variables 
            this.addHiddenVars(ebHiddenVarArr);
            var deviceType = feba.js.adaptive.arcot.getDeviceType();
            document.getElementById(ArcotConstants.DEVICE_TYPE).value = deviceType;
            ArcotDeviceDNA.formatDNA();

            // Set machine finger print
            document.getElementById(ArcotConstants.MACHINE_FINGER_PRINT).value = document.getElementById(ArcotConstants.DEVICE_DNA).value;


            // Collect device id based on cookie type
            var deviceId = null;
            if (deviceType == ArcotConstants.COOKIE_TYPE_FLASH) {
                // Get flash cookie stored on client's system
                ArcotDeviceDNA.getFlashCookie(ArcotConstants.COOKIE_NAME);
                deviceId = document.getElementById(ArcotConstants.ARCOT_FLASH_COOKIE).value;
            } else {
                // Get browser cookie stored on client's system
                deviceId = getBrowserCookie(ArcotConstants.COOKIE_NAME);
            }
            document.getElementById(ArcotConstants.DEVICE_ID).value = deviceId;

        } catch (e) {
            LOG.logMessages("Exception occurred in arcot " + e.message);
        }
    },

    /*
     * This method is used generate mfp and collect device id
     */
    submitDNAForm: function(isMESCOn, numberOfIterations) {
        try {
            var mescCount = document.getElementById(ArcotConstants.MESC_ITERATION_COUNT).value;
            var isDNADone = document.getElementById(ArcotConstants.DNA_DONE).value;
            var mescCheck = (isMESCOn) ? (mescCount == numberOfIterations) : true;
            if ((isDNADone == "true") && mescCheck) {

                // Collect Device DNA
                this.getValuesAndPostForm();
            } else {

                // Recursively call to check if the collection is completed
                setTimeout("feba.js.adaptive.arcot.submitDNAForm(" + isMESCOn + "," + numberOfIterations + ")", 20);
            }
        } catch (e) {
            LOG.logMessages("Exception occurred in arcot " + e.message);
        }
    },


    /*
     * This method sets device id on client system
     */
    setDeviceInfo: function(value) {

        window.oldonunload = function() {
            // Set cookie on client system based on cookie type

            var deviceType = feba.js.adaptive.arcot.getDeviceType();
            if (deviceType == ArcotConstants.COOKIE_TYPE_FLASH) {
                ArcotDeviceDNA.setFlashCookie(ArcotConstants.COOKIE_NAME, value);
            } else {
                setBrowserCookie(ArcotConstants.COOKIE_NAME, value);
            }
        };
        window.onunload = window.oldonunload;
    }
};