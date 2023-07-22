import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, useEffect, useState } from 'react';
import { pushEngine } from 'src/api/pushEngine';
import { useSliderDispatch } from 'src/app/Layout/Sider/context';
import { COuntNumberSupervisorEnum } from 'src/app/Layout/Sider/context/types';
import { useMessagesSuppervisor } from 'src/app/queries/messages';
import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import SearchInput from './components/SearchInput';
import { WatcherMessages } from './components/WatcherMessages';

type SUpervisorMassage = {
    flagToggle: boolean;
    setFlagToggle: () => void;
    countNumberSupervisorMessage: number;
};

const tabList = [{ tab: 'پیام های ناظر بازار' }, { tab: 'پیام های ناظر دیدبان' }, { tab: 'پیام های مدیر سیستم' }];

export const SupervisorMassage: FC<SUpervisorMassage> = ({ flagToggle, setFlagToggle, countNumberSupervisorMessage }) => {
    // const [selectedIndex, setSelectedIndex] = useState(0); 17390069635676
    const [searchValue, setsearchValue] = useState('');
    const MessagesSuppervisor = useMessagesSuppervisor({
        onSuccess: (data) => {
            pushEngine.subscribe({
                id: 'supervisorMessage',
                mode: 'RAW',
                isSnapShot: 'no',
                adapterName: 'RamandOMSGateway',
                items: ['173_1890078169235', '173_All'],
                fields: ['OMSMessage', 'AdminMessage', 'SystemMessage'],
                onFieldsUpdate: (item) => {
                    console.log('item', item);
                },
            });
        },
    });
    const dispatch = useSliderDispatch();

    useEffect(() => {
        let counter = 0;
        MessagesSuppervisor.data?.forEach((item) => {
            if (!item.read) ++counter;
        });

        dispatch({ type: COuntNumberSupervisorEnum.COUNT_NUMBER, payload: counter });
    }, [MessagesSuppervisor.data]);

    return (
        <Modal isOpen={flagToggle} onClose={setFlagToggle} className="min-h-[40rem] w-[800px] h-[500] rounded-md grid">
            <div className="grid grid-rows-min-one">
                <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                    <p>پیام ها</p>
                    <CloseIcon onClick={setFlagToggle} className="cursor-pointer" />
                </div>
                <div className="pt-5 pb-4 bg-L-basic dark:bg-D-basic">
                    <Tab.Group
                    // selectedIndex={selectedIndex}
                    //  onChange={setSelectedIndex}
                    >
                        <Tab.List>
                            <div className="border-b border-L-gray-350 dark:border-D-gray-350 flex px-5">
                                {tabList.map((item, ind) => (
                                    <Tab as={Fragment} key={ind}>
                                        {({ selected }) => (
                                            <button
                                                className={clsx({
                                                    'ml-4 border-b-2 pb-2': true,
                                                    'border-L-primary-50 dark:border-D-primary-50  text-L-primary-50 pb-2 dark:text-D-primary-50':
                                                        selected,
                                                    'border-transparent text-L-gray-500 dark:text-D-gray-500': !selected,
                                                })}
                                            >
                                                {item.tab} ({ind === 1 || ind === 2 ? '0' : countNumberSupervisorMessage})
                                            </button>
                                        )}
                                    </Tab>
                                ))}
                            </div>
                        </Tab.List>

                        <div className="my-3 px-4">
                            <SearchInput state={searchValue} setState={setsearchValue} />
                        </div>

                        <Tab.Panels>
                            <Tab.Panel>
                                <WatcherMessages data={MessagesSuppervisor.data} searchValue={searchValue} />
                            </Tab.Panel>
                            <Tab.Panel>پیاده سازی نشده</Tab.Panel>
                            <Tab.Panel>پیاده سازی نشده</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </Modal>
    );
};
