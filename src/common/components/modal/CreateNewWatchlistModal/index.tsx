import { useCreateWatchlist } from '@api/watchlist';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@uiKit/Button';
import FieldInputText from '@uiKit/Inputs/FieldInputText';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '..';

const CreateNewWatchlistModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { setCreateNewWatchlistModal } = useModalStore();

     const [watchlistName, setWatchlistName] = useState('');

     const { mutate: createWatchlistMutate } = useCreateWatchlist();

     const onCloseModal = () => {
          setCreateNewWatchlistModal(false);
     };

     return (
          <Modal size="xs" title={t('addSymbolToWatchlistModal.createNewWatchlistTitle')} onCloseModal={onCloseModal}>
               <div className="flex flex-col gap-6">
                    <div>
                         <FieldInputText
                              placeholder={t('addSymbolToWatchlistModal.watchlistTitleInputLabel')}
                              onChange={value => {
                                   setWatchlistName(value);
                              }}
                         />
                    </div>

                    <div />

                    <div className="flex items-center gap-4">
                         <Button
                              onClick={() => {
                                   onCloseModal();
                              }}
                              variant="primary-outline"
                              className="py-3"
                         >
                              {t('addSymbolToWatchlistModal.cancelButton')}
                         </Button>
                         <Button
                              onClick={() => {
                                   createWatchlistMutate(
                                        { watchlistName },
                                        {
                                             onSuccess: () => {
                                                  toast.success(t('alerts.createNewWatchlistSuccessful'));

                                                  queryClient.refetchQueries({ queryKey: ['getWatchlists'] });
                                             },
                                             onError: () => {
                                                  toast.success(t('alerts.createNewWatchlistError'));
                                             },
                                        }
                                   );

                                   setWatchlistName('');

                                   onCloseModal();
                              }}
                              variant="primary"
                              className="py-3"
                         >
                              {t('addSymbolToWatchlistModal.createWatchlistButton')}
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default CreateNewWatchlistModal;
