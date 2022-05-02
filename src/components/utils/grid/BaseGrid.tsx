import {
    ColDef,
    ColGroupDef,
    ColumnApi,
    Grid,
    GridApi,
    GridOptions,
    RowNode,
} from 'ag-grid-community';
import React from 'react';

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

interface NumberRow {
    headerName?: string;
    field?: string;
    cellClass?: string;
    width?: number;
    rowGroup?: boolean;
    levelTree?: string | number;
    [key: string]: any;
}

interface LevelTree {
    levelFormat?: Array<string>;
    levelMax?: number;
    levelPrefix?: string;
    [key: string]: any;
}

interface CellRendererItem {
    renderer: (
        data: any,
        value: any,
        rowNode: RowNode,
        context?: Grid,
        colDef?: ColDef
    ) => any;
    [key: string]: any;
}

interface CellRenderer {
    [key: string]: CellRendererItem;
}

interface ColumnOptions {
    cellRenderer?: CellRenderer;
    [key: string]: any;
}

interface ExcelConfigStyleConfig {
    borderColor?: string;
    fontName?: string;
    oddBackground?: string;
    oddColor?: string;
    evenBackground?: string;
    evenColor?: string;
    groupBackground?: string;
    groupColor?: string;
    parentBackground?: string;
    parentColor?: string;
    headerBackground?: string;
    headerColor?: string;
    titleColor?: string;
    size?: number;
    sizeColor?: number;
    headerSize?: number;
    indent?: number;
    wrapText?: boolean;
}

interface ExcelConfigStyle {
    config?: ExcelConfigStyleConfig;
}

interface ExcelConfig {
    styles?: ExcelConfigStyle;
}

interface MasterDetail {
    detailRowHeight?: number;
    renderer?: (data: any, value: any, node: RowNode) => void;
    detailRowAutoHeight?: boolean;
    getRowHeight?: (data: any, value: any, node: RowNode) => void;
    [key: string]: any;
}

interface ActionRowItem {
    type: string;
    onPress: (data: any, rowNode: RowNode) => void;
    icon?: JSX.Element;
    tooltip?: string;
    confirm?: boolean;
    confirmText?: string;
    isHidden?: (rowNode: any) => boolean;
    style?: React.CSSProperties;
}

interface ActionRows {
    className?: string;
    cellStyle?: React.CSSProperties;
    width?: number;
    textAlign?: 'center' | 'left' | 'right' | string;
    items:
        | Array<ActionRowItem>
        | ((data: any, grid: Grid) => Array<ActionRowItem>);
    pinned?: 'left' | 'right';
    minWidth?: number;
    titleTooltip?: string;
    itemsAlign?: string;
    title?: string;
}

interface ActionToolbarSubMenu {
    width?: number;
    icon?: JSX.Element;
    text?: string;
    onPress?: () => void;
}

interface ActionToolbar {
    text?: string;
    placement?: string;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    icon?: React.ReactNode;
    iconCls?: string;
    iconAfter?: boolean;
    iconBefore?: boolean;
    menu?: Array<ActionToolbarSubMenu>;
    tooltip?: boolean;
    type?: 'fullScreen' | 'refresh';
    minWidth?: number;
    right?: boolean;
    onPress?: () => void;
}
interface NumberCount {
    field?: string;
    condition?: string;
}

interface FilterFormat {
    numeralDecimalMark?: string;
    delimiter?: string;
    [key: string]: any;
}

export interface IDGridOptions extends GridOptions {
    // suppressMoveWhenRowDragging?: boolean;
    // excelStyles?: Array<ExcelStyles>;
}

interface DefaultColDef extends ColumnDef {}

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

export interface ColumnGroupDef extends ColGroupDef {
    flex?: number;
}

export interface BaseGridProps {
    columnDefs: Array<ColumnDef | ColumnGroupDef>;
    actionToolbar?: Array<ActionToolbar>;

    gridOptions?: IDGridOptions;
    defaultColDef?: DefaultColDef;
    autoGroupColumnDef?: ColumnDef;

    cellMergs?: string[];
    globalFilterField?: string[];
    rowSelection?: 'multiple' | 'single';
    lineType?: 'dashed' | 'dotted';
    headerHorizotalColor?: string;
    clsToolbar?: string;
    loading?: JSX.Element;
    dataTestID?: string;
    className?: string;

    emptyComponent?: JSX.Element;

