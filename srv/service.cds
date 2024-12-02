using {ExpenseApp as app} from '../db/schema';

service ExpenseService {

    entity Expenses   as projection on app.Expenses;
    entity Categories as projection on app.Categories;
    entity Financings as projection on app.Financings;
    entity EnvData    as projection on app.EnvData;

}
