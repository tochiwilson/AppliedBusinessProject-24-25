using ExpenseService as service from '../../srv/service';

annotate service.Expenses with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Duration (Months)',
                Value: durationMonths,
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
