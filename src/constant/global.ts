import i18next from 'i18next';


export const marketUnitTypeOption = [
    { value: '', label: i18next.t('common.all') },
    { value: 'Bourse', label: i18next.t('exchange_type.Bourse') },
    { value: 'FaraBourse', label: i18next.t('exchange_type.FaraBourse') },
    { value: 'EnergyExchange', label: i18next.t('exchange_type.EnergyExchange') },
    { value: 'BaseFaraBourse', label: i18next.t('exchange_type.BaseFaraBourse') },
    { value: 'Future', label: i18next.t('exchange_type.Future') },
    { value: 'CommodityExchange', label: i18next.t('exchange_type.CommodityExchange') },
];
