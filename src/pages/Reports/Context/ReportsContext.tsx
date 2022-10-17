import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import Reports from '..';

import { ReportsReducer } from './ReportsReducer';

const initialState: ReportsState = {
    customerISIN: '',
    FromDate: '',
    symbolISIN: '',
    ToDate: '',
};
const useValue = () => useReducer(ReportsReducer, initialState);
export const { Provider: ReportsProvider, useTrackedState: useReportsState, useUpdate: useReportsDispatch } = createContainer(useValue);

const ReportsContext = () => {
    return <Reports />;
};
const ReportsPage = () => {
    return (
        <>
            <ReportsProvider>
                <ReportsContext />
            </ReportsProvider>
        </>
    );
};

export default ReportsPage;
