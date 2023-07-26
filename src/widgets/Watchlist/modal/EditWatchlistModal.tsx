import { useQueryClient } from '@tanstack/react-query';
import { ICellRendererParams } from 'ag-grid-community';
import { FC, KeyboardEvent, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteWatchListMutation, sortWatchListMutation, updateWatchListMutation, useWatchListsQuery } from 'src/app/queries/watchlist';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import { CloseIcon, DeleteIcon, EditIcon2 } from 'src/common/icons';
import { useWatchListState } from '../context/WatchlistContext';

type IEditWatchlistModalType = {};

const EditWatchlistModal = ({}: IEditWatchlistModalType) => {
    const { setState, state } = useWatchListState();
    const { data: watchlists } = useWatchListsQuery();
    const [editMode, setEditMode] = useState();
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

            const { id, watchListName: watchlistName, isPinned } = editMode;
            editWatchlist({ id, watchlistName, isPinned });
            setEditMode(undefined);
        }
    };

    const columns = useMemo(
        (): ColDefType<IWatchlistType>[] => [
            {
                headerName: 'عنوان دیده‌بان',
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
                headerName: 'نمایش',
                field: 'show',
                cellRenderer: (row: ICellRendererParams<IWatchlistType>) => <ActionShow {...{ row, editWatchlist }} />,
            },
            {
                headerName: 'عملیات',
                field: 'actions',
                cellRenderer: (row: ICellRendererParams<IWatchlistType>) => <ActionED {...{ row, setEditMode }} />,
            },
        ],
        [editMode],
    );

    return (
        <>
            <Modal isOpen={state.editMode} onClose={closeModal} className="min-h-[25rem] w-[500px] rounded-md h-full grid ">
                <div className="grid grid-rows-min-one" data-cy="wl-edit-modal">
                    <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-400 h-10 flex items-center justify-between px-5">
                        <div>ویرایش گروه‌های دیده‌بان</div>
                        <CloseIcon onClick={closeModal} data-cy="wl-edit-modal-close" className="cursor-pointer" />
                    </div>
                    <div className="p-4 text-1.2">
                        <AGTable
                            rowData={watchlists}
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
                </div>
            </Modal>
        </>
    );
};

export default EditWatchlistModal;
interface IActionName {
    row: ICellRendererParams<IWatchlistType>;
    editMode: IWatchlistType | undefined;
    setEditMode: any;
    handleEditWatchlistName: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const ActionName: FC<IActionName> = ({ row, editMode, setEditMode, handleEditWatchlistName }) => {
    const { data: watchlist } = row;
    return (
        <div className="w-full h-full">
            {editMode?.id === watchlist?.id ? (
                <input
                    className="w-full h-full text-center border border-L-gray-400 outline-L-primary-50"
                    value={editMode?.watchListName}
                    onChange={(e) => setEditMode({ ...editMode, watchListName: e.target.value })}
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

const ActionShow: FC<{ row: ICellRendererParams<IWatchlistType>; editWatchlist: any }> = ({ row, editWatchlist }) => {
    const { data: watchlist } = row;

    return (
        <div className="w-full h-full flex items-center justify-center">
            {/* <Switcher
                onCheck={(value: boolean) => editWatchlist({ id: watchlist?.id, isPinned: value, watchlistName: watchlist?.watchListName })}
                value={watchlist?.isPinned}
            /> */}
            <input
                data-cy="wl-edit-check"
                className="w-[16px] h-[16px] cursor-pointer"
                type={'checkbox'}
                checked={watchlist?.isPinned}
                onChange={(e) => editWatchlist({ id: watchlist?.id, isPinned: e.target.checked, watchlistName: watchlist?.watchListName })}
            />
        </div>
    );
};

const ActionED: FC<{ row: ICellRendererParams<IWatchlistType>; setEditMode: any }> = ({ row, setEditMode }) => {
    const queryClient = useQueryClient();
    const { data: watchlist } = row;
    const id = watchlist ? watchlist.id : 0;
    const { mutate: deleteWatchlist } = deleteWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('دیده‌بان با موفقیت حذف شد');
            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });

    return (
        <div className="w-full h-full flex justify-center items-center">
            {/* <LockIcon />
            <LockIcon /> */}
            <EditIcon2
                data-cy={'wl-edit-' + watchlist?.watchListName}
                className="text-L-primary-50 dark:text-D-primary-50 cursor-pointer"
                onClick={() => setEditMode(watchlist)}
            />
            <DeleteIcon
                data-cy={'wl-delete-' + watchlist?.watchListName}
                className="text-L-primary-50 dark:text-D-primary-50 cursor-pointer"
                onClick={() => deleteWatchlist(id)}
            />
        </div>
    );
};
