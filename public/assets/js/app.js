(() => {
     const initialConfigDarkMode = () => {
          const themeData = localStorage.getItem('theme');

          const theme = themeData ? JSON.parse(themeData)?.state?.theme : null;

          document.documentElement.classList.toggle(
               'dark',
               theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
          );
     };

     initialConfigDarkMode();
})();
