import AddBoxIcon from '@mui/icons-material/AddBox';
import { Button } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/utils/Loading';
import { customRowData } from '../../../../lib/Grid';
import { ProductDto } from '../../../../types/product/ProductDto';
import { OrderColDef } from '../config/Order.ColDef';
import { INDEX_ORDER_API } from './../api/index';
import RefreshIcon from '@mui/icons-material/Refresh';
import { PAGE_SIZE } from '../constant';

const Orders: React.FC = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<ProductDto[] | any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [storeId, setStoreId] = React.useState<string | null>(
        localStorage.getItem('storeId')
    );

    useEffect(() => {
        getRowData();
    }, []);

    const gridOptions = {
        ref: gridRef,
        columnDefs: OrderColDef,
        rowData: rowData,
        pagination: true,
        paginationPageSize: PAGE_SIZE,
        groupDefaultExpanded: 1,
        rowSelection: 'single',
        defaultColDef: {
            floatingFilter: true,
        },
        autoGroupColumnDef: {
            headerName: 'Tên khách hàng',
        },
    };

    const getRowData = async () => {
        setLoading(true);
        await axios
            .get(INDEX_ORDER_API, {
                params: { storeId: storeId },
            })
            .then((res) => {
                if (res.data.success) {
                    setLoading(false);
                    setRowData(customRowData(res.data.result));
                }
            })
            .catch((err) => {
                setLoading(false);
            });
    };

    const onRefresh = () => {
        getRowData();
    };

    if (loading) return <Loading loading={loading} />;
    return (
        <div className='w-full h-full'>
            <div className='grid-button'>
                <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    startIcon={<RefreshIcon />}
                    sx={{ marginLeft: '10px' }}
                    onClick={onRefresh}
                >
                    Refresh
                </Button>
            </div>
            <div
                className='ag-theme-alpine grid'
                style={{ width: '100%', height: '100%' }}
            >
                <AgGridReact {...gridOptions}></AgGridReact>
            </div>
        </div>
    );
};

export default Orders;
