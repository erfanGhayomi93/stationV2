import { useQuerySymbolGeneralInformation } from "@api/Symbol"
import { CodalIcon, LinkIcon, PinnedIcon, RiskAnnouncementIcon, TseIcon, UpArrowIcon, WatchlistNegativeIcon } from "@assets/icons"
import SymbolState from "./SymbolState"
import { useTranslation } from "react-i18next"
import Tippy from "@tippyjs/react"
import clsx from "clsx"
import { sepNumbers } from "@methods/helper"
import { useCallback, useRef, useState } from "react"
import Dropdown from "@uiKit/Dropdown"
import { useSymbolManager } from "@zustand/symbol"


export const MainSymbol = () => {

    const { t } = useTranslation()

    const refDropdown = useRef<HTMLDivElement>(null)

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const selectedSymbol = useSymbolManager(state => state.selectedSymbol);

    const { data } = useQuerySymbolGeneralInformation<ISymbolGeneralInformationSelectHeaderSymbol>
        (selectedSymbol, (data) => ({
            clientSideAlertEnabled: data?.alerts?.clientSideAlertEnabled,
            symbolTitle: data?.symbolData?.symbolTitle,
            companyName: data?.symbolData?.companyName,
            symbolState: data?.symbolData?.symbolState,
            insCode: data?.symbolData?.insCode,
            companyCode: data?.symbolData?.companyCode,
            symbolEvents: data?.symbolData?.eventsWithinNextTenDays || [],
            hasRiskAnnouncement: data?.symbolData?.hasRiskAnnouncement,
            exchange: data?.symbolData?.exchange,
            isIpo: data?.symbolData.isIpo || false,
            lastTradedPrice: data?.symbolData.lastTradedPrice,
            lastTradedPriceVarPercent: data?.symbolData.lastTradedPriceVarPercent,
            closingPrice: data?.symbolData.closingPrice,
            closingPriceVarPercent: data?.symbolData.closingPriceVarPercent,
        }))

    const symbolStateTooltip = () => {
        if (data?.symbolState === 'OrderEntryAuthorized_Open') return 'مجاز';
        else if (data?.symbolState === 'OrderEntryAuthorized_Reserved') return 'مجاز_محفوظ';
        else if (data?.symbolState === 'OrderEntryAuthorized_Frozen') return 'ممنوع';
        else if (data?.symbolState === 'OrderEntryForbidden_Suspended') return 'ممنوع_متوقف';
        else if (data?.symbolState === 'OrderEntryForbidden_Open') return 'مجاز_متوقف';
        else if (data?.symbolState === 'OrderEntryForbidden_Reserved') return 'ممنوع-محفوظ';

        else return '';
    }

    const symbolStateColor = useCallback((type: 'bg' | 'text') => {
        if (!data?.symbolState) return "";

        const stateClasses: Record<string, string> = {
            'OrderEntryAuthorized_Open': type + '-content-success-buy', // مجاز
            'OrderEntryAuthorized_Reserved': `${type}-content-warnning`, // مجاز_محفوظ
            'OrderEntryAuthorized_Frozen': `${type}-content-error-sell`, // ممنوع
            'OrderEntryForbidden_Suspended': `${type}-content-error-sell`, // ممنوع_متوقف
            'OrderEntryForbidden_Open': `${type}-content-warnning`, // مجاز_متوقف
            'OrderEntryForbidden_Reserved': `${type}-content-warnning`, // ممنوع-محفوظ
        };

        return stateClasses[data?.symbolState as string];
    }, [data?.symbolState])

    const drop = [
        { label: "سایت TSE ", icon: TseIcon, onclick: () => null },
        { label: "سایت کدال", icon: CodalIcon, onclick: () => null },
    ]

    return (
        <div className="flex justify-between items-center text-sm">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-1 items-center">
                    <SymbolState
                        symbolState={data?.symbolState || ''}
                        symbolStateColor={symbolStateColor}
                        symbolStateTooltip={symbolStateTooltip()}
                    />
                    <span className="text-content-title font-bold">{data?.symbolTitle}</span>
                    <span className={symbolStateColor('text')}>{symbolStateTooltip()}</span>
                    <span className="text-content-deselecttab">
                        {data?.exchange ? t(`exchange_type.${data?.exchange as ExchangeType}`) : '-'}
                    </span>
                    {data?.hasRiskAnnouncement && (
                        <Tippy content={t('tooltip.hasRiskAnnouncement')} >
                            <span>
                                <RiskAnnouncementIcon className="text-content-warnning" />
                            </span>
                        </Tippy>
                    )}
                </div>
                <div>
                    <span className="text-content-deselecttab">{data?.companyName}</span>
                </div>
            </div>

            <div className="bg-back-2 rounded px-4 py-2 flex">
                <div className="flex gap-x-6 border-l border-back-1 pl-4">
                    <span>آخرین قیمت:</span>
                    <span className="flex gap-x-1">
                        <span
                            className={clsx("ltr", {
                                "text-content-success-buy": Number(data?.lastTradedPriceVarPercent) > 0,
                                "text-content-error-sell": Number(data?.lastTradedPriceVarPercent) < 0,
                            })}
                        >{`(${data?.lastTradedPriceVarPercent || '0'}%)`}</span>
                        <span className="text-content-title">{sepNumbers(Number(data?.lastTradedPrice || '0'))}</span>
                    </span>
                </div>

                <div className="flex gap-x-6 pr-4">
                    <span>اخرین قیمت:</span>
                    <span className="flex gap-x-1">
                        <span
                            className={clsx("ltr", {
                                "text-content-success-buy": Number(data?.closingPriceVarPercent) > 0,
                                "text-content-error-sell": Number(data?.closingPriceVarPercent) < 0,
                            })}
                        >{`(${data?.closingPriceVarPercent || '0'}%)`}</span>
                        <span className="text-content-title">{sepNumbers(Number(data?.closingPrice || 0))}</span>
                    </span>
                </div>

            </div>

            <div className="flex gap-x-1">
                <span className="p-1 bg-back-2 rounded flex items-center">
                    <PinnedIcon className="text-icon-warning" />
                </span>
                <span className="p-1 bg-back-2 rounded flex items-center">
                    <WatchlistNegativeIcon className="text-icon-primary" />
                </span>
                <span
                    className="p-1 bg-back-2 rounded flex items-center"
                    ref={refDropdown}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <LinkIcon className="text-icon-default" />

                    {
                        !!isDropdownOpen && (
                            <Dropdown<any>
                                ref={refDropdown}
                                isDropdownOpen={isDropdownOpen}
                                closeDropDowns={() => setIsDropdownOpen(false)}
                                data={drop}
                                classes={{ position: "top-6 left-0" }}
                                animate="fadeIn"
                                getLabel={
                                    (option) => (
                                        <button
                                            className="flex justify-between items-center w-full"
                                            onClick={() => {
                                                option.onclick()
                                                setIsDropdownOpen(false)
                                            }}
                                        >
                                            <div className="flex gap-x-2">
                                                <option.icon className="text-icon-default" />
                                                <span className="text-content-paragraph">{option.label}</span>
                                            </div>

                                            <UpArrowIcon className="-rotate-90 text-icon-default" />
                                        </button>
                                    )
                                }
                            />
                        )
                    }
                </span>
            </div>


        </div>
    )
}
