import React, { useState } from 'react'
import { Best5Market } from './Best5Market'
import MarketDepthTab from './marketDepth'
import { ArrowDownTriangleIcon } from '@assets/icons'
import clsx from 'clsx'



const MarketDepthDisplay = () => {
    const [isMarketDepth, setIsMarketDepth] = useState(false)

    const [isData, setIsData] = useState({
        marketDepth: false,
        best5Market: false
    })

    return (
        <div className={clsx('grid grid-rows-one-min', {
            "relative": !isMarketDepth
        })}>
            {
                !isMarketDepth && <Best5Market onDataStatus={(flag: boolean) => setIsData(prev => ({ ...prev, best5Market: flag }))} />
            }
            {
                isMarketDepth && <MarketDepthTab onDataStatus={(flag: boolean) => setIsData(prev => ({ ...prev, marketDepth: flag }))} />
            }

            {
                <button
                    onClick={() => setIsMarketDepth(!isMarketDepth)}
                    className={clsx('flex cursor-pointer items-center justify-center sticky right-0 left-0 bottom-0 px-2 pb-5 bg-back-surface', {
                        "opacity-100 transition-opacity": isMarketDepth && isData.marketDepth || !isMarketDepth && isData.best5Market,
                        "opacity-0": !(isMarketDepth && isData.marketDepth || !isMarketDepth && isData.best5Market)
                    })}
                >

                    <div style={{ minHeight: '1px' }} className="w-full flex-1 bg-line-div-2" />

                    <div
                        className="px-1 relative"
                    >
                        <ArrowDownTriangleIcon
                            className={clsx(
                                'text-content-selected',
                                isMarketDepth && 'rotate-180'
                            )}
                        />
                        <span className='text-content-selected text-xs absolute text-nowrap -right-3'>
                            {!isMarketDepth ? 'عمق بازار' : "5 مظنه"}
                        </span>
                    </div>

                    <div style={{ minHeight: '1px' }} className="w-full flex-1 bg-line-div-2" />
                </button>
            }

        </div>
    )
}

export default MarketDepthDisplay