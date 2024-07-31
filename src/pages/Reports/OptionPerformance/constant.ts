export const initialState : IFilterOptionPerformance = {
    SymbolISIN: [],
    CustomerISIN: [],
    hasRemain : '',
    'QueryOption.PageNumber': 1,
    'QueryOption.PageSize': 25,
}


export const remainOptions = [
    { label: 'همه', value: '' },
    { label: 'دارد', value: 'true' },
    { label: 'ندارد', value: 'false' },
]