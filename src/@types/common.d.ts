declare type ClassesValue = string | number | null | boolean | undefined | string[] | Record<string, null | boolean | undefined>;

type TItem = { id: string; label: string; onClick?: () => void };

type TDate = 'day' | 'week' | 'month' | 'year' | 'custom';

type TCustomerType = 'Natural' | 'Legal' | 'All';
