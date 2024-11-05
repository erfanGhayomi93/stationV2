const Spinner = () => {
     return (
          <div
               style={{
                    height: 'calc(100% - 1.4rem)',
               }}
               className="absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center gap-2 overflow-hidden"
          >
               <div
                    className="spinner"
                    style={{
                         width: 32 + 'px',
                         height: 32 + 'px',
                    }}
               />
               <span>در حال دریافت اطلاعات...</span>
          </div>
     );
};

export default Spinner;
