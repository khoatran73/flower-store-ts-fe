import {
    Avatar,
    Box,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';
import { Breadcrumb } from 'antd';
import React, { useState, useEffect } from 'react';
import { Province, UserDto } from './../../../../types/user/UserDto';
import { StoreDto } from '../../../../types/store/StoreDto';
import axios from 'axios';
import { GET_PROVINCES_API, STORE_LIST_API } from '../../Dashboard/api';
import {
    GET_CUSTOMER_API,
    UPDATE_CUSTOMER_API,
    UPDATE_CUSTOMER_IMAGE_API,
} from '../api';
import Swal from 'sweetalert2';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { serializeToFromData } from '../../../../lib/formFileData';
import Loading from './../../../utils/Loading';

export const UserProfile = () => {
    const [stores, setStores] = useState<StoreDto[]>([]);
    const [storeId, setStoreId] = React.useState<string | null>(
        localStorage.getItem('storeId')
    );
    const [provinces, setProvinces] = useState<Province[]>();
    const [province, setProvince] = useState<Province>();
    const [district, setDistrict] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [isLogin, setIsLogin] = React.useState<string | null>(
        localStorage.getItem('isLogin')
    );
    const [customer, setCustomer] = useState<UserDto>();

    const fetchProvinces = () => {
        axios.get(`${GET_PROVINCES_API}/p`).then((res) => {
            if (res.status === 200) {
                setProvinces(res.data);
            }
        });
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
            });
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
            });
    };

    const fetchCustomer = () => {
        axios.get(`${GET_CUSTOMER_API}/${isLogin}`).then((res) => {
            if (res.data.success) {
                setCustomer(res.data.result);
            }
        });
    };

    useEffect(() => {
        fetchProvinces();

        const getStores = async () => {
            await axios.get(STORE_LIST_API).then((res) => {
                if (res.data.success) {
                    const result = res.data.result as StoreDto[];
                    setStores(result);
                }
            });
        };

        fetchCustomer();

        getStores();
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        const wardCode = form.get('ward');
        let provinceR = province?.name;
        let districtR = district?.name;
        let wardR = district?.wards.find(
            (ward: any) => ward.code == wardCode
        ).name;

        const fullName = form.get('fullName');
        const email = form.get('email');
        const phone = form.get('phone');
        const storeId = form.get('storeId');
        const gender = form.get('gender');
        const birthday = form.get('birthday');
        const address = form.get('address')
            ? form.get('address')
            : `${wardR} - ${districtR} - ${provinceR}`;

        if (
            !fullName ||
            !gender ||
            !birthday ||
            !address ||
            !email ||
            !phone ||
            !storeId
        ) {
            Swal.fire('Lỗi', 'Vui lòng điền tât cả thông tin', 'error');
            return;
        }

        const body: any = {
            storeId: storeId,
            fullName: fullName,
            gender: gender === 'true',
            phone: phone,
            email: email,
            address: address,
            birthday: birthday,
        };
        axios.post(`${UPDATE_CUSTOMER_API}/${isLogin}`, body).then((res) => {
            if (res.data.success) {
                Swal.fire('Thông báo', 'Thêm nhân viên thành công!', 'success');
            }
        });
    };

    const changeCustomerImage = async (e: any) => {
        const files = e.target.files;
        const file = files.length > 0 ? files[0] : null;

        const createDto = {
            file: file,
        };

        setLoading(true);

        const formData = serializeToFromData(
            createDto,
            { noFilesWithArrayNotation: true },
            new FormData(),
            ''
        );

        await axios.post(`${UPDATE_CUSTOMER_IMAGE_API}/${isLogin}`, formData);
        setLoading(false);
        fetchCustomer();
    };

    if (loading) return <Loading loading={loading} />;
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Thông tin cá nhân</Breadcrumb.Item>
            </Breadcrumb>
            <div className='mt-6'>
                <form onSubmit={onSubmit}>
                    <div className='flex'>
                        <div className='w-1/5'>
                            <div className='relative mb-6'>
                                <Avatar
                                    sx={{
                                        width: 200,
                                        height: 200,
                                    }}
                                    src={customer?.image}
                                ></Avatar>
                                <label htmlFor='file'>
                                    <CameraAltIcon
                                        fontSize='large'
                                        className='absolute cursor-pointer'
                                        style={{ top: '180px', left: '83px' }}
                                        color='action'
                                    />
                                </label>
                                <input
                                    id='file'
                                    type='file'
                                    name='file'
                                    className='invisible'
                                    accept='image/*'
                                    onChange={changeCustomerImage}
                                ></input>
                            </div>
                            <Grid item xs={12} sm={3}>
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
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={3}
                                className='mt-2'
                                style={{ marginTop: '10px' }}
                            >
                                <TextField
                                    className='w-3/4'
                                    label='Ngày sinh'
                                    type='date'
                                    name='birthday'
                                    size='small'
                                    variant='standard'
                                    value={customer?.birthday}
                                    // defaultValue={customer?.birthday}
                                    InputLabelProps={{
                                        shrink: true,
                                        required: true,
                                    }}
                                />
                            </Grid>
                        </div>
                        <div className='w-4/5'>
                            <Box>
                                <Typography variant='h6' gutterBottom>
                                    Thông tin cá nhân
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={customer?.fullname}
                                            id='fullname'
                                            name='fullname'
                                            label='Họ tên'
                                            fullWidth
                                            variant='standard'
                                            multiline={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id='phone'
                                            name='phone'
                                            label='Số điện thoại'
                                            fullWidth
                                            variant='standard'
                                            value={customer?.phone}
                                            multiline={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            id='email'
                                            name='email'
                                            label='Email'
                                            fullWidth
                                            variant='standard'
                                            value={customer?.email}
                                            multiline={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl
                                            size='small'
                                            sx={{
                                                margin: '10px 0',
                                                width: '100%',
                                            }}
                                        >
                                            <InputLabel id='store-id'>
                                                Cửa hàng
                                            </InputLabel>
                                            <Select
                                                labelId='store-id'
                                                size='small'
                                                label='Cửa hàng'
                                                name='storeId'
                                                variant='standard'
                                                value={storeId}
                                            >
                                                {stores.map((store) => (
                                                    <MenuItem value={store.id}>
                                                        {store.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {!customer?.address && (
                                        <Grid
                                            item
                                            xs={12}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Grid item xs={12} md={3}>
                                                <FormControl
                                                    size='small'
                                                    sx={{
                                                        margin: '10px 0',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <InputLabel id='province'>
                                                        Tỉnh/Thành
                                                    </InputLabel>
                                                    <Select
                                                        variant='standard'
                                                        labelId='province'
                                                        size='small'
                                                        label='Tỉnh thành'
                                                        name='province'
                                                        onChange={(e) => {
                                                            fetchDistricts(
                                                                e.target.value
                                                            );
                                                        }}
                                                    >
                                                        {provinces?.map(
                                                            (province) => (
                                                                <MenuItem
                                                                    value={
                                                                        province.code
                                                                    }
                                                                    key={
                                                                        province.code
                                                                    }
                                                                >
                                                                    {
                                                                        province.name
                                                                    }
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FormControl
                                                    size='small'
                                                    sx={{
                                                        margin: '10px 0',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <InputLabel id='district'>
                                                        Quận/huyện
                                                    </InputLabel>
                                                    <Select
                                                        variant='standard'
                                                        labelId='district'
                                                        size='small'
                                                        label='Quận huyện'
                                                        name='district'
                                                        onChange={(e) =>
                                                            fetchWards(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {province &&
                                                            province.districts &&
                                                            province.districts.map(
                                                                (district) => (
                                                                    <MenuItem
                                                                        value={
                                                                            district.code
                                                                        }
                                                                        key={
                                                                            province.code
                                                                        }
                                                                    >
                                                                        {
                                                                            district.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <FormControl
                                                    size='small'
                                                    sx={{
                                                        margin: '10px 0',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <InputLabel id='ward'>
                                                        Xã/Phường
                                                    </InputLabel>
                                                    <Select
                                                        variant='standard'
                                                        labelId='ward'
                                                        size='small'
                                                        label='Cửa hàng'
                                                        name='ward'
                                                    >
                                                        {district &&
                                                            district.wards &&
                                                            district.wards.map(
                                                                (ward: any) => (
                                                                    <MenuItem
                                                                        value={
                                                                            ward.code
                                                                        }
                                                                    >
                                                                        {
                                                                            ward.name
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    )}
                                    {customer?.address && (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            className='mt-2'
                                            style={{ marginTop: '10px' }}
                                        >
                                            <TextField
                                                className='w-3/4'
                                                label='Địa chỉ'
                                                variant='standard'
                                                value={customer?.address}
                                                disabled
                                                name='address'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </div>
                    </div>
                    <div className='mt-5 text-center'>
                        <button className='custom-button w-1/4 py-2 text-base uppercase'>
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
