import { ConnectionSharing, LightstreamerClient, Subscription } from 'lightstreamer-client-web';

interface IConnect {
    DomainName: string;
    DomainPort: number;
    AdapterSet: string;
    User: string;
    Password: string;
}
type IChangedField = { [key: string]: any };
interface ISubscribe<T = IChangedField> {
    id: string;
    mode: 'MERGE' | 'RAW';
    items: string[];
    fields: string[];
    adapterName: string;
    isSnapShot: 'no' | 'yes';
    onFieldsUpdate: (updatedFields: UpdatedFieldsType<T>) => void;
}

export type UpdatedFieldsType<T = IChangedField> = { itemName: string; changedFields: T };

const client = new LightstreamerClient();
const subscriptions: { [subId: string]: Subscription | null } = {};

const connect = ({ DomainName, DomainPort, AdapterSet, User, Password }: IConnect) => {
    //
    if (!DomainName || !DomainPort || !AdapterSet || !User || !Password) return;

    const connectionSharing = new ConnectionSharing('RamandConnection', 'ATTACH', 'CREATE');
    client.enableSharing(connectionSharing);

    client.connectionDetails.setServerAddress(DomainName + ':' + DomainPort);
    client.connectionDetails.setAdapterSet(AdapterSet);
    client.connectionDetails.setUser(User);
    client.connectionDetails.setPassword(Password);

    client.addListener({ onServerError: (errorCode, errorMssg) => console.log({ errorCode, errorMssg }) });
    client.connect();
};

const disConnect = () => client.disconnect();

const subscribe = <T = IChangedField>({ id, mode, items, fields, adapterName, isSnapShot, onFieldsUpdate }: ISubscribe<T>) => {
    //
    if (!mode || !Array.isArray(items) || !Array.isArray(fields) || !adapterName || !isSnapShot || !onFieldsUpdate) return;
    if (items?.length === 0 || fields?.length === 0) return;

    const isSubscribeExist = Boolean(subscriptions?.[id]);
    if (isSubscribeExist) return;

    const sub = new Subscription(mode, items, fields);
    sub.setDataAdapter(adapterName);
    sub.setRequestedSnapshot(isSnapShot);

    sub.addListener({
        onItemUpdate: (updateInfo) => {
            const updatedFields: UpdatedFieldsType = { itemName: updateInfo?.getItemName(), changedFields: {} };
            updateInfo?.[updateInfo.isSnapshot() ? 'forEachField' : 'forEachChangedField']((name, _, value) => {
                value !== null && (updatedFields.changedFields[name] = isNaN(value as any) ? value : +value);
            });

            if (updatedFields.itemName && Object.keys(updatedFields.changedFields).length > 0) onFieldsUpdate(updatedFields as any);
        },
    });

    subscriptions[id] = sub;
    client.subscribe(sub);
    console.log(`%c SUBSCRIBED ${id}`, 'background: linear-gradient(90deg, rgba(12,10,133,1) 17%, rgba(0,134,255,1) 100%); color: #ffffff; border-radius: 10px; padding: 5px');
};

const unSubscribe = (subId: string) => {
    //
    if (!subId || !client) return;
    if (subscriptions[subId]) {
        client.unsubscribe(subscriptions[subId] as Subscription);
        subscriptions[subId] = null;
        console.log(`%c UNSUBSCRIBED ${subId}`, 'background: linear-gradient(90deg, rgba(255,0,0,1) 17%, rgba(255,175,0,1) 100%); color: #ffffff; border-radius: 10px; padding: 5px');
    }
};

const getSubscribeById = (id: string) => subscriptions?.[id] || null;

export const pushEngine = { client, connect, disConnect, subscribe, unSubscribe, getSubscribeById };
