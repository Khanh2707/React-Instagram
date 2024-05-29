import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import Loading from '~/Components/Loading';
import { AppContext } from '~/Context/AppContext';
import * as http from '~/utils/http';

const ProtectedRoute = ({ children, requiredRole }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(null);
    const [roleHasAccess, setRoleHasAccess] = useState(null);
    
    const location = useLocation();

    const {
        setIdUser,
        setNameUser,
        setAvatar,
        setDescriptionUser,
        setGenderUser,

        setIdAccount,
        setAccount,

        setRoles,
    } = useContext(AppContext)

    useEffect(() => {
        const checkAccess = async () => {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage

            if (!token) {
                setIsLoading(false);
                setHasAccess(false);
                return;
            }
            else {
                setHasAccess(true);
            }

            try {
                const res = await http.get('api/accounts/myAccount')
                setIdUser(res.result.user.idUser)
                setNameUser(res.result.user.name)
                setAvatar(res.result.user.avatar)
                setDescriptionUser(res.result.user.description)
                setGenderUser(res.result.user.gender)

                setIdAccount(res.result.idAccount)
                setAccount(res.result.account)

                setRoles(res.result.roles[0].name)

                if (requiredRole !== undefined) {
                    if (requiredRole !== res.result.roles[0].name) {
                        setRoleHasAccess(false)
                    }
                }
            } catch (error) {

            }

            setIsLoading(false);
        };
        checkAccess();
    }, []);

    if (isLoading) {
        return <Loading />; // Hiển thị khi đang tải
    }

    if (hasAccess === false) {
        return <Navigate to="/login" />; // Chuyển hướng nếu không có quyền truy cập
    }

    if (roleHasAccess === false) {
        if (location.pathname !== '/') {
            return <Navigate to="/" />;
        }
    }
    
    return children;
};

export default ProtectedRoute;