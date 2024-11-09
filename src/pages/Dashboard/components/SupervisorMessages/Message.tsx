import { useMutationReadMessage } from '@api/messages';
import { ArrowDownTriangleIcon, DoubleTickIcon, SingleTickIcon } from '@assets/icons';
import AnimatePresence from '@components/animation/AnimatePresence';
import { dateFormatter } from '@methods/helper';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type TMessageProps = {
     item: ISupervisorMessageRes;
};

const Message = ({ item }: TMessageProps) => {
     const [isOpen, setOpen] = useState(false);

     const { t } = useTranslation();

     const { mutate } = useMutationReadMessage();

     const removeFirstWord = (inputText: string) => {
          if (item.type === 'Information') return inputText;
          return inputText.split(' ').slice(1).join(' ');
     };

     const onReadMessage = (id: number) => {
          setOpen(prev => !prev);
          mutate(id);
     };

     return (
          <div onClick={() => onReadMessage(item.id)} className="border-b border-b-line-div-3 py-1">
               <li className="flex cursor-pointer items-center gap-2 py-3" key={item.id}>
                    <div className="flex w-full max-w-full flex-1 items-center gap-1 truncate text-sm">
                         <div>
                              <ArrowDownTriangleIcon
                                   className={clsx('text-icon-default transition-transform', {
                                        'rotate-180': isOpen,
                                   })}
                                   width="1rem"
                                   height="1rem"
                              />
                         </div>
                         <span
                              className={clsx('', {
                                   'text-content-success-buy': item.type === 'Oppening',
                                   'text-content-error-sell': item.type === 'Stop',
                                   'text-content-info': item.type === 'Instant',
                                   'text-content-warning': item.type === 'Limitation',
                              })}
                         >
                              {t(`supervisorMessage.type_message_${item.type}`)}
                         </span>

                         <span className="w-10 flex-1 truncate text-content-title">{removeFirstWord(item.messageTitle)}</span>
                    </div>
                    <div className="flex items-center justify-end gap-2 text-sm text-content-paragraph">
                         <span>{dateFormatter(item.dateOfEvent, 'time')}</span>
                         <div
                              style={{
                                   minWidth: '1px',
                                   minHeight: '16px',
                              }}
                              className="bg-line-div-1"
                         />
                         <span>{dateFormatter(item.dateOfEvent, 'date')}</span>

                         <div>
                              {item.read ? (
                                   <DoubleTickIcon className="text-icon-primary" />
                              ) : (
                                   <SingleTickIcon className="text-line-div-1" />
                              )}
                         </div>
                    </div>
               </li>

               {isOpen && (
                    <AnimatePresence initial={{ animation: 'fadeIn' }} exit={{ animation: 'collapseOrders' }}>
                         <div
                              onClick={e => {
                                   e.stopPropagation();
                              }}
                              className="rounded-lg bg-back-2 px-8 py-2 text-justify text-sm text-content-paragraph"
                         >
                              {item.messageBody}
                         </div>
                    </AnimatePresence>
               )}
          </div>
     );
};

export default Message;
