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
            Label: '{i18n>ProjectName}',
            Value: projectName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Status}',
            Value: status,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>StartDate}',
            Value: startDate,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>ProjectManager}',
            Value: projectManager,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Category}',
            Value: category.categoryName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Financing}',
            Value: financing.financingName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>GreenEnergyOutput}',
            Value: envData.greenEnergyOutput,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>GreenPayback}',
            Value: envData.greenPayback,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Comments}',
            Value: envData.comments,
        }
    ],
    UI.HeaderInfo                : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Expense',
        TypeNamePlural: 'Expenses',
        Description   : {
            $Type: 'UI.DataField',
            Value: projectManager,
        },
        Title         : {
            $Type: 'UI.DataField',
            Value: projectName,
        },
    },
);

annotate service.Expenses with {
    financing @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Financings',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'financing_financingId',
                ValueListProperty: 'financingId',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'financingName',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'financingDescription',
            }
        ],
    }
}

annotate service.Expenses with {
    category @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Categories',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'category_categoryId',
                ValueListProperty: 'categoryId',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'categoryName',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'categoryDescription',
            }
        ],
    }
}

annotate service.Expenses with {
    envData @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'EnvData',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'envData_projectId',
                ValueListProperty: 'projectId',
            },
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: 'expenseId',
                ValueListProperty: 'expenseId',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'greenEnergyOutput',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'co2Current',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'co2PostCompletion',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'waterUsageCurrent',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'waterUsagePostCompletion',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'greenPayback',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'comments',
            }
        ],
    }
}
