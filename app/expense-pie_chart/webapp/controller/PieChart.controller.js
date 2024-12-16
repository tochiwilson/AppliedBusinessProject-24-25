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
                var oModel = new sap.ui.model.json.JSONModel(sap.ui.require.toUrl("expensepiechart/model/data.json"));
                this.getView().setModel(oModel);
            }
        });
    });
