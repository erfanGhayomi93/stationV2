import { FC, useState, useMemo, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDefaultWatchlistQuery } from 'src/app/queries/watchlist';
import { ColDefType } from 'src/common/components/AGTable';
import Select from 'src/common/components/Select';
import { EditIcon2, PinIcon, PlusIcon } from 'src/common/icons';
import { useWatchListState } from '../../context/WatchlistContext';
import CheckColumnShow from '../CheckColumnShow';
import { FilterAllMarket } from '../FilterAllMarket';
import ScrollableSlider from 'src/common/components/ScrollableSlider/ScrollableSlider';
import { AddWatchList } from '../AddWatchlist';

interface IWatchlistControllerType {
    columns: ColDefType<IGetWatchlistSymbol>[];
    watchlists: IWatchlistType[] | undefined;
}

const WatchlistController: FC<IWatchlistControllerType> = ({ columns, watchlists }) => {
    const { t } = useTranslation();

    const { setState, state } = useWatchListState();
    const [isAddActive, setIsAddActive] = useState(false);

    const { data: defaultWatchlists } = useDefaultWatchlistQuery();

    const setActiveWatchlist = ({ id, type }: { id: number; type: WatchlistType }) => {
        setState({ value: { id, type }, type: 'SET_SELECTED_WATCHLIST' });
    };

    const setDefaultWatchlist = (key: IDefaultWatchlistType) => {
        setState({ value: key, type: 'SET_SELECTED_DEFAULT_WATCHLIST' });
    };

    const openEditModal = () => {
        setState({ type: 'TOGGLE_EDIT_MODE', value: true });
    };

    const watchlistOptions = useMemo(() => {
        return defaultWatchlists?.map((item) => ({
            value: item,
            label: t('defaultWlOption.' + item),
        }));
    }, [defaultWatchlists, t]);

    const setTypeDefaultWatchlist = useCallback((select: IDefaultWatchlistType) => {
        setDefaultWatchlist(select);
    }, []);

    const itemsScrollableSlider = useMemo(
        () => (
            <ScrollableSlider>
                <>
                    {watchlists?.map((watchlist) => (
                        <button
                            data-cy={'watchlist-itemScrollableSliders-' + watchlist.watchListName}
                            onClick={() => setActiveWatchlist({ id: watchlist.id, type: watchlist.type })}
                            key={watchlist.id}
                            data-actived={watchlist.id === state.selectedWatchlistId}
                            className="py-1 px-2 mx-2 outline-none text-xs hover:bg-L-primary-100 dark:hover:bg-D-primary-100 cursor-pointer whitespace-nowrap bg-L-gray-300 dark:bg-D-gray-300  text-L-gray-600 dark:text-D-gray-600 border rounded-md border-transparent actived:bg-L-primary-100 actived:dark:bg-D-primary-100  actived:text-L-primary-50 actived:dark:text-D-primary-50  actived:border-L-primary-50 actived:dark:border-D-primary-50 flex items-center"
                        >
                            {watchlist.type === 'Pinned' && <PinIcon className="text-L-warning dark:text-D-warning ml-2" />}
                            {`${t('Watchlist.title')} ${watchlist.watchListName}`}
                        </button>
                    ))}
                </>
            </ScrollableSlider>
        ),
        [state.selectedWatchlistId, watchlists],
    );

    return (
        <div className="py-2 grid grid-cols-min-one w-full ">
            <div className="flex gap-3">
                <div className="py-1 w-[700px]">{itemsScrollableSlider}</div>

                <div className="flex gap-3 items-center">
                    <div className="flex gap-3 items-center justify-center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAddActive(true);
                            }}
                            data-actived={isAddActive}
                            data-cy="add-watchlist"
                            className="text-L-gray-500  actived:scale-x-0 actived:absolute duration-150 rounded-md dark:text-D-gray-500  hover:text-L-primary-50 dark:hover:text-D-primary-50 outline-none"
                        >
                            <PlusIcon />
                        </button>

                        <AddWatchList isAddActive={isAddActive} setIsAddActive={setIsAddActive} />
                    </div>
                    <button
                        data-cy="edit-watchlist"
                        onClick={openEditModal}
                        className="text-L-gray-500 rounded-md dark:text-D-gray-500 hover:text-L-primary-50 dark:hover:text-D-primary-50 outline-none"
                    >
                        <EditIcon2 />
                    </button>
                </div>
            </div>

            <div className="flex gap-2 items-center whitespace-nowrap">
                {state.watchlistType === 'Market' && <FilterAllMarket />}

                {state.watchlistType === 'Ramand' && (
                    <>
                        <span className="text-L-gray-700 dark:text-D-gray-700">نمایش بر اساس :</span>
                        <div className="grow min-w-[12.5rem]">
                            <Select onChange={setTypeDefaultWatchlist} value={state.selectedDefaultWatchlist} options={watchlistOptions} />
                        </div>
                    </>
                )}

                <CheckColumnShow {...{ columns }} />
            </div>
        </div>
    );
};

export default memo(WatchlistController);
