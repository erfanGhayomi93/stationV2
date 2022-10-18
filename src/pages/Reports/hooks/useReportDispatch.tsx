import React, { useMemo } from 'react';
import { useReportsDispatch } from '../Context/ReportsContext';

const useReportDispatch = () => {
    const dispatch = useReportsDispatch();
    const setCustomer = (value: ReportCustomer) => dispatch({ type: 'SET_CUSTOMER', value });
    const setSide = (value: ReportSide) => dispatch({ type: 'SET_SIDE', value });
    const setStartDate = (value: ReportStartDate) => dispatch({ type: 'SET_START_DATE', value });
    const setTillDate = (value: ReportStartDate) => dispatch({ type: 'SET_TILL_DATE', value });
    const setStatus = (value: ReportStatus) => dispatch({ type: 'SET_STATUS', value });
    const setSymbol = (value: ReportSymbol) => dispatch({ type: 'SET_SYMBOL', value });

    const memoize = useMemo(() => {
        return {
            setCustomer,
            setSide,
            setStartDate,
            setTillDate,
            setStatus,
            setSymbol,
        };
    }, [dispatch]);

    return memoize;
};

export default useReportDispatch;
