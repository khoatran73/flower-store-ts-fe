import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import axios from 'axios';
import { CartDetailDto, CartDto } from '~/types/cart/Cart';
import { CART_INDEX_API } from '../../ProductDetail/api';
import { Link, useNavigate } from 'react-router-dom';
import { REMOVE_CART_API } from '../../../shared/Nav/api/index';
import Swal from 'sweetalert2';
import { UserDto } from '~/types/user/UserDto';
import { GET_CUSTOMER_API } from '../api';

export const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<CartDto>();
    const [isLogin, setIsLogin] = useState<string | null>(
        localStorage.getItem('isLogin')
    );
    const fetchCart = async () => {
        await axios
            .get(CART_INDEX_API, { params: { accountId: isLogin } })
            .then((res) => {
                if (res.data.success) {
                    setCart(res.data.result[0]);
                }
            });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const onDelete = (cartDetailDto: CartDetailDto) => {
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
            });
    };

    const checkOut = async () => {
        const customer: UserDto = await axios.get(
            `${GET_CUSTOMER_API}/${isLogin}`
        );

        if (!customer.address) {
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

    return (
        <div className='w-full h-full'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className='w-full  bg-white rounded-md shadow-md mb-4'
                style={{ height: '97%' }}
            >
                <div className='overflow-y-auto' style={{ height: '80%' }}>
                    {cart?.cartDetails?.map(
                        (cartDetail: CartDetailDto, index: number) => (
                            <div key={index}>
                                <div className='flex justify-between align-center p-6 text-sm'>
                                    <div className='flex align-center flex-auto w-3/4'>
                                        <img
                                            src={cartDetail.product?.image}
                                            alt=''
                                            className='w-40'
                                        />
                                        <div className='ml-5 mr-10'>
                                            <Link
                                                to={
                                                    '/product/' +
                                                    cartDetail.product?.id
                                                }
                                            >
                                                <div className='font-semibold cursor-pointer text-lg truncate '>
                                                    {cartDetail.product?.name}
                                                </div>
                                            </Link>
                                            <div className='font-semibold text-gray-600 text-base'>
                                                {cartDetail.product?.unitPrice.toLocaleString()}
                                                đ
                                            </div>
                                            <div className='text-gray-600 text-base line-clamp-5'>
                                                {
                                                    cartDetail.product
                                                        ?.description
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between align-center flex-1'>
                                        <div className='w-[75px]'>
                                            <div className='border border-gray-100 bg-gray-100 text-center w-6 h-6 rounded text-base'>
                                                {cartDetail.quantity}
                                            </div>
                                            <div className='font-semibold  text-base'>
                                                {cartDetail.price?.toLocaleString()}
                                                đ
                                            </div>
                                        </div>
                                        <div
                                            className='cursor-pointer text-red-500 text-xl'
                                            onClick={() => onDelete(cartDetail)}
                                        >
                                            x
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
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

                <div className='flex flex-col justify-between px-6 py-3 mt-4 text-lg'>
                    <div className='flex justify-between mb-3'>
                        <div className='uppercase font-normal'>Tổng tiền:</div>
                        <div className='text-red-500'>
                            {cart?.totalPrice?.toLocaleString()}đ
                        </div>
                    </div>
                    <div className='text-center'>
                        {/* <Link to={'/checkout/' + cart?.id}> */}
                        <div className='w-full flex items-center justify-center'>
                            <button
                                className='custom-button w-1/4 text-center py-3 text-base uppercase'
                                onClick={checkOut}
                            >
                                Thanh toán
                            </button>
                        </div>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
