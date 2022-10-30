import dayjs from 'dayjs';

export const VALIDITY_OPTIONS = [
    {
        id: 1,
        value: 'Day',
        validityDate: dayjs().format('YYYY-MM-DD'),
    },
    { id: 2, title: 'Week', value: 'Week', validityDate: dayjs().add(1, 'week').format('YYYY-MM-DD') },
    { id: 3, title: 'Month', value: 'Month', validityDate: dayjs().add(1, 'month').format('YYYY-MM-DD') },
    {
        id: 4,
        value: 'GoodTillDate',
        validityDate: undefined,
    },
    {
        id: 5,
        value: 'FillAndKill',
        validityDate: undefined,
    },
    {
        id: 6,
        value: 'GoodTillCancelled',
        validityDate: undefined,
    },
];
