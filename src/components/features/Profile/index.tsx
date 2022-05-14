import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Forbidden from './../../utils/Forbidden';

const { Header, Content, Sider } = Layout;
const { Item } = Menu;

export const Profile: React.FC = () => {
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
                    {/* <Item
                        icon={<LocalFloristIcon />}
                        key='dashboard'
                    >
                        <Link to='/dashboard'>Quản lý sản phẩm</Link>
                    </Item> */}
                    <Item icon={<PersonIcon />} key='/profile'>
                        <Link to='/profile'>Thông tin</Link>
                    </Item>
                    <Item icon={<ShoppingCartIcon />} key='/profile/cart'>
                        <Link to='/profile/cart'>Giỏ hàng</Link>
                    </Item>
                    <Item icon={<HistoryIcon />} key='/profile/history'>
                        <Link to='/profile/history'>Lịch sử</Link>
                    </Item>

                    {/* <Item
                        icon={<PeopleIcon />}
                        key='dashboard/customer'
                    >
                        <Link to='/dashboard/customer'>Khách hàng</Link>
                    </Item> */}

                    {/* <SubMenu
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
                                Báo cáo doanh thu
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
                    </SubMenu> */}
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className='site-layout-background'
                    style={{
                        padding: '12px 24px 24px 24px',
                        margin: 0,
                        minHeight: '100%',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
