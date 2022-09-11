import React, { HTMLAttributes, useEffect, useState } from 'react';
import { positionPercentage } from '../../helper';

interface Props {
    boundaryData: twoParameterArray;
    thresholdData: twoParameterArray;
    originData: number;
    boundaryIcons?: StartEndIcon;
    negativeColor?: string;
    positiveColor?: string;
}

const BoundaryIcons: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
    boundaryIcons,
    boundaryData,
    originData,
    negativeColor = '#ff8282',
    positiveColor = '#2db5e0',
    thresholdData,
}) => {
    const [position, setPosition] = useState([50, 50]);
    useEffect(() => {
        const positiveBadge = positionPercentage([thresholdData[0], thresholdData[1]], boundaryData[1]);
        const negativeBadge = positionPercentage([thresholdData[0], thresholdData[1]], boundaryData[0]);
        setPosition([negativeBadge, positiveBadge]);
    }, [boundaryData, originData]);

    return (
        <div data-mn="boundaryIcon" className="lc-absolute lc-top-0 lc-w-full lc-z-50" style={{ padding: '0 10px' }}>
            <div className="lc-relative  -lc-translate-y-1/2 lc-overflow-hidden" style={{ width: '100%', height: '32px' }}>
                {/*  */}
                <div
                    className="lc-absolute lc-w-full lc-duration-300"
                    style={{ transform: `translateX(${position[1]}%)` }} //
                >
                    <div className={`lc-absolute -lc-translate-x-1/2 -lc-top-1 `}>
                        <div
                            className="lc-translate-y-full"
                            style={{
                                color: boundaryData[1] >= originData ? positiveColor : negativeColor,
                            }}
                        >
                            {boundaryIcons?.start}
                        </div>
                    </div>
                </div>
                {/*  */}
                {/*  */}
                <div
                    className="lc-absolute lc-w-full lc-duration-300"
                    style={{
                        transform: `translateX(${position[0]}%)`,
                    }} //
                >
                    <div className={`lc-absolute -lc-translate-x-1/2 -lc-top-1  `}>
                        <div
                            className="lc-translate-y-full"
                            style={{
                                color: boundaryData[0] >= originData ? positiveColor : negativeColor,
                            }}
                        >
                            {boundaryIcons?.end}
                        </div>
                    </div>
                </div>
                {/*  */}
            </div>
        </div>
    );
};

export default BoundaryIcons;
