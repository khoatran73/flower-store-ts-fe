import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import * as React from 'react';
import { StoreDto } from '../../../types/store/StoreDto';

interface Props {
    stores: StoreDto[];
}

export const AddressForm: React.FC<Props> = (props) => {
    const { stores } = props;

    return (
        <React.Fragment>
            <form>
                <Typography variant='h6' gutterBottom>
                    Địa chỉ giao hàng
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            id='fullname'
                            name='fullname'
                            label='Họ tên'
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='phone'
                            name='phone'
                            label='Số điện thoại'
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='email'
                            name='email'
                            label='Email'
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id='store-id'>Cửa hàng</InputLabel>
                            <Select
                                labelId='store-id'
                                size='small'
                                label='Cửa hàng'
                                name='storeId'
                                variant='standard'
                            >
                                {stores.map((store) => (
                                    <MenuItem value={store.id}>
                                        {store.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='address'
                            name='address'
                            label='Địa chỉ'
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
};
