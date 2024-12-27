import { XCircleOutlineIcon } from '@assets/icons';
import Spinner from '@components/Spinner';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface IModalProps {
     title: string | JSX.Element;
     onCloseModal: () => void;
     children: JSX.Element;
     size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
     classes?: Partial<Record<'root' | 'modal' | 'header' | 'x' | 'label', ClassesValue>>;
     loading?: boolean;
}

const Modal = ({ children, onCloseModal, title, classes, loading = false, size = 'md' }: IModalProps) => {
     const modalRef = useRef<HTMLDivElement | null>(null);

     useEffect(() => {
          const handleBackdropClick = (e: MouseEvent) => {
               const target = e.target as HTMLElement;

               if (modalRef.current && !modalRef.current.contains(target as Node) && !target?.closest('.dropdown-portal')) {
                    onCloseModal();
               }
          };

          document.addEventListener('mousedown', handleBackdropClick);

          return () => {
               document.removeEventListener('mousedown', handleBackdropClick);
          };
     }, []);

     useEffect(() => {
          const handleEscapeClose = (e: globalThis.KeyboardEvent) => {
               if (e.key === 'Escape') {
                    onCloseModal();
               }
          };

          document.addEventListener('keydown', handleEscapeClose);

          return () => {
               document.removeEventListener('keydown', handleEscapeClose);
          };
     }, []);

     return createPortal(
          <div className={clsx(styles.root, classes?.root)}>
               <div ref={modalRef} className={clsx(styles.modal, classes?.modal, size && styles[size])}>
                    <div className="flex h-full flex-col gap-6 overflow-hidden">
                         <div className="flex items-center justify-between">
                              <div className="font-bold text-content-paragraph">{title}</div>
                              <button onClick={onCloseModal} className="text-icon-default">
                                   <XCircleOutlineIcon />
                              </button>
                         </div>

                         <div className="min-h-[1px] min-w-full bg-line-div-2" />

                         <div className="h-full flex-1">
                              {loading ? (
                                   <div className="relative h-40">
                                        <Spinner />
                                   </div>
                              ) : (
                                   children
                              )}
                         </div>
                    </div>
               </div>
          </div>,
          document.getElementById('__MODAL') || document.body
     );
};

export default Modal;
