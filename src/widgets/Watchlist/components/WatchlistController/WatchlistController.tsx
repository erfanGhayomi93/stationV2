import { useQueryClient } from '@tanstack/react-query';
import { FC, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { createWatchListMutation, useDefaultWatchlistQuery, useWatchListsQuery } from 'src/app/queries/watchlist';
import { ColDefType } from 'src/common/components/AGTable';
import Select from 'src/common/components/Select';
import { EditIcon2, PlusIcon } from 'src/common/icons';
import { useWatchListState } from '../../context/WatchlistContext';
import CheckColumnShow from '../CheckColumnShow';
import { FilterAllMarket } from '../FilterAllMarket';

interface IWatchlistControllerType {
    columns: ColDefType<IWatchlistSymbolTableType>[];
}

const WatchlistController: FC<IWatchlistControllerType> = ({ columns }) => {
    const queryClient = useQueryClient();
    const { data: watchlists } = useWatchListsQuery();
    const { setState, state } = useWatchListState();
    const [watchlistName, setWatchlistName] = useState('');
    const [isAddActive, setIsAddActive] = useState(false);
    const { data: defaultWatchlists } = useDefaultWatchlistQuery();

    const { mutate } = createWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('دیده‌بان با موفقیت اضافه شد');
            setWatchlistName('');

            //FIXME:connect to toast adaptor
        },
        onError: (err) => {
            toast.error(`${err}`);
            //FIXME:connect to toast adaptor
        },
    });

    const setActiveWatchlist = (id: number) => {
        setState({ value: id, type: 'SET_SELECTED_WATCHLIST' });
    };

    const setDefaultWatchlist = (key: IDefaultWatchlistType) => {
        setState({ value: key, type: 'SET_SELECTED_DEFAULT_WATCHLIST' });
    };

    const AddWatchlist = (form: FormEvent<HTMLFormElement>) => {
        form.stopPropagation();
        form.preventDefault();
        mutate(watchlistName);
        setIsAddActive(false);
    };

    const openEditModal = () => {
        setState({ type: 'TOGGLE_EDIT_MODE', value: true });
    };
    const { t } = useTranslation();

    return (
        <div className="py-2 flex justify-between w-full ">
            <div className="flex gap-3 ">
                <div className="flex gap-2  overflow-x-auto py-1 px-1">
                    <button
                        onClick={() => setActiveWatchlist(0)}
                        data-actived={state.selectedWatchlist === 0}
                        className="py-1 px-2 outline-none hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer whitespace-nowrap bg-L-gray-300 dark:bg-D-gray-300  text-L-gray-600 dark:text-D-gray-600 border rounded-lg border-transparent actived:bg-L-primary-100 actived:dark:bg-D-primary-100  actived:text-L-primary-50 actived:dark:text-D-primary-50  actived:border-L-primary-50 actived:dark:border-D-primary-50"
                    >
                        کل بازار
                    </button>
                    <button
                        onClick={() => setActiveWatchlist(1)}
                        data-actived={state.selectedWatchlist === 1}
                        className="py-1 px-2 outline-none hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer whitespace-nowrap bg-L-gray-300 dark:bg-D-gray-300  text-L-gray-600 dark:text-D-gray-600 border rounded-lg border-transparent actived:bg-L-primary-100 actived:dark:bg-D-primary-100  actived:text-L-primary-50 actived:dark:text-D-primary-50  actived:border-L-primary-50 actived:dark:border-D-primary-50"
                    >
                        دیده بان رامند
                    </button>
                    {watchlists?.map(
                        (watchlist) =>
                            watchlist.isPinned && (
                                <button
                                    data-cy={'watchlist-items-' + watchlist.watchListName}
                                    onClick={() => setActiveWatchlist(watchlist.id)}
                                    key={watchlist.id}
                                    data-actived={watchlist.id === state.selectedWatchlist}
                                    className="py-1 px-2 outline-none hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer whitespace-nowrap bg-L-gray-300 dark:bg-D-gray-300  text-L-gray-600 dark:text-D-gray-600 border rounded-lg border-transparent actived:bg-L-primary-100 actived:dark:bg-D-primary-100  actived:text-L-primary-50 actived:dark:text-D-primary-50  actived:border-L-primary-50 actived:dark:border-D-primary-50"
                                >
                                    {watchlist.watchListName}
                                </button>
                            ),
                    )}
                </div>
                <div className="flex gap-3 items-center justify-center">
                    <div className="flex gap-3 items-center justify-center">
                        <button
                            onClick={() => setIsAddActive(true)}
                            data-actived={isAddActive}
                            data-cy="add-watchlist"
                            className="text-L-primary-50 actived:scale-x-0 actived:absolute duration-150 rounded-md dark:text-D-primary-50 hover:bg-L-gray-300 dark:hover:bg-D-gray-300 outline-none"
                        >
                            <PlusIcon />
                        </button>
                        <form
                            data-actived={!isAddActive}
                            onSubmit={AddWatchlist}
                            onKeyDown={(event) => event.key === 'Escape' && setIsAddActive(false)}
                            className="actived:scale-x-0 actived:absolute duration-150 flex gap-2  "
                        >
                            {/* <button
                            type={'submit'}
                            className="text-L-success-200 rounded-md dark:text-D-success-200 hover:bg-L-gray-300 dark:hover:bg-D-gray-300 outline-none"
                        >
                            <PlusIcon />
                        </button> */}
                            <input
                                data-cy="add-watchlist-input"
                                className="border p-1 rounded-xl outline-L-primary-100 "
                                value={watchlistName}
                                onBlur={() => setIsAddActive(false)}
                                placeholder="نام دیده بان جدید"
                                onChange={(e) => setWatchlistName(e.target.value)}
                            />
                        </form>
                    </div>
                    <button
                        data-cy="edit-watchlist"
                        onClick={openEditModal}
                        className="text-L-primary-50 rounded-md dark:text-D-primary-50 hover:bg-L-gray-300 dark:hover:bg-D-gray-300 outline-none"
                    >
                        <EditIcon2 />
                    </button>
                </div>
            </div>

            <div className="flex gap-2 items-center">
                {state.selectedWatchlist === 0 && <FilterAllMarket />}
                {state.selectedWatchlist === 1 && (
                    <>
                        <span>نمایش بر اساس :</span>
                        <div className="grow min-w-[12.5rem]">
                            <Select
                                onChange={(select) => setDefaultWatchlist(select as any)}
                                value={state.selectedDefaultWatchlist}
                                options={defaultWatchlists?.map((item) => ({value: item, label: t('defaultWlOption.' + item)}))}
                            />
                                {/* {defaultWatchlists?.map((item, inx) => (
                                    <SelectOption
                                        key={inx}
                                        label={t('defaultWlOption.' + item)}
                                        value={item}
                                        className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                                    />
                                ))}
                            </Select> */}
                        </div>
                    </>
                )}
                <CheckColumnShow {...{ columns }} />
            </div>
        </div>
    );
};

export default WatchlistController;
