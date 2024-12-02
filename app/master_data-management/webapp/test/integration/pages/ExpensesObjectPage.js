sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'masterdatamanagement',
            componentId: 'ExpensesObjectPage',
            contextPath: '/Expenses'
        },
        CustomPageDefinitions
    );
});