import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { deleteWatchListSymbolMutation } from 'src/app/queries/watchlist';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import { DeleteIcon } from 'src/common/icons';
import { useWatchListState } from '../../context/WatchlistContext';
import { queryKeyWatchlistSymbol } from 'src/constant/watchlist';


const ActionCellRenderer: FC<IGetWatchlistSymbol> = (symbol) => {
    const {
        state: { selectedWatchlistId, PageNumber, watchlistType },
    } = useWatchListState();
    const queryClient = useQueryClient();

    const { mutate: deleteWatchListSymbol } = deleteWatchListSymbolMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeyWatchlistSymbol({ watchlistType: watchlistType, PageNumber, watchlistId: selectedWatchlistId }));
            queryClient.invalidateQueries(['GetSymbolInWatchlist']);

            toast.success('دیده‌بان با موفقیت حذف شد');
        },
        onError: (err) => {
            toast.error(`${err}`);
        },
    });
    return (
        <div className="flex items-center justify-center pt-1 gap-1">
            <div className="flex items-center justify-center gap-1 ">
                <CodalBtn symbolTitle={symbol.symbolTitle} className="" />
                <TseBtn insCode={symbol.insCode} />
                {
                    (watchlistType === 'Pinned' || watchlistType === 'User') && (
                        <DeleteIcon
                            data-cy="delete-symbol-from-wl"
                            onClick={() => deleteWatchListSymbol({ symbolISIN: symbol.symbolISIN, watchlistId: selectedWatchlistId as number })}
                            className='text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50 cursor-pointer'
                        />
                    )
                }
            </div>
        </div>
    );
};

export default ActionCellRenderer;
