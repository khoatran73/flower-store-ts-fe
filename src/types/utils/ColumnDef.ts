import { ColDef, ColGroupDef } from 'ag-grid-community';

interface Proxy {
    url: string;
    method?: string;
    headers?: string;
    params?: any;
    rootProperty?: string;
    loadCallback?: (res: Response) => void;
    customOptions?: () => void;
    [key: string]: any;
}

interface FilterFormat {
    numeralDecimalMark?: string;
    delimiter?: string;
    [key: string]: any;
}

interface FilterCol {
    type?:
        | 'text'
        | 'number'
        | 'numberRange'
        | 'dropdown'
        | 'treeDropdown'
        | 'date'
        | 'dateRange';
    options?: Array<any>;
    valueKey?: string;
    labelKey?: string;
    visibleIcon?: boolean;
    filterOnEnter?: boolean;
    proxy?: Proxy;
    optionFilterProp?: string;
    format?: string | boolean | FilterFormat;
    filterFunc?: Function;
    filterField?: string;
    placeholder?: string;
    iconType?: string;
    iconLine?: string;
    width?: number;
    dataTestID?: string;
    submitType?: 'value' | 'basic';
}

interface Format {
    type:
        | 'checkbox'
        | 'date'
        | 'dateTime'
        | 'number'
        | 'phone'
        | 'dropdown'
        | 'percent'
        | 'progress';
    text?: string;
    hasColor?: boolean;
    options?: Array<Record<string, any>>;
    valueKey?: string;
    labelKey?: string;
    maxDigit?: number;
    minDigit?: number;
    unit?: string;
    prefix?: string;
    prefixSpace?: string | boolean;
    locale?: string;
}

export interface ColumnDef extends ColDef, Partial<ColGroupDef> {
    cellError?: boolean;
    wrapText?: boolean;
    filterCol?: FilterCol;
    textAlign?: 'left' | 'center' | 'right';
    headerAlign?: 'left' | 'center' | 'right';
    columnGroup?: string;
    sizeToFit?: boolean;
    verticalLine?: boolean;
    verticalLinePadding?: number;
    hasRowSpan?: boolean;
    suppressMenu?: boolean;
    tooltip?: boolean;
    children?: ColumnDef[];
    floatingFilter?: boolean;

    mergeAcross?: number;
    format?: string | Format;
    i18nKey?: string;
    flex?: number;
    cellType?: string;
    dateTimeFormat?: string;
}
