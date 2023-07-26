import clsx from 'clsx';
import dayjs from 'dayjs';
import { FC , useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SimpleDatepicker from 'src/common/components/Datepicker/SimpleDatepicker';
import Select from 'src/common/components/Select';
import { VALIDITY_OPTIONS } from 'src/constant/validity';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

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
        const selectedDate =  VALIDITY_OPTIONS.find((x) => x.value === validity)?.validityDate

        setValidityDate(selectedDate);
    }, [validity])
    

    return (
        <div className="flex  gap-2 w-full  ">
            <div className="flex pr-2 items-center gap-2 w-6/12">
                <span className="w-[64px]">اعتبار</span>
                <Select
                    onChange={(selected) => handleValidityState(selected)}
                    value={validity}
                    options={VALIDITY_OPTIONS.map((item) => ({ value: item.value, label: t('BSModal.validity_' + item.value) }))}
                />
                {/* {VALIDITY_OPTIONS.map((item, inx) => (
                        <SelectOption
                            key={inx}
                            label={t('BSModal.validity_' + item.value)}
                            value={item}
                            className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                        />
                    ))}
                </Select> */}
            </div>
            <div
                className={clsx(
                    'h-full flex items-center grow z-10',
                    ['Day', 'Week', 'Month', 'FillAndKill', 'GoodTillCancelled'].includes(validity) ? 'opacity-60 cursor-not-allowed' : '',
                )}
            >
                <SimpleDatepicker
                    disable={['Day', 'Week', 'Month', 'FillAndKill', 'GoodTillCancelled'].includes(validity)}
                    defaultValue={validityDate}
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
