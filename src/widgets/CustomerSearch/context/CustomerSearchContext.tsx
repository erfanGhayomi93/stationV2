import { useState } from 'react';
import { createContainer } from 'react-tracked';
import CustomerSearch from '..';
import CustomerDetailModal from '../modal/CustomerDetailModal';
import CustomerPortfolioModal from '../modal/CustomerPortfolioModal';
interface ICustomerSearchWidgetType {
    params: IGoCustomerRequest;
    detailModalData?: IGoMultiCustomerType;
    isSelectedActive?: boolean;
    isDetailModalOpen?:boolean;
    isPortfolioModalOpen?:boolean;
}
const useValue = () => useState<ICustomerSearchWidgetType>({ params: {} });

export const { Provider: CustomerSearchProvider, useTrackedState, useUpdate: useSetState } = createContainer(useValue);
export const useCustomerSearchState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};
const CustomerSearchWidget = () => {
    return (
        <>
            <CustomerSearch />
            <CustomerDetailModal />
            <CustomerPortfolioModal />
        </>
    );
};

export default CustomerSearchWidget;
