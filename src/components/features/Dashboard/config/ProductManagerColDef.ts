import { ColumnDef } from '../../../../types/utils/ColumnDef';
import { ActionRenderer } from './ActionRenderer';

export const ProductManagerColDef: ColumnDef[] = [
    {
        headerName: 'STT',
        field: 'stt',
        width: 100,
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'Tên sản phẩm',
        field: 'name',
        minWidth: 500,
        filter: true,
    },
    {
        headerName: 'Danh mục',
        field: 'category.name',
        minWidth: 300,
        filter: true,
        // rowGroup: true,
        // hide: true,
    },
    {
        headerName: 'Giá bán',
        field: 'unitPrice',
        cellStyle: { textAlign: 'center' },
        valueGetter: function (params) {
            if (params.data) {
                return params.data.unitPrice.toLocaleString() + 'đ';
            }
        },
        filter: true,
        width: 120,
    },
    {
        headerName: 'Số lượng',
        field: 'totalQuantity',
        headerAlign: 'center',
        cellStyle: { textAlign: 'center' },
        valueGetter: function (params) {
            if (params.data) {
                return params.data.totalQuantity.toLocaleString();
            }
        },
        width: 150,
        filter: true,
    },
    {
        headerName: 'Mô tả',
        headerAlign: 'center',
        field: 'description',
        minWidth: 800,
    },
    {
        headerName: 'Hành động',
        cellRenderer: ActionRenderer,
        editable: false,
        colId: 'action',
        width: 150,
        pinned: 'right',
    },
];
