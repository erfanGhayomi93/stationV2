import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { positionPercentage, seprate } from '../../helper';
interface Props {
    boundaryData: twoParameterArray;
    thresholdData: twoParameterArray;
    originData: number;
    boundarySetting?: BoundarySettingType;
    negativeColor?: string;
    positiveColor?: string;
    gradient?: boolean;
}

const FreeBoundary: React.FC<Props & HTMLAttributes<HTMLDivElement>> = ({
    boundaryData,
    boundarySetting,
    originData,
    gradient,
    negativeColor = '#ff8282',
    positiveColor = '#2db5e0',
    thresholdData,
}) => {
    const totalRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState([1, 1]);
    const [origin, setOrigin] = useState(50);

    const [distanse, setDistanse] = useState(0);
    const [tooltip, setTooltip] = useState({
        x: 0,
        hide: true,
        title: '',
        percentage: 0,
    });

    useEffect(() => {
        const BoundaryRectContaner = totalRef.current?.getBoundingClientRect();
        const totalWidth = thresholdData[1] - thresholdData[0];
        const activeWidth = boundaryData[1] - boundaryData[0];

        const distanse = Math.round((activeWidth / totalWidth) * 1000) / 1000;
        setDistanse(distanse);

        const startPos = Math.round(((BoundaryRectContaner?.width! * (boundaryData[0] - thresholdData[0])) / totalWidth) * 100) / 100;

        setPosition([startPos, 0]);

        const splitPercent = positionPercentage([boundaryData[0], boundaryData[1]], originData);

        setOrigin(splitPercent);
    }, [boundaryData, thresholdData]);
    const showTooltip = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const totalWidth = thresholdData[1] - thresholdData[0];
        const w = totalRef.current?.clientWidth || 1;
        const location = e.nativeEvent.offsetX;
        const percentage = Math.floor((location / w) * 1000) / 1000;
        const price = Math.floor(percentage * totalWidth) + thresholdData[0];
        const title = Math.floor((((price - originData) * 100) / originData) * 100) / 100;

        setTooltip({
            hide: false,
            x: location,
            title: `${seprate(price)} (${title}%)`,
            percentage: percentage,
        });
    };
    const hideTooltip = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setTooltip((prev) => ({ ...prev, hide: true }));
    };
    return (
        <>
            <div
                data-mn="boundary"
                style={{
                    zIndex: 99,
                    left: tooltip.x,
                    opacity: tooltip.hide ? 0 : 1,
                }}
                className="lc-absolute -top-0.5 -ml-1.5"
            >
                <div className=" ml-1.5 mt-2 pt-1 relative overflow-hidden w-5 h-2 px-1 ">
                    <div
                        style={{
                            transform: 'rotate(45deg)',
                            backgroundColor: '#00000090',
                        }}
                        className=" w-3 h-3 rotate-45"
                    ></div>
                </div>
                <div
                    style={{
                        transform: tooltip.percentage < 0.1 ? 'translateX(-10%)' : tooltip.percentage > 0.9 ? 'translateX(-90%)' : 'translateX(-50%)',
                        backgroundColor: '#00000090',
                    }}
                    className="absolute py-1 ml-4 px-2 rounded text-white-100 "
                >
                    <span style={{}} className="text-xs text-white">
                        {tooltip.title}
                    </span>
                </div>
            </div>
            <div style={{ padding: '0 10px', zIndex: 99 }} className=" lc-absolute w-full" data-mn="boundary">
                <div
                    onMouseMove={showTooltip}
                    onMouseLeave={hideTooltip}
                    onClick={showTooltip}
                    className={`   lc-top-0 py-3 -mt-1.5  lc-w-full ${boundarySetting?.className}`}
                ></div>
            </div>
            <div className={`  lc-absolute lc-top-0 lc-z-10  lc-w-full ${boundarySetting?.className}`} data-mn="boundary">
                <div style={{ padding: '0 10px' }} className="lc-w-full lc-h-full lc-absolute ">
                    <div ref={totalRef} className="lc-relative lc-w-full lc-h-full lc-overflow-hidden ">
                        <div
                            style={
                                gradient
                                    ? {
                                          background: `linear-gradient(90deg, ${boundaryData[0] >= originData ? positiveColor : negativeColor} 0%, ${
                                              boundaryData[0] <= originData && boundaryData[1] >= originData ? `#c1c1c1 ${origin}%,` : ''
                                          } ${boundaryData[1] >= originData ? positiveColor : negativeColor} 100%)`,
                                          left: '0',
                                          willChange: 'left,transform',
                                          transform: `matrix(${distanse}, 0, 0, 1,${position[0]}, 0)`,
                                      }
                                    : {
                                          background: `linear-gradient(90deg, ${negativeColor} 0%,  ${negativeColor} ${origin}%, ${
                                              boundaryData[1] >= originData ? positiveColor : negativeColor
                                          } ${origin}%, ${boundaryData[1] >= originData ? positiveColor : negativeColor} 100%)`,
                                          left: '0',
                                          willChange: 'left,transform',
                                          transform: `matrix(${distanse}, 0, 0, 1,${position[0]}, 0)`,
                                      }
                            }
                            className="lc-w-full lc-h-full lc-duration-300 lc-absolute lc-origin-left"
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreeBoundary;
