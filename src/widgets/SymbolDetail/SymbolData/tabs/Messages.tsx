import { useMessagesSuppervisorOneSmbol } from 'src/app/queries/messages';
import { CardMessage } from 'src/common/components/SupervisorMessage/components/CardMassage';
import { useAppValues } from 'src/redux/hooks';

const Messages = () => {
    const {
        option: { selectedSymbol },
    } = useAppValues();
    const messageOneSymbol = useMessagesSuppervisorOneSmbol(selectedSymbol);

    return (
        <div className="">
            <div className="rounded-lg w-full h-full overflow-auto">
                {messageOneSymbol.data &&
                    messageOneSymbol.data
                    .map((item) => <CardMessage data={item} key={item.id} isOneSymbol />)}
            </div>
        </div>
    );
};  

export default Messages;
