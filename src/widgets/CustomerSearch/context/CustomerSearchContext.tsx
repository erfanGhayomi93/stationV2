import { useState } from 'react';
import { createContainer } from 'react-tracked';
import CustomerDetailModal from '../modal/CustomerDetailModal';
import CustomerPortfolioModal from '../modal/CustomerPortfolioModal';
import CustomerWidget from "./../index"

interface ICustomerSearchWidgetType {
    params: IGoCustomerRequest;
    detailModalData?: IGoMultiCustomerType;
    isSelectedActive?: boolean;
    isDetailModalOpen?: boolean;
    isPortfolioModalOpen?: boolean;
    activeTab  : string
}
const useValue = () => useState<ICustomerSearchWidgetType>({ params: { term: "" } , activeTab : "Customers" });

export const { Provider: CustomerSearchProvider, useTrackedState, useUpdate: useSetState } = createContainer(useValue);
export const useCustomerSearchState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};
const CustomerSearchContext = () => {
    return (
        <CustomerSearchProvider>
            <CustomerWidget />

            <CustomerDetailModal />
            <CustomerPortfolioModal />
        </CustomerSearchProvider>
    );
};

export default CustomerSearchContext;
