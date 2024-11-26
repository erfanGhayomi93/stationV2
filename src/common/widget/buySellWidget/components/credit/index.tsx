import AdvancedDatepicker from '@components/Datepicker/AdvanceDatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBuySellContext } from '../../context/buySellContext';
import SelectValidityInput from '../SelectValidityInput';

const Credit = () => {
     const { validity, setValidity, setValidityDate , side } = useBuySellContext();

     const [showCalender, setShowCalender] = useState(false);

     const [calenderDate, setCalenderDate] = useState<Date | null>(null);

     const { t } = useTranslation();

     const VALIDITY_OPTIONS = [
          {
               id: 1,
               value: 'Day',
               validityDate: dayjs().format('YYYY-MM-DD'),
          },
          {
               id: 2,
               title: 'Week',
               value: 'Week',
               validityDate: dayjs().add(1, 'week').format('YYYY-MM-DD')
          },
          {
               id: 3,
               title: 'Month',
               value: 'Month',
               validityDate: dayjs().add(1, 'month').format('YYYY-MM-DD')
          },
          {
               id: 4,
               value: 'GoodTillDate',
               validityDate: dayjs().format('YYYY-MM-DD'),
               onclick: () => {
                    setShowCalender(true);
               },
          },
          {
               id: 5,
               value: 'FillAndKill',
               validityDate: null,
          },
          {
               id: 6,
               value: 'GoodTillCancelled',
               validityDate: null,
          },
     ];

     return (
          <div className="flex-1">
               <SelectValidityInput
                    onChange={item => {
                         setValidity(item.value as TValidity)
                         const validityDate = VALIDITY_OPTIONS.find(option => item.id === option.id)?.validityDate
                         if (validityDate !== undefined) {
                              setValidityDate(validityDate)
                         }
                    }}
                    items={VALIDITY_OPTIONS.map(item => ({
                         id: item.id,
                         value: String(item.value),
                         label: t(`BSValidity.${item.value as TValidity}`),
                         onClick: () => {
                              item.onclick?.();
                         },
                    }))}
                    placeholder="اعتبار"
                    value={{
                         value: validity,
                         id: VALIDITY_OPTIONS.find(item => item.value === validity)?.id,
                         label:
                              calenderDate && validity === 'GoodTillDate'
                                   ? dayjs(calenderDate).calendar('jalali').locale('fa').format('YYYY-MM-DD')
                                   : t(`BSValidity.${validity}`),
                    }}
                    side={side}
               />

               <AdvancedDatepicker
                    placement="top"
                    open={showCalender}
                    setOpen={setShowCalender}
                    onChange={date => {
                         setCalenderDate(date ?? new Date());
                         setValidityDate(dayjs(date).format('YYYY-MM-DD'))
                    }}
                    value={calenderDate ?? new Date()}
               />
          </div>
     );
};

export default Credit;
