import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
    url: string;
}

export function useGetApi(config: Props) {
    const [result, setResult] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios
            .get(config.url)
            .then((res) => {
                if (res.data.success) setResult(res.data.result);
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
