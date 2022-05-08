import moment from 'moment';
import { ColumnDef } from '../../../../types/utils/ColumnDef';
import { ActionRenderer } from './ActionRenderer';

export const CustomerColDef: ColumnDef[] = [
    {
        headerName: 'STT',
        field: 'stt',
        width: 100,
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'Tên khách hàng',
        field: 'account.fullname',
        minWidth: 300,
        filter: true,
    },
    {
        headerName: 'Username',
        field: 'account.username',
    },
    {
        headerName: 'Email',
        field: 'account.email',
    },
    {
        headerName: 'Role',
        field: 'account.role',
        valueGetter: function (params) {
            return 'Khách hàng';
        },
    },
    {
        headerName: 'SDT',
        field: 'account.phone',
        width: 120,
    },
    {
        headerName: 'Địa chỉ',
        field: 'account.address',
        minWidth: 300,
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
