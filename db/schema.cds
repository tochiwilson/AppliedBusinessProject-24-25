using {managed} from '@sap/cds/common';

context ExpenseApp {

    // Entity for Expenses
    entity Expenses : managed {
        key expenseId      : Integer;
            projectId      : Integer;
            projectName    : String(100);
            projectManager : String(100);
            amount         : String(100);
            startDate      : Date;
            categoryId     : Integer;
            financingId    : Integer;
            durationMonths : Integer;
            submittedBy    : String(100);
            submittedOn    : Date;
            status         : String(100);
            category       : Association to Categories;
            financing      : Association to Financings;
            envData        : Association to EnvData;
    }

    // Entity for Financings
    entity Financings : managed {
        key financingId          : Integer;
            financingName        : String(100);
            financingDescription : String(255);
    }

    // Entity for Categories
    entity Categories : managed {
        key categoryId          : Integer;
            categoryName        : String(100);
            categoryDescription : String(255);
    }

    // Entity for Environmental Data (EnvData)
    entity EnvData : managed {
        key projectId                : Integer;
            expenseId                : Integer;
            greenEnergyOutput        : Decimal(4, 0);
            co2Current               : String(100);
            co2PostCompletion        : String(100);
            waterUsageCurrent        : String(100);
            waterUsagePostCompletion : String(100);
            greenPayback             : String(100);
            comments                 : String(100);
    }
}