    autoHeightRow?: boolean;
    checkboxSelection?: boolean;
    headerCheckboxSelection?: boolean;
    suppressHeaderRowLast?: boolean;
    pagination?: boolean;
    multilanguage?: boolean;
    floatingFilter?: boolean;
    suppressCount?: boolean;
    suppressHeaderHorizotalPaddingLast?: boolean;
    emptyTextHideFirst?: boolean;
    hideFloatingFilter?: boolean;
    globalFilter?: boolean;
    updateSortColumn?: boolean;
    sizeColumnsToFit?: boolean;
    autoSizeToFit?: boolean;
    autoSizeColumns?: boolean;
    fullScreenMode?: boolean;
    skeleton?: boolean;
    headerVerticalLines?: boolean;
    headerHorizotalLines?: boolean;
    columnLines?: boolean;
    rowLines?: boolean;
    headerTransparent?: boolean;
    gridBorder?: boolean;
    gridBorderLeft?: boolean;
    gridBorderRight?: boolean;
    gridBorderBottom?: boolean;
    gridBorderTop?: boolean;
    headerLines?: boolean;
    hiddenHeader?: boolean;
    treeLine?: boolean;
    alwaysShowVerticalScroll?: boolean;
    animateRows?: boolean;
    suppressRowTransform?: boolean;
    suppressMovableColumns?: boolean;
    groupUseEntireRow?: boolean;
    rowDragManaged?: boolean;
    suppressHorizontalScroll?: boolean;
    suppressColumnMoveAnimation?: boolean;
    suppressRowClickSelection?: boolean;
    suppressColumnVirtualisation?: boolean;
    suppressContextMenu?: boolean;

    groupRowInnerRenderer?: any; //

    numberRows?: boolean | NumberRow;
    levelTree?: boolean | LevelTree;
    cellRenderer?: CellRenderer;
    excelConfig?: ExcelConfig;
    actionRows?: ActionRows;
    numberCount?: NumberCount;
    masterDetail?: MasterDetail;

    height?: string | number;
    minHeight?: string | number;
    rowHeight?: number;
    groupHeaderHeight?: number;
    headerHeight?: number;
    floatingFiltersHeight?: number;
    headerHorizotalPadding?: number;
    groupDefaultExpanded?: number;
    groupHeaderHeights?: number[];

    onGridReady?: (params: any) => void;
    renderMoreToolbar?: () => void;
    onGlobalFilter?: (value: string) => void;
    onCellValueChanged?: (data: Record<string, any>, rowIndex: number) => void;
    onRowDoubleClicked?: (
        data: Record<string, any>,
        rowIndex: number,
        node: RowNode,
        grid: Grid
    ) => void;
    onRowClicked?: (
        data: Record<string, any>,
        rowIndex: number,
        node: RowNode,
        grid: Grid
    ) => void;
    onCellDoubleClicked?: (
        data: Record<string, any>,
        rowIndex: number,
        node: RowNode,
        grid: Grid
    ) => void;
    onSelectionChanged?: (nodes: Array<RowNode>) => void;
    onRowSelected?: (node: RowNode) => void;
    onSelected?: (data: Record<string, any>) => void;
    countFunc?: (data: Record<string, any>) => void;
    onUpdateNumberCount?: (data: Record<string, any>) => void;
    onRowDataChanged?: () => void;
    renderLeftActionBar?: () => void;
    renderRightActionBar?: () => void;
    renderDockTop?: (grid: Grid) => void;
}

declare class BaseGrid<T> extends React.Component<T, {}> {
    gridApi: GridApi;
    gridColumnApi: ColumnApi;
    redrawRows: () => void;
    setErrors: (cellErrors: object) => void;
    clearErrors: () => void;
    setPinnedTopRowData: (rowData: Array<Record<string, any>>) => void;
    setPinnedBottomRowData: (rowData: Array<Record<string, any>>) => void;
    setCheckBoxSelection: (value: boolean) => void;
    exportToExcel: (params: object) => void;
    exportToCsv: (params: object) => void;
    clearFilters: (reload?: boolean) => void;
    setAutoHeaderHeight: () => void;
    mask: (text?: string, className?: string) => void;
    unmask: () => void;
    setQuickFilter: () => void;
    getRowsDisplay: () => void;
    getSelectedRows: () => void;
    deselectAll: () => void;
    setColumnDefs: (
        columnDefs: any,
        options?: ColumnOptions,
        resetHeader?: boolean
    ) => void;
    refreshView: () => void;
    onToogleFullScreen: () => void;
    setHeaderHeight: (headerHeight: number) => void;
    setGroupHeaderHeight: (headerHeight: number) => void;
    setGroupHeaderAndHeaderHeight: (
        headerHeight: number,
        groupHeaderHeight: number
    ) => void;
    setHeaderHeightAndGroupHeaderHeight: (
        headerHeight: number,
        groupHeaderHeight: number
    ) => void;
    setFloatingFiltersHeight: (height: number) => void;
    setHiddenCheckboxSelection: (value: boolean) => void;
    setVisibleActionColumn: (value: boolean) => void;
}

export default BaseGrid;
