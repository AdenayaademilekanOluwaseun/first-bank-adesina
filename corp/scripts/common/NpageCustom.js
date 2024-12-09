/**
 * NpageCustom.js
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

feba.js.custom = {
    //Format for page specific custom functions is viewId_onload
    //Framework will automatically invoke the desired function for that page
    CustomReportCriteriaUX3_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }


        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },

    ViewReport_onload: function(groupletId) {

        jQuery("table[style='width: 780px; border-collapse: collapse; empty-cells: show']").css({
            'table-layout': 'fixed',
            'width': '1050px'
        });
        jQuery("table[style='border-collapse: collapse; empty-cells: show; table-layout: fixed; width: 1050px;'] tr").css("word-wrap", "break-word");

    },



    CustomReportCriteria_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

    },
    CollectionChargeReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }


        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    PaymentRequestReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    ChargeReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    DebtorsPositionReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    DailyReleaseReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    DormantUserReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    OffShorePaymentRequestReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    FailedInvalidLoginAttemptsReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    RegisteredUserReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    ActivityReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    UserPasswordReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    MenuProfileUserReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    GeneralAuditReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    RequestTypeReport_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "CustomReportsOrdering";

            script.src = "scripts/module/reports/CustomReportsOrdering.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/CustomReportsOrdering.js");
        }

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBAReports";

            script.src = "scripts/module/reports/NFEBAReports.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/reports/NFEBAReports.js");
        }
    },
    DeviceMobiToken_onload: function() {
        jQuery('.formbtn_text2').addClass('formbtn_text2_fontOverride');
    },
    SMSMobiToken_onload: function() {
        jQuery('.formbtn_text2').addClass('formbtn_text2_fontOverride');
    },

    SelectTemplateTxnTypeUX3_onload: function() {
        var id = jQuery("[id$='TemplateMaintenanceFG.TRANSACTION_TYPE']").attr('id');
        document.getElementById(id).focus();
    },
    SMSOTP_onload: function() {
        jQuery('.formbtn_text2').addClass('formbtn_text2_fontOverride');
    },
    MobileMPIN_onload: function() {
        jQuery('.formbtn_text2').addClass('formbtn_text2_fontOverride');
    },
    SMSPassword_onload: function() {
        jQuery('.formbtn_text2').addClass('formbtn_text2_fontOverride');
    },
    SetSMSPassword_onload: function() {
        jQuery("[id$='Set_SMS_Transaction_Password']").removeClass('simpletext');
        jQuery("[id$='Set_SMS_Transaction_Password']").addClass('searchsimpletext searchsimpletextwithleftpadding');
    },

    SetPasswordUX3_onload: function() {
        jQuery("[id$='Set_Signon_Password']").removeClass('simpletext');
        jQuery("[id$='Set_Signon_Password']").addClass('searchsimpletext searchsimpletextwithleftpadding');

        jQuery("[id$='Set_Transaction_Password']").removeClass('simpletext');
        jQuery("[id$='Set_Transaction_Password']").addClass('searchsimpletext searchsimpletextwithleftpadding');
    },

    // Fix for ticket ID 739518
    SetLoginTimeRestrictions_onload: function() {
        setTimeout(function() {
            jQuery("select").febaCombobox("destroy");
            convertComboboxes();
        }, 1000);
    },

    PaymentFormsViewAllRequest_onload: function() {
        var id = jQuery("[id$='PaymentFormsListFG.BENEFICIARY_ID']").attr('id');
        //var id1 = jQuery("[id$='PaymentFormsListFG.CATEGORY_ID']").attr('id');
        bnfIDIndex = document.getElementById(id).selectedIndex;
        //catIDIndex = document.getElementById(id1).selectedIndex;
    },

    PaymentFormsViewApprovalQueue_onload: function() {
        var id = jQuery("[id$='PaymentFormsListFG.BENEFICIARY_ID']").attr('id');
        //var id1 = jQuery("[id$='PaymentFormsListFG.CATEGORY_ID']").attr('id');
        bnfIDIndex = document.getElementById(id).selectedIndex;
        //catIDIndex = document.getElementById(id1).selectedIndex;
    },

    PaymentFormsViewIncompleteRequests_onload: function() {
        var id = jQuery("[id$='PaymentFormsListFG.BENEFICIARY_ID']").attr('id');
        //var id1 = jQuery("[id$='PaymentFormsListFG.CATEGORY_ID']").attr('id');
        bnfIDIndex = document.getElementById(id).selectedIndex;
        //catIDIndex = document.getElementById(id1).selectedIndex;
    },

    UserAccessListUX3_onload: function() {
        jQuery('.menuChoices_4').addClass('crpPulldown');
    },
    CustomerIdConfirmation_onload: function() {
        jQuery('.tableoverflowwrapper').addClass('confirmTableStyle');
    },

    DeleteNonFinWorkflow_onload: function() {
        jQuery('.stage3_detailspanel').addClass('hideElement');
        jQuery('.stage3_searchpaneldiv').addClass('hideElement');
    },


    DDDeactivateCorpPrintPreferences_onload: function(groupletId) {
        var fgName = "";

        var elementId = 'REMARKS';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            elementId = groupletId + ":" + "FormManagementFG.REMARKS";
        }
        showAndHideRemarksEbanking(groupletId);

    },


    IMDeactivateCorpPrintPreferences_onload: function(groupletId) {
        var fgName = "";

        var elementId = 'REMARKS';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            elementId = groupletId + ":" + "FormManagementFG.REMARKS";
        }
        showAndHideRemarksEbanking(groupletId);

    },


    DeactivateCorpPrintPreferencesForDemandDraft_onload: function() {
            jQuery(document).ready(function() {
                showAndHideRemarks();
            });
        }


        ,



    DeactivateCorpPrintPreferences_onload: function() {
            jQuery(document).ready(function() {
                showAndHideRemarks();
            });
        }


        ,


    NewPayment_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    //newly added for logout overlay left margin for RWD -vinay
    LogOutConfirmationScreen_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NLogOutplugins.js");
    },
    DashboardConsolidatedSummaryWidgetsUX3_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = groupletId + "\^convertCurrency";

            script.src = "scripts/convertCurrency.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/convertCurrency.js");
        }
        jQuery('#' + groupletId).find('select').bind('change', function(event) {
            var target = event.target;
            if (jQuery('#' + groupletId).find(target).length > 0) {
                currentGroupletId = groupletId;
                convertCurrency();
            }
        });
    },
    AccountBalancesSummaryUX3_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "convertCurrency";

            script.src = "scripts/convertCurrency.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/convertCurrency.js");
        }
    },
    DashboardCompleteSummaryWidgetsUX3_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "toggleMenu";
            script.src = "scripts/toggleMenu.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/toggleMenu.js");
        }
        jQuery('#' + groupletId).find("[id='" + groupletId + ":Liabilities']").bind('click', function(event) {
            var liabiilityID = groupletId + ':Liabilities';
            currentGroupletId = groupletId;
            toggleMenu(liabiilityID);
        });
        jQuery('#' + groupletId).find("[id='" + groupletId + ":Assets']").bind('click', function(event) {
            var assetID = groupletId + ':Assets';
            currentGroupletId = groupletId;
            toggleMenu(assetID);
        });
    },

    CorporateApprovalQueueUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            jQuery("[id='" + groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + "SearchPanel_Stage34.SubSectionHeader1']").click(
                function(event) {
                    jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
                    var statusSectionId = "[id='" + groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + "SearchPanel_Stage34.Rb3.C2']";
                    jQuery(statusSectionId).find(".ui-combobox").css("margin-right", "10px");
                    jQuery(statusSectionId).find("[id='" + groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + "Image1']").css("padding-top", "5px");
                    var roleSectionId = "[id='" + groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + "SearchPanel_Stage34.Rb11.C2']";
                    jQuery(roleSectionId).find(".ui-combobox").css("margin-right", "10px");
                    jQuery(roleSectionId).find("[id='" + groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + "Image2']").css("padding-top", "5px");
                }
            );
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SendForRepairPreviewDetailsUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    AddEntryUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            var expandAddnDet = feba.domManipulator.getGroupletSpecificElementValue("IS_ADDN_DETAILS_EXPAND");
            if (expandAddnDet == "Y") {
                jQuery(feba.domManipulator.getGroupletSpecificElement("additionalDetails", groupletId)).trigger('click');
            }
            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    RetailApprovalQueueUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ACOCyberReceiptUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRRetailAccOpenReqDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    BillLodgeShipmentDetails_onload: function(groupletId) {
        jQuery("[id='" + groupletId + ":InputFormWithTab.Re1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Re1']").addClass('formrow_tfin');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Ri1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Ri1']").addClass('formrow_tfin');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Rm1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Rm1']").addClass('formrow_tfin');
    },

    CollectionGeneralDetails_onload: function(groupletId) {
        jQuery("[id='" + groupletId + ":InputFormWithTab.Rm1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Rm1']").addClass('formrow_tfin');
    },

    CollectionParties_onload: function(groupletId) {
        jQuery("[id='" + groupletId + ":InputFormWithTab.Re1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Re1']").addClass('formrow_tfin');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Ri1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputFormWithTab.Ri1']").addClass('formrow_tfin');
    },
    SRCorporateAccOpenReqDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    MaintainCPLinkageUX3_onload: function() {
        /*Fix for ticket-735387
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");*/

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allItemsselected) != "undefined") {
                if (allItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },

    MaintainBillerLinkageUX3_onload: function() {
        /*Fix for ticket-735734
            jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");*/

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allBillerselected) != "undefined") {
                if (allBillerselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allBillerselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
        jQuery(".navSelectedTab").click(function(e) {
            allBillerselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
        jQuery('.css-labelcheckbox').die('click');
        jQuery('.css-labelcheckbox').unbind('click');
        jQuery('.css-labelcheckbox').bind('click', function(event) {
            if (!jQuery(this).siblings().attr('checked')) {
                jQuery(this).siblings().attr('checked', true);
            } else {
                jQuery(this).siblings().attr('checked', false);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });

    },
    FavoriteActivities_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');

            if (typeof(favActAllItemsselected) != "undefined") {

                if (favActAllItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em;height: 24px');
        }

        jQuery(".navAllTab").click(function(e) {
            favActAllItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            favActAllItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },
    FavoriteAccounts_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(favAccAllItemsselected) != "undefined") {

                if (favAccAllItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }


        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em;height: 24px');
        }

        jQuery(".navAllTab").click(function(e) {
            favAccAllItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */

        jQuery(".navSelectedTab").click(function(e) {
            favAccAllItemsselected = 'N';

            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },
    FavoriteAccountsUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');

            if (typeof(favAccAllItemsselected) != "undefined") {

                if (favAccAllItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            favAccAllItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            favAccAllItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },

    AcctGroupMaintAddList_onload: function() {
        /* jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink"); */

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allItemsselected) != "undefined") {
                if (allItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em;height: 24px');
        }

        jQuery(".navAllTab").click(function(e) {
            allItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* issue related to checking during group creation for the 2nd and subsequent time */
        jQuery('.css-labelcheckbox').die('click');
        jQuery('.css-labelcheckbox').unbind('click');
        jQuery('.css-labelcheckbox').bind('click', function(event) {
            if (!jQuery(this).siblings().attr('checked')) {
                jQuery(this).siblings().attr('checked', true);
            } else {
                jQuery(this).siblings().attr('checked', false);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });
    },
    CorpUserReportLinkDelinkListUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allItemsselected) != "undefined") {
                if (allItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }

        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },
    CorpUserMenuOptionsLinkDeLinkUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allMenuItemsselected) != "undefined") {
                if (allMenuItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }

        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allMenuItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allMenuItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },


    IMMarkAsDamagedLinkDeLinkUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allItemsselected) != "undefined") {
                if (allItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');


            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/

            return false;
        });

        /* issue related to checking during group creation for the 2nd and subsequent time */
        jQuery('.css-labelcheckbox').die('click');
        jQuery('.css-labelcheckbox').unbind('click');
        jQuery('.css-labelcheckbox').bind('click', function(event) {
            if (!jQuery(this).siblings().attr('checked')) {
                jQuery(this).siblings().attr('checked', true);
            } else {
                jQuery(this).siblings().attr('checked', false);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });

        jQuery(window).resize(function() {

            var viewWidth = viewport().width;
            if (parseInt(viewWidth) > 639) {
                jQuery(".linkedValTable").attr('style', 'display :block');
                jQuery(".delinkedValTable").attr('style', 'display :block');
            } else {
                jQuery(".delinkedValTable").attr('style', 'display :none');
                jQuery(".linkedValTable").attr('style', 'display :block;');
                jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
                jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

                jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
                jQuery("[title='Selected Items']").addClass('navSelectedTab');
                jQuery("[title='All Items']").removeClass('navAllTab_Active');
                jQuery("[title='All Items']").addClass('navAllTab');

            }
        });

    },

    CorpUserReportLinkDelinkListUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allItemsselected) != "undefined") {
                if (allItemsselected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }

        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allItemsselected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allItemsselected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

    },



    UserAccountAccessAuthorizeUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allUserAccesSelected) != "undefined") {
                if (allUserAccesSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allUserAccesSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allUserAccesSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },

    UserAccountAccessTransactUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allUserAccesTranSelected) != "undefined") {
                if (allUserAccesTranSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allUserAccesTranSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allUserAccesTranSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },


    RoleMaintenanceAddListUX3_onload: function() {

        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allRolesSelected) != "undefined") {
                if (allRolesSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allRolesSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allRolesSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },
    RoleMaintenanceEditListUX3_onload: function() {

        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allRolesEditSelected) != "undefined") {
                if (allRolesEditSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);

                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allRolesEditSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allRolesEditSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },
    SchemeIdLookupListUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allSchemesSelected) != "undefined") {
                if (allSchemesSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);
                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allSchemesSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allSchemesSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },

    SplashPage_onload: function() {
        jQuery('#nTitle').css('display', 'none');
        jQuery('.ui-widget-overlay').css('max-height', '1200px');

    },
    UserRoleMaintenance_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allUserRolesSelected) != "undefined") {
                if (allUserRolesSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);
                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allUserRolesSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allUserRolesSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },
    AcctGroupMaintAddListUX3_onload: function() {
        /* jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink"); */

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allAcctsSelected) != "undefined") {
                if (allAcctsSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);
                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em;height: 24px');
        }

        jQuery(".navAllTab").click(function(e) {
            allAcctsSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allAcctsSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* issue related to checking during group creation for the 2nd and subsequent time */
        jQuery('.css-labelcheckbox').die('click');
        jQuery('.css-labelcheckbox').unbind('click');
        jQuery('.css-labelcheckbox').bind('click', function(event) {
            if (!jQuery(this).siblings().attr('checked')) {
                jQuery(this).siblings().attr('checked', true);
            } else {
                jQuery(this).siblings().attr('checked', false);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });

    },

    FinRuleAccountLookupListUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allFinRuleAccSelected) != "undefined") {
                if (allFinRuleAccSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);
                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allFinRuleAccSelected = 'Y';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allFinRuleAccSelected = 'N';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },

    DivisionInternalAcctLinkageListUX3_onload: function() {
        jQuery(".widformbtn_pagi_go_new").removeClass("widformbtn_pagi_go_new").addClass("widformbtn_pagi_go_linkdelink");

        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px 6px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.69em;margin-right:9px;margin-left:2px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px 6px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.69em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.69em');
            if (typeof(allDivAccSelected) != "undefined") {
                if (allDivAccSelected == 'Y') {
                    setTimeout(function() {
                        jQuery(".navAllTab").trigger('click');
                    }, 200);
                }
            }
        } else {
            jQuery(".widgetFooterleft_new").attr('style', 'padding:0px');
            jQuery(".transactiontxt_new").attr('style', 'font-size:0.62em;margin-right:0px');
            jQuery(".widgetFooterRight_new").attr('style', 'padding:0px');
            jQuery(".widgetpaginationtxt1_new").attr('style', 'font-size:0.62em');
            jQuery(".widpaginationtxtbx_new").attr('style', 'font-size:0.62em');
        }

        jQuery(".navAllTab").click(function(e) {
            allDivAccSelected = 'N';
            jQuery(".linkedValTable").attr('style', 'display :none');
            jQuery(".delinkedValTable").attr('style', 'display :block; width:97%;border:none;padding-right: 0.5%;');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :none');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :block');

            jQuery("[title='All Items']").removeClass('navAllTab');
            jQuery("[title='All Items']").addClass('navAllTab_Active');
            jQuery("[title='Selected Items']").removeClass('navSelectedTab');
            jQuery("[title='Selected Items']").addClass('navSelectedTab_Inactive');

            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /* Link Delink tabs selection */
        jQuery(".navSelectedTab").click(function(e) {
            allDivAccSelected = 'Y';
            jQuery(".delinkedValTable").attr('style', 'display :none');
            jQuery(".linkedValTable").attr('style', 'display :block;border:none');
            jQuery(".navigationLeftButtons_resp").attr('style', 'display :block');
            jQuery(".navigationRightButtons_resp").attr('style', 'display :none');

            jQuery("[title='Selected Items']").removeClass('navSelectedTab_Inactive');
            jQuery("[title='Selected Items']").addClass('navSelectedTab');
            jQuery("[title='All Items']").removeClass('navAllTab_Active');
            jQuery("[title='All Items']").addClass('navAllTab');

            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },


    AlertPrefrenceSetUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicShowAlertFields";

            script.src = "scripts/NdynamicShowAlertFields.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicShowAlertFields.js");
        }

    },
    NewPaymentUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");

        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var fgName = "";

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        /*Aashish added*/
        jQuery(document).delegate(elementId, "change", function() {
            commonCall(fgName);
        });

        /* RWD fix for transaction purpose dropdown width*/
        jQuery("#ui-id-15").css("width", "45%");

        /*		jQuery([id="+elementId+"]).change(function(){
        				commonCall(fgName);
        			});*/


    },
    NewOutwardRemittanceUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");

        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var fgName = "";

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        /*Aashish added*/
        jQuery(document).delegate(elementId, "change", function() {
            commonCall(fgName);
        });

        /* RWD fix for transaction purpose dropdown width*/
        jQuery("#ui-id-15").css("width", "45%");

        /*		jQuery([id="+elementId+"]).change(function(){
        				commonCall(fgName);
        			});
        */
    },
    CounterPartyListUX3_onload: function(groupletId) {
        jQuery(".stage3_tabmenupanel_widoutwidget_topmargin").css("border-bottom", "none");
        jQuery(".stage3_detailspanel").css("border-top", "1px solid #CCC");
    },
    CounterPartyRegistrationUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NTxnssMaxAmtLimit';

            script.src = "scripts/module/txnss/NTxnssMaxAmtLimit.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            /* Added below code to fix collapsible issue during on-load of Add Counter party screen  */
            displayAdditional(groupletId);
        } else {
            feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
        }
    },
    DBTermDepositCalc_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    NewFundsTransfer_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            if (jQuery('.nextGenUX4').find('#' + groupletId).length > 0) {
                jQuery('#' + groupletId + '\\:DownloadPanel_Stage34\\.Ra1').css('display', 'none');
            }
        }

    },
    ApproveSingleEntryPreviewDetailsMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/transaction/ApproveSingleEntryPreviewDetailsMB.js");
    },
    CounterPartyConfirmationDetailsMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/txnss/CounterPartyConfirmationDetailsMB.js");
    },
    ApprovalBillerRegistrationConfirmationDetailsMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/txnss/ApprovalBillerRegistrationConfirmationDetailsMB.js");
    },
    NewFundsTransferUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");

        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        var fgName = "";
        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
        // Added code for placing pinnable icon in correct position
        if (jQuery("#" + groupletId).find(".forPinButton").length > 0) {
            var vpWidth = viewport().width;
            if (parseInt(vpWidth) < 529) {
                var pinnableEle = jQuery(".forPinButton");
                var insertBeforeEle = jQuery(".width79percent_navigationpanel").find(".right").children().children(":first");
                if (pinnableEle.length > 0) {
                    jQuery("<div id='pinnableContent' class='pinnableContent' isTabletViewDetach='N' isDesktopViewDetach='N'></div>").insertBefore(insertBeforeEle);
                    jQuery("#pinnableContent").wrapInner(pinnableEle);
                }
            } else {
                var pinnableEle = jQuery(".forPinButton");
                var insertBeforeEle = jQuery(".width79percent_navigationpanel").find(".right");
                if (pinnableEle.length > 0) {
                    jQuery("<div id='pinnableContent' class='pinnableContent' isTabletViewDetach='N' isDesktopViewDetach='N'></div>").insertBefore(insertBeforeEle);
                    jQuery("#pinnableContent").wrapInner(pinnableEle);
                }
            }
            jQuery(window).resize(function() {
                var vpWidth1 = viewport().width;
                if (parseInt(vpWidth1) < 529) {
                    var pinnableEle;
                    var insertBeforeEle = jQuery(".width79percent_navigationpanel").find(".right").children().children(":first");
                    if (jQuery("#pinnableContent").length > 0 &&
                        (jQuery("#pinnableContent").attr("isTabletViewDetach") === 'N' || jQuery("#pinnableContent").attr("isDesktopViewDetach") === 'Y')) {
                        pinnableEle = jQuery("#pinnableContent").detach();
                        pinnableEle.insertBefore(insertBeforeEle);
                        jQuery("#pinnableContent").attr("isTabletViewDetach", "Y");
                        jQuery("#pinnableContent").attr("isDesktopViewDetach", "N");
                    }
                } else {
                    var pinnableEle;
                    var insertBeforeEle = jQuery(".width79percent_navigationpanel").find(".right");
                    if (jQuery("#pinnableContent").length > 0 &&
                        (jQuery("#pinnableContent").attr("isDesktopViewDetach") === 'N' || jQuery("#pinnableContent").attr("isTabletViewDetach") === 'Y')) {
                        pinnableEle = jQuery("#pinnableContent").detach();
                        pinnableEle.insertBefore(insertBeforeEle);
                        jQuery("#pinnableContent").attr("isTabletViewDetach", "N");
                        jQuery("#pinnableContent").attr("isDesktopViewDetach", "Y");
                    }
                }
            });
        }


    },
    NewFundTransferToOwnAccount_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },

    ChannelUserIdLinkageListUX3_onload: function(groupletId) {

        var script = document.createElement('script');
        script.id = 'id1' + "NFEBAInlineEdit";
        script.src = "scripts/NFEBAInlineEdit.js?groupletId=" + groupletId + ";";
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        jQuery('.stage3_listingpaneldiv').css('border-top', '1px solid #CCCCCC');

        jQuery('.stage3_tabmenupanel').css('border-bottom', 'none');

        jQuery(".HW_formbtn").addClass('registerButtonMargin');
        jQuery("HW_formbtn:hover").addClass('registerButtonMargin');

    },
    CorpChannelUserIdLinkageList_onload: function(groupletId) {

        var script = document.createElement('script');
        script.id = 'id1' + "NFEBAInlineEdit";
        script.src = "scripts/NFEBAInlineEdit.js?groupletId=" + groupletId + ";";
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        jQuery('.stage3_listingpaneldiv').css('border-top', '1px solid #CCCCCC');

        jQuery('.stage3_tabmenupanel').css('border-bottom', 'none');

        jQuery(".HW_formbtn").addClass('registerButtonMargin');
        jQuery("HW_formbtn:hover").addClass('registerButtonMargin');

    },
    RetChannelUserIdLinkageList_onload: function(groupletId) {

        var script = document.createElement('script');
        script.id = 'id1' + "NFEBAInlineEdit";
        script.src = "scripts/NFEBAInlineEdit.js?groupletId=" + groupletId + ";";
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        jQuery('.stage3_listingpaneldiv').css('border-top', '1px solid #CCCCCC');

        jQuery('.stage3_tabmenupanel').css('border-bottom', 'none');

        jQuery(".HW_formbtn").addClass('registerButtonMargin');
        jQuery("HW_formbtn:hover").addClass('registerButtonMargin');
        jQuery('#PageConfigurationMaster_RSSETW__1\\:DataEntry_LeftContainer_Stage39\\.Rb1\\.C1').css('margin-top', '9px');

    },
    InitiateBillPaymentUX3_onload: function(groupletId) { //Added by Salma for SADAD Payments
        feba.domManipulator.loadScript("scripts/module/transaction/ManageBills.js");
        jQuery('table').find('.labelColumn').addClass('tableTextBox');
    },
    BillerListingUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/transaction/ManageBills.js");
        checkMultiSelect('BPSubscriptionsListFG', groupletId);

    },
    BillsListingUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/transaction/ManageBills.js");
        checkMultiSelect('BPPresentedBillsFG', groupletId);

    },
    ViewBillsApprovalQueueRetailUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/transaction/ManageBills.js");
        checkMultiSelect('BillPayEnquiryFG', groupletId);

    },
    ViewBillsApprovalQueueUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/transaction/ManageBills.js");
        checkMultiSelect('BillPayEnquiryFG', groupletId);
    },
    /*Surej RWD added for delete button placement in overlay START*/
    ConfirmDeleteCategoryUX3_onload: function() {
        var floatDirection = "left";
        if (feba.domManipulator.isRTL()) {
            floatDirection = "right";
        }


        jQuery("#CategoryListUX3_STATIC_ACT\\:NavPanel\\.Rowset1").css("float", floatDirection);
    },
    BudgetDeleteUX3_onload: function() {
        var floatDirection = "left";
        if (feba.domManipulator.isRTL()) {
            floatDirection = "right";
        }



        jQuery("#PageConfigurationMaster_PFMBUDW__1\\:NavPanel\\.Rowset1").css("float", floatDirection);
    },
    CashTransactionDeleteUX3_onload: function() {
        var floatDirection = "left";
        if (feba.domManipulator.isRTL()) {
            floatDirection = "right";
        }

        jQuery("#NavPanel\\.Rowset1").css("float", floatDirection);
    },
    /*Surej RWD added for delete button placement in overlay END*/
    BulkTransactionConfirmationSummaryUX3_onload: function() { //Aashish added for RWD bulk payment
        jQuery('.stage3_tabmenupanel').css('border-bottom', 'none');
    },

    InitiateBulkTransactionConfirmationUX3_onload: function() { //Aashish added for RWD bulk payment

        feba.domManipulator.loadScript("scripts/module/transaction/BulkPaymentRemarks.js");
        //	jQuery(window).off('resize');
    },
    InitiateBulkTransactionUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/transaction/NResponsiveTables.js");
        feba.domManipulator.loadScript("scripts/module/transaction/BulkPaymentRemarks.js");
        HideOnLoadRemarks();
        var elementId = 'Image5572546';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            elementId = groupletId + "\\:" + elementId;
        }
        jQuery([id = "+elementId+"]).change(function() {
            displayRemarksBasedOnIcon(value);
        });
        setTimeout(function() { //Aashish added for RWD bulk payment
            jQuery("#" + groupletId + "\\:MessageDisplay_TABLE").addClass("marginTopZero");
            var vpWidth = viewport().width;
            //console.log(vpWidth);
            if (parseInt(vpWidth) <= 900) {
                jQuery('.ui-combobox').css('float', 'none');
            }
            if (parseInt(vpWidth) > 900) {
                var floatDirection = "left";
                if (feba.domManipulator.isRTL()) {
                    floatDirection = "right";
                }

                jQuery('.ui-combobox').css('float', floatDirection);
            }
            console.log("inside workaround settimeout");
        }, 1000);
        jQuery(window).resize(function() {
            var vpWidth = viewport().width;
            //console.log(vpWidth);
            if (parseInt(vpWidth) <= 900) {
                jQuery('.ui-combobox').css('float', 'none');
            }
            if (parseInt(vpWidth) > 900) {
                var floatDirection = "left";
                if (feba.domManipulator.isRTL()) {
                    floatDirection = "right";
                }
                jQuery('.ui-combobox').css('float', floatDirection);
            }
        });
    },
    NewPaymentToPersonalPayee_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });

    },
    /*Aashish added for RWD Start*/
    BuyCarUX3_onload: function(groupletId) {

        var script = document.createElement('script');
        script.id = 'id1' + "InitiateFrequencyTypeCheck";
        script.src = "scripts/module/transaction/InitiateFrequencyTypeCheck.js?groupletId=" + groupletId + ";";
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        //		feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
    },
    CustomGoalUX3_onload: function(groupletId) {
        var script = document.createElement('script');
        script.id = 'id1' + "InitiateFrequencyTypeCheck";
        script.src = "scripts/module/transaction/InitiateFrequencyTypeCheck.js?groupletId=" + groupletId + ";";
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        //		feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
    },
    BuyHouseUX3_onload: function(groupletId) {
        var script = document.createElement('script');
        script.id = 'id1' + "InitiateFrequencyTypeCheck";
        script.src = "scripts/module/transaction/InitiateFrequencyTypeCheck.js?groupletId=" + groupletId + ";";
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        //		feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
    },
    PlanForRetirementUX3_onload: function(groupletId) {
        var script = document.createElement('script');
        script.id = 'id1' + "InitiateFrequencyTypeCheck";
        script.src = "scripts/module/transaction/InitiateFrequencyTypeCheck.js?groupletId=" + groupletId + ";";
        if (document.head) {
            document.head.appendChild(script);
        } else {
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        //		feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
    },
    /*Aashish added for RWD End*/
    NewPaymentToAdhocPayee_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        var fgName = "";
        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);
        });

    },
    NewFundTransferToThirdParty_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var fgName = "";
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }

        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });

    },
    CreditCardPayment_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }

        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);
        });
    },
    InitiateBillPayment_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }

        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });

    },
    LoanAccountPayment_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }


        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });

    },
    PaymentToAdhocBiller_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });

    },
    FundTransferOtherBankAccount_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });

    },
    PaymentToUnregisteredPayee_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);
        });
    },


    TemplatesListUX3_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    CHKDataCapture: function() {
        if (feba.domManipulator.getElement(".widget-content").getNiceScroll() && feba.domManipulator.getElement(".widget-content").getNiceScroll().length > 0) {
            resizeUX3scroll();
        }
    },
    EBPrintingJobs_onload: function(groupletId) {
        setTimeout(function() {
            if (feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0] && feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0].value == "true") {
                setTimeout(function() {
                    jQuery(feba.domManipulator.getGroupletSpecificElement("DOWNLOADPDF", groupletId)).trigger('click');
                }, 1000);
            } else if (feba.domManipulator.getElementById("SHOWWARNINGMSG")[0] && feba.domManipulator.getElementById("SHOWWARNINGMSG")[0].value == "true") {
                var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMSG")[0].value);
                if (retVal == true) {
                    feba.domManipulator.getElementById("PRINT_CONFIRM")[0].click();
                    return true;
                } else {
                    return false;
                }
            }
        }, 1000);
    },

    EBPendingCheques_onload: function(groupletId) {
        setTimeout(function() {
            if (feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0] && feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0].value == "true") {
                setTimeout(function() {
                    jQuery(feba.domManipulator.getGroupletSpecificElement("DOWNLOADPDF", groupletId)).trigger('click');
                }, 1000);
            } else if (feba.domManipulator.getElementById("SHOWWARNINGMSG")[0] && feba.domManipulator.getElementById("SHOWWARNINGMSG")[0].value == "true") {
                var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMSG")[0].value);
                if (retVal == true) {
                    feba.domManipulator.getElementById("PRINT_CONFIRM")[0].click();
                    return true;
                } else {
                    return false;
                }
            }
        }, 1000);
    },

    EBPendingCL_onload: function(groupletId) {
        setTimeout(function() {
            if (feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0] && feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0].value == "true") {
                setTimeout(function() {
                    jQuery(feba.domManipulator.getGroupletSpecificElement("DOWNLOADPDF", groupletId)).trigger('click');
                }, 1000);
            } else if (feba.domManipulator.getElementById("SHOWWARNINGMSG")[0] && feba.domManipulator.getElementById("SHOWWARNINGMSG")[0].value == "true") {
                var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMSG")[0].value);
                if (retVal == true) {
                    feba.domManipulator.getElementById("PRINT_CONFIRM")[0].click();
                    return true;
                } else {
                    return false;
                }
            }
        }, 1000);
    },
    EBPendingWTC_onload: function(groupletId) {
        setTimeout(function() {
            if (feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0] && feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0].value == "true") {
                setTimeout(function() {
                    jQuery(feba.domManipulator.getGroupletSpecificElement("DOWNLOADPDF", groupletId)).trigger('click');
                }, 1000);
            } else if (feba.domManipulator.getElementById("SHOWWARNINGMSG")[0] && feba.domManipulator.getElementById("SHOWWARNINGMSG")[0].value == "true") {
                var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMSG")[0].value);
                if (retVal == true) {
                    feba.domManipulator.getElementById("PRINT_CONFIRM")[0].click();
                    return true;
                } else {
                    return false;
                }
            }
        }, 1000);
    },

    EBCompletedJobs_onload: function(groupletId) {
        setTimeout(function() {
            if (feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0] && feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0].value == "true") {
                setTimeout(function() {
                    jQuery(feba.domManipulator.getGroupletSpecificElement("DOWNLOADPDF", groupletId)).trigger('click');
                }, 1000);
            } else if (feba.domManipulator.getElementById("SHOWWARNINGMSG")[0] && feba.domManipulator.getElementById("SHOWWARNINGMSG")[0].value == "true") {
                var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMSG")[0].value);
                if (retVal == true) {
                    feba.domManipulator.getElementById("PRINT_CONFIRM")[0].click();
                    return true;
                } else {
                    return false;
                }
            }
        }, 1000);
    },

    EBBConfirmPrints_onload: function(groupletId) {
        setTimeout(function() {
            if (feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0] && feba.domManipulator.getElementById("DOWNLOADREQUIRE")[0].value == "true") {
                setTimeout(function() {
                    jQuery(feba.domManipulator.getGroupletSpecificElement("DOWNLOADPDF", groupletId)).trigger('click');
                }, 1000);
            } else if (feba.domManipulator.getElementById("SHOWWARNINGMSG")[0] && feba.domManipulator.getElementById("SHOWWARNINGMSG")[0].value == "true") {
                var retVal = confirm(feba.domManipulator.getElementById("CORPWARNINGMSG")[0].value);
                if (retVal == true) {
                    feba.domManipulator.getElementById("PRINT_CONFIRM")[0].click();
                    return true;
                } else {
                    return false;
                }
            }
        }, 1000);
    },

    PrintingJobs_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    PendingCheques_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    DDPrintingJobs_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    PendingCL_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    DDPendingCL_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    PendingWTC_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    CompletedJobs_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    DDCompletedJobs_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    CQConfirmPrints_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    CRPDDConfirmPrints_onload: function() {
        feba.domManipulator.documentReady(onLoadPrintingJobsPage());
    },
    CRPViewApprovalList_onload: function() {
        feba.domManipulator.documentReady(onLoadCRPViewApprovalListPage());
    },
    CRPViewInvoices_onload: function() {
        feba.domManipulator.documentReady(onLoadCRPViewInvoicesPage);
    },
    PayYourBill_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });

    },
    NewCollection_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    NewCollectionUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },
    NewLoanRedraw_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    NewLoanRedrawUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },
    InitiateSingleEntryPaymentSummary_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    ModifyTransaction_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    ModifyTransactionUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },
    CreateTemplateUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery("[id=" + elementId + "]").change(function() {
            commonCall(fgName);

        });
    },
    CopyTemplateUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery("[id=" + elementId + "]").change(function() {
            commonCall(fgName);

        });
    },
    ModifyTemplateUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }


        commonCall(fgName);
        jQuery("[id=" + elementId + "]").change(function() {
            commonCall(fgName);

        });
    },
    SaveAsTemplateUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }

        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },

    NewPeerToPeerPayment_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    NewPeerToPeerPaymentUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        var fgName = "";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }

        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },
    NewPeerToPeerCollection_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    NewPeerToPeerCollectionUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        var fgName = "";
        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }


        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },
    CopyTransaction_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    CopyTransactionUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        var fgName = "";
        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }


        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },
    AcceptTransaction_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    DeclineTransaction_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    ScheduledTransactionCorp_onload: function() {
        feba.domManipulator.loadScript("scripts/module/transaction/ScheduledTxnsFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.scheduledTxnsFEBACalendar);
    },
    ScheduledTransactionRet_onload: function() {
        feba.domManipulator.loadScript("scripts/module/transaction/ScheduledTxnsFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.scheduledTxnsFEBACalendar);
    },
    OpMiniStatementUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".searchsimpletext_ellipse").ellipsis({
            width: 56
        });
    },
    /*Aashish added for RWD*/
    ClearingInstrumentListUX3_onload: function() {
        jQuery(".stage3_searchpaneldiv").css('margin-top', '-39px');
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".searchsimpletext_ellipse").ellipsis({
            width: 56
        });
    },

    InstrumentCollectionRequestPage_onload: function(groupletId) {

        if (jQuery('#' + groupletId + '\\:MessageDisplay_TABLE').text().length > 0) {
            if (jQuery('#' + groupletId + '\\:MessageDisplay_TABLE').text().indexOf('101185') != -1) {
                jQuery('#' + groupletId + '\\:mbvucountryyfg').css("color", 'red');

            }
        }

    },

    MyCategoriesListUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".queryitalictextwithspace_remarks").ellipsis({
            width: 125
        });
        var vpWidth = viewport().width;
        //console.log(vpWidth);
        if (parseInt(vpWidth) <= 667) {
            jQuery('.stage3_rightwithmargin').find('input[type=submit]').parent().css('margin-top', '2px');
        } else {
            jQuery('.stage3_rightwithmargin').find('input[type=submit]').parent().css('margin-top', '0px');
        }
        jQuery(window).resize(function() {
            var vpWidth = viewport().width;
            //console.log(vpWidth);
            if (parseInt(vpWidth) <= 667) {
                jQuery('.stage3_rightwithmargin').find('input[type=submit]').parent().css('margin-top', '2px');
            } else {
                jQuery('.stage3_rightwithmargin').find('input[type=submit]').parent().css('margin-top', '0px');
            }
        });
    },
    DpTransactionHistoryLst5TxnUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    DpTransactionHistoryUX4_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 110
        });
    },
    LnTransactionHistoryUX4_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 140
        });
    },
    LnTransactionHistoryLst5TxnUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    LnTransactionHistoryLstNTxnUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    LnTransactionHistoryTprUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    AccountSummaryNullViewUX4_onload: function(groupletId) {

        feba.domManipulator.fadeOut(jQuery('#' + groupletId).parents('.widget'), 4000);
    },
    LnTransactionHistoryUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
        jQuery("#PageConfigurationMaster_RLAUX3W__1\\:numberOfPaymentsMadeRCaption").css("padding-left", "4px");
        jQuery("[id='ascrail2000']").attr("style", "display:none");
        jQuery("[id='ascrail2001']").attr("style", "display:none");
        var grpId = "";
        if (groupletId && groupletId != null && groupletId != "null") {
            grpId = groupletId;
            var nextgenCont = jQuery('.nextGenUX4');
            for (i = 0; i < nextgenCont.length; i++) {
                var currCont = nextgenCont[i];
                var currContId = jQuery(currCont).attr('id');
                if (jQuery('#' + currContId).find('#' + groupletId).length > 0) {
                    jQuery('#' + currContId).find('.stage3_tabmenupanel').css('border-left', 'none');
                    break;
                }

            }

        }
    },
    OpTransactionHistoryLst5TxnUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    OpTransactionHistoryLstNTxnUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    OpTransactionHistoryTprUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    OpTransactionHistoryUX3_onload: function(groupletId) {
        console.log("coming here----------");
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery("[id='ascrail2000']").attr("style", "display:none");
        jQuery("[id='ascrail2001']").attr("style", "display:none");

        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
        var grpId = "";
        if (groupletId && groupletId != null && groupletId != "null") {
            grpId = groupletId;
            var nextgenCont = jQuery('.nextGenUX4');
            for (i = 0; i < nextgenCont.length; i++) {
                var currCont = nextgenCont[i];
                var currContId = jQuery(currCont).attr('id');
                if (jQuery('#' + currContId).find('#' + groupletId).length > 0) {
                    jQuery('#' + currContId).find('.stage3_tabmenupanel').css('border-left', 'none');
                    break;
                }

            }

        }
    },
    TransactionHistoryTprUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    TransactionHistoryUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
        jQuery("[id='ascrail2000']").attr("style", "display:none");
        jQuery("[id='ascrail2001']").attr("style", "display:none");
        var grpId = "";
        if (groupletId && groupletId != null && groupletId != "null") {
            grpId = groupletId;
            var nextgenCont = jQuery('.nextGenUX4');
            for (i = 0; i < nextgenCont.length; i++) {
                var currCont = nextgenCont[i];
                var currContId = jQuery(currCont).attr('id');
                if (jQuery('#' + currContId).find('#' + groupletId).length > 0) {
                    jQuery('#' + currContId).find('.stage3_tabmenupanel').css('border-left', 'none');
                    break;
                }

            }

        }
        jQuery("[id$='Caption25017315']").css('margin-left', '5px');
    },
    CCTXNHistoryUX3_onload: function(groupletId) {
        var grpId = "";
        if (groupletId && groupletId != null && groupletId != "null") {
            grpId = groupletId;
            var nextgenCont = jQuery('.nextGenUX4');
            for (i = 0; i < nextgenCont.length; i++) {
                var currCont = nextgenCont[i];
                var currContId = jQuery(currCont).attr('id');
                if (jQuery('#' + currContId).find('#' + groupletId).length > 0) {
                    jQuery('#' + currContId).find('.stage3_tabmenupanel').css('border-left', 'none');
                    break;
                }

            }

        }
    },
    CCTXNHistoryLastNTxnUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 70
        });
    },
    /*Aashish added for RWD*/
    CCUnbilledStatementUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".searchsimpletext_ellipse").ellipsis({
            width: 56
        });
    },
    /*Added for Alerts Subscription*/
    AlrtSubCorpListUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".searchsimpletext_ellipse").ellipsis({
            width: 70
        });
    },
    OpTransactionHistory_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/AcctTxnHistoryFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.acctTxnHistoryFEBACalendar);
    },
    OpTransactionHistoryLstNTxn_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/AcctTxnHistoryFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.acctTxnHistoryFEBACalendar);
    },
    OpTransactionHistoryTpr_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/AcctTxnHistoryFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.acctTxnHistoryFEBACalendar);
    },
    OpAccountSummary_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/AccountSummaryPulldownMenu.js");
        feba.domManipulator.documentReady(feba.useCase.accountSummaryPulldownMenu);
    },
    DirectDebitMandatesListUX3_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {
            jQuery("[id='" + groupletId + ":SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        } else {
            jQuery("[id='SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        }
    },
    DirectDebitMandatesList_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {
            jQuery("[id='" + groupletId + ":SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        } else {
            jQuery("[id='SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        }
    },
    ViewClosedDirectDebitMandates_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {
            jQuery("[id='" + groupletId + ":SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        } else {
            jQuery("[id='SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        }
    },
    ViewClosedDirectDebitMandatesListUX3_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {
            jQuery("[id='" + groupletId + ":SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        } else {
            jQuery("[id='SearchPanel_Stage34']").click(function() {
                jQuery('.collapsible-wrapper').css('overflow-x', 'visible');
            });
        }
    },
    ViewSweepingStructures_onload: function() {
        feba.domManipulator.loadScript("scripts/module/lqmg/LMSweepStructFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.lmSweepStructFEBACalendar);
    },
    ImportLCPaymentTerms_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = 'BankNameLookup';

            script.src = "scripts/module/tfin/BankNameLookup.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/tfin/BankNameLookup.js");
        }

    },
    OBRefreshBalTransactions_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/NOBCopyTextBoxValue.js");
    },
    SweepingStructureModifyChild_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = 'LQMG';

            script.src = "scripts/module/lqmg/LQMG.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/lqmg/LQMG.js");
        }

    },
    SweepingStructureCreateChild_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = 'LQMG';

            script.src = "scripts/module/lqmg/LQMG.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/lqmg/LQMG.js");
        }
    },
    LinkMenuId_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");
    },
    AddCounterparty_onload: function(groupletId) {
        displayAdditional(groupletId);
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    AddCounterParty_onload: function(groupletId) {
        /*Added as fix for tkt 730402*/
        jQuery("#" + groupletId + "\\:PRINT_MANDATE").removeClass('nextGen_HwButton');
        jQuery("#" + groupletId + "\\:PRINT_MANDATE").parent().removeClass('nextGen_HwButton');

    },
    ModifyCounterparty_onload: function(groupletId) {
        displayAdditional(groupletId);
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    CopyCounterparty_onload: function(groupletId) {
        displayAdditional(groupletId);
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    BillerRegistrationUX3_onload: function(groupletId) {
        displayAdditional(groupletId);
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "AutoPayAccount";
            script.src = "scripts/module/transaction/AutoPayAccount.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/transaction/AutoPayAccount.js");
        }
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    UFInformation_onload: function(groupletId) {
        jQuery(".masterGroupeltTitlehideElement").removeClass("masterGroupeltTitlehideElement");
    },
    ManageBillerEditUX3_onload: function(groupletId) {
        displayAdditional(groupletId);
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "AutoPayAccount";

            script.src = "scripts/module/transaction/AutoPayAccount.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/transaction/AutoPayAccount.js");
        }
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    MailViewUX3_onload: function() {
        feba.domManipulator.getElementStartingWith('MailsHomePageUX3_STATIC_MailView').bind('click', function() {
            adjustDivHeight();
        });
        convertComboboxes();
        adjustDivHeight();
        jQuery('.mailview_textarea').removeAttr('maxlength');
        if (jQuery('.centercontainer').find('.error_highlight').length > 0) {
            var floatDirection = "left";
            if (feba.domManipulator.isRTL()) {
                floatDirection = "right";
                jQuery('.centercontainer').find('.error_highlight').attr('style', 'margin-left: 40px;');
                jQuery('.centercontainer').find('.error_highlight').css('float', floatDirection);
            } else {
                jQuery('.error_highlight').attr('style', 'float:left;width:65px;'); /*Aashish changed from 78px*/
                jQuery('#LabelForControl15598565').attr('style', 'float:left;width:65px;padding-right:6px;');
            }
        }

        //      jQuery('#LabelForControl15598565').attr('style','float:left;width:65px;padding-right:6px;');
        /*Aashish added for RWD*/
        jQuery('#MailsHomePageUX3_STATIC_MailListNew').css('height', 'auto');

        /*Surej RWD specific fix for ie in mails delete link position*/
        if (jQuery.browser.msie) {
            jQuery(".deletelinkstyle").css("margin-top", "3px");
        }

    },
    MailCorpCompose_onload: function() {
        jQuery('#LabelForControl20780199').attr('style', 'margin-left:4px;');
        jQuery('.composemsgtxtarea').removeAttr('maxlength');
        var label = document.getElementById('MailCompose_Stage313.Ra4.C2');
        if (label.children[0].className == "simpletext") {
            var removelabel = document.getElementById('MailCompose_Stage313.Ra5.C2');
            removelabel.style.marginLeft = "-7px";
            var rowlabel = document.getElementById('MailCompose_Stage313.Ra4');
            rowlabel.style.display = "none";
        } else {
            var removelabel = document.getElementById('MailCompose_Stage313.Ra5.C2');
            removelabel.style.marginLeft = "95px";
            var addcolor = document.getElementById('linkAttach');
            if (addcolor.disabled) {
                addcolor.style.color = "grey"
            }
        }
        if (feba.domManipulator.isRTL()) {
            jQuery('.mailcontainer').css('width', '98%');
        }
    },
    MailRetailCompose_onload: function() {
        var label = document.getElementById('MailCompose_Stage313.Ra4.C2');
        jQuery('.composemsgtxtarea').removeAttr('maxlength');
        if (label.children[0].className == "simpletext") {
            var removelabel = document.getElementById('MailCompose_Stage313.Ra5.C2');
            removelabel.style.marginLeft = "-7px";
            var rowlabel = document.getElementById('MailCompose_Stage313.Ra4');
            rowlabel.style.display = "none";
        } else {
            var removelabel = document.getElementById('MailCompose_Stage313.Ra5.C2');
            removelabel.style.marginLeft = "95px";
            /*Aashish added for RWD for mail attachment issue start*/
            removelabel.style.width = "95px";
            var removelabel1 = document.getElementById('MailCompose_Stage313.Ra5.C3');
            removelabel1.style.width = "95px";
            /*Aashish added for RWD for mail attachment issue end*/
            var addcolor = document.getElementById('linkAttach');
            if (addcolor.disabled) {
                addcolor.style.color = "grey"
            }
        }
    },
    PasswordAlertsUX3_onload: function(groupletId) {
        if (jQuery("[id='" + groupletId + ":WidgetForm.RWi3']") != null) {
            jQuery("[id='" + groupletId + ":WidgetForm.RWi3']").addClass('borderTopAdded');
        }

    },
    DashboardMailComposeUX3_onload: function() {
        var floatDirection = "right";
        if (feba.domManipulator.isRTL()) {
            floatDirection = "left";
        }
        jQuery(".current_tab_widget").css("float", floatDirection);
        jQuery(".verticalspacing").css("padding-right", "0px");
        //Added for scroll issue in rich text editor
        jQuery("iframe").css("width", "100%");
        jQuery("iframe").css("height", "98px");
        convertComboboxes();
    },
    MailsListUX3_onload: function() {
        //mails subject ellipsis
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".heading_txtmod a").ellipsis({
            width: 100
        });
        convertComboboxes();
        adjustDivHeight();
        if (viewport().width < 640) {
            var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
            jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
            jQuery('#C1').append(teest);
            jQuery('#C1').addClass('positionrelativemsg');
            jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition margintop');
            jQuery('.centercontainer').removeClass('positionrelativemsg');
            jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
        } else {
            var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
            jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
            jQuery('#C1').append(teest);

            jQuery('#C1').removeClass('positionrelativemsg');
            jQuery('.centercontainer').addClass('positionrelativemsg');
            jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition margintop');
            jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
        }

        jQuery(window).resize(function() {
            if (viewport().width < 640) {
                var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
                jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
                jQuery('#C1').append(teest);
                jQuery('#C1').addClass('positionrelativemsg');
                jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition');
                jQuery('.centercontainer').removeClass('positionrelativemsg');
                jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
            } else {
                var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
                jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
                jQuery('#C1').append(teest);
                jQuery('#C1').removeClass('positionrelativemsg');
                jQuery('.centercontainer').addClass('positionrelativemsg');
                jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition');
                jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
            }

        });
        /*Surej rewirtten code for search panel collapse and open START*/

        /** On click of search mails container, search panel should open up. If clicked again, the opened search panel
         * should collapse. The lens image icon should change the color from black to blue in opened state.
         * If user clicks on anywhere outside, the opened search panel should collapse. Propogation should be stopped
         * if user clicks on search panel, as there is another function below for handling "body" click. Both click events should not
         * execute together. */
        //jQuery(".searchicons_mail").unbind('click');
        //jQuery(".searchicons_mail").die('click');
        jQuery(".leftcontainer_Icon").bind('click', function(event) {
            event.preventDefault();
            jQuery(".leftcontainer").slideToggle();
            jQuery(".advance_wrapper").css("display", "none");
            return false;
        });
        //jQuery(".leftcontainer_Icon").unbind('click');
        //jQuery(".leftcontainer_Icon").die('click');
        jQuery(".searchicons_mail").bind('click', function(event) {
            event.preventDefault();
            jQuery(".advance_wrapper").slideToggle();
            jQuery(".leftcontainer").css("display", "none");
            return false;
        });
        jQuery(".search_mails").unbind("click");
        jQuery(".search_mails").die("click");
        jQuery("body").unbind("click");
        jQuery("body").die("click");
        jQuery(".search_mails").bind("click", function(e) {
            console.log("Inside click Function");
            //Check if user click is ON or WITH IN the search mails div element. If so prevent propogating further to the body click event
            if (jQuery(".search_mails").find(e.target).length > 0 || e.target.className == "search_mails") {
                if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
                    if (jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display") == "none") {
                        jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display", "block");
                        jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src", getImagePath() + "/left_arrow_double.png");
                        jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("title", getMessage("Collapse"));
                    } else if (jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display") == "block") {
                        jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display", "none");
                        jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src", getImagePath() + "/right_arrow_double.png");
                        jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("title", getMessage("Expand"));
                    }
                } else {
                    console.log("Inside click Function1");
                    if (jQuery(".advance_wrapper").css("display") == "none") {
                        jQuery(".advance_wrapper").css("display", "block");
                        jQuery(".db_accwid_pluss").attr("src", getImagePath() + "/left_arrow_double.png");
                        jQuery(".db_accwid_pluss").attr("title", getMessage("Collapse"));
                    } else if (jQuery(".advance_wrapper").css("display") == "block") {
                        jQuery(".advance_wrapper").css("display", "none");
                        jQuery(".db_accwid_pluss").attr("src", getImagePath() + "/right_arrow_double.png");
                        jQuery(".db_accwid_pluss").attr("title", getMessage("Expand"));
                    }
                }
                //jQuery( document ).undelegate(".search_mails", "click");
                //jQuery( document ).undelegate("body", "click");
                //e.preventDefault();
                //e.stopImmediatePropagation();
            }
            jQuery("body").bind("click", function(e) {
                //check if user is clicking on Search panel container. If yes, stop propogation and the state should remain same.
                console.log("Inside nHWMailsFunc");
                var isCalendarTarget = false;
                var isIe9AndBelow = false;
                var isIE = navigator.appName.indexOf("Microsoft") != -1;
                if (isIE != null && isIE == true) {
                    var indexOfMSIE = window.navigator.userAgent.indexOf("MSIE ");
                    var ua = window.navigator.userAgent;
                    if (indexOfMSIE > 0) {
                        if (parseInt(ua.substring(indexOfMSIE + 5, ua.indexOf(".", indexOfMSIE))) < 10) {
                            isIe9AndBelow = true;
                        }
                    }
                }
                if (isIe9AndBelow) {
                    if ((e.target.className != null && e.target.className.split(/[ ,]+/).length >= 2) && (e.target.className.split(/[ ,]+/)[1].indexOf("calendars") == 0)) {
                        isCalendarTarget = true;
                    } else if ((e.target.className != null && e.target.className.split(/[ ,]+/).length == 1) && (e.target.className.split(/[ ,]+/)[0].indexOf("calendars") == 0)) {
                        isCalendarTarget = true;
                    } else if (e.target.offsetParent != null && (e.target.offsetParent.className.indexOf("calendars-popup") == 0)) {
                        isCalendarTarget = true;
                    }
                } else {
                    if ((e.target.classList != null && e.target.classList.length >= 2) && (e.target.classList[1].indexOf("calendars") == 0)) {
                        isCalendarTarget = true;
                    } else if ((e.target.classList != null && e.target.classList.length == 1) && (e.target.classList[0].indexOf("calendars") == 0)) {
                        isCalendarTarget = true;
                    } else if (e.target.offsetParent != null && (e.target.offsetParent.className.indexOf("calendars-popup") == 0)) {
                        isCalendarTarget = true;
                    }
                }
                if (jQuery('#MODAL_VIEW_CONTAINER').length > 0) {
                    if (isCalendarTarget == true || jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").find(e.target).length > 0 || e.target.className == "advance_wrapper" ||
                        (jQuery('.search_mails').find(".advance_wrapper").find(e.target).length > 0 || e.target.className == "search_mails")) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    } else {
                        if (jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display") == "block") {
                            jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("src", getImagePath() + "/right_arrow_double.png");
                            jQuery('#MODAL_VIEW_CONTAINER').find(".db_accwid_pluss").attr("title", getMessage("Expand"));
                            jQuery('#MODAL_VIEW_CONTAINER').find(".advance_wrapper").css("display", "none");
                        }
                    }
                } else {
                    if (isCalendarTarget == true || jQuery(".advance_wrapper").find(e.target).length > 0 || e.target.className == "advance_wrapper" ||
                        (jQuery(".search_mails").find(e.target).length > 0 || e.target.className == "search_mails")) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    } else {
                        if (jQuery(".advance_wrapper").css("display") == "block") {
                            jQuery(".db_accwid_pluss").attr("src", getImagePath() + "/right_arrow_double.png");
                            jQuery(".db_accwid_pluss").attr("title", getMessage("Expand"));
                            jQuery(".advance_wrapper").css("display", "none");
                        }
                    }
                }

            });
        });
    },
    EmptyMailViewUX3_onload: function() {
        //adjustEmptyDivHeight();//function not defined anywhere..giving error on page load
        if (viewport().width < 640) {
            var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
            jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
            jQuery('#C1').append(teest);
            jQuery('#C1').addClass('positionrelativemsg');
            jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition margintop');
            jQuery('.centercontainer').removeClass('positionrelativemsg');
            jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
        } else {
            var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
            jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
            jQuery('#C1').append(teest);

            jQuery('#C1').removeClass('positionrelativemsg');
            jQuery('.centercontainer').addClass('positionrelativemsg');
            jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition margintop');
            jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
        }

        jQuery(window).resize(function() {
            if (viewport().width < 640) {
                var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
                jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
                jQuery('#C1').append(teest);
                jQuery('#C1').addClass('positionrelativemsg');
                jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition');
                jQuery('.centercontainer').removeClass('positionrelativemsg');
                jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
            } else {
                var teest = jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').detach();
                jQuery('#C1').find('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').remove();
                jQuery('#C1').append(teest);
                jQuery('#C1').removeClass('positionrelativemsg');
                jQuery('.centercontainer').addClass('positionrelativemsg');
                jQuery('#MailsHomeCorp_STATIC_MailListNew_pinnableWrapper').addClass('positionabsolutemsg bottomposition');
                jQuery('#MailsHomeCorp_STATIC_MailListNew\\:Messagetype_Container_Stage35\\.Ra1').css('margin-left', '30px');
            }

        });
    },
    QuickLinkWidgetUX3_onload: function() {
        convertComboboxes();
        var flgId = 'FavouritesFG.FVT_FLG';

        var flg = document.getElementById(flgId).value;

        //jQuery('.IWantToLinks').next().toggle();
        jQuery('.FavoriteLinks').next().toggle();
        jQuery('#CESMALL1 .widget-content').addClass('favWidHeight');

        //   jQuery('[id$="IWantToLabelC1"]').bind('click mouseover mouseout',function(){

        /* jQuery('[id$="IWantToLabelC1"]').click(function(){

              jQuery('.FavoriteLinks').next().hide();

              jQuery('#CESMALL1 .widget-content').removeClass('favWidHeight');

              jQuery('.IWantToLinks').next().toggle();

              if(jQuery('.IWantToLinks').next().is(':visible')){

                   jQuery('#CESMALL1 .widget-content').addClass('favWidHeight');

              }

         });*/



        //   jQuery('[id$="FavoritesLabelC1"]').bind('click mouseover mouseout',function(){

        /*  jQuery('[id$="FavoritesLabelC1"]').click(function(){

               jQuery('.IWantToLinks').next().hide();

               jQuery('#CESMALL1 .widget-content').removeClass('favWidHeight');

               jQuery('.FavoriteLinks').next().toggle();

               if(jQuery('.FavoriteLinks').next().is(':visible')){

                    jQuery('#CESMALL1 .widget-content').addClass('favWidHeight');

               }

          });*/

        showHideFvtLink(flg);
    },
    CustomDashQuickLinkWidgetUX3_onload: function() {
        convertComboboxes();
        var flgId = 'CustomDashFavouritesFG.FVT_FLG';

        var flg = document.getElementById(flgId).value;

        jQuery('.FavoriteLinks').next().toggle();
        jQuery('#C1 .widget-content').addClass('favWidHeight');


    },

    ViewDocumentsUX3_onload: function() {
        convertComboboxes();
    },
    CashTransactionUpdateUX3_onload: function() {
        populateTransactionType();
        populateWarning();
    },
    CBDTNonTDSInitiatePayment_onload: function(groupletId) {
        jQuery("[id$='PAYER_REFERENCE_NO_TYPE']").parent().hide();
        jQuery("[id$='STATE']").parent().hide();
    },
    CBECExciseDutyPaymentScreen_onload: function(groupletId) {

        jQuery("[id$='STATE']").parent().hide();

    },
    CorpSnapShotUX3_onload: function(groupletId) {

        jQuery("[id$='CorpSnapShotUX3_STATIC_WD1_Menu']").parent().hide();
        jQuery("[id$='CorpSnapShotUX3_STATIC_WD2_Menu']").parent().hide();
        jQuery("[id$='CorpSnapShotUX3_STATIC_WD3_Menu']").parent().hide();
        jQuery("[id$='CorpSnapShotUX3_STATIC_WD4_Menu']").parent().hide();
        jQuery("[id$='CorpSnapShotUX3_STATIC_WD5_Menu']").parent().hide();
        setTimeout(
            function() {
                jQuery('.ui-sortable').sortable("disable");
            }, 150);
        jQuery('#HREF_help').attr('style', 'display: inline;');

    },
    FinRuleAddUX3_onload: function(groupletId) {
        jQuery('.HW_formbtn_grey').addClass('HW_formbtn');
    },
    UserAccessListUX3_onload: function(groupletId) {
        jQuery('.hasPulldownMenu').css('font-size', '1em');
    },
    ContextualLinksWidget_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery('.stage3_menuIdTextlink li a').css('overflow', 'hidden');
        var targetDivId = "";

        if (groupletId || groupletId != null || groupletId != "null") {
            targetDivId = "ParentDiv_" + groupletId;
        }

        if (jQuery('#' + targetDivId).parent().hasClass('container-nxtGenxtrasmall')) {

            jQuery('.stage3_menuIdTextlink li a').ellipsis({
                width: 226
            });
            convertComboboxes();

            jQuery(window).resize(function() {
                var vpWidth = viewport().width;
                //console.log(vpWidth);
                if (parseInt(vpWidth) <= 900) {
                    jQuery('.stage3_menuIdTextlink li a').ellipsis({
                        width: 226
                    });
                } else {
                    jQuery('.stage3_menuIdTextlink li a').ellipsis({
                        width: 226
                    });
                }

            });
        } else {
            jQuery('.stage3_menuIdTextlink li a').ellipsis({
                width: 193
            });
            convertComboboxes();
            jQuery(window).resize(function() {
                var vpWidth = viewport().width;
                //console.log(vpWidth);
                if (parseInt(vpWidth) <= 900) {
                    //console.log("inside first if for width less than 732");
                    jQuery('.stage3_menuIdTextlink li a').ellipsis({
                        width: 226
                    });
                } else {

                    jQuery('.stage3_menuIdTextlink li a').ellipsis({
                        width: 186
                    });
                }



            });
        }
    },
    FundTheGoal_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateFrequencyTypeCheck.js");
        feba.domManipulator.loadScript("scripts/module/transaction/InitiateCounterpartyTypeCheck.js");
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        var fgName = "";
        feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
        var elementId = 'TranRequestManagerFG\\.MULTI_SELECT_VAL';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            fgName = groupletId + Constants.GROUPLET_ELEMENT_SEPERATOR + feba.js.transaction.getGroupletFgName(groupletId);
            elementId = groupletId + "\\:" + elementId;
        } else {
            fgName = feba.js.transaction.getFgName();
        }
        commonCall(fgName);
        jQuery([id = "+elementId+"]).change(function() {
            commonCall(fgName);

        });
    },

    DashboardMailViewInboxUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 639) {
            jQuery(".ellipsis").ellipsis({
                width: 480
            });
        } else {
            jQuery(".ellipsis").ellipsis({
                width: 280
            });
        }

        jQuery(window).resize(function() {
            var vpWidth = viewport().width;
            if (parseInt(vpWidth) <= 639) {
                jQuery(".ellipsis").ellipsis({
                    width: 480
                });
            } else {
                jQuery(".ellipsis").ellipsis({
                    width: 280
                });
            }


        });
    },
    CalendarWidgetUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");

        /* Browser specifixc fix for safari as calendar widget is getting distorted
         * at lower resolution range */
        var vpWidth = viewport().width;
        if (jQuery.browser.safari && vpWidth < 640) {
            jQuery(".febacal-container-div .feba-cal-container-table-wrapper").css("width", "281px");
        }
        jQuery(window).resize(function() {
            vpWidth = viewport().width;
            if (jQuery.browser.safari && vpWidth < 640) {
                jQuery(".febacal-container-div .feba-cal-container-table-wrapper").css("width", "281px");
            } else {
                jQuery(".febacal-container-div .feba-cal-container-table-wrapper").removeAttr("style");
            }
        });

    },

    DashBoardMailViewUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".ellipsis").ellipsis({
            width: 250
        });
        handleAttachmentsOnLoad(".rowwithheight", groupletId);
    },
    DashboardMailAttachmentUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/ria/visualeffects/jquery.filestyle.js");
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery("input[type=file]").filestyle({
            image: imagePath + "/db_icons_browse_attach.png",
            imageheight: 12,
            imagewidth: 12,
            width: 140
        });
        jQuery(".ellipsis").ellipsis({
            width: 120
        });

    },

    MailAttachmentUX3_onload: function() {
        jQuery('.formbtn_last').css('padding-top', '4px');
    },
    RetailUserDashboard_onload: function() {

        //This function is for WidgetBar of Dashboard
        //'maxLinkedWidgetsLimit' is defined in PageMarguetag.java
        if (!console) console = {
            log: function() {}
        };

        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");

        if (document.createStyleSheet) {
            document.createStyleSheet("L001/consumer/theme/jcarousel_styles.css");
        } else {
            feba.domManipulator.getElement('head').append('<link rel="stylesheet" href="L001/consumer/theme/jcarousel_styles.css" type="text/css" />');
        }
        if ("undefined" !== typeof(maxLinkedWidgetsLimit)) {
            setTimeout(function() {
                feba.domManipulator.getElementById("widgetListParent").jcarousel({
                    heightWhenHidden: 58,
                    loadHidden: false,
                    vertical: true,
                    size: maxLinkedWidgetsLimit,
                    scroll: 1,
                    itemFallbackDimension: 300,
                    initCallback: function() {
                        jQuery(".jcarousel-item a img").css({
                            'visibility': 'visible'
                        });
                    }
                });
            }, 0);
        }

        /* Widget Bar drag in drag out start*/
        var widgetBarOpenCloseFlag = 1;
        setTimeout(function() {
            feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
        }, 0);
        feba.domManipulator.getElementById("widgetBar_pullbtn").click(function() {
            if (widgetBarOpenCloseFlag == 2) {
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_close');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_open');
                widgetBarOpenCloseFlag = 1;
                feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
                feba.domManipulator.getElement('.jcarousel-skin-tango').addClass('hideElement');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("ExpandWidgetBar"));

                return;
            }
            if (widgetBarOpenCloseFlag == 1) {
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_close');
                widgetBarOpenCloseFlag = 2;
                feba.domManipulator.getElement('.jcarousel-skin-tango').show();
                feba.domManipulator.getElement('.hideElement').removeClass('hideElement');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn_reverse.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("CollapseWidgetBar"));
                jQuery('.jcarousel-prev').attr('title', getMessage("ScrollUp"));
                jQuery('.jcarousel-next').attr('title', getMessage("ScrollDown"));
                return;
            }

        });

        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentParametersForDashboard.js");
        initDashboardParams();
        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentFunctionsForDashboard.js");
        for (var i = 0; i < containerParametersObjectArray.length; i++) {
            reDistribute(containerParametersObjectArray[i]);
        }
        /* End */

        //associate function on browser resize
        jQuery(window).resize(function() {
            //Print current window width for testing
            var viewPortWidth = jQuery('.wrapper').width();
            //Modify current total width to current width
            containerTotalRowWidthMap.get('febaContainer').totalRowWidth = viewPortWidth;
            //Trigger autoalign function
            for (var i = 0; i < containerParametersObjectArray.length; i++) {
                reDistribute(containerParametersObjectArray[i]);
            }
        });

    },
    RetailUserDashboardUX3_onload: function() {
        jQuery(".groupletButtons-menu").removeAttr('title');
        if (!console) console = {
            log: function() {}
        };
        //This function is for WidgetBar of Dashboard
        //'maxLinkedWidgetsLimit' is defined in PageMarguetag.java
        feba.domManipulator.documentReady(addsUX3scroll);
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");

        if (document.createStyleSheet) {
            document.createStyleSheet("L001/consumer/theme/jcarousel_styles.css");
        } else {
            feba.domManipulator.getElement('head').append('<link rel="stylesheet" href="L001/consumer/theme/jcarousel_styles.css" type="text/css" />');
        }
        if ("undefined" !== typeof(maxLinkedWidgetsLimit)) {
            setTimeout(function() {
                feba.domManipulator.getElementById("widgetListParent").jcarousel({
                    heightWhenHidden: 58,
                    loadHidden: false,
                    vertical: true,
                    size: maxLinkedWidgetsLimit,
                    scroll: 1,
                    itemFallbackDimension: 300,
                    initCallback: function() {
                        jQuery(".jcarousel-item a img").css({
                            'visibility': 'visible'
                        });
                    }
                });

            }, 0);
        }


        /* Widget Bar drag in drag out start*/
        var widgetBarOpenCloseFlag = 1;
        setTimeout(function() {
            feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
        }, 0);
        feba.domManipulator.getElementById("widgetBar_pullbtn").click(function() {
            if (widgetBarOpenCloseFlag == 2) {
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_close');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_open');
                widgetBarOpenCloseFlag = 1;
                feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
                feba.domManipulator.getElement('.jcarousel-skin-tango').addClass('hideElement');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("ExpandWidgetBar"));

                return;
            }
            if (widgetBarOpenCloseFlag == 1) {
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_close');
                widgetBarOpenCloseFlag = 2;
                feba.domManipulator.getElement('.jcarousel-skin-tango').show();
                feba.domManipulator.getElement('.hideElement').removeClass('hideElement');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn_reverse.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("CollapseWidgetBar"));
                jQuery('.jcarousel-prev').attr('title', getMessage("ScrollUp"));
                jQuery('.jcarousel-next').attr('title', getMessage("ScrollDown"));
                return;
            }

        });

        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentParametersForDashboard.js");
        initDashboardParams();
        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentFunctionsForDashboard.js");
        for (var i = 0; i < containerParametersObjectArray.length; i++) {
            reDistribute(containerParametersObjectArray[i]);
        }
        viewPortOneExecuted = "N";
        viewPortTwoExecuted = "N";
        viewPortThreeExecuted = "N";
        viewPortFourExecuted = "N";

        /* End */
        //associate function on browser resize
        jQuery(window).resize(function() {
            //Print current window width for testing
            var viewPortWidth = jQuery('.wrapper').width();
            //Modify current total width to current width
            //containerTotalRowWidthMap.get('febaContainer').totalRowWidth=viewport().width;
            containerTotalRowWidthMap.get('febaContainer').totalRowWidth = viewPortWidth;
            //Trigger autoalign function
            /**RAVIRAJ START**/

            var windowWidth = viewport().width; /*Query(window).width();*/
            if (parseInt(windowWidth) < 900 && parseInt(windowWidth) > 639) {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length == 1) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currContainer).css('width', '100%');
                        if (jQuery(currChild).hasClass('widget-small')) {
                            jQuery(currChild).css('width', '48%');
                        } else {
                            jQuery(currChild).css('width', '100%');

                        }

                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    } else if (currContainerChildren.length == 2) {
                        /* var currChild=jQuery(currContainer).children('.widget')[0];
                                                 	jQuery(currContainer).css('width','100%');
	                                                if(jQuery(currChild).hasClass('widget-small')){
	                                                 	jQuery(currChild).css('width','48%');
	                                                 }else{
	                                                 	jQuery(currChild).css('width','100%');
	                                                 }
                                                 	currChild=jQuery(currContainer).children('.widget')[1];
	                                                 if(jQuery(currChild).hasClass('widget-small')){
	                                                 	jQuery(currChild).css('width','48%');
	                                                 } */
                        var currChildSmall = jQuery(currContainer).children('.widget-small');
                        if (currChildSmall.length == 2) {
                            var currChildSmall = jQuery(currContainer).children('.widget-small')[0];
                            jQuery(currChildSmall).css('width', '48%');
                            currChildSmall = jQuery(currContainer).children('.widget-small')[1];
                            jQuery(currChildSmall).css('width', '48%');
                        } else {
                            var currMediumChild = jQuery(currContainer).children('.widget-medium');
                            jQuery(currMediumChild).css('width', '63%');
                            var currSmallChild = jQuery(currContainer).children('.widget-small');
                            jQuery(currSmallChild).css('width', '32%');
                        }
                        jQuery(containersOnPage[i]).css('width', '100%');
                    }
                }
            } else if (parseInt(windowWidth) < 640 && parseInt(windowWidth) > 479) {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length == 1) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    } else if (currContainerChildren.length == 2) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        currChild = jQuery(currContainer).children('.widget')[1];
                        jQuery(currChild).css('width', '100%');
                    }
                }
            } else if (parseInt(windowWidth) < 480) {
                //      alert('2==below 480');
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length == 1) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    } else if (currContainerChildren.length == 2) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        currChild = jQuery(currContainer).children('.widget')[1];
                        jQuery(currChild).css('width', '100%');
                    }
                }
            } else if (parseInt(windowWidth) > 1000) {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length > 0) {
                        var children = jQuery(currContainer).children('.widget');
                        for (w = 0; w < children.length; w++) {
                            var currChildElementWidget = children[w];

                            jQuery(currChildElementWidget).attr('style', '');
                        }

                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    }

                }
            } else {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length == 1) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    } else if (currContainerChildren.length == 2) {
                        var currChildSmall = jQuery(currContainer).children('.widget-small');
                        if (currChildSmall.length == 2) {
                            var currChildSmall = jQuery(currContainer).children('.widget-small')[0];
                            jQuery(currChildSmall).css('width', '48%');
                            currChildSmall = jQuery(currContainer).children('.widget-small')[1];
                            jQuery(currChildSmall).css('width', '48%');
                        } else {
                            var currMediumChild = jQuery(currContainer).children('.widget-medium');
                            jQuery(currMediumChild).css('width', '63%');
                            var currSmallChild = jQuery(currContainer).children('.widget-small');
                            jQuery(currSmallChild).css('width', '32%');
                            jQuery(containersOnPage[i]).css('width', '100%');
                        }


                    }
                }

            }


            /**RAVIRAJ END**/
            var triggerRed = "Y";
            currViewPort = parseInt(viewport().width);
            if (currViewPort > 900 && viewPortOneExecuted == "N") {
                viewPortTwoExecuted = "N";
                viewPortOneExecuted = "Y";
                viewPortThreeExecuted = "N";
                viewPortFourExecuted = "N";
                for (var i = 0; i < containerParametersObjectArray.length; i++) {
                    reDistribute(containerParametersObjectArray[i]);
                }
            } else if (currViewPort < 900 && currViewPort > 639 && viewPortTwoExecuted == "N") {
                viewPortTwoExecuted = "Y";
                viewPortOneExecuted = "N";
                viewPortThreeExecuted = "N";
                viewPortFourExecuted = "N";
                for (var i = 0; i < containerParametersObjectArray.length; i++) {
                    reDistribute(containerParametersObjectArray[i]);
                }
            } else if (currViewPort < 640 && currViewPort > 479 && viewPortThreeExecuted == "N") {
                viewPortTwoExecuted = "N";
                viewPortOneExecuted = "N";
                viewPortThreeExecuted = "Y";
                viewPortFourExecuted = "N";
                for (var i = 0; i < containerParametersObjectArray.length; i++) {
                    reDistribute(containerParametersObjectArray[i]);
                }
            }

        });

    },
    CorporateUserDashboardUX3_onload: function() {
        jQuery(".groupletButtons-menu").removeAttr('title');
        if (!console) console = {
            log: function() {}
        };
        feba.domManipulator.documentReady(addsUX3scroll);
        //This function is for WidgetBar of Dashboard
        //'maxLinkedWidgetsLimit' is defined in PageMarguetag.java

        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");

        if (document.createStyleSheet) {
            document.createStyleSheet("L001/consumer/theme/jcarousel_styles.css");
        } else {
            feba.domManipulator.getElement('head').append('<link rel="stylesheet" href="L001/consumer/theme/jcarousel_styles.css" type="text/css" />');
        }
        if ("undefined" !== typeof(maxLinkedWidgetsLimit)) {
            setTimeout(function() {
                feba.domManipulator.getElementById("widgetListParent").jcarousel({
                    heightWhenHidden: 58,
                    loadHidden: false,
                    vertical: true,
                    size: maxLinkedWidgetsLimit,
                    scroll: 1,
                    itemFallbackDimension: 300,
                    initCallback: function() {
                        jQuery(".jcarousel-item a img").css({
                            'visibility': 'visible'
                        });
                    }
                });

            }, 0);
        }

        /* Widget Bar drag in drag out start*/
        var widgetBarOpenCloseFlag = 1;
        setTimeout(function() {
            feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
        }, 0);
        feba.domManipulator.getElementById("widgetBar_pullbtn").click(function() {
            if (widgetBarOpenCloseFlag == 2) {
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_close');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_open');
                widgetBarOpenCloseFlag = 1;
                feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
                feba.domManipulator.getElement('.jcarousel-skin-tango').addClass('hideElement');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("ExpandWidgetBar"));
                return;
            }
            if (widgetBarOpenCloseFlag == 1) {
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_close');
                widgetBarOpenCloseFlag = 2;
                feba.domManipulator.getElement('.jcarousel-skin-tango').show();
                feba.domManipulator.getElement('.hideElement').removeClass('hideElement');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn_reverse.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("CollapseWidgetBar"));
                jQuery('.jcarousel-prev').attr('title', getMessage("ScrollUp"));
                jQuery('.jcarousel-next').attr('title', getMessage("ScrollDown"));
                return;
            }

        });

        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentParametersForDashboard.js");
        initDashboardParams();
        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentFunctionsForDashboard.js");
        for (var i = 0; i < containerParametersObjectArray.length; i++) {
            reDistribute(containerParametersObjectArray[i]);
        }
        /* End */
        viewPortOneExecuted = "N";
        viewPortTwoExecuted = "N";
        viewPortThreeExecuted = "N";
        viewPortFourExecuted = "N";
        //associate function on browser resize
        jQuery(window).resize(function() {
            //Print current window width for testing
            var viewPortWidth = jQuery('.wrapper').width();
            //Modify current total width to current width
            //containerTotalRowWidthMap.get('febaContainer').totalRowWidth=viewport().width;
            containerTotalRowWidthMap.get('febaContainer').totalRowWidth = viewPortWidth;
            //Trigger autoalign function
            /**RAVIRAJ START**/

            var windowWidth = viewport().width; /*Query(window).width();*/
            if (parseInt(windowWidth) < 900 && parseInt(windowWidth) > 639) {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length == 1) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currContainer).css('width', '100%');
                        if (jQuery(currChild).hasClass('widget-small')) {
                            jQuery(currChild).css('width', '48%');
                        } else {
                            jQuery(currChild).css('width', '100%');

                        }

                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    } else if (currContainerChildren.length == 2) {
                        /* var currChild=jQuery(currContainer).children('.widget')[0];
                                                 	jQuery(currContainer).css('width','100%');
	                                                if(jQuery(currChild).hasClass('widget-small')){
	                                                 	jQuery(currChild).css('width','48%');
	                                                 }else{
	                                                 	jQuery(currChild).css('width','100%');
	                                                 }
                                                 	currChild=jQuery(currContainer).children('.widget')[1];
	                                                 if(jQuery(currChild).hasClass('widget-small')){
	                                                 	jQuery(currChild).css('width','48%');
	                                                 } */
                        var currChildSmall = jQuery(currContainer).children('.widget-small');
                        if (currChildSmall.length == 2) {
                            var currChildSmall = jQuery(currContainer).children('.widget-small')[0];
                            jQuery(currChildSmall).css('width', '48%');
                            currChildSmall = jQuery(currContainer).children('.widget-small')[1];
                            jQuery(currChildSmall).css('width', '48%');
                        } else {
                            var currMediumChild = jQuery(currContainer).children('.widget-medium');
                            jQuery(currMediumChild).css('width', '63%');
                            var currSmallChild = jQuery(currContainer).children('.widget-small');
                            jQuery(currSmallChild).css('width', '32%');
                            jQuery(containersOnPage[i]).css('width', '100%');
                        }
                    }
                }
            } else if (parseInt(windowWidth) < 640 && parseInt(windowWidth) > 479) {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length == 1) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    } else if (currContainerChildren.length == 2) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        currChild = jQuery(currContainer).children('.widget')[1];
                        jQuery(currChild).css('width', '100%');
                    }
                }
            } else if (parseInt(windowWidth) > 1000) {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length > 0) {
                        var children = jQuery(currContainer).children('.widget');
                        for (w = 0; w < children.length; w++) {
                            var currChildElementWidget = children[w];

                            jQuery(currChildElementWidget).attr('style', '');
                        }

                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    }

                }
            } else {
                var containersOnPage = jQuery('.febaContainer');
                for (i = 0; i < containersOnPage.length; i++) {
                    var currContainer = containersOnPage[i];
                    var currContainerChildren = jQuery(currContainer).children('.widget');
                    if (currContainerChildren.length == 1) {
                        var currChild = jQuery(currContainer).children('.widget')[0];
                        jQuery(currChild).css('width', '100%');
                        jQuery(currContainer).css('width', '100%');
                        //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
                    } else if (currContainerChildren.length == 2) {
                        var currChildSmall = jQuery(currContainer).children('.widget-small');
                        if (currChildSmall.length == 2) {
                            var currChildSmall = jQuery(currContainer).children('.widget-small')[0];
                            jQuery(currChildSmall).css('width', '48%');
                            currChildSmall = jQuery(currContainer).children('.widget-small')[1];
                            jQuery(currChildSmall).css('width', '48%');
                        } else {
                            var currMediumChild = jQuery(currContainer).children('.widget-medium');
                            jQuery(currMediumChild).css('width', '63%');
                            var currSmallChild = jQuery(currContainer).children('.widget-small');
                            jQuery(currSmallChild).css('width', '32%');
                            jQuery(containersOnPage[i]).css('width', '100%');
                        }


                    }
                }

            }


            /**RAVIRAJ END**/
            var triggerRed = "Y";
            currViewPort = parseInt(viewport().width);
            if (currViewPort > 900 && viewPortOneExecuted == "N") {
                viewPortTwoExecuted = "N";
                viewPortOneExecuted = "Y";
                viewPortThreeExecuted = "N";
                viewPortFourExecuted = "N";
                for (var i = 0; i < containerParametersObjectArray.length; i++) {
                    reDistribute(containerParametersObjectArray[i]);
                }
            } else if (currViewPort < 900 && currViewPort > 639 && viewPortTwoExecuted == "N") {
                viewPortTwoExecuted = "Y";
                viewPortOneExecuted = "N";
                viewPortThreeExecuted = "N";
                viewPortFourExecuted = "N";
                for (var i = 0; i < containerParametersObjectArray.length; i++) {
                    reDistribute(containerParametersObjectArray[i]);
                }
            } else if (currViewPort < 640 && currViewPort > 479 && viewPortThreeExecuted == "N") {
                viewPortTwoExecuted = "N";
                viewPortOneExecuted = "N";
                viewPortThreeExecuted = "Y";
                viewPortFourExecuted = "N";
                for (var i = 0; i < containerParametersObjectArray.length; i++) {
                    reDistribute(containerParametersObjectArray[i]);
                }
            }

        });

    },
    CorporateUserDashboard_onload: function() {

        //This function is for WidgetBar of Dashboard
        //'maxLinkedWidgetsLimit' is defined in PageMarguetag.java
        if (!console) console = {
            log: function() {}
        };
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");

        if (document.createStyleSheet) {
            document.createStyleSheet("L001/consumer/theme/jcarousel_styles.css");
        } else {
            feba.domManipulator.getElement('head').append('<link rel="stylesheet" href="L001/consumer/theme/jcarousel_styles.css" type="text/css" />');
        }
        if ("undefined" !== typeof(maxLinkedWidgetsLimit)) {
            setTimeout(function() {
                feba.domManipulator.getElementById("widgetListParent").jcarousel({
                    heightWhenHidden: 58,
                    loadHidden: false,
                    vertical: true,
                    size: maxLinkedWidgetsLimit,
                    scroll: 1,
                    itemFallbackDimension: 300,
                    initCallback: function() {
                        jQuery(".jcarousel-item a img").css({
                            'visibility': 'visible'
                        });
                    }
                });

            }, 0);
        }

        /* Widget Bar drag in drag out start*/
        var widgetBarOpenCloseFlag = 1;
        setTimeout(function() {
            feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
        }, 0);
        feba.domManipulator.getElementById("widgetBar_pullbtn").click(function() {
            if (widgetBarOpenCloseFlag == 2) {
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_close');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_open');
                widgetBarOpenCloseFlag = 1;
                feba.domManipulator.getElement('.jcarousel-skin-tango').hide();
                feba.domManipulator.getElement('.jcarousel-skin-tango').addClass('hideElement');

                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("ExpandWidgetBar"));

                return;
            }
            if (widgetBarOpenCloseFlag == 1) {
                feba.domManipulator.getElementById('widgetBar_outer').removeClass('widgetBar_outer_close');
                feba.domManipulator.getElementById('widgetBar_outer').addClass('widgetBar_outer_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').addClass('widgetBar_pullbtn_open');
                feba.domManipulator.getElementById('widgetBar_pullbtn').removeClass('widgetBar_pullbtn_close');
                widgetBarOpenCloseFlag = 2;
                feba.domManipulator.getElement('.jcarousel-skin-tango').show();
                feba.domManipulator.getElement('.hideElement').removeClass('hideElement');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('src', imagePath + '/widgetBar_btn_reverse.png');
                feba.domManipulator.getElement('.widgetBar_btn_span').attr('title', getMessage("CollapseWidgetBar"));
                jQuery('.jcarousel-prev').attr('title', getMessage("ScrollUp"));
                jQuery('.jcarousel-next').attr('title', getMessage("ScrollDown"));
                return;
            }

        });
        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentParametersForDashboard.js");
        initDashboardParams();
        feba.domManipulator.loadScript("scripts/module/user/WidgetAlignmentFunctionsForDashboard.js");
        for (var i = 0; i < containerParametersObjectArray.length; i++) {
            reDistribute(containerParametersObjectArray[i]);
        }

        /* End */

    },
    FinanceOverviewHomePageUX3_onload: function(groupletId) {
        var elementId = 'CATEGORY_WISE_LIST';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            elementId = groupletId + ":" + elementId;
        }
        document.getElementById(elementId).disabled = true;
        document.getElementById(elementId).className = "formbtn_search";
        document.getElementById(elementId).parentNode.className = "HW_formbtn_financeovervw_grey";

    },
    /*Surej RWD for pfm module - START*/
    CategorywiseOverviewListUX3_onload: function(groupletId) {
        //jQuery("#PageConfigurationMaster_PFMMFOW__1\\:Details_TopLeftContainer_Stage33").css("border","1px solid #d3d3d3");
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage33").css("border", "1px solid #d3d3d3");
    },
    ExpenseIncomeAnalysisListViewUX3_onload: function(groupletId) {
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage33").css("border", "1px solid #d3d3d3");
    },
    BudgetAnalysisListViewUX3_onload: function(groupletId) {
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage33").css("border", "1px solid #d3d3d3");
        jQuery(".listgreyrowtxtleftline_withpadding_grey.footable-visible.footable-first-column").css("padding-left", "3px");
        jQuery('.footable-last-column .hwgreentxt').css('float', 'left');
        jQuery('.footable-last-column .hwblacktxt').css('float', 'left');
    },
    BudgetMaintenanceExpenseAddUX3_onload: function(groupletId) {
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb4\\.C1").
        removeClass("stage3_blank_padding");
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb5\\.C1").
        removeClass("stage3_blank_padding");
        jQuery(".stage3_alertpanelheader_column").css("padding-left", "4px");
    },
    BudgetMaintenanceExpenseEditUX3_onload: function(groupletId) {
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb4\\.C1").
        removeClass("stage3_blank_padding");
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb5\\.C1").
        removeClass("stage3_blank_padding");
        jQuery(".stage3_alertpanelheader_column").css("padding-left", "4px");
    },
    BudgetMaintenanceIncomeAddUX3_onload: function(groupletId) {
        jQuery(".labelCol_text_brdr_number").css("width", "31px");
        jQuery(".labelcoltxtnumber").css("width", "28px");
        jQuery(".stage3_alertpanelheader_column").css("padding-left", "4px");
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb3").
        removeClass("stage3_inputpanel_alerts_PFM").addClass("stage3_inputpanel_alerts_IncomePFM");
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb6").
        removeClass("stage3_inputpanel_alerts_PFM").addClass("stage3_inputpanel_alerts_IncomePFM1");
    },
    BudgetMaintenanceIncomeEditUX3_onload: function(groupletId) {
        jQuery(".labelCol_text_brdr_number").css("width", "31px");
        jQuery(".labelcoltxtnumber").css("width", "28px");
        jQuery(".stage3_alertpanelheader_column").css("padding-left", "4px");
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb3").
        removeClass("stage3_inputpanel_alerts_PFM").addClass("stage3_inputpanel_alerts_IncomePFM");
        jQuery("#" + groupletId + "\\:DataEntry_LeftContainer_Stage3_ModalView2\\.Rb6").
        removeClass("stage3_inputpanel_alerts_PFM").addClass("stage3_inputpanel_alerts_IncomePFM1");
    },
    BudgetDetailsUX3_onload: function(groupletId) {
        /*For making the details value bold in budgets details */
        jQuery(".stage3_detailsrow").children(".searchsimpletext").css("font-family", "OpenSans-Semibold");
        jQuery(".stage3_rightdetailsnowidth").children(".simpletext").css("font-family", "OpenSans-Semibold");
        jQuery(".stage3_rightdetailsnowidth").children(".searchsimpletext1").css("font-family", "OpenSans-Semibold");
        jQuery(".stage3_detailsrow").children(".stage3_searchsimpletext_bold").css("font-family", "OpenSans-Semibold");
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage33\\.Rd3\\.C6").children(
            ".searchsimpletext").css("font-family", "OpenSans-Semibold");
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage33\\.Rd2\\.C4")
            .children(".stage3_searchsimpletext_bold").css("font-family", "OpenSans-Semibold");
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage33\\.Rd4\\.C5")
            .children(".simpletext").css("font-family", "OpenSans-Semibold");
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage33\\.Rd4\\.C5")
            .children(".simpletext").css("margin-left", "5px");
    },
    /*Surej RWD for pfm module - END*/
    BudgetHomepageListUX3_onload: function() {
        /*	incomeButtonDisable();\\commented as function definitions not present
        	expenseButtonDisable();*/
        jQuery(".tabNavItemIncome").click(function(e) {
            jQuery(".stage3_listingpaneldiv_Extended").attr('style', 'display :none');
            jQuery(".stage3_listingpaneldiv_small").attr('style', 'display :block');

            jQuery("[title='Income']").removeClass('tabNavItemIncome');
            jQuery("[title='Income']").addClass('tabNavItemIncome_Active');
            jQuery("[title='Expense']").removeClass('tabNavItemExpense');
            jQuery("[title='Expense']").addClass('tabNavItemExpense_Inactive');
            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });

        /*pfm*/
        jQuery(".tabNavItemExpense").click(function(e) {
            jQuery(".stage3_listingpaneldiv_small").attr('style', 'display :none');
            jQuery(".stage3_listingpaneldiv_Extended").attr('style', 'display :block');

            jQuery("[title='Expense']").removeClass('tabNavItemExpense_Inactive');
            jQuery("[title='Expense']").addClass('tabNavItemExpense');
            jQuery("[title='Income']").removeClass('tabNavItemIncome_Active');
            jQuery("[title='Income']").addClass('tabNavItemIncome');
            /*Manage categories second table was getting footable only on resize at lower resoln*/
            jQuery(function() {
                jQuery(window).resize();
            });
            return false;
        });
    },
    /* GoalLinkAccounts_onload: function(){
    		document.getElementById("reqNewBtn").disabled=true;
    		document.getElementById("reqNewBtn").className = "formbtn_finaceovervw";
    		document.getElementById("reqNewBtn").parentNode.className ="HW_formbtn_lnkaccnt";
    		document.getElementById("GoalAccountLinkFG.GEN_ACCOUNT_ID").disabled = true;

    },
    */

    ASBAPreferences_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/ipo/nASBAFunctions.js");
        feba.domManipulator.documentReady(feba.js.ipo.ASBAPreferences, groupletId);
    },
    IPOSubscription_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "nIpoFunctions";

            script.src = "scripts/module/ipo/nIpoFunctions.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/ipo/nIpoFunctions.js");
        }
        //feba.domManipulator.documentReady(feba.js.ipo.IPOBidType, groupletId);
        IPOBidType1(groupletId);

    },
    IPORevision_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "nIpoFunctions";

            script.src = "scripts/module/ipo/nIpoFunctions.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/ipo/nIpoFunctions.js");
        }
        //feba.domManipulator.documentReady(feba.js.ipo.IPOBidType, groupletId);
        IPOBidType1(groupletId);

    },

    SRRetailRDOpening_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "nRDFunctions";

            script.src = "scripts/module/servicerequest/nRDFunctions.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/nRDFunctions.js");
        }
        feba.domManipulator.documentReady(feba.useCase.openRD);
    },

    RDBDataCapture_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "nRDFunctions";

            script.src = "scripts/module/servicerequest/nRDFunctions.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/nRDFunctions.js");
        }
        feba.domManipulator.documentReady(feba.useCase.closeRD);
    },

    AddEmployee_onload: function() {
        displayAdditional();
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },

    CopyEmployee_onload: function() {
        displayAdditional();
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },

    ModifyEmployee_onload: function() {
        displayAdditional();
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    BillerRegistration_onload: function() {
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    ManageBillerEdit_onload: function() {
        feba.domManipulator.loadScript("scripts/module/txnss/NTxnssMaxAmtLimit.js");
    },
    AuthenticationScreen_onload: function() {
        /*added for making checkbox clickable without resize  in login page -Start*/
        jQuery(".loginPanelColumnDetailStyle1:first").css("width", "30%");

        jQuery(window).resize(function() {
            var windowWidth = viewport().width;
            if (parseInt(windowWidth) >= 480 && parseInt(windowWidth) <= 899) {
                jQuery('#LoginHDisplay\\.Ra11\\.C1').css('width', '30%');
            }
        });
        /*added for making checkbox clickable without resize  in login page -end*/
        //Added for hidding disclaimer for federated login
        hideFederatedSiteDisclaimer();
        //Added for remember user id
        fetchUserIdsFromCookie();
        //Start: Added for New Login Screen UX3
        var messageDisplayTable = feba.domManipulator.getElementById("MessageDisplay_TABLE");
        if (messageDisplayTable.length != 0) {
            var errorMsg = jQuery('.errorContentWrapper').text();
            var message = '<div id="MessageDisplay_TABLE" class="section_login"><div class="width100percent"><p class="redbgwithwidth_login"><span class="redtopleft"><span></span></span><span class="redbg_login"><span></span></span><span class="redtopright"> <span></span></span> </p></div><div role="alert" class="redbg_login"> <a href="#" id="errorlink1"><img src="L001/consumer/images/error-icon.gif" alt="You have 1 Error Message" title="You have 1 Error Message" class="absmiddle"></a>' +
                '<span dir="ltr">' + errorMsg + '</div><div class="width100percent"><p class="redbgwithwidth_login"><span class="redbottomleft"> <span></span></span><span class="redbg_login"> <span></span></span><span class="redbottomright"> <span></span></span> </p></div></div>';
            feba.domManipulator.replaceWith(messageDisplayTable, message);
        }
        //End: Added for New Login Screen UX3
        /*Fix for a latent issue. attachEvent is obselete function and is giving error in console during login page itself.
         * Using the latest addEventListener corresponding to the old attachEvent */
        // window.attachEvent('onload', fontResizeOnldForAuthScreen);
        window.addEventListener('onload', fontResizeOnldForAuthScreen, true);

        if (jQuery.browser.safari) {
            jQuery(".loginPanelFBButtonStyle").addClass('loginPanelFBButtonStyle_Safari');
            jQuery(".loginPanelFBButtonStyle").removeClass('loginPanelFBButtonStyle');
        }
        setTimeout(function() {
            jQuery('.loginPanellabellinkStyle1').addClass('loginPanelColumnDetailStyle');
            jQuery('.loginPanellabellinkStyle1').removeClass('loginPanellabellinkStyle1');
        }, 100);

    },
    FBARMAuthenticationScreen_onload: function() {
        writeCookie('bankId');
    },
    LockboxImage_onload: function() {
        jQuery('#imageList IMG').click(function() {
            jQuery('.imageHighlight').attr('class', 'imageStyle');
            var elem = jQuery(this);
            elem.attr('class', 'imageHighlight');
            var src = elem.attr('src');
            var img = '<img src=\"' + elem.attr('src') + '\" class=\"displayImageStyle\"" />';
            jQuery('#displayDiv').html(img);
        });

    },
    InitiateMobileRechargePayment_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/transaction/NTopUpListPopulator.js");
        feba.domManipulator.documentReady(feba.js.transaction.topUpListPopulator, groupletId);
    },
    InitiateMobileRechargePaymentUX3_onload: function(groupletId) {


        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NTopUpListPopulator';

            script.src = "scripts/module/transaction/NTopUpListPopulator.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {

            feba.domManipulator.loadScript("scripts/module/transaction/NTopUpListPopulator.js");
        }

    },
    InitiateMobileRechargePaymentMB_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/transaction/NTopUpListPopulator.js");
        feba.domManipulator.documentReady(feba.js.transaction.topUpListPopulator, groupletId);
    },
    CorpSnapShot_onload: function() {
        feba.js.common.configurable_Widget_Present = "N";
    },

    /** Added for MultiSelect
	RetailApprovalQueueUX3_onload: function(groupletId){
		feba.domManipulator.loadScript("scripts/module/transaction/MultiSelect.js");
		var elementId1 = 'ApprovalQueueListFG.COUNTER_PARTY_TYPE';
		var elementId2 = 'ApprovalQueueListFG\\.MULTI_SELECT_VAL';
		var elementId3 = 'ApprovalQueueListFG.COUNTER_PARTY_NICKNAME';
		var fgName = "ApprovalQueueListFG";
		if(groupletId && groupletId!=null && groupletId.length>0 && groupletId!="undefined"){
			elementId1 = groupletId+"\\:"+elementId1;
			elementId2 = groupletId+"\\:"+elementId2;
			elementId3 = groupletId+"\\:"+elementId3;
    	}
		jQuery([id="+elementId1+"]).change(function(){
				document.getElementById(elementId3).value="";
			});

		commonCall(fgName);
		jQuery([id="+elementId2+"]).change(function(){
				commonCall(fgName);

			});
	},*/
    ViewBondDetailsUX3_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    ViewBondOrderDetailsUX3_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    BuyOTCBondDataCaptureUX3_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    BuyOTCBondCyberReceiptUX3_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    BuyOTCBondDetailsDisplayUX3_onload: function() {
        feba.js.common.displayWarning = "N";
    },
    FetchBondDetailsUX3_onload: function() {
        feba.js.common.displayWarning = "N";
    },



    WidgetsLibrary_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");
        // This function is for clearing the check boxes on the widget Library page

        feba.domManipulator.getElementEndingWith('CLEAR_ALL_CHECKBOXES').bind('click', function() {
            var checkBoxElements = feba.domManipulator.getElement(':checkbox');
            // function call to hide search panel
            hideSearchPanel(this);
            //feba.domManipulator.getElementEndingWith('CLEAR_ALL_CHECKBOXES').parent().parent().hide();
            //Get the checkbox elements size
            var checkBoxLen = checkBoxElements.length;

            //Iterate through the checkboxes and add event listener for click event
            for (var index = 0; index < checkBoxLen; index++) {

                feba.domManipulator.getElement(checkBoxElements[index]).removeAttr('checked');

                feba.domManipulator.getElement(checkBoxElements[index]).checked = false;

            }

        });

    },
    //Start: Added for combo box styling for quick pay widget UX3
    QuickPayWidgetUX3_onload: function(groupletId) {
        /*Surej RWD for fixing vertical alignment of amount field*/
        var cpDivTag = jQuery("#RetailUserDashboardUX3_W83__1\\:WidgetForm\\.Rag2").find(".simpletext").text();
        if (cpDivTag == null || cpDivTag.trim().length == 0 || cpDivTag == "undefined" || cpDivTag == "null") {
            jQuery("#RetailUserDashboardUX3_W83__1\\:WidgetForm\\.Rag2").css("height", "0px");
        }
        convertComboboxes();

        if (jQuery("input[name='TranRequestManagerFG.DESTINATION_TYPE']").length === 0) {
            var errorMessage = "<div id=\"wrapperEle\"><p class=\"errordisplaypulldown\" data-messagemode=\"single\" data-role=\"down\"><span class=\"errordisplaywidgetright\">" +
                "<img id=\"CorporateUserDashboardUX3_W83__1:errorDisplayCloseMessage\" src=\"L001/corporate/images/db_icons_info_bar_close.png\" " +
                "alt=\"Close Message\" title=\"Close Message\" class=\"absmiddle\"></span></p>" +
                "<div class=\"orangebgwithwidth\"><div class=\"orangebgwithwidth\"><div class=\"errorDisplayDiv width100percent\" " +
                "style=\"display: none;\"><p class=\"orangebgwithwidth\"><span class=\"redtopleft\"><span></span></span>" +
                "<span class=\"orangebg\"><span></span></span><span class=\"orangetopright\"> <span></span></span> </p></div>" +
                "<div role=\"alert\" class=\"errorContentWrapper orangebg\" aria-live=\"assertive\" style=\"max-height: 15px;\"> " +
                "<a href=\"#\" id=\"CorporateUserDashboardUX3_W83__1:errorlink1\" title=\"" + getMessage("noCptype") + "\">" +
                "<img src=\"" + getMessage("warningMsgImageSrc") + "\" alt=\"" + getMessage("warningMsg") + "\" title=\"" + getMessage("warningMsg") + "\" " +
                "class=\"absmiddle\"></a>" + getMessage("noCptype") + "</div><div class=\"width100percent\"><p class=\"orangebgwithwidth\">" +
                "<span class=\"orangebottomleft\"> <span></span></span><span class=\"orangebg\"> <span></span></span><span class=\"orangebottomright\"> " +
                "<span></span></span> </p></div></div></div></div>";

            var eleId = '#' + groupletId + '_relativeWrapper';
            if (jQuery(eleId).length === 0) {
                jQuery('.formrowQuickPay').parent().prepend(errorMessage);
                jQuery('.errordisplaypulldown').click(function() {
                    jQuery(this).parent().remove(); // this is the link element that was clicked
                });
            } else {
                jQuery('.wrapperEle').parent().remove();
            }

        }
    },
    //End: Added for combo box styling for quick pay widget UX3
    CategorywiseOverviewChartViewUX3_onload: function() {
        jQuery("#nextButton, #prevButton").click(function() {
            /*for chrome chart is painted in embed tag*/
            jQuery('embed[name=finanzTool]').attr('width', '95.12765957446809%');

            /*for ie chart is painted in object tag*/
            jQuery('object[name=finanzTool]').attr('width', '95.12765957446809%');

            /*for firefox chart is painted in img tag*/
            setTimeout(function() {
                jQuery("img[usemap$='chartSamplerMap']").attr('width', '95.12765957446809%');
            }, 140);
        });
    },
    BudgetAnalysisChartViewUX3_onload: function() {
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage63").css("border", "1px solid #d3d3d3");
        jQuery("#nextButton, #prevButton").click(function() {
            /*for chrome chart is painted in embed tag*/
            jQuery('embed[name=finanzTool]').attr('width', '95.12765957446809%');

            /*for ie chart is painted in object tag*/
            jQuery('object[name=finanzTool]').attr('width', '95.12765957446809%');

            /*for firefox chart is painted in img tag*/
            setTimeout(function() {
                jQuery("img[usemap$='chartSamplerMap']").attr('width', '95.12765957446809%');
            }, 140);
        });
        jQuery(".stage3_downloadnav").removeClass("stage3_downloadnav");
    },
    ExpenseIncomeAnalysisChartViewUX3_onload: function() {
        jQuery(".stage3_downloadnav").removeClass("stage3_downloadnav");
        jQuery("#" + groupletId + "\\:Details_TopLeftContainer_Stage63").css("border", "1px solid #d3d3d3");
    },
    //Start: This function added to close the information bar from QuickPay widget confirmation page UX3
    QuickPayWidgetConfirmationUX3_onload: function() {
        //code to change the style of authentication componenet based on "ON_FOCUS_REQUIRED" flag value
        var onfocusRequiredFlag = document.getElementById('ON_FOCUS_REQUIRED');

        if (onfocusRequiredFlag != null && onfocusRequiredFlag.value === "N") {
            jQuery('.querytextleftStyle').removeClass('querytextleftStyle').addClass('querytextleftStyleNew');
            jQuery('.querytextleftAuthStyle').removeClass('querytextleftAuthStyle').addClass('querytextleftAuthStyleNew');
            jQuery('.center_align_withmargin').removeClass('center_align_withmargin').addClass('center_align_withmarginNew');
        }

        //closeImageId
        jQuery('.closeStyleQuickPay').bind('click', function() {

            var pElement = feba.domManipulator.getElement(this.parentElement);
            var pElementDiv = pElement.parent();
            //replace the existing parent div class with empty div
            pElementDiv.parent().replaceWith('<div class="emptyDivQuickPay"></div>');
        });
        // Added for ticket 738012
        jQuery('.querytextquickpaywidgetmessage').siblings().addClass('querytextquickpaywidgetmessage');
        jQuery(window).resize(function() {
            jQuery('.querytextquickpaywidgetmessage').siblings().addClass('querytextquickpaywidgetmessage');
        });
    },
    //End: This function added to close the information bar from QuickPay widget confirmation page UX3
    // Start: Added for error message on new login screen
    PasswordAuthenticationScreen_onload: function() {
        /* Commented For Ticket - 735719*/
        /*		var messageDisplayTable=feba.domManipulator.getElementById("MessageDisplay_TABLE");
        		if(messageDisplayTable.length != 0){
        			var errorMsg = jQuery('.errorContentWrapper').text();
        			var message='<div id="MessageDisplay_TABLE" class="section_login"><div class="width100percent"><p class="redbgwithwidth_login"><span class="redtopleft"><span></span></span><span class="redbg_login"><span></span></span><span class="redtopright"> <span></span></span> </p></div><div role="alert" class="redbg_login"> <a href="#" id="errorlink1"><img src="L001/consumer/images/error-icon.gif" alt="You have 1 Error Message" title="You have 1 Error Message" class="absmiddle"></a>'
        						+ '<span dir="ltr">'+ errorMsg + '</div><div class="width100percent"><p class="redbgwithwidth_login"><span class="redbottomleft"> <span></span></span><span class="redbg_login"> <span></span></span><span class="redbottomright"> <span></span></span> </p></div></div>';
        			feba.domManipulator.replaceWith(messageDisplayTable,message);
        		}*/
    },
    AuthenticationImagePhraseScreen_onload: function() {
        var messageDisplayTable = feba.domManipulator.getElementById("MessageDisplay_TABLE");
        if (messageDisplayTable.length != 0) {
            /*	var errorMsg = jQuery('.errorContentWrapper').text();
            	var message='<div id="MessageDisplay_TABLE" class="section_login"><div class="width100percent"><p class="redbgwithwidth_login"><span class="redtopleft"><span></span></span><span class="redbg_login"><span></span></span><span class="redtopright"> <span></span></span> </p></div><div role="alert" class="redbg_login"> <a href="#" id="errorlink1"><img src="L001/consumer/images/error-icon.gif" alt="You have 1 Error Message" title="You have 1 Error Message" class="absmiddle"></a>'
            				+ '<span dir="ltr">'+ errorMsg + '</div><div class="width100percent"><p class="redbgwithwidth_login"><span class="redbottomleft"> <span></span></span><span class="redbg_login"> <span></span></span><span class="redbottomright"> <span></span></span> </p></div></div>';
            	feba.domManipulator.replaceWith(messageDisplayTable,message);*/
        }
        setTimeout(function() {
            jQuery('.loginPanellabellinkStyle1').addClass('loginPanelColumnDetailStyle');
            jQuery('.loginPanellabellinkStyle1').removeClass('loginPanellabellinkStyle1');
        }, 100);
    },
    GenerateOTPScreen_onload: function() {
        var messageDisplayTable = feba.domManipulator.getElementById("MessageDisplay_TABLE");
        if (messageDisplayTable.length != 0) {
            var errorMsg = jQuery('.errorContentWrapper').text();
            var message = '<div id="MessageDisplay_TABLE" class="section_login"><div class="width100percent"><p class="redbgwithwidth_login"><span class="redtopleft"><span></span></span><span class="redbg_login"><span></span></span><span class="redtopright"> <span></span></span> </p></div><div role="alert" class="redbg_login"> <a href="#" id="errorlink1"><img src="L001/consumer/images/error-icon.gif" alt="You have 1 Error Message" title="You have 1 Error Message" class="absmiddle"></a>' +
                '<span dir="ltr">' + errorMsg + '</div><div class="width100percent"><p class="redbgwithwidth_login"><span class="redbottomleft"> <span></span></span><span class="redbg_login"> <span></span></span><span class="redbottomright"> <span></span></span> </p></div></div>';
            feba.domManipulator.replaceWith(messageDisplayTable, message);
        }
    },
    // End: Added for error message on new login screen

    //Start: Added for federated identity management
    EAUserRegistrationListingUX3_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/user/NFBScript.js");
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFBScript";

            script.src = "scripts/module/user/NFBScript.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/user/NFBScript.js");
        }
    },
    //End: Added for federated identity management
    //Added for corp online registration
    CorpOnlineRegPreviewConfirmationUX3_onload: function() {
        jQuery('.step_trackerwidth').css('width', '940px');
        //disable the account id if it is not empty
        if (document.getElementById('CorpOnlineRegistrationFG.ACC_NUM').value != "") {
            jQuery('input[id$="ACC_NUM"]').attr("disabled", true);
        }

    },
    CreateMenuOptions_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "NAdaptiveModeControl";

            script.src = "scripts/module/applicationmaintenance/NAdaptiveModeControl.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/applicationmaintenance/NAdaptiveModeControl.js");
        }

    },
    ModifyMenuOptions_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "NAdaptiveModeControl";

            script.src = "scripts/module/applicationmaintenance/NAdaptiveModeControl.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/applicationmaintenance/NAdaptiveModeControl.js");
        }
    },

    PageMaintenanceCreateSubscribers_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/GroupletCommunication.js");
    },
    PageMaintenanceIGCConfig_onload: function() {

        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/GroupletCommunication.js");
    },

    BuyOTCBondDataCaptureUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/module/bonds/NFetchBondDetails.js");
    },
    BondDealListUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "NBondNameLookupDetails";
            script.src = "scripts/module/bonds/NBondNameLookupDetails.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
        }
    },
    BondOrderListUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "NBondNameLookupDetails";
            script.src = "scripts/module/bonds/NBondNameLookupDetails.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
        }
    },
    BondHoldingsListUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "NBondNameLookupDetails";
            script.src = "scripts/module/bonds/NBondNameLookupDetails.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
        }
    },
    BackDatedHoldingsListUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "NBondNameLookupDetails";
            script.src = "scripts/module/bonds/NBondNameLookupDetails.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
        }
    },

    BondNameLookupUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "NBondNameLookupDetails";
            script.src = "scripts/module/bonds/NBondNameLookupDetails.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
        }
    },
    BondNameSearchUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "NBondNameLookupDetails";
            script.src = "scripts/module/bonds/NBondNameLookupDetails.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
        }
    },
    ViewBondPricesUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            var script = document.createElement('script');
            script.id = "NBondNameLookupDetails";
            script.src = "scripts/module/bonds/NBondNameLookupDetails.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
        }
    },
    ConfirmPrints_onload: function() {
        feba.domManipulator.loadScript("scripts/module/instrumentprinting/NconfirmPrints.js");
    },
    CorpCancelJobPreviewConfirmation_onload: function() {
        jQuery('#C1').find(".stage3_inputpanel_column").removeClass("stage3_inputpanel_column").addClass("querytextleft");
        jQuery('#C2').find(".querytextright_stage3").removeClass("querytextright_stage3").addClass("querytextright");
        jQuery('.querytextboxmedium').css('width', '80%');
    },
    EBConfirmPrints_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NconfirmPrints";

            script.src = "scripts/module/instrumentprinting/NconfirmPrints.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/instrumentprinting/NconfirmPrints.js");
        }
    },
    DDConfirmPrints_onload: function() {
        feba.domManipulator.loadScript("scripts/module/instrumentprinting/NconfirmPrints.js");
    },
    //fix for the tkt 709560
    MailCompose_onload: function() {
        document.execCommand("AutoUrlDetect", false, false);
        jQuery('.composetxtboxmatter').removeAttr('maxlength');
    },
    MailRMReply_onload: function() {
        jQuery('.composetxtboxmatter').removeAttr('maxlength');
    },
    MailRMForward_onload: function() {
        jQuery('.composetxtboxmatter').removeAttr('maxlength');
        setTimeout(function() {
            jQuery('#MailFG\\.MAIL_VIEW_SUBJECT').css('width', '99.6%');
            //jQuery('#MailFG\\.MAIL_VIEW_SUBJECT').css('width','100%');
        }, 100);
    },
    PageMaintenanceLandingPage_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");
    },
    PageMaintenaceUpdateConfigurationContainer_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");
    },
    PageMaintenaceUpdateConfiguration_onload: function() {

        jQuery('.jcarousel-list-horizontal').css('left', '-600px');
        var mediumContainer = jQuery('.previewContainer-mediumShow-Head').length;
        var smallContainer = jQuery('.previewContainer-smallShow-Head').length;
        var largeContainer = jQuery('.previewContainer-largeShow-Head').length;
        var xSmall = jQuery('.previewContainer-xtrasmallShow-Head').length;
        if (mediumContainer && mediumContainer == 1 && (smallContainer && smallContainer < 3)) {
            jQuery('.previewContainer-mediumShow-Head').css('margin-bottom', '250px');
        }
        if (mediumContainer && mediumContainer == 2 && (xSmall && xSmall == 3)) {
            var currMediumContainer = jQuery('.previewContainer-mediumShow-Head')[1];
            jQuery(currMediumContainer).css('margin-bottom', '145px');

        }
        var tempContainerHeight = 0;
        if (largeContainer == 1 && xSmall > 2) {
            for (j = 0; j < xSmall; j++) {
                var currxSmall = jQuery('.previewContainer-xtrasmallShow-Head')[j];
                if (j == (xSmall - 1)) {
                    tempContainerHeight = tempContainerHeight + parseInt(jQuery(currxSmall).css('height')) + parseInt(jQuery(currxSmall).css('margin-bottom'));
                } else {
                    tempContainerHeight = tempContainerHeight + parseInt(jQuery(currxSmall).css('height')) + parseInt(jQuery(currxSmall).css('margin-bottom')) +
                        parseInt(jQuery(currxSmall).css('padding-bottom'));

                }
            }
            jQuery('.previewContainer-largeShow-Head').css('min-height', tempContainerHeight + 'px');

        }
        setTimeout(function() {
            feba.domManipulator.styleComboboxes((jQuery('select[id^="PageMaintenaceUpdateConfigurationContainer_STATIC_TemplateList:PageMaintenanceFG.CONTAINER"]')), {
                literals: {
                    noItemFound: getMessage("comboBoxNoItemFoundMsg"),
                    showAll: getMessage("comboBoxShowAllButton")
                }

            });
        }, 500)
    },
    PageConfigurationMaster_onload: function() {
        var containersOnPage = jQuery('.groupletContainer');
        for (i = 0; i < containersOnPage.length; i++) {
            var currContainer = containersOnPage[i];
            var currContainerChildren = jQuery(currContainer).children('.widget');
            if (currContainerChildren && currContainerChildren.length == 0) {
                jQuery(currContainer).addClass('hideElement');
                //jQuery(currContainer).css('width','0');
                //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
            }
        }
        var wrapperDivs = jQuery('.groupletWrapperDiv');
        for (i = 0; i < wrapperDivs.length; i++) {
            var currWrapperDiv = wrapperDivs[i];
            var currContainerChildren = jQuery(currWrapperDiv).find('.widget');
            if (currContainerChildren && currContainerChildren.length > 0) {
                jQuery(currWrapperDiv).removeClass('hideElement');
                //jQuery(currContainer).css('width','0');
                //console.log("Assigned width 0"+jQuery(currContainer).attr('id'));
            }
        }


        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");
    },
    PageMaintenanceTemplateDetails_onload: function(groupletId) {
        console.log('inside PageMaintenanceTemplateDetails_onload');
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");
        setTimeout(function() {
            var currHeight = jQuery('#' + 'PageMaintenanceHomePage_TemplateDetails').css('height');
            var ht = parseInt(currHeight);
            jQuery('#' + groupletId).css('height', ((ht + 100) + 'px'));
            console.log("assigned height auto in template details");
        }, 1000);
        var mediumContainer = jQuery('.previewContainer-mediumShow-Head').length;
        var smallContainer = jQuery('.previewContainer-smallShow-Head').length;
        var largeContainer = jQuery('.previewContainer-largeShow-Head').length;
        var xSmall = jQuery('.previewContainer-xtrasmallShow-Head').length;


        if (mediumContainer && mediumContainer == 1 && (smallContainer && smallContainer < 3)) {
            jQuery('.previewContainer-mediumShow-Head').css('margin-bottom', '250px');
        }
        if (mediumContainer && mediumContainer == 2 && (xSmall && xSmall == 3)) {
            var currMediumContainer = jQuery('.previewContainer-mediumShow-Head')[1];
            jQuery(currMediumContainer).css('margin-bottom', '145px');

        }
        var tempContainerHeight = 0;
        if (largeContainer == 1 && xSmall > 2) {
            for (j = 0; j < xSmall; j++) {
                var currxSmall = jQuery('.previewContainer-xtrasmallShow-Head')[j];
                if (j == (xSmall - 1)) {
                    tempContainerHeight = tempContainerHeight + parseInt(jQuery(currxSmall).css('height')) + parseInt(jQuery(currxSmall).css('margin-bottom'));
                } else {
                    tempContainerHeight = tempContainerHeight + parseInt(jQuery(currxSmall).css('height')) + parseInt(jQuery(currxSmall).css('margin-bottom')) +
                        parseInt(jQuery(currxSmall).css('padding-bottom'));

                }
            }
            jQuery('.previewContainer-largeShow-Head').css('min-height', tempContainerHeight + 'px');

        }
        setTimeout(function() {
            feba.domManipulator.styleComboboxes((jQuery('select[id^="PageMaintenanceHomePage_STATIC_TemplateDetails:PageMaintenanceFG.CONTAINER"]')), {
                literals: {
                    noItemFound: getMessage("comboBoxNoItemFoundMsg"),
                    showAll: getMessage("comboBoxShowAllButton")
                }

            });
        }, 500)
    },
    PageMaintainanceConfirmAuthorization_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/PageMaintenanceFunctions.js");
    },


    PageMaintenanceCreateSubscribers_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/GroupletCommunication.js");
    },
    PageMaintenanceIGCConfig_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/GroupletCommunication.js");
        convertComboboxes();
    },
    PageMaintenanceIGCConfigForUpdate_onload: function() {
        feba.domManipulator.loadScript("scripts/module/applicationmaintenance/GroupletCommunication.js");
        convertComboboxes();
    },
    PageMaintenanceLandingPage_onload: function() {
        if (document.createStyleSheet) {
            document.createStyleSheet("L001/consumer/theme/jcarousel_styles.css");
        } else {
            jQuery('head').append('<link rel="stylesheet" href="L001/consumer/theme/jcarousel_styles.css" type="text/css" />');
        }
    },
    PageMaintenaceTemplateList_onload: function(groupletId) {
        //jQuery('.jcarousel-list-horizontal').css('left','-600px');
        setTimeout(function() {
            jQuery('#' + groupletId).css('height', '300px');
            console.log("assigned height auto in template list");
        }, 1000);
    },
    BondHoldingsListUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/module/bonds/NBondNameLookupDetails.js");
    },
    PageMaintenanceConfirmationScreen_onload: function() {
        feba.js.common.displayWarning = "N";
    },

    PageMaintenaceUpdateConfigurationContainer_onload: function() {
        if (document.createStyleSheet) {
            document.createStyleSheet("L001/consumer/theme/jcarousel_styles.css");
        } else {
            jQuery('head').append('<link rel="stylesheet" href="L001/consumer/theme/jcarousel_styles.css" type="text/css" />');
        }
    },

    /**Function moved from NCxpsCallFunctionsResponse.js
     * Added for Two factor Authentication -- Start-- **/
    TFADataCaptureUX3_onload: function(groupletId) {
        var elementId = 'FormManagementFG.AUTH_MODE';
        var elementId1 = 'FormManagementFG.TERMSANDCOND';
        var innerElementId = 'DataEntry_LeftContainer_Stage39.Rb2b';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            elementId = groupletId + ":" + elementId;
            innerElementId = groupletId + ":" + innerElementId;
            elementId1 = groupletId + ":" + elementId1;
        }
        var value = document.getElementById(elementId).value;

        if (value == Constants.DIGITAL_MOBITOKEN) {
            jQuery("[id='" + innerElementId + "']").hide();
        }
        if (value == Constants.DEVICE_BASED_MOBITOKEN || value == Constants.SMS_BASED_MOBITOKEN || value == "") {
            jQuery("[id='" + innerElementId + "']").show();
        }
        jQuery("[id='" + elementId1 + "']").parent().removeAttr("class");
        jQuery("[id='" + elementId1 + "']").parent().addClass('stage3_additionaldetailslink_nextgen');
        feba.domManipulator.bind(feba.domManipulator.getElementById(elementId), "change", function() {
            var value = document.getElementById(elementId).value;

            if (value == Constants.DIGITAL_MOBITOKEN) {
                jQuery("[id='" + innerElementId + "']").hide();
            }
            if (value == Constants.DEVICE_BASED_MOBITOKEN || value == Constants.SMS_BASED_MOBITOKEN || value == "") {
                jQuery("[id='" + innerElementId + "']").show();
            }


        });
        /** Added for Two factor Authentication-- End-- **/
    },
    SRTwoFactorAuthModeReqRetDC_onload: function(groupletId) {
        var elementId = 'FormManagementFG.AUTH_MODE';
        var elementId1 = 'FormManagementFG.TERMSANDCOND';
        var innerElementId = 'DataEntry_LeftContainer_Stage39.Rb2b';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            elementId = groupletId + ":" + elementId;
            innerElementId = groupletId + ":" + innerElementId;
            elementId1 = groupletId + ":" + elementId1;
        }
        jQuery("[id='" + elementId1 + "']").parent().removeAttr("class");
        jQuery("[id='" + elementId1 + "']").parent().addClass('stage3_additionaldetailslink_nextgen');
        feba.domManipulator.bind(feba.domManipulator.getElementById(elementId), "change", function() {
            var value = document.getElementById(elementId).value;

            if (value == Constants.DIGITAL_MOBITOKEN) {
                jQuery("[id='" + innerElementId + "']").hide();
            }
            if (value == Constants.DEVICE_BASED_MOBITOKEN || value == Constants.SMS_BASED_MOBITOKEN || value == "") {
                jQuery("[id='" + innerElementId + "']").show();
            }


        });
        /** Added for Two factor Authentication-- End-- **/
    },
    SRTwoFactorAuthModeReqRetDC_onload: function(groupletId) {
        var elementId = 'FormManagementFG.AUTH_MODE';
        var elementId1 = 'FormManagementFG.TERMSANDCOND';
        var innerElementId = 'DataEntry_LeftContainer_Stage39.Rb2b';
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            elementId = groupletId + ":" + elementId;
            innerElementId = groupletId + ":" + innerElementId;
            elementId1 = groupletId + ":" + elementId1;
        }
        jQuery("[id='" + elementId1 + "']").parent().removeAttr("class");
        jQuery("[id='" + elementId1 + "']").parent().addClass('stage3_additionaldetailslink_nextgen');
        feba.domManipulator.bind(feba.domManipulator.getElementById(elementId), "change", function() {
            var value = document.getElementById(elementId).value;

            if (value == Constants.DIGITAL_MOBITOKEN) {
                jQuery("[id='" + innerElementId + "']").hide();
            }
            if (value == Constants.DEVICE_BASED_MOBITOKEN || value == Constants.SMS_BASED_MOBITOKEN || value == "") {
                jQuery("[id='" + innerElementId + "']").show();
            }


        });
        /** Added for Two factor Authentication-- End-- **/
    },
    DCLDataCaptureUX3_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },

    RASDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    RASCorp_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    RASRetail_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    DCLDataCaptureUX3_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    ODSDataCaptureUX3_onload: function(groupletId) {

        var tickIcons = jQuery('.css-labelcheckbox');
        for (i = 0; i < tickIcons.length; i++) {
            console.log('test');
            var currElem = tickIcons[i];
            var checkBocElem = jQuery(currElem).siblings();
            var elemeId = jQuery(checkBocElem).attr('id');
            var elemeVal = document.getElementById(elemeId);
            jQuery(currElem).attr('onClick', "passOverdraftStatusValuetonclick('" + elemeId + "','" + groupletId + "');");
        }

    },
    ODSRequestConfirmationUX3_onload: function(groupletId) {
        setTimeout(function() {
            jQuery('.css-labelcheckbox').die('click');
            jQuery('.css-labelcheckbox').unbind('click');
        }, 1000);
    },
    ODSDetailsDisplayUX3_onload: function(groupletId) {
        setTimeout(function() {
            jQuery('.css-labelcheckbox').die('click');
            jQuery('.css-labelcheckbox').unbind('click');
        }, 2000);
    },
    ODSCyberReceiptUX3_onload: function(groupletId) {
        setTimeout(function() {
            jQuery('.css-labelcheckbox').die('click');
            jQuery('.css-labelcheckbox').unbind('click');
        }, 1000);
    },
    SRRetailStopCheque_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    SRCorporateStopCheque_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    DCLRetail_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    DCLCorp_onload: function(groupletId) {

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },

    CDCDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";
            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    CancelDebitCardRetail_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    CancelDebitCardCorp_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },

    RDBDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    FDODataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    SRRetailFDOpeningDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    SRCorporateFDOpeningDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    AADDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    ApplyDebitCardCorpDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    ApplyDebitCardRetailDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    ADSDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ADSRetail_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ADSCorp_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ADSRequestConfirmationUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ADSDetailsDisplayUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    ADSCyberReceiptUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ADSRetail_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ADSCorp_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    RDODataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    SRCorporateFDOpening_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }

    },
    SRCorporateActivateDebitCardReq_onload: function(groupletId) {
        var windowWidth = viewport().width;
        if (parseInt(windowWidth) < 640) {
            jQuery(".stage3_inputpanel_column").css("width", "38%");
        }
    },
    SRRetailAccountStatement_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
        if (groupletId == "PageConfigurationMaster_ASRUX4W__1") {
            if (jQuery('#FormManagementFG\\.REPORTTITLE').attr('value') == "ASRDataCaptureUX3") {
                jQuery('.HW_formbtn_search').hide();
            }
        }
    },
    SRCorporateAccountStatement_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    MWNDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBANoticesTrnsfrAcctType";

            script.src = "scripts/NFEBANoticesTrnsfrAcctType.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBANoticesTrnsfrAcctType.js");
        }
    },
    WithdrawlNoticesRetail_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBANoticesTrnsfrAcctType";

            script.src = "scripts/NFEBANoticesTrnsfrAcctType.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);

            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBANoticesTrnsfrAcctType.js");
        }
    },
    WithdrawlNoticesCorp_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBANoticesTrnsfrAcctType";

            script.src = "scripts/NFEBANoticesTrnsfrAcctType.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBANoticesTrnsfrAcctType.js");
        }
    },
    NWNDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBANoticesTrnsfrAcctType";

            script.src = "scripts/NFEBANoticesTrnsfrAcctType.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBANoticesTrnsfrAcctType.js");
        }
    },
    CWNDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBANoticesTrnsfrAcctType";

            script.src = "scripts/NFEBANoticesTrnsfrAcctType.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBANoticesTrnsfrAcctType.js");
        }
    },
    ASRDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    DRRDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRcorpDebitcardredeem_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRDebitcardredeem_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'NdynamicFetch';

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRRetailFDOpening_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    FDODataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    LORDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRCorporateCarLoan_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRRetailCarLoan_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ODLAccountsListUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRRetailchng_ovlmt_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    ODRDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRRetailRequestDDReq_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRCorporateRequestDDReq_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRCorporateSwitchMailingAddressList_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SMACIFIdListUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    UATAccountsListUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SMADataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRRetailSwitchMailingAddressList_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRCorporateSwitchMailingAddressList_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    UATDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    UpdateAddressType_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    UNDDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    EditNomineeDetailsDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    EditNomineeDetailsConf_onload: function(groupletId) {
        jQuery(".stage3_listingpaneldiv").css('border-top', '1px solid #CCCCCC');
    },
    UNDRequestConfirmationUX3_onload: function(groupletId) {
        jQuery(".stage3_listingpaneldiv").css('border-top', '1px solid #CCCCCC');
    },
    EditNomineeDetailsCy_onload: function(groupletId) {
        jQuery(".stage3_listingpaneldiv").css('border-top', '1px solid #CCCCCC');
    },
    UNDCyberReceiptUX3_onload: function(groupletId) {
        jQuery(".stage3_listingpaneldiv").css('border-top', '1px solid #CCCCCC');
    },
    RRPDataCapture_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    CACDataCapture_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    CHKDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRCorporateChequeBookRequestDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    SRRetailChequeBookRequestDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
        }
    },
    BDCDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    BlockDebitCardCorpDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    BlockDebitCardRetailDC_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    ADPDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    SRRetailActivateDebitCard_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    SRCorporateActivateDebitCard_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardDtlsCheck";

            script.src = "scripts/NFEBADebitCardDtlsCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBADebitCardDtlsCheck.js");
        }
    },
    DPCDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    DPCRetail_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    DPCCorp_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardPopulate";

            script.src = "scripts/module/servicerequest/NFEBADebitCardPopulate.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardPopulate.js");
        }
    },
    USCDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }

    },
    SRRetailCancelStopCheque_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }

    },
    SRCorporateCancelStopCheque_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }

    },

    CPLPersonalizeLimitsUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }
    },

    INCollectionRequestUX3_onload: function(groupletId) {

        if (isGroupletExecution(groupletId)) {
            var script = document.createElement('script');
            script.id = "idIMRequestCollection";
            script.src = "scripts/module/inmg/IMRequestCollection.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/inmg/IMRequestCollection.js");
        }
    },

    INCollectionModifyRequestUX3_onload: function(groupletId) {

        if (isGroupletExecution(groupletId)) {
            var script = document.createElement('script');
            script.id = "idIMRequestCollection";
            script.src = "scripts/module/inmg/IMRequestCollection.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/inmg/IMRequestCollection.js");
        }
    },


    IMGDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }
    },

    SCRDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }

    },
    SRRetailChequeImage_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }
    },
    SRCorporateChequeImage_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }
    },
    CRDataCaptureUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "radioChangeSRUX3";

            script.src = "scripts/radioChangeSRUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/radioChangeSRUX3.js");
        }
    },
    CCAccountDetailsWidUX4_onload: function(groupletId) {
        convertComboboxes();
    },
    DpAccountDetailsWidUX4_onload: function(groupletId) {
        convertComboboxes();
    },
    OpAccountDetailsRetWidUX4_onload: function(groupletId) {
        convertComboboxes();
    },
    GroupAccountSummaryUX4_onload: function(groupletId) {
        if (jQuery('.container-consoAccntSummary').height() < 690) {
            jQuery('.container-consoAccntSummary').css('margin-bottom', '21%')
        } else {
            jQuery('.container-consoAccntSummary').css('margin-bottom', '7%')
        }
        feba.domManipulator.loadScript("scripts/module/accounts/AccountSummaryPulldownMenu.js");
        //feba.domManipulator.loadScript("scripts/common/NAccountSummaryPulldownMenu.js");
        console.log("alert----------------end");
        //code added for showing page heading in Next-gen screens
        var content;
        if (jQuery("#nextGenPgHeading").length === 0) {
            content = jQuery('.container-consoAccntSummary').find('h1');
            jQuery("<div id='nextGenPgHeading'></div>").insertAfter("#BrdCrumbNImg");
            jQuery("#nextGenPgHeading").wrapInner(content);
            jQuery("#nextGenPgHeading").addClass('section pageheadingcapsUX4');
        } else {
            jQuery("#nextGenPgHeading").remove();
            content = jQuery('.container-consoAccntSummary').find('h1');
            jQuery("<div id='nextGenPgHeading'></div>").insertAfter("#BrdCrumbNImg");
            jQuery("#nextGenPgHeading").wrapInner(content);
            jQuery("#nextGenPgHeading").addClass('section pageheadingcapsUX4');
        }
        //loadArrowForFirstElement();
        var noXSmallElements = jQuery('.container-nxtGenxtrasmall').length;
        for (i = 0; i < noXSmallElements; i++) {
            var currElement = jQuery('.container-nxtGenxtrasmall')[i];
            if (jQuery(currElement).children('.widget').length > 0) {
                jQuery(currElement).removeClass('hideElement');
            }
        }

        jQuery(window).resize(function() {
            //for indicator
            var windowWidth = viewport().width;
            if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 990) {
                jQuery(".accountSelectIndicator").css("left", "33.8%");
                jQuery(".accountSelectBorderIndicator").css("left", "33.8%");
            } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                jQuery(".accountSelectIndicator").css("left", "94%");
                jQuery(".accountSelectBorderIndicator").css("left", "94%");
            } else {
                jQuery(".accountSelectIndicator").css("left", "33.7%");
                jQuery(".accountSelectBorderIndicator").css("left", "33.7%");
            }

            //for chart in lower resolution
            if (jQuery("HTML").css("direction") == "rtl") {
                if (parseInt(windowWidth) <= 990) {
                    jQuery('.accountSelectBorderIndicator').css("display", "none");
                    jQuery('.accountSelectIndicator').css("display", "none");
                } else {
                    jQuery(".accountSelectIndicator").css("left", "63.7%");
                    jQuery(".accountSelectBorderIndicator").css("left", "63.5%");
                    jQuery('.accountSelectBorderIndicator').css("display", "block");
                    jQuery('.accountSelectIndicator').css("display", "block");
                }
            }
            if (parseInt(windowWidth) >= 900 && parseInt(windowWidth) <= 1035) {
                jQuery(".legendHolder").css("width", "32%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "250px");
            } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 900) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");
            } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 640) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "335px");
            } else {
                jQuery(".legendHolder").css("width", "42%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "255px");
            }
        });
    },
    DpAccDonutChartUX4_onload: function() {
        convertComboboxes();
        var windowWidth = viewport().width;
        //for chart in lower resolution on load width
        if (parseInt(windowWidth) >= 963 && parseInt(windowWidth) <= 1035) {
            jQuery(".legendHolder").css("width", "38%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "250px");
        } else if (parseInt(windowWidth) >= 900 && parseInt(windowWidth) <= 963) {
            jQuery(".legendHolder").css("width", "100%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");
        } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 900) {
            jQuery(".legendHolder").css("width", "100%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");
        } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 640) {
            jQuery(".legendHolder").css("width", "100%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "335px");
        } else {
            jQuery(".legendHolder").css("width", "42%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "255px");
        }
        jQuery(window).resize(function() {
            var windowWidthInFunc = viewport().width;
            //for chart in lower resolution on load width
            if (parseInt(windowWidthInFunc) >= 963 && parseInt(windowWidthInFunc) <= 1035) {
                jQuery(".legendHolder").css("width", "38%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "250px");
            } else if (parseInt(windowWidthInFunc) >= 900 && parseInt(windowWidthInFunc) <= 963) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");

            } else if (parseInt(windowWidthInFunc) >= 640 && parseInt(windowWidthInFunc) <= 900) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");
            } else if (parseInt(windowWidthInFunc) >= 0 && parseInt(windowWidthInFunc) <= 640) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "335px");
            } else {
                jQuery(".legendHolder").css("width", "42%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "255px");
            }
        });
    },
    LnAccDonutChartUX4_onload: function() {
        convertComboboxes();
        var windowWidth = viewport().width;
        //for chart in lower resolution on load width
        if (parseInt(windowWidth) >= 963 && parseInt(windowWidth) <= 1035) {
            jQuery(".legendHolder").css("width", "38%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "250px");
        } else if (parseInt(windowWidth) >= 900 && parseInt(windowWidth) <= 963) {
            jQuery(".legendHolder").css("width", "100%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");
        } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 900) {
            jQuery(".legendHolder").css("width", "100%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");
        } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 640) {
            jQuery(".legendHolder").css("width", "100%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "335px");
        } else {
            jQuery(".legendHolder").css("width", "42%");
            jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "255px");
        }
        jQuery(window).resize(function() {
            var windowWidthInFunc = viewport().width;
            //for chart in lower resolution on load width
            if (parseInt(windowWidthInFunc) >= 963 && parseInt(windowWidthInFunc) <= 1035) {
                jQuery(".legendHolder").css("width", "38%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "250px");
            } else if (parseInt(windowWidthInFunc) >= 900 && parseInt(windowWidthInFunc) <= 963) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");

            } else if (parseInt(windowWidthInFunc) >= 640 && parseInt(windowWidthInFunc) <= 900) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "330px");
            } else if (parseInt(windowWidthInFunc) >= 0 && parseInt(windowWidthInFunc) <= 640) {
                jQuery(".legendHolder").css("width", "100%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "335px");
            } else {
                jQuery(".legendHolder").css("width", "42%");
                jQuery(".container-nxtGenxtrasmall .widget-small .widget-content").css("min-height", "255px");
            }
        });
    },
    AccountSummaryChartViewUX4_onload: function(groupletId) {
        convertComboboxes();
        if (jQuery('embed').length > 0) {
            jQuery('embed').css('margin-left', '20%');
        }
        /*jQuery(jQuery('.donutItem')[0]).addClass('donutSelected');
        jQuery('.donutItem').click(function() {
        console.log("1");
        	jQuery('.donutSelected').removeClass('donutSelected');
        	jQuery(this).addClass('donutSelected');

        });*/
        jQuery('.chartFooterDisplay').show();
        if (jQuery('#' + groupletId).find('embed').length == 1) {
            jQuery('.donutItem').addClass('donutItemSingle');
        }

        jQuery(window).resize(function() {
            var windowWidth = viewport().width;
            if (parseInt(windowWidth) <= 899) {
                jQuery('.donutWrapperUl').jPaginate({
                    items: 2,
                    pagination_class: 'calendarPagination',
                    cookies: false,
                    next: '&nbsp;',
                    previous: '&nbsp;',
                    paginationWrapper: true,
                    paginationWrapperClass: 'calendarPaginationWrapper',
                    paginationLocation: 'nextGen'
                });
            } else {
                jQuery('.donutWrapperUl').jPaginate({
                    items: 4,
                    pagination_class: 'calendarPagination',
                    cookies: false,
                    next: '&nbsp;',
                    previous: '&nbsp;',
                    paginationWrapper: true,
                    paginationWrapperClass: 'calendarPaginationWrapper',
                    paginationLocation: 'nextGen'
                });
            }
        });

        jQuery(jQuery('.donutItem')[0]).addClass('donutSelected');
        var idname = jQuery(jQuery('.donutItem')[0]).attr('data-jsVarName');
        var newId = idname;
        if (newId) {
            var stylepathOriginal = eval(newId).stylePath
            var stylepath = eval(newId).stylePath;
            stylepath = stylepath.replace("/FebaStyle.properties", "/FebaStyleSingleDonut.properties");
            eval(newId).stylePath = stylepath;
            eval(newId).styleOrigPath = stylepathOriginal;
            FINANZTOOLS.taglib.showChart(eval(newId));

            jQuery('.donutItem').mousedown(function() {
                console.log("1");
                //
                var idname = jQuery(jQuery('.donutSelected')[0]).attr('data-jsVarName');
                var newId = idname;
                var stylepathOriginal = eval(newId).stylePath
                var stylepath = eval(newId).styleOrigPath;
                eval(newId).stylePath = stylepath;
                FINANZTOOLS.taglib.showChart(eval(newId));
                //
                jQuery('.donutSelected').removeClass('donutSelected');
                jQuery(this).addClass('donutSelected');
                var objName = jQuery(this).attr("data-jsVarName");
                //
                var stylepathOriginal = eval(objName).stylePath
                var stylepath = eval(objName).stylePath;
                stylepath = stylepath.replace("/FebaStyle.properties", "/FebaStyleSingleDonut.properties");
                eval(objName).stylePath = stylepath;
                eval(objName).styleOrigPath = stylepathOriginal;
                FINANZTOOLS.taglib.showChart(eval(objName));

                //
            });
        } else {


            var errorMessage = "<div id=\"noAccWrapper\" role=\"alert\" class=\"redbg width100Container\"><a id=\"errorlink1\" href=\"#\"><img class=\"absmiddle\" title=\"" + getMessage("noAccForCriteriaMessage") + "\" " +
                "alt=\"" + getMessage("NoWidgetsAlt") + "\" src=\"" + getMessage("NoWidgetsImageSrc") + "\"></a><span dir=\"ltr\">[CONTLS0004] [105246] </span>" + getMessage("noAccForCriteriaMessage") + "</div>";
            jQuery('.chartFooterDisplay').prepend(errorMessage);

        }

        jQuery('.container-nxtGenNoTopmedium').find('.widget-medium').find('.empty-widget').css('min-height', '345px');
    },
    AccountSummaryChartViewWidgetUX4_onload: function(groupletId) {
        convertComboboxes();
        if (jQuery('embed').length > 0) {
            jQuery('embed').css('margin-left', '20%');
        }
        /*jQuery(jQuery('.donutItem')[0]).addClass('donutSelected');
        jQuery('.donutItem').click(function() {
        console.log("1");
        	jQuery('.donutSelected').removeClass('donutSelected');
        	jQuery(this).addClass('donutSelected');

        });*/
        jQuery('.chartFooterDisplay').show();
        if (jQuery('#' + groupletId).find('embed').length == 1) {
            jQuery('.donutItem').addClass('donutItemSingle');
        }

        jQuery(window).resize(function() {
            var windowWidth = viewport().width;
            if (parseInt(windowWidth) <= 899) {
                jQuery('.donutWrapperUl').jPaginate({
                    items: 2,
                    pagination_class: 'calendarPagination',
                    cookies: false,
                    next: '&nbsp;',
                    previous: '&nbsp;',
                    paginationWrapper: true,
                    paginationWrapperClass: 'calendarPaginationWrapper',
                    paginationLocation: 'nextGen'
                });
            } else {
                jQuery('.donutWrapperUl').jPaginate({
                    items: 4,
                    pagination_class: 'calendarPagination',
                    cookies: false,
                    next: '&nbsp;',
                    previous: '&nbsp;',
                    paginationWrapper: true,
                    paginationWrapperClass: 'calendarPaginationWrapper',
                    paginationLocation: 'nextGen'
                });
            }
        });

        jQuery(jQuery('.donutItem')[0]).addClass('donutSelected');
        var idname = jQuery(jQuery('.donutItem')[0]).attr('data-jsVarName');
        var newId = idname;
        var stylepathOriginal = eval(newId).stylePath
        var stylepath = eval(newId).stylePath;
        stylepath = stylepath.replace("/FebaStyle.properties", "/FebaStyleSingleDonut.properties");
        eval(newId).stylePath = stylepath;
        eval(newId).styleOrigPath = stylepathOriginal;
        FINANZTOOLS.taglib.showChart(eval(newId));

        jQuery('.donutItem').mousedown(function() {
            console.log("1");
            //
            var idname = jQuery(jQuery('.donutSelected')[0]).attr('data-jsVarName');
            var newId = idname;
            var stylepathOriginal = eval(newId).stylePath
            var stylepath = eval(newId).styleOrigPath;
            eval(newId).stylePath = stylepath;
            FINANZTOOLS.taglib.showChart(eval(newId));
            //
            jQuery('.donutSelected').removeClass('donutSelected');
            jQuery(this).addClass('donutSelected');
            var objName = jQuery(this).attr("data-jsVarName");
            //
            var stylepathOriginal = eval(objName).stylePath
            var stylepath = eval(objName).stylePath;
            stylepath = stylepath.replace("/FebaStyle.properties", "/FebaStyleSingleDonut.properties");
            eval(objName).stylePath = stylepath;
            eval(objName).styleOrigPath = stylepathOriginal;
            FINANZTOOLS.taglib.showChart(eval(objName));

            //
        });
    },
    ABTranChartViewUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace215193049_Lon = undefined;
        toolPlace235193049_Opt = undefined;
        toolPlace2208193049_Dep = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace660101927_Opt)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace660101927_Opt.width = 400;
                    toolPlace660101927_Opt.height = 220;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else if (parseInt(windowWidth) >= 624 && parseInt(windowWidth) <= 719) {
                    toolPlace660101927_Opt.width = 350;
                    toolPlace660101927_Opt.height = 200;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else if (parseInt(windowWidth) >= 525 && parseInt(windowWidth) <= 623) {
                    toolPlace660101927_Opt.width = 430;
                    toolPlace660101927_Opt.height = 220;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 524) {
                    toolPlace660101927_Opt.width = 350;
                    toolPlace660101927_Opt.height = 220;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else {
                    toolPlace660101927_Opt.width = 500;
                    toolPlace660101927_Opt.height = 300;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                }
            }
        });

    },
    ABTranChartViewWidgetUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace215193049_Lon = undefined;
        toolPlace2208193049_Dep = undefined;
        toolPlace235193049_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace660101927_Opt)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace660101927_Opt.width = 400;
                    toolPlace660101927_Opt.height = 220;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 719) {
                    toolPlace660101927_Opt.width = 350;
                    toolPlace660101927_Opt.height = 200;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                    toolPlace660101927_Opt.width = 400;
                    toolPlace660101927_Opt.height = 220;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else {
                    toolPlace660101927_Opt.width = 500;
                    toolPlace660101927_Opt.height = 300;
                    jQuery('#toolPlace660101927').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                }
            }
        });

    },
    OpTransactionChartViewUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace215193049_Lon = undefined;
        toolPlace660101927_Opt = undefined;
        toolPlace2208193049_Dep = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace235193049_Opt)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace235193049_Opt.width = 400;
                    toolPlace235193049_Opt.height = 220;
                    jQuery('#toolPlace235193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 719) {
                    toolPlace235193049_Opt.width = 350;
                    toolPlace235193049_Opt.height = 200;
                    jQuery('#toolPlace235193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                    toolPlace235193049_Opt.width = 400;
                    toolPlace235193049_Opt.height = 220;
                    jQuery('#toolPlace235193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                } else {
                    toolPlace235193049_Opt.width = 500;
                    toolPlace235193049_Opt.height = 300;
                    jQuery('#toolPlace235193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                }
            }
        });
    },
    ABTranChartViewWidgetUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace215193049_Lon = undefined;
        toolPlace2208193049_Dep = undefined;
        toolPlace235193049_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace660101927_Opt)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace660101927_Opt.width = 400;
                    toolPlace660101927_Opt.height = 220;
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 719) {
                    toolPlace660101927_Opt.width = 350;
                    toolPlace660101927_Opt.height = 200;
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                    toolPlace660101927_Opt.width = 400;
                    toolPlace660101927_Opt.height = 220;
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                } else {
                    toolPlace660101927_Opt.width = 500;
                    toolPlace660101927_Opt.height = 300;
                    FINANZTOOLS.taglib.showChart(toolPlace660101927_Opt);
                }
            }
        });

    },
    OpTransactionChartViewWidgetUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace215193049_Lon = undefined;
        toolPlace2208193049_Dep = undefined;
        toolPlace660101927_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace235193049_Opt)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace235193049_Opt.width = 400;
                    toolPlace235193049_Opt.height = 220;
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 719) {
                    toolPlace235193049_Opt.width = 350;
                    toolPlace235193049_Opt.height = 200;
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                    toolPlace235193049_Opt.width = 400;
                    toolPlace235193049_Opt.height = 220;
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                } else {
                    toolPlace235193049_Opt.width = 500;
                    toolPlace235193049_Opt.height = 300;
                    FINANZTOOLS.taglib.showChart(toolPlace235193049_Opt);
                }
            }
        });
    },
    CCHistoryChartViewUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace215193049_Lon = undefined;
        toolPlace2208193049_Dep = undefined;
        toolPlace235193049_Opt = undefined;
        toolPlace660101927_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace1469315903_CC)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace1469315903_CC.width = 380;
                    toolPlace1469315903_CC.height = 220;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                } else if (parseInt(windowWidth) >= 624 && parseInt(windowWidth) <= 719) {
                    toolPlace1469315903_CC.width = 330;
                    toolPlace1469315903_CC.height = 200;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                } else if (parseInt(windowWidth) >= 530 && parseInt(windowWidth) <= 623) {
                    toolPlace1469315903_CC.width = 430;
                    toolPlace1469315903_CC.height = 220;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 529) {
                    toolPlace1469315903_CC.width = 350;
                    toolPlace1469315903_CC.height = 220;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                } else {
                    toolPlace1469315903_CC.width = 500;
                    toolPlace1469315903_CC.height = 300;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                }
            }
        });
    },
    CCHistoryChartViewWidgetUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace215193049_Lon = undefined;
        toolPlace2208193049_Dep = undefined;
        toolPlace235193049_Opt = undefined;
        toolPlace660101927_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace1469315903_CC)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace1469315903_CC.width = 400;
                    toolPlace1469315903_CC.height = 220;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 719) {
                    toolPlace1469315903_CC.width = 350;
                    toolPlace1469315903_CC.height = 200;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                    toolPlace1469315903_CC.width = 400;
                    toolPlace1469315903_CC.height = 220;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                } else {
                    toolPlace1469315903_CC.width = 500;
                    toolPlace1469315903_CC.height = 300;
                    jQuery('#toolPlace1469315903').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace1469315903_CC);
                }
            }
        });
    },
    DpTransactionChartViewUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace215193049_Lon = undefined;
        toolPlace235193049_Opt = undefined;
        toolPlace660101927_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace2208193049_Dep)) {
                var windowWidth = viewport().width;

                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 915) {
                    toolPlace2208193049_Dep.width = 380;
                    toolPlace2208193049_Dep.height = 220;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                } else if (parseInt(windowWidth) >= 624 && parseInt(windowWidth) <= 719) {
                    toolPlace2208193049_Dep.width = 330;
                    toolPlace2208193049_Dep.height = 200;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                } else if (parseInt(windowWidth) >= 530 && parseInt(windowWidth) <= 623) {
                    toolPlace2208193049_Dep.width = 430;
                    toolPlace2208193049_Dep.height = 220;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 529) {
                    toolPlace2208193049_Dep.width = 350;
                    toolPlace2208193049_Dep.height = 220;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                } else {
                    toolPlace2208193049_Dep.width = 500;
                    toolPlace2208193049_Dep.height = 300;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                }
            }
        });
        /*done for teh alignment issue in loans chart view*/
        jQuery(".container-nxtGenmedium .pinnableGroupletWrapper").css('margin-top', '-30px');
    },
    DpTransactionChartViewWidgetUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace215193049_Lon = undefined;
        toolPlace235193049_Opt = undefined;
        toolPlace660101927_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace2208193049_Dep)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace2208193049_Dep.width = 400;
                    toolPlace2208193049_Dep.height = 220;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 719) {
                    toolPlace2208193049_Dep.width = 350;
                    toolPlace2208193049_Dep.height = 200;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                    toolPlace2208193049_Dep.width = 400;
                    toolPlace2208193049_Dep.height = 220;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                } else {
                    toolPlace2208193049_Dep.width = 500;
                    toolPlace2208193049_Dep.height = 300;
                    jQuery('#toolPlace2208193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace2208193049_Dep);
                }
            }
        });
    },
    LnTransactionChartViewWidgetUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace2208193049_Dep = undefined;
        toolPlace660101927_Opt = undefined;
        toolPlace235193049_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace215193049_Lon)) {
                var windowWidth = viewport().width;
                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace215193049_Lon.width = 400;
                    toolPlace215193049_Lon.height = 220;
                    jQuery('#toolPlace215193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                } else if (parseInt(windowWidth) >= 640 && parseInt(windowWidth) <= 719) {
                    jQuery('#toolPlace215193049').find('embed').remove();
                    toolPlace215193049_Lon.width = 350;
                    toolPlace215193049_Lon.height = 200;
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 639) {
                    jQuery('#toolPlace215193049').find('embed').remove();
                    toolPlace215193049_Lon.width = 400;
                    toolPlace215193049_Lon.height = 220;
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                } else {
                    jQuery('#toolPlace215193049').find('embed').remove();
                    toolPlace215193049_Lon.width = 500;
                    toolPlace215193049_Lon.height = 300;
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                }
            }
        });
    },
    LnTransactionChartViewUX4_onload: function(groupletId) {
        convertComboboxes();

        toolPlace1469315903_CC = undefined;
        toolPlace2208193049_Dep = undefined;
        toolPlace660101927_Opt = undefined;
        toolPlace235193049_Opt = undefined;

        jQuery(window).resize(function() {
            if ("undefined" !== typeof(toolPlace215193049_Lon)) {
                var windowWidth = viewport().width;

                if (parseInt(windowWidth) >= 720 && parseInt(windowWidth) <= 899) {
                    toolPlace215193049_Lon.width = 390;
                    toolPlace215193049_Lon.height = 220;
                    jQuery('#toolPlace215193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                } else if (parseInt(windowWidth) >= 624 && parseInt(windowWidth) <= 719) {
                    toolPlace215193049_Lon.width = 340;
                    toolPlace215193049_Lon.height = 200;
                    jQuery('#toolPlace215193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                } else if (parseInt(windowWidth) >= 530 && parseInt(windowWidth) <= 623) {
                    toolPlace215193049_Lon.width = 440;
                    toolPlace215193049_Lon.height = 220;
                    jQuery('#toolPlace215193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                } else if (parseInt(windowWidth) >= 0 && parseInt(windowWidth) <= 529) {
                    toolPlace215193049_Lon.width = 360;
                    toolPlace215193049_Lon.height = 220;
                    jQuery('#toolPlace215193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                } else {
                    toolPlace215193049_Lon.width = 480;
                    toolPlace215193049_Lon.height = 300;
                    jQuery('#toolPlace215193049').find('embed').remove();
                    FINANZTOOLS.taglib.showChart(toolPlace215193049_Lon);
                }
            }
        });
        /*done for teh alignment issue in loans chart view*/
        jQuery(".container-nxtGenmedium .pinnableGroupletWrapper").css('margin-top', '-30px');
    },
    AccountSummaryUX4_onload: function(groupletId) {
        setTimeout(function() {
            if (jQuery('#' + groupletId).find('.widgetPaginationFooterNextGenBorderTop').length == 0 &&
                jQuery('#' + groupletId).find('.nextGenstage3_listingpaneldiv').length > 0) {

                jQuery('#' + groupletId + '_pinnableWrapper').css('position', '');
            }
            jQuery('.positionrelativeimp').removeClass('positionrelativeimp');
            jQuery('.nextGenDetailsPagePulldownHolder').css('position', 'relative');
            jQuery('.nextGenDetailsPagePulldownHolder').css('top', '0px');
        }, 100);

        convertComboboxes();
        jQuery('.container-nxtGenmedium .hasPulldownMenu .menuArrowImageDown').css('margin-left', '20px');
        jQuery('.container-nxtGenNoTopmedium').find('.widget-medium').find('.empty-widget').css('min-height', '345px');
        if (jQuery('#' + groupletId).find('table').length == 0) {
            jQuery('#' + groupletId).css('background-color', '#FFF');
        }

        if (jQuery('.nextGenUX4').length > 0) {
            var vpWidth = viewport().width;
            if (parseInt(vpWidth) < 640) {
                jQuery(".menuChoices_3,.menuChoices_4,.menuChoices_5").addClass("menuChoiceAccntAlign");
            }
            jQuery(window).resize(function() {
                vpWidth = viewport().width;
                if (parseInt(vpWidth) < 640) {
                    jQuery(".menuChoices_3,.menuChoices_4,.menuChoices_5").addClass("menuChoiceAccntAlign");
                } else {
                    jQuery(".menuChoices_3,.menuChoices_4,.menuChoices_5").removeClass("menuChoiceAccntAlign");
                }
            });
            jQuery('#' + groupletId).addClass('noOverflow');

        }
    },
    PhotoUploadUX3_onload: function(groupletId) {
        var elementId = 'PROFILEPHOTO';
        var elementId1 = 'FileBrowse993654';
        if (groupletId && groupletId != null) {
            elementId = groupletId + "\\:" + elementId;
            elementId1 = groupletId + "\\:" + elementId1;
        }
        feba.domManipulator.bind(feba.domManipulator.getElementById(elementId1), "change", function() {
            if (this.files && this.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    jQuery("#" + elementId + "")
                        .attr('src', e.target.result)
                        .width(100)
                        .height(100);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    },
    DLCCyberReceiptUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "collapsableMenu";

            script.src = "scripts/collapsableMenu.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/collapsableMenu.js"); //earlier call added in else
        }
    },
    RMACyberReceiptUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "collapsableMenu";

            script.src = "scripts/collapsableMenu.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/collapsableMenu.js"); //earlier call added in else
        }
    },
    RMARequestConfirmationUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "collapsableMenu";

            script.src = "scripts/collapsableMenu.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/collapsableMenu.js"); //earlier call added in else
        }
    },
    ServiceRequestListUX3_onload: function(groupletId) {
        /*Surej RWD for collapsible fix in service request list screen START*/
        jQuery(".newRequest_width60percent").css("width", "100%"); //search button coming down in lower resolns
        jQuery(".simpletextlistingebux").css("right", "7px"); //Note is gettign overlapped with other literals
        jQuery(".width79percent_navigationpanel").css("margin-top", "10px");

        jQuery(".collapsible_tab").children("span").removeClass("expandMenu_SRListing").addClass("collapseMenu_SRListing");
        if (jQuery(".collapsible_tab").children(".collapseMenu_SRListing").length > 0) {
            jQuery("tr[id^='collapse']").css("display", "none");
        } else {
            jQuery("tr[id^='collapse']").css("display", "table-row");
        }
        /*Surej RWD for collapsible fix in service request list screen END*/
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "collapsableMenu";

            script.src = "scripts/collapsableMenu.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/collapsableMenu.js"); //earlier call added in else
        }

    },
    SRCorporateList_onload: function(groupletId) {
        /*Surej RWD for collapsible fix in service request list screen START*/
        jQuery(".newRequest_width60percent").css("width", "100%"); //search button coming down in lower resolns
        jQuery(".simpletextlistingebux").css("right", "7px"); //Note is gettign overlapped with other literals
        jQuery(".width79percent_navigationpanel").css("margin-top", "10px");

        jQuery(".collapsible_tab").children("span").removeClass("expandMenu_SRListing").addClass("collapseMenu_SRListing");
        if (jQuery(".collapsible_tab").children(".collapseMenu_SRListing").length > 0) {
            jQuery("tr[id^='collapse']").css("display", "none");
        } else {
            jQuery("tr[id^='collapse']").css("display", "table-row");
        }
        /*Surej RWD for collapsible fix in service request list screen END*/
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "collapsableMenu";

            script.src = "scripts/collapsableMenu.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/collapsableMenu.js"); //earlier call added in else
        }

    },
    SRRetailList_onload: function(groupletId) {
        /*Surej RWD for collapsible fix in service request list screen START*/
        jQuery(".newRequest_width60percent").css("width", "100%"); //search button coming down in lower resolns
        jQuery(".simpletextlistingebux").css("right", "7px"); //Note is gettign overlapped with other literals
        jQuery(".width79percent_navigationpanel").css("margin-top", "10px");

        jQuery(".collapsible_tab").children("span").removeClass("expandMenu_SRListing").addClass("collapseMenu_SRListing");
        if (jQuery(".collapsible_tab").children(".collapseMenu_SRListing").length > 0) {
            jQuery("tr[id^='collapse']").css("display", "none");
        } else {
            jQuery("tr[id^='collapse']").css("display", "table-row");
        }
        /*Surej RWD for collapsible fix in service request list screen END*/
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "collapsableMenu";

            script.src = "scripts/collapsableMenu.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/collapsableMenu.js"); //earlier call added in else
        }

    },
    SRQueryHistoryDetailsUX3_onload: function(groupletId) {
        jQuery("h3").removeClass("notopborder");
    },
    PreferencesSetUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    RetailPreferencesSet_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    CorporatePreferencesSet_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    RMPreferencesSet_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    /*Aashish added for corp*/
    CorporatePasswordChange_onload: function(groupletId) {
        jQuery('#DataEntry_LeftContainer_Stage39\\.Rbb8').css('border-bottom', 'none'); //Aashish added for corp
        jQuery('#NavigationPanel_Stage311').css('padding-bottom', '10px');
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    PasswordChangeUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    AuthRegisterQnAScreenUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            //added for call id : 668710 - starts
            var script1 = document.createElement('script');
            script1.id = 'id2' + "MandatoryCheck";
            script1.src = "scripts/module/user/MandatoryCheck.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script1);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script1);
            }
            //added for call id : 668710 - ends
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    RegisterSQnAScreenUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            //added for call id : 668710 - starts
            var script1 = document.createElement('script');
            script1.id = 'id2' + "MandatoryCheck";
            script1.src = "scripts/module/user/MandatoryCheck.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script1);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script1);
            }
            //added for call id : 668710 - ends
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    LoginAltFlowQNAScreenUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            //added for call id : 668710 - starts
            var script1 = document.createElement('script');
            script1.id = 'id2' + "MandatoryCheck";
            script1.src = "scripts/module/user/MandatoryCheck.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script1);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script1);
            }
            //added for call id : 668710 - ends
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    LoginAltFlowSetPasswordUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    PersonalProfileQnaRegistrationScreenUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }
    },
    ViewTransactionStatementList_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "DematTransactionType";

            script.src = "scripts/DematTransactionType.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/DematTransactionType.js");
        }
    },
    FDORequestConfirmationUX3_onload: function(groupletId) {
        var stage3Details = jQuery('.stage3_previewconfirmdetails');
        for (j = 0; j < stage3Details.length; j++) {
            var currElement = stage3Details[j];
            if (jQuery(currElement).children().length == 0) {
                jQuery(currElement).css('display', 'none');
            }
        }
    },
    ViewTransactionDetailsRetail_onload: function(groupletId) {
        var showBackToDashboard = jQuery("#showBackToDashboard");
        console.log(showBackToDashboard);
        if (showBackToDashboard && (groupletId == null || groupletId.length == 0 || groupletId == "undefined" || groupletId == "null")) {
            jQuery(".errorContentWrapper").css('width', '100%');
            jQuery(".errorContentWrapper").css('padding-left', '2px');
            jQuery(".redbgwithwidth").css('width', '100%');
            jQuery(".redbgwithwidth").css('padding-left', '2px');
            jQuery(".greenbgwithwidth").css('width', '100%');
            jQuery(".greenbgwithwidth").css('padding-left', '2px');
            var content = jQuery("#ReadOnly_LeftContainer_Stage35").nextAll();
            jQuery("<div id='tempDiv'></div>").insertAfter("#ReadOnly_LeftContainer_Stage35");
            jQuery("#tempDiv").wrapInner(content);
            jQuery("#tempDiv").css('background-color', 'white');

        }
        var stage3Details = jQuery('.stage3_previewconfirmdetails');
        for (j = 0; j < stage3Details.length; j++) {
            var currElement = stage3Details[j];
            if (jQuery(currElement).children().length == 0) {
                jQuery(currElement).css('border-top', '0px');
            }
        }
    },
    OpAccountDetailsRetUX3_onload: function(groupletId) {
        if (jQuery.browser.msie && jQuery("#MODAL_VIEW_CONTAINER").length == 1) {
            jQuery('html, body').animate({
                scrollTop: jQuery("#MODAL_VIEW_CONTAINER").offset().top
            }, 0);
        }
        if (groupletId == null || groupletId.length == 0 || groupletId == "undefined" || groupletId == "null") {
            jQuery(".errorContentWrapper").css('width', '100%');
            jQuery(".errorContentWrapper").css('padding-left', '2px');
            var content = jQuery("#ReadOnly_LeftContainer_Stage3_ModalView3").nextAll();
            jQuery("<div id='tempDiv'></div>").insertAfter("#ReadOnly_LeftContainer_Stage3_ModalView3");
            jQuery("#tempDiv").wrapInner(content);
            jQuery("#tempDiv").css('background-color', 'white');

        }
        var stage3Details = jQuery('.stage3_previewconfirmdetails');
        for (j = 0; j < stage3Details.length; j++) {
            var currElement = stage3Details[j];
            if (jQuery(currElement).children().length == 0) {
                jQuery(currElement).css('border-top', '0px');
            }
        }
    },
    ViewPTPCounterPartyDetailsHomeUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");

        jQuery(".InActiveMenu").css('overflow', 'hidden');
        jQuery(".InActiveMenu").ellipsis({
            width: 220
        });
        jQuery(".ActiveMenu").css('overflow', 'hidden');
        jQuery(".ActiveMenu").ellipsis({
            width: 220
        });
        jQuery(window).resize(function() {
            jQuery(".InActiveMenu").css('overflow', 'hidden');
            jQuery(".InActiveMenu").ellipsis({
                width: 220
            });
            jQuery(".ActiveMenu").css('overflow', 'hidden');
            jQuery(".ActiveMenu").ellipsis({
                width: 220
            });

        });
    },
    PTPAddCounterPartyUX3_onload: function(groupletId) {
        displayAdditional(groupletId);
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");

        //logic added for correcting validation icon alignment in lower resolution
        if (groupletId != null && groupletId.length != 0 && groupletId != "undefined" && groupletId != "null") {
            if (jQuery('.invalid') != undefined && jQuery('.invalid') != null &&
                jQuery('.invalid') != "null" && jQuery('.invalid').length != 0) {
                var content = jQuery(jQuery('.invalid')).prev();
                var img = jQuery('.invalid');
                jQuery("<div id='tempDiv' style='display:inline-block'></div>").insertAfter(".invalid");
                jQuery("#tempDiv").wrapInner(img);
                jQuery(content).insertBefore(".invalid");
            } else {
                var content = jQuery(jQuery('.valid')).prev();
                var img = jQuery('.valid');
                jQuery("<div id='tempDiv' style='display:inline-block'></div>").insertAfter(".valid");
                jQuery("#tempDiv").wrapInner(img);
                jQuery(content).insertBefore(".valid");
            }
        }
        jQuery(".InActiveMenu").css('overflow', 'hidden');
        jQuery(".InActiveMenu").ellipsis({
            width: 250
        });
        jQuery(".ActiveMenu").css('overflow', 'hidden');
        jQuery(".ActiveMenu").ellipsis({
            width: 250
        });
        jQuery(window).resize(function() {
            jQuery(".InActiveMenu").css('overflow', 'hidden');
            jQuery(".InActiveMenu").ellipsis({
                width: 250
            });
            jQuery(".ActiveMenu").css('overflow', 'hidden');
            jQuery(".ActiveMenu").ellipsis({
                width: 250
            });

        });
    },
    ViewPTPCounterpartyAllRequestUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");

        jQuery(".InActiveMenu").css('overflow', 'hidden');
        jQuery(".InActiveMenu").ellipsis({
            width: 250
        });
        jQuery(".ActiveMenu").css('overflow', 'hidden');
        jQuery(".ActiveMenu").ellipsis({
            width: 250
        });
        jQuery(window).resize(function() {
            jQuery(".InActiveMenu").css('overflow', 'hidden');
            jQuery(".InActiveMenu").ellipsis({
                width: 250
            });
            jQuery(".ActiveMenu").css('overflow', 'hidden');
            jQuery(".ActiveMenu").ellipsis({
                width: 250
            });

        });
    },
    PTPHostCPApprovalQueueUX3_onload: function() {
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");

        jQuery(".InActiveMenu").css('overflow', 'hidden');
        jQuery(".InActiveMenu").ellipsis({
            width: 250
        });
        jQuery(".ActiveMenu").css('overflow', 'hidden');
        jQuery(".ActiveMenu").ellipsis({
            width: 250
        });
        jQuery(window).resize(function() {
            jQuery(".InActiveMenu").css('overflow', 'hidden');
            jQuery(".InActiveMenu").ellipsis({
                width: 250
            });
            jQuery(".ActiveMenu").css('overflow', 'hidden');
            jQuery(".ActiveMenu").ellipsis({
                width: 250
            });

        });
    },
    AccessSchemeMenuLinkageEntry_onload: function() {
        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/channeladministration/SmartPhone.js");
        var adaptiveMenuPrf = feba.domManipulator.getElementById("AccessSchemeMaintenanceFG.ADAPTIVE_MNU_PRF_CD");
        var adaptiveMenuPrfLabel = feba.domManipulator.getElementById("ADAPTIVE_MNU_PRF_CD");
        feba.domManipulator.hideElement(adaptiveMenuPrf);
        feba.domManipulator.hideElement(adaptiveMenuPrfLabel);
    },
    AccountSummaryMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/AccountSummaryMB.js");
    },
    OpTransactionHistoryMB_onload: function() {
        //console.log("Loading script OpTransactionHistoryMB...");
        feba.domManipulator.loadScript("scripts/module/accounts/OpTransactionHistoryMB.js");
    },
    LnTransactionHistoryMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/LnTransactionHistoryMB.js");
    },
    TransactionHistoryMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/TransactionHistoryMB.js");
    },
    CCTXNHistoryMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/accounts/CCTXNHistoryMB.js");
    },
    TxnEntryDetailsUX3_onload: function() {

        if (jQuery.browser.msie && jQuery("#MODAL_VIEW_CONTAINER").length == 1) {
            jQuery('html, body').animate({
                scrollTop: jQuery("#MODAL_VIEW_CONTAINER").offset().top
            }, 0);
        }
    },
    ChequeInquiryUX3_onload: function(groupletId) {

        if (jQuery('.modalWrapper').find('.error_highlight').length > 0) {
            var floatDirection = "left";
            if (feba.domManipulator.isRTL()) {
                floatDirection = "right";
            }
            jQuery('.modalWrapper').find('.error_highlight').css('float', floatDirection);
            jQuery('.modalWrapper').find('.error_highlight').css('padding-top', '8px');
        }
    },
    OpTransactionHistoryWidUX4_onload: function() {

        convertComboboxes();
        jQuery('.dashboardSection .listgreyrowtxtleftline_new').css('float', 'none');
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".bluelink_wrap").ellipsis({
            width: 100
        });
    },
    OpTransactionHistoryUX4_onload: function(groupletId) {
        jQuery('.nextGenUX4 .listgreyrowtxtleftline_new').css('float', 'none');
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery('#' + groupletId).find(".bluelink_wrap").ellipsis({
            width: 100
        });
    },
    CCTXNDetailsHistoryWidUX4_onload: function() {

        convertComboboxes();
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".searchsimpletext_cctxnarray").ellipsis({
            width: 120
        });
    },
    CCTXNDetailsHistoryUX4_onload: function() {

        convertComboboxes();
        jQuery('.container-nxtGenmedium .stage3_searchpaneldiv').css('margin-left', '6px');
        feba.domManipulator.loadScript("scripts/common/NFEBAEllipsis.js");
        jQuery(".searchsimpletext_cctxnarray").ellipsis({
            width: 120
        });
    },
    CCTXNDetailsHistoryWidUX4_onload: function() {

        convertComboboxes();
    },
    LnAmortScheduleUX4_onload: function(groupletId) {
        if (jQuery('.bubble').hasClass('hideElement')) {
            console.log("already hidden");
        } else {
            jQuery('.bubble').addClass('hideElement');
        }

    },
    DpScheduleUX3_onload: function() {
        jQuery(".stage3_rightwithmargin").css('margin-top', '0');

        jQuery(window).resize(function() {
            jQuery(".stage3_rightwithmargin").css('margin-top', '0');
        });
    },

    InitiateChequeIssuancePaymentDetails_onload: function(groupletId) {

        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "inmg";

            script.src = "scripts/module/inmg/inmg.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            displayPayeeDetails(groupletId);

        } else {
            feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        }
    },

    InitiateDemandDraftIssuancePaymentDetails_onload: function(groupletId) {

        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "inmg";

            script.src = "scripts/module/inmg/inmg.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            displayPayeeDetails(groupletId);

        } else {
            feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        }
    },
    InitiateDemandDraftIssuancePrintDetails_onload: function(groupletId) {

        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "inmg";
            script.src = "scripts/module/inmg/inmg.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);

            }
        } else {
            feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        }
        hideEmptyElements(groupletId);
        hideHiddenElements(groupletId);
    },
    InitiateChequeIssuancePrintDetails_onload: function(groupletId) {

        feba.js.common.displayWarning = "N";
        feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = "inmg";
            script.src = "scripts/module/inmg/inmg.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);

            }
        } else {
            feba.domManipulator.loadScript("scripts/module/inmg/inmg.js");
        }

    },
    ActivityInqCorpUX3_onload: function(groupletId) {
        setTimeout(
            function() {
                if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

                    var script = document.createElement('script');

                    script.id = 'id1' + "DetailedInquiryChange";

                    script.src = "scripts/module/general/DetailedInquiryChange.js?groupletId=" + groupletId + ";";

                    if (document.head) {
                        document.head.appendChild(script);
                    } else {
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }



                } else {
                    feba.domManipulator.loadScript("scripts/module/general/DetailedInquiryChange.js"); //earlier call added in else
                }
            }, 1000);
    },
    ViewQueryFacilities_onload: function(groupletId) {
        handleUX2toNextGenPageJumps(groupletId);
    },
    LimitNodeDetails_onload: function(groupletId) {
        handleUX2toNextGenPageJumps(groupletId);
    },
    CollectionPreviewConfirmationDetails_onload: function(groupletId) {

        grpId = groupletId + ":";
        jQuery("[id='" + grpId + "DispFormWithListTableWithTableContentSixCol.RowSetHeader21']").css("border-top", "1px solid #979797");
    },
    ActivityInqConsumerUX3_onload: function(groupletId) {
        setTimeout(
            function() {
                if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

                    var script = document.createElement('script');

                    script.id = 'id1' + "DetailedInquiryChange";

                    script.src = "scripts/module/general/DetailedInquiryChange.js?groupletId=" + groupletId + ";";

                    if (document.head) {
                        document.head.appendChild(script);
                    } else {
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }



                } else {
                    feba.domManipulator.loadScript("scripts/module/general/DetailedInquiryChange.js"); //earlier call added in else
                }
            }, 1000);
    },
    InquiryFacility_onload: function(groupletId) {
        setTimeout(
            function() {

                if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
                    var script = document.createElement('script');
                    script.id = 'NdynamicFetch';
                    script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";
                    if (document.head) {
                        document.head.appendChild(script);
                    } else {
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }
                } else {
                    feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
                }
            }, 1000);
    },
    InitiatePaymentMB_onload: function() {
        feba.domManipulator.loadScript("scripts/module/transaction/InitiatePaymentMB.js");
    },
    FindBankDetailsListMB_onload: function() {
        setTimeout(
            function() {
                jQuery("select").febaCombobox("destroy");
            }, 500);
    },
    DpScheduleUX4_onload: function(groupletId) {
        if (jQuery('.bubble').hasClass('hideElement')) {
            console.log("already hidden");
        } else {
            jQuery('.bubble').addClass('hideElement');
        }

    },
    LnAmortScheduleWidUX4_onload: function() {

        convertComboboxes();
        if (jQuery('.bubble').hasClass('hideElement')) {
            console.log("already hidden");
        } else {
            jQuery('.bubble').addClass('hideElement');
        }
    },
    TransactionType_onload: function() {
        jQuery(".labelColumn_combo").addClass("multipleListBoxAdmin");
    },
    DpScheduleWidUX4_onload: function() {

        convertComboboxes();
        if (jQuery('.bubble').hasClass('hideElement')) {
            console.log("already hidden");
        } else {
            jQuery('.bubble').addClass('hideElement');
        }
    },
    UserChannelLinkageMaint_onload: function() {
        hideSameUserIdButtonsRM();
    },
    CreateUserChannelLinkage_onload: function() {
        hideSameUserIdButtons();
    },
    CreateUserChannelLinkageUX3_onload: function() {
        hideSameUserIdButtons();
    },
    MPCreateUserChannelLinkageUX3_onload: function() {
        hideSameUserIdMPButtons();
    },
    ScheduledTransactionRetUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');
            jQuery('.step_trackerwidth_withoutmargin').css('width', '99%'); //Added because the calendar button was exceeding the left container border
            script.id = 'SwitchView';

            script.src = "scripts/module/transaction/SwitchView.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/transaction/SwitchView.js");
        }
        feba.domManipulator.loadScript("scripts/module/transaction/ScheduledTxnsFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.scheduledTxnsFEBACalendar);
    },
    ScheduledTransactionCorpUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');
            jQuery('.step_trackerwidth_withoutmargin').css('width', '99%'); //Added because the calendar button was exceeding the left container border
            script.id = 'SwitchView';

            script.src = "scripts/module/transaction/SwitchView.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/transaction/SwitchView.js");
        }
        feba.domManipulator.loadScript("scripts/module/transaction/ScheduledTxnsFEBACalendar.js");
        feba.domManipulator.documentReady(feba.useCase.scheduledTxnsFEBACalendar);
    },
    /* Script call for Initiate Batch Header*/
    InitiateBatchTransactionHeaderUX3_onload: function(groupletId) {
        feba.js.common.displayWarning = "N";

        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'InitiateCompanyIDCheck';

            script.src = "scripts/module/transaction/InitiateCompanyIDCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/transaction/InitiateCompanyIDCheck.js");
        }
        updateErrorMsgLocation("div", "stage3_inputpanel_paydetailsrow");

    },
    FBALoginCaptcha_onload: function() {

        if (jQuery.browser.safari) {
            jQuery(".loginPanelFBButtonStyle").addClass('loginPanelFBButtonStyle_Safari');
            jQuery(".loginPanelFBButtonStyle").removeClass('loginPanelFBButtonStyle');
        }

        jQuery('#Details_TopLeftContainer_Stage3_ModalView1').removeClass();
        jQuery('#Details_TopLeftContainer_Stage3_ModalView1').addClass('displayNone');
        if (typeof isAdaptiveUI != 'undefined' && isAdaptiveUI == "true") {
            jQuery('#MBLoginHDisplay\\.Rc1\\.C1').addClass('mbloginPanelColumnDetailNewStyle');
            jQuery('#MBLoginHDisplay\\.Rc1\\.C1').removeClass('mbloginPanelColumnDetailStyle');
        } else {
            jQuery("[name='AuthenticationFG.VERIFICATION_CODE']").attr("placeHolder", getMessage("ConfirmVerification"));
        }

    },
    /*Aashish added for corp*/
    ChequeInquiry_onload: function(groupletId) {
        jQuery("h3").css('border-top', 'none');
        jQuery('.stage3_detailspanel').css('padding-top', '0px');
        if (jQuery('.modalWrapper').length > 0) {

            jQuery("[id$='Details_TopLeftContainer_Stage33.SubSection3']").parent().css('border-top', '1px solid #CCCCCC');
        }
    },
    /* added for corp
    AlertPrefrenceSetUX3_onload: function(groupletId){
    	feba.domManipulator.loadScript("scripts/NdynamicShowAlertFields.js");
    },*/
    /*Added as fix for ticket 730402 ---start*/
    ViewCounterPartyDetails_onload: function(groupletId) {

        jQuery("#" + groupletId + "\\:PRINT_MANDATE").removeClass('nextGen_HwButton');
        jQuery("#" + groupletId + "\\:PRINT_MANDATE").parent().removeClass('nextGen_HwButton');


    },
    CounterPartySummaryUX3_onload: function(groupletId) {

        jQuery("#" + groupletId + "\\:PRINT_MANDATE").removeClass('nextGen_HwButton');
        jQuery("#" + groupletId + "\\:PRINT_MANDATE").parent().removeClass('nextGen_HwButton');

    },
    CounterPartyDetailsUX3_onload: function(groupletId) {

        jQuery("#" + groupletId + "\\:PRINT_MANDATE").removeClass('nextGen_HwButton');
        jQuery("#" + groupletId + "\\:PRINT_MANDATE").parent().removeClass('nextGen_HwButton');

    },
    /*Added as fix for ticket 730402 ---end*/
    /*Added for login flow center alignment of page  --- Start*/
    RegisterSQnAScreen_onload: function() {
        jQuery('form').css('max-width', '1024px');
        jQuery('form').css('margin', 'auto');

    },
    PasswordChangeScreen_onload: function() {
        /*jQuery('form').css('max-width','1024px');--Commented by Parvathy for FBN*/
        jQuery('form').css('margin', 'auto');

    },
    TermsAndConditionsScreen_onload: function() {
        /*jQuery('form').css('max-width','1024px');--Commented by Parvathy for FBN*/
        jQuery('form').css('margin', 'auto');
        jQuery('#InfoPanel').addClass('infoPanelTermsAndConds');
        jQuery('#NavPanel').addClass('navPanelTermsAndConditions');
        jQuery('#InfoPanel\\.Rowset1').children().addClass('paddingLeftTermsAndConds');
        var vpWidth = viewport().width;
        if (parseInt(vpWidth) <= 900) {
            jQuery('#global').css('width', '97.6%');
        }
        jQuery(window).resize(function() {
            vpWidth = viewport().width;
            if (parseInt(vpWidth) <= 900) {
                jQuery('#global').css('width', '97.6%');
            } else if (parseInt(vpWidth) > 900) {

                jQuery('#global').css('width', '99%');
            }
        });

    },
    IncompleteTransactionCorpUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'radioChangeTxnUX3';

            script.src = "scripts/module/transaction/radioChangeTxnUX3.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/transaction/radioChangeTxnUX3.js.js");
        }

    },
    EncryptionRegistration_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "Encryption";

            script.src = "scripts/module/corporateadministration/Encryption.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/corporateadministration/Encryption.js");
        }
    },
    EncryptionRegistrationUX3_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "Encryption";

            script.src = "scripts/module/corporateadministration/Encryption.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/corporateadministration/Encryption.js");
        }
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc5\\.C2']").css('padding-left', '7px');
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc4\\.C2']").css('margin-top', '8px');
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc4\\.C2']").css('padding-left', '7px');
    },
    UpdateEncryptionDetails_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "Encryption";

            script.src = "scripts/module/corporateadministration/Encryption.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/corporateadministration/Encryption.js");
        }

    },
    UpdateEncryptionDetailsUX3_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "Encryption";

            script.src = "scripts/module/corporateadministration/Encryption.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/corporateadministration/Encryption.js");
        }
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc5\\.C2']").css('padding-left', '7px');
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc4\\.C2']").css('margin-top', '8px');
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc4\\.C2']").css('padding-left', '7px');
        jQuery("[id$='FileUploadEncryptionCRUDFG\\.ISSIGREQ']").attr('checked', false);
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc5']").css('display', 'none');
        jQuery("[id$='DataEntry_LeftContainer_Stage39\\.Rc6']").css('display', 'none');
    },
    ASLDataCaptureUX3_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "NFEBAAccountServiceLinkage";

            script.src = "scripts/module/servicerequest/NFEBAAccountServiceLinkage.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBAAccountServiceLinkage.js");
        }

    },


    SRRetailActivateDebitCardReq_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "NFEBADebitCardLimitCheck";

            script.src = "scripts/module/servicerequest/NFEBADebitCardLimitCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NFEBADebitCardLimitCheck.js");
        }

    },
    CLMDataCaptureUX3_onload: function(groupletId) {
        if (isGroupletExecution(groupletId)) {

            var script = document.createElement('script');

            script.id = "NdynamicFetch";

            script.src = "scripts/NdynamicFetch.js?groupletId=" + groupletId + ";";
            var script1 = document.createElement('script');

            script1.id = "id1NfnScript";

            script1.src = "scripts/module/servicerequest/NfnScript.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
                document.head.appendChild(script1);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
                document.getElementsByTagName('head')[0].appendChild(script1);
            }
        } else {
            feba.domManipulator.loadScript("scripts/NdynamicFetch.js");
            feba.domManipulator.loadScript("scripts/module/servicerequest/NfnScript.js");
        }

    },
    RetailPasswordChange_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            //added for call id : 668710 - starts
            var script1 = document.createElement('script');
            script1.id = 'id2' + "MandatoryCheck";
            script1.src = "scripts/module/user/MandatoryCheck.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script1);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script1);
            }
            //added for call id : 668710 - ends
        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }

        if (jQuery('[name=isDashboardWidget]') != null && jQuery('[name=isDashboardWidget]').length > 0) {
            if (jQuery('[name=isDashboardWidget]').val() === 'Y') {
                var element = jQuery('.section_grayborder').find('.querytextleftquickpaywidget');
                if (element != null && element.length > 0) {
                    jQuery(element).removeClass('querytextleftquickpaywidget');
                    jQuery(element).addClass('querytextleft');
                    jQuery(element).siblings().removeClass('querytextrightquickpaywidget');
                    jQuery(element).siblings().addClass('querytextright');
                }
                var userIdLeftEle = jQuery('.section_grayborder').find('.querytextleftStyle');
                var userIdRightEle = jQuery('.section_grayborder').find('.querytextleftStyle').siblings().children();
                if (userIdLeftEle != null && userIdLeftEle.length > 0) {
                    jQuery(userIdLeftEle).removeClass('querytextleftStyle');
                    jQuery(userIdLeftEle).addClass('querytextleft');
                }
                if (userIdRightEle != null && userIdRightEle.length > 0) {
                    jQuery(userIdRightEle).removeClass('querytextboxmedium_search');
                    jQuery(userIdRightEle).addClass('querytextboxmedium_searchquickpayRemark');
                    jQuery(userIdRightEle).children().removeClass('labelcolumnsearch');
                    jQuery(userIdRightEle).children().addClass('labelcolumnsearchquickpayRemark');
                }

            }
        }
        jQuery(window).resize(function() {
            if (jQuery('[name=isDashboardWidget]') != null && jQuery('[name=isDashboardWidget]').length > 0) {
                if (jQuery('[name=isDashboardWidget]').val() === 'Y') {
                    var element = jQuery('.section_grayborder').find('.querytextleftquickpaywidget');
                    if (element != null && element.length > 0) {
                        jQuery(element).removeClass('querytextleftquickpaywidget');
                        jQuery(element).addClass('querytextleft');
                        jQuery(element).siblings().removeClass('querytextrightquickpaywidget');
                        jQuery(element).siblings().addClass('querytextright');
                    }
                    var userIdLeftEle = jQuery('.section_grayborder').find('.querytextleftStyle');
                    var userIdRightEle = jQuery('.section_grayborder').find('.querytextleftStyle').siblings().children();
                    if (userIdLeftEle != null && userIdLeftEle.length > 0) {
                        jQuery(userIdLeftEle).removeClass('querytextleftStyle');
                        jQuery(userIdLeftEle).addClass('querytextleft');
                    }
                    if (userIdRightEle != null && userIdRightEle.length > 0) {
                        jQuery(userIdRightEle).removeClass('querytextboxmedium_search');
                        jQuery(userIdRightEle).addClass('querytextboxmedium_searchquickpayRemark');
                        jQuery(userIdRightEle).children().removeClass('labelcolumnsearch');
                        jQuery(userIdRightEle).children().addClass('labelcolumnsearchquickpayRemark');
                    }

                }
            }
        });

        if (isGroupletExecution(groupletId)) {
            jQuery('[id="' + groupletId + ':DataEntry_LeftContainer_Stage39.SubSection2' + '"]').find('[type="password"]').parent().addClass("textboxPasswordChangeHw");
            jQuery('[id="' + groupletId + ':DataEntry_LeftContainer_Stage39.SubSection3' + '"]').find('[type="password"]').parent().addClass("textboxPasswordChangeHw");
        }
    },
    CorporatePasswordChange_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NFEBAPasswordChange";

            script.src = "scripts/NFEBAPasswordChange.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            //added for call id : 668710 - starts
            var script1 = document.createElement('script');
            script1.id = 'id2' + "MandatoryCheck";
            script1.src = "scripts/module/user/MandatoryCheck.js?groupletId=" + groupletId + ";";
            if (document.head) {
                document.head.appendChild(script1);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script1);
            }
            //added for call id : 668710 - ends

        } else {
            feba.domManipulator.loadScript("scripts/NFEBAPasswordChange.js");
        }

        if (jQuery('[name=isDashboardWidget]') != null && jQuery('[name=isDashboardWidget]').length > 0) {
            if (jQuery('[name=isDashboardWidget]').val() === 'Y') {
                var element = jQuery('.section_grayborder').find('.querytextleftquickpaywidget');
                if (element != null && element.length > 0) {
                    jQuery(element).removeClass('querytextleftquickpaywidget');
                    jQuery(element).addClass('querytextleft');
                    jQuery(element).siblings().removeClass('querytextrightquickpaywidget');
                    jQuery(element).siblings().addClass('querytextright');
                }
                var userIdLeftEle = jQuery('.section_grayborder').find('.querytextleftStyle');
                var userIdRightEle = jQuery('.section_grayborder').find('.querytextleftStyle').siblings().children();
                if (userIdLeftEle != null && userIdLeftEle.length > 0) {
                    jQuery(userIdLeftEle).removeClass('querytextleftStyle');
                    jQuery(userIdLeftEle).addClass('querytextleft');
                }
                if (userIdRightEle != null && userIdRightEle.length > 0) {
                    jQuery(userIdRightEle).removeClass('querytextboxmedium_search');
                    jQuery(userIdRightEle).addClass('querytextboxmedium_searchquickpayRemark');
                    jQuery(userIdRightEle).children().removeClass('labelcolumnsearch');
                    jQuery(userIdRightEle).children().addClass('labelcolumnsearchquickpayRemark');
                }

            }
        }
        jQuery(window).resize(function() {
            if (jQuery('[name=isDashboardWidget]') != null && jQuery('[name=isDashboardWidget]').length > 0) {
                if (jQuery('[name=isDashboardWidget]').val() === 'Y') {
                    var element = jQuery('.section_grayborder').find('.querytextleftquickpaywidget');
                    if (element != null && element.length > 0) {
                        jQuery(element).removeClass('querytextleftquickpaywidget');
                        jQuery(element).addClass('querytextleft');
                        jQuery(element).siblings().removeClass('querytextrightquickpaywidget');
                        jQuery(element).siblings().addClass('querytextright');
                    }
                    var userIdLeftEle = jQuery('.section_grayborder').find('.querytextleftStyle');
                    var userIdRightEle = jQuery('.section_grayborder').find('.querytextleftStyle').siblings().children();
                    if (userIdLeftEle != null && userIdLeftEle.length > 0) {
                        jQuery(userIdLeftEle).removeClass('querytextleftStyle');
                        jQuery(userIdLeftEle).addClass('querytextleft');
                    }
                    if (userIdRightEle != null && userIdRightEle.length > 0) {
                        jQuery(userIdRightEle).removeClass('querytextboxmedium_search');
                        jQuery(userIdRightEle).addClass('querytextboxmedium_searchquickpayRemark');
                        jQuery(userIdRightEle).children().removeClass('labelcolumnsearch');
                        jQuery(userIdRightEle).children().addClass('labelcolumnsearchquickpayRemark');
                    }
                }
            }
        });
        if (isGroupletExecution(groupletId)) {
            jQuery('[id="' + groupletId + ':DataEntry_LeftContainer_Stage39.SubSection2' + '"]').find('[type="password"]').parent().addClass("textboxPasswordChangeHw");
            jQuery('[id="' + groupletId + ':DataEntry_LeftContainer_Stage39.SubSection3' + '"]').find('[type="password"]').parent().addClass("textboxPasswordChangeHw");
        }
    },
    LoginAltFlowOfflineUserDetailsUX3_onload: function(groupletId) {
        jQuery('.inputtextarea-span').addClass('textareaLeftMargin');
        jQuery('.datelabelColumn').addClass('datecomponentLeftPadding');
        jQuery(window).resize(function() {
            jQuery('.inputtextarea-span').addClass('textareaLeftMargin');
            jQuery('.datelabelColumn').addClass('datecomponentLeftPadding');

        });
    },
    UpdatePersonalAssuranceDetailsChangePam_onload: function(groupletId) {
        jQuery('.right').parent().addClass('navPanelSection');
        jQuery(window).resize(function() {
            jQuery('.right').parent().addClass('navPanelSection');
        });
    },
    CCSummary_onload: function(groupletId) {
        /*var idElm = groupletId+"\\:SimpleSearchRow";
        jQuery('#'+idElm).css('border-color','#FFF');*/
    },

    MultiCategoryListingUX3_onload: function(groupletId) {
        var vpWidth = viewport().width;
        setTimeout(function() {
            var listingPresent = jQuery("[id*='MultiCategoryTxnFG.MULTI_CATEGORY_ID_ARRAY']").length;
            if (parseInt(vpWidth) >= 480 && parseInt(vpWidth) <= 640) {
                jQuery(".inputtextareasmall-span").addClass("inputtextareasmall-span_category1");
                jQuery(".inputtextareasmall").attr('style', 'width:100% !important');
                if (listingPresent > 0) {
                    jQuery(jQuery("[id*='MultiCategoryTxnFG.MULTI_CATEGORY_ID_ARRAY']").parent().parent().find("input")).css('width', '65px');
                }
            }
            if (parseInt(vpWidth) > 640) {
                jQuery(".inputtextareasmall-span").addClass("inputtextareasmall-span_category1");
                jQuery(".inputtextareasmall").attr('style', 'width:100% !important');
            }
        }, 200);
    },

    // Added for defect 738647
    ViewIntraDayStatementUX3_onload: function(groupletId) {
        if (jQuery('.modalWrapper').length > 0 && jQuery('.modalWrapper') != undefined) {
            if (jQuery('.dashboardSection').length === 1 && jQuery('.modalWrapper').find('.stage3_rightwithmargin').length === 1) {
                jQuery('.stage3_rightwithmargin').addClass('hideElement')
            }
        }
    },
    ViewIntraDayTransactionDetails_onload: function(groupletId) {
        if (jQuery('.dashboardSection').length === 0 || jQuery('.dashboardSection').length == undefined) {
            if (jQuery('.modalWrapper').find('.right').length === 1) {
                jQuery('.right').addClass('hideElement')
            }
        }
    },
    // Added for defect 739623
    SRRetailFDBreakingCy_onload: function(groupletId) {
        if (jQuery('.dashboardSection').length === 0 || jQuery('.dashboardSection').length == undefined) {
            jQuery('.sectionDownloadPanelEbux3').addClass('hideElement')
        }
    },
    SRCorporateFDBreakingCy_onload: function(groupletId) {
        if (jQuery('.dashboardSection').length === 0 || jQuery('.dashboardSection').length == undefined) {
            jQuery('.sectionDownloadPanelEbux3').addClass('hideElement')
        }
    },
    // Added for defect 738646
    OtherBankAccountDetailsUX3_onload: function(groupletId) {

        if (jQuery('.modalWrapper').length > 0 && jQuery('.modalWrapper') != undefined) {
            if (jQuery('.dashboardSection').length === 1 && jQuery('.modalWrapper').find('.stage3_rightwithmargin').length === 1) {
                jQuery('.stage3_detailspanel').addClass('hideElement');
                jQuery('.stage3_previewconfirmdetails').css('border-top', '0px');
                jQuery(jQuery('.stage3_searchpanel_detailsdiv').next()).css('border-top', '1px solid #CCCCCC');
            }
        }
    },
    TransactionHistoryListingUX3_onload: function(groupletId) {
        if (jQuery('.dashboardSection').length === 0 || jQuery('.dashboardSection').length == undefined) {
            if (jQuery('.modalWrapper').find('.right').length === 1) {
                jQuery('.right').addClass('hideElement')
            }
        }
    },
    InvoiceCyberReceipt_onload: function(groupletId) {
        var tablesOnPage = jQuery('.listingrow').find('table');
        if (tablesOnPage.length > 1) {
            var tableId = tablesOnPage[0].id;
            var noOfColumns = jQuery("[id='" + tableId + "']").find("th").length;
            var columnsAccessed = 0;
            var tableColumns = jQuery("[id='" + tableId + "']").find("tbody").find("td").find("span");
            for (i = 0; i < tableColumns.length; i++) {
                innerTableId = tableColumns[i].id;
                var text = jQuery("[id='" + innerTableId + "']").text();
                if (text == '\xa0') {
                    columnsAccessed++;
                } else {
                    columnsAccessed = 0;
                }
                if (columnsAccessed == tableColumns.length) {
                    jQuery("[id='" + tableId + "']").parent().parent().attr("style", "display:none");
                    break;
                }
                if (columnsAccessed == noOfColumns) {
                    if (i == (columnsAccessed - 1)) {
                        jQuery("[id='" + tableId + "']").parent().parent().attr("style", "display:none");
                        break;
                    }
                    jQuery("[id='" + innerTableId + "']").parent().parent().attr("style", "display:none");
                    columnsAccessed = 0;
                }
            }
        }
    },
    Invoice_onload: function(groupletId) {
        var tablesOnPage = jQuery('.listingrow').find('table');
        if (tablesOnPage.length > 1) {
            var tableId = tablesOnPage[0].id;
            var noOfColumns = jQuery("[id='" + tableId + "']").find("th").length;
            var columnsAccessed = 0;
            var tableColumns = jQuery("[id='" + tableId + "']").find("tbody").find("td").find("span");
            for (i = 0; i < tableColumns.length; i++) {
                innerTableId = tableColumns[i].id;
                var text = jQuery("[id='" + innerTableId + "']").text();
                if (text == '\xa0') {
                    columnsAccessed++;
                } else {
                    columnsAccessed = 0;
                }
                if (columnsAccessed == tableColumns.length) {
                    jQuery("[id='" + tableId + "']").parent().parent().attr("style", "display:none");
                    break;
                }
                if (columnsAccessed == noOfColumns) {
                    if (i == (columnsAccessed - 1)) {
                        jQuery("[id='" + tableId + "']").parent().parent().attr("style", "display:none");
                        break;
                    }
                    jQuery("[id='" + innerTableId + "']").parent().parent().attr("style", "display:none");
                    columnsAccessed = 0;
                }
            }
        }
    },
    InvoicePreviewConfirmation_onload: function(groupletId) {
        var tablesOnPage = jQuery('.listingrow').find('table');
        if (tablesOnPage.length > 1) {
            var tableId = tablesOnPage[0].id;
            var noOfColumns = jQuery("[id='" + tableId + "']").find("th").length;
            var columnsAccessed = 0;
            var tableColumns = jQuery("[id='" + tableId + "']").find("tbody").find("td").find("span");
            for (i = 0; i < tableColumns.length; i++) {
                innerTableId = tableColumns[i].id;
                var text = jQuery("[id='" + innerTableId + "']").text();
                if (text == '\xa0') {
                    columnsAccessed++;
                } else {
                    columnsAccessed = 0;
                }
                if (columnsAccessed == tableColumns.length) {
                    jQuery("[id='" + tableId + "']").parent().parent().attr("style", "display:none");
                    break;
                }
                if (columnsAccessed == noOfColumns) {
                    if (i == (columnsAccessed - 1)) {
                        jQuery("[id='" + tableId + "']").parent().parent().attr("style", "display:none");
                        break;
                    }
                    jQuery("[id='" + innerTableId + "']").parent().parent().attr("style", "display:none");
                    columnsAccessed = 0;
                }
            }
        }
    },
    /*Added for login flow center alignment of page  --- End*/
    /* Added for File Upload Title and Breadcrum Value ---- START */
    UploadFileDetailsUX3_onload: function(groupletId) {
        setTimeout(function() {
            var newText = jQuery('h1').text().replace('${productDesc}', jQuery(document.getElementsByName('TEMP_VAR')).attr('value'));
            jQuery('h1').text("");
            jQuery('h1').text(newText);
            var text1 = jQuery('.masterGroupletTitle').parent().text().replace('${productDesc}', jQuery(document.getElementsByName('TEMP_VAR')).attr('value'));
            var element = "<span id='breadcrumbarrow' class='masterGroupletTitle'></span>" + text1;
            jQuery('.masterGroupletTitle').parent().text("");
            jQuery('.masterGroupletTitle').parent().text(text1);
            jQuery('.breadcrumbnew').children(':last').append(element);
            var titleVal = jQuery('title').text().replace('${productDesc}', jQuery(document.getElementsByName('TEMP_VAR')).attr('value'));
            jQuery('title').text("");
            jQuery('title').text(titleVal);
        }, 100);
    },
    GFPFileUploadUX3_onload: function(groupletId) {
        setTimeout(function() {
            var newText = jQuery('h1').text().replace('${productDesc}', jQuery(document.getElementsByName('TEMP_VAR')).attr('value'));
            jQuery('h1').text("");
            jQuery('h1').text(newText);
            var text1 = jQuery('.masterGroupletTitle').parent().text().replace('${productDesc}', jQuery(document.getElementsByName('TEMP_VAR')).attr('value'));
            //var mastGrp=jQuery('.masterGroupletTitle').detach();
            var element = "<span id='breadcrumbarrow' class='masterGroupletTitle'></span>" + text1;
            jQuery('.masterGroupletTitle').parent().text("");
            jQuery('.masterGroupletTitle').parent().text(text1);
            jQuery('.breadcrumbnew').children(':last').append(element);
            //jQuery('.masterGroupletTitle').parent().prepend(mastGrp);

            var titleVal = jQuery('title').text().replace('${productDesc}', jQuery(document.getElementsByName('TEMP_VAR')).attr('value'));
            jQuery('title').text("");
            jQuery('title').text(titleVal);
        }, 100);
    },

    ViewApplicableTxnTypesUX3_onload: function() {
        var vpWidth = viewport().width;
        if (parseInt(vpWidth) > 900) {
            jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb1\\.C4"]').css('width', '23%');
        }
    },
    PPLCyberReceiptUX3_onload: function() {
        var vpWidth = viewport().width;
        if (parseInt(vpWidth) > 900) {
            jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb1\\.C4"]').css('width', '23%');
            jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb2\\.C4"]').css('width', '23%');
            jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb3\\.C4"]').css('width', '23%');
        }
    },
    /* Added for createfunding request ---- START */
    CreateFundingRequest_onload: function(groupletId) {
        jQuery("[id='" + groupletId + ":NavPanel.Ra1.C4']").hide();
        jQuery("[id='" + groupletId + ":NavPanel.Ra1.C5']").hide();
        jQuery("[id='" + groupletId + ":NavPanel.Ra1.C6']").hide();
        jQuery("[id='" + groupletId + ":NavPanel.Ra1.C7']").hide();
        jQuery("[id='" + groupletId + ":NavPanel.Ra1.C8']").hide();

    },
    /* Added for createfunding request ---- END */
    CPL_PPLDetailsDisplayUX3_onload: function() {
        var vpWidth = viewport().width;
        if (parseInt(vpWidth) > 900) {
            jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb1\\.C4"]').css('width', '23%');
            jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb2\\.C4"]').css('width', '23%');
            jQuery('[id$="ReadOnly_LeftContainer_Stage35\\.Rb3\\.C4"]').css('width', '23%');
        }
    },
    PageMaintenanceCreateConfirmationScreen_onload: function(groupletId) {
        setTimeout(function() {
            for (j = 0; j < jQuery('.ui-sortable').length; j++) {
                if (jQuery(jQuery('.ui-sortable')[j]).children().length == 0) {
                    jQuery(jQuery('.ui-sortable')[j]).hide();
                }
            }
        }, 2000);

    },
    PageMaintenanceHomePage_onload: function(groupletId) {
        convertComboboxes();
        if (jQuery('#MessageDisplay_TABLE').length > 0) {
            jQuery('#contentarea').attr(Constants.GROUPLET_ID_ATTR, "dummy");
        }

    },
    ViewDocumentsUX4_onload: function(groupletId) {
        jQuery('#' + groupletId + "\\:RightContainer_Stage34\\.Rb1").addClass('opstatementux4');
        jQuery('#' + groupletId + "\\:RightContainer_Stage34\\.Rc2").addClass('opstatementux4 opstatementux41');
    },
    SRPaperStatementRetDC_onload: function(groupletId) {
        if (groupletId == "PageConfigurationMaster_PCSUX4W__1") {
            if (jQuery('#FormManagementFG\\.REPORTTITLE').attr('value') == "PCSDataCaptureUX3") {
                jQuery('.HW_formbtn_search').hide();
            }
        }
    },
    PCAGeneralDetails_onload: function(groupletId) {
        jQuery("[id='" + groupletId + "'").css('height', 'auto');
    },
    CCSummaryUX3_onload: function(groupletId) {
        if (groupletId) {
            if (jQuery('.forPinButton').length > 0) {
                if (jQuery('#' + groupletId).find('.widgetPaginationFooterNextGenBorderTop').find('.widgetFooterRight_new').length == 0 && jQuery('.nextGenUX4 :visible').length == 0) {
                    jQuery('#' + groupletId).find('.forPinButton').addClass('paddingtop');
                    jQuery('#' + groupletId).find('.widgetFooterleft_new').addClass('hideElement');
                } else if (jQuery('#' + groupletId).find('table').length > 0 && jQuery('#' + groupletId).find('.widgetPaginationFooterNextGenBorderTop').find('.widgetFooterRight_new').length > 0 && jQuery('.nextGenUX4 :visible').length == 0) {
                    var a = jQuery('.widgetPaginationFooterNextGenBorderTop').find('script').detach();
                    jQuery(a).insertAfter('.widgetPaginationFooterNextGenBorderTop');

                    jQuery('.widgetPaginationFooterNextGenBorderTop ').each(function() {
                        var data = [];
                        jQuery(this).contents().each(function() {
                            if (this.nodeType === Node.TEXT_NODE) {
                                data.push(this);
                            }
                        }).end().append(jQuery('<span class="transactiontxt_new viewingText" />').append(data));
                    });
                    jQuery('.widgetFooterleft_new').css('width', '1px');
                    jQuery('.widgetFooterleft_new').css('padding-left', '0px');
                    jQuery('.forPinButton').css('margin-top', '15px');
                }
            }
        }
    },
    /* Added for File Upload Title and Breadcrum Value ---- END */
    /* Start: Added For Ticket: 744651 */
    PondicherryChallanForm_onload: function() {

        jQuery("[id$='DisplayForm_ChallanForm2.Rj2']").removeClass('row_withTopRightLeftBorderHeight');
        jQuery("[id$='DisplayForm_ChallanForm2.Rj2']").addClass('row_withTopRightLeftBorderHeightNew');

        jQuery("[id$='DisplayForm_ChallanForm2.Rj3']").removeClass('row_withTopRightLeftBorder');
        jQuery("[id$='DisplayForm_ChallanForm2.Rj3']").addClass('hideElement');

        jQuery("[id$='DisplayForm_ChallanForm2.Rj4']").removeClass('row_withTopRightLeftBorder');
        jQuery("[id$='DisplayForm_ChallanForm2.Rj4']").addClass('hideElement');

    },
    /* End: Added For Ticket: 744651 */
    /* Start: Added For Ticket: 755419 */
    LienInquiryListUX3_onload: function(groupletId) {
        if (jQuery("#IS_UX4_SUMMARY_VIEW") != null && jQuery("#IS_UX4_SUMMARY_VIEW").val != null && jQuery("#IS_UX4_SUMMARY_VIEW").val() == "Y") {
            var tableinUi = jQuery("#MODAL_VIEW_CONTAINER").find('table').length;
            if (tableinUi == 0 && jQuery("#MODAL_VIEW_CONTAINER").length > 0) {
                var element = document.getElementById('modalDialog');
                if (element) {
                    if (element && jQuery(element).length > 0) {
                        jQuery('html, body').animate({
                            scrollTop: jQuery(element).offset().top
                        }, 0);
                    }
                }
            }
        }
    },
    /* End: Added For Ticket: 755419 */
    CreditCardDetailsUX3_onload: function(groupletId) {
        jQuery('.datelabelColumn').css('margin-left', '3px');
    },
    DpAccountDetailsRetUX3_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {
            setTimeout(function() {
                if (jQuery("#MODAL_VIEW_CONTAINER").length == 1) {
                    if ("PageConfigurationMaster_W103__1" == groupletId && jQuery('.nextGenUX4').length > 0) {
                        jQuery('#modalDialog .hideElement').css('display', 'block');
                    }
                } else {
                    jQuery('#modalDialog .hideElement').css('display', 'none');
                }
            }, 1000);
        }
    },
    LAFOfflineRequestPreviewConfirmationUX3_onload: function(groupletId) {
        jQuery('.formbtn_last').css('padding-top', '4px');
        jQuery('.querytextright_stage3').attr('style', 'padding-top:0px')
    },
    Authorization_onload: function() {
        if (jQuery('#MODAL_VIEW_CONTAINER').find('#IS_MENU_AUTH_VIEW').length > 0) {
            var isauthScreen = jQuery('#MODAL_VIEW_CONTAINER').find('#IS_MENU_AUTH_VIEW').attr('value');
            if (isauthScreen == "Y") {
                jQuery('#MODAL_VIEW_CONTAINER').find(".queryitalictext").removeClass("queryitalictext").addClass("queryitalictext_menuAuth");
                jQuery('#MODAL_VIEW_CONTAINER').find(".simpletext").removeClass("simpletext").addClass("simpletext_menuAuth");
                jQuery('#MODAL_VIEW_CONTAINER').find("h3").removeClass("h3").addClass("h3_menuAuth");
                jQuery('#MODAL_VIEW_CONTAINER').find(".formrow").removeClass("formrow").addClass("formrow_menuAuth");
                jQuery('#MODAL_VIEW_CONTAINER').find(".querytextleft").removeClass("querytextleft").addClass("querytextleft_menuAuth");
                jQuery('#MODAL_VIEW_CONTAINER').find(".querytextright").removeClass("querytextright").addClass("querytextright_menuAuth");
                jQuery('#MODAL_VIEW_CONTAINER').find(".formbtn_last3").removeClass("formbtn_last3").addClass("formbtn_last3_menuAuth");
                jQuery('#MODAL_VIEW_CONTAINER').find(".formbtn3").removeClass("formbtn3 nextGen_HwButton").addClass("formbtn3_menuAuth");
                jQuery(".queryitalictext_menuAuth").after("<span class=\"stage3_steptracker_mandatory mandatoryText\" id=\"mandatoryField\">* Mandatory Fields</span>");
            }
        }
    }
};

