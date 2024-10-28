import { HomeIcon } from '@assets/icons';
import { useMemo } from 'react';

const Sidebar = () => {
     const ITEMS = useMemo(
          () => [
               {
                    id: 'home',
                    icon: <HomeIcon />,
               },
          ],
          []
     );

     return (
          <aside className="bg-indigo-300 flex flex-col justify-between bg-nav-back-pwa px-2 py-5">
               <div className="flex flex-col gap-5">
                    <div>
                         <img src={`/assets/images/logo_${window.REACT_APP_BROKER_CODE}.svg`} className="w-full" />
                    </div>

                    <div className="flex flex-col gap-4">
                         {ITEMS.map(item => (
                              <div className="flex items-center justify-center text-icon-default">{item.icon}</div>
                         ))}
                    </div>
               </div>

               <div>{/* setting */}</div>
          </aside>
     );
};

export default Sidebar;
