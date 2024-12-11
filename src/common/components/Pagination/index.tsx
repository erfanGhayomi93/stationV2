import usePagination from '@hooks/usePagination.ts';
import { cn } from '@methods/helper';
import { ArrowRightIcon, ArrowLeftIcon } from '@assets/icons';
import styles from './Pagination.module.scss';
import clsx from 'clsx';

interface PaginationProps extends Record<'totalCount' | 'pageNumber' | 'pageSize' | 'totalPages', number> {
     siblingCount?: number;
     hasNextPage: boolean;
     hasPreviousPage: boolean;
     onPageChange: (pn: number) => void;
     onPageSizeChange: (ps: number) => void;
     currentPage: number;
}
const Pagination = ({ onPageChange, onPageSizeChange, hasNextPage, hasPreviousPage, totalPages, ...props }: PaginationProps) => {
     const pag = usePagination({
          ...props,
          siblingCount: props.siblingCount ?? 1,
          pageSize: props.pageSize ?? 15,
     });

     console.log({ pag, props });

     const onNext = () => {
          if (!hasNextPage) return;
          onPageChange(Math.min(totalPages, props.pageNumber + 1));
     };

     const onPrevious = () => {
          if (!hasPreviousPage) return;
          onPageChange(Math.max(props.pageNumber - 1, 1));
     };

     return (
          <div className="flex w-full items-center justify-between">
               <ul className={styles.pageSize}>
                    {[15, 25, 50, 100].map(pgSize => (
                         <li
                              onClick={() => onPageSizeChange(pgSize)}
                              className={clsx(styles.pageSizeItem, pgSize === props.pageSize && styles.active)}
                              key={pgSize}
                         >
                              {pgSize}
                         </li>
                    ))}
               </ul>

               <ul className={styles.pagination}>
                    <li className={styles.prev}>
                         <button onClick={onPrevious} disabled={!hasPreviousPage} type="button">
                              <ArrowRightIcon width="1rem" height="1rem" />
                         </button>
                    </li>
                    <div className={styles.pageWrapper}>
                         {pag.map(pn => (
                              <li className={cn(styles.page, pn === props.pageNumber && styles.active)} key={pn}>
                                   <button
                                        disabled={typeof pn === 'string'}
                                        onClick={typeof pn === 'string' ? undefined : () => onPageChange(pn)}
                                        type="button"
                                   >
                                        {pn}
                                   </button>
                              </li>
                         ))}
                    </div>
                    <li className={styles.next}>
                         <button onClick={onNext} disabled={!hasNextPage} type="button">
                              <ArrowLeftIcon width="1rem" height="1rem" />
                         </button>
                    </li>
               </ul>
          </div>
     );
};

export default Pagination;
