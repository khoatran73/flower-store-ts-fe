import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import * as React from 'react';
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
                    <LocalFloristIcon />
                </ListItemIcon>
                <ListItemText primary='Quản lí sản phẩm' />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/order'>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary='Đặt hàng' />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/staff'>
            <ListItemButton>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Quản lý nhân viên' />
            </ListItemButton>
        </Link>
        <Link to='/dashboard/customer'>
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
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

export const secondaryListItems = (
    <React.Fragment>
        {/* <ListSubheader component='div' inset>
            Báo cáo đã lưu
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Tháng trước' />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Quý trước' />
        </ListItemButton> */}
        {/* <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Year-end sale' />
        </ListItemButton> */}
    </React.Fragment>
);
