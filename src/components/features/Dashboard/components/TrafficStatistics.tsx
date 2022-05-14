import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { GET_PROVINCES_API } from '../api';
import { Province } from './../../../../types/user/UserDto';

export const TrafficStatistics = () => {
    const [provinces, setProvinces] = useState<Province[]>();
    const [province, setProvince] = useState<Province>();
    const [district, setDistrict] = useState<any>();

    const fetchProvinces = () => {
        axios
            .get(`${GET_PROVINCES_API}/p`)
            .then((res) => {
                if (res.status === 200) {
                    setProvinces(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchDistricts = (code: any) => {
        axios
            .get(`${GET_PROVINCES_API}/p/${code}`, {
                params: { depth: 2 },
            })
            .then((res) => {
                if (res.status === 200) {
                    setProvince(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchWards = (code: any) => {
        axios
            .get(`${GET_PROVINCES_API}/d/${code}`, {
                params: { depth: 2 },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDistrict(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const wardCode = form.get('ward');
        let provinceR = province?.name;
        let districtR = district.name;
        let wardR = district?.wards.find(
            (ward: any) => ward.code == wardCode
        ).name;

        console.log(`${wardR} - ${districtR} - ${provinceR}`);
    };

    return (
        <div className='w-full'>
            <form onSubmit={onSubmit}>
                <FormControl
                    size='small'
                    sx={{ margin: '10px 0', width: '30%' }}
                >
                    <InputLabel id='province'>Tỉnh/Thành</InputLabel>
                    <Select
                        labelId='province'
                        size='small'
                        label='Tỉnh thành'
                        name='province'
                        onChange={(e) => {
                            fetchDistricts(e.target.value);
                        }}
                    >
                        {provinces?.map((province) => (
                            <MenuItem value={province.code} key={province.code}>
                                {province.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl
                    size='small'
                    sx={{ margin: '10px 0', width: '30%' }}
                >
                    <InputLabel id='district'>Quận/huyện</InputLabel>
                    <Select
                        labelId='district'
                        size='small'
                        label='Quận huyện'
                        name='district'
                        onChange={(e) => fetchWards(e.target.value)}
                    >
                        {province &&
                            province.districts &&
                            province.districts.map((district) => (
                                <MenuItem
                                    value={district.code}
                                    key={province.code}
                                >
                                    {district.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl
                    size='small'
                    sx={{ margin: '10px 0', width: '30%' }}
                >
                    <InputLabel id='ward'>Xã/Phường</InputLabel>
                    <Select
                        labelId='ward'
                        size='small'
                        label='Cửa hàng'
                        name='ward'
                    >
                        {district &&
                            district.wards &&
                            district.wards.map((ward: any) => (
                                <MenuItem value={ward.code}>
                                    {ward.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};
