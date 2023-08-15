import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable from 'src/common/components/AGTable';
import ControllerInput from 'src/common/components/ControllerInput';
import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import DivideOrderTable from './components/DivideOrderTable';

const DivideOrderModal = () => {
    //
    const [shuffleOrder, setShuffleOrder] = useState(false);

    const { t } = useTranslation();
    return (
        <Modal isOpen={false} onClose={() => {}} className="w-[720px] h-[540px] bg-L-basic dark:bg-D-basic  rounded-md">
            <div className="grid h-full grid-rows-min-one">
                <div className="w-full text-white font-semibold bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div className="w-full">{t('DivideOrder.modalHeader', { side: t('orderSide.Buy'), symbolTitle: 'اخابر' })}</div>
                    <CloseIcon onClick={() => {}} className="cursor-pointer" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                    <div className="pb-3 flex items-center justify-between border-b border-L-gray-400 dark:border-D-gray-400">
                        <div className="text-D-basic dark:text-L-basic">
                            {t('DivideOrder.orderDetail', { side: t('orderSide.Buy'), symbolTitle: 'اخابر', quantity: 1234, price: 120325 })}
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                id="shuffleOrder"
                                className="outline-none cursor-pointer"
                                type="checkbox"
                                checked={shuffleOrder}
                                onChange={(e) => setShuffleOrder(e.target.checked)}
                            />
                            <label className="text-xs text-D-basic dark:text-L-basic cursor-pointer" htmlFor="shuffleOrder">
                                {t('DivideOrder.shuffleOrder')}
                            </label>
                        </div>
                    </div>
                    <div className="text-xs text-L-gray-600 dark:text-D-gray-600 bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-2 py-2 grid grid-cols-6 gap-4 items-center">
                        <span>{t('DivideOrder.divideOrder')}</span>
                        <div className="col-span-2">
                            <ControllerInput title={t('DivideOrder.quantity')} highValue={1000000} lowValue={0} onChange={() => {}} inputValue={0} />
                        </div>
                        <div className="col-span-2">
                            <ControllerInput title={t('DivideOrder.price')} highValue={1000} lowValue={0} onChange={() => {}} inputValue={0} />
                        </div>
                    </div>
                    <div className="h-[282px]">
                        <DivideOrderTable />
                    </div>
                    <div>
                        <div className="flex gap-4 text-[11px]">
                            <div className="text-L-gray-500 dark:text-D-gray500">
                                <span>{t('DivideOrder.rowCount')}: </span>
                                <span>12</span>
                            </div>
                            <div className="text-L-success-200">
                                <span>{t('DivideOrder.buyVolume')}: </span>
                                <span>3251456</span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button className="bg-L-success-200 h-8 px-12 dark:bg-D-success-200 rounded text-L-basic flex items-center justify-center">
                                {t('DivideOrder.sendAll')}
                            </button>
                            <button className="flex items-center h-8 px-8 justify-center rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border">
                                {t('DivideOrder.cancel')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DivideOrderModal;
