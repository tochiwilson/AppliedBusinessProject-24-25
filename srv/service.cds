using {ExpenseApp as app} from '../db/schema';

service ExpenseService {

    entity Expenses   as
        projection on app.Expenses {
            expenseId,
            projectId,
            projectName,
            projectManager,
            amount,
            startDate,
            categoryId,
            financingId,
            durationMonths,
            submittedBy,
            submittedOn,
            status,
            category {
                categoryId,
                categoryName,
                categoryDescription,
            },
            financing {
                financingId,
                financingName,
                financingDescription,
            },
            envData {
                projectId,
                greenEnergyOutput,
                co2Current,
                co2PostCompletion,
                waterUsageCurrent,
                waterUsagePostCompletion,
                greenPayback,
                comments,
            }
        }

    entity Categories as projection on app.Categories;
    entity Financings as projection on app.Financings;
    entity EnvData    as projection on app.EnvData;

}
