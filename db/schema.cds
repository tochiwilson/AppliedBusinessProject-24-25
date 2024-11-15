using { cuid, managed } from '@sap/cds/common';

context ExpenseApp {

    // Entity for Expenses
    entity Expenses: cuid, managed {
        projectId         : String(4);
        projectName       : String(100);
        projectManager    : String(100);
        startDate         : Date;
        categoryId        : String(4);
        financingId       : String(4);
        durationMonths    : Integer;
        submittedBy       : String(100);
        submittedOn       : Date;
        status            : String(100);
    }

    // Entity for Financings
    entity Financings: cuid, managed {
        financingId       : String(4); // ID van de financiering
        financingName     : String(100);
        financingDescription : String(255);
    }

    // Entity for Categories
    entity Categories: cuid, managed {
        categoryId        : String(4); // ID van de categorie
        categoryName      : String(100);
        categoryDescription : String(255);
    }

    // Entity for Environmental Data (EnvData)
    entity EnvData: cuid, managed {
        projectID         : Association to Expenses; 
        greenEnergyOutput : Decimal(4,0);
        co2Current        : String(100);
        co2PostCompletion : String(100);
        waterUsageCurrent : String(100);
        waterUsagePostCompletion : String(100);
        greenPayback      : String(100);
        comments          : String(100);
    }
}
