import { SendToBasketIcon } from '@assets/icons';
import useSendOrders from '@hooks/useSendOrders';
import Button from '@uiKit/Button';
import { useBuySellContext } from '../../context/buySellContext';
import { useCustomerStore } from '@store/customer';
import { generateSourceOrder, handleValidity, uid } from '@methods/helper';
import { useSymbolStore } from '@store/symbol';
import { useModalStore } from '@store/modal';
import { onErrorNotif } from '@config/toastify';

const ActionsOrder = () => {
     const {
          price,
          quantity,
          side,
          strategy,
          validity,
          validityDate,
          source,
          isPercentQuantity,
          quantityWithPercent,
          priceWithPercent,
          isPercentPrice,
          isDivideOrder,
     } = useBuySellContext();

     const { setIsPercentQuantityOrderModal, setDividedOrdersModal } = useModalStore();

     const { selectedCustomers } = useCustomerStore();

     const { selectedSymbol } = useSymbolStore();

     const { sendOrders, ordersLoading } = useSendOrders();

     const handleSendOrder = () => {
          const CustomerTagId: TCustomerIsins = [];
          const GTTraderGroupId: TCustomerIsins = [];

          const orders: ICreateOrderReq[] = selectedCustomers
               .map(({ customerISIN, title }) => {
                    return {
                         id: uid(),
                         customerISIN: [customerISIN],
                         customerTitle: [title],
                         CustomerTagId,
                         GTTraderGroupId,
                         orderSide: side,
                         orderDraftId: undefined,
                         orderStrategy: strategy,
                         orderType: 'LimitOrder' as IOrderType,
                         percent: 0,
                         price: price,
                         quantity: quantity,
                         symbolISIN: selectedSymbol,
                         validity: handleValidity(validity),
                         validityDate: validityDate,
                         source: generateSourceOrder(source, side),
                         // PositionSymbolISIN: (side === 'Sell' && symbolData?.isOption && generateSourceOrder() === "Position") ? source?.split("-")[1] : undefined
                    };
               })
               .filter(Boolean);

          sendOrders(orders);
     };

     const sendingOrder = () => {
          if (selectedCustomers.length === 0) {
               onErrorNotif({ title: 'حداقل یک مشتری باید انتخاب شود' });
               return;
          } else if (!isPercentPrice && !price) {
               onErrorNotif({ title: ' ورودی قیمت معتبر نمی باشد' });
               return;
          } else if (isPercentPrice && !priceWithPercent.percent) {
               onErrorNotif({ title: ' درصد قیمت معتبر نمی باشد' });
               return;
          } else if (!isPercentQuantity && !quantity) {
               onErrorNotif({ title: ' ورودی تعداد معتبر نمی باشد' });
               return;
          } else if (isPercentQuantity && !quantityWithPercent.percent) {
               onErrorNotif({ title: ' درصد تعداد معتبر نمی باشد' });
               return;
          } else if (isPercentQuantity) {
               setIsPercentQuantityOrderModal(true);
               return;
          } else if (isDivideOrder) {
               setDividedOrdersModal(true);
               return;
          }

          handleSendOrder();
     };

     return (
          <div className="flex gap-x-4">
               <Button
                    variant={side === 'Buy' ? 'primary-outline' : 'danger-outline'}
                    className="flex-1"
                    icon={<SendToBasketIcon />}
                    disabled={true}
               >
                    ارسال به سبد
               </Button>

               <Button
                    variant={side === 'Buy' ? 'primary' : 'danger'}
                    className="flex-1"
                    onClick={sendingOrder}
                    isLoading={ordersLoading}
               >
                    ارسال {side === 'Buy' ? 'خرید' : 'فروش'}
               </Button>
          </div>
     );
};

export default ActionsOrder;
