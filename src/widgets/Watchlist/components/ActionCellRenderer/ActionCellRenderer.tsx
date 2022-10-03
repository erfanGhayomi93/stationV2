import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { deleteWatchListSymbolMutation } from 'src/app/queries/watchlist';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import { DeleteIcon, EditIcon, EditIcon2, FileIcon } from 'src/common/icons';
import { useWatchListState } from '../../context/WatchlistContext';

interface IActionCellRendererType extends IWatchlistSymbolType {}

const ActionCellRenderer: FC<IActionCellRendererType> = ({ symbolISIN, symbol }) => {
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
            <div className="flex items-center justify-center border-l gap-1 pl-1">
                <CodalBtn symbolTitle={symbol.symbolTitle} className="" />
                <TseBtn insCode={symbol.insCode} />
            </div>
            <div className="flex items-center justify-center gap-1 text-L-primary-50 dark:text-D-primary-50">
                <button>
                    <EditIcon2 />
                </button>
                <button>
                    <DeleteIcon onClick={() => deleteWatchListSymbol({ symbolISIN, watchlistId: selectedWatchlist as number })} />
                </button>
            </div>
        </div>
    );
};

export default ActionCellRenderer;
