import { useState } from 'react';
import Button from 'src/common/components/Buttons/Button';
import IpoBuyModal from 'src/common/components/IpoBuyModal';

interface IProps {
    data: TIpoInfo;
}

export const IpoAction = ({ data }: IProps) => {
    //
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button variant="success" style={{ width: '100%' }} onClick={() => setIsModalOpen(true)}>
                خرید عرضه اولیه
            </Button>
            {isModalOpen && <IpoBuyModal data={data} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
        </>
    );
};
