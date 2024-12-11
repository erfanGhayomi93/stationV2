import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomersSearch from '@components/customersSearch';
import SelectInput from '@uiKit/Inputs/SelectInput.tsx';
import AdvancedDatepicker from '@components/Datepicker/AdvanceDatePicker.tsx';
import CheckButton from '@components/CheckButton.tsx';
import MultiSearchSymbol from '@components/searchSymbol/MulitSearchSymbol.tsx';

interface ITradesReportsFiltersSidebarProps {
     filters: ITradesReportsFilters;
     setFieldFilters: <K extends keyof ITradesReportsFilters>(name: K, value: ITradesReportsFilters[K]) => void;
}

const TradesReportsFilters = ({ filters, setFieldFilters }: ITradesReportsFiltersSidebarProps) => {
     const { t } = useTranslation();

     const dateItems = useMemo<
          {
               id: TDate;
               label: string;
          }[]
     >(
          () => [
               {
                    id: 'day',
                    label: t('dates.day'),
               },
               {
                    id: 'week',
                    label: t('dates.week'),
               },
               {
                    id: 'month',
                    label: t('dates.month'),
               },
               {
                    id: 'year',
                    label: t('dates.year'),
               },
               {
                    id: 'custom',
                    label: t('dates.custom'),
               },
          ],
          []
     );

     const customersItems = useMemo<
          {
               id: TCustomerType;
               label: string;
          }[]
     >(
          () => [
               {
                    id: 'All',
                    label: t('tradesReports.customerTypeAll'),
               },
               {
                    id: 'Natural',
                    label: t('tradesReports.customerTypeNatural'),
               },
               {
                    id: 'Legal',
                    label: t('tradesReports.customerTypeLegal'),
               },
          ],
          []
     );

     const aggregateType = useMemo<
          {
               id: TTradesAggregate;
               label: string;
          }[]
     >(
          () => [
               {
                    id: 'None',
                    label: t('tradesReports.aggregateTypeNone'),
               },
               {
                    id: 'Customer',
                    label: t('tradesReports.aggregateTypeCustomer'),
               },
               {
                    id: 'Symbol',
                    label: t('tradesReports.aggregateTypeSymbol'),
               },
               {
                    id: 'Both',
                    label: t('tradesReports.aggregateTypeCustomerAndSymbol'),
               },
          ],
          []
     );

     const sideItems = useMemo<{ id: TSideFilter; label: string }[]>(
          () => [
               {
                    id: 'All',
                    label: t('tradesReports.sideAll'),
               },
               {
                    id: 'Buy',
                    label: t('tradesReports.sideBuy'),
               },
               {
                    id: 'Sell',
                    label: t('tradesReports.sideSell'),
               },
          ],
          []
     );

     return (
          <div className="flex flex-col gap-6">
               <CustomersSearch
                    onChange={customers => setFieldFilters('customers', customers)}
                    bgPlaceholder={false}
                    isDetailsCustomerData={false}
               />

               <MultiSearchSymbol
                    searchSymbol={filters.symbols}
                    setSearchSymbol={symbols => setFieldFilters('symbols', symbols)}
               />

               <SelectInput<TDate>
                    onChange={date => setFieldFilters('date', date)}
                    value={filters.date}
                    items={dateItems}
                    placeholder="زمان"
               />

               <div className="flex gap-2">
                    <AdvancedDatepicker
                         placement="bottom"
                         placeholder={t('dates.from')}
                         value={filters.fromDate}
                         onChange={date => setFieldFilters('fromDate', date.getDate())}
                    />
                    <AdvancedDatepicker
                         placeholder={t('dates.to')}
                         value={filters.toDate}
                         onChange={date => setFieldFilters('toDate', date.getDate())}
                    />
               </div>

               <SelectInput<TSideFilter>
                    onChange={side => setFieldFilters('side', side)}
                    value={filters.side}
                    items={sideItems}
                    placeholder="سمت"
               />

               <SelectInput<TCustomerType>
                    onChange={customer => setFieldFilters('customerType', customer)}
                    value={filters.customerType}
                    items={customersItems}
                    placeholder="نوع مشتری"
               />

               <SelectInput<TTradesAggregate>
                    onChange={value => setFieldFilters('aggregateType', value)}
                    value={filters.aggregateType}
                    items={aggregateType}
                    placeholder="تجمیع"
               />
          </div>
     );
};

export default TradesReportsFilters;
