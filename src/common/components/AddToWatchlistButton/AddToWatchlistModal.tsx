import { FC, KeyboardEvent, useState } from 'react';
import { CloseIcon, EyeMinesIcon, EyePlusIcon, PlusIcon } from 'src/common/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
    addWatchListSymbolMutation,
    createWatchListMutation,
    deleteWatchListSymbolMutation,
    useSymbolInWatchlistQuery,
    useWatchlistsQuery,
} from 'src/app/queries/watchlist';
import Modal from '../Modal';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { isFieldEmpty } from 'src/utils/helpers';
import { t } from 'i18next';
import ipcMain from 'src/common/classes/IpcMain';

type IAddToWatchlist = {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
    symbolISIN: string;
};

export const AddToWatchlistModal: FC<IAddToWatchlist> = ({ isOpen, setIsOpen, symbolISIN }) => {
    const queryClient = useQueryClient();
    const [isEditActive, setIsEditActive] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const { data: watchlists } = useWatchlistsQuery();
    const { data: symbolInWatchlist } = useSymbolInWatchlistQuery();

    const { mutate: deleteWatchListSymbol } = deleteWatchListSymbolMutation({
        onSuccess: (_, variables) => {
            if (variables.type === 'Pinned') ipcMain.send('refetchPinnedWatchlist')
            queryClient.invalidateQueries(['GetSymbolInWatchlist']);
            onSuccessNotif({ title: 'نماد با موفقیت  از دیده بان حذف شد' });
        },
    });

    const { mutate: addWatchListSymbol } = addWatchListSymbolMutation({
        onSuccess: (_, variables) => {
            if (variables.type === 'Pinned') ipcMain.send('refetchPinnedWatchlist')
            queryClient.invalidateQueries(['GetSymbolInWatchlist']);
            onSuccessNotif({ title: 'نماد با موفقیت به دیده‌بان اضافه شد' });
        },
    });

    const { mutate: createWatchList } = createWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            onSuccessNotif({ title: 'دیده‌بان با موفقیت اضافه شد' });
            setInputValue('');
            setIsEditActive(false);
        },
    });

    const handleEditWatchlistName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            setIsEditActive(false);
            setInputValue('');
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleCreateWatchList();
        }
    };

    const closeModal = () => setIsOpen(false);

    const handleCreateWatchList = () =>
        isFieldEmpty(inputValue) ? onErrorNotif({ title: t('Errors.WatchListNameCantBeNull') }) : createWatchList(inputValue);

    const checkIfExistSymbol = (watchlistId: number) => {
        try {
            if (!symbolInWatchlist || !watchlistId) return false;

            const watchlist = symbolInWatchlist[watchlistId.toString()] || [];
            return watchlist.includes(symbolISIN);
        } catch {
            return false;
        }
    };

    // const checkIfExistSymbol = (item: ISymbolInWatchlist) => {
    //     // if (!symbolInWatchlist) return false;
    //     // for (let i = 0; i < symbolInWatchlist.length; i++) {
    //     //     if (symbolInWatchlist[i].symbolISIN === item.symbolISIN && symbolInWatchlist[i].watchlistId === item.watchlistId) {
    //     //         return true;
    //     //     }
    //     // }
    //     return false;
    // };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="min-h-[20rem] w-1/4 rounded-md h-full grid text-1.2 ">
            <div className="grid grid-rows-min-one" data-cy="add-to-wl-modal">
                <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-400 h-10 flex items-center justify-between px-5">
                    <div>ویرایش گروه‌های دیده‌بان</div>
                    <CloseIcon onClick={closeModal} className="cursor-pointer" data-cy="close-add-to-wl-modal" />
                </div>
                <div className="p-4 text-1.2 bg-L-basic dark:bg-D-basic">
                    <div className="flex bg-L-gray-300 dark:bg-D-gray-300 rounded-t-lg py-2 text-L-gray-600 dark:text-D-gray-600 font-semibold">
                        <div className="w-full flex items-center justify-center">عنوان دیده‌بان</div>
                        <div className="w-full flex items-center justify-center">عملیات</div>
                    </div>
                    <div className=" max-h-[20rem] overflow-y-auto">
                        {watchlists
                            ?.filter((item) => item.isEditable)
                            ?.map((watchlist) => {
                                // const dataSymbolInWatchlist: ISymbolInWatchlist = { symbolISIN, watchlistId: watchlist.id };
                                return (
                                    <div
                                        key={watchlist.id}
                                        className="flex  py-1.5 even:bg-L-gray-300 even:dark:bg-D-gray-300 border-b last:border-none   text-L-gray-600 dark:text-D-gray-600"
                                    >
                                        <div className="w-full flex items-center justify-center">
                                            <span>{watchlist.watchListName}</span>
                                        </div>

                                        <div className="w-full flex items-center justify-center gap-3 ">
                                            {checkIfExistSymbol(watchlist.id) ? (
                                                <EyeMinesIcon
                                                    width={23}
                                                    height={23}
                                                    onClick={() => deleteWatchListSymbol({ symbolISIN, watchlistId: watchlist.id, type: watchlist.type })}
                                                    className="cursor-pointer text-L-error-200 dark:text-D-error-200 "
                                                />
                                            ) : (
                                                <EyePlusIcon
                                                    data-cy={'add-symbol-btn-to-wl-' + watchlist.watchListName}
                                                    width={23}
                                                    height={23}
                                                    onClick={() => addWatchListSymbol({ symbolISIN, watchlistId: watchlist.id, type: watchlist.type })}
                                                    className="cursor-pointer text-L-primary-50 dark:text-D-primary-50 "
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="border-t h-12 justify-between items-center flex bg-L-basic dark:bg-D-basic">
                    {isEditActive ? (
                        <div className="flex justify-center items-center w-full px-5 gap-2 h-full py-2">
                            <input
                                className="border w-full border-L-gray-400 dark:border-D-gray-400 h-full outline-L-primary-50 px-2 bg-L-basic dark:bg-D-basic text-D-basic dark:text-L-basic"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDownCapture={(e) => handleEditWatchlistName(e)}
                                autoFocus={true}
                            />
                            <button className=" bg-L-gray-300 h-full px-3 rounded-md " onClick={() => setIsEditActive(false)}>
                                انصراف
                            </button>
                            <button
                                type="submit"
                                onClick={handleCreateWatchList}
                                className="whitespace-nowrap bg-L-primary-50 h-full px-3 rounded-md text-L-basic"
                            >
                                ثبت دیده‌بان
                            </button>
                        </div>
                    ) : (
                        <button className="flex items-center justify-center py-2 px-2 gap-2" onClick={() => setIsEditActive(true)}>
                            <PlusIcon className="border border-dashed rounded-full text-L-primary-50 border-L-primary-50" />
                            <span className="text-D-basic dark:text-L-basic">افزودن دیده‌بان جدید</span>
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};
