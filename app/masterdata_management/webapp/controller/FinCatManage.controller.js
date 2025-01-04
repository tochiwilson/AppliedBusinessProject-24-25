sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("masterdatamanagement.controller.FinCatManage", {
        onInit() {},
        async onOpenDialog() {
            this.oDialog ??= await this.loadFragment({
                name: "masterdatamanagement.view.FinanceType"
            });

            
        },

        // create methode

        // edit methode

        // delete methode ?

        // state_change methode ?
    });
    
});