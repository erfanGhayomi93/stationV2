import { useQueryGeneralUser } from '@api/trader';
import Modals from '@components/modal/Modals';
import useRamandOMSGateway from '@hooks/useRamandOMSGateway';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Footer from './components/Footer';
import HeaderLayout from './components/Header';
import Sidebar from './components/Sidebar';

const AppLayout = () => {
     const { data: dataUser } = useQueryGeneralUser();

     const { brokerCode, userName } = dataUser || {};

     const { isSubscribed, subscribeCustomers, unSubscribeCustomers } = useRamandOMSGateway();

     useEffect(() => {
          // const queryClient = new QueryCache();

          if (userName && brokerCode) {
               subscribeCustomers(userName, brokerCode);
          }

          return () => {
               // queryClient?.clear();
               isSubscribed() && unSubscribeCustomers();
               // console.log('unmounted')
          };
     }, [userName]);

     return (
          <div className="grid h-screen max-h-screen grid-cols-[1fr_64px] bg-back-2">
               <main className="grid h-full grid-rows-[48px_1fr_40px] overflow-auto">
                    <header className="rtl bg-back-surface">
                         <HeaderLayout />
                    </header>

                    <section className="overflow-auto p-2">
                         <Outlet />
                    </section>

                    <footer className="rtl">
                         <Footer />
                    </footer>
               </main>

               <Sidebar />

               <Modals />
          </div>
     );
};

export default AppLayout;
