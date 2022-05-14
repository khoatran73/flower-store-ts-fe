import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Avatar,
    Badge,
    Box,
    Card,
    CardMedia,
    Container,
    Divider,
    IconButton,
    Modal,
    Toolbar,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CartDetailDto, CartDto } from '../../../types/cart/Cart';
import { CART_INDEX_API } from '../../features/ProductDetail/api';
import { REMOVE_CART_API } from './api';
import { UserDto } from './../../../types/user/UserDto';
import { GET_CUSTOMER_API } from '../../features/Profile/api';
import Swal from 'sweetalert2';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    border: 'none',
    outline: 'none',
};

const Navbar = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState<string | null>(
        localStorage.getItem('isLogin')
    );
    const [role, setRole] = useState<string | null>(
        localStorage.getItem('role')
    );
    const [image, setImage] = useState<string | null>(
        localStorage.getItem('image')
    );
    const [cart, setCart] = useState<CartDto>();
    const [loading, setLoading] = useState<boolean>(false);
    const [customer, setCustomer] = useState<UserDto>();

    const fetchCart = async () => {
        setLoading(true);
        await axios
            .get(CART_INDEX_API, { params: { accountId: isLogin } })
            .then((res) => {
                if (res.data.success) {
                    setCart(res.data.result[0]);
                    setLoading(false);
                }
            })
            .catch((err) => setLoading(false));
    };

    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDelete = (cartDetailDto: CartDetailDto) => {
        setLoading(true);
        axios
            .delete(REMOVE_CART_API, {
                params: {
                    cartId: cartDetailDto.cartId,
                    productId: cartDetailDto.productId,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    fetchCart();
                }
            })
            .catch((err) => setLoading(false));
    };

    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => {
        fetchCart();
        setOpenModal(true);
    };
    const handleCloseModal = () => setOpenModal(false);

    const logout = () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('role');
        localStorage.removeItem('storeId');
        localStorage.removeItem('image');
        setIsLogin(null);
        setRole(null);
        navigate('/');
    };

    const checkOut = async () => {
        const customer: UserDto = await axios.get(
            `${GET_CUSTOMER_API}/${isLogin}`
        );

        if (!customer.address) {
            setOpenModal(false);
            Swal.fire({
                title: 'Opps',
                text: 'Vui lòng cập nhật thông tin cá nhân trước khi mua hàng',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                icon: 'warning',
            }).then((confirm) => {
                if (confirm.isConfirmed) {
                    navigate('/profile');
                }
            });
        }
    };

    // if (loading) return <Loading loading={loading} />;
    return (
        <div
            className='max-h-[100px] overflow-hidden bg-white  w-full border-b border-gray-200 '
            id='navbar'
        >
            <Container>
                <Toolbar
                    disableGutters
                    className='flex h-[100%] align-center p-3 items-center justify-between '
                >
                    <Typography variant='h6' noWrap component='div'>
                        <Link to='/'>
                            <Card className=''>
                                <CardMedia
                                    component='img'
                                    height='60'
                                    image='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1651974807/Flower-store/logo_otxw9r.webp'
                                />
                            </Card>
                        </Link>
                    </Typography>
                    <div className='flex justify-between items-center'>
                        <Box className='ml-6'>
                            <div className='text-base'>
                                <NavLink
                                    to={'/'}
                                    className='mr-2 ml-2 nav-item transition ease-in-out delay-75 duration-700'
                                >
                                    Trang Chủ
                                </NavLink>
                                <NavLink
                                    to={'/product'}
                                    className='mr-2 ml-2 nav-item transition ease-in-out delay-75 duration-700'
                                >
                                    Sản Phẩm
                                </NavLink>

                                <NavLink
                                    to={'/contact'}
                                    className='mr-2 ml-2 nav-item transition ease-in-out delay-75 duration-700'
                                >
                                    Liên hệ
                                </NavLink>
                                <NavLink
                                    to={'/reply'}
                                    className='mr-2 ml-2 nav-item transition ease-in-out delay-75 duration-700'
                                >
                                    Phản hồi
                                </NavLink>
                                <NavLink
                                    to={'/help'}
                                    className='mr-2 ml-2 nav-item transition ease-in-out delay-75 duration-700'
                                >
                                    Trợ giúp
                                </NavLink>
                                {role === 'admin' && (
                                    <NavLink
                                        to={'/dashboard'}
                                        className='mr-2 ml-2 text-red-400 transition ease-in-out delay-75 duration-700'
                                    >
                                        Trang Quản Trị
                                    </NavLink>
                                )}
                                {role === 'customer' && (
                                    <NavLink
                                        to={'/profile'}
                                        className='mr-2 ml-2 text-red-400 transition ease-in-out delay-75 duration-700'
                                    >
                                        Trang Cá nhân
                                    </NavLink>
                                )}
                            </div>
                        </Box>
                    </div>
                    <div className='flex justify-between items-center relative'>
                        <Box className='w-[240px] flex justify-end items-center'>
                            {isLogin ? (
                                <>
                                    <Typography className='w-[100%] flex justify-end items-center'>
                                        {role === 'customer' && (
                                            <div className=''>
                                                <Badge
                                                    badgeContent={
                                                        // cart?.cartDetails?.length
                                                        cart &&
                                                        cart.cartDetails &&
                                                        cart.cartDetails
                                                            .length > 0 && (
                                                            <FiberManualRecordIcon
                                                                fontSize='inherit'
                                                                color='error'
                                                            />
                                                        )
                                                    }
                                                    color='error'
                                                    className='cursor-pointer mr-'
                                                >
                                                    <ShoppingCartIcon
                                                        sx={{
                                                            color: '#eb2066',
                                                        }}
                                                        onClick={
                                                            handleOpenModal
                                                        }
                                                    />
                                                </Badge>
                                            </div>
                                        )}
                                        <Avatar
                                            className='ml-5'
                                            alt='Khoa Henry'
                                            src={image || ''}
                                        />

                                        <IconButton
                                            sx={{
                                                p: '10px',
                                                marginLeft: '10px',
                                                color: '#eb2066',
                                            }}
                                            aria-label='cart'
                                            onClick={logout}
                                        >
                                            <LogoutIcon />
                                        </IconButton>
                                    </Typography>
                                </>
                            ) : (
                                <div>
                                    <Link to='/login'>
                                        <button className='custom-button'>
                                            Đăng nhập
                                        </button>
                                    </Link>
                                    <Link to='/register' className='ml-3'>
                                        <button className='custom-button'>
                                            Đăng ký
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </Box>
                    </div>
                </Toolbar>
            </Container>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style} className='h-[490px] overflow-hidden'>
                    <div className='uppercase text-md font-semibold text-center py-3 bg-gray-100'>
                        Giỏ hàng
                    </div>
                    <div className='h-[338px]  overflow-y-auto overflow-x-hidden'>
                        <div>
                            {cart?.cartDetails?.map(
                                (cartDetail: CartDetailDto, index: number) => (
                                    <div key={index}>
                                        <div className='flex justify-between align-center p-6 text-sm'>
                                            <div className='flex align-center flex-auto w-3/4'>
                                                <img
                                                    src={
                                                        cartDetail.product
                                                            ?.image
                                                    }
                                                    alt=''
                                                    className='w-16'
                                                />
                                                <div className='ml-3 w-[240px]'>
                                                    <Link
                                                        to={
                                                            '/product/' +
                                                            cartDetail.product
                                                                ?.id
                                                        }
                                                    >
                                                        <div className='font-semibold cursor-pointer text-sm truncate '>
                                                            {
                                                                cartDetail
                                                                    .product
                                                                    ?.name
                                                            }
                                                        </div>
                                                    </Link>
                                                    <div className='font-semibold text-gray-600'>
                                                        {cartDetail.product?.unitPrice.toLocaleString()}
                                                        đ
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex justify-between align-center flex-1'>
                                                <div className='w-[75px]'>
                                                    <div className='border border-gray-100 bg-gray-100 text-center w-6 h-6 rounded'>
                                                        {cartDetail.quantity}
                                                    </div>
                                                    <div className='font-semibold  '>
                                                        {cartDetail.price?.toLocaleString()}
                                                        đ
                                                    </div>
                                                </div>
                                                <div
                                                    className='cursor-pointer text-red-500 text-lg'
                                                    onClick={() =>
                                                        onDelete(cartDetail)
                                                    }
                                                >
                                                    x
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        {(!cart ||
                            !cart?.cartDetails ||
                            cart?.cartDetails?.length === 0) && (
                            <div className='flex items-center justify-center flex-col h-full'>
                                <img
                                    className='w-40'
                                    src='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1651994769/Flower-store/Pngtree_man_shopping_in_grocery_market_7299097_pebjyx.png'
                                    alt=''
                                />
                                <div className='text-lg mt-5'>
                                    Hiện chưa có sản phẩm
                                </div>
                            </div>
                        )}
                    </div>
                    <Divider />
                    <div className='flex flex-col justify-between px-6 py-3'>
                        <div className='flex justify-between mb-3'>
                            <div className='uppercase font-normal text-sm'>
                                Tổng tiền:
                            </div>
                            <div className='text-red-500'>
                                {cart?.totalPrice?.toLocaleString()}đ
                            </div>
                        </div>
                        <div className='text-center'>
                            {/* <Link to={'/checkout/' + cart?.id}> */}
                            <button
                                className='custom-button w-3/4'
                                onClick={checkOut}
                            >
                                Thanh toán
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Navbar;
