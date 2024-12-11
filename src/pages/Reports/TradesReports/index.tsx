import TradesReportsToolbar from '@pages/Reports/TradesReports/components/TradesReportsToolbar.tsx';
import TradesReportsTable from '@pages/Reports/TradesReports/components/TradesReportsTable.tsx';
import TradesReportsFilters from '@pages/Reports/TradesReports/components/TradesReportsFilters.tsx';
import { useTradesReports } from '@api/order';
import LayoutReport from '@pages/Basket/layout';
import { useTranslation } from 'react-i18next';
import useInputs from '@hooks/useInputs.ts';
import { useCustomerStore } from '@store/customer';
import { calculateDateRange, oneDayAgo, today } from '@methods/helper.ts';
import { useEffect } from 'react';

const TradesReports = () => {
     const { t } = useTranslation();

     const { removeAllSelectedCustomers } = useCustomerStore();

     const initialTradesReportsFilter: ITradesReportsFilters = {
          date: {
               id: 'day',
               label: t('dates.day'),
          },
          fromDate: oneDayAgo(),
          toDate: today(),
          customerType: {
               id: 'All',
               label: t('tradesReports.customerTypeAll'),
          },
          customers: [],
          symbols: [],
          side: {
               id: 'All',
               label: t('tradesReports.sideAll'),
          },
          aggregateType: {
               id: 'None',
               label: t('tradesReports.aggregateTypeNone'),
          },
          pageNumber: 1,
          pageSize: 25,
     };

     const {
          inputs: tradesReportsFilters,
          setFieldValue: setFieldTradesReportsFilters,
          setInputs: setFieldsTradesReportsFilters,
     } = useInputs<ITradesReportsFilters>(initialTradesReportsFilter);

     const {
          data: tradesReportsData,
          refetch: refetchTradesReports,
          isLoading: loadingTradesReports,
     } = useTradesReports(tradesReportsFilters);

     useEffect(() => {
          if (tradesReportsFilters.date.id === 'custom') return;

          setFieldsTradesReportsFilters({
               ...tradesReportsFilters,
               ...calculateDateRange(tradesReportsFilters.date.id),
          });
     }, [tradesReportsFilters.date]);

     return (
          <LayoutReport
               leftNodeHeader={<TradesReportsToolbar />}
               mainContent={
                    <TradesReportsTable
                         data={tradesReportsData}
                         loading={loadingTradesReports}
                         filters={tradesReportsFilters}
                         setFieldFilters={setFieldTradesReportsFilters}
                    />
               }
               leftNodeFilter={
                    <TradesReportsFilters filters={tradesReportsFilters} setFieldFilters={setFieldTradesReportsFilters} />
               }
               onSubmitFilter={() => {
                    refetchTradesReports();
               }}
               onResetFilters={() => {
                    setFieldsTradesReportsFilters(initialTradesReportsFilter);
                    removeAllSelectedCustomers();
               }}
               title={t('tradesReports.title')}
          />
     );
};

export default TradesReports;
