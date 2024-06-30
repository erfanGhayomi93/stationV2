import React from 'react';

type Props = { height?: number | string };

const Seperator = ({ height }: Props) => {
    return <div className="bg-L-gray-300 w-[1px] h-2/3" style={{ height }}></div>;
};

export default Seperator;
