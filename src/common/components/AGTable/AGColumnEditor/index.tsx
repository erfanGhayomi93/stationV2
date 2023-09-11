import { Menu, Transition } from '@headlessui/react';
import { FC, useEffect, useState, useRef, ChangeEvent } from 'react';
import { CheckListIcon, DefalutRefreshIcon, PinIcon } from 'src/common/icons';
import { Column, GridReadyEvent } from 'ag-grid-community';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import clsx from 'clsx';

interface ICheckColumnShowType {
    gridApi: GridReadyEvent | undefined;
    lsKey: string;
}

type ColumnOptionType = {
    label: string;
    id: string;
};

const AGColumnEditor: FC<ICheckColumnShowType> = ({ gridApi, lsKey }) => {
    //
    const fixedColumns = ['agTableIndex', 'agTableAction'];
    const [columnOptions, setColumnOptions] = useState<ColumnOptionType[] | []>([]);
    const [visibleColumns, setVisibleColumns] = useLocalStorage<string[]>(`${lsKey}_visible_columns`, []);
    const [pinnedColumns, setPinnedColumns] = useLocalStorage<string[]>(`${lsKey}_pinned_columns`, []);
    const defaultVisibleColumns = useRef<string[]>([]);
    const defaultPinnedColumns = useRef<string[]>([]);

    const getAllColumns = (columnDefs: Column[]): ColumnOptionType[] => {
        const columns =
            columnDefs
                ?.filter((item) => !fixedColumns.includes(item.getColId()))
                ?.map((col) => ({ label: col.getColDef()?.headerName ?? '', id: col.getColId() })) || [];

        return columns;
    };

    const getVisibleColumns = (columns: Column[]) => {
        return columns?.map((col) => (col.isVisible() ? col.getColId() : '')).filter(Boolean) as string[];
    };

    const getPinnedColumns = (columns: Column[]) => {
        return columns?.map((col) => (col.isPinned() ? col.getColId() : '')).filter(Boolean) as string[];
    };

    const createInitialColumnState = () => {
        const columns = gridApi?.columnApi.getColumns();

        if (columns) {
            defaultVisibleColumns.current = getVisibleColumns(columns);
            defaultPinnedColumns.current = getPinnedColumns(columns);

            setColumnOptions(getAllColumns(columns));
            !visibleColumns?.length && setVisibleColumns(getVisibleColumns(columns));
            !pinnedColumns?.length && setPinnedColumns(getPinnedColumns(columns));

            (visibleColumns?.length || pinnedColumns?.length) && onColumnStateChange();
        }
    };

    const setToDefaultMode = () => {
        setVisibleColumns(defaultVisibleColumns.current);
        setPinnedColumns(defaultPinnedColumns.current);
    };

    const onColumnStateChange = () => {
        if (gridApi) {
            const columnDefs = gridApi.columnApi.getColumnState();

            const changedColumns = () =>
                columnDefs?.map((col, index) => {
                    const pinned: 'left' | 'right' | false = pinnedColumns?.includes(col.colId)
                        ? columnDefs.length / 2 < index
                            ? 'left'
                            : 'right'
                        : false;
                    const hide: boolean = !visibleColumns?.includes(col.colId);

                    return { ...col, hide, pinned };
                });

            gridApi?.columnApi?.applyColumnState({
                state: changedColumns(),
            });
            gridApi.api.sizeColumnsToFit();
        }
    };

    useEffect(() => {
        createInitialColumnState();
    }, [gridApi]);

    useEffect(() => {
        onColumnStateChange();
    }, [visibleColumns, pinnedColumns]);

    const onCheckHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setVisibleColumns([...visibleColumns, id]);
            setTimeout(
                () =>
                    gridApi?.api.flashCells({
                        columns: [id],
                        fadeDelay: 500,
                    }),
                0,
            );
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
                <div className="z-50 flex items-center ">
                    <Menu.Button>
                        <div className="p-[6px] bg-L-gray-300 dark:bg-D-gray-300 rounded mr-6 cursor-pointer">
                            <CheckListIcon className="text-L-gray-600 dark:text-D-gray-600" />
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
                            className="absolute left-0 top-3 mt-2 w-48 origin-top-right divide-y bg-L-basic dark:bg-D-basic divide-gray-100 rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div className="p-1 flex justify-center text-center gap-1 cursor-pointer" onClick={setToDefaultMode}>
                                <DefalutRefreshIcon className="text-L-primary-50 dark:text-D-primary-50 " />
                                <p className="text-L-primary-50 dark:text-D-primary-50 ">حالت پیشفرض</p>
                            </div>

                            <div className="py-2">
                                {columnOptions.map((item: any) => (
                                    <Menu.Item key={item.field}>
                                        <div>
                                            <div
                                                className="px-2 py-[10px] text-xs flex items-center justify-between hover:bg-L-gray-100  dark:hover:bg-D-gray-100"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <label className="flex gap-2 text-D-basic dark:text-L-basic cursor-pointer" htmlFor={item.id}>
                                                    <input
                                                        type="checkbox"
                                                        id={item.id}
                                                        checked={visibleColumns?.includes(item.id)}
                                                        onChange={(e) => onCheckHandler(e, item.id)}
                                                        className="cursor-pointer"
                                                    />
                                                    {item.label}
                                                </label>
                                                <button
                                                    className={clsx('text-L-gray-400 dark:text-D-gray-400', {
                                                        'text-L-warning dark:text-L-warning': pinnedColumns?.includes(item.id),
                                                    })}
                                                    onClick={() => onPinHandler(item.id)}
                                                >
                                                    <PinIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </div>
            )}
        </Menu>
    );
};

export default AGColumnEditor;
