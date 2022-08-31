export interface Column {
    field: string; 
    header: string, 
    filterType: FilterType, 
    filterDisplay: 'menu',
    mask: MaskType,
    decimal?: string,
    moeda?: string
}

export enum FilterType {
    text = 'text',
    numeric = 'numeric',
    date = 'date',
    datetime = 'datetime',
}

export enum FilterDisplay {
    menu = 'menu'
}

export enum MaskType {
    undefined,
    money = 'money',
    percentage = 'percentage',
    date = 'date',
    dateTime = 'dateTime',
}