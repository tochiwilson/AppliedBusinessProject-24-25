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

        srv.on('READ', 'Expenses', async (req) => {
            try {
                const expenses = await getData(entityConfig.Expenses.endpoint);
                const relatedData = {
                    Categories: await getData(entityConfig.Categories.endpoint).then(data =>
                        data.map(entityConfig.Categories.map)
                    ),
                    Financings: await getData(entityConfig.Financings.endpoint).then(data =>
                        data.map(entityConfig.Financings.map)
                    ),
                    EnvData: await getData(entityConfig.EnvData.endpoint).then(data =>
                        data.map(entityConfig.EnvData.map)
                    ),
                };

                return expenses.map(expense => entityConfig.Expenses.map(expense, relatedData));
            } catch (error) {
                console.error('Error reading expenses:', error.message);
                req.error(500, `Failed to fetch expenses: ${error.message}`);
            }
        });

        srv.on('READ', 'Categories', async (req) => {
            try {
                const categories = await getData(entityConfig.Categories.endpoint);
                return categories.map(entityConfig.Categories.map);
            } catch (error) {
                console.error('Error reading categories:', error.message);
                req.error(500, `Failed to fetch categories: ${error.message}`);
            }
        });

        srv.on('READ', 'Financings', async (req) => {
            try {
                const financings = await getData(entityConfig.Financings.endpoint);
                return financings.map(entityConfig.Financings.map);
            } catch (error) {
                console.error('Error reading financings:', error.message);
                req.error(500, `Failed to fetch financings: ${error.message}`);
            }
        });

        srv.on('READ', 'EnvData', async (req) => {
            try {
                const envData = await getData(entityConfig.EnvData.endpoint);
                return envData.map(entityConfig.EnvData.map);
            } catch (error) {
                console.error('Error reading envData:', error.message);
                req.error(500, `Failed to fetch environmental data: ${error.message}`);
            }
        });

        srv.on('READ', 'ApprovedAmountsPerCategory', async (req) => {
            try {
                const expenses = await getData(entityConfig.Expenses.endpoint);
                const categories = await getData(entityConfig.Categories.endpoint).then(data =>
                    data.map(entityConfig.Categories.map)
                );

                const approvedAmountsPerCategory = categories.map((category) => {
                    const totalAmount = expenses
                        .filter(expense => expense.Status === 'Approved' && expense.CategoryId === category.categoryId)
                        .reduce((sum, expense) => sum + Number(expense.Amount || 0), 0);

                    return {
                        categoryId: category.categoryId,
                        categoryName: category.categoryName,
                        totalApprovedAmount: totalAmount,
                    };
                });

                return approvedAmountsPerCategory;
            } catch (error) {
                console.error('Error calculating approved amounts per category:', error.message);
                req.error(500, `Failed to calculate approved amounts per category: ${error.message}`);
            }
        });

        srv.on('CREATE', 'Expenses', async (req) => {
            const countResponse = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'GET',
                    url: '/ExpenseSet/$count',
                    headers: { 'Accept': 'application/json' }
                }
            );

            const recordCount = parseInt(countResponse.data, 10);
            const newId = recordCount + 1;

            const expenseData = {
                Mandt: '238',
                ProjectName: req.data.projectName,
                ProjectId: newId.toString(),
                ExpenseId: newId.toString(),
                ProjectManager: req.data.projectManager,
                Amount: req.data.amount,
                StartDate: req.data.startDate.split('T')[0].replace(/-/g, ''),
                CategoryId: req.data.categoryId,
                FinancingId: req.data.financingId,
                DurationMonths: req.data.durationMonths,
                Status: req.data.status,
                SubmittedBy: req.data.submittedBy,
                SubmittedOn: req.data.submittedOn.split('T')[0].replace(/-/g, '')
            };

            // Maak de Expense aan
            const expenseResponse = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'POST',
                    url: '/ExpenseSet',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: expenseData
                }
            );

            // Voeg direct EnvData toe aan de aangemaakte Expense
            const envData = {
                ProjectId: newId.toString(),
                ExpenseId: newId.toString(),
                GreenEnergyOutput: req.data.envData.greenEnergyOutput || "0",
                Co2Current: req.data.envData.co2Current || "0",
                Co2PostCompletion: req.data.envData.co2PostCompletion || "0",
                WaterUsageCurrent: req.data.envData.waterUsageCurrent || "0",
                WaterUsagePostCompletion: req.data.envData.waterUsagePostCompletion || "0",
                GreenPayback: req.data.envData.greenPayback || "0",
                Comments: req.data.envData.comments || "No comments"
            };

            const envDataResponse = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'POST',
                    url: '/EnvDataSet',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: envData
                }
            );

            return {
                expense: expenseResponse.data,
                envData: envDataResponse.data
            };
        });

        srv.on('CREATE', 'Financings', async (req) => {
            const countResponse = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'GET',
                    url: '/FinancingSet/$count',
                    headers: { 'Accept': 'application/json' }
                }
            );

            const recordCount = parseInt(countResponse.data, 10);
            const newId = recordCount + 1;

            const financingData = {
                Mandt: '238',
                FinancingId: newId.toString(),
                FinancingName: req.data.financingName,
                FinancingDescription: req.data.financingDescription
            };

            const response = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'POST',
                    url: '/FinancingSet',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: financingData
                }
            );

            return response.data;
        });

        srv.on('UPDATE', 'Financings', async (req) => {
            const financingData = {
                FinancingName: req.data.financingName,
                FinancingDescription: req.data.financingDescription
            };

            const response = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'PUT',
                    url: `/FinancingSet(Mandt='238',FinancingId=${req.data.financingId}')`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: financingData
                }
            );

            return response.data;
        });

        srv.on('DELETE', 'Financings', async (req) => {

            const response = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'DELETE',
                    url: `/FinancingSet(Mandt='238',FinancingId=${req.data.financingId})`,
                    headers: { 'Accept': 'application/json' }
                }
            );

            return response.data;
        });

        srv.on('CREATE', 'Categories', async (req) => {
            const countResponse = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'GET',
                    url: '/CategorySet/$count',
                    headers: { 'Accept': 'application/json' }
                }
            );

            const recordCount = parseInt(countResponse.data, 10);
            const newId = recordCount + 1;

            const categoryData = {
                Mandt: '238',
                CategoryId: newId.toString(),
                CategoryName: req.data.categoryName,
                CategoryDescription: req.data.categoryDescription
            };

            const response = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'POST',
                    url: '/CategorySet',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: categoryData
                }
            );

            return response.data;
        });

        srv.on('UPDATE', 'Categories', async (req) => {
            const categoryData = {
                CategoryName: req.data.categoryName,
                CategoryDescription: req.data.categoryDescription
            };

            const response = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'PUT',
                    url: `/CategorySet(Mandt='238',CategoryId=${req.data.categoryId})`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: categoryData
                }
            );

            return response.data;
        });

        srv.on('DELETE', 'Categories', async (req) => {
            const response = await httpclient.executeHttpRequest(
                { destinationName: 'S4HANA_DEST' },
                {
                    method: 'DELETE',
                    url: `/CategorySet(Mandt='238',CategoryId=${req.data.categoryId})`,
                    headers: { 'Accept': 'application/json' }
                }
            );

            return response.data;
        });

    } catch (err) {
        console.error('Global service implementation error:', err.message);
        throw new Error('Service initialization failed.');
    }
});
