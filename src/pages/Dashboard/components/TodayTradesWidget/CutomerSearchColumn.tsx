import { ICellRendererParams } from '@ag-grid-community/core';
import React, { useRef } from 'react';

type WatchlistNameProps = ICellRendererParams<IDoneOrdersRes, string> & {
     editingWatchlistId: string | number | null;
     newWatchlistName: string | null;
     setEditingWatchlistId: React.Dispatch<React.SetStateAction<string | number | null>>;
     setNewWatchlistName: React.Dispatch<React.SetStateAction<string | null>>;
};

const CostumerSearchColumn = ({
     value,
     data,
     editingWatchlistId,
     setEditingWatchlistId,
     newWatchlistName,
     setNewWatchlistName,
}: WatchlistNameProps) => {
     const inputRef = useRef<HTMLInputElement>(null);

     const watchlistID = 0;

     if (String(watchlistID) === String(editingWatchlistId)) {
          return (
               <div className="flex items-center gap-8">
                    <input
                         autoFocus
                         ref={inputRef}
                         placeholder={value ?? ''}
                         value={newWatchlistName ?? ''}
                         className="bg-transparent h-full flex-1 border-0 px-4"
                         onChange={e => setNewWatchlistName(e.target.value)}
                    />
               </div>
          );
     }

     return (
          <div
               className="w-full cursor-text pr-4 text-right"
               onDoubleClick={() => setEditingWatchlistId(editingWatchlistId === watchlistID ? null : watchlistID)}
          ></div>
     );
};

export default CostumerSearchColumn;
