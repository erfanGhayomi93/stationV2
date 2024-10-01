import clsx from "clsx";

interface ISymbolStateProps {
    symbolState: string;
    symbolStateTooltip?: string;
    symbolStateColor: (type: 'bg' | 'text') => string
}

const SymbolState = ({ symbolStateTooltip, symbolStateColor }: ISymbolStateProps) => {

    return (
        <div title={symbolStateTooltip} className={clsx('w-2 h-2 rounded-full', {
            [symbolStateColor('bg')]: !!symbolStateColor('bg')
        })}>
        </div >
    );
};

export default SymbolState;
