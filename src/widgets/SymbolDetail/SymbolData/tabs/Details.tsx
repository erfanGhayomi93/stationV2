import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import DataDisplay from 'src/common/components/DataDisplay';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { seprateNumber } from 'src/utils/helpers';

const Details = () => {
    //
    const selectedSymbol = useAppSelector(getSelectedSymbol)
    
    const { t } = useTranslation();

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            exchange: data?.symbolData?.exchange,
            lastTradeDateTime: data?.symbolData?.lastTradeDateTime,
            firstTradedPrice: data?.symbolData?.firstTradedPrice,
            baseVolume: data?.symbolData?.baseVolume,
            floatFree: data?.symbolData?.floatFree,
            fiscalYear: data?.symbolData?.fiscalYear,
            //
            oneMonthEfficiency: data?.symbolData?.oneMonthEfficiency,
            threeMonthEfficiency: data?.symbolData?.threeMonthEfficiency,
            oneYearEfficiency: data?.symbolData?.oneYearEfficiency,
            //
            totalNumberOfSharesTraded: data?.symbolData?.totalNumberOfSharesTraded,
            totalTradeValue: data?.symbolData?.totalTradeValue,
            //
            estimatedEPS: data?.symbolData?.eps,
            pe: data?.symbolData?.pe,
            sectorPE: data?.symbolData?.sectorPE,
        }),
    });

    const items = [
        { key: 1, label: 'نوع بازار', value: t('exchange_type.' + data?.exchange) || '-' },
        {
            key: 2,
            label: 'آخرین معامله',
            value:
                data?.lastTradeDateTime && !String(data?.lastTradeDateTime).includes('0001')
                    ? //@ts-ignore
                      dayjs(data?.lastTradeDateTime).calendar('jalali').format('YYYY/MM/DD hh:mm')
                    : '-',
        },
        { key: 3, label: 'ارزش (تعداد)', value: data?.totalTradeValue ? seprateNumber(data?.totalTradeValue) : '-' },
        { key: 4, label: 'اولین قیمت', value: data?.firstTradedPrice ? seprateNumber(data?.firstTradedPrice) : '-' },
        { key: 5, label: 'حجم معاملات', value: data?.totalNumberOfSharesTraded ? seprateNumber(data?.totalNumberOfSharesTraded) : '-' },
        { key: 6, label: 'حجم مبنا', value: data?.baseVolume ? seprateNumber(data?.baseVolume) : '-' },
        { key: 7, label: 'درصد شناور', value: data?.floatFree || '-' },
        { key: 8, label: 'سال مالی', value: data?.fiscalYear || '-' },
        { key: 9, label: 'EPS', value: data?.estimatedEPS || '-' },
        { key: 10, label: 'P/E', value: data?.pe || '-' },
        { key: 11, label: 'P/E گروه', value: data?.sectorPE || '-' },
        { key: 12, label: 'بازده یک ماه', value: data?.oneMonthEfficiency || '-' },
        { key: 13, label: 'بازده سه ماه', value: data?.threeMonthEfficiency || '-' },
        { key: 14, label: 'بازده یک سال', value: data?.oneYearEfficiency || '-' },
    ];

    return (
        <div className="w-full">
            <DataDisplay items={items} cols={2} />
        </div>
    );
};

export default Details;
