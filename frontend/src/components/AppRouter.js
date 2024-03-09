import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthContext } from "../auth/authContext";
import { SocketProvider } from '../context/SocketContext';
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Page404 from "../pages/Page404";

const PrivateRoute = ({children}) => {

    const { user } = useContext(AuthContext);

    return (
        <>
            {user.logged
            ? children
            : <Navigate to="/login" />            
            }
        </>
    )
}

const PublicRoute = ({children}) => {

    const { user } = useContext(AuthContext);

    return (
        <>
            {!user.logged
            ? children
            : <Navigate to="/" />            
            }
        </>
    )
}

export const AppRouter = () => {
    return(

            <div>

                    <Routes>
                        <Route path="/login/*" element={
                            <PublicRoute>
                                <Routes>
                                    <Route path="/" element={ <LoginPage /> } />
                                </Routes>
                            </PublicRoute>
                        } />   

                        <Route path="/register/*" element={
                            <PublicRoute>
                                <Routes>
                                    <Route path="/" element={ <RegisterPage /> } />
                                </Routes>
                            </PublicRoute>
                        } />    
                        
                        <Route path="/*" element={
                            <PrivateRoute>
                                <SocketProvider>
                                    <Routes>
                                        <Route path="/" element={ <HomePage /> } />
                                        <Route path="*" element={<Page404 />} />
                                    </Routes>
                                </SocketProvider>
                            </PrivateRoute>
                        }
                        />
                        
                        {/*<Route exact path="/" element={ <HomePage /> } />*/}
                        
                    </Routes>

            </div>
    );
}