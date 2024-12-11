import { CustomGroupCellRendererProps } from '@ag-grid-community/react';
import { CloseFillIcon, MoreStatusIcon, ReturnFillIcon } from '@assets/icons';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';

const ActionCellRenderer = (params: CustomGroupCellRendererProps<IPositionsCustomerRes>) => {
     const { t } = useTranslation();

     console.log(params, 'params');

     return (
          <div className="flex h-full items-center gap-4 text-icon-default">
               <Tippy content={t('portfolioCustomerModal.positionsChangeGuaranteeActionTooltip')}>
                    <button disabled>
                         <ReturnFillIcon />
                    </button>
               </Tippy>
               <Tippy content={t('portfolioCustomerModal.positionsClosePositionActionTooltip')}>
                    <button disabled>
                         <CloseFillIcon />
                    </button>
               </Tippy>
               <button disabled>
                    <MoreStatusIcon />
               </button>
          </div>
     );
};

export default ActionCellRenderer;
