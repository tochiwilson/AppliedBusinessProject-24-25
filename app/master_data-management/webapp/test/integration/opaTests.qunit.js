sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'masterdatamanagement/test/integration/FirstJourney',
		'masterdatamanagement/test/integration/pages/ExpensesList',
		'masterdatamanagement/test/integration/pages/ExpensesObjectPage'
    ],
    function(JourneyRunner, opaJourney, ExpensesList, ExpensesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('masterdatamanagement') + '/index.html'
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