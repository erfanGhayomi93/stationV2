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


    return (
        <div className="w-full h-full">

            <DataDisplay items={items} cols={2} />

        </div>
    );
};

export default AuthorityDetails;
