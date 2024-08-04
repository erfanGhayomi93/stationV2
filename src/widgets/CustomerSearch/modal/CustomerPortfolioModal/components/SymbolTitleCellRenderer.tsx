
import Tippy from '@tippyjs/react';
import { ICellRendererParams } from 'ag-grid-community';
import { FC } from 'react';
import { FreezeIcon } from 'src/common/icons';

interface ISymbolTitleCellRendererProps extends ICellRendererParams<IGTPortfolioResultType> { }



const SymbolTitleCellRenderer: FC<ISymbolTitleCellRendererProps> = ({ value, data }) => {
    return (
        <div className='flex gap-x-2 text-right items-center px-2'>
            <span className='flex-1'>{value}</span>

            {data?.isFreezed && (
                <Tippy content="نماد فریز شده است">
                    <FreezeIcon
                        width={20}
                        height={20}
                        className='text-L-gray-600 dark:text-D-gray-600'
                    />
                </Tippy>
            )}
        </div>
    )
}



export default SymbolTitleCellRenderer;
