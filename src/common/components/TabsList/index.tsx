import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';
import { cloneElement, FC, Fragment } from 'react';

interface ITabType {
    leftNode?: JSX.Element;
    onChange: (index: string) => void;
    selectedIndex?: string;
    items: ITabItemType[];
    fill?: boolean;
    buttonClass?: string;
    selectedButtonClass?: string;
    pannelClassName?: string;
    className?: string;
    tabListClassName?: string;
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

const TabsList: FC<ITabType> = ({
    leftNode,
    onChange,
    selectedIndex,
    items,
    fill,
    tabListClassName = 'bg-L-gray-200 dark:bg-D-basic relative z-[0] rounded-md',
    buttonClass,
    selectedButtonClass,
    pannelClassName = 'grow bg-L-basic dark:bg-D-basic outline-none rounded-md',
    className = 'w-full h-full flex flex-col relative overflow-hidden text-1.2 border border-L-gray-400 dark:border-gray-400 rounded-md',
}) => {
    //
    return (
        <div className={className}>
            <HeadlessTab.Group
                onChange={(index) => onChange(items[index].key)}
                selectedIndex={items && items.findIndex((item) => item.key === selectedIndex)}
            >
                <HeadlessTab.List className={tabListClassName}>
                    <div className="flex justify-between items-center overflow-x-auto overflow-y-hidden">
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
                                        <span className="whitespace-nowrap">{item.title}</span>
                                    </TabButton>
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                        {leftNode}
                    </div>
                    {/* <hr className="h-[1px] border-L-gray-400 dark:border-D-gray-400 absolute -z-[1] bottom-0 w-full" /> */}
                </HeadlessTab.List>
                <HeadlessTab.Panels className={pannelClassName}>
                    {items ? (
                        items.map((item) => (
                            <HeadlessTab.Panel
                                key={item.key}
                                className={clsx(
                                    'p-1 h-full ',
                                    item.tabClass
                                        ? item.tabClass
                                        : 'text-L-gray-500 dark:text-D-gray-700 outline-none ',
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
    buttonClass = 'dark:text-D-gray-500 text-L-gray-500 bg-L-gray-200 dark:bg-D-gray-200',
    selectedButtonClass = 'after:dark:bg-D-basic after:bg-L-basic text-L-primary-50 border-t-2 border-L-primary-50 dark:border-D-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic font-semibold ',
}) => {
    return (
        <HeadlessTab as={Fragment}>
            {({ selected }) => (
                <div
                    className={clsx(
                        ' py-2 px-4 border-solid outline-none flex items-center justify-center cursor-pointer relative after:-bottom-1 after:w-full after:h-1 after:absolute',
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
