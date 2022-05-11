import { CircularProgress } from '@mui/material';
import React, { CSSProperties } from 'react';
// import { ReactComponent as SpiralLoading } from 'https://res.cloudinary.com/dqrkqvtjg/image/upload/v1652262545/Flower-store/spiral_mundrf.svg';

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
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 'calc(50% + 24px)',
                left: 'calc(50% + 24px)',
                zIndex: 999,
            }}
        >
            {/* <CircularProgress color='success' /> */}
            {/* <SpiralLoading /> */}
            <img
                src='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1652262545/Flower-store/spiral_mundrf.svg'
                alt=''
                className='w-12 h-12 object-cover'
            />
            <span>{props.text}</span>
        </div>
    );
};

export default Loading;
