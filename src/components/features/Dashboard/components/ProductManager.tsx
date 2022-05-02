import AddBoxIcon from '@mui/icons-material/AddBox';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
} from '@mui/material';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { ProductCreateDto } from '~/types/product/ProductDto';
import { useGetApi } from '../../../../hooks/useGetApi';
import { serializeToFromData } from '../../../../lib/formFileData';
import { ProductManagerColDef } from '../config/ProductManagerColDef';
import {
    PRODUCT_CREATE_API,
    PRODUCT_DELETE_API,
    PRODUCT_INDEX_API,
} from './../api/index';

const ProductManager = () => {
    const gridRef = useRef<AgGridReact>(null);

    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File>();
    const [unitPrice, setUnitPrice] = useState<number>(0);
    // const [image, setImage] = useState<string>();
    const [expiry, setExpiry] = useState<number>(0);
    const [description, setDescription] = useState<string>('');

    const [openDialog, setOpenDialog] = React.useState(false);
    // const [gridApi, setGridApi] = React.useState<any>();
    let rowData: any[] = useGetApi({
        url: PRODUCT_INDEX_API,
    }).result;

    // const { result } = useGetApi({
    //     url: PRODUCT_INDEX_API,
    // });

    const onGridReady = useCallback((params) => {
        params.api.sizeColumnsToFit();
        window.addEventListener('resize', function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });

        gridRef.current?.api.sizeColumnsToFit();
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const onCreate = () => {
        const createDto: ProductCreateDto = {
            name: name,
            expiry: expiry,
            unitPrice: unitPrice,
            description: description,
            file: file,
        };

        const formData = serializeToFromData(
            createDto,
            { noFilesWithArrayNotation: true },
            new FormData(),
            ''
        );

        axios
            .post(PRODUCT_CREATE_API, formData)
            .then((res) => {
                if (res.data.success) {
                    setName('');
                    setExpiry(0);
                    setUnitPrice(0);
                    setDescription('');
                    setFile(undefined);
                    setOpenDialog(false);
                    rowData.unshift(res.data.result);
                    gridRef?.current?.api.setRowData(rowData);
                    Swal.fire(
                        'Thông báo',
                        'Thêm sản phẩm thành công!',
                        'success'
                    );
                }
            })
            .catch((err) => {
                setOpenDialog(false);
                Swal.fire('Thông báo', 'Thêm sản phẩm thất bại!', 'error');
            });
    };

    const gridOptions = {
        ref: gridRef,
        columnDefs: ProductManagerColDef,
        rowData: rowData,
        onGridReady: onGridReady,
        pagination: true,
        paginationPageSize: 10,
        onCellClicked(params: any) {
            if (
                params.column.colId === 'action' &&
                params.event.target.dataset.action
            ) {
                const id = params.data.id;
                const action = params.event.target.dataset.action;

                if (action === 'edit') {
                }

                if (action === 'delete') {
                    Swal.fire(
                        'Thông báo',
                        'Xóa sản phẩm này ?',
                        'warning'
                    ).then(() => {
                        axios
                            .delete(`${PRODUCT_DELETE_API}/${id}`)
                            .then((res) => {
                                if (res.data.success) {
                                    rowData = rowData.filter((row: any) => {
                                        return row.id !== id;
                                    });
                                    gridRef?.current?.api.setRowData(rowData);

                                    Swal.fire(
                                        'Thông báo',
                                        'Xóa sản phẩm thành công!',
                                        'success'
                                    );
                                }
                            })
                            .catch((err) => {
                                Swal.fire('Thông báo', 'Xóa thất bại', 'error');
                            });
                    });
                }
            }
        },
    };

    return (
        <div className='w-full'>
            <div className='grid-button'>
                <Button
                    variant='contained'
                    color='success'
                    size='small'
                    startIcon={<AddBoxIcon />}
                    onClick={handleOpenDialog}
                >
                    Tạo mới
                </Button>
            </div>
            <div
                className='ag-theme-alpine grid'
                style={{ width: '100%', height: '100%' }}
            >
                <AgGridReact {...gridOptions}></AgGridReact>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Tạo mới sản phẩm</DialogTitle>
                <DialogContent className='overflow-hidden'>
                    <FormControl
                        fullWidth
                        sx={{ width: '540px', margin: '10px 0' }}
                    >
                        <TextField
                            autoFocus
                            name='name'
                            label='Tên sản phẩm'
                            type='text'
                            size='small'
                            required
                            sx={{ margin: '6px 0' }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className='my-[6px] flex flex-col'>
                            <label htmlFor='image'>anh</label>
                            <input
                                id='image'
                                type='file'
                                name='image'
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        setFile(files[0]);
                                    }
                                }}
                            />
                        </div>
                        <TextField
                            name='unitPrice'
                            label='Giá bán'
                            type='number'
                            size='small'
                            required
                            sx={{ margin: '6px 0' }}
                            value={unitPrice}
                            onChange={(e) =>
                                setUnitPrice(parseInt(e.target.value))
                            }
                        />
                        <TextField
                            name='expiry'
                            label='Hạn sử dụng'
                            type='number'
                            size='small'
                            sx={{ margin: '6px 0' }}
                            value={expiry}
                            onChange={(e) =>
                                setExpiry(parseInt(e.target.value))
                            }
                        />
                        <TextField
                            name='description'
                            multiline
                            label='Mô tả'
                            rows={4}
                            type='number'
                            size='small'
                            sx={{ margin: '6px 0' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng</Button>
                    <Button onClick={onCreate} autoFocus>
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductManager;
