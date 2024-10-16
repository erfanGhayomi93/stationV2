import { CustomCellRendererProps } from '@ag-grid-community/react';
import { getColorClassBasedAmount } from '@methods/helper';
import clsx from 'clsx';

const LastPriceRenderer = (params: CustomCellRendererProps<ISameGroupsRes, number>) => {
     return (
          <div className="text-cop relative flex items-center justify-center">
               <span className="absolute -top-1">{'\u200e' + params.value}</span>
               <span className={clsx('absolute top-3', getColorClassBasedAmount(Number(params.data?.lastTradedPriceVarPercent)))}>
                    {'\u200e' + params.data?.lastTradedPriceVarPercent + '%'}
               </span>
          </div>
     );
};

export default LastPriceRenderer;
