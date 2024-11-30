sap.ui.define(
    ["sap/fe/core/AppComponent"],
    function (Component) {
        "use strict";

        return Component.extend("expensemanagement.Component", {
            metadata: {
                manifest: "json"
            },

            init: function () {
                // Initieer de bovenliggende component functionaliteit
                Component.prototype.init.apply(this, arguments);

                // Haal het OData-model op via het manifest (dat wordt automatisch geladen)
                var oModel = this.getModel();            
            }
        });
    }
);