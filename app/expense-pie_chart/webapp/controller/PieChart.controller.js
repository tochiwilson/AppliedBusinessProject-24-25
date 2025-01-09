sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("expensepiechart.controller.PieChart", {
            onInit: function () {
                var oModel = this.getOwnerComponent().getModel();
                this.getView().setModel(oModel);
            },

            onNavBack: function() {
                window.location.href = "../../index.html";  // twee niveaus omhoog naar de root
            }
        });
    });
