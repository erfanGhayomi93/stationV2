import { ICellRendererParams } from '@ag-grid-community/core';
import { DeleteIcon, EditIcon, MoreStatusIcon, UpArrowIcon } from '@assets/icons';
import Popup from '@components/popup';
import { useRef, useState } from 'react';

type ActionsProps = ICellRendererParams<IOpenOrder, string> & {};

// eslint-disable-next-line no-empty-pattern
export const Actions = ({}: ActionsProps) => {
     const refDropdown = useRef<HTMLDivElement>(null); // Reference to the parent div
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     // Example dropdown items
     const items = [
          { label: 'ویرایش', icon: EditIcon, onclick: () => null },
          { label: 'حذف', icon: DeleteIcon, onclick: () => null },
          { label: 'جزییات', icon: DeleteIcon, onclick: () => null },
     ];

     return (
          <div className="relative">
               <Popup
                    margin={{
                         y: 8,
                    }}
                    defaultPopupWidth={200}
                    onOpen={() => setIsDropdownOpen(true)}
                    onClose={() => setIsDropdownOpen(false)}
                    renderer={({ setOpen }) => (
                         <ul className="rtl shadow-E2 flex flex-col gap-4 rounded-md bg-white px-4 py-3">
                              {items.map((item, index) => (
                                   <button
                                        key={index}
                                        className="flex w-full items-center justify-between"
                                        onClick={() => {
                                             item.onclick();
                                             setIsDropdownOpen(false);
                                        }}
                                   >
                                        <div className="flex gap-x-2 pl-12">
                                             <span className="text-icon-default">{<item.icon />}</span>
                                             <span className="text-content-paragraph">{item.label}</span>
                                        </div>

                                        <UpArrowIcon className="-rotate-90 text-icon-default" />
                                   </button>
                              ))}
                         </ul>
                    )}
               >
                    {({ setOpen, open }) => (
                         <button onClick={() => setOpen(!open)} className="flex w-full cursor-pointer justify-center">
                              <MoreStatusIcon className="text-icon-default" />
                         </button>
                    )}
               </Popup>
          </div>
     );
};
