import ipcMain from 'src/common/classes/IpcMain';
import { pushEngine } from './pushEngine';
import { useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';

const useRamandOMSGateway = () => {
    //
    const { brokerCode } = useAppSelector(getUserData);

    const translateMessage = (value: string) => {
        const message = value.split('^');
        const msgObj: Record<number, string> = {};

        try {
            message.forEach((item) => {
                if (item) {
                    const [index, value] = item.split('=');
                    msgObj[Number(index)] = value;
                }
            });
        } catch (e) {
            //
        }

        return msgObj;
    };

    const handleOMSMessage = (message: Record<number, string>) => {
        ipcMain.send('onOMSMessageReceived', message);
    };

    const handleAdminMessage = (message: Record<number, string>) => {
        ipcMain.send('onAdminMessageReceived', message);
    };

    const handleSystemMessage = (message: Record<number, string>) => {
        ipcMain.send('onSystemMessageReceived', message);
    };

    const isSubscribedBefore = () => pushEngine.getSubscribeById('supervisorMessage')?.isSubscribed();

    const subscribeCustomers = (customerISINs: string[]) => {
        
        const customers = customerISINs.map((customerISIN) => `${brokerCode}_${customerISIN}`);

        const items = [...customers, `${brokerCode ?? '189'}_All`];

        if (isSubscribedBefore()) pushEngine.unSubscribe('supervisorMessage');

        pushEngine.subscribe({
            id: 'supervisorMessage',
            mode: 'RAW',
            isSnapShot: 'no',
            adapterName: 'RamandOMSGateway',
            items: items,
            fields: ['OMSMessage', 'AdminMessage', 'SystemMessage'],
            onFieldsUpdate: ({ changedFields }) => {
                //
                if (changedFields['OMSMessage']) handleOMSMessage(translateMessage(changedFields['OMSMessage']));
                else if (changedFields['AdminMessage']) handleAdminMessage(translateMessage(changedFields['AdminMessage']));
                else if (changedFields['SystemMessage']) handleSystemMessage(translateMessage(changedFields['SystemMessage']));
            },
        });
    };

    const unSubscribeCustomers = () => pushEngine.unSubscribe('supervisorMessage');

    return {
        subscribeCustomers,
        unSubscribeCustomers,
        isSubscribedBefore
    };
};

export default useRamandOMSGateway;
