import dayjs from 'dayjs';
import i18next from 'i18next';

export const initStatePortfolioFilter = {
    customerType: '',
    CustomerISIN: [],
    SymbolISIN: [],
    PageNumber: 1,
    PageSize: 25,
    MarketUnitType: '',
    MarketType: '',
};

export const initHistoryFilter = {
    time: 'year',
    fromDate: dayjs().subtract(1, 'year').format(),
    toDate: dayjs().format(),
    type: '',
    customerISIN: '',
    symbolISIN: '',
};

export const customerTypeFieldOptions = [
    { value: '', label: i18next.t('common.all') },
    { value: 'Natural', label: i18next.t('CustomerType.Natural') },
    { value: 'Legal', label: i18next.t('CustomerType.Legal') },
];

export const typesOption = [
    { value: '', label: i18next.t('common.all') },
    { value: 'Change_Broker_Out', label: i18next.t('portfolioCardexType.Change_Broker_Out') },
    { value: 'Portfolio_Change_BonusShare', label: i18next.t('portfolioCardexType.Portfolio_Change_BonusShare') },
    { value: 'Capital_Increase_Share_Premium', label: i18next.t('portfolioCardexType.Capital_Increase_Share_Premium') },
    { value: 'Capital_Increase_Contribution', label: i18next.t('portfolioCardexType.Capital_Increase_Contribution') },
    { value: 'Manual_Buy', label: i18next.t('portfolioCardexType.Manual_Buy') },
    { value: 'Portfolio_Change_Out', label: i18next.t('portfolioCardexType.Portfolio_Change_Out') },
    { value: 'DPS', label: i18next.t('portfolioCardexType.DPS') },
    { value: 'Change_Broker', label: i18next.t('portfolioCardexType.Change_Broker') },
    { value: 'DDN_Buy', label: i18next.t('portfolioCardexType.DDN_Buy') },
    { value: 'Manual_Sell', label: i18next.t('portfolioCardexType.Manual_Sell') },
    { value: 'Trade_Sell', label: i18next.t('portfolioCardexType.Trade_Sell') },
    { value: 'DDN_Sell', label: i18next.t('portfolioCardexType.DDN_Sell') },
    { value: 'Capital_Increase_Reserve', label: i18next.t('portfolioCardexType.Capital_Increase_Reserve') },
    { value: 'Portfolio_Change_In', label: i18next.t('portfolioCardexType.Portfolio_Change_In') },
];
