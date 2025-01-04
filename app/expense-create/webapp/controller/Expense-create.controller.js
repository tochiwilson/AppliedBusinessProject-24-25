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
                financings: []
            });
            this.getView().setModel(oViewModel, "viewModel");
            this._loadReferenceData();

            // Debug: Log the model initialization
            console.log("Main Model:", this.getOwnerComponent().getModel());
            console.log("View Model:", this.getView().getModel("viewModel"));
        },

        _loadReferenceData: async function() {
            try {
                const oModel = this.getOwnerComponent().getModel();
                console.log("Loading reference data with model:", oModel);
                
                // Load Categories
                const oCategoriesBinding = oModel.bindList("/Categories");
                const categoriesContexts = await oCategoriesBinding.requestContexts(0, 100);
                console.log("Loaded categories:", categoriesContexts);
                const aCategories = categoriesContexts.map(oContext => oContext.getObject());
                
                // Load Financings
                const oFinancingsBinding = oModel.bindList("/Financings");
                const financingsContexts = await oFinancingsBinding.requestContexts(0, 100);
                console.log("Loaded financings:", financingsContexts);
                const aFinancings = financingsContexts.map(oContext => oContext.getObject());

                // Update view model
                const oViewModel = this.getView().getModel("viewModel");
                oViewModel.setProperty("/categories", aCategories);
                oViewModel.setProperty("/financings", aFinancings);
                
                console.log("Reference data loaded successfully:", {
                    categories: aCategories,
                    financings: aFinancings
                });
            } catch (error) {
                console.error("Error loading reference data:", error);
                MessageBox.error("Error loading reference data: " + (error.message || "Unknown error"));
            }
        },

        onSubmit: async function() {
            if (!this._validateForm()) {
                return;
            }

            try {
                sap.ui.core.BusyIndicator.show(0);
                const oModel = this.getOwnerComponent().getModel();
                
                // Create expense entry
                const expenseData = {
                    projectName: this.byId("projectName").getValue(),
                    projectManager: this.byId("projectManager").getValue(),
                    amount: parseFloat(this.byId("amount").getValue()),
                    startDate: this.byId("startDate").getValue(),
                    categoryId: parseInt(this.byId("category").getSelectedKey()),
                    financingId: parseInt(this.byId("financingType").getSelectedKey()),
                    durationMonths: parseInt(this.byId("durationMonths").getValue()),
                    status: "Pending"
                };

                console.log("Creating expense with data:", expenseData);

                // Create the expense list binding
                const oExpenseListBinding = oModel.bindList("/Expenses");
                console.log("Expense list binding created:", oExpenseListBinding);

                // Create the expense context
                const oExpenseContext = oExpenseListBinding.create(expenseData);
                console.log("Expense context created:", oExpenseContext);

                // Wait for the creation to complete
                await oExpenseContext.created();
                console.log("Expense created successfully");
                
                // Get the created expense data
                const createdExpense = oExpenseContext.getObject();
                console.log("Created expense object:", createdExpense);

                // Create environmental data
                const envData = {
                    projectId: createdExpense.projectId,
                    expenseId: createdExpense.expenseId,
                    greenEnergyOutput: parseFloat(this.byId("greenEnergyOutput").getValue()) || 0,
                    co2Current: this.byId("co2Current").getValue() || "",
                    co2PostCompletion: this.byId("co2PostCompletion").getValue() || "",
                    waterUsageCurrent: this.byId("waterUsageCurrent").getValue() || "",
                    waterUsagePostCompletion: this.byId("waterUsagePostCompletion").getValue() || "",
                    greenPayback: this.byId("greenPayback").getValue() || "",
                    comments: this.byId("comments").getValue() || ""
                };

                console.log("Creating environmental data:", envData);

                const oEnvListBinding = oModel.bindList("/EnvData");
                const oEnvContext = oEnvListBinding.create(envData);
                await oEnvContext.created();
                console.log("Environmental data created successfully");

                // Refresh the model to ensure changes are reflected
                await oModel.refresh();
                console.log("Model refreshed");

                MessageBox.success("Expense project created successfully", {
                    onClose: () => {
                        const oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("RouteExpense-create");
                    }
                });
            } catch (error) {
                console.error("Error creating expense:", error);
                MessageBox.error("Error creating expense: " + (error.message || "Unknown error") + 
                    "\nDetails: " + JSON.stringify(error, null, 2));
            } finally {
                sap.ui.core.BusyIndicator.hide();
            }
        },

        _validateForm: function() {
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
        }
    });
});