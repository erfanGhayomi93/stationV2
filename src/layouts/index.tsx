import { useTheme } from '@zustand/theme';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import HeaderLayout from './components/Header';

const AppLayout = () => {
     const { theme } = useTheme();

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
          <div className="grid grid-cols-one-min bg-back-2">
               <main className="grid h-screen grid-rows-min-one-min">
                    <header className="h-14 rounded-b-lg bg-back-surface">
                         <HeaderLayout />
                    </header>

                    <section>
                         <article>
                              <Outlet />
                         </article>
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
