function getSystemPath(sysPath) {

    var wshell = new ActiveXObject("WScript.Shell");
    var sFolderPath = wshell.ExpandEnvironmentStrings("%" + sysPath + "%");

    return sFolderPath;
}

function doesFileExists(filePath, fileName, sysPath) {

    var qualifiedPath = getSystemPath(sysPath) + "\\" + filePath + "\\" + fileName;
    qualifiedPath = qualifiedPath.replace(/\\/g, "/");

    debug("qualifiedPath : " + qualifiedPath);
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    return fso.FileExists(qualifiedPath);
}

function installApplication(fileName, filePath, clientName) {

    var installerFile = filePath + "/" + fileName;
    installerFile = installerFile.replace(/ /g, "%20");

    debug("installerFile : " + installerFile);

    var cName;

    if (clientName.value == 'Kiosk') {
        cName = "Live Assistance";
    } else if (clientName.value == 'Advizor') {
        cName = "Advizor";
    }

    try {
        var wshell = new ActiveXObject("WScript.Shell");
        wshell.Run(installerFile);

        alert(cName + " is being installed on your system. To launch the " + cName + ", please click on Continue button again after the installation is complete.");
    } catch (err) {
        throwGenericAlert();
    }
}

/* Script has been modified to suit Advisor 3.0 requirements */

function initiateChat() {

    var token = document.forms[0].encryptedUserId.value;
    var launchurl = document.forms[0].launchUrl.value;
    if (clientName.value == 'Kiosk') {
        window.open(launchurl + token, "_blank", 'height=640, width=300, left=' + (window.screen.width - 350) + ', top=' + (window.screen.height - 550) + ', status=no, toolbar=no, resizable=no, scrollbars=no, addressbar=no');
    } else if (clientName.value == 'Advizor') {
        window.open(launchurl + token);
    }

}

function debug(msg) {
    //alert(msg);
}

function throwGenericAlert() {
    alert("An error occured while launching the tool. Please contact the bank administrator.");
}

function logoutKiosk() {
    debug("Logging out ...");
    try {
        var shell = new ActiveXObject("WScript.Shell");
        var regValue = shell.RegRead("HKCR\\FA\\shell\\open\\command\\");

        if (regValue.indexOf("FALiveAssistanceAppBar") != -1) {
            window.open("fa:close?logout");
        }
    } catch (err) {}
    debug("Logged out successfully.");
}