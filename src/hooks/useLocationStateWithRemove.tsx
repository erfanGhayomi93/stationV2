import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useLocationStateWithRemove = () => {
    //
    const navigate = useNavigate();
    const { state, pathname } = useLocation();

    useEffect(() => {
        navigate(pathname, { state: null, replace: true });
    }, []);

    return { locationState: state as any };
};

export default useLocationStateWithRemove;
