import { useMessagesSuppervisorOneSmbol } from 'src/app/queries/messages';
import { useAppValues } from 'src/redux/hooks';
import Message from './Message';
import WidgetLoading from 'src/common/components/WidgetLoading';

const Messages = () => {
    const {
        option: { selectedSymbol },
    } = useAppValues();
    const { data: messageOneSymbol, isLoading } = useMessagesSuppervisorOneSmbol(selectedSymbol);

    return (
        <WidgetLoading spining={isLoading}>
            <div>
                <div className="w-full h-full overflow-auto">
                    {messageOneSymbol && messageOneSymbol.map((item) => <Message data={item} key={item.id} />)}
                </div>
            </div>
        </WidgetLoading>
    );
};

export default Messages;
