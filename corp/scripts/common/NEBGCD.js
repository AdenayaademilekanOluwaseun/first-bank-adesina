function EBGCD() {

    this.listeners = null;
    this.listenerKeyToObj = new Object();
    this.listenerReverseMap = null;
    this.sectionsMap = new Object();
    this.response = null;
    this.uri = null;
    this.rvn = 0;
    this.enableDoc = false;
    this.deltaStrings = new Array()
    this.docId = null;

    this.getSection = function(sectionName) {
        return this.sectionsMap[sectionName]
    }

    this.getSections = function(sectionNames) {
        var retSection = new Object();
        for (var i in sectionNames) {
            var sectionName = sectionNames[i]
            retSection[sectionName] = this.getSection(sectionName);
        }
        return retSection;
    }

    this.setlisteners = function(listeners) {
        this.listeners = listeners;
        this.updatelistenerReverseMap();
    }

    this.updatelistenerReverseMap = function() {
        if (this.listeners == null)
            return;
        this.listenerReverseMap = new Object();
        for (var sectionName in this.listeners) {
            var listenerObjs = this.listeners[sectionName];
            var i = 0;
            var listenerObj = null;
            for (i = 0; i < listenerObjs.length; i++) {
                listenerObj = listenerObjs[i];
                if (this.listenerReverseMap[listenerObj.getId()] == null) {
                    this.listenerReverseMap[listenerObj.getId()] = new Array();
                    this.listenerKeyToObj[listenerObj.getId()] = listenerObj;
                }
                this.listenerReverseMap[listenerObj.getId()].push(sectionName);
            }
        }
    }

    this.getAttributeValue = function(xmlElt, attributeName) {
        var attributeNode = xmlElt.attributes.getNamedItem(attributeName)
        if (attributeNode != null)
            return attributeNode.nodeValue;
        return null;
    }

    this.getSectionName = function(xmlSectionElt) {
        return this.getAttributeValue(xmlSectionElt, "name");
    }

    this.setResponse = function(docObj) {
        this.changedSections = new Array();
        this.deltaStrings = new Array();
        var sections = docObj.getElementsByTagName("section");
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            var sectionName = this.getSectionName(section);
            this.sectionsMap[sectionName] = section;
            this.changedSections.push(sectionName);
        }
        //var getParamNode = docObj.getNodeswithTag("RVN")[0];
        //verify the following??
        //if(this.uri == null)
        this.uri = getNodeText(getChildNodeWithAttributeValue(docObj.getElementsByTagName("parameters")[0], "name", "uri"));
        ////alert("URI FOUND AS : "+this.uri);
        this.rvn = getNodeText(getChildNodeWithAttributeValue(docObj.getElementsByTagName("parameters")[0], "name", "rvn"));
        ////alert("RVN FOUND AS : "+this.rvn);
        if (this.docId == null)
            this.docId = getNodeText(getChildNodeWithAttributeValue(docObj.getElementsByTagName("parameters")[0], "name", "docid"));
    }

    this.getChangedSectionNames = function() {
        return this.changedSections;
    }

    this.updateListeners = function() {
        var listenerObjMap = new Object();

        if (this.changedSections == null)
            return;
        for (var i = 0; i < this.changedSections.length; i++) {
            var sectionName = this.changedSections[i];
            var slisteners = this.listeners[sectionName];
            if (slisteners == null)
                continue;
            for (var j = 0; j < slisteners.length; j++) {
                var clistener = slisteners[j];
                listenerObjMap[clistener.getId()] = clistener.getId();
            }
        }
        for (var listenerObjKey in listenerObjMap) {
            //var listenerObj = listenerObjMap[listenerObjKey];
            var sectionNames = this.listenerReverseMap[listenerObjKey];
            var sections = this.getSections(sectionNames);

            this.listenerKeyToObj[listenerObjKey].paint(sections);
        }
    }

    /*
    this.set = function(sectionName, key, value){
    	var jsonObj1 = new Object()
    	jsonObj1["OPERATION"] = "SET";
    	jsonObj1[key] = value;
    	var jsonObj = new Object();
    	jsonObj["SECTION"] = sectionName;
    	jsonObj["COMMAND"] = jsonObj1;
    	//alert(jsonObj);
    	this.deltaStrings.push(jsonObj);
    }
    */
    this.set = function(sectionName, key, value) {
        var jsonObj1 = new Object()
        jsonObj1["OPERATION"] = "SET";
        var jsonObj2 = new Object();
        jsonObj2[key] = value;
        jsonObj1["DATA"] = jsonObj2;
        var jsonObj = new Object();
        jsonObj["SECTION"] = sectionName;
        jsonObj["COMMAND"] = jsonObj1;
        //alert(jsonObj);
        this.deltaStrings.push(jsonObj);
    }

    this.getDeltaStrings = function() {
        //return this.deltaStrings.toJSON();
        return JSON.stringify(this.deltaStrings, null);
    }

    this.getContextAction = function() {
        var section = this.getSection("context");
        if (section == null)
            return null;
        var cNode = getChildNodeWithAttributeValue(section, "name", "contextAction");
        if (cNode == null)
            return null;
        return getNodeText(cNode);
    }
    this.getContext = function() {
        var section = this.getSection("context");
        if (section == null)
            return null;
        var cNode = getChildNodeWithAttributeValue(section, "name", "context");
        if (cNode == null)
            return null;

        return getNodeText(cNode);
    }
    this.getContextContentLink = function() {
        var section = this.getSection("context");
        if (section == null)
            return null;
        var cNode = getChildNodeWithAttributeValue(section, "name", "contextContentLink");
        if (cNode == null)
            return null;
        return getNodeText(cNode);
    }
    this.getContextDetails = function() {
        var section = this.getSection("context");
        if (section == null)
            return null;
        var cNode = getChildNodeWithAttributeValue(section, "name", "contextDetails");
        if (cNode == null)
            return null;
        return getNodeText(cNode);
    }

    this.getChildOfDetails = function(tagname) {
        var section = this.getSection("context");
        if (section == null)
            return null;
        var parent = getChildNodeWithAttributeValue(section, "name", "contextDetails");
        var nodes = parent.getElementsByTagName(tagname);
        if (nodes == null || nodes.length <= 0)
            return null;
        return getNodeText(nodes[0].childNodes[0]);
    }

}