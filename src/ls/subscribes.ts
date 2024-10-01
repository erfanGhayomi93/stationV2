import { pushEngine, UpdatedFieldsType } from "./pushEngine"

export const subscribeTime = (setNowTime : (arg : string) => void) => {
    pushEngine.subscribe({
        id: "TIME",
        mode: 'MERGE',
        items: ['time'],
        fields: ['tsetime'],
        isSnapShot: "no",
        adapterName: 'RamandRLCDData',
        onFieldsUpdate({ changedFields }) {
            setNowTime(changedFields.tsetime)
        },
    })
}

export const subscribeMarketIndices = (symbolISINs: string[] , onItemUpdate : (updatedFields: UpdatedFieldsType<any>) => void ) => {
    const fields = ["lastIndexValueInDay", "indexChange", "changePercent", "indexDateTime"];

    pushEngine.subscribe({
        id: "MarketIndices",
        mode: 'MERGE',
        items: symbolISINs,
        fields: fields,
        isSnapShot: "yes",
        adapterName: 'RamandRLCDData',
        onFieldsUpdate(updatedFields) {
            onItemUpdate(updatedFields)
        },
    })
}