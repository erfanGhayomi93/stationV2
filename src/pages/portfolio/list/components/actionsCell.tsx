import { Dispatch, FC, SetStateAction } from 'react'
import { ChartTypeBarSVG, MinusIcon, PlusIcon } from 'src/common/icons'

type TActionCellType = {
  data?: IGTPortfolioResultType,
  historyModalAction: () => void
  setDataModal: Dispatch<SetStateAction<IGTPortfolioResultType | undefined>>
}

export const ActionsCell: FC<TActionCellType> = ({ data, historyModalAction, setDataModal }) => {

  const ClickHistoryAction = () => {
    if (!data) return

    setDataModal(data)
    historyModalAction()
  }

  const waitingModal = () => {
    alert("این قابلیت زمانی فراهم میشود که مدال خرید و فروش ثابت نباشد.");
  }


  return (
    <div className='flex gap-2 justify-center items-center w-full h-full'>
      <div className='w-6 h-6 bg-L-gray-200 dark:bg-D-gray-200 rounded-md flex justify-center items-center cursor-pointer' onClick={waitingModal}>
        <PlusIcon className='w-4 h-4 text-L-gray-700 dark:text-D-gray-700 rounded-md' />
      </div>
      <div className='w-6 h-6 bg-L-gray-200 dark:bg-D-gray-200 rounded-md flex justify-center items-center cursor-pointer' onClick={waitingModal}>
        <MinusIcon className='w-5 h-5 text-L-gray-700 dark:text-D-gray-700 rounded-md' />
      </div>
      <div className='w-6 h-6 bg-L-gray-200 dark:bg-D-gray-200 rounded-md flex justify-center items-center cursor-pointer' onClick={ClickHistoryAction}>
        <ChartTypeBarSVG className='w-4 h-4 text-L-gray-700 dark:text-D-gray-700 rounded-md' />
      </div>
    </div>
  )
}
