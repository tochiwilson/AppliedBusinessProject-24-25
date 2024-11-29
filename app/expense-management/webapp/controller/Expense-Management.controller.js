sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("expensemanagement.controller.Expense-Management", {
        onInit: function () {
            // const oTable = this.byId("expensesTable");
            // const oModel = this.getView().getModel();

            // oTable.bindItems({
            //     path: "/Expenses",
            //     parameters: {
            //         $expand: "category,financing,envData"
            //     },
            //     template: oTable.getBindingInfo("items").template
            // });
        },
    });
});
