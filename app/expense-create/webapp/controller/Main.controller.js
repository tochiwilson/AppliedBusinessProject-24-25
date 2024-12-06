sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("expensecreate.controller.Main", {
        onInit: function () {
            // Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
            this._mViewSettingsDialogs = {};
            let aProject = [{Code: "DE", Name: "Germany"}, {Code: "US", Name:"United States"}]
            this.getOwnerComponent().getModel("settings").setProperty("/CountryList", aCountry)
        },
            // Initialization code, if any
        },

        onCreateExpensePress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("createExpense");
        },

    });
    
});
