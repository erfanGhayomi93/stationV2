import { pushEngine, UpdatedFieldsType } from './pushEngine';

export const subscribeTime = (setNowTime: (arg: string) => void) => {
     pushEngine.subscribe({
          id: 'TIME',
          mode: 'MERGE',
          items: ['time'],
          fields: ['tsetime'],
          isSnapShot: 'no',
          adapterName: 'RamandRLCDData',
          onFieldsUpdate({ changedFields }) {
               setNowTime(changedFields.tsetime);
          },
     });
};

export const subscribeMarketIndices = (symbolISINs: string[], onItemUpdate: (updatedFields: UpdatedFieldsType<any>) => void) => {
     const fields = ['lastIndexValueInDay', 'indexChange', 'changePercent', 'indexDateTime'];

     pushEngine.subscribe({
          id: 'MarketIndices',
          mode: 'MERGE',
          items: symbolISINs,
          fields: fields,
          isSnapShot: 'yes',
          adapterName: 'RamandRLCDData',
          onFieldsUpdate(updatedFields) {
               onItemUpdate(updatedFields);
          },
     });
};

export const subscribeMarketDepth = (
     symbolISIN: string,
     serverLastTime: number,
     onItemUpdate: (updatedFields: UpdatedFieldsType<{ mddata: string }>) => void
) => {
     const d = new Date();
     const t = d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds();

     pushEngine.subscribe<{ mddata: string }>({
          id: 'MarketDepthSub',
          mode: 'RAW',
          items: ['mdt_' + serverLastTime + '_' + symbolISIN + '_' + t, symbolISIN],
          fields: ['mddata'],
          isSnapShot: 'no',
          adapterName: 'RamandRLCDData',
          onFieldsUpdate(updatedFields) {
               onItemUpdate(updatedFields);
          },
     });
};

export const SubscribeSymbolBestOneOrders = (
     selectedSymbol: string,
     fields: ['bestBuyLimitPrice_1', 'bestSellLimitPrice_1'],
     onItemUpdate: (changedFields: IPriceLockIcon) => void
) => {
     pushEngine.subscribe({
          id: 'SymbolBestOneOrders',
          mode: 'MERGE',
          isSnapShot: 'yes',
          adapterName: 'RamandRLCDData',
          items: [selectedSymbol],
          fields: fields,
          onFieldsUpdate({ changedFields }: { changedFields: IPriceLockIcon }) {
               onItemUpdate(changedFields);
          },
     });
};

export const subscribeSymbolGeneral = <T>({
     id,
     items,
     fields,
     onItemUpdate,
}: {
     id: string;
     items: string[];
     fields: string[];
     onItemUpdate: (updatedFields: UpdatedFieldsType<T>) => void;
}) => {
     pushEngine.subscribe({
          id,
          mode: 'MERGE',
          isSnapShot: 'yes',
          adapterName: 'RamandRLCDData',
          items,
          fields,
          onFieldsUpdate(updatedFields) {
               onItemUpdate(updatedFields as UpdatedFieldsType<T>);
          },
     });
};

export const subscriptionPortfolio = <T>({
     id,
     items,
     fields,
     onItemUpdate,
}: {
     id: string;
     items: string[];
     fields: string[];
     onItemUpdate: (updatedFields: UpdatedFieldsType<T>) => void;
}) => {
     pushEngine.subscribe({
          id,
          adapterName: 'RamandRLCDData',
          mode: 'MERGE',
          items,
          fields,
          isSnapShot: 'yes',
          onFieldsUpdate: updateFields => {
               onItemUpdate(updateFields as UpdatedFieldsType<T>);
          },
     });
};

export const subscriptPosition = <T>({
     id,
     items,
     fields,
     onItemUpdate,
}: {
     id: string;
     items: string[];
     fields: string[];
     onItemUpdate: (updatedFields: UpdatedFieldsType<T>) => void;
}) => {
     pushEngine.subscribe({
          id,
          adapterName: 'RamandRLCDData',
          mode: 'MERGE',
          items,
          fields,
          isSnapShot: 'yes',
          onFieldsUpdate: updatedField => {
               onItemUpdate(updatedField as UpdatedFieldsType<T>);
          },
     });
};
