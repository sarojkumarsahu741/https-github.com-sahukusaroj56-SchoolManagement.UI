export interface GridColumnVM
{
    field : string;
    name : string;
    isSortEnabled : boolean;
    hide?: boolean
    columnType : ColumnType;
    imageField? : string;
    imageUrl?: string;
    nonToggleColumn?: boolean,
    nonDownloadableColumn?:boolean,
    calculationColumn?: boolean
}

export enum ColumnType{
    Sno = 'Label',
    Link = 'Link',
    Image = 'Image',
    Text = 'Text',
    Date = 'Date',
    DateTime = 'DateTime',
    ImagePlusText = 'ImagePlusText',
    Status = 'Status',
    QRCode = 'QRCode',
    InputText = 'InputText',
    InputNumber = 'InputNumber',
    InputDate = 'InputDate',
    InputTextArea = 'InputTextArea',
    Percentage = 'Percentage',
    Number = 'Number',
    MinutesToHours = 'MinutesToHours',
    Time = 'Time'
}

export enum ButtonType{
    Submit = 'Submit'
}