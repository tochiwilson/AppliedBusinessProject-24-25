sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    'sap/ui/Device',
    'sap/f/library'

], (Controller, ) => {
    "use strict";

    return Controller.extend("masterdatamanagement.controller.FinanceType", {
        onInit: function () {
            console.log("FinanceType controller initialized.");
        }
    });
});