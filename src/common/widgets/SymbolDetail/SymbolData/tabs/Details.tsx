import dayjs from 'dayjs';
import React from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries';
import DataDisplay from 'src/common/components/DataDisplay';
import { useAppValues } from 'src/redux/hooks';
import { sepNumbers } from 'src/utils/helpers';

const Details = () => {
    //

    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            symbolType: data?.symbolData?.symbolType,
            lastTradedDate: data?.symbolData?.lastTradedDate,
            lastTradeDateTime: data?.symbolData?.lastTradeDateTime, // which to use ?
            oneMonthEfficiency: data?.symbolData?.oneMonthEfficiency,
            threeMonthEfficiency: data?.symbolData?.threeMonthEfficiency,
            oneYearEfficiency: data?.symbolData?.oneYearEfficiency,
            pe: data?.symbolData?.pe,
            sectorPE: data?.symbolData?.sectorPE,
            openPrice: data?.symbolData?.openPrice,
            firstTradedPrice: data?.symbolData?.firstTradedPrice,
        }),
    });

    const items = [
        { key: 1, label: 'نوع بازار', value: data?.symbolType || '-' },
        {
            key: 2,
            label: 'آخرین معامله',
            value:
                data?.lastTradedDate && !String(data?.lastTradedDate).includes('0001')
                    ? dayjs(data?.lastTradedDate).calendar('jalali').format('hh:mm YYYY/MM/DD')
                    : '-',
        },
        { key: 3, label: 'ارزش (تعداد)', value: '-' },
        { key: 4, label: 'اولین قیمت', value: data?.firstTradedPrice ? sepNumbers(data?.firstTradedPrice) : '-' }, // firstTradedPrice or openPrice
        { key: 5, label: 'حجم معاملات', value: '-' },
        { key: 6, label: 'حجم مبنا', value: '-' },
        { key: 7, label: 'درصد شناور', value: '-' },
        { key: 8, label: 'سال مالی', value: '-' },
        { key: 9, label: 'EPS', value: '-' },
        { key: 10, label: 'P/E', value: data?.pe || '-' },
        { key: 11, label: 'P/E گروه', value: data?.sectorPE || '-' },
        { key: 12, label: 'بازده یک ماه', value: data?.oneMonthEfficiency || '-' },
        { key: 13, label: 'بازده سه ماه', value: data?.threeMonthEfficiency || '-' },
        { key: 14, label: 'بازده یک سال', value: data?.oneYearEfficiency || '-' },
    ];

    return (
        <div className="w-full h-full">
            <DataDisplay items={items} cols={2} />
        </div>
    );
};

export default Details;
