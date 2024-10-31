import AXIOS from '@config/axios';
import { pushEngine } from '@LS/pushEngine';
import { routerPagePath } from '@router/routerPage';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
     const navigate = useNavigate();

     useEffect(() => {
          if (Cookies.get('ROS_2_client_id')) {
               Cookies.remove('ROS_2_client_id');
          }

          pushEngine.disConnect();
          delete AXIOS.defaults.headers.common['Authorization'];

          navigate(routerPagePath.oAuth.login);
     }, []);

     return null;
};

export default Logout;
