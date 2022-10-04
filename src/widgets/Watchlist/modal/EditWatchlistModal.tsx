import { deleteWatchListMutation, updateWatchListMutation, useWatchListsQuery } from 'src/app/queries/watchlist';
import Modal from 'src/common/components/Modal';
import { CloseIcon, DeleteIcon, EditIcon2, GearIcon } from 'src/common/icons';
import { useWatchListState } from '../context/WatchlistContext';
import Switcher from 'src/common/components/SwitchButton';
import { useQueryClient } from '@tanstack/react-query';
import { useState, KeyboardEvent } from 'react';
import { toast } from 'react-toastify';

type IEditWatchlistModalType = {};

const EditWatchlistModal = ({}: IEditWatchlistModalType) => {
    const { setState, state } = useWatchListState();
    const { data: watchlists } = useWatchListsQuery();
    const [editMode, setEditMode] = useState<IWatchlistType>();
    const queryClient = useQueryClient();
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

    const closeModal = () => {
        setState({ type: 'TOGGLE_EDIT_MODE', value: false });
        setEditMode(undefined);
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

    return (
        <>
            <Modal isOpen={state.editMode} onClose={closeModal} className="min-h-[20rem] w-1/4 rounded-md h-full grid ">
                <div className="grid grid-rows-min-one">
                    <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                        <div>ویرایش گروه‌های دیده‌بان</div>
                        <CloseIcon onClick={closeModal} className="cursor-pointer" />
                    </div>
                    <div className="p-4 text-1.2 ">
                        <div className="flex bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg py-2 text-L-gray-450 dark:text-D-gray-450 font-semibold">
                            <div className="w-full flex items-center justify-center">عنوان دیده‌بان</div>
                            <div className="w-full flex items-center justify-center">نمایش</div>
                            <div className="w-full flex items-center justify-center">عملیات</div>
                        </div>
                        <div className=" max-h-[30rem] overflow-y-auto">
                            {watchlists?.map((watchlist) => (
                                <div
                                    key={watchlist.id}
                                    className="flex  py-1.5 even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300 text-L-gray-450 dark:text-D-gray-450"
                                >
                                    <div className="w-full flex items-center justify-center">
                                        {editMode?.id === watchlist.id ? (
                                            <input
                                                className="text-center border border-L-gray-350 h-full outline-L-primary-50"
                                                value={editMode.watchListName}
                                                onChange={(e) => setEditMode({ ...editMode, watchListName: e.target.value })}
                                                onKeyDownCapture={(e) => handleEditWatchlistName(e)}
                                                autoFocus={true}
                                            />
                                        ) : (
                                            <span>{watchlist.watchListName}</span>
                                        )}
                                    </div>
                                    <div className="w-full flex items-center justify-center">
                                        <Switcher
                                            onCheck={(value: boolean) =>
                                                editWatchlist({ id: watchlist.id, isPinned: value, watchlistName: watchlist.watchListName })
                                            }
                                            value={watchlist.isPinned}
                                        />
                                    </div>
                                    <div className="w-full flex items-center justify-center gap-3">
                                        <EditIcon2 onClick={() => setEditMode(watchlist)} />
                                        <DeleteIcon onClick={() => deleteWatchlist(watchlist.id)} className="cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditWatchlistModal;
