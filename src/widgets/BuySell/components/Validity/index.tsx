import { FC, useEffect } from 'react';
import Select, { SelectOption } from 'src/common/components/Select';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { VALIDITY_OPTIONS } from 'src/constant/validity';
import i18next from 'i18next';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import dayjs from 'dayjs';
import clsx from 'clsx';
import SimpleDatepicker from 'src/common/components/Datepicker/SimpleDatepicker';

interface IBuySellValidityType {}

const BuySellValidity: FC<IBuySellValidityType> = ({}) => {
    const dispatch = useBuySellDispatch();
    const { validity, validityDate } = useBuySellState();
    const setValidity = (value: validity) => dispatch({ type: 'SET_VALIDITY', value });
    const setValidityDate = (value: string | undefined) => dispatch({ type: 'SET_VALIDITY_DATE', value });
    const today = dayjs().valueOf();

    const handleValidity = (value: validity) => {
        setValidity(value);
        value !== 'GoodTillDate' && setValidityDate(undefined);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <Select
                title="اعتبار"
                onChange={(select: typeof VALIDITY_OPTIONS[0]) => handleValidity(select.value as validity)}
                value={i18next.t('BSModal.validity_' + validity)}
            >
                {VALIDITY_OPTIONS.map((item, inx) => (
                    <SelectOption
                        key={inx}
                        label={i18next.t('BSModal.validity_' + item.value)}
                        value={item}
                        className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                    />
                ))}
            </Select>
            <div
                className={clsx(
                    'pr-12 duration-200 relative',
                    validity !== 'GoodTillDate' ? 'scale-y-0 origin-top opacity-0 absolute -z-20  ' : ' py-[12px]',
                )}
            >
                <div
                    className={clsx(
                        'absolute w-[15rem] top-0',
                        validity !== 'GoodTillDate' ? 'scale-y-0 origin-top opacity-0 absolute -z-20 ' : 'z-10',
                    )}
                >
                    <SimpleDatepicker onChange={(value) => setValidityDate(dayjs(value as any).format('YYYY/MM/DDTHH:mm:ss'))} />
                </div>

                {/* <AdvancedDatePicker
                    goToday={() => setValidityDate(dayjs().format('YYYY/MM/DDTHH:mm:ss'))}
                    onChange={(value) => setValidityDate(dayjs(value as any).format('YYYY/MM/DDTHH:mm:ss'))}
                    value={validityDate ? dayjs(validityDate).valueOf() : today}
                /> */}
            </div>
        </div>
    );
};

export default BuySellValidity;
