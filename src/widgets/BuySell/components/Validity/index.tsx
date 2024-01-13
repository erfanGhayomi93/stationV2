import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'src/common/components/Select';
import { VALIDITY_OPTIONS } from 'src/constant/validity';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import { useAppSelector } from 'src/redux/hooks';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { getSelectedSymbol } from 'src/redux/slices/option';


interface IBuySellValidityType { }

const BuySellValidity: FC<IBuySellValidityType> = ({ }) => {
    const dispatch = useBuySellDispatch();
    const { validity, validityDate, side } = useBuySellState();
    const setValidity = (value: validity) => dispatch({ type: 'SET_VALIDITY', value });
    const setValidityDate = (value: string | null) => dispatch({ type: 'SET_VALIDITY_DATE', value });
    const { t } = useTranslation();

    const selectedSymbol = useAppSelector(getSelectedSymbol)
    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => ({ isOption: data.symbolData.isOption }) });

    const handleValidityState = (select: any) => {
        setValidity(select);
    };

    useEffect(() => {
        if (validity === 'GoodTillDate') return

        const selectedDate = VALIDITY_OPTIONS.find((x) => x.value === validity)?.validityDate;
        setValidityDate(selectedDate || null);

    }, [validity]);


    useEffect(() => {
        if (symbolData?.isOption && validity !== "Day") {
            setValidity(VALIDITY_OPTIONS[0].value as validity)
        }
    }, [symbolData?.isOption])




    return (
        <div className="flex gap-2 w-full">
            <div className="flex items-center flex-1">
                <span className="w-16 pr-2">اعتبار</span>

                <div className="flex-1">
                    <Select
                        onChange={(selected) => handleValidityState(selected)}
                        value={validity}
                        options={VALIDITY_OPTIONS.map((item) => ({ value: item.value, label: t('BSModal.validity_' + item.value) }))}
                        disabled={symbolData?.isOption && side === "Sell"}
                    />
                </div>
            </div>
            <div
                className={clsx(
                    'h-full flex items-center w-1/2 z-10',
                    ['Day', 'Week', 'Month', 'FillAndKill', 'GoodTillCancelled'].includes(validity) ? 'hidden' : '',
                )}
            >
                <AdvancedDatepicker
                    value={validityDate}
                    onChange={(value) =>
                        setValidityDate(
                            dayjs(value as any)
                                .calendar('gregory')
                                .format('YYYY-MM-DD'),
                        )
                    }
                />
            </div>
        </div>
    );
};

export default BuySellValidity;
