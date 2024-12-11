import { useState } from 'react';
import Example from '@components/searchSymbol/MulitSearchSymbol.tsx';

const Test = () => {
     const [symbolSearch, setSymbolSearch] = useState<SearchSymbol | null>(null);

     return (
          <div className="h-full bg-back-surface p-6">
               {/*<CheckButton label="حقیقی" checked={true} />*/}

               {/*<MultiSearchSymbol searchSymbol={symbolSearch} setSearchSymbol={symbol => setSymbolSearch(symbol)} />*/}
               {/*<Example />*/}
          </div>
     );
};

export default Test;
