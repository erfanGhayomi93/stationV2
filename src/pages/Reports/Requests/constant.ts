import dayjs from 'dayjs';
import { t } from 'i18next';

export const initialState: IOfflineRequestStateType = {
    FromDate: dayjs().subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
    ToDate: dayjs().format('YYYY-MM-DDT23:59:59'),
    Side: '',
    SymbolISIN: [],
    CustomerISIN: [],
    RequestNo: '',
    State: '',
    MarketType: '',
    MarketUnit: '',
    PageNumber: 1,
    PageSize: 25,
    MyStationOnly: false,
    CustomerType: '',
};

export const stateOptions = [
    { label: t('BuySellRequestState.All'), value: '' },
    { label: t('BuySellRequestState.Invalid'), value: 'Invalid' },
    { label: t('BuySellRequestState.Registration'), value: 'Registration' },
    { label: t('BuySellRequestState.OnSending'), value: 'OnSending' },
    { label: t('BuySellRequestState.Send'), value: 'Send' },
    { label: t('BuySellRequestState.Done'), value: 'Done' },
    { label: t('BuySellRequestState.Cancelled'), value: 'Cancelled' },
    { label: t('BuySellRequestState.SendError'), value: 'SendError' },
];

export const defaultFormValue: IGetOfflineRequestsParamsPaginated = {
    CustomerISIN: [],
    SymbolISIN: [],
    FromDate: dayjs().format('YYYY-MM-DDT00:00:00'),
    ToDate: dayjs().format('YYYY-MM-DDT23:59:59'),
    Time: 'day',
    PageNumber: 1,
    PageSize: 25,
    CustomerType: '',
    MarketType: '',
    MarketUnit: '',
    RequestNo: '',
    State: '',
};
