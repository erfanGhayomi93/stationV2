import React, { useEffect } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';
import { getSelectedCustomers } from 'src/redux/slices/option';
import { pushEngine } from './pushEngine';
import ipcMain from 'src/common/classes/IpcMain';

const RamandOMSGateWay = () => {
    //
    const selectedCustomers = useAppSelector(getSelectedCustomers);
    const { brokerCode } = useAppSelector(getUserData);

    const customers = selectedCustomers.map(({ customerISIN }) => `${brokerCode}_${customerISIN}`);
    const items = [...customers, `${brokerCode ?? '189'}_All`];

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
        ipcMain.send('oms_order_status', message)
    };

    const handleAdminMessage = (message: Record<number, string>) => {
        console.log('AdminMessage',message)
    };

    const handleSystemMessage = (message: Record<number, string>) => {
        console.log('SystemMessage',message)
    };

    useEffect(() => {
        const isSubscribed = pushEngine.getSubscribeById('supervisorMessage');
        if (isSubscribed) pushEngine.unSubscribe('supervisorMessage');

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
    }, [items]);

    return null;
};

export default RamandOMSGateWay;
