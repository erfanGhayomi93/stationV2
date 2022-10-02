import clsx from 'clsx';
import React, { FC } from 'react';
import { SpinnerIcon } from 'src/common/icons';

type IResultFooter = {
    isFetching: Boolean;
};

const ResultFooter: FC<IResultFooter> = ({ isFetching }) => {
    return (
        <div className={clsx('pt-4 flex justify-center text-L-primary-50', !isFetching && 'hidden')}>
            <SpinnerIcon width={30} height={30} />
        </div>
    );
};

export default ResultFooter;
