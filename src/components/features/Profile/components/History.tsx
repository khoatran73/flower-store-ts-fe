import React, { FC, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Table, Tag, Space } from 'antd';
import { HistoryCart, HistoryDto } from '~/types/history/HistoryDto';
import { HISTORY_API } from '../api';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HistoryCartDetail } from './../../../../types/history/HistoryDto';
import moment from 'moment';
const { Column, ColumnGroup } = Table;

export const History = () => {
    const [histories, setHistories] = useState<HistoryDto[]>([]);

    const fetchData = () => {
        const isLogin = localStorage.getItem('isLogin');
        axios.get(`${HISTORY_API}/${isLogin}`).then((res) => {
            if (res.data.success) {
                setHistories(res.data.result);
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='h-full'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Lịch sử mua hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className='mt-6 w-full overflow-y-auto '
                style={{ height: '95%' }}
            >
                {histories.map((history) => (
                    <CartDetailItem history={history} key={history.id} />
                ))}
                {(!histories || histories?.length === 0) && (
                    <div className='flex items-center justify-center flex-col h-full'>
                        <img
                            className='w-52'
                            src='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1652970603/Flower-store/cart_gtpbcm.png'
                            alt=''
                        />
                        <div className='text-lg mt-5'>Bạn chưa mua hàng</div>
                    </div>
                )}
            </div>
        </div>
    );
};
interface CartDetailItemProps {
    history: HistoryDto;
}
const CartDetailItem: FC<CartDetailItemProps> = (props) => {
    const { history } = props;

    return (
        <div
            key={history.id}
            className='flex flex-col w-full py-5 bg-white rounded-md shadow-md mb-4 p-4'
        >
            <div className='flex justify-between items-center w-full mb-2 text-base'>
                <div>
                    Ngày mua hàng:{' '}
                    <span className='text-red-500 underline'>
                        {moment(history.createdAt)
                            .format('DD/MM/YYYY hh:mm:ss')
                            .toString()}
                    </span>
                </div>
                <div className='flex'>
                    <div>Ngày giao hàng: {history.deliveryAt}</div>
                    {!history.deliveryAt && (
                        <div className='ml-3 pl-3 border-l border-gray-200 uppercase text-red-300'>
                            Chưa giao hàng
                        </div>
                    )}
                </div>
            </div>

            <div className='border-b border-t border-gray-200'>
                {history.cart.cartDetails.map((cartDetail, index) => (
                    <ProductItem key={index} cartDetail={cartDetail} />
                ))}
            </div>
            <div className='flex flex-col justify-end w-full items-end mt-2'>
                <div>Thuế: {history.tax}%</div>
                <div>Discount: {history.discount}%</div>
                <div className='text-2xl text-red-500'>
                    {history.totalPrice.toLocaleString()}₫
                </div>
            </div>
        </div>
    );
};

interface ProductItemProps {
    cartDetail: HistoryCartDetail;
}

const ProductItem: FC<ProductItemProps> = (props) => {
    const { cartDetail } = props;
    return (
        <div>
            <div className='flex justify-between align-center p-6 text-sm'>
                <div className='flex align-center flex-auto w-3/4'>
                    <img
                        src={cartDetail.product?.image}
                        alt=''
                        className='w-28'
                    />
                    <div className='ml-5 mr-10'>
                        <Link to={'/product/' + cartDetail.product?.id}>
                            <div className='font-semibold cursor-pointer text-base truncate '>
                                {cartDetail.product?.name}
                            </div>
                        </Link>
                        <div className='font-semibold py-1 text-sm text-red-500'>
                            {cartDetail.product?.unitPrice.toLocaleString()}₫
                        </div>
                        <div className='text-gray-600 text-sm line-clamp-5'>
                            {cartDetail.product?.description}
                        </div>
                    </div>
                </div>
                <div className='flex justify-between align-center flex-1'>
                    <div className='w-[75px]'>
                        <div className='border border-gray-100 bg-gray-100 text-center w-6 h-6 rounded text-sm'>
                            {cartDetail.quantity}
                        </div>
                        <div className='font-semibold text-red-500 text-sm'>
                            {cartDetail.price?.toLocaleString()}₫
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
