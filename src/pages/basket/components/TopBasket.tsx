import { useState, FC, useEffect } from 'react';
import { useGetBasket } from 'src/app/queries/basket';
import Modal from 'src/common/components/Modal';
import { CalendarIcon, CloseIcon, EditIcon2, FiClock, PlusIcon } from 'src/common/icons';
import { getFarsiDate } from 'src/utils/helpers';
import CreateBasket from './CreateBasket';
import EditBasketModal from '../modal/EditBasketModal';
type ITopBasket = {
    activeBasket: number | undefined;
    saveIndexBasketSelected: (ind: number) => void;
};

const TopBasket: FC<ITopBasket> = ({ activeBasket, saveIndexBasketSelected }) => {
    const [isAddActive, setisAddActive] = useState(false);
    const [isEditActive, setisEditActive] = useState(false);
    const { data: listBasket } = useGetBasket();

    useEffect(() => {
        listBasket && saveIndexBasketSelected(listBasket[0].id);
    }, [listBasket]);

    const toggleAddBasket = () => {
        setisAddActive((prev) => !prev);
    };

    const toggleEditBasket = () => {
        setisEditActive((prev) => !prev);
    };

    return (
        <div className="flex gap-6 items-center w-[100%]">
            <div className="flex gap-4 my-7 max-w-[1200px] overflow-x-auto py-2">
                {listBasket &&
                    listBasket
                        .filter((item) => item.isPinned)
                        .map((item) => (
                            <div
                                key={item.id}
                                data-actived={activeBasket === item.id}
                                onClick={() => saveIndexBasketSelected(item.id)}
                                className="px-2 py-1 text-center whitespace-nowrap cursor-pointer rounded-lg text-L-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic actived:text-L-basic actived:dark:text-D-basic actived:bg-L-primary-50 actived:dark:bg-D-primary-50 border border-L-gray-350 dark:border-L-gray-350 actived:border-L-primary-50 actived:dark:border-D-primary-50"
                            >
                                <p className="text-xs">{item.name}</p>
                                <div
                                    data-actived={activeBasket === item.id}
                                    className="flex pt-1 text-L-gray-400 dark:text-D-gray-400 actived:text-L-primary-100 actived:dark:text-D-primary-100"
                                >
                                    <FiClock width={13} height={13} />
                                    <p className="pr-1 pl-2 text-xs">{getFarsiDate(item.sendDate).time}</p>
                                    <CalendarIcon width={10} height={11} />
                                    <p className="pr-1 text-xs">{getFarsiDate(item.sendDate).farsiDate}</p>
                                </div>
                            </div>
                        ))}
            </div>
            <button
                onClick={toggleAddBasket}
                className="flex items-center mr-4 w-[180px] text-L-primary-50 dark:text-D-primary-50 duration-150 rounded-md hover:bg-L-gray-150 dark:hover:bg-D-gray-150 outline-none"
            >
                <div className="bg-L-basic dark:bg-D-basic drop-shadow ml-2 rounded">
                    <PlusIcon />
                </div>
                <p>ایجاد سبد جدید</p>
            </button>

            <Modal isOpen={isAddActive} onClose={toggleAddBasket} className="min-h-[31rem] w-[500px] rounded-md h-full grid">
                <div className="grid grid-rows-min-one bg-L-basic dark:bg-D-basic">
                    <div className="w-full text-white font-medium  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                        <p>ایجاد سبد جدید</p>
                        <CloseIcon onClick={toggleAddBasket} className="cursor-pointer" />
                    </div>
                    <div className="p-4">
                        <CreateBasket toggleAddBasket={toggleAddBasket} />
                    </div>
                </div>
            </Modal>

            <button
                onClick={toggleEditBasket}
                className="flex items-center text-L-primary-50 dark:text-D-primary-50 rounded-md hover:bg-L-gray-150 dark:hover:bg-D-gray-150 outline-none"
            >
                <div className="bg-L-basic dark:bg-D-basic drop-shadow ml-2 rounded">
                    <EditIcon2 />
                </div>
                <p>ویرایش سبد</p>
            </button>

            <EditBasketModal {...{ isEditActive, toggleEditBasket, listBasket }} />
        </div>
    );
};

export default TopBasket;
