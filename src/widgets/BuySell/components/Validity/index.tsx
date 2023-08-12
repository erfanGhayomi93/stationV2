import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'src/common/components/Select';
import { VALIDITY_OPTIONS } from 'src/constant/validity';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';


interface IBuySellValidityType {}

const BuySellValidity: FC<IBuySellValidityType> = ({}) => {
    const dispatch = useBuySellDispatch();
    const { validity, validityDate } = useBuySellState();
    const setValidity = (value: validity) => dispatch({ type: 'SET_VALIDITY', value });
    const setValidityDate = (value: string | undefined) => dispatch({ type: 'SET_VALIDITY_DATE', value });
    const { t } = useTranslation();

    const handleValidityState = (select: any) => {
        setValidity(select);
    };

    useEffect(() => {
        const selectedDate = VALIDITY_OPTIONS.find((x) => x.value === validity)?.validityDate;

        setValidityDate(selectedDate);
    }, [validity]);

    return (
        <div className="flex  gap-2 w-full">
            <div className="flex pr-2 items-center flex-1 gap-2">
                <span className="w-[46px]">اعتبار</span>

                <div className="flex-1">
                    <Select
                        onChange={(selected) => handleValidityState(selected)}
                        value={validity}
                        options={VALIDITY_OPTIONS.map((item) => ({ value: item.value, label: t('BSModal.validity_' + item.value) }))}
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
