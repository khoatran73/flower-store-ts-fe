import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';

interface Props {
    text?: string;
    route?: string;
    status?: 'success' | 'error' | 'info' | 'warning' | 404 | 403 | 500;
    subTitle?: string;
    title?: string;
    hideBack?: boolean;
}

const Forbidden: React.FC<Props> = (props: Props) => {
    const { text, route, status, subTitle, title, hideBack } = props;
    return (
        <div
            className={'page-body'}
            style={Object.assign({
                background: '#fff',
                height: '100%',
                width: '100%',
                borderRadius: 5,
                padding: 10,
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
            })}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column',
                }}
            >
                <Result
                    status={status || 403}
                    title={title || 'Thông báo'}
                    subTitle={
                        subTitle ||
                        'Xin lỗi, Bạn không được phép truy cập trang này.'
                    }
                    extra={
                        hideBack ? null : (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Link
                                    className='ant-btn ant-btn-primary'
                                    to={'/'}
                                    style={{
                                        fontSize: 16,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {text || 'Trở về trang chủ'}
                                </Link>
                            </div>
                        )
                    }
                />
            </div>
        </div>
    );
};

export default Forbidden;
