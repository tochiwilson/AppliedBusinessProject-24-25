using { ExpenseApp as my } from '../db/schema';

service ExpenseService {
    entity Expenses as projection on my.Expenses;
    entity Financings as projection on my.Financings;
    entity Categories as projection on my.Categories;
    entity EnvData as projection on my.EnvData;
}
