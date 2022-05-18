import { FC, useEffect, useState } from 'react';
import Forbidden from '../utils/Forbidden';

export interface Props {
    children: React.ReactNode;
}

const PrivateRouteSales: FC<Props> = (props) => {
    const [isLogin, setIsLogin] = useState<string | null>();
    const [role, setRole] = useState<string | null>();
    useEffect(() => {
        setIsLogin(localStorage.getItem('isLogin'));
        setRole(localStorage.getItem('role'));
    }, []);

    return role === 'admin' || role === 'sales' ? (
        <>{props.children} </>
    ) : (
        <Forbidden />
    );
};

export default PrivateRouteSales;