feba.js.custom.MailRMCompose_onload = feba.js.custom.MailCompose_onload;
feba.js.module = {
    /*added for making checkbox clickable without resize  in login page -Start*/
    user_onload: function(groupletId) {
        if (jQuery('#AuthenticationFG\\.REPORTTITLE').val() == 'AuthenticationScreenMB') {
            feba.domManipulator.loadScript("scripts/module/user/AuthenticationScreenMB.js");
        }
        if (jQuery('#ServiceRequestListFG\\.REPORTTITLE').val() == 'AuthenticationScreen') {
            jQuery(".loginPanelColumnDetailStyle1:first").css("width", "30%");

        }
        if (jQuery('#AuthenticationFG\\.REPORTTITLE').val() == 'AuthenticationScreen') {
            jQuery("[name='AuthenticationFG.VERIFICATION_CODE']").attr("placeHolder", getMessage("ConfirmVerification"));

            if (jQuery('#MessageDisplay_TABLE').text().length > 0) {
                if (jQuery('#MessageDisplay_TABLE').text().indexOf('105411') == -1) {
                    jQuery('#AuthenticationFG\\.REMEMBER_USER_ID').attr("checked", false);
                }
            }
        }

        //Bodal Added

        if (jQuery('#LoginAltFlowFG\\.REPORTTITLE').val() == 'CustomOnlineRegOnlineUserATM') {
            jQuery("[name='LoginAltFlowFG.VERIFICATION_CODE']").attr("placeHolder", getMessage("ConfirmVerification"));

            if (jQuery('#MessageDisplay_TABLE').text().length > 0) {
                if (jQuery('#MessageDisplay_TABLE').text().indexOf('105411') == -1) {
                    jQuery('#LoginAltFlowFG\\.REMEMBER_USER_ID').attr("checked", false);
                }
            }
        }
        /*Added By Parvathy for Forgot Pwd Flow-START*/

        if (jQuery('#LoginAltFlowFG\\.REPORTTITLE').val() == 'LoginAltFlowOnlineUserInput') {
            jQuery("[name='LoginAltFlowFG.VERIFICATION_CODE']").attr("placeHolder", getMessage("ConfirmVerification"));

            if (jQuery('#MessageDisplay_TABLE').text().length > 0) {
                if (jQuery('#MessageDisplay_TABLE').text().indexOf('105411') == -1) {
                    jQuery('#LoginAltFlowFG\\.REMEMBER_USER_ID').attr("checked", false);
                }
            }
        }
        /*Added By Parvathy for Forgot Pwd Flow-END*/

        //debug patch for ticket 760100
        if (jQuery('#dummy1').attr('type') == 'password') {
            jQuery('#dummy1').attr('value', 'dummy');
            jQuery('#dummy11').attr('value', 'dummy');

        }

        if (jQuery('#LoginAltFlowFG\\.REPORTTITLE').val() == 'OnlineRegOnlineUserDetails' ||
            jQuery('#LoginAltFlowFG\\.REPORTTITLE').val() == 'OnlineRegOfflineUserDetails') {

            jQuery("input#LoginAltFlowFG\\.MOBILENUMBER").on({
                keydown: function(e) {
                    if (e.which === 32)
                        return false;
                },
                change: function() {
                    this.value = this.value.replace(/\s/g, "");
                }
            });

        }
    },
    /*added for making checkbox clickable without resize  in login page -end*/
    crpadmin_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NAccessScript";

            script.src = "scripts/module/crpadmin/NAccessScript.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }

        } else {
            feba.domManipulator.loadScript("scripts/module/crpadmin/NAccessScript.js");
        }
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');
            script.id = 'id1' + "NFEBAInlineEdit";

            script.src = "scripts/NFEBAInlineEdit.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }

        } else {
            feba.domManipulator.loadScript("scripts/NFEBAInlineEdit.js");
        }
        // Handle UX2 to next gen switch & vice versa
        handleUX2toNextGenPageJumps(groupletId);
        //handleLangIdChange(groupletId);

        // Fix for ticket ID 743952

        jQuery('.css-labelcheckbox').die('click');
        jQuery('.css-labelcheckbox').unbind('click');
        jQuery('.css-labelcheckbox').bind('click', function(event) {
            if (!jQuery(this).siblings().attr('checked')) {
                jQuery(this).siblings().attr('checked', true);
            } else {
                jQuery(this).siblings().attr('checked', false);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });

    },

    workflowrule_onload: function(groupletId) {
        handleUX2toNextGenPageJumps(groupletId);
    },

    workflow_onload: function(groupletId) {
        handleUX2toNextGenPageJumps(groupletId);
    },

    onlinevault_onload: function(groupletId) {
        handleUX2toNextGenPageJumps(groupletId);
    },


    DirectBanking_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/DirectBanking/NAC_OETags.js");
        feba.domManipulator.loadScript("scripts/module/DirectBanking/NDepositCalculator.js");
        feba.domManipulator.loadScript("scripts/module/DirectBanking/Njson.js");
        feba.domManipulator.loadScript("scripts/module/DirectBanking/NSavingsCalculator.js");
        feba.domManipulator.loadScript("scripts/module/DirectBanking/Nutils.js");
    },
    mufu_onload: function(groupletId) {
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NMFScript";

            script.src = "scripts/module/mufu/NMFScript.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }

        } else {
            feba.domManipulator.loadScript("scripts/module/mufu/NMFScript.js");
        }
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');

            script.id = 'id1' + "NMFSwitchScript";

            script.src = "scripts/module/mufu/NMFSwitchScript.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/mufu/NMFSwitchScript.js");
        }
    },
    servicerequest_onload: function(groupletId) {
        //feba.domManipulator.loadScript("scripts/module/servicerequest/NfnScript.js");
        jQuery('.css-labelcheckbox').die('click');
        jQuery('.css-labelcheckbox').unbind('click');
        jQuery('.css-labelcheckbox').bind('click', function(event) {
            if (!jQuery(this).siblings().attr('checked')) {
                jQuery(this).siblings().attr('checked', true);
            } else {
                jQuery(this).siblings().attr('checked', false);
            }
            event.preventDefault();
            event.stopImmediatePropagation();
        });
        setTimeout(function() {
            handleRHSAlignment(groupletId);
        }, 1000);
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

            var script = document.createElement('script');
            script.id = 'id1' + "NfnScript";
            script.src = "scripts/module/servicerequest/NfnScript.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        } else {
            feba.domManipulator.loadScript("scripts/module/servicerequest/NfnScript.js"); //earlier call added in else
        }

        if (false) { // The below lines are called twice for the SR Approval,Recall and my Request screen.
            /*For aligning the space before buttons in SR module*/
            jQuery(".width79percent_navigationpanel").css("margin-top", "0px");
            /*Surej RWD added for option control collapse issue START */
            jQuery("[id='" + groupletId + "\\:collapsibleMenu']").click(function() {

                if (jQuery("#" + groupletId + "\\:collapsableimg").hasClass("collapseMenu")) {
                    jQuery('#' + groupletId + '\\:collapsableimg').removeClass('collapseMenu');
                    jQuery('#' + groupletId + '\\:collapsableimg').addClass('expandMenu');
                } else {
                    jQuery('#' + groupletId + '\\:collapsableimg').removeClass('expandMenu');
                    jQuery('#' + groupletId + '\\:collapsableimg').addClass('collapseMenu');
                }
                jQuery('#' + groupletId + '\\:collapse').slideToggle();
                return false;
            });
        }
        /*Surej RWD added for option control collapse issue END*/
        /*For virtual keypad icon removal*/
        jQuery(".buttonhashed").css("display", "none");
        if (jQuery('.pageLeftContainer').length == 0) {
            jQuery('.container-large').addClass('width100Container');
            //jQuery('.container-xtrasmall').hide();
            if (jQuery('.container-xtrasmall').hasClass("displayBlock")) {
                jQuery('.container-xtrasmall').removeClass('displayBlock');
                jQuery('.container-xtrasmall').addClass('hideElementFromUI');
            } else {
                jQuery('.container-xtrasmall').addClass('hideElementFromUI');
            }
        } else {
            jQuery('.container-large').removeClass('width100Container');
            //jQuery('.container-xtrasmall').show();
            if (jQuery('.container-xtrasmall').hasClass("hideElementFromUI")) {
                jQuery('.container-xtrasmall').removeClass('hideElementFromUI');
                jQuery('.container-xtrasmall').addClass("displayBlock");
            } else {
                jQuery('.container-xtrasmall').addClass("displayBlock");
            }
        }
        // Added to clear the state value if country value is null
        var countryCount = jQuery("label:contains(Country)");
        var countSize = countryCount.size();
        if (countSize > 0) {
            var stateCount = jQuery("label:contains(State)");
            for (var i = 0; i < countSize; i++) {
                var country = countryCount[i].id;
                if (stateCount[i] && stateCount[i].id) {
                    var state = stateCount[i].id;
                    var stelmt = jQuery("[id='" + state + "']").parent().parent().find("input");
                    if (stelmt.length > 0) {
                        var stelmtId = stelmt[0].id;
                        jQuery("[id='" + country + "']").parent().parent().find("select").attr("onchange", "onCountryChangeSR(this.id,'" + stelmtId + "')");
                    }
                }
            }
        }
    },
    pfm_onload: function(groupletId) {
        setTimeout(
            function() {
                if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined") {

                    var script = document.createElement('script');

                    script.id = 'id1' + "NPfmEbux3";

                    script.src = "scripts/module/pfm/NPfmEbux3.js?groupletId=" + groupletId + ";";

                    if (document.head) {
                        document.head.appendChild(script);
                    } else {
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }



                } else {
                    feba.domManipulator.loadScript("scripts/module/pfm/NPfmEbux3.js"); //earlier call added in else
                }
            }, 1000);
    },
    /*transaction_onload : function(groupletId){
    		feba.domManipulator.loadScript("scripts/module/transaction/NPFTotalAmountCalculator.js");
    	},*/
    txnss_onload: function(groupletId) {
        setTimeout(function() {
            handleRHSAlignment(groupletId);
        }, 1000);
    },

    transaction_onload: function(groupletId) {
        /* Added Check for Adaptive UI so that js wont get loaded in Adaptive UI */
        setTimeout(function() {
            handleRHSAlignment(groupletId);
        }, 1000);
        if (groupletId && groupletId != null && groupletId.length > 0 && groupletId != "undefined" && typeof isAdaptiveUI == 'undefined') {

            var script = document.createElement('script');

            script.id = 'id1' + "InitiateCounterpartyTypeCheck";

            script.src = "scripts/module/transaction/InitiateCounterpartyTypeCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }

            var script = document.createElement('script');

            script.id = 'id1' + "InitiateFrequencyTypeCheck";

            script.src = "scripts/module/transaction/InitiateFrequencyTypeCheck.js?groupletId=" + groupletId + ";";

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
            script = document.createElement('script');

            script.id = 'id1' + "NPFTotalAmountCalculator"; //Aashish modified for corp

            script.src = "scripts/module/transaction/NPFTotalAmountCalculator.js?groupletId=" + groupletId + ";"

            if (document.head) {
                document.head.appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }

        feba.domManipulator.loadScript("scripts/module/transaction/NPFTotalAmountCalculator.js");

        var stage3Details = jQuery('.stage3_previewconfirmdetails');
        for (j = 0; j < stage3Details.length; j++) {
            var currElement = stage3Details[j];
            if (jQuery(currElement).children().length == 0) {
                jQuery(currElement).css('border-top', '0px');
            }
        }

        jQuery('.subsection_halfwidth_bluecolor').addClass('subsection_halfwidth_whitecolor');

    },


    tfin_onload: function(groupletId) {
        jQuery("[id='" + groupletId + ":InputForm.Ra1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputForm.Ra1']").addClass('formrow_tfin');
        jQuery("[id='" + groupletId + ":SearchPanel.Ra1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":SearchPanel.Ra1']").addClass('formrow_tfin');

        jQuery("[id='" + groupletId + ":InputFormWithTabsWithListTableContentSixCol.Rq1.C3']").removeClass('querytextleft_leftborder_sixcol');
        jQuery("[id='" + groupletId + ":InputFormWithTabsWithListTableContentSixCol.Rq1.C3']").addClass('querytextleft_leftborder_sixcol_tfin');
        jQuery("[id='" + groupletId + ":InputFormWithTabsWithListTableContentSixCol.Rq1.C5']").removeClass('querytextleft_leftborder_sixcol');
        jQuery("[id='" + groupletId + ":InputFormWithTabsWithListTableContentSixCol.Rq1.C5']").addClass('querytextleft_leftborder_sixcol_tfin');
        jQuery("[id='" + groupletId + ":InputFormWithTabsWithListTableContentSixCol.Rq1.C6']").removeClass('querytextleft_leftborder_sixcol');
        jQuery("[id='" + groupletId + ":InputFormWithTabsWithListTableContentSixCol.Rq1.C6']").addClass('querytextleft_leftborder_sixcol_tfin');
        jQuery('.inputtextarea-span').css('background', 'none');
        jQuery("[id='" + groupletId + ":NavPanel.Ra1.C5']").find("Span").css("margin-top", "5px");
        //TODO -- make below correction in NFebaAjaxOpkect.js and remove from here
        jQuery("[id='" + groupletId + "'").css('height', 'auto');
        jQuery(".dashboardSection").find("[id='" + groupletId + "']").find(".greybg_margin").addClass("greybg_margin_dashtfin");
    },

    eipp_onload: function(groupletId) {
        jQuery("[id='" + groupletId + ":InputForm.Ra1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":InputForm.Ra1']").addClass('formrow_tfin');
        jQuery("[id='" + groupletId + ":SearchPanel.Ra1']").removeClass('formrow');
        jQuery("[id='" + groupletId + ":SearchPanel.Ra1']").addClass('formrow_tfin');
    },

    bonds_onload: function(groupletId) {
        feba.domManipulator.loadScript("scripts/module/bonds/NBondAutoCompleteResponseProcessor.js");
    }
};