import { useState } from 'react';
import { createContainer } from 'react-tracked';
import CustomerSearch from '..';
import CustomerDetailModal from '../modal/CustomerDetailModal';
interface ICustomerSearchWidgetType {
    params: IGoCustomerRequest;
    detailModalData?: IGoCustomerSearchResult;
    isSelectedActive?: boolean;
}
const useValue = () => useState<ICustomerSearchWidgetType>({ params: { type: 'Customer' } });

export const { Provider: CustomerSearchProvider, useTrackedState, useUpdate: useSetState } = createContainer(useValue);
export const useCustomerSearchState = () => {
    const setState = useSetState();
    const state = useTrackedState();
    return { state, setState };
};
const CustomerSearchWidget = () => {
    return (
        <>
            <CustomerSearchProvider>
                <CustomerSearch />
                <CustomerDetailModal />
            </CustomerSearchProvider>
        </>
    );
};

export default CustomerSearchWidget;
