import { useQueryClient } from '@tanstack/react-query';
import { ICellRendererParams } from 'ag-grid-community';
import { FC, KeyboardEvent, useMemo, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { toast } from 'react-toastify';
import { deleteWatchListMutation, sortWatchListMutation, updateWatchListMutation, useWatchlistsQuery } from 'src/app/queries/watchlist';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import { Check, CloseIcon, DeleteIcon, EditIcon2, PlusIcon } from 'src/common/icons';
import { useWatchListState } from '../context/WatchlistContext';
import { useTranslation } from 'react-i18next';
import { AddWatchList } from '../components/AddWatchlist';
import clsx from 'clsx';

type IEditWatchlistModalType = {};

const EditWatchlistModal = ({ }: IEditWatchlistModalType) => {
    const { t } = useTranslation()
    const { setState, state } = useWatchListState();

    const { data: watchlists } = useWatchlistsQuery();

    const [editMode, setEditMode] = useState<IWatchlistRequestType | undefined>();

    const [isShowAdd, setIsShowAdd] = useState(false)

    const queryClient = useQueryClient();

    const [sortWatchlist, setSortWatchlist] = useState<Array<number> | []>([]);

    const { mutate: editWatchlist } = updateWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('دیده‌بان با موفقیت ویرایش شد');
            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });

    const { mutate: sortWatchList } = sortWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('ترتیب نمایش دیدبان ذخیره شد');
            setSortWatchlist([]);
            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });


    const closeModal = () => {
        setState({ type: 'TOGGLE_EDIT_MODE', value: false });
        setEditMode(undefined);
        sortWatchlist.length && sortWatchList(sortWatchlist);
    };

    const handleEditWatchlistName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            setEditMode(undefined);
        }
        if (e.key === 'Enter' && editMode) {
            e.preventDefault();
            e.stopPropagation();

            editWatchListName()
        }
    };

    const editWatchListName = () => {
        if (!editMode) return

        const { id, watchListName } = editMode;
        editWatchlist({ id, watchListName });
        setEditMode(undefined);
    }

    const columns = useMemo((): ColDefType<IWatchlistType>[] => [
        {
            headerName: t("Watchlist.titleColumn"),
            field: 'watchListName',
            cellRenderer: (row: ICellRendererParams<IWatchlistType>) => (
                <ActionName {...{ row, editMode, setEditMode, handleEditWatchlistName }} />
            ),
            rowDrag: true,
            rowDragText: (p) => {
                return p?.rowNode?.data?.watchListName || 'جابجایی';
            },
        },
        {
            headerName: 'عملیات',
            field: 'actions',
            cellRenderer: (row: ICellRendererParams<IWatchlistType>) => <ActionED {...{ row, setEditMode, editMode, editWatchListName }} />,
        },
    ],
        [editMode],
    );

    return (
        <>
            <Modal isOpen={state.editMode} onClose={closeModal} className="min-h-[35rem] w-[500px] rounded-md h-full grid bg-L-basic dark:bg-D-basic translate-y-7">
                <div className="grid grid-rows-min-one-min" data-cy="wl-edit-modal">

                    <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-400 h-10 flex items-center justify-between px-5">
                        <div>{t("Watchlist.management")}</div>
                        <CloseIcon onClick={closeModal} data-cy="wl-edit-modal-close" className="cursor-pointer" />
                    </div>

                    <div className="p-6 text-1.2 border-b border-L-gray-400 dark:border-D-gray-400">
                        <AGTable
                            rowData={watchlists?.filter(item => !item.isDefault)}
                            columnDefs={columns}
                            rowClass="data-cy-row"
                            rowDragManaged={true}
                            animateRows={true}
                            onRowDragEnd={(e) => {
                                let newOrderedList: number[] = [];
                                e.api.forEachNode((node) => {
                                    node?.data && newOrderedList.push(node.data.id);
                                });

                                setSortWatchlist(newOrderedList);
                            }}
                        />
                    </div>

                    <div className={clsx("px-6 py-4 mx-2 text-right", {
                        // "py-6": !isShowAdd,
                        // "pb-4": isShowAdd,
                    })}>

                        <>
                            <div className={clsx("flex items-center cursor-pointer h-full py-2", {
                                "hidden": isShowAdd
                            })} onClick={() => setIsShowAdd(!isShowAdd)}>
                                <div className='bg-L-primary-50 dark:bg-D-gray-400 rounded'>
                                    <PlusIcon className='text-L-basic dark:text-D-basic' />
                                </div>

                                <p className='text-L-primary-50 dark:text-D-primary-50 mr-2'>
                                    {t("Watchlist.addNewWatchlist")}
                                </p>
                            </div>

                            <AddWatchList
                                isAddActive={isShowAdd}
                                setIsAddActive={setIsShowAdd}
                                FromEditMode
                            />
                        </>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditWatchlistModal;
interface IActionName {
    row: ICellRendererParams<IWatchlistType>;
    editMode: IWatchlistRequestType | undefined;
    setEditMode: Dispatch<SetStateAction<IWatchlistRequestType | undefined>>;
    handleEditWatchlistName: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const ActionName: FC<IActionName> = ({ row, editMode, setEditMode, handleEditWatchlistName }) => {
    const { data: watchlist } = row;
    return (
        <div className="w-full h-full">
            {editMode?.id === watchlist?.id ? (
                <input
                    className="w-full h-full text-center border border-L-gray-400 dark:border-D-gray-400 outline-L-primary-50 dark:outline-D-primary-50"
                    value={editMode?.watchListName}
                    onChange={(e) => setEditMode({ id: watchlist?.id as number, watchListName: e.target.value })}
                    onKeyDownCapture={(e) => handleEditWatchlistName(e)}
                    autoFocus={true}
                    data-cy={'wl-edit-input-' + watchlist?.watchListName}
                />
            ) : (
                <span data-cy={'wl-title-' + watchlist?.watchListName}>{watchlist?.watchListName}</span>
            )}
        </div>
    );
};

interface IActionEdit {
    row: ICellRendererParams<IWatchlistType>;
    editMode: IWatchlistRequestType | undefined;
    setEditMode: Dispatch<SetStateAction<IWatchlistRequestType | undefined>>;
    editWatchListName: () => void;
}

const ActionED: FC<IActionEdit> = ({ row, setEditMode, editMode, editWatchListName }) => {
    const queryClient = useQueryClient();

    const { data: watchlist } = row;

    const id = watchlist ? watchlist.id : 0;

    const { mutate: deleteWatchlist } = deleteWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('دیده‌بان با موفقیت حذف شد');
        },
        onError: (err) => {
            toast.error(`${err}`);
        },
    });

    return (
        <div className="h-full flex justify-center items-center gap-4">
            {
                editMode?.id !== id ? (
                    <>
                        <EditIcon2
                            data-cy={'wl-edit-' + watchlist?.watchListName}
                            className="text-L-gray-600 dark:text-gray-text-L-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50 cursor-pointer"
                            onClick={() => setEditMode(watchlist)}
                        />
                        <DeleteIcon
                            data-cy={'wl-delete-' + watchlist?.watchListName}
                            className="text-L-gray-600 dark:text-gray-text-L-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50 cursor-pointer"
                            onClick={() => deleteWatchlist(id)}
                        />
                    </>
                ) : (
                    <>
                        <div className='border-L-success-200 dark:border-L-success-200 border rounded-full p-1'
                            onClick={editWatchListName}
                        >
                            <Check className='text-L-success-200 dark:text-D-success-200' width={8} height={8} />

                        </div>

                        <div className='border-L-error-200 dark:border-L-error-200 border rounded-full p-1'
                            onClick={() => setEditMode(undefined)}
                        >
                            <CloseIcon className='text-L-error-200 dark:text-L-error-200' width={8} height={8} />
                        </div>
                    </>
                )
            }

        </div>
    );
};
