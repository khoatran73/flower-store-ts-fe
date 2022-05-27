import React, { useState, useCallback } from 'react';
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import { Grid, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import CellWifiIcon from '@mui/icons-material/CellWifi';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Position {
    lat: number;
    lng: number;
}

const containerStyle = {
    width: '90%',
    height: '100%',
};

const initCenter: Position = {
    lat: 10.7327923,
    lng: 106.6970248,
};

interface IMarker {
    title: string;
    key: string;
    position: Position;
}

export const Store = () => {
    const [center, setCenter] = useState<Position>(initCenter);
    const [isOpenStore1, setIsOpenStore1] = useState<boolean>(false);
    const [isOpenStore2, setIsOpenStore2] = useState<boolean>(false);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCoZxBoO9x-FtNQRYzFMNCRtSnl-9bLlJg',
    });

    const markers: IMarker[] = [
        {
            title: 'Quận 7',
            key: 'store1',
            position: {
                lat: 10.7327923,
                lng: 106.6970248,
            },
        },
        {
            title: 'Quận Thủ Đức',
            key: 'store2',
            position: {
                lat: 10.8508027,
                lng: 106.7678346,
            },
        },
    ];

    return isLoaded ? (
        <div className='w-full h-full p-10'>
            <div className='uppercase text-3xl font-bold mb-8'>
                tìm cửa hàng
            </div>
            <Grid
                container
                spacing={2}
                className='w-full'
                style={{
                    height: '90%',
                    overflow: 'hidden',
                }}
            >
                <Grid item xs={4}>
                    <Paper
                        className='cursor-pointer  p-5'
                        square
                        variant='outlined'
                        onClick={() => {
                            setCenter({
                                lat: 10.7327923,
                                lng: 106.6970248,
                            });
                            // if (!isOpenStore1) {
                            setIsOpenStore1(!isOpenStore1);
                            // }

                            // if (isOpenStore2) {
                            //     setIsOpenStore2(false);
                            // }
                        }}
                    >
                        <div
                            className='uppercase font-semibold text-lg mb-3'
                            style={{ color: '#eb2066' }}
                        >
                            Flower Store Quận 7
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <LocationOnIcon fontSize='small' />
                            <div className='ml-1.5 font-medium'>
                                19 Đ.Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Thành phố
                                Hồ Chí Minh, Việt Nam
                            </div>
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <PhoneIcon fontSize='small' />
                            <div className='ml-1.5 font-medium'>
                                0865 997 531
                            </div>
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <span
                                className='px-1.5 py-0.5 border text-white font-semibold text-xs mr-1'
                                style={{ backgroundColor: '#eb2066' }}
                            >
                                OPEN
                            </span>
                            <span className='text-gray-500 text-xs font-medium'>
                                Mở cửa7:00 – 23:00 * 7 ngày/ tuần
                            </span>
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <CellWifiIcon fontSize='small' />
                            <div className='ml-1.5 font-medium'>
                                Wifi miễn phí
                            </div>
                        </div>
                    </Paper>
                    <Paper
                        className='cursor-pointer  p-5'
                        square
                        variant='outlined'
                        onClick={() => {
                            setCenter({
                                lat: 10.8508027,
                                lng: 106.7678346,
                            });
                            setIsOpenStore2(!isOpenStore2);
                        }}
                    >
                        <div
                            className='uppercase font-semibold text-lg mb-3'
                            style={{ color: '#eb2066' }}
                        >
                            Flower Store Quận Thủ Đức
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <LocationOnIcon fontSize='small' />
                            <div className='ml-1.5 font-medium'>
                                1 Đ. Võ Văn Ngân, Linh Chiểu, Quận Thủ Đức,
                                Thành phố Hồ Chí Minh, Việt Nam
                            </div>
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <PhoneIcon fontSize='small' />
                            <div className='ml-1.5 font-medium'>
                                0977 123 744
                            </div>
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <span
                                className='px-1.5 py-0.5 border text-white font-semibold text-xs mr-1'
                                style={{ backgroundColor: '#eb2066' }}
                            >
                                OPEN
                            </span>
                            <span className='text-gray-500 text-xs font-medium'>
                                Mở cửa7:00 – 23:00 * 7 ngày/ tuần
                            </span>
                        </div>
                        <div className='flex mb-1.5 items-center'>
                            <CellWifiIcon fontSize='small' />
                            <div className='ml-1.5 font-medium'>
                                Wifi miễn phí
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                    >
                        <Marker
                            key='store1'
                            position={{
                                lat: 10.7327923,
                                lng: 106.6970248,
                            }}
                            onClick={() => setIsOpenStore1(!isOpenStore1)}
                            title='Flower Store Quận 7'
                        >
                            {isOpenStore1 && (
                                <InfoWindow
                                    position={{
                                        lat: 10.7327923,
                                        lng: 106.6970248,
                                    }}
                                >
                                    <div className='flex'>
                                        <div className='flex flex-col mr-4'>
                                            <img
                                                className='w-16 object-cover'
                                                src='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1652194759/Flower-store/logo_rubbuh.png'
                                                alt=''
                                            />
                                            <a
                                                href='https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+T%C3%B4n+%C4%90%E1%BB%A9c+Th%E1%BA%AFng/@10.7326742,106.6975809,17z/data=!3m1!4b1!4m5!3m4!1s0x317528b2747a81a3:0x33c1813055acb613!8m2!3d10.7326689!4d106.6997696'
                                                rel='noopener noreferrer'
                                                target='_blank'
                                                className='custom-button my-1.5'
                                            >
                                                Xem chi tiết
                                            </a>
                                            <a
                                                href='https://www.google.com/maps/place/10.7327923,106.6970248'
                                                rel='noopener noreferrer'
                                                target='_blank'
                                                className='custom-button my-1.5'
                                            >
                                                Tìm đường
                                            </a>
                                        </div>
                                        <div>
                                            <div
                                                className='uppercase font-semibold text-lg mb-3'
                                                style={{ color: '#eb2066' }}
                                            >
                                                Flower Store Quận 7
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <LocationOnIcon fontSize='small' />
                                                <div className='ml-1.5 font-medium'>
                                                    19 Đ.Nguyễn Hữu Thọ, Tân
                                                    Hưng, Quận 7, Thành phố Hồ
                                                    Chí Minh, Việt Nam
                                                </div>
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <PhoneIcon fontSize='small' />
                                                <div className='ml-1.5 font-medium'>
                                                    0865 997 531
                                                </div>
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <span
                                                    className='px-1.5 py-0.5 border text-white font-semibold text-xs mr-1'
                                                    style={{
                                                        backgroundColor:
                                                            '#eb2066',
                                                    }}
                                                >
                                                    OPEN
                                                </span>
                                                <span className='text-gray-500 text-xs font-medium'>
                                                    Mở cửa7:00 – 23:00 * 7 ngày/
                                                    tuần
                                                </span>
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <CellWifiIcon fontSize='small' />
                                                <div className='ml-1.5 font-medium'>
                                                    Wifi miễn phí
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                        <Marker
                            key='store2'
                            position={{
                                lat: 10.8508027,
                                lng: 106.7678346,
                            }}
                            onClick={() => setIsOpenStore2(!isOpenStore2)}
                            title='Flower Store Quận Thủ Đức'
                        >
                            {isOpenStore2 && (
                                <InfoWindow
                                    position={{
                                        lat: 10.8508027,
                                        lng: 106.7678346,
                                    }}
                                >
                                    <div className='flex'>
                                        <div className='flex flex-col mr-4'>
                                            <img
                                                className='w-16 object-cover'
                                                src='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1652194759/Flower-store/logo_rubbuh.png'
                                                alt=''
                                            />
                                            <a
                                                href='https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+S%C6%B0+ph%E1%BA%A1m+K%E1%BB%B9+thu%E1%BA%ADt+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh/@10.8507267,106.7697336,17z/data=!3m1!4b1!4m5!3m4!1s0x31752763f23816ab:0x282f711441b6916f!8m2!3d10.8507214!4d106.7719223?hl=vi-VN'
                                                rel='noopener noreferrer'
                                                target='_blank'
                                                className='custom-button my-1.5'
                                            >
                                                Xem chi tiết
                                            </a>
                                            <a
                                                href='https://www.google.com/maps/place/10.8508027,106.7678346'
                                                rel='noopener noreferrer'
                                                target='_blank'
                                                className='custom-button my-1.5'
                                            >
                                                Tìm đường
                                            </a>
                                        </div>
                                        <div>
                                            <div
                                                className='uppercase font-semibold text-lg mb-3'
                                                style={{ color: '#eb2066' }}
                                            >
                                                Flower Store Quận Thủ Đức
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <LocationOnIcon fontSize='small' />
                                                <div className='ml-1.5 font-medium'>
                                                    1 Đ. Võ Văn Ngân, Linh
                                                    Chiểu, Quận Thủ Đức, Thành
                                                    phố Hồ Chí Minh, Việt Nam
                                                </div>
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <PhoneIcon fontSize='small' />
                                                <div className='ml-1.5 font-medium'>
                                                    0977 123 744
                                                </div>
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <span
                                                    className='px-1.5 py-0.5 border text-white font-semibold text-xs mr-1'
                                                    style={{
                                                        backgroundColor:
                                                            '#eb2066',
                                                    }}
                                                >
                                                    OPEN
                                                </span>
                                                <span className='text-gray-500 text-xs font-medium'>
                                                    Mở cửa7:00 – 23:00 * 7 ngày/
                                                    tuần
                                                </span>
                                            </div>
                                            <div className='flex mb-1.5 items-center'>
                                                <CellWifiIcon fontSize='small' />
                                                <div className='ml-1.5 font-medium'>
                                                    Wifi miễn phí
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </Marker>
                    </GoogleMap>
                </Grid>
            </Grid>
        </div>
    ) : (
        <></>
    );
};
