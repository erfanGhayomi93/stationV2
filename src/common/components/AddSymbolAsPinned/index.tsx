import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { FC } from 'react';
import { addWatchListSymbolMutation, deleteWatchListSymbolMutation, useSymbolInWatchlistQuery } from 'src/app/queries/watchlist';
import { queryClient } from 'src/app/queryClient';
import ipcMain from 'src/common/classes/IpcMain';
import { PinIcon } from 'src/common/icons';
import { onSuccessNotif } from 'src/handlers/notification';

interface ISymbolAsPinnedButtonType {
    symbolISIN: string;
}

const AddSymbolAsPinned: FC<ISymbolAsPinnedButtonType> = ({ symbolISIN }) => {
    const { data: symbolInWatchlist } = useSymbolInWatchlistQuery();

    const checkIfExistSymbol = (watchlistId: number) => {
        try {
            if (!symbolInWatchlist || !watchlistId) return false;

            const watchlist = symbolInWatchlist[watchlistId.toString()] || [];
            return watchlist.includes(symbolISIN);
        } catch {
            return false;
        }
    };


    const { mutate: addWatchListSymbol } = addWatchListSymbolMutation({
        onSuccess: () => {
            ipcMain.send('refetchPinnedWatchlist')
            queryClient.invalidateQueries(['GetSymbolInWatchlist']);
            onSuccessNotif({ title: 'نماد با موفقیت به دیده‌بان اضافه شد' });
        },
    });

    const { mutate: deleteWatchListSymbol } = deleteWatchListSymbolMutation({
        onSuccess: (_, variables) => {
            ipcMain.send('refetchPinnedWatchlist')
            queryClient.invalidateQueries(['GetSymbolInWatchlist']);
            onSuccessNotif({ title: 'نماد با موفقیت  از دیده بان حذف شد' });
        },
    });

    const submitSymbolPinned = () => {
        if (checkIfExistSymbol(3)) {
            deleteWatchListSymbol({ symbolISIN, type: 'Pinned' })
            return
        }
        addWatchListSymbol({ symbolISIN, type: 'Pinned' })
    }

    return (
        <div>
            <Tippy content="افزودن نماد به دیده‌بان پین شده" className="text-xs">
                <button
                    className="mt-0.5"
                    onClick={submitSymbolPinned}
                >
                    <PinIcon className={clsx({
                        'text-L-gray-600 dark:text-D-gray-600': !checkIfExistSymbol(3),
                        'text-L-warning dark:text-D-warning': checkIfExistSymbol(3),
                    })} />
                </button>
            </Tippy>
        </div>
    );
};

export default AddSymbolAsPinned;
