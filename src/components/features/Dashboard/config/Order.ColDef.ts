import moment from 'moment';
import { ColumnDef } from '../../../../types/utils/ColumnDef';

export const OrderColDef: ColumnDef[] = [
    {
        headerName: 'STT',
        field: 'stt',
        width: 100,
        cellStyle: { textAlign: 'center' },
    },
    {
        headerName: 'Tên khách hàng',
        field: 'customer.account.fullname',
        rowGroup: true,
        hide: true,
    },
    {
        headerName: 'Địa chỉ',
        field: 'customer.account.address',
        minWidth: 220,
    },
    {
        headerName: 'Số điện thoại',
        field: 'customer.account.phone',
    },
    {
        headerName: 'Discount',
        field: 'discount',
        valueGetter: function (params) {
            if (params.data) {
                return params.data.discount + '%';
            }
        },
        cellStyle: { textAlign: 'center' },
        width: 120,
    },
    {
        headerName: 'Thuế',
        field: 'tax',
        valueGetter: function (params) {
            if (params.data) {
                return params.data.tax + '%';
            }
        },
        cellStyle: { textAlign: 'center' },
        width: 120,
    },
    {
        headerName: 'Tổng tiền',
        field: 'cart.totalPrice',
        width: 120,
        valueGetter: function (params) {
            if (params.data?.cart) {
                return params.data.cart.totalPrice.toLocaleString() + 'đ';
            }
        },
    },
    {
        headerName: 'Email',
        field: 'customer.account.email',
    },

    {
        headerName: 'Ngày mua hàng',
        field: 'createdAt',
        valueGetter: function (params) {
            if (params.data) {
                const createdAt = params.data.createdAt;
                return moment(createdAt)
                    .format('DD/MM/YYYY hh:mm:ss')
                    .toString();
            }
        },
        width: 160,
        cellStyle: { textAlign: 'center' },
    },
];