const cds = require('@sap/cds');
const httpclient = require('@sap-cloud-sdk/http-client');

module.exports = cds.service.impl(async (srv) => {
    try {
        const entityConfig = {
            Expenses: {
                endpoint: 'ExpenseSet',
                map: (expense, relatedData) => ({
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
                    category: relatedData.Categories.find(cat => cat.categoryId === expense.CategoryId),
                    financing: relatedData.Financings.find(fin => fin.financingId === expense.FinancingId),
                    envData: relatedData.EnvData.find(env => env.projectId === expense.ProjectId),
                }),
            },
            Categories: {
                endpoint: 'CategorySet',
                map: category => ({
                    categoryId: category.CategoryId,
                    categoryName: category.CategoryName,
                    categoryDescription: category.CategoryDescription,
                }),
            },
            Financings: {
                endpoint: 'FinancingSet',
                map: financing => ({
                    financingId: financing.FinancingId,
                    financingName: financing.FinancingName,
                    financingDescription: financing.FinancingDescription,
                }),
            },
            EnvData: {
                endpoint: 'EnvDataSet',
                map: data => ({
                    projectId: data.ProjectId,
                    expenseId: data.ExpenseId,
                    greenEnergyOutput: data.GreenEnergyOutput,
                    co2Current: data.Co2Current,
                    co2PostCompletion: data.Co2PostCompletion,
                    waterUsageCurrent: data.WaterUsageCurrent,
                    waterUsagePostCompletion: data.WaterUsagePostCompletion,
                    greenPayback: data.GreenPayback,
                    comments: data.Comments,
                }),
            },
        };

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
                        params: { format: 'json' },
                        parameterEncoder: httpclient.encodeAllParameters,
                    }
                );
                return response.data.d.results;
            } catch (error) {
                console.error(`Error fetching data from ${endpoint}:`, error.message);
                throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
            }
        };

        const dataCache = {};
        for (const [entity, { endpoint }] of Object.entries(entityConfig)) {
            dataCache[entity] = await getData(endpoint);
        }

        const relatedData = {
            Categories: dataCache.Categories.map(entityConfig.Categories.map),
            Financings: dataCache.Financings.map(entityConfig.Financings.map),
            EnvData: dataCache.EnvData.map(entityConfig.EnvData.map),
        };

        for (const [entity, { map }] of Object.entries(entityConfig)) {
            srv.on('READ', entity, async (req) => {
                if (entity === 'Expenses') {
                    return dataCache[entity].map(expense => map(expense, relatedData));
                } else {
                    return dataCache[entity].map(map);
                }
            });
        }

        srv.on('READ', 'ApprovedAmountsPerCategory', async (req) => {
            try {
                const expenses = dataCache.Expenses;
                const categories = dataCache.Categories;

                const approvedAmountsPerCategory = categories.map((category) => {
                    const totalAmount = expenses
                        .filter(expense => expense.Status === 'Approved' && expense.CategoryId === category.CategoryId)
                        .reduce((sum, expense) => sum + Number(expense.Amount || 0), 0);

                    return {
                        categoryId: category.CategoryId,
                        categoryName: category.CategoryName,
                        totalApprovedAmount: totalAmount,
                    };
                });

                return approvedAmountsPerCategory;
            } catch (error) {
                console.error('Error calculating approved amounts per category:', error.message);
                req.error(500, `Failed to calculate approved amounts per category: ${error.message}`);
            }
        });

    } catch (err) {
        console.error('Global service implementation error:', err.message);
        throw new Error('Service initialization failed.');
    }
});
