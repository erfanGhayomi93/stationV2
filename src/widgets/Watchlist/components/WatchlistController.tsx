import { FC } from 'react';
import { useWatchListsQuery } from 'src/app/queries/watchlist';
import { EditIcon, PlusIcon } from 'src/common/icons';
import { useWatchListState } from '../context/WatchlistContext';

interface IWatchlistControllerType {}

const WatchlistController: FC<IWatchlistControllerType> = ({}) => {
    const { data: watchlists } = useWatchListsQuery();
    const { setState, state } = useWatchListState();

    const setActiveWatchlist = () => {
        setState({ value: 1, type: 'SET_SELECTED_WATCHLIST' });
    };

    return (
        <div className="py-2 flex gap-3 w-full">
            <div className="flex gap-2  overflow-x-auto py-1">
                <div className="py-1 px-2 bg-L-primary-100 dark:bg-D-primary-100  text-L-primary-50 dark:text-D-primary-50 border rounded-lg border-L-primary-50 dark:border-D-primary-50">
                    همه
                </div>
                {watchlists?.map((watchlist) => (
                    <div
                        onClick={setActiveWatchlist}
                        key={watchlist.id}
                        className="py-1 px-2 hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer whitespace-nowrap bg-L-gray-250 dark:bg-D-gray-250  text-L-gray-450 dark:text-D-gray-450 border rounded-lg border-transparent"
                    >
                        {watchlist.watchListName}
                    </div>
                ))}
            </div>
            <div className="flex gap-3 items-center justify-center">
                <button className="text-L-primary-50 rounded-md dark:text-D-primary-50 hover:bg-L-gray-150 dark:hover:bg-D-gray-150 outline-none">
                    <PlusIcon />
                </button>
                <button className="text-L-primary-50 rounded-md dark:text-D-primary-50 hover:bg-L-gray-150 dark:hover:bg-D-gray-150 outline-none">
                    <EditIcon />
                </button>
            </div>
        </div>
    );
};

export default WatchlistController;
