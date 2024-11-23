import { CustomCellRendererProps } from '@ag-grid-community/react';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';

const OrderStateRenderer = ({ data }: CustomCellRendererProps<IOpenOrder>) => {
     const { t } = useTranslation();

     if (data?.orderState === 'Error' && data?.customErrorMsg) {
          return (
               <Tippy className="rtl" content={data?.customErrorMsg}>
                    <span>{data?.orderState ? t(`orderStatus.${data?.orderState as TStatus}`) : '-'}</span>
               </Tippy>
          );
     }

     return <span>{data?.orderState ? t(`orderStatus.${data?.orderState as TStatus}`) : '-'}</span>;
};

export default OrderStateRenderer;
