import React, { FC, useEffect } from 'react';
import { EyeApprove, EyePlusIcon } from 'src/common/icons';
import ipcMain from 'src/common/classes/IpcMain';
import { useSymbolInWatchlistQuery } from 'src/app/queries/watchlist';
import { useWatchListState } from 'src/widgets/Watchlist/context/WatchlistContext';

type AddRemoveToWatchlist = {
    symbolISIN: string,
    watchlistId: number
}

export const AddRemoveToWatchlist: FC<AddRemoveToWatchlist> = ({ symbolISIN, watchlistId }) => {
    const { data: symbolInWatchlist } = useSymbolInWatchlistQuery();


    // useEffect(() => {
    //     console.log("selectedWatchlistId", selectedWatchlistId)
    // }, [selectedWatchlistId])

    // function isObjectExistInArray(targetObject: AddRemoveToWatchlist) {
    //   
    //     // .some(obj => obj.symbolISIN === targetObject.symbolISIN && obj.watchlistId === targetObject.watchlistId);
    // }

    const checkIfExistSymbol = () => {
        if (!symbolInWatchlist) return false

        return symbolInWatchlist[watchlistId.toString()].includes(symbolISIN)
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
