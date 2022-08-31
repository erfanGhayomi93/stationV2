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

const Tab: FC<ITabType> = ({ leftNode, onChange, selectedIndex, items }) => {
    return (
        <HeadlessTab.Group
            onChange={(index) => onChange(items[index].key)}
            selectedIndex={items && items.findIndex((item) => item.key === selectedIndex)}
        >
            <HeadlessTab.List className=" bg-[#BFDBF7]">
                <div className="flex justify-between items-center">
                    <div>
                        {items ? (
                            items.map((item) => (
                                <TabButton key="1">
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
            <HeadlessTab.Panels className="grow p-1 bg-white">
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
    );
};

const TabButton: FC<ITabButtonType> = ({ children }) => {
    return (
        <HeadlessTab
            className={({ selected }) =>
                clsx(
                    'border-t-2 py-2 px-5 border-solid outline-none',
                    selected ? ' text-[#135CA4] border-[#135CA4] bg-white font-semibold' : ' border-transparent text-[#333333]',
                )
            }
        >
            {({ selected }) => cloneElement(children, { selected })}
        </HeadlessTab>
    );
};

TabButton.displayName = 'TabButton';
HeadlessTab.Panel.displayName = 'TabPanel';

// export const Tab = { Wrapper: TabWrapper, Button: TabButton, Panel: HeadlessTab.Panel };
export default Tab;
