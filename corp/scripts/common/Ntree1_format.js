var consumer_tree1_format = "";
var bankuser_tree1_format = ""
var corporate_tree1_format = ""


function setTreeFormt(usertype) {

    if (usertype == 4) {
        bankuser_tree1_format = [0, 0, false, ["L001/bankuser/images/img/bfolder.gif", "L001/bankuser/images/img/ofolder.gif", "L001/bankuser/images/img/b.gif"],
            [9, 9, 0], true, ["L001/bankuser/images/img/bfolder.gif", "L001/bankuser/images/img/ofolder.gif", "L001/bankuser/images/img/arrow.gif"],
            [9, 9],
            [0, 12, 32, 48, 64, 80, 96, 112, 128], "", "clsNode", [], true, [0, 1], false, ["", "", "", "", "", "", "", "", "", ""],
            [0, 0], true, false, [180, 150], false, true, ["", "", "nodeSelected"], 185, "middle"
        ];
    } else if (usertype == 2) {
        corporate_tree1_format = [1, 0, false, ["corporate/images/collapsed_button.gif", " corporate/images/expanded_button.gif", "corporate/images/img/b.gif"],
            [9, 9, 0], true, ["L001/corporate/images/img/bfolder.gif", "L001/corporate/images/img/ofolder.gif", "L001/corporate/images/img/arrow.gif"],
            [9, 9],
            [0, 12, 32, 48, 64, 80, 96, 112, 128], "", "clsNode", [], true, [0, 1], false, ["", "", "", "", "", "", "", "", "", ""],
            [0, 0], true, false, [180, 150], false, true, ["", "", "nodeSelected"], 185, "middle"
        ];
    } else {
        consumer_tree1_format = [1, 0, false, ["L001/consumer/images/img/bfolder.gif", "L001/consumer/images/img/ofolder.gif", "L001/consumer/images/img/b.gif"],
            [9, 9, 0], true, ["L001/consumer/images/img/bfolder.gif", "L001/consumer/images/img/ofolder.gif", "L001/consumer/images/img/arrow.gif"],
            [9, 9],
            [0, 12, 32, 48, 64, 80, 96, 112, 128], "", "clsNode", [], true, [0, 1], false, ["", "", "", "", "", "", "", "", "", ""],
            [0, 0], true, false, [180, 150], false, true, ["", "", "nodeSelected"], 185, "middle"
        ];
    }

}