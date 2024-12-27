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

     if (data?.orderState === 'Error' && !data?.customErrorMsg) {
          return (
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
               //@ts-expect-error
               <Tippy className="rtl" content={t(`order_errors.${data?.lastErrorCode}`)}>
                    <span>{data?.orderState ? t(`orderStatus.${data?.orderState as TStatus}`) : '-'}</span>
               </Tippy>
          );
     }

     return <span>{data?.orderState ? t(`orderStatus.${data?.orderState as TStatus}`) : '-'}</span>;
};

export default OrderStateRenderer;
