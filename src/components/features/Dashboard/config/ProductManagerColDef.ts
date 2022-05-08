import { ColumnDef } from '../../../../types/utils/ColumnDef';
import { ActionRenderer } from './ActionRenderer';

export const ProductManagerColDef: ColumnDef[] = [
    {
        headerName: 'STT',
        field: 'stt',
        width: 100,
        cellStyle: { textAlign: 'center' },
        // sortable: true,
    },
    {
        headerName: 'Tên sản phẩm',
        field: 'name',
        minWidth: 300,
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
        filter: true,
        width: 120,
    },
    {
        headerName: 'Số lượng',
        field: 'totalQuantity',
        headerAlign: 'center',
        cellStyle: { textAlign: 'center' },
        width: 150,
        filter: true,
    },
    {
        headerName: 'Mô tả',
        headerAlign: 'center',
        field: 'description',
        minWidth: 300,
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