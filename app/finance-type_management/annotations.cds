using ExpenseService as service from '../../srv/service';
annotate service.Expenses with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'projectId',
                Value : projectId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'projectName',
                Value : projectName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'projectManager',
                Value : projectManager,
            },
            {
                $Type : 'UI.DataField',
                Label : 'startDate',
                Value : startDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'categoryId',
                Value : categoryId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'financingId',
                Value : financingId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'durationMonths',
                Value : durationMonths,
            },
            {
                $Type : 'UI.DataField',
                Label : 'submittedBy',
                Value : submittedBy,
            },
            {
                $Type : 'UI.DataField',
                Label : 'submittedOn',
                Value : submittedOn,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'projectId',
            Value : projectId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'projectName',
            Value : projectName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'projectManager',
            Value : projectManager,
        },
        {
            $Type : 'UI.DataField',
            Label : 'startDate',
            Value : startDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'categoryId',
            Value : categoryId,
        },
    ],
);

