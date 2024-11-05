(() => {
     const initialConfigDarkMode = () => {
          const theme = JSON.parse(localStorage.getItem('theme') ?? '')?.state.theme;

          console.log(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches, 'theme in system');
          document.documentElement.classList.toggle(
               'dark',
               theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
          );
     };

     initialConfigDarkMode();
})();
