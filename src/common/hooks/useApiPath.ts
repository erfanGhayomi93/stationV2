import { useEffect, useState } from 'react';
import { useQueryPreprdSettings } from '@api/Setting';

const useApiPath = () => {
     const [apiRoutes, setApiRoutes] = useState<IGetSettingsRes[]>();

     // const { data } = useQueryGlobalSettings();

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
