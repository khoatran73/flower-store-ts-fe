import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { customRowData } from '../../../../lib/Grid';
import { ProductDto } from '~/types/product/ProductDto';
import { TURNOVER_API } from '../api';
import { TurnoverColDef } from '../config/Turnover.ColDef';
import { PAGE_SIZE } from '../constant';
import Loading from './../../../utils/Loading';

export const Turnover = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [rowData, setRowData] = useState<ProductDto[]>();

    const getRowData = async () => {
        setLoading(true);
        await axios.get(TURNOVER_API).then((res) => {
            if (res.data.success) {
                setLoading(false);
                setRowData(customRowData(res.data.result));
            }
        });
    };

    useEffect(() => {
        getRowData();
    }, []);

    const gridOptions = {
        ref: gridRef,
        columnDefs: TurnoverColDef,
        rowData: rowData,
        pagination: true,
        paginationPageSize: PAGE_SIZE,
        groupDefaultExpanded: 1,
        rowSelection: 'single',
        sizeColumnsToFit: true,
        defaultColDef: {
            floatingFilter: true,
        },
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
