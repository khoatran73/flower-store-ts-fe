// @flow
import { Button, Result } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Result
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
            }}
            status='404'
            title='404'
            subTitle={'404 - Trang không tồn tại'}
            extra={[
                <Button
                    key='primary'
                    type='primary'
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    {'Trở về trang chủ'}
                </Button>,
                <Button key='ghost' type='ghost' onClick={() => navigate(-1)}>
                    {'Trở về trang trước đó'}
                </Button>,
            ]}
        />
    );
};
