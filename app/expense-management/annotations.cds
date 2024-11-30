using ExpenseService as service from '../../srv/service';

annotate service.Expenses with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Expense ID',
                Value: expenseId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Project ID',
                Value: projectId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Project Name',
                Value: projectName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Project Manager',
                Value: projectManager,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Amount',
                Value: amount,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Start Date',
                Value: startDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Category Name',
                Value: category.categoryName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Financing Name',
                Value: financing.financingName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Duration (Months)',
                Value: durationMonths,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Submitted By',
                Value: submittedBy,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Submitted On',
                Value: submittedOn,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Status',
                Value: status,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Green Energy Output',
                Value: envData.greenEnergyOutput,
            },
            {
                $Type: 'UI.DataField',
                Label: 'CO2 Current',
                Value: envData.co2Current,
            },
            {
                $Type: 'UI.DataField',
                Label: 'CO2 Post Completion',
                Value: envData.co2PostCompletion,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Water Usage Current',
                Value: envData.waterUsageCurrent,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Water Usage Post Completion',
                Value: envData.waterUsagePostCompletion,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Green Payback',
                Value: envData.greenPayback,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Comments',
                Value: envData.comments,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneralFacet',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Project Name',
            Value: projectName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Status',
            Value: status,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Start Date',
            Value: startDate,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Project Manager',
            Value: projectManager,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Category',
            Value: category.categoryName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Financing',
            Value: financing.financingName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Green Energy Output',
            Value: envData.greenEnergyOutput,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Green Payback',
            Value: envData.greenPayback,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Comments',
            Value: envData.comments,
        }
    ],
    UI.HeaderInfo                : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Expense',
        TypeNamePlural: 'Expenses',
        Title         : {
            $Type: 'UI.DataField',
            Value: projectName,
        },
        Description   : {
            $Type: 'UI.DataField',
            Value: projectManager,
        },
    },
);

annotate service.Categories with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Category ID',
                Value: categoryId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Category Name',
                Value: categoryName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Description',
                Value: categoryDescription,
            },
        ],
    },

    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Category ID',
            Value: categoryId,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Category Name',
            Value: categoryName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: categoryDescription,
        },
    ]
);

annotate service.Financings with @(

    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Financing ID',
                Value: financingId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Financing Name',
                Value: financingName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Description',
                Value: financingDescription,
            },
        ],
    },

    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Financing ID',
            Value: financingId,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Financing Name',
            Value: financingName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: financingDescription,
        },
    ]
);

annotate service.EnvData with @(

    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Project ID',
                Value: projectId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Expense ID',
                Value: expenseId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Green Energy Output',
                Value: greenEnergyOutput,
            },
            {
                $Type: 'UI.DataField',
                Label: 'CO2 Current',
                Value: co2Current,
            },
            {
                $Type: 'UI.DataField',
                Label: 'CO2 Post Completion',
                Value: co2PostCompletion,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Water Usage Current',
                Value: waterUsageCurrent,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Water Usage Post Completion',
                Value: waterUsagePostCompletion,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Green Payback',
                Value: greenPayback,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Comments',
                Value: comments,
            },
        ],
    },

    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Project ID',
            Value: projectId,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Expense ID',
            Value: expenseId,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Green Energy Output',
            Value: greenEnergyOutput,
        },
        {
            $Type: 'UI.DataField',
            Label: 'CO2 Current',
            Value: co2Current,
        },
        {
            $Type: 'UI.DataField',
            Label: 'CO2 Post Completion',
            Value: co2PostCompletion,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Water Usage Current',
            Value: waterUsageCurrent,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Water Usage Post Completion',
            Value: waterUsagePostCompletion,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Green Payback',
            Value: greenPayback,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Comments',
            Value: comments,
        },
    ]
);
