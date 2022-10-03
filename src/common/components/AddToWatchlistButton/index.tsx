import { FC, KeyboardEvent } from 'react';
import { CloseIcon, EyeMinesIcon, EyePlusIcon, PlusIcon } from 'src/common/icons';
import Modal from '../Modal';
import { useState } from 'react';
import { addWatchListSymbolMutation, createWatchListMutation, deleteWatchListSymbolMutation, useWatchListsQuery } from 'src/app/queries/watchlist';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface IAddToWatchlistButtonType {
    symbolISIN: string;
}

const AddToWatchlistButton: FC<IAddToWatchlistButtonType> = ({ symbolISIN }) => {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditActive, setIsEditActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const closeModal = () => setIsOpen(false);
    const { data: watchlists } = useWatchListsQuery();
    const { mutate: deleteWatchListSymbol } = deleteWatchListSymbolMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchListSymbols']);
            toast.success('دیده‌بان با موفقیت حذف شد');

            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });

    const { mutate: addWatchListSymbol } = addWatchListSymbolMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchListSymbols']);
            toast.success('دیده‌بان با موفقیت اضافه شد');

            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });

    const { mutate: createWatchList } = createWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('دیده‌بان با موفقیت اضافه شد');
            setInputValue('');
            setIsEditActive(false);

            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
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
            createWatchList(inputValue);
        }
    };

    return (
        <div>
            <button className="flex items-center justify-center p-1 text-L-primary-50 dark:text-D-primary-50">
                <EyePlusIcon width={23} height={23} onClick={() => setIsOpen(true)} />
            </button>
            <Modal isOpen={isOpen} onClose={closeModal} className="min-h-[20rem] w-1/4 rounded-md h-full grid text-1.2 ">
                <div className="grid grid-rows-min-one">
                    <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                        <div>ویرایش گروه‌های دیده‌بان</div>
                        <CloseIcon onClick={closeModal} className="cursor-pointer" />
                    </div>
                    <div className="p-4 text-1.2 ">
                        <div className="flex bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg py-2 text-L-gray-450 dark:text-D-gray-450 font-semibold">
                            <div className="w-full flex items-center justify-center">عنوان دیده‌بان</div>
                            <div className="w-full flex items-center justify-center">عملیات</div>
                        </div>
                        <div className=" max-h-[20rem] overflow-y-auto">
                            {watchlists?.map((watchlist) => (
                                <div
                                    key={watchlist.id}
                                    className="flex  py-1.5 even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300 text-L-gray-450 dark:text-D-gray-450"
                                >
                                    <div className="w-full flex items-center justify-center">
                                        <span>{watchlist.watchListName}</span>
                                    </div>

                                    <div className="w-full flex items-center justify-center gap-3 ">
                                        <EyePlusIcon
                                            width={23}
                                            height={23}
                                            onClick={() => addWatchListSymbol({ symbolISIN, watchlistId: watchlist.id })}
                                            className="cursor-pointer text-L-primary-50 dark:text-D-primary-50 "
                                        />
                                        <EyeMinesIcon
                                            width={23}
                                            height={23}
                                            onClick={() => deleteWatchListSymbol({ symbolISIN, watchlistId: watchlist.id })}
                                            className="cursor-pointer text-L-error-150 dark:text-D-error-150 "
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-t h-12 justify-between items-center flex ">
                        {isEditActive ? (
                            <div className="flex justify-center items-center w-full px-5 gap-2 h-full py-2">
                                <input
                                    className=" border w-full border-L-gray-350 h-full outline-L-primary-50 px-2"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDownCapture={(e) => handleEditWatchlistName(e)}
                                    autoFocus={true}
                                />
                                <button className=" bg-L-gray-250 h-full px-3 rounded-md " onClick={() => setIsEditActive(false)}>
                                    انصراف
                                </button>
                                <button
                                    onClick={() => createWatchList(inputValue)}
                                    className="whitespace-nowrap bg-L-primary-50 h-full px-3 rounded-md text-L-basic"
                                >
                                    ثبت دیده‌بان{' '}
                                </button>
                            </div>
                        ) : (
                            <button className="flex items-center justify-center py-2 px-2 gap-2" onClick={() => setIsEditActive(true)}>
                                <PlusIcon className="border border-dashed rounded-full text-L-primary-50 border-L-primary-50" />
                                <span>افزودن دیده‌بان جدید</span>
                            </button>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddToWatchlistButton;
