import { useQueryGlobalSettings } from '@api/Setting';
import { useEffect, useState } from 'react';

const useApiPath = () => {
     const [apiRoutes, setApiRoutes] = useState<IGetSettingsRes[]>();

     const { data, isLoading } = useQueryGlobalSettings();

     // const { data , isLoading } = useQueryPreprdSettings();

     useEffect(() => {
          if (data) {
               data.forEach(item => {
                    Object.defineProperty(window, item.name, {
                         value: item.value,
                         writable: false,
                    });
               });

               setApiRoutes(data);
          }
     }, [data]);

     return { apiRoutes, isLoading };
};

export default useApiPath;
