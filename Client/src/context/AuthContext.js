import React, { createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [accountType, setAccountType] = useState('admin')

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, accountType, setAccountType }}>
            {children}
        </AuthContext.Provider>
    );
};