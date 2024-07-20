import { FC, useMemo, useState } from 'react'
import Modal from 'src/common/components/Modal'
import TabsList, { ITabItemType } from 'src/common/components/TabsList'
import { CloseIcon } from 'src/common/icons'
import { useAppDispatch } from 'src/redux/hooks'
import { freezeUnfreezeAction, TFreezeUnFreezeProps } from 'src/redux/slices/ModalSlice'
import { FreezeTab } from './FreezeTab'
import { UnFreezeTab } from './UnFreezeTab'


export const FreezeUnfreezeModal: FC<TFreezeUnFreezeProps> = ({ isOpen }) => {
    //
    const [tabInd, seTabInd] = useState('Freeze')

    const appDispatch = useAppDispatch();

    const closeModal = () => {
        appDispatch(freezeUnfreezeAction({ isOpen: false }))
    }


    const items: ITabItemType[] = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'Freeze',
                title: <>فریز</>,
                content: <FreezeTab 
                closeModal={closeModal}
                />,
            },
            {
                key: 'UnFreeze',
                title: <>رفع فریز</>,
                content: <UnFreezeTab 
                closeModal={closeModal}
                />,
            },
        ],
        [],
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="w-[450px] max-h-[550px]"
        >
            <div className="bg-L-basic dark:bg-D-basic min-h-[450px] grid grid-rows-min-one h-full">
                <div className="w-full font-semibold bg-L-primary-50 dark:bg-D-primary-50 text-L-basic dark:text-D-basic h-10 flex items-center justify-between px-5">
                    <div>فریز / رفع فریز</div>
                    <CloseIcon onClick={closeModal} className="cursor-pointer" />
                </div>

                <div className='mt-1 overflow-y-auto h-full'>
                    <TabsList
                        onChange={(idx) => seTabInd(idx)}
                        selectedIndex={tabInd}
                        items={items}
                        className='h-full grid grid-rows-min-one'
                        fill
                    />
                </div>
            </div>

        </Modal>
    )
}
