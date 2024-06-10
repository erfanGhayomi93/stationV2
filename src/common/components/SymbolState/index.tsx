
interface Props {
    symbolState: string;
    symbolStateTooltip?: string;
    symbolStateColor?: string
}

const SymbolState = ({ symbolState, symbolStateTooltip, symbolStateColor }: Props) => {
    //



    return <div title={symbolStateTooltip} className={`w-[9px] h-[9px] rounded-full ${symbolStateColor}`}></div>;
};

export default SymbolState;
