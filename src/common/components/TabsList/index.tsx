import { Children, cloneElement, FC, Fragment, ReactElement } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';

interface ITabType {
    leftNode?: JSX.Element;
    onChange: (index: string) => void;
    selectedIndex?: string;
    items: ITabItemType[];
    fill?: boolean;
}

export interface ITabItemType {
    key: string;
    title: JSX.Element | string;
    content: JSX.Element;
    backgroundColor?: string;
    borderColor?: string;
}

interface ITabButtonType {
    children: JSX.Element;
    key: string;
    fill?: boolean;
    backgroundColor?: string;
    borderColor?: string;
}

const TabsList: FC<ITabType> = ({ leftNode, onChange, selectedIndex, items, fill }) => {
    //
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <HeadlessTab.Group
                onChange={(index) => onChange(items[index].key)}
                selectedIndex={items && items.findIndex((item) => item.key === selectedIndex)}
            >
                <HeadlessTab.List className=" bg-[#BFDBF7] ">
                    <div className="flex justify-between items-center">
                        <div className="w-full flex">
                            {items ? (
                                items.map((item) => (
                                    <TabButton {...item} key={item.key} fill={fill}>
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
                <HeadlessTab.Panels className="grow bg-white ">
                    {items ? (
                        items.map((item) => (
                            <HeadlessTab.Panel key={item.key} className="p-1 h-full" style={{ backgroundColor: item.backgroundColor }}>
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

const TabButton: FC<ITabButtonType> = ({ children, fill, backgroundColor = '#FFFFFF', borderColor = '#135CA4' }) => {
    return (
        <HeadlessTab as={Fragment}>
            {({ selected }) => (
                <div
                    style={selected ? { backgroundColor: backgroundColor, borderColor: borderColor, color: borderColor } : {}}
                    className={clsx(
                        'border-t-2 py-2 px-5 border-solid outline-none flex items-center justify-center cursor-pointer ',
                        fill ? 'w-full' : '',
                        selected ? ' text-[#135CA4] border-[#135CA4] bg-white font-semibold' : ' border-transparent text-[#333333]',
                    )}
                >
                    {cloneElement(children, { selected })}
                </div>
            )}
        </HeadlessTab>
    );
};

TabButton.displayName = 'TabButton';
HeadlessTab.Panel.displayName = 'TabPanel';

export default TabsList;
