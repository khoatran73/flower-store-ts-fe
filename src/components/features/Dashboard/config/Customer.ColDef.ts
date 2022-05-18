import { ColumnDef } from '../../../../types/utils/ColumnDef';

export const CustomerColDef: ColumnDef[] = [
    {
        headerName: 'STT',
        field: 'stt',
        width: 100,
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'Tên khách hàng',
        field: 'fullname',
        minWidth: 150,
        filter: true,
    },
    {
        headerName: 'Cửa hàng',
        field: 'store.name',
        minWidth: 120,
        filter: true,
    },
    {
        headerName: 'Username',
        field: 'username',
    },
    {
        headerName: 'Email',
        field: 'email',
        minWidth: 300,
    },
    {
        headerName: 'Role',
        field: 'role',
        valueGetter: function (params) {
            return 'Khách hàng';
        },
    },
    {
        headerName: 'SDT',
        field: 'phone',
        width: 120,
    },
    {
        headerName: 'Địa chỉ',
        field: 'address',
        minWidth: 500,
        filter: true,
    },
    // {
    //     headerName: 'Hành động',
    //     cellRenderer: ActionRenderer,
    //     colId: 'action',
    //     filter: false,
    //     width: 140,
    //     pinned: 'right',
    // },
];
