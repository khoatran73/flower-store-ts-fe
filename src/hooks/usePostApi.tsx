import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
    url: string;
    params: any;
}

export function usePostApi(config: Props) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios
            .post(config.url, config.params)
            .then((res) => {
                if (res.data.success) setResult(res.data.result);
                console.log(res);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { result: result, error, loading };
}
