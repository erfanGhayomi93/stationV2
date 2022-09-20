import { FC, Fragment, useState } from 'react';
import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import SearchInput from './components/SearchInput';
import { WatcherMessages } from './components/WatcherMessages';
import { useMessagesSuppervisor } from 'src/app/queries/messages';

type SUpervisorMassage = {
    flagToggle: boolean;
    setFlagToggle: (val: boolean) => void;
};

const tabList = [{ tab: 'پیام های ناظر دیدبان' }, { tab: 'پیام های ناظر بازار' }, { tab: 'پیام های مدیر سیستم' }];

export const SupervisorMassage: FC<SUpervisorMassage> = ({ flagToggle, setFlagToggle }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchValue, setsearchValue] = useState('');
    const MessagesSuppervisor = useMessagesSuppervisor();

    const countNumberMessage = () => {
        let counter = 0;
        MessagesSuppervisor.data?.forEach((item) => {
            if (!item.read) ++counter;
        });
        return counter;
    };

    return (
        <Modal isOpen={flagToggle} onClose={setFlagToggle} className="min-h-[40rem] w-[600px] rounded-md h-full grid">
            <div className="grid grid-rows-min-one">
                <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                    <p>پیام ها</p>
                    <CloseIcon onClick={() => setFlagToggle(false)} className="cursor-pointer" />
                </div>
                <div className="pt-5 pb-4 bg-L-basic dark:bg-D-basic">
                    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
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
                                                {`${item.tab}(${countNumberMessage()})`}
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
                            <Tab.Panel>1 </Tab.Panel>
                            <Tab.Panel>
                                {' '}
                                <WatcherMessages data={MessagesSuppervisor.data} searchValue={searchValue} />
                            </Tab.Panel>
                            <Tab.Panel>Content 3</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </Modal>
    );
};
