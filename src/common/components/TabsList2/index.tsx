import { Children, cloneElement, FC, Fragment, ReactElement } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';

interface ITabType {
    leftNode?: JSX.Element;
    onChange: (index: string) => void;
    selectedIndex?: string;
    items: Item[];
}

interface Item {
    key: string;
    title: JSX.Element | string;
    content: JSX.Element;
}

interface ITabButtonType {
    children: JSX.Element;
    key: string;
}

const TabsList2: FC<ITabType> = ({ leftNode, onChange, selectedIndex, items }) => {
    //
    return (
        <div className="w-full h-full flex flex-col">
            <HeadlessTab.Group
                onChange={(index) => onChange(items[index].key)}
                selectedIndex={items && items.findIndex((item) => item.key === selectedIndex)}
            >
                <HeadlessTab.List>
                    <div className="flex justify-between items-center ">
                        <div>
                            {items ? (
                                items.map((item) => (
                                    <TabButton key={item.key}>
                                        <>{item.title}</>
                                    </TabButton>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                        {leftNode}
                    </div>
                </HeadlessTab.List>
                <HeadlessTab.Panels className="grow p-1 bg-L-basic dark:bg-D-basic">
                    {items ? (
                        items.map((item) => (
                            <HeadlessTab.Panel key={item.key} as={Fragment}>
                                <>{item.content}</>
                            </HeadlessTab.Panel>
                        ))
                    ) : (
                        <></>
                    )}
                </HeadlessTab.Panels>
            </HeadlessTab.Group>
        </div>
    );
};

const TabButton: FC<ITabButtonType> = ({ children }) => {
    return (
        <HeadlessTab
            className={({ selected }) =>
                clsx(
                    'border-b-2 py-1 px-3 border-solid outline-none',
                    selected
                        ? ' text-L-primary-50  border-L-primary-50 dark:border-D-primary-50 dark:text-D-primary-50  bg-L-basic dark:bg-D-basic font-semibold'
                        : '   dark:text-D-gray-450 text-L-gray-450  dark:border-t-transparent border-t-transparent   dark:border-D-gray-350 border-L-gray-350 ',
                )
            }
        >
            {({ selected }) => cloneElement(children, { selected })}
        </HeadlessTab>
    );
};

TabButton.displayName = 'TabButton';
HeadlessTab.Panel.displayName = 'TabPanel';

export default TabsList2;
