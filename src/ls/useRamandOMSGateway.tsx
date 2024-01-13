import ipcMain from 'src/common/classes/IpcMain';
import { pushEngine } from './pushEngine';
import i18next from 'i18next';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';

type IRamandOMSInstanceType = {
    subscribeCustomers: (customerISINs: string[], brokerCode: string) => void;
    unSubscribeCustomers: () => void;
    isSubscribed: () => boolean | undefined;
    currentSubscribed: () => String[] | undefined;
};

const createRamandOMSGateway = () => {

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

    const setLocalStorage = (pushNotification: storeLocalType) => {
        const pushNotificationStringfy = JSON.stringify(pushNotification)
        localStorage.setItem("PushNotificationStore", pushNotificationStringfy)
    }



    const handlePushNotification = (message: Record<number, string>) => {
        const pushNotificationString = localStorage.getItem("PushNotificationStore")
        let pushNotification: storeLocalType = !!pushNotificationString ? JSON.parse(pushNotificationString) : {}


        const omsClientKey = message[12];
        const omsOrderStatus = message[22] as OrderStatusType;
        const orderMessageType = message[200]

        const detailsNotif = (!!pushNotification[omsClientKey] && !!pushNotification[omsClientKey].symbolTitle) ? `(${pushNotification[omsClientKey].customerTitle} - ${pushNotification[omsClientKey].symbolTitle})` : ""

        if (["OnBoard", "PartOfTheOrderDone", "OrderDone", "OnBoardModify", "InOMSQueue", "Canceled"].includes(omsOrderStatus)) {
            onSuccessNotif({ toastId: omsClientKey + omsOrderStatus, title: `${i18next.t('order_status.' + (omsOrderStatus))}${detailsNotif}` })

        } else if (["Error"].includes(omsOrderStatus)) {
            onErrorNotif({ toastId: omsClientKey + omsOrderStatus, title: `${i18next.t('order_errors.' + (orderMessageType))}${detailsNotif}` })

        } else if (["Expired", "DeleteByEngine",].includes(omsOrderStatus)) {
            onErrorNotif({ toastId: omsClientKey + omsOrderStatus, title: `${i18next.t('order_status.' + (omsOrderStatus))}${detailsNotif}` })
        }

        if (["OrderDone", "OnBoardModify", "Canceled", "Error", "Expired", "DeleteByEngine"].includes(omsOrderStatus)) {
            delete pushNotification[omsClientKey]

            setLocalStorage(pushNotification)
        }

    }

    const handleOMSMessage = (message: Record<number, string>) => {
        const timeOut = setTimeout(() => {
            ipcMain.send('onOMSMessageReceived', message);
            handlePushNotification(message)

            clearTimeout(timeOut)
        }, 500);
    };

    const handleAdminMessage = (message: Record<number, string>) => {
        ipcMain.send('onAdminMessageReceived', message);
    };

    const handleSystemMessage = (message: Record<number, string>) => {
        ipcMain.send('onSystemMessageReceived', message);
    };

    const isSubscribed = () => pushEngine.getSubscribeById('supervisorMessage')?.isSubscribed();

    const currentSubscribed = () => pushEngine.getSubscribeById('supervisorMessage')?.getItems();

    const subscribeCustomers = (customerISINs: string[], brokerCode: string) => {
        const customers = customerISINs.map((customerISIN) => `${brokerCode || '189'}_${customerISIN}`);

        const items = [...customers, `${brokerCode || '189'}_All`];

        if (isSubscribed()) pushEngine.unSubscribe('supervisorMessage');


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
        isSubscribed,
        currentSubscribed,
    };
};

const ramandOMSInstance: IRamandOMSInstanceType = createRamandOMSGateway();

const useRamandOMSGateway = () => ramandOMSInstance;

export default useRamandOMSGateway;
