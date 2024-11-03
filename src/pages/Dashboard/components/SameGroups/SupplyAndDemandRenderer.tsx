import { CustomCellRendererProps } from '@ag-grid-community/react';
import { sepNumbers } from '@methods/helper';
import clsx from 'clsx';

const SupplyAndDemandRenderer = (params: CustomCellRendererProps<ISameGroupsRes, number>) => {
     return (
          <div className="text-cop relative flex items-center justify-center">
               <span className={clsx('absolute -top-1 text-content-selected')}>
                    {'\u200e' + sepNumbers(params.data?.bestBuyLimitPrice_1)}
               </span>
               <span className={clsx('absolute top-3 text-content-error-sell')}>
                    {'\u200e' + sepNumbers(params.data?.bestSellLimitPrice_1)}
               </span>
          </div>
     );
};

export default SupplyAndDemandRenderer;
