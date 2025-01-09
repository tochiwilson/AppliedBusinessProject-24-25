sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/TextArea"
], function (Controller, MessageBox, JSONModel, Dialog, Button, Label, Input, TextArea) {
    "use strict";

    return Controller.extend("masterdatamanagement.controller.FinCatManage", {
        onInit: function () {
            const oViewModel = new JSONModel({
                busy: false,
                editMode: false,
                currentItem: null,
                currentType: null
            });
            this.getView().setModel(oViewModel, "viewModel");
        },

        onCreate: function (oEvent) {
            const sKey = this.byId("idIconTabBarNoIcons").getSelectedKey();
            const bIsCategory = sKey === "project_cat";
            
            this._showDialog({
                title: `Create ${bIsCategory ? 'Category' : 'Financing Type'}`,
                type: bIsCategory ? 'category' : 'financing'
            });
        },

        onEditPress: function (oEvent) {
            const oBindingContext = oEvent.getSource().getBindingContext();
            const oItem = oBindingContext.getObject();
            
            this._showDialog({
                title: "Edit Financing Type",
                type: 'financing',
                item: oItem,
                edit: true
            });
        },

        onEditCategoryPress: function (oEvent) {
            const oBindingContext = oEvent.getSource().getBindingContext();
            const oItem = oBindingContext.getObject();
            
            this._showDialog({
                title: "Edit Category",
                type: 'category',
                item: oItem,
                edit: true
            });
        },

        onDelete: function (oEvent) {
            const oBindingContext = oEvent.getSource().getBindingContext();
            const oItem = oBindingContext.getObject();
            const sType = this.byId("idIconTabBarNoIcons").getSelectedKey() === "project_cat" ? "Categories" : "Financings";

            MessageBox.confirm("Are you sure you want to delete this item?", {
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        oBindingContext.delete().then(() => {
                            MessageBox.success("Item deleted successfully");
                        }).catch((error) => {
                            MessageBox.error("Error deleting item: " + error.message);
                        });
                    }
                }
            });
        },

        _showDialog: function (oConfig) {
            const oDialog = new Dialog({
                title: oConfig.title,
                contentWidth: "400px",
                content: [
                    new Label({ text: "Name", required: true }),
                    new Input({
                        value: oConfig.item ? oConfig.item[oConfig.type + 'Name'] : "",
                        required: true
                    }),
                    new Label({ text: "Description", required: true }),
                    new TextArea({
                        value: oConfig.item ? oConfig.item[oConfig.type + 'Description'] : "",
                        rows: 4,
                        width: "100%",
                        required: true
                    })
                ],
                beginButton: new Button({
                    text: oConfig.edit ? "Save" : "Create",
                    type: "Emphasized",
                    press: () => this._handleDialogSubmit(oDialog, oConfig)
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: () => oDialog.close()
                }),
                afterClose: () => oDialog.destroy()
            });

            this.getView().addDependent(oDialog);
            oDialog.open();
        },

        _handleDialogSubmit: async function (oDialog, oConfig) {
            const [nameInput, descInput] = oDialog.getContent().filter(c => c.getValue);
            const sName = nameInput.getValue().trim();
            const sDescription = descInput.getValue().trim();
        
            if (!sName || !sDescription) {
                MessageBox.error("Please fill in all required fields");
                return;
            }
        
            try {
                const oModel = this.getOwnerComponent().getModel();
                const sEntitySet = oConfig.type === 'category' ? 'Categories' : 'Financings';
        
                // Check for duplicates
                const oList = oModel.bindList("/" + sEntitySet);
                const aContexts = await oList.requestContexts();
                const isDuplicate = aContexts.some(context => {
                    const item = context.getObject();
                    return item[oConfig.type + 'Name'].toLowerCase() === sName.toLowerCase() &&
                           (!oConfig.edit || item[oConfig.type + 'Id'] !== oConfig.item?.[oConfig.type + 'Id']);
                });
        
                if (isDuplicate) {
                    MessageBox.error("An item with this name already exists");
                    return;
                }
        
                const oData = {
                    [oConfig.type + 'Name']: sName,
                    [oConfig.type + 'Description']: sDescription
                };

                const sPath = oConfig.edit
                    ? `/${sEntitySet}(${oConfig.item[oConfig.type + 'Id']})`
                    : `/${sEntitySet}`;
        
                if (oConfig.edit) {
                    // Call backend update handler
                    await oModel.submitBatch(oModel.getUpdateGroupId());
                    MessageBox.success("Item updated successfully");
                } else {
                    // Create new item
                    const oListBinding = oModel.bindList("/" + sEntitySet);
                    const oContext = oListBinding.create(oData);
                    await oContext.created();
                    MessageBox.success("Item created successfully");
                }
        
                oDialog.close();
        
            } catch (error) {
                console.error("Error:", error);
            }
        },

        onNavBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome", {}, true);
        }
    });
});
