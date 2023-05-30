import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import BasketPage from '../../basket';

import { BasketReducer } from './BasketReducer';

const initialState: BasketState = {
    visible: false,
};
const useValue = () => useReducer(BasketReducer, initialState);
export const { Provider: BasketProvider, useTrackedState: useBasketState, useUpdate: useBasketDispatch } = createContainer(useValue);

const Basket = () => (
    <BasketProvider>
        <BasketPage />
    </BasketProvider>
);

export default Basket;
