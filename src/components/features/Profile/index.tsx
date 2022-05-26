import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Forbidden from './../../utils/Forbidden';

const { Content, Sider } = Layout;

export const Profile: React.FC = () => {
    const isLogin = localStorage.getItem('isLogin');
    const role = localStorage.getItem('role');

    const menuItems = [
        {
            key: 'profile',
            icon: <PersonIcon />,
            label: <Link to='/profile'>Thông tin</Link>,
        },
        {
            key: 'cart',
            icon: <ShoppingCartIcon />,
            label: <Link to='/profile/cart'>Giỏ hàng</Link>,
        },
        {
            key: 'history',
            icon: <HistoryIcon />,
            label: <Link to='/profile/history'>Lịch sử</Link>,
        },
    ];

    if (!isLogin && role !== 'admin') return <Forbidden />;
    return (
        <Layout className='' style={{ height: '89%' }}>
            <Sider width={240} className='site-layout-background'>
                <Menu
                    mode='inline'
                    defaultSelectedKeys={['profile']}
                    style={{ height: '100%', borderRight: 0 }}
                    items={menuItems}
                />
            </Sider>
            <Layout style={{ padding: '0 24px 24px', height: '100%' }}>
                <Content
                    className='site-layout-background'
                    style={{
                        padding: '12px 24px 24px 24px',
                        margin: 0,
                        height: '100%',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
