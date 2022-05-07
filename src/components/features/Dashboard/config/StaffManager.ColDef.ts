import moment from 'moment';
import { ColumnDef } from '../../../../types/utils/ColumnDef';
import { ActionRenderer } from './ActionRenderer';

export const StaffManagerColDef: ColumnDef[] = [
    {
        headerName: 'STT',
        field: 'stt',
        width: 100,
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'Tên nhân viên',
        field: 'account.fullname',
        minWidth: 300,
        filter: true,
    },
    {
        headerName: 'Username',
        field: 'account.username',
    },
    {
        headerName: 'Cửa hàng',
        field: 'store.name',
        rowGroup: true,
        hide: true,
    },
    {
        headerName: 'Email',
        field: 'account.email',
    },
    {
        headerName: 'Role',
        field: 'account.role',
        valueGetter: function (params) {
            if (params.data) {
                let role = params.data.account.role;
                if (role === 'warehouse') return 'Nhân viên kho';
                else if (role === 'sales') return 'Nhân viên bán hàng';

                return 'Admin';
            }
        },
    },
    {
        headerName: 'Giới tính',
        field: 'account.gender',
        width: 120,
        cellStyle: { textAlign: 'center' },
        valueGetter: function (params) {
            if (params.data) {
                if (params.data.account.gender) return 'Nam';
                return 'Nữ';
            }
        },
    },
    {
        headerName: 'Ngày sinh',
        field: 'account.birthday',
        valueGetter: function (params) {
            if (params.data) {
                const birthday = params.data.account.birthday;
                return moment(birthday).format('DD/MM/YYYY').toString();
            }
        },
        width: 160,
        cellStyle: { textAlign: 'center' },
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
