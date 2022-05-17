import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { Table, Tag, Space } from 'antd';
import { HistoryDto } from '~/types/history/HistoryDto';
import { HISTORY_API } from '../api';
import axios from 'axios';
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

    const colDef = [
        // {
        //     title: 'ngày mua',
        //     width: 100,
        //     dataIndex: 'createdAt',
        //     key: 'createdAt',
        // },
        // {
        //     title: 'Thuế',
        //     width: 50,
        //     dataIndex: 'tax',
        //     key: 'tax',
        // },
        // {
        //     title: 'Discount',
        //     width: 50,
        //     dataIndex: 'discount',
        //     key: 'discount',
        // },
        // {
        //     title: 'Tổng giá',
        //     width: 50,
        //     dataIndex: 'totalPrice',
        //     key: 'totalPrice',
        // },
        {
            title: 'Tên sản phẩm',
            width: 50,
            dataIndex: 'product.name',
            key: 'product.name',
        },
        {
            title: 'Số lượng',
            width: 50,
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            width: 50,
            dataIndex: 'price',
            key: 'price',
        },
    ];

    return (
        <div className='h-full'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Lịch sử mua hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div
                className='mt-6 w-full overflow-y-auto bg-white rounded-md shadow-md mb-4 p-4'
                style={{ height: '95%' }}
            >
                {histories.map((history) => (
                    <div key={history.id} className='flex flex-col w-full py-5'>
                        ngày mua: {history.createdAt}
                        thuế: {history.tax}
                        discount:{history.discount}
                        <div>
                            {/* {.map((cartDetail) => ( */}
                            <Table
                                className='w-full'
                                columns={colDef}
                                dataSource={history.cart.cartDetails}
                                pagination={false}
                            />
                            {/* ))} */}
                        </div>
                        tổng giá:{history.totalPrice}
                        ngày giao:{history.deliveryAt}
                    </div>
                ))}
            </div>
        </div>
    );
};
