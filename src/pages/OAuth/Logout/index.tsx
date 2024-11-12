import AXIOS, { tokenCookieName } from '@config/axios';
import { pushEngine } from '@LS/pushEngine';
import { routerPagePath } from '@router/routerPage';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
     const navigate = useNavigate();

     const handleLogout = () => {
          try {
               if (Cookies.get(tokenCookieName)) {
                    Cookies.remove(tokenCookieName);
               }

               pushEngine.disConnect();
               delete AXIOS.defaults.headers.common['Authorization'];

               navigate(routerPagePath.login);
          } catch (error) {
               console.log({ error });
          }
     };

     useEffect(() => {
          handleLogout();
     }, []);

     return null;
};

export default Logout;
