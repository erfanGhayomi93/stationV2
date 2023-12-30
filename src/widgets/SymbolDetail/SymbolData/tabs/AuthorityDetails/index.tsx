import { useAppSelector } from 'src/redux/hooks';
import { useOptionGeneralInformation, useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { getSelectedSymbol } from 'src/redux/slices/option';
import DataDisplay from 'src/common/components/DataDisplay';
import { seprateNumber } from 'src/utils/helpers';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { useEffect } from 'react';


const AuthorityDetails = () => {
    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const { t } = useTranslation();

    // const { data: dataOption } = useOptionGeneralInformation(selectedSymbol)

    // useEffect(() => {
    //     console.log("dataOption", dataOption)
    // }, [dataOption])




    // const { data } = useSymbolGeneralInfo(selectedSymbol, {
    //     select: (data) => ({
    //         exchange: data?.symbolData?.exchange,
    //         lastTradeDateTime: data?.symbolData?.lastTradeDateTime,
    //         firstTradedPrice: data?.symbolData?.firstTradedPrice,
    //         baseVolume: data?.symbolData?.baseVolume,
    //         floatFree: data?.symbolData?.floatFree,
    //         fiscalYear: data?.symbolData?.fiscalYear,
    //         //
    //         oneMonthEfficiency: data?.symbolData?.oneMonthEfficiency,
    //         threeMonthEfficiency: data?.symbolData?.threeMonthEfficiency,
    //         oneYearEfficiency: data?.symbolData?.oneYearEfficiency,
    //         //
    //         totalNumberOfSharesTraded: data?.symbolData?.totalNumberOfSharesTraded,
    //         totalTradeValue: data?.symbolData?.totalTradeValue,
    //         //
    //         estimatedEPS: data?.symbolData?.eps,
    //         pe: data?.symbolData?.pe,
    //         sectorPE: data?.symbolData?.sectorPE,
    //     }),
    // });

    const items = [
        { key: 1, label: t("symbol_option.opening_price"), value: "-" },
        { key: 2, label: t("symbol_option.yesterday_price"), value: "-" },
        { key: 3, label: t("symbol_option.max_price"), value: "-" },
        { key: 4, label: t("symbol_option.min_price"), value: "-" },
        { key: 6, label: t("symbol_option.initial_margin"), value: "-" },
        { key: 7, label: t("symbol_option.required_margin"), value: "-" },
        { key: 8, label: t("symbol_option.cash_settlement_date"), value: "-" },
        { key: 9, label: t("symbol_option.physical_settlement_date"), value: "-" },
        { key: 10, label: t("symbol_option.due_days"), value: "-" },
        { key: 11, label: t("symbol_option.contract_size"), value: "-" },
        { key: 12, label: t("symbol_option.strike_price"), value: "-" },
        { key: 13, label: t("symbol_option.base_price_closing"), value: "-" },
        { key: 14, label: t("symbol_option.open_position"), value: "-" },
        { key: 15, label: t("symbol_option.trade_volume"), value: "-" },
        // {
        //     key: 2,
        //     label: 'آخرین معامله',
        //     value:
        //         data?.lastTradeDateTime && !String(data?.lastTradeDateTime).includes('0001')
        //             ? //@ts-ignore
        //             dayjs(data?.lastTradeDateTime).calendar('jalali').format('YYYY/MM/DD hh:mm')
        //             : '-',
        // },
        // { key: 3, label: 'ارزش (تعداد)', value: data?.totalTradeValue ? seprateNumber(data?.totalTradeValue) : '-' },
        // { key: 4, label: 'اولین قیمت', value: data?.firstTradedPrice ? seprateNumber(data?.firstTradedPrice) : '-' },
        // { key: 5, label: 'حجم معاملات', value: data?.totalNumberOfSharesTraded ? seprateNumber(data?.totalNumberOfSharesTraded) : '-' },
        // { key: 6, label: 'حجم مبنا', value: data?.baseVolume ? seprateNumber(data?.baseVolume) : '-' },
        // { key: 7, label: 'درصد شناور', value: data?.floatFree || '-' },
        // { key: 8, label: 'سال مالی', value: data?.fiscalYear || '-' },
        // { key: 9, label: 'EPS', value: data?.estimatedEPS || '-' },
        // { key: 10, label: 'P/E', value: data?.pe || '-' },
        // { key: 11, label: 'P/E گروه', value: data?.sectorPE || '-' },
        // { key: 12, label: 'بازده یک ماه', value: data?.oneMonthEfficiency || '-' },
        // { key: 13, label: 'بازده سه ماه', value: data?.threeMonthEfficiency || '-' },
        // { key: 14, label: 'بازده یک سال', value: data?.oneYearEfficiency || '-' },
    ];


    return (
        <div className="w-full h-full">

            <DataDisplay items={items} cols={2} />

        </div>
    );
};

export default AuthorityDetails;
