// import FieldInput from '@uiKit/Inputs/FieldInput';
import MultiSelectInput from '@uiKit/Inputs/MultiSelectInput';
import SearchInput from '@uiKit/Inputs/SearchInput';
import SelectInput from '@uiKit/Inputs/SelectInput';
// import SelectInput from '@uiKit/Inputs/SelectInput';
import { useState } from 'react';

const Test = () => {
     const [select, setSelect] = useState(false);

     const fruits = ['Banana', 'Orange', 'Apple', 'Mango'];

     // At position 2, add "Lemon" and "Kiwi":
     console.log(fruits.slice(0, 1), 'spliceData');

     const [values, setValues] = useState([
          { id: '1', label: 'مشتری' },
          { id: '2', label: 'خاواده' },
          { id: '3', label: 'همسایه' },
          { id: '4', label: 'بیرون' },
          { id: '5', label: 'درون' },
          { id: '6', label: 'مریخ' },
          { id: '7', label: 'مشرف' },
          { id: '8', label: 'هدفمند' },
          { id: '8', label: 'هدفمند' },
          { id: '8', label: 'هدفمند' },
     ]);
     return (
          <div className="flex h-screen flex-wrap items-center justify-center gap-8">
               {/* <FieldInput
                    onChangeValue={value => {
                         console.log(value);

                         console.log('ef');
                    }}
                    placeholder="تعداد"
                    upTickValue={100}
                    downTickValue={50}
                    variant="advanced"
                    type="text"

               /> */}

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
                    value={{
                         id: 'day',
                         label: 'روز',
                    }}
                    onChange={value => console.log('')}
                    placeholder="df"
               />

               <div style={{ width: 300 }}>
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

               <SearchInput
                    placeholder="جستجو"
                    values={[
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
                    onChangeValue={value => null}
               />
          </div>
     );
};

export default Test;
