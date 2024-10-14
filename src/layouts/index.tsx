import { useThemeManager } from '@zustand/theme';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import HeaderLayout from './components/Header';

const AppLayout = () => {
     const { theme } = useThemeManager();

     useEffect(() => {
          const element = document.documentElement;

          if (theme !== 'system') {
               element.classList.toggle('dark', theme === 'dark');
          } else {
               const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
               element.classList.toggle('dark', darkQuery.matches);
          }
     }, [theme]);

     return (
          <div className="grid h-screen max-h-screen grid-cols-one-min bg-back-2 overflow-hidden">
               <main className="grid grid-rows-min-one-min h-full max-h-full">
                    <header className="h-14 rounded-b-lg bg-back-surface">
                         <HeaderLayout />
                    </header>

                    <section className="py-2">
                         <Outlet />
                    </section>

                    <footer className="">
                         <Footer />
                    </footer>
               </main>

               <aside className="bg-indigo-300">aside</aside>
          </div>
     );
};

export default AppLayout;
