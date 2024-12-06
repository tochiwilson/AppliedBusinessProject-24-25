sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("expensecreate.controller.Main", {
        onInit: function () {
            // Initialization code, if any
        },

        onCreateExpensePress: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("createExpense");
        },

    });
});
