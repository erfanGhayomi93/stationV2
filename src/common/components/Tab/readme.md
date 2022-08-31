<!-- import React, { useState } from 'react';
import Tab from 'src/common/components/Tab';
import { GearIcon } from 'src/common/icons';

const Example = () => {
    const [index, setIndex] = useState('tab1');
    const items = [
        {
            key: 'tab1',
            title: <>تب 1</>,
            content: <>تب 1</>,
        },
        {
            key: 'tab2',
            title: <>تب 2</>,
            content: <>تب 2</>,
        },
        {
            key: 'tab3',
            title: <>تب 3</>,
            content: <>تب 3</>,
        },
        {
            key: 'tab4',
            title: <>تب 4</>,
            content: <>تب 4</>,
        },
    ];
    const Node = (
        <div className="px-2">
            <GearIcon />
        </div>
    );
    return (
        <div>
            <div className="w-1/2 bg-white">
                <button onClick={() => setIndex('tab2')}>set 2</button>
                <Tab leftNode={Node} onChange={(idx) => setIndex(idx)} selectedIndex={index} items={items} />
            </div>
        </div>
    );
};

export default Example; -->
