using { cuid, managed } from '@sap/cds/common';

context ExpenseApp {

    // Entity for Expenses
    entity Expenses: cuid, managed {
        description       : String(255);
        amount            : Decimal(10,2);
        date              : Date;
        category          : Association to Categories;
        financing         : Association to Financings;
    }

    // Entity for Financings
    entity Financings: cuid, managed {
        name              : String(100);
        description       : String(255);
    }

    // Entity for Categories
    entity Categories: cuid, managed {
        name              : String(100);
        description       : String(255);
    }

    // Entity for Environmental Data (EnvData)
    entity EnvData: cuid, managed {
        projectID                     : Association to Expenses;
        greenEnergyOutput             : Decimal(4,0);
        co2Current                    : String(100);
        co2PostCompletion             : String(100);
        waterUsageCurrent             : String(100);
        waterUsagePostCompletion      : String(100);
        greenPayback                  : String(100);
        comments                      : String(100);
    }
}
