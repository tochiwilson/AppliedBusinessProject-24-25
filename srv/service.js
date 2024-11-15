require('dotenv').config();

const cds = require('@sap/cds');

module.exports = cds.service.impl(async (srv) => {
    const { Expenses, Categories, Financings, EnvData } = srv.entities;

    // Statische metadata voor elk type entiteit
    const expenseMetadata = [
        { projectId: 'EX123', projectName: 'Project X', projectManager: 'John Doe', startDate: '2023-01-01', categoryId: 'CAT1', financingId: 'FIN1', durationMonths: 12, submittedBy: 'Alice', submittedOn: '2023-01-02', status: 'Active' }
    ];

    const categoryMetadata = [
        { categoryId: 'CAT1', categoryName: 'Infrastructure', categoryDescription: 'Infrastructure Projects' }
    ];

    const financingMetadata = [
        { financingId: 'FIN1', financingName: 'Government Grant', financingDescription: 'Government-provided funding' }
    ];

    const envDataMetadata = [
        { projectID: 'EX123', greenEnergyOutput: 1000, co2Current: 500, co2PostCompletion: 300, waterUsageCurrent: 2000, waterUsagePostCompletion: 1500, greenPayback: 5, comments: 'Green project' }
    ];

    // Return statische metadata in plaats van echte data
    srv.on('READ', 'Expenses', async () => {
        return expenseMetadata;
    });

    srv.on('READ', 'Categories', async () => {
        return categoryMetadata;
    });

    srv.on('READ', 'Financings', async () => {
        return financingMetadata;
    });

    srv.on('READ', 'EnvData', async () => {
        return envDataMetadata;
    });
});
