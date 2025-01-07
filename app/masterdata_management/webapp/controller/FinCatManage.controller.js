sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, MessageBox, JSONModel) => {
    "use strict";

    return Controller.extend("masterdatamanagement.controller.FinCatManage", {
        onInit() {
            // Initialize mock data
            const oModel = new JSONModel({
                Categories: [
                    { ID: "1", categoryName: "Category 1", categoryDescription: "Description 1", isEnabled: true },
                    { ID: "2", categoryName: "Category 2", categoryDescription: "Description 2", isEnabled: false }
                ],
                Financings: [
                    { ID: "1", financingName: "Financing 1", financingDescription: "Description 1", isEnabled: true },
                    { ID: "2", financingName: "Financing 2", financingDescription: "Description 2", isEnabled: false }
                ]
            });
            
            this.getView().setModel(oModel);

            // Dialog model voor edit/create
            this.dialogModel = new JSONModel({
                title: "",
                editObject: {},
                editPath: "",
                entityType: ""
            });
            this.getView().setModel(this.dialogModel, "dialog");
        },

        onCreate: function() {
            const sIconTabKey = this.byId("idIconTabBarNoIcons").getSelectedKey();
            const isCategory = sIconTabKey === "project_cat";
            
            const dialogData = {
                title: isCategory ? "Create Category" : "Create Finance Type",
                editPath: "",
                entityType: isCategory ? "category" : "financing",
                editObject: {
                    name: "",
                    description: "",
                    isEnabled: true
                }
            };

            this.dialogModel.setData(dialogData);

            if (!this.editDialog) {
                this.loadFragment({
                    name: "masterdatamanagement.fragments.EditDialog"
                }).then((oDialog) => {
                    this.editDialog = oDialog;
                    this.editDialog.open();
                });
            } else {
                this.editDialog.open();
            }
        },

        onSaveItem: function() {
            const dialogData = this.dialogModel.getData();
            const oModel = this.getView().getModel();
            const modelData = oModel.getData();
            
            if (dialogData.entityType === "category") {
                if (dialogData.editPath) {
                    // Update existing category
                    const pathParts = dialogData.editPath.split("/");
                    const index = parseInt(pathParts[pathParts.length - 1]);
                    
                    modelData.Categories[index] = {
                        ...modelData.Categories[index],
                        categoryName: dialogData.editObject.name,
                        categoryDescription: dialogData.editObject.description,
                        isEnabled: dialogData.editObject.isEnabled
                    };
                } else {
                    // Create new category
                    modelData.Categories.push({
                        ID: Date.now().toString(),
                        categoryName: dialogData.editObject.name,
                        categoryDescription: dialogData.editObject.description,
                        isEnabled: dialogData.editObject.isEnabled
                    });
                }
            } else {
                if (dialogData.editPath) {
                    // Update existing financing
                    const pathParts = dialogData.editPath.split("/");
                    const index = parseInt(pathParts[pathParts.length - 1]);
                    
                    modelData.Financings[index] = {
                        ...modelData.Financings[index],
                        financingName: dialogData.editObject.name,
                        financingDescription: dialogData.editObject.description,
                        isEnabled: dialogData.editObject.isEnabled
                    };
                } else {
                    // Create new financing
                    modelData.Financings.push({
                        ID: Date.now().toString(),
                        financingName: dialogData.editObject.name,
                        financingDescription: dialogData.editObject.description,
                        isEnabled: dialogData.editObject.isEnabled
                    });
                }
            }

            // Update model and force refresh
            oModel.setData(modelData);
            oModel.refresh(true);
            
            MessageToast.show(`${dialogData.entityType} ${dialogData.editPath ? 'updated' : 'created'} successfully`);
            this.editDialog.close();
        },

        onDelete: function(oEvent) {
            const oSource = oEvent.getSource();
            const oBindingContext = oSource.getBindingContext();
            const sPath = oBindingContext.getPath();
            const oModel = this.getView().getModel();
            const modelData = oModel.getData();
            
            const entityType = sPath.includes("Categories") ? "category" : "financing";
            const itemName = entityType === "category" ? 
                oBindingContext.getProperty("categoryName") : 
                oBindingContext.getProperty("financingName");

            MessageBox.confirm(
                `Are you sure you want to delete this ${entityType}: ${itemName}?`, {
                    title: "Confirm Deletion",
                    onClose: (oAction) => {
                        if (oAction === MessageBox.Action.OK) {
                            if (entityType === "category") {
                                modelData.Categories = modelData.Categories.filter(
                                    item => item.ID !== oBindingContext.getObject().ID
                                );
                            } else {
                                modelData.Financings = modelData.Financings.filter(
                                    item => item.ID !== oBindingContext.getObject().ID
                                );
                            }
                            oModel.setData(modelData);
                            MessageToast.show(`${entityType} deleted successfully`);
                        }
                    }
                }
            );
        },

        onEditCategoryPress: function(oEvent) {
            const oBindingContext = oEvent.getSource().getBindingContext();
            const oData = oBindingContext.getObject();
            const pathParts = oBindingContext.getPath().split("/");
            
            const dialogData = {
                title: "Edit Category",
                editPath: oBindingContext.getPath(),
                entityType: "category",
                editObject: {
                    name: oData.categoryName,
                    description: oData.categoryDescription,
                    isEnabled: oData.isEnabled
                }
            };

            this.dialogModel.setData(dialogData);

            if (!this.editDialog) {
                this.loadFragment({
                    name: "masterdatamanagement.fragments.EditDialog"
                }).then((oDialog) => {
                    this.editDialog = oDialog;
                    this.editDialog.open();
                });
            } else {
                this.editDialog.open();
            }
        },

        onEditPress: function(oEvent) {
            const oBindingContext = oEvent.getSource().getBindingContext();
            const oData = oBindingContext.getObject();
            const pathParts = oBindingContext.getPath().split("/");
            
            const dialogData = {
                title: "Edit Finance Type",
                editPath: oBindingContext.getPath(),
                entityType: "financing",
                editObject: {
                    name: oData.financingName,
                    description: oData.financingDescription,
                    isEnabled: oData.isEnabled
                }
            };

            this.dialogModel.setData(dialogData);

            if (!this.editDialog) {
                this.loadFragment({
                    name: "masterdatamanagement.fragments.EditDialog"
                }).then((oDialog) => {
                    this.editDialog = oDialog;
                    this.editDialog.open();
                });
            } else {
                this.editDialog.open();
            }
        },

        onCancelEdit: function() {
            this.editDialog.close();
        },

        onNavBack: function() {
            window.location.href = "../../index.html";
        }
    });
});