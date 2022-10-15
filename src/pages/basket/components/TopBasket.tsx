import { useState, useRef, FC, FormEvent, useEffect } from 'react';
import { useGetBasket } from 'src/app/queries/basket';
import Modal from 'src/common/components/Modal';
import { CloseIcon, EditIcon2, PlusIcon } from 'src/common/icons';
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
        <div className="flex gap-6 items-center">
            <div className="flex gap-4 my-9">
                {listBasket &&
                    listBasket
                        .filter((item) => item.isPinned)
                        .map((item) => (
                            <div
                                key={item.id}
                                data-actived={activeBasket === item.id}
                                onClick={() => saveIndexBasketSelected(item.id)}
                                className="px-8 py-1 text-center whitespace-nowrap cursor-pointer rounded-3xl text-L-primary-50 dark:text-D-primary-50 bg-L-primary-100 dark:bg-D-primary-100 actived:text-L-basic actived:dark:text-D-basic actived:bg-L-primary-50 actived:dark:bg-D-primary-50"
                            >
                                <p>{item.name}</p>
                                <p>تاریخ ارسال {getFarsiDate(item.sendDate).farsiDayMonth}</p>
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
