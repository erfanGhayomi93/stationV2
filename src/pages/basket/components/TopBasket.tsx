import { FC, useEffect, useState } from 'react';
import { useGetBasket } from 'src/app/queries/basket';
import { CalendarIcon, EditIcon2, Excel2Icon, FiClock, CheckListIcon, PlusIcon } from 'src/common/icons';
import { getFarsiDate } from 'src/utils/helpers';
import EditBasketModal from '../modal/EditBasketModal';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import ScrollableSlider from 'src/common/components/ScrollableSlider/ScrollableSlider';
import AddBasketModal from '../modal/AddBasketModal';
import AGColumnEditor from 'src/common/components/AGTable/AGColumnEditor';
import { GridReadyEvent } from 'ag-grid-community';

type ITopBasket = {
    activeBasket: number;
    saveIndexBasketSelected: (ind: number) => void;
    gridApi: GridReadyEvent<IGetWatchlistSymbol> | undefined;
};

const TopBasket: FC<ITopBasket> = ({ activeBasket, saveIndexBasketSelected, gridApi }) => {
    //
    const { t } = useTranslation();
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const { data: listBasket } = useGetBasket();

    useEffect(() => {
        listBasket && saveIndexBasketSelected(listBasket[0]?.id);
    }, [listBasket]);

    const toggleAddBasket = () => {
        setShowAddForm((prev) => !prev);
    };

    const toggleEditBasket = () => {
        setShowEditForm((prev) => !prev);
    };

    return (
        <div className="grid grid-cols-2 items-center">
            <div className="my-7 w-full overflow-hidden py-2">
                <ScrollableSlider pixelsToScroll={150}>
                    <>
                        {listBasket &&
                            listBasket
                                // .filter((item) => item.isPinned)
                                .map((item) => (
                                    <div
                                        key={item.id}
                                        data-actived={activeBasket === item.id}
                                        onClick={() => saveIndexBasketSelected(item.id)}
                                        className="flex gap-4 items-center px-2 mx-1 py-1 text-center snap-center flex-nowrap whitespace-nowrap cursor-pointer rounded dark:text-D-primary-50 bg-L-basic dark:bg-D-basic actived:text-L-basic actived:dark:text-D-basic actived:bg-L-gray-300 actived:dark:bg-D-primary-50 border border-L-gray-400 dark:border-L-gray-400 actived:border-L-primary-50 actived:dark:border-D-primary-50"
                                    >
                                        <p
                                            data-actived={activeBasket === item.id}
                                            className="text-xs actived:font-semibold text-L-gray-500 dark:text-D-gray-500 actived:text-L-primary-50 actived:dark:text-D-primary-100"
                                        >
                                            {item.name}
                                        </p>
                                        <div
                                            data-actived={activeBasket === item.id}
                                            className="flex pt-1 text-L-gray-500 dark:text-D-gray-500 actived:text-L-primary-50 actived:dark:text-D-primary-100"
                                        >
                                            <p className="text-xs pr-2 pl-1">{getFarsiDate(item.sendDate).time}</p>
                                            <FiClock width={13} height={13} />
                                            <p className="text-xs pr-2 pl-1">{getFarsiDate(item.sendDate).farsiDate}</p>
                                            <CalendarIcon width={10} height={11} />
                                        </div>
                                    </div>
                                ))}
                    </>
                </ScrollableSlider>
            </div>
            <div className="flex flex-1 justify-between">
                <div className="flex gap-4">
                    <Tippy content={t('Basket.addNewBasket')} className="text-xs">
                        <button
                            onClick={toggleAddBasket}
                            data-cy="add-basket"
                            className="text-L-gray-500 duration-150 rounded-md dark:text-D-gray-500  hover:text-L-primary-50 dark:hover:text-D-primary-50 outline-none"
                        >
                            <PlusIcon />
                        </button>
                    </Tippy>
                    <Tippy content={t('Basket.editBasket')} className="text-xs">
                        <button
                            data-cy="edit-basket"
                            onClick={toggleEditBasket}
                            className="text-L-gray-500 rounded-md dark:text-D-gray-500 hover:text-L-primary-50 dark:hover:text-D-primary-50 outline-none"
                        >
                            <EditIcon2 />
                        </button>
                    </Tippy>
                </div>
                <div className="flex gap-2 items-center">
                    <Tippy content={t('Action_Button.ExportExcel')} className="text-xs">
                        <button className="px-[6px] py-[7px] h-fit rounded-md bg-L-gray-300 dark:bg-D-gray-300 text-L-gray-600 dark:text-D-gray-600">
                            <Excel2Icon width={20} height={18} className="cursor-pointer outline-none" />
                        </button>
                    </Tippy>
                    <Tippy content={t('Action_Button.EditTable')} className="text-xs">
                        <span>
                            <AGColumnEditor {...{ gridApi, lsKey: 'Basket' }} />
                        </span>
                    </Tippy>
                </div>
            </div>
            <AddBasketModal {...{ showAddForm, toggleAddBasket }} />
            <EditBasketModal {...{ showEditForm, toggleEditBasket, listBasket }} />
        </div>
    );
};

export default TopBasket;
