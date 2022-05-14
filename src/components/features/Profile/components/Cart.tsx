import React from 'react';
import { Breadcrumb } from 'antd';

export const Cart = () => {
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Trang cá nhân</Breadcrumb.Item>
                <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div className='flex mt-6'></div>
        </div>
    );
};
