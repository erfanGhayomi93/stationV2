import { useWatchListsQuery } from 'src/app/queries/watchlist';
import Modal from 'src/common/components/Modal';
import { CloseIcon, DeleteIcon, EditIcon2, GearIcon } from 'src/common/icons';
import { useWatchListState } from '../context/WatchlistContext';
import Switcher from 'src/common/components/SwitchButton';

type IEditWatchlistModalType = {};

const EditWatchlistModal = ({}: IEditWatchlistModalType) => {
    const { setState, state } = useWatchListState();
    const { data: watchlists } = useWatchListsQuery();

    const closeModal = () => {
        setState({ type: 'TOGGLE_EDIT_MODE', value: false });
    };
    return (
        <>
            <Modal isOpen={state.editMode} onClose={closeModal} className="min-h-[20rem] w-1/4 rounded-md h-full grid ">
                <div className="grid grid-rows-min-one">
                    <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                        <div>ویرایش گروه‌های دیده‌بان</div>
                        <CloseIcon onClick={closeModal} className="cursor-pointer" />
                    </div>
                    <div className="p-4 text-1.2">
                        <div className="flex bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg py-2 text-L-gray-450 dark:text-D-gray-450 font-semibold">
                            <div className="w-full flex items-center justify-center">عنوان دیده‌بان</div>
                            <div className="w-full flex items-center justify-center">نمایش</div>
                            <div className="w-full flex items-center justify-center">عملیات</div>
                        </div>
                        {watchlists?.map((watchlist) => (
                            <div
                                key={watchlist.id}
                                className="flex  py-1.5 odd:bg-L-gray-200 odd:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300 text-L-gray-450 dark:text-D-gray-450"
                            >
                                <div className="w-full flex items-center justify-center"> {watchlist.watchListName}</div>
                                <div className="w-full flex items-center justify-center">
                                    <Switcher onCheck={(value: any) => console.log(value)} value={watchlist.isPinned} />
                                </div>
                                <div className="w-full flex items-center justify-center gap-3">
                                    <EditIcon2 />
                                    <DeleteIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditWatchlistModal;
