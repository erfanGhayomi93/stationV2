import { useEffect, useState } from 'react'
import { useWatchListState } from '../context/WatchlistContext'
import Modal from 'src/common/components/Modal'
import { CloseIcon } from 'src/common/icons'
import { useTranslation } from 'react-i18next'
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect'
import ipcMain from 'src/common/classes/IpcMain'
import { queryClient } from 'src/app/queryClient'
import { toast } from 'react-toastify'
import { addWatchListSymbolMutation, deleteWatchListSymbolMutation } from 'src/app/queries/watchlist'

export const AddSymbolModal = () => {
  const { t } = useTranslation()
  const { state: { addSymbolMode, selectedWatchlistId, PageNumber }, setState } = useWatchListState()

  const [selected, setSelected] = useState<SymbolSearchResult[]>([])

  const { mutate: addWatchListSymbol } = addWatchListSymbolMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['getWatchListSymbols', selectedWatchlistId + '-' + PageNumber]);
      queryClient.invalidateQueries(['GetSymbolInWatchlist']);
      toast.success('نماد با موفقیت به دیده‌بان اضافه شد');
    }
  });

  const { mutate: removeWatchListSymbol } = deleteWatchListSymbolMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['getWatchListSymbols', selectedWatchlistId + '-' + PageNumber]);
      queryClient.invalidateQueries(['GetSymbolInWatchlist']);
      toast.success('نماد با موفقیت  از دیده بان حذف شد');
    }
  })

  const closeModal = () => {
    setState({ type: "TOGGLE_ADD_SYMBOL_MODE", value: false })
  }

  const handleRemoveSymbolInWatchlist = (symbolISIN: string) => {
    const data: IWatchlistSymbolRequestType = {
      symbolISIN: symbolISIN,
      watchlistId: selectedWatchlistId as number
    }

    removeWatchListSymbol(data)
  }

  const handleAddSymbolInWatchlist = (symbolISIN: string) => {
    const data: IWatchlistSymbolRequestType = {
      symbolISIN: symbolISIN,
      watchlistId: selectedWatchlistId as number
    }

    addWatchListSymbol(data)
  }

  useEffect(() => {
    ipcMain.handle("AddSymbolInWatchlist", handleAddSymbolInWatchlist)
    ipcMain.handle("RemoveSymbolInWatchlist", handleRemoveSymbolInWatchlist)

    return () => {
      ipcMain.removeHandler("AddSymbolInWatchlist")
      ipcMain.removeHandler("RemoveSymbolInWatchlist")
    }
  }, [selectedWatchlistId])


  return (
    <>
      <Modal isOpen={addSymbolMode} onClose={closeModal} className="min-h-[35rem] w-[500px] rounded-md h-full grid bg-L-basic dark:bg-D-basic translate-y-7">
        <div className="grid grid-rows-min-one-min" data-cy="wl-edit-modal">

          <div className="w-full text-white font-semibold bg-L-primary-50 dark:bg-D-gray-400 h-10 flex items-center justify-between px-5">
            <div>{t("setting.key_symbol_search")}</div>
            <CloseIcon onClick={closeModal} data-cy="wl-edit-modal-close" className="cursor-pointer" />
          </div>

          <div className='p-6'>
            <SymbolMiniSelect setSelected={setSelected} selected={selected} isBigSize watchlistId={selectedWatchlistId} isOnModal />
          </div>

        </div>
      </Modal>
    </>
  )
}
