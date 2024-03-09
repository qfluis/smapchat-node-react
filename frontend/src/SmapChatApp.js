import React, { useEffect, useReducer } from 'react';
import { AppRouter } from './components/AppRouter';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('user')) || { logged: false};
}

export const SmapChatApp = () => {
    
    const [ user, dispatch ] = useReducer( authReducer, {}, init );
    useEffect(()=>{
        if (!user) return;
        localStorage.setItem('user', JSON.stringify(user));
    },[user]);
        
    return (  
        <>  
            <AuthContext.Provider value={{
                    user,
                    dispatch
            }}>
                <div className="app-container">
                <NavBar />
                <AppRouter />
                <Footer />
                </div>
            </AuthContext.Provider>  
        </>
    );
}