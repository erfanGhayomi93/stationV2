import React, { useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import AddToWatchlistButton from 'src/common/components/AddToWatchlistButton';
import CodalBtn from 'src/common/components/Buttons/CodalBtn';
import TseBtn from 'src/common/components/Buttons/TseBtn';
import SymbolState from 'src/common/components/SymbolState';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol } from 'src/redux/slices/option';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { RiskAnnouncementIcon, SandClockIcon } from 'src/common/icons';
import { t } from 'i18next';
import Tippy from '@tippyjs/react';

const SymbolHeader = () => {
    //
    const [isEventOpen, setIsEventOpen] = useState(false);
    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            symbolTitle: data?.symbolData?.symbolTitle,
            companyName: data?.symbolData?.companyName,
            symbolState: data?.symbolData?.symbolState,
            insCode: data?.symbolData?.insCode,
            companyCode: data?.symbolData?.companyCode,
            symbolEvents: data?.symbolData?.eventsWithinNextTenDays || [],
            hasRiskAnnouncement: data?.symbolData?.hasRiskAnnouncement,
            exchange: data?.symbolData?.exchange,
        }),
    });
    const eventsIds = data?.symbolEvents.filter(({ type }) => type === 'Meeting').map(({ id }) => id) || [];
    const mergedAllEventsIds = eventsIds.join(''); // => unique string for save in ls.

    const [seen, setSeen] = useLocalStorage<boolean>('symbolEvent' + mergedAllEventsIds, false);
    const navigate = useNavigate();

    const GoToCalender = () => {
        setSeen(true);
        navigate('/Market/Calender', { state: eventsIds });
    };
    return (
        <div>
            <div className="flex items-center w-full ">
                <div className="flex items-center gap-1">
                    {!!data?.symbolEvents.length && (
                        <span onClick={() => setIsEventOpen(!isEventOpen)} className={clsx('cursor-pointer ml-2', [!seen && 'animate-spin-slow'])}>
                            <SandClockIcon />
                        </span>
                    )}
                    {/* <div className="">
                    <div className="w-[40px] h-[40px] bg-sky-400 rounded-full ">
                        {data?.companyCode && <img src={`https://resource.ramandtech.com/CompanyLogo/${data?.companyCode}_40_40.jpg`} alt={''} />}
                        </div>
                    </div> */}
                    <div className=" flex items-center gap-2 mb-2">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <SymbolState symbolState={data?.symbolState || ''} />
                                <h4 className="dark:text-L-basic">{data?.symbolTitle || '-'}</h4>
                                <h4 className="text-L-gray-500 dark:text-D-gray-500">
                                    {data?.exchange ? `( ${t('exchange_type.' + data?.exchange)} )` : ''}
                                </h4>
                                {data?.hasRiskAnnouncement && (
                                    <Tippy content={t('Tooltip.hasRiskAnnouncement')} className="cursor-help">
                                        <RiskAnnouncementIcon className="cursor-help" />
                                    </Tippy>
                                )}
                            </div>
                            <h4 className="text-L-gray-500 dark:text-D-gray-500 mr-4">{data?.companyName || '-'}</h4>
                        </div>
                    </div>
                </div>
                <div className="mr-auto flex items-center">
                    <AddToWatchlistButton symbolISIN={selectedSymbol} />
                    <CodalBtn symbolTitle={data?.symbolTitle || ''} />
                    <TseBtn insCode={data?.insCode || ''} />
                </div>
            </div>
            <div
                data-actived={isEventOpen}
                onClick={GoToCalender}
                className="text-L-primary-50 dark:text-D-primary-50 cursor-pointer overflow-hidden duration-300 max-h-0 actived:max-h-[100px] actived:my-2"
            >
                {t('SymbolDetails.meetingWithinNextTenDays')}
            </div>
        </div>
    );
};

export default React.memo(SymbolHeader);
