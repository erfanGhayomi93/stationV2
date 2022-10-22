import dayjs from 'dayjs';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import Reports from '..';

import { ReportsReducer } from './ReportsReducer';

const initialState: ReportsState = {
    customerISIN: '',
    FromDate: dayjs().add(-7, 'day').format('YYYY-MM-DDT00:00:00'),
    symbolISIN: '',
    ToDate: dayjs().format('YYYY-MM-DDT11:59:59'),
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
