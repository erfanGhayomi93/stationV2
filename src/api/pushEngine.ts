import { Subscription, LightstreamerClient, ConnectionSharing } from 'lightstreamer-client-web';

interface IConnect {
    DomainName: string;
    DomainPort: number;
    AdapterSet: string;
    User: string;
    Password: string;
}

interface ISubscribe {
    id: string;
    mode: 'MERGE' | 'RAW';
    items: string[];
    fields: string[];
    adapterName: string;
    isSnapShot: 'no' | 'yes';
    onFieldsUpdate: (updatedFields: UpdatedFieldsType) => void;
}

type UpdatedFieldsType = { itemName: string; changedFields: { [key: string]: any } };

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

const subscribe = ({ id, mode, items, fields, adapterName, isSnapShot, onFieldsUpdate }: ISubscribe) => {
    //
    if (!mode || !Array.isArray(items) || !Array.isArray(fields) || !adapterName || !isSnapShot || !onFieldsUpdate) return;
    if (items?.length === 0 || fields?.length === 0) return;

    // // TODO
    // const isSubscribeExist =
    //     subscriptions?.hasOwnProperty(id) &&
    //     JSON.stringify(subscriptions[id]?.getItems()?.sort()) === JSON.stringify(items?.sort()) &&
    //     JSON.stringify(subscriptions[id]?.getFields()?.sort()) === JSON.stringify(fields?.sort());

    // if (isSubscribeExist) return;

    const sub = new Subscription(mode, items, fields);
    sub.setDataAdapter(adapterName);
    sub.setRequestedSnapshot(isSnapShot);

    sub.addListener({
        onItemUpdate: (updateInfo) => {
            const updatedFields: UpdatedFieldsType = { itemName: updateInfo?.getItemName(), changedFields: {} };
            updateInfo?.[updateInfo.isSnapshot() ? 'forEachField' : 'forEachChangedField']((name, _, value) => {
                value !== null && (updatedFields.changedFields[name] = value);
            });
            if (updatedFields.itemName && Object.keys(updatedFields.changedFields).length > 0) onFieldsUpdate(updatedFields);
        },
    });

    subscriptions[id] = sub;
    client.subscribe(sub);
};

const unSubscribe = (subId: string) => {
    if (!subId || !client) return;

    const isSubActive = subscriptions[subId]?.isActive() || false;

    if (isSubActive) {
        client.unsubscribe(subscriptions[subId] as Subscription);
        subscriptions[subId] = null;
    }
};

const getSubscribeById = (id: string) => subscriptions?.[id] || null;

export const pushEngine = { client, connect, disConnect, subscribe, unSubscribe, getSubscribeById };
