import clsx from 'clsx';

interface ISymbolStateProps {
     symbolState: string;
     symbolStateTooltip?: string;
     symbolStateColor: (type: 'bg' | 'text', symbolState: string | undefined) => string;
}

const SymbolState = ({ symbolStateTooltip, symbolStateColor, symbolState }: ISymbolStateProps) => {
     return <div
          title={symbolStateTooltip}
          className={clsx('h-2 w-2 rounded-full', symbolStateColor('bg', symbolState))}
     >
     </div>
          ;
};

export default SymbolState;
