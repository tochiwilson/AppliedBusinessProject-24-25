sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("expensecreate.controller.CreateExpense", {
        onInit: function () {
            // Set default start date (current day + 1 month)
            let oDate = new Date();
            oDate.setMonth(oDate.getMonth() + 1);
            this.getView().byId("startDate").setDateValue(oDate);

            // Fetch and log OData model
            let oModel = this.getOwnerComponent().getModel();
            console.log("OData Model Instance:", oModel);

            // Bind Category dropdown
            this.getView().byId("category").bindItems({
                path: "/Categories",
                template: new sap.ui.core.Item({
                    key: "{categoryId}",
                    text: "{categoryName}"
                })
            });

            // Bind Financing Type dropdown
            this.getView().byId("financingType").bindItems({
                path: "/Financings",
                template: new sap.ui.core.Item({
                    key: "{financingId}",
                    text: "{financingName}"
                })
            });

            
        },

        formatDate: function (oDate) {
            return oDate.toISOString().split("T")[0];
        },

        onSubmit: function () {
            let oView = this.getView();

            // Fetch the correct OData model
            let oModel = this.getOwnerComponent().getModel();
            if (!oModel || !oModel.create) {
                MessageToast.show("OData model is not correctly configured or missing.");
                return;
            }

            let currentUser = "Anonymous";
            if (sap.ushell && sap.ushell.Container) {
                currentUser = sap.ushell.Container.getService("UserInfo").getUser().getId();
            }

            let oExpense = {
                projectName: oView.byId("projectName").getValue(),
                projectManager: oView.byId("projectManager").getValue(),
                startDate: oView.byId("startDate").getDateValue(),
                categoryId: oView.byId("category").getSelectedKey(),
                financingId: oView.byId("financingType").getSelectedKey(),
                durationMonths: parseInt(oView.byId("durationMonths").getValue(), 10),
                submittedBy: currentUser,
                submittedOn: new Date(),
                status: "submitted"
            };

            if (!oExpense.projectName || !oExpense.projectManager || !oExpense.startDate ||
                !oExpense.categoryId || !oExpense.financingId || !oExpense.durationMonths) {
                MessageToast.show("Please fill in all mandatory fields.");
                return;
            }

            if (oExpense.durationMonths < 1 || oExpense.durationMonths > 96) {
                MessageToast.show("Duration must be between 1 and 96 months.");
                return;
            }

            if (oExpense.startDate < new Date(new Date().setDate(new Date().getDate() - 14))) {
                MessageToast.show("Start date must be at least 2 weeks in the future.");
                return;
            }

            oModel.create("/Expenses", oExpense, {
                success: () => MessageToast.show("Expense submitted successfully!"),
                error: () => MessageToast.show("Failed to submit expense.")
            });
        },

        _clearFormFields: function () {
            let oView = this.getView();
            oView.byId("projectName").setValue("");
            oView.byId("projectManager").setValue("");
            oView.byId("startDate").setDateValue(null);
            oView.byId("category").setSelectedKey(null);
            oView.byId("financingType").setSelectedKey(null);
            oView.byId("durationMonths").setValue("");
        }
    });
});
