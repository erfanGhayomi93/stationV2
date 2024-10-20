const SymbolStateIconRender = ({ symbolState }: { symbolState: TSymbolStateType }) => {
     if (symbolState === 'OrderEntryAuthorized_Open') return null;

     if (['OrderEntryAuthorized_Reserved', 'OrderEntryForbidden_Reserved', 'OrderEntryForbidden_Open'].includes(symbolState))
          //   return <LockSVG width="2rem" height="2rem" className="text-warning-100 dark:text-dark-warning-100" />;
          return <div className="h-8 w-8 bg-icon-warning" />;

     if (['OrderEntryAuthorized_Frozen', 'OrderEntryForbidden_Suspended'].includes(symbolState))
          return <div className="h-8 w-8 bg-icon-error" />;
};

export default SymbolStateIconRender;
