import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '1200px',
    height: '1200px',
};

const center = {
    lat: 10.7327923,
    lng: 106.6970248,
};

export const Store = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCoZxBoO9x-FtNQRYzFMNCRtSnl-9bLlJg',
    });
    const [map, setMap] = useState<any>(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={{ lat: 10.7327923, lng: 106.6970248 }}></Marker>
        </GoogleMap>
    ) : (
        <></>
    );
};
