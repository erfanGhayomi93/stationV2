import { Children, cloneElement, FC, Fragment, ReactElement } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';

interface ITabType {
    leftNode?: JSX.Element;
    onChange: (index: string) => void;
    selectedIndex?: string;
    items: ITabItemType[];
    fill?: boolean;
    buttonClass?: string;
    selectedButtonClass?: string;
}

export interface ITabItemType {
    key: string;
    title: JSX.Element | string;
    content: JSX.Element;
    tabClass?: string;
    selectedButtonClass?: string;
}

interface ITabButtonType {
    children: JSX.Element;
    key: string;
    fill?: boolean;
    buttonClass?: string;
    selectedButtonClass?: string;
}

const TabsList: FC<ITabType> = ({ leftNode, onChange, selectedIndex, items, fill, buttonClass, selectedButtonClass }) => {
    //
    return (
        <div className="w-full h-full flex flex-col rounded-md relative  ">
            <HeadlessTab.Group
                onChange={(index) => onChange(items[index].key)}
                selectedIndex={items && items.findIndex((item) => item.key === selectedIndex)}
            >
                <HeadlessTab.List className=" bg-L-basic dark:bg-D-basic border  border-L-gray-350 dark:border-D-gray-350 ">
                    <div className="flex justify-between items-center">
                        <div className="w-full flex">
                            {items ? (
                                items.map((item) => (
                                    <TabButton
                                        selectedButtonClass={selectedButtonClass}
                                        buttonClass={buttonClass}
                                        {...item}
                                        key={item.key}
                                        fill={fill}
                                    >
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
                            <HeadlessTab.Panel
                                key={item.key}
                                className={clsx(
                                    'p-1 h-full ',
                                    item.tabClass
                                        ? item.tabClass
                                        : 'border border-t-0  dark:border-D-gray-350 border-L-gray-350 text-L-gray-500 dark:text-D-gray-500',
                                )}
                            >
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

const TabButton: FC<ITabButtonType> = ({
    children,
    fill,
    buttonClass = 'border-l dark:text-D-gray-450 text-L-gray-450 border-t-2 dark:border-t-transparent border-t-transparent bg-L-gray-150 dark:bg-D-gray-150  dark:border-D-gray-350 border-L-gray-350',
    selectedButtonClass = 'after:dark:bg-D-basic after:bg-L-basic text-L-primary-50 border-t-2 border-L-primary-50 dark:border-D-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic font-semibold  border-l dark:border-l-D-gray-350 border-l-L-gray-350 ',
}) => {
    return (
        <HeadlessTab as={Fragment}>
            {({ selected }) => (
                <div
                    className={clsx(
                        ' py-2 px-5 border-solid outline-none flex items-center justify-center cursor-pointer relative after:-bottom-1 after:w-full after:h-1 after:absolute ',
                        fill ? 'w-full' : '',
                        selected ? selectedButtonClass : buttonClass,
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
