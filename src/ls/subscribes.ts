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
