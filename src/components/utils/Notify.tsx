import CloseIcon from '@mui/icons-material/Close';
import { Collapse, IconButton } from '@mui/material';
import { Alert } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './style/notify.scss';

interface Props {
    type?: 'success' | 'info' | 'warning' | 'error';
    title?: string;
    message?: string;
}

export const Notify: FC<Props> = (props) => {
    const { type, title, message } = props;
    const [open, setOpen] = useState(true);

    useEffect(() => {
        let timer = setTimeout(() => setOpen(false), 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Collapse
            in={open}
            sx={{
                position: 'fixed',
                zIndex: 9999,
                top: '10px',
                right: '10px',
            }}
            className='w-96'
        >
            <Alert
                message={title || 'Thông báo'}
                description={message || 'message'}
                type={type || 'success'}
                showIcon
                closable
            />
        </Collapse>
    );
};
