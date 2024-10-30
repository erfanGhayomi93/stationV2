import { useQueryPreprdSettings } from '@api/Setting';
import { useEffect, useState } from 'react';

const useApiPath = () => {
     const [apiRoutes, setApiRoutes] = useState<IGetSettingsRes[]>();

     //  const { data } = useQueryGlobalSettings();

     const { data } = useQueryPreprdSettings();

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

     return apiRoutes;
};

export default useApiPath;
