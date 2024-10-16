import { UpArrowIcon } from '@assets/icons';
import Popup from '@components/popup';
import RadioButton from '@uiKit/RadioButton';
import { forwardRef, LegacyRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TItem = {
     id: string;
     label: string;
};

type TDropdownProps = {
     items: TItem[];
     onChange: (item: TItem) => void;
     defaultSelected: TItem;
};

const Dropdown = forwardRef(({ items, onChange, defaultSelected }: TDropdownProps, ref: LegacyRef<HTMLUListElement>) => {
     const { t } = useTranslation();

     const [selectedItem, setSelectedItem] = useState<TItem>(defaultSelected);

     const onChangeSelectedItem = (item: TItem) => {
          setSelectedItem(item);
          onChange(item);
     };

     return (
          <div>
               <Popup
                    defaultPopupWidth={200}
                    margin={{
                         y: 8,
                    }}
                    renderer={({ setOpen }) => (
                         <ul ref={ref} className="rtl flex w-full flex-col gap-2 rounded-md bg-back-surface px-4 py-3 shadow-E2">
                              {items.map((item, index) => (
                                   <RadioButton
                                        key={index}
                                        checked={item.id === selectedItem.id}
                                        onChange={() => {
                                             onChangeSelectedItem(item);
                                             setOpen(false);
                                        }}
                                        label={item.label}
                                   />
                              ))}
                         </ul>
                    )}
               >
                    {({ setOpen, open }) => (
                         <div
                              onClick={() => setOpen(!open)}
                              style={{ width: '10rem', height: '2.5rem' }}
                              className="flex items-center justify-between gap-2 rounded-lg border border-input-default bg-back-surface p-2 text-content-title"
                         >
                              <div className="text-xs">{selectedItem?.label || t('todayOrders.tickPlaceholder')}</div>
                              <UpArrowIcon width="0.8rem" height="0.8rem" className="rotate-180" />
                         </div>
                    )}
               </Popup>
          </div>
     );
});

export default Dropdown;
