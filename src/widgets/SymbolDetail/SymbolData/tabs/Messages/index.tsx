import { useMessagesSuppervisorOneSmbol } from 'src/app/queries/messages';
import { useAppSelector } from 'src/redux/hooks';
import Message from './Message';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { getSelectedSymbol } from 'src/redux/slices/option';

const Messages = () => {
    const selectedSymbol = useAppSelector(getSelectedSymbol)
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
