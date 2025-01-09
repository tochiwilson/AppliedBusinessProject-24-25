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
            // View model to manage UI states and properties
            const oViewModel = new JSONModel({
                busy: false,
                editMode: false,
                currentItem: null,
                currentType: null
            });
            this.getView().setModel(oViewModel, "viewModel");
        },

        onCreate: function () {
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

            if (oConfig.edit) {
                this._updateEntity(oConfig, sName, sDescription);
            } else {
                this._createEntity(oConfig, sName, sDescription);
            }

            oDialog.close();
        },

        _createEntity: function (oConfig, sName, sDescription) {
            const oModel = this.getView().getModel();
            const sEntitySet = oConfig.type === 'category' ? 'Categories' : 'Financings';

            const oBindingContext = oModel.bindContext(`/${sEntitySet}`, null, {
                $$updateGroupId: "createGroup"
            });

            oBindingContext.setParameter("data", {
                [oConfig.type + "Name"]: sName,
                [oConfig.type + "Description"]: sDescription
            });

            oModel.submitChanges({
                groupId: "createGroup",
                success: () => MessageBox.success("Item created successfully"),
                error: (oError) => MessageBox.error("Error creating item: " + oError.message)
            });
        },

        _updateEntity: function (oConfig, sName, sDescription) {
            const oModel = this.getView().getModel();
            const sEntitySet = oConfig.type === 'category' ? 'Categories' : 'Financings';

            const oBindingContext = oModel.bindContext(`/${sEntitySet}(${oConfig.item[oConfig.type + 'Id']})`, null, {
                $$updateGroupId: "updateGroup"
            });

            oBindingContext.setParameter("data", {
                [oConfig.type + "Name"]: sName,
                [oConfig.type + "Description"]: sDescription
            });

            oModel.submitChanges({
                groupId: "updateGroup",
                success: () => MessageBox.success("Item updated successfully"),
                error: (oError) => MessageBox.error("Error updating item: " + oError.message)
            });
        },

        onNavBack: function () {
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteHome", {}, true);
        }
    });
});
