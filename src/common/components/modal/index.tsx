import { XCircleOutlineIcon } from '@assets/icons';
import useClickOutside from '@hooks/useClickOutside';
import { MutableRefObject, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
     title: string | JSX.Element;
     onCloseModal: () => void;
     children: JSX.Element;
     dependencies?: MutableRefObject<HTMLUListElement | null>[];
}

const Modal = ({ children, onCloseModal, title, dependencies }: IModalProps) => {
     const modalRef = useRef<HTMLDivElement | null>(null);

     useClickOutside<HTMLUListElement | HTMLDivElement>([modalRef, ...(dependencies ?? [])], () => {
          onCloseModal();
     });

     return createPortal(
          <div style={{ zIndex: 99 }} className="fixed left-0 top-0 min-h-screen w-full bg-black/40">
               <div
                    ref={modalRef}
                    style={{ maxWidth: '52.2rem' }}
                    className="rtl fixed left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-LG bg-back-surface p-8"
               >
                    <div className="flex flex-col gap-10">
                         <div className="flex items-center justify-between">
                              <div className="font-bold text-content-paragraph">{title}</div>
                              <button onClick={onCloseModal} className="text-icon-default">
                                   <XCircleOutlineIcon />
                              </button>
                         </div>

                         <div className="min-h-1 min-w-full bg-line-div-2" />

                         <div className="flex-1">{children}</div>
                    </div>
               </div>
          </div>,
          document.getElementById('__MODAL') || document.body
     );
};

export default Modal;
