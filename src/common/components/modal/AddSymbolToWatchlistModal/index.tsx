import { useAddSymbolToWatchlist, useDeleteSymbolInWatchlist, useGetSymbolInWatchlist, useGetWatchlists } from '@api/watchlist';
import { EyePlusIcon, PlusIcon } from '@assets/icons';
import { useModalStore } from '@store/modal';
import { useSymbolStore } from '@store/symbol';
import Button from '@uiKit/Button';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '..';

const AddSymbolToWatchlistModal = () => {
     const { t } = useTranslation();

     const { setAddSymbolToWatchlistModal, setCreateNewWatchlistModal } = useModalStore();

     const { selectedSymbol } = useSymbolStore();

     const { data: watchlistsData } = useGetWatchlists();

     const { data: getSymbolInWatchlistData, refetch: refetchGetSymbolInWatchlist } = useGetSymbolInWatchlist();

     const { mutate: deleteSymbolInWatchlistMutate } = useDeleteSymbolInWatchlist();

     const { mutate: addSymbolToWatchlistMutate } = useAddSymbolToWatchlist();

     const onCloseModal = () => {
          setAddSymbolToWatchlistModal(false);
     };

     const symbolIsWatchlist = (id: number) => {
          return getSymbolInWatchlistData?.some(item => item.watchlistId === id && item.symbolISIN === selectedSymbol);
     };

     const handleAddRemoveSymbolToWatchlist = (watchlist: IWatchlistsRes) => {
          const isSymbolInWatchlist = getSymbolInWatchlistData?.some(
               item => item.watchlistId === watchlist.id && item.symbolISIN === selectedSymbol
          );

          if (isSymbolInWatchlist) {
               deleteSymbolInWatchlistMutate(
                    { symbolISIN: selectedSymbol, type: watchlist.type, watchlistId: watchlist.id },
                    {
                         onSuccess: () => {
                              refetchGetSymbolInWatchlist();

                              toast.success(t('alerts.deleteSymbolInWatchlistSuccessful'));
                         },
                         onError: () => {
                              toast.error(t('alerts.deleteSymbolInWatchlistError'));
                         },
                    }
               );
          } else {
               addSymbolToWatchlistMutate(
                    { symbolISIN: selectedSymbol, type: watchlist.type, watchlistId: watchlist.id },
                    {
                         onSuccess: () => {
                              refetchGetSymbolInWatchlist();
                              toast.success(t('alerts.addSymbolWatchlistSuccessful'));
                         },
                         onError: () => {
                              toast.error(t('alerts.addSymbolWatchlistError'));
                         },
                    }
               );
               refetchGetSymbolInWatchlist();
          }
     };

     return (
          <Modal title={t('addSymbolToWatchlistModal.title')} onCloseModal={onCloseModal} size="sm">
               <div className="flex flex-col gap-6 overflow-hidden">
                    <button
                         onClick={() => {
                              setCreateNewWatchlistModal(true);
                         }}
                         className="flex items-center justify-center gap-2 rounded-md border border-dashed border-button-primary-default py-2 text-button-primary-default"
                    >
                         <PlusIcon className="" />
                         <span className="text-sm font-medium">{t('addSymbolToWatchlistModal.newWatchlist')}</span>
                    </button>

                    <ul className="flex max-h-96 flex-1 flex-col overflow-y-auto">
                         {watchlistsData?.map((watchlist, index) => (
                              <li className="flex items-center justify-between border-b border-line-div-3 py-3" key={index}>
                                   <span className="text-sm font-medium text-content-title">{watchlist.watchListName}</span>
                                   <button
                                        className="pl-2"
                                        onClick={() => {
                                             handleAddRemoveSymbolToWatchlist(watchlist);
                                        }}
                                   >
                                        <EyePlusIcon
                                             className={clsx({
                                                  'text-icon-default': !symbolIsWatchlist(watchlist.id),
                                                  'text-icon-primary': symbolIsWatchlist(watchlist.id),
                                             })}
                                        />
                                   </button>
                              </li>
                         ))}
                    </ul>

                    <div className="min-h-[1px] w-full bg-line-div-2" />

                    <div className="flex items-center gap-4">
                         <Button onClick={onCloseModal} variant="primary" className="flex-1">
                              {t('addSymbolToWatchlistModal.saveButton')}
                         </Button>
                         <Button onClick={onCloseModal} variant="primary-outline" className="flex-1">
                              {t('addSymbolToWatchlistModal.cancelButton')}
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default AddSymbolToWatchlistModal;
