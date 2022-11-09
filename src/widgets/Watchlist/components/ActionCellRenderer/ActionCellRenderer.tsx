import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { deleteWatchListSymbolMutation } from 'src/app/queries/watchlist';
import AddToWatchlistButton from 'src/common/components/AddToWatchlistButton';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import { DeleteIcon, NoteIcon } from 'src/common/icons';
import { useWatchListState } from '../../context/WatchlistContext';

interface IActionCellRendererType extends IWatchlistSymbolTableType {}

const ActionCellRenderer: FC<IActionCellRendererType> = (symbol) => {
    const {
        state: { selectedWatchlist },
    } = useWatchListState();
    const queryClient = useQueryClient();
    const { mutate: deleteWatchListSymbol } = deleteWatchListSymbolMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchListSymbols', selectedWatchlist]);
            toast.success('دیده‌بان با موفقیت اضافه شد');

            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });
    return (
        <div className="flex items-center justify-center pt-1 gap-1">
            <div className="flex items-center justify-center gap-1 ">
                <CodalBtn symbolTitle={symbol.symbolTitle} className="" />
                <TseBtn insCode={symbol.insCode} />
            </div>

            <div className="flex items-center justify-center gap-1 text-L-primary-50 dark:text-D-primary-50 border-r pr-1">
                {selectedWatchlist ? (
                    <>
                        <button>
                            <NoteIcon />
                        </button>
                        <button>
                            <DeleteIcon
                                data-cy="delete-symbol-from-wl"
                                onClick={() => deleteWatchListSymbol({ symbolISIN: symbol.symbolISIN, watchlistId: selectedWatchlist as number })}
                            />
                        </button>
                    </>
                ) : (
                    <button>
                        <AddToWatchlistButton symbolISIN={symbol.symbolISIN} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ActionCellRenderer;
