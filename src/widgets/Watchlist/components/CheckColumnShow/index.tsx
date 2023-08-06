import { Menu, Transition } from '@headlessui/react';
import { FC, useRef } from 'react';
import { ColDefType } from 'src/common/components/AGTable';
import { CheckListIcon, DefalutRefreshIcon } from 'src/common/icons';
import { useSetState, useWatchListState } from '../../context/WatchlistContext';

interface ICheckColumnShowType {
    columns: ColDefType<ISymbolType>[];
}

const CheckColumnShow: FC<ICheckColumnShowType> = ({ columns }) => {
    const {
        state: { listShowColumn },
    } = useWatchListState();
    const setState = useSetState();

    const setDefaultColumn = () => {
        setState({ type: 'CHANGE_IS_SHOW_COLUMN', value: columns.filter((item) => item.hasOwnProperty('hide')).map((item: any) => item?.field) });
    };

    return (
        <Menu>
            {({ open }) => (
                <div className="z-50 flex items-center">
                    <Menu.Button>
                        <div className="p-[6px] border border-L-gray-400 dark:border-D-gray-400 rounded mr-6 cursor-pointer">
                            <CheckListIcon className="text-L-primary-50 dark:text-D-primary-50" />
                        </div>
                    </Menu.Button>

                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                        className="z-[1000]"
                    >
                        <Menu.Items className="absolute left-0 top-3 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="p-1 flex justify-center text-center gap-1 cursor-pointer" onClick={setDefaultColumn}>
                                <DefalutRefreshIcon className="text-L-primary-50 dark:text-D-primary-50 " />
                                <p className="text-L-primary-50 dark:text-D-primary-50 ">حالت پیشفرض</p>
                            </div>

                            <div className="py-2">
                                {columns
                                    .filter((item) => item.hasOwnProperty('hide'))
                                    .map((item, ind) => (
                                        <Menu.Item key={ind}>{({ active }) => <Item {...{ item, listShowColumn }} />}</Menu.Item>
                                    ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </div>
            )}
        </Menu>
    );
};

export default CheckColumnShow;

type Item = {
    item: ColDefType<ISymbolType>;
    listShowColumn: string[];
};

const Item: FC<Item> = ({ item, listShowColumn }) => {
    const setState = useSetState();
    const InputRef = useRef<HTMLInputElement>(null);

    const handleChangeCheckbox = (checked: boolean, field: string): void => {
        if (checked) setState({ type: 'CHANGE_IS_SHOW_COLUMN', value: [...listShowColumn, field] });
        else setState({ type: 'CHANGE_IS_SHOW_COLUMN', value: listShowColumn.filter((item) => item !== field) });
    };

    return (
        <div className="flex items-center py-2 px-3" onClick={(e) => e.preventDefault()}>
            <input
                data-cy="wl-edit-check"
                className="w-[16px] h-[16px] cursor-pointer"
                type={'checkbox'}
                checked={item.field ? listShowColumn.includes(item.field) : false}
                onChange={(e) => (item.field ? handleChangeCheckbox(e.target.checked, item?.field) : null)}
                id={item.field}
                ref={InputRef}
            />

            <label
                onClick={() => {
                    InputRef.current && InputRef.current.click();
                }}
                htmlFor={item.field}
                className={`pr-2 cursor-pointer`}
            >
                {item.headerName}
            </label>
        </div>
    );
};
