sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'expense/test/integration/FirstJourney',
		'expense/test/integration/pages/ExpensesList',
		'expense/test/integration/pages/ExpensesObjectPage'
    ],
    function(JourneyRunner, opaJourney, ExpensesList, ExpensesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('expense') + '/index.html'
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