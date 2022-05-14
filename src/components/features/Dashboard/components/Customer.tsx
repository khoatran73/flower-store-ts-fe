import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../components/utils/Loading';
import { customRowData } from '../../../../lib/Grid';
import { CustomerColDef } from '../config/Customer.ColDef';
import { UserDto } from './../../../../types/user/UserDto';
import { CUSTOMER_INDEX_API } from './../api/index';
import { PAGE_SIZE } from './../constant/index';

const Customer: React.FC = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<UserDto[] | any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [storeId, setStoreId] = React.useState<string | null>(
        localStorage.getItem('storeId')
    );

    useEffect(() => {
        getRowData();
    }, []);

    const getRowData = async () => {
        setLoading(true);
        await axios
            .get(CUSTOMER_INDEX_API, {
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
                console.log(err);
            });
    };

    const onRefresh = () => {
        getRowData();
    };

    const gridOptions = {
        ref: gridRef,
        columnDefs: CustomerColDef,
        rowData: rowData,
        pagination: true,
        paginationPageSize: PAGE_SIZE,
        rowSelection: 'single',
        defaultColDef: {
            floatingFilter: true,
        },
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

export default Customer;
