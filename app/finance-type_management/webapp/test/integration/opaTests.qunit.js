sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'financetypemanagement/test/integration/FirstJourney',
		'financetypemanagement/test/integration/pages/ExpensesList',
		'financetypemanagement/test/integration/pages/ExpensesObjectPage'
    ],
    function(JourneyRunner, opaJourney, ExpensesList, ExpensesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('financetypemanagement') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheExpensesList: ExpensesList,
					onTheExpensesObjectPage: ExpensesObjectPage
                }
            },
            opaJourney.run
        );
    }
);