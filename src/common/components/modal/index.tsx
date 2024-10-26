import { XCircleOutlineIcon } from '@assets/icons';
import clsx from 'clsx';
import { MutableRefObject, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface IModalProps {
     title: string | JSX.Element;
     onCloseModal: () => void;
     children: JSX.Element;
     dependencies?: MutableRefObject<HTMLDivElement | null>[];
     size?: 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
     classes?: Partial<Record<'root' | 'modal' | 'header' | 'x' | 'label', ClassesValue>>;
}

const Modal = ({ children, onCloseModal, title, classes, size }: IModalProps) => {
     const modalRef = useRef<HTMLDivElement | null>(null);

     //  useClickOutside<HTMLUListElement | HTMLDivElement>([modalRef, ...(dependencies ?? [])], () => {
     //       onCloseModal();
     //  });

     return createPortal(
          <div className={clsx(styles.root, classes?.root)}>
               <div ref={modalRef} className={clsx(styles.modal, classes?.modal, size && styles[size])}>
                    <div className="flex flex-col gap-6">
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
