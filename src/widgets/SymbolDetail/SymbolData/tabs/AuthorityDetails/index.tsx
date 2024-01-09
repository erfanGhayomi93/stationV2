import { useAppSelector } from 'src/redux/hooks';
import { useOptionGeneralInformation, useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { getSelectedSymbol } from 'src/redux/slices/option';
import DataDisplay from 'src/common/components/DataDisplay';
import { seprateNumber } from 'src/utils/helpers';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';


const AuthorityDetails = () => {
    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const { t } = useTranslation();

    const { data: optionData } = useOptionGeneralInformation(selectedSymbol)


    const items = [
        { key: 1, label: t("symbol_option.opening_price"), value: seprateNumber(optionData?.openingPrice) },
        { key: 2, label: t("symbol_option.yesterday_price"), value: seprateNumber(optionData?.yesterdayPrice) },
        { key: 3, label: t("symbol_option.max_price"), value: seprateNumber(optionData?.maxPrice) },
        { key: 4, label: t("symbol_option.min_price"), value: seprateNumber(optionData?.minPrice) },
        { key: 6, label: t("symbol_option.initial_margin"), value: seprateNumber(optionData?.initialMargin) },
        { key: 7, label: t("symbol_option.required_margin"), value: seprateNumber(optionData?.requiredMargin) },
        { key: 8, label: t("symbol_option.cash_settlement_date"), value: dayjs(optionData?.cashSettlementDate).calendar("jalali").format("YYYY/MM/DD") },
        { key: 9, label: t("symbol_option.physical_settlement_date"), value: dayjs(optionData?.physicalSettlementDate).calendar("jalali").format("YYYY/MM/DD") },
        { key: 10, label: t("symbol_option.due_days"), value: Math.max(optionData?.dueDays || 0, 0) },
        { key: 11, label: t("symbol_option.contract_size"), value: seprateNumber(optionData?.contractSize) },
        { key: 12, label: t("symbol_option.strike_price"), value: seprateNumber(optionData?.strikePrice) },
        { key: 13, label: t("symbol_option.base_price_closing"), value: seprateNumber(optionData?.basePriceClosing) },
        { key: 14, label: t("symbol_option.open_position"), value: seprateNumber(optionData?.openPosition) },
        { key: 15, label: t("symbol_option.trade_volume"), value: seprateNumber(optionData?.tradeVolume) },
    ];

    const bottomItem = [
        { key: 16, label: t("symbol_option.maxOP"), value: seprateNumber(optionData?.maxOP) || 0 },
        { key: 17, label: t("symbol_option.maxCOP"), value: seprateNumber(optionData?.maxCOP) || 0 },
        { key: 18, label: t("symbol_option.maxCAOP"), value: seprateNumber(optionData?.maxCAOP) || 0 },
    ]


    return (
        <div className="w-full h-full">

            <DataDisplay items={items} cols={2} />

            {
                bottomItem.map(item => (
                    <div key={item.key} className="w-full flex items-center px-3 py-2 odd:bg-L-gray-100 dark:odd:bg-D-gray-100 text-L-gray-700 dark:text-D-gray-700 ">
                        <span>{item.label}</span>
                        <span>:</span>
                        <span className="mr-auto ltr">{item.value}</span>
                    </div>
                ))
            }

        </div>
    );
};

export default AuthorityDetails;
