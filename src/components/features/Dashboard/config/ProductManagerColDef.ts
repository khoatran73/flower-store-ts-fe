import { ColumnDef } from '../../../../types/utils/ColumnDef';
import { ProductManagerActionRenderer } from './ProductManager.ActionRenderer';
import { ProductManagerImageRenderer } from './ProductManager.ImageRenderer';

export const ProductManagerColDef: ColumnDef[] = [
    {
        headerName: 'Tên sản phẩm',
        field: 'name',
    },
    {
        headerName: 'Giá bán',
        field: 'unitPrice',
        headerAlign: 'center',
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'Ảnh',
        headerAlign: 'center',
        field: 'image',
        autoHeight: true,
        cellRenderer: ProductManagerImageRenderer,
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'Mô tả',
        headerAlign: 'center',
        field: 'description',
    },
    {
        headerName: 'Hành động',
        cellRenderer: ProductManagerActionRenderer,
        editable: false,
        colId: 'action',
        width: 120,
    },
];
