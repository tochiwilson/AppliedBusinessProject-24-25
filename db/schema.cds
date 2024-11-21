using {
    cuid,
    managed
} from '@sap/cds/common';

context ExpenseApp {

    // Entity for Expenses
    entity Expenses : cuid, managed {
        projectId      : String(4);
        projectName    : String(100);
        projectManager : String(100);
        startDate      : Date;
        categoryId     : String(4);
        financingId    : String(4);
        durationMonths : Integer;
        submittedBy    : String(100);
        submittedOn    : Date;
        status         : String(100);

        // Associaties naar Categories, Financings en EnvData
        category       : Association to Categories
                             on categoryId = categoryId;
        financing      : Association to Financings
                             on financingId = financingId;
        envData        : Association to EnvData
                             on projectId = projectId;
    }

    // Entity for Financings
    entity Financings : managed {
        key financingId          : String(4);
            financingName        : String(100);
            financingDescription : String(255);
    }

    // Entity for Categories
    entity Categories : managed {
        key categoryId          : String(4);
            categoryName        : String(100);
            categoryDescription : String(255);
    }

    // Entity for Environmental Data (EnvData)
    entity EnvData : managed {
        key projectEnvId             : String(4);
            projectId                : String(4); // Verbindt met Expenses
            greenEnergyOutput        : Decimal(4, 0);
            co2Current               : String(100);
            co2PostCompletion        : String(100);
            waterUsageCurrent        : String(100);
            waterUsagePostCompletion : String(100);
            greenPayback             : String(100);
            comments                 : String(100);
    }
}
