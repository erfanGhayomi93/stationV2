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
import AddSymbolAsPinned from 'src/common/components/AddSymbolAsPinned';

const SymbolHeader = () => {
    //
    const [isEventOpen, setIsEventOpen] = useState(false);
    const selectedSymbol = useAppSelector(getSelectedSymbol);
    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            clientSideAlertEnabled: data?.alerts?.clientSideAlertEnabled,
            symbolTitle: data?.symbolData?.symbolTitle,
            companyName: data?.symbolData?.companyName,
            symbolState: data?.symbolData?.symbolState,
            insCode: data?.symbolData?.insCode,
            companyCode: data?.symbolData?.companyCode,
            symbolEvents: data?.symbolData?.eventsWithinNextTenDays || [],
            hasRiskAnnouncement: data?.symbolData?.hasRiskAnnouncement,
            exchange: data?.symbolData?.exchange,
            isIpo: data?.symbolData.isIpo || false
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

    const symbolStateColor = (type: `bg` | `text`) => {
        if (data?.symbolState === 'OrderEntryAuthorized_Open') return `${type}-L-success-200`; //مجاز
        else if (data?.symbolState === 'OrderEntryAuthorized_Reserved') return `${type}-L-warning`; //مجاز_محفوظ
        else if (data?.symbolState === 'OrderEntryAuthorized_Frozen') return `${type}-L-error-200`; //ممنوع
        else if (data?.symbolState === 'OrderEntryForbidden_Suspended') return `${type}-L-error-200`; //ممنوع_متوقف
        else if (data?.symbolState === 'OrderEntryForbidden_Open') return `${type}-L-warning`; //مجاز_متوقف
        else if (data?.symbolState === 'OrderEntryForbidden_Reserved') return `${type}-L-warning`; //ممنوع-محفوظ

        else return type + '-L-gray-600';
    }

    const symbolStateTooltip = () => {
        if (data?.symbolState === 'OrderEntryAuthorized_Open') return 'مجاز';
        else if (data?.symbolState === 'OrderEntryAuthorized_Reserved') return 'مجاز_محفوظ';
        else if (data?.symbolState === 'OrderEntryAuthorized_Frozen') return 'ممنوع';
        else if (data?.symbolState === 'OrderEntryForbidden_Suspended') return 'ممنوع_متوقف';
        else if (data?.symbolState === 'OrderEntryForbidden_Open') return 'مجاز_متوقف';
        else if (data?.symbolState === 'OrderEntryForbidden_Reserved') return 'ممنوع-محفوظ';

        else return '';
    }

    return (
        <>
            <div className="flex w-full">
                <div className="flex items-center gap-1">
                    {!!data?.symbolEvents.length && (
                        <span onClick={() => setIsEventOpen(!isEventOpen)} className={clsx('cursor-pointer ml-2', [!seen && 'animate-spin-slow'])}>
                            <SandClockIcon />
                        </span>
                    )}
                    <span className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <SymbolState
                                symbolState={data?.symbolState || ''}
                                symbolStateColor={symbolStateColor('bg')}
                                symbolStateTooltip={symbolStateTooltip()}
                            />
                            <h4 className="text-L-gray-700 dark:text-D-gray-700 font-medium">{data?.symbolTitle || '-'}</h4>
                            <h4 className={symbolStateColor('text')}>{symbolStateTooltip()}</h4>
                            <h4 className="text-L-gray-500 dark:text-D-gray-500">
                                {data?.exchange ? `(${t('exchange_type.' + data?.exchange)})` : ''}
                            </h4>
                            {data?.clientSideAlertEnabled && (
                                <Tippy content={t('Tooltip.Caution')}>
                                    <RiskAnnouncementIcon />
                                </Tippy>
                            )}
                            {data?.hasRiskAnnouncement && (
                                <Tippy content={t('Tooltip.hasRiskAnnouncement')}>
                                    <RiskAnnouncementIcon />
                                </Tippy>
                            )}

                            {
                                data?.isIpo && (
                                    <h4 className='py-1 px-2 text-L-warning dark:text-D-warning bg-L-warning/10 dark:bg-D-warning/10 rounded-lg'>عرضه اولیه</h4>
                                )
                            }

                        </div>
                        <h4 className="text-L-gray-500 dark:text-D-gray-500">{data?.companyName || '-'}</h4>
                    </span>
                </div>
                <div className="mr-auto flex gap-x-3">
                    <AddSymbolAsPinned symbolISIN={selectedSymbol} />
                    <AddToWatchlistButton symbolISIN={selectedSymbol} />
                    <CodalBtn symbolTitle={data?.symbolTitle || ''} />
                    <TseBtn insCode={data?.insCode || ''} />
                </div>
            </div>
            <div
                data-actived={isEventOpen}
                onClick={GoToCalender}
                className="text-L-primary-50 dark:text-D-primary-50 cursor-pointer overflow-hidden duration-300 max-h-0 actived:max-h-[100px] mr-4"
            >
                {t('SymbolDetails.meetingWithinNextTenDays')}
            </div>
        </>
    );
};

export default React.memo(SymbolHeader);

//link for adding symbol logos, there's a teeny tiny possibility for adding it later on
//https://resource.ramandtech.com/CompanyLogo/${data?.companyCode}_40_40.jpg
