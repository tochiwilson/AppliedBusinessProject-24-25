sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("expensecreate.controller.Expense-create", {
        onInit: function () {
            const oViewModel = new JSONModel({
                categories: [],
                financings: [],
                busy: false
            });
            this.getView().setModel(oViewModel, "viewModel");
            this._loadReferenceData();
        },

        _formatDate: function (date) {
            if (date) {
                return new Date(date).toISOString().split('T')[0];
            }
            return null;
        },

        onSubmit: async function () {
            if (!this._validateForm()) {
                return;
            }

            const oViewModel = this.getView().getModel("viewModel");

            try {
                oViewModel.setProperty("/busy", true);

                const oModel = this.getOwnerComponent().getModel();

                // Format dates in ISO format (YYYY-MM-DD)
                const startDate = this.byId("startDate").getDateValue();
                const formattedStartDate = startDate
                    ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`
                    : null;

                const submittedOn = new Date();
                const formattedSubmittedOn = `${submittedOn.getFullYear()}-${String(submittedOn.getMonth() + 1).padStart(2, "0")}-${String(submittedOn.getDate()).padStart(2, "0")}`;

                // Combineer Expense en EnvData
                const payload = {
                    projectName: this.byId("projectName").getValue().trim(),
                    projectManager: this.byId("projectManager").getValue().trim(),
                    amount: this.byId("amount").getValue(),
                    startDate: formattedStartDate,
                    categoryId: this.byId("category").getSelectedKey(),
                    financingId: this.byId("financingType").getSelectedKey(),
                    durationMonths: parseInt(this.byId("durationMonths").getValue()),
                    status: "Pending",
                    submittedBy: "anonymous",
                    submittedOn: formattedSubmittedOn,
                    envData: {
                        greenEnergyOutput: this.byId("greenEnergyOutput").getValue(),
                        co2Current: this.byId("co2Current").getValue(),
                        co2PostCompletion: this.byId("co2PostCompletion").getValue(),
                        waterUsageCurrent: this.byId("waterUsageCurrent").getValue(),
                        waterUsagePostCompletion: this.byId("waterUsagePostCompletion").getValue(),
                        greenPayback: this.byId("greenPayback").getValue(),
                        comments: this.byId("comments").getValue()
                    }
                };

                console.log("Payload:", payload);

                const oExpensesBinding = oModel.bindList("/Expenses");
                const oExpenseContext = oExpensesBinding.create(payload);

                await oExpenseContext.created();

                MessageBox.success("Expense created successfully.");
            } catch (error) {
                console.error("Error creating expense:", error);
            } finally {
                oViewModel.setProperty("/busy", false);
            }
        },

        _loadReferenceData: async function () {
            try {
                const oModel = this.getOwnerComponent().getModel();

                const [categoriesContexts, financingsContexts] = await Promise.all([
                    oModel.bindList("/Categories").requestContexts(0, 100),
                    oModel.bindList("/Financings").requestContexts(0, 100)
                ]);

                const aCategories = categoriesContexts.map(context => context.getObject());
                const aFinancings = financingsContexts.map(context => context.getObject());

                const oViewModel = this.getView().getModel("viewModel");
                oViewModel.setProperty("/categories", aCategories);
                oViewModel.setProperty("/financings", aFinancings);
            } catch (error) {
                console.error("Error loading reference data:", error);
                MessageBox.error("Error loading reference data: " + error.message);
            }
        },

        _validateForm: function () {
            const aFormFields = [
                { id: "projectName", type: "input" },
                { id: "projectManager", type: "input" },
                { id: "amount", type: "input" },
                { id: "startDate", type: "datePicker" },
                { id: "category", type: "select" },
                { id: "financingType", type: "select" },
                { id: "durationMonths", type: "input" }
            ];

            let bValid = true;
            aFormFields.forEach((field) => {
                const oControl = this.byId(field.id);
                let sValue;

                switch (field.type) {
                    case "select":
                        sValue = oControl.getSelectedKey();
                        break;
                    case "datePicker":
                        sValue = oControl.getValue();
                        break;
                    case "input":
                    default:
                        sValue = oControl.getValue();
                        break;
                }

                if (!sValue) {
                    oControl.setValueState("Error");
                    oControl.setValueStateText("This field is required");
                    bValid = false;
                } else {
                    oControl.setValueState("None");
                }
            });

            if (!bValid) {
                MessageBox.error("Please fill in all required fields");
            }

            return bValid;
        },

        onNavBack: function () {
            window.location.href = "../../index.html";
        }
    });
});
