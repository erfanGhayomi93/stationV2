import i18next from 'i18next';
// import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { onErrorNotif, onSuccessNotif } from '@config/toastify';
import { pushEngine } from '@LS/pushEngine';
import ipcMain from 'common/classes/IpcMain';
// import { queryClient } from '@config/reactQuery';
// import ipcMain from 'common/classes/IpcMain';

// let timeOutRefetch: NodeJS.Timeout | undefined = undefined;

type IRamandOMSInstanceType = {
     subscribeCustomers: (userName: string, brokerCode: string) => void;
     unSubscribeCustomers: () => void;
     isSubscribed: () => boolean | undefined;
     // currentSubscribed: () => string[] | undefined;
};

const createRamandOMSGateway = () => {
     const translateMessage = (value: string) => {
          const message = value.split('^');
          const msgObj: Record<number, string> = {};

          try {   
               message.forEach(item => {
                    if (item) {
                         const [index, value] = item.split('=');
                         msgObj[Number(index)] = value;
                    }
               });
          } catch (e) {
               //
          }

          return msgObj;
     };

     const handlePushNotification = (message: Record<number, string>) => {
          const omsClientKey = message[12];
          const omsOrderStatus = message[22] as TStatus;
          const orderMessageType = message[200];
          const errorMessageType = message[208];

          console.log(
               'omsClientKey',
               omsClientKey,
               'omsOrderStatus',
               omsOrderStatus,
               'orderMessageType',
               orderMessageType,
               'errorMessageType',
               errorMessageType
          );

          //   const detailsNotif = (!!pushNotification[omsClientKey] && !!pushNotification[omsClientKey].symbolTitle) ? `(${pushNotification[omsClientKey].customerTitle} - ${pushNotification[omsClientKey].symbolTitle})` : ""
          const detailsNotif = '';

          if (
               ['OnBoard', 'PartOfTheOrderDone', 'OrderDone', 'OnBoardModify', 'InOMSQueue', 'Canceled'].includes(omsOrderStatus)
          ) {
               onSuccessNotif({
                    toastId: omsClientKey + omsOrderStatus,
                    title: `${i18next.t(`orderStatus.${omsOrderStatus as TStatus}`)}${detailsNotif}`,
               });
          } else if (['Error'].includes(omsOrderStatus)) {
               const errorTitle = errorMessageType
                    ? errorMessageType + detailsNotif
                    : `${i18next.t(`order_errors.${orderMessageType as errorStatus}`)}${detailsNotif}`;
               onErrorNotif({ toastId: omsClientKey + omsOrderStatus, title: errorTitle });
          } else if (['Expired', 'DeleteByEngine'].includes(omsOrderStatus)) {
               onErrorNotif({
                    toastId: omsClientKey + omsOrderStatus,
                    title: `${i18next.t(`orderStatus.${omsOrderStatus as TStatus}`)}${detailsNotif}`,
               });
          }

          //           if (['OrderDone', 'OnBoardModify', 'Canceled', 'Error', 'Expired', 'DeleteByEngine'].includes(omsOrderStatus)) {
          //                delete pushNotification[omsClientKey];
          //
          //                setLocalStorage(pushNotification);
          //           }
     };

     //      const refetchApiAccordingLs = (omsOrderStatus: TStatus) => {
     //           //
     //
     //           timeOutRefetch = setTimeout(() => {
     //                if (
     //                     [
     //                          'DeleteByEngine',
     //                          'OnBoard',
     //                          'Canceled',
     //                          'OnBoardModify',
     //                          'PartOfTheOrderDone',
     //                          'OrderDone',
     //                          'Expired',
     //                          'Error',
     //                          'Modified',
     //                     ].includes(omsOrderStatus)
     //                ) {
     //                     // queryClient.invalidateQueries(['orderList', 'All'])
     //                     // queryClient.invalidateQueries(['orderList', 'OnBoard'])
     //                     // queryClient.invalidateQueries(['GetOpenPositions'])
     //                     // ipcMain.send('update_customer');
     //                     // ipcMain.send('refetch_onBoard_order');
     //                     clearTimeout(timeOutRefetch);
     //                }
     //           }, 1000);
     //      };

     const handleOMSMessage = (message: Record<number, string>) => {
          const timeOut = setTimeout(() => {
               // ipcMain.send('onOMSMessageReceived', message);
               ipcMain.send('onOMSMessageReceived', message);

               handlePushNotification(message);

               //    clearTimeout(timeOutRefetch);
               //    const omsOrderStatus = message[22] as TStatus;
               //    refetchApiAccordingLs(omsOrderStatus);

               clearTimeout(timeOut);
          }, 500);
     };

     const handleAdminMessage = (message: Record<number, string>) => {
          // ipcMain.send('onAdminMessageReceived', message);
     };

     const handleSystemMessage = (message: Record<number, string>) => {
          // ipcMain.send('onSystemMessageReceived', message);
     };

     const isSubscribed = () => pushEngine.getSubscribeById('supervisorMessage')?.isSubscribed();

     // const currentSubscribed = () => pushEngine.getSubscribeById('supervisorMessage')?.getItems();

     const subscribeCustomers = (userName: string, brokerCode: string) => {
          const userNameWithoutNoisy = userName.replace(/[|&;$%@"<>()+,._!#^*?']/g, '');

          const userNameBroker = String(brokerCode + '_' + userNameWithoutNoisy);

          const items = [`${brokerCode || '189'}_All`, userNameBroker];

          if (isSubscribed()) pushEngine.unSubscribe('supervisorMessage');

          pushEngine.subscribe({
               id: 'supervisorMessage',
               mode: 'RAW',
               isSnapShot: 'no',
               adapterName: 'RamandOMSGateway',
               items: items,
               fields: ['OMSMessage', 'AdminMessage', 'SystemMessage'],
               onFieldsUpdate: ({ changedFields }) => {
                    //
                    if (changedFields['OMSMessage']) handleOMSMessage(translateMessage(changedFields['OMSMessage']));
                    else if (changedFields['AdminMessage']) handleAdminMessage(translateMessage(changedFields['AdminMessage']));
                    else if (changedFields['SystemMessage'])
                         handleSystemMessage(translateMessage(changedFields['SystemMessage']));
               },
          });
     };

     const unSubscribeCustomers = () => pushEngine.unSubscribe('supervisorMessage');

     return {
          subscribeCustomers,
          unSubscribeCustomers,
          isSubscribed,
          // currentSubscribed,
     };
};

const ramandOMSInstance: IRamandOMSInstanceType = createRamandOMSGateway();

const useRamandOMSGateway = () => ramandOMSInstance;

export default useRamandOMSGateway;
