import { useQueryGeneralUser } from '@api/trader';
import Modals from '@components/modal/Modals';
import useRamandOMSGateway from '@hooks/useRamandOMSGateway';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import HeaderLayout from './components/Header';
import Sidebar from './components/Sidebar';

const AppLayout = () => {
     const { data: dataUser } = useQueryGeneralUser();

     const { brokerCode, userName } = dataUser || {};

     const { isSubscribed, subscribeCustomers, unSubscribeCustomers } = useRamandOMSGateway();

     useEffect(() => {
          if (userName && brokerCode) {
               subscribeCustomers(userName, brokerCode);
          }

          return () => {
               isSubscribed() && unSubscribeCustomers();
          };
     }, [userName]);

     return (
          <div className="grid h-screen max-h-screen grid-cols-[1fr_64px] gap-x-4 overflow-hidden bg-back-2">
               <main className="grid h-full max-h-full grid-rows-[48px_1fr_40px] gap-y-2 overflow-hidden">
                    <header className="rtl rounded-b-lg bg-back-surface">
                         <HeaderLayout />
                    </header>

                    <section className="overflow-hidden">
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
