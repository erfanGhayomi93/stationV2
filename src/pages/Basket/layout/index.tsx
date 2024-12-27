import { FilterCloseIcon, FilterOpenIcon } from '@assets/icons';
import AnimatePresence from '@components/animation/AnimatePresence';
import Button from '@uiKit/Button';
import clsx from 'clsx';
import { FC, ReactNode, useState } from 'react';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';

interface ILayoutReportProps {
     rightNodeHeader?: ReactNode | string;
     leftNodeHeader?: ReactNode | string;
     mainContent: ReactNode;
     leftNodeFilter: ReactNode | string;
     onSubmitFilter: () => void;
     onResetFilters?: () => void;
     title: string;
}

const LayoutReport: FC<ILayoutReportProps> = ({
     rightNodeHeader,
     leftNodeHeader,
     mainContent,
     leftNodeFilter,
     onSubmitFilter,
     onResetFilters,
     title,
}) => {
     const { t } = useTranslation();

     const [isOpenFilter, setIsOpenFilter] = useState(true);

     return (
          <div
               className={clsx('rtl grid h-full w-full grid-cols-one-min', isOpenFilter && 'gap-x-2', {
                    // 'grid-cols-one-min': isOpenFilter ,
                    // 'grid-cols-2': !isOpenFilter ,
               })}
          >
               <div className="grid h-full grid-rows-min-one gap-y-6 rounded-lg bg-back-surface p-6">
                    <div className="grid grid-cols-2 items-center">
                         <div className="grid grid-cols-min-one items-center gap-x-4">
                              <h1 className="text-nowrap text-xl font-medium text-content-title">{title}</h1>
                              <div>{rightNodeHeader}</div>
                         </div>
                         <div className="flex items-center gap-x-2 justify-self-end">
                              {leftNodeHeader}

                              {!isOpenFilter && (
                                   <Tippy content={t('tooltip.openFilter')}>
                                        <button
                                             className="bg-button-tab-deactive p-2"
                                             onClick={() => setIsOpenFilter(!isOpenFilter)}
                                        >
                                             <FilterOpenIcon className="text-icon-default" />
                                        </button>
                                   </Tippy>
                              )}
                         </div>
                    </div>
                    <div>{mainContent}</div>
               </div>

               <AnimatePresence initial={{ animation: 'slideInLeft' }} exit={{ animation: 'fadeOutLeft' }}>
                    {isOpenFilter ? (
                         <div className="grid w-72 grid-rows-min-one-min rounded-lg bg-back-surface p-4 pt-6">
                              <div className="flex items-center justify-between">
                                   <button onClick={onResetFilters} className="text-sm text-content-error-sell">
                                        حذف فیلترها
                                   </button>
                                   <button
                                        className="rounded-lg bg-button-primary-bg-selected p-2"
                                        onClick={() => setIsOpenFilter(!isOpenFilter)}
                                   >
                                        <FilterCloseIcon className="text-button-primary-default" />
                                   </button>
                              </div>
                              <div className="pt-6">{leftNodeFilter}</div>
                              <div className="border-t border-line-div-2 pb-2 pt-6">
                                   <Button variant="primary-darkness" onClick={onSubmitFilter}>
                                        اعمال فیلتر
                                   </Button>
                              </div>
                         </div>
                    ) : null}
               </AnimatePresence>
          </div>
     );
};

export default LayoutReport;
