import { FC } from 'react';
import Select, { SelectOption } from 'src/common/components/Select';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { VALIDITY_OPTIONS } from 'src/constant/validity';
import i18next from 'i18next';
import dayjs from 'dayjs';
import clsx from 'clsx';
import SimpleDatepicker from 'src/common/components/Datepicker/SimpleDatepicker';

interface IBuySellValidityType {}

const BuySellValidity: FC<IBuySellValidityType> = ({}) => {
    const dispatch = useBuySellDispatch();
    const { validity, validityDate } = useBuySellState();
    const setValidity = (value: validity) => dispatch({ type: 'SET_VALIDITY', value });
    const setValidityDate = (value: string | undefined) => dispatch({ type: 'SET_VALIDITY_DATE', value });

    const handleValidity = (select: any) => {
        setValidity(select.value);
        // select.value !== 'GoodTillDate' && setValidityDate(undefined);
        if (select.value !== 'GoodTillDate') setValidityDate(select.validityDate);
        else setValidityDate(undefined);
    };

    return (
        <div className="flex  gap-2 w-full  ">
            <div className="flex pr-2 items-center gap-2 w-6/12">
                <span className="w-[64px]">اعتبار</span>
                <Select onChange={(select: typeof VALIDITY_OPTIONS[0]) => handleValidity(select)} value={i18next.t('BSModal.validity_' + validity)}>
                    {VALIDITY_OPTIONS.map((item, inx) => (
                        <SelectOption
                            key={inx}
                            label={i18next.t('BSModal.validity_' + item.value)}
                            value={item}
                            className="text-1.2 cursor-default select-none py-1 pl-10 pr-4"
                        />
                    ))}
                </Select>
            </div>
            <div className={clsx('h-full flex items-center grow z-10', validity === 'GoodTillDate' ? '' : 'opacity-60 ')}>
                <SimpleDatepicker
                    disable={validity !== 'GoodTillDate'}
                    onChange={(value) => setValidityDate(dayjs(value as any).format('YYYY-MM-DD'))}
                />
            </div>
        </div>
    );
};

export default BuySellValidity;
