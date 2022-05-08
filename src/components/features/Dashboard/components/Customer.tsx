import AddBoxIcon from '@mui/icons-material/AddBox';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { customRowData } from '../../../../lib/Grid';
import { ProductDto } from '../../../../types/product/ProductDto';
import { StoreDto } from '../../../../types/store/StoreDto';
import { CustomerColDef } from '../config/Customer.ColDef';
import {
    CUSTOMER_INDEX_API,
    STAFF_INDEX_API,
    STORE_LIST_API,
} from './../api/index';
import Loading from '../../../../components/utils/Loading';

const Customer: React.FC = () => {
    const gridRef = useRef<AgGridReact>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [rowData, setRowData] = useState<ProductDto[] | any[]>([]);
    const [stores, setStores] = useState<StoreDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getRowData();
    }, []);

    const getRowData = async () => {
        setLoading(true);
        await axios
            .get(CUSTOMER_INDEX_API)
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

    const gridOptions = {
        ref: gridRef,
        columnDefs: CustomerColDef,
        rowData: rowData,
        pagination: true,
        paginationPageSize: 10,
        rowSelection: 'single',
        defaultColDef: {
            floatingFilter: true,
        },
    };

    if (loading) return <Loading loading={loading} />;
    return (
        <div className='w-full'>
            <div className='grid-button'>
                <Button
                    variant='contained'
                    color='success'
                    size='small'
                    startIcon={<AddBoxIcon />}
                    sx={{ opacity: 0 }}
                >
                    tao moi
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
