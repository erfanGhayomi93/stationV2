import clsx from 'clsx';
import { FC, useState } from 'react';
import { FiClock, ExpandArrow } from 'src/common/icons';
import { Disclosure, Transition } from '@headlessui/react';
import { getFarsiDate, howLongAgo } from 'src/utils/helpers';
import { useReadTodaySupervisorMessages } from 'src/app/queries/messages';
import { useSliderDispatch } from 'src/app/Layout/Sider/context';
import { REadSupervisorEnum } from 'src/app/Layout/Sider/context/types';

type CArdMesaage = {
    data: SUpervisorMessageResult;
    isOneSymbol?: boolean;
};

export const CardMessage: FC<CArdMesaage> = ({ data, isOneSymbol }) => {
    const { dateOfEvent, messageBody, messageTitle, read, type } = data;
    const { mutate } = useReadTodaySupervisorMessages();
    const [isRead, setisRead] = useState(read);
    const dispatch = useSliderDispatch();

    const handleClickTitle = () => {
        if (!isRead) {
            mutate(data.id);
            setisRead(true);
            dispatch && dispatch({ type: REadSupervisorEnum.READ_MESSAGE });
        }
    };

    return (
        <div>
            <Disclosure>
                <div
                    className={clsx(
                        {
                            'bg-L-gray-100 dark:bg-D-gray-300': !isRead,
                        },
                        'border-b border-gray-300',
                    )}
                >
                    <Disclosure.Button className="w-full" onClick={handleClickTitle}>
                        <div
                            className={clsx('flex items-center justify-between pt-2 pb-1', {
                                'px-4': !isOneSymbol,
                            })}
                        >
                            <div className="flex-grow flex flex-col justify-between h-full">
                                <div className="flex items-center">
                                    {type && (
                                        <span
                                            className={clsx(
                                                {
                                                    'bg-L-success-150 dark:bg-D-success-150': type === 'Oppening',
                                                    'bg-L-error-150 dark:bg-D-error-150': type === 'Stop',
                                                    'bg-L-warning dark:bg-D-warning': type === 'Limitation',
                                                    'bg-L-info-100 dark:bg-D-info-100': type === 'Information',
                                                },
                                                'rounded p-1',
                                            )}
                                        />
                                    )}
                                    <h1 className={clsx('text-xs font-normal text-L-gray-500 dark:text-D-gray-500 mr-2 p-0')}>{messageTitle}</h1>
                                </div>

                                <span className="flex items-center mt-2">
                                    <FiClock className="text-L-gray-400 dark:text-D-gray-400" width="14" height="14" />
                                    <span className="text-xs font-normal text-L-gray-400 dark:text-D-gray-400 mr-1">
                                        {getFarsiDate(dateOfEvent).time}

                                        {' | '}
                                        {howLongAgo(new Date(dateOfEvent).getTime())}
                                    </span>
                                </span>
                            </div>
                            {!isOneSymbol && (
                                <div className="flex-grow-0 flex flex-col text-right p-0 m-0">
                                    <div className="text-left w-full mb-1 mt-0 mx-0 p-0">
                                        <button type="button" className="btn btn-icon text-L-gray-400 dark:text-D-gray-400 mr-auto ml-0 p-0">
                                            <ExpandArrow width="24" height="24" />
                                        </button>
                                    </div>
                                    <span className="text-xs font-normal text-L-gray-400 dark:text-D-gray-400 p-0 m-0 whitespace-nowrap">
                                        {isRead ? 'خوانده شده' : ''}
                                    </span>
                                </div>
                            )}
                        </div>
                    </Disclosure.Button>

                    <Transition
                        enter="ease-in-out"
                        enterFrom="translate-x-full opacity-0"
                        enterTo="translate-x-0 opacity-100"
                        leave="ease-out"
                        leaveFrom="translate-x-0 opacity-100"
                        leaveTo="translate-x-full opacity-0"
                    >
                        <Disclosure.Panel className="text-xs font-normal text-L-gray-400 dark:text-D-gray-400 py-2 px-4 text-right">
                            {messageBody}
                        </Disclosure.Panel>
                    </Transition>
                </div>
            </Disclosure>
        </div>
    );
};
