import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

export const ActionRenderer = () => {
    return (
        <div className='grid-cell-image-wrapper'>
            <IconButton color='primary' component='span' data-action='edit'>
                <EditIcon data-action='edit' />
            </IconButton>
            <IconButton color='error' component='span' data-action='delete'>
                <DeleteIcon data-action='delete' />
            </IconButton>
        </div>
    );
};
