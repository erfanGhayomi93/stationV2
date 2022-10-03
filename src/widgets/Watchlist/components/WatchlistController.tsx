import { FC, FormEvent } from 'react';
import { createWatchListMutation, useWatchListsQuery } from 'src/app/queries/watchlist';
import { EditIcon2, PlusIcon } from 'src/common/icons';
import { useWatchListState } from '../context/WatchlistContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

interface IWatchlistControllerType {}

const WatchlistController: FC<IWatchlistControllerType> = ({}) => {
    const queryClient = useQueryClient();
    const { data: watchlists } = useWatchListsQuery();
    const { setState, state } = useWatchListState();
    const [watchlistName, setWatchlistName] = useState('');
    const [isAddActive, setIsAddActive] = useState(false);

    const { mutate } = createWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('دیده‌بان با موفقیت اضافه شد');
            setWatchlistName('');

            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });

    const setActiveWatchlist = (id: number) => {
        setState({ value: id, type: 'SET_SELECTED_WATCHLIST' });
    };

    const AddWatchlist = (form: FormEvent<HTMLFormElement>) => {
        form.stopPropagation();
        form.preventDefault();
        mutate(watchlistName);
        setIsAddActive(false);
    };

    const openEditModal = () => {
        setState({ type: 'TOGGLE_EDIT_MODE', value: true });
    };

    return (
        <div className="py-2 flex gap-3 w-full ">
            <div className="flex gap-2  overflow-x-auto py-1 px-1">
                <div className="py-1 px-2 bg-L-primary-100 dark:bg-D-primary-100  text-L-primary-50 dark:text-D-primary-50 border rounded-lg border-L-primary-50 dark:border-D-primary-50">
                    دیده‌بان پیشفرض
                </div>
                {watchlists?.map(
                    (watchlist) =>
                        watchlist.isPinned && (
                            <button
                                onClick={() => setActiveWatchlist(watchlist.id)}
                                key={watchlist.id}
                                data-actived={watchlist.id === state.selectedWatchlist}
                                className="py-1 px-2 outline-none hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer whitespace-nowrap bg-L-gray-250 dark:bg-D-gray-250  text-L-gray-450 dark:text-D-gray-450 border rounded-lg border-transparent actived:bg-L-primary-100 actived:dark:bg-D-primary-100  actived:text-L-primary-50 actived:dark:text-D-primary-50  actived:border-L-primary-50 actived:dark:border-D-primary-50"
                            >
                                {watchlist.watchListName}
                            </button>
                        ),
                )}
            </div>
            <div className="flex gap-3 items-center justify-center">
                <div className="flex gap-3 items-center justify-center">
                    <button
                        onClick={() => setIsAddActive(true)}
                        data-actived={isAddActive}
                        className="text-L-primary-50 actived:scale-x-0 actived:absolute duration-150 rounded-md dark:text-D-primary-50 hover:bg-L-gray-150 dark:hover:bg-D-gray-150 outline-none"
                    >
                        <PlusIcon />
                    </button>
                    <form
                        data-actived={!isAddActive}
                        onSubmit={AddWatchlist}
                        onKeyDown={(event) => event.key === 'Escape' && setIsAddActive(false)}
                        className="actived:scale-x-0 actived:absolute duration-150 flex gap-2  "
                    >
                        {/* <button
                            type={'submit'}
                            className="text-L-success-150 rounded-md dark:text-D-success-150 hover:bg-L-gray-150 dark:hover:bg-D-gray-150 outline-none"
                        >
                            <PlusIcon />
                        </button> */}
                        <input
                            className="border p-1 rounded-xl outline-L-primary-100 "
                            value={watchlistName}
                            onBlur={() => setIsAddActive(false)}
                            placeholder="نام دیده بان جدید"
                            onChange={(e) => setWatchlistName(e.target.value)}
                        />
                    </form>
                </div>
                <button
                    onClick={openEditModal}
                    className="text-L-primary-50 rounded-md dark:text-D-primary-50 hover:bg-L-gray-150 dark:hover:bg-D-gray-150 outline-none"
                >
                    <EditIcon2 />
                </button>
            </div>
        </div>
    );
};

export default WatchlistController;
