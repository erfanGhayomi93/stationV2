import React, { Suspense, useEffect } from 'react';
import ErrorBoundary from 'src/common/components/ErrorBoundary';
import { useLocation } from 'react-router-dom';
import { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES } from 'src/api/appRoutes';

interface Props {
    children: React.ReactNode;
}

const RouteWrapper: React.FC<Props> = ({ children }) => {
    //
    const { pathname } = useLocation();

    useEffect(() => {
        //
        let documentNewTitle = '';
        const targetRoute = [...AUTHORIZED_ROUTES, ...UN_AUTHORIZED_ROUTES].find(
            (route) => String(route.path).toLowerCase() === String(pathname).toLowerCase(),
        );
        documentNewTitle = `${targetRoute?.pageTitle || '404'} - آنلاین گروهی `;

        document.title = documentNewTitle;
    }, [pathname]);

    return (
        <Suspense fallback={<>در حال دریافت اطلاعات صفحه...</>}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
    );
};

export default RouteWrapper;
