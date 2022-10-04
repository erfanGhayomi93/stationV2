import dayjs from 'dayjs';

export const VALIDITY_OPTIONS = [
    {
        id: 1,
        title: 'validity_Day',
        value: 'Day',
        validityDate: dayjs().format('YYYY-MM-DD'),
    },
    { id: 2, title: 'validity_Week', value: 'Week', validityDate: dayjs().add(1, 'week').format('YYYY-MM-DD') },
    { id: 3, title: 'validity_Month', value: 'Month', validityDate: dayjs().add(1, 'month').format('YYYY-MM-DD') },
    {
        id: 4,
        title: 'validity_GoodTillDate',
        value: 'GoodTillDate',
        validityDate: undefined,
    },
    {
        id: 5,
        title: 'validity_FillAndKill',
        value: 'FillAndKill',
        validityDate: undefined,
    },
    {
        id: 6,
        title: 'validity_GoodTillCancelled',
        value: 'GoodTillCancelled',
        validityDate: undefined,
    },
];
