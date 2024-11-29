require('dotenv').config();

const cds = require('@sap/cds');
const httpclient = require('@sap-cloud-sdk/http-client');

module.exports = cds.service.impl(async (srv) => {
    try {
        const { Expenses, Categories, Financings, EnvData } = srv.entities;

        // Functie om gegevens van de OData-service op te halen via de destination
        const getData = async (endpoint) => {
            try {
                const response = await httpclient.executeHttpRequest(
                    { destinationName: 'S4HANA_DEST' },
                    {
                        method: 'GET',
                        url: `/${endpoint}`,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: {
                            format: 'json',
                        },
                        parameterEncoder: httpclient.encodeAllParameters,
                    }
                );
                return response.data.d.results;
            } catch (error) {
                console.error(`Error fetching data from ${endpoint}:`, error.message);
                throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
            }
        };

        // Haal de gegevens op voor elke entity
        const expenseData = await getData('ExpenseSet');
        const categoryData = await getData('CategorySet');
        const financingData = await getData('FinancingSet');
        const envData = await getData('EnvDataSet');

        // Voeg de data toe aan je CAP-entiteiten
        srv.on('READ', 'Expenses', async () => {
            return expenseData.map(expense => ({
                expenseId: expense.ExpenseId,
                projectId: expense.ProjectId,
                projectName: expense.ProjectName,
                projectManager: expense.ProjectManager,
                amount: expense.Amount,
                startDate: expense.StartDate,
                categoryId: expense.CategoryId,
                financingId: expense.FinancingId,
                durationMonths: expense.DurationMonths,
                submittedBy: expense.SubmittedBy,
                submittedOn: expense.SubmittedOn,
                status: expense.Status,
                
                // Associaties toevoegen
                category: categoryData.find(category => category.CategoryId === expense.CategoryId),
                financing: financingData.find(financing => financing.FinancingId === expense.FinancingId),
                envData: envData.find(data => data.ProjectId === expense.ProjectId),
            }));
        });

        srv.on('READ', 'Categories', async () => {
            return categoryData.map(category => ({
                categoryId: category.CategoryId,
                categoryName: category.CategoryName,
                categoryDescription: category.CategoryDescription,
            }));
        });

        srv.on('READ', 'Financings', async () => {
            return financingData.map(financing => ({
                financingId: financing.FinancingId,
                financingName: financing.FinancingName,
                financingDescription: financing.FinancingDescription,
            }));
        });

        srv.on('READ', 'EnvData', async () => {
            return envData.map(data => ({
                projectId: data.ProjectId,
                greenEnergyOutput: data.GreenEnergyOutput,
                co2Current: data.Co2Current,
                co2PostCompletion: data.Co2PostCompletion,
                waterUsageCurrent: data.WaterUsageCurrent,
                waterUsagePostCompletion: data.WaterUsagePostCompletion,
                greenPayback: data.GreenPayback,
                comments: data.Comments,
            }));
        });
    } catch (err) {
        console.error('Global service implementation error:', err);
        throw new Error('Service initialization failed.');
    }
});
