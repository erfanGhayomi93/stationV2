import { useQueryMessagesSupervisor } from '@api/messages';
import { useSymbolStore } from '@store/symbol';
import { useTranslation } from 'react-i18next';
import Message from './Message';

const SupervisorMessage = () => {
     const { t } = useTranslation();

     const { selectedSymbol } = useSymbolStore();

     const { data: supervisorMessagesSymbolData } = useQueryMessagesSupervisor({ symbolISIN: selectedSymbol });

     return (
          <div className="px-2">
               <ul className="flex flex-col">{supervisorMessagesSymbolData?.map(message => <Message item={message} />)}</ul>
          </div>
     );
};

export default SupervisorMessage;
