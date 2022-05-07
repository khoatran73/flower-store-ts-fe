import React, { createContext } from 'react';
import { AuthContextDto } from 'src/types/provider/AuthContextDto';

const AuthContext = createContext<AuthContextDto | null>(null);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = (props: Props) => {
    const value: AuthContextDto = {
        isLogin: true,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};
