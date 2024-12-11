import { useMemo } from 'react';

const usePagination = ({
     totalCount,
     pageSize,
     siblingCount = 1,
     pageNumber,
}: {
     totalCount: number;
     pageSize: number;
     siblingCount: number;
     pageNumber: number;
}) => {
     const range = (start: number, end: number) => {
          const length = end - start + 1;
          return Array.from({ length }, (_, idx) => idx + start);
     };

     return useMemo(() => {
          const totalPageCount = Math.ceil(totalCount / pageSize);

          const totalPageNumbers = siblingCount + 5;
          if (totalPageNumbers >= totalPageCount) return range(1, totalPageCount);

          const leftSiblingIndex = Math.max(pageNumber - siblingCount, 1);
          const rightSiblingIndex = Math.min(pageNumber + siblingCount, totalPageCount);

          const shouldShowLeftDots = leftSiblingIndex > 2;
          const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

          const firstPageIndex = 1;
          const lastPageIndex = totalPageCount;

          if (!shouldShowLeftDots && shouldShowRightDots) {
               const leftItemCount = 3 + 2 * siblingCount;
               const leftRange = range(1, leftItemCount);

               return [...leftRange, '...', totalPageCount];
          }

          if (shouldShowLeftDots && !shouldShowRightDots) {
               const rightItemCount = 3 + 2 * siblingCount;
               const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
               return [firstPageIndex, '...', ...rightRange];
          }

          if (shouldShowLeftDots && shouldShowRightDots) {
               const middleRange = range(leftSiblingIndex, rightSiblingIndex);
               return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
          }

          return [];
     }, [totalCount, pageSize, siblingCount, pageNumber]);
};

export default usePagination;
