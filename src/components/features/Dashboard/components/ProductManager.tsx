import AddBoxIcon from '@mui/icons-material/AddBox';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { serializeToFromData } from '../../../../lib/formFileData';
import { customRowData } from '../../../../lib/Grid';
import {
    CategoryDto,
    ProductCreateDto,
    ProductDto,
    ProductUpdateDto,
} from '../../../../types/product/ProductDto';
import { ProductManagerColDef } from '../config/ProductManagerColDef';
import {
    PRODUCT_CREATE_API,
    PRODUCT_DELETE_API,
    PRODUCT_INDEX_API,
    PRODUCT_UPDATE_API,
    CATEGORY_INDEX_API,
} from './../api/index';
import Loading from '../../../../components/utils/Loading';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Notify } from './../../../utils/Notify';
import { PAGE_SIZE } from '../constant';

const ProductManager = () => {
    const gridRef = useRef<AgGridReact>(null);

    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [formType, setFormType] = React.useState<string>('create');
    const [rowData, setRowData] = useState<ProductDto[] | any[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    const [name, setName] = useState<string | null>();
    const [file, setFile] = useState<File | undefined>();
    const [unitPrice, setUnitPrice] = useState<number | null>();
    const [image, setImage] = useState<string | undefined>();
    const [id, setId] = useState<string | undefined>();
    const [totalQuantity, setTotalQuantity] = useState<number | null>();
    const [description, setDescription] = useState<string | undefined>();
    const [categoryId, setCategoryId] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const [storeId, setStoreId] = React.useState<string | null>(
        localStorage.getItem('storeId')
    );

    useEffect(() => {
        getRowData();

        const getCategories = async () => {
            setLoading(true);
            await axios
                .get(CATEGORY_INDEX_API)
                .then((res) => {
                    if (res.data.success) {
                        setLoading(false);
                        const result = res.data.result as CategoryDto[];
                        setCategories(result);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        };

        getCategories();
    }, []);

    const getRowData = async () => {
        setLoading(true);
        await axios
            .get(PRODUCT_INDEX_API, {
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

    const setDefault = _.debounce(() => {
        setId(undefined);
        setImage(undefined);
        setCategoryId('');
        setName(null);
        setTotalQuantity(null);
        setUnitPrice(null);
        setDescription(undefined);
        setFile(undefined);
        setErrorMessage(undefined);
        setFormType('create');
    }, 100);

    const handleOpenDialog = () => {
        setOpenDialog(true);
        setDefault();
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDefault();
    };

    const onCreate = () => {
        if (!name || !totalQuantity || !unitPrice || !file || !categoryId) {
            setErrorMessage('Vui lòng nhập đủ các thông tin');
            return;
        }

        const createDto: ProductCreateDto = {
            name: name,
            totalQuantity: totalQuantity,
            unitPrice: unitPrice,
            description: description,
            file: file,
            categoryId: categoryId,
        };

        const formData = serializeToFromData(
            createDto,
            { noFilesWithArrayNotation: true },
            new FormData(),
            ''
        );

        setLoading(true);
        axios
            .post(PRODUCT_CREATE_API, formData, {
                params: { storeId: storeId },
            })
            .then((res) => {
                if (res.data.success) {
                    setLoading(false);
                    setDefault();
                    setOpenDialog(false);
                    getRowData();

                    Swal.fire(
                        'Thông báo',
                        'Thêm sản phẩm thành công!',
                        'success'
                    );
                }
            })
            .catch((err) => {
                setLoading(false);
                setOpenDialog(false);
                Swal.fire('Thông báo', 'Thêm sản phẩm thất bại!', 'error');
            });
    };

    const onEdit = () => {
        if (!name || !totalQuantity || !unitPrice || !categoryId) {
            setErrorMessage('Vui lòng nhập đủ các thông tin');
            return;
        }

        if (!id || !image) {
            return;
        }

        const updateDto: ProductUpdateDto = {
            id: id,
            name: name,
            totalQuantity: totalQuantity,
            unitPrice: unitPrice,
            description: description,
            image: image,
            file: file,
            categoryId: categoryId,
        };

        const formData = serializeToFromData(
            updateDto,
            { noFilesWithArrayNotation: true },
            new FormData(),
            ''
        );

        setLoading(true);
        axios
            .put(`${PRODUCT_UPDATE_API}/${id}`, formData, {
                params: { storeId: storeId },
            })
            .then((res) => {
                if (res.data.success) {
                    setLoading(false);
                    setDefault();
                    setOpenDialog(false);
                    getRowData();
                    gridRef?.current?.api.setRowData(rowData);

                    Swal.fire(
                        'Thông báo',
                        'Cập nhật sản phẩm thành công!',
                        'success'
                    );
                }
            })
            .catch((err) => {
                setLoading(false);
                setOpenDialog(false);
                Swal.fire('Thông báo', 'Cập nhật sản phẩm thất bại!', 'error');
            });
    };

    const onDelete = (id: string) => {
        Swal.fire({
            title: 'Xóa sản phẩm này ?',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy',
            icon: 'warning',
        }).then((willDelete) => {
            if (willDelete.isConfirmed) {
                setLoading(true);
                axios
                    .delete(`${PRODUCT_DELETE_API}/${id}`, {
                        params: { storeId: storeId },
                    })
                    .then((res) => {
                        if (res.data.success) {
                            setLoading(false);
                            getRowData();
                            Swal.fire(
                                'Thông báo',
                                'Xóa sản phẩm thành công!',
                                'success'
                            );
                        }
                    })
                    .catch((err) => {
                        setLoading(false);
                        Swal.fire(
                            'Thông báo',
                            'Xóa sản phẩm thất bại',
                            'error'
                        );
                    });
            }
        });
    };

    const gridOptions = {
        ref: gridRef,
        columnDefs: ProductManagerColDef,
        rowData: rowData,
        pagination: true,
        paginationPageSize: PAGE_SIZE,
        groupDefaultExpanded: 1,
        rowSelection: 'single',
        sizeColumnsToFit: true,
        defaultColDef: {
            floatingFilter: true,
            // sortable: true,
        },
        onCellClicked(params: any) {
            if (
                params.column.colId === 'action' &&
                params.event.target.dataset.action
            ) {
                const id = params.data.id;
                const action = params.event.target.dataset.action;
                const data = params.data;

                if (action === 'edit') {
                    const {
                        name,
                        totalQuantity,
                        unitPrice,
                        description,
                        image,
                        categoryId,
                    } = data;
                    setFormType('edit');
                    setId(id);
                    setCategoryId(categoryId);
                    setImage(image);
                    setName(name);
                    setTotalQuantity(totalQuantity);
                    setUnitPrice(unitPrice);
                    setDescription(description);
                    setOpenDialog(true);
                }

                if (action === 'delete') {
                    onDelete(id);
                }
            }
        },
    };

    const onSubmit = () => {
        if (formType === 'create') {
            onCreate();
        } else {
            onEdit();
        }
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
                    color='success'
                    size='small'
                    startIcon={<AddBoxIcon />}
                    onClick={handleOpenDialog}
                >
                    Tạo mới
                </Button>
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
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {formType === 'create'
                        ? 'Tạo mới sản phẩm'
                        : 'Cập nhật sản phẩm'}
                </DialogTitle>
                <Divider />
                <DialogContent className='overflow-hidden'>
                    <FormControl
                        fullWidth
                        size='small'
                        sx={{ margin: '10px 0' }}
                    >
                        <TextField
                            autoFocus
                            name='name'
                            label='Tên sản phẩm'
                            size='small'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        size='small'
                        sx={{
                            margin: '10px 0',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <FormControl
                            size='small'
                            sx={{ margin: '10px 0', width: '50%' }}
                        >
                            <InputLabel id='category-id'>Danh mục</InputLabel>
                            <Select
                                labelId='category-id'
                                size='small'
                                label='Danh mục'
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                {categories.map((category) => (
                                    <MenuItem value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl
                            size='small'
                            sx={{ margin: '10px 0', width: '23%' }}
                        >
                            <TextField
                                name='unitPrice'
                                label='Giá bán'
                                type='number'
                                size='small'
                                required
                                value={unitPrice}
                                onChange={(e) =>
                                    setUnitPrice(parseInt(e.target.value))
                                }
                            />
                        </FormControl>
                        <FormControl
                            size='small'
                            sx={{ margin: '10px 0', width: '23%' }}
                        >
                            <TextField
                                name='totalQuantity'
                                label='Số lượng'
                                type='number'
                                size='small'
                                value={totalQuantity}
                                onChange={(e) =>
                                    setTotalQuantity(parseInt(e.target.value))
                                }
                            />
                        </FormControl>
                    </FormControl>
                    <FormControl
                        fullWidth
                        size='small'
                        sx={{ margin: '10px 0' }}
                    >
                        <div className='my-[6px] flex flex-col'>
                            <label htmlFor='image'>Ảnh</label>
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
                    </FormControl>

                    <FormControl
                        fullWidth
                        size='small'
                        sx={{ margin: '10px 0' }}
                    >
                        <TextField
                            name='description'
                            multiline
                            label='Mô tả'
                            rows={4}
                            type='number'
                            size='small'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        size='small'
                        sx={{ margin: '10px 0' }}
                    >
                        {errorMessage && (
                            <DialogContentText
                                style={{ color: 'red' }}
                                className='py-2'
                            >
                                {errorMessage}
                            </DialogContentText>
                        )}
                    </FormControl>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button
                        onClick={onSubmit}
                        color='primary'
                        size='small'
                        variant='contained'
                        sx={{ marginLeft: '6px' }}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={handleCloseDialog}
                        color='error'
                        size='small'
                        variant='contained'
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProductManager;
