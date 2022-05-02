import { CircularProgress } from '@mui/material';
import React, { CSSProperties } from 'react';

type LoadingProps = {
    text?: string;
    containerStyle?: CSSProperties;
    loading: boolean;
};

const Loading = (props: LoadingProps) => {
    return (
        <div
            className='loading'
            style={{
                display: props.loading ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 999,
            }}
        >
            <CircularProgress color='success' />
            <span>{props.text}</span>
        </div>
    );
};

export default Loading;
