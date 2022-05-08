import AddBoxIcon from '@mui/icons-material/AddBox';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { customRowData } from '../../../../lib/Grid';
import { ProductDto } from '../../../../types/product/ProductDto';
import { StoreDto } from '../../../../types/store/StoreDto';
import { StaffManagerColDef } from '../config/StaffManager.ColDef';
import {
    STAFF_CREATE_API,
    STAFF_INDEX_API,
    STORE_LIST_API,
} from './../api/index';
import Loading from '../../../../components/utils/Loading';

const StaffManager = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [rowData, setRowData] = useState<ProductDto[] | any[]>([]);
    const [stores, setStores] = useState<StoreDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getRowData();

        const getStores = async () => {
            setLoading(true);
            await axios
                .get(STORE_LIST_API)
                .then((res) => {
                    if (res.data.success) {
                        setLoading(false);
                        const result = res.data.result as StoreDto[];
                        setStores(result);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        };

        getStores();
    }, []);

    const getRowData = async () => {
        setLoading(true);
        await axios
            .get(STAFF_INDEX_API)
            .then((res) => {
                if (res.data.success) {
                    setLoading(false);
                    setRowData(customRowData(res.data.result));
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const fullName = form.get('fullName');
        const username = form.get('username');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');
        const email = form.get('email');
        const phone = form.get('phone');
        const storeId = form.get('storeId');
        const gender = form.get('gender');
        const role = form.get('role');
        const birthday = form.get('birthday');
        const address = form.get('address');

        const staff: any = {
            storeId: storeId,
            account: {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                role: role,
                fullName: fullName,
                gender: gender === 'true',
                phone: phone,
                email: email,
                address: address,
                birthday: birthday,
            },
        };

        setLoading(true);
        axios
            .post(STAFF_CREATE_API, staff)
            .then((res) => {
                if (res.data.success) {
                    setOpenDialog(false);
                    getRowData();
                    setLoading(false);

                    Swal.fire(
                        'Thông báo',
                        'Thêm nhân viên thành công!',
                        'success'
                    );
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err.message);
                setOpenDialog(false);
                Swal.fire('Thông báo', 'Thêm sản phẩm thất bại!', 'error');
            });
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const gridOptions = {
        ref: gridRef,
        columnDefs: StaffManagerColDef,
        rowData: rowData,
        pagination: true,
        paginationPageSize: 10,
        groupDefaultExpanded: 1,
        rowSelection: 'single',
        defaultColDef: {
            floatingFilter: true,
        },
    };

    if (loading) return <Loading loading={loading} />;
    return (
        <div className='w-full'>
            <div className='grid-button'>
                <Button
                    variant='contained'
                    color='success'
                    size='small'
                    startIcon={<AddBoxIcon />}
                    onClick={handleOpenDialog}
                >
                    Tạo mới
                </Button>
            </div>
            <div
                className='ag-theme-alpine grid'
                style={{ width: '100%', height: '100%' }}
            >
                <AgGridReact {...gridOptions}></AgGridReact>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <Box component='form' onSubmit={handleSubmit}>
                    <DialogTitle sx={{ fontWeight: 'bold' }}>
                        Thêm nhân viên
                    </DialogTitle>
                    <Divider />
                    <DialogContent
                        className='overflow-hidden'
                        sx={{ maxHeight: '70vh', overflowY: 'auto' }}
                    >
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                autoFocus
                                name='fullName'
                                label='Họ và tên'
                                size='small'
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                autoFocus
                                name='username'
                                label='Tên đăng nhập'
                                size='small'
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                name='password'
                                label='Mật khẩu'
                                type='password'
                                size='small'
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                size='small'
                                name='confirmPassword'
                                label='Nhập lại mật khẩu'
                                type='password'
                            />
                        </FormControl>

                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                autoFocus
                                name='email'
                                label='Email'
                                size='small'
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                autoFocus
                                name='phone'
                                label='SDT'
                                size='small'
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <InputLabel id='store-id'>Cửa hàng</InputLabel>
                            <Select
                                labelId='store-id'
                                size='small'
                                label='Cửa hàng'
                                name='storeId'
                            >
                                {stores.map((store) => (
                                    <MenuItem value={store.id}>
                                        {store.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <FormLabel id='gender'>Giới tính</FormLabel>
                            <RadioGroup
                                aria-labelledby='gender'
                                defaultValue='true'
                                name='gender'
                                row
                            >
                                <FormControlLabel
                                    value='true'
                                    control={<Radio />}
                                    label='Nam'
                                />
                                <FormControlLabel
                                    value='false'
                                    control={<Radio />}
                                    label='Nữ'
                                />
                            </RadioGroup>
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <InputLabel id='role'>Chức vụ</InputLabel>
                            <Select
                                labelId='role'
                                size='small'
                                label='Cửa hàng'
                                name='role'
                            >
                                <MenuItem value='sales'>
                                    Nhân viên bán hàng
                                </MenuItem>
                                <MenuItem value='warehouse'>
                                    Nhân viên kho
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                label='Ngày sinh'
                                type='date'
                                name='birthday'
                                size='small'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{ margin: '10px 0' }}
                        >
                            <TextField
                                label='Địa chỉ'
                                name='address'
                                size='small'
                            />
                        </FormControl>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button
                            type='submit'
                            // onClick={onSubmit}
                            color='primary'
                            size='small'
                            variant='contained'
                            sx={{ marginLeft: '6px' }}
                        >
                            Lưu
                        </Button>
                        <Button
                            onClick={handleCloseDialog}
                            color='error'
                            size='small'
                            variant='contained'
                        >
                            Đóng
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
};

export default StaffManager;
