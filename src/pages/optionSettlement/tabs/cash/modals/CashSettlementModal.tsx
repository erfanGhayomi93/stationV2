import { t } from 'i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { useCreateCashSettlement } from 'src/app/queries/option';
import Input from 'src/common/components/Input';
import Modal from 'src/common/components/Modal';
import { CloseIcon, InfoFillIcon } from 'src/common/icons';
import { onSuccessNotif } from 'src/handlers/notification';

type TProps = {
    settlementState: { isOpen: boolean; data?: Record<string, any> };
    setSettlementState: Dispatch<SetStateAction<TProps['settlementState']>>;
    onClose: () => void;
};

const CashSettlementModal = ({ settlementState, setSettlementState, onClose }: TProps) => {
    //
    const { mutate, isLoading } = useCreateCashSettlement({
        onSuccess: (result) => {
            if (result) {
                onSuccessNotif();
                onClose();
                handleClose();
            }
        },
    });

    const [radioValue, setRadioValue] = useState('requestForMaximum');
    const [positionCount, setPositionCount] = useState<number | undefined>();

    const handleSubmit = () => {
        const requestBody = {
            id: settlementState?.data?.id,
            requestCount: settlementState?.data?.requestCount,
            customerISIN: settlementState?.data?.customerISIN,
            requestForMaximum: radioValue === 'requestForMaximum',
            countOfDone: positionCount,
            requestForMaximumApproval: radioValue === 'requestForMaximumApproval',
        };
        mutate(requestBody);
    };

    const handleClose = () => setSettlementState({ isOpen: false, data: {} });

    return (
        <Modal isOpen={settlementState?.isOpen} className="rounded w-[550px]" onClose={handleClose}>
            <div className="bg-L-basic dark:bg-D-basic flex flex-col shadow-md">
                <div className="moveable flex justify-between items-center bg-L-primary-50 dark:bg-D-primary-200 px-6 h-12">
                    <span className="font-medium text-base text-white">{`درخواست تسویه نقدی ${
                        settlementState?.data?.symbolTitle ? '- نماد ' + settlementState?.data?.symbolTitle : ''
                    }`}</span>
                    <button className="p-1" onClick={handleClose}>
                        <CloseIcon className="text-white" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-lg p-3 flex items-start gap-2">
                        <span className="pt-1">
                            <InfoFillIcon color="#4895EF" />
                        </span>
                        <span className="flex text-justify dark:text-white leading-6">{t('OptionSettlement.ConfirmSettlementDesc')}</span>
                    </div>
                    <div className="flex flex-col items-start gap-4 mt-8 mb-8">
                        <div className="flex gap-3">
                            <input
                                id="Radio1"
                                checked={radioValue === 'requestForMaximum'}
                                value={'requestForMaximum'}
                                name="marketUnit"
                                type="radio"
                                onChange={(e) => setRadioValue(e?.target?.value)}
                            />
                            <label htmlFor="Radio1" className="dark:text-white">
                                {t('OptionSettlement.PhysicalSettlementRadioValue1') +
                                    `${
                                        settlementState?.data?.openPositionCount
                                            ? ' ( ' + settlementState?.data?.openPositionCount + ' موقعیت باز )'
                                            : ''
                                    }`}
                            </label>
                        </div>
                        <div className="flex gap-3 items-center w-full h-8">
                            <input
                                id="Radio2"
                                checked={radioValue === 'requestForMaximumApproval'}
                                value={'requestForMaximumApproval'}
                                name="marketUnit"
                                type="radio"
                                onChange={(e) => setRadioValue(e?.target?.value)}
                            />
                            <label htmlFor="Radio2" className="dark:text-white">
                                {t('OptionSettlement.PhysicalSettlementRadioValue2')}
                            </label>
                            {radioValue === 'requestForMaximumApproval' && (
                                <span className="w-[25%]">
                                    <Input
                                        containerClassName={
                                            radioValue === 'requestForMaximumApproval' &&
                                            (!positionCount || positionCount > settlementState?.data?.openPositionCount)
                                                ? 'border border-red-600'
                                                : ''
                                        }
                                        type="number"
                                        onChange={(e) => setPositionCount(+e?.target?.value)}
                                    />
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleClose} className="border rounded border-[#135CA4] text-[#135CA4] px-2 py-2 w-[30%]">
                            انصراف
                        </button>
                        <button
                            disabled={
                                radioValue === 'requestForMaximumApproval' &&
                                (!positionCount || positionCount > settlementState?.data?.openPositionCount)
                            }
                            onClick={handleSubmit}
                            className="border rounded border-[#135CA4] bg-[#135CA4] disabled:opacity-50 text-white px-2 py-2 flex-1"
                        >
                            ثبت درخواست
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CashSettlementModal;
