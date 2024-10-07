import useClickOutside from '@hooks/useClickOutside';
import { RefObject, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface DropdownProps {
     open: boolean;
     onClose: () => void;
     dropDownRef: RefObject<HTMLDivElement>;
     children: JSX.Element;
}

const Dropdown = ({ open, onClose, dropDownRef, children }: DropdownProps) => {
     const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, openUpward: false });

     const childRef = useRef<HTMLDivElement | null>(null);

     useEffect(() => {
          if (open && dropDownRef.current) {
               const rect = dropDownRef.current.getBoundingClientRect();
               const dropdownHeight = childRef.current?.offsetHeight || 0;
               const viewportHeight = window.innerHeight;

               const wouldOverflow = rect.bottom + dropdownHeight > viewportHeight;

               setDropdownPosition({
                    top: wouldOverflow ? rect.top - dropdownHeight : rect.bottom,
                    left: rect.left,
                    openUpward: wouldOverflow,
               });
          }
     }, [open, dropDownRef]);

     useClickOutside(dropDownRef, () => {
          onClose();
     }, []);

     return createPortal(
          <div
               className={`rtl rounded-md bg-[white] px-3 py-4 shadow-md ${dropdownPosition.openUpward ? 'open-upward' : ''}`}
               style={{ position: 'absolute', top: `${dropdownPosition.top}px`, left: `${dropdownPosition.left}px` }}
          >
               <div className="flex flex-col gap-2" ref={childRef}>
                    {children}
               </div>
          </div>,
          document.getElementById('__DROPDOWN') || document.body
     );
};

export default Dropdown;
