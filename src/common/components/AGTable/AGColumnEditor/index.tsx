import { Menu, Transition } from '@headlessui/react';
import { FC, useEffect, useState, useRef, ChangeEvent } from 'react';
import { CheckListIcon, DefalutRefreshIcon, PinIcon } from 'src/common/icons';
import { Column, GridApi } from 'ag-grid-community';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import clsx from 'clsx';

interface IAGColumnEditorType {
    gridApi: GridApi | undefined;
    lsKey: string;
}

type ColumnOptionType = {
    label: string;
    id: string;
};

const AGColumnEditor: FC<IAGColumnEditorType> = ({ gridApi, lsKey }) => {
    //
    const [columnOptions, setColumnOptions] = useState<ColumnOptionType[] | []>([]);
    const [visibleColumns, setVisibleColumns] = useLocalStorage<string[]>(`${lsKey}_visible_columns`, []);
    const [pinnedColumns, setPinnedColumns] = useLocalStorage<string[]>(`${lsKey}_pinned_columns`, []);
    const defaultVisibleColumns = useRef<string[]>([]);
    const defaultPinnedColumns = useRef<string[]>([]);
    const minColLimit = useRef<number>(0);

    const getAllColumns = (columnDefs: Column[]): ColumnOptionType[] => {
        const columns =
            columnDefs
                ?.filter((col) => !col.getColDef().lockVisible)
                ?.map((col) => ({ label: col.getColDef()?.headerName ?? '', id: col.getColId() })) || [];

        return columns;
    };

    const getVisibleColumns = (columns: Column[]) => {
        return columns?.map((col) => (col.isVisible() ? col.getColId() : '')).filter(Boolean);
    };

    const getPinnedColumns = (columns: Column[]) => {
        return columns?.map((col) => (col.isPinned() ? col.getColId() : '')).filter(Boolean);
    };

    const createInitialColumnState = () => {
        try {
            const columns = gridApi?.getColumns();

            if (columns) {
                defaultVisibleColumns.current = getVisibleColumns(columns);
                defaultPinnedColumns.current = getPinnedColumns(columns);
                minColLimit.current = (columns?.filter((col) => col.getColDef().lockVisible).length || 0) + 1;

                setColumnOptions(getAllColumns(columns));
                !visibleColumns?.length && setVisibleColumns(getVisibleColumns(columns));
                !pinnedColumns?.length && setPinnedColumns(getPinnedColumns(columns));

                (visibleColumns?.length || pinnedColumns?.length) && onColumnStateChange();
            }
        }
        catch {}
    };

    const setToDefaultMode = () => {
        setVisibleColumns(defaultVisibleColumns.current);
        setPinnedColumns(defaultPinnedColumns.current);
    };

    const onColumnStateChange = () => {
        try {
            if (gridApi) {
                const columnDefs = gridApi.getColumnState();

                const changedColumns = () =>
                    columnDefs?.map((col, index) => {
                        const isPinnedColumn = pinnedColumns?.includes(col.colId);
                        const leftOrRightPinned = columnDefs.length / 2 < index ? 'left' : 'right';
                        const pinned: 'left' | 'right' | boolean = isPinnedColumn ? leftOrRightPinned : false;
                        const hide: boolean = !visibleColumns?.includes(col.colId);

                        return { ...col, hide, pinned };
                    });

                gridApi?.applyColumnState({
                    state: changedColumns(),
                });
                gridApi.sizeColumnsToFit()
            }
        }
        catch { }
    };

    useEffect(() => {
        if (gridApi) {
            createInitialColumnState();
        }
    }, [gridApi]);

    useEffect(() => {
        return () => {
            if (gridApi && gridApi?.isDestroyed()) {
                gridApi.destroy();
            }
        }
    }, [gridApi, lsKey])


    useEffect(() => {
        onColumnStateChange();
    }, [visibleColumns, pinnedColumns]);

    const onCheckHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setVisibleColumns([...visibleColumns, id]);
        } else setVisibleColumns(visibleColumns.filter((colId) => colId !== id));
    };

    const onPinHandler = (id: string) => {
        if (pinnedColumns?.length && !pinnedColumns.includes(id)) {
            setPinnedColumns([...pinnedColumns, id]);
            setVisibleColumns([...visibleColumns, id]);
        } else setPinnedColumns(pinnedColumns?.filter((colId) => colId !== id));
    };

    return (
        <Menu>
            {({ open }) => (
                <div className="z-50 flex items-center relative">
                    <Menu.Button>
                        <div className="p-1.5 bg-L-gray-300 dark:bg-D-gray-300 rounded cursor-pointer">
                            <CheckListIcon className="w-6 h-6 text-L-gray-600 dark:text-D-gray-600" />
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
                        <Menu.Items
                            static={true}
                            className="absolute left-0 top-4 mt-2 w-48 origin-top-right divide-y bg-L-basic dark:bg-D-basic divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-96"
                        >
                            <div className="p-1 flex justify-center text-center gap-1 cursor-pointer" onClick={setToDefaultMode}>
                                <DefalutRefreshIcon className="text-L-primary-50 dark:text-D-primary-50 " />
                                <p className="text-L-primary-50 dark:text-D-primary-50 ">حالت پیشفرض</p>
                            </div>

                            <div className="py-2">
                                {columnOptions.map((item) => {
                                    const checked = visibleColumns?.includes(item.id);
                                    return (
                                        <Menu.Item key={item.id}>
                                            <div>
                                                <div
                                                    className="px-2 py-[10px] text-xs flex items-center justify-between hover:bg-L-gray-100  dark:hover:bg-D-gray-100"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <label
                                                        className="flex items-center gap-2 text-D-basic dark:text-L-basic cursor-pointer"
                                                        htmlFor={item.id}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={item.id}
                                                            checked={checked}
                                                            onChange={(e) => onCheckHandler(e, item.id)}
                                                            className="cursor-pointer w-3.5 h-3.5"
                                                            disabled={visibleColumns.length === minColLimit.current && checked}
                                                        />
                                                        {item.label}
                                                    </label>
                                                    <button
                                                        className={clsx('text-L-gray-400 dark:text-D-gray-400', {
                                                            'text-L-warning dark:text-L-warning': pinnedColumns?.includes(item.id),
                                                        })}
                                                        onClick={() => onPinHandler(item.id)}
                                                    >
                                                        <PinIcon className="w-3 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </Menu.Item>
                                    );
                                })}
                            </div>
                        </Menu.Items>
                    </Transition>
                </div>
            )}
        </Menu>
    );
};

export default AGColumnEditor;
