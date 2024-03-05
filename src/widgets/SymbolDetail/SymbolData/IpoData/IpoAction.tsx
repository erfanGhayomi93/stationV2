import Tippy from '@tippyjs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Button from 'src/common/components/Buttons/Button';
import IpoBuyModal from 'src/common/components/IpoBuyModal';

interface IProps {
    data: TIpoInfo;
}

export const IpoAction = ({ data }: IProps) => {
    //
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true)


    useEffect(() => {
        if (data) {
            const now = dayjs()
            const startTime = dayjs(data?.ipoFromDate)
            const endTime = dayjs(data?.ipoToDate);

            if (now.isAfter(startTime) && now.isBefore(endTime)) {
                setIsDisabled(false)
            } else {
                setIsDisabled(true)
            }
        }
    }, [data])


    return (
        <>
            <Tippy disabled={!isDisabled} content="در زمان عرضه اولیه نمی باشد">
                <Button
                    variant={isDisabled ? "disabled" : "success"}
                    style={{ width: '100%' }}
                    onClick={() => !isDisabled && setIsModalOpen(true)}
                >
                    خرید عرضه اولیه
                </Button>
            </Tippy>
            {isModalOpen && <IpoBuyModal symbolData={data} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
        </>
    );
};
