import CheckboxButton from '@uiKit/CheckboxButton';
import FieldInput from '@uiKit/Inputs/FieldInput';
import MultiSelectInput from '@uiKit/Inputs/MultiSelectInput';
import SearchInput from '@uiKit/Inputs/SearchInput';
import SelectInput from '@uiKit/Inputs/SelectInput';
import RadioButton from '@uiKit/RadioButton';
import { useState } from 'react';

const Test = () => {
     const [select, setSelect] = useState(false);
     return (
          <div className="flex h-screen flex-wrap items-center justify-center gap-8">
               <FieldInput
                    onChangeValue={value => {
                         console.log(value);

                         console.log('ef');
                    }}
                    placeholder="تعداد"
                    upTickValue={100}
                    variant="simple"
                    type="text"
               />
               <SearchInput
                    values={[
                         { id: '3', label: 'مشتری' },
                         { id: '3', label: 'خانواده' },
                    ]}
                    onChangeValue={value => {
                         console.log('hi');
                    }}
               />

               <SelectInput
                    items={[
                         {
                              id: 'day',
                              label: 'روز',
                         },
                         {
                              id: 'week',
                              label: 'هفته',
                         },
                         {
                              id: 'month',
                              label: 'ماه',
                         },
                         {
                              id: 'year',
                              label: 'سال',
                         },
                    ]}
                    placeholder="اعتبار"
               />

               <CheckboxButton checked={select} label="dfd" onChange={() => setSelect(prev => !prev)} />

               <RadioButton checked={select} label="dfd" onChange={() => setSelect(prev => !prev)} />

               <MultiSelectInput
                    items={[
                         {
                              id: 'day',
                              label: 'روز',
                         },
                         {
                              id: 'week',
                              label: 'هفته',
                         },
                         {
                              id: 'month',
                              label: 'ماه',
                         },
                         {
                              id: 'year',
                              label: 'سال',
                         },
                    ]}
                    placeholder="اعتبار"
               />
          </div>
     );
};

export default Test;
