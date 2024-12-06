sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("expensemanagement.controller.MainView", {

    onInit: function () {
      // Het OData-model wordt automatisch geladen door het manifest.json bestand
      var oModel = this.getOwnerComponent().getModel();

      // Data binden aan de view
      this.getView().setModel(oModel);
    }

  });
});
