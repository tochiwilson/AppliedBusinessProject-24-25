sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function (Controller) {
    "use strict";
  
    return Controller.extend("master_data-management.controller.MainView", {
  
      onInit: function () {
        // Het OData-model wordt automatisch geladen door het manifest.json bestand
        var oModel = this.getOwnerComponent().getModel();
  
        // Data binden aan de view
        this.getView().setModel(oModel);
      },
      onEditPress: function (oEvent) {
        var oContext = oEvent.getSource().getBindingContext();
        var sName = oContext.getProperty("Name");
        sap.m.MessageToast.show("Editing: " + sName);
    
        // Additional logic for editing can be added here.
    }
    
    });
  });
  