import { CustomDetailCellRendererProps } from '@ag-grid-community/react';
import { SnowIcon } from '@assets/icons';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';

const SymbolTitleRenderer = ({ data }: CustomDetailCellRendererProps<IPortfolioRes>) => {
     const { t } = useTranslation();

     return (
          <div className="flex h-full items-center justify-between">
               <span className="text-content-paragraph">{data?.symbolTitle}</span>
               {data?.isFreezed && (
                    <Tippy className="rtl" content={t('portfolioCustomerModal.portfolioFreezeSymbolTooltip')}>
                         <SnowIcon className="text-icon-info" />
                    </Tippy>
               )}
          </div>
     );
};

export default SymbolTitleRenderer;
