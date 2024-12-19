using ExpenseService as service from '../../srv/service';

annotate service.Expenses with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>DurationMonths}',
                Value: durationMonths,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Co2Current}',
                Value: envData.co2Current,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>Co2PostCompletion}',
                Value: envData.co2PostCompletion,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>WaterUsageCurrent}',
                Value: envData.waterUsageCurrent,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>WaterUsagePostCompletion}',
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
    UI.SelectionFields           : [
        startDate,
        status,
        category.categoryName,
        financing.financingName,
    ],
);

annotate service.Expenses with {
    startDate @(
        Common.Label                   : '{i18n>StartDate}',
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Expenses',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: startDate,
                ValueListProperty: 'startDate',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.Expenses with {
    status @(
        Common.Label                   : '{i18n>Status}',
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Expenses',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: status,
                ValueListProperty: 'status',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.Categories with {
    categoryName @(
        Common.Label                   : '{i18n>Category}',
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Categories',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: categoryName,
                ValueListProperty: 'categoryName',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.Financings with {
    financingName @(
        Common.Label                   : '{i18n>FinancingType}',
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'Financings',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: financingName,
                ValueListProperty: 'financingName',
            }, ],
        },
        Common.ValueListWithFixedValues: true,
    )
};
