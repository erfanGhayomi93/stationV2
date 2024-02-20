import { MouseEvent, useCallback, useMemo } from 'react'
import { Menu, Transition } from '@headlessui/react';
import { PlusIcon } from 'src/common/icons';
import { useGetIpo } from 'src/app/queries/symbol';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';



export const IpoList = () => {
    const { data } = useGetIpo()
    const dispatch = useAppDispatch()
    const { t } = useTranslation();


    const handleClickIpo = (e: MouseEvent<HTMLSpanElement>, symbolISIN: string) => {
        e.preventDefault()
        dispatch(setSelectedSymbol(symbolISIN))
    }


    const ipoRemaining = useCallback((data: IResponseIpoGet | undefined) => {
        if (!data) return ""

        const { remainingSeconds, ipoDate, canSendRequest } = data || {};

        const isIPOToday = useMemo(() => {
            const isDateValid = dayjs(ipoDate).isValid();
            if (isDateValid) {
                return dayjs(ipoDate).startOf('day').diff(dayjs().startOf('day')) === 0;
            }

            return false;
        }, [ipoDate]);

        const calcTime = () => {

            const timeDifference = Math.floor(remainingSeconds * 1000);

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            if (days > 0) return t('headerSec.ipo_remaining_days', { d: days });
            const remainingTime = timeDifference % (1000 * 60 * 60 * 24);
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % 1000 * 60) / 1000);
            if (hours > 0) return t(`headerSec.${canSendRequest ? 'ipo_until_hours' : 'ipo_remaining_hours'}`, { h: String(hours).padStart(2, "0"), m: String(minutes).padStart(2, "0") });

            return t(`headerSec.${canSendRequest ? 'ipo_until_minutes' : 'ipo_remaining_minutes'}`, { m: String(minutes).padStart(2, "0"), s: String(seconds).padStart(2, "0") });
        }

        if (remainingSeconds) return calcTime();
        if (isIPOToday && !remainingSeconds) return 'امروز';
        if (!isIPOToday && !remainingSeconds) return dayjs(ipoDate).calendar('jalali').format('YYYY/MM/DD');

    }, []);



    if (!data || data?.length === 0) {
        return null
    }

    return (
        <Menu>
            {({ open }) => (
                <div className="z-50 flex items-center">
                    <Menu.Button>
                        <span className='bg-L-success-200 dark:bg-D-success-200 text-L-basic dark:text-D-bastext-L-basic rounded-xl px-1 py-0.5'>عرضه اولیه</span>
                    </Menu.Button>

                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                        className="z-[1000]"
                    >
                        <Menu.Items
                            static={true}
                            className="absolute left-0 top-3 mt-2 w-48 origin-top-right divide-y bg-L-basic dark:bg-D-basic divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <Menu.Item>
                                <div>
                                    {
                                        data?.map(item => (
                                            <div key={item?.symbolISIN} className='flex justify-between p-2 items-center even:bg-L-gray-100 even:dark:bg-gray-100 hover:bg-L-gray-200 hover:dark:bg-gray-200'>
                                                <span className='w-1/3 truncate font-medium'>{item.symbolTitle}</span>
                                                <span className='flex-1'>{ipoRemaining(item)}</span>
                                                <span
                                                    className='bg-L-success-200 dark:bg-D-success-200 text-L-gray-200 dark:text-D-gray-200 rounded cursor-pointer'
                                                    onClick={(e) => handleClickIpo(e, item.symbolISIN)}
                                                >
                                                    <PlusIcon width={18} height={18} />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </div>
            )}
        </Menu>
    )
}
