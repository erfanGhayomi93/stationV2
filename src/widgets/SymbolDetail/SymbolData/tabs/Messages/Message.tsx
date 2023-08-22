import { Disclosure, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ChevronIcon, FiClock } from 'src/common/icons';
import { getFarsiDate } from 'src/utils/helpers';

const Message = ({ data }: { data: SUpervisorMessageResult }) => {
    //
    const { t } = useTranslation();
    const { dateOfEvent, messageBody, messageTitle } = data;
    const handleClickTitle = () => {};

    const renderTitle = (string: string) => {
        const splited = string.split(' ');

        const text = splited.map((x) => {
            if (t('common.opening') === x) {
                return <span className="text-L-success-200" key={x}>{` ${x} `}</span>;
            }
            if (t('common.stop') === x) {
                return <span className="text-L-error-200" key={x}>{` ${x} `}</span>;
            }
            if (t('common.limitation') === x) {
                return <span className="text-L-warning" key={x}>{` ${x} `}</span>;
            }
            if (t('common.offer') === x) {
                return <span className="text-L-info-100" key={x}>{` ${x} `}</span>;
            }

            return ` ${x} `;
        });

        return text;
    };

    return (
        <div className="mb-2">
            <Disclosure>
                {({ open }) => (
                    <div className={clsx('bg-L-gray-200 dark:bg-D-gray-200 rounded p-2')}>
                        <Disclosure.Button className="w-full" onClick={handleClickTitle}>
                            <div className={clsx('flex items-center justify-between')}>
                                <div className="flex items-center">
                                    <ChevronIcon
                                        width={12}
                                        height={12}
                                        className={clsx('duration-200 text-L-gray-500 dark:text-D-gray-500', open ? '' : 'rotate-180')}
                                    />
                                    <h1 className={clsx('text-xs text-D-basic dark:text-L-basic font-medium mr-2 p-0')}>
                                        {renderTitle(messageTitle)}
                                    </h1>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-L-gray-500 dark:text-D-gray-500">{getFarsiDate(dateOfEvent).time}</span>
                                    <FiClock className="text-L-gray-500 dark:text-D-gray-500" width="14" height="14" />
                                </div>
                            </div>
                        </Disclosure.Button>

                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="text-xs font-normal text-L-gray-500 dark:text-D-gray-500 py-2 px-4 text-right">
                                {messageBody}
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                )}
            </Disclosure>
        </div>
    );
};

export default Message;
