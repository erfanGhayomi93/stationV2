type TTradesAggregate = 'Customer' | 'Symbol' | 'Both' | 'None';

type TDate = 'day' | 'week' | 'month' | 'year' | 'custom';

type TSideFilter = 'Buy' | 'Sell' | 'All';

interface ITradesReportsFilters {
     date: {
          id: TDate;
          label: string;
     };
     fromDate: number;
     toDate: number;
     side: {
          id: TSideFilter;
          label: string;
     };
     symbols: (SearchSymbol | null)[];
     customers: ICustomerAdvancedSearchRes[];
     pageNumber: number;
     pageSize: number;
     customerType: {
          id: TCustomerType;
          label: string;
     };
     aggregateType: {
          id: TTradesAggregate;
          label: string;
     };
}

// interface ITradesReportsFilters {
//      FromDate?: string;
//      ToDate?: string;
//      Side?: BuySellSide;
//      SymbolISIN: SymbolSearchResult[];
//      CustomerISIN: IGoCustomerSearchResult[];
//      'QueryOption.PageSize': number;
//      'QueryOption.PageNumber': number;
//      Time?: string;
//      CustomerType?: CustomerType;
//      MyStationOnly: boolean;
//      GetTradesAggregateType: TTradesAggreage;
// }
