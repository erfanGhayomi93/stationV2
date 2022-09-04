import React from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';

const Requests = () => {
    //
    const appDispatch = useAppDispatch();

    return (
        <div>
            <button onClick={() => appDispatch(setSelectedSymbol('IRO1MNSR0001'))}>sdf</button>
        </div>
    );
};

export default Requests;
