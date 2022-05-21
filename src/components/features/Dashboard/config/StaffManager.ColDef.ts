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
        field: 'fullname',
        minWidth: 200,
        filter: true,
    },
    {
        headerName: 'Username',
        field: 'username',
    },
    {
        headerName: 'Cửa hàng',
        field: 'store.name',
        // rowGroup: true,
        // hide: true,
    },
    {
        headerName: 'Email',
        field: 'email',
    },
    {
        headerName: 'Vai trò',
        field: 'role',
        valueGetter: function (params) {
            if (params.data) {
                let role = params.data.role;
                if (role === 'warehouse') return 'Nhân viên kho';
                else if (role === 'sales') return 'Nhân viên bán hàng';

                return 'Admin';
            }
        },
    },
    {
        headerName: 'Giới tính',
        field: 'gender',
        width: 120,
        cellStyle: { textAlign: 'center' },
        valueGetter: function (params) {
            if (params.data) {
                if (params.data.gender) return 'Nam';
                return 'Nữ';
            }
        },
    },
    {
        headerName: 'Ngày sinh',
        field: 'birthday',
        valueGetter: function (params) {
            if (params.data) {
                const birthday = params.data.birthday;
                return moment(birthday).format('DD/MM/YYYY').toString();
            }
        },
        width: 160,
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'SDT',
        field: 'phone',
        width: 120,
    },
    {
        headerName: 'Địa chỉ',
        field: 'address',
        minWidth: 400,
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
