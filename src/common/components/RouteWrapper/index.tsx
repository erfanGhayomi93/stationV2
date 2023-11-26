import React, { Suspense } from 'react';
import ErrorBoundary from 'src/common/components/ErrorBoundary';
import Loading from '../Loading/Loading';

interface Props {
    children: React.ReactNode;
}

const RouteWrapper: React.FC<Props> = ({ children }) => {


    return (
        <Suspense fallback={<Loading />}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </Suspense>
    );
};

export default RouteWrapper;
