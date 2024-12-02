import { useQueryMessagesSupervisor } from '@api/messages';
import { useSymbolStore } from '@store/symbol';
import Message from './Message';

const SupervisorMessage = () => {
     const { selectedSymbol } = useSymbolStore();

     const { data: supervisorMessagesSymbolData } = useQueryMessagesSupervisor({ symbolISIN: selectedSymbol });

     return (
          <div className="h-full px-2">
               <ul className="relative flex h-full flex-col">
                    {supervisorMessagesSymbolData?.map((message, index) => <Message key={index} item={message} />)}

                    {supervisorMessagesSymbolData?.length === 0 && (
                         <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
                              اطلاعاتی وجود ندارد.
                         </span>
                    )}
               </ul>
          </div>
     );
};

export default SupervisorMessage;
