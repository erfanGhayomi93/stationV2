import { FilterCloseIcon, FilterOpenIcon } from "@assets/icons"
import AnimatePresence from "@components/animation/AnimatePresence"
import Button from "@uiKit/Button"
import clsx from "clsx"
import { FC, ReactNode, useState } from "react"

interface ILayoutReportProps {
    rightNodeHeader: ReactNode | string,
    leftNodeHeader: ReactNode | string,
    mainContent: ReactNode,
    leftNodeFilter: ReactNode | string,
    onSubmitFilter: () => void,
    title: string
}

const LayoutReport: FC<ILayoutReportProps> = ({ rightNodeHeader, leftNodeHeader, mainContent, leftNodeFilter, onSubmitFilter, title }) => {

    const [isOpenFilter, setIsOpenFilter] = useState(true)

    return (
        <div className={clsx('w-full h-full grid gap-x-4 grid-cols-one-min', {
            // 'grid-cols-one-min': isOpenFilter ,
            // 'grid-cols-2': !isOpenFilter ,
        })}>
            <div className="grid grid-rows-min-one h-full gap-y-6 p-6 bg-back-surface rounded-lg">
                <div className="grid grid-cols-2 items-center">
                        <div className="gap-x-4 grid grid-cols-min-one items-center">
                            <h1 className="text-content-title font-medium text-xl text-nowrap">{title}</h1>
                            <div>{rightNodeHeader}</div>
                        </div>
                    <div className="flex gap-x-2 items-center justify-self-end">
                        {leftNodeHeader}

                        {
                            !isOpenFilter && (
                                <button
                                    className="p-2 bg-button-tab-deactive"
                                    onClick={() => setIsOpenFilter(!isOpenFilter)}
                                >
                                    <FilterOpenIcon className="text-icon-default" />
                                </button>
                            )
                        }
                    </div>
                </div>
                <div>
                    {mainContent}
                </div>
            </div>

            <AnimatePresence
                initial={{ animation: 'slideInLeft' }}
                exit={{ animation: 'fadeOutLeft' }}
            >
                {
                    isOpenFilter ? (
                        <div className="grid grid-rows-min-one-min p-4 pt-6 bg-back-surface w-72 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span>حذف فیلترها</span>
                                <button
                                    className="bg-button-primary-bg-selected p-1 rounded-lg"
                                    onClick={() => setIsOpenFilter(!isOpenFilter)}
                                >
                                    <FilterCloseIcon className="text-button-primary-default" />
                                </button>
                            </div>
                            <div className="pt-6">
                                {leftNodeFilter}
                            </div>
                            <div className="pt-6 pb-2 border-t border-line-div-2">
                                <Button
                                    variant="primary-darkness"
                                    onClick={onSubmitFilter}
                                >
                                    اعمال فیلتر
                                </Button>
                            </div>
                        </div>
                    ) : null
                }
            </AnimatePresence>

        </div>
    )
}

export default LayoutReport