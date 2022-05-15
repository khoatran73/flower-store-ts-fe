import EqualizerIcon from '@mui/icons-material/Equalizer';
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
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { MenuLayout } from '../../../types/utils/MenuLayout';

const { Header, Content, Sider } = Layout;
const { Item } = Menu;

const Dashboard: React.FC = () => {
    const [isLogin, setIsLogin] = React.useState<string | null>(
        localStorage.getItem('isLogin')
    );
    const [role, setRole] = React.useState<string | null>(
        localStorage.getItem('role')
    );

    if (!isLogin && role !== 'admin') return <Forbidden />;
    return (
        <Layout className='' style={{ height: '89%' }}>
            <Sider width={240} className='site-layout-background'>
                <Menu
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Item
                        icon={<LocalFloristIcon />}
                        key='dashboard'
                        // title='dashboard'
                    >
                        <Link to='/dashboard'>Quản lý sản phẩm</Link>
                    </Item>
                    <Item
                        icon={<ShoppingCartIcon />}
                        key='dashboard/order'
                        // title='dashboard'
                    >
                        <Link to='/dashboard/order'>Đặt hàng</Link>
                    </Item>
                    <Item
                        icon={<PersonIcon />}
                        key='dashboard/staff'
                        // title='dashboard'
                    >
                        <Link to='/dashboard/staff'>Quản lý nhân viên</Link>
                    </Item>
                    <Item
                        icon={<PeopleIcon />}
                        key='dashboard/customer'
                        // title='dashboard'
                    >
                        <Link to='/dashboard/customer'>Khách hàng</Link>
                    </Item>

                    <SubMenu
                        title={
                            <span style={{ marginLeft: '10px' }}>Báo cáo</span>
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
                        <Item
                            key='/dashboard/report/expense'
                            icon={<FiberManualRecordIcon />}
                        >
                            <Link to='/dashboard/report/expense'>
                                Báo cáo chi tiêu
                            </Link>
                        </Item>
                    </SubMenu>
                    <SubMenu
                        title={
                            <span style={{ marginLeft: '10px' }}>Thống kê</span>
                        }
                        icon={<EqualizerIcon fontSize='small' />}
                    >
                        <Item
                            icon={<FiberManualRecordIcon />}
                            key='/dashboard/statistics/traffic'
                        >
                            <Link to='/dashboard/statistics/traffic'>
                                Lượng truy cập
                            </Link>
                        </Item>
                        <Item
                            key='/dashboard/statistics/best-seller'
                            icon={<FiberManualRecordIcon />}
                        >
                            <Link to='/dashboard/statistics/best-seller'>
                                Sản phẩm bán chạy
                            </Link>
                        </Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
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
