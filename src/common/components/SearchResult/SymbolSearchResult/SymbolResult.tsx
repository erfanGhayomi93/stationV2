import { FC, memo } from 'react';
import MinLen from 'src/common/components/SearchResult/MinLen';
import SearchLoading from 'src/common/components/SearchResult/SearchLoading';
import Combo from '../../ComboSelect';
import SymbolState from '../../SymbolState';
import NotFoundResult from '../SearchNotFound';
import { EyeApprove, EyePlusIcon } from 'src/common/icons';
import ipcMain from 'src/common/classes/IpcMain';
interface ISymbolResultType {
    isLoading: boolean;
    min: boolean;
    qData: SymbolSearchResult[];
    isOnModal?: boolean
}
const SymbolResult: FC<ISymbolResultType> = ({ isLoading, qData, min, isOnModal }) => {
    if (min) {
        return <MinLen min={min} />;
    }
    if (isLoading) {
        return <SearchLoading {...{ isLoading }} />;
    }

    const checkIfExistSymbol = () => {
        return false
    }

    const handleRemoveSymbolInWatchlist = (symbolISIN: string) => {
        ipcMain.send("RemoveSymbolInWatchlist", symbolISIN);
    }

    const handleAddSymbolInWatchlist = (symbolISIN: string) => {
        ipcMain.send("AddSymbolInWatchlist", symbolISIN);
    }

    return (
        <>
            {qData?.length
                ? qData.map((item, inx) => (
                    <Combo.DataSet
                        key={inx}
                        className="even:bg-L-gray-100 even:dark:bg-D-gray-100 border-b last:border-none bg-L-basic dark:bg-D-basic py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                        label={item.symbolTitle}
                        value={item}
                    >
                        <div className="flex justify-between w-full items-center px-2 text-1.3">
                            <div className="flex items-center">
                                <span className="ml-2">
                                    <SymbolState symbolState={item?.symbolState || ''} />
                                </span>
                                <div className='text-right'>
                                    <span className={`block truncate font-normal text-L-gray-700 dark:text-D-gray-700`}>{item.symbolTitle}</span>
                                    <small className={`block truncate font-normal text-L-gray-500 dark:text-D-gray-700`}>{item.companyName}</small>
                                </div>
                            </div>
                            {
                                isOnModal && (
                                    checkIfExistSymbol() ? (
                                        <EyeApprove
                                            width={23}
                                            height={23}
                                            onClick={() => handleRemoveSymbolInWatchlist(item.symbolISIN)}
                                            className="cursor-pointer text-L-success-200 dark:text-D-success-200 "
                                        />
                                    ) : (
                                        <EyePlusIcon
                                            width={23}
                                            height={23}
                                            onClick={() => handleAddSymbolInWatchlist(item.symbolISIN)}
                                            className="cursor-pointer text-L-gray-600 dark:text-D-gray-600 hover:text-L-primary-50 hover:dark:text-D-primary-50"
                                        />
                                    )
                                )
                            }
                        </div>
                    </Combo.DataSet>
                ))
                : NotFoundResult}
        </>
    );
};

export default memo(SymbolResult);
