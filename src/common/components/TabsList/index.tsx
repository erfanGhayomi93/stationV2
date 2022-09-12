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
        <div className="w-full h-full flex flex-col ">
            <HeadlessTab.Group
                onChange={(index) => onChange(items[index].key)}
                selectedIndex={items && items.findIndex((item) => item.key === selectedIndex)}
            >
                <HeadlessTab.List className=" bg-L-basic dark:bg-D-basic border  border-L-gray-350 dark:border-D-gray-350 ">
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
                <HeadlessTab.Panels className="grow bg-L-basic dark:bg-D-basic ">
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

const TabButton: FC<ITabButtonType> = ({ children, fill, backgroundColor, borderColor }) => {
    return (
        <HeadlessTab as={Fragment}>
            {({ selected }) => (
                <div
                    style={selected ? { backgroundColor: backgroundColor, borderColor: borderColor, color: borderColor } : {}}
                    className={clsx(
                        ' py-2 px-5 border-solid outline-none flex items-center justify-center cursor-pointer ',
                        fill ? 'w-full' : '',
                        selected
                            ? ' text-L-primary-50 border-t-2 border-L-primary-50 dark:border-D-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic font-semibold  border-l dark:border-l-D-gray-350 border-l-L-gray-350 relative after:-bottom-1 after:w-full after:h-1 after:absolute after:dark:bg-D-basic after:bg-L-basic'
                            : ' border-l  dark:text-D-gray-450 text-L-gray-450 border-t-2 dark:border-t-transparent border-t-transparent bg-L-gray-150 dark:bg-D-gray-150  dark:border-D-gray-350 border-L-gray-350 ',
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
