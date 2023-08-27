import { FC } from 'react';
import { EyeApprove, EyePlusIcon } from 'src/common/icons';
import ipcMain from 'src/common/classes/IpcMain';
import { useSymbolInWatchlistQuery } from 'src/app/queries/watchlist';

type AddRemoveToWatchlist = {
    symbolISIN: string,
    watchlistId: number
}

export const AddRemoveToWatchlist: FC<AddRemoveToWatchlist> = ({ symbolISIN, watchlistId }) => {
    const { data: symbolInWatchlist } = useSymbolInWatchlistQuery();


    const checkIfExistSymbol = () => {
        try {
            if (!symbolInWatchlist || !watchlistId) return false;

            const watchlist = symbolInWatchlist[watchlistId.toString()] || [];
            return watchlist.includes(symbolISIN);
        }
        catch {
            return false
        }
    }

    const handleRemoveSymbolInWatchlist = (symbolISIN: string) => {
        ipcMain.send("RemoveSymbolInWatchlist", symbolISIN);
    }

    const handleAddSymbolInWatchlist = (symbolISIN: string) => {
        ipcMain.send("AddSymbolInWatchlist", symbolISIN);
    }


    return (
        checkIfExistSymbol() ? (
            <EyeApprove
                width={23}
                height={23}
                onClick={() => handleRemoveSymbolInWatchlist(symbolISIN)}
                className="cursor-pointer text-L-success-200 dark:text-D-success-200 "
            />
        ) : (
            <EyePlusIcon
                width={23}
                height={23}
                onClick={() => handleAddSymbolInWatchlist(symbolISIN)}
                className="cursor-pointer text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50"
            />
        )
    )
}
