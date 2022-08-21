import React, { useState } from 'react';
import Modal from 'src/components/common/Modal';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    //
    return (
        <div className="w-full bg-slate-200 py-3 px-2 flex items-center justify-between">
            <div>information</div>
            <div>Action</div>
            <div onClick={() => setIsOpen(true)}>modal</div>
            <Modal onClose={setIsOpen} isOpen={isOpen}>
                <>hey</>
            </Modal>
        </div>
    );
};

export default Header;
