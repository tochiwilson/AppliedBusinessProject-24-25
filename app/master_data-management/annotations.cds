using ExpenseService as service from '../../srv/service';

annotate service.Categories with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Category Name',
                Value: categoryName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Category Description',
                Value: categoryDescription,
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
            Label: '{i18n>Category Name}',
            Value: categoryName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>Category Description}',
            Value: categoryDescription,
        },
    ],
    UI.HeaderInfo                : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : 'Expense',
        TypeNamePlural: 'Expenses',
        Description   : {
            $Type: 'UI.DataField',
            Value: 'Types',
        },
        Title         : {
            $Type: 'UI.DataField',
            Value: 'test test...',
        },
    },
);
