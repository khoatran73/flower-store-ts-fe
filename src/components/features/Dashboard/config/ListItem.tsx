import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Collapse, List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        {/* <Link to='/dashboard'>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary='Bảng điều khiển' />
            </ListItemButton>
        </Link> */}
        <Link to='/dashboard'>
            <ListItemButton>
                <ListItemIcon>
                    <LocalFloristIcon
                        sx={{
                            color: '#fffff6',
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary='Quản lí sản phẩm' />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/order'>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon
                        sx={{
                            color: '#fffff6',
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary='Đặt hàng' />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/staff'>
            <ListItemButton>
                <ListItemIcon>
                    <PersonIcon
                        sx={{
                            color: '#fffff6',
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary='Quản lý nhân viên' />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/customer'>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon
                        sx={{
                            color: '#fffff6',
                        }}
                    />
                </ListItemIcon>
                <ListItemText primary='Khách hàng' />
            </ListItemButton>
        </Link>
        {/* <Link to='/dashboard/report'>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary='Báo cáo' />
            </ListItemButton>
        </Link> */}
        {/* <ListItemButton>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary='Integrations' />
        </ListItemButton> */}
    </React.Fragment>
);

export const SecondListItem = () => {
    const [openReport, setOpenReport] = useState(true);
    const [openStatistics, setOpenStatistics] = useState(true);

    const handleClick = () => {
        setOpenReport(!openReport);
    };

    const handleStatisticsClick = () => {
        setOpenStatistics(!openStatistics);
    };

    return (
        <div className='select-none'>
            <ListSubheader
                component='div'
                inset
                sx={{
                    color: '#eb2066',
                    fontWeight: '600',
                    background: '#0f172a',
                    fontSize: '16px',
                }}
            >
                Báo cáo
            </ListSubheader>

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Báo cáo' />
                {openReport ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openReport} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <Link to='/dashboard/report/turnover'>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Báo cáo doanh thu' />
                        </ListItemButton>
                    </Link>
                    <Link to='/dashboard/report/expense'>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Báo cáo chi tiêu' />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>
            <ListItemButton onClick={handleStatisticsClick}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Thống kê' />
                {openStatistics ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openStatistics} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <Link to='/dashboard/statistics/traffic'>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Lượng truy cập' />
                        </ListItemButton>
                    </Link>
                    <Link to='/dashboard/statistics/best-seller'>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary='Sản phẩm bán chạy' />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>
        </div>
    );
};

// export const secondaryListItems = (
//     <div className='select-none'>
//         <ListSubheader
//             component='div'
//             inset
//             sx={{ color: '#7a8af8', fontWeight: '600', background: '#0f172a' }}
//         >
//             Báo cáo đã lưu
//         </ListSubheader>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary='Tháng trước' />
//         </ListItemButton>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary='Quý trước' />
//         </ListItemButton>
//         <Collapse in={true} timeout='auto' unmountOnExit>
//             <List component='div' disablePadding>
//                 <ListItemButton sx={{ pl: 4 }}>
//                     <ListItemIcon>
//                         <StarBorder />
//                     </ListItemIcon>
//                     <ListItemText primary='Starred' />
//                 </ListItemButton>
//             </List>
//         </Collapse>
//     </div>
// );
