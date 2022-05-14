import AddBoxIcon from '@mui/icons-material/AddBox';
import RefreshIcon from '@mui/icons-material/Refresh';
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
import Loading from '../../../../components/utils/Loading';
import { customRowData } from '../../../../lib/Grid';
import { StoreDto } from '../../../../types/store/StoreDto';
import { GET_PROVINCES_API } from '../api';
import { StaffManagerColDef } from '../config/StaffManager.ColDef';
import { PAGE_SIZE } from '../constant';
import { Province, UserDto } from './../../../../types/user/UserDto';
// import { AppContainer } from './../../../utils/AppContainer';
import {
    STAFF_CREATE_API,
    STAFF_INDEX_API,
    STORE_LIST_API,
} from './../api/index';

const StaffManager = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [rowData, setRowData] = useState<UserDto[] | any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [stores, setStores] = useState<StoreDto[]>([]);
    const [provinces, setProvinces] = useState<Province[]>();
    const [province, setProvince] = useState<Province>();
    const [district, setDistrict] = useState<any>();

    const [storeId, setStoreId] = React.useState<string | null>(
        localStorage.getItem('storeId')
    );

    const fetchProvinces = () => {
        axios
            .get(`${GET_PROVINCES_API}/p`)
            .then((res) => {
                if (res.status === 200) {
                    setProvinces(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchDistricts = (code: any) => {
        axios
            .get(`${GET_PROVINCES_API}/p/${code}`, {
                params: { depth: 2 },
            })
            .then((res) => {
                if (res.status === 200) {
                    setProvince(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchWards = (code: any) => {
        axios
            .get(`${GET_PROVINCES_API}/d/${code}`, {
                params: { depth: 2 },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDistrict(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getRowData();
        fetchProvinces();

        const getStores = async () => {
            setLoading(true);
            await axios
                .get(STORE_LIST_API, {
                    params: { storeId: storeId },
                })
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
            .get(STAFF_INDEX_API, {
                params: { storeId: storeId },
            })
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

        const wardCode = form.get('ward');
        let provinceR = province?.name;
        let districtR = district.name;
        let wardR = district?.wards.find(
            (ward: any) => ward.code == wardCode
        ).name;

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
        const address = `${wardR} - ${districtR} - ${provinceR}`;

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
            .post(STAFF_CREATE_API, staff, {
                params: { storeId: storeId },
            })
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
        paginationPageSize: PAGE_SIZE,
        groupDefaultExpanded: 1,
        rowSelection: 'single',
        defaultColDef: {
            floatingFilter: true,
        },
        autoGroupColumnDef: {
            headerName: 'Chi nhánh',
        },
    };

    const onRefresh = () => {
        getRowData();
    };

    if (loading) return <Loading loading={loading} />;
    return (
        <div className='w-full h-full'>
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
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    startIcon={<RefreshIcon />}
                    sx={{ marginLeft: '10px' }}
                    onClick={onRefresh}
                >
                    Refresh
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
                            sx={{
                                margin: '10px 0',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControl
                                size='small'
                                sx={{ margin: '10px 0', width: '48%' }}
                            >
                                <TextField
                                    name='fullName'
                                    label='Họ và tên'
                                    size='small'
                                />
                            </FormControl>

                            <FormControl
                                size='small'
                                sx={{ margin: '10px 0', width: '48%' }}
                            >
                                <TextField
                                    name='username'
                                    label='Tên đăng nhập'
                                    size='small'
                                />
                            </FormControl>
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{
                                margin: '10px 0',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControl
                                size='small'
                                sx={{ margin: '10px 0', width: '48%' }}
                            >
                                <TextField
                                    name='password'
                                    label='Mật khẩu'
                                    type='password'
                                    size='small'
                                />
                            </FormControl>
                            <FormControl
                                size='small'
                                sx={{ margin: '10px 0', width: '48%' }}
                            >
                                <TextField
                                    size='small'
                                    name='confirmPassword'
                                    label='Nhập lại mật khẩu'
                                    type='password'
                                />
                            </FormControl>
                        </FormControl>
                        <FormControl
                            fullWidth
                            size='small'
                            sx={{
                                margin: '10px 0',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControl
                                size='small'
                                sx={{ margin: '10px 0', width: '48%' }}
                            >
                                <TextField
                                    name='email'
                                    label='Email'
                                    size='small'
                                    type='email'
                                />
                            </FormControl>
                            <FormControl
                                size='small'
                                sx={{ margin: '10px 0', width: '48%' }}
                            >
                                <TextField
                                    name='phone'
                                    label='SDT'
                                    size='small'
                                />
                            </FormControl>
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
                            sx={{
                                margin: '10px 0',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <FormControl
                                size='small'
                                sx={{ margin: '10px 0', width: '30%' }}
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
                                size='small'
                                sx={{ margin: '10px 0', width: '30%' }}
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
                                size='small'
                                sx={{ margin: '10px 0', width: '30%' }}
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
                        </FormControl>

                        <FormControl
                            fullWidth
                            size='small'
                            sx={{
                                margin: '10px 0',
                            }}
                        >
                            <FormLabel>Địa chỉ</FormLabel>
                            <div className='w-full flex flex-row justify-between'>
                                <FormControl
                                    size='small'
                                    sx={{ margin: '10px 0', width: '30%' }}
                                >
                                    <InputLabel id='province'>
                                        Tỉnh/Thành
                                    </InputLabel>
                                    <Select
                                        labelId='province'
                                        size='small'
                                        label='Tỉnh thành'
                                        name='province'
                                        onChange={(e) => {
                                            fetchDistricts(e.target.value);
                                        }}
                                    >
                                        {provinces?.map((province) => (
                                            <MenuItem
                                                value={province.code}
                                                key={province.code}
                                            >
                                                {province.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    size='small'
                                    sx={{ margin: '10px 0', width: '30%' }}
                                >
                                    <InputLabel id='district'>
                                        Quận/huyện
                                    </InputLabel>
                                    <Select
                                        labelId='district'
                                        size='small'
                                        label='Quận huyện'
                                        name='district'
                                        onChange={(e) =>
                                            fetchWards(e.target.value)
                                        }
                                    >
                                        {province &&
                                            province.districts &&
                                            province.districts.map(
                                                (district) => (
                                                    <MenuItem
                                                        value={district.code}
                                                        key={province.code}
                                                    >
                                                        {district.name}
                                                    </MenuItem>
                                                )
                                            )}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    size='small'
                                    sx={{ margin: '10px 0', width: '30%' }}
                                >
                                    <InputLabel id='ward'>Xã/Phường</InputLabel>
                                    <Select
                                        labelId='ward'
                                        size='small'
                                        label='Cửa hàng'
                                        name='ward'
                                    >
                                        {district &&
                                            district.wards &&
                                            district.wards.map((ward: any) => (
                                                <MenuItem value={ward.code}>
                                                    {ward.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </div>
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
