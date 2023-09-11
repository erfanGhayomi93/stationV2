import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import { findTitlePage } from 'src/utils/helpers';


const AuthLayout = () => {
    const { pathname } = useLocation();


    useEffect(() => {
        findTitlePage(pathname)
    }, [pathname])

    return (
        <div><Outlet /></div>
    )
}


export default AuthLayout

