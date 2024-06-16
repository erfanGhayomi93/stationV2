import { useState } from 'react';
import { createContainer } from 'react-tracked';
import CustomerWidget from "./../index"

interface ICustomerSearchWidgetType {
    params: IGoCustomerRequest;
    detailModalData?: IGoMultiCustomerType;
    isSelectedActive?: boolean;
    isDetailModalOpen?: boolean;
    isPortfolioModalOpen?: boolean;
    isManagementMyGroupOpen?: boolean;
    detailsManagementGroup?: IGoMultiCustomerType[];
    activeTab: string
}


const useValue = () => useState<ICustomerSearchWidgetType>({ params: { term: "" }, activeTab: "Customers" });


export const { Provider: CustomerSearchProvider, useTrackedState, useUpdate: useSetState } = createContainer(useValue);


export const useCustomerSearchState = () => {
    //
    const setState = useSetState();

    const state = useTrackedState();

    return { state, setState };
};


const CustomerSearchContext = () => {
    //
    return (
        <CustomerSearchProvider>
            <CustomerWidget />
        </CustomerSearchProvider>
    );
};

export default CustomerSearchContext;
