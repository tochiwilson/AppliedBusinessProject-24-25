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