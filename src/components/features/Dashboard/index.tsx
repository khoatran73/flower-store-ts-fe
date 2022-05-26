import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Forbidden from './../../utils/Forbidden';

const { Content, Sider } = Layout;
const { Item } = Menu;

const Dashboard: React.FC = () => {
    const isLogin = localStorage.getItem('isLogin');
    const role = localStorage.getItem('role');

    if (!isLogin || role === 'customer') return <Forbidden />;

    const isAdmin = role === 'admin';
    const isAdminWareHouse = role === 'admin' || role === 'warehouse';
    const isAdminSales = role === 'admin' || role === 'sales';

    const activeTab = role === 'sales' ? 'order' : 'dashboard';

    return (
        <Layout className='' style={{ height: '89%' }}>
            <Sider width={240} className='site-layout-background'>
                <Menu
                    mode='inline'
                    style={{ height: '100%', borderRight: 0 }}
                    defaultSelectedKeys={[activeTab]}
                >
                    {isAdminWareHouse && (
                        <Item icon={<LocalFloristIcon />} key='dashboard'>
                            <Link to='/dashboard'>Quản lý sản phẩm</Link>
                        </Item>
                    )}
                    {isAdminSales && (
                        <Item icon={<ShoppingCartIcon />} key='order'>
                            <Link to='/dashboard/order'>Đặt hàng</Link>
                        </Item>
                    )}

                    {isAdmin && (
                        <Item icon={<PersonIcon />} key='staff'>
                            <Link to='/dashboard/staff'>Quản lý nhân viên</Link>
                        </Item>
                    )}

                    {isAdminSales && (
                        <Item icon={<PeopleIcon />} key='customer'>
                            <Link to='/dashboard/customer'>Khách hàng</Link>
                        </Item>
                    )}
                    {isAdmin && (
                        <SubMenu
                            title={
                                <span style={{ marginLeft: '10px' }}>
                                    Báo cáo
                                </span>
                            }
                            icon={<PieChartIcon fontSize='small' />}
                        >
                            <Item
                                icon={<FiberManualRecordIcon />}
                                key='/dashboard/report/turnover'
                            >
                                <Link to='/dashboard/report/turnover'>
                                    Sản phẩm đã bán
                                </Link>
                            </Item>
                        </SubMenu>
                    )}
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className='site-layout-background'
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
