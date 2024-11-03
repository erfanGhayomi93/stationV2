import { CustomCellRendererProps } from '@ag-grid-community/react';
import { getColorClassBasedAmount, sepNumbers } from '@methods/helper';
import clsx from 'clsx';

const SupplyAndDemandRenderer = (params: CustomCellRendererProps<ISameGroupsRes, number>) => {
     return (
          <div className="text-cop relative flex items-center justify-center">
               <span className={clsx('absolute -top-1', getColorClassBasedAmount(Number(params.value)))}>
                    {'\u200e' + sepNumbers(params.data?.bestBuyPricebestBuyLimitPrice_1)}
               </span>
               <span className={clsx('absolute top-3', getColorClassBasedAmount(Number(params.data?.lastTradedPriceVarPercent)))}>
                    {'\u200e' + sepNumbers(params.data?.bestSellLimitPrice_1)}
               </span>
          </div>
     );
};

export default SupplyAndDemandRenderer;
