import { useState } from 'react';
import { createContainer } from 'react-tracked';
import { initialFilterState } from './constants';

const filterState = () =>
    useState(initialFilterState);

const container = createContainer(filterState);

export const { Provider: ProviderFilterState, useTrackedState: useFilterState, useUpdate: useFilterStateDispatch } = container;
