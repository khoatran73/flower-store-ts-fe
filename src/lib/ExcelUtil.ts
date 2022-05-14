import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import _ from 'lodash';

export type ExcelContentTitle = {
    styleId: string;
    data: { type: string; value: string };
    mergeAcross?: number;
};

export type ReportOption = {
    title?: string;
    fileName?: string;
    sheetName?: string;
    grid: React.RefObject<AgGridReact>;
};

export default class ExcelUtil {
    static exportExcelClient = (
        grid: React.RefObject<AgGridReact>,
        params: Record<string, any>
    ) => {
        // @ts-ignore
        window.columnWidth = _.get(params, 'columnWidth', []);

        if (_.hasIn(params, 'columnWidth')) {
            delete params.columnWidth;
        }
        grid.current?.exportToExcel(params);
    };

    static titleExcel = (content: Array<Array<ExcelContentTitle>> = []) => {
        //Mỗi array là 1 dòng, trong mỗi obj là 1 cột
        return [
            [
                {
                    styleId: 'company',
                    data: {
                        type: 'String',
                        value: 'TỔNG CÔNG TY KHÍ VIỆT NAM - CTCP',
                    },
                    mergeAcross: 3,
                },
            ],
            // [
            //     {
            //         styleId: 'department',
            //         data: {
            //             type: 'String',
            //             value: 'CÔNG TY VẬN CHUYỂN KHÍ ĐÔNG NAM BỘ',
            //         },
            //         mergeAcross: 3,
            //     },
            // ],
            ...content,
            [],
            [],
        ];
    };
    static getMergeAcross = (
        gridRef: React.RefObject<AgGridReact>,
        all = false
    ): number => {
        if (!gridRef.current) {
            return 10;
        }
        let columns = _.size(
            gridRef.current.columnApi.getAllDisplayedColumns()
        );
        // @ts-ignore
        const actionRowColumn = _.find(
            gridRef.current.columnDefs || [],
            (column) => {
                return _.get(column, 'field') === 'ActionRow';
            }
        );
        if (actionRowColumn) {
            columns = columns - 1;
        }
        if (all) {
            return columns - 1;
        }
        return columns > 15 ? 15 : columns - 1;
    };

    static getReportOptions = (opt: ReportOption) => {
        const contentTitle: Array<Array<ExcelContentTitle>> = [
            [],
            [],
            [
                {
                    styleId: 'titleExcel',
                    data: {
                        type: 'String',
                        value: opt.title || 'report',
                    },
                    mergeAcross: ExcelUtil.getMergeAcross(opt.grid),
                },
            ],
        ];

        return {
            fileName: opt.fileName || 'report',
            sheetName: opt.sheetName || 'report',
            customHeader: ExcelUtil.titleExcel(contentTitle),
            all: true,
            headerRowHeight: null,
            rowHeight: null,
        };
    };
}
