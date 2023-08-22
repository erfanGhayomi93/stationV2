import { useMessagesSuppervisorOneSmbol } from 'src/app/queries/messages';
import { useAppValues } from 'src/redux/hooks';
import Message from './Message';

const Messages = () => {
    const {
        option: { selectedSymbol },
    } = useAppValues();
    const messageOneSymbol = useMessagesSuppervisorOneSmbol(selectedSymbol);


    return (
        <div className="">
            <div className="w-full h-full overflow-auto">
                {messageOneSymbol.data &&
                    messageOneSymbol.data
                    .map((item) => <Message data={item} key={item.id} />)}
            </div>
        </div>
    );
};  

export default Messages;