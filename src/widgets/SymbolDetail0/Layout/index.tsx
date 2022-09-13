import React from 'react';
import Text from '../components/Text';
import { useWidgetValues } from '../context';

const Layout = () => {
    //
    const { selectedSymbol } = useWidgetValues();

    return (
        <div>
            Layout
            {selectedSymbol}
            <hr />
            <Text />
        </div>
    );
};

export default Layout;
