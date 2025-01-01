const cds = require('@sap/cds');
const httpclient = require('@sap-cloud-sdk/http-client');

module.exports = cds.service.impl(async (srv) => {
    // Mock data storage with expanded test data
    let mockExpenses = [
        {
            expenseId: 1,
            projectId: 1,
            projectName: 'Mock Project 1',
            projectManager: 'John Doe',
            amount: '1000',
            startDate: '2021-01-01',
            categoryId: 1,
            financingId: 1,
            durationMonths: 12,
            submittedBy: 'Jane Doe',
            submittedOn: '2021-01-01',
            status: 'Approved',
            category: {
                categoryId: 1,
                categoryName: 'Category 1',
                categoryDescription: 'Category 1 Description',
            },
            financing: {
                financingId: 1,
                financingName: 'Financing 1',
                financingDescription: 'Financing 1 Description',
            },
            envData: {
                projectId: 1,
                expenseId: 1,
                greenEnergyOutput: '1000',
                co2Current: '1000',
                co2PostCompletion: '500',
                waterUsageCurrent: '1000',
                waterUsagePostCompletion: '500',
                greenPayback: '12',
                comments: 'Comments 1',
            },
        },
        {
            expenseId: 2,
            projectId: 2,
            projectName: 'Mock Project 2',
            projectManager: 'Jane Smith',
            amount: '2000',
            startDate: '2021-02-01',
            categoryId: 2,
            financingId: 2,
            durationMonths: 24,
            submittedBy: 'John Smith',
            submittedOn: '2021-02-01',
            status: 'Pending',
            category: {
                categoryId: 2,
                categoryName: 'Category 2',
                categoryDescription: 'Category 2 Description',
            },
            financing: {
                financingId: 2,
                financingName: 'Financing 2',
                financingDescription: 'Financing 2 Description',
            },
            envData: {
                projectId: 2,
                expenseId: 2,
                greenEnergyOutput: '2000',
                co2Current: '2000',
                co2PostCompletion: '1000',
                waterUsageCurrent: '2000',
                waterUsagePostCompletion: '1000',
                greenPayback: '24',
                comments: 'Comments 2',
            },
        },
        {
            expenseId: 3,
            projectId: 3,
            projectName: 'Mock Project 3',
            projectManager: 'Mike Johnson',
            amount: '3000',
            startDate: '2021-03-01',
            categoryId: 1,
            financingId: 1,
            durationMonths: 36,
            submittedBy: 'Sarah Wilson',
            submittedOn: '2021-03-01',
            status: 'Approved',
            category: {
                categoryId: 1,
                categoryName: 'Category 1',
                categoryDescription: 'Category 1 Description',
            },
            financing: {
                financingId: 1,
                financingName: 'Financing 1',
                financingDescription: 'Financing 1 Description',
            },
            envData: {
                projectId: 3,
                expenseId: 3,
                greenEnergyOutput: '3000',
                co2Current: '3000',
                co2PostCompletion: '1500',
                waterUsageCurrent: '3000',
                waterUsagePostCompletion: '1500',
                greenPayback: '36',
                comments: 'Comments 3',
            },
        },
        {
            expenseId: 4,
            projectId: 4,
            projectName: 'Mock Project 4',
            projectManager: 'Emily Brown',
            amount: '4000',
            startDate: '2021-04-01',
            categoryId: 2,
            financingId: 2,
            durationMonths: 18,
            submittedBy: 'David Lee',
            submittedOn: '2021-04-01',
            status: 'Rejected',
            category: {
                categoryId: 2,
                categoryName: 'Category 2',
                categoryDescription: 'Category 2 Description',
            },
            financing: {
                financingId: 2,
                financingName: 'Financing 2',
                financingDescription: 'Financing 2 Description',
            },
            envData: {
                projectId: 4,
                expenseId: 4,
                greenEnergyOutput: '4000',
                co2Current: '4000',
                co2PostCompletion: '2000',
                waterUsageCurrent: '4000',
                waterUsagePostCompletion: '2000',
                greenPayback: '18',
                comments: 'Comments 4',
            },
        },
        {
            expenseId: 5,
            projectId: 5,
            projectName: 'Mock Project 5',
            projectManager: 'Robert Taylor',
            amount: '5000',
            startDate: '2021-05-01',
            categoryId: 1,
            financingId: 1,
            durationMonths: 24,
            submittedBy: 'Lisa Anderson',
            submittedOn: '2021-05-01',
            status: 'Pending',
            category: {
                categoryId: 1,
                categoryName: 'Category 1',
                categoryDescription: 'Category 1 Description',
            },
            financing: {
                financingId: 1,
                financingName: 'Financing 1',
                financingDescription: 'Financing 1 Description',
            },
            envData: {
                projectId: 5,
                expenseId: 5,
                greenEnergyOutput: '5000',
                co2Current: '5000',
                co2PostCompletion: '2500',
                waterUsageCurrent: '5000',
                waterUsagePostCompletion: '2500',
                greenPayback: '24',
                comments: 'Comments 5',
            },
        }
    ];

    let mockEnvData = mockExpenses.map(expense => expense.envData);

    // Rest of your service implementation (READ and CREATE handlers) remains the same...

    srv.on('READ', 'Expenses', async (req) => {
        return mockExpenses;
    });

    srv.on('READ', 'Categories', async (req) => {
        return [
            {
                categoryId: '1',
                categoryName: 'Category 1',
                categoryDescription: 'Category 1 Description',
            },
            {
                categoryId: '2',
                categoryName: 'Category 2',
                categoryDescription: 'Category 2 Description',
            },
        ];
    });

    srv.on('READ', 'Financings', async (req) => {
        return [
            {
                financingId: '1',
                financingName: 'Financing 1',
                financingDescription: 'Financing 1 Description',
            },
            {
                financingId: '2',
                financingName: 'Financing 2',
                financingDescription: 'Financing 2 Description',
            },
        ];
    });

    srv.on('READ', 'EnvData', async (req) => {
        return mockEnvData;
    });

    srv.on('READ', 'ApprovedAmountsPerCategory', async (req) => {
        return [
            {
                categoryId: '1',
                categoryName: 'Category 1',
                totalApprovedAmount: '4000',
            },
            {
                categoryId: '2',
                categoryName: 'Category 2',
                totalApprovedAmount: '2000',
            },
        ];
    });

    // Your existing CREATE handlers remain the same...
    
    // CREATE handlers
    srv.on('CREATE', 'Expenses', async (req) => {
        try {
            // Generate new IDs
            const newExpenseId = Math.max(...mockExpenses.map(e => e.expenseId), 0) + 1;
            const newProjectId = Math.max(...mockExpenses.map(e => e.projectId), 0) + 1;

            // Create new expense with generated IDs
            const expense = {
                expenseId: newExpenseId,
                projectId: newProjectId,
                projectName: req.data.projectName,
                projectManager: req.data.projectManager,
                amount: req.data.amount,
                startDate: req.data.startDate,
                categoryId: req.data.categoryId,
                financingId: req.data.financingId,
                durationMonths: req.data.durationMonths,
                status: 'Pending',
                submittedBy: req.data.submittedBy || 'anonymous',
                submittedOn: new Date().toISOString().split('T')[0]
            };

            // Add the related category and financing data
            expense.category = {
                categoryId: req.data.categoryId,
                categoryName: `Category ${req.data.categoryId}`,
                categoryDescription: `Category ${req.data.categoryId} Description`
            };

            expense.financing = {
                financingId: req.data.financingId,
                financingName: `Financing ${req.data.financingId}`,
                financingDescription: `Financing ${req.data.financingId} Description`
            };

            // Store the expense
            mockExpenses.push(expense);
            console.log('Created expense:', expense);
            
            return expense;
        } catch (error) {
            console.error('Error creating expense:', error);
            throw error;
        }
    });

    srv.on('CREATE', 'EnvData', async (req) => {
        try {
            const envData = {
                projectId: req.data.projectId,
                expenseId: req.data.expenseId,
                greenEnergyOutput: req.data.greenEnergyOutput,
                co2Current: req.data.co2Current,
                co2PostCompletion: req.data.co2PostCompletion,
                waterUsageCurrent: req.data.waterUsageCurrent,
                waterUsagePostCompletion: req.data.waterUsagePostCompletion,
                greenPayback: req.data.greenPayback,
                comments: req.data.comments
            };

            // Store the environmental data
            mockEnvData.push(envData);

            // Link to the corresponding expense
            const expense = mockExpenses.find(e => e.expenseId === envData.expenseId);
            if (expense) {
                expense.envData = envData;
            }

            console.log('Created environmental data:', envData);
            return envData;
        } catch (error) {
            console.error('Error creating environmental data:', error);
            throw error;
        }
    });

    // try {
    //     // Configuratie voor entiteiten en hun respectieve OData-set
    //     const entityConfig = {
    //         Expenses: {
    //             endpoint: 'ExpenseSet',
    //             map: (expense, relatedData) => ({
    //                 expenseId: expense.ExpenseId,
    //                 projectId: expense.ProjectId,
    //                 projectName: expense.ProjectName,
    //                 projectManager: expense.ProjectManager,
    //                 amount: expense.Amount,
    //                 startDate: expense.StartDate,
    //                 categoryId: expense.CategoryId,
    //                 financingId: expense.FinancingId,
    //                 durationMonths: expense.DurationMonths,
    //                 submittedBy: expense.SubmittedBy,
    //                 submittedOn: expense.SubmittedOn,
    //                 status: expense.Status,
    //                 category: relatedData.Categories.find(cat => cat.categoryId === expense.CategoryId),
    //                 financing: relatedData.Financings.find(fin => fin.financingId === expense.FinancingId),
    //                 envData: relatedData.EnvData.find(env => env.projectId === expense.ProjectId),
    //             }),
    //         },
    //         Categories: {
    //             endpoint: 'CategorySet',
    //             map: category => ({
    //                 categoryId: category.CategoryId,
    //                 categoryName: category.CategoryName,
    //                 categoryDescription: category.CategoryDescription,
    //             }),
    //         },
    //         Financings: {
    //             endpoint: 'FinancingSet',
    //             map: financing => ({
    //                 financingId: financing.FinancingId,
    //                 financingName: financing.FinancingName,
    //                 financingDescription: financing.FinancingDescription,
    //             }),
    //         },
    //         EnvData: {
    //             endpoint: 'EnvDataSet',
    //             map: data => ({
    //                 projectId: data.ProjectId,
    //                 expenseId: data.ExpenseId,
    //                 greenEnergyOutput: data.GreenEnergyOutput,
    //                 co2Current: data.Co2Current,
    //                 co2PostCompletion: data.Co2PostCompletion,
    //                 waterUsageCurrent: data.WaterUsageCurrent,
    //                 waterUsagePostCompletion: data.WaterUsagePostCompletion,
    //                 greenPayback: data.GreenPayback,
    //                 comments: data.Comments,
    //             }),
    //         },
    //     };

    //     // Generieke functie om gegevens van een endpoint op te halen
    //     const getData = async (endpoint) => {
    //         try {
    //             const response = await httpclient.executeHttpRequest(
    //                 { destinationName: 'S4HANA_DEST' },
    //                 {
    //                     method: 'GET',
    //                     url: `/${endpoint}`,
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     params: { format: 'json' },
    //                     parameterEncoder: httpclient.encodeAllParameters,
    //                 }
    //             );
    //             return response.data.d.results;
    //         } catch (error) {
    //             console.error(`Error fetching data from ${endpoint}:`, error.message);
    //             throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
    //         }
    //     };

    //     // Haal alle gegevens vooraf op en cache lokaal
    //     const dataCache = {};
    //     for (const [entity, { endpoint }] of Object.entries(entityConfig)) {
    //         dataCache[entity] = await getData(endpoint);
    //     }

    //     // Bereid gerelateerde gegevens voor gebruik in de mapping van Expenses
    //     const relatedData = {
    //         Categories: dataCache.Categories.map(entityConfig.Categories.map),
    //         Financings: dataCache.Financings.map(entityConfig.Financings.map),
    //         EnvData: dataCache.EnvData.map(entityConfig.EnvData.map),
    //     };

    //     // Registreer READ-handlers voor alle entiteiten
    //     for (const [entity, { map }] of Object.entries(entityConfig)) {
    //         srv.on('READ', entity, async (req) => {
    //             if (entity === 'Expenses') {
    //                 const { expenseId, projectId, categoryId, financingId } = req.data;

    //                 if (expenseId && projectId && categoryId && financingId) {
    //                     // Als een specifieke expense wordt gezocht, bouw de complexe sleutel
    //                     const mandt = '238'; // Standaardwaarde
    //                     const key = `(Mandt='${mandt}',ExpenseId=${expenseId},ProjectId=${projectId},CategoryId=${categoryId},FinancingId=${financingId})`;
    //                     const endpoint = `ExpenseSet${key}`;

    //                     try {
    //                         const response = await httpclient.executeHttpRequest(
    //                             { destinationName: 'S4HANA_DEST' },
    //                             {
    //                                 method: 'GET',
    //                                 url: `/${endpoint}`,
    //                                 headers: { 'Content-Type': 'application/json' },
    //                             }
    //                         );
    //                         const expense = response.data.d;

    //                         // Controleer of de opgehaalde expense leeg is
    //                         if (!expense) {
    //                             req.error(404, `Expense with ID ${expenseId} not found.`);
    //                             return [];
    //                         }

    //                         return [map(expense, relatedData)];
    //                     } catch (error) {
    //                         console.error('Error fetching specific expense:', error.message);
    //                         req.error(500, `Failed to fetch expense: ${error.message}`);
    //                     }
    //                 } else {
    //                     // Als geen specifieke zoekparameters zijn meegegeven, retourneer alle expenses
    //                     return dataCache[entity].map(expense => map(expense, relatedData));
    //                 }
    //             } else {
    //                 return dataCache[entity].map(map);
    //             }
    //         });
    //     }

    //     // Handler voor ApprovedAmountsPerCategory
    //     srv.on('READ', 'ApprovedAmountsPerCategory', async (req) => {
    //         try {
    //             // Controleer of Expenses-data al is geladen
    //             const expenses = dataCache.Expenses || (await getData(entityConfig.Expenses.endpoint));
    //             const categories = dataCache.Categories || (await getData(entityConfig.Categories.endpoint));

    //             // Bereken het totale goedgekeurde bedrag per categorie
    //             const approvedAmountsPerCategory = categories.map((category) => {
    //                 const totalAmount = expenses
    //                     .filter(expense => expense.Status === 'Approved' && expense.CategoryId === category.CategoryId)
    //                     .reduce((sum, expense) => sum + Number(expense.Amount || 0), 0);

    //                 return {
    //                     categoryId: category.CategoryId,
    //                     categoryName: category.CategoryName,
    //                     totalApprovedAmount: totalAmount,
    //                 };
    //             });

    //             return approvedAmountsPerCategory;
    //         } catch (error) {
    //             console.error('Error calculating approved amounts per category:', error.message);
    //             req.error(500, `Failed to calculate approved amounts per category: ${error.message}`);
    //         }
    //     });

    // } catch (err) {
    //     console.error('Global service implementation error:', err.message);
    //     throw new Error('Service initialization failed.');
    // }
});
